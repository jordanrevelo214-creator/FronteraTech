"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FullscreenMenu } from "./fullscreen-menu";

export function MinimalNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-none select-none">
        {/* Top-Left: Official Full Brand Logo from inicio.png */}
        <Link
          href="#inicio"
          className="pointer-events-auto flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1 transition-opacity hover:opacity-90"
          aria-label="Frontera Tech - Ir al inicio"
        >
          <div className="relative h-9 sm:h-10 w-auto flex items-center">
            <Image
              src="/images/brand_navbar_logo.png"
              alt="Frontera Tech"
              width={160}
              height={44}
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
              priority
            />
          </div>
        </Link>

        {/* Top-Right: 'Hablemos ↗' with golden border + 'Menú ☰' button */}
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="#contacto"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#030d24]/60 border border-[#f59e0b] hover:bg-[#f59e0b]/15 backdrop-blur-md transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>Hablemos</span>
            <ArrowUpRight className="w-4 h-4 text-[#f59e0b]" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-white bg-[#030d24]/60 border border-slate-700/80 hover:border-slate-500 backdrop-blur-md transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
            aria-label="Abrir menú de navegación"
            aria-expanded={menuOpen}
          >
            <span>Menú</span>
            <span className="flex flex-col gap-[3px] w-3.5">
              <span className="w-full h-[1.5px] bg-white rounded-full" />
              <span className="w-full h-[1.5px] bg-white rounded-full" />
              <span className="w-full h-[1.5px] bg-white rounded-full" />
            </span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
