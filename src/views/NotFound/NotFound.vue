<template>
	<div class="notfound">
		<div class>404</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'

	@Component
	export default class NotFound extends Vue {

	}
</script>

<style lang="scss" scoped>
	.notfound {
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 60px;
	}
</style>