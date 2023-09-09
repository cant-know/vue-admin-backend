import request from "../../utils";

enum API{
  // 添加数据
  INSERTDATA_URL = '/profiles/add'
}

export const insertData = (data) => request.post(API.INSERTDATA_URL,data)