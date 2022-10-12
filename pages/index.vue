<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 23:47:13
-->
<template>
  <div class="header-box">
    <div class="header-content wow animate__fadeInDown">
      <div class="header-img">
        <img
          src="https://q.qlogo.cn/headimg_dl?dst_uin=1055274236&spec=640&img_type=jpg"
          alt="headerImg"
        />
      </div>
      <div class="header-text">
        <div class="header-title">{{ data.title }}</div>
        <div class="header-tip">{{ data.tip }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

interface DataType {
  title: string;
  tip?: string;
}

const data: DataType = reactive({
  title: "Ming's Blog",
  tip: '日行一善',
});
onMounted(() => {});
</script>

<style lang="scss" scoped>
.header-box {
  background-color: gray;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background: url('@/assets/image/back1.jpg') center 0 no-repeat;
  background-size: cover;
  background-attachment: fixed;
  .header-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .header-img {
      width: 160px;
      height: 160px;
      transition: all 1s ease;
      position: relative;
      // scale: 1.6;
      &:hover {
        transform: rotate(360deg);
      }
      border-radius: 50%;
      overflow: hidden;
      border: 5px solid #ffffff20;
      box-shadow: 0 0 20px 1px #ffffff60;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .header-text {
      color: white;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      background-color: #f5f5f560;
      backdrop-filter: saturate(50%) blur(4px);
      width: 80vw;
      max-width: 800px;
      border-radius: 20px;
      margin-top: 20px;
      & > * {
        margin: 20px 0;
      }
    }
  }
}
</style>
