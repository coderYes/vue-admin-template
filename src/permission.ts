import router from './router'
import localCache from '@/utils/cache'
import usePermissionStore from './store/permission'
import useUserStore from './store/user'

const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
  /* has token*/
  if (localCache.getCache('token')) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      if (useUserStore().roles.length === 0) {
        useUserStore()
          .getInfo()
          .then(() => {
            usePermissionStore()
              .generateRoutes()
              .then((res) => {
                res?.forEach((route) => {
                  router.addRoute('main', route)
                })
                next({ ...to, replace: true })
              })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login')
    }
  }
})
