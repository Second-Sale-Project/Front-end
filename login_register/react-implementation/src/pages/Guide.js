import React from 'react';
import Layout from 'Layout';
import 'bulma/css/bulma.css';

const Guide = (props) => {
    return (

        <Layout>
                    <section class="section">
                        <div className="columns is-gapless is-centered">
                            <div className="column is-narrow ">
                            <i class="fas fa-book fa-2x"></i>
                            </div>
                            <div className="column title is-narrow">
                                操作指南
                            </div>
                        </div>
                        <div class="content is-large">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Line客服</td>
                                        <td>@id</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Fb粉絲專頁</td>
                                        <td>二手精品訂閱</td>
                                    </tr>
                                    <tr>
                                        <td>客服信箱</td>
                                        <td>service@mail.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>



        </Layout>

                );
}


                export default Guide;
