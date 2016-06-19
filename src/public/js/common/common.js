H.namespace('common');
// 全局host
H.common.host = 'http://dev.laiweilai.com:8020';

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

	
	// 全局背景
	if (mui('#bg_img')[0]) {
		mui('#bg_img')[0].style.height = window.innerHeight + 'px';
	}
	
	// 请求封装
	H.common.send = function (params) {
    	var defaultParams = {
	    		url: '',
	    		data: {},
	    		dataType : 'json',
	    		type: 'get',
	    		timeout: 10000,
	    		success: function(){}  		
	    	};
    	
    	var obj = mui.extend({}, defaultParams, params || {});
    	
    	mui.ajax( H.common.host + obj.url,{
    		data: obj.data,
    		dataType: obj.dataType,//服务器返回数据格式
    		type: obj.type,//HTTP请求类型
    		timeout: obj.timeout,//超时时间设置为10秒；
    		success: function(res){
    			if(res.code === 10101) {
    				mui.toast('登录过期，请重新登录');
    				mui.openWindow('/src/views/login/login.html', 'login');
    				return;
    			}
    			obj.success(res);
    		},
    		error:function(xhr,type,errorThrown){
    			mui.alert(xhr.responseText);
    		}
    	});
    };
	
	mui.plusReady(function(){
		// 点击事件
		mui('.ss-bar-tab').on('tap', '.mui-tab-item', function(e){
			e.preventDefault();
			var _this = this;
			var href = this.getAttribute('href'),
				current = mui('.mui-active')[0].getAttribute('data-id');
				id = this.getAttribute('data-id');
				console.log(id);
//			mui.each(mui('.mui-tab-item ')[0], function(index, el){
//				
//				if(el.className == 'mui-tab-item mui-active'){
//					current = el.getAttribute('data-id');
//				}
//			});
			console.log(current);
//			plus.webview.getWebviewById(current).close();
			mui.openWindow({
				url: href,
				id: id
			});
			
			
		});
		// 获取用户信息
		H.common.getUserInfo = function(cb) {
			H.common.send({
				url: '/api/user/profile',
				success: function(res){
					console.log(JSON.stringify(res));
					if(res.code === 0) {
						plus.storage.setItem('userinfo', JSON.stringify(res));
						cb && cb(res);
					} else {
						mui.alert(res.message || '获取用户信息失败');
					}
				}
			});
		};
		// 获取商品信息
		H.common.getGoodsDetail = function (cb) {
			H.common.send({
				url: '/api/goods/wifi/detail',
				success: function(res) {
					console.log(JSON.stringify(res));
					if(res.code === 0){
						plus.storage.setItem('goodsdetail', JSON.stringify(res.data));
						cb && cb(res.data);
					} else {
						mui.alert(res.message);
					}
				}
			});
		};
	});
});
