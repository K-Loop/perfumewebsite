import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function PerfumeBottle3D({ 
  liquidColor = "#311868",
  liquidEmissive = "#140733",
  fragranceName = "OCEAN BREEZE",
  scrollProgress = 0,
  scrollVelocity = 0,
  mousePos = { x: 0, y: 0 }
}) {
  const bottleGroup = useRef();
  const liquidMaterialRef = useRef();
  const liquidMeshRef = useRef();
  const glassMaterialRef = useRef();

  // Signature LX LUXARA gold plaque label texture
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 1024, 1024);

    // Deep royal purple-black backing plate
    ctx.fillStyle = 'rgba(20, 8, 38, 0.92)';
    ctx.roundRect(230, 270, 564, 480, 20);
    ctx.fill();

    // Outer polished gold border
    ctx.strokeStyle = 'rgba(234, 196, 92, 0.95)';
    ctx.lineWidth = 4;
    ctx.strokeRect(240, 280, 544, 460);

    // Inner gold hairline frame
    ctx.strokeStyle = 'rgba(234, 196, 92, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(252, 292, 520, 436);

    // LX Monogram
    ctx.fillStyle = '#f6d87c';
    ctx.font = '700 88px "Cinzel", "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '12px';
    ctx.fillText('LX', 512, 385);

    // Star sparkle next to LX
    ctx.font = '32px sans-serif';
    ctx.fillText('✦', 580, 355);

    // Brand Name: LUXARA
    ctx.fillStyle = '#f8f4e6';
    ctx.font = '700 46px "Cinzel", "Times New Roman", serif';
    ctx.letterSpacing = '16px';
    ctx.fillText('LUXARA', 512, 465);

    // Inset golden banner for Fragrance Name
    ctx.fillStyle = 'rgba(234, 196, 92, 0.22)';
    ctx.roundRect(290, 520, 444, 75, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(234, 196, 92, 0.8)';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(290, 520, 444, 75);

    ctx.fillStyle = '#fff4d6';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('PARFUM COLLECTION', 512, 558);

    // Concentration & Volume
    ctx.fillStyle = '#e8d28a';
    ctx.font = '500 19px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('EXTRAIT DE PARFUM', 512, 640);

    ctx.fillStyle = 'rgba(240, 230, 210, 0.75)';
    ctx.font = '400 17px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('50 ML | 1.69 FL.OZ', 512, 680);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Frame animation: frame-rate-independent 60/120/144Hz butter-smooth damping
  useFrame((state, delta) => {
    if (!bottleGroup.current) return;
    
    // Clamp delta to prevent huge jumps on tab switch or momentary hitch
    const safeDelta = Math.min(delta, 0.05);
    const time = state.clock.getElapsedTime();
    
    // Smooth idle float
    const idleY = Math.sin(time * 0.9) * 0.02;
    const idleRotY = Math.sin(time * 0.6) * 0.03;
    const idleRotX = Math.cos(time * 0.7) * 0.015;

    // Gentle mouse parallax
    const targetRotX = (mousePos.y * 0.14) + idleRotX;
    const targetRotY = (mousePos.x * 0.18) + idleRotY;

    // MathUtils.damp provides true refresh-rate-independent smooth interpolation
    bottleGroup.current.rotation.x = THREE.MathUtils.damp(bottleGroup.current.rotation.x, targetRotX, 4.5, safeDelta);
    bottleGroup.current.rotation.y = THREE.MathUtils.damp(bottleGroup.current.rotation.y, targetRotY, 4.5, safeDelta);
    bottleGroup.current.position.y = THREE.MathUtils.damp(bottleGroup.current.position.y, idleY, 4.5, safeDelta);

    // Fluid level reaction with scroll
    if (liquidMeshRef.current) {
      const targetScaleY = THREE.MathUtils.clamp(1.0 - (scrollProgress * 0.1), 0.9, 1.0);
      liquidMeshRef.current.scale.y = THREE.MathUtils.damp(liquidMeshRef.current.scale.y, targetScaleY, 3.5, safeDelta);
    }

    // Dynamic color transition matching each Luxara fragrance
    if (liquidMaterialRef.current) {
      const targetColor = new THREE.Color(liquidColor);
      liquidMaterialRef.current.color.lerp(targetColor, Math.min(1, safeDelta * 4.0));
      
      const targetEmissive = new THREE.Color(liquidEmissive);
      liquidMaterialRef.current.emissive.lerp(targetEmissive, Math.min(1, safeDelta * 4.0));
    }

    if (glassMaterialRef.current) {
      const targetColor = new THREE.Color(liquidColor).multiplyScalar(0.7);
      glassMaterialRef.current.color.lerp(targetColor, Math.min(1, safeDelta * 4.0));
    }
  });

  return (
    <group ref={bottleGroup} dispose={null}>
      <group position={[0, -0.15, 0]}>
        
        {/* ======================================================== */}
        {/* 1. VISIBLE ROYAL AMETHYST/VIOLET PERFUME LIQUID          */}
        {/* ======================================================== */}
        <group position={[0, -0.08, 0]}>
          <RoundedBox 
            ref={liquidMeshRef}
            args={[1.72, 1.95, 0.78]} 
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

          {/* Meniscus surface highlight on top of liquid */}
          <mesh position={[0, 0.98, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
            <planeGeometry args={[1.68, 0.74]} />
            <meshStandardMaterial
              color="#c084fc"
              emissive="#7e22ce"
              emissiveIntensity={0.5}
              roughness={0.05}
              metalness={0.2}
            />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 2. SOLID CRYSTAL BASE (Heavy luxury paraison at bottom)  */}
        {/* ======================================================== */}
        <mesh position={[0, -1.16, 0]} renderOrder={3}>
          <boxGeometry args={[1.98, 0.26, 0.98]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.4}
            roughness={0.0}
            reflectivity={0.95}
            clearcoat={1.0}
            clearcoatRoughness={0.0}
            depthWrite={false}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* ======================================================== */}
        {/* 3. ROYAL PURPLE GLASS FLASK (With specular refraction)    */}
        {/* ======================================================== */}
        <RoundedBox 
          args={[2.0, 2.45, 1.02]} 
          radius={0.16} 
          smoothness={6} 
          position={[0, 0, 0]}
          renderOrder={4}
        >
          <meshPhysicalMaterial
            ref={glassMaterialRef}
            color="#2a0d45"
            transparent={true}
            opacity={0.32}
            roughness={0.01}
            metalness={0.08}
            reflectivity={1.0}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            depthWrite={false}
            envMapIntensity={3.2}
          />
        </RoundedBox>

        {/* Outer glass highlight rim */}
        <RoundedBox 
          args={[2.02, 2.47, 1.04]} 
          radius={0.17} 
          smoothness={5} 
          position={[0, 0, 0]}
          renderOrder={5}
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
        {/* 4. LX LUXARA GOLD PLAQUE LABEL (On front face)           */}
        {/* ======================================================== */}
        <mesh position={[0, 0.02, 0.525]} renderOrder={6}>
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
        {/* 5. POLISHED GOLD ATOMIZER COLLAR                        */}
        {/* ======================================================== */}
        {/* Lower gold collar */}
        <mesh position={[0, 1.28, 0]} renderOrder={7}>
          <cylinderGeometry args={[0.42, 0.44, 0.16, 64]} />
          <meshStandardMaterial
            color="#e5c158"
            metalness={0.96}
            roughness={0.14}
            envMapIntensity={3.2}
          />
        </mesh>

        {/* Upper stepped gold collar ring */}
        <mesh position={[0, 1.40, 0]} renderOrder={8}>
          <cylinderGeometry args={[0.36, 0.38, 0.12, 64]} />
          <meshStandardMaterial
            color="#f3d872"
            metalness={0.98}
            roughness={0.12}
            envMapIntensity={3.5}
          />
        </mesh>

        {/* ======================================================== */}
        {/* 6. SIGNATURE LUXARA SQUARE CRYSTAL CLEAR CAP             */}
        {/* Clear beveled crystal cube with inner black core         */}
        {/* ======================================================== */}
        {/* Inner black cylinder core */}
        <mesh position={[0, 1.94, 0]} renderOrder={9}>
          <cylinderGeometry args={[0.34, 0.34, 0.92, 48]} />
          <meshStandardMaterial
            color="#09090b"
            metalness={0.4}
            roughness={0.1}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Outer transparent square crystal cap */}
        <RoundedBox 
          args={[0.88, 0.98, 0.88]} 
          radius={0.12} 
          smoothness={5} 
          position={[0, 1.94, 0]}
          renderOrder={10}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.95}
            transparent={true}
            opacity={0.3}
            roughness={0.01}
            ior={1.52}
            thickness={1.5}
            clearcoat={1.0}
            clearcoatRoughness={0.01}
            envMapIntensity={3.5}
            depthWrite={false}
          />
        </RoundedBox>

        {/* Gold trim band at base of cap */}
        <mesh position={[0, 1.48, 0]} renderOrder={11}>
          <boxGeometry args={[0.90, 0.05, 0.90]} />
          <meshStandardMaterial
            color="#e5c158"
            metalness={0.96}
            roughness={0.14}
          />
        </mesh>
      </group>
    </group>
  );
}
