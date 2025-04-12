import { FC } from "react";
import { useMazeGame } from "@/lib/stores/useMazeGame";

interface GameUIProps {
  level: number;
}

const CameraSettings: FC = () => {
  //  Implementation for camera settings UI would go here.  This is a placeholder.
  return <button>Camera Settings</button>;
};


const GameUI: FC<GameUIProps> = ({ level }) => {
  // Get values from the store
  const { playerPosition, gameState, currentLevel, maxLevel, levelTime, score, bestTimes } = useMazeGame();
  
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  if (gameState === "completed") {
    return null; // Don't render UI when game is completed
  }

  return (
    <>
      <div className="level-info">
        <div className="font-bold text-lg">LEVEL {currentLevel}/{maxLevel}</div>
        <div className="text-sm text-muted-foreground">
          Time: {formatTime(levelTime)}
          {bestTimes[currentLevel] && 
            <span> | Best: {formatTime(bestTimes[currentLevel])}</span>
          }
        </div>
        <div className="text-sm text-muted-foreground">
          Score: {score}
        </div>
        <div className="text-xs text-muted-foreground">
          Position: X: {playerPosition.x.toFixed(1)} | Z: {playerPosition.z.toFixed(1)}
        </div>
      </div>

      

      <div className="control-info">
        <div className="font-bold mb-1">CONTROLS</div>
        <div className="text-xs grid grid-cols-2 gap-x-4 gap-y-1">
          <div>↑: Forward</div>
          <div>↓: Back</div>
          <div>←: Left</div>
          <div>→: Right</div>
        </div>
      </div>
    </>
  );
};

export default GameUI;