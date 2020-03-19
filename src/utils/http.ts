import Vue from 'vue'
import axios from 'axios'
import {
	Message
} from 'element-ui'
import apiList from '@/api/index'

interface ApiItem {
	method: string,
	url: string,
	apiName?: string
}

class Http {

	baseURL: string = window.location.origin;
	debug: boolean = process.env.NODE_ENV !== 'production';
	apiList: any = {} //接口列表
	success: any = undefined; //成功回调
	fail: any = undefined; //失败回调

	constructor() {
		// this.baseURL = process.env.NODE_ENV === 'development' ? '/test' : window.location.origin;
		axios.defaults.baseURL = this.baseURL;
		this.initListeners();
	}

	/**
	 * 整理api
	 */
	initListeners() {
		for (let v of apiList) {
			this.addApi({
				apiName: v.apiName,
				method: v.method,
				url: v.url,
			})
		}
	}
	/**
	 * 添加api接口
	 */
	addApi({
		apiName = '',
		method = 'POST',
		url = ''
	}: ApiItem) {
		if (apiName && url) {
			this.apiList[apiName] = {
				method: method.toUpperCase(),
				url,
			};
		}
	}
	/**
	 * 获取baseurl
	 */
	getBaseURL() {
		return this.baseURL;
	}
	/**
	 * 获取完整接口url
	 * @param {String} apiName
	 */
	getUrl(apiName: string) {
		if (this.apiList[apiName]) {
			return this.getBaseURL() + this.apiList[apiName].url;
		} else {
			return ''
		}

	}

	/**
	 * 获取api
	 * @param {String} apiName
	 */
	getApiName(apiName: string) {
		if (apiName && this.apiList[apiName]) {
			return this.apiList[apiName];
		} else {
			console.error('apiName:' + apiName + ' is not found!');
			return false;
		}
	}
	
	httpResult(res: any, { resolve, reject, apiName }: any = {}) {
		if (res.code > 0) {
			if (this.debug && res.data) {
				console.log(`${apiName} - resData:`, res.data)
			}
			resolve(res.data || null);
		} else {
			this.httpFail(res, {
				reject
			});
		}
	}

	httpFail(res: any, { reject }: any = {}) {
		const { code, msg } = res;
		let message = msg
		switch (+code) {
			case -401:
				//未登录
				message = '未登录';
				setTimeout(() => {
					window.location.href = window.location.origin + '/login';
				}, 100);
				break;
		}
		Message({
			message,
			type: 'error',
			offset: 60,
		});
		reject();
	}

	/**
	 * 请求查询
	 * @param {String} apiName 接口名称定义在apiList
	 * @param {Object} data 传送数据
	 * @param {String} param get参数
	 */
	request(apiName = "", data = {}, param = '') {
		let api = this.getApiName(apiName),
			token = localStorage.getItem('token') || undefined,
			headers = { token };
		return new Promise(async (resolve, reject) => {
			if (!api) return reject();
			try {
				const { url, method } = api;
				const reqConfig = {
					url: url + param,
					method,
					data,
					params: api.method === 'GET' ? data : undefined,
					headers,
				}
				let res = await axios.request(reqConfig);
				this.httpResult(res.data, { resolve, reject, apiName });
			} catch (error) {
				reject();
				console.error('接口请求失败！', error);
			}
		})
	}

	/**
	 * 
	 * @param {*} apiName 
	 * @param {*} data 
	 * @param {*} options  fileName 文件名称  exportType 下载文件格式
	 */
	downloadFile(apiName: string, data: any = {}, {
		fileName = '',
		exportType = 'csv'
	} = {}) {
		let api = this.getApiName(apiName),
			headers = {};

		const exportTypes: any = {
			xls: 'application/vnd.ms-excel,charset=UTF-8',
			xlsx: 'application/vnd.ms-excel,charset=UTF-8',
			csv: 'text/csv,charset=UTF-8',
		}
		const fileType = exportTypes[exportType];
		return new Promise(async (resolve, reject) => {
			const {
				url
			} = api;
			if (!api) {
				reject();
				console.error(`${apiName}:不存在`)
				return
			}
			if (!fileType) {
				reject();
				console.error('下载文件格式不正确')
				return
			}
			try {
				const res = await axios.request({
					url,
					method: 'POST',
					responseType: 'blob', // 表明返回服务器返回的数据类型
					data,
				})
				let blob = new Blob([res.data], {
					type: fileType,
				})
				console.log(blob)
				fileName = `${fileName}${+new Date()}.${exportType}`
				let navigator: any = window.navigator;
				if (navigator.msSaveOrOpenBlob) {
					navigator.msSaveBlob(blob, fileName)
				} else {
					var link = document.createElement('a')
					link.href = window.URL.createObjectURL(blob)
					link.download = fileName;
					link.click()
					//释放内存
					window.URL.revokeObjectURL(link.href)
				}
				resolve();
			} catch (error) {
				reject();
				console.error('接口请求失败！', error);
			}
		})
	}
}

const http = new Http();

Vue.prototype.$http = http;

export default http;