import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function MemberSub(props) {
    return (
        <React.Fragment>
            <div className="content ml-4 mt-4">
                <h1 className="content is-large">目前訂閱方案</h1>
            </div>
            <Link to="/sub" >
                <div type="button" className="box has-text-centered">方案A</div>
            </Link>
            <div className="box mt-6">
                <span>訂閱方案    方案A</span><br />
                <span>到期日     2021/12/31</span>
            </div>
            <div className="link-top"></div>
            <div className="columns is-mobile is-centered">
                <div className="column ">
                    <div className="box has-text-centered">
                        <span className="title">方案B</span>
                    </div>
                </div>
                <div className="column ">
                    <div className="box has-text-centered">
                        <span className="title">方案C</span>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}