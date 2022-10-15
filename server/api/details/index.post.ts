/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-11 01:17:19
 */
import { BlogProcess } from '../../process';

const blogProcess = new BlogProcess();

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  return blogProcess.getDetails(body);
});
