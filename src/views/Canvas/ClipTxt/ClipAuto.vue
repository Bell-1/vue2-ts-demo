<template>
	<div class="canvas-wrapper">
		<canvas id="clipAuto"></canvas>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class ClipAuto extends Vue {
		canvas: any = null;
		ctx: any = null;
		area = { x: 200, y: 150, r: 100, xSpeed: 8, ySpeed: 4 };

		mounted() {
			this.init();
		}

		init() {
			let canvas: any = this.canvas = document.getElementById('clipAuto');
			let ctx: any = this.ctx = canvas.getContext('2d');
			canvas.width = canvas.offsetWidth
			canvas.height = canvas.offsetHeight
			this.moveClipArea();
		}

		moveClipArea() {
			const { canvas, ctx, area } = this;
			const { x, y, xSpeed, ySpeed, r } = area;
			area.x += xSpeed;
			area.y += ySpeed;
			if (area.x <= r || area.x >= canvas.width - r) {
				area.xSpeed = -xSpeed;
			}
			if (area.y <= r || area.y >= canvas.height - r) {
				area.ySpeed = -ySpeed;
			}
			this.draw();
			setTimeout(() => {
				this.moveClipArea();
			}, 100);
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
