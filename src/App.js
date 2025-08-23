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

  // const renderScene = () => {
  //   if (!aframeLoaded) {
  //     return <div>Loading A-Frame...</div>;
  //   }

  //   switch (currentScene) {
  //     case 'interactive':
  //       // InteractiveSceneコンポーネントを修正して使用
  //       return <InteractiveScene className="aframe-scene" />;
  //     case 'vr':
  //       return <VRScene className="aframe-scene" />;
  //     default:
  //       return <AFrameScene className="aframe-scene" />;
  //   }
  // };

  const renderScene = () => {
    if (!aframeLoaded) {
      return <div>Loading A-Frame...</div>;
    }

    return <InteractiveScene className="aframe-scene" />;

    // switch (currentScene) {
    //   case 'interactive':
    //     // InteractiveSceneコンポーネントを修正して使用
    //     return <InteractiveScene className="aframe-scene" />;
    //   case 'vr':
    //     return <VRScene className="aframe-scene" />;
    //   default:
    //     return <AFrameScene className="aframe-scene" />;
    // }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>A-Frame React Demo</h1>
        <p>VR/AR 3Dシーンを体験してください</p>
        <p>A-Frame Status: {aframeLoaded ? 'Loaded' : 'Loading...'}</p>
        <div className="scene-controls">
          <button 
            onClick={() => setCurrentScene('interactive')}
            className={currentScene === 'interactive' ? 'active' : ''}
          >
            インタラクティブ
          </button>
        </div>
      </header>
      <main>
        {renderScene()}
      </main>
    </div>
  );
}

// シンプルなA-Frameシーンコンポーネント (変更なし)
const AFrameScene = ({ className = '' }) => {
  return (
    <div className={className}>
      <a-scene embedded vr-mode-ui="enabled: false">
        <a-entity
          camera
          look-controls
          wasd-controls
          position="0 1.6 0"
        />
        <a-box
          id="myBox"
          position="-1 0.5 -3"
          rotation="0 45 0"
          color="#4CC3D9"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
        />
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
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="#7BC8A4"
        />
        <a-sky color="#ECECEC" />
      </a-scene>
    </div>
  );
};

// 修正するInteractiveSceneコンポーネント
const InteractiveScene = ({ className = '' }) => {
  // A-FrameのカスタムコンポーネントをReactのuseEffectで定義
  useEffect(() => {
    // A-Frameがすでに読み込まれていることを確認
    if (typeof AFRAME !== 'undefined' && !AFRAME.components['hit-test-handler']) {
      AFRAME.registerComponent('hit-test-handler', {
        init: function () {
          this.el.addEventListener('mousedown', function (evt) {
            const intersectedEl = evt.detail.intersectedEl;
            if (intersectedEl && intersectedEl.classList.contains('target')) {
              intersectedEl.setAttribute('visible', false);
            }
          });
        }
      });
    }
  }, []); // []でコンポーネントがマウントされた時のみ実行

  return (
    <div className={className}>
      <a-scene
        embedded
        xr-mode-ui="XRMode: xr"
        ar-hit-test="type: tracked; target: .target;"
        renderer="logarithmicDepthBuffer: true;"
      >
        <a-cylinder 
          class="target"
          rotation="90 38.434 0"
          position="1.66192 0.75 1.64353"
          radius="0.35" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-cylinder 
          class="target" 
          rotation="90 38.434 0"
          position="-1.82386 0.75 -1.44074"
          radius="0.35" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-cylinder 
          class="target"
          rotation="90.00021045914971 -43.673707933847 0"
          position="1.93213 0.8299 -0.84174"
          radius="0.35" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-cylinder 
          class="target"
          rotation="89.99963750135457 133.08319890621684 0"
          position="-1.13573 0.75 1.77243"
          radius="0.35" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-cylinder 
          class="target" 
          rotation="42.709 -104.296 -122.116"
          position="-0.59651 2.12601 -2.19978"
          radius="0.35" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-cylinder 
          class="target"
          rotation="72.98279098596913 179.9998479605043 -169.12167126215047"
          position="0.82084 1.58734 -1.71492"
          radius="0.35" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-cylinder 
          class="target"
          rotation="76.04582335873852 114.91929088497949 20.738780352555278"
          position="2.09379 1.77134 0.30033"
          radius="0.35" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-cylinder 
          class="target"
          rotation="-55.98313320443761 -173.87091842598988 173.3879150046946"
          position="0.08255 1.63931 2.45461"
          radius="0.35" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-cylinder 
          class="target"
          rotation="73.16155381804995 -90.00021045914971 168.4937095186871"
          position="-2.19323 1.55836 0.6957"
          radius="0.35" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-cylinder 
          class="target"
          rotation="70.67147924041139 -90.00021045914971 -159.3636270532774"
          position="-2.746 0.75 -0.545"
          radius="0.2" 
          height="0.01" 
          color="#FFC65D"
        ></a-cylinder>
        <a-plane
          id="myPlane"
          position="0 0 0"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="#7BC8A4"
        ></a-plane>
        <a-sky 
          id="mySky"
          color="#ECECEC"
          hide-on-enter-ar
        ></a-sky>
        <a-entity
          cursor="rayOrigin: mouse"
          raycaster="objects: .target;"
          hit-test-handler
        ></a-entity>
        <a-camera 
          id="myCamera"
          position="0 0.4 0" 
          wasd-controls="acceleration:10;"
        ></a-camera>
        <a-entity light="type: ambient; color: #BBB"></a-entity>
        <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1"></a-entity>
      </a-scene>
    </div>
  );
};

const VRScene = ({ className = '' }) => {
  return (
    <div className={className}>
      <a-scene embedded vr-mode-ui="enabled: true">
        <a-entity
          camera
          look-controls
          wasd-controls
          position="0 1.6 0"
        />
        <a-box
          position="0 0.5 -3"
          rotation="0 45 0"
          color="#4CC3D9"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
        />
        <a-sphere
          position="2 1.25 -5"
          radius="1.25"
          color="#EF2D5E"
        />
        <a-cylinder
          position="-2 1 -5"
          radius="0.5"
          height="2"
          color="#FFC65D"
        />
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="8"
          height="8"
          color="#7BC8A4"
        />
        <a-sky color="#87CEEB" />
        <a-light type="ambient" color="#404040" />
        <a-light type="directional" position="0 1 0" color="#ffffff" intensity="0.5" />
      </a-scene>
    </div>
  );
};

export default App;
