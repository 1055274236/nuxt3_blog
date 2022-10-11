<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-11 21:11:42
-->
<template>
  <div id="details">
    <div class="header"></div>
    <div class="content">
      <div class="title">
        {{ data.details.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { BlogRequest } from '~~/api';
const route = useRoute();
const blogRequest = new BlogRequest();
const id = route.params.id;
const data = reactive({
  details: {} as any,
});
const result = await blogRequest.getDetails({ id });
data.details = result.data.details;

// await blogRequest.getDetails({ id }).then((result) => {
//   data.details = result.data.value.data.details;
// });
// console.log(details);
onMounted(() => {});
</script>

<style lang="scss" scoped>
#details {
  height: 300vh;
}
</style>
