import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserAuthStore } from '@/stores/userAuth'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Password from 'primevue/password'

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
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('FloatLabel', FloatLabel)
app.component('Password', Password)

app.mount('#app')
