<template>
    <div class="home">
		<header id="header">
			<div class="headerInner main-width">
				<nav class="nav">
					<div class="logo"></div>
					<ul>
						<li>nav1</li>
						<li>nav2</li>
					</ul>
				</nav>
				<div class="userBar">
					<span class="usrAvatar" :style="`background-image: url('${avatar_url}')`"></span>
					<span class="usrName">{{name}}</span>
					<span class="logout" @click="logout">logout</span>
				</div>
			</div>
		</header>
    </div>
</template>

<script>
	// import { apiPostSignIn, apiPostSignUp } from '../assets/js/api/api.user'
	import nImg from '../assets/img/n_img.png'

    export default {
		name: 'Home',
		data: () => ({
			name: sessionStorage.getItem('name'),
			avatar_url: sessionStorage.getItem('avatar_url') || nImg
		}),
        methods: {
			logout() {
				this.$router.push('/login')
			}
        }
    }
</script>

<style scoped lang="less">
@import url('../assets/style/app.less');

#header{
	padding: 0 20px;
	background-color: #fff;
	border-bottom: 1px solid #f1f1f1;
	box-sizing: border-box;
	.headerInner{
		height: 60px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #909090;
	}
	.nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo{
            height: 62px;
            width: 62px;
            background-image: url('../assets/img/logo.png');
			background-size: 90px 90px;
			background-position: center;
        }
		ul li{
			margin-right: 20px;
			float: left;
		}
	}
	.userBar{
		display: flex;
		align-items: center;
		.usrAvatar{
			display: block;
			width: 40px;
			height: 40px;
			border: 1px solid #f1f1f1;
			border-radius: 50%;
			background-size: contain;
		}
		.usrName{
			margin-left: 10px;
		}
		.logout{
			margin-left: 10px;
			cursor: pointer;
		}
	}
}
</style>
