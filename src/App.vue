<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'

	@Component({})
	export default class App extends Vue {
	}
</script>

<style lang="scss">
	body {
		margin: 0;
		padding: 0;
	}
	#app {
		height: 100vh;
		.el-container {
			height: 100%;
		}
	}
</style>
