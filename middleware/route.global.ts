/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-31 20:11:47
 */
import { nextTick } from 'vue';

const customArr = ['details', 'home'];

export default defineNuxtRouteMiddleware((to, from) => {
  if (customArr.some((item) => to.path.includes(item))) setPageLayout('custom');
  else setPageLayout('default');
  if (to.fullPath === from.fullPath) return;
  if (process.client) {
    nextTick(() => {
      document.body.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
