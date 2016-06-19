mui.ready(function () {
	var host = H.common.host,
		path = '/api/cities',
		model = {};
	
	var util = {
		getFirstLetter : function(str) {
			return	str.slice(0, 1);
		}
	};
	mui.plusReady(function(){
		mui.ajax(host + path, {
			data: {},
			dataType: 'json',//服务器返回json格式数据
			type: 'get',//HTTP请求类型
			timeout: 10000,//超时时间设置为10秒；
			success: function(res){
				console.log(JSON.stringify(res.cities));
				if(res.code === 0) {
					model.cities = res.cities;
					cityListRender(res.cities);
				} else {
					mui.alert(res.message);		
				}			
			},
			error: function(xhr, type, errorThrown){
				mui.alert(xhr.responseText);
			}
		});
		
		mui('body').on('click', '.mui-indexed-list-item', function () {
			var data = {
				city: this.innerHTML,
				id: this.getAttribute('data-cid')
			};
			plus.storage.setItem('location',JSON.stringify(data));
			plus.webview.getWebviewById('home-index').reload();
			mui.back();
		});
		
		function cityListRender(data) {
			var firstLetter = null,
				domStr = '';
			data.forEach(function(el, index) {
				var temp = util.getFirstLetter(el.pinyin);
				if(firstLetter && (firstLetter === temp)) {
					domStr += listItemStr(el.name, el.pinyin, el.id, index);
				} else {
					firstLetter = temp;
					domStr += listGroupStr(firstLetter);
				}
			});
			
			mui('#city_list')[0].innerHTML = domStr;
			
			function listGroupStr(str) {
				return '<li data-group="'+ str +'" class="mui-table-view-divider mui-indexed-list-group">' + str + '</li>';
			}
			function listItemStr(str, p, cid, index) {
				return '<li data-index="'+ index +'" data-cid="'+ cid +'" data-value="'+ p +'" data-tags="'+ p +'" class="mui-table-view-cell mui-indexed-list-item">' + str + '</li>';
			}
		}
		
		plus.geolocation.getCurrentPosition(function (position) {
			console.log(JSON.stringify(position));
			mui('#city')[0].innerHTML = position.address.city;
		}, function (mes) {
			console.log(JSON.stringify(mes));
		});
	});
});
