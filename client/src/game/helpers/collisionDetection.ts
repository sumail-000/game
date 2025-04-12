import { MazeCell } from "@/lib/stores/useMazeGame";

export function checkCollision(
  playerX: number,
  playerZ: number,
  maze: MazeCell[][],
  mazeWidth: number,
  mazeHeight: number
): boolean {
  // Convert world position to maze grid coordinates
  const gridX = Math.floor(playerX / 2);
  const gridZ = Math.floor(playerZ / 2);

  // Check maze boundaries
  if (gridX < 0 || gridX >= mazeWidth || gridZ < 0 || gridZ >= mazeHeight) {
    return true;
  }

  const cell = maze[gridZ][gridX];

  // Calculate position within the cell (0-2)
  const cellX = playerX % 2;
  const cellZ = playerZ % 2;

  // Tighter collision margin
  const margin = 0.25;

  // Get precise position within cell
  const preciseX = cellX.toFixed(3);
  const preciseZ = cellZ.toFixed(3);

  // Extended margin for edge collision
  const edgeMargin = margin + 0.1;

  // Check current cell walls with extended edge detection
  if (cell.walls.top && cellZ < margin) {
    if (Math.abs(cellX - 1) < 1 + edgeMargin) return true;
  }
  if (cell.walls.bottom && cellZ > (2 - margin)) {
    if (Math.abs(cellX - 1) < 1 + edgeMargin) return true;
  }
  if (cell.walls.left && cellX < margin) {
    if (Math.abs(cellZ - 1) < 1 + edgeMargin) return true;
  }
  if (cell.walls.right && cellX > (2 - margin)) {
    if (Math.abs(cellZ - 1) < 1 + edgeMargin) return true;
  }

  // Check adjacent cells with extended edge detection
  if (gridZ > 0 && maze[gridZ - 1][gridX].walls.bottom && cellZ < margin) {
    if (Math.abs(cellX - 1) < 1 + edgeMargin) return true;
  }
  if (gridZ < mazeHeight - 1 && maze[gridZ + 1][gridX].walls.top && cellZ > (2 - margin)) {
    if (Math.abs(cellX - 1) < 1 + edgeMargin) return true;
  }
  if (gridX > 0 && maze[gridZ][gridX - 1].walls.right && cellX < margin) {
    if (Math.abs(cellZ - 1) < 1 + edgeMargin) return true;
  }
  if (gridX < mazeWidth - 1 && maze[gridZ][gridX + 1].walls.left && cellX > (2 - margin)) {
    if (Math.abs(cellZ - 1) < 1 + edgeMargin) return true;
  }

  return false;
}

export function checkPortalCollision(
  playerX: number,
  playerZ: number,
  portalX: number,
  portalZ: number,
  radius: number = 0.8
): boolean {
  const distanceSquared = 
    Math.pow(playerX - portalX, 2) + 
    Math.pow(playerZ - portalZ, 2);

  return distanceSquared < radius * radius;
}