import { Box } from "@mui/material";

import AuthLayout from "../../../components/layout/AuthLayout";
import LoginBackground from "../components/LoginBackground";
import TwoFactorCard from "../components/TwoFactorCard";
import TwoFactorHero from "../components/TwoFactorHero";
import { useTwoFactorFlow } from "../hooks/useTwoFactorFlow";

export default function TwoFactorPage() {
  const {
    activeChallenge,
    canSubmit,
    handleBackToLogin,
    handleCodeChange,
    handleSubmit,
    isSetupMode,
    loading,
    qrImageUrl,
    qrLoading,
    verificationCode,
  } = useTwoFactorFlow();

  return (
    <AuthLayout>
      <LoginBackground />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1220px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 4, md: 6, lg: 8 },
            alignItems: "center",
          }}
        >
          <TwoFactorHero isSetupMode={isSetupMode} />

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-end" },
            }}
          >
            <TwoFactorCard
              activeChallenge={activeChallenge}
              canSubmit={canSubmit}
              isSetupMode={isSetupMode}
              loading={loading}
              onBackToLogin={handleBackToLogin}
              onCodeChange={handleCodeChange}
              onSubmit={handleSubmit}
              qrImageUrl={qrImageUrl}
              qrLoading={qrLoading}
              verificationCode={verificationCode}
            />
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}