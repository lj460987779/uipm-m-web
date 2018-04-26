$(function () {

	// 初始化节点
	var Node = {
		matchName: $("#mName"),
		matchNo: $("#mNo"),
		matchDate: $("#mDate"),
		matchPlace: $("#mPlace"),
		pothunter: $("#mPerson"),
		matchPrice: $("#mPrice"),
		btn: $("#affirpay").find('button')
	};

	// 获取报名赛事id
	var mid = localStorage.getItem('matchId'),
		userToken = localStorage.getItem('_TOKEN_');
	// ajax
	function apply() {
		$.ajax({
			url: api + 'match/getMatchInfo',
			type: 'post',
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				matchId: mid
			})
		})
		.done(function(data) {
			console.log(data);
			var res = data.data,
				date = res.startMatch,
				// 处理时间
				cYears = ((date)?(date.substring(0,4)):'')+"年",
				cMouth = ((date)?(date.substring(5,7)):'')+"月",
				cDay = ((date)?(date.substring(8,10)):'')+"日",
				// 处理后的新闻时间
				newTime = cYears+cMouth+cDay,
				money = res.matchPrice+'元';
			// 渲染
			Node.matchName.text(res.matchTag);
			Node.matchNo.text(res.matchId);
			Node.matchDate.text(newTime);
			Node.matchPlace.text(res.matchPlace);
			Node.pothunter.text(res.createUser);
			Node.matchPrice.text(money);

			// 加载动画
			$(function($) {
				var timer = setTimeout(function() {
					var $loadbox = $("#loadbox");
					$loadbox.addClass('fadeout');
					$loadbox.fadeOut(300).html('');
				}, 500);
			});
		})
		.fail(function() {
			console.log("error");
		});
	}
	apply();

	Node.btn.on('click', function(event) {
		wxpay();
		
	});

	// weixin
	function wxpay() {
		$.ajax({
			url: api + 'pay/toPay2',
			type: 'post',
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				matchRecordId: "554a0fd478fc4443bf5c94ab8245ae32",
				total_fee: 1
			}),
			headers: {
				"Authorization": `Bearer userToken`
			}
		})
		.done(function(data) {
			console.log(data);
		})
		.fail(function() {
			console.log("error");
		});
	}

	// 改变按钮背景颜色
	Node.btn.on('touchstart', function(event) {
		Node.btn.addClass("btnbgColor");
	}).on('touchend', function(event) {
		setTimeout(function() {
			Node.btn.removeClass("btnbgColor");
		}, 200);
	});

})