<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹出层-->
      <slot name="reference"></slot>
    </div>
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisible"
        :style="contentStyle"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
      >
        <!-- 匿名插槽： 弹出层 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
// 左上
const PROP_TOP_LEFT = 'top-left'
// 右上
const PROP_TOP_RIGHT = 'top-right'
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left'
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: PROP_TOP_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的 placement 必须是 ${placementEnum.join('、')} 中的一个`
        )
      }

      return result
    }
  }
})

const isVisible = ref(false)

// 鼠标移入
const onMouseenter = () => {
  isVisible.value = true
}

// 鼠标移出
const onMouseleave = () => {
  isVisible.value = false
}

// 计算元素的尺寸
const referenceTarget = ref(null)
const contentTarget = ref(null)
const getElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

// 气泡样式
const contentStyle = ref({
  left: 0,
  top: 0
})

// 计算 气泡展示的时候在展示
watch(isVisible, (val) => {
  if (!val) return
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
