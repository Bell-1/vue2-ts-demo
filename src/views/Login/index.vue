<template>
	<div class="Login">
		<div class="box" :class="showForm === 1 ? 'show' : 'hide'">
			<div class="title">登录</div>
			<el-form class="form" ref="loginForm" :model="form" :rules="rules">
				<replace-auto-fill></replace-auto-fill>
				<el-form-item label label-width="0" prop="phone">
					<el-input
						v-model="form.phone"
						autocomplete="off"
						placeholder="请输入账号（手机号）"
						@keydown.enter.native="handleLogin"
					></el-input>
				</el-form-item>
				<el-form-item label label-widthz="0" prop="pwd">
					<el-input
						v-model="form.pwd"
						type="password"
						autocomplete="off"
						placeholder="请输入密码"
						@keydown.enter.native="handleLogin"
					></el-input>
				</el-form-item>
				<div class="login-btn-row">
					<div class="btn submit" @click="handleLogin">登陆</div>
					<div class="btn text" @click="handleToggleShowForm(2)">注册</div>
				</div>
			</el-form>
		</div>
		<div class="box" :class="showForm === 2 ? 'show' : 'hide'">
			<div class="title">注册</div>
			<el-form class="form" ref="registForm" :model="registForm" :rules="rules">
				<el-form-item prop="name">
					<el-input v-model="registForm.name" autocomplete="off" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item prop="phone">
					<el-input v-model="registForm.phone" autocomplete="off" placeholder="请输入手机号（账号）"></el-input>
				</el-form-item>
				<el-form-item prop="email">
					<el-input v-model="registForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<el-input v-model="registForm.pwd" autocomplete="off" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-radio-group v-model="registForm.gender">
						<el-radio :label="1">男</el-radio>
						<el-radio :label="2">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<div class="login-btn-row">
					<div class="btn submit" @click="handleRegist">注册</div>
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
import ReplaceAutoFill from '@/components/ReplaceAutoFill/index.vue'

@Component({
	components: {
		ReplaceAutoFill
	}
})
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
			this.$router.push('/app');
			this.$message.success({
				message: '登陆成功',
				offset: 100,
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
				offset: 100,
			})
			this.handleToggleShowForm(1);
		} catch (error) {
			console.log(error)
		}
	}
}
</script>

<style src="./index.scss" lang="scss"></style>
