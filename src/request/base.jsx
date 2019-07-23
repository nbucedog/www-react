import axios from 'axios'

const wwwRequest = axios.create({
    baseURL:"https://www.nbucedog.com/api"
    // baseURL:"http://localhost:7000"
});

wwwRequest.interceptors.response.use(res=>{
   return res.data;
}, ()=>{
    return {"errcode":500,"errmsg":"网络繁忙"};
});

export default wwwRequest;