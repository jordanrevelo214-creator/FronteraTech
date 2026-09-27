"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Laptop,
  CheckCircle,
  Truck,
  Activity,
  TrendingUp,
  Box,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { projectsData } from "@/data/projects";

const iconMap = {
  Truck,
  Activity,
  TrendingUp,
  Box,
};

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = projectsData.length;

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

  const activeProject = projectsData[currentIndex];
  const IconComponent =
    iconMap[activeProject.visualTheme.icon as keyof typeof iconMap] || Laptop;

  return (
    <section
      id="proyectos"
      className="py-20 md:py-28 relative bg-[#040710] overflow-hidden"
      aria-label="Proyectos de software"
    >
      <Container>
        <SectionHeader
          badge="Portafolio Técnico"
          title="Proyectos y capacidades de desarrollo"
          description="Casos conceptuales y proyectos demostrativos que ilustran nuestra metodología de arquitectura, diseño de interfaces e ingeniería de software."
        />

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-3xl p-1"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carrusel"
          aria-label="Carrusel de proyectos"
        >
          <MotionWrapper key={activeProject.id} direction="fade">
            <div className="rounded-3xl bg-slate-900/70 border border-slate-800/90 shadow-2xl p-6 sm:p-8 md:p-10 backdrop-blur-xl relative overflow-hidden">
              {/* Top Accent Gradient Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${activeProject.visualTheme.gradient}`}
              />

              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {activeProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {activeProject.badge}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Caso {currentIndex + 1} de {total}
                </div>
              </div>

              {/* Main Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Visual Representation Box */}
                <div className="md:col-span-5">
                  <div
                    className={`h-48 sm:h-56 rounded-2xl bg-gradient-to-br ${activeProject.visualTheme.gradient} border border-slate-700/60 p-6 flex flex-col justify-between relative overflow-hidden shadow-inner`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-950/60 flex items-center justify-center border border-white/10 text-white">
                        <IconComponent className="w-5 h-5 text-sky-400" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 bg-slate-900/60 px-2 py-1 rounded">
                        Mockup Interfaz
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="w-3/4 h-2 rounded bg-white/20" />
                      <div className="w-1/2 h-2 rounded bg-white/15" />
                      <div className="w-2/3 h-2 rounded bg-white/10" />
                    </div>

                    <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Arquitectura Validada</span>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeProject.name}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {activeProject.shortDescription}
                  </p>

                  {/* Problem Solved */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <p className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-1">
                      Problema que resuelve:
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeProject.problemSolved}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-2">
                      Stack Tecnológico:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Demo Link (conditional) */}
                  {activeProject.demoUrl && (
                    <div className="pt-2">
                      <a
                        href={activeProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors"
                      >
                        <span>Explorar arquitectura conceptual</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Controls Bar: Prev, Next & Indicators */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer shadow-md"
                aria-label="Proyecto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer shadow-md"
                aria-label="Proyecto siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Seleccionar proyecto">
              {projectsData.map((project, idx) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  role="tab"
                  aria-selected={currentIndex === idx}
                  aria-label={`Ir al proyecto ${idx + 1}: ${project.name}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-sky-400"
                      : "w-2 bg-slate-700 hover:bg-slate-600"
                  }`}
                />
              ))}
            </div>

            <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
              Usa las flechas del teclado o desliza con el dedo
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
