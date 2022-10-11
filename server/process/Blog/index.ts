/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-10 16:41:45
 */
import Process from '../process';
import { BlogDatabasesOperate } from '../../databases';

export class BlogProcess extends Process {
  constructor() {
    super();
  }

  /**
   * @description: 获取列表进程
   */
  async getList(params: any) {
    let { keyword, offset, pageSize, tag } = params;
    keyword = keyword || '';
    tag = tag || '';
    pageSize = pageSize || 20;
    offset = offset || 0;

    return this.Response.success(
      await BlogDatabasesOperate.getList({
        keyword,
        offset,
        pageSize,
        tag,
      })
    );
  }

  /**
   * @description: 获取单条数据详情进程
   */
  async getDetails(params: any) {
    let { id } = params;

    return this.Response.success(await BlogDatabasesOperate.getDetails({ id }));
  }
}
