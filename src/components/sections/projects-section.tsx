"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Truck,
  Activity,
  TrendingUp,
  Box,
  Shield,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { projectsData as defaultProjectsData, ProjectItem } from "@/data/projects";

const iconMap: Record<string, typeof Truck> = {
  Truck,
  Activity,
  TrendingUp,
  Box,
  Shield,
  Laptop,
};

// Fallback images for projects if not specified
const projectImageMap: Record<string, string> = {
  "plataforma-logistica-saas": "/images/projects/nexus-fleet.jpg",
  "portal-medico-telemedicina": "/images/projects/carepulse.jpg",
  "dashboard-financiero-analytics": "/images/projects/finvantage.jpg",
  "app-movil-retail-field": "/images/projects/omnistock.jpg",
  "ciberseguridad-soc-analytics": "/images/projects/cyberguard.jpg",
};

interface ProjectsSectionProps {
  projects?: ProjectItem[];
}

export function ProjectsSection({ projects = defaultProjectsData }: ProjectsSectionProps) {
  const currentProjects = projects && projects.length > 0 ? projects : defaultProjectsData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<"TODOS" | "CREAMOS" | "INNOVAMOS" | "TRANSFORMAMOS">("INNOVAMOS");
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = currentProjects.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeProject = currentProjects[currentIndex] || currentProjects[0];
  const IconComponent =
    iconMap[activeProject.visualTheme?.icon as keyof typeof iconMap] || Laptop;

  const imageSrc =
    activeProject.image ||
    projectImageMap[activeProject.id] ||
    "/images/projects/nexus-fleet.jpg";

  // Helper to split title into main part and highlighted last part
  const renderFormattedTitle = (title: string) => {
    if (title.includes(" - ")) {
      const parts = title.split(" - ");
      const prefix = parts[0] + " - ";
      const rest = parts.slice(1).join(" - ");

      // Split rest into main sentence and last highlighted phrase if applicable
      const words = rest.split(" ");
      if (words.length > 2) {
        const firstWords = words.slice(0, words.length - 2).join(" ");
        const highlighted = words.slice(words.length - 2).join(" ");
        return (
          <>
            <span className="text-white font-bold">{prefix + firstWords} </span>
            <span className="text-sky-400 font-extrabold">{highlighted}</span>
          </>
        );
      }
      return (
        <>
          <span className="text-white font-bold">{prefix}</span>
          <span className="text-sky-400 font-extrabold">{rest}</span>
        </>
      );
    }

    const words = title.split(" ");
    if (words.length > 2) {
      const main = words.slice(0, -2).join(" ");
      const last = words.slice(-2).join(" ");
      return (
        <>
          <span className="text-white font-bold">{main} </span>
          <span className="text-sky-400 font-extrabold">{last}</span>
        </>
      );
    }

    return <span className="text-white font-bold">{title}</span>;
  };

  return (
    <section
      id="proyectos"
      className="py-16 sm:py-24 md:py-28 relative bg-transparent overflow-hidden select-none"
      aria-label="Portafolio Técnico y Casos de Éxito"
    >
      {/* ======================================================== */}
      {/* CYBERNETIC SCI-FI AMBIENT GRAPHICS & CIRCUIT ACCENTS      */}
      {/* ======================================================== */}
      {/* Top right cyber circuit traces & hexagon */}
      <div className="absolute top-8 right-0 w-80 h-72 pointer-events-none opacity-40 -z-10 hidden sm:block">
        <svg
          viewBox="0 0 320 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Hexagon */}
          <polygon
            points="280,30 305,45 305,75 280,90 255,75 255,45"
            stroke="#0ea5e9"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          {/* Circuit Lines */}
          <path
            d="M 320 60 L 255 60 L 210 105 L 140 105 L 110 135 L 40 135"
            stroke="#0284c7"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <circle cx="210" cy="105" r="2.5" fill="#38bdf8" />
          <circle cx="110" cy="135" r="2.5" fill="#38bdf8" />
          <path
            d="M 320 180 L 240 180 L 200 220 L 120 220"
            stroke="#0369a1"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Bottom left cybernetic angled tech wings & traces */}
      <div className="absolute bottom-0 left-0 w-96 h-80 pointer-events-none opacity-45 -z-10 hidden sm:block">
        <svg
          viewBox="0 0 380 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Layered Cyber Wing Bevels */}
          <path
            d="M -20 280 L 60 280 L 120 220 L 120 160 L 60 220 L -20 220 Z"
            fill="url(#blueCyberGrad)"
            opacity="0.4"
          />
          <path
            d="M -20 260 L 80 260 L 150 190 L 230 190"
            stroke="#0ea5e9"
            strokeWidth="1.8"
            opacity="0.6"
          />
          <circle cx="150" cy="190" r="3" fill="#00e5ff" />
          <circle cx="230" cy="190" r="2" fill="#38bdf8" />
          {/* Subtle Hex grid trace */}
          <polygon
            points="40,160 55,170 55,188 40,198 25,188 25,170"
            stroke="#0284c7"
            strokeWidth="1"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="blueCyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle Cyan ambient glow spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <Container className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* ======================================================== */}
        {/* TOP HEADER EXACT TO REFERENCE                            */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-12">
          {/* Left Column: Badge, Title & Subtitle */}
          <div className="max-w-xl">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_#f59e0b]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
                CASOS DE ÉXITO
              </span>
              <span className="w-10 h-[1.5px] bg-gradient-to-r from-sky-400 to-transparent inline-block ml-1" />
            </div>

            {/* Main Section Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              <span className="text-white block sm:inline">Proyectos que generan </span>
              <span className="text-sky-400 font-extrabold block sm:inline">valor real</span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3 max-w-lg">
              Conoce algunos de los proyectos en los que hemos trabajado, resolviendo desafíos tecnológicos y ayudando a nuestros clientes a crecer.
            </p>
          </div>

          {/* Right Column: Cybernetic Segmented Tabs & Horizontal Guide Line */}
          <div className="flex items-center gap-3 self-start lg:self-center">
            {/* Horizontal cyan guide line connecting to tabs */}
            <div className="hidden xl:flex items-center">
              <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-sky-500/50 to-sky-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            </div>

            {/* Segmented Pill Tabs */}
            <div className="p-1.5 rounded-full bg-[#030d24]/90 border border-sky-500/35 backdrop-blur-xl flex items-center gap-1 shadow-[0_0_25px_rgba(14,165,233,0.15)]">
              <button
                type="button"
                onClick={() => {
                  setActiveFilter("CREAMOS");
                  goToSlide(0);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeFilter === "CREAMOS"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_0_16px_rgba(14,165,233,0.6)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Creamos</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveFilter("INNOVAMOS");
                  goToSlide(0);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeFilter === "INNOVAMOS"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_0_16px_rgba(14,165,233,0.6)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#00e5ff]" />
                <span>Innovamos</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveFilter("TRANSFORMAMOS");
                  goToSlide(2);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeFilter === "TRANSFORMAMOS"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_0_16px_rgba(14,165,233,0.6)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Transformamos</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN FEATURED CARD EXACT TO THE DESIGN                   */}
        {/* ======================================================== */}
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-[32px]"
          aria-roledescription="carrusel"
          aria-label="Carrusel de proyectos destacados"
        >
          <MotionWrapper key={activeProject.id} direction="fade">
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(3, 14, 38, 0.90) 0%, rgba(2, 9, 26, 0.85) 100%)",
                boxShadow:
                  "0 0 50px -10px rgba(14, 165, 233, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
              }}
              className="rounded-[30px] sm:rounded-[36px] border border-sky-500/40 p-5 sm:p-7 md:p-8 backdrop-blur-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-center">
                {/* ---------------------------------------------------- */}
                {/* LEFT COLUMN: REALISTIC DEVICE MOCKUP IMAGE & ARROWS */}
                {/* ---------------------------------------------------- */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-sky-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.6)] aspect-[16/10] bg-slate-950 group">
                    {/* Mockup High-Resolution Image */}
                    <Image
                      src={imageSrc}
                      alt={activeProject.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Edge Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />

                    {/* Top-Left Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/40 text-sky-300 text-xs font-semibold backdrop-blur-md shadow-lg">
                        <IconComponent className="w-3.5 h-3.5 text-sky-400" />
                        <span>{activeProject.category}</span>
                      </div>
                    </div>

                    {/* Navigation Arrow: PREV (on left edge of image) */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#030d24]/80 hover:bg-sky-950/90 border border-sky-500/50 hover:border-sky-300 text-sky-300 hover:text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95 z-20"
                      aria-label="Proyecto anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Navigation Arrow: NEXT (on right edge of image) */}
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#030d24]/80 hover:bg-sky-950/90 border border-sky-500/50 hover:border-sky-300 text-sky-300 hover:text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95 z-20"
                      aria-label="Proyecto siguiente"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* RIGHT COLUMN: PROJECT INFORMATION & VALUE PROPOSITION */}
                {/* ---------------------------------------------------- */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-5 text-left">
                  {/* Top Row: Status Badge & Case Counter + Progress Bar */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Status Badge: Golden Checkmark Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 border border-amber-400/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{activeProject.badge || "Proyecto Completo"}</span>
                    </div>

                    {/* Progress Indicator: 'Caso 1 de 5' + Glowing Cyan Bar */}
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-slate-400 font-mono tracking-wider">
                        Caso {currentIndex + 1} de {total}
                      </span>
                      <div className="w-24 sm:w-32 h-1 bg-slate-800/90 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full transition-all duration-300 shadow-[0_0_8px_#00e5ff]"
                          style={{
                            width: `${((currentIndex + 1) / total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title with Cyan Highlighted text */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-snug">
                    {renderFormattedTitle(activeProject.name)}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {activeProject.shortDescription}
                  </p>

                  {/* Highlight Callout Box: 'PROBLEMA QUE RESUELVE' */}
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(8, 28, 64, 0.65) 0%, rgba(3, 14, 38, 0.75) 100%)",
                    }}
                    className="p-3.5 sm:p-4 rounded-2xl border border-sky-500/40 shadow-inner flex items-start gap-3 sm:gap-4"
                  >
                    {/* Glowing Target Bullseye Icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sky-500/20 border border-sky-400/50 text-sky-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.35)]">
                      <Target className="w-5 h-5 text-sky-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
                        PROBLEMA QUE RESUELVE
                      </p>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {activeProject.problemSolved}
                      </p>
                    </div>
                  </div>

                  {/* Stack Tecnológico */}
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      TECNOLOGÍAS UTILIZADAS
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-[#040f26]/90 text-slate-200 border border-slate-700/80 hover:border-sky-500/60 transition-colors shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link: 'Explorar arquitectura conceptual ↗' */}
                  <div className="pt-1">
                    <a
                      href={activeProject.demoUrl || "#contacto"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors group cursor-pointer"
                    >
                      <span className="group-hover:underline underline-offset-4">
                        Explorar arquitectura conceptual
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* ======================================================== */}
          {/* BOTTOM CONTROLS & PAGINATION PILLS                       */}
          {/* ======================================================== */}
          <div className="flex items-center justify-center gap-4 mt-7 sm:mt-8">
            {/* Left Circular Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#030d24]/90 border border-sky-500/40 text-sky-400 hover:text-white hover:border-sky-300 hover:bg-sky-500/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slide Dots / Elongated Active Pill */}
            <div
              className="flex items-center gap-2 px-2"
              role="tablist"
              aria-label="Seleccionar caso de proyecto"
            >
              {currentProjects.map((project, idx) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  role="tab"
                  aria-selected={currentIndex === idx}
                  aria-label={`Ir al caso ${idx + 1}: ${project.name}`}
                  className={`transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 sm:w-9 h-2 sm:h-2.5 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 shadow-[0_0_12px_#00e5ff]"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-700/80 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>

            {/* Right Circular Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#030d24]/90 border border-sky-500/40 text-sky-400 hover:text-white hover:border-sky-300 hover:bg-sky-500/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
              aria-label="Proyecto siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
