import React, { useState, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { useGameLogic } from '../hooks/useGameLogic';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Paintbrush } from 'lucide-react';
import SnakeCustomizer from './SnakeCustomizer';
import ModeSelector from './ModeSelector';
import { GameMode } from '../types/gameTypes';

const Game: React.FC = () => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  
  const {
    snake,
    food,
    direction,
    score,
    highScore,
    isGameOver,
    isPaused,
    gridSize,
    level,
    obstacles,
    snakeStyle,
    setSnakeStyle,
    setDirection,
    resetGame,
    togglePause,
  } = useGameLogic(gameMode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
        case ' ':
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver, setDirection, togglePause]);

  if (!gameMode) {
    return <ModeSelector onModeSelect={setGameMode} />;
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-4 px-4 py-2 sm:py-4">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Snake Game</h1>
          <button
            onClick={() => setGameMode(null)}
            className="text-gray-400 hover:text-white text-sm"
          >
            Change Mode
          </button>
        </div>
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-white"
        >
          <Paintbrush className="w-5 h-5" />
        </button>
      </div>
      
      <div className="w-full flex justify-between items-center px-4 bg-gray-800/50 rounded-lg py-2">
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">Score</p>
          <p className="text-white text-xl sm:text-2xl font-bold">{score}</p>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">High Score</p>
          <p className="text-white text-xl sm:text-2xl font-bold">{highScore}</p>
        </div>
        
        {gameMode === 'levels' && level && (
          <div className="text-center">
            <p className="text-gray-400 text-xs uppercase tracking-wide">Level {level.number}</p>
            <p className="text-white text-sm">Speed: {level.speed}x</p>
          </div>
        )}
      </div>
      
      <div className="relative w-full aspect-square">
        <GameBoard 
          snake={snake}
          food={food}
          obstacles={obstacles}
          isPaused={isPaused} 
          isGameOver={isGameOver}
          gridSize={gridSize}
          snakeStyle={snakeStyle}
          direction={direction}
        />
        
        {isPaused && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
            <p className="text-white text-2xl font-bold">PAUSED</p>
          </div>
        )}
        
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
            <p className="text-white text-2xl font-bold mb-4">GAME OVER</p>
            <p className="text-gray-300 mb-4">Score: {score}</p>
            {score > highScore && (
              <p className="text-yellow-400 font-bold mb-4">New High Score!</p>
            )}
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-2 sm:hidden w-full max-w-[280px]">
        <div className="grid grid-cols-3 gap-3">
          <div></div>
          <button 
            className="p-4 bg-gray-700 rounded-xl active:bg-gray-600 focus:outline-none active:scale-95 transition-transform"
            onClick={() => setDirection('UP')}
          >
            <ChevronUp className="w-8 h-8 text-white" />
          </button>
          <div></div>
          
          <button 
            className="p-4 bg-gray-700 rounded-xl active:bg-gray-600 focus:outline-none active:scale-95 transition-transform"
            onClick={() => setDirection('LEFT')}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          <button 
            className="p-4 bg-gray-700 rounded-xl active:bg-gray-600 focus:outline-none active:scale-95 transition-transform"
            onClick={() => togglePause()}
          >
            <span className="text-white text-2xl font-bold">{isPaused ? '▶' : '❚❚'}</span>
          </button>
          <button 
            className="p-4 bg-gray-700 rounded-xl active:bg-gray-600 focus:outline-none active:scale-95 transition-transform"
            onClick={() => setDirection('RIGHT')}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
          
          <div></div>
          <button 
            className="p-4 bg-gray-700 rounded-xl active:bg-gray-600 focus:outline-none active:scale-95 transition-transform"
            onClick={() => setDirection('DOWN')}
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </button>
          <div></div>
        </div>
      </div>
      
      <SnakeCustomizer
        style={snakeStyle}
        onStyleChange={setSnakeStyle}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
};

export default Game;