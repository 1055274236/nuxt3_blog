<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-18 00:52:36
-->
<template>
  <div id="details">
    <div class="details-content">
      <!-- 头部信息 -->
      <div class="header">
        <!-- 标题 -->
        <h1 class="title">
          {{ data.details.title }}
        </h1>
        <!-- 粗略信息 -->
        <div class="info">
          <div class="info-content">
            <!-- 时间 -->
            <div class="createdAt">
              <IconClock />
              {{ dateFormat(data.details.createdAt, 'YYYY-MM-DD') }}
            </div>
            <div class="pageview">
              <IconBrowse />
              {{ data.details.pageview }}
            </div>
            <div class="comment">
              <IconComment />
              {{ data.details.comment }}
            </div>
            <div class="like">
              <IconFavorites />
              {{ data.details.like }}
            </div>
            <div class="tag">
              <IconForm fill />
              {{ data.details.tag.split(',').join(' ') }}
            </div>
          </div>
        </div>
      </div>

      <!-- 概括 -->
      <div class="brief">
        <div class="brief-content">
          {{ data.details.brief }}
        </div>
      </div>

      <!-- 正文 -->
      <div class="context">
        <div class="context-content" v-html="data.details.content"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core';
import { reactive, onMounted } from 'vue';
import { BlogRequest } from '~~/api';
const route = useRoute();
const blogRequest = new BlogRequest();
const id = route.params.id;
const data = reactive({
  details: {} as any,
});
const result = await blogRequest.getDetails({ id });
data.details = result.data.details;

onMounted(() => {
  useTitle(data.details.title);
});
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
