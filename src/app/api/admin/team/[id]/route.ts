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
      role,
      specialty,
      avatarText,
      image,
      linkedinUrl,
      githubUrl,
      isProvisional,
    } = body;

    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        specialty,
        avatarText: avatarText || name.substring(0, 2).toUpperCase(),
        image: image !== undefined ? (image || null) : undefined,
        linkedinUrl: linkedinUrl !== undefined ? (linkedinUrl || null) : undefined,
        githubUrl: githubUrl !== undefined ? (githubUrl || null) : undefined,
        isProvisional: Boolean(isProvisional),
      },
    });

    return NextResponse.json({ success: true, member: updated });
  } catch (error: unknown) {
    console.error("[Update Team Member Error]:", error);
    const message = error instanceof Error ? error.message : "Error al actualizar integrante";
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
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("[Delete Team Member Error]:", error);
    const message = error instanceof Error ? error.message : "Error al eliminar integrante";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
