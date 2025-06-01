import React from 'react';
import { GameMode } from '../types/gameTypes';
import { Gamepad2, Trophy } from 'lucide-react';

interface ModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeSelect }) => {
  return (
    <div className="flex flex-col items-center gap-8 px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">Snake Game</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        <button
          onClick={() => onModeSelect('classic')}
          className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all active:scale-95 touch-manipulation"
        >
          <div className="flex flex-col items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-emerald-500" />
            <h3 className="text-white text-lg font-bold">Classic Mode</h3>
            <p className="text-gray-400 text-sm text-center">
              Play the classic snake game
            </p>
          </div>
        </button>

        <button
          onClick={() => onModeSelect('levels')}
          className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all active:scale-95 touch-manipulation"
        >
          <div className="flex flex-col items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500" />
            <h3 className="text-white text-lg font-bold">Level Mode</h3>
            <p className="text-gray-400 text-sm text-center">
              Progress through challenging levels
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;