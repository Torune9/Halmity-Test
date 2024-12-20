import './assets/css/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import pinia from './services/pinia'

const app = createApp(App)

app.use(pinia)

app.use(router)

app.mount('#app')
