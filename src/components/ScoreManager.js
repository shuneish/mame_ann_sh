import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

function ScoreManager({ currentScore = 0, onScoreUpdate, onBackToTitle, onReplayGame }) {
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // リーダーボードの取得
  const fetchLeaderboard = async () => {
    if (!db) {
      console.warn('Firebase not initialized');
      return;
    }
    
    try {
      const q = query(collection(db, 'scores'), orderBy('score', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const scores = [];
      querySnapshot.forEach((doc) => {
        scores.push({ id: doc.id, ...doc.data() });
      });
      setLeaderboard(scores);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // エラー時は空の配列を設定
      setLeaderboard([]);
    }
  };

  // スコアの保存
  const saveScore = async () => {
    if (!playerName.trim()) {
      alert('プレイヤー名を入力してください');
      return;
    }

    if (!db) {
      alert('Firebaseが初期化されていません。Firestore Databaseが有効化されているか確認してください。');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'scores'), {
        playerName: playerName.trim(),
        score: currentScore,
        timestamp: new Date(),
        gameMode: 'AR-Shooting'
      });
      
      setPlayerName('');
      fetchLeaderboard(); // リーダーボードを更新
      alert('スコアが保存されました！');
    } catch (error) {
      console.error('Error saving score:', error);
      alert('スコアの保存に失敗しました。Firestore Databaseが有効化されているか確認してください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // コンポーネントマウント時にリーダーボードを取得
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="score-manager">
      <div className="current-score">
        <h3>現在のスコア: {currentScore}</h3>
      </div>
      
      <div className="score-submission">
        <input
          type="text"
          placeholder="プレイヤー名を入力"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={20}
        />
        <button 
          onClick={saveScore} 
          disabled={isSubmitting || !playerName.trim()}
        >
          {isSubmitting ? '保存中...' : 'スコアを保存'}
        </button>
      </div>

      <div className="leaderboard">
        <h3>🏆 リーダーボード</h3>
        <div className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <div key={entry.id} className="leaderboard-item">
              <span className="rank">#{index + 1}</span>
              <span className="player-name">{entry.playerName}</span>
              <span className="score">{entry.score}</span>
            </div>
          ))}
        </div>
        <button onClick={fetchLeaderboard} className="refresh-btn">
          🔄 更新
        </button>
        <div className="score-manager-controls">
          {onReplayGame && (
            <button onClick={onReplayGame} className="replay-btn">
              🎮 もう一度プレイ
            </button>
          )}
          {onBackToTitle && (
            <button onClick={onBackToTitle} className="back-to-title-btn">
              🏠 タイトルに戻る
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreManager; 