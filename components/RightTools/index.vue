<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 02:35:03
-->
<template>
  <div id="right-tools">
    <!-- 博客粗略信息 -->
    <div class="header-box">
      <div class="header-content">
        <div class="header-img">
          <img :src="data.headImgUrl" alt="headerImg" />
        </div>
        <div class="header-name">{{ data.name }}</div>
        <div class="header-tip">{{ data.tip }}</div>
      </div>
    </div>

    <!-- 博客列表信息排位 -->
    <div class="list-order">
      <div class="order-content">
        <div class="order-header">
          <ul class="header-list">
            <li
              @click="() => (data.choseIndex = 0)"
              :class="{ select: data.choseIndex === 0 }"
            >
              喜爱排序
            </li>
            <li
              @click="() => (data.choseIndex = 1)"
              :class="{ select: data.choseIndex === 1 }"
            >
              评论排序
            </li>
          </ul>
        </div>
        <div class="list-content">
          <div :class="['content-list', { select: data.choseIndex === 0 }]">
            <NuxtLink
              :to="`/details/${item.id}`"
              class="list-item"
              v-for="(item, index) in data.listByLike"
              :key="index"
            >
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
                <div class="item-right-footer">
                  <div class="createdAt">
                    {{ dateFormat(item.createdAt, 'YYYY-MM-DD') }}
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div :class="['content-list', { select: data.choseIndex === 1 }]">
            <NuxtLink
              :to="`/details/${item.id}`"
              class="list-item"
              v-for="(item, index) in data.listByComment"
              :key="index"
            >
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
                <div class="item-right-footer">
                  <div class="createdAt">
                    {{ dateFormat(item.createdAt, 'YYYY-MM-DD') }}
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { BaseRequest } from '~~/api';
const baseRequest = new BaseRequest();

interface DataType {
  headImgUrl: string;
  name: string;
  tip: string;
  listByLike: any[];
  listByComment: any[];
  choseIndex: number;
}

const data: DataType = reactive({
  headImgUrl:
    'https://q.qlogo.cn/headimg_dl?dst_uin=1055274236&spec=640&img_type=jpg',
  name: "Ming's Blog",
  tip: '日行一善',
  listByLike: [],
  listByComment: [],
  choseIndex: 0,
});

// 接口获取信息
const result = (await baseRequest.getRightToolsBase()).data;
const options = JSON.parse(JSON.stringify(result.options));

data.headImgUrl = options.headImg.value;
data.name = options.name.value;
data.tip = options.tip.value;
data.listByComment = result.listByComment.rows;
data.listByLike = result.listByLike.rows;

onMounted(() => {});
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
