/**
 * 显示消息提示框
 * @param content 提示的标题
 */
export function toast(content) {
	uni.showToast({
		icon: 'none',
		title: content
	})
}

/**
 * 显示模态弹窗
 * @param content 提示的标题
 */
export function showConfirm(content) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '提示',
			content: content,
			cancelText: '取消',
			confirmText: '确定',
			success: function(res) {
				resolve(res)
			}
		})
	})
}

/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName]
		var part = encodeURIComponent(propName) + "="
		if (value !== null && value !== "" && typeof(value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== "" && typeof(value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']'
						var subPart = encodeURIComponent(params) + "="
						result += subPart + encodeURIComponent(value[key]) + "&"
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&"
			}
		}
	}
	return result
}

// 节流:触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用。
export function throttle(fn, gapTime) {
	if (gapTime == null || gapTime == undefined) {
		gapTime = 3000 //3秒延迟
	}

	let _lastTime = null

	// 返回新的函数
	return function() {
		let _nowTime = +new Date()
		if (_nowTime - _lastTime > gapTime || !_lastTime) {
			fn.apply(this, arguments) //将this和参数传给原函数
			_lastTime = _nowTime
		} else {
			console.log('延迟')
		}
	}
}
// 将时间戳转换成日期格式
export function timestampToTime(timestamp) {
	// 时间戳为10位需*1000，时间戳为13位不需乘1000
	var date = new Date(timestamp);
	// var Y = date.getFullYear() + '-';
	// var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	// var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '-';
	var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
	// var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
	return date;
}