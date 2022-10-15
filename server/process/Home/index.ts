/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 00:30:49
 */
import Process from '../process';
import { BlogDatabasesOperate } from '~~/server/databases';

export class HomeProcess extends Process {
  constructor() {
    super();
  }

  /**
   * @description: 获取主页信息进程
   */
  async getHomeBase(params: any) {
    let { pageSize } = params;
    pageSize = pageSize || 20;

    const listPromise = BlogDatabasesOperate.getList({ pageSize });
    const listByWatchPromist = BlogDatabasesOperate.getList({
      pageSize: 5,
      orderBy: 'pageview',
    });

    const [list, listByWatch] = await Promise.all([
      listPromise,
      listByWatchPromist,
    ]);
    return this.Response.success({ list, listByWatch });
  }
}
