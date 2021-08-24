<template>
	<div class="WebGl">
		<canvas id="webgl" width="500" height="500"></canvas>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class MyComponent extends Vue {
		mounted() {

		}

		initGl() {
			var canvas = document.getElementById('webgl') as HTMLCanvasElement | null;
			// if (!canvas) return;
			var gl = canvas!.getContext('webgl');
			if (!gl) return;
		}
	}
</script>