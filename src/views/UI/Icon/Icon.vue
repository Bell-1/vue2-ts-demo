<template>
	<div class="b-icons">
		<div class="icon-block" v-for="v of icons" :key="v">
			<el-tooltip class="item" effect="dark" :content="v" placement="top">
				<i :class="v"></i>
			</el-tooltip>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import icons from './icons'

	@Component({})
	export default class BIcons extends Vue {
		icons: string[] = icons;
	}
</script>

<style lang="scss" scoped>
	.b-icons {
		display: flex;
		flex-wrap: wrap;
		.icon-block {
			margin: 10px;
			width: 60px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #666;
			font-size: 30px;
			border: 1px solid #eee;
			border-radius: 10px;
			&:nth-of-type(2n) {
				border-color: skyblue;
			}
		}
	}
</style>