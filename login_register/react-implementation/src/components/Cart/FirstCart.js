import React from 'react';
import Detail from '../../images/Detail.png';
import { Link} from 'react-router-dom';

export default function FirstCart(props) {
    return (
        <React.Fragment>
           
            <div className="has-text-centered">步驟一</div>
            <div className="w100per textcenter martb20px">
                <h1 className="content is-large fontbold">您的購物車</h1>
            </div>

            <div className="w100per h150px">
                <div className="inlineblock h100per w40per">
                    <figure className="image is-128x128 mt-3 ml-4">
                        <img src={Detail} />
                    </figure>
                </div>

                <div className="inlineblock w60per h100per vertical-align-top padforinfo positionrelative textjustify">
                    <p className="fontsmall">美品《Christian Dior 藍色Oblique 提花布 24公分 30 MONTAIGNE 斜背包》</p>
                    <p className="staymiddler fontbold">$ 50000</p>
                    <p className="staybr"><i class="fas fa-trash"></i></p>
                </div>
            </div>

            <div className="w100per martb30px">
                <div className="inlineblock w50per padl8 fontbold fontlarge">
                    <p>總計</p>
                </div>
                <div className="inlineblock w50per textright padr8 fontbold fontlarge">
                    <p>1 項</p>
                </div>
            </div>
           <div className="btnarea">
                <Link to="/secondCart">
                    <button className="cartbtn">前往結帳</button>
                </Link>
           </div>
           
        </React.Fragment>


    );
}