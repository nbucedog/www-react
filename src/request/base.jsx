import axios from 'axios'

axios.defaults.withCredentials = true;

const wwwRequest = axios.create({
    baseURL:"https://www.nbucedog.com/api"
    // baseURL:"http://www.nbucedog.com:7000"
    // baseURL:"http://localhost:7000"
});

wwwRequest.interceptors.response.use(res=>{
   return res.data;
}, reason=>{
    return {"errcode":500,"errmsg":reason};
});

export default wwwRequest;