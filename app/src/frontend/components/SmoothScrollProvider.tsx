"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inisialisasi Lenis untuk efek Smooth/Heavy Scrolling
    const lenis = new Lenis({
      duration: 1.5, // Semakin tinggi semakin 'berat' dan panjang momentumnya
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Jalankan loop requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup saat unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
