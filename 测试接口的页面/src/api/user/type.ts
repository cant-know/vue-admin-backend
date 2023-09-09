export interface RegisterInfo{
  name: string
  email: string
  password: string
  identity: string
}

export interface RegisterInfoResponseData{
  data: string
  _id: string
  __v: number
  name: string
  email: string
  password: string
  identity: string
}

export interface LoginResponseData{
  status: number,
  token: string
}