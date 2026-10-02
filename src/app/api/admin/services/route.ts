import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { getServicesData, ensureDatabaseSeeded } from "@/lib/content/data-service";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  await ensureDatabaseSeeded();
  const services = await getServicesData();
  return NextResponse.json({ services });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const {
      title,
      iconName,
      problemSolved,
      description,
      highlights,
    } = body;

    if (!title || !description || !problemSolved) {
      return NextResponse.json(
        { error: "Título, descripción y problema resuelto son obligatorios" },
        { status: 400 }
      );
    }

    const count = await prisma.service.count();
    const slug = (body.id || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newService = await prisma.service.create({
      data: {
        id: slug ? `${slug}-${Date.now().toString().slice(-4)}` : `service-${Date.now()}`,
        title,
        iconName: iconName || "Code2",
        problemSolved,
        description,
        highlights: Array.isArray(highlights) ? highlights : [],
        order: count,
      },
    });

    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error: unknown) {
    console.error("[Create Service Error]:", error);
    const message = error instanceof Error ? error.message : "Error al crear servicio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
