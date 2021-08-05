const userInfo = localStorage.getItem('userInfo');

export default {
	namespaced: true,
	state: {
		userInfo: !!userInfo ? JSON.parse(userInfo) : null,
	},
	mutations: {
		setUserInfo(this: any, state: any, userInfo: any) {
			console.log(121212, userInfo)
			this.state.http.setHeaders('token', userInfo.token);
			localStorage.setItem('userInfo', JSON.stringify(userInfo))
			// localStorage.setItem('token', userInfo.token)
			state.userInfo = userInfo;
		},

		logout(state: any, userInfo: any) {
			localStorage.removeItem('userInfo');
			localStorage.removeItem('token');
			state.userInfo = null;
		}

	},
	actions: {
		async login({ commit, rootState }: any, data: any) {
			let { http } = rootState;
			console.log(http.getApi('login'))
			const info = await rootState.http.request('login', data);
			commit('setUserInfo', info);
			return info
		},

		register({ commit, rootState }: any, data: any) {
			return new Promise(async (resolve: any, reject: any) => {
				try {
					const info = await rootState.http.request('register', data);
					resolve(info);
				} catch (error) {
					reject();
				}
			})
		},

		logout({ commit, rootState }: any) {
			return new Promise(async (resolve: any, reject: any) => {
				try {
					await rootState.http.request('logout');
					commit('logout');
					resolve();
				} catch (error) {
					reject();
				}
			})
		}
	},
}
