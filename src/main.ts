import { createApp } from 'vue'
import { globalRegister } from './global'
import './permission'
import App from './App.vue'
import store from './store'
import router from './router'
import './index.css'
import 'normalize.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(globalRegister)
app.mount('#app')
