"use client"

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { Mesh } from "three";

const FloatingText = () => {
  const textRef = useRef<Mesh>(null); // Inicializar con null

  // Animación de flotación
  useFrame((state) => {
    if (textRef.current) {  // Verificar si textRef.current está definido
      const time = state.clock.getElapsedTime();
      textRef.current.position.y = Math.sin(time) * 0.5; // Efecto de flotación
    }
  });

  return (
    <Text3D
      ref={textRef}
      font="/fonts/helvetiker_regular.typeface.json" // Ruta correcta al archivo JSON
      size={3}
      height={0.5}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.1}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
      position={[-6, 0, 0]}
    >
      SIGMA
      <meshStandardMaterial color="black" />
    </Text3D>
  );
};


const Object3D = () => {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <FloatingText />
        </Canvas>
    )
}

//@ts-ignore
export default Object3D