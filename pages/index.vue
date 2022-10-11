<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-22 21:30:33
-->
<template>
  <div></div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

const router = useRouter();

interface DataType {}

const data: DataType = reactive({});
onMounted(() => {
  router.replace({ path: '/home' });
});
</script>

<style lang="scss" scoped></style>
