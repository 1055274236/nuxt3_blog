/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-05 01:41:04
 */
import { nextTick } from 'vue';

const customArr = ['details', 'home'];

export default defineNuxtRouteMiddleware((to, from) => {
  if (customArr.some((item) => to.path.includes(item))) setPageLayout('custom');
  else if (to.path.includes('/edit/')) setPageLayout('edit');
  else setPageLayout('default');
  if (to.fullPath === from.fullPath) return;
  if (process.client) {
    nextTick(() => {
      document.body.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
