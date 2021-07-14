import { genApi, Api } from 'cover-axios'

const ApiList: Api[] = [
	// 账户
	genApi('login', 'api/admin/login', 'POST'), //登录
	genApi('register', 'api/admin/register', 'POST'), //注册
	genApi('logout', 'api/admin/logout', 'POST'), //退出登录

	genApi('fetchBloodSuger', 'api/bloodSugar', 'GET'), // 查询
	genApi('createBloodSuger', 'api/bloodSugar', 'POST'), // 添加
	genApi('delBloodSuger', 'api/bloodSugar', 'DELETE'), // 删除

	genApi('getCatalog', 'api/reptile/catalog', 'POST'), //
	genApi('getNovel', 'api/reptile/novel', 'POST'), //

	genApi('userList', 'api/user/list', 'GET'), //用户列表
	genApi('userInfo', 'api/user/info', 'GET'), //用户信息
	genApi('userCreate', 'api/user/create', 'POST'), //创建用户
	genApi('userEdit', 'api/user/edit', 'POST'), //编辑用户
	genApi('userDel', 'api/user/del', 'DELETE'), //编辑用户

	genApi('weatherNow', 'api/weather/now', 'GET'), //获取今天天气
	genApi('weatherDaliy', 'api/weather/daily', 'GET'), //获取未来天气
]

export default ApiList;
