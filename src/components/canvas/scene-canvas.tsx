"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Logo3DModel } from "./logo-3d-model";

// Ambient particle dust ("estrellitas") - cyan, gold, and white
function CosmicDust() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 160;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color("#00e5ff");
    const gold = new THREE.Color("#fbbf24");
    const white = new THREE.Color("#f8fafc");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      const rand = Math.random();
      const c = rand < 0.45 ? cyan : rand < 0.7 ? gold : white;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface SceneCanvasProps {
  progress: number;
}

export function SceneCanvas({ progress }: SceneCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 40 }}
        dpr={[1, 1.25]} // High performance, buttery smooth on any GPU
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Ambient Dark Navy/Sapphire Base Light */}
        <ambientLight intensity={1.2} color="#081845" />

        {/* Key Directional Light (Soft White Front-Top) */}
        <directionalLight
          position={[3, 6, 6]}
          intensity={2.2}
          color="#ffffff"
        />

        {/* 1. Electric Neon Cyan Rim Light (Left & Bottom Edges) */}
        <directionalLight
          position={[-6, -4, -3]}
          intensity={4.2}
          color="#00e5ff"
        />

        {/* 2. Warm Gold/Amber Highlight Rim Light (Top-Right Corner - as seen in inicio.png) */}
        <directionalLight
          position={[5, 6, 2.5]}
          intensity={3.8}
          color="#fbbf24"
        />

        {/* Fill Blue Light underneath */}
        <pointLight position={[0, -4, 3]} intensity={1.2} color="#0284c7" />

        {/* 3D Model positioned in upper half matching inicio.png */}
        <group position={[0, 1.02, 0]}>
          <Logo3DModel progress={progress} />
        </group>

        {/* Cosmic Ambient Starlight Particles */}
        <CosmicDust />
      </Canvas>
    </div>
  );
}
