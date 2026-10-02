"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Home,
  Layers,
  FolderGit2,
  Building2,
  Users,
  MessageSquare,
  LogIn,
  ArrowRightToLine,
  ArrowLeftToLine,
  ArrowUpRight,
} from "lucide-react";
import { companyData } from "@/data/company";

interface CrystalMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemConfig {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItemConfig[] = [
  { id: "inicio", label: "Inicio", href: "#inicio", icon: Home },
  { id: "servicios", label: "Servicios", href: "#servicios", icon: Layers },
  { id: "proyectos", label: "Proyectos", href: "#proyectos", icon: FolderGit2, badge: "Portafolio" },
  { id: "nosotros", label: "Nosotros", href: "#nosotros", icon: Building2 },
  { id: "equipo", label: "Equipo Humano", href: "#equipo", icon: Users },
  { id: "contacto", label: "Contacto", href: "#contacto", icon: MessageSquare, badge: "Activo" },
];

export function FullscreenMenu({ isOpen, onClose }: CrystalMenuProps) {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuCardRef = useRef<HTMLDivElement>(null);

  // Escuchar tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Detectar sección activa únicamente cuando el menú se abre
  useEffect(() => {
    if (!isOpen) return;

    const sections = ["inicio", "servicios", "proyectos", "nosotros", "equipo", "contacto"];
    const scrollPos = window.scrollY + 250;
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación de cristal Frontera Tech"
      className="fixed inset-0 z-50 flex items-center justify-end sm:pr-8 md:pr-12 p-4 animate-in fade-in duration-300"
    >
      {/* Telón de fondo translúcido y suave */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[6px] transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* ======================================================== */}
      {/* TARJETA DE CRISTAL FLOTANTE (COLORES OFICIALES FRONTERA TECH) */}
      {/* ======================================================== */}
      <div
        ref={menuCardRef}
        style={{
          background:
            "linear-gradient(145deg, rgba(6, 17, 43, 0.90) 0%, rgba(2, 9, 26, 0.84) 45%, rgba(5, 15, 38, 0.92) 100%)",
          backdropFilter: "blur(32px) saturate(220%)",
          WebkitBackdropFilter: "blur(32px) saturate(220%)",
          boxShadow: `
            0 35px 80px -15px rgba(0, 0, 0, 0.8),
            0 15px 35px -10px rgba(0, 0, 0, 0.55),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.28),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.45),
            inset 1.5px 0 1px 0 rgba(56, 189, 248, 0.35),
            0 0 0 1px rgba(56, 189, 248, 0.3),
            0 0 32px -4px rgba(14, 165, 233, 0.28),
            0 0 45px -8px rgba(245, 158, 11, 0.16)
          `,
        }}
        className={`relative z-10 rounded-[34px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between overflow-hidden text-slate-100 border border-sky-500/30 ${
          isCollapsed
            ? "w-[84px] py-6 px-3"
            : "w-full max-w-[340px] sm:max-w-[360px] py-6 px-5 sm:px-6"
        } max-h-[92vh] shadow-2xl`}
      >
        {/* Refracción cáustica perimetral en esquinas (Cyan Cósmico & Oro Ámbar) */}
        <div
          className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-sky-500/25 blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#f59e0b]/20 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* ======================================================== */}
        {/* HEADER: LOGO CORPORATIVO + BOTONES DE CONTROL */}
        {/* ======================================================== */}
        <div className="flex items-center justify-between gap-2 pb-5 border-b border-slate-700/60 relative z-10">
          {!isCollapsed ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative h-8 w-auto flex items-center">
                <Image
                  src="/images/brand_navbar_logo.png"
                  alt="Frontera Tech"
                  width={150}
                  height={38}
                  className="h-7 w-auto object-contain drop-shadow-[0_2px_10px_rgba(14,165,233,0.3)]"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 text-white flex items-center justify-center font-black text-xs shadow-md shadow-sky-500/35 border border-sky-400/40">
                FT
              </div>
            </div>
          )}

          {/* Botones de Control: Toggle Colapsar y Cerrar */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Botón Colapsar / Expandir (idéntico al diseño de referencia) */}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-700/80 hover:border-sky-500/50 shadow-sm flex items-center justify-center transition-all cursor-pointer focus:outline-none"
              title={isCollapsed ? "Expandir menú (→|)" : "Colapsar a barra delgada (|←)"}
              aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
            >
              {isCollapsed ? (
                <ArrowRightToLine className="w-4 h-4 text-sky-400" />
              ) : (
                <ArrowLeftToLine className="w-4 h-4 text-sky-400" />
              )}
            </button>

            {/* Botón Cerrar */}
            {!isCollapsed && (
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 border border-slate-700/80 hover:border-rose-500/40 shadow-sm flex items-center justify-center transition-all cursor-pointer focus:outline-none"
                title="Cerrar panel"
                aria-label="Cerrar panel"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* LISTA DE NAVEGACIÓN (CON EFECTO PILL TALLADO Y ACTIVE GLOW) */}
        {/* ======================================================== */}
        <nav
          className="py-4 space-y-1.5 overflow-y-auto no-scrollbar relative z-10 my-auto"
          aria-label="Navegación principal"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`group relative flex items-center transition-all duration-200 rounded-2xl cursor-pointer ${
                  isCollapsed
                    ? "justify-center p-3"
                    : "gap-3.5 px-4 py-2.5"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500/25 via-sky-500/15 to-transparent text-white font-bold border border-sky-400/50 shadow-[0_0_24px_rgba(14,165,233,0.22),inset_0_1px_1px_rgba(255,255,255,0.25)]"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-slate-700/50"
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Icono con cápsula iluminada si está activo */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isActive
                      ? "bg-sky-500 text-white shadow-md shadow-sky-500/40 border border-sky-300/40"
                      : "text-slate-400 group-hover:text-sky-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Texto y Badge (cuando está expandido) */}
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span
                      className={`text-sm tracking-tight truncate ${
                        isActive ? "text-white font-bold" : "font-medium"
                      }`}
                    >
                      {item.label}
                    </span>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                          item.id === "contacto"
                            ? "bg-[#f59e0b]/20 text-[#fbb624] border border-[#f59e0b]/40"
                            : "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ======================================================== */}
        {/* FOOTER DEL CRISTAL: ACCESO ADMINISTRADOR & DATOS CORPORATIVOS */}
        {/* ======================================================== */}
        <div className="pt-4 border-t border-slate-700/60 space-y-2.5 relative z-10">
          <a
            href="/admin/login"
            onClick={onClose}
            className={`flex items-center rounded-2xl bg-slate-900/80 hover:bg-sky-950/40 text-slate-200 hover:text-white border border-slate-800 hover:border-sky-500/50 shadow-sm transition-all group ${
              isCollapsed
                ? "justify-center p-3"
                : "justify-between px-3.5 py-2 text-xs font-semibold"
            }`}
            title="Iniciar Sesión de Administrador"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <LogIn className="w-3.5 h-3.5" />
              </div>
              {!isCollapsed && <span>Acceso Administrador</span>}
            </div>
            {!isCollapsed && (
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors" />
            )}
          </a>

          {!isCollapsed && (
            <div className="px-1 text-[11px] text-slate-400 flex items-center justify-between pt-1">
              <span>{companyData.name}</span>
              <span className="font-mono text-[10px] text-sky-400/80">v2026.1</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
