
import { MazeCell } from "@/lib/stores/useMazeGame";

export function generateMaze(width: number, height: number): MazeCell[][] {
  // Initialize the maze with all walls intact
  const maze: MazeCell[][] = Array(height).fill(null).map((_, z) => 
    Array(width).fill(null).map((_, x) => ({
      x,
      z,
      walls: { top: true, right: true, bottom: true, left: true },
      visited: false
    }))
  );

  // Initialize walls list for Prim's algorithm
  const walls: { x: number; z: number; direction: 'top' | 'right' | 'bottom' | 'left' }[] = [];
  
  // Start with the cell at (0,0)
  const startX = 0;
  const startZ = 0;
  maze[startZ][startX].visited = true;
  
  // Add walls of the starting cell
  if (startZ > 0) walls.push({ x: startX, z: startZ, direction: 'top' });
  if (startX < width - 1) walls.push({ x: startX, z: startZ, direction: 'right' });
  if (startZ < height - 1) walls.push({ x: startX, z: startZ, direction: 'bottom' });
  if (startX > 0) walls.push({ x: startX, z: startZ, direction: 'left' });

  // Prim's algorithm
  while (walls.length > 0) {
    // Pick a random wall
    const wallIndex = Math.floor(Math.random() * walls.length);
    const wall = walls[wallIndex];
    walls.splice(wallIndex, 1);

    let x1 = wall.x;
    let z1 = wall.z;
    let x2 = wall.x;
    let z2 = wall.z;

    // Get cells on both sides of the wall
    switch (wall.direction) {
      case 'top': z2 = z1 - 1; break;
      case 'right': x2 = x1 + 1; break;
      case 'bottom': z2 = z1 + 1; break;
      case 'left': x2 = x1 - 1; break;
    }

    // If only one of the cells has been visited
    if (maze[z1][x1].visited !== maze[z2][x2].visited) {
      // Remove the wall
      if (wall.direction === 'top') {
        maze[z1][x1].walls.top = false;
        maze[z2][x2].walls.bottom = false;
      } else if (wall.direction === 'right') {
        maze[z1][x1].walls.right = false;
        maze[z2][x2].walls.left = false;
      } else if (wall.direction === 'bottom') {
        maze[z1][x1].walls.bottom = false;
        maze[z2][x2].walls.top = false;
      } else {
        maze[z1][x1].walls.left = false;
        maze[z2][x2].walls.right = false;
      }

      // Mark the unvisited cell as visited
      const unvisitedCell = !maze[z1][x1].visited ? maze[z1][x1] : maze[z2][x2];
      unvisitedCell.visited = true;

      // Add the unvisited cell's walls to the list
      const newX = unvisitedCell.x;
      const newZ = unvisitedCell.z;

      if (newZ > 0 && !maze[newZ - 1][newX].visited) 
        walls.push({ x: newX, z: newZ, direction: 'top' });
      if (newX < width - 1 && !maze[newZ][newX + 1].visited)
        walls.push({ x: newX, z: newZ, direction: 'right' });
      if (newZ < height - 1 && !maze[newZ + 1][newX].visited)
        walls.push({ x: newX, z: newZ, direction: 'bottom' });
      if (newX > 0 && !maze[newZ][newX - 1].visited)
        walls.push({ x: newX, z: newZ, direction: 'left' });
    }
  }

  // Ensure path from start to end exists
  createPathToEnd(maze, width, height);
  
  return maze;
}

function createPathToEnd(maze: MazeCell[][], width: number, height: number): void {
  const path: { x: number; z: number }[] = [];
  const visited: boolean[][] = Array(height).fill(false).map(() => Array(width).fill(false));
  
  function dfs(x: number, z: number): boolean {
    if (x === width - 1 && z === height - 1) return true;
    if (x < 0 || x >= width || z < 0 || z >= height || visited[z][x]) return false;
    
    visited[z][x] = true;
    path.push({ x, z });

    // Try all four directions
    if (!maze[z][x].walls.right && dfs(x + 1, z)) return true;
    if (!maze[z][x].walls.bottom && dfs(x, z + 1)) return true;
    if (!maze[z][x].walls.left && dfs(x - 1, z)) return true;
    if (!maze[z][x].walls.top && dfs(x, z - 1)) return true;

    path.pop();
    return false;
  }

  // If no path exists, create one
  if (!dfs(0, 0)) {
    let currentX = 0;
    let currentZ = 0;
    
    while (currentX < width - 1 || currentZ < height - 1) {
      if (currentX < width - 1) {
        maze[currentZ][currentX].walls.right = false;
        maze[currentZ][currentX + 1].walls.left = false;
        currentX++;
      }
      if (currentZ < height - 1) {
        maze[currentZ][currentX].walls.bottom = false;
        maze[currentZ + 1][currentX].walls.top = false;
        currentZ++;
      }
    }
  }
}
