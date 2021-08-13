import React, { Component } from 'react'
import { Input, Button } from 'antd'
import "./index.scss"

export default class DigitalScroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 0,
			startNum: 0,
			endNum: 100,
			time: 3,
			fixed: 2,
		}
		this.timer = null;
	}

	/**
	 * 改变输入框更新state
	 */
	changeInput(target, e) {
		this.setState({
			[target]: +e.target.value
		})
	}

	/**
	 * 计算没帧动画数字查
	 */
	calcIntelval() {
		const { startNum, endNum, time, fixed } = this.state;
		const spaceNum = (endNum - startNum) / (time * 30); // 30 是每秒中30针
		return +spaceNum.toFixed(fixed);
	}

	/**
	 * 设置定时器更新数字
	 * @param {*} spaceNum 
	 */
	setTimer(spaceNum) {
		let { startNum, endNum, fixed } = this.state;
		this.clearTimer();
		this.setState({
			num: startNum
		})
		this.timer = setInterval(() => {
			let { num } = this.state;
			num = +(num + spaceNum).toFixed(fixed);
			if (spaceNum > 0 && num > endNum || spaceNum < 0 && num < endNum) {
				num = endNum;
				this.clearTimer();
			}
			this.setState({
				num
			})
		}, 34); // 34 1000/30=34 是每秒中30针
	}

	/**
	 * 清除定时器
	 */
	clearTimer() {
		let { timer } = this;
		if (timer) {
			console.timeEnd('耗时');
			clearInterval(timer);
			this.timer = null;
		}
	}

	/**
	 * 开始按钮事件
	 */
	startScroll = () => {
		let spaceNum = this.calcIntelval();
		this.setTimer(spaceNum);
	}

	render() {
		let { num, startNum, endNum, time, fixed } = this.state;
		return (
			<div className="NumberScroll">
				<div className="options">
					<div className="row">
						<label>初始数字</label>
						<Input type="number" value={startNum} onChange={this.changeInput.bind(this, 'startNum')}></Input>
					</div>
					<div className="row">
						<label>目标数字</label>
						<Input type="number" value={endNum} onChange={this.changeInput.bind(this, 'endNum')}></Input>
					</div>
					<div className="row">
						<label>滚动时间</label>
						<Input type="number" value={time} onChange={this.changeInput.bind(this, 'time')} addonAfter="s"></Input>
					</div>
					<div className="row">
						<label>保留小数</label>
						<Input type="number" value={fixed} onChange={this.changeInput.bind(this, 'fixed')} addonAfter="位小数"></Input>
					</div>
					<div className="btns">
						<Button onClick={this.startScroll}>开始</Button>
					</div>
				</div>
				<div className="row result">
					<label>滚动数字:</label>
					{num}
				</div>
			</div>
		)
	}
}
