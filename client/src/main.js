import { createApp } from 'vue'
import './assets/css/style.css'
import App from './App.vue'
import router from '@/assets/route/router.js' // adjust path if you renamed/moved it

createApp(App).use(router).mount('#app')