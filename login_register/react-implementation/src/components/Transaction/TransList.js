import React from 'react';

export default function TransList(props) {
    return (
        <section class="section  ">
            <div className="columns is-centered is-mobile">

                <table class="table is-bordered is-four-fifths">

                    <thead>
                        <tr>
                            <th>訂單編號</th>
                            <th>訂單日期</th>
                            <th>訂單狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr type="button"onClick={props.Detail}>
                            <td>A11111111111</td>
                            <td>2021/01/01</td>
                            <td>已完成</td>
                            
                        </tr>
                        <tr>
                            <td>A2232222222</td>
                            <td>2021/01/01</td>
                            <td>已完成</td>
                            
                        </tr>
                    </tbody>

                </table>

            </div>
        </section>
    );
}