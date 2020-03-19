<template>
	<el-dialog
		class="user-modal"
		width="30%"
		:title="title"
		:visible.sync="show"
		:close-on-click-modal="false"
		:before-close="handleClose"
		@open="handleOpen"
	>
		<el-form ref="userForm" :model="formData" :rules="rules" label-width="80px">
			<el-form-item label="名称" prop="name">
				<el-input v-model="formData.name"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="phone">
				<el-input v-model="formData.phone"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="formData.email"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pwd">
				<el-input v-model="formData.pwd"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-select v-model="formData.gender">
					<el-option
						v-for="item in genderOpetions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="handleClose">取 消</el-button>
			<el-button type="primary" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
	import { phoneRule, emptyRule, emailRule, passwordRule } from '@/utils/verify'
	import { User } from '../interface'
	import { State, namespace } from 'vuex-class'

	const emptyUser = {
		name: '',
		phone: '',
		email: '',
		gender: 1,
		pwd: '',
	}

	const adminStore = namespace('admin')

	@Component({})
	export default class UserModal extends Vue {

		@Prop() show!: boolean;
		@Prop() user!: User;
		@adminStore.State('userInfo') userInfo: any;

		formData: User = {};

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


		get title() {
			return this.user._id ? "编辑用户" : '新建用户'
		}

		handleOpen() {
			this.formData = { ...this.user };
		}

		@Emit('update:show')
		handleClose(): boolean {
			let el: any = this.$refs['userForm']
			el.clearValidate();
			return false
		}

		@Emit('createSuccess')
		createSuccess() { }

		async handleSubmit() {
			let el: any = this.$refs['userForm']
			try {
				await el.validate();
				const isEdit = !!this.formData._id;
				const apiName = isEdit ? 'userEdit' : 'userCreate';
				await this.$http.request(apiName, this.formData);
				this.$message.success(isEdit ? '已保存' : '创建成功');
				this.handleClose();
				this.createSuccess();
			} catch (error) {
				console.error(error);
			}
		}


	}
</script>
