import Vue, { ComponentOptions, PluginFunction, AsyncComponent } from 'vue'

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent

const all: any = {
	NotFound: () => import('@/views/NotFound/index.vue'), //404
	Login: () => import('@/views/Login/index.vue'), //登录
	Home: () => import('@/views/Home/index.vue'), //首页
	Layout: () => import('@/layout/index.vue'), //app 布局
	Reptile: () => import('@/views/Reptile/index.vue'), // 爬虫
	Novel: () => import('@/views/Reptile/index.vue'), // 小说
	Canvas: () => import('@/views/Canvas/index.vue'), // 画图Router
	Draw: () => import('@/views/Canvas/Draw/index.vue'), // Draw
	Star: () => import('@/views/Canvas/Star/index.vue'), // 画图 html2canvas
	ClipTxt: () => import('@/views/Canvas/ClipTxt/index.vue'), // 画图 Clip
	UserManage: () => import('@/views/UserManage/index.vue'), // 用户管理
	UI: () => import('@/views/UI/index.vue'), // UI 路由页
	BBotton: () => import('@/views/UI/Botton/index.vue'), // 按钮
	BIcon: () => import('@/views/UI/Icon/index.vue'), // 图标
	BLoad: () => import('@/views/Load/index.vue'), // 加载
	Neumorphism: () => import('@/views/UI/Neumorphism/index.vue'), // 新拟态
	MouseAnimation: () => import('@/views/MouseAnimation/index.vue'), // 鼠标动画路由
	Particle: () => import('@/views/MouseAnimation/Particle/index.vue'), // 粒子效果
	Drag: () => import('@/views/MouseAnimation/Drag/index.vue'), // 拖动效果
	Lock: () => import('@/views/UI/Lock/index.vue'), // 时钟
	Calculate: () => import('@/views/Calculate/index.vue'), // 计算
	BinaryTree: () => import('@/views/BinaryTree/index.vue'), // 二叉树
	Lottery: () => import('@/views/Lottery/index.vue'), // 抽奖
	GradeStar: () => import('@/views/Star/index.vue'), // star
	BloodSugar: () => import('@/views/BloodSugar/index.vue'), // 血糖
}


export function getComponents(name: string): Component {
	return all[name] ? all[name] : all['NotFound'];
}