import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
	path: '/',
	redirect: '/welcome'
}, {
	path: '/welcome',
	name: 'welcome',
	meta: {
		title: 'Welcome',
		requiresAuth: false
	},
	/* eslint-disable-next-line */
	component: () => import( /* webpackChunkName: 'welcome' */ '../components/Welcome.vue')
}, {
	path: '/home',
	name: 'home',
	meta: {
		title: 'Home',
		requiresAuth: false
	},
	/* eslint-disable-next-line */
	component: () => import( /* webpackChunkName: 'home' */ '../views/Home.vue')
}, {
	path: '/login',
	name: 'login',
	meta: {
		title: 'Login',
		requiresAuth: false
	},
	/* eslint-disable-next-line */
	component: () => import( /* webpackChunkName: 'home' */ '../views/Login.vue')
}]

export default routes
