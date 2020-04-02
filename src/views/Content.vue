<template>
	<el-container>
		<el-header>
			<Header @toogleCollpase="handleToogleCollpase"></Header>
		</el-header>
		<el-container>
			<el-aside :class="isCollapse && 'collapse'" width>
				<Side :isCollapse="isCollapse"></Side>
			</el-aside>
			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import Header from '@/components/Header/Header.vue'
	import Side from '@/components/Side/side.vue'

	@Component({
		components: {
			Header,
			Side,
		}
	})
	export default class Content extends Vue {

		isCollapse: boolean = false;

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
</style>