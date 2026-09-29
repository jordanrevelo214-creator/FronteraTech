"use client";

import React from "react";
import { User } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { teamData } from "@/data/team";

export function TeamSection() {
  return (
    <section
      id="equipo"
      className="py-20 md:py-28 relative bg-transparent border-t border-slate-800/40"
      aria-label="Equipo de Frontera Tech"
    >
      <Container>
        <SectionHeader
          badge="Equipo Humano"
          title="Talento multidisciplinario de ingeniería"
          description="Especialistas dedicados a construir arquitectura duradera, interfaces de usuario de alto impacto y soluciones tecnológicas confiables."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamData.map((member, index) => (
            <MotionWrapper key={member.id} delay={index * 0.08} className="h-full">
              <div className="h-full flex flex-col justify-between rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 hover:border-sky-500/40 transition-all duration-300 group hover:shadow-xl hover:shadow-sky-950/20">
                <div>
                  {/* Photo or Neutral Avatar Placeholder */}
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 flex flex-col items-center justify-center relative overflow-hidden mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-lg mb-2">
                      {member.avatarText || <User className="w-6 h-6" />}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                      {member.isProvisional ? "Perfil Técnico" : "Integrante"}
                    </span>
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-3">
                    {member.role}
                  </p>

                  {/* Specialty */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {member.specialty}
                  </p>
                </div>

                {/* Social Links (optional) */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 mt-auto">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      aria-label={`GitHub de ${member.name}`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
