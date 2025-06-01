export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameMode = 'classic' | 'levels';

export interface Position {
  x: number;
  y: number;
}

export interface Food {
  x: number;
  y: number;
}

export interface Level {
  number: number;
  speed: number;
  gridSize: number;
  foodValue: number;
  requiredScore: number;
  obstacleCount: number;
}

export interface Obstacle {
  x: number;
  y: number;
}

export interface SnakeStyle {
  headColor: string;
  bodyColor: string;
  pattern: 'solid' | 'segments';
  shape: 'round' | 'square' | 'diamond';
}