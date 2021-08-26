import React from "react"
import "../css/verify.css"

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
    </div>
  )
}
export default SideBar
