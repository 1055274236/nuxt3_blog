/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 22:27:03
 */
import { BaseProcess } from '~~/server/process';

const baseProcess = new BaseProcess();

export default defineEventHandler(async (event) => {
  const params = await useBody(event);
  console.log('bad');

  console.log(event);

  return baseProcess.getOptions(params);
});
