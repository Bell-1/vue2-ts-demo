<template>
	<div id="app">
		<router-view />
		<div class="">
			<canvas v-if="!isMobile" class="live2d-model" ref="live2dModel" width="250px" height="550px" id="live2dModel"></canvas>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Watch } from "vue-property-decorator";

	@Component({})
	export default class App extends Vue {
		isMobile = false;
		models = ['chitose', 'epsilon2_1', 'gf', 'haru-01', 'haru-02', 'haruto', 'hibiki', 'hijiki', 'izumi', 'koharu', 'miku', 'ni-j', 'nico', 'nietzsche', 'nipsilon', 'nito', 'shizuku', 'tororo', 'tsumiki', 'unitychan', 'wanko', 'z16',];
		cdnPrefix = 'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0';

		@Watch("$route")
		onRouteChange(to: any, from: any) {
			this.initModelPath();
		}

		mounted() {
			this.isMobile = document.documentElement.offsetWidth < 900;
			this.initModelPath();
		}

		initModelPath() {
			if (this.isMobile) return;
			let { models } = this;
			const prefix = "live2d-widget-model-";
			let index = Math.floor(Math.random() * (models.length - 1));
			let model = models[index];
			let dir = "";
			switch (model) {
				case "gf":
					dir = `/${prefix}${model}/assets/Gantzert_Felixander.model.json`;
					break;
				case "epsilon2_1":
					dir = `/${prefix}${model}/assets/Epsilon2.1.model.json`;
					break;
				case "haru-01":
					dir = `/live2d-widget-model-haru/01/assets/haru01.model.json`;
					break;
				case "haru-02":
					dir = `/live2d-widget-model-haru/02/assets/haru02.model.json`;
					break;
				case "ni-j":
					dir = `/${prefix}${model}/assets/ni-j.model.json`;
					break;
				default:
					dir = `/${prefix}${model}/assets/${model}.model.json`;
			}

			const url = this.cdnPrefix + dir;
			const loadlive2d = (window as any).loadlive2d;
			loadlive2d("live2dModel", url);
		}
	}
</script>

<style lang="scss">
	body {
		margin: 0;
		padding: 0;
	}
	#app {
		height: 100vh;
		.el-container {
			height: 100%;
		}
		.live2d-model {
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}
</style>
