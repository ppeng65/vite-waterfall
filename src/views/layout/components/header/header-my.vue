<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          src="../../../../assets/logo.png"
          alt=""
        />
        <m-svg-icon
          class="w-1.5 h-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <m-svg-icon
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
          name="vip"
        />
      </div>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in menuArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span class="text-zinc-900 dark:text-zinc-300 text-sm">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import {} from 'vue'

const menuArr = [
  {
    id: '0',
    title: '个人资料',
    icon: 'profile',
    url: '/profile'
  },
  {
    id: '1',
    title: '升级 VIP',
    icon: 'vip-profile',
    url: '/member'
  },
  {
    id: '2',
    title: '退出登录',
    icon: 'logout'
  }
]
</script>

<style scoped lang="scss"></style>
