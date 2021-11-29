import _axios from 'axios';
import jwt_decode from "jwt-decode"

const axios = baseURL => {

  const instance = _axios.create({
    baseURL:
      baseURL || process.env.REACT_APP_API_DOMAIN || 'http://140.117.71.141:3001',
    timeout: 10000
  });

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    try {
      const res = await axios().post("/api/refresh", { refreshToken: refreshToken });
      global.auth.setToken(res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      return res.data;
    }
    catch (err) {
      console.log(err);
    }
  }

  instance.interceptors.response.use((response) => {
    return response
  }, async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        let currentDate = new Date();
        const accessToken = global.auth.getToken();
        const decodedToken = jwt_decode(accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await refreshToken();
          global.auth.setToken(data.accessToken);
        }
    }
  })
  return instance
};

export const axiosJWT = baseURL => {

  const instance = _axios.create({
    baseURL:
      baseURL || process.env.REACT_APP_API_DOMAIN || 'http://140.117.71.141:3001',
    timeout: 1000
  });




  instance.interceptors.request.use(
    async (config) => {
      const accessToken = global.auth.getToken();
      config.headers['authorization'] = 'Bearer ' + accessToken;
      // Do something before request is sent
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return instance;

}


export default axios();
