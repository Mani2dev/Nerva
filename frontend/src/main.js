import { createApp } from 'vue'
import './assets/css/style.css'
import router from './assets/routers/routes.js'
import App from './App.vue'

createApp(App).use(router).mount('#app')
