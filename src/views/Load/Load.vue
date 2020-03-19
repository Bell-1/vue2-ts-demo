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
				<div class="title">动画</div>
				<div>
					<el-button @click="start" type="success" size="small">循环</el-button>
					<el-button @click="stop" type="danger" size="small">停止</el-button>
				</div>
			</div>
			<canvas class="canvas" id="circleProgress" width="300" height="500"></canvas>
		</div>
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
					text-align: right;
				}
				.el-input {
					width: 150px;
				}
			}
		}
		.canvas {
			background: #0cc;
		}
	}
</style>