mui.init({
	statusBarBackground: '#FAA519'
});

mui('.ss-login-form').on('click', '.ss-btn-regist', function () {
	mui.openWindow({
		url: '/views/login/modify-password.html'
	});
});