<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-19 00:04:57
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

      <div class="comment">
        <!-- 评论 -->
        <h2>评论</h2>
        <div class="comment-content">
          <div class="comment-list">
            <div
              class="list-item"
              v-for="(item, index) in data.comment"
              :key="index"
            >
              <div class="name">
                {{ item.name }}
              </div>
              <div class="info">
                {{ item.brower }}
              </div>
              <div class="content" v-html="item.content"></div>
              <!-- 回复 -->
              <div class="children">
                <div
                  class="list-item"
                  v-for="(citem, cindex) in item.children"
                  :key="cindex"
                >
                  <div class="name">
                    {{ citem.name }}
                  </div>
                  <div class="info">
                    {{ citem.brower }}
                  </div>
                  <div class="content" v-html="citem.content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  commentCount: 0,
  comment: [],
});
const result = await blogRequest.getDetails({ id });
data.details = result.data.details;
data.commentCount = result.data.comment.count;
data.comment = result.data.comment.rows;

onMounted(() => {
  useTitle(data.details.title);
});
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
