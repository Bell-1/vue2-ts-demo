<template>
	<div class="Star flex center around">
		<star-up></star-up>
		<star-down></star-down>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import StarDown from './StarDown.vue'
	import StarUp from './StarUp.vue'

	const getColor = () => Math.floor(Math.random() * 255);

	@Component({
		components: {
			StarUp,
			StarDown
		}
	})
	export default class HCanvas extends Vue {
	}
</script>

<style lang="scss">
	.Star {
		height: 100%;
		.canvas-wrapper {
			box-shadow: 0 0 10px rgb(228, 227, 227);
			border-radius: 6px;
			width: 500px;
			height: 500px;
			#h2canvas {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>