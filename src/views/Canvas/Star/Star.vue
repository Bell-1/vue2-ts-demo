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
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-around;
		.canvas-wrapper {
			margin: 0.1rem 0;
			box-shadow: 0 0 0.1rem rgb(228, 227, 227);
			border-radius: 0.06rem;
			width: 5rem;
			height: 5rem;

			canvas {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>