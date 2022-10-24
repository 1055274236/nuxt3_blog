<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-24 23:19:58
-->
<template>
  <svg
    t="1666624825892"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="7416"
    width="200"
    height="200"
    v-if="fill"
  >
    <path
      d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m-192 330.666667v64h384v-64H320z"
      p-id="7417"
      fill="currentColor"
    ></path>
  </svg>
  <svg
    t="1666624769035"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="7274"
    width="200"
    height="200"
    v-else
  >
    <path
      d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m0 64c-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666667z m-192 266.666667h384v64H320v-64z"
      p-id="7275"
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
