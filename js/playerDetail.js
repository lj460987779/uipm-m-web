$(function () {
	
	var $box = $("#box"),
        playerId = window.location.search.replace(/\?/,""); //分割出athletesId;

    // ajax
    $.ajax({
    	url: api+'athletes/getAthletesInfo',
    	type: 'POST',
    	dataType: 'json',
    	contentType: "application/json;charset=UTF-8",  
    	data: JSON.stringify({
		  athletesId: playerId	
    	}),
    })
    .done(function(data) {
    	console.log(data);
    	var i, str = "",
    		playdeStr = "",
        	Data = data.data,
        	listp = (Data.listP.length >0)?(Data.listP):null,
        	birth = (Data.birthday !== null)?Data.birthday.slice(0, 10):'未知',
        	srtime = (Data.sr !== null)?(Data.sr.srDate):null,
        	swtime = (Data.sw !== null)?(Data.sw.swDate):null,
        	avatUrl = Data.txUrl,
        	gqUrl = Data.gqUrl,
    	 	// 判断是否显示默认头像
    		defaultAvator = (avatUrl === null || avatUrl === '')?'./img/Athletes.png':avatUrl,
    		// 判断是否显示默认国旗
    		defaultGq = (gqUrl === null || gqUrl === '')?'./img/flag.jpg':gqUrl,
    		// 判断是否存在时间
    		newsrT = (srtime == null)?"null":srtime.slice(0, 10), 
    		newswT = (swtime == null)?"null":swtime.slice(0, 10),
    		// 判断性别，显示"男/女"
    		gender = (Data.gender === 1)?"男":"女",
    		// 是否有许可证
    		permit = (Data.permit === 1)?"有":"无";
 
    	// 拼接字符串
    	playdeStr = "<div class='player-detail'>"+
				            "<div class='f-left'>"+"<img src='"+defaultAvator+"' alt=''>"+"</div>"+
				            "<div class='f-right'>"+
				                "<div class='p1'>"+
				                    "<span>"+Data.athletesName+"</span>"+
				                    "<img src='"+defaultGq+"' alt=''>"+
				                "</div>"+
				                "<div class='p2'>"+"<span>UIPM证件号: "+Data.uipmCode+"</span>"+"</div>"+
				                "<div class='p3'>国家联合会: "+"<span>"+Data.association+"</span>"+"</div>"+
				                "<div class='p4'>出生日期: "+"<span>"+birth+"</span>"+"</div>"+	
				                "<div class='p5'>性别: "+"<span>"+gender+"</span>"+"</div>"+
				                "<div class='p6'>马术许可证: "+"<span>"+permit+"</span>"+"</div>"+
				                "<div class='p7'>国家: "+"<span>"+Data.countryName+"</span>"+"</div>"+				                
				            "</div>"+
				        "</div>"+
        				"<div id='player-contents' class='player-contents appbg'>"+
        					"<!--成人排名-->"+
					        "<div class='player-ranking inform'>"+
				            	"<div class='title'>成人排名</div>"+
					            "<div class='table'>"+
					                "<div class='date'>"+
					                    "<span>时间</span>"+                   
				                        "<span>"+newsrT+"</span>"+
					                "</div>"+ 
					                "<div>"+
					                    "<span>排位</span>"+
				                        "<span>"+((Data.sr !== null)?(Data.sr.srPosition):null)+"</span>"+
					                "</div>"+
					                "<div>"+
					                    "<span>积分</span>"+
				                       	"<span>"+((Data.sr !== null)?(Data.sr.srPoints):null)+"</span>"+
					                "</div>"+
					                "<div>"+
					                    "<span>赛事1</span>"+
					                    "<span>"+((Data.sr !== null)?(Data.sr.srEvent1):null)+"</span>"+
					                "</div>"+
					                "<div>"+
					                    "<span>赛事2</span>"+
					                    "<span>"+((Data.sr !== null)?(Data.sr.srEvent2):null)+"</span>"+
					                "</div>"+	
					                "<div>"+
					                    "<span>赛事3</span>"+
					                    "<span>"+((Data.sr !== null)?(Data.sr.srEvent3):null)+"</span>"+
					                "</div>"+				                
					            "</div>"+
				        	"</div>"+
				        	"<!--奥运排名-->"+
				        	"<div class='Olympic inform'>"+
				    			"<div class='title'>奥运排名</div>"+
								"<div class='table'>"+
					                "<div class='date'>"+
					                    "<span>时间</span>"+                   
				                        "<span>"+newswT+"</span>"+
					                "</div>"+ 
					                "<div>"+
					                    "<span>排位</span>"+
				                        "<span>"+((Data.sw !== null)?(Data.sw.swPosition):null)+"</span>"+
					                "</div>"+
					                "<div>"+
					                    "<span>积分</span>"+
				                       	"<span>"+((Data.sw !== null)?(Data.sw.swPoints):null)+"</span>"+
					                "</div>"+
					                "<div>"+
					                    "<span>赛事1</span>"+
					                    "<span>"+((Data.sw !== null)?(Data.sw.swEvent1):null)+"</span>"+
					                "</div>"+
					                "<div>"+
					                    "<span>赛事2</span>"+
					                    "<span>"+((Data.sw !== null)?(Data.sw.swEvent2):null)+"</span>"+
					                "</div>"+	
					                "<div>"+
					                    "<span>赛事3</span>"+
					                    "<span>"+((Data.sw !== null)?(Data.sw.swEvent3):null)+"</span>"+
					                "</div>"+				                
					            "</div>"+
				    		"</div>"+
			    		"</div>";
	   	// for in循环拼接成绩字符串(适用于格式为数组的数据)
    	for (i in listp) {
    		var listTime = (listp[i].date !== null)?listp[i].date.slice(0, 10):"未知";
	    	str += 	"<!--成绩-->"+
		    		"<div class='mark inform'>"+
		    			"<div class='title'>成绩</div>"+
		    			"<div class='table'>"+
			                "<div class='date'>"+
			                    "<span>时间</span>"+                   
		                        "<span>"+listTime+"</span>"+
			                "</div>"+ 
			                "<div>"+
			                    "<span>位次</span>"+
		                        "<span>"+listp[i].position+"</span>"+
			                "</div>"+
			                "<div>"+
			                    "<span>比赛</span>"+
		                       	"<span>"+listp[i].competition+"</span>"+
			                "</div>"+
			                "<div>"+
			                    "<span>组别</span>"+
			                    "<span>"+listp[i].category+"</span>"+
			                "</div>"+
			                "<div>"+
			                    "<span>阶段</span>"+
			                    "<span>"+listp[i].phase+"</span>"+
			                "</div>"+
			                "<div>"+
			                    "<span>积分</span>"+
			                    "<span>"+listp[i].points+"</span>"+
			                "</div>"+
			            "</div>"+
					"</div>";
    	};
		// 渲染
		$box.append(playdeStr);
		$('#player-contents').append(str);
        //通过判断，模块是否显示
        var $ranking = $(".player-ranking"),
        	$Olympic = $(".Olympic"),
        	$mark = $(".mark"),
        	text1 = $(".player-ranking .date").find("span").eq(1).text(),
        	text2 = $(".Olympic .date").find("span").eq(1).text(),
        	text3 = $(".mark .date").find("span").eq(1).text();
        function hideDiv(){
        	if(text1 === 'null'){
	        	$ranking.css({
	        		"display": "none"
	        	})
	        }if(text2 === 'null'){
	        	$Olympic.css({
	        		"display": "none"
	        	})
	        }if(text3 === 'null'){
	        	$mark.css({
	        		"display": "none"
	        	})
	        }
        }     
        hideDiv();
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
    });
 
})
