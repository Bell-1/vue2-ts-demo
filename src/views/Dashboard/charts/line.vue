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
			let xData = new Array(60).fill('').map((item, i) => moment().subtract(60 - i, 'days').format('M.D'))
			let yData = new Array(60).fill(0).map(() => _.random(10, 50));

			let options = {
				xAxis: {
					axisTick: {
						alignWithLabel: true,
						show: false
					},
					data: xData,
				},

				yAxis: {
					splitLine: {
						show: false,
					},
					axisLine: {
						show: true
					},
					axisTick: {
						show: false
					}
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
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},

				series: [
					{
						type: 'line',
						hoverAnimation: true,
						smooth: true,
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{ offset: 0, color: '#ef5055' },
									{ offset: 1, color: '#f5d69f' },
								],
								global: false // 缺省为 false
							}
						},
						data: yData,
						label: {
							show: false
						},
						itemStyle: {
							opacity: 0
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
		background: rgb(225, 255, 218);
		.line-chart {
			height: 300px;
		}
	}
</style>