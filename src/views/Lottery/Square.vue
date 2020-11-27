<template>
	<div class="square">
		<div class="content">
			<div
				class="row"
				v-for="(row, index) of list"
				:key="index"
			>
				<div
					class="item"
					:class="{active: item === active}"
					v-for="item of row"
					:key="item"
				>{{item}}</div>
			</div>
			<div class="middle">
				<div class="prize">
					{{prize && `恭喜你抽中了 ${prize}` || ''}}
				</div>
				<div
					class="start"
					@click="start"
				>
					点击抽奖
				</div>
			</div>
		</div>

		<div class="record">
			<div class="">抽奖记录</div>
			<div
				class=""
				v-for="(v, index) of record"
				:key="index"
			>第{{record.length - index}}次: {{v}}</div>
		</div>
	</div>
</template>


<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class Square extends Vue {
		list: string[][] = [
			['项链', '手镯', '花', '手机', '毛绒玩具'],
			['衣服', '鞋子'],
			['裤子', '不要'],
			['口红', '香水', '包包', '520红包', '1块也是爱']
		];
		active: string = '';
		prize: string = '';
		loading: boolean = false;
		sortList: string[] = [];
		speed: number = 300;
		record: string[] = [];

		mounted() {
			this.sort();
		}
		sort() {
			let other: string[][] = JSON.parse(JSON.stringify(this.list));
			let start = other.shift() || [];
			let last = other.pop() || [];
			let sortList = [...start];
			let otherSort1: string[] = [];
			let otherSort2: string[] = [];
			let i = 0;
			while (i < other.length) {
				const [s, e] = other[i];
				otherSort1.push(e);
				otherSort2.unshift(s);
				i++
			}
			sortList.push(...otherSort1, ...last.reverse(), ...otherSort2);
			this.sortList = sortList;
		}
		start() {
			if (this.loading) return;
			let { sortList, active } = this;
			let prize = Math.floor(Math.random() * (sortList.length - 1));
			let num = Math.floor(Math.random() * 2 + 1);
			let turnList = [...sortList, ...sortList.slice(0, prize + 1)];
			while (num--) {
				turnList.unshift(...sortList);
			}
			turnList.unshift(...sortList.slice(sortList.indexOf(active) + 1));
			this.prize = '';
			this.loading = true;
			this.run(turnList);

		}

		run(list: string[] = []) {
			let { speed } = this;
			if (list.length > 15 && speed > 60) {
				this.speed -= 20;
			}
			if (list.length <= 15) {
				this.speed += speed < 260 ? 20 : 100*(5-list.length);
			}
			setTimeout(() => {
				this.active = list.shift() || '';
				if (list.length) {
					this.run(list);
				} else {
					this.loading = false;
					this.prize = this.active;
					this.speed = 200;
					this.record.unshift(this.active);
				}
			}, this.speed);
		}
	}
</script>

<style lang="scss">
	.square {
		.content {
			position: relative;
			width: 480px;
			height: 380px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			user-select: none;
			.row {
				width: 100%;
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
			}
			.item {
				width: 80px;
				height: 80px;
				background: rgb(206, 248, 250);
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 4px;
				&.active {
					background: rgb(255, 145, 145);
				}
				transition: background 0.3s;
			}
			.middle {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.start {
					background: rgb(241, 188, 188);
					width: 120px;
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					color: white;
					border-radius: 10px;
					cursor: pointer;
					&:active {
						box-shadow: inset 3px 3px 6px rgb(201, 178, 178), inset -3px -3px 6px rgb(255, 237, 237);
					}
				}
				.prize {
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					color: rgb(252, 126, 126);
				}
			}
		}
		.record {
			margin-top: 30px;
			div {
				margin-bottom: 15px;
			}
		}
	}
</style>