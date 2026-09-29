"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { AboutData } from "@/data/about";
import { CompanyInfo } from "@/data/company";
import { ContactData } from "@/data/contact";
import { ProjectItem } from "@/data/projects";

type TabType = "mission-vision" | "projects" | "company-contact" | "security";

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

  // Estados para modal de proyecto (crear / editar)
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

  // Estados para cambio de contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Cargar datos
  const loadData = async () => {
    setLoading(true);
    try {
      // Verificar sesión
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) {
        router.push("/admin/login");
        return;
      }

      // Cargar contenidos
      const [contentRes, projectsRes] = await Promise.all([
        fetch("/api/admin/content"),
        fetch("/api/admin/projects"),
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
    } catch {
      setMessage({ type: "error", text: "Error de conexión al cargar datos." });
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
      showToast("success", "Misión y Visión actualizadas correctamente.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  // Guardar Empresa y Contacto
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
      showToast("success", "Información de Empresa y Contacto guardada.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  // Abrir modal de proyecto
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

  // Guardar proyecto (Crear o Actualizar)
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
        // Actualizar
        const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Error al actualizar proyecto");
        showToast("success", "Proyecto actualizado con éxito.");
      } else {
        // Crear
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Error al crear proyecto");
        showToast("success", "Nuevo proyecto añadido al catálogo.");
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

  // Eliminar proyecto
  const handleDeleteProject = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar el proyecto "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo eliminar el proyecto");
      showToast("success", `Proyecto "${name}" eliminado.`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      showToast("error", "Error al intentar eliminar el proyecto.");
    }
  };

  // Cambiar contraseña
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
      showToast("success", "Contraseña actualizada exitosamente con hash SHA-256.");
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
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04060d] text-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
        <p className="text-sm text-slate-400">Cargando panel de administración...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04060d] text-slate-200">
      {/* Barra Superior */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold text-sm">
              FT
            </div>
            <div>
              <span className="font-bold text-white tracking-tight">Frontera<span className="text-sky-400">Tech</span></span>
              <span className="ml-2 text-[11px] font-mono px-2 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/60">
                Admin CMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
            >
              <span>Ver Sitio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/30 border border-rose-900/40 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Alerta flotante / Toast */}
      {message && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm border ${
              message.type === "success"
                ? "bg-emerald-950/90 text-emerald-200 border-emerald-800/80"
                : "bg-rose-950/90 text-rose-200 border-rose-800/80"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            )}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      {/* Contenido Principal con Tabs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegación por pestañas */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("mission-vision")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "mission-vision"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Misión & Visión</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "projects"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Proyectos ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("company-contact")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "company-contact"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Empresa & Contacto</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "security"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-600/30"
                : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Seguridad & Contraseña</span>
          </button>
        </div>

        {/* TAB 1: MISIÓN Y VISIÓN */}
        {activeTab === "mission-vision" && aboutData && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">Editar Misión, Visión y Descripción</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Modifica los textos sin tocar código. Los cambios se reflejarán instantáneamente en la web.
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

            {/* Titular General */}
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider">
                1. Encabezado de la Sección Acerca de
              </h3>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Titular principal
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
                  Descripción general
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
                            focalPoints: [...aboutData.mission.focalPoints, "Nuevo punto de enfoque"],
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

        {/* TAB 2: PROYECTOS REALIZABLES */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">Catálogo de Proyectos</h2>
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

            {/* Grid de Proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors relative group"
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

        {/* TAB 3: EMPRESA Y CONTACTO */}
        {activeTab === "company-contact" && companyData && contactData && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">Datos de la Empresa y Contacto</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Gestiona la información institucional y canales de contacto directo.
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
              {/* Información de Empresa */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider">
                  Información Institucional
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
                  <label className="block text-xs font-medium text-slate-300 mb-1">Descripción Corta</label>
                  <textarea
                    rows={3}
                    value={companyData.shortDescription}
                    onChange={(e) => setCompanyData({ ...companyData, shortDescription: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider">
                  Sección de Contacto
                </h3>
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
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subtítulo</label>
                  <input
                    type="text"
                    value={contactData.subtitle}
                    onChange={(e) => setContactData({ ...contactData, subtitle: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Aviso de Disponibilidad</label>
                  <textarea
                    rows={3}
                    value={contactData.availabilityNotice}
                    onChange={(e) => setContactData({ ...contactData, availabilityNotice: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SEGURIDAD Y CONTRASEÑA */}
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
                    Cifrado PBKDF2-HMAC-SHA256 con 100,000 iteraciones y Salt dinámico.
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

        {/* MODAL DE PROYECTO (CREAR / EDITAR) */}
        {projectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">
                  {editingProject ? "Editar Proyecto" : "Agregar Nuevo Proyecto"}
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
                    placeholder="Resumen del proyecto..."
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
                    placeholder="Qué valor o solución aporta a la organización..."
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
                    <label className="block text-xs font-medium text-slate-300 mb-1">Color de Acento Hex</label>
                    <input
                      type="text"
                      value={projectFormData.accentColor}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, accentColor: e.target.value })
                      }
                      placeholder="#0ea5e9"
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
