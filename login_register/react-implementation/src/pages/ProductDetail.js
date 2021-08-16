import React, { useState } from 'react';
import Detail from '../images/Detail.png'
import Heart from "react-heart";
import Contact from '../images/contact.png'
import Favorites from 'components/Favorite/Favorites';
import { Link } from 'react-router-dom';
import Layout from 'Layout';
export default function UserProfile(props) {
    const [active, setActive] = useState(true);

    return (
        <React.Fragment>
            <Layout>
            <div className="has-text-centered">
                <figure className="imageindetail">
                    <img src={Detail} width="100%"/>
                </figure>
                <div className="columns is-mobile">
                    <div className="column mt-3 ml-3 has-text-left">
                        <strong>美品《Christian Dior 藍色Oblique 提花布 24公分 30 MONTAIGNE 斜背包》</strong>
                    </div>
                </div>
            </div>
            <p className="has-text-right mr-6"><strong>原價 $15000</strong></p>
            <div className="w100per">
                <div className="inlineblock vertical-align-center w50per padl5">
                    <span class="icon vertical-align-bottom">
                        <Heart isActive={active} onClick={() => setActive(!active)} />
                    </span>
                    <div className="middleblank"></div>
                    <span class="icon vertical-align-bottom">
                        <img src={Contact} />
                    </span>
                </div>
                <div className="inlineblock vertical-align-center w50per textright padr13">
                    <strong>買斷 $50000</strong>
                </div>
            </div>
            <div className="link-top"></div>
            <div className="content ml-4 mt-3">
                <h1 className="content is-large">商品資訊</h1>
            </div>

            <div className="productdetail">
                <div class="item1">商品編號：</div>
                <div class="item2">1111</div>
            </div>
            <div className="productdetail">
                <div class="item1">商品尺寸：</div>
                <div class="item2">L號</div>
            </div>
            <div className="productdetail">
                <div class="item1">商品敘述：</div>
                <div class="item2">Hello</div>
            </div>
            <div className="productdetail">
                <div class="item1">附有配件備註：</div>
                <div class="item2">可出租</div>
            </div>
            <div className="blankspace"></div>
            <div className="link-top"></div>
            <div className="btnarea">
                <Link to="/cartUpdate">
                    <button class="btnindetail">確定租用</button>
                </Link>
                <div className="middleblank"></div>
                <Link to="/cartUpdate">
                    <button class="btnindetail">確定買斷</button>
                </Link>
            </div>
            <div className="link-top"></div>
            <p className="has-text-centered mt-2">您可能喜歡 ...</p>
            <Favorites />
            </Layout>
        </React.Fragment>

    );
}