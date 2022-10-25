<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-25 22:31:45
-->
<template>
  <div id="home">
    <div class="home-header">
      <div class="home-stik"></div>
      <div class="list-by-pageView">
        <NuxtLink
          :class="['list-item', { pageViewShow: data.pageViewIndex === index }]"
          v-for="(item, index) in data.listByPageView"
          :key="index"
          :to="`/details/${item.id}`"
        >
          <img :src="item.cover" :alt="item.title" class="item-img" />
          <div class="item-label">{{ item.title }}</div>
        </NuxtLink>
        <ul class="choose">
          <li
            :class="[
              'choose-item',
              { pageViewShow: data.pageViewIndex === index },
            ]"
            v-for="(item, index) in data.listByPageView"
            @mouseenter="
              () => {
                data.pageViewIndex = index;
                removeInterval();
              }
            "
            @mouseleave="addinterval"
          ></li>
        </ul>
      </div>
    </div>
    <!-- 主页内容 -->
    <div class="home-content">
      <div class="home-content-list">
        <NuxtLink
          :to="`/details/${item.id}`"
          class="content-list-item"
          v-for="(item, index) in data.blogList"
          :key="index"
        >
          <!-- @click="itemClick(item.id)" -->
          <div class="item-left">
            <div class="cover" v-if="item.cover">
              <img
                :src="item.cover"
                :alt="item.title"
                :onerror="() => (item.cover = null)"
              />
            </div>
          </div>
          <div class="item-right">
            <div class="title">{{ item.title }}</div>
            <div class="brief">{{ item.brief }}</div>
            <div class="item-tag" v-if="item.tag">
              <div
                class="tag"
                v-for="(tagItem, tagIndex) in item.tag.split(',')"
                :key="tagIndex"
              >
                {{ tagItem }}
              </div>
            </div>
            <div class="item-right-footer">
              <div class="createdAt">
                {{ dateFormat(item.createdAt, 'YYYY-MM-DD') }}
              </div>
            </div>
          </div>
        </NuxtLink>
        <Pagenation
          v-model="data.pageNow"
          :total="data.blogCount"
          :page-size="data.blogPageSize"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core';
import { reactive, onMounted } from 'vue';
import { HomeRequest } from '~~/api';

interface DataType {
  blogList: any[];
  blogCount: number;
  pageNow: number;
  blogPageSize: number;

  listByPageView: any[];
  pageViewIndex: number;
}

const data: DataType = reactive({
  blogList: [] as any[],
  blogCount: 0,
  blogPageSize: 20,
  pageNow: 1,

  listByPageView: [],
  pageViewIndex: 0,
});

// 获取首页列表
const homeRequest = new HomeRequest();
const result = (await homeRequest.getList({ pageSize: data.blogPageSize }))
  .data;
data.blogList = result.list.rows;
data.blogCount = result.list.count;
data.listByPageView = result.listByWatch.rows;

let interval = null;
onMounted(async () => {
  useTitle("Ming' Blog");
  addinterval();
});

const addinterval = () => {
  interval = setInterval(() => {
    data.pageViewIndex++;
    if (data.pageViewIndex >= data.listByPageView.length) {
      data.pageViewIndex = 0;
    }
  }, 5000);
};

const removeInterval = () => {
  clearInterval(interval);
};

onBeforeUnmount(() => {
  clearInterval(interval);
});

// 图片加载失败
const imgLoadError = (item: any) => {
  item.cover = 'http://static.thisisming.top/static/static/vue.png';
};
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
