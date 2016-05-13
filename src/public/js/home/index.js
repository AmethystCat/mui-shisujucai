mui.init({
    subpages: [{
        id: 'list-hongbao',
        url: 'list-hongbao.html',
        styles: {
            top: '125px',
            bottom: '50px',
            bounce: 'vertical'
        }
    }]
});

mui.ready(function () {
    H.common.backQuit();	
    
    mui('.ss-bar-nav').on('click', '#city-locate', function () {
    	mui.openWindow({
			url: '/src/views/home/city-list.html',
			id: '/src/views/home/city-list.html'
		});
    });
});