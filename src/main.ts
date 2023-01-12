import { createApp } from "vue";
import app from './App.vue'
import router from './routes';

createApp(app)
    .use(router)
    .mount('#app')
