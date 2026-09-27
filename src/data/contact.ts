export interface ContactChannel {
  id: string;
  type: "email" | "whatsapp" | "linkedin" | "github" | "location";
  title: string;
  value: string;
  href: string;
  actionText: string;
  isPendingConfirmation?: boolean;
}

export interface ContactData {
  headline: string;
  subtitle: string;
  channels: ContactChannel[];
  availabilityNotice: string;
}

export const contactData: ContactData = {
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
};
