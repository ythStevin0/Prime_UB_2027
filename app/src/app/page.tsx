"use client";

import { useState, useCallback } from "react";
import SplashScreen from "@frontend/components/SplashScreen";
import Navbar from "@frontend/components/Navbar";
import HeroSection from "@frontend/components/sections/HeroSection";
import AboutCompetitionsSection from "@frontend/components/sections/AboutCompetitionsSection";
import MainEventsSection from "@frontend/components/sections/MainEventsSection";
import EventsSection from "@frontend/components/sections/EventsSection";
import LogoGridSection from "@frontend/components/sections/LogoGridSection";
import FooterSection from "@frontend/components/sections/FooterSection";

/**
 * Data placeholder untuk logo/nama partner.
 * Nanti bisa diganti dengan data dari CMS atau API.
 * Field `logo` opsional — jika tidak ada, akan tampil placeholder inisial.
 */

const supportedBy = [
  { name: "Universitas Brawijaya" },
  { name: "Fakultas Teknik UB" },
  { name: "Kementerian ESDM" },
  { name: "SKK Migas" },
];

const sponsoredBy = [
  { name: "Pertamina" },
  { name: "Petronas" },
  { name: "Medco Energi" },
  { name: "PetroChina" },
  { name: "Chevron" },
  { name: "ExxonMobil" },
];

const mediaPartners = [
  { name: "Kompas" },
  { name: "Detik" },
  { name: "Tribunnews" },
  { name: "IDN Times" },
  { name: "CNN Indonesia" },
  { name: "Tempo" },
];

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      
      <main className="flex-1 relative z-0">
        {/* Navbar */}
        <Navbar />

        {/* Hero */}
        <HeroSection />

        {/* About & Competitions (Split Screen) */}
        <AboutCompetitionsSection />

        {/* Main Events Grid */}
        <MainEventsSection />

        {/* Events Timeline Map */}
        <EventsSection />

        {/* Supported By */}
        <LogoGridSection
          id="supported-by"
          title="Supported By"
          items={supportedBy}
          columns={4}
        />

        {/* Sponsored By */}
        <LogoGridSection
          id="sponsored-by"
          title="Sponsored By"
          items={sponsoredBy}
          columns={3}
        />

        {/* Media Partner */}
        <LogoGridSection
          id="media-partner"
          title="Media Partner"
          items={mediaPartners}
          columns={6}
        />

        {/* Footer */}
        <FooterSection />
      </main>
    </>
  );
}
