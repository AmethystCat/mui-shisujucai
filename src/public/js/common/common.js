H.namespace('common');
mui.ready(function () {
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
	};

	// 点击事件
	mui('.ss-bar-tab').on('tap', '.mui-tab-item', function(e){
		e.preventDefault();
		var href = this.getAttribute('href');
		mui.openWindow({
			url: href
		});
	});
	
	if (mui('#bg_img')[0]) {
		mui('#bg_img')[0].height = window.innerHeight;
	}
});
