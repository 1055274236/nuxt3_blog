/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 22:51:03
 */
import { HomeProcess } from '../process';

const homeProcess = new HomeProcess();

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  return homeProcess.getHomeBase(body);
});
