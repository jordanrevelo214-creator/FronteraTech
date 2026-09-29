import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword, hashPassword } from "@/lib/auth/password";
import { signToken, setAuthCookie } from "@/lib/auth/jwt";
import { ensureDatabaseSeeded } from "@/lib/content/data-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuario y contraseña requeridos" },
        { status: 400 }
      );
    }

    // Asegurarse de que las tablas y el admin inicial existan
    await ensureDatabaseSeeded();

    // Buscar usuario en la base de datos
    let user = await prisma.user.findUnique({
      where: { username: String(username).trim() },
    });

    // Si aún no está creado en la base de datos (por ejemplo, primer arranque)
    if (!user) {
      const defaultUser = process.env.ADMIN_INITIAL_USERNAME || "admin";
      const defaultPass = process.env.ADMIN_INITIAL_PASSWORD || "AdminFrontera2026*Secure";

      if (username === defaultUser) {
        const passwordHash = await hashPassword(defaultPass);
        try {
          user = await prisma.user.create({
            data: {
              username: defaultUser,
              passwordHash,
              role: "admin",
            },
          });
        } catch {
          // Ignorar si ya existía por condición de carrera
        }
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales de acceso incorrectas" },
        { status: 401 }
      );
    }

    // Verificación criptográfica con PBKDF2-HMAC-SHA256
    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Credenciales de acceso incorrectas" },
        { status: 401 }
      );
    }

    // Generar JSON Web Token firmado
    const token = await signToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    // Guardar en Cookie HttpOnly
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("[Login Error]:", error);
    return NextResponse.json(
      { error: "Error interno al procesar el inicio de sesión" },
      { status: 500 }
    );
  }
}
