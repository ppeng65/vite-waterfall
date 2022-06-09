<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500"
  >
    <div class="flex items-center">
      <img
        v-lazy
        class="h-4 cursor-pointer mr-2"
        src="../../../../assets/logo.png"
        alt=""
        @click="onToHome"
      />
      <headerSearchVue />
      <headerThemeVue />
      <headerMyVue />
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
import headerSearchVue from './header-search/index.vue'
import headerThemeVue from './header-theme.vue'
import headerMyVue from './header-my.vue'

const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>

<style scoped lang="scss"></style>
