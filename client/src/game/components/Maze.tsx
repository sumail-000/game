import { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useMazeGame } from "@/lib/stores/useMazeGame";

export default function Maze() {
  // Get maze data from the game state
  const { maze, mazeSize } = useMazeGame();

  // Create a merged geometry for all walls to improve performance
  const wallGeometries = useMemo(() => {
    // Helper to create a wall mesh
    const createWall = (startX: number, startZ: number, endX: number, endZ: number) => {
      // Calculate wall center position and dimensions
      const centerX = (startX + endX) / 2;
      const centerZ = (startZ + endZ) / 2;

      // Calculate wall dimensions
      const width = Math.abs(endX - startX) || 0.1; // Minimum width
      const depth = Math.abs(endZ - startZ) || 0.1; // Minimum depth

      // Create wall geometry
      const geometry = new THREE.BoxGeometry(width, 1, depth);

      // Position the geometry
      geometry.translate(centerX, 0.5, centerZ);

      return geometry;
    };

    // Arrays to store wall geometries by color
    const primaryWalls: THREE.BoxGeometry[] = [];
    const secondaryWalls: THREE.BoxGeometry[] = [];

    // Iterate through maze cells and create walls
    for (let z = 0; z < mazeSize.height; z++) {
      for (let x = 0; x < mazeSize.width; x++) {
        const cell = maze[z][x];
        const worldX = x * 2;
        const worldZ = z * 2;

        // Add walls based on cell walls property
        if (cell.walls.top) {
          const wallGeom = createWall(worldX, worldZ, worldX + 2, worldZ);
          ((z + x + (cell.walls.top ? 1 : 0)) % 2 === 0) ? primaryWalls.push(wallGeom) : secondaryWalls.push(wallGeom);
        }

        if (cell.walls.bottom) {
          const wallGeom = createWall(worldX, worldZ + 2, worldX + 2, worldZ + 2);
          ((z + x + (cell.walls.bottom ? 0 : 1)) % 2 === 0) ? primaryWalls.push(wallGeom) : secondaryWalls.push(wallGeom);
        }

        if (cell.walls.left) {
          const wallGeom = createWall(worldX, worldZ, worldX, worldZ + 2);
          ((z + x + (cell.walls.left ? 1 : 0)) % 2 === 0) ? primaryWalls.push(wallGeom) : secondaryWalls.push(wallGeom);
        }

        if (cell.walls.right) {
          const wallGeom = createWall(worldX + 2, worldZ, worldX + 2, worldZ + 2);
          ((z + x + (cell.walls.right ? 0 : 1)) % 2 === 0) ? primaryWalls.push(wallGeom) : secondaryWalls.push(wallGeom);
        }
      }
    }

    // Merge geometries for better performance
    const mergedPrimaryGeometry = primaryWalls.length > 0 
      ? mergeGeometries(primaryWalls) 
      : new THREE.BoxGeometry(0, 0, 0);

    const mergedSecondaryGeometry = secondaryWalls.length > 0 
      ? mergeGeometries(secondaryWalls) 
      : new THREE.BoxGeometry(0, 0, 0);

    return {
      primary: mergedPrimaryGeometry,
      secondary: mergedSecondaryGeometry,
    };
  }, [maze, mazeSize]);

  return (
    <group name="maze">
      {/* Primary colored walls */}
      <mesh 
        geometry={wallGeometries.primary} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          color="#ff00ff" 
          emissive="#ff00ff"
          emissiveIntensity={0.3}
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>

      {/* Secondary colored walls */}
      <mesh 
        geometry={wallGeometries.secondary} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.3}
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>

      {/* Outer boundary walls */}
      <group>
        {/* Top boundary */}
        <mesh 
          position={[mazeSize.width, 0.5, 0]} 
          scale={[mazeSize.width * 2, 1, 0.2]}
          castShadow
        >
          <boxGeometry />
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff"
            emissiveIntensity={0.3}
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>

        {/* Bottom boundary */}
        <mesh 
          position={[mazeSize.width, 0.5, mazeSize.height * 2]} 
          scale={[mazeSize.width * 2, 1, 0.2]}
          castShadow
        >
          <boxGeometry />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff"
            emissiveIntensity={0.3}
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>

        {/* Left boundary */}
        <mesh 
          position={[0, 0.5, mazeSize.height]} 
          scale={[0.2, 1, mazeSize.height * 2]}
          castShadow
        >
          <boxGeometry />
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff"
            emissiveIntensity={0.3}
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>

        {/* Right boundary */}
        <mesh 
          position={[mazeSize.width * 2, 0.5, mazeSize.height]} 
          scale={[0.2, 1, mazeSize.height * 2]}
          castShadow
        >
          <boxGeometry />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff"
            emissiveIntensity={0.3}
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>
      </group>

      <mesh 
        position={[mazeSize.width, 0.5, 0]} 
        scale={[mazeSize.width * 2, 1, 0.1]}
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh 
        position={[0, 0.5, mazeSize.height]} 
        scale={[0.1, 1, mazeSize.height * 2]}
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh 
        position={[mazeSize.width * 2, 0.5, mazeSize.height]} 
        scale={[0.1, 1, mazeSize.height * 2]}
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial 
          color="#ff00ff" 
          emissive="#ff00ff"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}