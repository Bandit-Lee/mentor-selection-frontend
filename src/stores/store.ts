import type { ResultVO, Teacher, User } from '@/datasources/Type';
import axios from '@/axios';
import router from '@/router';
import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';

export const useGlobelStore = defineStore('globel', {
  state: () => ({
    exception: '',
    tipsList: { studentList: [] as User[], teacherList: [] as User[] },
    teacherList: [] as Teacher[],
    teacherInfo: { limit: 0, students: [{}] } as Teacher,
    chosenTeacher: {} as User,
    loginUser: {} as User,
    dialogType: '',
    dialogVisible: false,
  }),
  actions: {
    async listUser() {
      try {
        const resp = await axios.get('/api/user/list');
        if (resp.data.code == 200) {
          this.tipsList.studentList = resp.data.data.studentList;
          this.tipsList.teacherList = resp.data.data.teacherList;
        }
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
        });
      }
    },
    async apiLogin(user: { number: string; password: string }) {
      try {
        const resp = await axios.post<ResultVO>('/api/login', user);
        console.log(resp.headers);
        if (resp.data.code == 200) {
          sessionStorage.setItem('token', resp.headers.token);
          sessionStorage.setItem('role', resp.headers.role);
          sessionStorage.setItem('username', resp.data.data.user.name);
          this.loginUser = resp.data.data.user;
          ElMessage({
            message: '登录成功',
            type: 'success',
            duration: 1000,
          });
          setTimeout(() => {
            router.push('/home');
            if (user.number == user.password) {
              ElMessage({
                message: '你的账户和密码相同,请及时修改',
                type: 'warning',
                duration: 1000,
              });
              this.dialogType = 'modify';
              this.dialogVisible = true;
            }
          }, 1500);
        } else {
          ElMessage({
            message: resp.data.message,
            type: 'error',
          });
        }
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
        });
      }
    },
    async getTeacherList() {
      try {
        const resp = await axios.get<ResultVO>('/api/teacher/list');
        this.teacherList = resp.data.data.teacherList;
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
        });
      }
    },
    async getTeacherInfo() {
      try {
        const resp = await axios.get<ResultVO>('/api/teacher/info');
        console.log(resp);
        this.teacherInfo = resp.data.data.teacher;
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
        });
      }
    },
    async chooseTeacher(tid: string) {
      try {
        const resp = await axios.post<ResultVO>('/api/student/choose', { tid });
        if (resp.data.code == 200) {
          ElMessage({
            message: resp.data.message,
            type: 'success',
            duration: 1000,
          });
          router.push('/home');
        } else {
          ElMessage({
            message: resp.data.message,
            type: 'error',
          });
        }
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
        });
      }
    },
    async getChosenTeacher() {
      try {
        const resp = await axios.get<ResultVO>('/api/student/chosenTeacher');
        this.chosenTeacher = resp.data.data.chosenTeacher;
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
        });
      }
    },
    async modifyPassword(oldPassword: string, newPassword: string) {
      try {
        const resp = await axios.post<ResultVO>('/api/user/modify', {
          oldPassword,
          newPassword,
        });
        if (resp.data.code == 200) {
          ElMessage({
            message: resp.data.message,
            type: 'success',
            duration: 1000,
          });
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');
          setTimeout(() => {
            router.push('/login');
          }, 1500);
        } else {
          ElMessage({
            message: resp.data.message,
            type: 'error',
            duration: 1000,
          });
        }
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
          duration: 1000,
        });
      }
    },
    async deleteTeacherStudent(sid: string) {
      try {
        const resp = await axios.post<ResultVO>('/api/teacher/deleteStudent', {
          sid,
        });
        if (resp.data.code == 200) {
          ElMessage({
            message: resp.data.message,
            type: 'success',
            duration: 1000,
          });
        } else {
          ElMessage({
            message: resp.data.message,
            type: 'error',
            duration: 1000,
          });
        }
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
          duration: 1000,
        });
      }
    },
    async deleteStudentTeacher(tid: string) {
      try {
        const resp = await axios.post<ResultVO>('/api/student/deleteTeacher', {
          tid,
        });
        if (resp.data.code == 200) {
          ElMessage({
            message: resp.data.message,
            type: 'success',
            duration: 1000,
          });
          this.chosenTeacher = {} as User;
          router.push('/home');
        } else {
          ElMessage({
            message: resp.data.message,
            type: 'error',
            duration: 1000,
          });
        }
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
          duration: 1000,
        });
      }
    },
    async limitChange(limit: number) {
      try {
        const resp = await axios.post('/api/teacher/limitChange', { limit });
        if (resp.data.code == 200) {
          ElMessage({
            message: resp.data.message,
            type: 'success',
            duration: 1000,
          });
        } else {
          ElMessage({
            message: resp.data.message,
            type: 'error',
            duration: 1000,
          });
        }
      } catch (error) {
        ElMessage({
          message: this.exception,
          type: 'error',
          duration: 1000,
        });
      }
    },
    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      ElMessage({
        message: '退出登录成功',
        type: 'success',
        duration: 1000,
      });
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    },
  },
});
