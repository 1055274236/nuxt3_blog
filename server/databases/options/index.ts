/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 23:22:24
 */
import { FindAndCountOptions, Op } from 'sequelize';
import { defineConnect } from '../sequelize';

import { OptionsTable } from '../table';

const OptionsContent = defineConnect(OptionsTable.tableName, OptionsTable.col);

export const OptionsDatabasesOperate = {
  /**
   * @description: 获取设置的值
   * @params { key } params
   * @return result
   * @author: Ming
   */
  async getValue(params) {
    let { key } = params;

    // 将参数分隔成数组，同时将所有的参数查询请求丢进数组，方便 Promise.all 查询
    let keyArr = key.split(','),
      result = {},
      promiseArr = [];

    for (let n of keyArr) {
      let options: FindAndCountOptions = {
        where: { key: n },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      };

      promiseArr.push(OptionsContent.findOne({ ...options }));
    }

    let resultArr = await Promise.all(promiseArr);
    for (let i = 0; i < promiseArr.length; i++) {
      result[keyArr[i]] = resultArr[i];
    }
    return result;
  },
};
