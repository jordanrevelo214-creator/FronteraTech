"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#040816]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo with official brand mark */}
          <Link
            href="#inicio"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
            aria-label="Frontera Tech - Ir al inicio"
          >
            <Image
              src="/images/logo-frontera-white-perfect.png"
              alt="Frontera Tech"
              width={180}
              height={62}
              priority
              unoptimized
              className="h-7 sm:h-8 w-auto object-contain group-hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-900/60 border border-slate-800/80 px-4 py-1.5 rounded-full backdrop-blur-sm"
            aria-label="Navegación principal"
          >
            {navigationItems
              .filter((item) => !item.isCta)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            {navigationItems
              .filter((item) => item.isCta)
              .map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  variant="primary"
                  size="sm"
                  className="gap-1.5"
                >
                  {item.label}
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 border border-slate-800"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden fixed inset-x-0 top-[65px] bg-[#040816]/95 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl px-6 py-6 transition-all duration-300 max-h-[calc(100vh-65px)] overflow-y-auto"
          aria-label="Menú de navegación móvil"
        >
          <div className="flex flex-col gap-2">
            {navigationItems.map((item) =>
              item.isCta ? (
                <div key={item.href} className="pt-4 mt-2 border-t border-slate-800/80">
                  <Button
                    href={item.href}
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
