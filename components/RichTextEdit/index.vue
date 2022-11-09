<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-10 00:40:26
-->
<template>
  <div class="richtextedit">
    <div class="richtextedit-box">
      <div class="richtextedit-content" ref="richtextedit">
        <Editor
          :init="options"
          v-model="model"
          :tinymceScriptSrc="options.tinymceScriptSrc"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import Editor from '@tinymce/tinymce-vue';

const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue', 'change']);

const richtextedit: Ref<HTMLElement> = ref(null);

const options = {
  language_url: '/tiny/language/zh-Hans.js',
  language: 'zh-Hans',
  tinymceScriptSrc: '/tiny/js/tinymce.min.js',
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

const model = computed({
  get: () => {
    return props.modelValue;
  },
  set: (newValue) => {
    emits('change', newValue, props.modelValue);
    emits('update:modelValue', newValue);
  },
});
</script>

<style lang="scss" scoped></style>
