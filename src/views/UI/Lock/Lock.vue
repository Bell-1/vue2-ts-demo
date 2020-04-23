<template>
	<div class="Lock">
		<div class="lock">
			<div class="num-row" style="--i:-60deg">
				<span>-</span>
				<span>-</span>
			</div>
			<div class="num-row" style="--i:-30deg">
				<span>-</span>
				<span>-</span>
			</div>
			<div class="num-row" style="--i: 0">
				<span class>9</span>
				<span class>3</span>
			</div>
			<div class="num-row" style="--i:30deg">
				<span>-</span>
				<span>-</span>
			</div>
			<div class="num-row" style="--i:60deg">
				<span>-</span>
				<span>-</span>
			</div>
			<div class="num-row" style="--i:90deg">
				<span class="reset">0</span>
				<span class="reset">6</span>
			</div>
			<div class="hour" :style="{transform: `translate(-50%, -50%) rotate(${hr}deg)`}">
				<div class="hr"></div>
			</div>
			<div class="minute" :style="{transform: `translate(-50%, -50%) rotate(${min}deg)`}">
				<div class="min"></div>
			</div>
			<div class="second" :style="{transform: `translate(-50%, -50%) rotate(${sec}deg)`}">
				<div class="sec"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class Lock extends Vue {
		hr: number = 0;
		min: number = 0;
		sec: number = 0;
		timer: any = null;

		mounted() {
			this.calc();
			this.setTimer();
		}

		beforeDestroy() {
			this.clearTimer()
		}
		clearTimer() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		}

		calc() {
			const [h, m, s] = this.$moment().format('HH:mm:ss').split(':');
			this.hr = (h % 12 / 12) * 360;
			this.min = (m / 60) * 360;
			this.sec = (s / 60) * 360;
		}
		setTimer() {
			this.timer = setInterval(() => {
				this.calc();
			}, 500);
		}

	}
</script>

<style lang="scss">
	.Lock {
		height: 100%;
		padding: 50px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgb(125, 153, 187);
		// $c: rgb(211, 212, 212);
		$c: rgb(162, 195, 235);
		.center {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		.lock {
			position: relative;
			width: 200px;
			height: 200px;
			border-radius: 50%;
			background: rgb(125, 153, 187);
			box-shadow: 0 6px 12px rgb(99, 125, 156),
				0 -6px 10px rgba(213, 230, 253, 0.6),
				inset 0 4px 8px rgb(99, 125, 156),
				inset 0 -2px 8px rgba(227, 239, 255, 0.6);
			color: $c;

			&::before {
				content: '';
				@extend .center;
				height: 12px;
				width: 12px;
				background: $c;
				border-radius: 50%;
				z-index: 10;
			}
			.num-row {
				position: absolute;
				padding: 0 10px;
				top: 50%;
				left: 0;
				width: 100%;
				transform: translateY(-50%) rotate(var(--i));
				display: flex;
				align-items: center;
				justify-content: space-between;
				.reset {
					transform: rotate(-90deg);
				}
			}
			.hour,
			.minute,
			.second {
				@extend .center;
				display: flex;
				justify-content: center;
				transform-origin: 50% 50%;
			}

			.hour {
				width: 90px;
				height: 90px;

				.hr {
					width: 8px;
					height: 50%;
					border-radius: 10px;
					background: rgb(124, 164, 212);
				}
			}

			.minute {
				width: 120px;
				height: 120px;
				.min {
					width: 6px;
					height: 50%;
					border-radius: 10px;
					background: rgb(153, 190, 235);
				}
			}

			.second {
				width: 140px;
				height: 140px;
				.sec {
					width: 2px;
					height: 70%;
					border-radius: 10px;
					background: rgb(197, 219, 245);
				}
			}
		}
	}
</style>