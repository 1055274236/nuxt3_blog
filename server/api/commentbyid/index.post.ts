/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-19 22:52:01
 */
import { CommentDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  const params = await useBody(event);
  if (params.id) {
    return Response.success(
      await CommentDatabasesOperate.getCommentById(params)
    );
  } else {
    return Response.error(new Error('ID数据错误！'));
  }
});
