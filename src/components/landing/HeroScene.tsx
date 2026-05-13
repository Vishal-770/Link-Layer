"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line, Float } from "@react-three/drei";
import * as THREE from "three";

function useCSSColor(variable: string, fallback: string): string {
  const [color, setColor] = useState(fallback);
  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
    if (value) setColor(value);
  }, [variable]);
  return color;
}

function LinkNetwork({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) {
  const pointsRef = useRef<THREE.Group>(null!);
  const count = 40;

  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, []);

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 4) lines.push([nodes[i], nodes[j]]);
      }
    }
    return lines;
  }, [nodes]);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    nodes.forEach((node, i) => {
      pos[i * 3] = node.x;
      pos[i * 3 + 1] = node.y;
      pos[i * 3 + 2] = node.z;
    });
    return pos;
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = Math.sin(t / 4) * 0.1;
    pointsRef.current.rotation.x = Math.cos(t / 4) * 0.1;
    const targetX = state.mouse.x * 2;
    const targetY = state.mouse.y * 2;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
  });

  return (
    <group ref={pointsRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color={primaryColor}
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {connections.map((pts, index) => (
        <Line
          key={index}
          points={pts}
          color={secondaryColor}
          lineWidth={0.5}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      ))}
    </group>
  );
}

export default function HeroScene() {
  const primaryColor = useCSSColor("--primary", "#df6035");
  const secondaryColor = useCSSColor("--secondary", "#2f4b79");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-background pointer-events-none overflow-hidden">
      {/* Dot grid uses CSS var — adapts to mode automatically */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Canvas camera={{ position: [0, 0, isMobile ? 15 : 10], fov: isMobile ? 50 : 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={primaryColor} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <LinkNetwork primaryColor={primaryColor} secondaryColor={secondaryColor} />
        </Float>
      </Canvas>
    </div>
  );
}
