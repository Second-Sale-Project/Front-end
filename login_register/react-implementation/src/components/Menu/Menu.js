import React, { useState, useEffect } from "react"
import { bool } from "prop-types"
import { StyledMenu } from "./Menu.styled"
import { Link } from "react-router-dom";
import axios from "commons/axios";


const SideMenu = ({ open }) => {
    const [subMenu, setSubMenu] = useState(0);
    const [brand, setBrand] = useState([]);
    const [color, setColor] = useState([]);
    const [type, setType] = useState([]);
    const [typeOfClassify, setTypeOfClassify] = useState([]);

    const toSub = (key) => {
        setSubMenu(subMenu + 1);
        if (key == 'brand') {
            setTypeOfClassify(brand);
        }
        else if (key == 'color') {
            setTypeOfClassify(color);
        }
        else if (key == 'type') {
            setTypeOfClassify(type);
        }
    }

    const goBack = () => {
        setSubMenu(subMenu - 1);
    }

    const resetMenu = () => {
        setSubMenu(0);
    }

    const RequestBrand = async () => {
        try {
            const result = await axios.get("http://140.117.71.141:3001/api/getBrand")
            setBrand(result.data)

        } catch (err) {
            console.error(err)
        }
    }

    const RequestColor = async () => {
        try {
            const result = await axios.get("http://140.117.71.141:3001/api/getColor")
            setColor(result.data)

        } catch (err) {
            console.error(err)
        }
    }

    const RequestType = async () => {
        try {
            const result = await axios.get("http://140.117.71.141:3001/api/getType")
            setType(result.data)

        } catch (err) {
            console.error(err)
        }
    }



    useEffect(() => {
        RequestBrand();
        RequestColor();
        RequestType();
    }, [])

    return (
        <StyledMenu open={open}>
            <div class="link-top">

                {(global.auth.getUser() || {}).isStaff === 1 &&
                    <React.Fragment>
                        <Link to="/addinventory">上架商品</Link>
                        <Link to="/adminorder">訂單查詢</Link>
                    </React.Fragment>
                }

                {subMenu == 0 && !(global.auth.isLogin()) &&
                    <React.Fragment>
                        <Link onClick={() => toSub()}>商品分類 <i class="fas fa-chevron-right"></i></Link>
                        <Link to="/Member">會員專區</Link>
                        <Link to="/sub">訂閱方案</Link>
                        <Link to="/FAQ">FAQS問與答</Link>
                        <Link to="/guide">平台操作指南</Link>
                        <Link to="/rules">會員條款</Link>
                        <Link to="/verifyGood">防偽驗證頁</Link>
                        <Link to="/aboutus">關於我們</Link>
                        <Link to="/contact">聯絡我們</Link>
                        <Link to="/first">主頁</Link>
                    </React.Fragment>}

                {subMenu == 1 && !(global.auth.isLogin()) &&
                    <React.Fragment>
                        <Link  onClick={() => goBack()}><i class="fas fa-chevron-left"></i></Link>
                        <Link  onClick={() => toSub('brand')} >品牌 <i class="fas fa-chevron-right"></i></Link>
                        <Link  onClick={() => toSub('color')}> 顏色 <i class="fas fa-chevron-right"></i></Link>
                        <Link  onClick={() => toSub('type')}> 類型 <i class="fas fa-chevron-right"></i></Link>
                    </React.Fragment>}

                {subMenu == 2 && !(global.auth.isLogin()) &&
                    <React.Fragment>
                        <Link onClick={() => goBack()}><i class="fas fa-chevron-left"></i></Link>
                        {typeOfClassify.map(t => {

                            return (
                                <div className="">
                                    <Link
                                        to={{
                                            pathname: "/classification",
                                            state: {
                                                classify: t,
                                            }
                                        }}
                                    >
                                    
                                        {t.classify}
                                    </Link>
                                </div>


                            );
                        })}
                    </React.Fragment>}

                {subMenu == 0 && (global.auth.getUser() || {}).isStaff === 0 &&
                    <React.Fragment>
                        <Link onClick={() => toSub()}>商品分類 <i class="fas fa-chevron-right"></i></Link>
                        <Link to="/Member">會員專區</Link>
                        <Link to="/sub">訂閱方案</Link>
                        <Link to="/FAQ">FAQS問與答</Link>
                        <Link to="/guide">平台操作指南</Link>
                        <Link to="/rules">會員條款</Link>
                        <Link to="/verifyGood">防偽驗證頁</Link>
                        <Link to="/aboutus">關於我們</Link>
                        <Link to="/contact">聯絡我們</Link>
                        <Link to="/first">主頁</Link>
                    </React.Fragment>}

                {subMenu == 1 && (global.auth.getUser() || {}).isStaff === 0 &&
                    <React.Fragment>
                         <Link  onClick={() => goBack()}><i class="fas fa-chevron-left"></i></Link>
                        <Link  onClick={() => toSub('brand')} >品牌 <i class="fas fa-chevron-right"></i></Link>
                        <Link  onClick={() => toSub('color')}> 顏色 <i class="fas fa-chevron-right"></i></Link>
                        <Link  onClick={() => toSub('type')}> 類型 <i class="fas fa-chevron-right"></i></Link>
                    </React.Fragment>}

                {subMenu == 2 && (global.auth.getUser() || {}).isStaff === 0 &&
                     <React.Fragment>
                     <Link onClick={() => goBack()}><i class="fas fa-chevron-left"></i></Link>
                     {typeOfClassify.map(t => {

                         return (
                             <div className="">
                                 <Link
                                     to={{
                                         pathname: "/classification",
                                         state: {
                                             classify: t,
                                         }
                                     }}
                                 >
                                 
                                     {t.classify}
                                 </Link>
                             </div>


                         );
                     })}
                 </React.Fragment>}

            </div>
        </StyledMenu>
    )
}
SideMenu.propTypes = {
    open: bool.isRequired,
}
export default SideMenu
