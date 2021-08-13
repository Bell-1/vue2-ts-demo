<template>
	<div class="Lottery">
		<l-square></l-square>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import Square from './Square.vue'

	@Component({
		components: {
			lSquare: Square
		}
	})
	export default class Lottery extends Vue {

	}
</script>