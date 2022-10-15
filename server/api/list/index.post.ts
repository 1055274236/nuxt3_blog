/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 11:36:08
 */
import { BlogProcess } from '../process';

const blogProcess = new BlogProcess();

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  return blogProcess.getList(body);
});
