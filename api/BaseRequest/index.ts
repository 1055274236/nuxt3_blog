/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 23:46:43
 */
import Abstract from '../Abstract';

export class BaseRequest extends Abstract {
  constructor() {
    super();
  }

  // 获取列表
  getRightToolsBase() {
    return this.postReq('/api/base/righttools?');
  }

  // 获取设置;
  getOptions(params?) {
    return this.postReq('/api/base/options?', params);
  }
}
