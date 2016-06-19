var host = H.common.host,
	path1 = 'api/user/password_reset',
	path2 = 'api/user/password_reset/code';
mui.init();

mui.ready(function () {
	if (mui('#bg_img')[0]) {
		mui('#bg_img')[0].style.height = window.innerHeight + 'px';
	}
	
	mui('#bg_img')[0].height = window.innerHeight;
	
	mui('.ss-login-form').on('click', '.ss-btn-submit', function () {
		var params = {
			mobile: mui('#phone')[0].value,
			password: mui('#newpass')[0].value,
			code: mui('#validationNum')[0].value
		};
		
		mui('.error-mes')[0].innerHTML = '';
		
		mui.ajax(host + path1, {
			data: params,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(res){
				if(res.code === 0) {
					mui.toast(res.message || '更改成功');
					setTimeout(function () {
						mui.openWindow('/src/views/login/login.html','login');
					},2000);
				} else {
					mui('.error-mes')[0].innerHTML = res.message;
				}
				console.log(JSON.stringify(res));
			},
			error:function(xhr,type,errorThrown){
				mui('.error-mes')[0].innerHTML = res.message;
			}
		});
	});
	
	mui('.ss-login-form').on('click', '.ss-btn-sendCode', function () {
		var mobile = mui('#phone')[0].value;
		if(!H.isMobile(mobile)) {
				mui('.error-mes')[0].innerHTML = "手机号格式不正确";
				return;
			}
		mui('.error-mes')[0].innerHTML = '';
		if (this.className.indexOf('sending') !== -1) return false;
		H.timeCalc(this, 60);
		
		var mobile = mui('#phone')[0].value;
		mui.ajax(host + path2, {
			data: {
				mobile: mobile
			},
			dataType: 'json',//服务器返回json格式数据
			type: 'post',//HTTP请求类型
			timeout: 10000,//超时时间设置为10秒；
			success: function(res){
				if(res.code !== 0) {
					mui('.error-mes')[0].innerHTML = res.message;
				}
			},
			error: function(xhr, type, errorThrown){
				mui('.error-mes')[0].innerHTML = errorThrown;
				H.timeCalc().close();
				console.log(xhr);
				console.log(type);
				console.log(errorThrown);
			}
		});
	});
});
