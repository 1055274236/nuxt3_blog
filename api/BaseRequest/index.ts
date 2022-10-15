/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 00:35:27
 */
import Abstract from '../Abstract';

export class BaseRequest extends Abstract {
  constructor() {
    super();
  }

  // 获取列表
  getRightToolsBase(params?) {
    return this.postReq('/api/base/righttools?', params);
  }
}
