import React from 'react';
import Detail from '../../images/Detail.png';

export default function Order(props) {
    return (
        <React.Fragment>

            <div className="content ml-4 mt-6">
                <h1 className="content is-large">訂單資訊</h1>
            </div>

            <div className="columns is-mobile is-one-quarter">
                <div className="column">
                    <figure className="image is-128x128 mt-3 ml-4">
                        <img src={Detail} />
                    </figure>
                </div>

            <div className="column mt-3 mr-6 has-text-left">
                <p className="">美品《Christian Dior 藍色Oblique 提花布 24公分 30 MONTAIGNE 斜背包》</p>
            </div>
           
            </div>
                <p className="has-text-right mr-6"><strong>總計1項</strong></p>
            <div className="columns is-mobile ">
                <div class="column is-narrow ml-4 ">訂單編號</div>
                <div class="column is-narrow ml-6 ">A00000001</div>
            </div>
            <div className="columns is-mobile">
                <div class="column is-narrow ml-4">訂單日期</div>
                <div class="column is-narrow ml-6 ">2021/01/01</div>
            </div>
            <div className="columns is-mobile">
                <div class="column is-narrow ml-4">訂單狀態</div>
                <div class="column is-narrow ml-6 ">已完成</div>
            </div>
            <div className="link-top"></div>
        </React.Fragment>


    );
}