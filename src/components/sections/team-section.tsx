"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Code2,
  Cloud,
  Database,
  Atom,
  Cpu,
  Layers,
  PenTool,
  Palette,
  Terminal,
  Server,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { teamData as defaultTeamData, TeamMember } from "@/data/team";

interface TeamSectionProps {
  team?: TeamMember[];
}

export function TeamSection({ team = defaultTeamData }: TeamSectionProps) {
  const members = team && team.length > 0 ? team : defaultTeamData;
  const [showMonograms, setShowMonograms] = useState(false);

  // Helper to render tech icon badge
  const renderTechBadge = (iconType: string, label: string) => {
    switch (iconType) {
      case "code":
        return <Code2 className="w-4 h-4 text-sky-400" />;
      case "cloud":
        return <Cloud className="w-4 h-4 text-sky-400" />;
      case "database":
        return <Database className="w-4 h-4 text-sky-400" />;
      case "react":
        return <Atom className="w-4 h-4 text-cyan-400" />;
      case "js":
        return <span className="font-mono font-bold text-[10px] text-amber-300">JS</span>;
      case "python":
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case "server":
        return <Server className="w-4 h-4 text-indigo-400" />;
      case "figma":
        return <Layers className="w-4 h-4 text-purple-400" />;
      case "xd":
        return <span className="font-mono font-bold text-[10px] text-pink-400">Xd</span>;
      case "design":
        return <Palette className="w-4 h-4 text-sky-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <section
      id="equipo"
      className="py-10 sm:py-14 md:py-16 relative bg-transparent overflow-hidden select-none min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-center scroll-mt-14"
      aria-label="Equipo Humano y Talento de Ingeniería"
    >
      {/* ======================================================== */}
      {/* CYBERNETIC SCI-FI AMBIENT GRAPHICS EXACT TO REFERENCE     */}
      {/* ======================================================== */}

      {/* Top-Left: Mountain Ridge Laser Silhouette in background */}
      <div className="absolute top-2 left-0 w-80 sm:w-96 h-44 pointer-events-none opacity-40 lg:opacity-60 -z-10 hidden sm:block">
        <svg
          viewBox="0 0 380 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M 0 130 L 50 85 L 90 115 L 140 60 L 180 95 L 230 40 L 270 75 L 320 30 L 380 80"
            stroke="url(#teamMountLeft)"
            strokeWidth="1.8"
            fill="none"
            filter="drop-shadow(0 0 8px #0ea5e9)"
          />
          {/* Subtle Hexagon */}
          <polygon
            points="45,45 60,53 60,70 45,78 30,70 30,53"
            stroke="#0284c7"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="teamMountLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top-Right: Mountain Ridge Laser Silhouette & Laser swooshes */}
      <div className="absolute top-2 right-0 w-80 sm:w-96 h-44 pointer-events-none opacity-40 lg:opacity-60 -z-10 hidden sm:block">
        <svg
          viewBox="0 0 380 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M 0 80 L 60 30 L 110 75 L 150 40 L 200 95 L 240 60 L 290 115 L 330 85 L 380 130"
            stroke="url(#teamMountRight)"
            strokeWidth="1.8"
            fill="none"
            filter="drop-shadow(0 0 8px #0ea5e9)"
          />
          {/* Subtle Hexagon */}
          <polygon
            points="340,55 355,63 355,80 340,88 325,80 325,63"
            stroke="#0284c7"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="teamMountRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom corner laser beam glows */}
      <div className="absolute -bottom-8 -left-8 w-80 h-36 bg-gradient-to-tr from-sky-600/10 via-cyan-500/5 to-transparent blur-2xl pointer-events-none -z-10" />
      <div className="absolute -bottom-8 -right-8 w-80 h-36 bg-gradient-to-tl from-sky-600/10 via-cyan-500/5 to-transparent blur-2xl pointer-events-none -z-10" />

      <Container className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* ======================================================== */}
        {/* HEADER AREA: PILL, TITLE, SUBTITLE & HEX DIVIDER         */}
        {/* ======================================================== */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-sky-950/70 border border-sky-400/40 text-sky-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_16px_rgba(14,165,233,0.22)] mb-3 sm:mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="tracking-[0.2em] uppercase font-bold text-[10px] sm:text-xs">
              EQUIPO HUMANO
            </span>
          </div>

          {/* Section Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="text-white block sm:inline">Talento multidisciplinario de </span>
            <span className="text-sky-400 font-extrabold block sm:inline">ingeniería</span>
          </h2>

          {/* Subtitle Description */}
          <p className="mt-2 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
            Especialistas dedicados a construir arquitectura duradera, interfaces de usuario de alto impacto y soluciones tecnológicas confiables.
          </p>

          {/* Decorative Divider: Cyan Line + Amber Tech Hexagon + Amber Line */}
          <div className="flex items-center justify-center gap-2.5 my-3 sm:my-3.5">
            <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-sky-400" />
            <div className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 stroke-amber-400 fill-amber-400/10 shadow-[0_0_8px_#fbbf24]">
                <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" strokeWidth="2" />
              </svg>
            </div>
            <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4 GLASS CARDS GRID EXACT TO THE DESIGN                   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5.5 mt-5 sm:mt-6">
          {members.map((member, index) => (
            <MotionWrapper key={member.id} delay={index * 0.08} className="h-full">
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(3, 14, 40, 0.85) 0%, rgba(2, 9, 28, 0.80) 100%)",
                  boxShadow:
                    "0 0 35px -8px rgba(14, 165, 233, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
                }}
                className="rounded-[28px] sm:rounded-[32px] border border-sky-500/40 p-5 sm:p-6 backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between h-full group hover:border-sky-400/80 hover:shadow-[0_0_45px_rgba(14,165,233,0.32)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Cybernetic Corner Bracket Bevels */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-sky-400/40 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-sky-400/40 pointer-events-none" />

                <div>
                  {/* ======================================================== */}
                  {/* AVATAR / PHOTO CONTAINER: HEXAGONAL BADGE FRAME           */}
                  {/* Fits photo of the person or stylish monogram logo         */}
                  {/* ======================================================== */}
                  <div className="relative mx-auto mt-2 mb-4 w-20 h-20 sm:w-22 sm:h-22">
                    <div
                      style={{
                        background:
                          "linear-gradient(180deg, #38bdf8 0%, #0284c7 50%, #1e40af 100%)",
                        boxShadow: "0 0 22px rgba(14, 165, 233, 0.5), inset 0 1px 1px white",
                      }}
                      className="w-full h-full rounded-[22px] p-[2px] relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    >
                      {/* Member Photo OR Monogram Logo */}
                      {member.image && !showMonograms ? (
                        <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-[#04143a]">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="120px"
                            priority={index < 2}
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Subtle Monogram Chip in corner */}
                          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-slate-950/80 border border-sky-400/40 text-[9px] font-mono font-bold text-sky-300 backdrop-blur-sm">
                            {member.avatarText}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-[20px] bg-gradient-to-br from-[#072460] to-[#031130] flex items-center justify-center">
                          <span className="text-white font-extrabold text-xl sm:text-2xl font-mono tracking-wider drop-shadow-[0_2px_8px_rgba(0,229,255,0.6)]">
                            {member.avatarText}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title / Primary Role Heading */}
                  <h3 className="text-base sm:text-[17px] font-extrabold text-white tracking-tight leading-snug text-left mt-3">
                    {member.name}
                  </h3>

                  {/* Subtitle Role Tag */}
                  <p className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-wider text-sky-400 font-bold mt-1 text-left">
                    {member.role}
                  </p>

                  {/* Sleek Gradient Accent Line */}
                  <div className="w-12 h-1 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 my-2.5" />

                  {/* Description / Specialty */}
                  <p className="text-xs text-slate-300 leading-relaxed text-left mb-4">
                    {member.specialty}
                  </p>
                </div>

                {/* Bottom Row: Tech Icons Badges */}
                <div className="pt-3 border-t border-sky-500/20 mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {member.techIcons?.map((t, idx) => (
                      <div
                        key={idx}
                        title={t.label}
                        className="w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:border-sky-400/60 flex items-center justify-center shadow-sm transition-colors cursor-default"
                      >
                        {renderTechBadge(t.iconType, t.label)}
                      </div>
                    )) || (
                      <>
                        <div className="w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-sky-400">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-sky-400">
                          <Cloud className="w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-sky-400">
                          <Database className="w-4 h-4" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* External links: LinkedIn or GitHub */}
                  <div className="flex items-center gap-1.5">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-sky-400 text-slate-400 hover:text-white transition-all"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.githubUrl && (
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-sky-400 text-slate-400 hover:text-white transition-all"
                        aria-label={`GitHub de ${member.name}`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        {/* View Toggle (Photos <-> Monogram Badges) */}
        <div className="mt-5 sm:mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowMonograms(!showMonograms)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/50 hover:bg-slate-800/70 border border-slate-800 text-[11px] font-medium text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
          >
            <span>{showMonograms ? "Mostrar fotos de ingenieros" : "Ver insignias monograma (LA, FS, BC, PD)"}</span>
          </button>
        </div>
      </Container>
    </section>
  );
}
