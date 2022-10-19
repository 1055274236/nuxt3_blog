<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-20 01:18:28
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
    <div class="comment-box">
      <!-- 评论 -->
      <div class="comment-header">
        <h2>评论</h2>
        <div class="comment-count">共有 {{ data.commentCount }} 条评论</div>
      </div>
      <div class="comment-content">
        <div class="comment-empty" v-if="data.commentCount === 0">暂无评论</div>
        <div class="comment-list" v-else>
          <div
            class="list-item"
            v-for="(item, index) in data.comment"
            :key="index"
          >
            <div class="name">
              {{ item.name }}
            </div>
            <div class="info">
              <div class="browser">
                <IconNet />
                {{ item.browser }}
              </div>
              <div class="createdAt">
                <IconClock />
                {{ dateFormat(item.createdAt) }}
              </div>
            </div>
            <div class="content" v-html="item.content"></div>
            <!-- 回复 -->
            <div class="children">
              <div
                class="list-item"
                v-for="(citem, cindex) in item.children.rows"
                :key="cindex"
              >
                <div class="name">
                  {{ citem.name }}
                </div>
                <div class="info">
                  <div class="browser">
                    <IconNet />
                    {{ citem.browser }}
                  </div>
                  <div class="createdAt">
                    <IconClock />
                    {{ dateFormat(citem.createdAt) }}
                  </div>
                </div>
                <div class="parent" v-if="citem.parent">
                  <div class="name">{{ citem.parent.name }}</div>
                  <div class="content" v-html="citem.parent.content"></div>
                </div>
                <div class="content" v-html="citem.content"></div>
              </div>
            </div>
          </div>
          <Pagenation
            v-model="data.pageNo"
            :total="data.commentCount"
            :page-size="data.pageSize"
            @change="getComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core';
import { reactive, onMounted } from 'vue';
import { BlogRequest, CommentRequest } from '~~/api';
const route = useRoute();
const blogRequest = new BlogRequest();
const commentRequest = new CommentRequest();
const id = route.params.id;
const data = reactive({
  details: {} as any,
  commentCount: 0,
  comment: [],

  pageSize: 20,
  pageNo: 1,
});
const [details, comment] = await Promise.all([
  blogRequest.getDetails({ id }),
  commentRequest.getByID({ id }),
]);
data.details = details.data.details;
data.commentCount = comment.data.count;
data.comment = comment.data.rows;

onMounted(() => {
  useTitle(data.details.title);
});

const getComment = async () => {
  const comment = await commentRequest.getByID({
    id,
    offset: (data.pageNo - 1) * data.pageSize,
    pageSize: data.pageSize,
  });
  data.commentCount = comment.data.count;
  data.comment = comment.data.rows;
};
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
