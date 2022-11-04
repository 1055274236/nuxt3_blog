<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-05 00:25:08
-->
<template>
  <div class="richtextedit">
    <div class="richtextedit-box">
      <div class="richtextedit-content" ref="richtextedit">
        <Editor
          :init="options"
          v-model="value"
          :api-key="useOptions.tinyKey || ''"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, Ref } from 'vue';
import optionsStore from '@/stores/options';
import Editor from '@tinymce/tinymce-vue';

const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue', 'change']);
const useOptions = optionsStore();

interface DataType {}

const data: DataType = reactive({});
const value = ref('');
const richtextedit = ref(null) as Ref<HTMLElement>;

const options = {
  height: 500,
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'help',
    'wordcount',
  ],
  fontsize_formats:
    '10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px',
  toolbar:
    'undo redo | blocks | ' +
    'fontsizeselect bold italic forecolor backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | codesample link image | code help',
};

onMounted(() => {});

watch(
  () => props.modelValue,
  (newValue) => {
    if (props.modelValue !== newValue) value.value = props.modelValue;
  }
);

watch(value, (newValue, oldValue) => {
  emits('change', newValue, oldValue);
  emits('update:modelValue', newValue);
});
</script>

<style lang="scss" scoped></style>
