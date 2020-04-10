<template>
	<div class="home">
		<div class="welcome">欢迎回家</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Action, namespace } from 'vuex-class'

	const weatherStore = namespace('weather');

	@Component({
		components: {
		}
	})
	export default class Home extends Vue {
		@weatherStore.State('now') nowWeather: any
		@weatherStore.Action('fetchWeather') fetchWeather: any

		mounted() {
			this.fetchWeather();
		}
	}
</script>


<style lang="scss" scoped>
	.home {
		min-height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		.welcome {
			font-size: 15vw;
			font-weight: bold;
			user-select: none;
			color: white;
			color: rgb(247, 247, 247);
			// color: salmon;
			text-shadow: 4px 4px 6px rgb(208, 214, 214), -2px -2px 4px rgb(252, 252, 252);
		}
	}
</style>