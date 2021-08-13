<template>
	<div class="Btns">
		<div class="operates flex start">
			<div class="item flex">
				<label for>大小：</label>
				<el-select v-model="size" size="small">
					<el-option value="mini"></el-option>
					<el-option value="small"></el-option>
					<el-option value="default"></el-option>
					<el-option value="large"></el-option>
				</el-select>
			</div>
		</div>
		<div class="row flex wrap start">
			<b-btn class="item" type="default" :size="size">default</b-btn>
			<b-btn class="item" type="info" :size="size">info</b-btn>
			<b-btn class="item" type="primary" :size="size">primary</b-btn>
			<b-btn class="item" type="success" :size="size">success</b-btn>
			<b-btn class="item" type="danger" :size="size">danger</b-btn>
			<b-btn class="item" type="warning" :size="size">warning</b-btn>
		</div>

		<div class="row flex wrap start">
			<b-btn class="item" type="default" icon="el-icon-upload" radius :size="size"></b-btn>
			<b-btn class="item" type="info" icon="el-icon-info" radius :size="size"></b-btn>
			<b-btn class="item" type="primary" icon="el-icon-check" radius :size="size"></b-btn>
			<b-btn class="item" type="success" icon="el-icon-star-on" radius :size="size"></b-btn>
			<b-btn class="item" type="warning" icon="el-icon-warning-outline" radius :size="size"></b-btn>
			<b-btn class="item" type="danger" icon="el-icon-error" radius :size="size"></b-btn>
		</div>

		<div class="row flex wrap start">
			<b-btn class="item" type="default" round  :size="size">圆角</b-btn>
			<b-btn class="item" type="info" round  :size="size">圆角</b-btn>
			<b-btn class="item" type="primary" icon="el-icon-download" round  :size="size">下载</b-btn>
			<b-btn class="item" type="success" icon="el-icon-check" round  :size="size">确定</b-btn>
			<b-btn class="item" type="warning" round  :size="size">圆角</b-btn>
			<b-btn class="item" type="danger" icon="el-icon-delete" round  :size="size">删除</b-btn>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class Btns extends Vue {
		size = 'default';
	}
</script>

<style lang="scss">
	.Btns {
		.operates {
			.item {
				label {
					width: 70px;
					text-align: right;
				}
			}
		}
		.row {
			margin-top: 30px;
			.item {
				margin: 0 20px;
			}
		}
	}
</style>