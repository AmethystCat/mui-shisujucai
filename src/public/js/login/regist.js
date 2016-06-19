var host = H.common.host,
	resUrl = '/api/user/register',
	resCode = '/api/user/register/code';

mui.init({
	statusBarBackground: '#FAA519',
	styles:{
        top:'45px',
        bottom: '0px'
    }
});

mui.ready(function () {
	mui('#bg_img')[0].style.height = window.innerHeight + 'px';
	mui('#bg_img')[0].style.width = window.innerWidth + 'px';
});

mui.plusReady(function(){
	var errorMes = mui('.error-mes')[0];
	mui('.ss-login-form').on('click', '.ss-btn-resgist', function () {
		var mobile = mui('#phone')[0].value,
			password = mui('#password')[0].value,
			passConfirm = mui('#passConfirm')[0].value;
			code = mui('#validationNum')[0].value,
			inviter = mui('#invitePhone')[0].value;
			
			
			if(!H.isMobile(mobile)) {
				errorMes.innerHTML="手机号格式不正确";
				return;
			}
			
			if(password.length < 6) {
				errorMes.innerHTML = "为了您的账户安全<br />请确认密码大于6个字符 建议包含字母与数字";
				return;
			}
			
			if(password !== passConfirm) {
				errorMes.innerHTML="两次输入密码不一致";
				return;
			}
			
			if(!code) {
				errorMes.innerHTML = "请填写验证码";
				return;
			}
			
		mui.ajax(host + resUrl, {
			data: {
				mobile: mobile,
				password: password,
				code: code,
				inviter: inviter
			},
			dataType: 'json',//服务器返回json格式数据
			type: 'post',//HTTP请求类型
			timeout: 10000,//超时时间设置为10秒；
			success: function(res){
				console.log(res.code);				
				console.log(res.msg);	
				if(res.code === 0) {
					mui.toast(res.message||'成功');
					setTimeout(function () {
						mui.openWindow({
							url: '/src/views/login/login.html'
						});	
					}, 1000);
				}
				if(res.code !== 0) {
					errorMes.innerHTML = res.message;
				}
			},
			error: function(xhr, type, errorThrown){
				errorMes.innerHTML = xhr.responseText;
			}
		});
	});
	
	mui('.ss-login-form').on('click', '.ss-btn-sendCode', function () {
		var mobile = mui('#phone')[0].value;
		if(!H.isMobile(mobile)) {
				errorMes.innerHTML="手机号格式不正确";
				return;
			}
		mui('.error-mes')[0].innerHTML = '';
		if (this.className.indexOf('sending') !== -1) return false;
		util.timeCalc(this, 60);
		
		var mobile = mui('#phone')[0].value;
		mui.ajax(host + resCode, {
			data: {
				mobile: mobile
			},
			dataType: 'json',//服务器返回json格式数据
			type: 'post',//HTTP请求类型
			timeout: 10000,//超时时间设置为10秒；
			success: function(res){
				console.log(res.code);				
				console.log(res.msg);	
				if(res.code !== 0) {
					mui('.error-mes')[0].innerHTML = res.message;
				}
			},
			error: function(xhr, type, errorThrown){
				mui('.error-mes')[0].innerHTML = xhr.responseText;
			}
		});
	});
	
});





var util = (function(){
	return {
		timeCalc: function (el, time) {
			var originVal = el.innerHTML || el.innerText || el.textContent;
			console.log(originVal);
			
			if(!H.isNumber(time)) return false;
			
			function recover() {
				clearInterval(timer);
				el.innerHTML = originVal;
				el.disabled = false;
				H.removeClass(el, 'sending');
			}
			function showTime() {
				el.innerHTML = '发送验证码' + time + 's';
			}
			showTime();
			H.addClass(el, 'sending');
			var timer = setInterval(function () {
				time--;
				if(time < 0) {
					recover();
					return;
				}
				showTime();
			}, 1000);
			
			return {
				close: function(){
					if(timer) {
						clearInterval(timer);
					}
					recover();
				}
			}
		}
	}
})();