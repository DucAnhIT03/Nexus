'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// ========= 3D ANIMATED ROBOT =========
function RobotCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Group>(null);

  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#b0c4de',
    metalness: 0.8,
    roughness: 0.2,
  }), []);

  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2d3748',
    metalness: 0.9,
    roughness: 0.3,
  }), []);

  const glowCyan = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#22d3ee',
    emissive: '#22d3ee',
    emissiveIntensity: 2,
    metalness: 0.5,
    roughness: 0.1,
  }), []);

  const glowPurple = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#a78bfa',
    emissive: '#a78bfa',
    emissiveIntensity: 1.5,
    metalness: 0.5,
    roughness: 0.1,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Whole body gentle sway
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.06;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
    }

    // Head looks around and slightly toward camera
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      headRef.current.rotation.x = Math.sin(t * 0.7) * 0.05 - 0.05;
      headRef.current.rotation.z = Math.sin(t * 0.4) * 0.03;
    }

    // Right arm: points forward at the user (camera), with a wave cycle
    if (rightArmRef.current) {
      // Arm raised and pointing forward
      const wave = Math.sin(t * 1.2) * 0.15;
      rightArmRef.current.rotation.x = -0.8 + wave; // raised forward
      rightArmRef.current.rotation.z = -0.3 + Math.sin(t * 0.6) * 0.1;
    }

    // Left arm: subtle idle sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 0.7 + 1) * 0.12;
      leftArmRef.current.rotation.z = 0.15;
    }

    // Legs slight movement (idle stance)
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = Math.sin(t * 0.6) * 0.06;
    }
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(t * 0.6 + Math.PI) * 0.06;
    }

    // Eyes pulse glow
    if (eyeLeftRef.current) {
      const glow = 1.5 + Math.sin(t * 2) * 1;
      (eyeLeftRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
    }
    if (eyeRightRef.current) {
      const glow = 1.5 + Math.sin(t * 2 + 0.3) * 1;
      (eyeRightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
    }

    // Antenna bob
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1.1}>
      {/* === HEAD === */}
      <group ref={headRef} position={[0, 1.15, 0]}>
        {/* Head box */}
        <mesh material={metalMat}>
          <boxGeometry args={[0.55, 0.45, 0.45]} />
        </mesh>
        {/* Visor / face plate */}
        <mesh position={[0, -0.02, 0.23]} material={darkMat}>
          <boxGeometry args={[0.48, 0.32, 0.02]} />
        </mesh>
        {/* Eyes */}
        <mesh ref={eyeLeftRef} position={[-0.12, 0.02, 0.24]} material={glowCyan}>
          <sphereGeometry args={[0.05, 12, 12]} />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.12, 0.02, 0.24]} material={glowCyan}>
          <sphereGeometry args={[0.05, 12, 12]} />
        </mesh>
        {/* Mouth line */}
        <mesh position={[0, -0.1, 0.24]}>
          <boxGeometry args={[0.2, 0.015, 0.01]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
        </mesh>
        {/* Ear panels */}
        <mesh position={[-0.29, 0, 0]} material={darkMat}>
          <boxGeometry args={[0.04, 0.2, 0.25]} />
        </mesh>
        <mesh position={[0.29, 0, 0]} material={darkMat}>
          <boxGeometry args={[0.04, 0.2, 0.25]} />
        </mesh>
        {/* Antenna */}
        <group ref={antennaRef} position={[0, 0.3, 0]}>
          <mesh material={darkMat}>
            <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          </mesh>
          <mesh position={[0, 0.12, 0]} material={glowCyan}>
            <sphereGeometry args={[0.035, 10, 10]} />
          </mesh>
        </group>
      </group>

      {/* === NECK === */}
      <mesh position={[0, 0.85, 0]} material={darkMat}>
        <cylinderGeometry args={[0.08, 0.1, 0.12, 8]} />
      </mesh>

      {/* === BODY / TORSO === */}
      <mesh position={[0, 0.4, 0]} material={metalMat}>
        <boxGeometry args={[0.7, 0.75, 0.4]} />
      </mesh>
      {/* Chest light */}
      <mesh position={[0, 0.5, 0.21]} material={glowCyan}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
      </mesh>
      {/* Chest detail lines */}
      <mesh position={[0, 0.3, 0.21]}>
        <boxGeometry args={[0.5, 0.02, 0.01]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.2, 0.21]}>
        <boxGeometry args={[0.4, 0.02, 0.01]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} />
      </mesh>

      {/* === HIPS === */}
      <mesh position={[0, -0.05, 0]} material={darkMat}>
        <boxGeometry args={[0.6, 0.15, 0.35]} />
      </mesh>

      {/* === RIGHT ARM (pointing forward) === */}
      <group ref={rightArmRef} position={[0.45, 0.6, 0]}>
        {/* Shoulder joint */}
        <mesh material={darkMat}>
          <sphereGeometry args={[0.09, 10, 10]} />
        </mesh>
        {/* Upper arm */}
        <mesh position={[0, -0.2, 0]} material={metalMat}>
          <boxGeometry args={[0.14, 0.35, 0.14]} />
        </mesh>
        {/* Elbow joint */}
        <mesh position={[0, -0.4, 0]} material={darkMat}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.57, 0]} material={metalMat}>
          <boxGeometry args={[0.12, 0.3, 0.12]} />
        </mesh>
        {/* Hand - pointing finger */}
        <mesh position={[0, -0.75, 0]} material={darkMat}>
          <boxGeometry args={[0.1, 0.08, 0.1]} />
        </mesh>
        {/* Pointing finger extended forward */}
        <mesh position={[0, -0.76, 0.1]} material={glowCyan}>
          <boxGeometry args={[0.03, 0.03, 0.15]} />
        </mesh>
        {/* Fingertip glow */}
        <mesh position={[0, -0.76, 0.18]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* === LEFT ARM === */}
      <group ref={leftArmRef} position={[-0.45, 0.6, 0]}>
        <mesh material={darkMat}>
          <sphereGeometry args={[0.09, 10, 10]} />
        </mesh>
        <mesh position={[0, -0.2, 0]} material={metalMat}>
          <boxGeometry args={[0.14, 0.35, 0.14]} />
        </mesh>
        <mesh position={[0, -0.4, 0]} material={darkMat}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.57, 0]} material={metalMat}>
          <boxGeometry args={[0.12, 0.3, 0.12]} />
        </mesh>
        <mesh position={[0, -0.75, 0]} material={darkMat}>
          <sphereGeometry args={[0.09, 8, 8]} />
        </mesh>
      </group>

      {/* === RIGHT LEG === */}
      <group ref={rightLegRef} position={[0.17, -0.2, 0]}>
        <mesh position={[0, -0.2, 0]} material={metalMat}>
          <boxGeometry args={[0.16, 0.35, 0.16]} />
        </mesh>
        <mesh position={[0, -0.4, 0]} material={darkMat}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.57, 0]} material={metalMat}>
          <boxGeometry args={[0.14, 0.3, 0.14]} />
        </mesh>
        <mesh position={[0, -0.75, 0.05]} material={darkMat}>
          <boxGeometry args={[0.16, 0.06, 0.22]} />
        </mesh>
      </group>

      {/* === LEFT LEG === */}
      <group ref={leftLegRef} position={[-0.17, -0.2, 0]}>
        <mesh position={[0, -0.2, 0]} material={metalMat}>
          <boxGeometry args={[0.16, 0.35, 0.16]} />
        </mesh>
        <mesh position={[0, -0.4, 0]} material={darkMat}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.57, 0]} material={metalMat}>
          <boxGeometry args={[0.14, 0.3, 0.14]} />
        </mesh>
        <mesh position={[0, -0.75, 0.05]} material={darkMat}>
          <boxGeometry args={[0.16, 0.06, 0.22]} />
        </mesh>
      </group>
    </group>
  );
}

// Energy particles floating around the robot
function RobotParticles() {
  const count = 80;
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 2;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      const posArr = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// Ground glow circle
function GroundGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.15;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
      <circleGeometry args={[1.5, 32]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.1} />
    </mesh>
  );
}

// Floating energy ring around robot
function EnergyRing({ y, speed, color }: { y: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
      const s = 1 + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.08;
      ref.current.scale.set(s, s, 1);
    }
  });
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.0, 0.008, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

// Exported scene with the 3D robot
export function AIHeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0.3, 3.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 2, 4]} intensity={0.8} color="#22d3ee" />
        <pointLight position={[-2, -1, 3]} intensity={0.5} color="#a78bfa" />
        <pointLight position={[0, 2, 1]} intensity={0.3} color="#ffffff" />
        <spotLight position={[0, 3, 2]} intensity={0.6} angle={0.5} penumbra={0.8} color="#22d3ee" castShadow />

        <RobotCharacter />
        <RobotParticles />
        <GroundGlow />
        <EnergyRing y={-0.5} speed={0.5} color="#22d3ee" />
        <EnergyRing y={0.3} speed={-0.3} color="#a78bfa" />
        <Stars radius={50} depth={25} count={200} factor={1} saturation={0.15} fade speed={0.3} />
      </Canvas>
    </div>
  );
}
