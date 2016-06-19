(function (doc,win) {
    // 获取根html元素
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
    var recalc = function () {
	        var clientWidth = docEl.clientWidth > 580 ? 580 : docEl.clientWidth;
	        if ( !clientWidth ) return;
	        docEl.style.fontSize = ( clientWidth / 375 ) * 16 + 'px';
	    };
    if ( !doc.addEventListener ) return;
    win.addEventListener( resizeEvt , recalc , false );
    doc.addEventListener( 'DOMContentLoaded' , recalc , false );
    recalc();
})(document,window);