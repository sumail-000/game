import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MazeGame from "@/game/MazeGame";
import { useMazeGame } from "@/lib/stores/useMazeGame";
import { useAudio } from "@/lib/stores/useAudio";

export default function GamePage() {
  const { gameState, resetGame } = useMazeGame();
  const { toggleMute, isMuted } = useAudio();
  const [showInstructions, setShowInstructions] = useState(true);

  // Reset game state when component mounts
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleSoundToggle = () => {
    toggleMute();
    
    // Control background music
    const { backgroundMusic } = useAudio.getState();
    if (backgroundMusic) {
      if (isMuted) {
        // We're toggling to unmuted
        backgroundMusic.play().catch(error => {
          console.log("Background music play prevented:", error);
        });
      } else {
        // We're toggling to muted
        backgroundMusic.pause();
      }
    }
  };

  const startGame = () => {
    setShowInstructions(false);
    
    // Start background music if not muted
    const { backgroundMusic, isMuted } = useAudio.getState();
    if (backgroundMusic && !isMuted) {
      backgroundMusic.play().catch(error => {
        console.log("Background music play prevented:", error);
      });
    }
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Top navigation bar */}
      <header className="absolute top-0 left-0 right-0 py-3 px-4 flex justify-between items-center z-20 bg-black/80">
        <Link to="/" className="text-2xl font-bold neon-text">NEON MAZE</Link>
        <div className="flex items-center gap-4">
          <button onClick={handleSoundToggle} className="p-2 rounded-full">
            {isMuted ? (
              <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
          <Link to="/" className="px-4 py-2 text-sm bg-muted rounded-md text-muted-foreground hover:bg-muted/80 transition-colors">
            EXIT GAME
          </Link>
        </div>
      </header>

      {/* Instructions overlay */}
      {showInstructions && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 p-6">
          <div className="max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-6 neon-text tracking-wider">HOW TO PLAY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="bg-card p-4 rounded-lg border border-primary">
                <h3 className="text-xl font-semibold mb-2 neon-text">CONTROLS</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 bg-muted rounded text-xs">↑</span>
                    <span>Move Forward</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 bg-muted rounded text-xs">←</span>
                    <span>Move Left</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 bg-muted rounded text-xs">→</span>
                    <span>Move Right</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 bg-muted rounded text-xs">↓</span>
                    <span>Move Backward</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card p-4 rounded-lg border border-secondary">
                <h3 className="text-xl font-semibold mb-2 neon-text-secondary">OBJECTIVE</h3>
                <p className="text-muted-foreground">
                  Navigate through the neon maze to find the glowing exit portal. 
                  Avoid hitting walls and explore to find the best path to freedom.
                </p>
              </div>
            </div>
            <button 
              onClick={startGame}
              className="neon-button"
            >
              START GAME
            </button>
          </div>
        </div>
      )}

      {/* Game Canvas */}
      <MazeGame />
    </div>
  );
}
