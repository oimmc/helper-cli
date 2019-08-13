import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig } from 'vue-router'

const Welcome: AsyncComponent = (): any => import(/* webpackChunkName: 'welcome' */ '../components/Welcome.vue')
const Home: AsyncComponent = (): any => import(/* webpackChunkName: 'home' */ '../views/Home.vue')
// const Login: AsyncComponent = (): any => import(/* webpackChunkName: 'Login' */ '../views/Login.vue')
const Login: AsyncComponent = (): any => import(/* webpackChunkName: 'LoginDecorator' */ '../views/LoginDecorator.vue')

Vue.use(Router)

const routes: RouteConfig[] = [{
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
	// component: () => import(/* webpackChunkName: 'welcome' */ '../components/Welcome.vue')
	component: Welcome
}, {
	path: '/home',
	name: 'home',
	meta: {
		title: 'Home',
		requiresAuth: false
	},
	component: Home
}, {
	path: '/login',
	name: 'login',
	meta: {
		title: 'Login',
		requiresAuth: false
	},
	component: Login
}]

export default routes
