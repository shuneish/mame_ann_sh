import React, { useEffect, useState } from 'react';
import './App.css';
import ShootingGame from './components/ShootingGame';

function App() {
  const [aframeLoaded, setAframeLoaded] = useState(false);

  useEffect(() => {
    // A-Frameの初期化
    if (typeof window !== 'undefined') {
      const aframeScript = document.createElement('script');
      aframeScript.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
      aframeScript.onload = () => {
        console.log('A-Frame loaded successfully');
        
        // AR.jsの読み込み
        const arjsScript = document.createElement('script');
        arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.min.js';
        arjsScript.onload = () => {
          console.log('AR.js loaded successfully');
          setAframeLoaded(true);
        };
        arjsScript.onerror = () => {
          console.error('Failed to load AR.js');
          setAframeLoaded(true); // A-Frameは読み込まれているので、ARなしでも動作させる
        };
        document.head.appendChild(arjsScript);
      };
      aframeScript.onerror = () => {
        console.error('Failed to load A-Frame');
      };
      document.head.appendChild(aframeScript);
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