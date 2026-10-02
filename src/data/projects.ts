export interface ProjectItem {
  id: string;
  name: string;
  badge: string;
  shortDescription: string;
  problemSolved: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  repoUrl?: string;
  isProvisional: boolean;
  image?: string;
  visualTheme: {
    gradient: string;
    accentColor: string;
    icon: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: "plataforma-logistica-saas",
    name: "Nexus Fleet - Gestión Logística en Tiempo Real",
    badge: "Proyecto Completo",
    shortDescription:
      "Plataforma centralizada para telemetría, asignación de rutas y despacho inteligente de flotas de transporte terrestre.",
    problemSolved:
      "Optimiza tiempos de entrega y reduce el consumo de combustible mediante algoritmos de enrutamiento predictivo y trazabilidad satelital en vivo.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "PostgreSQL", "Docker"],
    category: "Web & Logística",
    demoUrl: "https://demo.fronteratech.example/nexus-fleet",
    image: "/images/projects/nexus-fleet.jpg",
    isProvisional: false,
    visualTheme: {
      gradient: "from-blue-600/30 via-cyan-500/20 to-emerald-500/10",
      accentColor: "#0ea5e9",
      icon: "Truck",
    },
  },
  {
    id: "portal-medico-telemedicina",
    name: "CarePulse - Portal Clínico y Teleconsultas",
    badge: "Proyecto Completo",
    shortDescription:
      "Sistema de gestión de expedientes clínicos electrónicos, reservas de citas y consultas virtuales seguras.",
    problemSolved:
      "Disminuye el ausentismo en consultas médicas y digitaliza historiales clínicos bajo estrictos estándares de privacidad de datos.",
    technologies: ["React", "Node.js", "WebRTC", "Tailwind CSS", "Redis", "Docker"],
    category: "Salud Digital",
    demoUrl: "https://demo.fronteratech.example/carepulse",
    image: "/images/projects/carepulse.jpg",
    isProvisional: false,
    visualTheme: {
      gradient: "from-emerald-600/30 via-teal-500/20 to-blue-500/10",
      accentColor: "#10b981",
      icon: "Activity",
    },
  },
  {
    id: "dashboard-financiero-analytics",
    name: "FinVantage - Analytics y Conciliación Financiera",
    badge: "Proyecto Completo",
    shortDescription:
      "Panel de control para conciliación bancaria automatizada y proyecciones de flujo de caja con análisis predictivo.",
    problemSolved:
      "Elimina discrepancias en el cierre contable mensual procesando miles de transacciones bancarias en segundos con reglas automatizadas.",
    technologies: ["Next.js", "Python FastAPI", "Apache Kafka", "Tailwind CSS", "Docker"],
    category: "Fintech & Data",
    demoUrl: "https://demo.fronteratech.example/finvantage",
    image: "/images/projects/finvantage.jpg",
    isProvisional: false,
    visualTheme: {
      gradient: "from-indigo-600/30 via-purple-500/20 to-cyan-500/10",
      accentColor: "#6366f1",
      icon: "TrendingUp",
    },
  },
  {
    id: "app-movil-retail-field",
    name: "OmniStock - Inventarios y Punto de Venta Móvil",
    badge: "Proyecto Completo",
    shortDescription:
      "Aplicación móvil para operarios de almacén con escaneo de código de barras por cámara y modo offline.",
    problemSolved:
      "Evita quiebres de inventario y errores de digitación en tiendas físicas mediante captura instantánea y sincronización en cola.",
    technologies: ["React Native", "TypeScript", "SQLite", "Node.js", "Docker"],
    category: "Mobile & Retail",
    demoUrl: "https://demo.fronteratech.example/omnistock",
    image: "/images/projects/omnistock.jpg",
    isProvisional: false,
    visualTheme: {
      gradient: "from-amber-600/30 via-orange-500/20 to-red-500/10",
      accentColor: "#f59e0b",
      icon: "Box",
    },
  },
  {
    id: "ciberseguridad-soc-analytics",
    name: "CyberGuard - Centro de Operaciones SOC & Ciberdefensa",
    badge: "Proyecto Completo",
    shortDescription:
      "Plataforma de inteligencia de amenazas, monitoreo de incidentes y mitigación automática de ataques DDoS.",
    problemSolved:
      "Detecta anomalías en el tráfico de red en milisegundos aislando vectores de ataque antes de que afecten la infraestructura crítica.",
    technologies: ["Next.js", "Go", "Elasticsearch", "Grafana", "Kubernetes", "Docker"],
    category: "Ciberseguridad & Cloud",
    demoUrl: "https://demo.fronteratech.example/cyberguard",
    image: "/images/projects/cyberguard.jpg",
    isProvisional: false,
    visualTheme: {
      gradient: "from-cyan-600/30 via-blue-500/20 to-indigo-500/10",
      accentColor: "#00e5ff",
      icon: "Shield",
    },
  },
];
