import { defineStore } from 'pinia'

export const useCommonStore = defineStore('test', {
  state: () => {
    return {
      count: 0
    }
  },
  getters: {},
  actions: {
    setCount() {
      this.count++
    }
  }
})
