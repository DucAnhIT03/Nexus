'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// ========= ROTATING GEAR =========
function Gear({ position, radius = 1, teeth = 12, thickness = 0.15, speed = 0.3, color = '#10b981' }: {
  position: [number, number, number];
  radius?: number;
  teeth?: number;
  thickness?: number;
  speed?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const gearShape = useMemo(() => {
    const shape = new THREE.Shape();
    const innerR = radius * 0.7;
    const outerR = radius;
    const toothH = radius * 0.15;
    const angleStep = (Math.PI * 2) / teeth;

    for (let i = 0; i < teeth; i++) {
      const a1 = i * angleStep;
      const a2 = a1 + angleStep * 0.3;
      const a3 = a1 + angleStep * 0.5;
      const a4 = a1 + angleStep * 0.8;

      if (i === 0) {
        shape.moveTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR);
      }
      shape.lineTo(Math.cos(a2) * (outerR + toothH), Math.sin(a2) * (outerR + toothH));
      shape.lineTo(Math.cos(a3) * (outerR + toothH), Math.sin(a3) * (outerR + toothH));
      shape.lineTo(Math.cos(a4) * outerR, Math.sin(a4) * outerR);
      shape.lineTo(Math.cos(a1 + angleStep) * outerR, Math.sin(a1 + angleStep) * outerR);
    }

    // Cut center hole
    const holePath = new THREE.Path();
    const holeSegments = 32;
    for (let i = 0; i <= holeSegments; i++) {
      const angle = (i / holeSegments) * Math.PI * 2;
      if (i === 0) holePath.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
      else holePath.lineTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
    }
    shape.holes.push(holePath);

    return shape;
  }, [radius, teeth]);

  const extrudeSettings = useMemo(() => ({
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  }), [thickness]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += speed * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <extrudeGeometry args={[gearShape, extrudeSettings]} />
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.15}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// ========= DATA HELIX (DNA-like spiral of connected nodes) =========
function DataHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 28;
  const helixRadius = 2.2;
  const helixHeight = 6;

  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      const t = i / nodeCount;
      const angle = t * Math.PI * 4; // 2 full rotations
      const y = (t - 0.5) * helixHeight;
      const x = Math.cos(angle) * helixRadius;
      const z = Math.sin(angle) * helixRadius;
      positions.push([x, y, z]);
    }
    return positions;
  }, []);

  // Second strand (offset by PI)
  const nodePositions2 = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      const t = i / nodeCount;
      const angle = t * Math.PI * 4 + Math.PI;
      const y = (t - 0.5) * helixHeight;
      const x = Math.cos(angle) * helixRadius;
      const z = Math.sin(angle) * helixRadius;
      positions.push([x, y, z]);
    }
    return positions;
  }, []);

  // Connection lines between strands
  const connectionLines = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    for (let i = 0; i < nodeCount; i += 2) {
      lines.push({
        start: new THREE.Vector3(...nodePositions[i]),
        end: new THREE.Vector3(...nodePositions2[i]),
      });
    }
    return lines;
  }, [nodePositions, nodePositions2]);

  const nodeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#34d399',
    emissive: '#10b981',
    emissiveIntensity: 1.2,
    metalness: 0.5,
    roughness: 0.2,
  }), []);

  const nodeMat2 = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#22d3ee',
    emissive: '#06b6d4',
    emissiveIntensity: 1,
    metalness: 0.5,
    roughness: 0.2,
  }), []);

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#10b981',
    transparent: true,
    opacity: 0.2,
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={`n1-${i}`} position={pos} material={nodeMat}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
      ))}
      {/* Strand 2 nodes */}
      {nodePositions2.map((pos, i) => (
        <mesh key={`n2-${i}`} position={pos} material={nodeMat2}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
      ))}
      {/* Connection lines */}
      {connectionLines.map((conn, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([conn.start, conn.end]);
        const lineObj = new THREE.Line(geometry, lineMat);
        return <primitive key={`cl-${i}`} object={lineObj} />;
      })}
      {/* Strand curves */}
      {[nodePositions, nodePositions2].map((strand, si) => {
        const points = strand.map(p => new THREE.Vector3(...p));
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.015, 8, false);
        return (
          <mesh key={`strand-${si}`} geometry={tubeGeo}>
            <meshBasicMaterial
              color={si === 0 ? '#10b981' : '#06b6d4'}
              transparent
              opacity={0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ========= MATRIX DATA RAIN (vertical streaming particles) =========
function DataStream() {
  const count = 200;
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      vel[i] = 0.01 + Math.random() * 0.03;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (ref.current) {
      const posArr = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] -= velocities[i];
        if (posArr[i * 3 + 1] < -6) {
          posArr[i * 3 + 1] = 6;
          posArr[i * 3] = (Math.random() - 0.5) * 12;
          posArr[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#34d399" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// ========= CIRCUIT BOARD LINES (radial expanding lines) =========
function CircuitLines() {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const result: THREE.BufferGeometry[] = [];
    const lineCount = 16;
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const r1 = 1.5;
      const r2 = 3 + Math.random() * 1.5;
      const points = [
        new THREE.Vector3(Math.cos(angle) * r1, 0, Math.sin(angle) * r1),
        new THREE.Vector3(Math.cos(angle) * r2, 0, Math.sin(angle) * r2),
      ];
      // Add a right-angle turn for circuit feel
      const turnAngle = angle + (Math.random() > 0.5 ? 0.15 : -0.15);
      const r3 = r2 + 0.5 + Math.random();
      points.push(new THREE.Vector3(Math.cos(turnAngle) * r3, 0, Math.sin(turnAngle) * r3));

      result.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return result;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {lines.map((geo, i) => {
        const circuitMat = new THREE.LineBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.12 });
        const lineObj = new THREE.Line(geo, circuitMat);
        return <primitive key={i} object={lineObj} />;
      })}
      {/* Central hub */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.5, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.55, 48]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ========= PULSING CORE =========
function PulsingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      const s = 0.5 + Math.sin(t * 1.5) * 0.05;
      meshRef.current.scale.set(s, s, s);
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = t * 0.2;
    }
    if (glowRef.current) {
      const gs = 0.8 + Math.sin(t * 1.5) * 0.1;
      glowRef.current.scale.set(gs, gs, gs);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(t * 1.5) * 0.03;
    }
  });

  return (
    <group>
      {/* Inner icosahedron core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

// ========= MAIN EXPORTED SCENE =========
export function ToolHeroScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 2, 7], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[4, 3, 5]} intensity={0.7} color="#10b981" />
        <pointLight position={[-3, -2, 4]} intensity={0.4} color="#06b6d4" />
        <pointLight position={[0, 4, 0]} intensity={0.3} color="#34d399" />
        <spotLight position={[0, 5, 3]} intensity={0.5} angle={0.6} penumbra={0.8} color="#10b981" />

        {/* Gears system */}
        <Gear position={[-1.8, 0, -1]} radius={0.8} teeth={10} speed={0.4} color="#10b981" />
        <Gear position={[-0.2, 0, -1]} radius={0.55} teeth={8} speed={-0.55} color="#06b6d4" />
        <Gear position={[1.2, 0.6, -1.5]} radius={0.4} teeth={6} speed={0.7} color="#34d399" />

        {/* Central wireframe core */}
        <PulsingCore />

        {/* DNA helix around the scene */}
        <DataHelix />

        {/* Circuit board lines */}
        <CircuitLines />

        {/* Matrix-style data rain */}
        <DataStream />

        {/* Background stars */}
        <Stars radius={60} depth={30} count={600} factor={2} saturation={0.3} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
