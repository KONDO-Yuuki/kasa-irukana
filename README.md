## 環境構築手順

### 動作環境

基本は react-native の公式推奨動作環境で動作します
https://reactnative.dev/docs/environment-setup

なお、一旦 **android 版は開発対象外** としています

#### 必須

- Node.js v16.15.0
- cocoapods v1.11.3(+ ruby 2.7.4)
- watchman
  - `brew install watchman`
- xcode v13.2.1 ~

#### 推奨

- yarn v1.22.18
- react-native-debugger
  - `brew update && brew install --cask `

### ビルド手順

#### ios/開発

```
yarn install
yarn pod
yarn ios
```

#### android/開発

TBD

### 開発手順(Tips)

#### ディレクトリ戦略

├── App.tsx (App /storybook の切り替え / デザイン provider の適用)
├── Navigator.tsx (App 本体のエントリポイント)  
├── components(storybook で管理される view component)  
├── fixtures(test/storybook で利用するフィクスチャ)  
├── redux(redux の store/action/reducer)  
├── screens(各画面のルートコンポーネント)  
└── types (型情報)

- components
  - storybook に登録する View コンポーネント
    - コンポーネント内の非同期通信は禁止
    - state の利用も最低限に留める
  - atomic design を **参考にした** ディレクトリ分割をしています
    - 厳密な分割は意図的にしていません
    - storybook をうまく使い、**再利用する単位で** 適宜分割 / リファクタリングしていきましょう
- screens
  - storybook に登録しない Container コンポーネント
  - API の通信 / state 管理 / redux-store へのアクセスは原則このディレクトリ配下の screen コンポーネントで行う

#### UT / Storybook について

#### UT 実行

`yarn test`

#### Storybook 実行

src/App.tsx の storybook のコメントを外し、`yarn ios`

#### UT の方針

- components
  - storybook への登録をするに留める
    - 複雑性が上がってきたら[story shot](https://kaminashi-developer.hatenablog.jp/entry/expo-storyshots)などの導入を検討
  - 複雑な内部ロジックは切り出して components 内には持たない
- logic(API 呼び出し / cast など)
  - jest による単体テストを作成
  - テストがないファイルがわかりやすいように、`.test.ts`ファイルはテスト対象と同一のディレクトリに設置する戦略を取る
  - カバレッジは一旦指標を定めない

## 参考資料

[design doc 出社するけど傘いるかな](https://docs.google.com/document/d/1toC_Iqz52Kat0aI6zdCgL4pRhGQHeS2KXn16hBKqsR8/edit#)  
※アクセス権限が必要です
