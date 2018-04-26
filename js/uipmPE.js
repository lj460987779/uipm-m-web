$(function () {
    FastClick.attach(document.body);
    var swiper = new Swiper('.pmNav', {
        slidesPerView: "auto"
    });
    var $menuli = $('.gay-list').find('li'),
        $section = $('.form').find('.active'),
        liWidth = $menuli.width();
    //导航bar移动
    var $Bar = $(".bar"),
        $pmNav = $(".gay-list"),
        navLeft = $pmNav.offset().left;
    //bar的宽度初始化Bar
    var Bar = function() {
        $Bar.css({
            width: liWidth
        });
    }
    Bar();
    //定义bar移动函数
    var BarAnimated = function($li) {
        $Bar.css({
            width: $li.width(),
            left: $li.offset().left - navLeft
        });
    }
    $menuli.on("click", function() {
        var $li = $(this), index = $li.index();
        BarAnimated($li);
    });

    //选项卡
    var $section = $(".contextmenu").find("section");
    $.each($menuli, function() {
        var $li = $(this), index = $li.index();
        $li.on("click", function() {
            $section.eq(index).show().siblings().hide();
        })
    })
	
	
	//历史
	$.get('./json/evolution.json', function(data) {
		var evolutStr = "",
			$evolut = $(".evolution");
		$.each(data, function(index, val) {
			evolutStr += "<div class='evolution-year'>"+
			                  "<p>"+val.year+"年</p>"+
			                  "<p>"+val.text+"</p>"+
			              "</div>"
		});
		$evolut.append(evolutStr);
	});
    //执行董事会
    $.get('./json/board.json', function(data) {
      var boardStr = "",
          $borad = $(".board-box");
      $.each(data, function(index,val){
        boardStr += "<div class='person'>"+
                "<div class='comm-img'>"+
                  "<img src='"+val.imgUrl+"' alt=''>"+
                "</div>"+
                "<div class='img-discript'>"+
                  "<div class='name'>"+val.name+"</div>"+
                  "<p>"+val.job+"</p>"+
                  "<p>"+val.discript+"</p>"+
                  "<p>"+
                    "<span>"+val.span+"</span>"+
                    "<span>"+val.langague+"</span>"+
                  "</p>"+
                "</div>"+
               "</div> "
      })
      $borad.html(boardStr);
    })
	
	//委员会
	$.get('./json/committee.json', function  (data) {
		var lsitStr = "",
			$commitBox = $(".committee-box");
		$.each(data, function(index,val) {
			lsitStr += "<div class='committee-box-section'>"+
                  "<h3>"+val.title+"</h3>"+
                  "<div class='committee-box-section-chairman'><span>主席：</span>"+"<span>"+val.chairman+"</span>"+"</div>"+
                  "<div class='committee-box-section-member'>"+
                    "<p>成员：</p>"+
                    "<p>"+val.member.m1+"</p>"+
                    "<p>"+val.member.m2+"</p>"+
                    "<p>"+val.member.m3+"</p>"+
                    "<p>"+val.member.m4+"</p>"+
                    "<p>"+val.member.m5+"</p>"+
                    "<p>"+val.member.m6+"</p>"+
                    "<p>"+val.member.m7+"</p>"+
                    "<p>"+val.member.m8+"</p>"+
                    "<p>"+val.member.m9+"</p>"+
                    "<p>"+val.member.m10+"</p>"+
                    "<p>"+val.member.m11+"</p>"+
                    "<p>"+val.member.m12+"</p>"+
                  "</div>"+
                  "<div class='committee-box-section-coordinator'><span>协调员：</span>"+"<span>" +val.coordinator+"</span>"+"</div>"+
                  "<div class='committee-box-section-description'>"+val.description+"</div>"+
                  "</div>"
		});
		$commitBox.html(lsitStr);
	})
	
	//总部
	$.get('./json/headquarters.json', function(data) {
		var quarterStr = "",
			$headquarters = $(".headquarters-box");
		$.each(data, function(index, val) {
			quarterStr += "<div class='headquarters-box-member'>"+
                  "<div class='img'>"+
                    "<img src='"+val.imgUrl+"' alt=''>"+
                  "</div>"+
                  "<h3>"+val.name+"</h3>"+
                    "<span>"+val.job+"</span>"+      
                    "<p>"+val.description+"</p>"+
                "</div>"
		});
		$headquarters.html(quarterStr)
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
