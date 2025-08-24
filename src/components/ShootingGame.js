import React, { useState, useEffect, useRef } from 'react';

function ShootingGame ({ className = '' , onGameEnd})  {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState([]);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  // ▼▼▼【追加】残り時間を管理するstateを追加 ▼▼▼
  const [timeLeft, setTimeLeft] = useState(10); 
  const gameRef = useRef(null);

  // ターゲットの生成
  const generateTarget = () => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 8 + 3;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    const y = Math.random() * 4 + 1;
    
    return {
      id: Date.now() + Math.random(),
      position: `${x} ${y} ${z}`,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      size: Math.random() * 0.5 + 0.3
    };
  };

  // ゲーム開始
  const startGame = () => {
    setScore(0);
    setGameActive(true);
    // ▼▼▼【追加】ゲーム開始時に残り時間をリセット ▼▼▼
    setTimeLeft(10);
    const initialTargets = Array.from({ length: 5 }, () => generateTarget());
    setTargets(initialTargets);
  };

  // コンポーネントマウント時にゲームを自動開始
  useEffect(() => {
    startGame();
  }, []);

  // ゲーム終了
  const endGame = () => {
    setGameActive(false);
    if (onGameEnd) {
      onGameEnd(score);
    }
  };

  // ▼▼▼【修正】ゲーム時間とカウントダウンの管理 ▼▼▼
  useEffect(() => {
    // ゲームがアクティブでない場合は何もしない
    if (!gameActive) return;

    // 時間が0になったらゲームを終了
    if (timeLeft <= 0) {
      endGame();
      return;
    }

    // 1秒ごとに残り時間を1減らすインターバルを設定
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // クリーンアップ関数：コンポーネントがアンマウントされるか、
    // 依存配列の値（gameActive, timeLeft）が変更されたときにインターバルをクリアする
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]); // gameActiveかtimeLeftが変わるたびにこのeffectを再実行

  // A-Frameシーンの読み込み完了を待つ
  useEffect(() => {
    const checkAFrameLoaded = () => {
      if (window.AFRAME) {
        console.log('A-Frame loaded');
        setSceneLoaded(true);
      } else {
        setTimeout(checkAFrameLoaded, 100);
      }
    };
    checkAFrameLoaded();
  }, []);

  // DOMイベントリスナーを設定
  useEffect(() => {
    if (!sceneLoaded) return;

    const handleClick = (event) => {
      try {
        const targetElement = event.target.closest('[data-target-id]');
        if (targetElement && gameActive) {
          const targetId = targetElement.getAttribute('data-target-id');
          console.log('Target clicked:', targetId);
          
          setScore(prev => prev + 10);
          
          setTargets(prev => {
            const newTargets = prev.filter(target => target.id.toString() !== targetId);
            console.log('Remaining targets:', newTargets.length);
            return newTargets;
          });
          
          setTimeout(() => {
            setTargets(prev => [...prev, generateTarget()]);
          }, 1000);
        }
      } catch (error) {
        console.error('Error handling click:', error);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [gameActive, sceneLoaded]);

  return (
    <div className={className}>
      <div className="game-ui">
        <div className="game-info">
          <div className="score-display">
            <span>スコア: {score}</span>
            {/* ▼▼▼【追加】残り時間を表示するUIを追加 ▼▼▼ */}
            <span>残り時間: {timeLeft}秒</span>
            <span>残りターゲット: {targets.length}</span>
          </div>
{/* 
          <div className="game-controls">
            {!gameActive  && (
              <button onClick={startGame} className="start-btn">
                🎮 ゲーム開始
              </button>
            )}
            {gameActive && (
              <button onClick={endGame} className="end-btn">
                ⏹️ ゲーム終了
              </button>
            )}
          </div> */}

        </div>
      </div>

      <a-scene 
        embedded 
        vr-mode-ui="enabled: false"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        renderer="logarithmicDepthBuffer: true;"
      >
        {/* AR用のカメラ */}
        <a-entity
          camera
          look-controls="enabled: true"
          wasd-controls="enabled: true"
          position="0 1.6 0"
          arjs-look-controls="smoothingFactor: 0.1"
        >
          {/* AR用のカーソル */}
          <a-cursor
            color="#FFFFFF"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: #FFFFFF; shader: flat"
            animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
            animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
            raycaster="objects: .target; enabled: true"
            cursor="rayOrigin: mouse"
            arjs-cursor="fuse: false; maxDistance: 30;"
          />
        </a-entity>

        {/* ターゲット */}
        {targets.map(target => (
          <a-sphere
            key={target.id}
            position={target.position}
            radius={target.size}
            color={target.color}
            data-target-id={target.id}
            class="target"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
            arjs-look-at="[camera]"
          />
        ))}
        
        {/* AR用の空（現実世界を表示） */}
        <a-sky color="#5ec1e8ff"></a-sky>

        {/* ライティング */}
        <a-light type="ambient" color="#404040" />
        <a-light type="directional" position="0 1 0" color="#ffffff" intensity="0.8" />
      </a-scene>
    </div>
  );
};

export default ShootingGame;