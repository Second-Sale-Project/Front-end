import React from 'react';
import Layout from 'Layout';

export default function ShipmentConfirm(props) {
    return (
        <Layout>
        <p className="fontbold fontxlarge textcenter martb30px">出貨確認</p>
        <section class="w80per marginlrauto mb-4">
            <div className="w30per textcenter fontbold">訂單資訊</div>
            <p></p>
        </section>
        <div className="link-top"></div>
        <section class="w80per marginlrauto mt-4">
            <div className="w30per textcenter fontbold">顧客資料</div>
        </section>
        <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button className="button is-link">確認上架</button>
              </div>
        </div>
        </Layout>
    );
}
