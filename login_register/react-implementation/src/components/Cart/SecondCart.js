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
                <div className="link-top"></div>
                <Customer />
                <Delivery />
                <div className="link-top"></div>
                <Link to="/thirdCart">
                    <button>提交訂單</button>
                </Link>
                
            </Layout>
        </React.Fragment>


    );
}