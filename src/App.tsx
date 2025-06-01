import React from 'react';
import Game from './components/Game';
import { App as CapacitorApp } from '@capacitor/app';

// Handle hardware back button on Android
CapacitorApp.addListener('backButton', ({ canGoBack }) => {
  if (!canGoBack) {
    CapacitorApp.exitApp();
  }
});

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 safe-area-inset-top">
      <Game />
    </div>
  );
}

export default App;