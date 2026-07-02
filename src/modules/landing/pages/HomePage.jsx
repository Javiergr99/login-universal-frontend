import { useState } from "react";
import { Box } from "@mui/material";

import PublicHeader from "../components/PublicHeader";
import UserNoticeModal from "../components/UserNoticeModal";
import InterestCardsSection from "../components/InterestCardsSection";
import GeoBannerSection from "../components/GeoBannerSection";
import GobMxFooter from "../../../components/layout/GobMxFooter";

import LandingAboutSection from "../components/LandingAboutSection";
import LandingHeroSection from "../components/LandingHeroSection";
import LandingProtectionSection from "../components/LandingProtectionSection";

export default function HomePage() {
  const [noticeOpen, setNoticeOpen] = useState(true);

  const handleAcceptNotice = () => {
    setNoticeOpen(false);
  };

  const handleRejectNotice = () => {
    window.location.href = "https://www.gob.mx/";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PublicHeader />

      <UserNoticeModal
        open={noticeOpen}
        onAccept={handleAcceptNotice}
        onReject={handleRejectNotice}
      />

      <LandingHeroSection />
      <LandingAboutSection />
      <LandingProtectionSection />

      <InterestCardsSection />
      <GeoBannerSection />
      <GobMxFooter />
    </Box>
  );
}