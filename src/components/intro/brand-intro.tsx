"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "frontera_tech_intro_seen";

interface BrandIntroProps {
  onIntroComplete?: () => void;
}

export function BrandIntro({ onIntroComplete }: BrandIntroProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Skip if user arrives via an anchor link (e.g. #servicios)
    if (
      typeof window !== "undefined" &&
      window.location.hash &&
      window.location.hash.length > 1
    ) {
      onIntroComplete?.();
      return;
    }

    // 2. Skip if user prefers reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      onIntroComplete?.();
      return;
    }

    // 3. Check sessionStorage safely
    try {
      const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
      if (alreadySeen === "true") {
        onIntroComplete?.();
        return;
      }
    } catch {
      // If sessionStorage fails (incognito/restricted), skip without blocking UI
      onIntroComplete?.();
      return;
    }

    // Start intro sequence
    setShouldRender(true);

    // Sequence timer: progress bar finishes around 1.6s, then curtain slides up
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Safe catch
      }
    }, 1800);

    // Final unmount timer: once curtain completes slide-up animation
    const completeTimer = setTimeout(() => {
      setShouldRender(false);
      onIntroComplete?.();
    }, 2550);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onIntroComplete]);

  if (!shouldRender) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="brand-intro-curtain"
        initial={{ y: 0 }}
        animate={isExiting ? { y: "-100%" } : { y: 0 }}
        transition={{
          duration: 0.75,
          ease: [0.76, 0, 0.24, 1], // Cinematic smooth curtain curve
        }}
        aria-hidden="true"
        role="presentation"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02091c] text-white select-none pointer-events-none overflow-hidden"
      >
        {/* Full-screen Background Image matching DiseñoFinal.png */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: "url('/images/intro-bg.png')",
          }}
        />

        {/* Ambient atmospheric overlay */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

        {/* Central Brand Composition matching DiseñoFinal.png */}
        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 text-center max-w-4xl mx-auto -mt-6 sm:-mt-8">
          {/* Official FronteraTech Logo & Slogan (100% complete, un-cropped) */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center justify-center mb-6 sm:mb-8 drop-shadow-[0_4px_24px_rgba(2,132,199,0.35)]"
          >
            <Image
              src="/images/logo-frontera-tech-v2.png"
              alt="FronteraTech - Automatizamos tus procesos, impulsamos tu crecimiento"
              width={730}
              height={282}
              priority
              unoptimized
              className="w-[320px] sm:w-[480px] md:w-[600px] lg:w-[680px] h-auto object-contain"
            />
          </motion.div>

          {/* Screen reader fallback text */}
          <h1 className="sr-only">
            FronteraTech — Automatizamos tus procesos, impulsamos tu crecimiento.
          </h1>

          {/* Progress Bar Container matching DiseñoFinal.png */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative w-[280px] sm:w-[380px] md:w-[440px] h-2 sm:h-2.5 bg-[#030e2c]/90 rounded-full border border-sky-400/40 shadow-inner overflow-visible p-[1px]"
          >
            {/* Animated Progress Fill */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.45,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.35,
              }}
              className="relative h-full rounded-full bg-gradient-to-r from-sky-600 via-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.85)] flex items-center justify-end"
            >
              {/* Luminous Golden / White Orb Tip matching DiseñoFinal.png */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-white border border-white shadow-[0_0_16px_4px_rgba(245,158,11,0.95),0_0_24px_8px_rgba(56,189,248,0.7)]" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
