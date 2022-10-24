<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-25 00:24:31
-->
<template>
  <Transition name="translateX-opacity">
    <div class="natification-item" v-show="data.isShow">
      <div :class="['nat-header', props.type ?? 'info']">
        <div class="nat-icon" v-if="iconComponent">
          <component :is="iconComponent" />
        </div>
        <div class="nat-title">{{ props.title }}</div>
      </div>
      <div class="nat-content" v-show="props.message">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { DataType, propsParams, IconComponent } from './type';

const data: DataType = reactive({
  isShow: false,
});

const props = defineProps(propsParams);

const iconComponent = computed(() => {
  if (!props.type) return IconComponent['info'];
  return IconComponent[props.type] || IconComponent['info'];
});

onMounted(() => {
  data.isShow = true;
  setTimeout(() => {
    data.isShow = false;
    props.closeItem();
  }, props.duration);
});

defineExpose({
  changeIsShow: (val: Boolean) => {
    data.isShow = val;
  },
});
</script>

<style lang="scss" scoped>
.natification-item {
  display: flex;
  flex-direction: column;
  width: 300px;
  left: 100%;
  padding: 16px;
  border-radius: 10px;
  box-shadow: var(--Blog-shadow);
  background-color: #fff;
  margin: 0 10px;

  .nat-header {
    color: var(--Blog-color-primary);
    display: flex;
    align-items: center;
    color: var(--Blog-color-info);

    &.error {
      color: red;
      color: var(--Blog-color-error);
    }
    &.warning {
      color: #eeff00;
      color: var(--Blog-color-warning);
    }
    &.success {
      color: #00bd6f;
      color: var(--Blog-color-success);
    }
    .nat-icon {
      width: 20px;
      height: 20px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    .nat-title {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .nat-content {
    margin-top: 5px;
  }
}
.translateX-opacity-enter-active,
.translateX-opacity-leave-active {
  transition: all 0.5s ease;
}

.translateX-opacity-enter-from {
  transform: translateX(100%);
}
.translateX-opacity-leave-to {
  opacity: 0;
}
</style>
