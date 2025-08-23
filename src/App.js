import React, { useEffect, useState } from 'react';
import './App.css';
import ShootingGame from './components/ShootingGame';

function App() {
  const [aframeLoaded, setAframeLoaded] = useState(false);

  useEffect(() => {
    // A-Frameの初期化
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
      script.onload = () => {
        console.log('A-Frame loaded successfully');
        setAframeLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load A-Frame');
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎯 ARシューティングゲーム</h1>
        <p>VR/ARモードで3Dターゲットを撃ってスコアを競おう！</p>
        <p>A-Frame Status: {aframeLoaded ? 'Loaded' : 'Loading...'}</p>
      </header>
      <main>
        {aframeLoaded ? (
          <ShootingGame className="aframe-scene" />
        ) : (
          <div>Loading A-Frame...</div>
        )}
      </main>
    </div>
  );
}

export default App; 