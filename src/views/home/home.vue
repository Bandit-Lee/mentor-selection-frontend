<template>
  <el-card>
    <div>
      <h1>{{ username }} 欢迎使用选导师系统</h1>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { useGlobelStore } from '@/stores/store';

const store = useGlobelStore();
const username = sessionStorage.getItem('username');
if (sessionStorage.getItem('role') == 'student') {
  store.getChosenTeacher();
}
</script>
<style scoped>
.el-card.is-always-shadow {
  box-shadow: var(--el-box-shadow-light);
  position: sticky;
  height: 98%;
  left: 100%;
}
</style>
