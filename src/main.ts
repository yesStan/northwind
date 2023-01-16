import { createApp } from "vue";
import app from './App.vue'
import router from './routes';
import { store } from './store';

createApp(app)
    .use(router)
    .use(store)
    .mount('#app')
