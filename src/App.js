import React from 'react';
import './App.scss';

import { LineChart, Line, CartesianGrid, XAxis, YAxis,Label } from 'recharts';

// import LogoText from

const data = [
  {name: '1985', amt: 8},
  {name: '2010', amt: 14},
  {name: '2012', amt: 18.2},
  {name: '2018', amt: 61.2},
];

const CustomizedLabel = (props) => {
  const {
    x,y, stroke, payload, value,
  } = props;

  console.log('this.props.', props)

  return (
    <text x={x} y={y} dy={-50} fill="#FFFFFF" fontSize={34} textAnchor="middle">{value}</text>
  )
};

const CustomizedDot = (props) => {
  const {
    cx, cy, stroke, payload, value,
  } = props;

  return (
    <image key={cx} x={cx - 15} y={cy - 28} width={31} height={38} xlinkHref={require("./images/Desktop_fire.png")} alt="" />
  );
};


function App() {
  return (
    <div className="App">
      <header className="banner">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="hero-part">
                <h1>澳洲大火 台電有責</h1>
                <img
                  className="go-logo"
                  alt="GREENPEACE 綠色和平"
                  src={require("./images/gplogo.png")}
                  srcSet={`${require("./images/gplogo@2x.png")} 1.5x, ${require("./images/gplogo@3x.png")} 2x`}
                />
                <img
                  className="logo-text"
                  alt="澳洲大火 台電有責"
                  src={require("./images/Desktop_typography.png")}
                  srcSet={`${require("./images/Desktop_typography@2x.png")} 1.5x, ${require("./images/Desktop_typography@3x.png")} 2x`}
                />
                <h2 className="title is-3">台電，請撤回海外煤炭投資，為澳洲大火負責！</h2>
              </div>
            </div>
            <div className="column">
              Second column
            </div>
          </div>
        </div>
      </header>

      <section className="content-block caused-by-climate-section">
        <div className="container">
          <div className="columns">
            <div className="column explain-part">
              <h3 className="section-title">澳洲大火最佳助燃劑：<strong>氣候變遷</strong></h3>
              <p className="section-text">
                破紀錄的乾季、逼近<strong>攝氏49度</strong>的高溫，讓澳洲大火在 2019年一反常態延燒半年燃燒面積相當於5個臺灣 2500棟房屋燒毀，10億物種死亡甚至滅絕。
              </p>
            </div>

            <div className="column appendix-part">
              <h4>資料來源</h4>
              <ul>
                <li><a href="https://www.greenpeace.org/taiwan/update/12351/%E6%BE%B3%E6%B4%B2%E5%A4%A7%E7%81%AB%E7%9A%845%E5%80%8B%E7%9C%9F%E7%9B%B8%EF%BC%9A%E7%81%AB%E7%81%BD%E5%8E%9F%E5%9B%A0%EF%BC%9F%E6%88%91%E5%80%91%E8%83%BD%E6%80%8E%E9%BA%BC%E5%81%9A%EF%BC%9F/" title="Greenpeace 綠色和平：澳洲大火的 5 個真相">Greenpeace 綠色和平：澳洲大火的 5 個真相</a></li>
                <li> Photo Credit: © Jimboomba Police .jpeg</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="content-image-block after-caused-by-climate-part">
      </section>

      <section className="content-block caused-by-coal-section">
        <div className="container">
          <div className="columns">
            <div className="column explain-part">
              <h3 className="section-title">氣候變遷與空污元兇之一：<strong>煤炭產業</strong></h3>
              <p className="section-text">
                從2000年到2010年，全球有將近80%的溫室氣體排放增加是來自燃燒化石燃料，特別是煤炭*。其中，燃煤電廠每年排放大量二氧化碳進入大氣中，為全球電力生產排放的二氧化碳主要來源**。
                <br/>
                <br/>
                目前東南亞地區燃煤電廠帶來的空氣污染，已讓每年至少有 2 萬人早死***，而<strong>燃煤電廠排放的大量溫室氣體，更加劇氣候變遷</strong>，讓全球森林大火、熱浪等極端氣候事件強度攀升、情勢更難掌控。
              </p>

              <div className="appendix-part">
                <h4>資料來源</h4>
                <ul>
                  <li>*IPCC. 2014. Climate Change 2014: Mitigation of Climate Change. Contribution of Working Group III to the Fifth Assessm- ent Report of the Intergovernmental Panel on Climate Change. </li>
                  <li>**IEA.2019. Global Energy & CO2 Status Report 2019</li>
                  <li>***Koplitz, S.N et al. 2017. Burden of Disease from Rising Coal-Fired Power Plant Emissions in Southeast Asia. Environmental Science&Technology 2017, 51(3),pp.1467-1476.</li>
                </ul>
              </div>
            </div>
            <div className="column">
              <img
                alt="氣候變遷與空污元兇之一：煤炭產業"
                src={require("./images/Desktop_pic_3.png")}
                srcSet={`${require("./images/Desktop_pic_3@2x.png")} 1.5x, ${require("./images/Desktop_pic_3@3x.png")} 2x`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="content-block taipower-backed-section">
        <div className="container">
            <h3 className="section-title bigger has-text-centered">台電 — <strong>澳洲煤炭幕後金主</strong></h3>
            <p className="section-text has-text-centered">
              累積投資煤炭金額 超過60億新台幣
            </p>

            <p className="section-text chart-title">
              台電投資澳洲班卡拉煤礦合資企業歷年累積金額圖表
            </p>

            <div className="chart-container">
              <LineChart width={900} height={600} data={data} margin={{ top: 70, right: 30, bottom: 20, left: 30 }}>
                <Line
                  type="linear"
                  dataKey="amt"
                  stroke="#eb9062"
                  strokeWidth="3"
                  label={CustomizedLabel}
                  dot={CustomizedDot}/>
                <CartesianGrid
                  stroke="#636363"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  padding={{ left:100, right:100}}
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  tickSize="0"
                  tick={{ transform: 'translate(0, 10)'}}
                  hide={false}/>
                <YAxis
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  ticks={[5,10,50,100]}
                  scale="sqrt"
                  padding={{bottom: 50}}
                  tickSize="0"
                  tick={{ transform: 'translate(-30, 0)'}}
                  name="XXXX"
                  hide={false}>

                  <Label
                    value="(億元)"
                    position="top"
                    offset={40}
                    style={{textAnchor:"end", fontSize: '22px', fill: '#FFFFFF' }}/>
                </YAxis>
              </LineChart>
            </div>

            <p className="section-text chart-data-source has-text-right">
              資料來源：台電公司班卡拉煤礦大事記
            </p>


            <ul className="taipower-history">
              <li>
                <div className="year"><i className="fire"></i><span>1985</span></div>
                <div className="action">台電出資8億元入股成為澳洲班卡拉煤礦合資企業合資人之一，握有<strong>10%股權。</strong></div>
              </li>
              <li>
                <div className="year"><i className="fire"></i><span>2010</span>/10</div>
                <div className="action">台電對澳洲班卡拉煤礦帳面投資累積達14億新台幣。</div>
              </li>
              <li>
                <div className="year"><i className="fire"></i><span>2012</span></div>
                <div className="action">台電完成班卡拉第一階段擴產，依股權比例出資 4.2億新台幣。</div>
              </li>
              <li>
                <div className="year"><i className="fire"></i><span>2018</span></div>
                <div className="action">台電公司再支付澳幣 2.15億元 (約合台幣 43 億元)，取得澳洲班卡拉煤礦合資企業另一合資人出售之權益，目前佔有<strong>20%股權</strong>，為澳洲班卡拉煤礦合資企業<strong>主要投資人之一</strong>。</div>
              </li>

            </ul>
        </div>
      </section>

      <section className="content-image-block after-taipower-backed-section">
      </section>

      <section className="content-block call-to-action-setion">
        <div className="container">
          <h3 className="section-title bigger has-text-centered">
            立即連署 — 要求台電撤回海外煤炭投資 
            <br/>停止犧牲環境與氣候獲利！
          </h3>


          <div className="row section-text">
            <img
              className="go-logo"
              alt="要求台電撤回海外煤炭投資  停止犧牲環境與氣候獲利！"
              src={require("./images/desktop-icon-1.png")}
              srcSet={`${require("./images/desktop-icon-1@2x.png")} 1.5x, ${require("./images/desktop-icon-1@3x.png")} 2x`}
            />

            <p className="">相同金額用於再生能源投資推估可裝設太陽能光電裝置容量 100,000瓩， 供 29,000 戶家庭一年用電所需。 </p>
          </div>

          <div className="row section-text">
            <img
              className="go-logo"
              alt="要求台電撤回海外煤炭投資  停止犧牲環境與氣候獲利！"
              src={require("./images/desktop-icon-1.png")}
              srcSet={`${require("./images/desktop-icon-1@2x.png")} 1.5x, ${require("./images/desktop-icon-1@3x.png")} 2x`}
            />

            <p className="">綠色和平會將您的連署轉交台電或用於法律與政策修訂，以減少臺灣國營事業對海外煤炭投資。</p>
          </div>

          <button className="button is-primary">立即連署</button>

        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column has-text-left gp-part">
                <img
                  className="go-logo"
                  alt="GREENPEACE 綠色和平"
                  src={require("./images/gplogo.png")}
                  srcSet={`${require("./images/gplogo@2x.png")} 1.5x, ${require("./images/gplogo@3x.png")} 2x`}
                />

                <p className="gp-mission">
                  綠色和平致力於為地球發生，我們的存在是因為脆弱的地球需要改變、需要行動。
                  但保護地球的使命不能僅靠綠色和平來完成，「您」就是改變世界的力量！
                </p>
            </div>
            <div className="column links-part">
              <ul className="links">
                <li><a href="#" alt="回到主頁">回到主頁 <i className="fas fa-chevron-right"></i></a></li>
                <li><a href="#" alt="捐助支持">捐助支持 <i className="fas fa-chevron-right"></i></a></li>
                <li><a href="#" alt="隱私政策與個人資料收集聲明">隱私政策與個人資料收集聲明 <i className="fas fa-chevron-right"></i></a></li>
              </ul>
            </div>
          </div>

          <hr/>

          <div className="copyright has-text-right">© 2020 Greenpeace</div>
        </div>
      </footer>

    </div>
  );
}

export default App;
