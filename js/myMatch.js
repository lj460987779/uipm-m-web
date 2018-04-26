$(function() {

	// 初始化节点
	var Node = {
		match: $("#myMatch")
	}; 

	// ajax
	var getId = localStorage.getItem("_USERID_"),
		localDate = new Date().getTime();  // 时间戳
	// 获取用户信息
	function getUserInfo() {
		$.ajax({
			url: api + 'user/getUserInfo',
			type: 'post',
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				userId: getId
			})
		})
		.done(function(data) {
			var str = '',
				Data = data.data,
				matchArr = Data.getMatchResponse,
				arrlen = matchArr.length;

			$.each(matchArr, function(index, val) {
				var rank = (val.rank !== null)?val.rank:'无成绩', // 成绩
					date = val.startMatch, // 时间
					// 处理时间
					Years = ((date) ? (date.substring(0, 4)) : '') + "年",
					Mouth = ((date) ? (date.substring(5, 7)) : '') + "月",
					Day = ((date) ? (date.substring(8, 10)) : '') + "日",
					// 举办时间
					matchTime = Years+Mouth+Day,
					Price = `${val.matchPrice}元`, //费用
					subDate = (date)?date.substring(0, 10):'',
					newDate = subDate.replace(/-/g, '/'),
					startDate = new Date(newDate).getTime(),
					type = (localDate > startDate)?'已结束':'即将开始'; // 事件类型

				// 判断我的赛事是否为零
				if ((val.matchTitle !== null) && (val.matchPrice !== null)) {
					// 拼接字符串
					str += "<div class='match-done'>"+
				              	"<div>"+val.matchTitle+"</div>"+
				              	"<div><label>举办地点</label>:<span>"+val.matchPlace+"</span></div>"+
				              	"<div><label>成 绩</label>:<span>"+rank+"</span></div>"+
				              	"<div><label>举办时间</label>:<span>"+matchTime+"</span></div>"+
				              	"<div><label>费 用</label>:<span>"+Price+"</span></div>"+
				              	"<div id='type'>"+type+"</div>"+
				          	"</div>";
				} else if ((val.matchTitle === null) && (val.matchPrice === null)) {
					str = `<div class='Odata'>暂无数据<i class='iconfont icon-nodata'></i></div>`
				}
			});
			// 渲染
			Node.match.fadeIn(300).append(str);
			// 判断事件类型，来改变标签背景颜色
			if ($("#type").text() == '即将开始') {
				$(".match-done").addClass("match-will");
			}

			// 加载动画
			$(function($) {
				var timer = setTimeout(function() {
					var $loadbox = $("#loadmsg");
					$loadbox.addClass('fadeout');
					$loadbox.fadeOut(300).html('');
				}, 500);
			});	
		})
		.fail(function() {
			console.log("error");
		});
	}
	getUserInfo();

})
