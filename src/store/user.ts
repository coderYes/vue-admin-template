import { defineStore } from 'pinia'
import localcache from '@/utils/cache'
import getInfo from '@/mock/getInfo'

interface IStateType {
  token: string
  id: string
  name: string
  avatar: string
  roles: string[]
  permissions: string[]
}
const useUserStore = defineStore('user', {
  state: (): IStateType => {
    return {
      token: localcache.getCache('token'),
      id: '',
      name: '',
      avatar: '',
      roles: [],
      permissions: []
    }
  },
  getters: {},
  actions: {
    async getInfo() {
      const res = await getInfo()
      if (res.code !== 200) return (this.roles = ['ROLE_DEFAULT'])
      this.id = res.data.id
      this.name = res.data.name
      this.avatar = res.data.avatar
      this.roles = res.data.roles
      this.permissions = res.data.permissions
    }
  }
})

export default useUserStore
