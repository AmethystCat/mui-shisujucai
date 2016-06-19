mui.init({
	styles: {
		top: '44px',
		bottom: '50px'
	}
});

mui.ready(function () {
	H.common.backQuit();
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
	
	mui('.mui-content').on('click', '#to-ad', function (e) {
		e.preventDefault();
		mui.openWindow('/src/views/earn/ad-kanguanggao.html','earn-kanguanggao',{});
	});
	
	mui('.mui-content').on('click', '#to-tudi', function (e) {
		e.preventDefault();
		mui.openWindow('/src/views/earn/ad-shoutudi.html','earn-shoutudi',{});
	});
	
	mui('.mui-content').on('click', '#to-fenxiao', function (e) {
		e.preventDefault();
		mui.openWindow('/src/views/earn/ad-fenxiao.html','earn-fenxiao',{});
	});
	
	mui('.mui-content').on('click', '#to-fenhong', function (e) {
		e.preventDefault();
		mui.openWindow('/src/views/earn/ad-fenhong.html','earn-fenhong',{});
	});
});
