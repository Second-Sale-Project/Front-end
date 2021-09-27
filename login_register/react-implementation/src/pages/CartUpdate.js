import Layout from 'Layout';
import React from 'react';
import FirstCart from'../components/Cart/FirstCart';

export default function CartUpdate(props) {

    const product = props.location.state.product;
    const image = props.location.state.image;
    return (
       
            <Layout>
               <FirstCart
                product={product} 
                image={image}
               />
            </Layout>
       

    );
}