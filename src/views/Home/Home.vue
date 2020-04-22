<template>
	<div class="home">
		<div class="welcome">欢迎回家</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Action, namespace } from 'vuex-class'


	@Component({
		components: {
		}
	})
	export default class Home extends Vue {

		mounted() {
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
			margin: 20px 0;
			font-size: 15vw;
			font-weight: bold;
			user-select: none;
			color: rgb(251, 255, 255);
			text-shadow: 6px 6px 12px rgb(208, 214, 214),
				-4px -4px 6px rgb(252, 252, 252);
		}
	}
</style>