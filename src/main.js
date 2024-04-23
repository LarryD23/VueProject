import { createApp } from 'vue';
import mainLayout from './views/MainLayout.vue';
import router from './router'; 
import axios from 'axios';


const app = createApp(mainLayout);
app.use(router);

// axios.defaults.baseURL = 'http://localhost:8080';

app.config.globalProperties.$axios = axios;

app.mount('#app');

