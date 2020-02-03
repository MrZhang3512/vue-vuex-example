import axios from 'axios'
import qs from 'qs'
//全局配置
axios.defaults.baseURL = 'http://134.175.100.63:6677'; // 配置axios请求的地址
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/*
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //手动将参数转化为查询字符串，为了呼应设置Content-type=application/x-www-form-urlencoded
    if(config.method==="post"){
        config.data=qs.stringify(config.data)
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
*/
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //将后台的参数结果设置到response
    let {data}=response;
    response.data=data.data;
    response.status=data.status;
    response.statusText=data.message;
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
 
  /**
   * 提交post请求 发送的数据为查询字符串,key=val$key=val
  
   */
export function post(url,data){
  return axios({
    method:"post",
    url,
    data:qs.stringify(data),
    timeout:10000,
    headers:{
      'X-Requested-With':'XMLHttpRequest',
      'Content-Type':'application/x-www-form-urlencoded;charset:UTF-8'
    }
  })
}
 /**
   * 提交post请求 当参数为数组时适用，ids=1&ids=2
  
   */
export function post_array(url,data){
    return axios({
          method:"post",
          url,
          data:qs.stringify(data,{arrayFormat:"repeat"}),
          timeout:10000,
          headers:{
            'X-Requested-With':'XMLHttpRequest',
            'Content-Type':'application/x-www-form-urlencoded;charset:UTF-8'
          }
        })
}
 /**
   * 提交post请求 发送的数据为json字符串,
  
   */
export function post_json(url,data){
  return axios({
        method:"post",
        url,
        data,
        timeout:10000,
        headers:{
          'X-Requested-With':'XMLHttpRequest',
          'Content-Type':'application/x-www-form-urlencoded;charset:UTF-8'
        }
      })
}
 /**
   * 提交get请求 
  
   */
export function get(url,params){
  return axios({
    method:"get",
    url,
    params,//get请求时带的参数
    timeout:10000,
    headers:{
      'X-Requested-With':'XMLHttpRequest',
      'Content-Type':'application/x-www-form-urlencoded;charset:UTF-8'
    }
  })
}
export default axios