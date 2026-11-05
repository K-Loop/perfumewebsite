import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows, Sparkles, Environment } from '@react-three/drei';
import PerfumeBottle3D from './PerfumeBottle3D';

function ResponsiveCamera() {
  const { viewport } = useThree();
  const isPortrait = viewport.aspect < 1.0;
  // On portrait/phone screens, pull camera to z=10.2 so bottle never clips horizontally or vertically
  const cameraZ = isPortrait ? 10.2 : 8.6;
  return <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={33} />;
}

export default function PerfumeScene({
  liquidColor = "#311868",
  liquidEmissive = "#140733",
  fragranceName = "OCEAN BREEZE",
  bottlePosition = [0, 0.22, 0],
  bottleRotation = [0, 0, 0],
  bottleScale = 0.75,
  particleColor = "#c084fc",
  scrollProgress = 0,
  scrollVelocity = 0
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.75]}
        className="pointer-events-auto"
      >
        <ResponsiveCamera />

        {/* Ambient & Studio Luxury Lighting */}
        <ambientLight intensity={1.3} color="#f3e8ff" />

        {/* Key Light (Dramatic high-angle soft white) */}
        <directionalLight
          position={[4.5, 7.5, 4.0]}
          intensity={3.4}
          color="#ffffff"
          castShadow
        />

        {/* Warm Golden Rim Light (Left) */}
        <directionalLight
          position={[-5.5, 4.0, 2.5]}
          intensity={2.6}
          color="#fef08a"
        />

        {/* Deep Violet Edge Rim Light (Right Back) */}
        <directionalLight
          position={[0, 5.0, -4.5]}
          intensity={2.8}
          color="#c084fc"
        />

        {/* Bottom ground bounce */}
        <directionalLight
          position={[0, -3.5, 2.0]}
          intensity={1.2}
          color="#a855f7"
        />

        {/* Ethereal Floating Amethyst/Gold Particles */}
        <Sparkles
          count={28}
          scale={6.5}
          size={2.0}
          speed={0.25}
          opacity={0.4}
          color={particleColor}
        />

        <Suspense fallback={null}>
          <group
            position={bottlePosition}
            rotation={bottleRotation}
            scale={bottleScale}
          >
            <PerfumeBottle3D
              liquidColor={liquidColor}
              liquidEmissive={liquidEmissive}
              fragranceName={fragranceName}
              scrollProgress={scrollProgress}
              scrollVelocity={scrollVelocity}
              mousePos={mousePos}
            />

            {/* Soft contact shadow underneath bottle (frames=1 renders once on GPU for maximum mobile FPS) */}
            <ContactShadows
              position={[0, -1.35, 0]}
              opacity={0.7}
              scale={3.8}
              blur={2.0}
              far={2.5}
              color="#0d0317"
              frames={1}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
