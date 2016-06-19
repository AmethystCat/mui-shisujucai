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
		
		$(".pop-hongbao-c").on('click', '.mask', function (e) {
			H.removeClass($(".ss-content")[0], 'popblur');
			$(".pop-hongbao-c")[0].style.display = 'none';
		});
		
		$(".btn-submit-w").on('click', '#ss-btn-submitAns', function (e) {
			H.addClass($(".ss-content")[0], 'popblur');
			$(".pop-hongbao-c")[0].style.display = 'block';
		});
	});
	
})(mui);

