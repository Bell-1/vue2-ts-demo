<template>
	<div class="mouse-animation">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class MouseAnimation extends Vue {

	}
</script>


<style lang="scss" scoped>
	.mouse-animation {
		width: 100%;
		height: 100%;
	}
</style>