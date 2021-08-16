import React from 'react';
import Detail from '../../images/Detail.png';
import { Link} from 'react-router-dom';
import Layout from '../../Layout';
import Customer from 'components/Transaction/Customer';
import Delivery from 'components/Transaction/Delivery';

export default function ThirdCart(props) {
    return (
        <React.Fragment>
           <Layout>
                <div className="has-text-centered">訂單確認</div>
                <div className="w100per textcenter martb20px">
                    <h1 className="content is-large fontbold">您的訂單已成立</h1>
                </div>

                <div className="w100per h150px martb20px">
                    <div className="inlineblock h100per w40per">
                        <figure className="image is-128x128 mt-3 ml-4">
                            <img src={Detail} />
                        </figure>
                    </div>

                    <div className="inlineblock w60per h100per vertical-align-top padforinfo positionrelative textjustify">
                        <p className="fontsmall">美品《Christian Dior 藍色Oblique 提花布 24公分 30 MONTAIGNE 斜背包》</p>
                        <p className="staybr fontlarge"><strong>總計&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1項</strong></p>
                    </div>
                </div>

                <div className="link-top"></div>
                    <Customer />
                    <Delivery />
                <div className="btnarea">
                    <Link to="/">
                        <button className="subbtn">確認</button>
                    </Link>
                </div>

           </Layout>
        </React.Fragment>


    );
}