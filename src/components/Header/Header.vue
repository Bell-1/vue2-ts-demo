<template>
	<div class="Header">
		<div class="logo" @click="handleCollpase">
			<img src="@/assets/logo/logo2.png" alt />
		</div>
		<div class="right">
			<div class="weather" @click="fetchWeather">
				<img class="code" :src="require(`@/assets/weather/white/${nowWeather.code || 99}@2x.png` )" alt />
				<div class="c">{{nowWeather.text}} {{nowWeather.temperature}}°C</div>
			</div>
			<el-menu mode="horizontal">
				<el-menu-item index="userInfo">
					<i class="el-icon-user"></i>
					<span>{{userInfo && userInfo.name}}</span>
				</el-menu-item>
				<el-menu-item index="logout" @click="handleLogout">
					<i class="iconfont icon-tuichu"></i>
					<span>退出登陆</span>
				</el-menu-item>
			</el-menu>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
	import { Action, namespace } from 'vuex-class'

	const adminStore = namespace('admin');
	const weatherStore = namespace('weather');

	@Component({})
	export default class Header extends Vue {
		@weatherStore.State('now') nowWeather:any
		@adminStore.State('userInfo') userInfo:any

		mounted() {
			this.fetchWeather();
		}

		
		@adminStore.Action('logout') logout: any;
		@weatherStore.Action('fetchWeather') fetchWeather:any

		@Emit('toogleCollpase')
		handleCollpase() { }

		async handleLogout() {
			try {
				await this.logout();
				this.$message.success('已退出');
				this.$router.push('/login');
			} catch (error) {
				console.log('退出登录', error)
			}
		}

	}
</script>

<style lang="scss" scoped>
	.Header {
		padding-right: 20px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: solid 1px #e6e6e6;
		background: rgba(0, 0, 0, 0.7);
		.logo {
			height: 100%;
			img {
				height: 100%;
				// filter: grayscale(1);
				filter: grayscale(1);
			}
		}
		.right {
			display: flex;
			align-items: center;
			.weather {
				display: flex;
				align-items: center;
				padding: 0 10px;
				color: white;
				cursor: pointer;

				.code {
					width: 17px;
				}
				.c {
					font-size: 12px;
					margin-left: 7px;
				}
			}
			.el-menu {
				border: none;
				height: 99%;
				background: none;
				.el-menu-item {
					color: white;
					i {
						color: white;
					}
					&:hover {
						background: none;
					}
				}
			}
		}
	}
</style>