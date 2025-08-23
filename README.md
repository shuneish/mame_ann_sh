# A-Frame React JavaScript Demo

VR/AR 3Dシーンを体験できるReact + JavaScriptアプリケーションです。A-FrameとReactを組み合わせて、インタラクティブな3Dコンテンツを作成できます。

## 機能

- **基本シーン**: シンプルな3Dオブジェクトの表示
- **インタラクティブシーン**: クリックで色や位置が変わるオブジェクト
- **VRシーン**: VRヘッドセット対応のシーン
- **JavaScript**: シンプルで軽量な開発環境

## 開発環境の構築

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm start
```

ブラウザで `http://localhost:3000` を開いてアプリケーションを確認できます。

### 3. ビルド

```bash
npm run build
```

## 使用技術

- **React 18**: UIライブラリ
- **JavaScript**: 軽量で高速な開発
- **A-Frame**: WebVR/WebARフレームワーク
- **CDN版A-Frame**: 動的読み込みによる最適化

## プロジェクト構成

```
src/
├── components/
│   ├── AFrameScene.js        # 基本的な3Dシーン
│   ├── InteractiveScene.js   # インタラクティブな3Dシーン
│   ├── VRScene.js           # VR対応の3Dシーン
│   └── CustomBox.js         # 再利用可能な3Dボックスコンポーネント
├── App.js                   # メインアプリケーション
├── App.css                 # スタイルシート
└── index.js                # エントリーポイント
```

## 主な機能

- **3Dシーン**: A-Frameを使用したVR/AR対応の3Dシーン
- **インタラクティブ要素**: クリック可能な3Dオブジェクト
- **アニメーション**: 回転アニメーション付きのオブジェクト
- **レスポンシブデザイン**: モバイルデバイス対応
- **動的A-Frame読み込み**: CDNからA-Frameを動的に読み込み

## 使用方法

### 基本的なA-Frameコンポーネント

```jsx
const MyScene = () => (
  <a-scene>
    <a-box
      position="0 0 -3"
      color="#4CC3D9"
      animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
    />
  </a-scene>
);
```

### カスタムコンポーネント

```jsx
import CustomBox from './components/CustomBox';

const App = () => (
  <div>
    <CustomBox 
      position="0 0 -3" 
      color="#FF0000" 
      size="2 2 2"
    />
  </div>
);
```

## デプロイ

### Vercelでのデプロイ

1. Vercelにプロジェクトを接続
2. ビルド設定:
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`

### その他のプラットフォーム

```bash
npm run build
```

ビルドされたファイルは `build/` ディレクトリに生成されます。

## 技術スタック

- **React 18**: UIライブラリ
- **JavaScript**: 軽量で高速な開発
- **A-Frame**: WebVR/WebARフレームワーク
- **CDN版A-Frame**: 動的読み込みによる最適化

## 変更履歴

- **v2.0**: TypeScriptからJavaScriptに変更、A-FrameをCDNから動的読み込みに変更
- **v1.0**: 初期リリース（TypeScript版）

## 参考資料

- [A-Frame公式ドキュメント](https://aframe.io/docs/)
- [React公式ドキュメント](https://react.dev/)
- [A-Frame CDN](https://aframe.io/releases/) 