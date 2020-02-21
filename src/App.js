import React, {useRef, useEffect, useState} from 'react';
import PetitionForm from "./PetitionForm"
import InvestmentChart from "./InvestmentChart/InvestmentChart"
import mitt from "mitt";
import cx from "classnames";
import bgVideo from './images/desktop_bg_h265.mp4'

import './App.scss';

window.ee = new mitt();

/**
 * Native scrollTo with callback
 * @param offset - offset to scroll to
 * @param callback - callback function
 */
function scrollTo(offset, callback) {
    const onScroll = function () {
        if (window.pageYOffset === offset) {
            window.removeEventListener('scroll', onScroll)
            callback()
        }
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    })
}

// @see https://stackoverflow.com/questions/6877403/how-to-tell-if-a-video-element-is-currently-playing
function isVideoPlaying (video) {
  return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
}

let browserDesntSupportVideo = false

function App() {
  const mobileFormRef = useRef()

  const handleShowPetitionForm = () => {
    // detect is mobile or now
    let isMobile = window.innerWidth<1024;

    if (isMobile) {
      console.log('mobileFormRef.current.getBoundingClientRect()', mobileFormRef.current.getBoundingClientRect())
      let top = mobileFormRef.current.getBoundingClientRect().top+window.pageYOffset

      scrollTo(top, () => {
        window.ee.emit("FORM_FOCUS_INPUT")
      })
    } else {
      scrollTo(0, () => {
        window.ee.emit("SHOULD_OPEN_FORM")
        window.ee.emit("FORM_FOCUS_INPUT")
      })
    }
  }

  const videoRef = useRef()
  const [videoIsPlaynig, setVideoIsPlaynig] = useState(false)
  useEffect(() => {
    let video = videoRef.current
    if (browserDesntSupportVideo) {
      return;
    }

    if (videoRef.current && !isVideoPlaying(video)) {
      video.play()
        .then(() => {
          // remove the background to hide the image bottom
          setVideoIsPlaynig(true)
        })
        .catch(() => {
          setVideoIsPlaynig(false)
          browserDesntSupportVideo = true
        })
    }
  }, [videoRef])

  return (
    <div className="App">
      <header className={cx("banner", {
        "vide-playing": videoIsPlaynig
      })}>
        <div className="video-wrapper">
          <video id="video" src={bgVideo} autoplay loop muted ref={videoRef}>
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="hero-part">
                <h1>台電，請撤回海外煤炭投資，別讓澳洲大火憾事重演！</h1>
                <img
                  className="go-logo is-hidden-touch"
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

                <img
                  className="go-logo is-hidden-desktop"
                  alt="GREENPEACE 綠色和平"
                  src={require("./images/gplogo.png")}
                  srcSet={`${require("./images/gplogo@2x.png")} 1.5x, ${require("./images/gplogo@3x.png")} 2x`}
                />

                <div className="space-eater is-hidden-desktop"></div>

                <img
                  alt="看更多"
                  className="go-down-icon is-hidden-desktop"
                  src={require("./images/mobile-arrow.png")}
                  srcSet={`${require("./images/mobile-arrow@2x.png")} 1.5x, ${require("./images/mobile-arrow@3x.png")} 2x`}
                />
              </div>
            </div>
            <div className="column is-hidden-touch">
              <PetitionForm />
            </div>
          </div>
        </div>
      </header>

      <section className="mobile-form is-hidden-desktop">
        <div className="container" ref={mobileFormRef}>
          <PetitionForm isOpened={true}/>
        </div>
      </section>

      <section className="content-image-block after-caused-by-climate-part is-hidden-desktop">
      </section>

      <section className="content-block caused-by-climate-section">
        <div className="container">
          <div className="columns">
            <div className="column explain-part">
              <h3 className="section-title"><strong>氣候變遷</strong>助長大火，10 億隻動物無辜殞命</h3>
              <p className="section-text">
                澳洲大火延燒近半年，燃燒面積約 5 個臺灣大，累積至少 8,000 隻無尾熊命喪火窟，10 億隻動物死亡甚至滅絕；另有 3,000 棟房屋燒毀，至少共 34 人喪生，包括 8 位協助滅火救災的消防人員。
              </p>
            </div>

            <div className="column appendix-part">
              <h4>資料來源</h4>
              <ul>
                <li><a href="https://www.greenpeace.org/taiwan/update/12351/%E6%BE%B3%E6%B4%B2%E5%A4%A7%E7%81%AB%E7%9A%845%E5%80%8B%E7%9C%9F%E7%9B%B8%EF%BC%9A%E7%81%AB%E7%81%BD%E5%8E%9F%E5%9B%A0%EF%BC%9F%E6%88%91%E5%80%91%E8%83%BD%E6%80%8E%E9%BA%BC%E5%81%9A%EF%BC%9F/" title="Greenpeace 綠色和平：澳洲大火的 5 個真相">Greenpeace 綠色和平：澳洲大火的 5 個真相</a></li>
                <li> Photo Credit: © Jimboomba Police</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="content-image-block after-caused-by-climate-part is-hidden-touch">
      </section>

      <section className="content-block caused-by-coal-section">
        <div className="container">
          <div className="columns">
            <div className="column is-hidden-desktop">
              <div className="coal-image"></div>
            </div>
            <div className="column explain-part">
              <h3 className="section-title"><strong>煤炭產業</strong>：氣候變遷罪魁禍首</h3>
              <p className="section-text">
                澳洲大火雖然每年發生，但氣候危機讓澳洲在 2019 年迎來<strong>破紀錄的超長乾旱與攝氏 49 度高溫，使得大火發生時間大幅提前，燃燒頻率增加、範圍更廣</strong>。
                <br/><br/>
                煤炭產業是加劇氣候變遷的主要元兇，從 2000 年到 2010 年，全球有將近 80% 的溫室氣體排放增加是來自燃燒化石燃料，其中燃煤發電所產生的溫室氣體比其他任何一種能源都要多*。
              </p>

              <div className="appendix-part">
                <h4>資料來源</h4>
                <ul>
                  <li>*EIA, 2016: Carbon Dioxide Emissions Coefficients. </li>
                </ul>
              </div>
            </div>
            <div className="column is-hidden-touch">
              <img
                className="coal-image"
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
            <h3 className="section-title bigger has-text-centered">台電 — <strong>澳洲班卡拉煤礦場產業幕後金主</strong></h3>

            <div className="is-hidden-touch">
              <p className="section-text has-text-centered is-hidden-touch">
                累積投資金額超過 60 億新台幣
              </p>

              <p className="section-text chart-title">
                台電投資澳洲班卡拉煤礦合資企業累積金額圖表
              </p>
            </div>

            <div className="is-hidden-desktop">
              <h3 className="section-title bigger has-text-centered is-hidden-desktop">
                <strong>累積投資金額超過 60 億新台幣</strong>
              </h3>

              <div className="has-text-left">
                <p className="section-text chart-title">
                  台電投資澳洲班卡拉煤礦合資企業累積金額圖表
                </p>

                <p className="section-text chart-data-source  ">
                  資料來源：台電公司班卡拉煤礦大事記
                </p>
              </div>

            </div>

            <div className="chart-container">
              <InvestmentChart />
            </div>

            <p className="section-text chart-data-source has-text-right is-hidden-touch">
              資料來源：台電公司班卡拉煤礦大事記
            </p>

            <ul className="taipower-history">
              <li>
                <div className="year"><i className="fire"></i><span>1985</span></div>
                <div className="action">台電參與班卡拉煤礦開發投資計畫，投資約<strong> 8 億元新台幣</strong>，取得澳洲班卡拉煤礦 10% 權益。</div>
              </li>
              <li>
                <div className="year"><i className="fire"></i><span>2010</span></div>
                <div className="action">分階段增加投資 <strong>6 億</strong>，再進行第一階段擴產，依權益比例投入資本支出約 1,406 萬澳元（約 10.2 億元新台幣）。</div>
              </li>
              <li>
                <div className="year"><i className="fire"></i><span>2014</span></div>
                <div className="action">台電進行<strong>第二階段擴產</strong>，依權益比例投入資本支出約 259 萬澳元（約 5 千萬元新台幣）。</div>
              </li>
              <li>
                <div className="year"><i className="fire"></i><span>2018</span></div>
                <div className="action">台電出資 2.15 億澳元（約 43 億元新台幣）購得額外 10% 權益，<strong>台電持有之班卡拉煤礦權益佔比自 10% 增為 20%</strong>。</div>
              </li>

            </ul>
        </div>
      </section>

      <section className="content-image-block after-taipower-backed-section">
      </section>

      <section className="content-block call-to-action-setion">
        <div className="container">
          <h3 className="section-title bigger has-text-centered">
            <strong>立即連署</strong> — 要求台電撤回海外煤炭投資
            <br/>停止犧牲環境與氣候來獲利！
          </h3>

          <div className="row section-text">
            <div className="this-icon icon-beach"></div>
            <p className="">相同金額用於再生能源投資<br/>年發電量至少超過 1.8 億度，可供約 5 萬戶家庭整年用電</p>
          </div>

          <div className="row section-text">
            <div className="this-icon icon-hands"></div>
            <p className="">綠色和平會將您的連署轉交台電或用於法律與政策修訂建議，以減少臺灣國營事業對海外煤炭投資。</p>
          </div>

          <button className="button is-primary" onClick={handleShowPetitionForm}>立即連署</button>

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
                <li><a href="https://act.gp/2vLeqOd" target="_blank" alt="回到主頁"><span>回到主頁</span> <i className="fas fa-chevron-right"></i></a></li>
                <li><a href="https://act.gp/32ccqKP" target="_blank" alt="捐助支持"><span>捐助支持</span> <i className="fas fa-chevron-right"></i></a></li>
                <li><a href="https://act.gp/2uXxBnQ" target="_blank" alt="隱私政策與個人資料收集聲明"><span>隱私政策與個人資料收集聲明</span> <i className="fas fa-chevron-right"></i></a></li>
              </ul>
            </div>
          </div>

          <hr className="is-hidden-touch"/>

          <div className="copyright">© 2020 Greenpeace</div>
        </div>
      </footer>

    </div>
  );
}

export default App;
