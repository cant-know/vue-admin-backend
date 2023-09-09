import router from './router'

// 全局前置守卫
router.beforeEach((to,from,next) => {
  let token = localStorage.getItem('token')
  if(token || to.path == '/login'){
    next()
  }else{
    next({path: '/login'})
  }
})

// 全局后置守卫
router.afterEach((to,from) => {
  
})