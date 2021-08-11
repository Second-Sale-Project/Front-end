import React from 'react';
import Detail from '../../images/Detail.png';
import { Link} from 'react-router-dom';

export default function FirstCart(props) {
    return (
        <React.Fragment>
           
                <div className="has-text-centered">步驟一</div>
            <div className="content has-text-centered">
                <h1 className="content is-large">您的購物車</h1>
            </div>

            <div className="columns is-mobile is-one-quarter">
                <div className="column">
                    <figure className="image is-128x128 mt-3 ml-4">
                        <img src={Detail} />
                    </figure>
                </div>

            <div className="column mt-3 mr-6 has-text-left">
                <p className="">美品《Christian Dior 藍色Oblique 提花布 24公分 30 MONTAIGNE 斜背包》</p>
                <p className="has-text-right mr-3 mt-3 "><i class="fas fa-trash"></i></p>
            </div>
            </div>
           <p>總計一項</p>
           <Link to="/secondCart">
                <button>前往結賬</button>
           </Link>
        </React.Fragment>


    );
}