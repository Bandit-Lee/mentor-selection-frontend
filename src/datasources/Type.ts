export interface User {
  id: string;
  name: string;
  number: string;
  password: string;
  role: string;
}

export interface Student {
  sid: string;
  name: string;
  mentor: Teacher;
}

export interface Teacher {
  tid: string;
  name: string;
  //限选人数
  limit: number;
  students: User[];
}

export interface ResultVO {
  code: number;
  message?: string;
  data?: any;
}
