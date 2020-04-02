const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
const phoneReg = /^1[3456789]\d{9}$/;
const passwordReg = /[^0-9a-zA-Z]/;

export function verifyPhone(phone = '') {
	return phoneReg.test(phone);
}

export function verifyEmail(email = '') {
	return mailReg.test(email);
}

export function verifyPassword(password = '') {
	return !passwordReg.test(password);
}

export function emptyRule(title = '', trigger = 'blur') {
	function pass(rule, value, callback) {
		if (value === '') {
			callback(new Error(`${title}不能为空`))
		} else {
			callback();
		}
	}
	return { validator: pass, trigger };
}

export function phoneRule(trigger = 'blur') {
	function pass(rule, value, callback) {
		if (!verifyPhone(value)) {
			callback(new Error('手机号为11位数字'));
			return
		}
		callback();
	};
	return { validator: pass, trigger };
}
/**
 * 邮箱验证
 * @param {*} trigger 
 */
export function emailRule(trigger = 'blur') {
	function pass(rule, value, callback) {
		if (!mailReg.test(value)) {
			callback(new Error('邮箱格式不对'))
			return;
		}
		callback();
		
	}
	return { validator: pass, trigger };
}
/**
 * 密码验证
 * @param {*} trigger 
 */
export function passwordRule(trigger = 'blur', min = 6, max = 32) {
	function pass(rule, value, callback) {
		if(value.length < min || value.length > max){
			return callback(new Error('密码长度为6-32个字符'));
		}
		if (passwordReg.test(value)) {
			return callback(new Error('密码只能使用字母、数字'));
		}
		callback();
	}
	return { validator: pass, trigger };
}

/**
 * 输入数字
 */
export function inputNumber(value = '') {
	console.log(value.replace(/[^0-9]/g, ''))
	return value.replace(/[^0-9]/g, '');
}