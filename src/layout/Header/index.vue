<template>
	<div class="Header">
		<div class="menu-icon" v-if="isMobile" @click="$emit('click-menu')">
			<i class="el-icon-menu"></i>
		</div>
		<div class="logo" @click="handleCollpase" v-else>
			<img src="@/assets/logo/logo2.png" alt />
		</div>
		<div class="right">
			<div class="weather" @click="fetchWeather">
				<img class="code" :src="require(`@/assets/weather/white/${nowWeather.code || 99}@2x.png` )" alt />
				<div class="c">{{nowWeather.text}} {{nowWeather.temperature}}°C</div>
			</div>
			<el-menu mode="horizontal" v-show="!isMobile">
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
	import { Action, namespace, State } from 'vuex-class'

	const adminStore = namespace('admin');
	const weatherStore = namespace('weather');

	@Component({})
	export default class Header extends Vue {
		@weatherStore.State('now') nowWeather
		@adminStore.State('userInfo') userInfo
		@State('isMobile') isMobile

		mounted() {
			this.fetchWeather();
		}


		@adminStore.Action('logout') logout: any;
		@weatherStore.Action('fetchWeather') fetchWeather: any

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

<style lang="scss" src="./index.scss">
</style>