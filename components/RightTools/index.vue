<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-15 22:48:25
-->
<template>
  <div id="right-tools">
    <!-- 博客粗略信息 -->
    <div class="header-box">
      <div class="header-content">
        <div class="header-img">
          <img :src="data.headerImgUrl" alt="headerImg" />
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
            <li>阅读量排序</li>
            <li>评论数排序</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

interface DataType {
  headerImgUrl: string;
  name: string;
  tip: string;
}

const data: DataType = reactive({
  headerImgUrl:
    'https://q.qlogo.cn/headimg_dl?dst_uin=1055274236&spec=640&img_type=jpg',
  name: "Ming's Blog",
  tip: '日行一善',
});
onMounted(() => {});
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
