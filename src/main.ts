import { createApp } from 'vue'
import { globalRegister } from './global'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './index.css'
import 'normalize.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const pinia = createPinia()
const app = createApp(App)

app.use(globalRegister)
app.use(pinia)
app.use(router)
app.mount('#app')
