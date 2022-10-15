<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-15 00:39:43
-->
<template>
  <div id="app">
    <div id="app-content">
      <div class="left-content">
        <slot />
      </div>
      <aside class="right-content">
        <RightTools />
      </aside>
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
    margin: 80px 0;
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
