import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Lighting() {
  // References for animated lights
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  
  // Animate the lights
  useFrame((state) => {
    if (ambientRef.current) {
      // Subtly pulse the ambient light intensity
      const intensity = 0.3 + 0.05 * Math.sin(state.clock.elapsedTime * 0.5);
      ambientRef.current.intensity = intensity;
    }
    
    if (spotLightRef.current) {
      // Move the spotlight in a circle
      const angle = state.clock.elapsedTime * 0.1;
      const radius = 15;
      spotLightRef.current.position.x = Math.cos(angle) * radius;
      spotLightRef.current.position.z = Math.sin(angle) * radius;
    }
  });

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight ref={ambientRef} color="#ffffff" intensity={0.3} />
      
      {/* Directional light for shadows */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Spotlight that moves around the scene */}
      <spotLight
        ref={spotLightRef}
        position={[15, 15, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.001}
      />
      
      {/* Primary color light */}
      <pointLight
        position={[10, 5, 10]}
        color="#ff00ff"
        intensity={1}
        distance={20}
        decay={2}
      />
      
      {/* Secondary color light */}
      <pointLight
        position={[-10, 5, -10]}
        color="#00ffff"
        intensity={1}
        distance={20}
        decay={2}
      />
    </>
  );
}
