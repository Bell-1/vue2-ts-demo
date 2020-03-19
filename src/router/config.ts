import { Route } from './routeInterface'
import { getComponents } from './all'

export const menus: Route[] = [
	{ path: '/app/home', component: getComponents('Home'), title: '首页', icon: 'el-icon-s-home' },
	{ path: '/app/dashboard', component: getComponents('Dashboard'), title: '图表', icon: 'el-icon-s-marketing' },
	{
		path: '/app/ui', component: getComponents('UI'), title: 'UI', icon: 'el-icon-s-marketing',
		children: [
			{ path: '/app/ui/botton', component: getComponents('BBotton'), title: '按钮', icon: 'iconfont icon-btn' },
			{ path: '/app/ui/icon', component: getComponents('BIcon'), title: '图标', icon: 'iconfont icon-tubiao' },
		]
	},
	{ path: '/app/load', component: getComponents('BLoad'), title: 'load', icon: 'el-icon-loading' },
	{ path: '/app/usermanage', component: getComponents('UserManage'), title: '用户管理', icon: 'el-icon-user-solid' },
];

export const routers: Route[] = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: getComponents('Login'), title: '登陆' },
	{
		path: '/app',
		component: getComponents('Content'),
		children: [...menus,]
	},
	{ path: '*', component: getComponents('NotFound'), title: '404' },
];
