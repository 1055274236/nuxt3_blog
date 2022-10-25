/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-25 21:05:05
 */
import { BlogDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  let { pageSize } = await useBody(event);
  pageSize = pageSize || 20;

  const listPromise = BlogDatabasesOperate.getList({ pageSize });
  const listByWatchPromist = BlogDatabasesOperate.getList({
    pageSize: 5,
    orderRuleArr: [
      ['pageview', 'desc'],
      ['updatedAt', 'desc'],
    ],
  });

  const [list, listByWatch] = await Promise.all([
    listPromise,
    listByWatchPromist,
  ]);
  return Response.success({ list, listByWatch });
});
