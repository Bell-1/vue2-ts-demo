<template>
	<div class="StarGroup">
		<i
			class="iconfont"
			:class="v <= level ? 'icon-star-fill' : 'icon-star'"
			:style="`color: ${v <= level ? color : 'black'}`"
			v-for="v of stars"
			:key="v"
			@click="handleChoose(v)"
		></i>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class StarGroup extends Vue {
		@Prop({ default: 5 }) readonly nums!: number
		@Prop({ default: 'red' }) readonly color!: string
		@Prop({ default: 1 }) readonly level!: number;
		stars: number[] = [];

		mounted() {
			this.initStars();
		}

		initStars() {
			let nums = this.nums;
			while (nums) {
				this.stars.unshift(nums--);
			}
		}

		handleChoose(level: number) {
			this.$emit('update:level', level);
		}
	}
</script>

<style lang="scss" scope>
	.StarGroup {
		i {
			margin-right: 5px;
			font-size: 30px;
			cursor: pointer;
		}
	}
</style>