import type { RouteConfig } from 'vue-router'
import { getComponents } from './all'

export const menus: RouteConfig[] = [
	{ path: '/app/home', component: getComponents('Home'), name: 'Home', meta: { icon: 'el-icon-s-home' } },
	{ path: '/app/dashboard', component: getComponents('Dashboard'), name: 'Chart', meta: { icon: 'el-icon-s-marketing' } },
	{
		path: '/app/canvas', component: getComponents('Canvas'), name: 'Canvas', meta: { icon: 'el-icon-picture-outline}' },
		children: [
			{ path: '/app/canvas/draw', component: getComponents('Draw'), name: 'Draw', meta: { icon: 'el-icon-picture-outline' } },
			{ path: '/app/canvas/star', component: getComponents('Star'), name: 'Star', meta: { icon: 'el-icon-picture-outline' } },
			{ path: '/app/canvas/clip', component: getComponents('ClipTxt'), name: 'Clip', meta: { icon: 'el-icon-picture-outline' } },
			{ path: '/app/canvas/Particle', component: getComponents('Particle'), name: 'Particle', meta: { icon: '' } },
		]
	},
	{ path: '/app/reptile', component: getComponents('Reptile'), name: 'Reptile', meta: { icon: 'el-icon-attract' } },
	{
		path: '/app/ui', component: getComponents('UI'), name: 'UI', meta: { icon: 'iconfont icon-sheji}' },
		children: [
			{ path: '/app/ui/lock', component: getComponents('Lock'), name: 'Lock', meta: { icon: 'el-icon-alarm-clock' } },
			{ path: '/app/ui/botton', component: getComponents('BBotton'), name: 'Button', meta: { icon: '' } },
			{ path: '/app/ui/icon', component: getComponents('BIcon'), name: 'Icon', meta: { icon: '' } },
			{ path: '/app/ui/Neumorphism', component: getComponents('Neumorphism'), name: 'Neumorphism', meta: { icon: '' } },

		]
	},
	{ path: '/app/calculate', component: getComponents('Calculate'), name: 'Calculate', meta: { icon: 'iconfont icon-calculator' } },
	{ path: '/app/load', component: getComponents('BLoad'), name: 'Load', meta: { icon: 'el-icon-loading' } },
	{ path: '/app/usermanage', component: getComponents('UserManage'), name: 'UserManage', meta: { icon: 'el-icon-user-solid' } },
	{
		path: '/app/mouseanimation', component: getComponents('MouseAnimation'), name: 'Mouse', meta: { icon: 'iconfont icon-mouse}' },
		children: [
			{ path: '/app/mouseanimation/Drag', component: getComponents('Drag'), name: 'Drag', meta: { icon: '' } },
		]
	},
	{ path: '/app/binarytree', component: getComponents('BinaryTree'), name: 'BinaryTree', meta: { icon: 'iconfont icon-tree' } },
	{ path: '/app/lottery', component: getComponents('Lottery'), name: 'Lottery', meta: { icon: 'iconfont icon-choujiang' } },
	{ path: '/app/gradestar', component: getComponents('GradeStar'), name: 'GradeStar', meta: { icon: 'iconfont icon-star' } },
];

const others: RouteConfig[] = [
	{ path: '/novel', component: getComponents('Novel'), name: '小说', meta: {} },
]

export const routers: RouteConfig[] = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: getComponents('Login'), name: '登陆', meta: {} },
	{ path: '/bloodsugar', component: getComponents('BloodSugar'), name: 'BloodSugar', meta: { icon: 'iconfont icon-star' } },
	{
		path: '/app',
		component: getComponents('Layout'),
		children: [
			{
				path: '', redirect: () => {
					return menus[0].path;
				}
			},
			...menus
		]
	},
	...others,
	{ path: '*', component: getComponents('NotFound'), name: '404', meta: {} },
];
