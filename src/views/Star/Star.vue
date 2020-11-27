<template>
	<div class="Star">
		<star-group :level.sync="level"></star-group>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import StarGroup from './StarGroup.vue'
	@Component({
		components: {
			StarGroup
		}
	})
	export default class Star extends Vue {
		level: number = 1;
	}
</script>