import React,{useState} from 'react';
import { withRouter } from 'react-router-dom';
import Heart from "react-heart";

function Favorite(props){
    const { name, image, tags,status } = props.product;
    const [active, setActive] = useState(true)
    const _pClass = {
      available: 'product',
      unavailable: 'product out-stock'
    };
    return (
      <div className={_pClass[status]}>
        <div className="img-wrapper">
            <div className="out-stock-text">Out Of Stock</div>
            <figure className="image is-4by3">
              <img src={image} alt={name} />
            </figure>
        </div>
        <div className="p-content">
          <p className="p-tags">{tags}</p>
          <p className="p-name">{name}</p>
          <span class="icon mt-3 is-pulled-right ">
            <Heart isActive={active} onClick={() => setActive(!active)}/>
          </span>
        </div>
      </div>
    );
  }

export default withRouter(Favorite);