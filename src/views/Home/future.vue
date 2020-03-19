<template>
	<div class="future">
		<VueEcharts class="lineChart" :option="options" :ei.sync="ei"></VueEcharts>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import { Weather } from '@/interface/weather'

	let dates: string[] = [];
	let highs: string[] = [];
	let dateHighs: string[][] = [];

	@Component({})
	export default class future extends Vue {
		options: any = {}
		private ei: any = {}
		weathers: Weather[] = [];

		mounted() {
			this.options = this.getOption();
			this.fetchWeather();
		}
		private dipatchAction() {
			this.ei.setOption(this.upOptions());
			console.log('update')
		}

		getOption() {
			let options = {
				title: {
					text: ''
				},
				tooltip: {
					// trigger: 'axis',
				},
				toolbox: {
					// show: true,
					// left: 'center',
					// feature: {
					// 	dataZoom: {
					// 		yAxisIndex: 'none'
					// 	},
					// 	dataView: { readOnly: false },
					// 	magicType: { type: ['line', 'bar'] },
					// 	restore: {},
					// 	saveAsImage: {}
					// },
				},
				xAxis: {
					name: '日期',
					type: 'time',
					axisLabel: {
						formatter: (value: string) => {
							return this.$moment(value).format('YYYY-MM-DD');
						},
					},
					splitLine: {
						show: false
					},
					axisTick: {
						interval: 0,
						length : 3,
					},


					axisPointer: {
						show: true,
						type: 'line',
						snap: true,
					}
				},
				yAxis: {
					type: 'value',
					xAxis: {
					},
					splitLine: {
						show: false
					},
				},
				series: {
					type: 'line',
				}
			}
			return options
		}

		upOptions() {
			let options = {
				series: {
					type: 'line',
					data: dateHighs,
				}
			}
			return options
		}


		async fetchWeather() {
			try {
				const [{ location, data, lost_update }] = await this.$http.request('weatherDaliy', { days: 15 });
				this.weathers = [];
				dates = [];
				highs = [];
				dateHighs = [];
				for (let v of data) {
					dates.push(v.date)
					dateHighs.push([v.date, v.high]);
					highs.push(v.high);
				}
				console.log(dates, highs, dateHighs)
				this.dipatchAction();
			} catch (error) {
				console.error(error)
			}
		}


	}
</script>


<style lang="scss" scoped>
	.future {
		.lineChart {
			width: 100%;
			height: 300px;
		}
	}
</style>