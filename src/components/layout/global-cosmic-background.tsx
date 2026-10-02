"use client";

import React from "react";
import { CosmicStarsCursor } from "@/components/canvas/cosmic-stars-cursor";

export function GlobalCosmicBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Resplandores cósmicos ambientales profundos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-sky-500/10 rounded-full blur-[160px]" />
      <div className="absolute top-2/3 right-10 w-[600px] h-[500px] bg-indigo-500/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-10 w-[550px] h-[450px] bg-cyan-500/8 rounded-full blur-[140px]" />

      {/* Campo de estrellas en movimiento con física de cursor y parpadeo sinusoidal */}
      <CosmicStarsCursor fixed />
    </div>
  );
}
