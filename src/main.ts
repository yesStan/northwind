import { createApp, Plugin } from "vue";
import App from './App.vue'
import router from './routes';
import { store } from './store';
import 'vue3-easy-data-table/dist/style.css';




createApp(App)
    .use(router)
    .use(store)
    .mount('#app')


    

// import 'vue3-easy-data-table/dist/style.css';

// const app = createApp(App);
//     app.use(router);
//     app.use(store);
// app.component('EasyDataTable', Vue3EasyDataTable);