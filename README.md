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
