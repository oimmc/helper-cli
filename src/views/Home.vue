<template>
    <div class="home">
		<img src="../assets/img/logo.png" alt="logo" width="100">
		<div>
			{{ params.msg }} <a href="https://github.com/wangyajundev/helper-cli" target="_blink">helper-cli</a>
		</div>
		<router-link to="/hello">To hello page</router-link>
    </div>
</template>

<script>

    export default {
		name: 'Home',
		data: () => ({
			params: {
				msg: 'Welcome to'
			}
		})
    }
</script>

<style scoped lang="less">
	@import url('./home.css');
</style>
