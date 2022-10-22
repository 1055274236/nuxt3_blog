/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-23 03:40:22
 */
import { FindAndCountOptions, Op } from 'sequelize';
import { defineConnect } from '../sequelize';

import { CommentTable } from '../table';

const CommentContent = defineConnect(CommentTable.tableName, CommentTable.col);
CommentContent.belongsTo(CommentContent, {
  as: 'parent',
  targetKey: 'id',
  foreignKey: 'parent_id',
});

export const CommentDatabasesOperate = {
  /**
   * @description: 根据 Id 获取评论
   * @author: Ming
   */
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
        root_parent_id: {
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
    let commentList: any = rootComment;

    commentList.rows = await Promise.all(
      rootComment.rows.map(async (item) => {
        let r = item.toJSON();

        const blogId = r.blog_id;
        const id = r.id;

        r.children = await CommentContent.findAndCountAll({
          where: {
            blog_id: blogId,
            root_parent_id: id,
          },
          order: [['createdAt', 'asc']],
          include: { model: CommentContent, as: 'parent' },
        });

        return r;
      })
    );

    return commentList;
  },

  /**
   * @description: 根据博客 Id 增加评论
   * @author: Ming
   */
  async addCommentById(params?) {
    let {
      name,
      email,
      blog_id,
      content,
      parent_id,
      root_parent_id,
      browser,
      device,
      engine,
      os,
      cpu,
      ip,
      address,
    } = params;

    if (!name || !content) {
      throw new Error('数据错误！');
    }

    const incParams = {
      name,
      email,
      blog_id,
      content,
      parent_id,
      root_parent_id,
      browser,
      device,
      engine,
      os,
      cpu,
      ip,
      address,
    };

    await CommentContent.create(incParams);
    return 'success';
  },
};
