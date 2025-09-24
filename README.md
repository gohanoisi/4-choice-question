# Name
4-choice-question

## DEMO
以下のURLでデモ可能
- GitHub Pages: https://gohanoisi.github.io/4-choice-question/  
<img width="819" height="483" alt="image" src="https://github.com/user-attachments/assets/03d65314-29a1-42ee-a69b-932d54edf1b7" />


## Features
- JSON駆動の4択クイズ表示（章・問題・選択肢・解説を定義可能）
- 画面上のプルダウンで問題セット（複数JSON）を切り替え
- 「回答を表示/非表示」ボタンで答えと解説をトグル表示
- ダークテーマのシンプルUI（`styles.css`）
- 作問用プロンプト（`prompt.txt`）によりLLMで新傾向・高難度の問題を生成する運用に対応
- GitHub Pagesでそのままホスティング可能（ビルド不要）

## Requirement
- ブラウザ: 最新版 Chrome / Edge / Firefox / Safari  
  ※`file://`直開きは`fetch`制約で動かないため、**HTTPサーバ**で配信してください
- （ローカル動作用・いずれか）  
  - Python 3.x（`python -m http.server`）  
  - Node.js（任意、`npx serve` 等）

## Installation
```
git clone https://github.com/<YOUR_NAME>/4-choice-question.git
cd 4-choice-question
```

プロジェクト直下（`index.html`と同階層）に、問題セットと索引ファイルを配置します。

```
.
├── index.html
├── styles.css
├── script.js
├── problem.json        # ここに“読み込ませたいJSONファイル名一覧”を列挙
├── あんま1.json        # 例: 問題セット
├── あんま2.json        # 例: 問題セット
├── はりきゅう1.json    # 例: 問題セット
└── prompt.txt          # LLM用・作問プロンプト
```

`problem.json` の例:
```json
{
  "files": [
    "あんま1.json",
    "あんま2.json",
    "はりきゅう1.json"
  ]
}
```

**JSONフォーマット（各問題セット）**:
```json
{
  "chapters": [
    {
      "title": "Chapter 1: タイトル",
      "questions": [
        {
          "id": 1,
          "question": "問題文",
          "options": ["選択肢1","選択肢2","選択肢3","選択肢4"],
          "answer": 3,
          "explanation": "解説（正解根拠＋誤答理由）"
        }
      ]
    }
  ]
}
```
- `answer` は **1〜4** の整数を想定
- 文字コードは **UTF-8** を推奨

## Usage
### ローカルで動かす
- **Python**:
  ```
  # プロジェクト直下で
  python -m http.server 8000
  # ブラウザで http://localhost:8000 を開く
  ```
- **Node（任意）**:
  ```
  npx serve -p 8000
  # ブラウザで http://localhost:8000 を開く
  ```

### 使い方（画面操作）
1. 画面上部のプルダウンから `problem.json` に登録済みの問題セット（例: `あんま1.json`）を選択  
2. **「読み込む」**をクリック  
3. 各問題で **「回答を表示」** を押すと、答えと解説が展開・非表示を切り替え

### 問題セットの追加（LLMで作問）
1. `prompt.txt` を使用してLLMにJSON形式の問題を生成させる  
2. 生成したJSONをリポジトリ直下に配置（例: `はりきゅう2.json`）  
3. `problem.json` の`files`配列にファイル名を追記  
4. 画面でプルダウンに新セットが出現することを確認

### GitHub Pagesで公開
1. GitHubにプッシュ  
2. **Settings → Pages** でブランチ（例: `main`）とルートを指定  
3. 発行URL（例: `https://<USER>.github.io/4-choice-question/`）でアクセス

## Note
- **データの権利**: 過去問の引用・二次利用ポリシーに従ってください。必要に応じて、表現を変える・出典を明記する等の配慮を行ってください。  
- **医療系コンテンツの免責**: 本アプリは学習支援目的です。医療行為の判断には用いないでください。  
- **既知の制限/改善余地**
  - スコアリング・正答率集計・進捗保存：**TODO: 実装**  
  - 問題/選択肢のシャッフル：**TODO: 実装**  
  - キーボード操作（アクセシビリティ）：**TODO: 実装**  
  - 大規模JSONのパフォーマンス最適化（分割ロード等）：**TODO: 設計**  
  - モバイル最適化（レスポンシブ微調整）：**TODO: 調整**  
- **セキュリティ/配信**: `fetch` を用いるため、`file://`経由では動作しません。**必ずHTTP/HTTPS配信**で利用してください。  
- **外部サービス**: ランタイムでLLMは不要です。作問時のみ`prompt.txt`を用いたLLM活用を想定（任意）。

## Author
- Author: **gohanoisi**  
- 一言: 友達の国家試験対策のため、LLMで新傾向・高難度の問題を作成し、簡易Webアプリに落とし込みました。  


