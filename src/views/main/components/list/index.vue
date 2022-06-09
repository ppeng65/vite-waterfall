<template>
  <div class="">
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getListData"
    >
      <m-waterfall
        :data="listData"
        class="px-1 w-full"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <itemVue :item="item" :width="width" />
        </template>
      </m-waterfall>
    </m-infinite>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import itemVue from './item.vue'
import { getList } from '@/api/list'
import { isMobileTerminal } from '@/utils/flexible'

let query = {
  page: 1,
  size: 20
}
const loading = ref(false)
const isFinished = ref(false)
const listData = ref([])
const getListData = async () => {
  if (isFinished.value) return
  if (listData.value.length) {
    query.page += 1
  }
  const res = await getList(query)
  console.log(res)
  if (query.page === 1) {
    listData.value = res.list
  } else {
    listData.value.push(...res.list)
  }

  if (listData.value.length === res.total) {
    isFinished.value = true
  }
  loading.value = false
}
</script>

<style scoped lang="scss"></style>
