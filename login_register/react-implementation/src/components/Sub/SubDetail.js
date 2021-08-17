import React from 'react';

export default function SubList(props) {
    return (
        <React.Fragment>
            <div>
                <button onClick={props.List}>上一頁</button>
            </div>

            <div className="w100per padl5 fontlarge fontbold martb20px">訂閱方案 &gt; 方案A</div>
            <div className="sub">
                <p className="fontlarge fontbold">方案A</p>
                <p className="fontlarge">條列好處1</p>
                <p className="fontlarge">條列好處2</p>
                <p className="fontlarge">條列好處3</p>
                <p className="fontlarge">條列好處4</p>
            </div>
            <div className="blockarea">
                <div className="block">
                    <div className="blockwrap fontbold fontxlarge fontoblique">
                        $4000<br/>TWD
                    </div>
                </div>
                <div className="middleblankforblock"></div>
                <div className="block vertical-align-top">
                    <div className="blockwrap fontbold fontxlarge fontoblique">
                        <p>1 month</p>
                    </div>
                </div>
            </div>
            <div className="btnarea">
                <button className="subbtn">前往支付</button>
            </div>

        </React.Fragment>
    );
}