<template>
	<div class="Home">
		<div class="welcome">
			<div>欢迎回家</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Action, namespace } from 'vuex-class'

	const adminStore = namespace('admin');

	@Component({
		components: {
		}
	})
	export default class Home extends Vue {
		@adminStore.State('userInfo') userInfo: any;
	}
</script>

<style lang="scss" src="./index.scss"></style>