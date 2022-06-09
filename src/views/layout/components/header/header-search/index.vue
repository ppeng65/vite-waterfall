<template>
  <div class="w-full">
    <m-search v-model="inputVal">
      <template #dropdown>
        <div>dropdown</div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputVal = ref('')
</script>

<style scoped lang="scss"></style>
