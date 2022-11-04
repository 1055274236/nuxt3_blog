<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-04 21:55:12
-->
<template>
  <NavOfTop />
  <NuxtLayout>
    <NuxtPage :transition="{ name: 'slide-fade-top' }" />
  </NuxtLayout>
  <Footer />
</template>

<script setup>
import { loadMagnetic } from '@/utils';
import { onMounted, nextTick } from 'vue';
import { BaseRequest } from '@/api';
import optionsStore from '@/stores/options';

const baseRequest = new BaseRequest();
const useOptions = optionsStore();

const initOptions = async () => {
  const result = await baseRequest.getOptions({ key: 'records,tinykey' });
  const data = result.data;
  useOptions.init({ records: data.records.value, tinyKey: data.tinykey.value });
};
await initOptions();

onMounted(() => {
  nextTick(async () => {
    if (process.client) {
      loadMagnetic();
      const wow = new WOW({
        boxClass: 'wow', // 需要执行动画的元素的 class
        animateClass: 'animate__animated', //animation.css 动画的 class
        offset: 0, // 距离可视区域多少开始执行动画
        mobile: true, // 是否在移动设备上执行动画
        live: false,
        scrollContainer: null, // optional scroll container selector, otherwise use window
      });
      wow.init();
    }
  });
});
</script>

<style lang="scss">
@use '@/assets/style/base.scss';
@use '@/assets/style/animate.scss';
</style>
