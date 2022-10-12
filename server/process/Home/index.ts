/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 01:34:03
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

    return this.Response.success(
      await BlogDatabasesOperate.getList({ pageSize })
    );
  }
}
