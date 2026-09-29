import { NextResponse } from "next/server";
import { getSessionUser, SessionPayload } from "./jwt";

export async function requireAdmin(): Promise<SessionPayload | NextResponse> {
  const session = await getSessionUser();

  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { error: "Acceso no autorizado. Debe iniciar sesión como administrador." },
      { status: 401 }
    );
  }

  return session;
}
