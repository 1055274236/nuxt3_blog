<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 22:03:16
-->
<template>
  <div class="pagenation">
    <div class="pagenation-box">
      <div class="pagenation-content">
        <!-- 总数据 -->
        <div class="pagenation-total" v-if="props.total">
          共 {{ props.total }} 条数据
        </div>

        <!-- 跳转 -->
        <!-- <div class="pagenation-skip">
          跳转
          <input
            type="text"
            v-model="data.inputPage"
            @input="
              () => (data.inputPage = data.inputPage.replace(/[^0-9.]/g, ''))
            "
            @keyup="skipPage"
          />
          页
        </div> -->

        <!-- 分页按钮控制 -->
        <div class="pagenation-main">
          <!-- 向左减一 -->
          <div
            :class="[
              'pagenation-left',
              'pagenation-button',
              { 'pagenation-forbid': data.pageNow === 1 },
            ]"
            @click="clickPage(data.pageNow - 1)"
          ></div>
          <!-- 页码点击 -->
          <div class="pagenation-button-box">
            <div class="button-content" v-if="data.totalPage > 9">
              <div
                :class="[
                  'pagenation-item',
                  'pagenation-button',
                  { isActive: data.pageNow === item },
                ]"
                v-for="item in data.leftButton"
                @click="clickPage(item)"
              >
                {{ item }}
              </div>

              <div class="pagenation-forbid" v-if="data.pageNow > 5">...</div>

              <div
                :class="[
                  'pagenation-item',
                  'pagenation-button',
                  { isActive: data.pageNow === item },
                ]"
                v-for="item in data.centerButton"
                @click="clickPage(item)"
              >
                {{ item }}
              </div>

              <div
                class="pagenation-forbid"
                v-if="data.pageNow < data.totalPage - 5"
              >
                ...
              </div>

              <div
                :class="[
                  'pagenation-item',
                  'pagenation-button',
                  { isActive: data.pageNow === item },
                ]"
                v-for="item in data.rightButton"
                @click="clickPage(item)"
              >
                {{ item }}
              </div>
            </div>

            <div class="button-content" v-else>
              <div
                :class="[
                  'pagenation-item',
                  'pagenation-button',
                  { isActive: data.pageNow === item },
                ]"
                v-for="item in data.totalPage"
                @click="clickPage(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <!-- 向右加一 -->
          <div
            :class="[
              'pagenation-right',
              'pagenation-button',
              { 'pagenation-forbid': data.pageNow === data.totalPage },
            ]"
            @click="clickPage(data.pageNow + 1)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { emitsParams, propsParams } from './params';

const props = defineProps(propsParams);

const emits = defineEmits(emitsParams);

interface DataType {
  totalPage: number;
  pageNow: number;
  leftButton: number[];
  centerButton: number[];
  rightButton: number[];
  inputPage: string;
}

const data: DataType = reactive({
  totalPage: 1,
  pageNow: 1,
  leftButton: [],
  centerButton: [],
  rightButton: [],
  inputPage: '',
});
onMounted(() => {
  init();
});

const init = () => {
  // 页数限制
  if (props.total && props.pageSize) {
    data.totalPage = Math.ceil(props.total / props.pageSize);
  } else if (props.totalPage) {
    data.totalPage = props.totalPage;
  }
  // 当前页数
  data.pageNow = props.modelValue || 0;
  // 对页数进行划分
  if (data.totalPage > 9) {
    let endPage = data.totalPage;
    data.leftButton = [1, 2, 3];
    data.centerButton = [data.pageNow - 1, data.pageNow, data.pageNow + 1];
    data.rightButton = [endPage - 2, endPage - 1, endPage];
    data.centerButton = data.centerButton.filter((value, index, arr) => {
      return (
        value > 0 &&
        value <= endPage &&
        !data.leftButton.includes(value) &&
        !data.rightButton.includes(value)
      );
    });
  }
};

watch(
  () => props.modelValue,
  () => {
    init();
  }
);

const clickPage = (item) => {
  let pageNow = Number(item);
  if (pageNow < 1) {
    pageNow = 1;
    return;
  } else if (pageNow > data.totalPage) {
    pageNow = data.totalPage;
    return;
  }
  changePage(pageNow);
};

const skipPage = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    let pageNow = Number(data.inputPage);
    if (pageNow < 1) {
      pageNow = 1;
    } else if (pageNow > data.totalPage) {
      pageNow = data.totalPage;
    }
    changePage(pageNow);
  }
};

const changePage = (newValue: number) => {
  data.pageNow = newValue;
  emits('change', newValue, props.modelValue);
  emits('update:modelValue', newValue);
};
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
