//フレームワークはVue.js(2系), API通信用にaxios, グラフ表示にhighchartsを使用
const vm = new Vue({
  el: "#app",
  data: {
    prefecture: [], //[{prefName, prefCode}]
    graphdata: [],
    APIkey: "",
    chart: null,
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
          //サーバーがないとcookieに直接入れるしか方法がわからないが大変良くないことだけは分かる
          document.cookie = `APIkey=${self.APIkey}; Samesite=strict; Secure`;
          let json_pref = res.data.result; //jsonの都道府県名、コード配列
          for (let i = 0; i < json_pref.length; i++) {
            self.prefecture.push(json_pref[i]);
          }
          self.chart = Highcharts.chart("container", {
            // グラフ属性設定
            title: {
              text: "各都道府県の人口推移",
            },
            xAxis: {
              title: {
                text: "年",
              },
              crosshair: true,
            },
            yAxis: {
              title: {
                text: "総人口",
              },
              plotLines: [
                {
                  value: 0,
                  width: 1,
                  color: "#808080",
                },
              ],
            },
            legend: {
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
              borderWidth: 0,
            },
            series: self.graphdata,

            responsive: {
              rules: [
                {
                  condition: {
                    maxWidth: 600,
                  },
                  chartOptions: {
                    legend: {
                      layout: "horizontal",
                      align: "center",
                      verticalAlign: "bottom",
                    },
                  },
                },
              ],
            },
          });
        });
    },
  },
  mounted() {
    //TODO 自動入力処理
    if (document.cookie != "") {
      let arr = new Array(); //cookieを連想配列化
      let tmp = document.cookie.split("; ");
      for (let i = 0; i < tmp.length; i++) {
        let data = tmp[i].split("=");
        arr[data[0]] = decodeURIComponent(data[1]);
      }
      this.APIkey = arr["APIkey"];
    }
  },
});
