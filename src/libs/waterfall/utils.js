// 获取所有 img 标签
export const getImgElements = (itemElements) => {
  const imgElements = []

  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })

  return imgElements
}

// 获取所有图片链接
export const getAllImg = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src
  })
}

// 监听图片加载完成
export const onComplateImgs = (imgs) => {
  const promiseAll = []
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })

  return Promise.all(promiseAll)
}

// 返回列高对象中最小的高度
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

// 返回列高对象中最小高度所在的的列
export const getMinHeightColumn = (columnHeightObj) => {
  // 拿到最小的高度
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}

// 返回列高对象中最大的高度
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}
