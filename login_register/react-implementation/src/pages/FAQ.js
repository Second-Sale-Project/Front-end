import React from 'react';
import Layout from 'Layout';
import 'bulma/css/bulma.css';

const FAQ = (props) => {
    return (

        <Layout>
                    <section class="section">
                        <div className="columns is-centered is-vcentered is-mobile">
                            <div className="column is-narrow">
                            <i class="fas fa-question fa-3x"></i>
                            </div>
                            <div className="column title is-narrow">
                                問與答
                            </div>
                        </div>
                        <div class="content is-medium">
                            <table class="has-text-left">
                                <thead>
                                    <tr>
                                        <td class="pl-2 has-text-weight-bold">Line客服</td>
                                        <td>@id</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="pl-2 has-text-weight-bold">Fb粉絲專頁</td>
                                        <td>二手精品訂閱</td>
                                    </tr>
                                    <tr>
                                        <td class="pl-2 has-text-weight-bold">客服信箱</td>
                                        <td>service@mail.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>



        </Layout>

                );
}


                export default FAQ;
