/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 23:01:56
 */
import { BlogProcess } from '~~/server/process';

const blogProcess = new BlogProcess();

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  return blogProcess.getList(body);
});
