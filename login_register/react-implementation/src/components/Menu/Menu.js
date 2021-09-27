import React,{useState} from "react"
import { bool } from "prop-types"
import { StyledMenu } from "./Menu.styled"
import { Link } from "react-router-dom"

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <div class="link-top">
       {(global.auth.getUser() || {}).isStaff === 1 ? (
         <React.Fragment>
         <Link to="/addinventory">上架商品</Link>
         <Link to="/adminorder">訂單查詢</Link>
         </React.Fragment>
       ):
       (
        <React.Fragment>
        <Link to="">商品分類</Link>
        <Link to="/Member">會員專區</Link>
        <Link to="/sub">訂閱方案</Link>
        <Link to="/FAQ">FAQS問與答</Link>
        <Link to="/guide">平台操作指南</Link>
        <Link to="/rules">會員條款</Link>
        <Link to="/verifyGood">防偽驗證頁</Link>
        <Link to="/aboutus">關於我們</Link>
        <Link to="/contact">聯絡我們</Link>
        <Link to="/first">主頁</Link>
         </React.Fragment>
       )
       }
      </div>
    </StyledMenu>
  )
}
Menu.propTypes = {
  open: bool.isRequired,
}
export default Menu
