<template>
	<div class="chart">
		<VueEcharts class="bar-chart" :option="options" :ei.sync="ei"></VueEcharts>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import moment from 'moment'
	import _ from 'lodash'

	@Component({})
	export default class BarChart extends Vue {
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
			let yData = new Array(60).fill(0).map(() => _.random(3, 15));

			let options = {
				xAxis: {
					show: true,
					data: xData,
					axisLabel: {
						textStyle: {
							color: '#ccc'
						}
					},
				},

				yAxis: {
					axisLine: {
						show: false
					},
					axisLabel: {
						textStyle: {
							color: '#ccc'
						}
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: '#08263f'
						}
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
						name: '数量',
						type: 'bar',
						itemStyle: {
							normal: {
								barBorderRadius: 10
							}
						},
						data: yData,
					}
				]
			}

			return options
		}

	}
</script>

<style lang="scss" scoped>
	.chart {
		background: rgb(213, 233, 255);
		.bar-chart {
			height: 300px;
		}
	}
</style>