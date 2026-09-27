"use client";

import React from "react";
import { Code2, Globe, Smartphone, Cpu, Wrench, Cloud, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { servicesData, ServiceItem } from "@/data/services";

const iconMap = {
  Code2,
  Globe,
  Smartphone,
  Cpu,
  Wrench,
  Cloud,
};

export function ServicesSection() {
  return (
    <section
      id="servicios"
      className="py-20 md:py-28 relative bg-[#060913]"
      aria-label="Nuestros servicios de software"
    >
      <Container>
        <SectionHeader
          badge="Servicios Especializados"
          title="Soluciones de ingeniería enfocadas en resultados"
          description="Diseñamos y construimos tecnología a la medida de tu modelo operativo, eliminando fricciones técnicas y acelerando tus procesos."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service: ServiceItem, index: number) => {
            const IconComponent = iconMap[service.iconName] || Code2;

            return (
              <MotionWrapper
                key={service.id}
                delay={index * 0.08}
                className="h-full"
              >
                <div className="h-full flex flex-col justify-between rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-sky-500/40 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-sky-950/20 group">
                  <div>
                    {/* Icon and category */}
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-sky-500/20 transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                      {service.title}
                    </h3>

                    {/* Problem Solved Highlight */}
                    <div className="mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold mb-1">
                        Problema que resuelve:
                      </p>
                      <p className="text-xs sm:text-sm text-slate-300 leading-snug">
                        {service.problemSolved}
                      </p>
                    </div>

                    {/* Service Description */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-5">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="pt-4 border-t border-slate-800/60 mt-auto">
                    <ul className="space-y-2 text-xs text-slate-300">
                      {service.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
