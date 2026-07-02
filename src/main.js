import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/useAuthStore'
import './assets/styles/main.css'
import App from './App.vue'
import router from './router/index.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
authStore.initAuthListener()

app.mount('#app')
