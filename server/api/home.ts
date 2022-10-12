/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 01:28:54
 */
import { BlogProcess } from '../process';

const blogProcess = new BlogProcess();

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  return blogProcess.getDetails(body);
});
