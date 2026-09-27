import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  target,
  rel,
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-5 py-2.5 text-sm font-semibold gap-2 shadow-sm",
    lg: "px-7 py-3.5 text-base font-semibold gap-2.5 shadow-md",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500 hover:shadow-lg hover:shadow-sky-500/30 border border-sky-400/30",
    secondary:
      "bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border border-slate-700/80 hover:border-slate-600 backdrop-blur-sm",
    outline:
      "bg-transparent hover:bg-sky-500/10 text-sky-400 border border-sky-500/40 hover:border-sky-400",
    ghost:
      "bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("https://wa.me");
    return (
      <Link
        href={href}
        className={combinedStyles}
        target={target || (isExternal && !href.startsWith("mailto:") ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedStyles}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
