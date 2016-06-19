var host = H.common.host,
	listUrl = '/api/advertisements';
(function ($) {
	$.plusReady(function () {
		var mock = {
			listData: [
				{
					id: 1,
					cover_url: '/src/public/images/list-img1.png',
					title: '首彩葡萄酒',
					distribute_fee_limit: '1000',
					is_grab: true,
					rest_of_total: 100,
				},
				{
					id: 2,
					cover_url: '/src/public/images/list-img2.png',
					title: '首彩葡萄酒',
					distribute_fee_limit: '1000',
					is_grab: true,
					rest_of_total: 100,
				},
			]
		};
	
		var List = {
			render: function(datas, callback){
				var doms = datas.map(function(el, index){
					return List.domGenerate(el);
				});
				mui('#ss-list-hongbao')[0].innerHTML = doms.join('') || '<p style="text-align: center; color: #919191; padding-top: 10px;">暂无数据</p>';
				mui('.mui-content').on('click', '.list-item-hongbao', function (e) {
					e.preventDefault();
					var url = this.href;
					$.openWindow(url,url);
				});
				callback && callback();
			},
			domGenerate: function(setting) {
				var detail_url = host + '/wap/advertisement/detail/' + setting.id;
				var dom = '<a class="list-item-hongbao" data-id="'+ setting.id +'" href="'+ detail_url +'">'+
					'<img src="'+ setting.cover_url +'">'+
					'<div class="hongbao-info text1">'+ 
		            	'<span class="hongbao-name">'+setting.title+'</span>'+
		            	'<span class="hongbao-jine">最大红包￥' + setting.distribute_fee_limit + '元</span>'+
		        	'</div>'+
		        	'<div class="hongbao-info text2">'+
			            '<span class="hongbao-status">' + (setting.is_grab ? "可抢" : "不可抢")+ '</span>'+
			            '<span class="hongbao-num">还有' + setting.rest_of_total + '个红包</span>'+
			        '</div>'+
			        '<img src="../../public/images/home/hongbaoinfo_bg.png" class="hongbao-bottom-bg">'
				'</a>';
				return dom;
			}
		}
	
	//	List.render(mock.listData, function(){
	//		mui('.ss-content--list-hongbao').on('click', '.list-item-hongbao', function(e) {
	//			e.preventDefault();
	//			mui.openWindow({
	//				url: '/src/views/home/detail-hongbao.html'
	//			});
	//		});
	//	});
		
		getHongbaolist({
			city: '',
			catetory: '',
			page: 1,
			size: 1000
		});
		
		function getHongbaolist (params) {
			mui.ajax(host + listUrl,{
				data: params,
				dataType:'json',//服务器返回json格式数据
				type:'get',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					console.log(JSON.stringify(res));
					if(res.code === 0) {
						List.render(res.advertisements);
					} else {
						$.alert(res.message);
					}
				},
				error:function(xhr,type,errorThrown){
					$.alert(xhr.responseText);
				}
			});
		}
		
		mui(".mui-content").on('tap', 'a.ss-tab-item', function (e) {
			e.preventDefault();
			var category = this.getAttribute("data-id");
			var location = JSON.parse(plus.storage.getItem('location'));
			var params = {
				city: '',
				catetory: category,
				page: 1,
				size: 200
			}
			getHongbaolist(params);
		});
	});
})(mui);