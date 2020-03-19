<template>
	<div class="Login">
		<div class="login-bg">
			<img src="@/assets/images/login-bg.jpg" alt />
		</div>
		<div class="container">
			<el-form
				class="form"
				:class="showForm === 1 ? 'show' : 'hide'"
				ref="loginForm"
				:model="form"
				:rules="rules"
			>
				<el-form-item label label-width="0" prop="phone">
					<el-input v-model="form.phone" placeholder="请输入账号（手机号）"></el-input>
				</el-form-item>
				<el-form-item label label-width="0" prop="pwd">
					<el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<div class="login-btn-row">
					<el-button class="login-btn" plain @click="handleLogin">登陆</el-button>
					<el-button class="regist-btn" type="text" @click="handleToRegist">注册</el-button>
				</div>
			</el-form>

			<el-form
				class="form"
				:class="showForm === 2 ? 'show' : 'hide'"
				ref="registForm"
				:model="registForm"
				:rules="rules"
			>
				<el-form-item prop="name">
					<el-input v-model="registForm.name" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item prop="phone">
					<el-input v-model="registForm.phone" placeholder="请输入手机号（账号）"></el-input>
				</el-form-item>
				<el-form-item prop="email">
					<el-input v-model="registForm.email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<el-input v-model="registForm.pwd" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="registForm.gender">
						<el-option
							v-for="item in genderOpetions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<div class="login-btn-row">
					<el-button class="login-btn" plain @click="handleRegist">注册</el-button>
					<el-button class="regist-btn" type="text" @click="handleBack">返回</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>


<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Mutation, Action } from 'vuex-class'
	import { phoneRule, passwordRule, emptyRule, emailRule } from '@/utils/verify'

	@Component
	export default class Login extends Vue {
		form: any = {
			phone: "15372999761",
			pwd: "123456"
		}

		registForm:any = {
			phone: '',
			name: '',
			email: '',
			pwd: '',
			gender: 1,
		}

		genderOpetions: object[] = [
			{ value: 1, label: '男' },
			{ value: 2, label: '女' }
		]

		rules: any = {
			name: [emptyRule('名称')],
			phone: [phoneRule()],
			email: [emailRule()],
			pwd: [passwordRule()],

		}

		showForm: number = 1;

		@Action('admin/login') login: any
		@Action('admin/register') register: any

		async handleLogin() {
			try {
				const el: any = this.$refs['loginForm']
				await el.validate();
				await this.login({ ...this.form });
				this.$router.push('/app/home');
				this.$message.success({
					message: '登陆成功',
					offset: 60,
				})
			} catch (error) {
				console.log(error)
			}
		}

		handleToRegist() {
			this.showForm = 2;
		}

		handleBack() {
			this.showForm = 1;
		}

		async handleRegist() {
			try {
				const el: any = this.$refs['loginForm']
				await el.validate();
				await this.register(this.registForm);
				this.$message.success({
					message: '注册成功',
					offset: 60,
				})
				this.handleBack();
			} catch (error) {
				console.log(error)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Login {
		.login-bg {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				min-width: 1200px;
			}
		}
		.container {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 250px;
			height: 400px;
			transform: translate(-50%, -50%);
		}
		.form {
			padding: 50px 30px;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			border-radius: 20px;
			box-shadow: 0 5px 30px rgba(#000, 0.3);
			transition: all 1s;
			transform-origin: 50% 50%;
			&.show {
				z-index: 10;
			}

			&.hide {
				transform: rotateY(-180deg);
				opacity: 0;
			}
			.login-btn-row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.login-btn {
					background: rgba(#fff, 0.2);
					color: white;
				}
				.regist-btn {
					color: white;
				}
			}
		}
	}
</style>
