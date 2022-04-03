//フレームワークはVue.js(2系), API通信用にaxios, グラフ表示にhighchartsを使用
const vm = new Vue({
  el: "#app",
  data: { prefecture: [], graphdata: [], APIkey: "" },
  methods: {
    //TODO チェックをトリガーとしてグラフを更新
  },
  watch: {
    //TODO APIkeyが変更されるたびにRESAS APIにアクセス、県名をゲット
  },
  mounted() {
    //TODO 自動入力処理
  },
});
