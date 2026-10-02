import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { getTeamData, ensureDatabaseSeeded } from "@/lib/content/data-service";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  await ensureDatabaseSeeded();
  const team = await getTeamData();
  return NextResponse.json({ team });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
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

    if (!name || !role) {
      return NextResponse.json(
        { error: "El nombre y el rol son obligatorios" },
        { status: 400 }
      );
    }

    const count = await prisma.teamMember.count();
    const slug = (name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newMember = await prisma.teamMember.create({
      data: {
        id: slug ? `${slug}-${Date.now().toString().slice(-4)}` : `member-${Date.now()}`,
        name,
        role,
        specialty: specialty || "",
        avatarText: avatarText || name.substring(0, 2).toUpperCase(),
        image: image || null,
        linkedinUrl: linkedinUrl || null,
        githubUrl: githubUrl || null,
        isProvisional: Boolean(isProvisional),
        order: count,
      },
    });

    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error: unknown) {
    console.error("[Create Team Member Error]:", error);
    const message = error instanceof Error ? error.message : "Error al crear integrante";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
