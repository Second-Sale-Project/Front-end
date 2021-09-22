
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';






//tokens
const crypto = require('crypto');
const nBytes   = 4;
// Max value
// (= 4294967295) (= (1 << 4*8) - 1)
const maxValue = new Buffer.from(Array(nBytes).fill(0xff)).readUIntBE(0, nBytes); 
function secureRandom() {
  const randomBytes = crypto.randomBytes(nBytes);
  const r = randomBytes.readUIntBE(0, nBytes);
  return r / maxValue*100000000000000000;
}
const token = secureRandom();
console.log(token);

const nodemailer = require('nodemailer');
//
// setting of SMTP
//
const options = {
  host: 'smtp.gmail.com', // mail server
  port: 465, // port
  secure: true, // if use 465 = true. else = false
  requireTLS: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: { // mail-setting
    user: 'p.david00lin@gmail.com', // user
    pass: '1022david_lin1439', // password
  },
};

//
// mail message
//
const mail = {
  from: 'p.david00lin@gmail.com', // sending address
  to: 'masaaki4sale@gmail.com', // sending to address
  subject: 'Email Test Mail',
  text: `Email was sent!`,
  html: `<p>Email was sent!</p>`+token,
};

//
// send setting
//
(async () => {
  try {
    const transport = nodemailer.createTransport(options);
    const result = await transport.sendMail(mail);
    console.log('+++ Sent +++');
    console.log(result);
  } catch (err) {
    console.log('--- Error ---');
    console.log(err);
  }
})();









export default function Login(props) {
  const { register, handleSubmit, formState:{errors} } = useForm();

  const onSubmit = async data => {
    // 3. 处理注册逻辑
    try {
      const { nickname, email, password } = data;
      const res = await axios.post('http://localhost:3001/api/register', {
        nickname,
        email,
        password,

        type: 0
      });
      console.log(res.data);
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success('Register Success');
      // 4. 跳转到首页视图
      //props.history.push('/');
        isStaff: 0,
        token,
    })
      const jwToken = res.data
      global.auth.setToken(jwToken)
      Mail(email)
      toast.success("Register Success")
      // 4. 跳转到首页视图
      props.history.push("/verify")
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <Layout>
      <div className="content ml-4 mt-4 ">
        <h1 className="content is-large">您的基本資料：</h1>
      </div>
      <div className="login-wrapper2 ">
        <form className="login-box" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">您的姓名：</label>
            <div className="control">
              <input
                className={`input ${errors.nickname && "is-danger"}`}
                type="text"
                placeholder="Nickname"
                name="nickname"
                {...register("nickname", {
                  required: "nickname is required",
                })}
              />
              {errors.nickname && (
                <p className="helper has-text-danger">
                  {errors.nickname.message}
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">生日：</label>
            <div className="control">
              <input
                className="is-danger"
                type="date"
                name="birthday"
                max={current}
                {...register("birthday", {
                  required: "birthday is required",
                })}
              />
              {errors.birthday && (
                <p className="helper has-text-danger">
                  {errors.birthday.message}
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">性別：</label>
            <div className="control">
              <label className="control control--radio">
                生理男
                <input
                  type="radio"
                  name="gender"
                  checked="checked"
                  value="生理男"
                  {...register("gender", {
                    required: "gender is required",
                  })}
                />
              </label>
              <label class="control control--radio">
                生理女
                <input
                  type="radio"
                  name="gender"
                  value="生理女"
                  {...register("gender", {
                    required: "gender is required",
                  })}
                />
              </label>
              <label class="control control--radio">
                其他
                <input
                  type="radio"
                  name="gender"
                  value="其他"
                  {...register("gender", {
                    required: "gender is required",
                  })}
                />
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">電話</label>
            <div className="control">
              <input
                className={`input ${errors.phone && "is-danger"}`}
                type="number"
                placeholder="Phone number"
                name="phone"
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
              {errors.phone && (
                <p className="helper has-text-danger">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">地址(宅配用，離島地區尚未提供服務)</label>
            <div className="control">
              <TWzipcode
                css={[
                  "form-control county-sel",
                  "form-control district-sel",
                  "form-control zipcode",
                ]}
                handleChangeCounty={handleChange}
                handleChangeDistrict={handleChange}
                handleChangeZipcode={handleChange}
              />
              <input
                className={`input ${errors.address_remaining && "is-danger"}`}
                type="text"
                placeholder="Address"
                name="address_remainging"
                {...register("address_remaining", {
                  required: "address is required",
                })}
              />
              {errors.address_remaining && (
                <p className="helper has-text-danger">
                  {errors.address_remaining.message}
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Email(帳號)</label>
            <div className="control">
              <input
                className={`input ${errors.email && "is-danger"}`}
                type="text"
                placeholder="Email"
                name="email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value:
                      /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                    message: "invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className="helper has-text-danger">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">密碼</label>
            <div className="control">
              <input
                className={`input ${errors.password && "is-danger"}`}
                type="password"
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "cannot be less than 6 digits",
                  },
                })}
              />
              {errors.password && (
                <p className="helper has-text-danger">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">確認密碼</label>
            <div className="control">
              <input
                className={`input ${errors.password && "is-danger"}`}
                type="password"
                placeholder="Repeat Passowrd"
                name="password_repeat"
                {...register("password_repeat", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              {errors.password_repeat && (
                <p className="helper has-text-danger">
                  {errors.password_repeat.message}
                </p>
              )}
            </div>
          </div>
          <div className="control">
            <button className="button is-fullwidth is-primary">Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}