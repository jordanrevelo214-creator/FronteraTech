"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // No renderizar el footer público en rutas del panel de administración ni login
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
}
