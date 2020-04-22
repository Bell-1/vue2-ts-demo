<template>
	<div class="drag-h5">
		<div class="title">h5 drag 实现拖拽</div>
		<div class="list">
			<div
				class="list-item"
				draggable="true"
				@dragstart="dropStart"
				@drop="drop"
				@dragover.prevent="dragover"
				@dragleave.prevent="dragLeave"
				:data-index="index"
				v-for="(item, index) of list"
				:key="item.id"
			>{{item.content}}</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class DragH5 extends Vue {
		list: any[] = [
			{ id: 1, content: '测试数据1' },
			{ id: 2, content: '测试数据2' },
			{ id: 3, content: '测试数据3' },
			{ id: 4, content: '测试数据4' },
			{ id: 5, content: '测试数据5' },
			{ id: 6, content: '测试数据6' },
			{ id: 7, content: '测试数据7' },
			{ id: 8, content: '测试数据8' },
		]

		startIndex: number = -1;

		dropStart(e: any) {
			this.startIndex = +e.target.dataset.index
		}

		drop(e: any) {
			const targetIndex = +e.target.dataset.index;
			const { list, startIndex } = this;
			if (startIndex > 0 && startIndex !== targetIndex) {
				const temp: any = list[startIndex];
				list.splice(startIndex, 1);
				list.splice(targetIndex, 0, temp);
			}
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
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: move;
				-webkit-user-select: none;

				&:hover {
					background: blanchedalmond;
				}
			}
		}
	}
</style>