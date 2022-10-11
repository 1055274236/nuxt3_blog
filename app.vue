<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-11 19:32:31
-->
<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <!-- <NuxtChild /> -->
    <NavOfTop />
    <NuxtPage :transition="{ name: 'slide-fade-top' }" />
    <!-- <Loading /> -->
  </div>
</template>

<script setup>
import { loadMagnetic } from '@/utils';
import { onMounted, provide, nextTick } from 'vue';
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
