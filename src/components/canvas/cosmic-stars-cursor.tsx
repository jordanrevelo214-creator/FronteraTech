"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

interface Star {
  id: number;
  x: number; // porcentaje 0 - 100
  y: number; // porcentaje 0 - 100
  size: number;
  opacity: number;
  pulseDuration: number;
  pulseDelay: number;
  depth: number; // para parallax
  isBright?: boolean;
}

// Generador determinista pseudo-aleatorio para evitar cualquier mismatch de hidratación SSR
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function CosmicStarsCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [smoothMouse, setSmoothMouse] = useState({ x: -1000, y: -1000 });
  const [isInside, setIsInside] = useState(false);

  // Generar campo de estrellas fijo y 100% determinista (idéntico en SSR y cliente)
  const stars: Star[] = useMemo(() => {
    const list: Star[] = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      const isBright = i % 8 === 0;
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 5 + 2);
      const r3 = pseudoRandom(i * 7 + 3);
      const r4 = pseudoRandom(i * 11 + 4);
      const r5 = pseudoRandom(i * 13 + 5);

      list.push({
        id: i,
        x: r1 * 100,
        y: r2 * 100,
        size: isBright ? r3 * 1.5 + 2 : r3 * 1.1 + 0.9,
        opacity: isBright ? 0.85 : r4 * 0.45 + 0.25,
        pulseDuration: r5 * 3 + 2.5,
        pulseDelay: r4 * 4,
        depth: r3 * 0.035 + 0.015,
        isBright,
      });
    }
    return list;
  }, []);

  // Seguimiento suave del ratón
  useEffect(() => {
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });
      setIsInside(true);
    };

    const onMouseLeave = () => {
      setIsInside(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Bucle de amortiguación suave (Lerp) para la luz
    const loop = () => {
      setSmoothMouse((prev) => {
        const factor = 0.12;
        return {
          x: prev.x + (mousePos.x - prev.x) * factor,
          y: prev.y + (mousePos.y - prev.y) * factor,
        };
      });
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [mousePos.x, mousePos.y]);

  // Cálculo de desplazamiento de estrellas por parallax
  const parallaxX = (smoothMouse.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 500));
  const parallaxY = (smoothMouse.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 400));

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10"
      aria-hidden="true"
    >
      {/* 1. LUZ QUE SIGUE AL RATÓN (Spotlight Glow interactivo) */}
      <div
        className="absolute w-[550px] h-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-500 ease-out"
        style={{
          left: `${Math.round(smoothMouse.x)}px`,
          top: `${Math.round(smoothMouse.y)}px`,
          opacity: isInside ? 0.75 : 0.2,
          background: `radial-gradient(circle, rgba(14, 165, 233, 0.22) 0%, rgba(56, 189, 248, 0.1) 35%, rgba(99, 102, 241, 0.05) 55%, transparent 75%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Halo secundario cálido sutil para profundidad */}
      <div
        className="absolute w-[220px] h-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
        style={{
          left: `${Math.round(smoothMouse.x)}px`,
          top: `${Math.round(smoothMouse.y)}px`,
          opacity: isInside ? 0.4 : 0,
          background: `radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(14, 165, 233, 0.08) 50%, transparent 80%)`,
          filter: "blur(14px)",
        }}
      />

      {/* 2. CAMPO DE ESTRELLAS PARPADEANTES REACTIVAS */}
      <div className="absolute inset-0" suppressHydrationWarning>
        {stars.map((star) => {
          const offsetX = Math.round(parallaxX * star.depth * 10) / 10;
          const offsetY = Math.round(parallaxY * star.depth * 10) / 10;

          return (
            <div
              key={star.id}
              className="absolute rounded-full"
              style={{
                left: `${star.x.toFixed(2)}%`,
                top: `${star.y.toFixed(2)}%`,
                width: `${star.size.toFixed(1)}px`,
                height: `${star.size.toFixed(1)}px`,
                backgroundColor: star.isBright ? "#bae6fd" : "#ffffff",
                boxShadow: star.isBright
                  ? "0 0 8px 1px rgba(56, 189, 248, 0.9), 0 0 16px 2px rgba(14, 165, 233, 0.5)"
                  : "0 0 4px rgba(255, 255, 255, 0.6)",
                transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
                opacity: Number(star.opacity.toFixed(2)),
                animation: `twinkle ${star.pulseDuration.toFixed(1)}s infinite ease-in-out ${star.pulseDelay.toFixed(1)}s`,
                transition: "transform 0.1s linear",
              }}
            >
              {/* Destello de cruz para estrellas brillantes */}
              {star.isBright && (
                <div className="absolute -inset-1 opacity-70 pointer-events-none flex items-center justify-center">
                  <div className="w-[12px] h-[1px] bg-cyan-200/80 blur-[0.5px]" />
                  <div className="h-[12px] w-[1px] bg-cyan-200/80 blur-[0.5px] absolute" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.25);
          }
        }
      `}</style>
    </div>
  );
}
