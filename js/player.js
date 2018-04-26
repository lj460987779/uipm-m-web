$(function () {

    // 初始化节点
	var $box = $("#plist");

    // dropload
    // 页数
    var page = -1, refpage = 0;
    // 每页展示10个
    var size = 10;

    $("#playerbox").dropload({
        scrollArea : window,
        loadUpFn: function(me) {
            $.ajax({
                url: api + 'athletes/getAthletesList',
                type: 'POST',
                dataType: 'json',
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify({
                    pageSize: size,
                    pageNo: refpage
                })
            })
            .done(function(data) {
                // console.log(data);
                var player = "",
                    Data = data.data.list;
                // console.log(Data);
                $.each(Data, function(index, val) {
                    var defaultImg = (val.txUrl === null || val.txUrl === '') ? './img/Athletes.png' : val.txUrl, // 默认头像
                        // 默认国旗
                        gqflag = (val.gqUrl === null || val.gqUrl === '') ? './img/flag.jpg' : val.gqUrl,
                        // 判断性别，显示"男/女"
                        gender = (val.gender === 1) ? "男" : "女";
                    // 拼接字符串
                    player += "<div class='player'>" +
                                "<a href='player-detail.html?" + val.athletesId + "' class='f-left'>" + 
                                "<img src='" + defaultImg + "' alt=''>" + 
                                "</a>" +
                                "<a href='javascript:;' class='f-right'>" +
                                "<div class='p1'>" +
                                "<span>" + val.athletesName + "</span>" +
                                "<img src='" + gqflag + "' alt=''>" +
                                "</div>" +
                                "<div class='p2'>" +
                                "<span>性别: " + gender + "</span>" +
                                "</div>" +
                                "<div class='p3'>" +
                                "<span>UIPM证件号: " + val.uipmCode + "</span>" +
                                "</div>" +
                                "<div class='p4'>" +
                                "<span>国家: " + val.countryName + "</span>" +
                                "</div>" +
                                "</a>" +
                                "</div>";
                });
                // 延时加载
                setTimeout(function(){
                    $box.fadeIn(500).html(player);
                    // 每次数据加载完，必须重置
                    me.resetload();
                    // 重置页数，重新获取loadDownFn的数据
                    page = 0;
                    // 解锁loadDownFn里锁定的情况
                    me.unlock();
                    me.noData(false);
                }, 500);  
            })
            .fail(function() {
                console.log("error");
                // 即使加载出错，也得重置
                me.resetload();
            });
        },
        loadDownFn: function(me) {
            that = this;
            page++;
            $.ajax({
                url: api + 'athletes/getAthletesList?page='+page+'&size='+size,
                type: 'POST',
                dataType: 'json',
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify({
                    pageSize: size,
                    pageNo: page
                })
            })
            .done(function(data) {
                // console.log(data);
                var player = "",
                    Data = data.data.list,
                    arrLen = Data.length;
                // console.log(arrLen);
                if (arrLen > 0) {
                    $.each(Data, function(index, val) {
                        var defaultImg = (val.txUrl === null || val.txUrl === '') ? './img/Athletes.png' : val.txUrl, // 默认头像
                            // 默认国旗
                            gqflag = (val.gqUrl === null || val.gqUrl === '') ? './img/flag.jpg' : val.gqUrl,
                            // 判断性别，显示"男/女"
                            gender = (val.gender === 1) ? "男" : "女";
                        // 拼接字符串
                        player += "<div class='player opacity'>" +
                                    "<a href='player-detail.html?" + val.athletesId + "' class='f-left'>" + 
                                    "<img src='" + defaultImg + "' alt=''>" + 
                                    "</a>" +
                                    "<a href='javascript:;' class='f-right'>" +
                                    "<div class='p1'>" +
                                    "<span>" + val.athletesName + "</span>" +
                                    "<img src='" + gqflag + "' alt=''>" +
                                    "</div>" +
                                    "<div class='p2'>" +
                                    "<span>性别: " + gender + "</span>" +
                                    "</div>" +
                                    "<div class='p3'>" +
                                    "<span>UIPM证件号: " + val.uipmCode + "</span>" +
                                    "</div>" +
                                    "<div class='p4'>" +
                                    "<span>国家: " + val.countryName + "</span>" +
                                    "</div>" +
                                    "</a>" +
                                    "</div>";
                    });
                } else {
                    // 锁定
                    me.lock();
                    // 无数据
                    me.noData();
                }
                // 延时加载
                setTimeout(function (){
                    $box.append(player);
                    // 每次数据加载完，必须重置
                    me.resetload(); 
                }, 500);

                // 加载动画
                setTimeout(function() {
                    $(function($) {
                        var $loadbox = $("#loadmsg");
                        $loadbox.addClass('fadeout');
                        $loadbox.fadeOut(300).html('');
                    })
                }, 500);
            })
            .fail(function() {
                console.log("error");
                // 即使加载出错，也得重置
                me.resetload();
            });
        },
        threshold : 50
    });

})
