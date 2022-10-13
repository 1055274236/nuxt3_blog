/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 22:01:34
 */
import { nextTick } from 'vue';

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/') setPageLayout('custom');
  else setPageLayout('default');
  if (to.fullPath === from.fullPath) return;
  if (process.client) {
    nextTick(() => {
      document.body.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
