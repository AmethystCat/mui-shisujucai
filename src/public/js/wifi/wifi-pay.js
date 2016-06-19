var host = H.common.host,
	path = '/api/recharge/add',
	path2 = '/api/order/list',
	path3 = '/api/payment/alipay/pay-prepare',
	path4 = '/api/payment/alipay/balance-pay';
	
(function ($) {
	var model = {},
		self = null;
		
	$.init({
		styles:{
      		top: '45px',
        	bottom: '0px'
      }
	});
	
	$.plusReady(function () {
		self = plus;
		var thisview = plus.webview.currentWebview(),
			account_balance = JSON.parse(plus.storage.getItem('userinfo')).account_balance || 0;
			
		console.log(JSON.stringify(thisview.goods_detail));
		$("#account_balance")[0].innerHTML = '￥' + account_balance + '元';
		
		// 获取订单列表
		// --------------------------------------
		$.ajax(host + path2,{
			data:{},
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(res){
				console.log(JSON.stringify(res));
				if(res.code === 0) {
					var lastOrder = res.orders[res.orders.length-1];
					// 存入订单号
					model.order_no = lastOrder.order_no;
					render([lastOrder]);
				}
			},
			error:function(xhr,type,errorThrown){
				mui.alert(xhr.responseText);
			}
		});
			
		// 余额充值
		//------------------------------------
		$(".mui-content").on('click', '#btn-recharge', function() {
			var rn = /^[0-9]+$/gi,
				$rinput = $('#input-recharge')[0];
				
				
//			if (!rn.test($rinput.value)) {
//				$.alert('请输入整数');
//				$rinput.value = '';
//				return;
//			}
			
			$.ajax(host + path, {
				data:{
					price: $rinput.value
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					console.log(JSON.stringify(res));
					if(res.code === 0) {
						aliPay(res.order_no);
					} else {
						$.alert(res.message || '充值失败');
					}
				},
				error:function(xhr, type, errorThrown){
					$.alert(xhr.responseText);
				}
			});
		});
		
		// 支付宝支付/余额支付
		//------------------------------------
		$("body").on('click', '.btn-pay-wifi', function () {
			var payYue = $("#pay-yue")[0];
			if(payYue.checked) {
				balancePay(model.order_no);
			} else {
				aliPay(model.order_no);	
			}
		});
		
		
		// 工具函数
		// -------------------------
		function balancePay(order_no){
			$.ajax(host + path4,{
				data:{
					order_no: order_no
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					console.log(JSON.stringify(res));
					if(res.code === 0) {
						$.toast(res.message || '支付成功');
						H.common.getUserInfo(function () {
//							self.webview.currentWebview().reload();
							$.openWindow('/src/views/wifi/main.html','wifi-main',{});
						});
					} else {
						$.alert(res.message);
					}
				},
				error:function(xhr,type,errorThrown){
					$.alert(xhr.responseText);
				}
			});
		}
		
		function aliPay(order_no){
			$.ajax(host + path3,{
				data:{
					order_no: order_no
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					console.log(JSON.stringify(res));
					if(res.code === 0) {
						pay(res.payment_data);	
					} else {
						mui.alert(res.message);
					}
				},
				error:function(xhr,type,errorThrown){
					mui.alert(xhr.responseText);
				}
			});
		}
		
		// 唤起支付宝
		function pay(params) {
			 console.log("调起支付宝支付");
			//定义支付通道
	        var channel = null;
	        //获取支付通道
	        getChannels();
	        //获取支付通道的方法
	         
	        function getChannels() 
	        {
	            plus.payment.getChannels(function(channels) {
	                for (var i = 0; i < channels.length; i++) {
	                    if (channels[i].id == "alipay") {
	                        channel = channels[i];
	                    }
	                }
	                plus.ui.toast("使用支付方式:" + channel.id);
	                // 调起支付宝
	                payali(params);
	                
	            }, function(e) {
	                plus.ui.toast("获取支付通道失败!");
	                console.log("获取支付通道失败!");
	            })
	        }
	        
	        function payali(obj) {
	        	var res_str = obj;
	        	console.log(obj);
//	        	var test = "_input_charset=\"utf-8\"&body=\"description\"&it_b_pay=\"-24408507.216667m\"&notify_url=\"http%3A%2F%2Fdev.laiweilai.com%3A8020%2Fapi%2Fpayment%2Falipay%2Fpay-notify\"&out_trade_no=\"SSUROU1605291433336QILBS\"&partner=\"2088221656365491\"&payment_type=\"1\"&seller_id=\"chenfang@shisuhui.cn\"&service=\"mobile.securitypay.pay\"&subject=\"subject\"&total_fee=\"0.01\"&sign=\"hNYqzMB%2F1oVOXIH6RJdXM01Krv0XtGIrHT5KpP33VSqzn2WRzPns5%2Bcilrf6G1DdcyQyg%2BBnIZqRnZ8F1acdaIjCT2f3kM70safbVW08%2FguhMja0bLD1RvkenCGTb%2FNZ7wI%2Bhxk1ODdydcFmWVixjCOXtJx2sRMveWLT7l6vLxI%3D\"&sign_type=\"RSA\"";
	        	plus.payment.request(channel, obj, successCB, errorCB);
	        }
	        function successCB(data){
	        	console.log(JSON.stringify(data));
	        	$.toast(data.description || '支付成功');
	        	H.common.getUserInfo(function(){
	        		self.webview.currentWebview().reload();
	        	});
	        }
	        function errorCB(data){
	        	console.log(JSON.stringify(data));
	        	$.alert(data.description);
	        }
	        
		}
		
		// 订单了列表渲染
		function render(data) {
			if(!data) return;
			var doms = '';
			var strs = data.map(function(el){
				return createDom(el);
			});
			
			doms = strs.join('');
			
			$(".order-info-w")[0].innerHTML = doms;
			
			function createDom(data) {
				return ('<div class="product-thumb">' + 
					'<img src="' + host + thisview.goods_detail.thumbnail_url + '" class="img-hr" />' + 
					'</div>' +
					'<div class="order-info">' + 
						'<h4>' + thisview.goods_detail.name + '</h4>' +
						'<div class="num-location-w">' +
							'<span>共计' + data.goods_number + '件商品</span>' +
							'<span>2016-02-13 18:00</span>' +
						'</div>' +
						'<div class="ordernum-time-w">' +
							'<span>订单编号：' + data.order_no + '</span>' +
						'</div>' +
					'</div>' +
					'<div class="money-w">' +
						'<span>应付金额：<span><i>￥'+ data.price +'</i></span></span>' +
					'</div>'
				);
			} 
		}
	});
})(mui)
