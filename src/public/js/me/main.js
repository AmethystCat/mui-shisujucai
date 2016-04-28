var rootPath = '/src/views/'
mui.init({
	styles: {
		top: 0,
		bottom: '50px'
	}
});
mui.ready(function () {
	mui('.me-info-w').on('click', '.name', function () {
		mui.openWindow({
			url: rootPath + 'me/info.html',
			id: rootPath + 'me/info.html'
		});
	});
});