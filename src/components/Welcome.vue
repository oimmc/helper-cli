<template>
    <div class="welcome">
        <h3>welcome</h3>
        <router-link to="/login">login</router-link>
		<div>{{ message }}</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
class Welcome extends Vue {
	public message: string = 'Hello!'
	// render() {
	// 	return <div>helloword</div>
	// }
}
// export default Vue.extend({
// 	name: 'Welcome',
// 	render(h, context) {
// 		return (
// 			<div>sss</div>
// 		)
// 	}
// })
export default Welcome
</script>

<style scoped lang="less">

</style>
