import React from 'react';
import Layout from 'Layout';

export default function AdminOrder(props) {
    return (
        <Layout>
        <p className="fontbold fontxlarge textcenter martb30px">訂單查詢</p>
        <section class="w80per marginlrauto">
            <div className="w30per textcenter fontbold">訂單編號</div>
            <div className="w100per h30px positionrelative verticalcenter martb30px">
               <div className="w30per textcenter fontbold positionabsolute left0per">A111111111</div>
               <button className="orderbutton fontbold positionabsolute right30per">出貨</button>
               <button className="orderbutton fontbold positionabsolute right0per">收貨</button>
            </div>
            <div className="w100per h30px positionrelative verticalcenter martb30px">
               <div className="w30per textcenter fontbold positionabsolute left0per">A111111111</div>
               <button className="orderbutton fontbold positionabsolute right30per">出貨</button>
               <button className="orderbutton fontbold positionabsolute right0per">收貨</button>
            </div>
            <div className="w100per h30px positionrelative verticalcenter martb30px">
               <div className="w30per textcenter fontbold positionabsolute left0per">A111111111</div>
               <button className="orderbutton fontbold positionabsolute right30per">出貨</button>
               <button className="orderbutton fontbold positionabsolute right0per">收貨</button>
            </div>
        </section>
        </Layout>
    );
}
