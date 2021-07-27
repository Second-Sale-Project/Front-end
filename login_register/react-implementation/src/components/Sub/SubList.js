import React from 'react';

export default function SubList(props) {
    return (
        <React.Fragment>

            <div className="mt-3 ml-3 title">訂閱方案</div>
                <div type="button" onClick={props.Detail}class="box">
                    <p>方案A</p>
                    <p>每月4000起</p>
                </div>
                <div class="box">
                    <p>方案B</p>
                    <p>每月8000起</p>
                </div>
                <div class="box">
                    <p>方案C</p>
                    <p>每月10000起</p>
                </div>

        </React.Fragment>
    );
}