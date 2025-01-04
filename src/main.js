import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserAuthStore } from '@/stores/userAuth'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Button from 'primevue/button'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

const userAuthStore = useUserAuthStore()
userAuthStore.initializeAuth()

app.component('Button', Button)

app.mount('#app')
