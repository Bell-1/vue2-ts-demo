<template>
	<div class="BloodSugar">
		<div class="BloodSugar__header">
			<div class="BloodSugar__title">血糖管理</div>
			<div class="BloodSugar__operate">
				<span>
					<i class="el-icon-search"></i>
				</span>
				<span @click="addShow = !addShow">
					<i :class="addShow ? 'el-icon-error' : 'el-icon-circle-plus'"></i>
				</span>
			</div>
		</div>
		<div class="mask"></div>
		<div class="add" v-show="addShow">
			<el-form :model="form" inline>
				<el-form-item label="血糖">
					<el-input type="number" v-model.number="form.value"></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker type="datetime" v-model="form.time"></el-date-picker>
					<i class="el-icon-refresh" @click="handleRefreshTime"></i>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="form.type">
						<el-option v-for="(item, index) in types" :key="item" :label="item" :value="index">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleCreate">添加</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="search flex">
			<el-input type="number" v-model.number="pageSize"></el-input>
			<el-button type="primary" @click="handleSearch">查询</el-button>
		</div>

		<div class="list">
			<div class="list-item" v-for="(item, index) of list" :key="item._id">
				<div class="list-item__content">
					<div class="left">
						<div class="time">{{ item.timeStr }}</div>
						<div class="type">{{ item.typeStr }}</div>
					</div>
					<div class="right">{{ item.value }}</div>
				</div>
				<span @click="handleDel(item._id, index)">
					<i class="del el-icon-close"></i>
				</span>
			</div>
		</div>

		<line-chart class="chart" :data="list"> </line-chart>
		<div class="tip">
			<p>饭前：3.9~6.1mmol/L</p>
			<p>饭后：3.9~7.8mmol/L</p>
			<p>空腹血糖≥7.0mmol/L，或者餐后两小时血≥11.1mmol/为糖尿病</p>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from "vue-property-decorator";
	import Line from './Line.vue'

	@Component({
		components: {
			LineChart: Line
		}
	})
	export default class BloodSugar extends Vue {
		types = ["空腹", "饭前", "饭后"];
		page = 1;
		pageSize = 10;
		total = 1;
		list: any[] = [];
		form = {
			value: 6,
			time: new Date(),
			type: 0,
		};
		addShow = false;
		mounted() {
			window.location.href='http://bloodsugar.beiyunjiang.top/bloodsugar';
			this.fetchBloodSugar();
		}

		handleRefreshTime() {
			this.form.time = new Date();
		}

		handleSearch() {
			this.page = 1;
			this.fetchBloodSugar();
		}

		async fetchBloodSugar() {
			try {
				const { page, pageSize } = this;
				const { list, total } = await this.$http.request("fetchBloodSuger", {
					page,
					pageSize,
				});
				this.list = list.map(this.disposeItem);
				console.log(this.list);
			} catch (error) { }
		}
		disposeItem(item: any) {
			item.timeStr = this.$moment(item.time * 1000).format("YYYY-MM-DD HH:mm:ss");
			item.typeStr = this.types[item.type];
			return Object.freeze(item);
		}

		async handleCreate() {
			console.log(this.form);
			try {
				const data: any = { ...this.form };
				data.time = Math.floor(+data.time / 1000);
				const list = await this.$http.request("createBloodSuger", data);
				this.fetchBloodSugar();
			} catch (error) { }
		}

		async handleDel(id: string, index: number) {
			try {
				const list = await this.$http.request("delBloodSuger", { id });
				this.fetchBloodSugar();
			} catch (error) {
				console.log(error);
			}
		}
	}
</script>

<style lang="scss">
	.BloodSugar {
		padding: 50px 15px 0 15px;
		.BloodSugar__header {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			height: 50px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: white;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
			.BloodSugar__title {
				font-weight: bold;
			}
			.BloodSugar__operate {
				padding: 0 15px;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				i {
					font-size: 24px;
					color: rgb(49, 171, 228);
				}
			}
		}

		.add {
			padding: 30px 0;
			.el-icon-refresh {
				font-size: 20px;
				margin-left: 10px;
			}
		}

		.search {
			padding: 30px 0;
		}

		.tip {
			padding: 30px 0;
			font-size: 12px;
		}

		.chart {
			margin: 30px 0;
		}

		.list {
			.list-item {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;

				& + .list-item {
					margin-top: 15px;
				}
				.list-item__content {
					padding: 5px 15px;
					height: 80px;
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
					border-radius: 10px;
					.left {
						display: flex;
						flex-direction: column;
						justify-content: center;
						.time {
							font-weight: bold;
						}
						.type {
							font-size: 14px;
							color: #999;
							margin-top: 10px;
						}
					}
					.right {
						font-size: 30px;
						&.c1 {
							color: saddlebrown;
						}
						&.c2 {
							color: saddlebrown;
						}
						&.c3 {
							color: saddlebrown;
						}
						&.c4 {
							color: rgb(255, 0, 0);
						}
					}
				}
				.del {
					margin-left: 10px;
					font-size: 30px;
				}
			}
		}
		.el-table {
			thead {
				tr,
				th {
					background: rgb(143, 149, 168);
					color: white;
				}
			}
		}
	}
</style>
