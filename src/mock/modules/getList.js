import { getUrlParams } from '@/utils/common'
import listData from '@/constants/list'

export default (config) => {
  const { url } = config
  const { page, size = 20, categoryId } = getUrlParams(url)
  const result = {
    success: true,
    code: 200,
    data: {},
    message: 'success'
  }
  if (!page) {
    result.code = 800
    result.message = '请传入 page 参数'
    return result
  }
  if (!size) {
    result.code = 800
    result.message = '请传入 size 参数'
    return result
  }

  if (categoryId) {
    const filters = listData.filter((item) => item.tags.includes(categoryId))
    result.data = {
      list: filters.slice((page - 1) * size, page * size),
      total: filters.length,
      page,
      size
    }

    return result
  }

  result.data = {
    list: listData.slice((page - 1) * size, page * size),
    total: listData.length,
    page,
    size
  }

  return result
}
