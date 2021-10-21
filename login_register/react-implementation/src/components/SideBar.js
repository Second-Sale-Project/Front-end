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
import axios from "commons/axios"

function SideBar(props) {
  //-----------------------color function---------------------------
  function LikeColorgrey() {
    const likeColor = "grey"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("grey").style.borderStyle === "solid") {
          document.getElementById("grey").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("grey").style.borderStyle = "solid"
        }
      })
  }
  function LikeColoryellow() {
    const likeColor = "yellow"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("yellow").style.borderStyle === "solid") {
          document.getElementById("yellow").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("yellow").style.borderStyle = "solid"
        }
      })
  }
  function LikeColorRed() {
    const likeColor = "red"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("red").style.borderStyle === "solid") {
          document.getElementById("red").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("red").style.borderStyle = "solid"
        }
      })
  }
  function LikeColorlittlepink() {
    const likeColor = "littlepink"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("littlepink").style.borderStyle === "solid") {
          document.getElementById("littlepink").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("littlepink").style.borderStyle = "solid"
        }
      })
  }
  function LikeColoryellowwhite() {
    const likeColor = "yellowwhite"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("yellowwhite").style.borderStyle === "solid") {
          document.getElementById("yellowwhite").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("yellowwhite").style.borderStyle = "solid"
        }
      })
  }
  function LikeColorlittleblue() {
    const likeColor = "littleblue"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("littleblue").style.borderStyle === "solid") {
          document.getElementById("littleblue").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("littleblue").style.borderStyle = "solid"
        }
      })
  }
  function LikeColorbrown() {
    const likeColor = "brown"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("brown").style.borderStyle === "solid") {
          document.getElementById("brown").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("brown").style.borderStyle = "solid"
        }
      })
  }
  function LikeColorblack() {
    const likeColor = "black"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("black").style.borderStyle === "solid") {
          document.getElementById("black").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("black").style.borderStyle = "solid"
        }
      })
  }
  function LikeColorwhite() {
    const likeColor = "white"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("white").style.borderStyle === "solid") {
          document.getElementById("white").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("white").style.borderStyle = "solid"
        }
      })
  }
  function LikeColorpink() {
    const likeColor = "pink"
    const user = global.auth.getUser() || {}
    const email = user.email
    axios
      .post(`http://140.117.71.141:3001/api/LikeColorChange`, {
        likeColor,
        email,
      })
      .then((res) => {
        console.log(res)
        if (document.getElementById("pink").style.borderStyle === "solid") {
          document.getElementById("pink").style.borderStyle = "none"
          axios.post(`http://140.117.71.141:3001/api/LikeColorDelete`, {
            likeColor,
            email,
          })
        } else {
          document.getElementById("pink").style.borderStyle = "solid"
        }
      })
  }
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
        <img id="red" src={red} className="colorCircle" onClick={LikeColorRed}></img>
        <img id="littlepink" src={littlepink} className="colorCircle" onClick={LikeColorlittlepink}></img>
        <img id="pink" src={pink} className="colorCircle" onClick={LikeColorpink}></img>
        <img id="brown" src={brown} className="colorCircle" onClick={LikeColorbrown}></img>
        <img id="yellow" src={yellow} className="colorCircle" onClick={LikeColoryellow}></img>
        <img id="yellowwhite" src={yellowwhite} className="colorCircle" onClick={LikeColoryellowwhite}></img>
        <img id="littleblue" src={littleblue} className="colorCircle" onClick={LikeColorlittleblue}></img>
        <img id="grey" src={grey} className="colorCircle" onClick={LikeColorgrey}></img>
        <img id="white" src={white} className="colorCircle" onClick={LikeColorwhite}></img>
        <img id="black" src={black} className="colorCircle" onClick={LikeColorblack}></img>
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
