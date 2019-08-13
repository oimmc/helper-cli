import axios from '../http/axios'

export interface IParams {
	username: string,
	password: string
}

export const apiPostSignIn = (params: IParams) => {
	return axios.post('/user/signIn', params)
}

export const apiPostSignUp = (params: IParams) => {
	return axios.post('/user/signUp', params)
}

export const apiGetRegisterStatus = (params: any) => {
	return axios.get('/user/register-status', {
		params
	})
}

export const apiPutChangePassword = (params: any) => {
	return axios.put('/user/change-password', params)
}

export const apiGetGithubAuthorize = (params: any) => {
	return axios.get('/github/login/oauth/authorize', params)
}

export const apiGetGithubAccessToken = (params: any) => {
	return axios.get('/github/login/oauth/accessToken', {
		params
	})
}
