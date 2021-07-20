import React from 'react';
import Layout from 'Layout';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'bulma/css/bulma.css';
import { toast } from 'react-toastify';
import UserProfiles from '../components/UserProfiles';
import Transaction from 'components/Transaction/Transaction';
import Favorites from 'components/Favorite/Favorites';
class Member extends React.Component {

    componentDidMount() {
        if (!global.auth.isLogin()) {
            this.props.history.push('/login');
            toast.info('Please Login First');
            return;
        }
    }
    render() {
        return (

            <Layout>

                <div className="level is-mobile">
                    <div class="level-item">
                        <p class="title is-5 mt-6">會員專區/</p>
                    </div>

                    <div class="level-item mt-6">
                        <button
                            className="button is-ghost"
                            type="button"
                            onClick={() => {
                                //props.close();
                            }}
                        >登出
                        </button>
                    </div>

                </div>
                <Tabs
                    defaultTab="one"
                >
                    <TabList>
                        <div className="tabs is-centered">
                            <Tab tabFor="one">個人資訊</Tab>
                            <Tab tabFor="two">我的最愛</Tab>
                            <Tab tabFor="three">訂閱方案</Tab>
                            <Tab tabFor="four">交易資料</Tab>
                        </div>
                    </TabList>
                    <TabPanel tabId="one">
                        <UserProfiles />
                    </TabPanel>
                    <TabPanel tabId="two">
                        <Favorites />
                    </TabPanel>
                    <TabPanel tabId="three">

                    </TabPanel>
                    <TabPanel tabId="four">
                        <Transaction />
                    </TabPanel>

                </Tabs>

            </Layout>

        );
    }
}
export default Member;
