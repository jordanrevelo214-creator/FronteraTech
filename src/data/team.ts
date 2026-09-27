export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatarText: string;
  image?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  isProvisional: boolean;
}

export const teamData: TeamMember[] = [
  {
    id: "lead-architect",
    name: "Liderazgo de Arquitectura & Software",
    role: "Tech Lead & Solutions Architect",
    specialty: "Diseño de sistemas distribuidos, escalabilidad y buenas prácticas de ingeniería.",
    avatarText: "LA",
    linkedinUrl: "https://linkedin.com/company/frontera-tech",
    githubUrl: "https://github.com/frontera-tech",
    isProvisional: true,
  },
  {
    id: "fullstack-lead",
    name: "Ingeniería Full-Stack & Frontend",
    role: "Senior Full-Stack Engineer",
    specialty: "Desarrollo de interfaces modernas, alto rendimiento y aplicaciones web en Next.js y React.",
    avatarText: "FS",
    linkedinUrl: "https://linkedin.com/company/frontera-tech",
    githubUrl: "https://github.com/frontera-tech",
    isProvisional: true,
  },
  {
    id: "backend-cloud",
    name: "Ingeniería Backend & Cloud",
    role: "Cloud & DevOps Specialist",
    specialty: "Contenedores Docker, pipelines CI/CD, bases de datos optimizadas e infraestructura resiliente.",
    avatarText: "BC",
    linkedinUrl: "https://linkedin.com/company/frontera-tech",
    githubUrl: "https://github.com/frontera-tech",
    isProvisional: true,
  },
  {
    id: "product-design",
    name: "Diseño de Producto & UI/UX",
    role: "Product & UI/UX Designer",
    specialty: "Sistemas de diseño, prototipado interactivo y accesibilidad para experiencias fluidas.",
    avatarText: "PD",
    linkedinUrl: "https://linkedin.com/company/frontera-tech",
    isProvisional: true,
  },
];
