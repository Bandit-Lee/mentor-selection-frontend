<template>
  <el-container class="main-container" direction="vertical">
    <header-vue></header-vue>
    <el-container>
      <sidebar-vue></sidebar-vue>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import sidebarVue from '@/views/commons/SideBar.vue';
import HeaderVue from '@/views//commons/Header.vue';
import { RouterView } from 'vue-router';
import { useGlobelStore } from '@/stores/store';
const store = useGlobelStore();
const role = sessionStorage.getItem('role');
if (role == 'student') {
  store.getChosenTeacher();
}
</script>
<style scoped>
.el-main {
  padding: 5px;
  border-radius: 5px;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  background-color: rgb(255, 255, 255);
}
.main-container {
  position: absolute;
  background-color: rgb(247, 247, 247);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.sidebar-vue {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
