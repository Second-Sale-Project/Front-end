import React from 'react';

export default function SubList(props) {
    return (
        <React.Fragment>

            <div className="w100per padl5 fontlarge fontbold martb20px">訂閱方案 &gt;</div>
            <div className="w100per">
                <div type="button" onClick={props.Detail} class="sub">
                    <p className="fontlarge fontbold">方案A</p>
                    <p>每月4000起</p>
                </div>
                <div class="sub">
                    <p className="fontlarge fontbold">方案B</p>
                    <p>每月8000起</p>
                </div>
                <div class="sub">
                    <p className="fontlarge fontbold">方案C</p>
                    <p>每月10000起</p>
                </div>
            </div>

        </React.Fragment>
    );
}