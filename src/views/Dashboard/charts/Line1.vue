<template>
	<div class="chart">
		<VueEcharts class="line-chart" :option="options" :ei.sync="ei"></VueEcharts>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import moment from 'moment'
	import _ from 'lodash'

	@Component({})
	export default class LineChart extends Vue {
		options: any = {}
		private ei: any = {}

		mounted() {
			this.options = this.getOption();
		}
		private dipatchAction() {
			this.ei.dispatchAction(this.getOption());
		}

		getOption() {
			let xData: string[] = ['2020-04-08', '2020-04-09', '2020-04-10', '2020-04-13', '2020-04-14'];
			let etfData: number[] = [73.77, 72.01, 64.20, 60.18, 64.63];
			let cData: number[] = [46.10, 46.20, 46.20, 46.20, 46.20];

			let options = {
				legend: {
					show: true,
				},
				xAxis: {
					name: '时间',
					axisTick: {
						alignWithLabel: true,
						show: false
					},
					axisLine: {
						onZero: true
					},
					data: xData,
				},

				yAxis: {
					name: '净值',
					splitLine: {
						show: false,
					},
					axisLine: {
						show: true,
						onZero: false
					},
					axisTick: {
						show: false
					},
				},


				visualMap: {
					show: false,
					min: 0,
					max: 50,
					dimension: 0,
					inRange: {
						color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
					}
				},

				tooltip: {
					show: true,
					trigger: 'item',
					axisPointer: {
						type: 'cross'
					}
				},

				series: [
					{
						type: 'line',
						name: '半导体',
						hoverAnimation: true, //hover 在拐点标志上的提示动画效果
						smooth: true, //平滑显示
						data: etfData,
						label: {
							show: false
						},
						lineStyle: {
							color: '#f5898b'
						}
					},
					{
						type: 'line',
						name: '债基',
						hoverAnimation: true,
						smooth: true,
						data: cData,
						label: {
							show: false
						},
						lineStyle: {
							color: '#64a89a'
						}

					}
				]
			}

			return options
		}

	}
</script>

<style lang="scss" scoped>
	.chart {
		// background: rgb(225, 255, 218);
		.line-chart {
			height: 300px;
		}
	}
</style>