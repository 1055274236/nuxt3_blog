/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-04 17:43:35
 */
import { OptionsDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  let { key } = await useBody(event);
  return Response.success({
    ...(await OptionsDatabasesOperate.getValue({ key })),
  });
});
