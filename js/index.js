$(function(){
	window.api = 'api/'  // 定义全局ajax变量
    // 导航
    var $btn = $(".menu-button"),
        $nav = $(".nav"),
        navLeft = $nav.offset().left,
        $app = $("#app"),
        //appWidth = $app.width(),
        $drop = $(".nav-drop");
    $btn.on('click', function () {
        shown();
    })
    $drop.on('click', function () {
        hidden();
    })
    // nav移出
    function shown() {
        if(navLeft < 0){
            $nav.addClass("navShow");
            $app.addClass("appMove");       
        }
    }
    // nav移入
    function hidden() {
        var navLeft = $nav.offset().left;
        if(navLeft == 0){
            $nav.removeClass("navShow");
            $app.removeClass("appMove");            
        }
    }
    
    // li背景颜色
    var $li = $(".olist").find("li");
	$.each($li, function() {
		var $index = $(this), _index = $index.index();
		// console.log(_index);
		$index.on("touchstart", function() {
			$index.addClass("libg").siblings().removeClass("libg");
		}).on("touchend", function() {
			$index.removeClass("libg");
		});
	});


	// 图片路径
	var img1 = ["./img/tencent.png", "./img/weixin.png", "./img/sina.png"],
		img2 = ["./img/seltencent.png", "./img/selwx.png", "./img/selsina.png"];
	// 点击更换img路径
	var $linkLi = $("#links").find("li");		
	$linkLi.each(function(){
		var _index = $(this).index(),
			$Li = $(this),
			$img = $Li.find("a").find("img");
		$Li.on("touchend", function(){
			$img.attr({ src: img2[_index] });			
			// 判断src
			if($img.attr("src") === img2[_index]){
				setTimeout(function(){
		            $img.attr({ src: img1[_index] });
	          	},500);
			}
		})			
	})
	
	// 点击弹出微信公众号二维码
	var $wxli = $("#links").find(".wxli"),
		$wxmark = $("#wxmark")
		$wxbox = $(".wxmark-box");	
	$wxli.on("touchend", function(){
		$wxmark.fadeIn(200);
	})	
	$wxmark.on("touchend", function(){
		$wxmark.fadeOut(200);	
	})

	var $logOut = $('#logout'),
		$outBtn = $logOut.find('button'),
		$rla = $('.reglogin').find('a'),
		accessToken = localStorage.getItem('_TOKEN_');
	// 判断是否已登录，后续跳转是否为个人中心页
	function isLogin() {
		if (accessToken) {
			$logOut.addClass('hiddenLog');
			$rla.attr('href', 'personal.html');
		}
	}
	isLogin();
	// 退出登录
	$outBtn.on('click', function(event) {
		outLogin();
		$logOut.removeClass('hiddenLog');
		window.location.href = "user.html";
	});
	function outLogin() {
		localStorage.clear();
	}
	// 是否登录，来进行报名
	var $applybtn = $("#isapply");
	function isApply(token) {
		if (token) {
			window.location.href = "perfect-data.html"
		}else {
			window.location.href = "user.html"
		}
	}
	$applybtn.on('click', function(e) {
		isApply(accessToken)
	})
	// 加载动画
	$(function($) {
		var timer = setTimeout(function() {
			var load = $("#loading");
			load.addClass('fadeout');
			load.fadeOut(300).html('');
		}, 500);
	});

})
