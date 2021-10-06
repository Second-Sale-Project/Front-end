import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "commons/axios"
export default function MemberSub(props) {
  const [plan, setPlan] = useState([])
  const user = global.auth.getUser() || {}
  const uId = user.uId

  const GetPlanMember = async () => {
    try {
      if (!global.auth.isLogin()) {
        props.history.push("/login")
        return
      }
      const result = await axios.post(
        "http://140.117.71.141:3001/api/GetPlanMember",
        { uId }
      )
      console.log(result)
      setPlan(result.data[0])
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    GetPlanMember();
  }, [])

  const { planId } = plan
  const due_date = new Date(plan.due_date).toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
  })
  return (
    <React.Fragment>
      <div className="w100per padl5 fontlarge martb20px">
        <h1 className="fontbold">目前訂閱方案</h1>
      </div>
      <Link
        to={{
          pathname: "/subDetail",
          state: {
            planId: planId,
          },
        }}
      >
        <div
          type="button"
          className="sub h150px verticalcenter bgcolorformembersub borderbold fontxxlarge fontbold fontcolorwhite"
        >
          方案{planId}
        </div>
      </Link>
      <div className="w100per martb30px marl10per positionrelative">
        <span>訂閱方案</span>
        <span className="staycenter">方案{planId}</span>
        <br />
        <span>到期日</span>
        <span className="staycenter">{due_date}</span>
      </div>
      <div className="link-top"></div>
      <div className="w100per martb30px textcenter">
        <div className="w35per inlineblock">
          <div className="box has-text-centered">
            <span className="title">方案B</span>
          </div>
        </div>
        <div className="middleblankforblock"></div>
        <div className="w35per inlineblock">
          <div className="box has-text-centered">
            <span className="title">方案C</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
