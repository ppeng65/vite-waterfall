import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters.js'
import category from './modules/category.js'
import theme from './modules/theme'

const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [
    createPersistedState({
      key: 'front',
      path: ['category', 'theme']
    })
  ]
})

export default store
