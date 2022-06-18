import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';
import.meta.env.DEV && (await import('@/mock/index'));
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);
//注册elementui的icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia());
app.use(router);

app.mount('#app');
