import _axios from 'axios';

const axios = baseURL => {

  const instance = _axios.create({
    baseURL:
      baseURL || process.env.REACT_APP_API_DOMAIN || 'http://140.117.71.141:3001',
    timeout: 10000
  });


  instance.interceptors.request.use(
    async (config) => {
      const accessToken = global.auth.getToken();
      if(accessToken){
        config.headers['authorization'] = 'Bearer ' + accessToken;
      }
      // Do something before request is sent
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use((response) => {
    return response
  }, async function (error) {
      const originalConfig = error.config;
      if(error.response){

      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try{
          const rs = await refreshToken();
          const {accessToken} = rs.data;
          global.auth.setToken(accessToken);
          return instance(originalConfig);
        }
        catch(_error){
          if(_error.response && _error.response.data){
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }
        if(error.response.status === 403 && error.response.data){
          return Promise.reject(error.response.data);
        }
      }

        return Promise.reject(error);
  })
  return instance;
};

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


export default axios();
