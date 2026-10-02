import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { navigationItems } from "@/data/navigation";
import { companyData } from "@/data/company";
import { contactData } from "@/data/contact";

import { getCompanyData, getContactData } from "@/lib/content/data-service";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const [company, contact] = await Promise.all([
    getCompanyData(),
    getContactData(),
  ]);

  const emailChannel = contact.channels?.find((c) => c.type === "email");
  const linkedinChannel = contact.channels?.find((c) => c.type === "linkedin");
  const whatsappChannel = contact.channels?.find((c) => c.type === "whatsapp");

  return (
    <footer className="bg-[#020510]/85 backdrop-blur-md border-t border-slate-800/40 pt-16 pb-12 text-slate-400">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="#inicio"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
              aria-label="Frontera Tech - Volver al inicio"
            >
              <Image
                src="/images/logo-frontera-white.png"
                alt="Frontera Tech"
                width={200}
                height={54}
                className="h-9 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {company.shortDescription || companyData.shortDescription}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={linkedinChannel?.href || "https://linkedin.com/company/frontera-tech"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500/40 hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Perfil de LinkedIn de Frontera Tech"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              {whatsappChannel?.href && (
                <a
                  href={whatsappChannel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label="WhatsApp directo de Frontera Tech"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              )}
              <a
                href={emailChannel?.href || "mailto:contacto@fronteratech.com"}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500/40 hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Enviar correo electrónico a Frontera Tech"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Contacto Directo
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:contacto@fronteratech.com"
                className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">contacto@fronteratech.com</span>
              </a>
              <a
                href={contactData.channels.find((c) => c.type === "whatsapp")?.href || "#contacto"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atención por WhatsApp</span>
              </a>
              <p className="text-xs text-slate-500 pt-1">
                Servicios disponibles para clientes nacionales e internacionales.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {currentYear} {companyData.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono text-[11px] text-slate-500">
              {companyData.tagline}
            </p>
            <a
              href="/admin"
              className="text-slate-600 hover:text-sky-400 transition-colors text-[11px] flex items-center gap-1"
              title="Panel de Administración"
            >
              <span>• CMS</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
