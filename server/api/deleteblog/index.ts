/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-13 01:00:46
 */
import { BlogDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  const params = await useBody(event);
  if (params.id) {
    return Response.success(
      await BlogDatabasesOperate.changeBlogIsShow(params)
    );
  } else {
    return Response.error();
  }
});
