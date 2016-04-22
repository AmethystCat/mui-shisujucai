mui.init({
	statusBarBackground: '#FAA519'
});

mui('.ss-login-form').on('click', '.ss-btn-resgist', function () {
	mui.openWindow({
		url: '/src/views/home/index.html'
	});
});