"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  FolderGit2,
  Building2,
  KeyRound,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  X,
  Users,
  Upload,
  Image as ImageIcon,
  Layers,
  Code2,
  Mail,
} from "lucide-react";
import { AboutData } from "@/data/about";
import { CompanyInfo } from "@/data/company";
import { ContactData, ContactChannel } from "@/data/contact";
import { ProjectItem } from "@/data/projects";
import { ServiceItem } from "@/data/services";
import { TeamMember } from "@/data/team";

type TabType =
  | "mission-vision"
  | "team"
  | "services"
  | "projects"
  | "company-contact"
  | "security";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("mission-vision");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Estados de datos
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [companyData, setCompanyData] = useState<CompanyInfo | null>(null);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  // Modal Proyecto
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [projectFormData, setProjectFormData] = useState({
    id: "",
    name: "",
    badge: "Proyecto Realizado",
    shortDescription: "",
    problemSolved: "",
    technologies: "Next.js, TypeScript, PostgreSQL",
    category: "Web & Software",
    demoUrl: "",
    repoUrl: "",
    isProvisional: false,
    accentColor: "#0ea5e9",
    gradient: "from-blue-600/30 via-cyan-500/20 to-emerald-500/10",
    icon: "Code2",
  });

  // Modal Integrante de Equipo
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberFormData, setMemberFormData] = useState({
    id: "",
    name: "",
    role: "",
    specialty: "",
    avatarText: "",
    image: "",
    linkedinUrl: "",
    githubUrl: "",
    isProvisional: false,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal Servicio
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    id: "",
    title: "",
    iconName: "Code2" as ServiceItem["iconName"],
    problemSolved: "",
    description: "",
    highlights: ["Alta disponibilidad y resiliencia", "Arquitectura escalable", "Soporte y documentación"],
  });

  // Contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Cargar datos
  const loadData = async () => {
    setLoading(true);
    try {
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) {
        window.location.href = "/admin/login";
        return;
      }

      const [contentRes, projectsRes, teamRes, servicesRes] = await Promise.all([
        fetch("/api/admin/content"),
        fetch("/api/admin/projects"),
        fetch("/api/admin/team"),
        fetch("/api/admin/services"),
      ]);

      if (contentRes.ok) {
        const cData = await contentRes.json();
        setAboutData(cData.about);
        setCompanyData(cData.company);
        setContactData(cData.contact);
      }

      if (projectsRes.ok) {
        const pData = await projectsRes.json();
        setProjects(pData.projects || []);
      }

      if (teamRes.ok) {
        const tData = await teamRes.json();
        setTeam(tData.team || []);
      }

      if (servicesRes.ok) {
        const sData = await servicesRes.json();
        setServices(sData.services || []);
      }
    } catch {
      setMessage({ type: "error", text: "Error al sincronizar con el servidor." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // Subir imagen al servidor
  const handleUploadImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir la imagen");

      setMemberFormData((prev) => ({ ...prev, image: data.url }));
      showToast("success", "Foto cargada exitosamente.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al subir imagen";
      showToast("error", msg);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Guardar Misión y Visión
  const handleSaveAbout = async () => {
    if (!aboutData) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "about", data: aboutData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("success", "Misión, Visión y Quiénes Somos actualizados.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  // Guardar Empresa y Canales de Contacto
  const handleSaveCompanyContact = async () => {
    setSaving(true);
    try {
      if (companyData) {
        await fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section: "company", data: companyData }),
        });
      }
      if (contactData) {
        await fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section: "contact", data: contactData }),
        });
      }
      showToast("success", "Empresa y canales de contacto guardados correctamente.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar contacto";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  // Ayudante para actualizar canal de contacto
  const updateContactChannel = (
    channelType: "email" | "whatsapp" | "linkedin",
    field: keyof ContactChannel,
    value: string
  ) => {
    if (!contactData) return;
    const channels = [...(contactData.channels || [])];
    const index = channels.findIndex((c) => c.type === channelType);
    if (index >= 0) {
      channels[index] = { ...channels[index], [field]: value };
    } else {
      channels.push({
        id: channelType,
        type: channelType,
        title: channelType === "email" ? "Correo Electrónico" : channelType === "whatsapp" ? "WhatsApp Directo" : "LinkedIn Corporativo",
        value: value,
        href: channelType === "email" ? `mailto:${value}` : value,
        actionText: channelType === "email" ? "Enviar correo directo" : channelType === "whatsapp" ? "Iniciar chat por WhatsApp" : "Visitar perfil de LinkedIn",
        isPendingConfirmation: false,
      });
    }
    setContactData({ ...contactData, channels });
  };

  // Modal de Miembro de Equipo
  const openTeamModal = (m?: TeamMember) => {
    if (m) {
      setEditingMember(m);
      setMemberFormData({
        id: m.id,
        name: m.name,
        role: m.role,
        specialty: m.specialty,
        avatarText: m.avatarText || m.name.substring(0, 2).toUpperCase(),
        image: m.image || "",
        linkedinUrl: m.linkedinUrl || "",
        githubUrl: m.githubUrl || "",
        isProvisional: m.isProvisional,
      });
    } else {
      setEditingMember(null);
      setMemberFormData({
        id: "",
        name: "",
        role: "",
        specialty: "",
        avatarText: "",
        image: "",
        linkedinUrl: "",
        githubUrl: "",
        isProvisional: false,
      });
    }
    setTeamModalOpen(true);
  };

  // Guardar Miembro de Equipo
  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingMember) {
        const res = await fetch(`/api/admin/team/${editingMember.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(memberFormData),
        });
        if (!res.ok) throw new Error("Error al actualizar integrante");
        showToast("success", "Integrante actualizado correctamente.");
      } else {
        const res = await fetch("/api/admin/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(memberFormData),
        });
        if (!res.ok) throw new Error("Error al agregar integrante");
        showToast("success", "Nuevo integrante incorporado al equipo.");
      }
      setTeamModalOpen(false);
      loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al procesar integrante";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  // Eliminar Miembro de Equipo
  const handleDeleteTeamMember = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar al integrante "${name}" del equipo?`)) return;
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo eliminar al integrante");
      showToast("success", `Integrante "${name}" eliminado.`);
      setTeam((prev) => prev.filter((m) => m.id !== id));
    } catch {
      showToast("error", "Error al eliminar integrante.");
    }
  };

  // Modal Servicio
  const openServiceModal = (s?: ServiceItem) => {
    if (s) {
      setEditingService(s);
      setServiceFormData({
        id: s.id,
        title: s.title,
        iconName: s.iconName,
        problemSolved: s.problemSolved,
        description: s.description,
        highlights: s.highlights && s.highlights.length > 0 ? s.highlights : ["Punto clave 1"],
      });
    } else {
      setEditingService(null);
      setServiceFormData({
        id: "",
        title: "",
        iconName: "Code2",
        problemSolved: "",
        description: "",
        highlights: ["Procesos conectados", "Arquitectura escalable", "Control de tus datos"],
      });
    }
    setServiceModalOpen(true);
  };

  // Guardar Servicio
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingService) {
        const res = await fetch(`/api/admin/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceFormData),
        });
        if (!res.ok) throw new Error("Error al actualizar capacidad técnica");
        showToast("success", "Capacidad técnica actualizada.");
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceFormData),
        });
        if (!res.ok) throw new Error("Error al crear servicio");
        showToast("success", "Nueva capacidad de desarrollo agregada.");
      }
      setServiceModalOpen(false);
      loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al procesar servicio";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  // Eliminar Servicio
  const handleDeleteService = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar la capacidad "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo eliminar el servicio");
      showToast("success", `Capacidad "${title}" eliminada.`);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      showToast("error", "Error al eliminar servicio.");
    }
  };

  // Modal Proyecto
  const openProjectModal = (proj?: ProjectItem) => {
    if (proj) {
      setEditingProject(proj);
      setProjectFormData({
        id: proj.id,
        name: proj.name,
        badge: proj.badge,
        shortDescription: proj.shortDescription,
        problemSolved: proj.problemSolved,
        technologies: proj.technologies.join(", "),
        category: proj.category,
        demoUrl: proj.demoUrl || "",
        repoUrl: proj.repoUrl || "",
        isProvisional: proj.isProvisional,
        accentColor: proj.visualTheme?.accentColor || "#0ea5e9",
        gradient: proj.visualTheme?.gradient || "from-blue-600/30 via-cyan-500/20 to-emerald-500/10",
        icon: proj.visualTheme?.icon || "Code2",
      });
    } else {
      setEditingProject(null);
      setProjectFormData({
        id: "",
        name: "",
        badge: "Proyecto Realizado",
        shortDescription: "",
        problemSolved: "",
        technologies: "Next.js, TypeScript, PostgreSQL",
        category: "Web & Software",
        demoUrl: "",
        repoUrl: "",
        isProvisional: false,
        accentColor: "#0ea5e9",
        gradient: "from-blue-600/30 via-cyan-500/20 to-emerald-500/10",
        icon: "Code2",
      });
    }
    setProjectModalOpen(true);
  };

  // Guardar Proyecto
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...projectFormData,
      technologies: projectFormData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      visualTheme: {
        accentColor: projectFormData.accentColor,
        gradient: projectFormData.gradient,
        icon: projectFormData.icon,
      },
    };

    try {
      if (editingProject) {
        const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Error al actualizar proyecto");
        showToast("success", "Proyecto actualizado con éxito.");
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Error al crear proyecto");
        showToast("success", "Nuevo proyecto añadido al portafolio.");
      }
      setProjectModalOpen(false);
      loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al procesar proyecto";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  // Eliminar Proyecto
  const handleDeleteProject = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar el proyecto "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo eliminar el proyecto");
      showToast("success", `Proyecto "${name}" eliminado.`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      showToast("error", "Error al intentar eliminar el proyecto.");
    }
  };

  // Cambiar Contraseña
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("error", "Las nuevas contraseñas no coinciden.");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("success", "Contraseña criptográfica actualizada exitosamente.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al actualizar contraseña";
      showToast("error", msg);
    } finally {
      setPasswordLoading(false);
    }
  };

  // Cerrar Sesión
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04060d] text-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
        <p className="text-sm text-slate-400">Cargando panel de control...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04060d] text-slate-100 flex flex-col selection:bg-sky-500/30">
      {/* Toast Notification */}
      {message && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium animate-slideDown ${
            message.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/90 border-rose-500/50 text-rose-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Header Superior del Dashboard */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-black text-sm">
              FT
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
                Frontera Tech <span className="text-sky-400 font-mono text-xs ml-1">CMS Control</span>
              </h1>
              <p className="text-[11px] text-slate-400">Administrador de Contenidos & Arquitectura</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => loadData()}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              title="Recargar datos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <span>Ver Sitio Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Pestañas de Navegación del Panel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800/80 no-scrollbar">
          <button
            onClick={() => setActiveTab("mission-vision")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "mission-vision"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Quiénes Somos, Misión & Visión</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "team"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Equipo Humano ({team.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "services"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Capacidades de Desarrollo ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "projects"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Portafolio Técnico ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("company-contact")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "company-contact"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Contacto, WhatsApp & Redes</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "security"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Seguridad & Contraseña</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: QUIÉNES SOMOS, MISIÓN Y VISIÓN */}
        {/* ======================================================== */}
        {activeTab === "mission-vision" && aboutData && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">Editar Quiénes Somos, Misión y Visión</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Modifica las declaraciones institucionales. Los cambios se actualizan en vivo en la landing page.
                </p>
              </div>
              <button
                onClick={handleSaveAbout}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Guardar Cambios</span>
              </button>
            </div>

            {/* Quiénes somos - Encabezado */}
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider">
                1. Sección Sobre Nosotros (Quiénes Somos)
              </h3>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Titular principal (Subtítulo en la cabecera)
                </label>
                <input
                  type="text"
                  value={aboutData.overview.headline}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      overview: { ...aboutData.overview, headline: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Descripción general de la firma
                </label>
                <textarea
                  rows={3}
                  value={aboutData.overview.description}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      overview: { ...aboutData.overview, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Misión y Visión Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Misión */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    Misión
                  </h3>
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aboutData.mission.isProvisional}
                      onChange={(e) =>
                        setAboutData({
                          ...aboutData,
                          mission: { ...aboutData.mission, isProvisional: e.target.checked },
                        })
                      }
                      className="rounded border-slate-700 text-sky-500 focus:ring-sky-500"
                    />
                    <span>Marcar como provisoria</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Título de la tarjeta
                  </label>
                  <input
                    type="text"
                    value={aboutData.mission.title}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        mission: { ...aboutData.mission, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Declaración de Misión
                  </label>
                  <textarea
                    rows={4}
                    value={aboutData.mission.statement}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        mission: { ...aboutData.mission, statement: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                {/* Bullets Misión */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-slate-300">Puntos Clave</label>
                    <button
                      type="button"
                      onClick={() =>
                        setAboutData({
                          ...aboutData,
                          mission: {
                            ...aboutData.mission,
                            focalPoints: [...aboutData.mission.focalPoints, "Nuevo punto focal"],
                          },
                        })
                      }
                      className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agregar Punto
                    </button>
                  </div>
                  <div className="space-y-2">
                    {aboutData.mission.focalPoints.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => {
                            const newPoints = [...aboutData.mission.focalPoints];
                            newPoints[idx] = e.target.value;
                            setAboutData({
                              ...aboutData,
                              mission: { ...aboutData.mission, focalPoints: newPoints },
                            });
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-sky-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newPoints = aboutData.mission.focalPoints.filter((_, i) => i !== idx);
                            setAboutData({
                              ...aboutData,
                              mission: { ...aboutData.mission, focalPoints: newPoints },
                            });
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visión */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    Visión
                  </h3>
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aboutData.vision.isProvisional}
                      onChange={(e) =>
                        setAboutData({
                          ...aboutData,
                          vision: { ...aboutData.vision, isProvisional: e.target.checked },
                        })
                      }
                      className="rounded border-slate-700 text-sky-500 focus:ring-sky-500"
                    />
                    <span>Marcar como provisoria</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Título de la tarjeta
                  </label>
                  <input
                    type="text"
                    value={aboutData.vision.title}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        vision: { ...aboutData.vision, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Declaración de Visión
                  </label>
                  <textarea
                    rows={4}
                    value={aboutData.vision.statement}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        vision: { ...aboutData.vision, statement: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                {/* Bullets Visión */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-slate-300">Puntos Clave</label>
                    <button
                      type="button"
                      onClick={() =>
                        setAboutData({
                          ...aboutData,
                          vision: {
                            ...aboutData.vision,
                            focalPoints: [...aboutData.vision.focalPoints, "Nuevo objetivo de visión"],
                          },
                        })
                      }
                      className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agregar Punto
                    </button>
                  </div>
                  <div className="space-y-2">
                    {aboutData.vision.focalPoints.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => {
                            const newPoints = [...aboutData.vision.focalPoints];
                            newPoints[idx] = e.target.value;
                            setAboutData({
                              ...aboutData,
                              vision: { ...aboutData.vision, focalPoints: newPoints },
                            });
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-sky-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newPoints = aboutData.vision.focalPoints.filter((_, i) => i !== idx);
                            setAboutData({
                              ...aboutData,
                              vision: { ...aboutData.vision, focalPoints: newPoints },
                            });
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: EQUIPO HUMANO (FOTOS, CARGOS, DESCRIPCIÓN, REDES) */}
        {/* ======================================================== */}
        {activeTab === "team" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">Equipo Humano de Frontera Tech</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Gestiona las personas del equipo, carga sus fotos, especialidades y perfiles de LinkedIn y GitHub.
                </p>
              </div>
              <button
                onClick={() => openTeamModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Integrante</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      {/* Foto cargada o avatar */}
                      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center relative">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sky-400 font-bold text-lg font-mono">
                            {member.avatarText || "FT"}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white truncate">{member.name}</h3>
                          {member.isProvisional && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                              Provisorio
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-sky-400 truncate">{member.role}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {member.specialty}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      {member.linkedinUrl && (
                        <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-sky-400 text-[11px]">
                          LinkedIn vinculado
                        </span>
                      )}
                      {member.githubUrl && (
                        <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                          GitHub vinculado
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-2">
                    <span className="text-[11px] font-mono text-slate-500">ID: {member.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openTeamModal(member)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Editar Integrante"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeamMember(member.id, member.name)}
                        className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                        title="Eliminar Integrante"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CAPACIDADES DE DESARROLLO & SERVICIOS */}
        {/* ======================================================== */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">Capacidades de Desarrollo y Servicios</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Gestiona los servicios ofrecidos, problemas que resuelven y puntos clave de valor.
                </p>
              </div>
              <button
                onClick={() => openServiceModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Capacidad / Servicio</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-white">{svc.title}</h3>
                    </div>

                    <div className="mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                        QUÉ RESOLVEMOS
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">{svc.problemSolved}</p>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {svc.description}
                    </p>

                    <div className="space-y-1 mb-4">
                      {svc.highlights?.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono text-slate-500">Slug: {svc.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openServiceModal(svc)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Editar Servicio"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(svc.id, svc.title)}
                        className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                        title="Eliminar Servicio"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: PORTAFOLIO TÉCNICO Y PROYECTOS */}
        {/* ======================================================== */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">Catálogo de Proyectos & Portafolio</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Agrega, edita o elimina los proyectos visibles en la página web en tiempo real.
                </p>
              </div>
              <button
                onClick={() => openProjectModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Proyecto</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                        {proj.category}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {proj.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{proj.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{proj.shortDescription}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono text-slate-500">ID: {proj.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openProjectModal(proj)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Editar Proyecto"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.name)}
                        className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                        title="Eliminar Proyecto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: EMPRESA, CANALES DE CONTACTO, WHATSAPP & REDES */}
        {/* ======================================================== */}
        {activeTab === "company-contact" && companyData && contactData && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">Canales de Contacto, Redes y Empresa</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Configura el correo oficial, WhatsApp directo, LinkedIn corporativo e información institucional.
                </p>
              </div>
              <button
                onClick={handleSaveCompanyContact}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Guardar Cambios</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Canales Directos de Contacto */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Canales Oficiales (Correo, WhatsApp & LinkedIn)
                </h3>

                {/* Correo Electrónico */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Correo Electrónico Oficial
                  </label>
                  <input
                    type="email"
                    value={contactData.channels?.find((c) => c.type === "email")?.value || ""}
                    onChange={(e) => {
                      updateContactChannel("email", "value", e.target.value);
                      updateContactChannel("email", "href", `mailto:${e.target.value}?subject=Consulta%20sobre%20nuevo%20proyecto%20-%20Frontera%20Tech`);
                    }}
                    placeholder="contacto@fronteratech.com"
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Enlace Directo de WhatsApp
                  </label>
                  <input
                    type="text"
                    value={contactData.channels?.find((c) => c.type === "whatsapp")?.href || ""}
                    onChange={(e) => updateContactChannel("whatsapp", "href", e.target.value)}
                    placeholder="https://wa.me/593999999999?text=Hola%20Frontera%20Tech..."
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Formato: https://wa.me/CODIGO_PAIS_NUMERO
                  </p>
                </div>

                {/* LinkedIn Corporativo */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    URL de LinkedIn Corporativo
                  </label>
                  <input
                    type="url"
                    value={contactData.channels?.find((c) => c.type === "linkedin")?.href || ""}
                    onChange={(e) => {
                      updateContactChannel("linkedin", "href", e.target.value);
                      updateContactChannel("linkedin", "value", e.target.value.replace(/^https?:\/\//, ""));
                    }}
                    placeholder="https://linkedin.com/company/frontera-tech"
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                {/* Aviso de disponibilidad */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Aviso de Disponibilidad Activa
                  </label>
                  <textarea
                    rows={2}
                    value={contactData.availabilityNotice}
                    onChange={(e) => setContactData({ ...contactData, availabilityNotice: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Información Institucional & Textos */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider">
                  Textos Institucionales
                </h3>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Comercial</label>
                  <input
                    type="text"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Lema / Slogan</label>
                  <input
                    type="text"
                    value={companyData.tagline}
                    onChange={(e) => setCompanyData({ ...companyData, tagline: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Descripción Breve</label>
                  <textarea
                    rows={2}
                    value={companyData.shortDescription}
                    onChange={(e) => setCompanyData({ ...companyData, shortDescription: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Titular de Contacto</label>
                  <input
                    type="text"
                    value={contactData.headline}
                    onChange={(e) => setContactData({ ...contactData, headline: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subtítulo de Contacto</label>
                  <input
                    type="text"
                    value={contactData.subtitle}
                    onChange={(e) => setContactData({ ...contactData, subtitle: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: SEGURIDAD Y CONTRASEÑA */}
        {/* ======================================================== */}
        {activeTab === "security" && (
          <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Seguridad de la Cuenta</h2>
                  <p className="text-xs text-slate-400">
                    Cifrado criptográfico PBKDF2-HMAC-SHA256 con salt dinámico y 100,000 rondas.
                  </p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite la nueva contraseña"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full mt-4 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {passwordLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Actualizar Contraseña Criptográfica</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL: INTEGRANTE DEL EQUIPO (CON SUBIDA DE FOTO) */}
        {/* ======================================================== */}
        {teamModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-400" />
                  {editingMember ? "Editar Integrante del Equipo" : "Nuevo Integrante del Equipo"}
                </h3>
                <button
                  onClick={() => setTeamModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTeamMember} className="space-y-4">
                {/* Fotografía de la persona con carga directa */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Fotografía de la Persona
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0 relative">
                      {memberFormData.image ? (
                        <img
                          src={memberFormData.image}
                          alt="Foto previa"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-600" />
                      )}
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingImage ? "Subiendo..." : "Cargar Foto"}</span>
                        </button>

                        {memberFormData.image && (
                          <button
                            type="button"
                            onClick={() => setMemberFormData({ ...memberFormData, image: "" })}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                          >
                            Quitar foto
                          </button>
                        )}
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUploadImageFile}
                        accept="image/*"
                        className="hidden"
                      />

                      <input
                        type="text"
                        value={memberFormData.image}
                        onChange={(e) => setMemberFormData({ ...memberFormData, image: e.target.value })}
                        placeholder="O escribe una URL directa de imagen..."
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={memberFormData.name}
                      onChange={(e) => setMemberFormData({ ...memberFormData, name: e.target.value })}
                      placeholder="Ej: Jordan Revelo"
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Rol / Cargo
                    </label>
                    <input
                      type="text"
                      required
                      value={memberFormData.role}
                      onChange={(e) => setMemberFormData({ ...memberFormData, role: e.target.value })}
                      placeholder="Ej: Tech Lead & Solutions Architect"
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Descripción / Especialidad Técnica
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={memberFormData.specialty}
                    onChange={(e) => setMemberFormData({ ...memberFormData, specialty: e.target.value })}
                    placeholder="Diseño de sistemas distribuidos, escalabilidad y buenas prácticas de ingeniería..."
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Enlace de LinkedIn (URL)
                    </label>
                    <input
                      type="url"
                      value={memberFormData.linkedinUrl}
                      onChange={(e) => setMemberFormData({ ...memberFormData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/usuario"
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Enlace de GitHub (URL)
                    </label>
                    <input
                      type="url"
                      value={memberFormData.githubUrl}
                      onChange={(e) => setMemberFormData({ ...memberFormData, githubUrl: e.target.value })}
                      placeholder="https://github.com/usuario"
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={memberFormData.isProvisional}
                      onChange={(e) => setMemberFormData({ ...memberFormData, isProvisional: e.target.checked })}
                      className="rounded border-slate-700 text-sky-500 focus:ring-sky-500"
                    />
                    <span>Marcar como perfil provisorio</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setTeamModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 text-sm transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving || uploadingImage}
                    className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Guardar Integrante</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL: CAPACIDAD / SERVICIO */}
        {/* ======================================================== */}
        {serviceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-sky-400" />
                  {editingService ? "Editar Capacidad Técnica" : "Nueva Capacidad de Desarrollo"}
                </h3>
                <button
                  onClick={() => setServiceModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveService} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Título del Servicio
                    </label>
                    <input
                      type="text"
                      required
                      value={serviceFormData.title}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                      placeholder="Ej: Software a Medida"
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Icono Representativo
                    </label>
                    <select
                      value={serviceFormData.iconName}
                      onChange={(e) =>
                        setServiceFormData({
                          ...serviceFormData,
                          iconName: e.target.value as ServiceItem["iconName"],
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    >
                      <option value="Code2">Code2 (Código / Software)</option>
                      <option value="Globe">Globe (Web / Plataformas)</option>
                      <option value="Smartphone">Smartphone (Móvil / Apps)</option>
                      <option value="Cpu">Cpu (Automatización / APIs)</option>
                      <option value="Wrench">Wrench (Soporte / Mantenimiento)</option>
                      <option value="Cloud">Cloud (Nube / DevOps)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Qué Resolvemos (Problema Resuelto)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={serviceFormData.problemSolved}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, problemSolved: e.target.value })}
                    placeholder="Herramientas desconectadas y procesos rígidos que limitan tu crecimiento..."
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Descripción Completa
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={serviceFormData.description}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                    placeholder="Creamos sistemas que se adaptan a tus procesos y crecen contigo..."
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                {/* Puntos clave / Beneficios */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-slate-300">
                      Beneficios & Puntos Clave
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setServiceFormData({
                          ...serviceFormData,
                          highlights: [...serviceFormData.highlights, "Nuevo beneficio clave"],
                        })
                      }
                      className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agregar Beneficio
                    </button>
                  </div>
                  <div className="space-y-2">
                    {serviceFormData.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => {
                            const newHighlights = [...serviceFormData.highlights];
                            newHighlights[idx] = e.target.value;
                            setServiceFormData({ ...serviceFormData, highlights: newHighlights });
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-sky-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newHighlights = serviceFormData.highlights.filter((_, i) => i !== idx);
                            setServiceFormData({ ...serviceFormData, highlights: newHighlights });
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setServiceModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 text-sm transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Guardar Servicio</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL: PROYECTO (PORTAFOLIO) */}
        {/* ======================================================== */}
        {projectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-sky-400" />
                  {editingProject ? "Editar Proyecto del Portafolio" : "Nuevo Proyecto"}
                </h3>
                <button
                  onClick={() => setProjectModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nombre del Proyecto</label>
                  <input
                    type="text"
                    required
                    value={projectFormData.name}
                    onChange={(e) => setProjectFormData({ ...projectFormData, name: e.target.value })}
                    placeholder="Ej: Apex ERP Cloud"
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Categoría</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.category}
                      onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                      placeholder="Web & Logística, Fintech, etc."
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Etiqueta / Badge</label>
                    <input
                      type="text"
                      value={projectFormData.badge}
                      onChange={(e) => setProjectFormData({ ...projectFormData, badge: e.target.value })}
                      placeholder="Proyecto Realizado / Destacado"
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Descripción Breve</label>
                  <textarea
                    rows={2}
                    required
                    value={projectFormData.shortDescription}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, shortDescription: e.target.value })
                    }
                    placeholder="Resumen ejecutivo del proyecto..."
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Problema Resuelto</label>
                  <textarea
                    rows={2}
                    required
                    value={projectFormData.problemSolved}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, problemSolved: e.target.value })
                    }
                    placeholder="Qué impacto o valor técnico aporta a la organización..."
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tecnologías (separadas por coma)
                  </label>
                  <input
                    type="text"
                    value={projectFormData.technologies}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, technologies: e.target.value })
                    }
                    placeholder="Next.js, TypeScript, PostgreSQL, Docker"
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Enlace Demo (opcional)</label>
                    <input
                      type="url"
                      value={projectFormData.demoUrl}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, demoUrl: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Repositorio GitHub (opcional)</label>
                    <input
                      type="url"
                      value={projectFormData.repoUrl}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, repoUrl: e.target.value })
                      }
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 text-sm transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Guardar Proyecto</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
