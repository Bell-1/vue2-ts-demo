<template>
	<div class="dashboard">
		<VueEcharts class="lineChart" :option="options" :ei.sync="ei"></VueEcharts>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import lineData from './line'

	@Component({})
	export default class Dashboard extends Vue {

		options: any = {}
		private ei: any= {}

		mounted() {
			this.options = this.getOption();
			// this.dipatchAction();
		}
		private dipatchAction() {
			this.ei.dispatchAction(this.getOption());
		}

		getOption() {
			let options = {
				title: {
					text: 'dashboard test data'
				},
				tooltip: {
					trigger: 'axis',
				},
				toolbox: {
					show: true,
					left: 'center',
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						dataView: { readOnly: false },
						magicType: { type: ['line', 'bar'] },
						restore: {},
						saveAsImage: {}
					},
				},
				xAxis: {
					data: lineData.map(function (item: any) {
						return item[0];
					})
				},
				yAxis: {
					splitLine: {
						show: false
					}
				},
				dataZoom: [{
					startValue: '2014-06-01'
				}, {
					type: 'inside'
				}],
				visualMap: {
					top: 10,
					right: 10,
					pieces: [{
						gt: 0,
						lte: 50,
						color: '#096'
					}, {
						gt: 50,
						lte: 100,
						color: '#ffde33'
					}, {
						gt: 100,
						lte: 150,
						color: '#ff9933'
					}, {
						gt: 150,
						lte: 200,
						color: '#cc0033'
					}, {
						gt: 200,
						lte: 300,
						color: '#660099'
					}, {
						gt: 300,
						color: '#7e0023'
					}],
					outOfRange: {
						color: '#999'
					}
				},
				series: {
					name: 'Beijing AQI',
					type: 'line',
					data: lineData.map(function (item: any) {
						return item[1];
					}),
					markLine: {
						silent: true,
						data: [{
							yAxis: 50
						}, {
							yAxis: 100
						}, {
							yAxis: 150
						}, {
							yAxis: 200
						}, {
							yAxis: 300
						}]
					}
				}
			}
			return options
		}
	}
</script>

<style lang="scss" scoped>
	.dashboard {
		.lineChart {
			height: 300px;
		}
	}
</style>