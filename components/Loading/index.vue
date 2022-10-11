<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-19 22:57:05
-->
<template>
  <div id="blog_loading">
    <div class="loading-box">
      <div class="loading-content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
function hideLoading(position: string = 'top') {
  let positionArr = ['top', 'right', 'bottom', 'left'];
  let index;
  if ((index = positionArr.indexOf(position)) !== -1) {
    switch (index) {
      case 0:
        break;
    }
  } else {
    console.warn('该隐藏位置不存在');
  }
}

defineExpose(hideLoading);
</script>

<style lang="scss" scoped>
#blog_loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(200, 200, 200, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  .loading-box {
    display: flex;
    .loading-content {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 8px solid #0000;
      border-right-color: black;
      border-right-color: var(--Blog-color-primary);
      position: relative;
      animation: s4 1s infinite linear;

      &::before,
      &::after {
        content: '';
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        border: inherit;
        animation: inherit;
        animation-duration: 2s;
      }

      &::after {
        animation-duration: 4s;
      }
    }
  }
  @keyframes s4 {
    100% {
      transform: rotate(1turn);
    }
  }
}
</style>
