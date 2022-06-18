<template>
  <div style="margin: auto; text-align: center">
    <template v-if="chosenTeacher != null">
      <el-descriptions title="选择的导师" size="large" border>
        <el-descriptions-item label="导师工号">
          {{ chosenTeacher.number }}
        </el-descriptions-item>
        <el-descriptions-item label="导师姓名">
          {{ chosenTeacher.name }}
        </el-descriptions-item>
        <el-descriptions-item label="导师电话">1234567</el-descriptions-item>
        <el-descriptions-item label="导师邮箱">
          6666@nefu.com
        </el-descriptions-item>
      </el-descriptions>
      <br />
      <el-button type="danger" @click="unChooseTeacher">退选</el-button>
    </template>
    <template v-if="chosenTeacher == null">
      <strong>你还没有选择导师</strong>
      <el-button @click="$router.push('/student/choose')">去选择</el-button>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useGlobelStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
const store = useGlobelStore();
store.getChosenTeacher();
const chosenTeacher = storeToRefs(store).chosenTeacher;
const unChooseTeacher = () => {
  store.deleteStudentTeacher(chosenTeacher.value.id);
};
</script>
