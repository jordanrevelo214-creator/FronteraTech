import { PrismaClient } from "@prisma/client";
import crypto from "node:crypto";

const prisma = new PrismaClient();

const PBKDF2_DIGEST = "sha256";
const PBKDF2_ITERATIONS = 100000;
const KEY_LEN = 64;
const SALT_BYTES = 16;

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(SALT_BYTES).toString("hex");
    crypto.pbkdf2(
      password,
      salt,
      PBKDF2_ITERATIONS,
      KEY_LEN,
      PBKDF2_DIGEST,
      (err, derivedKey) => {
        if (err) return reject(err);
        const hash = derivedKey.toString("hex");
        resolve(`pbkdf2:${PBKDF2_DIGEST}:${PBKDF2_ITERATIONS}:${salt}:${hash}`);
      }
    );
  });
}

async function main() {
  console.log("🌱 Iniciando siembra (seeding) de FronteraTech en PostgreSQL...");

  // 1. Usuario Admin
  const adminUsername = process.env.ADMIN_INITIAL_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "AdminFrontera2026*Secure";
  const passwordHash = await hashPassword(adminPassword);

  const existingAdmin = await prisma.user.findUnique({
    where: { username: adminUsername },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        username: adminUsername,
        passwordHash,
        role: "admin",
      },
    });
    console.log(`✅ Usuario admin creado con éxito: ${adminUsername}`);
  } else {
    console.log(`ℹ️ Usuario admin ya existe: ${adminUsername}`);
  }

  // 2. Información Corporativa
  await prisma.companySetting.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      name: "Frontera Tech",
      legalName: "Frontera Tech",
      tagline: "Automatizamos tus procesos, impulsamos tu crecimiento.",
      shortDescription:
        "Especialistas en ingeniería de software a medida, desarrollo web y móvil de alto rendimiento, y automatización inteligente para acelerar operaciones empresariales.",
      fullDescription:
        "Frontera Tech es una firma de desarrollo tecnológico enfocada en crear productos digitales robustos, modernos y visualmente impactantes. Ayudamos a empresas e innovadores a materializar sus ideas con arquitectura limpia, metodologías ágiles y los más altos estándares de calidad.",
      foundedYear: 2024,
    },
    update: {},
  });
  console.log("✅ Configuración de compañía sembrada");

  // 3. Misión, Visión, Valores y Procesos
  await prisma.aboutInfo.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      overviewHeadline: "Ingeniería de software con enfoque en impacto y calidad duradera",
      overviewDescription:
        "En Frontera Tech unimos pensamiento estratégico, diseño de experiencias y código limpio para construir soluciones tecnológicas que resuelvan necesidades operativas y aceleren el crecimiento de organizaciones modernas.",
      overviewNote:
        "Nota: Los textos de misión, visión y valores reflejan lineamientos preliminares y pueden ser personalizados con la redacción definitiva de la empresa.",
      missionTitle: "Nuestra Misión",
      missionStatement:
        "Acompañar a empresas y emprendedores en su evolución tecnológica diseñando y desarrollando software robusto, intuitivo y seguro que optimice sus procesos de negocio y genere valor medible.",
      missionFocalPoints: [
        "Soluciones a la medida de objetivos reales",
        "Código mantenible, documentado y seguro",
        "Comunicación continua y transparente",
      ],
      missionIsProvisional: true,
      visionTitle: "Nuestra Visión",
      visionStatement:
        "Consolidarnos como un referente regional e internacional en desarrollo de software de alta calidad, reconocidos por nuestra capacidad técnica, rigurosidad metodológica y compromiso con el éxito de nuestros clientes.",
      visionFocalPoints: [
        "Liderazgo en adopción de tecnologías modernas",
        "Cultura centrada en la excelencia y el talento humano",
        "Expansión de proyectos con alcance global",
      ],
      visionIsProvisional: true,
      values: [
        {
          title: "Transparencia & Compromiso",
          description:
            "Estimaciones honestas, código auditable y visibilidad total del progreso en cada sprint de desarrollo.",
          iconName: "ShieldCheck",
        },
        {
          title: "Excelencia Técnica",
          description:
            "Adopción de estándares de arquitectura limpia, pruebas sistemáticas y rendimiento de primer nivel.",
          iconName: "Zap",
        },
        {
          title: "Innovación Pragmática",
          description:
            "Elegimos la tecnología que mejor resuelve el problema del cliente, priorizando estabilidad y retorno de inversión.",
          iconName: "Sparkles",
        },
        {
          title: "Colaboración Estrecha",
          description:
            "Trabajamos como una extensión del equipo de nuestros clientes para entender su industria y sus metas.",
          iconName: "Users",
        },
      ],
      process: [
        {
          step: "01",
          title: "Descubrimiento & Estrategia",
          description: "Analizamos requerimientos, flujos de negocio y definimos el alcance técnico y cronograma.",
        },
        {
          step: "02",
          title: "Arquitectura & Prototipado",
          description: "Diseñamos la estructura de datos, componentes de interfaz y flujos de usuario antes de programar.",
        },
        {
          step: "03",
          title: "Desarrollo Ágil & QA",
          description: "Construimos en iteraciones funcionales con pruebas continuas de calidad, seguridad y velocidad.",
        },
        {
          step: "04",
          title: "Despliegue & Evolución",
          description: "Lanzamos a producción en infraestructura segura con monitoreo continuo y soporte post-lanzamiento.",
        },
      ],
    },
    update: {},
  });
  console.log("✅ Misión, Visión, Valores y Procesos sembrados");

  // 4. Proyectos
  const initialProjects = [
    {
      id: "plataforma-logistica-saas",
      name: "Nexus Fleet - Gestión Logística en Tiempo Real",
      badge: "Proyecto Conceptual Demostrativo",
      shortDescription:
        "Plataforma centralizada para telemetría, asignación de rutas y despacho inteligente de flotas de transporte terrestre.",
      problemSolved:
        "Optimiza tiempos de entrega y reduce el consumo de combustible mediante algoritmos de enrutamiento predictivo y trazabilidad satelital en vivo.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "PostgreSQL", "Docker"],
      category: "Web & Logística",
      demoUrl: "https://demo.fronteratech.example/nexus-fleet",
      isProvisional: true,
      gradient: "from-blue-600/30 via-cyan-500/20 to-emerald-500/10",
      accentColor: "#0ea5e9",
      icon: "Truck",
      order: 0,
    },
    {
      id: "portal-medico-telemedicina",
      name: "CarePulse - Portal Clínico y Teleconsultas",
      badge: "Proyecto Conceptual Demostrativo",
      shortDescription:
        "Sistema de gestión de expedientes clínicos electrónicos, reservas de citas y consultas virtuales seguras.",
      problemSolved:
        "Disminuye el ausentismo en consultas médicas y digitaliza historiales clínicos bajo estrictos estándares de privacidad de datos.",
      technologies: ["React", "Node.js", "WebRTC", "Tailwind CSS", "Redis", "Docker"],
      category: "Salud Digital",
      demoUrl: null,
      isProvisional: true,
      gradient: "from-emerald-600/30 via-teal-500/20 to-blue-500/10",
      accentColor: "#10b981",
      icon: "Activity",
      order: 1,
    },
    {
      id: "dashboard-financiero-analytics",
      name: "FinVantage - Analytics y Conciliación Financiera",
      badge: "Proyecto Conceptual Demostrativo",
      shortDescription:
        "Panel de control para conciliación bancaria automatizada y proyecciones de flujo de caja con análisis predictivo.",
      problemSolved:
        "Elimina discrepancias en el cierre contable mensual procesando miles de transacciones bancarias en segundos con reglas automatizadas.",
      technologies: ["Next.js", "Python FastApi", "Apache Kafka", "Tailwind CSS", "Docker"],
      category: "Fintech & Data",
      demoUrl: null,
      isProvisional: true,
      gradient: "from-indigo-600/30 via-purple-500/20 to-cyan-500/10",
      accentColor: "#6366f1",
      icon: "TrendingUp",
      order: 2,
    },
    {
      id: "app-movil-retail-field",
      name: "OmniStock - Inventarios y Punto de Venta Móvil",
      badge: "Proyecto Conceptual Demostrativo",
      shortDescription:
        "Aplicación móvil para operarios de almacén con escaneo de código de barras por cámara y modo offline.",
      problemSolved:
        "Evita quiebres de inventario y errores de digitación en tiendas físicas mediante captura instantánea y sincronización en cola.",
      technologies: ["React Native", "TypeScript", "SQLite", "Node.js", "Docker"],
      category: "Mobile & Retail",
      demoUrl: null,
      isProvisional: true,
      gradient: "from-amber-600/30 via-orange-500/20 to-red-500/10",
      accentColor: "#f59e0b",
      icon: "Box",
      order: 3,
    },
  ];

  for (const proj of initialProjects) {
    await prisma.project.upsert({
      where: { id: proj.id },
      create: proj,
      update: {},
    });
  }
  console.log(`✅ ${initialProjects.length} Proyectos sembrados`);

  // 5. Contacto
  await prisma.contactInfo.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      headline: "¿Tienes un proyecto o desafío técnico en mente?",
      subtitle:
        "Hablemos sobre tus metas de software y cómo podemos ayudarte a construirlas con calidad y agilidad.",
      availabilityNotice:
        "Disponibles para proyectos nuevos y consultoría técnica. Respuestas en menos de 24 horas hábiles.",
      channels: [
        {
          id: "email",
          type: "email",
          title: "Correo Electrónico",
          value: "contacto@fronteratech.com",
          href: "mailto:contacto@fronteratech.com?subject=Consulta%20sobre%20nuevo%20proyecto%20-%20Frontera%20Tech",
          actionText: "Enviar correo directo",
          isPendingConfirmation: false,
        },
        {
          id: "whatsapp",
          type: "whatsapp",
          title: "WhatsApp Directo",
          value: "Canal oficial para consultas rápidas",
          href: "https://wa.me/?text=Hola%20Frontera%20Tech,%20me%20gustar%C3%ADa%20conversar%20sobre%20un%20proyecto",
          actionText: "Iniciar chat por WhatsApp",
          isPendingConfirmation: true,
        },
        {
          id: "linkedin",
          type: "linkedin",
          title: "LinkedIn Corporativo",
          value: "linkedin.com/company/frontera-tech",
          href: "https://linkedin.com/company/frontera-tech",
          actionText: "Visitar perfil de LinkedIn",
          isPendingConfirmation: true,
        },
        {
          id: "location",
          type: "location",
          title: "Modalidad & Cobertura",
          value: "Operación 100% Remota con base regional y cobertura global",
          href: "#contacto",
          actionText: "Horario: Lun - Vie (GMT-5)",
          isPendingConfirmation: false,
        },
      ],
    },
    update: {},
  });
  console.log("✅ Información de Contacto sembrada");

  console.log("✨ Siembra completada con éxito.");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
