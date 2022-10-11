<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-08-10 21:03:59
-->
<template>
  <svg
    t="1660051963480"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6598"
    width="100%"
    height="100%"
    v-if="!fill"
  >
    <path
      d="M484.267 272.021l6.634 6.72c5.974 5.974 13.014 12.843 21.099 20.63l9.195-8.918c7.253-7.04 13.44-13.184 18.56-18.432a193.28 193.28 0 0 1 277.44 0c75.904 77.526 76.629 202.795 2.133 281.195L512 853.333 204.672 553.237c-74.475-78.421-73.77-203.69 2.133-281.216a193.28 193.28 0 0 1 277.44 0z m293.162 232.15c46.272-53.76 44.182-136.15-5.973-187.371a129.28 129.28 0 0 0-185.984 0l-15.125 15.104a1687.253 1687.253 0 0 1-4.395 4.31L512 388.18l-49.28-47.445-13.227-12.928-10.965-11.008a129.28 129.28 0 0 0-186.005 0c-51.456 52.565-52.31 137.963-2.198 191.573L512 763.883l261.675-255.531 3.754-4.181z"
      p-id="6599"
      fill="currentColor"
    ></path>
  </svg>
  <svg
    t="1660052095005"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6740"
    width="100%"
    height="100%"
    v-else
  >
    <path
      d="M484.266667 272.021333l6.634666 6.72c5.973333 5.973333 13.013333 12.842667 21.098667 20.629334l9.194667-8.917334c7.253333-7.04 13.44-13.184 18.56-18.432a193.28 193.28 0 0 1 277.44 0c75.904 77.525333 76.629333 202.794667 2.133333 281.194667L512 853.333333 204.672 553.237333c-74.474667-78.421333-73.770667-203.690667 2.133333-281.216a193.28 193.28 0 0 1 277.44 0z"
      p-id="6741"
      fill="currentColor"
    ></path>
  </svg>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent } from 'vue';

interface DataProps {}

export default defineComponent({
  name: '',
  props: {
    fill: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const data: DataProps = reactive({});
    onMounted(() => {});
    return { ...toRefs(data) };
  },
});
</script>
<style lang="scss" scoped></style>
