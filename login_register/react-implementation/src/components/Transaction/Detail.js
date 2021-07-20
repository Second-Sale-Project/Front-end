import React from 'react'
import Order from './Order';
import Customer from './Customer';
import Delivery from './Delivery';

export default function Detail(props) {
    return(
    <React.Fragment>
        <div>
            <button onClick={props.List}>上一頁</button>
        </div>
       <Order />
       <Customer />
       <Delivery />
    </React.Fragment>
    )
}