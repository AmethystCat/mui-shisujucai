mui.init({
    subpages: [{
        id: 'list-hongbao',
        url: 'list-hongbao.html',
        styles: {
            top: '130px',
            bottom: '50px',
            bounce: 'vertical'
        }
    }]
});

mui('.ss-bar-tab').on('tap', '.mui-tab-item', function(e){
	e.preventDefault();
	var href = this.href;
	mui.openWindow({
		url: href
	});
});
