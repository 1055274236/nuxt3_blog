/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-13 01:03:03
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

  // 更新/创建博客
  updateBlog(params) {
    return this.postReq('/api/updateblog?', params);
  }

  deleteBlog(params) {
    return this.postReq('/api/deleteblog?', params);
  }
}
