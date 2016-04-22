var host = 'http://dev.laiweilai.com:8020',
	loginUrl = '/api/user/login';

mui.init({
	statusBarBackground: '#FAA519'
});

mui.plusReady(function(){
     console.log("当前页面URL："+plus.webview.currentWebview().getURL());
     
    mui('.ss-login-form').on('click', '.ss-btn-login', function () {
		var mobile = mui('#phone')[0].value,
			password = mui('#password')[0].value;
		
		console.log(mobile);
		console.log(password);
		console.log(host + loginUrl);
		
		mui.ajax(host + loginUrl, {
			data: {
				mobile: mobile,
				password: password
			},
			dataType: 'json',//服务器返回json格式数据
			type: 'post',//HTTP请求类型
			timeout: 10000,//超时时间设置为10秒；
			success: function(data){
				alert(data);
				console.log(data.code);				
				console.log(data.msg);				
			},
			error: function(xhr, type, errorThrown){
				console.log(xhr);
				console.log(type);
				console.log(errorThrown);
			}
		});
		
	//	mui.openWindow({
	//		url: '/src/views/home/index.html'
	//	});
	});

	mui('.ss-login-form').on('click', '.ss-btn-resgist', function () {
		mui.openWindow({
			url: '/src/views/login/regist.html'
		});
	});
	
	mui('.ss-login-form').on('click', '.ss-btn__forgot-pass', function () {
		mui.openWindow({
			url: '/src/views/login/get-password.html'
		});
	});

});