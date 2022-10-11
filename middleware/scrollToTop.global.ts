/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-11 22:25:27
 */
import { nextTick } from 'vue';

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.fullPath === from.fullPath) return;
  if (process.client) {
    nextTick(() => {
      document.body.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
