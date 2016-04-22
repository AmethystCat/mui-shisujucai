mui.init({
	statusBarBackground: '#FAA519'
});

mui('.ss-login-form').on('click', '.ss-btn-submit', function () {
	mui.openWindow({
		url: '/src/views/login/modify-password.html'
	});
});