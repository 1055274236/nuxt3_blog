/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 23:35:56
 */
import { Sequelize, Options, ModelAttributes } from 'sequelize';
import config from '~~/main_config';

export const sequelize = new Sequelize(
  config.dataBases.name,
  config.dataBases.user,
  config.dataBases.password,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: config.dataBases.port || 3306,
    timezone: config.dataBases.timezone || '+08:00',
    logging: () => {},
    pool: {
      max: 20,
    },
  }
);

/**
 * @description: 返回一个默认的连接
 * @param moduleName: string 模型名称 | 表格名称
 * @param attributes: ModelAttributes 表格变量
 * @param options: Options 该链接定义
 * @return ModelCtor<Model<any, any>>
 * @author: Ming
 */
export function defineConnect(
  moduleName: string,
  attributes: ModelAttributes,
  options?: Options
) {
  return sequelize.define(moduleName, attributes, {
    ...options,
    freezeTableName: true,
  });
}
