import React from 'react';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
  onChangeMode: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart, onChangeMode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-20">
      <div className="bg-gray-800 p-8 rounded-xl border-2 border-gray-700 shadow-2xl max-w-xs w-full mx-auto">
        <h2 className="text-red-500 text-3xl font-bold mb-2 text-center">Game Over!</h2>
        
        <div className="my-6 text-center">
          <p className="text-gray-300 mb-2">Your score</p>
          <p className="text-white text-4xl font-bold">{score}</p>
        </div>
        
        <div className="space-y-3">
          <button
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-md text-white font-semibold hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all transform hover:scale-105"
            onClick={onRestart}
          >
            Play Again
          </button>
          
          <button
            className="w-full py-3 px-6 bg-gray-700 rounded-md text-white font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            onClick={onChangeMode}
          >
            Change Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal