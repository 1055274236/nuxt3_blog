/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-13 00:59:41
 */
import { FindAndCountOptions, Op, FindOptions, UpdateOptions } from 'sequelize';
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
      orderRuleArr,
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
    orderRuleArr = orderRuleArr ?? [[orderBy, orderRule]];

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
      where: { [Op.or]: condition, isShow: true },
      attributes: { exclude: ['updatedAt', 'content'] },
      offset: offset,
      limit: pageSize,
      order: orderRuleArr,
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
    const options: FindOptions<any> = {
      where: { id },
    };

    const details = await BlogContent.findOne({ ...options });

    return { details };
  },

  /**
   * @description: 添加浏览量
   * @author: Ming
   */
  async increasePageView(params) {
    const { id } = params;
    BlogContent.increment('pageview', { where: { id } });
    return 'Success';
  },

  /**
   * @description: 更改博客数据
   * @author: Ming
   */
  async updateBlog(params) {
    const { id, cover, title, content, tag, brief, file } = params;
    const options: UpdateOptions<any> = {
      where: { id },
    };
    const value = { cover, title, content, tag, brief, file };

    await BlogContent.update(value, options);
    return 'Success';
  },

  /**
   * @description: 创建博客
   * @author: Ming
   */
  async createBlog(params) {
    const { cover, title, content, tag, brief, file } = params;
    const value = { cover, title, content, tag, brief, file };

    await BlogContent.create(value);
    return 'Success';
  },

  /**
   * @description: 修改 isShow 以达到删除
   * @author: Ming
   */
  async changeBlogIsShow(params, isShow: boolean = false) {
    const { id } = params;
    const promiseArr: Promise<any>[] = [];
    for (let i of id.split(',')) {
      promiseArr.push(BlogContent.update({ isShow }, { where: { id: i } }));
    }
    await Promise.all(promiseArr);
    return 'Success';
  },
};
