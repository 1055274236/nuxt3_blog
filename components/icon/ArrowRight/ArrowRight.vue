<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-08-15 00:53:49
-->
<template>
  <svg
    t="1660496023819"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6388"
    width="100%"
    height="100%"
  >
    <path
      d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z"
      p-id="6389"
    ></path>
  </svg>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent } from 'vue';

interface DataType {}

export default defineComponent({
  name: '',
  setup() {
    const data: DataType = reactive({});
    onMounted(() => {});
    return { ...toRefs(data) };
  },
});
</script>
<style lang="scss" scoped></style>
