# ARシューティングゲーム 🎯

A-Frame + React + WASMで構築された高速ARシューティングゲームです。

## 🚀 特徴

- **A-Frame**: WebVR/AR対応の3Dフレームワーク
- **WASM加速**: Rustで書かれた高速物理演算エンジン
- **360度ターゲット**: 全方位にランダムに出現するターゲット
- **AR対応**: 現実世界の背景に3Dターゲットを重ね表示
- **リアルタイム物理演算**: 60FPSでの高速な衝突判定とターゲット更新

## 🛠️ 技術スタック

- **フロントエンド**: React 18, A-Frame 1.4.2
- **AR**: AR.js
- **高速演算**: WebAssembly (Rust)
- **バックエンド**: Firebase
- **デプロイ**: Vercel

## ⚡ WASM高速化機能

- **高速ターゲット生成**: 360度全方位のランダム配置をWASMで高速化
- **高速衝突判定**: レイキャスティングによる衝突判定をWASMで最適化
- **高速物理演算**: ターゲットの回転・移動を60FPSで処理
- **フォールバック対応**: WASM読み込み失敗時はJavaScriptで動作

## 🎮 ゲームプレイ

1. **ゲーム開始**: 「🎮 ゲーム開始」ボタンをクリック
2. **ターゲット撃破**: 3Dターゲットをクリック/タップして撃破
3. **スコア獲得**: 1ターゲット撃破で10ポイント獲得
4. **時間制限**: 10秒間でできるだけ多くのターゲットを撃破
5. **スコア記録**: ゲーム終了後にFirebaseにスコアを保存

## 🚀 セットアップ

### 前提条件

- Node.js 16以上
- Rust (WASMビルド用)
- wasm-pack

### インストール

```bash
# 依存関係のインストール
npm install

# WASMモジュールのビルド
npm run build:wasm

# 開発サーバーの起動
npm start
```

### ビルド

```bash
# 本番ビルド（WASM + React）
npm run build

# WASMのみ開発ビルド
npm run dev:wasm
```

## 📁 プロジェクト構造

```
src/
├── components/
│   ├── ShootingGame.js    # メインゲームコンポーネント
│   ├── ScoreManager.js    # スコア管理
│   └── ...
├── wasm/
│   ├── src/
│   │   └── lib.rs         # Rust WASMモジュール
│   ├── Cargo.toml         # Rust依存関係
│   ├── package.json       # WASMビルド設定
│   └── wasm-loader.js     # WASM-JavaScript統合
└── ...
```

## 🔧 WASMモジュール機能

### GamePhysics (Rust)
- `generate_target()`: 高速ターゲット生成
- `check_collision()`: 高速衝突判定
- `remove_target()`: ターゲット削除
- `update_targets()`: 高速ターゲット更新

### WasmGamePhysics (JavaScript)
- WASMモジュールのローダー
- A-Frameとの統合
- フォールバック機能

## 🎯 パフォーマンス

- **WASM有効時**: 60FPSでの高速物理演算
- **WASM無効時**: JavaScriptフォールバック
- **ターゲット生成**: 360度全方位ランダム配置
- **衝突判定**: リアルタイムレイキャスティング

## 🌐 ブラウザ対応

- Chrome 67+
- Firefox 60+
- Safari 11.1+
- Edge 79+

## 📱 AR対応

- AR.jsによる現実世界背景表示
- カメラ映像との統合
- タッチ/クリック操作対応

## 🔄 開発フロー

1. **WASM開発**: `src/wasm/src/lib.rs`を編集
2. **WASMビルド**: `npm run dev:wasm`
3. **React開発**: `src/components/`を編集
4. **テスト**: `npm start`でローカルテスト
5. **デプロイ**: `npm run build`で本番ビルド

## 🐛 トラブルシューティング

### WASMが読み込まれない場合
```bash
# Rustツールチェーンの確認
rustc --version
wasm-pack --version

# WASMモジュールの再ビルド
npm run build:wasm
```

### ARが動作しない場合
- HTTPS接続を確認
- カメラ権限を許可
- ブラウザのAR対応を確認

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 