const all: any = {
	NotFound: () => import('@/views/NotFound/NotFound.vue'),
	Login: () => import('@/views/Login/Login.vue'),
	Home: () => import('@/views/Home/Home.vue'),
	Content: () => import('@/views/Content.vue'),
	Dashboard: () => import('@/views/Dashboard/Dashboard.vue'),
	UserManage: () => import('@/views/UserManage/UserManage.vue'),
	UI: () => import('@/views/UI/UI.vue'),
	BBotton: () => import('@/views/UI/Botton/Botton.vue'),
	BIcon: () => import('@/views/UI/Icon/Icon.vue'),
	BLoad: () => import('@/views/Load/Load.vue'),
}


export function getComponents(name: string) {
	return all[name] ? all[name] : all['NotFound'];
}