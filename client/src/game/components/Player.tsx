import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useMazeGame } from "@/lib/stores/useMazeGame";
import { useAudio } from "@/lib/stores/useAudio";

export default function Player() {
  // Reference to the player mesh
  const playerRef = useRef<THREE.Mesh>(null);
  
  // Get game state and functions
  const { playerPosition, playerRotation, movePlayer, gameState } = useMazeGame();
  
  // Get audio functions
  const { playHit } = useAudio();
  
  // Get keyboard controls
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  
  // Last collision state for sound effects
  const lastCollisionRef = useRef<string | null>(null);
  
  // Handle keyboard input and update player position
  useFrame((state, delta) => {
    // Only process movement when game is in playing state
    if (gameState !== "playing") return;
    
    // Movement based on key presses
    if (forward) {
      movePlayer("up");
    } else if (backward) {
      movePlayer("down");
    } else if (leftward) {
      movePlayer("left");
    } else if (rightward) {
      movePlayer("right");
    }
    
    // Play hit sound on collision
    const { lastCollision } = useMazeGame.getState();
    if (lastCollision && lastCollision !== lastCollisionRef.current) {
      playHit();
      lastCollisionRef.current = lastCollision;
    } else if (!lastCollision) {
      lastCollisionRef.current = null;
    }
  });
  
  // Interpolate player position and rotation for smooth movement
  useFrame(() => {
    if (!playerRef.current) return;
    
    // Smoothly interpolate position
    playerRef.current.position.x = THREE.MathUtils.lerp(
      playerRef.current.position.x,
      playerPosition.x,
      0.1
    );
    
    playerRef.current.position.z = THREE.MathUtils.lerp(
      playerRef.current.position.z,
      playerPosition.z,
      0.1
    );
    
    // Smoothly interpolate rotation
    playerRef.current.rotation.y = THREE.MathUtils.lerp(
      playerRef.current.rotation.y,
      playerRotation,
      0.1
    );
  });
  
  return (
    <group>
      {/* Player mesh */}
      <mesh 
        ref={playerRef} 
        position={[playerPosition.x, 0.5, playerPosition.z]}
        castShadow
      >
        {/* Player body */}
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial 
          color="#ff00ff" 
          emissive="#ff00ff"
          emissiveIntensity={0.5}
        />
        
        {/* Player point light */}
        <pointLight
          color="#ff00ff"
          intensity={5}
          distance={3}
          decay={2}
          position={[0, 0.5, 0]}
        />
      </mesh>
    </group>
  );
}
