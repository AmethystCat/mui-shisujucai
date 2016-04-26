var menu = null,
	main = null;
var showMenu = false;
mui.init({
	style: {
		top: '0px',
		bottom: '0px'
	}
});

(function () {
	setTimeout(function () {
		mui.openWindow({
			url: '/src/views/login/login.html'
		});
	}, 2000);
});