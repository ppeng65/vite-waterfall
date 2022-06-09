export const getUrlParams = (url) => {
  if (!url) return
  url = url.split('?')[1]
  const reg = /[^?&]+=[^?&]+/g
  const arr = url.match(reg)
  const result = {}
  if (arr) {
    arr.forEach((item) => {
      item = item.split('=')
      const key = item[0]
      const value = item[1]
      result[key] = value
    })
  }

  return result
}
