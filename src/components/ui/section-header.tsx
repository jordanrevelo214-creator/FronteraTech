import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-16 ${
        centered ? "mx-auto text-center" : ""
      } ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
