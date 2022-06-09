import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NORMAL_DATA } from '@/constants'

export default {
  namespaced: true,
  state: () => {
    return {
      categorys: CATEGORY_NORMAL_DATA
    }
  },
  mutations: {
    setCategorys(state, list) {
      state.categorys = [ALL_CATEGORY_ITEM, ...list]
    }
  },
  actions: {
    // 获取category
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
