import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import lineData from './line'

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	getOption() {
		let options = {
			title: {
				text: 'Beijing AQI'
			},
			tooltip: {
				trigger: 'axis',
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {readOnly: false},
					magicType: {type: ['line', 'bar']},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				data: lineData.map(function (item) {
					return item[0];
				})
			},
			yAxis: {
				splitLine: {
					show: false
				}
			},
			toolbox: {
				left: 'center',
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
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
				data: lineData.map(function (item) {
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
	render() {
		return (
			<div>
				<ReactEcharts option={this.getOption()} />
			</div>
		)
	}
}
