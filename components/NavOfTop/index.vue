<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 22:33:32
-->
<template>
  <div>
    <div
      id="navoftop-box"
      :class="[
        $route.path !== '/' ? 'isNotTop' : '',
        data.isHide ? 'hide' : '',
      ]"
    >
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
  isHide: boolean;
  multButtonArr: {
    link: string;
    name: string;
  }[];
}

const data: DataType = reactive({
  isClickMult: false,
  searchShow: false,
  isNotTop: false,
  isHide: false,
  multButtonArr: [
    { link: '/', name: '主页' },
    { link: '/home', name: '博客' },
  ],
});
onMounted(() => {
  // 有时候刷新不识别，加个语句
  data.isNotTop = y.value > 50;
});

watch(y, (newValue, oldValue) => {
  data.isNotTop = newValue > 50;
  data.isHide = newValue - oldValue > 0;
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
