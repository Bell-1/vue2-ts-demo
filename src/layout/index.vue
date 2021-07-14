<template>
	<el-container>
		<el-header>
			<the-header @toogleCollpase="handleToogleCollpase" @click-menu="sidebarShow = !sidebarShow"></the-header>
		</el-header>
		<el-container>
			<el-aside
				:class="isCollapse && 'collapse'"
				@click.self.native="sidebarShow = false"
				v-show="!isMobile || sidebarShow"
				width="auto"
			>
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
import Header from './Header/index.vue'
import Side from './Side/index.vue'

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


<style src="./style/index.scss" lang="scss"></style>