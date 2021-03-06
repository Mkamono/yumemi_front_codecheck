# 株式会社ゆめみ　フロントエンド試験

## ○ 概要

RESAS API から動的にグラフを生成します

## ○ 使用技術

- Vue.js (2.6.14, development mode)
- axios
- highcharts

## ○ 作者

金沢大学二年
鴨野誠

## ○ 考えていたこと

### **✓ 要件について**

簡単に整理すると、以下のような要件だった。

1. とにかく満たせばいい系

- 都道府県一覧および総人口情報は RESAS API のデータを用いること
- グラフは Highcharts や Rechart.js などのサードパーティ製のグラフライブラリを用いて描画すること。ただし、グラフライブラリは上記のものに限らず、任意のものを用いてよい
- Google Chrome 最新版で正しく動くこと
- PC/スマートフォン表示に対応すること(レスポンシブデザイン対応)。ただし実機でなく、Google Chrome の検証ツールで確認できればよい
- リンターやフォーマッターを適切に設定すること。リンターには ESLint、フォーマッターには Prettier を使用すること
- style は自分で記述し、CSS・UI フレームワークなどは原則使用しないこと
- RESAS API の利用登録(無料)を行い、API Key を発行する必要がある
- ソースコードは Git で管理し、作成したソースコードは GitHub にアップロードすること
- Netlify / GitHub Pages / Firebase hosting / Vercel 等のホスティングサービスにデプロイし、インターネット経由で閲覧できる状態にし、その URL を提出時に共有すること

2. 程度が分からない系

- セキュリティを考慮してコードを記述すること
- アプリのコンポーネント粒度の設計、Git コミットメッセージやコミット粒度、ドキュメンテーション等もレビュー対象となる
- チーム開発を意識してコードを記述すること

2 の程度がわからない項目が一番神経を使った部分であるし、もやもやしたまま提出している。以下で自分が詰まったところを挙げていく。

### **✓ どの javascript フレームワークを選ぶか**

javascript(バニラ、jQuery)の経験は、二ヶ月程度の長期インターンで初めて触り、chrome 拡張機能を細々と作っていた程度なのであまり縁がなかった部分である。選ぶにあたって、ドキュメントのわかりやすさ、検索のしやすさに重点をおいた結果、Vue.js の 2 系が公式ドキュメントもわかりやすく、かつ情報が多い、学習コストが少ないと判断したので技術として Vue.js を使用した。

### **✓ セキュリティを考慮するとは**

今回は静的ホスティングサービスでサーバー通信が(ほぼ)ないので、セキュリティとして守るべき部分は自分が得た API キーの管理だろうと思った。この課題の中でもキーの扱い方は何度も変えてしまっている。
<br>
初期：input タグから取得　 → 　流石にソースコードにキーを書くのはやばいだろうと思った
<br>
第二：cookie から取得　 → 　自動入力処理の実装に必要だった
<br>
第三：cookie から取得(Samesite, Secure を設定)　 → 　せめてものセキュリティをと思い...
<br>
最終：URL パラメータから取得　 → 　 cookie に API キーが直接見えてるのもまずいので、決まった URL からしか動作しないようにした

URL にキーが見えてるのも個人的にはどうかと思うが、サーバーサイドの実装なしにはこれ以上は厳しいのではないかと思った。

### **✓ コミットの粒度**

これはいくら考えても、調べても自分の中ですっきりしないので実務の中で吸収していけたらと思う。

### **✓ チーム開発を意識**

チーム開発をまともにしたことがないので確証はないが、各コミットの段階でとりあえず動作することを前提において開発した。後々実装したい部分は TODO を残すなどして、他人が開発する＝全て忘れた自分が見る、という意識でコメントなどを書いた。

## 課題の取組状況について

- 完了までにかかった時間：20 時間程度(学習時間含む)
- これまでのプログラミング歴：1 年半
- フロントエンド開発歴：3 ヶ月
