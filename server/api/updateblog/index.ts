/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-11 01:12:28
 */
import { BlogDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  const params = await useBody(event);
  if (params.id) {
    return Response.success(await BlogDatabasesOperate.updateBlog(params));
  } else {
    return Response.success(await BlogDatabasesOperate.createBlog(params));
  }
});
