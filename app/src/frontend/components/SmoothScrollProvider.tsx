"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenisRef = useRef<Lenis | null>(null);

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
    lenisRef.current = lenis;

    // Jalankan loop requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Listener khusus jika hash berubah saat di halaman yang sama
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash) as HTMLElement;
        if (target) {
          lenis.scrollTo(target, { offset: -80 });
        }
      }
    };
    window.addEventListener("hashchange", onHashChange);

    // Cleanup saat unmount
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Tangani perpindahan halaman (cross-page navigation) yang memiliki hash
  useEffect(() => {
    if (lenisRef.current) {
      const hash = window.location.hash;
      if (hash) {
        // Beri sedikit jeda agar DOM Next.js selesai me-render halaman baru
        setTimeout(() => {
          const target = document.querySelector(hash) as HTMLElement;
          if (target) {
            // Scroll langsung tanpa animasi jika baru pindah halaman
            lenisRef.current?.scrollTo(target, { immediate: true, offset: -80 });
          }
        }, 150);
      } else {
        // Scroll ke atas jika tidak ada hash
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}
