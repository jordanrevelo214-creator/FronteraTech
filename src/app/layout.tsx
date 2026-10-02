import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MinimalNavbar } from "@/components/layout/minimal-navbar";
import { Footer } from "@/components/layout/footer";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { GlobalCosmicBackground } from "@/components/layout/global-cosmic-background";
import { companyData } from "@/data/company";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  title: `${companyData.name} | Desarrollo de Software & Experiencia Digital`,
  description: companyData.shortDescription,
  keywords: [
    "Frontera Tech",
    "Desarrollo de Software",
    "Three.js",
    "Next.js",
    "TypeScript",
    "Automatización",
    "Software a Medida",
  ],
  authors: [{ name: "Frontera Tech" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://fronteratech.com",
    title: `${companyData.name} | ${companyData.tagline}`,
    description: companyData.shortDescription,
    siteName: companyData.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col text-slate-100 antialiased selection:bg-sky-500/30 selection:text-white overflow-x-hidden relative bg-[#020617]">
        <GlobalCosmicBackground />
        <MinimalNavbar />
        <main className="flex-1 relative z-10">{children}</main>
        <ConditionalFooter>
          <Footer />
        </ConditionalFooter>
      </body>
    </html>
  );
}
