var host = H.common.host,
	path = '/api/advertisements',
	path2 = '/api/user/profile';
	
mui.init({
    subpages: [{
        id: 'list-hongbao',
        url: 'list-hongbao.html',
        styles: {
            top: '44px',
            bottom: '50px',
            bounce: 'vertical'
        }
    }]
});

mui.ready(function () {
	console.log(123);
    H.common.backQuit();	
    
    mui('.ss-bar-nav').on('click', '#city-locate', function () {
    	mui.openWindow({
			url: '/src/views/home/city-list.html',
			id: '/src/views/home/city-list.html'
		});
    });
    
    mui.plusReady(function () {
    	var selectLocate = JSON.parse(plus.storage.getItem('location'));
   		H.common.getUserInfo();
   		plus.geolocation.getCurrentPosition(function (position) {
			console.log(JSON.stringify(position));
			mui('#city-locate')[0].innerHTML = position.address.city;
			if(selectLocate) {
				mui('#city-locate')[0].innerHTML = selectLocate.city;
			}
		}, function (mes) {
			console.log(JSON.stringify(mes));
			if(selectLocate) {
				mui('#city-locate')[0].innerHTML = selectLocate.city;
			}
		});
    });
});