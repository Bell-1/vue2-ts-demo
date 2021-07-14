<template>
	<div class="load-wrap">
		<div class="title">Svg</div>
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
		</div>
		<div class="container">
			<div class="content">
				<svg>
					<circle
						id="donut-graph"
						r="100"
						cy="150"
						cx="150"
						stroke-width="4px"
						stroke="rgb(226, 235, 235)"
						stroke-linejoin="round"
						stroke-linecap="round"
						fill="none"
						stroke-dasharray="630"
					/>

					<circle
						id="donut-graph"
						class="t1"
						r="100"
						cy="150"
						cx="150"
						stroke-width="6px"
						stroke="rgb(108, 255, 89)"
						stroke-linejoin="round"
						stroke-linecap="round"
						fill="none"
						stroke-dasharray="630px"
						:stroke-dashoffset="dashoffset"
					/>
				</svg>
				<span>{{percent}}%</span>
			</div>

			<div class="content">
				<svg>
					<circle
						id="donut-graph"
						r="100"
						cy="150"
						cx="150"
						stroke-width="4px"
						stroke="rgb(226, 235, 235)"
						stroke-linejoin="round"
						stroke-linecap="round"
						fill="none"
						stroke-dasharray="630"
					/>

					<circle
						id="donut-graph"
						class="loading"
						r="100"
						cy="150"
						cx="150"
						stroke-width="6px"
						stroke="rgb(108, 255, 89)"
						stroke-linejoin="round"
						stroke-linecap="round"
						fill="none"
						stroke-dasharray="630px"
						:stroke-dashoffset="dashoffset"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class canvasLoad extends Vue {
	loading: boolean = false;
	percent: number = 10;

	get inputPercent() {
		return this.percent
	}

	get dashoffset() {
		return 630 * (100 - this.percent) / 100 + 'px'
	}

	set inputPercent(value: number) {
		this.percent = +value === 100 ? +value : value % 100;
		this.changePercent();
	}


	start() {
		this.loading = true;
	}

	stop() {
		this.loading = false;
	}

	changePercent() {
		this.stop();
	}
}
</script>