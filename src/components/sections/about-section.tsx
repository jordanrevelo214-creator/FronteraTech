"use client";

import React from "react";
import {
  Target,
  Compass,
  ShieldCheck,
  Zap,
  Sparkles,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { aboutData } from "@/data/about";

const valueIcons = {
  ShieldCheck,
  Zap,
  Sparkles,
  Users,
};

export function AboutSection() {
  return (
    <section
      id="nosotros"
      className="py-20 md:py-28 relative bg-[#060913] border-t border-slate-900"
      aria-label="Acerca de Frontera Tech"
    >
      <Container>
        <SectionHeader
          badge="Sobre Frontera Tech"
          title="Quiénes somos y qué nos mueve"
          description={aboutData.overview.headline}
        />

        {/* Corporate Overview & Helper note */}
        <MotionWrapper delay={0.1}>
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {aboutData.overview.description}
            </p>
            <p className="text-xs text-slate-500 italic font-mono">
              {aboutData.overview.noteProvisional}
            </p>
          </div>
        </MotionWrapper>

        {/* Mission & Vision: Balanced Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <MotionWrapper delay={0.2} className="h-full">
            <div className="h-full flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-10 relative overflow-hidden group hover:border-sky-500/40 transition-colors">
              <div className="absolute top-0 right-0 p-8 text-sky-500/10 pointer-events-none">
                <Target className="w-24 h-24" />
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {aboutData.mission.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {aboutData.mission.statement}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 mt-auto">
                <p className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-3 font-semibold">
                  Compromisos clave:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {aboutData.mission.focalPoints.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionWrapper>

          {/* Vision Card */}
          <MotionWrapper delay={0.3} className="h-full">
            <div className="h-full flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-10 relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
              <div className="absolute top-0 right-0 p-8 text-indigo-500/10 pointer-events-none">
                <Compass className="w-24 h-24" />
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {aboutData.vision.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {aboutData.vision.statement}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 mt-auto">
                <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3 font-semibold">
                  Horizontes estratégicos:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {aboutData.vision.focalPoints.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionWrapper>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Nuestros Principios de Trabajo
            </h3>
            <p className="text-sm text-slate-400">
              Valores que guían cada línea de código y cada interacción profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((val, idx) => {
              const IconComp = valueIcons[val.iconName] || Sparkles;
              return (
                <MotionWrapper key={val.title} delay={idx * 0.08}>
                  <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors h-full flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">
                      {val.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-auto">
                      {val.description}
                    </p>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </div>

        {/* Methodology / Process */}
        <div className="rounded-3xl bg-slate-950/70 border border-slate-800/80 p-8 sm:p-12">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
              Metodología
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Cómo convertimos tu idea en un producto funcional
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.process.map((step) => (
              <div
                key={step.step}
                className="relative p-5 rounded-2xl bg-slate-900/50 border border-slate-800"
              >
                <div className="text-2xl font-extrabold font-mono text-sky-400/40 mb-3">
                  {step.step}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
