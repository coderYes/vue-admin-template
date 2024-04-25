<script setup lang="ts">
import { withDefaults } from 'vue'
import { IMenuType } from '@/store/permission'
withDefaults(
  defineProps<{
    children: IMenuType[]
  }>(),
  {}
)

const emit = defineEmits(['onSubMenuItemClick'])
const handleMenuItemClick = (m: IMenuType) => {
  emit('onSubMenuItemClick', m)
}
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
      <el-menu-item :index="m.path" :key="m.path" @click="handleMenuItemClick(m)">
        <el-icon> <component :is="m.icon" /></el-icon>
        <span>{{ m.name }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<style scoped></style>
