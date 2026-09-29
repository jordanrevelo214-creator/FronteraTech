"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { StaticFallback } from "./static-fallback";

const SceneCanvas = dynamic(
  () => import("./scene-canvas").then((mod) => mod.SceneCanvas),
  { ssr: false }
);

const CosmicStarsCursor = dynamic(
  () => import("./cosmic-stars-cursor").then((mod) => mod.CosmicStarsCursor),
  { ssr: false }
);

export function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check WebGL and reduced-motion capabilities
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPrefersReducedMotion(true);
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (prefersReducedMotion || !hasWebGL) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8, // Ultra-fluid, smooth momentum damping
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [prefersReducedMotion, hasWebGL]);

  if (prefersReducedMotion || !hasWebGL) {
    return <StaticFallback />;
  }

  // --- Animation Phase Calculations ---

  // Text 1: 0 - 20% (Hero Brand from inicio.png)
  let text1Opacity = 1;
  let text1TranslateY = 0;
  if (progress > 0.16) {
    const fadeOutP = Math.min(1, (progress - 0.16) / 0.14);
    text1Opacity = 1 - fadeOutP;
    text1TranslateY = -24 * fadeOutP;
  }

  // Text 2: 45 - 65% (Flower-like modular transformation)
  let text2Opacity = 0;
  let text2TranslateY = 20;
  if (progress >= 0.38 && progress <= 0.72) {
    if (progress < 0.48) {
      const fadeInP = (progress - 0.38) / 0.1;
      text2Opacity = fadeInP;
      text2TranslateY = 20 * (1 - fadeInP);
    } else if (progress <= 0.62) {
      text2Opacity = 1;
      text2TranslateY = 0;
    } else {
      const fadeOutP = (progress - 0.62) / 0.1;
      text2Opacity = 1 - fadeOutP;
      text2TranslateY = -20 * fadeOutP;
    }
  }

  // Text 3: 85 - 100% (Transition out)
  let text3Opacity = 0;
  let text3TranslateY = 15;
  if (progress >= 0.82) {
    const fadeInP = Math.min(1, (progress - 0.82) / 0.12);
    text3Opacity = fadeInP;
    text3TranslateY = 15 * (1 - fadeInP);
  }

  // Dynamic Phase Step: 01 / 05, 02 / 05, etc.
  const phaseStep =
    progress < 0.2
      ? "01"
      : progress < 0.45
      ? "02"
      : progress < 0.65
      ? "03"
      : progress < 0.85
      ? "04"
      : "05";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#020716] text-white"
      id="inicio"
    >
      {/* Sticky 100vh Viewport */}
      <div
        ref={viewportRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center select-none"
      >
        {/* Deep Cosmic Radial Vignette matching inicio.png */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_#071b48_0%,_#030d25_45%,_#010511_100%)] pointer-events-none -z-20" />

        {/* Luminous Core Halo behind 3D Hexagon */}
        <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Luz interactiva que sigue el cursor + Campo estelar de fondo */}
        <CosmicStarsCursor />

        {/* 3D WebGL Canvas Layer (Three.js + R3F) */}
        <SceneCanvas progress={progress} />

        {/* --- SECTION 1: Intro Brand from inicio.png (0 - 20%) --- */}
        <div
          className="absolute top-[56%] inset-x-0 z-20 flex flex-col items-center text-center px-4 transition-transform duration-75"
          style={{
            opacity: text1Opacity,
            transform: `translateY(${text1TranslateY}px)`,
            pointerEvents: text1Opacity < 0.2 ? "none" : "auto",
            display: text1Opacity <= 0 ? "none" : "flex",
          }}
        >
          {/* Subtitle: DESARROLLO DE SOFTWARE */}
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-cyan-200/80 font-semibold drop-shadow-[0_2px_8px_rgba(0,229,255,0.4)]">
            DESARROLLO DE SOFTWARE
          </span>

          {/* Authentic Mountain Contour + FronteraTech Brand Image (Crystal-Clear HD) */}
          <div className="mt-1.5 relative w-[280px] sm:w-[360px] md:w-[410px] h-14 sm:h-18 md:h-20 flex items-center justify-center">
            <Image
              src="/images/hero_mountain_title_v3.png"
              alt="Frontera Tech"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-contain drop-shadow-[0_2px_16px_rgba(255,255,255,0.2)]"
              priority
            />
          </div>

          {/* Tagline */}
          <p className="mt-1 text-xs sm:text-sm md:text-base text-slate-200/90 font-normal tracking-wide max-w-lg mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Automatizamos tus procesos, impulsamos tu crecimiento.
          </p>

          {/* Call to Action: Conversemos ↗ (Golden Border Pill) */}
          <Link
            href="#contacto"
            className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-6 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium text-white bg-[#030d24]/80 border border-[#f59e0b] hover:bg-[#f59e0b]/15 backdrop-blur-md transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer"
          >
            <span>Conversemos</span>
            <ArrowUpRight className="w-4 h-4 text-[#f59e0b]" />
          </Link>

          {/* Mouse Scroll Indicator: DESPLÁZATE PARA DESCUBRIR */}
          <div className="mt-4 sm:mt-6 flex flex-col items-center gap-1.5 opacity-80 pointer-events-none">
            <div className="w-4 sm:w-5 h-7 sm:h-8 rounded-full border border-slate-500/80 flex items-start justify-center p-1">
              <div className="w-1.5 h-2 rounded-full bg-cyan-400 animate-bounce shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-slate-400">
              DESPLÁZATE PARA DESCUBRIR
            </span>
          </div>
        </div>

        {/* --- SECTION 2: Transformation Message (45 - 65%) --- */}
        <div
          className="absolute inset-x-0 bottom-20 sm:bottom-24 z-20 flex flex-col items-center text-center px-6 pointer-events-none transition-transform duration-75"
          style={{
            opacity: text2Opacity,
            transform: `translateY(${text2TranslateY}px)`,
            display: text2Opacity <= 0 ? "none" : "flex",
          }}
        >
          <div className="max-w-xl mx-auto space-y-3 bg-[#030d24]/75 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-sky-400/25 shadow-2xl shadow-sky-950/60">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
              Arquitectura Modular
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,229,255,0.3)]">
              Transformamos ideas en software.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              Cada componente se desacopla con precisión, permitiendo una
              escalabilidad modular sin fricción para tu empresa.
            </p>
          </div>
        </div>

        {/* --- SECTION 3: Transition to Next Phase (85 - 100%) --- */}
        <div
          className="absolute inset-x-0 bottom-16 sm:bottom-20 z-20 flex flex-col items-center text-center px-6 pointer-events-none transition-transform duration-75"
          style={{
            opacity: text3Opacity,
            transform: `translateY(${text3TranslateY}px)`,
            display: text3Opacity <= 0 ? "none" : "flex",
          }}
        >
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Etapa completada
            </p>
            <p className="text-lg sm:text-xl font-bold text-white">
              Explora nuestros servicios y proyectos
            </p>
            <div className="pt-2 text-slate-400 text-sm animate-pulse">
              ↓ Continúa bajando
            </div>
          </div>
        </div>

        {/* --- PERIMETER UI from inicio.png --- */}

        {/* Bottom-Left: INGENIERÍA · DISEÑO · DESARROLLO */}
        <div className="absolute bottom-5 sm:bottom-6 left-6 sm:left-12 z-30 pointer-events-none">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400/80">
            INGENIERÍA · DISEÑO · DESARROLLO
          </span>
        </div>

        {/* Bottom-Right: Hecho para avanzar — */}
        <div className="absolute bottom-5 sm:bottom-6 right-6 sm:right-12 z-30 pointer-events-none flex items-center gap-2">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400/80">
            Hecho para avanzar
          </span>
          <span className="w-5 sm:w-6 h-[1.5px] bg-[#f59e0b] inline-block shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
        </div>

        {/* Right-Side Progress Track with Step Counter (01 / 05) */}
        <div
          className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none select-none"
          aria-hidden="true"
        >
          <div className="w-[2px] h-32 sm:h-44 bg-slate-800/80 rounded-full overflow-hidden p-0 relative">
            <div
              className="w-full bg-gradient-to-b from-cyan-400 via-sky-400 to-[#f59e0b] rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(0,229,255,0.8)]"
              style={{ height: `${Math.max(6, progress * 100)}%` }}
            />
          </div>
          <span className="font-mono text-[11px] tracking-widest text-slate-400 font-semibold">
            {phaseStep} / 05
          </span>
        </div>
      </div>
    </div>
  );
}
