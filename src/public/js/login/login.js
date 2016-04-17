mui.init({
	statusBarBackground: '#FAA519'
});

mui('.ss-login-form').on('click', '.ss-btn-resgist', function () {
	mui.openWindow({
		url: '/views/login/regist.html'
	});
});

mui('.ss-login-form').on('click', '.ss-btn__forgot-pass', function () {
	mui.openWindow({
		url: '/views/login/get-password.html'
	});
});