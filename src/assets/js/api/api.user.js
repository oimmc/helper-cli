import axios from '../http/axios'

export const apiPostSignIn = params => {
    return axios.post('/user/signIn', params)
}
