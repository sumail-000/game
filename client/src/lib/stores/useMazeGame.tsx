import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Vector3 } from "three";
import { generateMaze } from "@/game/helpers/mazeGenerator";

// Game state types
export type GameState = "title" | "playing" | "completed";

// Player position and movement
interface PlayerPosition {
  x: number;
  z: number;
}

// Portal position
interface PortalPosition {
  x: number;
  z: number;
}

// Structure for the maze
export interface MazeCell {
  x: number;
  z: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
}

// Game state interface
interface MazeGameState {
  // Game state
  gameState: GameState;

  // Level
  currentLevel: number;
  maxLevel: number;
  levelStartTime: number;
  levelTime: number;
  bestTimes: Record<number, number>;
  score: number;

  // Maze data
  mazeSize: { width: number; height: number };
  maze: MazeCell[][];

  // Player data
  playerPosition: PlayerPosition;
  targetPosition: PlayerPosition;
  playerRotation: number;

  // Portal data
  portalPosition: PortalPosition;

    // Camera settings
  cameraSettings: {
    height: number;
    distance: number;
    fov: number;
  };

  // Actions
  movePlayer: (direction: "up" | "down" | "left" | "right") => void;
  startGame: () => void;
  completeGame: () => void;
  resetGame: () => void;
  nextLevel: () => void;

  // Helper to check wall collisions
  checkCollision: (newX: number, newZ: number) => boolean;

  // Debug info
  lastCollision: string | null;
}

// Create the store with the state and actions
export const useMazeGame = create<MazeGameState>()(
  subscribeWithSelector((set, get) => {
    // Helper to generate initial state for a given level
    const createInitialState = (level: number) => {
      // Increase maze size with level
      const baseSize = 5;
      const sizeIncrease = Math.min(2 * Math.floor((level - 1) / 2), 10);
      const mazeSize = { 
        width: baseSize + sizeIncrease, 
        height: baseSize + sizeIncrease 
      };
      const maze = generateMaze(mazeSize.width, mazeSize.height);

      // Set player at top-left (1,1) cell
      const playerPosition = { x: 1, z: 1 };

      // Set portal at bottom-right
      const portalPosition = { 
        x: mazeSize.width * 2 - 3, 
        z: mazeSize.height * 2 - 3 
      };

      return {
        gameState: "title" as GameState,
        currentLevel: level,
        mazeSize,
        maze,
        playerPosition,
        targetPosition: { ...playerPosition },
        playerRotation: 0,
        portalPosition,
        lastCollision: null,
        cameraSettings: {
          height: 8,
          distance: 5,
          fov: 60
        },
        maxLevel: 10,
        levelStartTime: Date.now(),
        levelTime: 0,
        bestTimes: {},
        score: 0
      };
    };

    // Initial state
    const initialState = createInitialState(1);

    // Timer update interval
    if (typeof window !== 'undefined') {
      setInterval(() => {
        const state = get();
        if (state.gameState === 'playing') {
          set({ levelTime: Date.now() - state.levelStartTime });
        }
      }, 100);
    }

    return {
      // Initial state
      ...initialState,

      // Move player in a direction
      movePlayer: (direction) => {
        const { playerPosition, maze, mazeSize } = get();

        // Calculate new position
        let newX = playerPosition.x;
        let newZ = playerPosition.z;
        let newRotation = get().playerRotation;

        // Movement speed (cells are 2 units wide)
        const speed = 0.2;

        // Calculate new position based on direction
        switch (direction) {
          case "up":
            newZ -= speed;
            newRotation = Math.PI;
            break;
          case "down":
            newZ += speed;
            newRotation = 0;
            break;
          case "left":
            newX -= speed;
            newRotation = Math.PI / 2;
            break;
          case "right":
            newX += speed;
            newRotation = -Math.PI / 2;
            break;
        }

        // Check for collision
        if (!get().checkCollision(newX, newZ)) {
          set({
            playerPosition: { x: newX, z: newZ },
            playerRotation: newRotation,
            lastCollision: null,
          });

          // Check if player reached the portal
          const { portalPosition } = get();
          const distanceToPortal = Math.sqrt(
            Math.pow(newX - portalPosition.x, 2) + 
            Math.pow(newZ - portalPosition.z, 2)
          );

          if (distanceToPortal < 1) {
            get().completeGame();
          }
        }
      },

      // Check if player would collide with a wall
      checkCollision: (newX, newZ) => {
        const { maze, mazeSize } = get();

        // Convert world position to maze grid coordinates
        const gridX = Math.floor(newX / 2);
        const gridZ = Math.floor(newZ / 2);

        // Check maze boundaries
        if (gridX < 0 || gridX >= mazeSize.width || 
            gridZ < 0 || gridZ >= mazeSize.height) {
          set({ lastCollision: "boundary" });
          return true;
        }

        const cell = maze[gridZ][gridX];

        // Calculate position within the cell (0-2)
        const cellX = newX % 2;
        const cellZ = newZ % 2;

        // Collision detection with walls
        // Top wall
        if (cellZ < 0.3 && cell.walls.top) {
          set({ lastCollision: "top" });
          return true;
        }
        // Bottom wall
        if (cellZ > 1.7 && cell.walls.bottom) {
          set({ lastCollision: "bottom" });
          return true;
        }
        // Left wall
        if (cellX < 0.3 && cell.walls.left) {
          set({ lastCollision: "left" });
          return true;
        }
        // Right wall
        if (cellX > 1.7 && cell.walls.right) {
          set({ lastCollision: "right" });
          return true;
        }

        return false;
      },

      // Start the game
      startGame: () => {
        set({ gameState: "playing" });
      },

      // Complete the game
      completeGame: () => {
        const state = get();
        const levelTime = Date.now() - state.levelStartTime;
        const currentBest = state.bestTimes[state.currentLevel] || Infinity;
        const newBestTimes = {
          ...state.bestTimes,
          [state.currentLevel]: Math.min(levelTime, currentBest)
        };

        // Calculate score based on time and level
        const baseScore = 1000;
        const timeBonus = Math.max(0, 30000 - levelTime) / 100;
        const levelBonus = state.currentLevel * 500;
        const newScore = state.score + baseScore + timeBonus + levelBonus;

        if (state.currentLevel < state.maxLevel) {
          // Next level
          set({ 
            gameState: "completed",
            bestTimes: newBestTimes,
            score: Math.floor(newScore)
          });
        } else {
          // Game finished
          set({ 
            gameState: "completed",
            bestTimes: newBestTimes,
            score: Math.floor(newScore)
          });
        }
      },

      // Reset the game
      resetGame: () => {
        const level = get().currentLevel;
        const newState = createInitialState(level);
        set(newState);
      },

      nextLevel: () => {
        const currentLevel = get().currentLevel;
        const maxLevel = get().maxLevel;
        if (currentLevel < maxLevel) {
          const newState = createInitialState(currentLevel + 1);
          set(newState);
        }
      },
    };
  })
);