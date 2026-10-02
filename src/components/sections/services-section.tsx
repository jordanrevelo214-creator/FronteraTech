"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  Globe,
  Smartphone,
  Cpu,
  Wrench,
  Cloud,
  CheckCircle2,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";

export interface ServiceSlide {
  id: string;
  number: string;
  tag: string;
  shortName: string;
  iconName: "Code2" | "Globe" | "Smartphone" | "Cpu" | "Wrench" | "Cloud";
  headlinePart1: string;
  headlinePart2: string;
  description: string;
  problemSolved: string;
  benefits: string[];
  imageSrc: string;
  imageAlt: string;
}

export const servicesSlides: ServiceSlide[] = [
  {
    id: "software-a-medida",
    number: "01",
    tag: "SOFTWARE A MEDIDA",
    shortName: "Software a medida",
    iconName: "Code2",
    headlinePart1: "Tu negocio no es genérico.",
    headlinePart2: "Tu software tampoco.",
    description:
      "Creamos sistemas que se adaptan a tus procesos y crecen contigo, asegurando total control y flexibilidad operativa.",
    problemSolved: "Herramientas desconectadas y procesos rígidos que limitan tu crecimiento.",
    benefits: ["Procesos conectados", "Arquitectura escalable", "Control de tus datos"],
    imageSrc: "/images/service-3d-01.png",
    imageAlt: "Ilustración 3D de Software a Medida",
  },
  {
    id: "aplicaciones-web",
    number: "02",
    tag: "APLICACIONES WEB",
    shortName: "Aplicaciones web",
    iconName: "Globe",
    headlinePart1: "Más clientes.",
    headlinePart2: "Mejores experiencias.",
    description:
      "Plataformas web modernas que convierten visitantes en clientes mediante interfaces rápidas, intuitivas y responsivas.",
    problemSolved: "Portales lentos, experiencias complejas y baja tasa de conversión comercial.",
    benefits: ["Carga ultra rápida", "Experiencia intuitiva", "Optimización SEO técnica"],
    imageSrc: "/images/service-3d-02.png",
    imageAlt: "Ilustración 3D de Aplicaciones Web",
  },
  {
    id: "aplicaciones-moviles",
    number: "03",
    tag: "APPS MÓVILES",
    shortName: "Apps móviles",
    iconName: "Smartphone",
    headlinePart1: "Tu empresa.",
    headlinePart2: "En el bolsillo de tus usuarios.",
    description:
      "Aplicaciones móviles nativas y multiplataforma con notificaciones inteligentes, sincronización en vivo y modo offline.",
    problemSolved: "Falta de cercanía inmediata y barreras de acceso en dispositivos móviles.",
    benefits: ["Modo offline activo", "Notificaciones push", "Experiencia nativa fluida"],
    imageSrc: "/images/service-3d-03.png",
    imageAlt: "Ilustración 3D de Aplicaciones Móviles",
  },
  {
    id: "automatizacion-procesos",
    number: "04",
    tag: "AUTOMATIZACIÓN",
    shortName: "Automatización",
    iconName: "Cpu",
    headlinePart1: "Menos trabajo manual.",
    headlinePart2: "Más tiempo para crecer.",
    description:
      "Conectamos tus herramientas empresariales (CRM, ERP, pasarelas de pago y APIs) y automatizamos flujos repetitivos.",
    problemSolved: "Cientos de horas perdidas en digitación manual y datos dispersos entre plataformas.",
    benefits: ["Sincronización continua", "Eliminación de errores", "Pipelines automáticos 24/7"],
    imageSrc: "/images/service-3d-04.png",
    imageAlt: "Ilustración 3D de Automatización de Procesos",
  },
  {
    id: "soporte-continuo",
    number: "05",
    tag: "SOPORTE CONTINUO",
    shortName: "Soporte continuo",
    iconName: "Wrench",
    headlinePart1: "Tranquilidad operativa.",
    headlinePart2: "Tu plataforma siempre activa.",
    description:
      "Supervisión preventiva, monitoreo de métricas, parches de seguridad y evolución tecnológica constante.",
    problemSolved: "Caídas de servicio imprevistas, vulnerabilidades de seguridad y obsolescencia técnica.",
    benefits: ["Monitoreo proactivo", "Uptime garantizado", "Soporte técnico preferente"],
    imageSrc: "/images/service-3d-05.png",
    imageAlt: "Ilustración 3D de Soporte y Monitoreo Continuo",
  },
  {
    id: "cloud-devops",
    number: "06",
    tag: "CLOUD Y DEVOPS",
    shortName: "Cloud y DevOps",
    iconName: "Cloud",
    headlinePart1: "Infraestructura moderna.",
    headlinePart2: "Escalabilidad sin límites.",
    description:
      "Despliegues automatizados con Docker, arquitecturas en la nube resilientes y entornos seguros optimizados en costos.",
    problemSolved: "Servidores sobrecargados, altos costos de hosting y despliegues manuales lentos.",
    benefits: ["Contenedores Docker", "Pipelines CI/CD ágiles", "Optimización de costos cloud"],
    imageSrc: "/images/service-3d-06.png",
    imageAlt: "Ilustración 3D de Cloud y DevOps",
  },
];

import { ServiceItem } from "@/data/services";

const iconMap = {
  Code2,
  Globe,
  Smartphone,
  Cpu,
  Wrench,
  Cloud,
};

interface ServicesSectionProps {
  services?: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const slides: ServiceSlide[] = (services && services.length > 0)
    ? services.map((s, idx) => {
        const def = servicesSlides.find((d) => d.id === s.id) || servicesSlides[idx % servicesSlides.length];
        return {
          id: s.id,
          number: String(idx + 1).padStart(2, "0"),
          tag: def?.tag || s.title.toUpperCase(),
          shortName: def?.shortName || s.title,
          iconName: (s.iconName as "Code2" | "Globe" | "Smartphone" | "Cpu" | "Wrench" | "Cloud") || "Code2",
          headlinePart1: def?.headlinePart1 || s.title,
          headlinePart2: def?.headlinePart2 || "",
          description: s.description,
          problemSolved: s.problemSolved,
          benefits: s.highlights && s.highlights.length > 0 ? s.highlights : (def?.benefits || []),
          imageSrc: def?.imageSrc || `/images/service-3d-0${(idx % 6) + 1}.png`,
          imageAlt: def?.imageAlt || s.title,
        };
      })
    : servicesSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = slides.length;

  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  // Navegación
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(total - 1, index)));
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(total - 1, prev + 1));
  }, [total]);

  // Manejo de teclado cuando el carrusel tiene el foco
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  // Manejo táctil (touch swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) nextSlide();
      else if (diff < -50) prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Manejo de arrastre con mouse (mouse drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (diff > 60) nextSlide();
    else if (diff < -60) prevSlide();
    isDragging.current = false;
    mouseStartX.current = null;
  };

  const currentSlide = slides[currentIndex] || slides[0];
  const IconComponent = iconMap[currentSlide.iconName] || Code2;

  return (
    <section
      id="servicios"
      className="relative z-10 py-5 sm:py-7 md:py-8 flex flex-col justify-center text-white overflow-hidden scroll-mt-16"
      aria-label="Ingeniería que mueve tu empresa"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Fondo cósmico atmosférico coherente */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <Container className="relative z-20">
        {/* Encabezado compacto y visible completo */}
        <div className="mb-2.5 sm:mb-3.5">
          {/* Badge: Línea naranja-dorada + NUESTRAS SOLUCIONES */}
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-[2px] bg-[#f59e0b] rounded-full inline-block" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#f59e0b] uppercase">
              NUESTRAS SOLUCIONES
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-extrabold tracking-tight leading-[1.1] text-white">
            Ingeniería que{" "}
            <span className="text-[#0284c7] sm:text-[#0ea5e9]">
              mueve tu empresa.
            </span>
          </h2>
          <p className="mt-0.5 text-xs sm:text-[13px] md:text-sm text-slate-300 font-normal leading-normal">
            Explora lo que podemos construir contigo.
          </p>
        </div>

        {/* CONTENEDOR DEL CARRUSEL: 100% limpio sin sangrado entre tarjetas */}
        <div
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pb-0.5"
        >
          {/* Track desplazable: 100% por tarjeta para visualización completa sin recortes */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide, idx) => {
              const SlideIcon = iconMap[slide.iconName] || Code2;

              return (
                <div
                  key={slide.id}
                  className="w-full shrink-0 p-0"
                >
                  <div
                    className="relative w-full rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 transition-all duration-300 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7 border-2 border-[#0284c7] bg-[#060e24]/95 shadow-[0_0_35px_rgba(2,132,199,0.2)]"
                  >
                    {/* Columna Izquierda: Información de alto impacto */}
                    <div className="flex-1 w-full lg:max-w-xl flex flex-col justify-between space-y-2 sm:space-y-2.5 text-left">
                      {/* Pill Badge: Icono + 01 / SOFTWARE A MEDIDA */}
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                          <SlideIcon className="w-3 h-3" />
                        </div>
                        <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-sky-400">
                          {slide.number} / {slide.tag}
                        </span>
                      </div>

                      {/* Título de 2 líneas orientado a beneficio */}
                      <h3 className="text-lg sm:text-xl lg:text-[23px] font-extrabold tracking-tight leading-[1.15] text-white">
                        {slide.headlinePart1} <br />
                        <span className="text-[#0284c7] sm:text-[#0ea5e9]">
                          {slide.headlinePart2}
                        </span>
                      </h3>

                      {/* Descripción concisa */}
                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                        {slide.description}
                      </p>

                      {/* Bloque: QUÉ RESOLVEMOS */}
                      <div className="pt-1 border-t border-slate-800/70">
                        <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-0.5">
                          QUÉ RESOLVEMOS
                        </span>
                        <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-snug">
                          {slide.problemSolved}
                        </p>
                      </div>

                      {/* 3 Beneficios breves con checks dorados */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5">
                        {slide.benefits.map((benefit, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Botón de Contacto Dorado */}
                      <div className="pt-1">
                        <Link
                          href={`#contacto?servicio=${slide.id}`}
                          className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#fbb624] hover:bg-[#f59e0b] text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <span>Conversemos sobre tu proyecto</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
                        </Link>
                      </div>
                    </div>

                    {/* Columna Derecha: Ilustración 3D generada sin recortes */}
                    <div className="w-full lg:w-[42%] flex items-center justify-center relative min-h-[140px] sm:min-h-[170px] lg:min-h-[190px]">
                      {/* Resplandor focal reactivo */}
                      <div className="absolute w-36 h-36 rounded-full bg-sky-500/15 blur-2xl pointer-events-none" />

                      <div className="relative w-full max-w-[240px] sm:max-w-[270px] lg:max-w-[310px] h-[140px] sm:h-[170px] lg:h-[190px] flex items-center justify-center transition-transform duration-500 hover:scale-[1.03]">
                        <Image
                          src={slide.imageSrc}
                          alt={slide.imageAlt}
                          width={340}
                          height={210}
                          style={{ width: "auto", height: "auto" }}
                          className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]"
                          priority={idx < 2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTROLES DEBAJO DEL PANEL (Contador, Segmentos de progreso y Flechas) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mt-2.5 sm:mt-3 pb-2 border-b border-slate-800/80">
          {/* Izquierda: Contador y 6 Segmentos de progreso */}
          <div className="flex items-center gap-3 sm:gap-4 pl-1 sm:pl-0">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-base sm:text-lg font-extrabold text-white">
                {currentSlide.number}
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">
                / 0{total}
              </span>
            </div>

            {/* Segmentos de progreso */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => goToSlide(pIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    pIdx === currentIndex
                      ? "w-6 sm:w-8 bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                      : "w-3 sm:w-4 bg-slate-800 hover:bg-slate-700"
                  }`}
                  aria-label={`Ir al servicio ${pIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Derecha: Botones Anterior/Siguiente y texto 'Desliza para explorar' */}
          <div className="flex items-center gap-2 sm:gap-2.5 self-end sm:self-auto">
            <span className="text-[10px] font-mono text-slate-500 hidden md:inline">
              Desliza para explorar
            </span>

            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Servicio anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex === total - 1}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Servicio siguiente"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FILA INFERIOR: NOMBRES DE LOS 6 SERVICIOS PARA SELECCIÓN DIRECTA */}
        <div className="pt-1.5 sm:pt-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max pb-0.5">
            {slides.map((slide, tabIdx) => {
              const isSelected = tabIdx === currentIndex;
              const TabIcon = iconMap[slide.iconName] || Code2;

              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(tabIdx)}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? "text-[#f59e0b] border-b-2 border-b-[#f59e0b] border-transparent bg-slate-900/40"
                      : "text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/30"
                  }`}
                >
                  <TabIcon
                    className={`w-3 h-3 ${
                      isSelected ? "text-[#f59e0b]" : "text-slate-500"
                    }`}
                  />
                  <span>{slide.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
