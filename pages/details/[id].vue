<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-25 00:44:12
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
            <div class="root-comment">
              <div class="name" @click="changeReply(item)">
                {{ item.name }}
              </div>
              <div class="info" v-if="item.browser">
                <div class="browser">
                  <IconNet />
                  {{ item.browser }}
                </div>
                <div class="map" v-if="item.address">
                  <IconMap />
                  {{ item.address }}
                </div>
                <div class="createdAt">
                  <IconClock />
                  {{ dateFormat(item.createdAt) }}
                </div>
              </div>
              <div class="content" v-html="item.content"></div>
            </div>
            <!-- 回复 -->
            <div class="children">
              <div
                class="list-item"
                v-for="(citem, cindex) in item.children.rows"
                :key="cindex"
              >
                <div class="name" @click="changeReply(citem)">
                  {{ citem.name }}
                </div>
                <div class="info">
                  <div class="browser" v-if="citem.browser">
                    <IconNet />
                    {{ citem.browser }}
                  </div>
                  <div class="map" v-if="citem.address">
                    <IconMap />
                    {{ citem.address }}
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

      <div class="submit-comment">
        <!-- 添加评论 -->
        <div class="comment-header">
          <h2>添加评论</h2>
        </div>

        <!-- 表单 -->
        <form action="" class="form" @submit.prevent="submit">
          <div class="reply" v-show="data.replyName">
            <div class="form-label">回复：</div>
            <div class="reply-name">{{ data.replyName }}</div>
            <div class="remove-reply" @click="deleteReply"></div>
          </div>

          <div class="form-item">
            <div class="form-label">名称:</div>
            <input
              type="text"
              name="name"
              placeholder="名称"
              v-model="data.submitCommentParams.name"
            />
          </div>
          <div class="form-item">
            <div class="form-label">邮箱:</div>
            <input
              type="text"
              name="email"
              placeholder="邮箱（选填）"
              v-model="data.submitCommentParams.email"
            />
          </div>
          <div class="form-item">
            <div class="form-label">正文:</div>
            <textarea
              name="content"
              cols="30"
              rows="10"
              placeholder="正文"
              v-model="data.submitCommentParams.content"
            ></textarea>
          </div>
          <div class="options">
            <button type="submit">提交</button>
          </div>
        </form>
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

  pageSize: 100,
  pageNo: 1,
  replyName: '',
  submitCommentParams: {
    blog_id: id,
    name: '',
    email: '',
    content: '',
    root_parent_id: null,
    parent_id: null,
  },
});
// 获取信息
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
    key: new Date().getTime(),
  });
  data.commentCount = comment.data.count;
  data.comment = comment.data.rows;
};

const changeReply = (item) => {
  if (item.root_parent_id !== null)
    data.submitCommentParams.parent_id = item.id;
  data.submitCommentParams.root_parent_id = item.root_parent_id || item.id;
  data.replyName = item.name;
};
const deleteReply = () => {
  data.submitCommentParams.parent_id = null;
  data.submitCommentParams.root_parent_id = null;
  data.replyName = '';
};

const submitComment = async () => {
  if (data.submitCommentParams.content && data.submitCommentParams.name) {
    const result = await commentRequest.addByBlogId({
      ...data.submitCommentParams,
    });
    if (result.errcode === 200) {
      data.replyName = '';
      data.submitCommentParams = {
        blog_id: id,
        name: '',
        email: '',
        content: '',
        root_parent_id: null,
        parent_id: null,
      };
      getComment();
    }
  } else {
    addNotification({
      type: 'error',
      message: '请填写相关信息',
      title: '错误',
    });
  }
};

const submit = throttleFn(submitComment, 5000);
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
