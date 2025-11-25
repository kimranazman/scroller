'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Underwater Particles (bubbles, sediment)
export function UnderwaterParticles({ count = 500 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      sz[i] = Math.random() * 0.1 + 0.02;
    }

    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        // Rising bubble effect
        positions[i * 3 + 1] += 0.01 + Math.random() * 0.005;

        // Slight horizontal drift
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002;
        positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime + i) * 0.002;

        // Reset if too high
        if (positions[i * 3 + 1] > 20) {
          positions[i * 3 + 1] = -20;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#38bdf8"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Light Rays (God rays effect)
export function LightRays() {
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (raysRef.current) {
      raysRef.current.children.forEach((ray, i) => {
        const mesh = ray as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.02;
      });
    }
  });

  return (
    <group ref={raysRef} position={[0, 15, 0]} rotation={[0, 0, 0]}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[(i - 4) * 3, 0, Math.sin(i) * 2]}
          rotation={[0, 0, (i - 4) * 0.1]}
        >
          <planeGeometry args={[1.5, 30]} />
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Seafloor Component
export function Seafloor() {
  const floorRef = useRef<THREE.Mesh>(null);

  return (
    <group position={[0, -8, 0]}>
      {/* Main Floor */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial
          color="#0c1829"
          metalness={0.3}
          roughness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Rocky formations */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 40,
            Math.random() * 1.5,
            (Math.random() - 0.5) * 40
          ]}
          rotation={[
            Math.random() * 0.3,
            Math.random() * Math.PI,
            Math.random() * 0.3
          ]}
        >
          <dodecahedronGeometry args={[Math.random() * 1.5 + 0.5, 0]} />
          <meshStandardMaterial
            color="#1e3a5f"
            metalness={0.4}
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Pipeline on seafloor */}
      <group position={[0, 0.5, -5]} rotation={[0, 0.3, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.8, 0.8, 50, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Pipeline supports */}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i} position={[(i - 5) * 5, -0.4, 0]}>
            <boxGeometry args={[0.3, 0.8, 1.8]} />
            <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Subsea Structure/Manifold */}
      <group position={[8, 1, 3]}>
        <mesh>
          <boxGeometry args={[4, 2, 3]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.5} />
        </mesh>
        {/* Valves and pipes */}
        {[-1, 0, 1].map((x, i) => (
          <group key={i} position={[x * 1.2, 1.2, 0]}>
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, 0.8, 8]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <torusGeometry args={[0.2, 0.08, 8, 16]} />
              <meshStandardMaterial color="#dc2626" metalness={0.6} roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// Caustics effect on surfaces
export function CausticsEffect() {
  const causticsRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (causticsRef.current) {
      const material = causticsRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      causticsRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={causticsRef} position={[0, -7.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshBasicMaterial
        color="#0ea5e9"
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Ambient Fish/Marine Life
export function MarineLife() {
  const fishGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (fishGroupRef.current) {
      fishGroupRef.current.children.forEach((fish, i) => {
        const t = state.clock.elapsedTime * 0.5 + i * 0.5;
        fish.position.x = Math.sin(t) * 15;
        fish.position.z = Math.cos(t) * 10 + i * 2;
        fish.rotation.y = Math.atan2(Math.cos(t), -Math.sin(t));
      });
    }
  });

  return (
    <group ref={fishGroupRef}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, -2 + i * 0.5, i * 2]} scale={0.15} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.5, 2, 4]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#64748b' : '#94a3b8'}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Complete underwater environment
export default function UnderwaterEnvironment() {
  return (
    <group>
      <UnderwaterParticles count={300} />
      <LightRays />
      <Seafloor />
      <CausticsEffect />
      <MarineLife />

      {/* Fog/Depth effect */}
      <fog attach="fog" args={['#0c1929', 5, 50]} />
    </group>
  );
}
