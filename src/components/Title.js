import React from 'react';

function Title({ onStartGame }) {
  return (
    <div className="title-screen">
      <div className="title-content">
        <h1 className="game-title">🎯 3D シューティングゲーム</h1>
        <div className="game-description">
          <p>スマホを動かして3Dターゲットを撃って<br />スコアを競おう！</p>
          <p>30秒間でできるだけ多くのターゲットを<br />撃ち抜いてください！</p>
        </div>
        
        <div className="title-controls">
          <button 
            onClick={onStartGame} 
            className="start-game-btn"
          >
            🎮 ゲーム開始
          </button>
        </div>
        
        <div className="game-instructions">
          <h3>📋 遊び方</h3>
          <ul>
            <li>🎯 3D空間に現れるカラフルな<br />ターゲットをクリック</li>
            <li>⏱️ 制限時間は30秒</li>
            <li>🏆 高スコアを目指して<br />リーダーボードに名を残そう</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Title;
