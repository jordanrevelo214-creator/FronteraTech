export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

export const navigationItems: NavItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto", isCta: true },
];
