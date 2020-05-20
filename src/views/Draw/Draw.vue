<template>
	<div class="Draw" :class="{edit: isEdit}">
		<el-button size="mini" type="primary" @click="handleEdit" v-show="!isEdit">编辑</el-button>
		<div class="cancel-btn" @click="handleCancel" v-show="isEdit">取消</div>
		<template v-if="isEdit">
			<canvas-container></canvas-container>
		</template>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import CanvasContainer from './CanvasContainer.vue'

	@Component({
		components: {
			CanvasContainer,
		}
	})
	export default class Draw extends Vue {

		isEdit: boolean = false;

		handleEdit() {
			this.isEdit = true;
		}

		handleCancel() {
			this.isEdit = false;
		}
	}
</script>

<style lang="scss" scoped>
	.Draw {
		height: 100%;
		width: 100%;
		background: #FFF;
		&.edit {
			position: fixed;
			left: 0;
			top: 0;
			width: 100vw;
			height: 100vh;
			z-index: 100;
		}

		.cancel-btn {
			position: fixed;
			top: 100px;
			right: 50px;
			width: 80px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #666;
			border-radius: 6px;
			box-shadow: 6px 6px 12px #999, -6px -6px 12px #fff;
			cursor: pointer;
			z-index: 100;
			background: white;
			&:hover {
				background: lighten($color: #999, $amount: 15%);
				color: lighten($color: #666, $amount: 15%);
			}
		}
	}
</style>