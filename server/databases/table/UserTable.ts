/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-11 22:59:23
 */
import { DataTypes, ModelAttributes } from 'sequelize';

export const UserTable = {
  tableName: 'user',
  col: {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    user: DataTypes.STRING(63),
    password: DataTypes.STRING(127),
    name: DataTypes.STRING(31),
    head_portrait: DataTypes.STRING,
  } as ModelAttributes,
};
