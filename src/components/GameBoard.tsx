import React from 'react';
import { Position, Food, Obstacle, SnakeStyle, Direction } from '../types/gameTypes';

interface GameBoardProps {
  snake: Position[];
  food: Food | null;
  obstacles: Obstacle[];
  isPaused: boolean;
  isGameOver: boolean;
  gridSize: number;
  snakeStyle: SnakeStyle;
  direction: Direction;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  snake, 
  food,
  obstacles,
  gridSize,
  snakeStyle,
  direction,
}) => {
  const renderGrid = () => {
    const cells = [];
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const isSnakeHead = snake[0].x === col && snake[0].y === row;
        const isSnakeBody = snake.slice(1).some(segment => segment.x === col && segment.y === row);
        const isFood = food && food.x === col && food.y === row;
        const isObstacle = obstacles.some(obs => obs.x === col && obs.y === row);
        
        let cellClass = 'bg-gray-800';
        let transform = '';
        let content = null;
        
        if (isSnakeHead) {
          cellClass = `bg-${snakeStyle.headColor}-500 relative`;
          transform = 'scale-95';
          
          // Snake head with eyes and tongue
          content = (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Eyes */}
                <div className={`absolute w-2 h-2 bg-white rounded-full ${
                  direction === 'UP' ? 'top-1 left-1' : 
                  direction === 'DOWN' ? 'bottom-1 left-1' :
                  direction === 'LEFT' ? 'left-1 top-1' :
                  'right-1 top-1'
                }`} />
                <div className={`absolute w-2 h-2 bg-white rounded-full ${
                  direction === 'UP' ? 'top-1 right-1' :
                  direction === 'DOWN' ? 'bottom-1 right-1' :
                  direction === 'LEFT' ? 'left-1 bottom-1' :
                  'right-1 bottom-1'
                }`} />
                {/* Tongue */}
                <div className={`absolute w-2 h-1 bg-red-500 ${
                  direction === 'UP' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' :
                  direction === 'DOWN' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' :
                  direction === 'LEFT' ? 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2' :
                  'right-0 top-1/2 translate-x-1/2 -translate-y-1/2'
                }`} />
              </div>
            </>
          );
        } else if (isSnakeBody) {
          const index = snake.findIndex(segment => segment.x === col && segment.y === row);
          cellClass = `bg-${snakeStyle.bodyColor}-500 ${snakeStyle.shape === 'round' ? 'rounded-full' : ''} 
                      ${snakeStyle.shape === 'diamond' ? 'rotate-45' : ''}`;
          transform = 'scale-80';
          
          if (snakeStyle.pattern === 'segments') {
            cellClass += index % 2 ? ' opacity-75' : '';
          }
        } else if (isFood) {
          cellClass = 'relative flex items-center justify-center';
          content = (
            <div className="absolute inset-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50">
              <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-300 opacity-75" />
            </div>
          );
        } else if (isObstacle) {
          cellClass = 'bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg shadow-red-500/50 border-2 border-red-400/30';
          transform = 'scale-95 rotate-45';
        }
        
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`${cellClass} w-full h-full relative`}
            style={{
              gridRow: row + 1,
              gridColumn: col + 1,
              transition: 'all 0.05s ease-in-out',
              transform,
            }}
          >
            {content}
          </div>
        );
      }
    }
    
    return cells;
  };
  
  return (
    <div 
      className="w-full h-full bg-gray-900 rounded-lg shadow-lg border-2 border-gray-700 p-1"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '1px',
      }}
    >
      {renderGrid()}
    </div>
  );
};