import { RepeatWrapping, TextureLoader } from "three";
import { useTexture } from "@react-three/drei";
import { useMazeGame } from "@/lib/stores/useMazeGame";

export default function Floor() {
  // Get maze size from game state
  const { mazeSize } = useMazeGame();
  
  // Calculate floor dimensions based on maze size
  const floorWidth = mazeSize.width * 2 + 2; // Add margin
  const floorDepth = mazeSize.height * 2 + 2; // Add margin
  
  // Load floor texture
  const floorTexture = useTexture("/textures/asphalt.png");
  
  // Configure texture to repeat
  floorTexture.wrapS = floorTexture.wrapT = RepeatWrapping;
  floorTexture.repeat.set(floorWidth / 2, floorDepth / 2);
  
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[floorWidth / 2 - 1, 0, floorDepth / 2 - 1]} 
      receiveShadow
    >
      <planeGeometry args={[floorWidth, floorDepth]} />
      <meshStandardMaterial 
        map={floorTexture}
        color="#333333"
        roughness={0.8}
        metalness={0.2}
        emissive="#000011"
        emissiveIntensity={0.1}
      />
      
      {/* Grid lines overlay */}
      <mesh position={[0, 0.01, 0]}>
        <planeGeometry args={[floorWidth, floorDepth]} />
        <meshBasicMaterial 
          color="#000000" 
          wireframe 
          transparent 
          opacity={0.2} 
        />
      </mesh>
    </mesh>
  );
}
