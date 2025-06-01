import React from 'react';
import { SnakeStyle } from '../types/gameTypes';
import { Paintbrush, Circle, Square, Diamond } from 'lucide-react';

interface SnakeCustomizerProps {
  style: SnakeStyle;
  onStyleChange: (style: SnakeStyle) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SnakeCustomizer: React.FC<SnakeCustomizerProps> = ({
  style,
  onStyleChange,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const colors = [
    { name: 'emerald', class: 'bg-emerald-500' },
    { name: 'sky', class: 'bg-sky-500' },
    { name: 'violet', class: 'bg-violet-500' },
    { name: 'rose', class: 'bg-rose-500' },
    { name: 'amber', class: 'bg-amber-500' },
    { name: 'indigo', class: 'bg-indigo-500' }
  ];

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-30 p-4">
      <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <Paintbrush className="w-5 h-5" />
            Customize Snake
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-gray-300 text-sm mb-3 block">Snake Color</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {colors.map(({ name, class: colorClass }) => (
                <button
                  key={name}
                  className={`w-12 h-12 rounded-xl transition-all hover:scale-105 active:scale-95 ${colorClass} ${
                    style.bodyColor === name ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800' : ''
                  }`}
                  onClick={() => onStyleChange({ ...style, headColor: name, bodyColor: name })}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-3 block">Pattern</label>
            <div className="grid grid-cols-2 gap-3">
              {(['solid', 'segments'] as const).map((pattern) => (
                <button
                  key={pattern}
                  className={`py-3 px-4 rounded-xl transition-all active:scale-95 ${
                    style.pattern === pattern
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => onStyleChange({ ...style, pattern })}
                >
                  {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-3 block">Shape</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                className={`p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  style.shape === 'round'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => onStyleChange({ ...style, shape: 'round' })}
              >
                <Circle className="w-4 h-4" /> Round
              </button>
              <button
                className={`p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  style.shape === 'square'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => onStyleChange({ ...style, shape: 'square' })}
              >
                <Square className="w-4 h-4" /> Square
              </button>
              <button
                className={`p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  style.shape === 'diamond'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => onStyleChange({ ...style, shape: 'diamond' })}
              >
                <Diamond className="w-4 h-4" /> Diamond
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeCustomizer;