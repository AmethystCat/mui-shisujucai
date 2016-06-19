var rootPath = '/src/views/';

var host = H.common.host,
	path = '/api/user/logout',
	path2 = '/api/user/profile';
	
;(function ($) {
	var userInfo = null;
	
	$.init({
		styles: {
			top: 0,
			bottom: '55px'
		}
	});
	
	$.ready(function () {
		H.common.backQuit();
		$.plusReady(function () {
			var userInfo = JSON.parse(plus.storage.getItem('userinfo')) || {};
			render(userInfo);
			H.common.getGoodsDetail();
			// 控制跳转
			// -----------------------------------------------------------------
		   	mui('.ss-content').on('click', '#gettudi', function () {
		   		mui.openWindow({
		   			url: rootPath + 'me/getTuDi.html',
		   			id: 'me-gettudi'
		   		});
		   	});
		   	mui('.ss-content').on('click', '#help', function () {
		   		mui.openWindow({
		   			url: rootPath + 'me/help.html',
		   			id: 'me-help'
		   		});
		   	});	
		   	
		   	mui('.ss-content').on('click', '#jczc', function () {
		   		mui.openWindow({
		   			url: rootPath + 'me/tixian.html',
		   			id: 'me-tixian'
		   		});
		   	});
		   	
		   	$('.me-info-w').on('click', '.name', function () {
				$.openWindow({
					url: rootPath + 'me/info.html',
					id: 'me-info'
				});
			});
			
			$("body").on('click', '.btn-order', function(){
				$.openWindow({
					url: rootPath + 'wifi/myOrder.html',
					id: 'me-order'
				});
			});
			
			$("body").on('click', '#to-setting', function(){
				$.openWindow({
					url: rootPath + 'me/setting-main.html',
					id: 'me-setting'
				});
			});
		   	// end----------------------------------------------------------------
		   	
		   	function render(res) {
				if(!res) return;
				var $level = $("#level")[0],
					$avatar = $("#avatar")[0],
					$nickName = $("#nickName")[0],
					$phone = $("#phone")[0],
					$account_balance = $("#account_balance")[0];
					
				$("#nickName")[0].innerHTML = res.nick_name || '设置昵称';
				$("#account_balance")[0].innerHTML = '￥' + res.account_balance || 0; 
				$("#phone")[0].innerText = res.mobile;
			}
		});	
		
		
		
		$('.section-menus-w').on('click', '.ss-btn-logout', function () {
			$.ajax(host + path,{
				data:{},
				dataType:'json',//服务器返回json格式数据
				type:'get',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					if(res.code === 0) {
						$.openWindow('/src/views/login/login.html','login',{});
					} else {
						$.alert(res.message);
					}
				},
				error:function(xhr,type,errorThrown){
					$.alert(xhr.responseText);
				}
			});
		});
		
		
	});
	
}(mui));
