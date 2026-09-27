"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  hexagonShape,
  waveShape,
  letterFShape,
  letterTShape,
  hexTopShape,
  hexBottomShape,
  leftWingShape,
  rightWingShape,
  hexExtrudeSettings,
  waveExtrudeSettings,
  letterExtrudeSettings,
  wingExtrudeSettings,
} from "./logo-shapes";

interface Logo3DModelProps {
  progress: number;
}

export function Logo3DModel({ progress }: Logo3DModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Mesh individual refs
  const meshFRef = useRef<THREE.Mesh>(null);
  const meshTRef = useRef<THREE.Mesh>(null);
  const meshWaveRef = useRef<THREE.Mesh>(null);
  const meshHexFullRef = useRef<THREE.Mesh>(null);
  const meshHexTopRef = useRef<THREE.Mesh>(null);
  const meshHexBottomRef = useRef<THREE.Mesh>(null);
  const meshWingLeftRef = useRef<THREE.Mesh>(null);
  const meshWingRightRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreGlowLightRef = useRef<THREE.PointLight>(null);
  const badgePlaneRef = useRef<THREE.Mesh>(null);

  // Load the authentic badge texture from inicio.png
  const badgeTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load("/images/hex_badge_alpha.png");
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }, []);

  // Geometries memoized
  const geomHexFull = useMemo(
    () => new THREE.ExtrudeGeometry(hexagonShape, hexExtrudeSettings),
    []
  );
  const geomF = useMemo(
    () => new THREE.ExtrudeGeometry(letterFShape, letterExtrudeSettings),
    []
  );
  const geomT = useMemo(
    () => new THREE.ExtrudeGeometry(letterTShape, letterExtrudeSettings),
    []
  );
  const geomWave = useMemo(
    () => new THREE.ExtrudeGeometry(waveShape, waveExtrudeSettings),
    []
  );
  const geomHexTop = useMemo(
    () => new THREE.ExtrudeGeometry(hexTopShape, hexExtrudeSettings),
    []
  );
  const geomHexBottom = useMemo(
    () => new THREE.ExtrudeGeometry(hexBottomShape, hexExtrudeSettings),
    []
  );
  const geomWingLeft = useMemo(
    () => new THREE.ExtrudeGeometry(leftWingShape, wingExtrudeSettings),
    []
  );
  const geomWingRight = useMemo(
    () => new THREE.ExtrudeGeometry(rightWingShape, wingExtrudeSettings),
    []
  );

  // Materials: Rich sapphire blue with emissive floor so it never turns black
  const sapphireHexMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0c369e"), // Rich royal sapphire blue
        emissive: new THREE.Color("#041442"),
        emissiveIntensity: 0.35,
        roughness: 0.28,
        metalness: 0.45,
      }),
    []
  );

  const whiteEmbossMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 0.15,
        roughness: 0.18,
        metalness: 0.25,
      }),
    []
  );

  const wingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#092978"),
        emissive: new THREE.Color("#030e2e"),
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.5,
      }),
    []
  );

  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#fbbf24"), // Warm gold
        emissive: new THREE.Color("#00e5ff"), // Electric cyan
        emissiveIntensity: 0.85,
        roughness: 0.15,
        metalness: 0.9,
      }),
    []
  );

  // Frame update: Smooth interpolation driven by scroll progress + subtle idle floating
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const p = Math.max(0, Math.min(1, progress));

    // Idle breathing/floating
    const idleY = Math.sin(t * 1.4) * 0.035;
    const idleRotY = Math.cos(t * 1.1) * 0.02;

    if (!groupRef.current) return;

    // --- Sequence Calculations ---
    let targetGroupRotY = idleRotY;
    let targetGroupRotX = 0;
    let targetGroupScale = 0.68;
    let targetGroupPosY = idleY;
    let targetGroupPosZ = 0;

    if (p < 0.2) {
      // Phase 1: 0 - 20% (Full assembled logo, facing forward as in inicio.png)
      targetGroupRotY = idleRotY;
      targetGroupRotX = 0;
      targetGroupScale = 0.68;
    } else if (p < 0.45) {
      // Phase 2: 20 - 45% (Slight rotation revealing 3D depth and metallic bevel)
      const subP = (p - 0.2) / 0.25;
      targetGroupRotY = THREE.MathUtils.lerp(0, 0.38, subP) + idleRotY;
      targetGroupRotX = THREE.MathUtils.lerp(0, 0.14, subP);
      targetGroupPosZ = THREE.MathUtils.lerp(0, 0.3, subP);
      targetGroupScale = 0.68;
    } else if (p < 0.65) {
      // Phase 3: 45 - 65% (Flower-like blossoming / modular expansion)
      const subP = (p - 0.45) / 0.2;
      targetGroupRotY = THREE.MathUtils.lerp(0.38, -0.2, subP) + idleRotY;
      targetGroupRotX = THREE.MathUtils.lerp(0.14, -0.1, subP);
      targetGroupScale = THREE.MathUtils.lerp(0.68, 0.76, Math.sin(subP * Math.PI));
    } else if (p < 0.85) {
      // Phase 4: 65 - 85% (Reconvergence & reconstruction back into pristine badge)
      const subP = (p - 0.65) / 0.2;
      targetGroupRotY = THREE.MathUtils.lerp(-0.2, 0, subP) + idleRotY;
      targetGroupRotX = THREE.MathUtils.lerp(-0.1, 0, subP);
      targetGroupPosZ = THREE.MathUtils.lerp(0.3, 0, subP);
      targetGroupScale = 0.68;
    } else {
      // Phase 5: 85 - 100% (Scale down and transition out smoothly, fully assembled)
      const subP = (p - 0.85) / 0.15;
      targetGroupScale = THREE.MathUtils.lerp(0.68, 0.42, subP);
      targetGroupPosY = THREE.MathUtils.lerp(idleY, 1.1, subP);
      targetGroupPosZ = THREE.MathUtils.lerp(0, -1.2, subP);
      targetGroupRotX = THREE.MathUtils.lerp(0, -0.18, subP);
    }

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetGroupRotY,
      10,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetGroupRotX,
      10,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetGroupPosY,
      10,
      delta
    );
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      targetGroupPosZ,
      10,
      delta
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetGroupScale, 10, delta)
    );

    // 2. Component Pieces Separation (Flower-like blossoming curve)
    let sep = 0;
    if (p >= 0.30 && p <= 0.80) {
      const normalized = (p - 0.30) / 0.50;
      sep = Math.sin(normalized * Math.PI);
    }

    // Badge front texture opacity: 1.0 when assembled, fades out only when blossoming
    if (badgePlaneRef.current) {
      const mat = badgePlaneRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = THREE.MathUtils.damp(mat.opacity, 1 - sep * 0.95, 12, delta);
      }
    }

    // Letter F: Moves left, forward, and tilts slightly
    if (meshFRef.current) {
      const targetFX = -0.09 - 1.25 * sep;
      const targetFZ = 0.28 + 0.85 * sep;
      const targetFRotY = -0.32 * sep;
      const targetFRotZ = 0.1 * sep;

      meshFRef.current.position.x = THREE.MathUtils.damp(
        meshFRef.current.position.x,
        targetFX,
        12,
        delta
      );
      meshFRef.current.position.z = THREE.MathUtils.damp(
        meshFRef.current.position.z,
        targetFZ,
        12,
        delta
      );
      meshFRef.current.rotation.y = THREE.MathUtils.damp(
        meshFRef.current.rotation.y,
        targetFRotY,
        12,
        delta
      );
      meshFRef.current.rotation.z = THREE.MathUtils.damp(
        meshFRef.current.rotation.z,
        targetFRotZ,
        12,
        delta
      );
      // F is visible when blossoming
      meshFRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshFRef.current.scale.x, sep > 0.02 ? 1 : 0, 14, delta)
      );
    }

    // Letter T: Moves right, forward, and tilts opposite
    if (meshTRef.current) {
      const targetTX = -0.09 + 1.25 * sep;
      const targetTZ = 0.28 + 0.85 * sep;
      const targetTRotY = 0.32 * sep;
      const targetTRotZ = -0.1 * sep;

      meshTRef.current.position.x = THREE.MathUtils.damp(
        meshTRef.current.position.x,
        targetTX,
        12,
        delta
      );
      meshTRef.current.position.z = THREE.MathUtils.damp(
        meshTRef.current.position.z,
        targetTZ,
        12,
        delta
      );
      meshTRef.current.rotation.y = THREE.MathUtils.damp(
        meshTRef.current.rotation.y,
        targetTRotY,
        12,
        delta
      );
      meshTRef.current.rotation.z = THREE.MathUtils.damp(
        meshTRef.current.rotation.z,
        targetTRotZ,
        12,
        delta
      );
      meshTRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshTRef.current.scale.x, sep > 0.02 ? 1 : 0, 14, delta)
      );
    }

    // Wave Ribbon & Hex Top Roof: Elevates upward and tilts backward
    if (meshHexTopRef.current) {
      const targetTopY = 1.35 * sep;
      const targetTopZ = -0.21 - 0.55 * sep;
      const targetTopRotX = -0.38 * sep;

      meshHexTopRef.current.position.y = THREE.MathUtils.damp(
        meshHexTopRef.current.position.y,
        targetTopY,
        12,
        delta
      );
      meshHexTopRef.current.position.z = THREE.MathUtils.damp(
        meshHexTopRef.current.position.z,
        targetTopZ,
        12,
        delta
      );
      meshHexTopRef.current.rotation.x = THREE.MathUtils.damp(
        meshHexTopRef.current.rotation.x,
        targetTopRotX,
        12,
        delta
      );
      meshHexTopRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshHexTopRef.current.scale.x, sep > 0.02 ? 1 : 0, 14, delta)
      );
    }

    if (meshWaveRef.current) {
      const targetWaveY = 1.35 * sep;
      const targetWaveZ = 0.28 - 0.55 * sep;
      const targetWaveRotX = -0.38 * sep;

      meshWaveRef.current.position.y = THREE.MathUtils.damp(
        meshWaveRef.current.position.y,
        targetWaveY,
        12,
        delta
      );
      meshWaveRef.current.position.z = THREE.MathUtils.damp(
        meshWaveRef.current.position.z,
        targetWaveZ,
        12,
        delta
      );
      meshWaveRef.current.rotation.x = THREE.MathUtils.damp(
        meshWaveRef.current.rotation.x,
        targetWaveRotX,
        12,
        delta
      );
      meshWaveRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshWaveRef.current.scale.x, sep > 0.02 ? 1 : 0, 14, delta)
      );
    }

    // Hex Bottom Keel: Slides downward and angles forward
    if (meshHexBottomRef.current) {
      const targetBotY = -1.35 * sep;
      const targetBotZ = -0.21 - 0.55 * sep;
      const targetBotRotX = 0.38 * sep;

      meshHexBottomRef.current.position.y = THREE.MathUtils.damp(
        meshHexBottomRef.current.position.y,
        targetBotY,
        12,
        delta
      );
      meshHexBottomRef.current.position.z = THREE.MathUtils.damp(
        meshHexBottomRef.current.position.z,
        targetBotZ,
        12,
        delta
      );
      meshHexBottomRef.current.rotation.x = THREE.MathUtils.damp(
        meshHexBottomRef.current.rotation.x,
        targetBotRotX,
        12,
        delta
      );
      meshHexBottomRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshHexBottomRef.current.scale.x, sep > 0.02 ? 1 : 0, 14, delta)
      );
    }

    // Wings: Expand laterally like blooming petals
    if (meshWingLeftRef.current) {
      const targetWX = -1.75 * sep;
      meshWingLeftRef.current.position.x = THREE.MathUtils.damp(
        meshWingLeftRef.current.position.x,
        targetWX,
        10,
        delta
      );
      meshWingLeftRef.current.rotation.y = THREE.MathUtils.damp(
        meshWingLeftRef.current.rotation.y,
        -0.6 * sep,
        10,
        delta
      );
      meshWingLeftRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshWingLeftRef.current.scale.x, sep, 10, delta)
      );
    }
    if (meshWingRightRef.current) {
      const targetWX = 1.75 * sep;
      meshWingRightRef.current.position.x = THREE.MathUtils.damp(
        meshWingRightRef.current.position.x,
        targetWX,
        10,
        delta
      );
      meshWingRightRef.current.rotation.y = THREE.MathUtils.damp(
        meshWingRightRef.current.rotation.y,
        0.6 * sep,
        10,
        delta
      );
      meshWingRightRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshWingRightRef.current.scale.x, sep, 10, delta)
      );
    }

    // Core Tech Crystal: Appears when opened and spins continuously
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 1.8;
      coreRef.current.rotation.x += delta * 1.2;
      coreRef.current.scale.setScalar(
        THREE.MathUtils.damp(coreRef.current.scale.x, sep * 0.85, 12, delta)
      );
    }

    if (coreGlowLightRef.current) {
      coreGlowLightRef.current.intensity = THREE.MathUtils.damp(
        coreGlowLightRef.current.intensity,
        sep * 4.5,
        10,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* --- A. SOLID COMPLETE BASE (Always present, sapphire metallic bevels) --- */}
      <mesh
        ref={meshHexFullRef}
        geometry={geomHexFull}
        material={sapphireHexMaterial}
        position={[0, 0, -0.21]}
        castShadow
        receiveShadow
      />

      {/* Front Face Texture Plate from inicio.png (Placed in front of the base at z = +0.275) */}
      <mesh
        ref={badgePlaneRef}
        position={[0, 0, 0.275]}
        scale={[3.72, 3.78, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={badgeTexture}
          transparent
          opacity={1}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* --- B. MODULAR 3D BLOSSOMING PIECES (Separates when scrolling) --- */}

      {/* 1. Hexagon Top Hood */}
      <mesh
        ref={meshHexTopRef}
        geometry={geomHexTop}
        material={sapphireHexMaterial}
        position={[0, 0, -0.21]}
        scale={[0, 0, 0]}
        castShadow
        receiveShadow
      />

      {/* 2. Hexagon Bottom Keel */}
      <mesh
        ref={meshHexBottomRef}
        geometry={geomHexBottom}
        material={sapphireHexMaterial}
        position={[0, 0, -0.21]}
        scale={[0, 0, 0]}
        castShadow
        receiveShadow
      />

      {/* 3. Mountain Crest Wave Line (Embossed white) */}
      <mesh
        ref={meshWaveRef}
        geometry={geomWave}
        material={whiteEmbossMaterial}
        position={[0, 0, 0.28]}
        scale={[0, 0, 0]}
        castShadow
        receiveShadow
      />

      {/* 4. Letter F (Embossed white) */}
      <mesh
        ref={meshFRef}
        geometry={geomF}
        material={whiteEmbossMaterial}
        position={[-0.09, 0, 0.28]}
        scale={[0, 0, 0]}
        castShadow
        receiveShadow
      />

      {/* 5. Letter T (Embossed white) */}
      <mesh
        ref={meshTRef}
        geometry={geomT}
        material={whiteEmbossMaterial}
        position={[-0.09, 0, 0.28]}
        scale={[0, 0, 0]}
        castShadow
        receiveShadow
      />

      {/* 6. Left Flower Petal / Wing */}
      <mesh
        ref={meshWingLeftRef}
        geometry={geomWingLeft}
        material={wingMaterial}
        position={[0, 0, 0]}
        scale={[0, 0, 0]}
      />

      {/* 7. Right Flower Petal / Wing */}
      <mesh
        ref={meshWingRightRef}
        geometry={geomWingRight}
        material={wingMaterial}
        position={[0, 0, 0]}
        scale={[0, 0, 0]}
      />

      {/* 8. Core Technological Crystal */}
      <mesh ref={coreRef} position={[0, 0, 0]} scale={[0, 0, 0]} material={coreMaterial}>
        <octahedronGeometry args={[0.7, 0]} />
      </mesh>

      {/* Internal Core Accent Light */}
      <pointLight
        ref={coreGlowLightRef}
        color="#fbbf24"
        distance={7}
        decay={2}
        intensity={0}
      />
    </group>
  );
}
