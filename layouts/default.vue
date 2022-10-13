<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 21:40:12
-->
<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

interface DataType {}

const data: DataType = reactive({});
onMounted(() => {});
</script>

<style lang="scss" scoped></style>
