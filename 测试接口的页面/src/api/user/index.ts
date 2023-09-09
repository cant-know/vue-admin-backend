import request from '../../utils/index.ts'
import type { RegisterInfo,RegisterInfoResponseData,LoginResponseData } from './type.ts'

enum API {
  // 注册接口
  REGISTER_URL = '/users/register',
  // 登录接口
  LOGIN_URL = 'users/login'
}

// 注册方法
export const getRegister = (registerInfo: RegisterInfo) => request.post<RegisterInfoResponseData>(API.REGISTER_URL, registerInfo)
// 登录方法
export const getLogin = (user: RegisterInfo) => request.post<LoginResponseData>(API.LOGIN_URL,user)