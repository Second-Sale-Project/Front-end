import React,{useRef,useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TWzipcode from 'react-twzipcode';
import Layout from 'Layout';



export default function Register(props) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const current = new Date().toISOString().split("T")[0];
  const password = useRef({});
  password.current = watch("password","");

  const [county, setCounty] = useState('基隆市');
  const [district, setDistrict] = useState('仁愛區');
  const [zipcode,setZipcode] = useState('200');
  const handleChange = (data) => {
    setCounty(data.county);
    setDistrict(data.district);
    setZipcode(data.zipcode);
  }
  
  const onSubmit = async data => {
    // 3. 处理注册逻辑
    try {
      const { nickname, birthday, gender, email, phone,address_remaining, password } = data;
      //const birthdays = new Date(birthday);
      const res = await axios.post('http://localhost:3001/api/register', {
        nickname,
        birthday,
        gender,
        email,
        phone,
        county,
        district,
        zipcode,
        address_remaining,
        password,
        isStaff: 0
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success('Register Success');
      // 4. 跳转到首页视图
      props.history.push('/');
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
            <TWzipcode 
              css={['form-control county-sel', 'form-control district-sel', 'form-control zipcode']}
              handleChangeCounty={handleChange}
              handleChangeDistrict={handleChange}
              handleChangeZipcode={handleChange}
            
            />
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