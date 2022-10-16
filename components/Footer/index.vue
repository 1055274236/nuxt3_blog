<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-16 23:47:44
-->
<template>
  <footer id="footer">
    <div class="footer-box">
      <div class="footer-content">
        <a href="https://beian.miit.gov.cn/#/Integrated/index" class="records">
          {{ data.records }}</a
        >
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { BaseRequest } from '~~/api';

const baseRequest = new BaseRequest();

interface DataType {
  records: string;
}

const data: DataType = reactive({
  records: '',
});
const getRecords = async () => {
  const result = await baseRequest.getOptions({ key: 'records' });
  data.records = result.data.options.records.value;
};
await getRecords();

onMounted(() => {});
</script>

<style lang="scss" scoped>
#footer {
  box-shadow: 0 0 10px 2px #00000010;
  .footer-box {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--Blog-color-back);
    .footer-content {
      .records {
        color: var(--Blog-color-word);
        font-size: 10px;
        user-select: none;
      }
    }
  }
}
</style>
