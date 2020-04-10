<template>
	<div class="Drag">
		<drag-js></drag-js>
		<drag-h5></drag-h5>
		<drag-level></drag-level>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import DragJs from './DragJs.vue'
	import DragH5 from './DragH5.vue'
	import DragLevel from './DragLevel.vue'

	@Component({
		components: { DragJs, DragH5, DragLevel }
	})
	export default class Drag extends Vue {

	}
</script>


<style lang="scss" scoped>
	.Drag {
		width: 100%;
		display: flex;
	}
</style>