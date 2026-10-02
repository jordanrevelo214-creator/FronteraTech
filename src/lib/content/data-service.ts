import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { initialData } from "./default-data";
import { AboutData } from "@/data/about";
import { ProjectItem } from "@/data/projects";
import { ServiceItem } from "@/data/services";
import { TeamMember } from "@/data/team";
import { CompanyInfo } from "@/data/company";
import { ContactData } from "@/data/contact";

let isDatabaseSeeded = false;

/**
 * Asegura que la base de datos tenga el usuario administrador inicial
 * y todos los datos iniciales sembrados (seeding).
 */
export async function ensureDatabaseSeeded() {
  if (isDatabaseSeeded) return;
  try {
    // 1. Asegurar usuario administrador inicial
    const adminUser = await prisma.user.findFirst();
    if (!adminUser) {
      const defaultUsername = process.env.ADMIN_INITIAL_USERNAME || "admin";
      const defaultPassword =
        process.env.ADMIN_INITIAL_PASSWORD || "AdminFrontera2026*Secure";
      const passwordHash = await hashPassword(defaultPassword);

      await prisma.user.create({
        data: {
          username: defaultUsername,
          passwordHash,
          role: "admin",
        },
      });
      console.log(`[Seed] Usuario administrador inicial creado: ${defaultUsername}`);
    }

    // 2. Asegurar CompanySetting
    const company = await prisma.companySetting.findUnique({ where: { id: "default" } });
    if (!company) {
      await prisma.companySetting.create({
        data: {
          id: "default",
          name: initialData.company.name,
          legalName: initialData.company.legalName,
          tagline: initialData.company.tagline,
          shortDescription: initialData.company.shortDescription,
          fullDescription: initialData.company.fullDescription,
          foundedYear: initialData.company.foundedYear,
        },
      });
    }

    // 3. Asegurar AboutInfo (Misión, Visión, Valores, Proceso)
    const about = await prisma.aboutInfo.findUnique({ where: { id: "default" } });
    if (!about) {
      await prisma.aboutInfo.create({
        data: {
          id: "default",
          overviewHeadline: initialData.about.overview.headline,
          overviewDescription: initialData.about.overview.description,
          overviewNote: initialData.about.overview.noteProvisional,
          missionTitle: initialData.about.mission.title,
          missionStatement: initialData.about.mission.statement,
          missionFocalPoints: initialData.about.mission.focalPoints,
          missionIsProvisional: initialData.about.mission.isProvisional,
          visionTitle: initialData.about.vision.title,
          visionStatement: initialData.about.vision.statement,
          visionFocalPoints: initialData.about.vision.focalPoints,
          visionIsProvisional: initialData.about.vision.isProvisional,
          values: JSON.parse(JSON.stringify(initialData.about.values)),
          process: JSON.parse(JSON.stringify(initialData.about.process)),
        },
      });
    }

    // 4. Asegurar Proyectos iniciales
    const projectsCount = await prisma.project.count();
    if (projectsCount === 0) {
      for (let i = 0; i < initialData.projects.length; i++) {
        const p = initialData.projects[i];
        await prisma.project.create({
          data: {
            id: p.id,
            name: p.name,
            badge: p.badge,
            shortDescription: p.shortDescription,
            problemSolved: p.problemSolved,
            technologies: p.technologies,
            category: p.category,
            demoUrl: p.demoUrl || null,
            repoUrl: p.repoUrl || null,
            isProvisional: p.isProvisional,
            gradient: p.visualTheme?.gradient || "from-blue-600/30 via-cyan-500/20 to-emerald-500/10",
            accentColor: p.visualTheme?.accentColor || "#0ea5e9",
            icon: p.visualTheme?.icon || "Code2",
            order: i,
          },
        });
      }
    }

    // 5. Asegurar Servicios iniciales
    const servicesCount = await prisma.service.count();
    if (servicesCount === 0) {
      for (let i = 0; i < initialData.services.length; i++) {
        const s = initialData.services[i];
        await prisma.service.create({
          data: {
            id: s.id,
            title: s.title,
            iconName: s.iconName,
            problemSolved: s.problemSolved,
            description: s.description,
            highlights: s.highlights,
            order: i,
          },
        });
      }
    }

    // 6. Asegurar Miembros de equipo
    const teamCount = await prisma.teamMember.count();
    if (teamCount === 0) {
      for (let i = 0; i < initialData.team.length; i++) {
        const t = initialData.team[i];
        await prisma.teamMember.create({
          data: {
            id: t.id,
            name: t.name,
            role: t.role,
            specialty: t.specialty,
            avatarText: t.avatarText,
            image: t.image || null,
            linkedinUrl: t.linkedinUrl || null,
            githubUrl: t.githubUrl || null,
            isProvisional: t.isProvisional,
            order: i,
          },
        });
      }
    }

    // 7. Asegurar ContactInfo
    const contact = await prisma.contactInfo.findUnique({ where: { id: "default" } });
    if (!contact) {
      await prisma.contactInfo.create({
        data: {
          id: "default",
          headline: initialData.contact.headline,
          subtitle: initialData.contact.subtitle,
          availabilityNotice: initialData.contact.availabilityNotice,
          channels: JSON.parse(JSON.stringify(initialData.contact.channels)),
        },
      });
    }

    isDatabaseSeeded = true;
  } catch (error) {
    console.warn("[ensureDatabaseSeeded] Nota de conexión a BD:", error);
  }
}

/**
 * Obtiene la información corporativa
 */
export async function getCompanyData(): Promise<CompanyInfo> {
  try {
    const record = await prisma.companySetting.findUnique({ where: { id: "default" } });
    if (!record) return initialData.company;

    return {
      name: record.name,
      legalName: record.legalName,
      tagline: record.tagline,
      shortDescription: record.shortDescription,
      fullDescription: record.fullDescription,
      foundedYear: record.foundedYear,
    };
  } catch {
    return initialData.company;
  }
}

/**
 * Obtiene los datos de Sobre Nosotros (Misión, Visión, Valores, Procesos)
 */
export async function getAboutData(): Promise<AboutData> {
  try {
    const record = await prisma.aboutInfo.findUnique({ where: { id: "default" } });
    if (!record) return initialData.about;

    return {
      overview: {
        headline: record.overviewHeadline,
        description: record.overviewDescription,
        noteProvisional: record.overviewNote,
      },
      mission: {
        title: record.missionTitle,
        statement: record.missionStatement,
        focalPoints: record.missionFocalPoints,
        isProvisional: record.missionIsProvisional,
      },
      vision: {
        title: record.visionTitle,
        statement: record.visionStatement,
        focalPoints: record.visionFocalPoints,
        isProvisional: record.visionIsProvisional,
      },
      values: record.values as unknown as AboutData["values"],
      process: record.process as unknown as AboutData["process"],
    };
  } catch {
    return initialData.about;
  }
}

/**
 * Obtiene los proyectos ordenados
 */
export async function getProjectsData(): Promise<ProjectItem[]> {
  try {
    const records = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    if (!records || records.length === 0) return initialData.projects;

    return records.map((p) => ({
      id: p.id,
      name: p.name,
      badge: p.badge,
      shortDescription: p.shortDescription,
      problemSolved: p.problemSolved,
      technologies: p.technologies,
      category: p.category,
      demoUrl: p.demoUrl || undefined,
      repoUrl: p.repoUrl || undefined,
      isProvisional: p.isProvisional,
      visualTheme: {
        gradient: p.gradient,
        accentColor: p.accentColor,
        icon: p.icon,
      },
    }));
  } catch {
    return initialData.projects;
  }
}

/**
 * Obtiene los servicios ordenados
 */
export async function getServicesData(): Promise<ServiceItem[]> {
  try {
    const records = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });
    if (!records || records.length === 0) return initialData.services;

    return records.map((s) => ({
      id: s.id,
      title: s.title,
      iconName: s.iconName as ServiceItem["iconName"],
      problemSolved: s.problemSolved,
      description: s.description,
      highlights: s.highlights,
    }));
  } catch {
    return initialData.services;
  }
}

/**
 * Obtiene los miembros del equipo ordenados
 */
export async function getTeamData(): Promise<TeamMember[]> {
  try {
    const records = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    if (!records || records.length === 0) return initialData.team;

    return records.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      specialty: t.specialty,
      avatarText: t.avatarText,
      image: t.image || undefined,
      linkedinUrl: t.linkedinUrl || undefined,
      githubUrl: t.githubUrl || undefined,
      isProvisional: t.isProvisional,
    }));
  } catch {
    return initialData.team;
  }
}

/**
 * Obtiene los datos de contacto
 */
export async function getContactData(): Promise<ContactData> {
  try {
    const record = await prisma.contactInfo.findUnique({ where: { id: "default" } });
    if (!record) return initialData.contact;

    return {
      headline: record.headline,
      subtitle: record.subtitle,
      availabilityNotice: record.availabilityNotice,
      channels: record.channels as unknown as ContactData["channels"],
    };
  } catch {
    return initialData.contact;
  }
}
