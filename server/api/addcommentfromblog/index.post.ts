/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-22 02:28:53
 */
import { CommentDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  const params = await useBody(event);
  // useHead(event);
  if (params.blog_id) {
    return Response.success(
      await CommentDatabasesOperate.getCommentById(params)
    );
  } else {
    return Response.error(new Error('ID数据错误！'));
  }
});
