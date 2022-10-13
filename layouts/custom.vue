<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 21:57:55
-->
<template>
  <div id="app">
    <div id="app-content">
      <div class="left-content">
        <slot />
      </div>
      <div class="right-content">
        <RightTools />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

interface DataType {}

const data: DataType = reactive({});
onMounted(() => {});
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  #app-content {
    display: flex;
    width: 100%;
    max-width: 1300px;
    margin-top: 80px;
    .left-content {
      flex: 1;
    }
    .right-content {
      width: 25%;
    }
  }
}
@media screen and (max-width: 992px) {
  #app-content {
    align-items: center;
    flex-direction: column;
    .left-content {
      width: 100%;
    }
    .right-content {
      width: 100%;
    }
  }
}
</style>
