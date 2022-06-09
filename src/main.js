import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { useREM } from '@/utils/flexible'
import mDirectives from './directives'
import mLibs from './libs'
import useTheme from './utils/theme'
import './styles/index.scss'

// 注册svg-icon
import 'virtual:svg-icons-register'

// mock 数据
import './mock/index'

// 设置字体大小
useREM()

// 设置主题
useTheme()

const app = createApp(App)
app.use(router).use(store).use(mDirectives).use(mLibs)

app.mount('#app')
