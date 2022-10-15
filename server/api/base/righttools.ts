/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 00:33:13
 */
import { BaseProcess } from '~~/server/process';

const baseProcess = new BaseProcess();

export default defineEventHandler(async () => {
  return baseProcess.getRightToolsBase();
});
