import React from 'react';
import { Level, GameMode, SnakeState } from '../types/gameTypes';
import { Heart } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  level: Level;
  gameMode: GameMode;
  snakeState?: SnakeState;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore, level, gameMode, snakeState }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between px-4">
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">Score</p>
          <p className="text-white text-2xl font-bold">{score}</p>
        </div>
        
        {gameMode === 'challenge' && snakeState && (
          <div className="text-center flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-300"
                style={{ width: `${snakeState.health}%` }}
              />
            </div>
          </div>
        )}
        
        {gameMode !== 'challenge' && (
          <div className="text-center">
            <p className="text-gray-400 text-xs uppercase tracking-wide">High Score</p>
            <p className="text-white text-2xl font-bold">{highScore}</p>
          </div>
        )}
      </div>
      
      {gameMode === 'levels' && (
        <div className="bg-gray-800 rounded-lg p-2 mx-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide">Level {level.number}</p>
              <p className="text-white font-medium">{level.description}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs uppercase tracking-wide">Speed</p>
              <p className="text-white font-medium">{level.speed}x</p>
            </div>
          </div>
          
          <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
              style={{ 
                width: `${Math.min(100, (score / (level.requiredScore || 1)) * 100)}%`
              }}
            />
          </div>
        </div>
      )}
      
      {gameMode === 'challenge' && snakeState && (
        <div className="flex gap-2 px-4">
          {snakeState.isOnFire && (
            <span className="text-orange-500 text-sm animate-pulse">On Fire!</span>
          )}
          {snakeState.isSlowed && (
            <span className="text-blue-400 text-sm">Slowed</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;