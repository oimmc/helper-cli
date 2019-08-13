import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig } from 'vue-router'

const Hello: AsyncComponent = (): any => import(/* webpackChunkName: 'welcome' */ '../components/Hello.vue')
const Home: AsyncComponent = (): any => import(/* webpackChunkName: 'home' */ '../views/Home.vue')

Vue.use(Router)

const routes: RouteConfig[] = [{
	path: '/',
	redirect: '/hello'
}, {
	path: '/hello',
	name: 'hello',
	meta: {
		title: 'hello',
		requiresAuth: false
	},
	/* eslint-disable-next-line */
	component: Hello
}, {
	path: '/home',
	name: 'home',
	meta: {
		title: 'Home',
		requiresAuth: false
	},
	component: Home
}]

export default routes
