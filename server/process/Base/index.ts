/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 00:29:43
 */
import Process from '../process';
import { BlogDatabasesOperate, OptionsDatabasesOperate } from '../../databases';

export class BaseProcess extends Process {
  constructor() {
    super();
  }

  async getRightToolsBase() {
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

    const [listByComment, listByLike, options] = await Promise.all([
      listByCommentPromist,
      listByLikePromist,
      optionsPromise,
    ]);
    return this.Response.success({ options, listByLike, listByComment });
  }
}
