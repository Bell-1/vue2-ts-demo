import moment from "moment";

//因为这里的时间戳都是到秒 所以转换时应乘除1000

/**
 * 格式化时间戳
 */
export function formatTime(time, showTime = false) {
	return time === '' ? '' : formatDate(moment(time * 1000), showTime);
}

/**
 * 格式化日期
 * @param {*} date 
 */
export function formatDate(date = moment(), showTime = false) {
	const formatStr = `YYYY-MM-DD  ${showTime ? 'hh:mm:ss' : ''}`;
	return date.format(formatStr);
}

/**
 * 获取时间戳
 * unix 秒
 * valueOf 毫秒
 */
export function getTime(timeStr = '') {
	return timeStr === '' ? '' : moment(timeStr).unix();
}