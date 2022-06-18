<template>
  <div>
    <template v-if="chosenTeacher == null">
      <el-radio-group v-model="choice">
        <el-radio v-for="(t, index) of teacherList" :key="index" :label="t.tid">
          {{ t.name }} / {{ t.limit }} / 已选人数: {{ t.students.length }}
          <br />
        </el-radio>
      </el-radio-group>
      <br />
      <el-button type="primary" @click="chooseTeacher">确认选择</el-button>
    </template>
    <template v-if="chosenTeacher != null">
      已选导师： {{ chosenTeacher.name }}
    </template>
  </div>
</template>
<script lang="ts" setup>
import { useGlobelStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { ref, type Ref } from 'vue';
const store = useGlobelStore();
store.getChosenTeacher();
store.getTeacherList();
const chosenTeacher = storeToRefs(store).chosenTeacher;
const teacherList = storeToRefs(store).teacherList;
const choice = ref('');
const chooseTeacher = () => {
  console.log(choice.value);
  store.chooseTeacher(choice.value);
};
</script>
<style scoped>
.el-radio-group {
  flex-direction: column;
  align-items: flex-start;
}
</style>
