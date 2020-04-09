<template>
	<div class="Drag">
		<div ref="dragList" class="list" @drop="drop" @dragover="allowDrop">
			<div
				class="list-item"
				draggable="true"
				v-for="item of list"
				:key="item.id"
				@dragstart="dragStart"
				@dragend="dragEnd"
			>
				<div class="content">{{item.content}}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class Drag extends Vue {
		list: any[] = [
			{ id: 1, title: '测试标题1', content: '测试数据1' },
			{ id: 2, title: '测试标题2', content: '测试数据2' },
			{ id: 3, title: '测试标题3', content: '测试数据3' },
			{ id: 4, title: '测试标题4', content: '测试数据4' },
			{ id: 5, title: '测试标题5', content: '测试数据5' },
			{ id: 6, title: '测试标题6', content: '测试数据6' },
			{ id: 7, title: '测试标题7', content: '测试数据7' },
			{ id: 8, title: '测试标题8', content: '测试数据8' },
		]

		moveIndex: number = -1;
		startY: number = -1;
		moveTarget: any = null;

		mounted() {
		}

		dragStart(e: any) {
			const { offsetTop, offsetHeight } = e.target;
			let index = ~~(offsetTop / offsetHeight);
			this.moveIndex = index;
			this.startY = e.offsetY;
			// console.log(e);
		}

		dragEnd(e: any) {
			let { startY, moveIndex, list } = this;
			let offset = (e.offsetY - this.startY) / e.target.offsetHeight;
			let index = offset > 0 ? Math.ceil(offset) : Math.floor(offset);
			let nowIndex = moveIndex + index;
			if (nowIndex > list.length - 1) { nowIndex = list.length - 1 }
			if (nowIndex < 0) { nowIndex = 0 }
			if (nowIndex === moveIndex || moveIndex === -1) {
				return
			}
			let [a, b] = [this.list[moveIndex], this.list[nowIndex]];
			this.$set(this.list, moveIndex, b);
			this.$set(this.list, nowIndex, a);
			this.moveIndex = -1;
		}

		drop(e: any) {
			// console.log(e)
		}

		allowDrop(e: any) {
			let { startY, moveIndex, list, moveTarget } = this;
			let offset = (e.offsetY - this.startY) / e.target.offsetHeight;
			let index = offset > 0 ? Math.ceil(offset) : Math.floor(offset);
			let nowIndex = moveIndex + index;
		}
	}
</script>


<style lang="scss" scoped>
	.Drag {
		width: 100%;
		padding: 30px 0;
		display: flex;
		align-items: center;
		.list {
			position: relative;
			width: 300px;
			padding: 0 20px;
			.list-item {
				width: 100%;
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: move;
				border-radius: 2px;
				border: 1px solid #eee;

				&:nth-of-type(n+2) {
					border-top: none;
				}
				&:active {
					color: red;
				}
			}
		}
	}
</style>