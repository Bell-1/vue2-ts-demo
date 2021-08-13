<template>
	<div class="particle-wrapper">
		<canvas id="particle"></canvas>
		<div class="info">移动鼠标显示粒子效果</div>
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
		display: flex;
		align-items: center;
		justify-content: center;
		#particle {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

		.info {
			font-size: 30px;
			color: #fff;
			text-shadow: 0 0 10px rgb(108, 223, 136);
		}
	}
</style>