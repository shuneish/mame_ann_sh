import React, { useEffect, useState } from 'react';
import './App.css';
import Title from './components/Title';
import ShootingGame from './components/ShootingGame';
import ScoreManager from './components/ScoreManager';

function App() {
  const [aframeLoaded, setAframeLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('title'); // 'title', 'game', 'score'
  const [currentScore, setCurrentScore] = useState(0);

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

  // タイトル画面からゲーム開始
  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  // ゲーム終了時にスコア画面に遷移
  const handleGameEnd = (score) => {
    setCurrentScore(score);
    setCurrentScreen('score');
  };

  // スコア画面からタイトルに戻る
  const handleBackToTitle = () => {
    setCurrentScreen('title');
    setCurrentScore(0);
  };

  // スコア画面からゲームを再プレイ
  const handleReplayGame = () => {
    setCurrentScreen('game');
    setCurrentScore(0);
  };

  // 現在の画面をレンダリング
  const renderCurrentScreen = () => {
    if (!aframeLoaded) {
      return <div className="loading">Loading A-Frame...</div>;
    }

    switch (currentScreen) {
      case 'title':
        return <Title onStartGame={handleStartGame} />;
      case 'game':
        return (
          <ShootingGame 
            className="aframe-scene" 
            onGameEnd={handleGameEnd}
          />
        );
      case 'score':
        return (
          <ScoreManager 
            currentScore={currentScore} 
            onBackToTitle={handleBackToTitle}
            onReplayGame={handleReplayGame}
          />
        );
      default:
        return <Title onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className={`App ${currentScreen === 'game' ? 'game-mode' : ''}`}>
      {currentScreen !== 'game' && (
        <header className="App-header">
          <h1>🎯 ARシューティングゲーム</h1>
          <p>A-Frame Status: {aframeLoaded ? 'Loaded' : 'Loading...'}</p>
        </header>
      )}
      <main>
        {renderCurrentScreen()}
      </main>
    </div>
  );
}

export default App; 