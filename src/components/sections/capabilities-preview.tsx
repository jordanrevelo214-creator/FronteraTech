import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Globe } from "lucide-react";
import { Container } from "@/components/ui/container";

export function CapabilitiesPreview() {
  const highlights = [
    {
      icon: Code2,
      title: "Desarrollo a Medida",
      description:
        "Sistemas empresariales exclusivos adaptados a la lógica operativa exacta de tu negocio.",
    },
    {
      icon: Globe,
      title: "Aplicaciones Web",
      description:
        "Plataformas SaaS y portales de alta velocidad construidos con Next.js y TypeScript.",
    },
    {
      icon: Cpu,
      title: "Automatización & Cloud",
      description:
        "Integraciones fluidas de APIs, microservicios y despliegues seguros en contenedores Docker.",
    },
  ];

  return (
    <section
      id="capacidades"
      className="relative z-10 py-24 sm:py-32 bg-[#02050e] border-t border-slate-900 text-white"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20">
            Ingeniería de Software
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Soluciones robustas para empresas modernas
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Continuamos la experiencia conectando el diseño visual de vanguardia
            con una ejecución técnica rigurosa.
          </p>
        </div>

        {/* 3 Core Highlight Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-14">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-sky-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt to Continue */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all hover:scale-[1.02]"
          >
            <span>Hablemos de tu idea</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#servicios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-sm font-semibold"
          >
            <span>Explorar todos los servicios</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
