<template>
  <mobile v-if="isMobileTerminal" />
  <pc v-else />
</template>

<script setup>
import { useStore } from 'vuex'
import mobile from './mobile/index.vue'
import pc from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'

const store = useStore()
store.dispatch('category/useCategoryData')
</script>

<style scoped lang="scss"></style>
