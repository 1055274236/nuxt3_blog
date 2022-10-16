/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 23:39:41
 */
import { OptionsDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  let { key } = await useBody(event);
  return Response.success({
    options: await OptionsDatabasesOperate.getValue(key),
  });
});
