import React from 'react';
import Layout from 'Layout';
import 'bulma/css/bulma.css';
import image from '../images/contact.png';
const Contact = (props) => {
    function toggleBurgerMenu() {
        document.querySelector('.navbar-menu').classList.toggle('is-active');
    }
    return (

        <Layout>
                    <section class="section">
                        <div className="columns is-gapless is-centered">
                            <div className="column is-narrow ">
                                <img src={image} width="50" height="20" />
                            </div>
                            <div className="column title is-narrow">
                                聯絡我們
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


                export default Contact;
