import React, { useState } from 'react';
import List from './TransList';
import Detail from './Detail';
export default function Transaction() {
    const [state, setState] = useState('list');

    function toDetail() {
        setState('detail');
    }
    function toList() {
        setState('list');
    }

    return (
        <div>
            {
                state === 'list' && (
                    <List Detail={toDetail} />
                )}
            {
                state === 'detail' &&(
                    <Detail List={toList}/>
                )
            }
        </div>
    );
}