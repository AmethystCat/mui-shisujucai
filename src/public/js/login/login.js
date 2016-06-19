var host = H.common.host;
	loginUrl = '/api/user/login';

mui.ready(function () {
	mui.init({
		styles:{
	        top:'45px',
	        bottom: '0px'
	    }
	});
	
	mui.plusReady(function(){
		var logininfo = JSON.parse(plus.storage.getItem('logininfo'));
		mui('#phone')[0].value = logininfo && logininfo.mobile || '';
		mui('#password')[0].value = logininfo && logininfo.password || '';
		
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
				success: function(res, status, xhr){
					console.log(JSON.stringify(res));
					if(res.code === 0) {
						plus.storage.setItem('logininfo', JSON.stringify({mobile: mobile, password: password}));
						mui.openWindow({
							url: '/src/views/home/index.html',
							id: 'home-index'
						});
					} else {
						mui('.error-mes')[0].innerHTML = res.message;			
					}			
				},
				error: function(xhr, type, errorThrown){
					mui.alert(xhr.responseText);
				}
			});
			
		});
	
		mui('.ss-login-form').on('click', '.ss-btn-resgist', function () {
			mui.openWindow({
				url: '/src/views/login/regist.html',
				id: 'regist.html',
				waiting: {
					autoShow: true
				},
				show: {
					duration:100
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
});
