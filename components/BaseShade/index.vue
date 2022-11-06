<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-07 00:10:32
-->
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        class="baseshade-back"
        @click="backClick"
        v-show="show"
        ref="baseShadeBack"
      >
        <Transition name="slide-fade-top">
          <div class="baseshade-box" ref="baseShadeBox" v-show="show">
            <div class="baseshade-content">
              <slot></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps({ show: Boolean, clickBackClose: Boolean });
const emit = defineEmits(['update:show']);

const baseShadeBox = ref(null);
// const baseShadeBack = ref(null);

const { isOutside } = useMouseInElement(baseShadeBox);

// 监听遮罩层是否显示
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      // baseShadeBack.value.style.backgroundColor = '#ffffff80';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
);

// 当背景选中时点击
const backClick = () => {
  if (props.clickBackClose && isOutside.value) emit('update:show', false);
};
</script>

<style lang="scss" scoped>
.baseshade-back {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: auto;
  background-color: #ffffff80;
  // background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
  // backdrop-filter: blur(1px);
  .baseshade-box {
    z-index: 301;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
