;(function ($) {
	$.init();
	$.ready(function () {
		// model
		var model = (function () {
			var ans = null;
			return {
				get: function () {
					return ans;
				},
				set: function (val) {
					ans = val;
				}
			};
		}());
		
		$(".test-answer").on('click', 'a', function (e) {
			var _this = this;
			$.each($(".test-answer a"),function (index, el) {
				H.removeClass(el, 'on');
			});
			H.addClass(_this, 'on');
			model.set(_this.innerHTML);
		});
		
		$(".pop-hongbao-c__detail2").on('click', '.mask', function (e) {
			H.removeClass($(".ss-content")[0], 'popblur');
			$(".pop-hongbao-c")[0].style.display = 'none';
		});
		
//		$(".btn-submit-w").on('click', '#ss-btn-submitAns', function (e) {
//			H.addClass($(".ss-content")[0], 'popblur');
//			$(".pop-hongbao-c")[0].style.display = 'block';
//		});
		$(".ss-content").on('click', '#icon_hongbao', function () {
			H.addClass($(".ss-content")[0], 'popblur');
			$(".pop-hongbao-c__detail2")[0].style.display = 'block';
			pause_resume();
		});
	});
	
	//漂浮广告
	var xPos = 0,
		yPos = 200,
		step = 1,
		delay = 30,
		width = 0,
		height = 0, 
		Hoffset = 0, 
		Woffset = 0,
		yon = 0,
		xon = 0, 
		pause = true, 
		interval,
		img1 = $("#icon_hongbao")[0];
		img1.style.top = yPos;
	function changePos(){
		width = window.innerWidth; //窗口的高
		height = window.innerHeight; //窗口的宽
		
		Hoffset = img1.offsetHeight; //自身的高
		Woffset = img1.offsetWidth; //自身的宽
		
		img1.style.left = xPos + 'px'; 
		img1.style.top = yPos + 'px'; 
		
		if (yon) {
			yPos = yPos + step;
		}else {
			yPos = yPos - step;
		}
		
		if (yPos < 0) {
			yon = 1;
			yPos = 0;
		}
		
		if (yPos >= (height - Hoffset)) {
			yon = 0;
			yPos = (height - Hoffset);
		}
		
		if (xon) {
			xPos = xPos + step;
		}
		
		else {
			xPos = xPos - step;
		}
		
		if (xPos < 0) {
			xon = 1;
			xPos = 0;
		}
		
		if (xPos >= (width - Woffset)) {
			xon = 0;
			xPos = (width - Woffset);
		}
	} 
	
	function start() { 
//		img1.visibility = "visible"; 
		interval = setInterval(function () {
			changePos();
		}, delay); 
	} 
	function pause_resume() { 
		if(pause) { 
			clearInterval(interval); 
			pause = false;
		}else { 
			interval = setInterval('changePos',delay); 
			pause = true; 
		} 
	} 
	start(); 
	
})(mui);

