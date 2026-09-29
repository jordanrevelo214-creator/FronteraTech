"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, LogIn } from "lucide-react";
import { FullscreenMenu } from "./fullscreen-menu";

export function MinimalNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detectar si está scrolleado
      setIsScrolled(currentScrollY > 40);

      // Si está casi en la cima, siempre visible
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Haciendo scroll hacia abajo -> Ocultar header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Haciendo scroll hacia arriba -> Mostrar header
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-12 py-3.5 sm:py-4 flex items-center justify-between transition-all duration-300 ease-in-out pointer-events-none select-none ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#020716]/85 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        {/* Top-Left: Official Full Brand Logo from inicio.png */}
        <Link
          href="#inicio"
          className="pointer-events-auto flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1 transition-opacity hover:opacity-90"
          aria-label="Frontera Tech - Ir al inicio"
        >
          <div className="relative h-8 sm:h-10 w-auto flex items-center">
            <Image
              src="/images/brand_navbar_logo.png"
              alt="Frontera Tech"
              width={160}
              height={44}
              className="h-7 sm:h-9 w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
              priority
            />
          </div>
        </Link>

        {/* Top-Right: 'Iniciar Sesión' + 'Hablemos ↗' with golden border + 'Menú ☰' button */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-[#030d24]/70 border border-slate-700/80 hover:border-sky-500/60 hover:bg-sky-500/10 backdrop-blur-md transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            title="Iniciar Sesión de Administrador"
          >
            <LogIn className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden xs:inline sm:inline">Iniciar Sesión</span>
          </Link>

          <Link
            href="#contacto"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#030d24]/70 border border-[#f59e0b] hover:bg-[#f59e0b]/15 backdrop-blur-md transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
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
