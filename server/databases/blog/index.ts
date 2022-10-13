/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 16:10:25
 */
import { FindAndCountOptions, Op } from 'sequelize';
import { defineConnect } from '../sequelize';

import { BlogTable } from '../table';

const BlogContent = defineConnect(BlogTable.tableName, BlogTable.col);

export const BlogDatabasesOperate = {
  /**
   * @description: 获取博客列表
   * @param { keyword, offect, pageSize, tag, isContent, isTag, isTitle } params
   * @return { rows, count }
   * @author: Ming
   */
  async getList(params) {
    let {
      keyword,
      offset,
      pageSize,
      tag,
      isContent,
      isTag,
      isTitle,
      orderBy,
      orderRule,
    } = params;

    // 参数初始化
    keyword = keyword ?? '';
    tag = tag ?? '';
    pageSize = pageSize ?? 20;
    offset = offset ?? 0;
    isContent = isContent ?? false;
    isTag = isTag ?? true;
    isTitle = isTitle ?? false;
    orderBy = orderBy ?? 'createdAt';
    orderRule = orderRule ?? 'desc';

    const condition = {} as any;

    if (isContent) {
      condition.content = { [Op.substring]: keyword };
    }
    if (isTag) {
      condition.tag = { [Op.substring]: keyword || tag };
    }
    if (isTitle) {
      condition.title = { [Op.substring]: keyword };
    }

    const options: FindAndCountOptions<any> = {
      where: { [Op.or]: condition },
      attributes: ['id', 'cover', 'title', 'tag', 'brief', 'createdAt'],
      offset: offset,
      limit: pageSize,
      order: [[orderBy, orderRule]],
    };

    const { rows, count } = await BlogContent.findAndCountAll({ ...options });

    return { rows, count };
  },

  /**
   * @description: 获取单条详情
   * @param { id } params
   * @return { details }
   * @author: Ming
   */
  async getDetails(params) {
    const { id } = params;
    const options: FindAndCountOptions<any> = {
      where: { id },
    };

    const details = await BlogContent.findOne({ ...options });

    return { details };
  },
};
