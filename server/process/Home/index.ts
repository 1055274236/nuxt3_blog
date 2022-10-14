/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-15 00:32:01
 */
import Process from '../process';
import {
  BlogDatabasesOperate,
  OptionsDatabasesOperate,
} from '~~/server/databases';

export class HomeProcess extends Process {
  constructor() {
    super();
  }

  /**
   * @description: 获取主页信息进程
   */
  async getHomeBase(params: any) {
    let { pageSize } = params;
    pageSize = pageSize || 20;

    const listPromise = BlogDatabasesOperate.getList({ pageSize });
    const listByWatchPromist = BlogDatabasesOperate.getList({
      pageSize: 5,
      orderBy: 'pageview',
    });
    const listByCommentPromist = BlogDatabasesOperate.getList({
      pageSize: 5,
      orderBy: 'comment',
    });
    const listByLikePromist = BlogDatabasesOperate.getList({
      pageSize: 5,
      orderBy: 'like',
    });
    const optionsPromise = OptionsDatabasesOperate.getValue({
      key: 'headImg,name,tip',
    });

    const [list, listByWatch, listByComment, listByLike, options] =
      await Promise.all([
        listPromise,
        listByWatchPromist,
        listByCommentPromist,
        listByLikePromist,
        optionsPromise,
      ]);
    return this.Response.success({
      list,
      options,
      listByWatch,
      listByLike,
      listByComment,
    });
  }
}
