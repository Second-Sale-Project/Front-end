import React, { useState, useEffect } from 'react';
import Layout from 'Layout';
import axios from 'commons/axios';
import { toast } from "react-toastify";
export default function SubDetail(props) {

    const [plan, setPlan] = useState([]);
    const planId = props.location.state.planId;
    //const fromMember = useLocation();
    const GetPlanContent = async () => {
        try {
            const result = await axios.post("http://140.117.71.141:3001/api/GetPlanContent", { planId });
            setPlan(result.data[0]);
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        GetPlanContent();
    }, [])

   
    const { date, price, text } = plan;

    // const addDays = (current,days) => {
    //     const due_date = new Date(
    //         current.getFullYear(),
    //         current.getMonth(),
    //         current.getDate() + days,
    //         current.getHours(),
    //         current.getMinutes(),
    //         current.getSeconds()
    //         );
    //     return (due_date)
    //   }

    const payForPlan = () => {
        if (!global.auth.isLogin()) {
            props.history.push("/login")
            return
        }
        const user = global.auth.getUser() || {}
        const uId = user.uId;
        // const current = new Date();
        // const due_date = addDays(current,date);
        const result = axios.post(`http://140.117.71.141:3001/api/payForPlan`, { planId, uId,date }).then(res => {
            console.log(res);
            if(res.data){
                toast.success("訂閱成功!")
            }
            else{
                toast.error("出現錯誤，請稍後再試")
            }
          })
        
    }

    return (
        <React.Fragment>
            <Layout>

                <div className="w100per padl5 fontlarge fontbold martb20px">訂閱方案 &gt; 方案{planId}</div>
                <div className="sub">
                    <p className="fontlarge fontbold">方案{planId}</p>
                    <p className="fontlarge">{text}</p>

                </div>
                <div className="blockarea">
                    <div className="block">
                        <div className="blockwrap fontbold fontxlarge fontoblique">
                            ${price}<br />TWD
                        </div>
                    </div>
                    <div className="middleblankforblock"></div>
                    <div className="block vertical-align-top">
                        <div className="blockwrap fontbold fontxlarge fontoblique">
                            <p>{date}天</p>
                        </div>
                    </div>
                </div>
                <div className="btnarea">
                    <button className="subbtn" onClick={payForPlan}>前往支付</button>
                </div>
            </Layout>
        </React.Fragment>
    );
}