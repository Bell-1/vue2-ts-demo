<template>
	<div class="UI">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class UI extends Vue {

	}
</script>

<style lang="scss">
	.UI {
		height: 100%;
	}
</style>