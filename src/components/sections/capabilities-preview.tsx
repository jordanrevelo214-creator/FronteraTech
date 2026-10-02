"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CosmicStarsCursor } from "@/components/canvas/cosmic-stars-cursor";

interface SolutionCardProps {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isActiveDefault?: boolean;
}

function InteractiveSolutionCard({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  isActiveDefault = false,
}: SolutionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calcular inclinación 3D para el icono
    const rotX = ((y - centerY) / centerY) * -16;
    const rotY = ((x - centerX) / centerX) * 16;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    cardRef.current.style.setProperty("--rot-x", `${rotX.toFixed(2)}deg`);
    cardRef.current.style.setProperty("--rot-y", `${rotY.toFixed(2)}deg`);
    cardRef.current.style.setProperty("--glow-x", `${glowX.toFixed(1)}%`);
    cardRef.current.style.setProperty("--glow-y", `${glowY.toFixed(1)}%`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--rot-x", "0deg");
      cardRef.current.style.setProperty("--rot-y", "0deg");
      cardRef.current.style.setProperty("--glow-x", "50%");
      cardRef.current.style.setProperty("--glow-y", "50%");
    }
  };

  const isActive = isHovered || (!isHovered && isActiveDefault);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[24px] sm:rounded-[26px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${
        isActive
          ? "bg-[#060e22]/95 border-2 border-[#0284c7] shadow-[0_0_35px_rgba(2,132,199,0.25)]"
          : "bg-[#060c1d]/90 border border-slate-800/80 hover:border-[#0284c7]/80 hover:shadow-[0_0_30px_rgba(2,132,199,0.18)]"
      }`}
      style={{ perspective: "1000px" }}
    >
      {/* Resplandor ambiental interactivo que sigue el ratón */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.35 : isActiveDefault ? 0.15 : 0,
          background: `radial-gradient(circle 240px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(14, 165, 233, 0.4), transparent 70%)`,
        }}
      />

      {/* Esquina Superior: Número y Flecha */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <span className="font-mono text-xs sm:text-sm font-bold text-sky-400 tracking-wider">
          {number}
        </span>
        <ArrowUpRight
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 transition-transform duration-300 ${
            isHovered ? "translate-x-0.5 -translate-y-0.5 text-sky-300 scale-110" : ""
          }`}
        />
      </div>

      {/* Área Central: Icono 3D con Movimiento Interactivo al Ratón */}
      <div className="relative w-full h-32 sm:h-36 lg:h-40 my-1 sm:my-2 flex items-center justify-center select-none">
        {/* Glow focal detrás del icono 3D */}
        <div
          className={`absolute w-32 h-24 rounded-full blur-2xl transition-all duration-500 pointer-events-none ${
            isHovered
              ? "bg-sky-500/35 scale-125"
              : "bg-sky-600/15 scale-100"
          }`}
        />

        {/* Imagen del icono 3D con transformación de perspectiva y elevación */}
        <div
          className="relative w-full h-full max-w-[280px] transition-transform duration-100 ease-out flex items-center justify-center will-change-transform"
          style={{
            transform: isHovered
              ? `perspective(800px) rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg)) scale(1.08) translateY(-4px)`
              : "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)",
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={320}
            height={190}
            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)]"
            priority
          />
        </div>
      </div>

      {/* Contenido Inferior */}
      <div className="relative z-10 pt-2 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 tracking-tight group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mb-4 font-normal line-clamp-2">
            {description}
          </p>
        </div>

        <Link
          href="#contacto"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 group-hover:text-sky-300 transition-colors pt-2 border-t border-slate-800/60"
        >
          <span>Explorar solución</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

export function CapabilitiesPreview() {
  return (
    <section
      id="soluciones"
      className="relative z-10 min-h-screen flex flex-col justify-center py-10 sm:py-14 text-white overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 35%, #071b48 0%, #030d25 50%, #010511 100%)",
      }}
      aria-label="Nuestras Soluciones"
    >
      {/* Campo de estrellas y luz interactiva continua como en el Hero */}
      <CosmicStarsCursor />

      {/* Halo de luz central ambiental suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <Container className="relative z-20 flex-1 flex flex-col justify-between my-auto">
        {/* Encabezado compacto y visible completo */}
        <div className="mb-6 sm:mb-8">
          {/* Badge: Línea naranja-dorada + NUESTRAS SOLUCIONES */}
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-7 h-[2px] bg-[#f59e0b] rounded-full inline-block" />
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#f59e0b] uppercase">
              NUESTRAS SOLUCIONES
            </span>
          </div>

          {/* Título y texto lateral */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[44px] font-extrabold tracking-tight leading-[1.1] text-white">
                Soluciones robustas para <br />
                <span className="text-[#0284c7] sm:text-[#0ea5e9]">empresas modernas.</span>
              </h2>
            </div>

            <div className="lg:max-w-md lg:pb-1">
              <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed">
                Software que se adapta a tu negocio <br className="hidden sm:inline" />
                y simplifica tu día a día.
              </p>
            </div>
          </div>
        </div>

        {/* Las 3 Tarjetas en Grid compactas y completas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-6 sm:mb-8">
          {/* Tarjeta 01 */}
          <InteractiveSolutionCard
            number="01"
            title="Desarrollo a medida"
            description="Soluciones adaptadas a los procesos y objetivos de tu empresa."
            imageSrc="/images/solution-3d-01-seamless.png"
            imageAlt="Icono 3D de Desarrollo a Medida"
            isActiveDefault={true}
          />

          {/* Tarjeta 02 */}
          <InteractiveSolutionCard
            number="02"
            title="Aplicaciones web"
            description="Experiencias rápidas e intuitivas que conectan tu negocio con tus clientes."
            imageSrc="/images/solution-3d-02-seamless.png"
            imageAlt="Icono 3D de Aplicaciones Web"
          />

          {/* Tarjeta 03 */}
          <InteractiveSolutionCard
            number="03"
            title="Automatización y cloud"
            description="Conecta tus herramientas, simplifica tareas y haz crecer tu operación."
            imageSrc="/images/solution-3d-03-seamless.png"
            imageAlt="Icono 3D de Automatización y Cloud"
          />
        </div>

        {/* Barra inferior: siempre visible en la misma vista */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
          <p className="text-xs sm:text-sm text-slate-300 font-normal">
            Cuéntanos el reto. Construyamos la solución.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#fbb624] hover:bg-[#f59e0b] text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Hablemos de tu idea</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950" />
            </Link>

            <Link
              href="#servicios"
              className="inline-flex items-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#050c1e] hover:bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-white font-medium text-xs sm:text-sm transition-all"
            >
              <span>Ver todos los servicios</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
