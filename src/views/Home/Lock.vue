<template>
	<div class="Lock">
		<div class="row-number">
			<div class>9</div>
			<div class>3</div>
		</div>
		<div class="col-number">
			<div class>0</div>
			<div class>6</div>
		</div>
		<div class="hour">
			<div class="hr"></div>
		</div>
		<div class="minute">
			<div class="min"></div>
		</div>
		<div class="second">
			<div class="sec"></div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class Lock extends Vue {

	}
</script>

<style lang="scss" scoped>
	.Lock {
		position: relative;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background: rgb(251, 255, 255);
		box-shadow: 6px 6px 12px rgb(221, 220, 220),
			-6px -6px 12px rgb(251, 255, 255), inset 4px 4px 6px rgb(221, 220, 220),
			inset -4px -4px 6px rgb(251, 255, 255);
		color: rgb(211, 212, 212);
		.row-number {
			position: absolute;
			padding: 0 10px;
			top: 50%;
			left: 0;
			width: 100%;
			transform: translateY(-50%);
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.col-number {
			position: absolute;
			padding: 10px 0;
			left: 50%;
			top: 0;
			height: 100%;
			transform: translateX(-50%);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>