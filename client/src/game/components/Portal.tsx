import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMazeGame } from "@/lib/stores/useMazeGame";

export default function Portal() {
  // Get portal position from game state
  const { portalPosition } = useMazeGame();
  
  // References for animation
  const portalRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const particleRef = useRef<THREE.Points>(null);
  
  // Animate the portal
  useFrame((state, delta) => {
    if (portalRef.current) {
      // Rotate the portal
      portalRef.current.rotation.y += delta * 0.5;
    }
    
    if (ringRef.current) {
      // Pulse the ring scale
      const pulse = 0.1 * Math.sin(state.clock.elapsedTime * 2) + 1;
      ringRef.current.scale.set(pulse, pulse, pulse);
    }
    
    if (glowRef.current) {
      // Pulse the light intensity
      const intensity = 3 + 2 * Math.sin(state.clock.elapsedTime * 3);
      glowRef.current.intensity = intensity;
    }
    
    if (particleRef.current && particleRef.current.material instanceof THREE.PointsMaterial) {
      // Move and reset particles
      const positions = particleRef.current.geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        
        // Move particles upward
        positions.setY(i, y + delta * 0.8);
        
        // Reset particles that move too far up
        if (y > 3) {
          positions.setY(i, -3 * Math.random());
        }
      }
      
      positions.needsUpdate = true;
    }
  });
  
  // Create portal particles
  const particleCount = 100;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.7;
      
      positions[i * 3] = Math.cos(theta) * radius; // x
      positions[i * 3 + 1] = -3 * Math.random(); // y (start below)
      positions[i * 3 + 2] = Math.sin(theta) * radius; // z
    }
    
    return positions;
  }, []);
  
  return (
    <group
      position={[portalPosition.x, 0, portalPosition.z]}
      ref={portalRef}
    >
      {/* Base ring */}
      <mesh 
        ref={ringRef}
        position={[0, 0.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.8, 0.1, 16, 32]} />
        <meshStandardMaterial 
          color="#00ff99" 
          emissive="#00ff99"
          emissiveIntensity={2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Inner disc */}
      <mesh
        position={[0, 0.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Glow */}
      <pointLight
        ref={glowRef}
        position={[0, 0.5, 0]}
        color="#00ff99"
        intensity={5}
        distance={8}
        decay={2}
      />
      
      {/* Particles */}
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ff99"
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
