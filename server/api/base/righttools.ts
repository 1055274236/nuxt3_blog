/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 23:38:11
 */
import {
  BlogDatabasesOperate,
  OptionsDatabasesOperate,
} from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async () => {
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
  return Response.success({ options, listByLike, listByComment });
});
