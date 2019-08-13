import Vue from 'vue'
import Router, { Route, RouteRecord } from 'vue-router'
import routes from './route'

Vue.use(Router)

const router: Router = new Router({
	mode: 'history',
	base: '/',
	routes
})

router.beforeEach((to: Route, from: Route, next) => {
	const isLogin = true
	if (to.matched.some((record: RouteRecord) => record.meta.requiresAuth)) {
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

router.afterEach((route: Route) => {
	document.title = route.meta.title
	// NProgress.done()
})

export default router
