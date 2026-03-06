"use client";

import { Canvas } from "@react-three/fiber";
import CameraController from "./CameraController";
import NeuralParticles from "./NeuralParticles";
import { MutableRefObject } from "react";

type Props = {
  cameraZRef: MutableRefObject<number>;
  cameraYRef: MutableRefObject<number>;
  cameraXRef: MutableRefObject<number>;
  objectDepthRef: MutableRefObject<number>;
};

export default function Scene({
  cameraZRef,
  cameraYRef,
  cameraXRef,
}: Props) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 7], fov: 28 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={0.35} />

      <spotLight
        position={[0, 6, 6]}
        angle={0.4}
        penumbra={1}
        intensity={3}
        castShadow
      />

      <pointLight position={[4, 4, 4]} intensity={2} color="#8B5CF6" />

      <pointLight position={[-4, 3, 4]} intensity={1.5} color="#06B6D4" />

      <CameraController
        cameraZRef={cameraZRef}
        cameraYRef={cameraYRef}
        cameraXRef={cameraXRef}
      />

      <NeuralParticles />
    </Canvas>
  );
}