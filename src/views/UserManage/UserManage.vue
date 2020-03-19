<template>
	<div class="user-manage">
		<div class="filter">
			<el-button type="primary" size="small" @click="handleCreate">新建用户</el-button>
		</div>
		<el-table :data="userList">
			<el-table-column label="昵称" prop="name"></el-table-column>
			<el-table-column label="手机号" prop="phone"></el-table-column>
			<el-table-column label="邮箱" prop="email"></el-table-column>
			<el-table-column label="性别" prop="genderStr"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleEditUser(scope.row, scope.$index)">编辑</el-button>
					<el-button type="danger" size="mini" @click="handleDelUser(scope.row, scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class></div>
		<user-modal :show.sync="modalShow" :user="currentUser" @createSuccess="handleFetchList"></user-modal>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import UserModal from './components/UserModal.vue'
	import { User } from './interface'

	const genUserInfo = (data: User = {}) => {
		const user: User = {
			name: '',
			phone: '',
			email: '',
			gender: 1,
			genderStr: '',
			...data
		}
		return user
	}

	@Component({
		components: {
			UserModal,
		}
	})
	export default class UserManage extends Vue {

		userList: object[] = [];
		modalShow: boolean = false;
		currentUser: User = genUserInfo();

		mounted() {
			this.handleFetchList();
		}

		handleShowModal() {
			this.modalShow = true;
		}

		handleHideModal() {
			this.modalShow = true;
		}

		/**
		 * 点击新建按钮
		 */
		handleCreate() {
			this.currentUser = genUserInfo();
			this.handleShowModal();
		}

		/**
		 * 编辑用户
		 */
		handleEditUser(user: User, index: number) {
			this.currentUser = genUserInfo(user);
			this.handleShowModal();
		}

		/**
		 * 删除用户
		 */
		async handleDelUser(user: User, index: number) {
			console.log(user, index);
			try {
				const { _id, name } = user;
				await this.$confirm(`确定要删除用户${name}吗？`, '删除用户');
				await this.$http.request('userDel', { _id });
				this.$message.success(`用户${name}已删除`)
				this.handleFetchList();
			} catch (error) {

			}
		}

		/**
		 * 处理用户显示信息
		 */
		disposeShowUser(user: User) {
			user.genderStr = user.gender === 1 ? '男' : '女';
			return user
		}

		/**
		 * 查询列表
		 */
		async handleFetchList() {
			try {
				const res = await this.$http.request('userList', {});
				this.userList = res.list.map(this.disposeShowUser);
			} catch (error) {
				console.log('fetch user list : ', error)
			}
		}

	}
</script>