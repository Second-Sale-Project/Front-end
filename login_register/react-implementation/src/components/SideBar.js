import React from "react"
import "../css/verify.css"
import red from "../images/img/red.jpg"
import black from "../images/img/black.jpg"
import white from "../images/img/white.jpg"
import brown from "../images/img/brown.jpg"
import yellowwhite from "../images/img/yellowwhite.jpg"
import littleblue from "../images/img/littleblue.jpg"
import pink from "../images/img/pink.jpg"
import littlepink from "../images/img/littlepink.jpg"
import grey from "../images/img/grey.jpg"
import yellow from "../images/img/yellow.jpg"
import chanel from "../images/img/chanel.jpg"
import gucci from "../images/img/gucci.jpg"
import hermes from "../images/img/hermes.jpg"
import lv from "../images/img/LV.jpg"
import type1 from "../images/img/type1.jpg"
import type3 from "../images/img/type3.jpg"
import type4 from "../images/img/type4.png"
import type5 from "../images/img/type5.png"
import type6 from "../images/img/type6.jpg"
import type7 from "../images/img/type7.png"
import type8 from "../images/img/type8.jpg"
import type9 from "../images/img/type9.jpg"
import type10 from "../images/img/type10.png"
import type12 from "../images/img/type12.png"

function SideBar(props) {
  return (
    <div className={`sidebar-menu${props.isMenuOpen === true ? " open" : ""}`}>
      <div className="columns is-mobile">
        <div className="column ">
          <button
            type="button"
            className="button small is-outlined is-link is-rounded mt-3 sidebarfinish"
            onClick={props.onMenuToggle}
          >
            跳過
          </button>
        </div>
        <div className="column has-text-right">
          <button
            type="button"
            className="button small is-outlined is-link is-rounded mt-3 sidebarfinish"
            onClick={props.onMenuToggle}
          >
            完成
          </button>
        </div>
      </div>
      <p class="has-text-centered is-size-4">請選擇您喜好的分類</p>
      <div class="link-top"></div>
      <div className="sidebarmiddle">
        <div className="sidebarmiddlefont">顏色</div>
        <img src={red} className="colorCircle"></img>
        <img src={littlepink} className="colorCircle"></img>
        <img src={pink} className="colorCircle"></img>
        <img src={brown} className="colorCircle"></img>
        <img src={yellow} className="colorCircle"></img>
        <img src={yellowwhite} className="colorCircle"></img>
        <img src={littleblue} className="colorCircle"></img>
        <img src={grey} className="colorCircle"></img>
        <img src={white} className="colorCircle"></img>
        <img src={black} className="colorCircle"></img>
        <hr></hr>
        <div className="sidebarmiddlefont">包型</div>
        <img src={type1} className="colorCircle"></img>
        <img src={type3} className="colorCircle"></img>
        <img src={type4} className="colorCircle"></img>
        <img src={type5} className="colorCircle"></img>
        <img src={type6} className="colorCircle"></img>
        <img src={type7} className="colorCircle"></img>
        <img src={type8} className="colorCircle"></img>
        <img src={type9} className="colorCircle"></img>
        <img src={type10} className="colorCircle"></img>
        <img src={type12} className="colorCircle"></img>
        <hr></hr>
        <div className="sidebarmiddlefont">品牌</div>
        <img src={chanel} className="colorCircle"></img>
        <img src={gucci} className="colorCircle"></img>
        <img src={lv} className="colorCircle"></img>
        <img src={hermes} className="colorCircle"></img>
      </div>
    </div>
  )
}
export default SideBar
