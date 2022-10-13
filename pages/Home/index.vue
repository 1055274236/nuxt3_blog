<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 23:45:31
-->
<template>
  <div id="home">
    <!-- 主页内容 -->
    <div class="home-content">
      <div class="home-content-list">
        <div
          class="content-list-item wow animate__fadeInUp"
          v-for="(item, index) in data.blogList"
          :key="index"
          @click="itemClick(item.id)"
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
            <div class="brief">{{ item.brief }}</div>
            <div class="item-tag" v-if="item.tag">
              <div
                class="tag"
                v-for="(tagItem, tagIndex) in item.tag.split(',')"
                :key="tagIndex"
              >
                {{ tagItem }}
              </div>
            </div>
            <div class="item-right-footer">
              <div class="createdAt">
                {{ dateFormat(item.createdAt, 'YYYY-MM-DD') }}
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
import { HomeRequest } from '~~/api';
// import { lockScrollTo } from '@/utils';

const router = useRouter();
const route = useRoute();

interface DataType {
  blogList: any[];
  blogCount: number;
}

const data: DataType = reactive({
  blogList: [] as any[],
  blogCount: 0,
});

// 获取首页列表
const homeRequest = new HomeRequest();
const result = (await homeRequest.getList({ pageSize: 5 })).data;
data.blogList = result.list.rows;
data.blogCount = result.list.count;

// const { x, y } = useWindowScroll();
onMounted(async () => {
  useTitle("Ming' Blog");
});

const itemClick = (id: string) => {
  router.push({ path: `/details/${id}` });
};
</script>

<style lang="scss" scoped>
#home {
  .home-content {
    .home-content-list {
      display: flex;
      align-items: center;
      flex-direction: column;
      .content-list-item {
        display: flex;
        width: 90%;
        max-width: 1200px;
        min-width: 300px;
        padding: 10px 16px;
        // border: 1px dashed black;
        border-radius: 20px;
        background-color: white;
        transition: all 0.4s ease;
        margin: 20px 0;
        cursor: pointer;

        box-shadow: var(--Blog-shadow);
        // &:nth-child(odd) {
        //   align-self: flex-start;
        // }
        // &:nth-child(even) {
        //   align-self: flex-end;
        // }
        &:hover {
          width: 92%;
          box-shadow: 5px 5px 20px 15px #00000020;
          transform: rotateX(10deg);
        }
        .item-left {
          display: flex;
          justify-content: center;
          align-items: center;
          .cover {
            width: 120px;
            img {
              width: 100%;
            }
          }
        }
        .item-right {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin: 0 10px;
          .title {
            font-size: 20px;
            font-weight: 600;
          }
          .brief {
            line-height: 20px;
            min-height: 60px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
            user-select: none;
          }
          .item-tag {
            display: flex;
            // justify-content: center;
            align-items: center;
            user-select: none;
            opacity: 0.5;
            .tag {
              padding: 5px 10px;
              border-radius: 50px;
              color: black;
            }
          }
          .createdAt {
            text-align: right;
            user-select: none;
            opacity: 0.5;
          }
        }
      }
    }
  }
}
</style>
