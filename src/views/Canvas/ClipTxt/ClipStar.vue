<template>
	<div class="canvas-wrapper">
		<canvas id="clipStar"></canvas>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import { fivePointStar } from '../can'

	@Component({})
	export default class clipStar extends Vue {
		canvas: any = null;
		ctx: any = null;
		area = { x: 250, y: 250, r: 50, speed: 5 };

		mounted() {
			this.init();
		}

		init() {
			let canvas: any = this.canvas = document.getElementById('clipStar');
			let ctx: any = this.ctx = canvas.getContext('2d');
			canvas.width = canvas.offsetWidth
			canvas.height = canvas.offsetHeight
			this.changeR();
		}

		changeR() {
			let { area, canvas } = this;
			area.speed *= area.r >= canvas.width || area.r <= 10 ? -1 : 1;
			this.area.r += area.speed;
			this.draw();
			requestAnimationFrame(this.changeR);
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
			// ctx.arc(x, y, r, 0, Math.PI * 2);
			fivePointStar(ctx, x, y, r, r / 2);
			ctx.fillStyle = '#FFF';
			ctx.clip();

			ctx.fillRect(0, 0, width, height);
			ctx.fill();

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
