/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 23:12:07
 */
import { DataTypes, ModelAttributes } from 'sequelize';

export const OptionsTable = {
  tableName: 'options',
  col: {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    key: DataTypes.STRING,
    value: DataTypes.TEXT,
    remark: DataTypes.TEXT,
  } as ModelAttributes,
};
