var host = 'http://dev.laiweilai.com:8020',
	loginUrl = '/api/user/login';

//mui.init({
//	statusBarBackground: '#FAA519',
//	preloadPages:[
//  {
//    url: '/src/views/login/regist.html',
//    id: '/src/views/login/regist.html',
//    styles:{
//    	top:'45px',
//      bottom: '0px'
//    }
//  }
//],
//	preloadLimit:5//预加载窗口数量限制(一旦超出,先进先出)默认不限制
//});

mui.init({
	styles:{
        top:'45px',
        bottom: '0px'
    }
});

mui.ready(function () {
	mui('#bg_img')[0].height = window.innerHeight;
});

mui.plusReady(function(){
     
    mui('.ss-login-form').on('click', '.ss-btn-login', function () {
		var mobile = mui('#phone')[0].value,
			password = mui('#password')[0].value;
		
		mui.ajax(host + loginUrl, {
			data: {
				mobile: mobile,
				password: password
			},
			dataType: 'json',//服务器返回json格式数据
			type: 'post',//HTTP请求类型
			timeout: 10000,//超时时间设置为10秒；
			success: function(res){
				if(res.code === 0) {
					mui.openWindow({
						url: '/src/views/home/index.html'
					});
				} else {
					mui('.error-mes')[0].innerHTML = res.message;			
				}			
			},
			error: function(xhr, type, errorThrown){
				console.log(xhr);
				console.log(type);
				console.log(errorThrown);
			}
		});
		
	});

	mui('.ss-login-form').on('click', '.ss-btn-resgist', function () {
		mui.openWindow({
			url: '/src/views/login/regist.html',
			id: 'regist.html',
			waiting: {
				autoShow: false
			}
		});
	});
	
	mui('.ss-login-form').on('click', '.ss-btn__forgot-pass', function () {
		mui.openWindow({
			url: '/src/views/login/get-password.html'
		});
	});
	
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

});