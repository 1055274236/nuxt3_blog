/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-19 22:49:39
 */
import Abstract from '../Abstract';

export class CommentRequest extends Abstract {
  constructor() {
    super();
  }

  // 获取列表
  getByID(params?) {
    return this.postReq('/api/commentbyid?', params);
  }
}
