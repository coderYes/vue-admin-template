<script setup lang="ts">
import { computed, withDefaults, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { IMenuType } from '@/utils/menu'
const SubItem = defineAsyncComponent(() => import('./SubItem.vue'))
const route = useRoute()
const defaultActive = computed(() => {
  return route.path
})

withDefaults(
  defineProps<{
    menu: IMenuType[]
    collapse: boolean
  }>(),
  {
    collapse: false
  }
)
</script>

<template>
  <el-menu
    router
    :default-active="defaultActive"
    background-color="transparent"
    :collapse="collapse"
    :collapse-transition="false"
    :unique-opened="true"
  >
    <template v-for="m in menu">
      <el-sub-menu :index="m.path" v-if="m.children" :key="m.path">
        <template #title>
          <el-icon> <component :is="m.icon" /></el-icon>
          <span>{{ m.name }}</span>
        </template>
        <SubItem :children="m.children" />
      </el-sub-menu>
      <template v-else>
        <el-menu-item :index="m.path" :key="m.path">
          <el-icon> <component :is="m.icon" /></el-icon>
          <span>{{ m.name }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style scoped></style>
