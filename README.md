# Frontera Tech — Web Corporativa

Sitio web corporativo oficial para **Frontera Tech**, firma especializada en ingeniería de software, arquitectura cloud y soluciones digitales a medida.

Desarrollado con una arquitectura moderna de componentes limpios, animaciones fluidas con **Motion**, estilos con **Tailwind CSS**, y empaquetado para producción mediante **Docker** y salida *standalone* de **Next.js**.

---

## 🚀 Tecnologías Principales

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components y Client Components optimizados)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones:** [Motion para React](https://motion.dev/) (con soporte nativo para `prefers-reduced-motion`)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Base de Datos & ORM:** [PostgreSQL 16](https://www.postgresql.org/) y [Prisma ORM](https://www.prisma.io/)
- **Panel de Administración (CMS):** Dashboard integrado para edición de Misión, Visión, Proyectos, Empresa y Contacto sin tocar código
- **Autenticación & Seguridad:** JSON Web Tokens (JWT) en cookies `HttpOnly`, y contraseñas protegidas con cifrado **PBKDF2-HMAC-SHA256** (100,000 iteraciones + Salt aleatorio criptográfico)
- **Contenedores y Despliegue:** [Docker](https://www.docker.com/) (Multi-stage build) y Docker Compose con PostgreSQL persistente

---

## 📂 Organización del Proyecto

La estructura del proyecto sigue una separación clara de responsabilidades:

```text
c:/FronteraTech/
├── src/
│   ├── app/                      # Layout, metadatos SEO, página principal y estilos globales
│   │   ├── globals.css           # Tokens de diseño, gradientes y animaciones
│   │   ├── layout.tsx            # Metadata, fuentes tipográficas y contenedor raíz
│   │   └── page.tsx              # Ensamblado de secciones y componente de introducción
│   ├── components/
│   │   ├── intro/                # Introducción de marca a pantalla completa (BrandIntro)
│   │   ├── layout/               # Header con navegación sticky y Footer corporativo
│   │   ├── sections/             # Secciones: Hero, Servicios, Proyectos, Nosotros, Equipo, Contacto
│   │   ├── ui/                   # Componentes reutilizables: Button, Container, SectionHeader
│   │   └── motion/               # Envoltorios y variantes de animación con soporte de accesibilidad
│   └── data/                     # Contenido editable y centralizado (fácilmente sustituible)
│       ├── company.ts            # Información general y descripción corporativa
│       ├── navigation.ts         # Enlaces de navegación del menú
│       ├── services.ts           # Servicios ofrecidos y problemas que resuelven
│       ├── projects.ts           # Casos conceptuales del carrusel con tecnologías
│       ├── about.ts              # Misión, visión, valores y metodología de trabajo
│       ├── team.ts               # Integrantes, roles y enlaces profesionales
│       └── contact.ts            # Canales directos de contacto (Email, WhatsApp, LinkedIn)
├── public/                       # Activos estáticos, iconos y recursos multimedia
├── Dockerfile                    # Construcción multi-etapa para producción (Next.js standalone)
├── docker-compose.yml            # Orquestación lista para despliegue de contenedor
├── .dockerignore                 # Exclusiones de contexto para Docker
├── next.config.ts                # Configuración con output: "standalone"
└── README.md                     # Documentación de instalación y uso
```

---

## ⚡ Ejecución en Desarrollo Local

### Requisitos previos
- Node.js 20+ o 22+
- npm 10+

### Pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   Visita [http://localhost:3000](http://localhost:3000)

---

## 📦 Compilación y Producción Local

Para probar la compilación de producción optimizada sin Docker:

```bash
# Generar la versión de producción
npm run build

# Arrancar el servidor de producción
npm run start
```

---

## 🐳 Despliegue con Docker

El proyecto cuenta con un `Dockerfile` multi-etapa que optimiza el tamaño de la imagen final copiando únicamente el servidor standalone y los recursos estáticos generados por Next.js, ejecutándose bajo un usuario sin privilegios de root (`nextjs:nodejs`).

### Opción A: Usando Docker Compose (Recomendado)

1. **Construir y levantar el contenedor en segundo plano:**
   ```bash
   docker compose up --build -d
   ```

2. **Verificar el estado del servicio:**
   ```bash
   docker compose ps
   ```

3. **Ver logs de la aplicación:**
   ```bash
   docker compose logs -f
   ```

4. **Detener el contenedor:**
   ```bash
   docker compose down
   ```

### Opción B: Usando comandos estándar de Docker

1. **Construir la imagen:**
   ```bash
   docker build -t fronteratech-web:latest .
   ```

2. **Ejecutar el contenedor:**
   ```bash
   docker run -d --name fronteratech -p 3000:3000 --restart unless-stopped fronteratech-web:latest
   ```

---

---

## 🎛️ Panel de Administración (CMS Dinámico)

El sitio cuenta con un panel de administración visual y seguro en la ruta `/admin` que permite al dueño o administrador actualizar el contenido sin tocar el código fuente:

- **Ruta de acceso:** `http://localhost:3000/admin` (o `https://tudominio.com/admin`)
- **Acceso directo:** Enlace discreto en el pie de página (footer) marcado como `CMS`.
- **Credenciales iniciales por defecto:**
  - **Usuario:** `admin`
  - **Contraseña:** `AdminFrontera2026*Secure`
  - *(Se recomienda cambiar la contraseña inmediatamente desde la pestaña "Seguridad & Contraseña" del panel).*

### Módulos editables desde el panel:
1. **Misión & Visión:** Titular general, declaración de misión, declaración de visión, puntos clave (bullets dinámicos) y estado provisorio/definitivo.
2. **Catálogo de Proyectos:** Crear nuevos proyectos, editar nombres, categorías, badges, problemas resueltos, tecnologías (tags), enlaces demo/repo, y eliminar proyectos obsoletos.
3. **Empresa & Contacto:** Slogan, descripción corporativa, correo electrónico, WhatsApp y cobertura.
4. **Seguridad de la Cuenta:** Cambio de contraseña con verificación de la clave actual.

---

## 🔐 Arquitectura de Seguridad & Base de Datos

- **Base de datos:** [PostgreSQL 16](https://www.postgresql.org/) con [Prisma ORM](https://www.prisma.io/) y contenedor dedicado en Docker Compose (`puerto 5433`).
- **Autenticación:** [JSON Web Tokens (JWT)](https://jwt.io/) con algoritmo HS256 firmados con clave secreta y transmitidos en cookies **`HttpOnly`**, `Secure` y `SameSite=Lax` para prevenir ataques XSS y CSRF.
- **Cifrado de contraseñas:** Algoritmo **PBKDF2-HMAC-SHA256** con **100,000 iteraciones** y Salt aleatorio criptográfico único por usuario (resiste ataques por diccionario, tablas arcoíris y fuerza bruta por GPU).
- **Protección de Rutas:** Middleware en Next.js Edge para interceptar accesos no autorizados a `/admin/*` y redirigir con parámetro `?from=`.
- **Cero datos quemados (No hardcoded):** El contenido se obtiene dinámicamente de PostgreSQL a través de Server Components en tiempo real con revalidación y fallback de alta disponibilidad.

---

## ♿ Accesibilidad y Rendimiento

- **Animación de entrada (Brand Intro):** Se muestra solo 1 vez por sesión mediante `sessionStorage`. Si el visitante ingresa con un enlace directo a una sección (`#servicios`, etc.) o tiene activado `prefers-reduced-motion`, la cortina se omite inmediatamente para garantizar fluidez.
- **Navegación por teclado:** Totalmente funcional en botones, enlaces, menú móvil y controles del carrusel de proyectos (teclas de flecha izquierda y derecha).
- **Gestos táctiles:** El carrusel de proyectos soporta desplazamiento táctil (*swipe*) en teléfonos y tabletas.
