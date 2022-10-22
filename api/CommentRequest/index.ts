/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-22 23:52:38
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

  // 博客添加评论
  addByBlogId(params?) {
    return this.postReq('/api/addcommentfromblog', params);
  }
}
