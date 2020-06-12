<template>
	<div class="canvas-wrapper">
		<canvas id="clipHover" @mousemove="mousemove"></canvas>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class clipHover extends Vue {
		canvas: any = null;
		ctx: any = null;
		area = { x: 250, y: 250, r: 100 };

		mounted() {
			this.init();
		}

		init() {
			let canvas: any = this.canvas = document.getElementById('clipHover');
			let ctx: any = this.ctx = canvas.getContext('2d');
			canvas.width = canvas.offsetWidth
			canvas.height = canvas.offsetHeight
			this.draw();
		}

		mousemove(e: any) {
			this.area.x = e.offsetX;
			this.area.y = e.offsetY;
			this.draw();
		}

		draw() {
			const { canvas, ctx, area } = this;
			let { width, height } = canvas;
			ctx.clearRect(0, 0, width, height);
			ctx.save();

			ctx.fillStyle = 'black';
			ctx.beginPath();
			ctx.fillRect(0, 0, width, height);

			const { x, y, r } = area;
			ctx.beginPath();
			ctx.arc(x, y, r, 0, Math.PI * 2);
			ctx.fillStyle = '#FFF';
			ctx.fill();
			ctx.clip();

			ctx.font = "90px Georgia";
			ctx.fillStyle = 'red';
			ctx.fillText('BELL BELL', 10, 90);
			ctx.fillText('BELL BELL', 10, 210);
			ctx.fillText('BELL BELL', 10, 330);
			ctx.fillText('BELL BELL', 10, 450);
			ctx.restore();
		}



	}
</script>

<style lang="scss">
</style>
