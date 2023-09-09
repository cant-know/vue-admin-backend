import { createApp } from 'vue'
import App from './App.vue'
// 引入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入路由
import router from '../src/router/index.ts'
// 重置样式
import '../src/styles/reset.scss'
// 引入路由鉴权
import './permission.ts'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
