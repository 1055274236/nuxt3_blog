/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-18 22:43:14
 */
import { FindAndCountOptions, Op } from 'sequelize';
import { defineConnect } from '../sequelize';

import { CommentTable } from '../table';

const CommentContent = defineConnect(CommentTable.tableName, CommentTable.col);

export const CommentDatabasesOperate = {
  async getCommentById(params?) {
    let { id, offset, pageSize, orderBy, orderRule, orderRuleArr } = params;

    // 参数初始化
    pageSize = pageSize ?? 20;
    offset = offset ?? 0;
    orderBy = orderBy ?? 'createdAt';
    orderRule = orderRule ?? 'asc';
    orderRuleArr = orderRuleArr ?? [orderBy, orderRule];

    const options: FindAndCountOptions = {
      where: {
        blog_id: id,
        parent_id: {
          [Op.is]: null,
        },
      },
      offset,
      limit: pageSize,
      order: [orderRuleArr],
    };
    // 获取根评论
    const rootComment = await CommentContent.findAndCountAll({ ...options });
    // 获取评论的回复评论
    rootComment.rows.forEach(async (item: any) => {
      item.children = await CommentContent.findAndCountAll({
        where: {
          blog_id: item.blog_id,
          root_parent_id: item.id,
        },
        order: [['createdAt', 'asc']],
      });
    });

    return rootComment;
  },
};
