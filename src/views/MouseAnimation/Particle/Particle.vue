<template>
	<div class="particle-wrapper">
		<canvas id="particle"></canvas>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import { start as particleInit, destory as particleDestory } from '@/utils/ParticleEffect.js'

	@Component({})
	export default class Particle extends Vue {
		mounted() {
			particleInit();
		}
		destroy() {
			particleDestory();
		}
	}
</script>

<style lang="scss" scoped>
	.particle-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		#particle {
			width: 100%;
			height: 100%;
		}

	}
</style>