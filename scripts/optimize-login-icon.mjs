import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pngInputPath = path.resolve(
  __dirname,
  "../src/assets/icons/login-icon.png"
);

const webpOutputPath = path.resolve(
  __dirname,
  "../src/assets/icons/login-icon.webp"
);

async function printImageInfo(filePath, label) {
  const metadata = await sharp(filePath, {
    limitInputPixels: false,
  }).metadata();

  console.log(label);
  console.log({
    path: filePath,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
  });
}

async function optimizeLoginIcon() {
  const pngExists = fs.existsSync(pngInputPath);
  const webpExists = fs.existsSync(webpOutputPath);

  if (!pngExists && webpExists) {
    console.log("login-icon.png ya no existe.");
    console.log("login-icon.webp ya está disponible. No es necesario optimizar de nuevo.");

    await printImageInfo(webpOutputPath, "Imagen optimizada actual:");
    return;
  }

  if (!pngExists && !webpExists) {
    throw new Error(
      "No se encontró login-icon.png ni login-icon.webp en src/assets/icons."
    );
  }

  await printImageInfo(pngInputPath, "Imagen original:");

  await sharp(pngInputPath, {
    limitInputPixels: false,
  })
    .resize({
      width: 256,
      height: 256,
      fit: "inside",
      withoutEnlargement: false,
    })
    .webp({
      quality: 82,
      effort: 6,
    })
    .toFile(webpOutputPath);

  await printImageInfo(webpOutputPath, "Icono optimizado creado correctamente:");
}

optimizeLoginIcon().catch((error) => {
  console.error("No se pudo optimizar login-icon.");
  console.error(error);
  process.exit(1);
});