import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
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
      order,
    } = body;

    const updated = await prisma.project.update({
      where: { id },
      data: {
        name,
        badge,
        shortDescription,
        problemSolved,
        technologies: Array.isArray(technologies) ? technologies : undefined,
        category,
        demoUrl: demoUrl || null,
        repoUrl: repoUrl || null,
        isProvisional: typeof isProvisional === "boolean" ? isProvisional : undefined,
        gradient: visualTheme?.gradient,
        accentColor: visualTheme?.accentColor,
        icon: visualTheme?.icon,
        order: typeof order === "number" ? order : undefined,
      },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("[Update Project Error]:", error);
    return NextResponse.json({ error: "Error al actualizar proyecto" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error("[Delete Project Error]:", error);
    return NextResponse.json({ error: "Error al eliminar proyecto" }, { status: 500 });
  }
}
