//フレームワークはVue.js(2系), API通信用にaxios, グラフ表示にhighchartsを使用
const vm = new Vue({
  el: "#app",
  data: {
    prefectures: [], //[{prefName, prefCode}]
    graphdata: [], //[{data, name}]
    APIkey: "",
    chart: null,
    showform: true,
  },
  methods: {
    //チェックをトリガーとしてグラフを更新
    updateGraph: function (event, prefecture) {
      const self = this;
      if (event.target.checked) {
        //追加時の処理
        self.judgeRes(
          self,
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefecture.prefCode}`,
          function (res, self) {
            //成功時処理
            let result = res.data.result;
            let arraydata = []; //調査年、人口数の配列
            for (let index = 0; index < result.data[0].data.length; index++) {
              let element = result.data[0].data[index];
              arraydata.push([element.year, element.value]);
            }
            self.graphdata.push({ name: prefecture.prefName, data: arraydata }); //highchartsのseriesと同じデータ構造で追加
            self.chart.addSeries(self.graphdata.slice(-1)[0]); //graphdata末尾(今追加したデータ)をグラフのシリーズに追加
          }
        );
      } else {
        //削除時の処理
        self.graphdata.forEach(function (element, index) {
          if (element.name == prefecture.prefName) {
            self.chart.series[index].remove(); //グラフから削除
          }
        });
        self.graphdata = self.graphdata.filter(function (element) {
          return element.name != prefecture.prefName; //データも削除
        });
      }
    },
    judgeRes: function (self, url, funcObj) {
      //self:Vueインスタンス, url:GET先, funcObj:通信成功後の処理
      axios
        .get(url, {
          headers: {
            "X-API-KEY": self.APIkey,
          },
        })
        .then(function (res) {
          if (res.status == 200) {
            //ネットワーク正常
            let status = res.data.statusCode;
            if (status == undefined) {
              //API通信成功
              funcObj(res, self);
            } else if (status == "429") {
              //TooManyRequests, リトライ
              self.judgeRes(self, url, funcObj);
            } else {
              //API通信失敗(キーが違うなど), パス
            }
          } else {
            //ネットワーク異常
            alert("[Connection Error]: Please Reload Window");
          }
        });
    },
  },
  watch: {
    //TODO APIkeyが変更されるたびにRESAS APIにアクセス、県名をゲット
    APIkey: function () {
      const self = this;
      self.judgeRes(
        self,
        "https://opendata.resas-portal.go.jp/api/v1/prefectures",
        function (res, self) {
          //成功時処理
          self.showform = false;
          //サーバーがないとcookieに直接入れるしか方法がわからないが大変良くないことだけは分かる
          document.cookie = `APIkey=${self.APIkey}; Samesite=strict; Secure; max-age=3600`;
          let json_pref = res.data.result; //jsonの都道府県名、コード配列
          for (let i = 0; i < json_pref.length; i++) {
            self.prefectures.push(json_pref[i]);
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
            tooltip: {
              formatter: function () {
                let y = Math.trunc(this.y / 10000);
                return `${this.series.name}<br>${this.x}年<br><b>${y}万人</b>`;
              },
            },
            legend: {
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
              borderWidth: 0,
            },
            series: [],

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
        }
      );
    },
  },
  mounted() {
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
