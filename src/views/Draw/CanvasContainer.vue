<template>
	<div class="CanvasContainer" @click="handleAddText">
		<tooltip @changeType="changeType" @changeSize="handleChangeSize" @changeColor="handleChangeColor"></tooltip>
		<canvas class="draw-container" id="can" :style="cursorStyle"></canvas>
		<text-area
			@close="handleClose(index)"
			v-for="(node, index) of textList"
			:key="node.id"
			:node="node"
		></text-area>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import Tooltip from './Tooltip.vue'
	import TextArea from './TextArea.vue'
	import { init, mouseTypeCb, changeType, updateOptions, destory } from './draw'
	// const MousePencil = 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAASGElEQVR4Xu2dD5BfVXXHz3nbZWNLU2fU1tZxzAhOyN7ztulQpq1apcMCgoDaceookNCGfwIV5J9TAUsRHQqaDkGFBKGDwAwWkUa0UP5qxFal2032nbthMtEGHLDUTKUl2izm9zudKxuMyf5';
	const MousePencil = 'http://qacosrl83.bkt.clouddn.com/pencil.ico';


	@Component({
		components: {
			Tooltip,
			TextArea,
		}
	})
	export default class CanvasContainer extends Vue {
		cursor: string = 'text';
		drawType: string = 'text';
		textList: any[] = [];

		get cursorStyle() {
			console.error(this.cursor)
			return {
				cursor: this.cursor === 'crosshair' ? `url("${MousePencil}") , crosshair` : this.cursor
			}
		}

		mounted() {
			init('can');
			mouseTypeCb(this.changeMouseType)
		}

		destoryed() {
			destory();
		}

		handleClose(index: number) {
			this.textList.splice(index, 1)
		}

		handleAddText(e: any) {
			if (this.drawType === 'text' && e.target.tagName === 'CANVAS') {
				const point = [e.offsetX, e.offsetY];
				this.textList.push({ id: +new Date(), content: '', point });
			}
		}

		changeMouseType(type: string) {
			console.error(type)
			if (this.cursor !== type) {
				this.cursor = type;
			}
		}

		changeType(type: string) {
			this.drawType = type;
			this.cursor = type === 'text' ? 'text' : 'crosshair';
			console.log('change', this.cursor)
			changeType(type)
		}

		handleChangeSize(size: string) {
			updateOptions({ size });
		}

		handleChangeColor(color: string) {
			updateOptions({ color });
		}
	}
</script>

<style lang="scss">
	.CanvasContainer {
		position: relative;
		width: 100%;
		height: 100%;
		.draw-container {
			width: 100%;
			height: 100%;
			cursor: url('http://qacosrl83.bkt.clouddn.com/pencil.ico'), auto;
		}
	}
</style>