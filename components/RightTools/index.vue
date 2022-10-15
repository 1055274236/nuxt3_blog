<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-15 22:38:47
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
      <div class="order-content"></div>
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
#right-tools {
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header-box {
    background-color: #fff;
    width: 95%;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: var(--Blog-shadow);

    .header-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      .header-img {
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      .header-name {
        margin: 10px 0;
      }
    }
  }
}
</style>
