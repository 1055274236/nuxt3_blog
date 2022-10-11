/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-10 19:30:31
 */
import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt'],
  vite: {},
  app: {
    head: {
      script: [{ src: 'https://cdn.bootcdn.net/ajax/libs/wow/1.1.2/wow.js' }],
      htmlAttrs: { lang: 'zh_CN' },
    },
  },
  css: ['animate.css/animate.css'],
});
