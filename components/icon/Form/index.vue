<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-17 23:57:21
-->
<template>
  <svg
    t="1666022273375"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="7424"
    width="200"
    height="200"
    v-if="fill"
  >
    <path
      d="M789.333333 170.666667a64 64 0 0 1 64 64v554.666666a64 64 0 0 1-64 64H234.666667a64 64 0 0 1-64-64V234.666667a64 64 0 0 1 64-64h554.666666zM341.333333 693.333333h-106.666666V789.333333h106.666666v-96z m448 0H405.333333V789.333333h384v-96zM341.333333 533.333333h-106.666666v96h106.666666V533.333333z m448 0H405.333333v96h384V533.333333z m-448-160h-106.666666V469.333333h106.666666v-96z m448 0H405.333333V469.333333h384v-96z"
      p-id="7425"
      fill="currentColor"
    ></path>
  </svg>
  <svg
    t="1666022212364"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="7282"
    width="200"
    height="200"
    v-else
  >
    <path
      d="M789.333333 170.666667a64 64 0 0 1 64 64v554.666666a64 64 0 0 1-64 64H234.666667a64 64 0 0 1-64-64V234.666667a64 64 0 0 1 64-64h554.666666zM341.333333 693.333333h-106.666666V789.333333h106.666666v-96z m448 0H405.333333V789.333333h384v-96zM341.333333 533.333333h-106.666666v96h106.666666V533.333333z m448 0H405.333333v96h384V533.333333z m-554.666666-160V469.333333h106.666666v-96h-106.666666zM789.333333 234.666667H234.666667v74.666666h554.666666V234.666667zM405.333333 469.333333h384v-96H405.333333V469.333333z"
      p-id="7283"
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
<style lang="scss"></style>
