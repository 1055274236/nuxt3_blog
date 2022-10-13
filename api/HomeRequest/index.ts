/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 23:15:05
 */
import Abstract from '../Abstract';

export class HomeRequest extends Abstract {
  constructor() {
    super();
  }

  // 获取列表
  getList(params?) {
    return this.postReq('/api/home?', params);
  }
}
