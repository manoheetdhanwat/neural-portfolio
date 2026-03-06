"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import * as THREE from "three";

type Props = {
  cameraZRef: MutableRefObject<number>;
  cameraYRef: MutableRefObject<number>;
  cameraXRef: MutableRefObject<number>;
};

export default function CameraController({
  cameraZRef,
  cameraYRef,
  cameraXRef,
}: Props) {
  const { camera } = useThree();

  const smoothZ = useRef(camera.position.z);
  const smoothY = useRef(camera.position.y);
  const smoothX = useRef(camera.position.x);

  useFrame(() => {
    smoothZ.current = THREE.MathUtils.lerp(
      smoothZ.current,
      cameraZRef.current,
      0.08
    );


    smoothX.current = THREE.MathUtils.lerp(
      smoothX.current,
      cameraXRef.current,
      0.08
    );

    camera.position.z = smoothZ.current;
    camera.position.y = smoothY.current;
    camera.position.x = smoothX.current;
  });

  return null;
}