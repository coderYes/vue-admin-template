<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue'
import type { IMenuType } from '@/store/permission'
import type { TabsPaneContext, TabPaneName } from 'element-plus'
import getRouter from '@/mock/getRouter'
import { requireAssetsImg } from '@/utils/common'
import { useRouter } from 'vue-router'
const router = useRouter()
const NavMenu = defineAsyncComponent(() => import('@/components/navMenu'))

interface ITabsType {
  key: number
  label: string
  path: string
}

const collapsed = ref(false)
const menu = ref<IMenuType[]>([])
const activeName = ref('')
const tabsList = ref<ITabsType[]>([])

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

const onMenuItemClick = (menu: IMenuType) => {
  const isCurrent = tabsList.value.findIndex((item) => item.key === menu.id) === -1
  if (isCurrent) {
    const tabs = {
      key: menu.id,
      label: menu.name,
      path: menu.componentPath
    }
    tabsList.value.push(tabs)
  }

  activeName.value = menu.name
}
const handleTabClick = (pane: TabsPaneContext | string) => {
  const paneValue = typeof pane === 'object' ? pane.props.name : pane
  const current = tabsList.value.findIndex((item) => item.label === paneValue)
  if (current === -1) return
  const { label, path } = tabsList.value[current]
  activeName.value = label
  router.push(path)
}
const handleTabRemove = (name: TabPaneName) => {
  if (tabsList.value.length < 2) return
  if (name === activeName.value) {
    const index = tabsList.value.findIndex((item) => item.label === name)
    const tab = tabsList.value[index + 1] || tabsList.value[index - 1]
    handleTabClick(tab.label)
    activeName.value = tab.label
  }
  tabsList.value = tabsList.value.filter((item) => item.label !== name)
}
</script>
<template>
  <div class="h-full">
    <el-container class="h-full">
      <el-aside class="transition-[width]" :class="collapseStyle">
        <div class="sidebar-logo-container">
          <img class="w-[32px] h-[32px]" :src="requireAssetsImg('image/vue.svg')" alt="" />
          <div v-if="!collapsed" class="ml-3">admin模板</div>
        </div>
        <NavMenu :menu="menu" :collapse="collapsed" @onMenuItemClick="onMenuItemClick" />
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
            <el-tabs
              v-model="activeName"
              type="card"
              closable
              @tab-click="handleTabClick"
              @tab-remove="handleTabRemove"
            >
              <el-tab-pane
                v-for="item in tabsList"
                :key="item.key"
                :label="item.label"
                :name="item.label"
              >
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
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
