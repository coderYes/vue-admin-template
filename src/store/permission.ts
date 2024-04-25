import { defineStore } from 'pinia'
import getRouter from '@/mock/getRouter'
import type { RouteRecordRaw } from 'vue-router'
const modules = import.meta.glob('@/views/**/*.vue')
export interface IMenuType {
  id: number
  name: string
  path: string
  hidden: boolean
  icon: string
  componentPath: string
  children?: IMenuType[]
}
const usePermissionStore = defineStore('permission', {
  state: () => {
    return {}
  },
  getters: {},
  actions: {
    async generateRoutes() {
      const res = await getRouter()
      if (res.code !== 200) return
      return mapMenusToRoutes(res.data)
    }
  }
})

export function mapMenusToRoutes(menus: IMenuType[]): RouteRecordRaw[] {
  let routes: RouteRecordRaw[] = []
  menus.forEach((item) => {
    if (!item.children) {
      const obj = {
        path: item.path,
        component: () => modules[`/src/views/main${item.componentPath}/index.vue`]()
      }
      routes.push(obj)
    } else {
      const ms = mapMenusToRoutes(item.children)
      routes = routes.concat(ms)
    }
  })
  return routes
}

export default usePermissionStore
