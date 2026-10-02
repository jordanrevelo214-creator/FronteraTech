"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { User, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Credenciales incorrectas");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado al iniciar sesión";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden select-none"
      style={{
        backgroundColor: "#020716",
        backgroundImage: `
          radial-gradient(circle at 50% 25%, rgba(14, 165, 233, 0.22) 0%, rgba(2, 6, 23, 0.88) 65%, #01040d 100%),
          url('/images/intro-bg.png')
        `,
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Resplandores cósmicos ambientales con colores Frontera Tech */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[380px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Silueta de niebla ambiental */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#01040d] via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Botón superior discreto para volver al sitio web sin chocar con nada */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-sm"
        >
          ← Volver al sitio principal
        </Link>
      </div>

      {/* ======================================================== */}
      {/* TARJETA GLASSMORPHISM EXACTA AL DISEÑO */}
      {/* ======================================================== */}
      <div className="w-full max-w-[400px] relative z-10 animate-in fade-in zoom-in-95 duration-400">
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.12) 100%)",
            backdropFilter: "blur(24px) saturate(190%)",
            WebkitBackdropFilter: "blur(24px) saturate(190%)",
            border: "1.5px solid rgba(255, 255, 255, 0.42)",
            boxShadow: `
              0 30px 60px -15px rgba(0, 0, 0, 0.65),
              0 15px 30px -10px rgba(0, 0, 0, 0.4),
              inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.55),
              inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.15),
              0 0 25px -4px rgba(14, 165, 233, 0.25)
            `,
          }}
          className="relative rounded-[32px] pt-0 pb-8 px-7 sm:px-8 text-white shadow-2xl overflow-hidden"
        >
          {/* Pestaña superior recortada 'Login' (exacta al mockup de referencia) */}
          <div className="flex justify-center -mt-[1.5px] mb-6">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(230, 240, 255, 0.72) 100%)",
                backdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12), inset 0 -1px 1px rgba(0, 0, 0, 0.05)",
              }}
              className="px-8 py-2 rounded-b-2xl"
            >
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-800">
                Login
              </span>
            </div>
          </div>

          {/* Logo Frontera Tech sutil integrado */}
          <div className="flex justify-center mb-6">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105"
              title="Volver a Frontera Tech"
            >
              <Image
                src="/images/brand_navbar_logo.png"
                alt="Frontera Tech"
                width={150}
                height={38}
                className="h-7 w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
                priority
              />
            </Link>
          </div>

          {/* Alerta de Error */}
          {error && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-300" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Username */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200 pl-2">
                Username
              </label>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.14)",
                  border: "1.2px solid rgba(255, 255, 255, 0.45)",
                  boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.12)",
                }}
                className="relative rounded-full flex items-center px-4 py-2.5 transition-all focus-within:border-sky-400 focus-within:bg-white/20 focus-within:shadow-[0_0_15px_rgba(14,165,233,0.3)]"
              >
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none pr-8 font-medium"
                />
                {/* Icono a la derecha exacto al diseño */}
                <div className="absolute right-4 text-slate-300 pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Campo Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200 pl-2">
                Password
              </label>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.14)",
                  border: "1.2px solid rgba(255, 255, 255, 0.45)",
                  boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.12)",
                }}
                className="relative rounded-full flex items-center px-4 py-2.5 transition-all focus-within:border-sky-400 focus-within:bg-white/20 focus-within:shadow-[0_0_15px_rgba(14,165,233,0.3)]"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none pr-8 font-medium tracking-wider"
                />
                {/* Icono interactivo a la derecha con alternar visibilidad */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Fila Remember me & Forgot password */}
            <div className="flex items-center justify-between text-xs text-slate-200 pt-1 px-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-white/50 bg-white/20 text-sky-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-sky-500"
                />
                <span className="hover:text-white transition-colors">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Si olvidaste tus credenciales, contáctate con el administrador de sistemas de Frontera Tech en contacto@fronteratech.com"
                  )
                }
                className="text-slate-300 hover:text-sky-300 transition-colors cursor-pointer text-right"
              >
                Forgot password?
              </button>
            </div>

            {/* Botón Login Pill redondeado exacto a la imagen */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(228, 238, 252, 0.88) 100%)",
                  boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.25), inset 0 1px 1px white",
                }}
                className="w-full py-3 rounded-full text-slate-900 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
          </form>

          {/* Pie de tarjeta seguro sin registro externo */}
          <div className="text-center pt-4 mt-4 border-t border-white/15">
            <p className="text-[11px] text-slate-300/80 mb-3">
              Acceso exclusivo para el equipo autorizado de Frontera Tech
            </p>

            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-slate-200 hover:text-white transition-all"
              >
                ← Volver al sitio principal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
