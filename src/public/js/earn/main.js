mui.init();

mui.ready(function () {
	mui('.my-profit2').on('click', '#go-hongbao', function () {
		mui.openWindow({
			url: '/src/views/earn/hongbao.html'
		});
	});
	mui('.my-profit2').on('click', '#go-tudi', function () {
		mui.openWindow({
			url: '/src/views/earn/tudi.html'
		});
	});
	mui('.my-profit2').on('click', '#go-ad', function () {
		mui.openWindow({
			url: '/src/views/earn/wifiad.html'
		});
	});
	mui('.my-profit2').on('click', '#go-fenxiao', function () {
		mui.openWindow({
			url: '/src/views/earn/fenxiao.html'
		});
	});
});
