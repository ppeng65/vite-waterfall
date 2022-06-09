<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 pr-4 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
      ></li>
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-l-zinc"
        @click="onShowPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200"
        :class="{
          'text-zinc-100': currentCategoryIndex === index
        }"
        :ref="setItemRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="visible">
      <MenuVue @onItemClick="onItemClick" />
    </m-popup>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUpdate, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import MenuVue from '../../menu/index.vue'

const visible = ref(false)
const onShowPopup = () => {
  visible.value = true
}

const sliderStyle = ref({
  transform: 'translateX(0)',
  width: '52px'
})

const currentCategoryIndex = ref(0)
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

onBeforeUpdate(() => {
  itemRefs = []
})

const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)

watch(currentCategoryIndex, (newV) => {
  const { left, width } = itemRefs[newV].getBoundingClientRect()
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: width + 'px'
  }
})

const onItemClick = (index) => {
  currentCategoryIndex.value = index
  visible.value = false
  nextTick(() => {
    itemRefs[index].scrollIntoView()
  })
}
</script>

<style scoped lang="scss"></style>
