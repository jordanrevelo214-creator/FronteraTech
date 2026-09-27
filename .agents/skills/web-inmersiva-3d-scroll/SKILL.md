---
name: web-inmersiva-3d-scroll
description: Utiliza esta skill cuando el usuario quiera crear, diseñar o transformar una página web corporativa o landing page en una experiencia visual inmersiva 3D interactiva sincronizada con el scroll (Three.js, React Three Fiber, GSAP ScrollTrigger).
---

# Skill: Desarrollo de Páginas Web Inmersivas 3D Guiadas por Scroll

Esta skill proporciona las directrices arquitectónicas, matemáticas, de rendimiento y de diseño para construir experiencias web 3D de alto impacto ("Storytelling Scrollytelling") donde modelos 3D, geometrías y elementos de marca se transforman fluidamente a medida que el usuario hace scroll.

---

## 1. Cuándo Activar esta Skill

Activa esta skill siempre que el usuario solicite:
- Crear una landing page o web corporativa **inmersiva con 3D interactivo**.
- Sincronizar modelos 3D, explosión de partes, rotaciones o metamorfosis con el **scroll del ratón**.
- Replicar efectos tipo Apple, Stripe o agencias de diseño premium (Awwwards) con Three.js.
- Resolver problemas de **lag, tirones (stutter), o solapamiento visual** entre escenas 3D y capas de texto.
- Extraer y preservar la **identidad visual exacta (marca, colores, logos)** en un entorno tridimensional.

---

## 2. Stack Tecnológico de Referencia

- **Framework Web:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Renderizado 3D:** Three.js + `@react-three/fiber` (R3F) + `@react-three/drei`.
- **Motor de Animación:** `gsap` + `gsap/ScrollTrigger`.
- **Estructura recomendada de dependencias:**
  ```bash
  npm install three @react-three/fiber @react-three/drei gsap lucide-react
  npm install -D @types/three
  ```

---

## 3. Arquitectura del Layout (Scrollytelling Blueprint)

Para que el scroll funcione de forma suave y sin romper el flujo de lectura:

```
[Viewport (100vh)]
  ├── <div className="fixed inset-0 pointer-events-none z-0">
  │     └── <Canvas> (Escena 3D fija de fondo con pointer-events-none)
  │
  └── <div ref={scrollContainerRef} className="relative z-10">
        ├── <Section 1: Hero> (min-h-screen o 120vh)
        ├── <Section 2: Metamorfosis / Características> (min-h-screen)
        ├── <Section 3: Módulos / Detalle técnico> (min-h-screen)
        └── <Section 4: CTA / Footer>
```

### Reglas de Capas y Puntero
1. **El Canvas nunca debe bloquear el scroll ni los clics:**
   - Contenedor del Canvas: `fixed inset-0 pointer-events-none z-0`.
   - Elementos interactivos dentro del Canvas (si los hay): habilitar selectivamente con `pointer-events-auto`.
2. **Capas HTML sobre el 3D:**
   - Usar `relative z-10` en las secciones HTML.
   - Textos con fondos sutiles con glassmorphism (`backdrop-blur-md bg-slate-950/40 border border-white/10`) para garantizar legibilidad impecable sobre la geometría 3D.

---

## 4. Rendimiento Crítico: Los 4 Mandamientos de los 60 FPS

Los tirones o lag en scroll casi siempre ocurren por sobrecarga en la GPU o eventos de rueda discretos en Windows/macOS. Aplica siempre:

### 1. Limitar el Device Pixel Ratio (DPR)
En pantallas Retina / 4K, renderizar a DPR 2 o 3 destruye la tasa de cuadros.
```tsx
<Canvas
  dpr={[1, 1.25]} // NUNCA permitir más de 1.25 - 1.5 en escenas complejas
  gl={{
    antialias: true,
    powerPreference: "high-performance",
    alpha: true,
    stencil: false,
    depth: true
  }}
>
```

### 2. Eliminar Sombras Pesadas en Tiempo Real
Extrusiones paramétricas y mallas densas sufren con `castShadow` y `receiveShadow`. 
- **Desactivar sombras dinámicas:** Usar iluminación de estudio estratégica (`ambientLight`, `directionalLight`, `pointLight`) y materiales con rugosidad (`roughness`) bien balanceada en lugar de shadow maps costosos.

### 3. Absorber la Inercia del Scroll (`scrub: 0.8`)
En ratones con rueda por pasos (típico en Windows), `scrub: true` causa movimientos a saltos.
- **Solución:** Configurar siempre `scrub: 0.8` (o entre `0.6` y `1.0`) en GSAP ScrollTrigger para crear una amortiguación suave y sedosa.

### 4. Cero Re-renders de React en el Ciclo de Scroll
- **Prohibido:** Guardar el progreso de scroll en un `useState` para pasarlo por props al Canvas.
- **Correcto:** Usar `useRef` para las mallas de Three.js y mutar directamente sus propiedades (`rotation`, `position`, `scale`, `uniforms`) dentro de la línea de tiempo de GSAP o en el hook `useFrame`:
  ```tsx
  // Mutación directa sin causar re-renders de React
  timeline.to(meshRef.current.rotation, { y: Math.PI * 2, ease: "none" }, 0);
  ```

---

## 5. Encuadre Espacial y Composición Áurea

Un error común es que el modelo 3D quede tapado por los textos o títulos principales.

### Configuración de Cámara Ideal
```tsx
<PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={40} />
```

### Regla de Zonificación Vertical (Hero Section)
- **Zona Superior (10% al 52% de la pantalla):** Espacio exclusivo para el modelo 3D.
  - Centro del objeto en Three.js: `position: [0, 1.0, 0]` a `[0, 1.1, 0]`.
  - Escala contenida: Mantener el radio del objeto dentro de `scale: 0.65 - 0.75`.
- **Zona Inferior (55% al 90% de la pantalla):** Espacio para el título corporativo, subtítulo y botones de acción (CTA).
  - Posicionamiento en Tailwind: `top-[56%]` a `top-[58%]`, `max-w-3xl`, centrado.

---

## 6. Técnica Híbrida 3D: Fidelidad Total de Marca

Cuando una empresa entrega un logo o vector y quiere verlo en 3D, convertirlo a una sola malla extruida con material metálico suele alterar los colores corporativos o verse oscura.

### Solución: Placa Frontal Texturizada + Cuerpo 3D Biselado
1. **Cuerpo 3D (Volumen y Profundidad):**
   - Geometría extruida con bisel (`bevelEnabled: true`, `bevelSegments: 4`, `depth: 0.25`).
   - Material `meshStandardMaterial` con color corporativo base, `metalness: 0.5`, `roughness: 0.25`.
   - **Piso emisivo:** Añadir un sutil `emissive: "#0a194f"` para evitar que las caras laterales se vean negras cuando no hay reflejos directos.
2. **Placa Frontal de Alta Fidelidad (Front Texture Plate):**
   - Sobreponer un plano o forma plana en la cara anterior (`z = depth + bevelThickness + 0.005`).
   - Usar `meshBasicMaterial` con textura PNG transparente de la marca.
   - `meshBasicMaterial` no se ve afectado por la iluminación: la marca y colores se ven **100% idénticos al manual de marca original** cuando el logo está de frente.
   - En las rotaciones 3D, el espectador percibe los reflejos y el grosor del bisel, logrando el equilibrio perfecto entre fidelidad y tridimensionalidad.

---

## 7. Pipeline de Extracción de Assets Transparentes

Si el cliente entrega un logo en JPG o con fondo blanco/negro:
1. **Aislamiento Alpha Puro:**
   - Crear un script o procesar la imagen eliminando el canal de fondo con umbral estricto (`threshold`).
   - Eliminar halos grises y píxeles con opacidad semitransparente residual (limpiar rango alpha < 30).
2. **Optimización de Textura:**
   - Guardar en PNG-24 optimizado o WebP con canal alpha.
   - Configurar en Three.js:
     ```ts
     texture.colorSpace = THREE.SRGBColorSpace;
     texture.generateMipmaps = true;
     ```

---

## 8. Plantilla de Animación con GSAP ScrollTrigger

Ejemplo de integración estándar en Next.js / React:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export function useScroll3DAnimation(modelRef: React.RefObject<THREE.Group>) {
  useEffect(() => {
    if (!modelRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8, // Inercia sedosa
        },
      });

      // Paso 1: Apertura / Florecimiento (0% -> 50% de scroll)
      tl.to(
        modelRef.current!.rotation,
        {
          x: Math.PI * 0.15,
          y: Math.PI * 2,
          z: Math.PI * 0.05,
          ease: "power1.inOut",
        },
        0
      );

      // Paso 2: Retorno a forma icónica (50% -> 100% de scroll)
      tl.to(
        modelRef.current!.rotation,
        {
          x: 0,
          y: Math.PI * 4, // 2 vueltas completas
          z: 0,
          ease: "power1.inOut",
        },
        0.5
      );
    });

    return () => ctx.revert(); // Limpieza para evitar fugas de memoria
  }, [modelRef]);
}
```

---

## 9. Lista de Verificación (Checklist de Calidad)

Antes de dar por finalizada una página inmersiva:
- [ ] ¿El scroll se siente suave a 60 fps en monitores estándar y pantallas de alta densidad?
- [ ] ¿El DPR está acotado a `[1, 1.25]`?
- [ ] ¿Los textos y botones tienen suficiente contraste y no se solapan físicamente con el modelo 3D?
- [ ] ¿El Canvas tiene `pointer-events-none` para no secuestrar la selección de texto ni clics?
- [ ] ¿Los colores del logo/marca coinciden con la identidad corporativa al estar de frente?
- [ ] ¿El `npm run build` compila sin errores de SSR (uso correcto de `"use client"` y carga dinámica `next/dynamic` si aplica)?
