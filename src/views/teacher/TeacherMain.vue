<template>
  <div>
    <el-card class="box-card" shadow="always">
      <template #header>
        <div class="card-header">
          <span>
            <strong>{{ teacherInfo.name }}</strong>
            老师你好！
          </span>
        </div>
      </template>
      以下学生选择了您作为导师：
      <div class="card-body text">
        <el-table
          :data="teacherInfo.students"
          stripe
          size="large"
          :border="true"
          table-layout="auto"
          class="tableBox"
        >
          <el-table-column prop="number" label="学号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row, scope.$index)"
              >
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      修改限选人数：
      <el-input-number
        v-model="teacherInfo.limit"
        :min="teacherInfo.students.length"
      />
      <el-button
        type="primary"
        :disabled="limitChange == teacherInfo.limit"
        @click="handleChangeLimit"
      >
        确认修改
      </el-button>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useGlobelStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
const store = useGlobelStore();
store.getTeacherInfo();
const teacherInfo = storeToRefs(store).teacherInfo;
const limitChange = storeToRefs(store).teacherInfo.value.limit;

const handleDelete = (row: any, index: number) => {
  teacherInfo.value.students.splice(index, 1);
  store.deleteTeacherStudent(row.id);
};
const handleChangeLimit = () => {
  store.limitChange(teacherInfo.value.limit);
};
</script>
<style scoped>
.card-header {
  display: flex;
  font-size: large;
  justify-content: space-between;
  align-items: center;
}
.tableBox {
  width: 800px;
  margin: auto;
}
.text {
  font-size: 20px;
}
.box-card {
  position: relative;
  width: 100%;
  height: 100%;
}
.card-body {
  flex-direction: column;
  align-items: center;
}
.el-card.is-always-shadow {
  box-shadow: var(--el-box-shadow-light);
  position: sticky;
  height: 98%;
  left: 100%;
}
</style>
