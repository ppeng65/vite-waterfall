<template>
  <div class="h-screen">
    <headerVue class="h-header" />
    <div class="h-main">
      <contentVue />
    </div>
    <floatingVue />
  </div>
</template>

<script setup>
import {} from 'vue'
import headerVue from './components/header/index.vue'
import contentVue from './components/content.vue'
import floatingVue from './components/floating.vue'
</script>

<style scoped lang="scss"></style>
