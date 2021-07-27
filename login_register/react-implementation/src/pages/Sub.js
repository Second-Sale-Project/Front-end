import React,{ useState } from 'react';
import Layout from 'Layout';
import SubList from '../components/Sub/SubList';
import SubDetail from '../components/Sub/SubDetail';
import { useLocation } from 'react-router-dom';

const Sub = () => {
    const [state, setState] = useState('list');
    //const fromMember = useLocation();
    function toDetail() {
        setState('detail');
    }
    function toList() {
        setState('list');
    }
    return (

        <Layout>
           {
                state === 'list' && (
                    <SubList Detail={toDetail} />
                )}
            {
                state === 'detail' &&(
                    <SubDetail List={toList}/>
                )
            }

        </Layout>

                );
}


export default Sub;

