'use client';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function Chip() {
  const chipRef = useRef();

  // Rotate the chip continuously
  useFrame(() => {
    chipRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={chipRef} position={[2, 1, 0]}>
      {/* Chip Base */}
      <mesh>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#00FFFF" />
      </mesh>

      {/* Text Label */}
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Smart Contract
      </Text>
    </group>
  );
}
