<template>
  <div>
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="visible"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="visible = false"
        />
      </transition>
      <transition name="popup-down-up">
        <div
          v-if="visible"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { watch } from '@vue/runtime-core'
import { useScrollLock, useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
defineEmits(['update:modelValue'])

const visible = useVModel(props)
const isLock = useScrollLock(document.body)
watch(
  visible,
  (val) => {
    isLock.value = val
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
