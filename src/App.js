import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [currentScene, setCurrentScene] = useState('basic');
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

  const renderScene = () => {
    if (!aframeLoaded) {
      return <div>Loading A-Frame...</div>;
    }

    switch (currentScene) {
      case 'interactive':
        return <InteractiveScene className="aframe-scene" />;
      case 'vr':
        return <VRScene className="aframe-scene" />;
      default:
        return <AFrameScene className="aframe-scene" />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>A-Frame React Demo</h1>
        <p>VR/AR 3Dシーンを体験してください</p>
        <p>A-Frame Status: {aframeLoaded ? 'Loaded' : 'Loading...'}</p>
        <div className="scene-controls">
          <button 
            onClick={() => setCurrentScene('basic')}
            className={currentScene === 'basic' ? 'active' : ''}
          >
            基本シーン
          </button>
          <button 
            onClick={() => setCurrentScene('interactive')}
            className={currentScene === 'interactive' ? 'active' : ''}
          >
            インタラクティブ
          </button>
          <button 
            onClick={() => setCurrentScene('vr')}
            className={currentScene === 'vr' ? 'active' : ''}
          >
            VRシーン
          </button>
        </div>
      </header>
      <main>
        {renderScene()}
      </main>
    </div>
  );
}

// シンプルなA-Frameシーンコンポーネント
const AFrameScene = ({ className = '' }) => {
  return (
    <div className={className}>
      <a-scene embedded vr-mode-ui="enabled: false">
        {/* カメラ */}
        <a-entity
          camera
          look-controls
          wasd-controls
          position="0 1.6 0"
        />

        {/* 回転する立方体 */}
        <a-box
          id="myBox"
          position="-1 0.5 -3"
          rotation="0 45 0"
          color="#4CC3D9"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
        />

        {/* クリック可能な球体 */}
        <a-sphere
          position="0 1.25 -5"
          radius="1.25"
          color="#EF2D5E"
          event-set__click="
            _event: click;
            material.color: #FFC65D;
            _target: #myBox;
            animation.to: 0 90 0;"
        />

        {/* 地面 */}
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="#7BC8A4"
        />

        {/* 空 */}
        <a-sky color="#ECECEC" />
      </a-scene>
    </div>
  );
};

const InteractiveScene = ({ className = '' }) => {
  return (
    <div className={className}>
      <a-scene embedded vr-mode-ui="enabled: false">
        {/* カメラ */}
        <a-entity
          camera
          look-controls
          wasd-controls
          position="0 1.6 0"
        />

        {/* インタラクティブな立方体 */}
        <a-box
          id="interactiveBox"
          position="0 0.5 -3"
          rotation="0 0 0"
          color="#4CC3D9"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
          event-set__click="
            _event: click;
            material.color: #FF6B6B;
            animation.dur: 1000;"
        />

        {/* 地面 */}
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="6"
          height="6"
          color="#7BC8A4"
        />

        {/* 空 */}
        <a-sky color="#87CEEB" />
      </a-scene>
    </div>
  );
};

const VRScene = ({ className = '' }) => {
  return (
    <div className={className}>
      <a-scene embedded vr-mode-ui="enabled: true">
        {/* カメラ */}
        <a-entity
          camera
          look-controls
          wasd-controls
          position="0 1.6 0"
        />

        {/* VR用の立方体 */}
        <a-box
          position="0 0.5 -3"
          rotation="0 45 0"
          color="#4CC3D9"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
        />

        {/* VR用の球体 */}
        <a-sphere
          position="2 1.25 -5"
          radius="1.25"
          color="#EF2D5E"
        />

        {/* VR用の円柱 */}
        <a-cylinder
          position="-2 1 -5"
          radius="0.5"
          height="2"
          color="#FFC65D"
        />

        {/* 地面 */}
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="8"
          height="8"
          color="#7BC8A4"
        />

        {/* 空 */}
        <a-sky color="#87CEEB" />

        {/* ライティング */}
        <a-light type="ambient" color="#404040" />
        <a-light type="directional" position="0 1 0" color="#ffffff" intensity="0.5" />
      </a-scene>
    </div>
  );
};

export default App; 