import { createApp } from 'vue';
import App from '@/App.vue';
import '@/assets/styles/index.scss'
import Router from '@/router';
import Vuex from '@/store';

createApp(App)
    .use(Router)
    .use(Vuex)
    .mount('#app');
