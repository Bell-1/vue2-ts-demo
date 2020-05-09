<template>
	<div class="load-page">
		<canvas-load></canvas-load>
		<icon-svg></icon-svg>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import CanvasLoad from './canvas.vue'
	import IconSvg from './IconSvg.vue'

	@Component({
		components: {
			CanvasLoad,
			IconSvg
		}
	})
	export default class Load extends Vue {

	}
</script>

<style lang="scss" scoped>
	.load-page {
		display: flex;
		& > div {
			box-shadow: 6px 6px 12px #eeeeee;
			width: 500px;
			margin-right: 30px;
			border-radius: 20px;
		}
	}
</style>