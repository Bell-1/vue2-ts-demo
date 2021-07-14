<template>
	<div class="load-wrap">
		<div class="title">canvas</div>
		<div class="config">
			<div class="row">
				<label>输入百分比</label>
				<el-input
					placeholder="输入百分比"
					type="number"
					size="small"
					v-model="inputPercent"
					@change="changePercent"
				></el-input>
			</div>
			<div class="row">
				<label>
					<div class="loading"></div>
					<span>动画</span>
				</label>
				<div>
					<el-button @click="start" type="success" size="small" icon="el-icon-loading">循环</el-button>
					<el-button @click="stop" type="danger" size="small" icon="el-icon-error">停止</el-button>
				</div>
			</div>
		</div>
		<canvas class="canvas" id="circleProgress" width="300" height="500"></canvas>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import load from './circle'

@Component({})
export default class canvasLoad extends Vue {
	loading: boolean = false;
	percent: number = 10;

	get inputPercent() {
		return this.percent
	}

	set inputPercent(value: number) {
		this.percent = +value === 100 ? +value : value % 100;
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
		if (this.loading) return
		this.loading = true;
		this.loop();
	}

	stop() {
		this.loading = false;
	}
	changePercent() {
		load.changePercent(this.percent);
	}
}
</script>
