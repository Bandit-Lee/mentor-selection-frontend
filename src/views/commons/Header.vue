<template>
  <el-header style="text-align: right; font-size: 12px">
    <div class="toolbar">
      <el-dropdown>
        <el-icon :size="20" style="margin-right: 8px; margin-top: 1px">
          <setting />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              @click="
                dialogVisible = true;
                dialogType = 'modify';
              "
            >
              修改密码
            </el-dropdown-item>
            <el-dropdown-item
              @click="
                dialogVisible = true;
                dialogType = 'logout';
              "
            >
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-avatar>{{ username }}</el-avatar>
    </div>
  </el-header>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogType == 'modify' ? '修改密码' : '退出登录'"
    width="30%"
  >
    <template v-if="dialogType == 'modify'">
      <el-form label-position="top" :model="passwordForm" label-width="100px">
        <el-form-item label="旧密码">
          <el-input type="password" v-model="passwordForm.oldPassword" />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="passwordForm.newPassword" />
        </el-form-item>
      </el-form>
    </template>
    <template v-if="dialogType == 'logout'">
      <span>确定要退出登录吗</span>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlerSubmit()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { useGlobelStore } from '@/stores/store';
import { Menu as Setting } from '@element-plus/icons-vue';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
const store = useGlobelStore();
const username = computed(() => sessionStorage.getItem('username'));
const dialogVisible = storeToRefs(store).dialogVisible;
const dialogType = storeToRefs(store).dialogType;
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
});
const handlerSubmit = () => {
  dialogVisible.value = false;
  if (dialogType.value == 'modify') {
    store.modifyPassword(passwordForm.oldPassword, passwordForm.newPassword);
    passwordForm.oldPassword = '';
    passwordForm.newPassword = '';
  } else if (dialogType.value == 'logout') {
    store.logout();
  }
};
</script>
<style scoped>
.el-header {
  position: relative;
  background-color: var(--el-color-primary-light-3);
  color: var(--el-text-color-primary);
}
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
