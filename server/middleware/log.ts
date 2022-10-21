/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-22 00:00:37
 */
export default defineEventHandler(async (event) => {
  console.log(getHeaders(event));
});
