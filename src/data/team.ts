export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatarText: string;
  image?: string;
  techIcons?: Array<{ label: string; iconType: "code" | "cloud" | "database" | "react" | "js" | "python" | "server" | "figma" | "xd" | "design" }>;
  linkedinUrl?: string;
  githubUrl?: string;
  isProvisional: boolean;
}

export const teamData: TeamMember[] = [
  {
    id: "lead-architect",
    name: "Liderazgo de Arquitectura & Software",
    role: "TECH LEAD / SOFTWARE ARCHITECT",
    specialty: "Diseña la estructura tecnológica, asegura la escalabilidad y guía el desarrollo con visión estratégica y buenas prácticas.",
    avatarText: "LA",
    image: "/images/team/tech-lead.jpg",
    techIcons: [
      { label: "</>", iconType: "code" },
      { label: "Cloud", iconType: "cloud" },
      { label: "DB", iconType: "database" },
    ],
    linkedinUrl: "https://linkedin.com/company/frontera-tech",
    githubUrl: "https://github.com/frontera-tech",
    isProvisional: false,
  },
  {
    id: "fullstack-lead",
    name: "Ingeniería Full-Stack & Frontend",
    role: "SOFTWARE ENGINEER / FRONTEND",
    specialty: "Desarrolla interfaces intuitivas, funcionales y de alto rendimiento, conectando experiencia de usuario y lógica de negocio.",
    avatarText: "FS",
    image: "/images/team/frontend-dev.jpg",
    techIcons: [
      { label: "</>", iconType: "code" },
      { label: "React", iconType: "react" },
      { label: "JS", iconType: "js" },
    ],
    linkedinUrl: "https://linkedin.com/company/frontera-tech",
    githubUrl: "https://github.com/frontera-tech",
    isProvisional: false,
  },
  {
    id: "backend-cloud",
    name: "Ingeniería Backend & Cloud",
    role: "BACKEND ENGINEER / CLOUD",
    specialty: "Construye servicios robustos, escalables y seguros, optimizando la infraestructura en la nube para garantizar alto rendimiento y disponibilidad.",
    avatarText: "BC",
    image: "/images/team/backend-dev.jpg",
    techIcons: [
      { label: "Py", iconType: "python" },
      { label: "Server", iconType: "server" },
      { label: "AWS", iconType: "cloud" },
    ],
    linkedinUrl: "https://linkedin.com/company/frontera-tech",
    githubUrl: "https://github.com/frontera-tech",
    isProvisional: false,
  },
  {
    id: "product-design",
    name: "Diseño de Producto & UX/UI/UX",
    role: "PRODUCT DESIGNER / UX/UI",
    specialty: "Crea experiencias digitales centradas en el usuario, combinando investigación, creatividad y diseño funcional para resolver problemas reales.",
    avatarText: "PD",
    image: "/images/team/uiux-designer.jpg",
    techIcons: [
      { label: "Figma", iconType: "figma" },
      { label: "Xd", iconType: "xd" },
      { label: "Design", iconType: "design" },
    ],
    linkedinUrl: "https://linkedin.com/company/frontera-tech",
    githubUrl: "https://github.com/frontera-tech",
    isProvisional: false,
  },
];
