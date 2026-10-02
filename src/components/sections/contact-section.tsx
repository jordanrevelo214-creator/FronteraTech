"use client";

import React from "react";
import { Mail, MessageSquare, Globe2, ArrowUpRight, Clock } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { contactData as defaultContactData, ContactData } from "@/data/contact";

interface ContactSectionProps {
  contact?: ContactData;
}

export function ContactSection({ contact }: ContactSectionProps) {
  const currentContact = contact || defaultContactData;

  return (
    <section
      id="contacto"
      className="py-20 md:py-28 relative bg-transparent border-t border-slate-800/40"
      aria-label="Información de contacto"
    >
      <Container>
        <SectionHeader
          badge="Inicia la Conversación"
          title={currentContact.headline || "Conversemos sobre tu próximo desarrollo"}
          description={currentContact.subtitle}
        />

        {/* Central Card with Direct Channels */}
        <div className="max-w-4xl mx-auto">
          {/* Availability Banner */}
          <MotionWrapper delay={0.1}>
            <div className="mb-8 p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-sky-200">
                  {currentContact.availabilityNotice}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Disponibilidad Activa
              </span>
            </div>
          </MotionWrapper>

          {/* Contact Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentContact.channels.map((channel, index) => {
              const isExternal =
                channel.href.startsWith("http") || channel.href.startsWith("mailto:");

              return (
                <MotionWrapper key={channel.id} delay={0.15 + index * 0.08}>
                  <a
                    href={channel.href}
                    target={isExternal && !channel.href.startsWith("mailto:") ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-sky-500/40 hover:bg-slate-900/90 transition-all duration-300 group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 h-full"
                    aria-label={`${channel.title}: ${channel.actionText}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 text-sky-400 flex items-center justify-center group-hover:scale-105 group-hover:border-sky-500/40 transition-all">
                          {channel.type === "email" && <Mail className="w-6 h-6" />}
                          {channel.type === "whatsapp" && <MessageSquare className="w-6 h-6" />}
                          {channel.type === "linkedin" && <LinkedinIcon className="w-6 h-6" />}
                          {channel.type === "location" && <Globe2 className="w-6 h-6" />}
                        </div>
                        {isExternal && (
                          <div className="p-2 rounded-lg text-slate-500 group-hover:text-sky-400 transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                        {channel.title}
                      </h3>
                      <p className="text-sm text-slate-300 font-mono break-all mb-4">
                        {channel.value}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs font-semibold text-sky-400 group-hover:underline">
                        {channel.actionText}
                      </span>
                      {channel.isPendingConfirmation && (
                        <span className="text-[10px] font-mono text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded">
                          Configurable
                        </span>
                      )}
                    </div>
                  </a>
                </MotionWrapper>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
