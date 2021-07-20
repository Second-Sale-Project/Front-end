import React from 'react';


export default function Customer(props) {
    return (
        <React.Fragment>

            <div className="content ml-4 mt-3">
                <h1 className="content is-large">顧客資料</h1>
            </div>

            <div className="columns is-mobile ">
                <div class="column is-3 ml-4 ">顧客名稱</div>
                <div class="column is-narrow ml-5 ">howard</div>
            </div>
            <div className="columns is-mobile">
                <div class="column is-3 ml-4">Email</div>
                <div class="column is-narrow ml-5 ">@gmail.com</div>
            </div>
            <div className="columns is-mobile">
                <div class="column is-3 ml-4">電話號碼</div>
                <div class="column is-narrow ml-5 ">0943192342</div>
            </div>

        </React.Fragment>


    );
}