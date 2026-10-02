"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number; // 0 to 1 ratio
  y: number; // 0 to 1 ratio
  baseSize: number;
  baseAlpha: number;
  pulseSpeed: number;
  phase: number;
  depth: number;
  isBright: boolean;
}

// Pseudo-random determinista
function pseudoRand(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function CosmicStarsCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, isInside: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // Crear lista de 65 estrellas de alto impacto
    const stars: Star[] = [];
    const count = 65;
    for (let i = 0; i < count; i++) {
      const isBright = i % 7 === 0;
      const r1 = pseudoRand(i * 3 + 1);
      const r2 = pseudoRand(i * 5 + 2);
      const r3 = pseudoRand(i * 7 + 3);
      const r4 = pseudoRand(i * 11 + 4);
      const r5 = pseudoRand(i * 13 + 5);

      stars.push({
        x: r1,
        y: r2,
        baseSize: isBright ? r3 * 1.4 + 1.8 : r3 * 0.9 + 0.8,
        baseAlpha: isBright ? 0.85 : r4 * 0.35 + 0.25,
        pulseSpeed: r5 * 1.5 + 1.2,
        phase: r1 * Math.PI * 2,
        depth: r3 * 0.03 + 0.015,
        isBright,
      });
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Limitar dpr a 1 o 1.25 para máximo rendimiento
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseRef.current.isInside = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    let lastTime = performance.now();

    const render = (time: number) => {
      animId = requestAnimationFrame(render);

      // Si el tab está oculto o no hay dimensiones válidas, pausar render
      if (document.hidden || width <= 0 || height <= 0) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Lerp mouse coordinates suavemente
      const mouse = mouseRef.current;
      const lerpFactor = 0.12;
      mouse.x += (mouse.targetX - mouse.x) * lerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * lerpFactor;

      ctx.clearRect(0, 0, width, height);

      // 1. Spotlight suave que sigue al cursor (solo si está en el viewport)
      if (mouse.isInside && mouse.x > -200 && mouse.x < width + 200) {
        const glowRad = Math.min(width, 320);
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRad
        );
        grad.addColorStop(0, "rgba(14, 165, 233, 0.14)");
        grad.addColorStop(0.4, "rgba(56, 189, 248, 0.05)");
        grad.addColorStop(0.8, "rgba(99, 102, 241, 0.015)");
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo cálido ámbar sutil
        const amberGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          110
        );
        amberGrad.addColorStop(0, "rgba(245, 158, 11, 0.08)");
        amberGrad.addColorStop(1, "transparent");
        ctx.fillStyle = amberGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 110, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Renderizar campo de estrellas
      const centerX = width / 2;
      const centerY = height / 2;
      const parallaxX = (mouse.x - centerX);
      const parallaxY = (mouse.y - centerY);
      const seconds = time * 0.001;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Posición base + parallax suave
        const posX = s.x * width + parallaxX * s.depth;
        const posY = s.y * height + parallaxY * s.depth;

        // Parpadeo sinusoidal suave
        const pulse = Math.sin(seconds * s.pulseSpeed + s.phase);
        const alpha = Math.max(0.1, s.baseAlpha * (0.65 + 0.35 * pulse));
        const size = s.baseSize * (0.85 + 0.15 * pulse);

        ctx.fillStyle = s.isBright ? `rgba(186, 230, 253, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(posX, posY, size, 0, Math.PI * 2);
        ctx.fill();

        // Destello de cruz para estrellas brillantes
        if (s.isBright && alpha > 0.6) {
          ctx.strokeStyle = `rgba(186, 230, 253, ${alpha * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(posX - 4, posY);
          ctx.lineTo(posX + 4, posY);
          ctx.moveTo(posX, posY - 4);
          ctx.lineTo(posX, posY + 4);
          ctx.stroke();
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
