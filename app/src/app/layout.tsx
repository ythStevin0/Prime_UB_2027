import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/frontend/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prime UB 2027 — Platform Kompetisi & Event",
    template: "%s | Prime UB 2027",
  },
  description:
    "Platform kompetisi, event, dan merchandise resmi Prime UB 2027. Daftar, berkompetisi, dan raih prestasi.",
  keywords: [
    "Prime UB",
    "kompetisi",
    "event",
    "Universitas Brawijaya",
    "2027",
  ],
  openGraph: {
    title: "Prime UB 2027",
    description:
      "Platform kompetisi, event, dan merchandise resmi Prime UB 2027.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
