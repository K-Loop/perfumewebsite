import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows, Sparkles, Environment } from '@react-three/drei';
import PerfumeBottle3D from './PerfumeBottle3D';

export default function PerfumeScene({
  liquidColor = "#05472A",
  liquidEmissive = "#022B18",
  bottlePosition = [0, 0.25, 0],
  bottleRotation = [0, 0, 0],
  bottleScale = 0.72,
  particleColor = "#22c55e",
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
        dpr={[1, 2]}
        className="pointer-events-auto"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8.6]} fov={33} />

        {/* Realistic Forest Environment Reflection Map */}
        <Suspense fallback={null}>
          <Environment files="/images/forest/bg-forest.jpg" />
        </Suspense>

        {/* Ambient & Studio Forest Lighting */}
        <ambientLight intensity={1.2} color="#e6f5eb" />
        
        {/* Sunlight Filtering Through Forest Trees (Key Light) */}
        <directionalLight 
          position={[4.5, 7.5, 4.0]} 
          intensity={3.2} 
          color="#fffbeb" 
          castShadow 
        />
        
        {/* Warm Golden Dawn Rim Light (Left) */}
        <directionalLight 
          position={[-5.5, 4.0, 2.5]} 
          intensity={2.2} 
          color="#fef08a" 
        />

        {/* Cool Forest Mist Rim Light (Edge Separation) */}
        <directionalLight 
          position={[0, 5.0, -4.5]} 
          intensity={2.6} 
          color="#a7f3d0" 
        />

        {/* Ground Pond Water Reflection (Upward bounce) */}
        <directionalLight 
          position={[0, -3.5, 2.0]} 
          intensity={1.0} 
          color="#34d399" 
        />

        {/* Ethereal Floating Forest Particles / Pollen Motes */}
        <Sparkles 
          count={35}
          scale={6.5}
          size={2.2}
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
              scrollProgress={scrollProgress}
              scrollVelocity={scrollVelocity}
              mousePos={mousePos}
            />

            {/* Natural soft contact shadow underneath bottle */}
            <ContactShadows 
              position={[0, -1.35, 0]} 
              opacity={0.7} 
              scale={3.8} 
              blur={2.0} 
              far={2.5} 
              color="#02140a"
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
