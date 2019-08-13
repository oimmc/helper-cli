import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
	path: '/',
	redirect: '/hello'
}, {
	path: '/hello',
	name: 'Hello',
	meta: {
		title: 'Hello',
		requiresAuth: false
	},
	/* eslint-disable-next-line */
	component: () => import( /* webpackChunkName: 'hello' */ '../components/Hello.vue')
}, {
	path: '/home',
	name: 'home',
	meta: {
		title: 'Home',
		requiresAuth: false
	},
	/* eslint-disable-next-line */
	component: () => import( /* webpackChunkName: 'home' */ '../views/Home.vue')
}]

export default routes
