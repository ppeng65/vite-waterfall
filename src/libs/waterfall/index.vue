<template>
  <div
    ref="containerTarget"
    class="relative"
    :style="{
      height: containerHeight + 'px'
    }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else>加载中...</div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  getImgElements,
  getAllImg,
  onComplateImgs,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './utils'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一 key
  nodeKey: {
    type: String
  },
  // 行数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否图片预加载
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 容器总高度
const containerHeight = ref(0)

// 记录容器总高度 key: 所在列 val: 列高
const columnHeightObj = ref({})

// 构建记录每列高度对象
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

// 容器实例
const containerTarget = ref(null)
// 容器总宽度 (不包含 padding、 margin、border)
const containerWidth = ref(0)
// 容器的左边距，计算 item 的 left
const containerLeft = ref(0)

// 计算容器宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  containerLeft.value = parseFloat(paddingLeft)
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

// 列宽 = (容器宽度 - 所有列间距宽度) / 列数
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
// 计算列宽
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  // 计算列宽
  useColumnWidth()
})

let itemHeights = []
// 监听图片加载
const waitImgComplate = () => {
  itemHeights = []
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取 img 标签
  const imgElements = getImgElements(itemElements)
  const allImgs = getAllImg(imgElements)
  // 等待图片加载完成
  onComplateImgs(allImgs).then(() => {
    // 图片加载完成
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}

// 不需言图片预加载
const useItemHeight = () => {
  itemHeights = []
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })

  useItemLocation()
}

// 渲染位置
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) return
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    // 指定的列高度自增
    increasingHeight(index)
  })

  // 容器的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})

// 返回下一个 item 的 left
const getItemLeft = () => {
  // 拿到最小宽度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}

// 返回下一个 item 的 top
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}

// 指定列高度自增
const increasingHeight = (index) => {
  // 最小高度的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}

// 触发计算
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      // 第一次获取数据时，构建高度容器
      const resetColumnHeight = newVal.every((item) => !item._style)
      if (resetColumnHeight) {
        useColumnHeightObj()
      }
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)

// 重新构建瀑布流
const reset = () => {
  setTimeout(() => {
    useColumnWidth()
    props.data.forEach((item) => {
      item._style = null
    })
  }, 200)
}

watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      columnWidth.value = 0
    }
    reset()
  }
)
</script>

<style scoped lang="scss"></style>
