import type { Store } from 'vuex'
import HTTP from 'cover-axios'
import ApiList from '@/request/api'
import { Message } from 'element-ui'
import router from '@/router'

const coverCodes: Set<number> = new Set([]); // 用来覆盖错误弹框的错误码

// vue.use
function install(Vue: any, opts: { store?: Store<any> }) {
	const http = Vue.prototype.$http = new HTTP();

	if (process.env.NODE_ENV === 'development') {
		// 本地代理指向配置 根据自己的环境配置
		http.setBaseURL('/serve');
	}

	if (ApiList && Array.isArray(ApiList)) {
		// 添加接口列表
		http.addApiList(ApiList);
	}

	if (opts.store && opts.store.commit) {
		// 我这里传入了vuex对象，存到store里方便在action中调用
		opts.store.commit('setHttp', http);
	}

	http.interceptors.request.use(requestIntercept, requestFail)
	http.interceptors.response.use(responentIntercept, requestFail)

	Vue.prototype.$coverReuestMsg = {
		add: addCoverCode,
		remove: removeCoverCode
	}

}


// 添加覆盖弹框 错误码
function addCoverCode(code: number) {
	coverCodes.add(code);
}

// 添加了覆盖的错误码 不需要了可以删除
function removeCoverCode(code: number | undefined) {
	if (!code) {
		coverCodes.clear();
	} else {
		coverCodes.delete(code);
	}
}

// 请求拦截 同axios
function requestIntercept(config: any) {
	return config
}

// 返回拦截 这里根据自己的项目 做了返回处理
// 错误会进行弹窗提示
function responentIntercept(res) {
	const { data, code, msg } = res.data;
	if (code === 1) {
		return data
	} else {
		showMessage(res.data);
		return Promise.reject(msg);
	}
}

// 请求失败处理
function requestFail(err) {
	console.error('reqeust fail', err)
	const errs = new Map([
		[-401, '未登录'],
		[-403, '未登录'],
		[-500, '服务器错误'],
	])
	const code = err.statusCode;

	const msg = errs.get[err.statusCode] || '请求失败';
	showMessage(msg);

	if (code === -401 || code === -403) {
		router.push('/login');
	}

	return Promise.reject(err)
}

// 错误弹窗 会通过coverCodes过滤是否使用弹框
function showMessage(data: { msg: string, code: number }) {
	if (coverCodes.has(data.code)) return;
	Message({
		message: data.msg || 'error',
		type: 'error',
		offset: 100,
	});
}

export default {
	install
}