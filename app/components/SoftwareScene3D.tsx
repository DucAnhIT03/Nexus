'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// ═══ FLOATING CUBES — rotating wireframe cubes ═══
function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const cubes = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], size: 0.8, speed: 1 },
    { pos: [1.5, 0.8, -1] as [number, number, number], size: 0.35, speed: 1.5 },
    { pos: [-1.2, -0.5, 0.5] as [number, number, number], size: 0.25, speed: 2 },
    { pos: [0.7, -1, 1.2] as [number, number, number], size: 0.2, speed: 1.8 },
  ], []);

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={cube.speed} rotationIntensity={0.4} floatIntensity={0.5}>
          <mesh position={cube.pos}>
            <boxGeometry args={[cube.size, cube.size, cube.size]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#06b6d4"
              emissiveIntensity={i === 0 ? 0.4 : 0.2}
              wireframe={i !== 0}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={i === 0 ? 0.6 : 0.25}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ═══ DOT GRID ═══
function DotGrid() {
  const count = 100;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#67e8f9" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export function SoftwareHeroScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 4]} intensity={0.5} color="#22d3ee" />
        <pointLight position={[-3, -2, 3]} intensity={0.3} color="#6366f1" />

        <FloatingCubes />
        <DotGrid />

        <Stars radius={30} depth={20} count={200} factor={1} saturation={0.1} fade speed={0.1} />
      </Canvas>
    </div>
  );
}
