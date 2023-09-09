import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
  timeout: 5000,
  baseURL: '/api',
})

request.interceptors.request.use((config) => {
  if(localStorage.getItem('token')){
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})

request.interceptors.response.use((response) => {
  return response.data
},(error) => {
  let status = error.response?.status
  switch (status) {
    case 404:
      ElMessage({
        type: 'error',
        message: '请求路径出现问题'
        }
      )
      break;
    case 500|501|502|503|504|505:
      ElMessage({
        type: 'error',
        message: '服务器出现问题'
      })
      break;
    case 401:
      ElMessage({
        type: 'error',
        message: '携带参数有误'
      })
  }
  return Promise.reject(new Error(error.message))
})

export default request