import moment from "moment";

/**
 * 格式化时间戳
 */
export function formatTime(time: number, showTime = false) {
	if (time.toString().length < 13) { time *= 1000 };
	const formatStr: string = `YYYY-MM-DD${showTime ? ' hh:mm:ss' : ''}`;
	return moment(time).format(formatStr);
}

/**
 * 格式化日期
 * @param {*} date 
 */
export function formatDate(date: string = '', showTime = false) {
	const formatStr = `YYYY-MM-DD  ${showTime ? 'hh:mm:ss' : ''}`;
	return moment(date).format(formatStr);
}


/**
 * 获取时间戳
 * unix 秒
 * valueOf 毫秒
 */
export function getTime(timeStr: string = '') {
	return moment(timeStr).unix();
}