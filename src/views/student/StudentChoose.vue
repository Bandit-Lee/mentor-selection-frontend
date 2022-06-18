<template>
  <div class="main">
    <el-table :data="teacherList">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="limit" label="限制人数" />
      <el-table-column prop="students.length" label="已选人数" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="
              choice = scope.row.tid;
              dialogVisible = true;
            "
            :disabled="scope.row.students.length + 1 > scope.row.limit"
          >
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogVisible" title="确认" width="30%">
    <span>确认选择该老师作为你的导师吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlerSubmit()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useGlobelStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const store = useGlobelStore();
store.getTeacherList();
const teacherList = storeToRefs(store).teacherList;
const choice = ref('');
const dialogVisible = ref(false);
// const handleChoose = (row: any) => {
//   store.chooseTeacher(row.tid);
// };
const handlerSubmit = () => {
  store.chooseTeacher(choice.value);
};
</script>
<style scoped>
.main {
  text-align: center;
  margin-top: auto;
}
.el-radio-group {
  flex-direction: column;
  align-items: flex-start;
}
</style>
