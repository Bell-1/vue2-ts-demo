<template>
	<div class="home">
		<div class="welcome">
			<div>欢迎回家</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Action, namespace } from 'vuex-class'
	import { twoSum } from '@/utils/tree.js'

	const adminStore = namespace('admin');

	const str = ['asdbsdg', 'asdbasd', 'asdbs'];

	@Component({
		components: {
		}
	})
	export default class Home extends Vue {
		@adminStore.State('userInfo') userInfo: any

		mounted() {
			console.log('1111', twoSum([3, 2, 4], 6))
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
				// clip-path: polygon(14% 57%, 38% 46%, 60% 54%, 74% 37%, 100% 39%, 100% 100%, 0% 100%, 0 45%);

				&::before {
					position: absolute;
					left: 0;
					top: 0;
					content: '欢迎回家';
					color: rgb(139, 248, 237);
					animation: wave 5s infinite;
				}

				@keyframes wave {
					0%,
					100% {
						clip-path: polygon(
							0 100%,
							0 50%,
							19% 39%,
							35% 48%,
							57% 61%,
							79% 54%,
							100% 65%,
							100% 100%
						);
					}
					50% {
						clip-path: polygon(
							0 100%,
							0 40%,
							19% 60%,
							43% 51%,
							59% 53%,
							71% 65%,
							100% 45%,
							100% 100%
						);
					}
				}
			}
		}
	}
</style>