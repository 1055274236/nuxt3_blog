<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-24 23:15:20
-->
<template>
  <svg
    t="1666624499059"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6280"
    width="200"
    height="200"
    v-if="fill"
  >
    <path
      d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m169.045333 191.04L455.317333 572.650667l-90.944-94.336-46.08 44.416 136.832 141.952 271.829334-279.722667-45.909334-44.586667z"
      p-id="6281"
      fill="currentColor"
    ></path>
  </svg>
  <svg
    t="1666624475955"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6138"
    width="200"
    height="200"
    v-else
  >
    <path
      d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m0 64c-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666667z m169.045333 127.04l45.909334 44.586667-271.829334 279.722667-136.832-141.952 46.08-44.416 90.944 94.336 225.728-232.277334z"
      p-id="6139"
      fill="currentColor"
    ></path>
  </svg>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent } from 'vue';

interface DataProps {}

export default defineComponent({
  name: '',
  props: {
    fill: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const data: DataProps = reactive({});
    onMounted(() => {});
    return { ...toRefs(data) };
  },
});
</script>
<style lang="scss" scoped></style>
