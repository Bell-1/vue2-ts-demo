<template>
	<div class="chart">
		<VueEcharts class="line-chart" :option="options" :ei.sync="ei"></VueEcharts>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
	import moment from 'moment'
	import _ from 'lodash'

	@Component({})
	export default class LineChart extends Vue {
		options: any = {}
		private ei: any = {}
		@Prop({ default: [] }) data!: []

		mounted() {
			this.options = this.getOption();
		}

		@Watch('data')
		changeData (){
			console.log(this.data)
			this.dipatchAction();
			this.options = this.getOption();
		}

		private dipatchAction() {
			this.ei.dispatchAction(this.getOption());
		}

		getOption() {
			let xData: string[] = ['2020-04-08', '2020-04-09', '2020-04-10', '2020-04-13', '2020-04-14'];
			let etfData: number[] = [0.71, -1.01, -4.54, -2.45, 2.78];
			let cData: number[] = [0.14, 0.07, 0, 0, 0];

			let options = {
				legend: {
					show: true,
				},
				xAxis: {
					name: '时间',
					axisTick: {
						alignWithLabel: true,
						show: true
					},
					axisLine: {
						onZero: true
					},
					data: this.data.map((item: any) => item.timeStr).reverse(),
				},

				yAxis: {
					name: '涨幅 %',
					splitLine: {
						show: true,
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
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},

				series: [
					{
						type: 'line',
						name: '血糖监测',
						hoverAnimation: true, //hover 在拐点标志上的提示动画效果
						smooth: true, //平滑显示
						data: this.data.map((item: any) => item.value).reverse(),
						label: {
							show: false
						},
						lineStyle: {
							color: '#f5898b'
						}
					},
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