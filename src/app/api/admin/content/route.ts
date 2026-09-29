import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import {
  getAboutData,
  getCompanyData,
  getContactData,
  ensureDatabaseSeeded,
} from "@/lib/content/data-service";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  await ensureDatabaseSeeded();

  const [about, company, contact] = await Promise.all([
    getAboutData(),
    getCompanyData(),
    getContactData(),
  ]);

  return NextResponse.json({ about, company, contact });
}

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json(
        { error: "Sección y datos requeridos" },
        { status: 400 }
      );
    }

    if (section === "about") {
      await prisma.aboutInfo.upsert({
        where: { id: "default" },
        create: {
          id: "default",
          overviewHeadline: data.overview?.headline || "",
          overviewDescription: data.overview?.description || "",
          overviewNote: data.overview?.noteProvisional || "",
          missionTitle: data.mission?.title || "Nuestra Misión",
          missionStatement: data.mission?.statement || "",
          missionFocalPoints: data.mission?.focalPoints || [],
          missionIsProvisional: Boolean(data.mission?.isProvisional),
          visionTitle: data.vision?.title || "Nuestra Visión",
          visionStatement: data.vision?.statement || "",
          visionFocalPoints: data.vision?.focalPoints || [],
          visionIsProvisional: Boolean(data.vision?.isProvisional),
          values: data.values || [],
          process: data.process || [],
        },
        update: {
          overviewHeadline: data.overview?.headline,
          overviewDescription: data.overview?.description,
          overviewNote: data.overview?.noteProvisional,
          missionTitle: data.mission?.title,
          missionStatement: data.mission?.statement,
          missionFocalPoints: data.mission?.focalPoints,
          missionIsProvisional: Boolean(data.mission?.isProvisional),
          visionTitle: data.vision?.title,
          visionStatement: data.vision?.statement,
          visionFocalPoints: data.vision?.focalPoints,
          visionIsProvisional: Boolean(data.vision?.isProvisional),
          values: data.values,
          process: data.process,
        },
      });
      return NextResponse.json({ success: true, message: "Misión, Visión y Acerca de actualizados con éxito" });
    }

    if (section === "company") {
      await prisma.companySetting.upsert({
        where: { id: "default" },
        create: {
          id: "default",
          name: data.name || "Frontera Tech",
          legalName: data.legalName || "Frontera Tech",
          tagline: data.tagline || "",
          shortDescription: data.shortDescription || "",
          fullDescription: data.fullDescription || "",
          foundedYear: Number(data.foundedYear) || 2024,
        },
        update: {
          name: data.name,
          legalName: data.legalName,
          tagline: data.tagline,
          shortDescription: data.shortDescription,
          fullDescription: data.fullDescription,
          foundedYear: Number(data.foundedYear),
        },
      });
      return NextResponse.json({ success: true, message: "Información corporativa guardada con éxito" });
    }

    if (section === "contact") {
      await prisma.contactInfo.upsert({
        where: { id: "default" },
        create: {
          id: "default",
          headline: data.headline || "",
          subtitle: data.subtitle || "",
          availabilityNotice: data.availabilityNotice || "",
          channels: data.channels || [],
        },
        update: {
          headline: data.headline,
          subtitle: data.subtitle,
          availabilityNotice: data.availabilityNotice,
          channels: data.channels,
        },
      });
      return NextResponse.json({ success: true, message: "Información de contacto guardada con éxito" });
    }

    return NextResponse.json({ error: "Sección no reconocida" }, { status: 400 });
  } catch (error) {
    console.error("[PUT Content Error]:", error);
    return NextResponse.json({ error: "Error al actualizar contenido" }, { status: 500 });
  }
}
