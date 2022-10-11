<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-08-11 16:09:22
-->
<template>
  <svg
    t="1660139669331"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="8619"
    width="100%"
    height="100%"
  >
    <path
      d="M512 128C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128z m0 64c177.12 0 320 142.88 320 320s-142.88 320-320 320S192 689.12 192 512 334.88 192 512 192z m-128 160v320h64V352z m192 0v320h64V352z"
      p-id="8620"
      fill="currentColor"
    ></path>
  </svg>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent } from 'vue';

interface DataProps {}

export default defineComponent({
  name: '',
  setup() {
    const data: DataProps = reactive({});
    onMounted(() => {});
    return { ...toRefs(data) };
  },
});
</script>
<style lang="scss" scoped></style>
