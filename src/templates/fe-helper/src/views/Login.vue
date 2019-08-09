<template>
    <div class="login">
		<div v-if="githubLoading">Login...</div>
        <div v-else>
			<h3>login</h3>
			<label for="username"></label>
			<input type="text" v-model="params.username" id="username" placeholder="请输入用户名">
			<label for="password"></label>
			<input type="password" v-model="params.password" id="password" placeholder="请输入密码"> <!-- 捂住眼睛 -->
			<button @click="postSignIn">登录</button>
			<button @click="postSignUp">注册</button>
			<span class="githubLogo" @click="getGithubAuthorize"></span>
		</div>
    </div>
</template>

<script>
    import { apiPostSignIn, apiPostSignUp, apiGetGithubAuthorize, apiGetGithubAccessToken } from '../assets/js/api/api.user'

    export default {
		name: 'Login',
		data: () => ({
			githubLoading: false,
			name: '',
			avatar_url: '',
			params: {
				username: '',
				password: ''
			}
		}),
		created() {
			if (this.$route.query.code) {
				this.githubLoading = true
				this.getGithubAccessToken(this.$route.query)
			}
		},
        methods: {
            async postSignIn() {
                const res = await apiPostSignIn(this.params)
                if (res.data.err) {
					alert(res.data.errMsg)
				} else {
					// alert(res.data.message)
					sessionStorage.setItem('name', res.data.data.name)
					sessionStorage.setItem('avatar_url', res.data.data.avatar_url)

					this.$router.replace('/home')
				}
            },
            async postSignUp() {
                const res = await apiPostSignUp(this.params)
                if (res.data.err) {
					alert(res.data.errMsg)
				} else {
					sessionStorage.setItem('name', res.data.data.name)
					sessionStorage.setItem('avatar_url', res.data.data.avatar_url)

					this.$router.replace('/home')
				}
			},
			async getGithubAuthorize() {
                const res = await apiGetGithubAuthorize(this.params)
                if (res.data.err) {
					alert(res.data.errMsg)
				} else {
					location.href = res.data.redirect_uri
				}
            },
            async getGithubAccessToken(params) {
                const res = await apiGetGithubAccessToken(params)
                if (res.data.err) {
					alert(res.data.errMsg)
				} else {
					this.name = res.data.userInfo.name
					this.avatar_url = res.data.userInfo.avatar_url

					sessionStorage.setItem('name', this.name)
					sessionStorage.setItem('avatar_url', this.avatar_url)

					this.$router.replace('/home')
				}
            }
        }
    }
</script>

<style scoped lang="less">
.githubLogo{
	width: 40px;
	height: 40px;
	display: inline-block;
	background-image: url('../assets/img/gitHub.png');
	background-size: contain;
	cursor: pointer;
}
</style>
