"use client";

import { useState, useCallback } from "react";
import { ArrowRight, Trophy, Calendar, ShoppingBag } from "lucide-react";
import SplashScreen from "@frontend/components/SplashScreen";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
    <main className="flex-1">
      {/* Konten utama akan dirombak berdasarkan instruksi selanjutnya */}
    </main>
    </>
  );
}
