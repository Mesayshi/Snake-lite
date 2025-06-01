import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, Direction, Food, Level, Obstacle, SnakeStyle, GameMode } from '../types/gameTypes';
import { useInterval } from './useInterval';

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const LEVELS: Level[] = [
  { number: 1, speed: 1, gridSize: 20, foodValue: 1, requiredScore: 0, obstacleCount: 0 },
  { number: 2, speed: 1.2, gridSize: 20, foodValue: 2, requiredScore: 10, obstacleCount: 2 },
  { number: 3, speed: 1.4, gridSize: 18, foodValue: 2, requiredScore: 25, obstacleCount: 3 },
  { number: 4, speed: 1.6, gridSize: 18, foodValue: 3, requiredScore: 45, obstacleCount: 4 },
  { number: 5, speed: 1.8, gridSize: 16, foodValue: 3, requiredScore: 70, obstacleCount: 5 },
];

const DEFAULT_SNAKE_STYLE: SnakeStyle = {
  headColor: 'emerald',
  bodyColor: 'emerald',
  pattern: 'segments',
  shape: 'diamond',
};

const BASE_SPEED = 150;
const SPEED_INCREASE = 0.001; // 0.1% increase per food eaten

const getStoredHighScore = (mode: GameMode): number => {
  const stored = localStorage.getItem(`snake_highscore_${mode}`);
  return stored ? parseInt(stored, 10) : 0;
};

export const useGameLogic = (gameMode: GameMode | null) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Food | null>(null);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(gameMode ? getStoredHighScore(gameMode) : 0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<Level>(LEVELS[0]);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [snakeStyle, setSnakeStyle] = useState<SnakeStyle>(DEFAULT_SNAKE_STYLE);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  
  const directionRef = useRef(direction);
  const lastDirectionRef = useRef<Direction>('RIGHT');

  const generateObstacles = useCallback(() => {
    const newObstacles: Obstacle[] = [];
    for (let i = 0; i < currentLevel.obstacleCount; i++) {
      let obstacle: Obstacle;
      do {
        obstacle = {
          x: Math.floor(Math.random() * currentLevel.gridSize),
          y: Math.floor(Math.random() * currentLevel.gridSize),
        };
      } while (
        snake.some(segment => segment.x === obstacle.x && segment.y === obstacle.y) ||
        (food && food.x === obstacle.x && food.y === obstacle.y) ||
        newObstacles.some(obs => obs.x === obstacle.x && obs.y === obstacle.y)
      );
      newObstacles.push(obstacle);
    }
    return newObstacles;
  }, [snake, food, currentLevel]);

  const generateFood = useCallback((): Food => {
    let newFood: Food;
    do {
      newFood = {
        x: Math.floor(Math.random() * currentLevel.gridSize),
        y: Math.floor(Math.random() * currentLevel.gridSize),
      };
    } while (
      snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
      obstacles.some(obstacle => obstacle.x === newFood.x && obstacle.y === newFood.y)
    );
    return newFood;
  }, [snake, currentLevel.gridSize, obstacles]);

  const updateLevel = useCallback(() => {
    if (gameMode !== 'levels') return;
    
    const newLevel = LEVELS.findLast(level => score >= level.requiredScore) || LEVELS[0];
    if (newLevel.number !== currentLevel.number) {
      setCurrentLevel(newLevel);
      setObstacles(generateObstacles());
    }
  }, [score, currentLevel.number, generateObstacles, gameMode]);

  const handleDirectionChange = useCallback((newDirection: Direction) => {
    if (isPaused || isGameOver) return;
    
    // Prevent 180-degree turns
    if (
      (lastDirectionRef.current === 'UP' && newDirection === 'DOWN') ||
      (lastDirectionRef.current === 'DOWN' && newDirection === 'UP') ||
      (lastDirectionRef.current === 'LEFT' && newDirection === 'RIGHT') ||
      (lastDirectionRef.current === 'RIGHT' && newDirection === 'LEFT')
    ) {
      return;
    }
    
    setDirection(newDirection);
    directionRef.current = newDirection;
  }, [isPaused, isGameOver]);

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;
    
    lastDirectionRef.current = directionRef.current;
    
    const head = { ...snake[0] };
    
    switch (directionRef.current) {
      case 'UP':
        head.y = (head.y - 1 + currentLevel.gridSize) % currentLevel.gridSize;
        break;
      case 'DOWN':
        head.y = (head.y + 1) % currentLevel.gridSize;
        break;
      case 'LEFT':
        head.x = (head.x - 1 + currentLevel.gridSize) % currentLevel.gridSize;
        break;
      case 'RIGHT':
        head.x = (head.x + 1) % currentLevel.gridSize;
        break;
    }
    
    if (
      snake.some(segment => segment.x === head.x && segment.y === head.y) ||
      obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)
    ) {
      setIsGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(`snake_highscore_${gameMode}`, score.toString());
      }
      return;
    }
    
    const newSnake = [head, ...snake];
    
    if (food && head.x === food.x && head.y === food.y) {
      setScore(score + currentLevel.foodValue);
      setFood(generateFood());
      updateLevel();
      
      if (gameMode === 'classic') {
        setSpeedMultiplier(prev => prev * (1 + SPEED_INCREASE));
      }
    } else {
      newSnake.pop();
    }
    
    setSnake(newSnake);
  }, [
    snake,
    food,
    isPaused,
    isGameOver,
    score,
    currentLevel,
    obstacles,
    generateFood,
    updateLevel,
    gameMode,
    highScore,
  ]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    lastDirectionRef.current = 'RIGHT';
    setScore(0);
    setCurrentLevel(LEVELS[0]);
    setObstacles(gameMode === 'levels' ? generateObstacles() : []);
    setFood(generateFood());
    setIsGameOver(false);
    setIsPaused(false);
    setSpeedMultiplier(1);
    setHighScore(gameMode ? getStoredHighScore(gameMode) : 0);
  }, [generateFood, generateObstacles, gameMode]);

  const togglePause = useCallback(() => {
    if (!isGameOver) {
      setIsPaused(prev => !prev);
    }
  }, [isGameOver]);

  useInterval(
    moveSnake,
    !isPaused && !isGameOver ? BASE_SPEED / (currentLevel.speed * speedMultiplier) : null
  );

  useEffect(() => {
    if (!food) {
      setFood(generateFood());
    }
  }, [food, generateFood]);

  useEffect(() => {
    if (gameMode === 'levels') {
      setObstacles(generateObstacles());
    } else {
      setObstacles([]);
    }
  }, [gameMode, generateObstacles]);

  useEffect(() => {
    if (gameMode) {
      setHighScore(getStoredHighScore(gameMode));
    }
  }, [gameMode]);

  return {
    snake,
    food,
    direction,
    score,
    highScore,
    isGameOver,
    isPaused,
    gridSize: currentLevel.gridSize,
    level: gameMode === 'levels' ? currentLevel : null,
    obstacles,
    snakeStyle,
    setSnakeStyle,
    setDirection: handleDirectionChange,
    resetGame,
    togglePause,
  };
};