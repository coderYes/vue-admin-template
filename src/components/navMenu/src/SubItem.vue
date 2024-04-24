<script setup lang="ts">
import { withDefaults } from 'vue'
import { IMenuType } from '@/utils/menu'
withDefaults(
  defineProps<{
    children: IMenuType[]
  }>(),
  {}
)
</script>
<template>
  <template v-for="m in children">
    <el-sub-menu :index="m.path" :key="m.path" v-if="m.children">
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
</template>

<style scoped></style>
