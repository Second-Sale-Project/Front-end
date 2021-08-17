import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function MemberSub(props) {
    return (
        <React.Fragment>
            <div className="w100per padl5 fontlarge martb20px">
                <h1 className="fontbold">目前訂閱方案</h1>
            </div>
            <Link to="/sub" >
                <div type="button" className="sub h150px verticalcenter bgcolorformembersub borderbold fontxxlarge fontbold fontcolorwhite">方案A</div>
            </Link>
            <div className="w100per martb30px marl10per positionrelative">
                <span>訂閱方案</span>
                <span className="staycenter">方案A</span><br/>
                <span>到期日</span>
                <span className="staycenter">2021/12/31</span>
            </div>
            <div className="link-top"></div>
            <div className="w100per martb30px textcenter">
                <div className="w35per inlineblock">
                    <div className="box has-text-centered">
                        <span className="title">方案B</span>
                    </div>
                </div>
                <div className="middleblankforblock"></div>
                <div className="w35per inlineblock">
                    <div className="box has-text-centered">
                        <span className="title">方案C</span>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}