<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue'
import type { IMenuType } from '@/utils/menu'
import getRouter from '@/mock/getRouter'
const NavMenu = defineAsyncComponent(() => import('@/components/navMenu'))
const collapsed = ref(false)
const menu = ref<IMenuType[]>([])
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content'
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content'
  }
])

const init = async () => {
  getRouter().then((res) => {
    if (res.code !== 200) return
    menu.value = res.data
  })
}
init()

const collapseStyle = computed(() => {
  if (collapsed.value) {
    return ['w-[64px] duration-300']
  } else {
    return ['w-[220px] duration-300']
  }
})
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}
</script>
<template>
  <div class="h-full">
    <el-container class="h-full">
      <el-aside class="transition-[width]" :class="collapseStyle">
        <NavMenu :menu :collapse="collapsed" />
      </el-aside>
      <el-container>
        <el-header class="h-auto">
          <div class="navbar">
            <div class="hamburger-container">
              <el-icon :size="22" color="#606266" v-if="collapsed" @click="toggleCollapsed">
                <component is="Expand" />
              </el-icon>
              <el-icon :size="22" color="#606266" v-else @click="toggleCollapsed">
                <component is="Fold" />
              </el-icon>
            </div>
            <div class="right-menu">
              <div class="right-menu-item">right</div>
            </div>
          </div>
          <div class="tabs">
            <el-tabs v-model="editableTabsValue" type="card" closable>
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
                {{ item.content }}
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.el-aside {
  &::-webkit-scrollbar {
    display: none;
  }
  .el-menu {
    height: 100%;
    border-right: none;
  }
}
.el-header {
  padding: 0;
  .navbar {
    width: 100%;
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .hamburger-container {
      padding: 0 15px;
      line-height: 60px;
      height: 100%;
      float: left;
      cursor: pointer;
    }
    .right-menu {
      float: right;
      height: 100%;
      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        line-height: 46px;
        color: #5a5e66;
        vertical-align: text-bottom;
      }
    }
  }
  .tabs {
    padding-top: 6px;
    .el-tabs {
      --el-tabs-header-height: 32px;
    }
    .el-tabs__header {
      margin: 0;
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    }
    .el-tabs__content {
      display: none;
    }
  }
}
.el-main {
  background: linear-gradient(#ffffff, #f5f5f5 28%);
}
</style>
