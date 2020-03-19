
export interface Route {
	path: string,
	title?: string,
	icon?: string,
	redirect?: string,
	component?: any,
	children?: Route[],
}

