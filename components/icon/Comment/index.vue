<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 23:55:07
-->
<template>
  <svg
    t="1665935699093"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6291"
    width="200"
    height="200"
    v-if="fill"
  >
    <path
      d="M810.666667 213.333333a64 64 0 0 1 64 64v426.666667a64 64 0 0 1-64 64H478.336l-146.645333 96.106667A21.333333 21.333333 0 0 1 298.666667 846.250667V768h-85.333334a64 64 0 0 1-64-64V277.333333a64 64 0 0 1 64-64h597.333334zM539.306667 490.666667H362.666667v64h176.64v-64zM661.333333 362.666667H362.666667v64h298.666666v-64z"
      p-id="6292"
      fill="currentColor"
    ></path>
  </svg>
  <svg
    t="1665935606040"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6149"
    width="200"
    height="200"
    v-else
  >
    <path
      d="M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334z m0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333z m-271.36 213.334v64h-176.64v-64h176.64z m122.026-128v64H362.667v-64h298.666z"
      p-id="6150"
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
