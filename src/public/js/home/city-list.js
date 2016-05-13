mui.ready(function () {
	var host = 'http://dev.laiweilai.com:8020',
		path = '/api/cities';
	
	mui('.locate-w').on('click', '#cities', function () {
		console.log(123);
		mui.ajax(host + path, {
			dataType: 'json',//服务器返回json格式数据
			type: 'get',//HTTP请求类型
			timeout: 10000,//超时时间设置为10秒；
			success: function(res){
				console.log(res);
//				if(res.code === 0) {
//					mui.openWindow({
//						url: '/src/views/home/index.html'
//					});
//				} else {
//					mui('.error-mes')[0].innerHTML = res.message;			
//				}			
			},
			error: function(xhr, type, errorThrown){
				console.log(xhr);
				console.log(type);
				console.log(errorThrown);
			}
		});
	}); 	
});
