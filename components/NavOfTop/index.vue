<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-11 22:26:49
-->
<template>
  <div>
    <div id="navoftop-box" :class="[data.isNotTop ? 'isNotTop' : '']">
      <div class="navoftop-content">
        <div :class="['mult-box', data.isClickMult ? 'clickMult' : '']">
          <div class="mult-content">
            <div
              class="mult-button"
              v-for="(item, index) in data.multButtonArr"
              :key="index"
            >
              <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
            </div>
          </div>
        </div>
        <div
          :class="[
            'navoftop-button',
            'mult',
            data.isClickMult ? 'clickMult' : '',
          ]"
          @click="() => (data.isClickMult = !data.isClickMult)"
        >
          <div class="mult-line"></div>
          <div class="mult-line"></div>
          <div class="mult-line"></div>
        </div>
        <div class="navoftop-button search">
          <IconSearch @click="() => (data.searchShow = true)" />
        </div>
        <div class="navoftop-button"></div>
      </div>
    </div>
    <Transition name="slide-fade-top">
      <div class="stick" v-show="data.isNotTop" @click="scrollToTop"></div>
    </Transition>
    <BaseShade v-model:show="data.searchShow" clickBackClose>
      <SearchPage />
    </BaseShade>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import SearchPage from './Search/index.vue';

const { x, y } = useWindowScroll();

interface DataType {
  isClickMult: boolean;
  searchShow: boolean;
  isNotTop: boolean;
  multButtonArr: {
    link: string;
    name: string;
  }[];
}

const data: DataType = reactive({
  isClickMult: false,
  searchShow: false,
  isNotTop: false,
  multButtonArr: [
    { link: '/', name: '主页' },
    { link: '/home', name: '博客' },
    { link: '#', name: '文件' },
  ],
});
onMounted(() => {
  data.isNotTop = y.value > 50;
});

watch(y, (newValue) => {
  data.isNotTop = newValue > 50;
});

const scrollToTop = () => {
  if (process.client) {
    document.body.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
