<template>
	<div class="home">
		<div class="welcome">欢迎回家</div>

		<!-- <div class="weather">
			<div class="">今天天气:{{nowWeather.text}}</div>
			<div class="">今天气温:{{nowWeather.temperature}}</div>
		</div>-->
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
		.welcome {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			font-size: 80px;
			font-weight: bold;
			color: rgb(110, 195, 216);
			color: white;
			text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5),
				0px 0px 8px rgba(245, 16, 16, 0.8),
				0px 0px 8px rgba(243, 61, 131, 0.8),
				0px 0px 8px rgba(113, 243, 61, 0.8),
				11px 8px 0px rgba(0, 0, 0, 0.5);
		}
	}
</style>