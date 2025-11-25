'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import ROVModel from './ROVModel';
import UnderwaterEnvironment from './UnderwaterEnvironment';

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-cyan-400 font-mono text-sm">
          Loading ROV Systems... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
}

// Camera controller that responds to scroll
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(8, 2, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Interpolate camera based on scroll
    const t = scrollProgress;

    // Define camera path keyframes
    const positions = [
      new THREE.Vector3(8, 2, 8),    // Initial - wide shot
      new THREE.Vector3(4, 1, 5),    // Closer
      new THREE.Vector3(2, 0, 4),    // Side view
      new THREE.Vector3(-3, 1, 5),   // Other side
      new THREE.Vector3(6, 3, 6),    // Top angle
    ];

    const lookAts = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, 0, 0),
      new THREE.Vector3(1, -0.2, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ];

    // Find current segment
    const segmentCount = positions.length - 1;
    const segment = Math.min(Math.floor(t * segmentCount), segmentCount - 1);
    const segmentProgress = (t * segmentCount) % 1;

    // Interpolate between keyframes
    const startPos = positions[segment];
    const endPos = positions[Math.min(segment + 1, positions.length - 1)];
    targetPosition.current.lerpVectors(startPos, endPos, segmentProgress);

    const startLook = lookAts[segment];
    const endLook = lookAts[Math.min(segment + 1, lookAts.length - 1)];
    targetLookAt.current.lerpVectors(startLook, endLook, segmentProgress);

    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.05);

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

// Underwater lighting setup
function UnderwaterLighting() {
  return (
    <>
      {/* Main ambient - deep blue underwater */}
      <ambientLight intensity={0.2} color="#1e3a5f" />

      {/* Surface light from above */}
      <directionalLight
        position={[0, 20, 5]}
        intensity={0.8}
        color="#38bdf8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* ROV spotlights simulation */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.4}
        penumbra={0.5}
        intensity={1}
        color="#fef08a"
        castShadow
      />

      {/* Fill light */}
      <pointLight position={[-10, 5, -10]} intensity={0.3} color="#0ea5e9" />

      {/* Underwater caustic hint */}
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#22d3ee" />
    </>
  );
}

interface ROVSceneProps {
  scrollProgress?: number;
  className?: string;
}

export default function ROVScene({ scrollProgress = 0, className = '' }: ROVSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-[#0c1929] ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-cyan-400 font-mono">Initializing 3D Environment...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'linear-gradient(180deg, #0c1929 0%, #061018 100%)' }}
      >
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera makeDefault position={[8, 2, 8]} fov={50} />
          <CameraController scrollProgress={scrollProgress} />

          <UnderwaterLighting />
          <UnderwaterEnvironment />
          <ROVModel scrollProgress={scrollProgress} />

          {/* Subtle orbit controls for user interaction */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 4}
            rotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
