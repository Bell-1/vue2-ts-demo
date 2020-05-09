<template>
	<div class="canvas-load">
		<div class="title">canvas 实现</div>
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

<style lang="scss">
	.canvas-load {
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

		.container {
			background: #0cc;
			width: 300px;
			height: 500px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.content {
				width: 300px;
				height: 300px;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				svg {
					position: absolute;
					transform: rotate(-90deg);
					width: 300px;
					height: 300px;
				}
				.t1 {
					transition: all 1s ease-out;
				}
				.loading {
					animation: donut-show-one linear 5s infinite;
				}
				@keyframes donut-show-one {
					from {
						stroke-dashoffset: 630px;
					}
					to {
						stroke-dashoffset: 0px;
					}
				}
				span {
					color: white;
					font-size: 30px;
				}
			}
		}
	}
</style>