var host = H.common.host,
	path = '/api/goods/wifi/detail',
	path2 = '/api/order/add';
(function ($) {
	var model = {};
		model.order = {};
		model.goods_detail = {};
		
	// 初始化	
	$.init({
		styles:{
      		top: '45px',
        	bottom: '50px'
      }
	});
	
	$.ready(function () {
		$.plusReady(function(){
			var userinfo = JSON.parse(plus.storage.getItem('userinfo')),
				address = userinfo.address;
			$(".shouhuoren")[0].innerHTML = address && address.contact || '收货人：未设置';
			$(".phone")[0].innerHTML = address && address.phone || '' ;
			$(".address")[0].innerHTML = address && (address.province + address.city + address.district + address.full) || '';
			
			$(".mui-content").on('click', '.inner', function () {
				mui.openWindow('/src/views/me/info-shouhuo-modify.html','me-shouhuo',{})
			});
			
			mui.ajax(host + path,{
				data:{},
				dataType:'json',//服务器返回json格式数据
				type:'get',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					console.log(JSON.stringify(res));
					if(res.code === 0) {
						model.goods_detail = res.data;
						render(model.goods_detail);
					} else {
						$.alert(res.message);
					}
				},
				error:function(xhr,type,errorThrown){
					console.log(errorThrown);				
				}
			});
			
			$(".mui-content").on('keyup', '.wifi-num', function () {
				console.log(123);
				var value = this.value || 0;
				render(model.goods_detail, {num: value});
			});
			
			$(".to-pay-w").on('click', '.btn-pay', function () {
				if(!$(".wifi-num")[0].value) {
					$.alert('请填写数量再支付');
					return;
				}
				if(!userinfo.address) {
					$.alert('请设置收货人信息');
					return
				}
				
				var order = model.order;
					
					order.goods_id = model.goods_detail.id;
					order.mobile = userinfo.mobile;
					order.contacts = userinfo.address.contact || '';
					order.goods_number = $(".wifi-num")[0].value;
					order.remark = '';
					
				
				mui.ajax(host + path2,{
					data:{
						goods_id: order.goods_id,
						mobile: order.mobile,
						contacts: order.contacts,
						price: order.total_price,
						remark: order.remark,
						goods_number: order.goods_number
					},
					dataType: 'json',//服务器返回json格式数据
					type: 'post',//HTTP请求类型
					timeout: 10000,//超时时间设置为10秒；
					success: function(res){
						console.log(JSON.stringify(res));
						if(res.code === 0){
							mui.openWindow({
								url: '/src/views/wifi/pay.html',
								id: 'wifi-pay',
								extras:{
				      				goods_detail: model.goods_detail
		    					}
							});
						}
					},
					error:function(xhr,type,errorThrown){
						mui.alert(xhr.responseText);
					}
				});
			});
		});
		
//		$("body").on('click', '.btn-pay', function () {
//			if (!model.goods_detail) return;
//			mui.openWindow({
//				url: '/src/views/wifi/pay.html',
//				id: 'wifi-pay',
//				extras:{
//    				goods_detail: model.goods_detail
//  			}
//			});
//		});

	});
	
	function render(goodsData, option) {
		if(!goodsData) return;
		var data = $.extend({}, goodsData, option || {});
		$(".wifi-thumbnail")[0].src 	 = host + data.thumbnail_url;
		$(".wifi-name")[0].innerHTML 	 = data.name;
		$(".wifi-category")[0].innerHTML = data.category;
		$(".unit-price")[0].innerHTML 	 = '￥' + data.unit_price;
		$(".wifi-num")[0].value 		 = data.num || '';
		$(".total-price")[0].innerHTML   = setTotal(data.unit_price, $(".wifi-num")[0].value || 0, data.freight);
		$(".total-price")[1].innerHTML   = setTotal(data.unit_price, $(".wifi-num")[0].value || 0, data.freight) + '元';
		$(".wifi-freight")[0].innerHTML  = data.freight;
		$(".quantity")[0].innerHTML 	 = $(".wifi-num")[0].value || 0;
		
		
		function setTotal(unit, num, freight){
			if (!num) return 0;
			
			model.order.total_price 	 = unit * num + freight;
//			model.order.total_price 	 = 0.01; //便于测试
//			return model.order.total_price + '.00';
			return model.order.total_price;
		}
	}
})(mui)
