/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-10 16:42:31
 */
import Abstract from '../Abstract';

export class BlogRequest extends Abstract {
  constructor() {
    super();
  }

  // 获取列表
  getList(params?) {
    return this.postReq('/api/list?', params);
  }

  // 获取详情
  getDetails(params) {
    return this.postReq('/api/details?', params);
  }
}
