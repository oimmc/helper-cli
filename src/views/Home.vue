<template>
    <div class="home">
		<img src="../assets/img/logo.png" alt="logo" width="100">
		<div>
			{{ params.msg }} <a href="https://github.com/wangyajundev/helper-cli" target="_blink">helper-cli</a>
		</div>
		<router-link to="/hello">To hello page</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface IParams {
	msg: string
}

@Component({
	name: 'Home'
})
export default class Home extends Vue {
	private params: IParams = {
		msg: 'Welcome to'
	}
}

</script>

<style scoped lang="less">
	.home {
		text-align: center;
	}
</style>
