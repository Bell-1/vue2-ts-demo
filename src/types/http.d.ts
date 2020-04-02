declare module 'vue/types/vue' {
	interface Vue {
		$moment: any,
		$http: any,
	}
}

export interface Http {
	baseURL: string
	debug: boolean
	apiList: any
	success: any
	fail: any
}

