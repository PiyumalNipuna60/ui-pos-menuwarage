import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './assets/main.css'

import { useUserAuthStore } from '@/stores/userAuth'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import Aura from '@primevue/themes/aura'
import Button from 'primevue/button'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import DatePicker from 'primevue/datepicker'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ErrorMessage from './components/errors/ErrorMessage.vue'
import NavigationPanel from './components/NavigationPanel.vue'

import Row from 'primevue/row'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

const userAuthStore = useUserAuthStore()
userAuthStore.initializeAuth()

app.component('ErrorMessage', ErrorMessage)
app.component('NavigationPanel', NavigationPanel)

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('FloatLabel', FloatLabel)
app.component('Password', Password)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Divider', Divider)
app.component('Dropdown', Dropdown)
app.component('InputNumber', InputNumber)
app.component('Chart', Chart)
app.component('DatePicker', DatePicker)
app.component('Toast', Toast)

app.mount('#app')
