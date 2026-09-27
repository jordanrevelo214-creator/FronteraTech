"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { companyData } from "@/data/company";
import { contactData } from "@/data/contact";
import { LinkedinIcon, GithubIcon } from "@/components/ui/icons";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus trap & Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal de navegación"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#030712]/98 backdrop-blur-2xl text-white px-6 sm:px-12 py-8 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Top Bar with Brand & Close Button */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-mono font-bold text-sm">
            FT
          </div>
          <span className="font-bold tracking-tight text-white text-base">
            FRONTERA <span className="text-sky-400">TECH</span>
          </span>
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white bg-slate-900/60 transition-colors text-xs font-mono uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
          aria-label="Cerrar menú de navegación"
        >
          <span>Cerrar</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="w-full max-w-7xl mx-auto py-12 flex-1 flex flex-col justify-center">
        <nav
          className="flex flex-col space-y-4 sm:space-y-6 text-left"
          aria-label="Secciones del sitio web"
        >
          {navigationItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="group flex items-baseline gap-4 sm:gap-6 text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-sky-400"
            >
              <span className="font-mono text-xs sm:text-sm text-sky-500/60 group-hover:text-sky-400 transition-colors">
                0{idx + 1}
              </span>
              <span className="tracking-tight">{item.label}</span>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sky-400" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Footer & Direct Contacts */}
      <div className="w-full max-w-7xl mx-auto border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-400">
        <div className="space-y-1">
          <p className="text-white font-medium">{companyData.name}</p>
          <p className="text-slate-400">{companyData.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:contacto@fronteratech.com"
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>contacto@fronteratech.com</span>
          </a>
          <a
            href={contactData.channels.find((c) => c.type === "whatsapp")?.href || "#contacto"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <a
            href="https://linkedin.com/company/frontera-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-sky-400 text-slate-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/frontera-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-sky-400 text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
