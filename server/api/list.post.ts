/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 00:56:22
 */
import { BlogProcess } from '../process';

const blogProcess = new BlogProcess();

export default defineEventHandler(async (event) => {
  console.log(event.req);

  const body = await useBody(event);
  return blogProcess.getList(body);
});
