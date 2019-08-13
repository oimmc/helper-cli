import Vue from 'vue'
import router from './router'
import App from './App.vue'
import Utils from './assets/js/utils'

Vue.prototype.Utils = Utils

/* eslint-disable-next-line no-new */
const main = new Vue({
	el: '#root',
	router,
	render: h => h(App)
})

export default main