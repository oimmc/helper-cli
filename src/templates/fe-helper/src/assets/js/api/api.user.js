import axios from '../http/axios'

export const apiPostSignIn = params => {
    return axios.post('/user/signIn', params)
}

export const apiPostSignUp = params => {
    return axios.post('/user/signUp', params)
}

export const apiGetRegisterStatus = params => {
    return axios.get('/user/register-status', {
        params
    })
}

export const apiPutChangePassword = params => {
    return axios.put('/user/change-password', params)
}

export const apiGetGithubAuthorize = params => {
    return axios.get('/github/login/oauth/authorize', params)
}

export const apiGetGithubAccessToken = params => {
	return axios.get('/github/login/oauth/accessToken', {
		params
	})
}
