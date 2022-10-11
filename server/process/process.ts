/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-07 15:17:08
 */
class Process {
  constructor() {}

  protected Response = {
    success(data?) {
      return { data, errcode: 200, errmessage: '执行成功' };
    },
    error(e?: Error) {
      return { errcode: 500, errmessage: e?.message || '执行失败' };
    },
  };
}

export default Process;
