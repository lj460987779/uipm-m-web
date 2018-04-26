$(function () {
	// 自动登录倒计时
	var time = 5,
		$time = $('#time');
	function settime(obj) {
		obj = $time
		if (time == 0) {
			obj.text("("+ time +")");
			window.location.href = "personal.html";
			return;
		}else {
			obj.text("("+ time +")");
			time--;
			setTimeout(function() {
        		settime();
  			},1000)
		}
	}
	settime(this);
	
	var account = localStorage.getItem('account'),
		regToken = localStorage.getItem('regToken'),
		Id = localStorage.getItem('ID'); // 初始化内存用于传参

  	function autoLogin(tel, Token, id) { // 自动登录
	    var logintel  = localStorage.setItem("logintel", tel),
    		usertoken = localStorage.setItem("tokenInfro", Token),
    		userid = localStorage.setItem("userId", id);
  	}
  	autoLogin(account, regToken, Id);

	// 加载动画
	$(function($) {
		var timer = setTimeout(function() {
			var $loadbox = $("#loadbox");
			$loadbox.addClass('fadeout');
			$loadbox.fadeOut(300).html('');
		}, 500);
	})

})
