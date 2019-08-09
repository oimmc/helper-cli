import Vue from 'vue'
import Router from 'vue-router'
import routes from './route'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    routes
})

router.beforeEach((to, from, next) => {
    let isLogin = true
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLogin) {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

router.afterEach(route => {
	document.title = route.meta.title
	// NProgress.done()
})

export default router