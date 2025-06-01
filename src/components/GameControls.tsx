import React from 'react';
import { Direction } from '../types/gameTypes';

interface GameControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onPauseToggle: () => void;
  isPaused: boolean;
  isGameOver: boolean;
  currentDirection: Direction;
}

const GameControls: React.FC<GameControlsProps> = ({
  onDirectionChange,
  onPauseToggle,
  isPaused,
  isGameOver,
  currentDirection
}) => {
  return (
    <div className="mt-4 hidden sm:block">
      <div className="flex justify-center space-x-4">
        <button
          className={`px-6 py-2 rounded-md transition-colors ${
            isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'
          } text-white focus:outline-none`}
          onClick={onPauseToggle}
          disabled={isGameOver}
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>
        
        <div className="text-white text-sm flex items-center">
          <span className="mr-2">Controls: Arrow Keys</span>
          <span className="text-gray-400">|</span>
          <span className="ml-2">Pause: Spacebar</span>
        </div>
      </div>
    </div>
  );
};

export default GameControls;