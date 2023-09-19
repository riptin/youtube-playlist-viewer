import './assets/css/normalize.css'
import './assets/js/xlsx.full.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.errorHandler = (err) => {
  console.log(err)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
