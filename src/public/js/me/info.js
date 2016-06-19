var rootPath = '/src/views/'
mui.init({
	styles: {
		top: '45px',
		bottom: '50px'
	}
});

mui.ready(function () {
	
	mui.plusReady(function () {
		var userInfo = JSON.parse(plus.storage.getItem('userinfo'));
		console.log(plus.storage.getItem('userinfo'));
		render(userInfo);
		
		// 跳转
		// -------------------------------------------------
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
		
		mui('.mui-table-view').on('click', '#m-name', function () {
			mui.openWindow({
				url: rootPath + 'me/info-modify.html',
				id: rootPath + 'me/info-modify.html'
			});
		});
		
		mui('.mui-table-view').on('click', '#m-sex', function () {
			mui.openWindow({
				url: rootPath + 'me/info-modify.html',
				id: rootPath + 'me/info-modify.html'
			});
		});
		
		mui('.mui-table-view').on('click', '#m-birth', function () {
			mui.openWindow({
				url: rootPath + 'me/info-modify.html',
				id: rootPath + 'me/info-modify.html'
			});
		});
		
		mui('body').on('tap', '#btn-back', function (e) {
			e.preventDefault();
			console.log(plus.webview.getWebviewById('me-main'));
			plus.webview.getWebviewById('me-main').reload();
			mui.back();
		});
		
		// end--------------------------------------------
	});
	
	function render(data) {
		var avatar = mui('#avatar')[0],
			phone = mui('#phone')[0],
			nick_name = mui('#nick_name')[0],
			gender = mui('#gender')[0],
			birthday = mui('#birthday')[0],
			address = mui('#address')[0],
			level = mui('#level')[0];
			
		phone.innerHTML = data.mobile;
		nick_name.innerHTML = data.nick_name || '请修改你的用户名';
		gender.innerHTML = (data.gender == 0) ? '男' : '女';
		birthday.innerHTML = data.birth || '请添加你的生日';
		address.innerHTML = data.address && (data.address.province + data.address.city + data.address.district + data.address.full) || '请添加收货地址';
		level = (data.level == 0) ? '普通会员' : 'vip会员';
	}
});