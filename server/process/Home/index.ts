/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 23:12:13
 */
import Process from '../process';
import {
  BlogDatabasesOperate,
  OptionsDatabasesOperate,
} from '~~/server/databases';

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
    const optionsPromise = OptionsDatabasesOperate.getValue({
      key: 'headImg,name,tip',
    });

    const [list, options] = await Promise.all([listPromise, optionsPromise]);
    return this.Response.success({ list, options });
  }
}
