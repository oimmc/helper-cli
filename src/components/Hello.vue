<template>
    <div class="hello">
        <h3>hello</h3>
        <router-link to="/home">home</router-link>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
class Hello extends Vue {
	public message: string = 'Hello!'
}

export default Hello
</script>

<style scoped lang="less">
	.hello {
		text-align: center;
	}
</style>
