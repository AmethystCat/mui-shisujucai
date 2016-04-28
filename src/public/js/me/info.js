var rootPath = '/src/views/'
mui.init({
	styles: {
		top: '45px',
		bottom: '50px'
	}
});

mui.ready(function () {
	mui('.ss-bar-nav').on('click', '#btn-edit-info', function () {
		mui.openWindow({
			url: rootPath + 'me/info-modify.html',
			id: rootPath + 'me/info-modify.html'
		});
	});
	
	mui('.mui-table-view').on('click', '.info-item-shouhuo', function () {
		mui.openWindow({
			url: rootPath + 'me/info-shouhuo-modify.html',
			id: rootPath + 'me/info-shouhuo-modify.html'
		});
	});
});