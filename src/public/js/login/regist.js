mui.init({
	statusBarBackground: '#FAA519',
	styles:{
        top:'45px',
        bottom: '0px'
     }
});

mui.plusReady(function(){
	mui('.ss-login-form').on('click', '.ss-btn-resgist', function () {
		mui.openWindow({
			url: '/src/views/home/index.html'
		});
	});
});