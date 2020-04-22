import { Route } from './routeInterface'
import { getComponents } from './all'

export const menus: Route[] = [
	{ path: '/app/home', component: getComponents('Home'), title: '首页', icon: 'el-icon-s-home' },
	{ path: '/app/dashboard', component: getComponents('Dashboard'), title: '图表', icon: 'el-icon-s-marketing' },
	{
		path: '/app/ui', component: getComponents('UI'), title: 'UI', icon: 'iconfont icon-sheji',
		children: [
			{ path: '/app/ui/lock', component: getComponents('Lock'), title: 'lock', icon: 'el-icon-alarm-clock' },
			{ path: '/app/ui/botton', component: getComponents('BBotton'), title: '按钮', icon: '' },
			{ path: '/app/ui/icon', component: getComponents('BIcon'), title: '图标', icon: '' },
			{ path: '/app/ui/Neumorphism', component: getComponents('Neumorphism'), title: '新拟态', icon: '' },
		]
	},
	{ path: '/app/load', component: getComponents('BLoad'), title: 'load', icon: 'el-icon-loading' },
	{ path: '/app/usermanage', component: getComponents('UserManage'), title: '用户管理', icon: 'el-icon-user-solid' },
	{
		path: '/app/mouseanimation', component: getComponents('MouseAnimation'), title: '鼠标动画', icon: 'iconfont icon-mouse',
		children: [
			{ path: '/app/mouseanimation/Particle', component: getComponents('Particle'), title: '粒子效果', icon: '' },
			{ path: '/app/mouseanimation/Drag', component: getComponents('Drag'), title: '拖动效果', icon: '' },
		]
	},
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
