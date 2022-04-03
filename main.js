//フレームワークはVue.js(2系), API通信用にaxios, グラフ表示にhighchartsを使用
const vm = new Vue({
  el: "#app",
  data: {
    prefecture: [], //[{prefName, prefCode}]
    graphdata: [],
    APIkey: "",
  },
  methods: {
    //TODO チェックをトリガーとしてグラフを更新
  },
  watch: {
    //TODO APIkeyが変更されるたびにRESAS APIにアクセス、県名をゲット
    APIkey: function () {
      const self = this;
      axios
        .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
          headers: {
            "X-API-KEY": self.APIkey,
          },
        })
        .then(function (res) {
          let json_pref = res.data.result; //jsonの都道府県名、コード配列
          for (let i = 0; i < json_pref.length; i++) {
            self.prefecture.push(json_pref[i]);
          }
        });
    },
  },
  mounted() {
    //TODO 自動入力処理
  },
});
