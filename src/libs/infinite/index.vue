<template>
  <div class="">
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      />
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        {{ finishText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  // 是否处于加载中
  modelValue: {
    type: Boolean,
    required: true
  },
  // 是否已经加载完
  isFinished: {
    type: Boolean,
    default: false
  },
  // 加载完成提示
  finishText: {
    type: String,
    default: '已经没有更多数据了!'
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

const loading = useVModel(props)

const loadingTarget = ref(null)

// 记录是否在底部
const targetIsIntersecting = ref(false)
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})

// 触发load
const emitLoad = () => {
  setTimeout(() => {
    // 可见 & loading 为 false & 数据没有加载完
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
      loading.value = true
      emits('onLoad')
    }
  }, 100)
}

// 监听 loading 变化
watch(loading, emitLoad)
</script>

<style scoped lang="scss"></style>
