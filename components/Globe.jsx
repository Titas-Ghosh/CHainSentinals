"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

function Earth({ scale }) {
  const [isDragging, setIsDragging] = useState(false);
  const texture = useTexture("/earth.jpg");
  const globeRef = useRef();

  useFrame(() => {
    if (!isDragging) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh
      ref={globeRef}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerOut={() => setIsDragging(false)}
      scale={scale}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
      <Shield globeRef={globeRef} />
    </mesh>
  );
}

function Shield({ globeRef }) {
  const shieldRef = useRef();
  const texture = useTexture("/shield.jpg");

  useFrame(({ camera }) => {
    if (globeRef.current && shieldRef.current) {
      const time = performance.now() * 0.001;
      const radius = 1.5; 
      const x = Math.cos(time) * radius;
      const z = Math.sin(time) * radius;
      
      shieldRef.current.position.set(x, 0, z); 
      shieldRef.current.lookAt(camera.position); 
    }
  });

  return (
    <mesh ref={shieldRef} scale={[1,1,1]}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

export default function Globe() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const scale = isMobile ? [0.8, 0.8, 0.8] : [1.5, 1.5, 1.5];

  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 1]} />
        <Earth scale={scale} />
      </Canvas>
    </div>
  );
}