<template>
	<div class="home">
		<div class="welcome">
			<span>欢</span>
			<span>迎</span>
			<span>回</span>
			<span>家</span>
		</div>
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
		.welcome {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			font-size: 80px;
			font-weight: bold;
			user-select: none;
			display: flex;
			align-items: center;
			justify-content: center;
			span {
				animation: move 1.5s ease-in-out infinite;
				background: linear-gradient(left, #bdc3c7, #8d99a0);
				background-clip: text;
				color: transparent;

				&:nth-of-type(2) {
					animation-delay: 0.15s;
					background: linear-gradient(left, #8d99a0, #556169);
					background-clip: text;
				}
				&:nth-of-type(3) {
					animation-delay: 0.3s;
					background: linear-gradient(left, #556169, #364a5e);
					background-clip: text;
				}
				&:nth-of-type(4) {
					animation-delay: 0.35s;
					background: linear-gradient(left, #364a5e, #2c3e50);
					background-clip: text;
				}
			}

			@keyframes move {
				0% {
					transform: translateY(0px);
				}

				40% {
					transform: translateY(-30px);
				}

				60%,
				100% {
					transform: translateY(0px);
				}
			}
		}
	}
</style>