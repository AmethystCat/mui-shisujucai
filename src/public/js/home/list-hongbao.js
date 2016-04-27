var host = 'http://dev.laiweilai.com:8020',
	listUrl = '/api/advertisements';
	
var mock = {
	listData: [
		{
			name: '首彩葡萄酒',
			money: 2000,
			status: '可抢',
			num: 182
		},
		{
			name: '时速无线',
			money: 4000,
			status: '可抢',
			num: 100
		}
	]
};

var List = {
	render: function(datas, callback){
		var doms = datas.map(function(el, index){
			el.index = index%3;
			return List.domGenerate(el);
		});
		mui('#ss-list-hongbao')[0].innerHTML = doms.join('');
		
		callback && callback();
	},
	domGenerate: function(setting) {
		var dom = '<a class="list-item-hongbao">'+
			'<img src="../../public/images/list-img'+ setting.index +'.png">'+
			'<div class="hongbao-info text1">'+
            	'<span class="hongbao-name">'+setting.name+'</span>'+
            	'<span class="hongbao-jine">最大红包￥' + setting.money + '元</span>'+
        	'</div>'+
        	'<div class="hongbao-info text2">'+
	            '<span class="hongbao-status">' + setting.status + '</span>'+
	            '<span class="hongbao-num">还有' + setting.num + '个红包</span>'+
	        '</div>'+
		'</a>';
		return dom;
	}
}

List.render(mock.listData, function(){
	mui('.ss-content--list-hongbao').on('click', '.list-item-hongbao', function(e) {
		e.preventDefault();
		mui.openWindow({
			url: '/src/views/home/detail-hongbao.html'
		});
	});
});

//mui.ajax(url: host + listUrl, {
//	
//});