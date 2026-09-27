export interface CoreValue {
  title: string;
  description: string;
  iconName: "ShieldCheck" | "Zap" | "Sparkles" | "Users";
}

export interface WorkStep {
  step: string;
  title: string;
  description: string;
}

export interface AboutData {
  overview: {
    headline: string;
    description: string;
    noteProvisional: string;
  };
  mission: {
    title: string;
    statement: string;
    focalPoints: string[];
    isProvisional: boolean;
  };
  vision: {
    title: string;
    statement: string;
    focalPoints: string[];
    isProvisional: boolean;
  };
  values: CoreValue[];
  process: WorkStep[];
}

export const aboutData: AboutData = {
  overview: {
    headline: "Ingeniería de software con enfoque en impacto y calidad duradera",
    description:
      "En Frontera Tech unimos pensamiento estratégico, diseño de experiencias y código limpio para construir soluciones tecnológicas que resuelvan necesidades operativas y aceleren el crecimiento de organizaciones modernas.",
    noteProvisional:
      "Nota: Los textos de misión, visión y valores reflejan lineamientos preliminares y pueden ser personalizados con la redacción definitiva de la empresa.",
  },
  mission: {
    title: "Nuestra Misión",
    statement:
      "Acompañar a empresas y emprendedores en su evolución tecnológica diseñando y desarrollando software robusto, intuitivo y seguro que optimice sus procesos de negocio y genere valor medible.",
    focalPoints: [
      "Soluciones a la medida de objetivos reales",
      "Código mantenible, documentado y seguro",
      "Comunicación continua y transparente",
    ],
    isProvisional: true,
  },
  vision: {
    title: "Nuestra Visión",
    statement:
      "Consolidarnos como un referente regional e internacional en desarrollo de software de alta calidad, reconocidos por nuestra capacidad técnica, rigurosidad metodológica y compromiso con el éxito de nuestros clientes.",
    focalPoints: [
      "Liderazgo en adopción de tecnologías modernas",
      "Cultura centrada en la excelencia y el talento humano",
      "Expansión de proyectos con alcance global",
    ],
    isProvisional: true,
  },
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
};
