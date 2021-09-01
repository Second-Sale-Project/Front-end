import React from 'react';
import Layout from 'Layout';

export default function AdminOrder(props) {
    return (
        <Layout>
        <h1>訂單查詢</h1>
        <section class="section  ">
            <div className="columns is-centered is-mobile">
            
               <div className="column">A111111111</div>
               <div className="column"><button className="button">出貨</button></div>
               <div className="column"><button className="button">收貨</button></div>


            </div>
        </section>
        </Layout>
    );
}
