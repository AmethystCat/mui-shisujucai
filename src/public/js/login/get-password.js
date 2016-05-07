mui.init({
	statusBarBackground: '#FAA519'
});

mui.ready(function () {
	mui('#bg_img')[0].height = window.innerHeight;
	
	mui('.ss-login-form').on('click', '.ss-btn-submit', function () {
		mui.openWindow({
			url: '/src/views/login/modify-password.html'
		});
	});
});
