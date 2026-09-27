"use client";

import React from "react";
import { ArrowRight, Sparkles, Terminal, CheckCircle2, Shield, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { companyData } from "@/data/company";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-gradient"
      aria-label="Presentación e inicio"
    >
      {/* Decorative background grid and blur circles */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 text-left space-y-6">
            <MotionWrapper delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Ingeniería de Software &bull; Frontera Tech</span>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Desarrollamos software{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
                  que impulsa tu empresa
                </span>
                .
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
                {companyData.shortDescription}
              </p>
            </MotionWrapper>

            {/* Action Buttons */}
            <MotionWrapper delay={0.4}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button href="#contacto" variant="primary" size="lg" className="group">
                  <span>Cuéntanos tu idea</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button href="#proyectos" variant="secondary" size="lg">
                  Ver proyectos
                </Button>
              </div>
            </MotionWrapper>

            {/* Quality Badges */}
            <MotionWrapper delay={0.5}>
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Código Limpio</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <Shield className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Seguridad Robusta</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Arquitectura Ágil</span>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Right Column: Visual Software Composition */}
          <div className="lg:col-span-5 relative">
            <MotionWrapper delay={0.35} direction="fade">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Glass Frame */}
                <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-sky-950/40 overflow-hidden">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/90 bg-slate-950/60">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <Terminal className="w-3.5 h-3.5 text-sky-400" />
                      <span>frontera-core.engine.ts</span>
                    </div>
                    <span className="w-4" />
                  </div>

                  {/* Window Content */}
                  <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 space-y-2 bg-[#090d18]/90">
                    <div className="text-slate-500">// Arquitectura orientada a escalabilidad</div>
                    <div>
                      <span className="text-indigo-400">export async function</span>{" "}
                      <span className="text-sky-300">buildEnterpriseSolution</span>(
                      <span className="text-amber-300">clientNeeds</span>:{" "}
                      <span className="text-emerald-400">Requirements</span>
                      ) &#123;
                    </div>
                    <div className="pl-4 text-slate-400">
                      <span className="text-indigo-400">const</span> stack = [
                      <span className="text-emerald-300">&quot;Next.js&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;TypeScript&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Cloud Native&quot;</span>];
                    </div>
                    <div className="pl-4">
                      <span className="text-indigo-400">return await</span> deploySecureSystem(&#123;
                    </div>
                    <div className="pl-8 text-sky-400">performance: &quot;high&quot;,</div>
                    <div className="pl-8 text-sky-400">reliability: &quot;99.99%&quot;,</div>
                    <div className="pl-8 text-sky-400">scale: &quot;unlimited&quot;,</div>
                    <div className="pl-4">&#125;);</div>
                    <div>&#125;</div>
                  </div>

                  {/* Metrics Overlay Panel */}
                  <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <p className="text-slate-400 text-[11px]">Latencia de respuesta</p>
                      <p className="font-mono text-emerald-400 font-bold text-sm mt-0.5">&lt; 24 ms</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <p className="text-slate-400 text-[11px]">Contenedores</p>
                      <p className="font-mono text-sky-400 font-bold text-sm mt-0.5">Docker Ready</p>
                    </div>
                  </div>
                </div>

                {/* Subtle Decorative Badge */}
                <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl shadow-xl items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Sistemas Resilientes</p>
                    <p className="text-[10px] text-slate-400">Sin interrupciones de servicio</p>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </Container>
    </section>
  );
}
