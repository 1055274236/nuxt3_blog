<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-28 13:08:10
-->
<template>
  <div class="checkbox-box">
    <div :class="['checkbox-content', modelValue ? 'isSelect' : '']">
      <div class="checkbox" @click="changeCheckbox">
        <Transition name="scale">
          <div class="fill" v-show="modelValue">
            <div class="right"></div>
          </div>
        </Transition>
        <input type="checkbox" :value="modelValue" />
      </div>
      <div class="checkbox-label" @click="changeCheckbox">{{ label }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['modelValue', 'label']);
const emit = defineEmits(['update:modelValue']);

const changeCheckbox = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>

<style lang="scss" scoped>
.checkbox-box {
  user-select: none;
  .checkbox-content {
    display: flex;
    align-items: center;
    .checkbox {
      width: 10px;
      height: 10px;
      inline-size: none;
      outline: solid 0.75px black;
      border-radius: 12.5%;
      margin-right: 5px;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        outline: solid 0.75px var(--Blog-color-primary);
      }
      .fill {
        width: 100%;
        height: 100%;
        background-color: var(--Blog-color-primary);
        display: flex;
        justify-content: center;
        align-items: center;

        .right {
          position: absolute;
          content: '';
          width: 3px;
          height: 7px;
          transform: rotateZ(45deg);
          border-right: 2px solid #fff;
          border-bottom: 2px solid #fff;
        }
      }
      input {
        display: none;
      }
    }

    .checkbox-label {
      font-size: 15px;
      transition: all 0.3s ease;
      cursor: pointer;
    }
  }
  .isSelect {
    .checkbox {
      outline: solid 0.75px var(--Blog-color-primary);
    }
    .checkbox-label {
      color: var(--Blog-color-primary);
    }
  }
}
</style>
