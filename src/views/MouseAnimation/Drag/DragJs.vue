<template>
	<div class="drag-js">
		<div id="dragList" ref="dragList" class="list">
			<!-- <div class="list-item" v-for="item of list" :key="item.id">{{item.content}}</div> -->
			<div class="list-item" v-for="item of list" :key="item.id">{{item.content}}</div>
		</div>

		<div
			class="list-item drag"
			v-if="targetIndex > -1"
			:style="dragStyle"
		>{{targetIndex > -1 && list[targetIndex].content}}</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({
	})
	export default class Drag extends Vue {
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

		target: any = null;
		targetIndex: number = -1;
		listItems: any = [];
		moving: boolean = false;
		dragStyle: any = {
			top: 0,
			left: 0,
		};
		startTop: number = -1000; //target.offsetTop
		diffY: number = 0; // 鼠标点击时与元素的top的距离
		currentIndex: number = 0; //移动后位置

		mounted() {
			this.listenList();
		}

		destroy() {
			this.offListenerList();
		}

		offListenerList() {
			this.listItems.forEach((item: any) => {
				item.removeEventListener('mousedown', this.dragStart, false)
			});
		}

		listenList() {
			this.listItems = Array.from(document.querySelectorAll('#dragList .list-item'));
			this.listItems.forEach((item: any) => {
				item.addEventListener('mousedown', this.dragStart);
			})
		}

		dragStart(e: any) {
			const { offsetTop, offsetLeft, offsetHeight } = e.currentTarget;
			this.targetIndex = (offsetTop - 21) / offsetHeight;
			this.moving = true;
			this.startTop = offsetTop;
			this.diffY = e.clientY - offsetTop;
			e.currentTarget.style = 'opacity: 0; visibility: hidden;';
			this.dragStyle.top = offsetTop + 'px';
			this.dragStyle.left = offsetLeft + 'px';
			document.addEventListener('mousemove', this.dragMove);
			document.addEventListener('mouseup', this.dragEnd);
		}

		dragMove(e: any) {
			if (!this.moving) return;
			const { dragStyle, diffY, targetIndex, listItems } = this;
			const sourceTarget: any = listItems[targetIndex];
			const top: number = e.clientY - diffY;
			this.dragStyle.top = top + 'px';
			//计算位置
			let diffIndex: number = (top - sourceTarget.offsetTop) / sourceTarget.offsetHeight;
			if (Math.abs(diffIndex % 1) < 0.5) {
				diffIndex = ~~diffIndex;
			}
			diffIndex = diffIndex > 0 ? Math.ceil(diffIndex) : Math.floor(diffIndex)
			const currentIndex = this.currentIndex = diffIndex + targetIndex;
			if (currentIndex < 0 || currentIndex > listItems.length - 1) return; //超出范围不计算了
			listItems.forEach((ele: any, index: number) => {
				let style = 'transform: translateY(0); transition: all 0.2s linear;';
				if (diffIndex > 0 && index > targetIndex && index <= currentIndex) {
					style = `transform: translateY(${-sourceTarget.offsetHeight}px); transition: all 0.2s linear;`;
				}
				if (diffIndex < 0 && index < targetIndex && index >= currentIndex) {
					style = `transform: translateY(${sourceTarget.offsetHeight}px); transition: all 0.2s linear;`;
				}
				if (index !== targetIndex) {
					ele.style = style;
				}
			})
		}

		dragEnd(e: any) {
			document.removeEventListener('mouseup', this.dragEnd);
			document.removeEventListener('mousemove', this.dragMove);
			this.moving = false;
			const { listItems, list, targetIndex, currentIndex } = this;
			listItems.forEach((ele: any) => ele.removeAttribute('style'));
			this.targetIndex = -1;
			this.dragStyle = {
				top: '-1000px',
				left: '-1000px',
			}

			let target: any = list[targetIndex];
			let eleItem: any = listItems[targetIndex];
			if (currentIndex < targetIndex) {
				list.splice(targetIndex, 1);
				list.splice(currentIndex, 0, target);
				listItems.splice(targetIndex, 1);
				listItems.splice(currentIndex, 0, eleItem);
			}
			if (currentIndex > targetIndex) {
				list.splice(targetIndex, 1);
				list.splice(currentIndex, 0, target);
				listItems.splice(targetIndex, 1);
				listItems.splice(currentIndex, 0, eleItem);
			}

		}

	}
</script>


<style lang="scss" scoped>
	.drag-js {
		.title {
			height: 50px;
			display: flex;
			align-items: center;
		}
		.list {
			border: 1px solid #eee;
		}
		.list-item {
			width: 100px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: move;
			-webkit-user-select: none;
			transition: all 0s linear;

			&:hover,
			&:active {
				background: blanchedalmond;
			}

			&.drag {
				position: absolute;
				top: 0;
				left: 0;
				background: blue;
			}
		}
	}
</style>