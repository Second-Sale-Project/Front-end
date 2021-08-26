import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Sidebar from "./SideBar"
import axios from "axios"
import useState from "react-usestateref"
import { useForm } from "react-hook-form"
import "../css/verify.css"

export default function UserProfile(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [disabled, setDisabled] = useState(true)
  const [buttonshow, setButtonshow] = useState(false)
  const [buttonshow1, setButtonshow1] = useState(true)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [userData, setUserData] = useState([])
  const [tmp, setTmp] = useState([])

  function toggleMenu() {
    setMenuOpen(!isMenuOpen)
  }
  function editClick() {
    setDisabled(!disabled)
    setButtonshow(true)
    setButtonshow1(false)
  }
  // function updateData() {
  //     setDisabled(!disabled);
  //     setButtonshow(false);
  //     setButtonshow1(true);
  // }

  const user = props.user
  const email = user.email
  const isStaff = user.isStaff

  const onSubmit = async (data) => {
    // 3. 处理注册逻辑
    try {
      const { nickname, phone, address } = data
      //const birthdays = new Date(birthday);
      const res = await axios.post("http://localhost:3001/api/updateUser", {
        email,
        nickname,
        phone,
        address,
      })
      setDisabled(!disabled)
      setButtonshow(false)
      setButtonshow1(true)
    } catch (error) {
      const message = error.response.data.message
    }
  }

  function Cancel() {
    setDisabled(!disabled)
    setButtonshow(false)
    setButtonshow1(true)
    setUserData(tmp)
    console.log(tmp)
  }

  const fetchUser = async () => {
    const result = await axios.post("http://localhost:3001/api/userProfiles", {
      email,
      isStaff,
    })
    setUserData(result.data)
    setTmp(result.data)
  }
  // async function fetchUser() {
  //     try {
  //         const result = await axios.post('http://localhost:3001/api/userProfiles',{email,isStaff});
  //         setUserData(result.data);
  //     }catch (error){
  //         console.log("error")
  //     }
  // }

  // useEffect(() => {
  //     axios.post('http://localhost:3001/api/userProfiles',{email,isStaff})
  //     .then(res => {
  //         setUserData(res.data);
  //         console.log(userData);
  //     })
  //   },[]);
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <React.Fragment>
      <div className="content ml-4 baseinfo">
        {/* <h1 className="content is-large">基本資料</h1> */}
      </div>
      <form className="login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="columns is-mobile">
          <div className="column is-narrow ml-6">
            <label className="label">密碼</label>
          </div>
          <div className="column ml-3">
            {userData[0] ? (
              <input
                className="custom-input "
                type="password"
                name="password"
                defaultValue={userData[0].password}
                disabled
              />
            ) : (
              "Loading..."
            )}
            <button className="changepassword">修改密碼</button>
          </div>
        </div>

        <div className="columns is-mobile">
          <div className="column is-narrow ml-6">
            <label className="label">姓名</label>
          </div>
          <div className="column ml-3">
            {userData[0] ? (
              <input
                className="custom-input "
                type="text"
                defaultValue={userData[0].name}
                disabled={disabled}
                name="nickname"
                {...register("nickname", {
                  required: "nickname is required",
                })}
              />
            ) : (
              "Loading..."
            )}
            {errors.nickname && (
              <p className="helper has-text-danger">
                {errors.nickname.message}
              </p>
            )}
          </div>
        </div>

        {/* <div className="columns is-mobile">
                    <div className="column is-narrow ml-6">
                        <label className="label">Email</label>
                    </div>
                    <div className="column ml-3">

                        {userData[0]
                            ?
                            <input
                                className="custom-input "
                                type="email"
                                name="Email"
                                defaultValue={userData[0].email}
                                disabled
                            />
                            : "Loading..."
                        }
                        
                    </div>
                </div> */}

        <div className="columns is-mobile">
          <div className="column is-narrow ml-6">
            <label className="label">電話</label>
          </div>
          <div className="column ml-3">
            {userData[0] ? (
              <input
                className="custom-input"
                type="number"
                name="phone"
                defaultValue={userData[0].phone}
                disabled={disabled}
                {...register("phone", {
                  required: "phone is required",
                  minLength: {
                    value: 10,
                    message: "phone must have 10 number",
                  },
                  maxLength: {
                    value: 10,
                    message: "phone must be 10 number",
                  },
                })}
              />
            ) : (
              "Loading..."
            )}
            {errors.phone && (
              <p className="helper has-text-danger">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="columns is-mobile">
          <div className="column is-narrow ml-6">
            <label className="label">地址</label>
          </div>
          <div className="column ml-3">
            {userData[0] ? (
              <input
                className="custom-input "
                type="text"
                name="address"
                defaultValue={userData[0].address}
                disabled={disabled}
                {...register("address", {
                  required: "address is required",
                })}
              />
            ) : (
              "Loading..."
            )}
            {errors.address && (
              <p className="helper has-text-danger">{errors.address.message}</p>
            )}
          </div>
        </div>
        <div className="columns is-mobile ml-3">
          <div className="column">
            <Sidebar isMenuOpen={isMenuOpen} onMenuToggle={toggleMenu} />
            <div class="prefer-button">
              <button
                type="button"
                className="button small is-ghost"
                onClick={toggleMenu}
              >
                更改喜好分類
              </button>
            </div>
          </div>
        </div>
        <div className="columns is-mobile has-text-centered">
          <div className="column">
            {buttonshow1 ? (
              <button
                className="button is-black "
                type="submit"
                onClick={editClick}
              >
                {" "}
                編輯{" "}
              </button>
            ) : null}
          </div>
        </div>
        <div className="columns is-mobile has-text-centered ">
          <div className="column ">
            {buttonshow ? (
              <button
                className="button has-background-light cancelmodify "
                type="submit"
                onClick={Cancel}
              >
                {" "}
                取消{" "}
              </button>
            ) : null}
          </div>
          <div className="column">
            {buttonshow ? (
              <button className="button is-black cancelmodify" type="submit">
                {" "}
                保存變更{" "}
              </button>
            ) : null}
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}
