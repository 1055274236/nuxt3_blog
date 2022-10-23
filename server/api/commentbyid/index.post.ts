/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-23 16:18:12
 */
import { CommentDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  const params = await useBody(event);
  const orderRuleArr = [
    ['reply', 'desc'],
    ['createdAt', 'desc'],
  ];
  if (params.id) {
    return Response.success(
      await CommentDatabasesOperate.getCommentById({ ...params, orderRuleArr })
    );
  } else {
    return Response.error(new Error('ID数据错误！'));
  }
});
