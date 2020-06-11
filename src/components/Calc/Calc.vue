<template>
	<div class="Calc">
		<div class="input">
			<div class="content" :class="{small: value.length > 24, mini: value.length > 28}">{{value}}</div>
		</div>
		<div class="btns">
			<div
				class="number"
				v-for="btn of btns"
				:key="btn.value"
				:class="btn.c"
				@click="btn.method(btn)"
			>{{btn.value}}</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class Calc extends Vue {
		@Prop() defaultValue: string = '';
		value: string = '欢迎使用计算器';
		isCalculated: boolean = true;

		btns: any[] = [
			{ value: 'C', method: this.handleClear },
			{ value: '<', method: this.handleDel },
			{ value: '/', method: this.handleSign },
			{ value: '*', method: this.handleSign },
			{ value: '7', method: this.handlePushNumber },
			{ value: '8', method: this.handlePushNumber },
			{ value: '9', method: this.handlePushNumber },
			{ value: '-', method: this.handleSign },
			{ value: '4', method: this.handlePushNumber },
			{ value: '5', method: this.handlePushNumber },
			{ value: '6', method: this.handlePushNumber },
			{ value: '+', method: this.handleSign },
			{ value: '1', method: this.handlePushNumber },
			{ value: '2', method: this.handlePushNumber },
			{ value: '3', method: this.handlePushNumber },
			{ value: '=', method: this.handleCalc, c: 'col-double', },
			{ value: '0', method: this.handlePushNumber, c: 'row-double' },
			{ value: '.', method: this.handlePoint },
		];

		mounted() {

		}

		update() {

		}

		handleClear() {
			this.value = '';
			this.isCalculated = true;
		}

		handleDel() {
			if (this.value !== '') {
				this.value = this.value.slice(0, this.value.length - 1);
			}
		}

		pushValue(value: string) {
			this.value += value;
			if (this.value.length >= 30) {
				this.value = '停，够长了，你到底要干啥！';
				this.isCalculated = true;
			}
		}

		handlePoint() {
			this.checkBegin();
			let a: any = this.value.split(/[\+\-\*\/]/);
			const last = a.pop();
			if (last === '') {
				this.pushValue('0.');
			} else if (last.indexOf('.') === -1) {
				this.pushValue('.');
			}
		}

		handleSign(btn: any) {
			const { value } = btn;
			if (this.value === '') return;
			if (/\.$/.test(this.value)) this.handleDel();
			if (!/[\+\-\*\/]$/.test(this.value)) {
				//结尾无符号 直接添加符号
				this.pushValue(value);
				return
			}
			//结尾有符号
			if (value !== '-' || value === '-' && /[\+\-\*\/]-$/.test(this.value)) {
				this.value = this.value.replace(/[\.\+\-\*\/]*$/, '');
			}
			this.pushValue(value)
		}

		handleCalc() {
			try {
				this.value = eval(this.value.replace(/[\.\+\-\*\/]*$/, '')).toString();
			} catch (error) {
				this.value = '→_→计算器都不会用！！！'
			} finally {
				this.isCalculated = true;
			}
		}

		checkBegin() {
			if (this.isCalculated) {
				this.value = '';
				this.isCalculated = false;
			}
		}

		handlePushNumber(btn: any) {
			this.checkBegin();
			const { value } = btn;
			const numberArr: string[] = this.value.split(/[\+\-\*\/]/);
			const last = numberArr.pop();
			if (last && last === '0') this.handleDel();
			this.pushValue(value);
		}


	}
</script>

<style lang="scss" scope>
	$bg: rgb(223, 229, 236);
	$bg-d: #c8cfd9;
	$bg-l: rgb(242, 243, 247);
	$color: rgb(247, 140, 97);
	.Calc {
		margin: 30px;
		padding: 30px;
		background: $bg;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 350px;
		box-shadow: 6px 6px 24px $bg-d, -6px -6px 24px $bg-l;
		border-radius: 10px;
		color: $color;
		font-size: 19px;
		font-weight: bold;
		user-select: none;
		.input {
			padding: 0 15px;
			margin-bottom: 30px;
			width: 100%;
			height: 50px;
			border-radius: 10px;
			box-shadow: inset 3px 3px 6px $bg-d, inset -3px -3px 6px $bg-l;
			.content {
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				overflow: hidden;
				transition: font-size 0.3s;
				&.small {
					font-size: 15px;
					font-weight: none;
				}

				&.mini {
					font-size: 12px;
					font-weight: none;
				}
			}
		}
		.btns {
			width: 285px;
			position: relative;
			display: flex;
			flex-wrap: wrap;
			.number {
				margin: 0 15px 15px 0;
				width: 60px;
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				box-shadow: 6px 6px 12px $bg-d, -6px -6px 12px $bg-l;
				transition: box-shadow 0.2s;
				cursor: pointer;

				&:active {
					box-shadow: 6px 6px 12px $bg-d, -6px -6px 12px $bg-l,
						inset 3px 3px 12px $bg-d, inset -3px -3px 12px $bg-l;
				}
				&:hover {
					color: lighten($color, 5%);
				}
				&:nth-of-type(4n) {
					margin-right: 0;
				}
				&.col-double {
					position: absolute;
					right: 0;
					bottom: 0;
					height: 135px;
					border-radius: 30px;
				}
				&.row-double {
					position: relative;
					width: 135px;
					border-radius: 30px;
				}
			}
		}
		.right {
			width: 40%;
		}
	}
</style>