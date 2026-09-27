"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { slideUpVariants, fadeInVariants } from "./motion-variants";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "fade";
}

export function MotionWrapper({
  children,
  className,
  delay = 0,
  direction = "up",
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const baseVariant = direction === "fade" ? fadeInVariants : slideUpVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: baseVariant.hidden,
        visible: {
          ...baseVariant.visible,
          transition: {
            duration: 0.5,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
