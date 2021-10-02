import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from 'Layout';


export default function Login(props) {
  const { register, handleSubmit, formState:{errors} } = useForm();

  const onSubmit = async data => {
    // 3. 处理登录逻辑
    try {
      const { token } = data;
      const res = await axios.post('http://140.117.71.141:3001/api/token', { token });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success('verify Success');
      // 4. 跳转到首页视图
      props.history.push('/');
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <Layout>
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Verify</label>
          <div className="control">
            <input
              className={`input ${errors.email && 'is-danger'}`}
              type="text"
              placeholder="Please enter verify code"
              name="token"
              {...register('token',{
                required: 'token is required',
              })}
            />
            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        
        <div className="control">
          <button className="button is-fullwidth is-primary">Verify</button>
        </div>
      </form>
    </div>
    </Layout>
  );
}