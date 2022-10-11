<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-11 21:11:49
-->
<template>
  <div id="home">
    <!-- 头 -->
    <div class="home-header-box">
      <Header />
    </div>

    <!-- 主页内容 -->
    <div class="home-content">
      <div class="home-content-list">
        <div
          class="content-list-item wow animate__fadeInUp"
          v-for="(item, index) in data.blogRequestRows"
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
import { useTitle, useThrottleFn, useDebounceFn } from '@vueuse/core';
import { reactive, onMounted } from 'vue';
import { BlogRequest } from '~~/api';
// import { lockScrollTo } from '@/utils';
import Header from './Header.vue';

const router = useRouter();
const route = useRoute();

interface DataType {
  blogRequestRows: any[];
}

const data: DataType = reactive({
  blogRequestRows: [] as any[],
});

// 获取首页列表
const blogRequest = new BlogRequest();
const result = await blogRequest.getList({ pageSize: 5 });
data.blogRequestRows = result.data.rows;

// const { x, y } = useWindowScroll();
onMounted(async () => {
  useTitle("Ming' Blog");
  if (process.client) {
    const windowHeight = window.innerHeight;

    // let oldValue = window.scrollY;
    // const scrollTo = lockScrollTo();
    // const scroll = useThrottleFn((top) => scrollTo(top, 500), 500);
    // window.addEventListener('scroll', (e) => {
    //   if (window.scrollY > windowHeight) return;
    //   else {
    //     if (window.scrollY - oldValue > 0) {
    //       scroll(windowHeight);
    //     } else {
    //       scroll(0);
    //     }
    //   }
    //   oldValue = window.scrollY;
    // });

    // const scrollTo = (top: number) => {
    //   const fun = (e: Event) => {
    //     e.preventDefault();
    //   };
    //   window.addEventListener('wheel', fun, { passive: false });
    //   window.addEventListener('touchmove', fun, { passive: false }); //passive 参数不能省略，用来兼容ios和android
    //   window.scrollTo({
    //     top,
    //     behavior: 'smooth',
    //   });
    //   setTimeout(() => {
    // window.removeEventListener('wheel', fun);
    // window.removeEventListener('touchmove', fun);
    //   }, 500);
    // };
    // const scrollTop = useThrottleFn(() => scrollTo(0), 500);
    // const scrollDown = useThrottleFn(() => scrollTo(windowHeight), 500);
    // let oldValue = window.scrollY;
    // window.addEventListener('scroll', (e) => {
    //   if (window.scrollY <= windowHeight) {
    //     if (window.scrollY - oldValue > 0) {
    //       scrollDown();
    //     } else {
    //       scrollTop();
    //     }
    //   }
    //   oldValue = window.scrollY;
    // });

    // 备案
    window.onwheel = (e) => {
      if (e.wheelDeltaY < 0 && window.scrollY < windowHeight) {
        setTimeout(() => {
          window.scrollTo({ top: windowHeight, behavior: 'smooth' });
        });
      } else if (e.wheelDeltaY > 0 && window.scrollY <= windowHeight + 20) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    };
  }
});

const itemClick = (id: string) => {
  router.push({ path: `/details/${id}` });
};
</script>

<style lang="scss" scoped>
#home {
  .home-content {
    margin: 16px 0;
    margin-top: 80px;
    .home-content-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      // flex-wrap: wrap;
      padding: 0 10vw;
      .content-list-item {
        display: flex;
        width: 60vw;
        max-width: 1200px;
        min-width: 300px;
        padding: 10px 16px;
        // border: 1px dashed black;
        border-radius: 20px;
        background-color: white;
        transition: all 0.4s ease;
        margin: 20px 0;
        cursor: pointer;

        box-shadow: 5px 5px 20px 5px #00000020;
        // &:nth-child(odd) {
        //   align-self: flex-start;
        // }
        // &:nth-child(even) {
        //   align-self: flex-end;
        // }
        &:hover {
          width: 62vw;
          box-shadow: 5px 5px 20px 20px #00000020;
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
