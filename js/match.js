$(function () {

    // 初始化节点
    var $match = $("#match-box");    

    // dropload
    // 页数
    var page = -1, refpage = 0;
    // 每页展示10个
    var size = 10;

    $("#matchlist").dropload({
      scrollArea : window,
      loadUpFn: function (me) {
        $.ajax({
            url: api + 'match/getMatchList',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
              pageSize: size,
              pageNo: refpage
            })
          })
        .done(function(data) {
          //console.log(data);
          var str = "",
              Data = data.data,
              list = Data.list;
          // console.log(list);
          $.each(list, function(index, val) {
            var s_dete = (val.startMatch == null)?'未知':val.startMatch.substring(0, 10), // 开始时间
                e_date = (val.endMatch == null)?'未知':val.endMatch.substring(0, 10), // 结束时间
                sdreplace = s_dete.replace(/-/g, '.'),
                edreplace = e_date.replace(/-/g, '.'),
                new_stdate = sdreplace.substring(5), // 分割出开始月日
                new_endate = edreplace.substring(5); // 分割出结束月日
                sMonth = new_stdate.slice(0, 2), // 分割出开始月
                eMouth = new_endate.slice(0, 2), // 分割出结束月
                sDay = new_stdate.slice(3), // 分割出开始日
                eDay = new_endate.slice(3); // 分割出结束日  
            // 处理开始、结束日期
            Dates(new_stdate, new_endate, sMonth, eMouth, sDay, eDay);
            var showDate; // 初始化需要展示的结束日期
            function Dates(stdate, endate, start_m, end_m, start_d, end_d) {
              if (stdate === endate) { // 判断日月是否相等
                showDate = '';
              } else {
                if (start_m === end_m) { // 判断月是否相等，如果相等则显示结束日期的日
                  showDate = '~' + end_d;
                } else {
                  showDate = '~' + new_endate;
                }
              }
            }

            str += "<div class='match-list-item'>"+
                      "<div class='match-detail'>"+
                          "<div class='match-detail-title'>"+val.matchTitle+"</div>"+
                          "<div class='match-time'>"+sdreplace+showDate+"</div>"+
                          "<div class='match-birth'>"+
                              "<span>"+val.matchPlace+"</span>"+
                              // "<a href='perfect-data.html' class='Application'>申请报名</a>"+
                          "</div>"+
                      "</div>"+
                    "</div>";
            });
            // 延时加载
            setTimeout(function () {
              $match.fadeIn(500).html(str);
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
      loadDownFn : function(me){
        page++;
        // console.log(page)
        $.ajax({
            url: api + 'match/getMatchList?page='+page+'&size='+size,
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
          var str = "",
              Data = data.data,
              list = Data.list,
              arrLen = list.length;
              // console.log(arrLen);
          if (arrLen > 0) {
            $.each(list, function(index, val) {
              var s_dete = (val.startMatch !== null)?val.startMatch.substring(0, 10):'未知', // 开始时间
                  e_date = (val.endMatch !== null)?val.endMatch.substring(0, 10):'未知', // 结束时间
                  sdreplace = s_dete.replace(/-/g, '.'),
                  edreplace = e_date.replace(/-/g, '.'),
                  new_stdate = sdreplace.substring(5), // 分割出开始月日
                  new_endate = edreplace.substring(5); // 分割出结束月日
                  sMonth = new_stdate.slice(0, 2), // 分割出开始月
                  eMouth = new_endate.slice(0, 2), // 分割出结束月
                  sDay = new_stdate.slice(3), // 分割出开始日
                  eDay = new_endate.slice(3), // 分割出结束日 
                  place = (val.matchPlace !== null)?val.matchPlace:'未知'; // 赛事地点
              // 处理开始、结束日期
              Dates(new_stdate, new_endate, sMonth, eMouth, sDay, eDay);
              var showDate; // 初始化需要展示的结束日期
              function Dates(stdate, endate, start_m, end_m, start_d, end_d) {
                if (stdate === endate) { // 判断日月是否相等
                  showDate = '';
                } else {
                  if (start_m === end_m) { // 判断月是否相等，如果相等则显示结束日期的日
                    showDate = '~' + end_d;
                  } else {
                    showDate = '~' + new_endate;
                  }
                }
              }

              str += "<div class='match-list-item opacity'>"+
                        "<div class='match-detail'>"+
                            "<div class='match-detail-title'>"+val.matchTitle+"</div>"+
                            "<div class='match-time'>"+sdreplace+showDate+"</div>"+
                            "<div class='match-birth'>"+
                                "<span>"+place+"</span>"+
                                // "<a href='perfect-data.html' class='Application'>申请报名</a>"+
                            "</div>"+
                        "</div>"+
                      "</div>";
            });
          } else { // 如果没有数据
            // 锁定
            me.lock();
            // 无数据
            me.noData();
          }
          // 延时加载
          setTimeout(function () {
            $match.append(str);
            // 每次数据插入，必须重置
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
