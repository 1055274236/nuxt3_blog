/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-07 23:38:18
 */
import { defineNuxtConfig } from 'nuxt/config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  vite: {},
  app: {
    head: {
      script: [{ src: 'https://cdn.bootcdn.net/ajax/libs/wow/1.1.2/wow.js' }],
      htmlAttrs: { lang: 'zh_CN' },
    },
  },
  css: ['animate.css/animate.css', '~/assets/style/element-plus.scss'],
});
