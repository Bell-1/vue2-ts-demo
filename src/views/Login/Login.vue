<template>
	<div class="Login">
		<div class="box" :class="showForm === 1 ? 'show' : 'hide'">
			<div class="title">登录</div>
			<el-form class="form" ref="loginForm" :model="form" :rules="rules">
				<el-form-item label label-width="0" prop="phone">
					<el-input v-model="form.phone" placeholder="请输入账号（手机号）" @keydown.enter.native="handleLogin"></el-input>
				</el-form-item>
				<el-form-item label label-width="0" prop="pwd">
					<el-input
						v-model="form.pwd"
						type="password"
						placeholder="请输入密码"
						@keydown.enter.native="handleLogin"
					></el-input>
				</el-form-item>
				<div class="login-btn-row">
					<div class="btn pink" @click="handleLogin">登陆</div>
					<div class="btn text" @click="handleToggleShowForm(2)">注册</div>
				</div>
			</el-form>
		</div>
		<div class="box" :class="showForm === 2 ? 'show' : 'hide'">
			<div class="title">注册</div>
			<el-form class="form" ref="registForm" :model="registForm" :rules="rules">
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
					<!-- <el-select v-model="registForm.gender">
						<el-option
							v-for="item in genderOpetions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>-->

					<el-radio-group v-model="registForm.gender">
						<el-radio :label="1">男</el-radio>
						<el-radio :label="2">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<div class="login-btn-row">
					<div class="btn pink" @click="handleRegist">注册</div>
					<div class="btn text" @click="handleToggleShowForm(1)">返回</div>
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

		registForm: any = {
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

		handleToggleShowForm(index: number = 1) {
			this.showForm = index;
			const el: any = index === 1 ? this.$refs['registForm'] : this.$refs['loginForm'];
			el.clearValidate();
		}

		async handleRegist() {
			try {
				const el: any = this.$refs['registForm']
				await el.validate();
				await this.register(this.registForm);
				this.$message.success({
					message: '注册成功',
					offset: 60,
				})
				this.handleToggleShowForm(1);
			} catch (error) {
				console.log(error)
			}
		}
	}
</script>

<style lang="scss">
	.Login {
		width: 100vw;
		height: 100vh;
		background: linear-gradient(
			26deg,
			#f6f6f6,
			#bdf2d5 20%,
			#7ad9f5 80%,
			#5d13e7
		);
		.box {
			position: absolute;
			top: 50%;
			left: 50%;
			padding: 30px 30px;
			width: 300px;
			border-radius: 20px;
			backface-visibility: hidden;
			box-shadow: 6px 6px 12px rgba(#4a8394, 0.6),
				-6px -6px 12px rgba(228, 249, 255, 0.5);
			border-radius: 20px;
			transition: all 1s;
			color: #f6f6f6;
			opacity: 1;

			&.show {
				transform: translate(-50%, -50%) rotateY(0deg);
			}

			&.hide {
				transform: translate(-50%, -50%) rotateY(180deg);
				opacity: 0;
			}

			.title {
				font-size: 26px;
				display: flex;
				align-items: center;
				justify-content: center;
				padding-bottom: 20px;
			}

			.el-form-item {
				margin-bottom: 30px;
			}

			.el-form-item__error {
				//验证提示样式
				color: #f78a8a;
				padding: 5px 20px;
			}

			input {
				padding: 0 20px;
				height: 40px;
				background: none;
				color: #f6f6f6;
				border: none;
				border-radius: 20px;
				text-align: center;
				box-shadow: inset 2px 2px 4px rgba(#4a8394, 0.8),
					inset -2px -2px 4px rgba(228, 249, 255, 0.5);
				font-size: 16px;

				&::placeholder {
					color: #f6f6f6;
				}
			}

			.el-radio-group {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex: 1;

				label {
					width: 80%;

					span:first-of-type {
						display: none;
					}

					span:last-of-type {
						@extend .btn, .pink;
						width: 100% !important;
					}

					&.is-checked {
						span:last-of-type {
							@extend .btn:active;
						}
					}
				}
			}

			.login-btn-row {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.btn {
				width: 60px;
				height: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				transition: all 0.2s;

				&.pink {
					color: #f6f6f6;
					border-radius: 20px;
					box-shadow: 4px 4px 6px rgba(#4a8394, 0.6),
						-2px -2px 4px rgba(228, 249, 255, 0.5);

					&:hover {
						color: #949996;
					}

					&:active {
						box-shadow: 0 0 0 #4a8394, 0 0 0 rgba(228, 249, 255, 0.5),
							inset 2px 2px 4px rgba(#4a8394, 0.8),
							inset -2px -2px 4px rgba(228, 249, 255, 0.5);
					}
				}

				&.text {
					color: #949996;

					&:hover {
						color: #f6f6f6;
					}
				}
			}
		}
	}
</style>
