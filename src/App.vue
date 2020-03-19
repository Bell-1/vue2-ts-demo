<template>
	<div id="app">
		<router-view />
		<canvas id="particle"></canvas>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { start as particleInit, destory as particleDestory } from '@/utils/ParticleEffect.js'

	@Component
	export default class App extends Vue {
		mounted() {
			particleInit();
			console.log(111)
		}
		destroy() {
			particleDestory();
		}
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

		#particle {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			width: 100vw;
			height: 100vh;
			z-index: -1;
		}
	}
</style>
