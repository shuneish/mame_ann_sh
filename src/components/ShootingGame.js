import React, { useState, useEffect, useRef } from 'react';
import ScoreManager from './ScoreManager';

const ShootingGame = ({ className = '' }) => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState([]);
  const [showScoreManager, setShowScoreManager] = useState(false);
  const gameRef = useRef(null);

  // ターゲットの生成
  const generateTarget = () => {
    const x = (Math.random() - 0.5) * 8; // -4 から 4
    const y = Math.random() * 3 + 1; // 1 から 4
    const z = Math.random() * 5 - 8; // -8 から -3
    
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
    setShowScoreManager(false);
    
    // 初期ターゲットを生成
    const initialTargets = Array.from({ length: 5 }, () => generateTarget());
    setTargets(initialTargets);
  };

  // ゲーム終了
  const endGame = () => {
    setGameActive(false);
    setShowScoreManager(true);
  };

  // ターゲットをクリックした時の処理
  const handleTargetClick = (targetId) => {
    if (!gameActive) return;
    
    // スコア加算
    setScore(prev => prev + 10);
    
    // ターゲットを削除
    setTargets(prev => prev.filter(target => target.id !== targetId));
    
    // 新しいターゲットを生成
    setTimeout(() => {
      setTargets(prev => [...prev, generateTarget()]);
    }, 1000);
  };

  // ゲーム時間の管理
  useEffect(() => {
    if (!gameActive) return;
    
    const timer = setTimeout(() => {
      endGame();
    }, 60000); // 60秒でゲーム終了
    
    return () => clearTimeout(timer);
  }, [gameActive]);

  // A-Frameのイベントリスナーを設定
  useEffect(() => {
    const scene = document.querySelector('a-scene');
    if (!scene) return;

    const handleTargetClick = (event) => {
      const targetId = event.target.getAttribute('data-target-id');
      if (targetId && gameActive) {
        // スコア加算
        setScore(prev => prev + 10);
        
        // ターゲットを削除
        setTargets(prev => prev.filter(target => target.id.toString() !== targetId));
        
        // 新しいターゲットを生成
        setTimeout(() => {
          setTargets(prev => [...prev, generateTarget()]);
        }, 1000);
      }
    };

    scene.addEventListener('click', handleTargetClick);
    
    return () => {
      scene.removeEventListener('click', handleTargetClick);
    };
  }, [gameActive, targets]);

  return (
    <div className={className}>
      <div className="game-ui">
        <div className="game-info">
          <h2>🎯 ARシューティングゲーム</h2>
          <div className="score-display">
            <span>スコア: {score}</span>
            <span>残りターゲット: {targets.length}</span>
          </div>
          <div className="game-controls">
            {!gameActive && !showScoreManager && (
              <button onClick={startGame} className="start-btn">
                🎮 ゲーム開始
              </button>
            )}
            {gameActive && (
              <button onClick={endGame} className="end-btn">
                ⏹️ ゲーム終了
              </button>
            )}
          </div>
        </div>
        
        {showScoreManager && (
          <ScoreManager currentScore={score} />
        )}
      </div>

      <a-scene embedded vr-mode-ui="enabled: false">
        {/* カメラ */}
        <a-entity
          camera
          look-controls
          wasd-controls
          position="0 1.6 0"
        >
          {/* カーソル（VR/ARでの操作用） */}
          <a-cursor
            color="#FFFFFF"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: #FFFFFF; shader: flat"
            animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
            animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
            raycaster="objects: .target"
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
            event-set__click="
              _event: click;
              material.color: #FF0000;
              animation.dur: 500;"
            event-set__mouseenter="
              _event: mouseenter;
              scale: 1.2 1.2 1.2;"
            event-set__mouseleave="
              _event: mouseleave;
              scale: 1 1 1;"
          />
        ))}

        {/* 地面 */}
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="10"
          height="10"
          color="#7BC8A4"
        />

        {/* 空 */}
        <a-sky color="#87CEEB" />

        {/* ライティング */}
        <a-light type="ambient" color="#404040" />
        <a-light type="directional" position="0 1 0" color="#ffffff" intensity="0.8" />
      </a-scene>
    </div>
  );
};

export default ShootingGame; 