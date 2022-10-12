<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 23:38:11
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
            <input
              type="text"
              v-model="data.keyword"
              placeholder="关键字"
              @change="search"
            />
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
          <div class="search-result-empty" v-if="!data.count">暂无结果</div>
          <div class="search-result-list" v-else>
            <div
              class="list-item"
              v-for="(item, index) in data.searchResult"
              :key="index"
            >
              <div class="title">{{ item.title }}</div>
              <div class="brief">{{ item.brief }}</div>
              <div class="createdAt">
                {{ dateFormat(item.createdAt, 'YYYY-MM-DD') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { BlogRequest } from '~~/api';
const blogRequest = new BlogRequest();

interface DataType {
  keyword: string;
  pageNo: number;
  pageSize: number;
  count: number;
  searchResult: any[];
  checkbox: { [key: string]: boolean };
}

const data: DataType = reactive({
  keyword: '',
  pageNo: 1,
  pageSize: 20,
  count: 0,
  searchResult: [],
  checkbox: { isContent: false, isTag: false, isTitle: false },
});

onMounted(() => {});

const getList = async () => {
  const result = await blogRequest.getList({
    keyword: data.keyword,
    offect: (data.pageNo - 1) * data.pageSize,
    pageSize: data.pageSize,
    isContent: data.checkbox.isContent,
    isTag: data.checkbox.isTag,
    isTitle: data.checkbox.isTitle,
  });
  data.searchResult = result.data.rows;
  data.count = result.data.count;
  console.log(data.count);
};
watch(
  [
    () => data.checkbox.isContent,
    () => data.checkbox.isTag,
    () => data.checkbox.isTitle,
  ],
  () => {
    search();
  }
);
const search = useDebounceFn(() => getList(), 500);
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
