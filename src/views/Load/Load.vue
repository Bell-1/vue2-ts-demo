<template>
	<div class="load-page">
		<canvas-load></canvas-load>
		<icon-svg></icon-svg>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CanvasLoad from './canvas.vue'
import IconSvg from './IconSvg.vue'

@Component({
	components: {
		CanvasLoad,
		IconSvg
	}
})
export default class Load extends Vue {

}
</script>

<style src="./style/index.scss" lang="scss">