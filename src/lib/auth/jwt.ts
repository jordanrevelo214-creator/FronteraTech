import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "fronteratech-jwt-super-secret-key-2026-production-secure";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);

export const AUTH_COOKIE_NAME = "ft_admin_token";
const TOKEN_EXPIRATION = "24h";

export interface SessionPayload {
  userId: string;
  username: string;
  role: string;
}

/**
 * Genera y firma un JSON Web Token (JWT) seguro
 */
export async function signToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(SECRET_KEY);
}

/**
 * Valida un token JWT y devuelve el payload si es válido
 */
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });

    return {
      userId: payload.userId as string,
      username: payload.username as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

/**
 * Guarda el token JWT en una cookie HttpOnly segura (Next.js 16 async cookies)
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 horas
  });
}

/**
 * Elimina la cookie de autenticación
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

/**
 * Obtiene la sesión activa desde la cookie HttpOnly
 */
export async function getSessionUser(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}
