import React,{useRef} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from 'Layout';

export default function Register(props) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const current = new Date().toISOString().split("T")[0];
  const password = useRef({});
  password.current = watch("password","");
  const onSubmit = async data => {
    // 3. 处理注册逻辑
    try {
      const { nickname, birthday, gender, email, phone, address,address_remaining, password } = data;
      const birthdays = new Date(birthday);
      console.log(birthdays);
      console.log(typeof(birthdays));
      const res = await axios.post('http://localhost:3001/api/register', {
        nickname,
        birthday,
        gender,
        email,
        phone,
        address,
        address_remaining,
        password,
        isStaff: 0
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success('Register Success');
      // 4. 跳转到首页视图
      //props.history.push('/');
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <Layout>
      <div className="content ml-4 mt-4">
        <h1 className="content is-large">您的基本資料：</h1>
      </div>
      <div className="login-wrapper">
        <form className="login-box" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">您的姓名：</label>
            <div className="control">
              <input
                className={`input ${errors.nickname && 'is-danger'}`}
                type="text"
                placeholder="Nickname"
                name="nickname"
                {...register('nickname', {
                  required: 'nickname is required'
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
                className='is-danger'
                type="date"
                name="birthday"
                max={current}
                {...register('birthday', {
                  required: 'birthday is required'
                })}
              />
              {errors.birthday && (
                <p className="helper has-text-danger">{errors.birthday.message}</p>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label">性別：</label>
            <div className="control">
            <label className="control control--radio">生理男
              <input 
                type="radio"
                name="gender"
                checked="checked"
                value="生理男"
                {...register('gender', {
                  required: 'gender is required'
                })}
              />
            </label>
            <label class="control control--radio">生理女
            <input 
                type="radio"
                name="gender"
                value="生理女"
                {...register('gender', {
                  required: 'gender is required'
                })}
              />
            </label>
            <label class="control control--radio">其他
              <input 
                type="radio"
                name="gender"
                value="其他"
                {...register('gender', {
                  required: 'gender is required'
                })}
              />
            </label>
            </div>
          </div>
          <div className="field">
            <label className="label">電話</label>
            <div className="control">
              <input
                className={`input ${errors.phone && 'is-danger'}`}
                type="number"
                placeholder="Phone number"
                name="phone"
                {...register('phone', {
                  required: 'phone is required',
                  minLength: {
                    value: 10,
                    message: 'phone must have 10 number'
                  },
                  maxLength: {
                    value:10,
                    message:'phone must be 10 number'
                  }
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
              <select {...register("address")}>
                <option value="">請選擇縣市</option>
                <option value="基隆市">基隆市</option>
                <option value="新北市">新北市</option>
                <option value="台北市">台北市</option>
                <option value="桃園市">桃園市</option>
                <option value="新竹市">新竹市</option>
                <option value="苗栗市">苗栗市</option>
                <option value="苗栗縣">苗栗縣</option>
                <option value="台中市">台中市</option>
                <option value="彰化縣">彰化縣</option>
                <option value="彰化市">彰化市</option>
                <option value="南投市">南投市</option>
                <option value="南投縣">南投縣</option>
                <option value="雲林縣">雲林縣</option>
                <option value="嘉義縣">嘉義縣</option>
                <option value="嘉義市">嘉義市</option>
                <option value="台南市">台南市</option>
                <option value="高雄市">高雄市</option>
                <option value="屏東縣">屏東縣</option>
                <option value="屏東市">屏東市</option>
                <option value="宜蘭縣">宜蘭縣</option>
                <option value="宜蘭市">宜蘭市</option>
                <option value="花蓮縣">花蓮縣</option>
                <option value="花蓮市">花蓮市</option>
                <option value="台東市">台東市</option>
                <option value="台東縣">台東縣</option>
              </select>
              <input
                className={`input ${errors.address_remaining && 'is-danger'}`}
                type="text"
                placeholder="Address"
                name="address_remainging"
                {...register('address_remaining', {
                  required: 'address is required'
                })}
              />
              {errors.address_remaining && (
                <p className="helper has-text-danger">{errors.address_remaining.message}</p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Email(帳號)</label>
            <div className="control">
              <input
                className={`input ${errors.email && 'is-danger'}`}
                type="text"
                placeholder="Email"
                name="email"
                {...register('email', {
                  required: 'email is required',
                  pattern: {
                    value: /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                    message: 'invalid email'
                  }
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
                className={`input ${errors.password && 'is-danger'}`}
                type="password"
                placeholder="Password"
                name="password"
                {...register('password', {
                  required: 'password is required',
                  minLength: {
                    value: 6,
                    message: 'cannot be less than 6 digits'
                  }
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
                className={`input ${errors.password && 'is-danger'}`}
                type="password"
                placeholder="Repeat Passowrd"
                name="password_repeat"
                {...register('password_repeat',{
                  validate: value => value === password.current || "The passwords do not match"
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
    </Layout >
  );
}