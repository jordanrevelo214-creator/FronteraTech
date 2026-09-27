import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StaticFallback() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#030712] text-white px-6 py-24 text-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-8">
        {/* Static Brand Logo */}
        <div className="w-[280px] sm:w-[420px] md:w-[520px] h-auto drop-shadow-[0_4px_30px_rgba(2,132,199,0.35)]">
          <Image
            src="/images/logo-frontera-tech-v2.png"
            alt="Frontera Tech"
            width={730}
            height={282}
            priority
            unoptimized
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Headline and text */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Transformamos ideas en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              software
            </span>
            .
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Automatizamos tus procesos, impulsamos tu crecimiento con arquitectura modular y tecnología de vanguardia.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span>Hablemos de tu proyecto</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
