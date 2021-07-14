<template>
	<el-container>
		<el-header>
			<the-header @toogleCollpase="handleToogleCollpase" @click-menu="sidebarShow = !sidebarShow"></the-header>
		</el-header>
		<el-container>
			<el-aside :class="isCollapse && 'collapse'" @click.self.native="sidebarShow = false" v-show="!isMobile || sidebarShow" width="auto">
				<the-side :isCollapse="isCollapse"></the-side>
			</el-aside>
			<el-container>
				<el-main>
					<router-view :key="$route.fullPath"></router-view>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { State } from 'vuex-class'
	import Header from '@/components/Header/Header.vue'
	import Side from '@/components/Side/side.vue'

	@Component({
		components: {
			TheHeader: Header,
			TheSide: Side,
		}
	})
	export default class Content extends Vue {
		@State('isMobile') isMobile

		isCollapse: boolean = false;
		sidebarShow: boolean = false;

		handleToogleCollpase() {
			this.isCollapse = !this.isCollapse;
		}
	}
</script>


<style lang="scss">
	.el-header {
		padding: 0;
		z-index: 100;
	}
	.el-aside {
		display: flex;
		@media screen and (max-width: 900px) {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.3);
			z-index: 1000;
		}
	}
</style>