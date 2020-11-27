<template>
	<div class="home">
		<div class="welcome">
			<div>欢迎回家</div>
		</div>
		<bdo dir="ltr">欢迎回家</bdo>
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


		mounted() {
		}
		changeColor(e:any) {
			console.log(e.target.value)
		}

	}
</script>


<style lang="scss" scoped>
	.home {
		min-height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		user-select: none;

		.welcome {
			position: relative;
			display: flex;
			div {
				position: relative;
				font-size: 100px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				color: transparent;
				-webkit-text-stroke: 1px rgb(168, 240, 233);

				&::before {
					position: absolute;
					left: 0;
					top: 0;
					content: '欢迎回家';
					color: rgb(139, 248, 237);
					animation: wave 4s linear infinite;
				}

				@keyframes wave {
					0%,
					100% {
						clip-path: polygon(0 100%, 0 50%, 19% 40%, 35% 60%, 57% 40%, 79% 60%, 100% 35%, 100% 100%);
					}
					50% {
						clip-path: polygon(0 100%, 0 30%, 19% 60%, 43% 40%, 59% 60%, 71% 40%, 100% 60%, 100% 100%);
					}
				}
			}
		}
	}
</style>