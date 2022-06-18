<template>
  <el-aside width="200px" style="height: 100%">
    <el-scrollbar>
      <el-menu
        router
        :default-openeds="['1', '2']"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
      >
        <el-menu-item index="/home">
          <template #title>
            <el-icon><message /></el-icon>
            首页
          </template>
        </el-menu-item>
        <template v-if="role == 'student'">
          <el-menu-item index="/student/choose" v-if="showFlag">
            <template #title>
              <el-icon><message /></el-icon>
              选择导师
            </template>
          </el-menu-item>
          <el-menu-item index="/student/chosen">
            <template #title>
              <el-icon><message /></el-icon>
              我的导师
            </template>
          </el-menu-item>
        </template>
        <template v-if="role == 'teacher'">
          <el-menu-item index="/teacher">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              我的学生
            </template>
          </el-menu-item>
        </template>

        <!-- <el-sub-menu index="1" v-if="role == 'student'">
          <template #title>
            <el-icon><message /></el-icon>
            学生端
          </template>
          <el-menu-item-group>
            <el-menu-item index="/student/choose" v-if="showFlag">
              <el-icon><icon-menu /></el-icon>
              <template #title>选择导师</template>
            </el-menu-item>
            <el-menu-item index="/student/chosen">
              <el-icon><List /></el-icon>
              <template #title>我的导师</template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2" v-if="role == 'teacher'">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            教师端
          </template>
          <el-menu-item-group>
            <el-menu-item index="/teacher">我的学生</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu> -->
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script setup lang="ts">
import { useGlobelStore } from '@/stores/store';
import { Menu as IconMenu, Message } from '@element-plus/icons-vue';
import { computed } from 'vue';
const store = useGlobelStore();
const showFlag = computed(() => store.chosenTeacher == null);
const role = sessionStorage.getItem('role');
</script>
<style scoped>
.el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.el-menu {
  position: absolute;
  border-right: none;
  width: 200px;
  min-height: 100%;
}
/* .el-menu-item.is-active {
  background-color: #ffd04b !important;
  color: rgb(2, 0, 0);
} */
</style>
