<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">东北林业大学选导师系统</h2>
          <div class="brand-info__intro">
            <h3>登录账户</h3>
            学生账户：
            <div v-for="s of tipsList.studentList" :key="s.id">
              {{ s.name }} / {{ s.number }} / {{ s.password }}
            </div>
            教师账户：
            <div v-for="t of tipsList.teacherList" :key="t.id">
              {{ t.name }} / {{ t.number }} / {{ t.password }}
            </div>
          </div>
        </div>
        <div class="login-main">
          <h3 class="login-title">登录</h3>
          <el-form
            label-position="left"
            label-width="100px"
            :model="form"
            style="max-width: 450px"
            status-icon
          >
            <el-form-item label="用户名">
              <el-input v-model="form.uid">
                <template #prefix>
                  <el-icon><Avatar /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input show-password type="password" v-model="form.password">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="login-btn-submit">
              <el-button @click="onSubmit" type="primary">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGlobelStore } from '@/stores/store';
import { reactive } from 'vue';

const store = useGlobelStore();
store.listUser();
const tipsList = store.tipsList;
const form = reactive({
  uid: '',
  password: '',
});

const onSubmit = () => {
  console.log(form.uid, form.password);
  store.apiLogin({ number: form.uid, password: form.password });
};
</script>
<style lang="scss" scoped>
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-image: url('@/static/img/login-bg-2.jpg');
    background-size: cover;
  }
  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: transparent;
  }
  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }
  .brand-info {
    margin: 220px 100px 0 90px;
    color: #fff;
  }
  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: 0.6;
  }
  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    padding: 150px 60px 180px;
    width: 470px;
    min-height: 100%;
    background-color: #fff;
  }
  .login-title {
    font-size: 16px;
  }
  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
}
</style>
