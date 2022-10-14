/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-14 16:46:07
 */

export const propsParams = {
  // 总数据
  total: {
    type: Number,
    default: 0,
  },
  // 当前页数
  modelValue: {
    type: Number,
    default: 0,
  },
  // 总页数
  totalPage: {
    type: Number,
  },
  // 单页尺寸
  pageSize: {
    type: Number,
    default: 20,
  },
};

export const emitsParams = ['update:modelValue', 'change'];
