import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { getProjectsData, ensureDatabaseSeeded } from "@/lib/content/data-service";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  await ensureDatabaseSeeded();
  const projects = await getProjectsData();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const {
      name,
      badge,
      shortDescription,
      problemSolved,
      technologies,
      category,
      demoUrl,
      repoUrl,
      isProvisional,
      visualTheme,
    } = body;

    if (!name || !shortDescription || !problemSolved || !category) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios para el proyecto" },
        { status: 400 }
      );
    }

    // Generar ID/slug si no viene dado
    const slug = (body.id || name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const count = await prisma.project.count();

    const newProject = await prisma.project.create({
      data: {
        id: slug || `project-${Date.now()}`,
        name,
        badge: badge || "Proyecto Realizado",
        shortDescription,
        problemSolved,
        technologies: Array.isArray(technologies) ? technologies : [],
        category,
        demoUrl: demoUrl || null,
        repoUrl: repoUrl || null,
        isProvisional: Boolean(isProvisional),
        gradient: visualTheme?.gradient || "from-blue-600/30 via-cyan-500/20 to-emerald-500/10",
        accentColor: visualTheme?.accentColor || "#0ea5e9",
        icon: visualTheme?.icon || "Code2",
        order: count,
      },
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error: unknown) {
    console.error("[Create Project Error]:", error);
    const message = error instanceof Error ? error.message : "Error al crear el proyecto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
