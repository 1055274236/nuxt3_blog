/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 23:42:13
 */
import { BlogDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  const params = await useBody(event);
  return Response.success(await BlogDatabasesOperate.getList(params));
});
