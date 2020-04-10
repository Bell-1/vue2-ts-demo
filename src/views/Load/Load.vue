<template>
	<div class="load-page">
		<div class="container">
			<div class="row">
				<div class="title">输入百分比</div>
				<el-input
					placeholder="输入百分比"
					type="number"
					size="small"
					v-model="inputPercent"
					@change="changePercent"
				></el-input>
			</div>
			<div class="row">
				<div class="title">
					<div class="loading"></div>
					<span>动画</span>
				</div>
				<div>
					<el-button @click="start" type="success" size="small" icon="el-icon-loading">循环</el-button>
					<el-button @click="stop" type="danger" size="small" icon="el-icon-error">停止</el-button>
				</div>
			</div>
			<canvas class="canvas" id="circleProgress" width="300" height="500"></canvas>
		</div>

		<div class></div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import load from './circle'

	@Component({})
	export default class Load extends Vue {
		loading: boolean = false;
		percent: number = 10;

		get inputPercent() {
			return this.percent
		}

		set inputPercent(value: number) {
			this.percent = value % 100;
			this.changePercent();
		}

		mounted() {
			load.create('circleProgress');
			load.changePercent(this.percent);
		}

		destroy() {
			this.stop()
		}


		loop() {
			this.percent = this.percent % 100 + 1;
			load.changePercent(this.percent);
			if (this.loading) {
				requestAnimationFrame(this.loop)
			}
		}

		start() {
			if(this.loading) return
			this.loading = true;
			this.loop();
		}

		stop() {
			this.loading = false;
		}
		changePercent() {
			load.changePercent(this.percent % 100);
		}
	}
</script>

<style lang="scss" scoped>
	.load-page {
		.container {
			padding: 50px 30px;
			.row {
				padding: 20px 0;
				width: 500px;
				display: flex;
				align-items: center;
				.title {
					padding: 0 10px;
					width: 120px;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					& > * {
						margin: 2px;
					}
				}
				.el-input {
					width: 150px;
				}
			}
		}
		.canvas {
			background: #0cc;
		}

		.loading {
			position: relative;
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background: linear-gradient(
				rgb(245, 89, 89) 20%,
				transparent 45%,
				transparent 55%,
				rgb(99, 99, 247) 80%
			);
			border: none;
			animation: loading 2s linear infinite;
			&:before {
				position: absolute;
				content: '';
				margin: auto;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				height: 90%;
				width: 90%;
				background: white;
				border-radius: 50%;
			}
			@keyframes loading {
				from {
					transform: rotate(0);
				}

				to {
					transform: rotate(360deg);
				}
			}
		}
	}
</style>