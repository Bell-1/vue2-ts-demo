import { Route } from './routeInterface'
import { getComponents } from './all'

export const menus: Route[] = [
	{ path: '/app/home', component: getComponents('Home'), title: 'Home', icon: 'el-icon-s-home' },
	{ path: '/app/dashboard', component: getComponents('Dashboard'), title: 'Chart', icon: 'el-icon-s-marketing' },
	{
		path: '/app/canvas', component: getComponents('Canvas'), title: 'Canvas', icon: 'el-icon-picture-outline',
		children: [
			{ path: '/app/canvas/draw', component: getComponents('Draw'), title: 'Draw', icon: 'el-icon-picture-outline' },
			{ path: '/app/canvas/star', component: getComponents('Star'), title: 'Star', icon: 'el-icon-picture-outline' },
			{ path: '/app/canvas/clip', component: getComponents('ClipTxt'), title: 'Clip', icon: 'el-icon-picture-outline' },
			{ path: '/app/canvas/Particle', component: getComponents('Particle'), title: 'Particle', icon: '' },
		]
	},
	{ path: '/app/reptile', component: getComponents('Reptile'), title: 'Reptile', icon: 'el-icon-attract' },
	{
		path: '/app/ui', component: getComponents('UI'), title: 'UI', icon: 'iconfont icon-sheji',
		children: [
			{ path: '/app/ui/lock', component: getComponents('Lock'), title: 'Lock', icon: 'el-icon-alarm-clock' },
			{ path: '/app/ui/botton', component: getComponents('BBotton'), title: 'Button', icon: '' },
			{ path: '/app/ui/icon', component: getComponents('BIcon'), title: 'Icon', icon: '' },
			{ path: '/app/ui/Neumorphism', component: getComponents('Neumorphism'), title: 'Neumorphism', icon: '' },
		]
	},
	{ path: '/app/calculate', component: getComponents('Calculate'), title: 'Calculate', icon: 'iconfont icon-calculator' },
	{ path: '/app/load', component: getComponents('BLoad'), title: 'load', icon: 'el-icon-loading' },
	{ path: '/app/usermanage', component: getComponents('UserManage'), title: 'UserManage', icon: 'el-icon-user-solid' },
	{
		path: '/app/mouseanimation', component: getComponents('MouseAnimation'), title: 'Mouse', icon: 'iconfont icon-mouse',
		children: [
			{ path: '/app/mouseanimation/Drag', component: getComponents('Drag'), title: 'Drag', icon: '' },
		]
	},
];

const others: Route[] = [
	{ path: '/novel', component: getComponents('Novel'), title: '小说' },
]

export const routers: Route[] = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: getComponents('Login'), title: '登陆' },
	{
		path: '/app',
		component: getComponents('Content'),
		children: [...menus]
	},
	...others,
	{ path: '*', component: getComponents('NotFound'), title: '404' },
];
