<script setup lang="ts">
import localcache from '@/utils/cache'
import { useRouter } from 'vue-router'
const router = useRouter()
const login = () => {
  localcache.setCache('token', '123456')
  router.push('/')
}
</script>
<template>
  <div>
    <el-button type="primary" @click="login">login</el-button>
  </div>
</template>

<style scoped></style>
