/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 23:37:32
 */
export const Response = {
  success(data?) {
    return { data, errcode: 200, errmessage: '执行成功' };
  },
  error(e?: Error) {
    return { errcode: 500, errmessage: e?.message || '执行失败' };
  },
};
