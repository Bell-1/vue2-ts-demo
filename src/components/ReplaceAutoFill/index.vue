<template>
	<div class="replace-auto-fill">
		<input type="text" />
		<input type="password" />
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class ReplaceAutoFill extends Vue {

	}
</script>
<style lang="scss" scoped>
	.replace-auto-fill {
		position: fixed;
		z-index: -1;
		left: -100px;
		top: -1000px;
		width: 0;
		height: 0;
		overflow: hidden;
	}
</style>