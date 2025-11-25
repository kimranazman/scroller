'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';

interface ROVModelProps {
  scrollProgress?: number;
}

// ROV Body Component
function ROVBody() {
  const bodyRef = useRef<THREE.Group>(null);

  return (
    <group ref={bodyRef}>
      {/* Main Hull - Central Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.2, 1.6]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Hull Frame - Yellow Industrial */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.3, 1.7]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.7}
          roughness={0.3}
          wireframe
        />
      </mesh>

      {/* Front Glass Dome - Camera Housing */}
      <mesh position={[1.3, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI]} />
        <MeshTransmissionMaterial
          color="#06b6d4"
          transmission={0.9}
          thickness={0.2}
          roughness={0}
          chromaticAberration={0.03}
          anisotropy={0.3}
        />
      </mesh>

      {/* Camera Lens */}
      <mesh position={[1.45, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.12, 0.1, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Secondary Cameras */}
      {[-0.3, 0.3].map((z, i) => (
        <group key={i} position={[1.1, -0.3, z]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Thruster Component
function Thruster({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const thrusterRef = useRef<THREE.Group>(null);
  const propellerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (propellerRef.current) {
      propellerRef.current.rotation.z += 0.3;
    }
  });

  return (
    <group ref={thrusterRef} position={position} rotation={rotation || [0, 0, 0]}>
      {/* Thruster Housing */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.4, 8]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Thruster Guard */}
      <mesh>
        <torusGeometry args={[0.22, 0.03, 8, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Propeller */}
      <mesh ref={propellerRef} position={[0, 0.15, 0]}>
        <boxGeometry args={[0.35, 0.02, 0.08]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Manipulator Arm Component
function ManipulatorArm({ side }: { side: 'left' | 'right' }) {
  const armRef = useRef<THREE.Group>(null);
  const zPos = side === 'left' ? 1 : -1;

  useFrame((state) => {
    if (armRef.current) {
      const t = state.clock.elapsedTime;
      armRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      armRef.current.rotation.z = Math.cos(t * 0.3) * 0.05 * zPos;
    }
  });

  return (
    <group ref={armRef} position={[0.8, -0.5, zPos * 0.7]}>
      {/* Shoulder Joint */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Upper Arm */}
      <mesh position={[0.25, -0.15, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.06, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Elbow Joint */}
      <mesh position={[0.45, -0.35, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Forearm */}
      <mesh position={[0.65, -0.45, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.05, 0.06, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Gripper */}
      <group position={[0.85, -0.55, 0]}>
        {/* Gripper Base */}
        <mesh>
          <boxGeometry args={[0.08, 0.12, 0.15]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Gripper Claws */}
        {[-0.06, 0.06].map((offset, i) => (
          <mesh key={i} position={[0.06, 0, offset]} rotation={[0, 0, i === 0 ? 0.3 : -0.3]}>
            <boxGeometry args={[0.1, 0.03, 0.03]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Lights Array Component
function ROVLights() {
  return (
    <group>
      {/* Main Headlights */}
      {[-0.4, 0.4].map((z, i) => (
        <group key={i} position={[1.2, 0.35, z]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.12, 0.08, 16]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.02, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#fef08a"
              emissiveIntensity={2}
            />
          </mesh>
          <pointLight position={[0.1, 0, 0]} color="#fef08a" intensity={0.5} distance={5} />
        </group>
      ))}

      {/* Status Lights */}
      <mesh position={[-1.2, 0.4, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-1.2, 0.25, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

// Flotation Module
function FlotationModule() {
  return (
    <group position={[0, 0.85, 0]}>
      {/* Main Buoyancy Foam */}
      <mesh castShadow>
        <boxGeometry args={[2.2, 0.4, 1.4]} />
        <meshStandardMaterial color="#f97316" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Lifting Bail */}
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.04, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Tether/Umbilical Component
function Tether() {
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      points.push(new THREE.Vector3(
        -1.2 - t * 3,
        0.3 + Math.sin(t * Math.PI * 2) * 0.3,
        Math.cos(t * Math.PI) * 0.5
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
      <meshStandardMaterial color="#fbbf24" metalness={0.5} roughness={0.5} />
    </mesh>
  );
}

// Main ROV Model
export default function ROVModel({ scrollProgress = 0 }: ROVModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.02;
      groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.015;

      // Scroll-based rotation
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} scale={1}>
        <ROVBody />
        <FlotationModule />
        <ROVLights />
        <ManipulatorArm side="left" />
        <ManipulatorArm side="right" />

        {/* Horizontal Thrusters */}
        <Thruster position={[-1.3, 0, 0.7]} rotation={[0, 0, Math.PI / 2]} />
        <Thruster position={[-1.3, 0, -0.7]} rotation={[0, 0, Math.PI / 2]} />

        {/* Vertical Thrusters */}
        <Thruster position={[0.8, 0.7, 0.6]} rotation={[0, 0, 0]} />
        <Thruster position={[0.8, 0.7, -0.6]} rotation={[0, 0, 0]} />
        <Thruster position={[-0.8, 0.7, 0.6]} rotation={[0, 0, 0]} />
        <Thruster position={[-0.8, 0.7, -0.6]} rotation={[0, 0, 0]} />

        {/* Lateral Thrusters */}
        <Thruster position={[0, -0.7, 0.8]} rotation={[Math.PI / 2, 0, 0]} />
        <Thruster position={[0, -0.7, -0.8]} rotation={[Math.PI / 2, 0, 0]} />

        <Tether />
      </group>
    </Float>
  );
}
