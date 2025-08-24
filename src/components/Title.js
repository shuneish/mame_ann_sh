import React from 'react';

function Title({ onStartGame }) {
  return (
    <div className="title-screen">
      <div className="title-content">
        <h1 className="game-title">🎯 ARシューティングゲーム</h1>
        <div className="game-description">
          <p>VR/ARモードで3Dターゲットを撃ってスコアを競おう！</p>
          <p>60秒間でできるだけ多くのターゲットを撃ち抜いてください</p>
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
            <li>🎯 3D空間に現れるカラフルなターゲットをクリック</li>
            <li>⏱️ 制限時間は60秒</li>
            <li>🏆 高スコアを目指してリーダーボードに挑戦</li>
            <li>📱 スマートフォンではARモードで遊べます</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Title;
