export interface ServiceItem {
  id: string;
  title: string;
  iconName: "Code2" | "Globe" | "Smartphone" | "Cpu" | "Wrench" | "Cloud";
  problemSolved: string;
  description: string;
  highlights: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "software-a-medida",
    title: "Desarrollo de Software a Medida",
    iconName: "Code2",
    problemSolved:
      "Elimina las limitaciones y costos recurrentes del software genérico adaptando la tecnología exactamente a la lógica operativa de tu negocio.",
    description:
      "Diseñamos y programamos sistemas empresariales exclusivos, asegurando alta escalabilidad, seguridad rigurosa y total control sobre tus datos y flujos de trabajo.",
    highlights: [
      "Arquitecturas modulares y escalables",
      "Modelado de datos optimizado",
      "Seguridad y cumplimiento de normativas",
    ],
  },
  {
    id: "aplicaciones-web",
    title: "Desarrollo de Aplicaciones Web",
    iconName: "Globe",
    problemSolved:
      "Resuelve la lentitud de carga y la mala experiencia de usuario en plataformas comerciales para convertir más visitantes en clientes.",
    description:
      "Construimos portales, dashboards y plataformas SaaS modernas con renderizado ultra rápido, responsive design y óptima indexación para motores de búsqueda.",
    highlights: [
      "Single Page Applications & SSR",
      "Interfaces intuitivas y responsivas",
      "Optimización de rendimiento (Core Web Vitals)",
    ],
  },
  {
    id: "aplicaciones-moviles",
    title: "Desarrollo de Aplicaciones Móviles",
    iconName: "Smartphone",
    problemSolved:
      "Supera la barrera de acceso conectando directamente con tus usuarios en cualquier momento desde sus dispositivos iOS y Android.",
    description:
      "Desarrollamos aplicaciones nativas y multiplataforma fluidas, con notificaciones inteligentes, sincronización offline y experiencias de usuario excepcionales.",
    highlights: [
      "Experiencia multiplataforma nativa",
      "Sincronización en tiempo real y offline",
      "Integración con hardware del dispositivo",
    ],
  },
  {
    id: "automatizacion-procesos",
    title: "Integración y Automatización",
    iconName: "Cpu",
    problemSolved:
      "Reduce el error humano y cientos de horas manuales conectando sistemas desconectados (CRM, ERP, pasarelas de pago y APIs de terceros).",
    description:
      "Diseñamos pipelines automáticos, webhooks y microservicios que sincronizan la información de tu empresa sin intervención humana repetitiva.",
    highlights: [
      "Conexión de APIs REST y GraphQL",
      "Workflows automatizados y alertas",
      "Reducción de costos operativos manuales",
    ],
  },
  {
    id: "mantenimiento-soporte",
    title: "Mantenimiento y Soporte Continuo",
    iconName: "Wrench",
    problemSolved:
      "Previene caídas inesperadas de servicio, vulnerabilidades de seguridad y obsolescencia tecnológica que puedan paralizar tus operaciones.",
    description:
      "Brindamos monitoreo proactivo, actualización continua de dependencias, auditorías de seguridad y resolución rápida de incidencias técnicas.",
    highlights: [
      "Monitoreo de uptime 24/7",
      "Parches de seguridad y upgrades",
      "Acuerdos de nivel de servicio (SLA) claros",
    ],
  },
  {
    id: "cloud-devops",
    title: "Arquitectura Cloud y DevOps",
    iconName: "Cloud",
    problemSolved:
      "Soluciona problemas de estabilidad ante picos de tráfico y simplifica despliegues sin interrupción para los clientes finales.",
    description:
      "Configuramos infraestructuras en la nube basadas en contenedores, CI/CD automatizado y escalado elástico eficiente en costos.",
    highlights: [
      "Contenedores Docker y Kubernetes",
      "Despliegues automatizados (CI/CD)",
      "Optimización de costos en la nube",
    ],
  },
];
