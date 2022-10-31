<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-31 16:38:36
-->
<template>
  <div
    class="carousel"
    ref="carousel"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <div class="carousel-box" ref="carouselBox">
      <div class="carousel-list" v-if="data.width">
        <TransitionGroup
          :name="isFlag ? 'translate-increase' : 'translate-decrease'"
        >
          <div
            class="list-item"
            v-for="(item, index) in props.data"
            :key="index"
            :style="{ width: data.width, height: data.height }"
            v-show="index === data.chooseIndex"
          >
            <img :src="item.cover" :alt="item.label" class="item-img" />
            <div class="item-label">{{ item.label || item.title }}</div>
          </div>
        </TransitionGroup>
      </div>

      <div class="left button" @click="moveChoose(data.chooseIndex - 1)"></div>
      <div class="right button" @click="moveChoose(data.chooseIndex + 1)"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, Ref } from 'vue';
import { propsParams, DataType } from './type';

const props = defineProps(propsParams);

const data: DataType = reactive({
  width: '',
  height: '',
  chooseIndex: 0,
});
const carousel = ref(null) as Ref<HTMLElement>;
const carouselBox = ref(null) as Ref<HTMLElement>;
const isFlag = ref(true);
const boxInterval = ref(null) as Ref<number | NodeJS.Timer>;

watch(
  () => data.chooseIndex,
  (newValue, oldValue) => {
    if (newValue === props.data.length - 1 && oldValue === 0) {
      isFlag.value = false;
    } else if (newValue === 0 && oldValue === props.data.length - 1) {
      isFlag.value = true;
    } else {
      isFlag.value = newValue > oldValue;
    }
  }
);

onMounted(() => {
  nextTick(() => {
    data.width = carousel.value.clientWidth + 'px';
    data.height = carousel.value.clientHeight + 'px';
  });
  runInterval();
});

const runInterval = () => {
  boxInterval.value = setInterval(() => {
    moveChoose();
  }, 5000);
};

const mouseEnter = () => {
  clearInterval(boxInterval.value);
};

const mouseLeave = () => {
  if (boxInterval.value) clearInterval(boxInterval.value);
  runInterval();
};

const moveChoose = (index?) => {
  index = index ?? data.chooseIndex + 1;
  if (index >= props.data.length) index = 0;
  else if (index < 0) index = props.data.length - 1;
  data.chooseIndex = index;
};

onBeforeUnmount(() => {
  clearInterval(boxInterval.value);
});
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  .carousel-box {
    .carousel-list {
      .list-item {
        position: absolute;
        .item-img {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
        .item-label {
          position: absolute;
          text-align: center;
          width: 100%;
          bottom: 0;
          padding-bottom: 10px;
          color: var(--Blog-color-word-dark);
          background-color: #b9b9b9;
          opacity: 0.8;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    &:hover {
      .button {
        background-color: #f3f3f360;
        opacity: 0.8;
      }
    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 100%;
      position: absolute;
      --Border-line: 3px solid black;
      transition: all 0.5s ease;
      opacity: 0;
      cursor: pointer;
    }
    .left {
      left: 0;
      padding-left: 5px;
      &::after {
        content: '';
        width: 10px;
        height: 10px;
        border-left: var(--Border-line);
        border-bottom: var(--Border-line);
        transform: rotate(45deg);
      }
    }
    .right {
      right: 0;
      padding-right: 5px;
      &::after {
        content: '';
        width: 10px;
        height: 10px;
        border-right: var(--Border-line);
        border-bottom: var(--Border-line);
        transform: rotate(-45deg);
      }
    }
  }
}
.translate-decrease-enter-active,
.translate-decrease-leave-active {
  transition: all 0.8s ease;
}

.translate-decrease-enter-from {
  transform: translateX(-100%);
}
.translate-decrease-leave-to {
  transform: translateX(100%);
}
.translate-increase-enter-active,
.translate-increase-leave-active {
  transition: all 0.8s ease;
}

.translate-increase-enter-from {
  transform: translateX(100%);
}
.translate-increase-leave-to {
  transform: translateX(-100%);
}
</style>
