import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function PerfumeBottle3D({ 
  liquidColor = "#0a6c3f",
  liquidEmissive = "#03331c",
  scrollProgress = 0,
  scrollVelocity = 0,
  mousePos = { x: 0, y: 0 }
}) {
  const bottleGroup = useRef();
  const liquidMaterialRef = useRef();
  const liquidMeshRef = useRef();

  // Crisp FIORST label texture with gold hairline frame
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 1024, 1024);

    // Subtle dark luxury backing badge on the bottle
    ctx.fillStyle = 'rgba(6, 14, 10, 0.75)';
    ctx.roundRect(220, 310, 584, 400, 16);
    ctx.fill();

    // Polished gold border
    ctx.strokeStyle = 'rgba(218, 185, 95, 0.95)';
    ctx.lineWidth = 4;
    ctx.strokeRect(230, 320, 564, 380);

    // Inner gold hairline
    ctx.strokeStyle = 'rgba(218, 185, 95, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(244, 334, 536, 352);

    // "FIORST" brandmark
    ctx.fillStyle = '#faf6eb';
    ctx.font = '700 86px "Cinzel", "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '18px';
    ctx.fillText('FIORST', 512, 460);

    // Subtitle
    ctx.fillStyle = '#d4af37';
    ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '12px';
    ctx.fillText('EAU DE PARFUM', 512, 535);

    // Volume & Origin
    ctx.fillStyle = 'rgba(240, 235, 220, 0.8)';
    ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '7px';
    ctx.fillText('100 ML — PARIS', 512, 600);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Frame animation: smooth idle breathing and gentle mouse tilt
  useFrame((state, delta) => {
    if (!bottleGroup.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Smooth idle float
    const idleY = Math.sin(time * 0.9) * 0.025;
    const idleRotY = Math.sin(time * 0.6) * 0.035;
    const idleRotX = Math.cos(time * 0.7) * 0.015;

    // Mouse parallax
    const targetRotX = (mousePos.y * 0.16) + idleRotX;
    const targetRotY = (mousePos.x * 0.20) + idleRotY;

    bottleGroup.current.rotation.x = THREE.MathUtils.lerp(bottleGroup.current.rotation.x, targetRotX, delta * 2.5);
    bottleGroup.current.rotation.y = THREE.MathUtils.lerp(bottleGroup.current.rotation.y, targetRotY, delta * 2.5);
    bottleGroup.current.position.y = THREE.MathUtils.lerp(bottleGroup.current.position.y, idleY, delta * 2.5);

    // Subtle liquid level breathing with scroll
    if (liquidMeshRef.current) {
      const targetScaleY = THREE.MathUtils.clamp(1.0 - (scrollProgress * 0.12), 0.88, 1.0);
      liquidMeshRef.current.scale.y = THREE.MathUtils.lerp(liquidMeshRef.current.scale.y, targetScaleY, delta * 2.0);
    }

    // Dynamic liquid color transition
    if (liquidMaterialRef.current) {
      const targetColor = new THREE.Color(liquidColor);
      liquidMaterialRef.current.color.lerp(targetColor, delta * 3.5);
      
      const targetEmissive = new THREE.Color(liquidEmissive);
      liquidMaterialRef.current.emissive.lerp(targetEmissive, delta * 3.5);
    }
  });

  return (
    <group ref={bottleGroup} dispose={null}>
      <group position={[0, -0.15, 0]}>
        
        {/* ======================================================== */}
        {/* 1. VISIBLE FOREST-GREEN LIQUID (Rendered FIRST inside glass) */}
        {/* ======================================================== */}
        <group position={[0, -0.10, 0]}>
          <RoundedBox 
            ref={liquidMeshRef}
            args={[1.74, 1.95, 0.78]} 
            radius={0.08} 
            smoothness={4} 
            position={[0, 0, 0]}
            renderOrder={1}
          >
            <meshStandardMaterial
              ref={liquidMaterialRef}
              color={liquidColor}
              emissive={liquidEmissive}
              emissiveIntensity={0.65}
              roughness={0.08}
              metalness={0.12}
              transparent={true}
              opacity={0.92}
              depthWrite={true}
            />
          </RoundedBox>

          {/* Meniscus surface highlight on top of green liquid */}
          <mesh position={[0, 0.98, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
            <planeGeometry args={[1.70, 0.74]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#059669"
              emissiveIntensity={0.5}
              roughness={0.05}
              metalness={0.2}
            />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 2. TRANSLUCENT INTERNAL DIP TUBE                        */}
        {/* ======================================================== */}
        <mesh position={[0, -0.05, 0]} renderOrder={3}>
          <cylinderGeometry args={[0.018, 0.018, 2.2, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.55}
            roughness={0.1}
          />
        </mesh>

        {/* ======================================================== */}
        {/* 3. SOLID HEAVY CRYSTAL BASE (Paraison at bottom)        */}
        {/* ======================================================== */}
        <mesh position={[0, -1.18, 0]} renderOrder={4}>
          <boxGeometry args={[1.98, 0.26, 0.98]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.35}
            roughness={0.0}
            reflectivity={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.0}
            depthWrite={false}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* ======================================================== */}
        {/* 4. CRYSTAL-CLEAR OUTER GLASS FLASK (DepthWrite: FALSE)  */}
        {/* Ensures the green liquid inside is 100% visible!         */}
        {/* ======================================================== */}
        <RoundedBox 
          args={[2.0, 2.5, 1.02]} 
          radius={0.16} 
          smoothness={6} 
          position={[0, 0, 0]}
          renderOrder={5}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.22}
            roughness={0.0}
            metalness={0.05}
            reflectivity={1.0}
            clearcoat={1.0}
            clearcoatRoughness={0.0}
            depthWrite={false}
            envMapIntensity={3.0}
          />
        </RoundedBox>

        {/* Subtle glass edge highlight accent */}
        <RoundedBox 
          args={[2.02, 2.52, 1.04]} 
          radius={0.17} 
          smoothness={5} 
          position={[0, 0, 0]}
          renderOrder={6}
        >
          <meshStandardMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.12}
            roughness={0.0}
            depthWrite={false}
          />
        </RoundedBox>

        {/* ======================================================== */}
        {/* 5. FIORST FOIL BRANDING LABEL (On front face of glass)   */}
        {/* ======================================================== */}
        <mesh position={[0, -0.02, 0.525]} renderOrder={7}>
          <planeGeometry args={[1.4, 1.4]} />
          <meshBasicMaterial
            map={labelTexture}
            transparent={true}
            opacity={0.98}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* ======================================================== */}
        {/* 6. GLASS SHOULDER & ATOMIZER NECK                       */}
        {/* ======================================================== */}
        <mesh position={[0, 1.30, 0]} renderOrder={8}>
          <cylinderGeometry args={[0.42, 0.46, 0.14, 48]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.35}
            roughness={0.0}
            clearcoat={1.0}
            depthWrite={false}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Polished Gold Atomizer Collar */}
        <mesh position={[0, 1.44, 0]} renderOrder={9}>
          <cylinderGeometry args={[0.41, 0.43, 0.22, 64]} />
          <meshStandardMaterial
            color="#e5c158"
            metalness={0.96}
            roughness={0.14}
            envMapIntensity={3.0}
          />
        </mesh>

        {/* Inner gold spray nozzle rim */}
        <mesh position={[0, 1.56, 0]} renderOrder={9}>
          <cylinderGeometry args={[0.26, 0.28, 0.16, 48]} />
          <meshStandardMaterial
            color="#f3d872"
            metalness={0.98}
            roughness={0.12}
          />
        </mesh>

        {/* ======================================================== */}
        {/* 7. LUXURY OBSIDIAN BLACK CAP (Seated on collar)         */}
        {/* ======================================================== */}
        <mesh position={[0, 2.06, 0]} renderOrder={10}>
          <cylinderGeometry args={[0.48, 0.48, 1.02, 64]} />
          <meshStandardMaterial
            color="#08080a"
            metalness={0.45}
            roughness={0.12}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Gold accent band at bottom of cap */}
        <mesh position={[0, 1.56, 0]} renderOrder={11}>
          <cylinderGeometry args={[0.485, 0.485, 0.05, 64]} />
          <meshStandardMaterial
            color="#e5c158"
            metalness={0.96}
            roughness={0.14}
          />
        </mesh>

        {/* Top gold medallion inset on top of cap */}
        <mesh position={[0, 2.572, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={11}>
          <circleGeometry args={[0.38, 48]} />
          <meshStandardMaterial
            color="#e5c158"
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>
      </group>
    </group>
  );
}
