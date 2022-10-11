/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 00:05:20
 */
import { DataTypes, ModelAttributes } from 'sequelize';

export const CommentTable = {
  tableName: 'comment',
  col: {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    content: DataTypes.TEXT,
    blog_id: DataTypes.UUID,
    parent_id: DataTypes.UUID,
    root_parent_id: DataTypes.UUID,
    device: DataTypes.STRING,
    browser: DataTypes.STRING,
    ip: DataTypes.STRING,
  } as ModelAttributes,
};
