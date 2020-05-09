<template>
	<div class="Fund">
		<div class="input-row">
			<label>添加基金（代码）:</label>
			<el-input type v-model="fundCode" />
			<el-button type="primary" @click="handleAdd">添加</el-button>
		</div>
		<div class="pics" @click="handleUpdate">
			<img :src="found" alt v-for="found of showFunds" :key="found" />
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class Fund extends Vue {
		fundCode: string = ''
		funds: Set<string> = new Set(['007301', '001868'])
		showFunds: string[] = [];

		mounted() {
			this.handleUpdate();
		}

		handleAdd() {
			const { fundCode } = this;
			if (!!fundCode && !this.funds.has(fundCode)) {
				this.funds.add(fundCode);
				this.fundCode = '';
				this.handleUpdate();
			}
		}

		handleUpdate() {
			let timeStamp: number = +new Date();
			this.showFunds = [...this.funds].map(code => `http://j4.dfcfw.com/charts/pic6/${code}.png?v=${timeStamp}`)
		}


	}
</script>

<style lang="scss" scoped>
	.Fund {
		.input-row {
			display: flex;
			align-items: center;
			.el-input {
				margin: 0 20px;
				width: 200px;
			}
		}
		.pics {
			width: 100%;
			display: flex;
			flex-flow: row wrap;
			align-items: center;
			img {
				width: 450px;
				margin: 20px;
				cursor: pointer;
			}
		}
	}
</style>