/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-10 16:26:06
 */
import { FindAndCountOptions, Op } from 'sequelize';
import { defineConnect } from '../sequelize';

import { BlogTable } from '../table';

const BlogContent = defineConnect(BlogTable.tableName, BlogTable.col);

export const BlogDatabasesOperate = {
  /**
   * @description: 获取博客列表
   * @param { keyword, offect, pageSize, tag } params
   * @return { rows, count }
   * @author: Ming
   */
  async getList(params) {
    const { keyword, offset, pageSize, tag } = params;
    const options: FindAndCountOptions<any> = {
      where: {
        [Op.or]: {
          title: {
            [Op.substring]: keyword,
          },
          tag: {
            [Op.or]: {
              [Op.substring]: keyword,
              [Op.substring]: tag,
            },
          },
        },
      },
      attributes: ['id', 'cover', 'title', 'tag', 'brief', 'createdAt'],
      offset: offset || 0,
      limit: pageSize || 20,
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
