<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-08-09 21:04:07
-->
<template>
  <svg
    t="1660048898851"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6306"
    width="100%"
    height="100%"
    v-if="!fill"
  >
    <path
      d="M556.586667 159.36l288.490666 183.914667A64 64 0 0 1 874.666667 397.248v392.746667a64 64 0 0 1-64 64H555.456l0.021333-196.992H490.666667v196.992H234.666667a64 64 0 0 1-64-64v-398.293334a64 64 0 0 1 30.272-54.4l287.530666-178.346666a64 64 0 0 1 68.138667 0.426666zM810.666667 790.016V397.226667L522.197333 213.333333 234.666667 391.68v398.336h192v-197.013333h192.810666v196.992H810.666667z"
      p-id="6307"
      fill="currentColor"
    ></path>
  </svg>
  <svg
    t="1660049003004"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6448"
    width="100%"
    height="100%"
    v-else
  >
    <path
      d="M556.586667 159.36l288.490666 183.914667A64 64 0 0 1 874.666667 397.248v392.746667a64 64 0 0 1-64 64l-224-0.021334V597.333333H448v256.64l-213.333333 0.042667a64 64 0 0 1-64-64V391.68a64 64 0 0 1 30.272-54.4l287.530666-178.346667a64 64 0 0 1 68.138667 0.426667z"
      p-id="6449"
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
