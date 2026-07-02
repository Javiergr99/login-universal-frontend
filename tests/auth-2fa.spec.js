import { test, expect } from "@playwright/test";

const PENDING_2FA_CHALLENGE_STORAGE_KEY = "pending_2fa_challenge:v1";

function buildPendingTwoFactorChallenge({
  status,
  tempUserId,
  message,
  qrImageUrl = null,
}) {
  return {
    status,
    tempUserId,
    email: "javier@demo.com",
    userHint: "javier@demo.com",
    message,
    qrImageUrl,
  };
}

async function setPendingTwoFactorChallenge(page, challenge) {
  await page.evaluate(
    ({ storageKey, challengeData }) => {
      sessionStorage.setItem(storageKey, JSON.stringify(challengeData));
    },
    {
      storageKey: PENDING_2FA_CHALLENGE_STORAGE_KEY,
      challengeData: challenge,
    }
  );
}

test.describe("Flujo visual auth + 2FA", () => {
  test("si no existe estado pendiente 2FA, la ruta redirige al login", async ({
    page,
  }) => {
    await page.goto("/auth/verificacion-2fa");

    await expect(page).toHaveURL("http://localhost:5173/login");

    await expect(
      page.getByRole("heading", {
        name: /bienvenido/i,
      })
    ).toBeVisible();
  });

  test("muestra pantalla 2FA en modo setup cuando existe pending_setup", async ({
    page,
  }) => {
    await page.goto("/login");

    await setPendingTwoFactorChallenge(
      page,
      buildPendingTwoFactorChallenge({
        status: "pending_setup",
        tempUserId: "uuid-demo-setup",
        message: "Es obligatorio configurar la autenticación en dos pasos.",
        qrImageUrl: "blob:http://localhost:5173/demo-qr",
      })
    );

    await page.goto("/auth/verificacion-2fa");

    await expect(page).toHaveURL("http://localhost:5173/auth/verificacion-2fa");

    await expect(page.getByTestId("two-factor-page-title")).toContainText(
      "Configura tu autenticación en dos pasos"
    );

    await expect(
      page
        .getByRole("alert")
        .getByText("Es obligatorio configurar la autenticación en dos pasos.")
    ).toBeVisible();

    await expect(page.getByTestId("two-factor-qr-panel")).toBeVisible();

    await expect(
      page.getByRole("button", { name: /activar y continuar/i })
    ).toBeVisible();

    await expect(page.getByLabel(/código de verificación/i)).toBeVisible();
  });

  test("muestra pantalla 2FA en modo verify cuando existe pending_2fa", async ({
    page,
  }) => {
    await page.goto("/login");

    await setPendingTwoFactorChallenge(
      page,
      buildPendingTwoFactorChallenge({
        status: "pending_2fa",
        tempUserId: "uuid-demo-verify",
        message: "Ingresa tu código de verificación.",
      })
    );

    await page.goto("/auth/verificacion-2fa");

    await expect(page).toHaveURL("http://localhost:5173/auth/verificacion-2fa");

    await expect(page.getByTestId("two-factor-page-title")).toContainText(
      "Verifica tu acceso seguro"
    );

    await expect(
      page.getByRole("heading", { name: /ingresa tu código de verificación/i })
    ).toBeVisible();

    await expect(
      page.getByRole("alert").getByText("Ingresa tu código de verificación.")
    ).toBeVisible();

    await expect(page.getByLabel(/código de verificación/i)).toBeVisible();

    await expect(page.getByTestId("two-factor-qr-panel")).toHaveCount(0);

    await expect(
      page.getByRole("button", { name: /confirmar verificación/i })
    ).toBeVisible();
  });

  test("el botón permanece deshabilitado mientras el código no tenga 6 dígitos", async ({
    page,
  }) => {
    await page.goto("/login");

    await setPendingTwoFactorChallenge(
      page,
      buildPendingTwoFactorChallenge({
        status: "pending_2fa",
        tempUserId: "uuid-demo-short-code",
        message: "Ingresa tu código de verificación.",
      })
    );

    await page.goto("/auth/verificacion-2fa");

    const submitButton = page.getByRole("button", {
      name: /confirmar verificación/i,
    });

    await expect(submitButton).toBeDisabled();

    await page.getByLabel(/código de verificación/i).fill("123");

    await expect(submitButton).toBeDisabled();

    await page.getByLabel(/código de verificación/i).fill("123456");

    await expect(submitButton).toBeEnabled();
  });
});