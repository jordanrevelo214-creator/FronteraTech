"use client";

import React, { useState } from "react";
import {
  Target,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Users,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { aboutData as defaultAboutData, AboutData } from "@/data/about";

const valueIcons = {
  ShieldCheck,
  Zap,
  Sparkles,
  Users,
};

interface AboutSectionProps {
  data?: AboutData;
}

export function AboutSection({ data = defaultAboutData }: AboutSectionProps) {
  const currentData = data || defaultAboutData;
  const [showExtendedDetails, setShowExtendedDetails] = useState(false);

  return (
    <section
      id="nosotros"
      className="py-10 sm:py-14 md:py-16 relative bg-transparent overflow-hidden select-none min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-center scroll-mt-14"
      aria-label="Sobre Frontera Tech"
    >
      {/* ======================================================== */}
      {/* CYBERNETIC SCI-FI AMBIENT GRAPHICS EXACT TO REFERENCE     */}
      {/* ======================================================== */}

      {/* Top-Left: Glowing 3D Cyber Hexagon with "FT" and Orbital Neon Arc */}
      <div className="absolute top-4 sm:top-10 left-2 sm:left-6 w-56 sm:w-72 h-56 sm:h-72 pointer-events-none select-none opacity-60 lg:opacity-75 -z-10">
        <svg
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Orbital Neon Blue Arc */}
          <path
            d="M 20 180 A 130 130 0 0 1 180 20"
            stroke="url(#cyanArcGrad)"
            strokeWidth="2.5"
            strokeDasharray="180 8"
            opacity="0.8"
          />
          {/* Mini Floating Hexagon */}
          <polygon
            points="35,65 50,73 50,90 35,98 20,90 20,73"
            stroke="#0ea5e9"
            strokeWidth="1.2"
            fill="rgba(14, 165, 233, 0.08)"
            opacity="0.6"
          />
          <polygon
            points="145,15 155,20 155,32 145,37 135,32 135,20"
            stroke="#38bdf8"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />

          {/* Main 3D Glass Hexagon */}
          <polygon
            points="130,55 195,92 195,168 130,205 65,168 65,92"
            fill="url(#hexInteriorGrad)"
            stroke="url(#hexBorderGrad)"
            strokeWidth="2"
          />

          {/* Geometric "FT" Letters centered inside Hexagon */}
          <g filter="url(#glowFT)" opacity="0.95">
            {/* Letter 'F' */}
            <path
              d="M 98 108 L 126 108 L 126 117 L 109 117 L 109 126 L 124 126 L 124 135 L 109 135 L 109 154 L 98 154 Z"
              fill="#38bdf8"
            />
            {/* Letter 'T' */}
            <path
              d="M 132 108 L 164 108 L 164 117 L 153 117 L 153 154 L 143 154 L 143 117 L 132 117 Z"
              fill="#00e5ff"
            />
          </g>

          <defs>
            <linearGradient id="cyanArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="hexInteriorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#031a4a" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#02091c" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="hexBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glowFT" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00e5ff" floodOpacity="0.6" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Top-Right: Mountain Laser Wireframe Skyline & Pillars Label */}
      <div className="absolute top-3 sm:top-6 right-0 w-80 sm:w-96 h-48 pointer-events-none select-none opacity-50 lg:opacity-75 -z-10 hidden sm:block">
        <div className="absolute top-2 right-8 flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400/90 uppercase">
          <span>Creamos</span>
          <span className="w-1 h-1 rounded-full bg-sky-400" />
          <span className="text-white">Innovamos</span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span>Transformamos</span>
        </div>

        {/* Mountain Silhouette / Laser Ridge SVG */}
        <svg
          viewBox="0 0 380 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full mt-4"
        >
          {/* Neon mountain ridge wave */}
          <path
            d="M 60 140 L 110 110 L 140 125 L 180 85 L 210 100 L 250 55 L 280 80 L 330 35 L 380 70"
            stroke="url(#mountainGrad)"
            strokeWidth="2"
            fill="none"
            filter="drop-shadow(0 0 6px #0ea5e9)"
          />
          <path
            d="M 80 150 L 130 125 L 160 140 L 200 100 L 230 115 L 270 70 L 300 95 L 350 50 L 380 85"
            stroke="#0284c7"
            strokeWidth="1"
            opacity="0.3"
            fill="none"
          />
          {/* Cyber Dots Grid */}
          <g fill="#0ea5e9" opacity="0.35">
            <circle cx="250" cy="55" r="2.5" />
            <circle cx="330" cy="35" r="2.5" />
            <circle cx="180" cy="85" r="2" />
            <circle cx="360" cy="110" r="1.5" />
            <circle cx="370" cy="110" r="1.5" />
            <circle cx="360" cy="120" r="1.5" />
            <circle cx="370" cy="120" r="1.5" />
          </g>
          {/* Corner Tech Hexagon */}
          <polygon
            points="360,135 375,143 375,160 360,168 345,160 345,143"
            stroke="#0ea5e9"
            strokeWidth="1.2"
            fill="none"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#00e5ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom corner cyber laser beams */}
      <div className="absolute -bottom-10 -left-10 w-96 h-40 bg-gradient-to-tr from-sky-600/10 via-cyan-500/5 to-transparent blur-2xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 -right-10 w-96 h-40 bg-gradient-to-tl from-sky-600/10 via-cyan-500/5 to-transparent blur-2xl pointer-events-none -z-10" />

      <Container className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* ======================================================== */}
        {/* HEADER AREA: PILL, TITLE, HEADLINE & INTRO PARAGRAPH    */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-sky-950/70 border border-sky-400/40 text-sky-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_16px_rgba(14,165,233,0.22)] mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="tracking-[0.2em] uppercase font-bold text-[10px] sm:text-xs">
              SOBRE FRONTERA TECH
            </span>
          </div>

          {/* Section Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="text-white block sm:inline">Quiénes somos y </span>
            <span className="text-sky-400 font-extrabold block sm:inline">qué nos mueve</span>
          </h2>

          {/* Subtitle Headline */}
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-300 font-medium leading-relaxed">
            {currentData.overview.headline}
          </p>

          {/* Decorative Laser Divider: Cyan Line + Amber Ring + Amber Line */}
          <div className="flex items-center justify-center gap-2.5 my-3 sm:my-4">
            <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-sky-400" />
            <span className="w-2.5 h-2.5 rounded-full border border-amber-400 bg-transparent flex items-center justify-center shadow-[0_0_8px_#fbbf24]" />
            <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* Concise Corporate Overview Paragraph */}
          <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-2xl mx-auto">
            {currentData.overview.description}
          </p>
        </div>

        {/* ======================================================== */}
        {/* DUAL GLASS CARDS: MISIÓN & VISIÓN EXACT TO REFERENCE     */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 mt-6 sm:mt-8">
          {/* --- CARD 1: NUESTRA MISIÓN --- */}
          <MotionWrapper delay={0.1} className="h-full">
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(3, 14, 40, 0.85) 0%, rgba(2, 9, 28, 0.80) 100%)",
                boxShadow:
                  "0 0 35px -8px rgba(14, 165, 233, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
              }}
              className="rounded-[28px] sm:rounded-[32px] border border-sky-500/40 p-5 sm:p-7 backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between h-full group hover:border-sky-400/60 transition-all duration-300"
            >
              {/* Subtle Hexagon Corner Silhouette in card background */}
              <div className="absolute top-2 right-2 w-24 h-24 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-sky-400">
                  <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" strokeWidth="2" />
                </svg>
              </div>

              <div>
                {/* Header: Icon + Category + Title */}
                <div className="flex items-center gap-3.5 mb-3.5 sm:mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-400 shadow-[0_0_18px_rgba(14,165,233,0.35)] shrink-0">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 block leading-tight">
                      NUESTRA
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                      Misión
                    </h3>
                  </div>
                </div>

                {/* Mission Statement */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {currentData.mission.statement}
                </p>
              </div>

              {/* Bottom Subsection: COMPROMISOS CLAVE */}
              <div className="pt-4 sm:pt-5 border-t border-sky-500/20 mt-auto">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-2.5">
                  COMPROMISOS CLAVE
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {currentData.mission.focalPoints.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionWrapper>

          {/* --- CARD 2: NUESTRA VISIÓN --- */}
          <MotionWrapper delay={0.2} className="h-full">
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(3, 14, 40, 0.85) 0%, rgba(2, 9, 28, 0.80) 100%)",
                boxShadow:
                  "0 0 35px -8px rgba(14, 165, 233, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
              }}
              className="rounded-[28px] sm:rounded-[32px] border border-sky-500/40 p-5 sm:p-7 backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between h-full group hover:border-sky-400/60 transition-all duration-300"
            >
              {/* Subtle Hexagon Corner Silhouette in card background */}
              <div className="absolute top-2 right-2 w-24 h-24 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-sky-400">
                  <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" strokeWidth="2" />
                </svg>
              </div>

              <div>
                {/* Header: Icon + Category + Title */}
                <div className="flex items-center gap-3.5 mb-3.5 sm:mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-400 shadow-[0_0_18px_rgba(14,165,233,0.35)] shrink-0">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 block leading-tight">
                      NUESTRA
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                      Visión
                    </h3>
                  </div>
                </div>

                {/* Vision Statement */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {currentData.vision.statement}
                </p>
              </div>

              {/* Bottom Subsection: HORIZONTES ESTRATÉGICOS */}
              <div className="pt-4 sm:pt-5 border-t border-sky-500/20 mt-auto">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-2.5">
                  HORIZONTES ESTRATÉGICOS
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {currentData.vision.focalPoints.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionWrapper>
        </div>

        {/* ======================================================== */}
        {/* COLLAPSIBLE EXTENDED PRINCIPLES & METHODOLOGY            */}
        {/* Keeps screen clean and compact, preserves all CMS data   */}
        {/* ======================================================== */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowExtendedDetails(!showExtendedDetails)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 hover:border-sky-500/40 text-xs font-semibold text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-sm cursor-pointer"
          >
            <span>{showExtendedDetails ? "Ocultar principios y metodología" : "Conocer nuestros 4 principios y metodología"}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showExtendedDetails ? "rotate-180 text-sky-400" : ""}`} />
          </button>
        </div>

        {showExtendedDetails && (
          <div className="mt-8 space-y-8 animate-in fade-in duration-300">
            {/* Core Values */}
            <div>
              <div className="text-center max-w-xl mx-auto mb-6">
                <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                  Nuestros Principios de Trabajo
                </h4>
                <p className="text-xs text-slate-400">
                  Valores que guían cada línea de código y cada interacción profesional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentData.values.map((val, idx) => {
                  const IconComp = (valueIcons as Record<string, typeof Sparkles>)[val.iconName] || Sparkles;
                  return (
                    <div
                      key={val.title || idx}
                      className="p-5 rounded-2xl bg-[#030e28]/70 border border-sky-500/30 hover:border-sky-400/50 transition-all flex flex-col"
                    >
                      <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-3 border border-sky-400/30">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1.5">{val.title}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed mt-auto">
                        {val.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Methodology / Process */}
            <div className="rounded-3xl bg-[#030e28]/70 border border-sky-500/30 p-6 sm:p-8">
              <div className="max-w-xl mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                  METODOLOGÍA
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Cómo convertimos tu idea en un producto funcional
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentData.process.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800"
                  >
                    <div className="text-xl font-extrabold font-mono text-sky-400/60 mb-2">
                      {step.step}
                    </div>
                    <h5 className="text-xs font-bold text-white mb-1">{step.title}</h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
