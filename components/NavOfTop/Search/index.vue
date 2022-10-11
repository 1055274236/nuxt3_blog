<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-11 00:38:35
-->
<template>
  <div id="searchpage">
    <div class="search-box">
      <div class="search-content">
        <div class="input-box">
          <!-- 输入框 -->
          <div class="input-content">
            <div class="input-icon">
              <IconSearch />
            </div>
            <input type="text" v-model="data.keyword" placeholder="关键字" />
          </div>

          <!-- 条件选择 -->
          <div class="input-select">
            <Checkbox label="标题搜索" v-model="data.checkbox.isTitle" />
            <Checkbox label="标签搜索" v-model="data.checkbox.isTag" />
            <Checkbox label="正文搜索" v-model="data.checkbox.isContent" />
          </div>
        </div>

        <!-- 搜索结果 -->
        <div class="search-result">
          <div class="search-result-empty">暂无结果</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

interface DataType {
  keyword: string;
  checkbox: { [key: string]: boolean };
}

const data: DataType = reactive({
  keyword: '',
  checkbox: { isContent: false, isTag: false, isTitle: false },
});

onMounted(() => {});

const getList = async () => {};
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
