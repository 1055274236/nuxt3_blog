<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-07 22:38:55
-->
<template>
  <div id="edit">
    <div class="edit-box">
      <div :class="['left-box', { no: isFlag }]">
        <div class="options-box">
          <div class="options-list">
            <NuxtLink
              :to="item.link"
              class="list-item"
              v-for="(item, index) in options"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="right-box">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

const isFlag = ref(false);

const { y } = useWindowScroll();

const options = [
  { link: '/edit/blog', label: '博客管理' },
  { link: '/edit/comment', label: '评论管理' },
];
watch(y, (newValue, oldValue) => {
  isFlag.value = newValue > oldValue;
});

onMounted(() => {
  console.log('bad');
});
</script>

<style lang="scss" scoped>
#edit {
  min-height: 100vh;
  min-width: 1300px;
  .edit-box {
    display: flex;
    width: 100%;
    min-height: 100vh;
    .left-box {
      position: sticky;
      padding: 0 16px;
      top: 80px;
      width: calc(20% - 32px);
      height: 100%;
      transition: all 0.5s ease;
      &.no {
        top: 40px;
      }
      .options-box {
        background-color: var(--Blog-color-back);
        border-radius: 20px;
        max-height: 80vh;
        overflow-y: auto;

        .options-list {
          display: flex;
          flex-direction: column;
          .list-item {
            margin: 20px auto;
          }
        }
      }
    }
    .right-box {
      padding-top: 60px;
      flex: 1;
    }
  }
}
</style>
