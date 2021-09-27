import React from 'react';
import Detail from '../../images/Detail.png';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';
import Customer from 'components/Transaction/Customer';
import Delivery from 'components/Transaction/Delivery';

export default function SecondCart(props) {
    return (
        <React.Fragment>
            <Layout>
                <div className="has-text-centered">步驟二</div>

                <div className="w100per h150px martb20px">
                    <div className="inlineblock h100per w40per">
                        <figure className="image is-128x128 mt-3 ml-4">
                            <img src={Detail} />
                        </figure>
                    </div>

                    <div className="inlineblock w60per h100per vertical-align-top padforinfo positionrelative textjustify">
                        <p className="fontsmall">美品《Christian Dior 藍色Oblique 提花布 24公分 30 MONTAIGNE 斜背包》</p>
                        <p className="staymiddlecenter fontlarge"><strong>總計</strong></p>
                        <p className="staymiddler fontlarge"><strong>$ 50000</strong></p>
                        <p className="staybmiddle fontlarge"><strong>共</strong></p>
                        <p className="staybr fontlarge"><strong>1項</strong></p>
                    </div>
                </div>

                <div className="link-top"></div>
                <Customer />
                <Delivery />
                <div className="link-top"></div>
                <div className="btnarea">
                    <Link to="/thirdCart">
                        <button className="cartbtn">提交訂單</button>
                    </Link>
                </div>
                
            </Layout>
        </React.Fragment>


    );
}