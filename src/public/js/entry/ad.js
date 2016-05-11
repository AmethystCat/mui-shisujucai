var menu = null,
	main = null;
var showMenu = false;
mui.init({
	style: {
		top: '0px',
		bottom: '0px'
	}
});

mui.ready(function(){
	mui('.mui-content').on('click', '#jump', function(){
		mui.openWindow({
			url: '/src/views/home/index.html'
		});
	});
	
	(function () {
		setTimeout(function () {
			mui.openWindow({
				url: '/src/views/home/index.html'
			});
		}, 4000);
	});
});