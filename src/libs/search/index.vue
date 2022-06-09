<template>
  <div
    class="group relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40"
  >
    <div>
      <m-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#707070"
      />
      <input
        v-model="inputVal"
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-sm text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 focus:border-red-300 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700"
        type="text"
        placeholder="搜索"
        @keyup.enter="onSearch"
        @focus="onFocus"
        @blur="onBlur"
      />
      <m-svg-icon
        v-show="inputVal"
        name="input-delete"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500"
        @click="onClear"
      />
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      />
      <m-button
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full odd:group-hover:opacity-100 duration-500"
        icon="search"
        iconColor="#fff"
        @click="onSearch"
      />
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script>
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
const EMIT_SEARCH = 'search'
const EMIT_CLEAR = 'clear'
const EMIT_INPUT = 'input'
const EMIT_FOCUS = 'focus'
const EMIT_BLUR = 'blur'
</script>
<script setup>
import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])

const inputVal = useVModel(props)
watch(inputVal, (val) => {
  emits(EMIT_INPUT, val)
})
// 删除文本
const onClear = () => {
  inputVal.value = ''
  emits(EMIT_CLEAR, '')
}

// 搜索
const onSearch = () => {
  emits(EMIT_SEARCH, inputVal.value)
}

// input 是否获取焦点
const isFocus = ref(false)
const onFocus = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}
const onBlur = () => {
  isFocus.value = false
  emits(EMIT_BLUR)
}
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
