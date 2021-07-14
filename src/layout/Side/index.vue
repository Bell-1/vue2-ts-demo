<template>
	<div class="side mini-scroll">
		<el-menu
			:default-active="activeRoute"
			class="menu"
			:collapse="isCollapse"
			@open="handleOpen"
			@close="handleClose"
			@select="handleSelectMenu"
		>
			<template v-for="route of menus">
				<template v-if="route.children">
					<el-submenu :index="route.path" :key="route.path">
						<template slot="title">
							<i :class="route.icon"></i>
							<span>{{route.title}}</span>
						</template>
						<el-menu-item v-for="route of route.children" :key="route.path" :index="route.path">
							<i :class="route.icon"></i>
							<span slot="title">{{route.title}}</span>
						</el-menu-item>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="route.path" :key="route.path">
						<i :class="route.icon"></i>
						<span slot="title">{{route.title}}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { menus } from '@/router/config'


@Component({})
export default class Side extends Vue {
	activeRoute = '';
	menus = menus;

	@Prop() isCollapse!: boolean;

	mounted() {
		this.activeRoute = this.$route.path;
	}

	handleOpen() {

	}

	handleClose() {

	}

	handleSelectMenu(path: string) {
		if (this.$route.path !== path) {
			this.$router.push(path);
		}
	}
}
</script>

<style lang="scss" scoped>
.side {
	position: relative;
	height: 100%;
	box-shadow: 0 0 10px #eee;
	background: white;

	.menu:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	.el-menu {
		height: 100%;
		background: none;
		border-right: none;
		// box-shadow: 0 0 10px #eee;
	}

	@media screen and (max-width: 900px) {
	}
}
</style>