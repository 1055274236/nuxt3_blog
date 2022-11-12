/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-13 00:51:58
 */
import { DataTypes, ModelAttributes } from 'sequelize';

export const BlogTable = {
  tableName: 'blog',
  col: {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    cover: DataTypes.TEXT,
    title: DataTypes.STRING(127),
    content: DataTypes.TEXT,
    tag: DataTypes.STRING(127),
    brief: DataTypes.STRING,
    file: DataTypes.TEXT,
    isShow: DataTypes.BOOLEAN,
    pageview: DataTypes.INTEGER,
    comment: DataTypes.INTEGER,
    like: DataTypes.INTEGER,
  } as ModelAttributes,
};
