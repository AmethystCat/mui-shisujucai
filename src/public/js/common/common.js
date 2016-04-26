H.namespace('common');
H.common.backQuit = function () {
	var first = null;
	mui.back = function() {
		//首次按键，提示‘再按一次退出应用’
		if (!first) {
			first = new Date().getTime();
			mui.toast('再按一次退出应用');
			setTimeout(function() {
				first = null;
			}, 2000);
		} else {
			if (new Date().getTime() - first < 2000) {
				plus.runtime.quit();
			}
		}
	};
}