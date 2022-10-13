/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 16:12:42
 */
import Process from '../process';
import { BlogDatabasesOperate } from '../../databases';

export class BlogProcess extends Process {
  constructor() {
    super();
  }

  /**
   * @description: 获取列表进程
   * @params: 关键字，偏移量，尺寸，标签，是否正文搜索，是否标签，是否标题，排序
   */
  async getList(params: any) {
    return this.Response.success(await BlogDatabasesOperate.getList(params));
  }

  /**
   * @description: 获取单条数据详情进程
   */
  async getDetails(params: any) {
    if (params.id) {
      return this.Response.success(
        await BlogDatabasesOperate.getDetails(params)
      );
    } else {
      return this.Response.error(new Error('ID数据错误！'));
    }
  }
}
