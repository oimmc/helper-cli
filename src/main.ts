import Vue, { CreateElement } from 'vue'
import router from './router'
import App from './App.vue'
import Utils from './assets/ts/utils'

Vue.prototype.Utils = Utils

/* eslint-disable-next-line no-new */
const main: Vue = new Vue({
	el: '#root',
	router,
	render: (h: CreateElement) => h(App)
})

export default main
