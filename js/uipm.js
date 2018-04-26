$(function () {

	var swiper = new Swiper('.list-box', {
		slidesPerView: "auto"
	});
	
	var $topli = $('.list-box-top').find('.swiper-slide'),
      	$sects = $(".sectionbox").find("section");
	//选项卡
	$.each($topli, function(index, val) {
		var index = $(this).index();
		$(this).on('click', function(event) {
			$(this).addClass("bar").siblings().removeClass("bar");
        	$sects.eq(index).show().siblings().hide();
		});
	});

	// 加载动画
	setTimeout(function() {
		$(function($) {
			var $loadbox = $("#loadmsg");
			$loadbox.addClass('fadeout');
			$loadbox.fadeOut(300).html('');
		})
	}, 500);
})
