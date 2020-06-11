<template>
	<div class="canvas-wrapper flex">
		<canvas id="starDown"></canvas>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import { fivePointStar, ellipse, circle } from '../can'
	const getColor = () => Math.floor(Math.random() * 255);

	@Component({})
	export default class StarDown extends Vue {
		ctx: any = null;
		stars: any[] = [];
		mounted() {
			let canvas: any = document.getElementById('starDown')
			this.ctx = canvas?.getContext('2d');
			canvas.width = 500;
			canvas.height = 500;
			this.init();

		}

		init() {
			let { ctx } = this;
			ctx.lineWidth = 1;
			ctx.lineJoin = "round";
			for (let i = 0; i < 60; i++) {
				this.createStar();
			}
			this.draw();
			this.move();
		}

		createStar() {
			const x = Math.random() * 500;
			const y = Math.random() * 400 - 100;
			const angle = Math.random() * 90;
			const size = Math.random() * 6 + 5;
			const color = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
			const speed = Math.random() * 2 + 0.5;
			const star = { x, y, angle, size, color, speed };
			this.stars.push(star);
		}
		move() {
			let { stars } = this;
			stars.forEach((star, index) => {
				const { x, y, size, speed } = star;
				star.y += speed;
				if (y > 500 + size) {
					stars.splice(index, 1);
				}
			})
			while (this.stars.length < 60) {
				this.createStar();
			}
			this.draw();
			requestAnimationFrame(() => {
				this.move();
			})

		}

		draw() {
			let { ctx, stars } = this;
			ctx.clearRect(0, 0, 500, 500);
			for (let star of stars) {
				let { x, y, angle, size, color } = star;
				ctx.fillStyle = color;
				fivePointStar(ctx, x, y, size, size / 2, angle);
				ctx.fill();
			}
		}




	}
</script>

<style lang="scss">
</style>