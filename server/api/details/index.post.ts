/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 23:40:25
 */
import { BlogDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  const params = await useBody(event);
  if (params.id) {
    return Response.success(await BlogDatabasesOperate.getDetails(params));
  } else {
    return Response.error(new Error('ID数据错误！'));
  }
});
