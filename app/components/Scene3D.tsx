'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Icosahedron, Octahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
function FloatingShape({ position, color, speed = 1, shape = 'sphere' }: { position: [number, number, number]; color: string; speed?: number; shape?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  const ShapeComponent = shape === 'torus' ? Torus : shape === 'icosahedron' ? Icosahedron : shape === 'octahedron' ? Octahedron : Sphere;
  const args: any = shape === 'torus' ? [0.6, 0.25, 16, 32] : shape === 'sphere' ? [0.5, 32, 32] : [0.5, 0];

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <ShapeComponent ref={meshRef} args={args} position={position}>
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </ShapeComponent>
    </Float>
  );
}

// Particle field
function ParticleField() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a855f7" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Glowing ring
function GlowRing({ radius = 2, color = '#8a24eb' }: { radius?: number; color?: string }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

// Central orb
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#7c3aed"
        roughness={0.1}
        metalness={1}
        distort={0.4}
        speed={3}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

// Main 3D Scene
export function HeroScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6366f1" />
        <pointLight position={[3, 3, 3]} intensity={0.4} color="#ec4899" />

        <CentralOrb />
        <GlowRing radius={2} color="#8a24eb" />
        <GlowRing radius={2.8} color="#6366f1" />
        <GlowRing radius={3.5} color="#a855f7" />

        <FloatingShape position={[-3, 1.5, -2]} color="#8b5cf6" speed={0.8} shape="icosahedron" />
        <FloatingShape position={[3.5, -1, -1]} color="#ec4899" speed={1.2} shape="octahedron" />
        <FloatingShape position={[-2.5, -2, 1]} color="#6366f1" speed={0.6} shape="torus" />
        <FloatingShape position={[2, 2, -3]} color="#a855f7" speed={1} shape="sphere" />
        <FloatingShape position={[-4, 0, -2]} color="#22d3ee" speed={0.9} shape="icosahedron" />
        <FloatingShape position={[4, 1, 1]} color="#f472b6" speed={0.7} shape="octahedron" />

        <ParticleField />
        <Stars radius={100} depth={50} count={1000} factor={3} saturation={0.5} fade speed={1} />
      </Canvas>
    </div>
  );
}

// Smaller scene for section backgrounds
export function FloatingSceneSmall() {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.3} color="#8a24eb" />
        <FloatingShape position={[0, 0, 0]} color="#8b5cf6" speed={0.5} shape="icosahedron" />
        <ParticleField />
      </Canvas>
    </div>
  );
}
