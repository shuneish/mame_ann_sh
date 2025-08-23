# A-Frame React TypeScript Demo

VR/AR 3Dシーンを体験できるReact + TypeScriptアプリケーションです。A-FrameとReactを組み合わせて、インタラクティブな3Dコンテンツを作成できます。

## 機能

- **基本シーン**: シンプルな3Dオブジェクトの表示
- **インタラクティブシーン**: クリックで色や位置が変わるオブジェクト
- **VRシーン**: VRヘッドセット対応のシーン
- **TypeScript対応**: 型安全な開発環境

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
- **TypeScript**: 型安全なJavaScript
- **A-Frame**: WebVR/WebARフレームワーク
- **aframe-react**: A-FrameとReactの統合ライブラリ

## プロジェクト構成

```
src/
├── components/
│   ├── AFrameScene.tsx       # 基本的な3Dシーン
│   ├── InteractiveScene.tsx  # インタラクティブな3Dシーン
│   ├── VRScene.tsx          # VR対応の3Dシーン
│   └── CustomBox.tsx        # 再利用可能な3Dボックスコンポーネント
├── App.tsx                  # メインアプリケーション
├── App.css                 # スタイルシート
└── index.tsx               # エントリーポイント
```

## 主な機能

- **3Dシーン**: A-Frameを使用したVR/AR対応の3Dシーン
- **インタラクティブ要素**: クリック可能な3Dオブジェクト
- **アニメーション**: 回転アニメーション付きのオブジェクト
- **レスポンシブデザイン**: モバイルデバイス対応

## 使用方法

### 基本的なA-Frameコンポーネント

```tsx
import { Entity, Scene } from 'aframe-react';

const MyScene = () => (
  <Scene>
    <Entity
      geometry={{ primitive: 'box' }}
      position="0 0 -3"
      material={{ color: '#4CC3D9' }}
    />
  </Scene>
);
```

### カスタムコンポーネント

```tsx
import CustomBox from './components/CustomBox';

const App = () => (
  <div>
    <CustomBox 
      position="0 0 -3" 
      color="#FF0000" 
      size={2}
      onClick={() => console.log('Clicked!')}
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
- **TypeScript**: 型安全な開発
- **A-Frame**: WebVR/WebARフレームワーク
- **aframe-react**: A-FrameとReactの統合

## 参考資料

- [A-Frame公式ドキュメント](https://aframe.io/docs/)
- [aframe-react](https://github.com/supermedium/aframe-react)
- [React公式ドキュメント](https://react.dev/) 