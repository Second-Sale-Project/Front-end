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

      setPlan(result.data[0])
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    GetPlanMember();
  }, [])

  const { planId } = plan || []
  const {due_date} = plan || []
  const t_due_date = new Date(due_date).toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
  })
  return (
    <React.Fragment>
      <div className="w80per marlr10per fontlarge">
        <h1 className="fontbold martb20px">目前訂閱方案</h1>
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
            className="h150px verticalcenter bgcolorformembersub membersub-border fontxxlarge fontbold fontcolorwhite"
          >
            方案{planId}
          </div>
        </Link>
        <div className="martb30px positionrelative">
          <span>訂閱方案</span>
          <span className="staycenter">方案{planId}</span>
          <br />
          <span>到期日</span>
          <span className="staycenter">{t_due_date}</span>
        </div>
        <div className="link-top1"></div>
        <div className="martb30px textcenter">
          <div className="w40per inlineblock">
            <div className="box has-text-centered">
              <span className="title">方案B</span>
            </div>
          </div>
          <div className="middleblankforblock"></div>
          <div className="w40per inlineblock">
            <div className="box has-text-centered">
              <span className="title">方案C</span>
            </div>
          </div>
        </div>
      </div>
      
    </React.Fragment>
  )
}
