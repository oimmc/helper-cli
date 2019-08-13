import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
// import qs from 'qs'
import config from './config'
// import main from '../../../main'
import Cookies from 'cookies-js'

const instance: AxiosInstance = axios.create({
	baseURL: config.baseURL,
	headers: config.headers,
	transformResponse: [function (data: any) { }]
})

instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put' || config.method.toLocaleLowerCase() === 'delete') {
		// 	config.data = qs.stringify(config.data)
		// }
		return config
	},
	(error: any) => {
		if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
			// console.log('请求超时！')
			// return
		}
		const errorInfo = error.response
		console.log(errorInfo)
		// if (errorInfo) {
		// const errorStatus = errorInfo.status // 404 403 500 ... 等
		// router.push({
		//   path: `path/to/error`
		//  })
		// }
		return error
	}
)

instance.interceptors.response.use(
	(response: AxiosResponse) => {
		let data
		if (response.data === undefined) { // IE9
			data = response.request.responseText
		} else {
			data = response.data
		}
		data ? (data = JSON.parse(data)) : (data = {})

		if (data.error && data.error.code === 401) { // 未登录
			Cookies.set('username', undefined)
			// main.$router.push('/sigin')
		}
		// 若不是正确的返回code，且已经登录，就抛出错误
		// const err = new Error(data.description)

		// err.data = data
		// err.response = response

		// throw err
		return data
	},
	(err: any) => {
		if (err && err.response) {
			switch (err.response.status) {
				case 400:
					err.message = '请求错误'
					break

				case 401:
					err.message = '未授权，请登录'
					break

				case 404:
					err.message = '404'
					break

				default:
			}
		}
		return err
	}
)

export default instance