import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useMazeGame } from "@/lib/stores/useMazeGame";
import { useAudio } from "@/lib/stores/useAudio";

// Import game components
import Player from "./components/Player";
import Maze from "./components/Maze";
import Portal from "./components/Portal";
import Floor from "./components/Floor";
import Lighting from "./components/Lighting";
import CameraController from "./components/CameraController";

// Import UI components
import TitleScreen from "@/components/ui/title-screen";
import WinScreen from "@/components/ui/win-screen";
import GameUI from "@/components/ui/game-ui";

// Define control keys for the game
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
];

function MazeGame() {
  const { gameState, startGame, resetGame, currentLevel, maxLevel, nextLevel } = useMazeGame();
  const [showCanvas, setShowCanvas] = useState(false);
  const { playSuccess } = useAudio();

  // Show the canvas once everything is loaded
  useEffect(() => {
    setShowCanvas(true);
  }, []);

  // Play success sound when game is completed
  useEffect(() => {
    if (gameState === "completed") {
      playSuccess();
    }
  }, [gameState, playSuccess]);

  // Handle game restart
  const handleRestart = () => {
    resetGame();
    startGame();
  };

  const handleStartGame = () => {
    startGame();
  };

  const handleNextLevel = () => {
    nextLevel();
    startGame();
  };

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 64px)', position: 'relative', overflow: 'hidden', paddingTop: '64px' }}>
      <div style={{ 
        width: '75%', 
        height: '70%', 
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        border: '2px solid #333', 
        borderRadius: '8px', 
        overflow: 'hidden' 
      }}>
      {showCanvas && (
        <KeyboardControls map={controls}>
          <Canvas
            shadows
            camera={{
              position: [0, 8, 5],
              fov: 60,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: true,
              powerPreference: "default"
            }}
          >
            <color attach="background" args={["#000000"]} />

            {/* Lighting */}
            <Lighting />

            <Suspense fallback={null}>
              {/* Game world */}
              <Floor />
              <Maze />
              <Portal />
              <Player />

              {/* Camera that follows the player */}
              <CameraController />
            </Suspense>

            {/* Debug controls - only enable during development */}
            {/* <OrbitControls /> */}
          </Canvas>

          {/* UI Overlays */}
          {gameState === "title" && <TitleScreen onStart={handleStartGame} />}
          {gameState === "completed" && (
            <WinScreen 
              onRestart={handleRestart}
              onNextLevel={handleNextLevel}
              currentLevel={currentLevel}
              maxLevel={maxLevel}
            />
          )}
        </KeyboardControls>
      )}
      </div>
      {gameState === "playing" && <GameUI level={currentLevel} />}
    </div>
  );
}

export default MazeGame;