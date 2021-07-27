import React from 'react';

export default function SubList(props) {
    return (
        <React.Fragment>
            <div>
                <button onClick={props.List}>上一頁</button>
            </div>

            <div className="mt-3 ml-3 title">訂閱方案 --方案A</div>
            <div className="box">
                <p>方案A</p>
                <p>條列好處1</p>
                <p>條列好處2</p>
                <p>條列好處3</p>
                <p>條列好處4</p>
            </div>
            <div className="columns is-mobile is-centered">
                <div className="column ">
                    <div className="box has-text-centered">
                        <span className="title">$4000</span><br />
                        <span className="title">TWD</span>
                    </div>
                </div>
                <div className="column ">
                    <div className="box has-text-centered">
                        <span className="title">1 month</span>
                    </div>
                </div>
            </div>
            <div className="columns is-mobile is-centered">
                <div className="column has-text-centered">
                    <button>前往支付</button>
                </div>
            </div>

        </React.Fragment>
    );
}