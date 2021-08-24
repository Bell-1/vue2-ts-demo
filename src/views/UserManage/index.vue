<template>
	<div class="user-manage" v-loading="loading">
		<div class="create">
			<b-btn type="success" size="small" @click="handleCreate">新建用户</b-btn>
		</div>
		<div class="filter">
			<el-form :model="condition" inline>
				<el-form-item label="昵称">
					<el-input v-model="condition.name"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="condition.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="condition.email"></el-input>
				</el-form-item>
				<el-form-item>
					<b-btn type="primary" @click="handleSearch">search</b-btn>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="userList">
			<el-table-column label="昵称" prop="name"></el-table-column>
			<el-table-column label="手机号" prop="phone"></el-table-column>
			<el-table-column label="邮箱" prop="email"></el-table-column>
			<el-table-column label="性别" prop="genderStr"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<b-btn type="primary" size="mini" @click="handleEditUser(scope.row, scope.$index)">编辑</b-btn>
					<b-btn type="danger" size="mini" @click="handleDelUser(scope.row, scope.$index)">删除</b-btn>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination
				@current-change="handleCurrentChange"
				@size-change="handleChangeSize"
				:current-page="page"
				:page-size="1"
				:page-count="totalPage"
				layout="total, sizes, prev, pager, next, jumper"
			></el-pagination>
		</div>
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

		loading: boolean = false;
		userList: object[] = [];
		modalShow: boolean = false;
		currentUser: User = genUserInfo();
		condition: {} = {
			name: '',
			phone: '',
			email: '',
		}
		page: number = 1;
		totalPage: number = 1;
		pageSize: number = 10;

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
		 * 点击搜素
		 */
		handleSearch() {
			this.page = 1;
			this.handleFetchList();
		}

		/**
		 * 点击页码
		 */
		handleCurrentChange(num: number) {
			this.page = num > this.totalPage ? this.totalPage : num;
			this.handleFetchList();
		}

		/**
		 * 改变分页显示条数
		 */
		handleChangeSize(num: number) {
			this.pageSize = num;
			this.page = 1;
			this.handleFetchList();
		}

		/**
		 * 查询列表
		 */
		async handleFetchList() {
			try {
				const { page, pageSize } = this;
				const condition: any = {};
				for (let [k, v] of Object.entries(this.condition)) {
					if (v !== '') condition[k] = v;
				}
				this.loading = true;
				const res = await this.$http.request('userList', { page, pageSize, ...condition });
				this.userList = res.list.map(this.disposeShowUser);
				this.totalPage = res.totalPage;
				this.loading = false;
			} catch (error) {
				this.loading = false;
				console.log('fetch user list : ', error)
			}
		}

	}
</script>


<style lang="scss" scoped>
	@import './index.scss';
</style>