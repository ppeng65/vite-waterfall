import { watch } from 'vue'
import store from '../store'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

// 监听系统主题
let matchMedia
const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

// 变更主题
const changeTheme = (theme) => {
  let themeClass = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClass = 'light'
      break
    case THEME_DARK:
      themeClass = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClass = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClass
}

// 初始化主题
export default () => {
  watch(() => store.getters.themeType, changeTheme, {
    immediate: true
  })
}
