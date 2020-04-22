<template>
	<div class="drag-h5">
		<div class="title">多级拖拽交换</div>
		<div class="list">
			<div class="list-item" v-for="(item, index) of list" :key="item.id">
				<div
					class="content"
					:data-index="index"
					@drop="drop"
					@dragover.prevent="dragover"
					@dragleave.prevent="dragLeave"
				>{{item.content}}</div>
				<div class="children">
					<div
						class="list-item"
						draggable="true"
						@dragstart="dropStart"
						@drop="drop"
						@dragover.prevent="dragover"
						@dragleave.prevent="dragLeave"
						:data-parent="index"
						:data-index="subIndex"
						v-for="(sub, subIndex) of item.children"
						:key="sub.id"
					>{{sub.content}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class DragH5 extends Vue {
		list: any[] = [
			{
				id: 1,
				content: '测试数据1',
				children: [
					{ id: '1-1', content: 'sub1数据1' },
					{ id: '1-2', content: 'sub1数据2' },
					{ id: '1-3', content: 'sub1数据3' },
				]
			},
			{
				id: 2,
				content: '测试数据2',
				children: [
					{ id: '2-1', content: 'sub2数据1' },
					{ id: '2-2', content: 'sub2数据2' },
					{ id: '2-3', content: 'sub2数据3' },
				]
			},
			{
				id: 3,
				content: '测试数据2',
				children: [
					{ id: '3-1', content: 'sub3数据1' },
					{ id: '3-2', content: 'sub3数据2' },
					{ id: '3-3', content: 'sub3数据3' },
				]
			},
			{
				id: 4,
				content: '测试数据2',
				children: [
					{ id: '4-1', content: 'sub4数据1' },
					{ id: '4-2', content: 'sub4数据2' },
					{ id: '4-3', content: 'sub4数据3' },
				]
			},
		]

		parentIndex: number = -1;
		startIndex: number = -1;

		dropStart(e: any) {
			const { parent, index } = e.target.dataset;
			this.parentIndex = +parent;
			this.startIndex = +index;
		}

		drop(e: any) {
			const { parent, index } = e.target.dataset;
			const { list, parentIndex, startIndex } = this;
			const temp: any = list[parentIndex].children[startIndex];
			if (+parent === +parentIndex && +index === +startIndex) return;
			list[parentIndex].children.splice(+startIndex, 1);
			list[parent || index].children.splice(+index, 0, temp);
			this.dragLeave(e);
		}


		/**
		 * 当可拖动的元素进入可放置的目标时高亮目标节点
		 */
		dragover(e: any) {
			e.target.style.background = "#eee";

		}

		/**
		 * 当拖动元素离开可放置目标节点，重置其背景
		 */
		dragLeave(e: any) {
			e.target.style.background = "";
		}
	}
</script>

<style lang="scss" scoped>
	.drag-h5 {
		margin: 0 50px;

		.title {
			padding: 20px 0;
		}

		.list {
			border: 1px solid #eee;
			.list-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				cursor: move;
				-webkit-user-select: none;
				.content {
					padding: 10px 0;
				}
				.children {
					.list-item {
						height: 30px;
						font-size: 12px;
						&:hover,
						&:active {
							background: blanchedalmond;
						}
					}
				}
			}
		}
	}
</style>