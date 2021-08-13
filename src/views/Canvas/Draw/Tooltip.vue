<template>
	<div class="Tooltip">
		<div
			class="tool"
			:class="{active: item === type}"
			v-for="item of tools"
			:key="item.type"
			@click="handleChange(item)"
		>
			<i class="iconfont" :class="item.icon"></i>
		</div>
		<div class="tool" @click="handleSave">
			<i class="iconfont icon-download"></i>
		</div>
		<div class="options">
			<div
				class="size"
				:class="{active: s === size}"
				v-for="s of sizes"
				:key="s"
				@click="handleChangeSize(s)"
			>
				<i class="iconfont icon-yuan" :class="s"></i>
			</div>
			<div class="color diy" @click="handleShowColorPick">
				<img v-show="!diyColor" src="http://qacosrl83.bkt.clouddn.com/color-picker.png" alt />
				<div v-show="diyColor" class="content" :style="'--c:' + color"></div>
			</div>
			<div
				class="color"
				:class="{active: c === color}"
				v-for="c of colors"
				:key="c"
				@click="handleChangeColor(c)"
				:style="'--c:' + c"
			></div>
		</div>
		<div class="color-picker" v-if="colorPickerShow">
			<div class="close" @click="colorPickerShow = false">×</div>
			<chrome-picker v-model="color" @input="handleChangeDIYColor"></chrome-picker>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import { Chrome } from 'vue-color'

	interface ToolType {
		type: string,
		icon: string,
		selected: boolean
	}

	@Component({
		components: {
			ChromePicker: Chrome,
		}
	})
	export default class Tooltip extends Vue {
		tools: ToolType[] = [
			{ type: 'text', icon: 'icon-t', selected: true },
			{ type: 'pencil', icon: 'icon-pencil', selected: true },
			{ type: 'arrow', icon: 'icon-arrow-top-right', selected: true },
			{ type: 'circle', icon: 'icon-circle', selected: true },
			{ type: 'rect', icon: 'icon-rect', selected: true },
			{ type: 'line', icon: 'icon-straight', selected: true },
			{ type: 'repeal', icon: 'icon-repeal', selected: false },
			{ type: 'recover', icon: 'icon-recover', selected: false },
		]
		sizes: string[] = ['mini', 'small', 'default', 'large'];
		colors: string[] = ['#FF7676', '#8CFD8C', '#6D6DFF', '#6DF7EF', '#F000F0', "#FFFFFF"];
		color: string = this.colors[0];
		colorPickerShow: boolean = false;
		size: string = 'mini';
		type: ToolType | null = null;


		get diyColor() {
			return !this.colors.includes(this.color);
		}

		created() {
			this.handleChange(this.tools[1]);
			this.handleChangeSize(this.sizes[0]);
		}

		handleChange(item: any) {
			this.$emit('changeType', item.type);
			if (item.selected) {
				this.type = item;
			}
		}


		handleChangeSize(size: string) {
			this.size = size;
			this.$emit('changeSize', size);
		}

		handleChangeColor(color: string) {
			this.color = color;
			this.colorPickerShow = false;
			this.$emit('changeColor', color);
		}
		handleChangeDIYColor(color: any) {
			const { hex, hex8 } = color;
			this.color = hex8;
			this.$emit('changeColor', hex8);
		}

		handleShowColorPick() {
			this.colorPickerShow = !this.colorPickerShow;
			this.color = '#51F1BC';
		}


		handleSave() {

			var canvasElement: any = document.getElementById('can');

			var MIME_TYPE = "image/png";

			var imgURL = canvasElement.toDataURL(MIME_TYPE);

			var dlLink = document.createElement('a');
			dlLink.download = `canvas图片${+new Date()}.png`;
			dlLink.href = imgURL;
			dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

			document.body.appendChild(dlLink);
			dlLink.click();
			document.body.removeChild(dlLink);
		}
	}
</script>

<style lang="scss">
	.Tooltip {
		position: fixed;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		background: white;
		width: 250px;
		height: 35px;
		box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.8);
		border-radius: 6px;
		.tool,
		.size,
		.color {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 6px;
			cursor: pointer;
			transition: all 0.3s;
			font-size: 16px;
			color: #555;
			border: 1px solid transparent;
		}
		.tool {
			&.active,
			&:hover {
				background: #666;
				color: white;
			}
		}
		.options {
			padding: 0 10px;
			position: absolute;
			top: 110%;
			left: -50px;
			width: 350px;
			height: 35px;
			background: rgb(238, 237, 237);
			border-radius: 6px;
			overflow: hidden;
			box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.8);
			display: flex;
			align-items: center;
			.size {
				transition: all 0.3s;
				color: #ccc;
				border-radius: 0;
				height: 80%;

				&:hover {
					color: #999;
				}
				&.active {
					color: #333;
				}

				&:nth-of-type(4) {
					border-right: 1px solid #999;
				}

				.mini {
					transform: scale(0.5);
				}

				.small {
					transform: scale(0.7);
				}

				.default {
					transform: scale(0.9);
				}

				.large {
					transform: scale(1);
				}
			}

			.color {
				max-width: 20px;
				height: 20px;
				margin-left: 10px;
				border-radius: 4px;
				background-color: var(--c);
				&.diy {
					img {
						width: 100%;
					}
					.content {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						border: 5px solid var(--c);
						animation: scale 0.2s forwards;
						transition: all 0.2s;
						@keyframes scale {
							0% {
								transform: scale(1);
							}
							100% {
								transform: scale(1.1);
							}
						}
					}
				}

				&.active {
					border: 1px solid rgb(122, 119, 119);
					transform: scale(1.1);
				}
			}
		}

		.color-picker {
			position: absolute;
			top: 220%;
			left: 0;
			.close {
				position: absolute;
				right: -50px;
				top: 40%;
				font-size: 30px;
				border-radius: 50%;
				background: #999;
				color: white;
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				&:hover {
					background: #aaa;
					color: white;
				}
			}
		}
	}
</style>