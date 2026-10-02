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
      title,
      iconName,
      problemSolved,
      description,
      highlights,
    } = body;

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title,
        iconName: iconName || "Code2",
        problemSolved,
        description,
        highlights: Array.isArray(highlights) ? highlights : [],
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: unknown) {
    console.error("[Update Service Error]:", error);
    const message = error instanceof Error ? error.message : "Error al actualizar servicio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("[Delete Service Error]:", error);
    const message = error instanceof Error ? error.message : "Error al eliminar servicio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
