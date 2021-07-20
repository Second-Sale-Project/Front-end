import React, { useState } from 'react';
import userProfile from '../images/userProfile.png';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar';

export default function UserProfile(props) {
    const [disabled, setDisabled] = useState(true);
    const [buttonshow, setButtonshow] = useState(false);
    const [buttonshow1, setButtonshow1] = useState(true);
    const [isMenuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!isMenuOpen);
    }
    function editClick() {
        setDisabled(!disabled);
        setButtonshow(true);
        setButtonshow1(false);
    }
    function updateData() {
        setDisabled(!disabled);
        setButtonshow(false);
        setButtonshow1(true);
    }
    function Cancel() {
        setDisabled(!disabled);
        setButtonshow(false);
        setButtonshow1(true);
    }
    return (
        <React.Fragment>
            <div className="has-text-centered">
                <figure className="image is-128x128 is-inline-block mt-4">
                    <img className="is-rounded " src={userProfile} />
                </figure>
            </div>

            <div className="content ml-4">
                <h1 className="content is-large">基本資料</h1>
            </div>

            <div className="columns is-mobile">
                <div className="column is-narrow ml-6">
                    <label className="label">帳號</label>
                </div>
                <div className="column ml-3">

                    <input className="custom-input" type="text" placeholder="Account" disabled={disabled} />

                </div>
            </div>


            <div className="columns is-mobile">
                <div className="column is-narrow ml-6">
                    <label className="label">密碼</label>
                </div>
                <div className="column ml-3">

                    <input className="custom-input " type="text" placeholder="Password" disabled={disabled} />

                </div>
            </div>

            <div className="columns is-mobile">
                <div className="column is-narrow ml-6">
                    <label className="label">姓名</label>
                </div>
                <div className="column ml-3">

                    <input className="custom-input " type="text" placeholder="Name" disabled={disabled} />

                </div>
            </div>

            <div className="columns is-mobile">
                <div className="column is-narrow ml-6">
                    <label className="label">生日</label>
                </div>
                <div className="column ml-3">

                    <input className="custom-input " type="text" placeholder="Birth" disabled={disabled} />

                </div>
            </div>

            <div className="columns is-mobile">
                <div className="column is-narrow ml-6">
                    <label className="label">性別</label>
                </div>
                <div className="column ml-3">

                    <input className="custom-input " type="text" placeholder="gender" disabled={disabled} />

                </div>
            </div>

            <div className="columns is-mobile">
                <div className="column is-narrow ml-6">
                    <label className="label">Email</label>
                </div>
                <div className="column ml-3">

                    <input className="custom-input " type="text" placeholder="Email" disabled={disabled} />

                </div>
            </div>

            <div className="columns is-mobile">
                <div className="column is-narrow ml-6">
                    <label className="label">手機</label>
                </div>
                <div className="column ml-3">

                    <input className="custom-input" type="text" placeholder="Phone" disabled={disabled} />

                </div>
            </div>

            <div className="columns is-mobile">
                <div className="column is-narrow ml-6">
                    <label className="label">地址</label>
                </div>
                <div className="column ml-3">

                    <input className="custom-input " type="text" placeholder="Address" disabled={disabled} />

                </div>
            </div>
            <div className="columns is-mobile ml-3">
                <div className="column">
                    <Sidebar
                        isMenuOpen={isMenuOpen}
                        onMenuToggle={toggleMenu}
                    />
                    <div class="prefer-button">
                        <button type="button" className="button small is-ghost" onClick={toggleMenu}>更改喜好分類</button>
                    </div>

                </div>
            </div>
            <div className="columns is-mobile has-text-centered">
                <div className="column">
                    {buttonshow1 ? (
                        <button className="button is-black " type='submit' onClick={editClick}> 編輯 </button>
                    ) : null}
                </div>
            </div>
            <div className="columns is-mobile has-text-centered">
                <div className="column">
                    {buttonshow ? (
                        <button className="button has-background-light" type='submit' onClick={Cancel}> 取消 </button>

                    ) : null}
                </div>
                <div className="column">
                    {buttonshow ? (
                        <button className="button is-black" type='submit' onClick={updateData}> 保存變更 </button>

                    ) : null}
                </div>
            </div>




        </React.Fragment>

    );
}