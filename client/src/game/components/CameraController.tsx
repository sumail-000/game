import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMazeGame } from "@/lib/stores/useMazeGame";

export default function CameraController() {
  const { camera } = useThree();
  const { playerPosition, gameState } = useMazeGame();
  
  // Reference to track the current camera target
  const cameraTargetRef = useRef(new THREE.Vector3(playerPosition.x, 4, playerPosition.z + 2.5));
  
  // Smooth camera following
  const { cameraSettings } = useMazeGame();
  
  useFrame(() => {
    if (gameState !== "playing") return;

    // Calculate the target position for the camera
    const targetPosition = new THREE.Vector3(
      playerPosition.x,
      cameraSettings.height,
      playerPosition.z + cameraSettings.distance
    );
    
    // Smoothly interpolate the camera target position
    cameraTargetRef.current.lerp(targetPosition, 0.08);
    
    // Set camera position
    camera.position.copy(cameraTargetRef.current);
    
    // Make camera look at the player
    camera.lookAt(new THREE.Vector3(playerPosition.x, 0.5, playerPosition.z));
  });

  return null;
}