$(function(){
    
    // 初始化节点
    var $box = $("#List");

    // 页数
    var page = -1, refpage= 0;
    // 每页展示10个
    var size = 10;

    // dropload
    $("#newsbox").dropload({
      scrollArea : window,
      loadUpFn: function(me) {
        $.ajax({
          url: api + 'news/getNewsList',
          type: 'post',
          dataType: 'json',
          contentType: "application/json;charset=UTF-8",
          data: JSON.stringify({
            pageSize: size,
            pageNo: refpage
          }),
        })
        .done(function(data) {
          var Data = data.data.list,
              newStr = "";
          // console.log(Data);
          $.each(Data, function(index, val) {
            var Img, cover,
                // imgUrl = val.resource.url,
                img_list = val.newsContent,
                createTime = Data[index].createTime,
                // 处理时间
                cYears = ((createTime)?(createTime.substring(0,4)):'')+"年",
                cMouth = ((createTime)?(createTime.substring(5,7)):'')+"月",
                cDay = ((createTime)?(createTime.substring(8,10)):'')+"日",
                // 处理后的新闻时间
                newsTime = cYears+cMouth+cDay,
                imgReg = /<img.*?(?:>|\/>)/gi, // 匹配图片
                srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i, // 匹配src属性
                defaultImg = "./img/Upcoming-events-bg.jpg";
                // cover = (imgUrl)?imgUrl:defaultImg;

            // 匹配出img的src属性
            function Src(list) {
              if (list) {
                var src,
                  arrImg = list.match(imgReg);
                // 判断是否存在img标签
                if (arrImg && (arrImg.length > 0)) {
                  src = arrImg[0].match(srcReg);
                  cover = src[1];
                } else {
                  cover = defaultImg;
                }
              } else {
                cover = defaultImg;
              }
            };
            Src(img_list)

            // 拼接字符串
            newStr += "<div class='news-msg news'>" +
                        "<div class='news-photo'>" +
                        "<img src='" + cover + "' class='img' alt=''>" +
                        "</div>" +
                        "<div class='news-detail' id='news-detail'>" +
                        "<a href='news-detail.html?" + val.newsId + "' class='title'>" + val.newsTitle + "</a>" +
                        "<div class='f'>" +
                        "<span>" + val.newsTag + "</span>" +
                        "<span>" + newsTime + "</span>" +
                        "</div>" +
                        "</div>" +
                      "</div>";

          });
          // 延时加载
          setTimeout(function() {
            $box.fadeIn(300).html(newStr);

            //截取未超出内容区片段
            var $title = $box.find(".title");
            function overTexth() {
              $.each($title, function(index, val) {
                var Text = $(this).text(),
                    tLength = Text.length;
                // console.log(tLength, Text)
                if (tLength > 20) {
                  var _text = Text.substring(0, 21);
                  // console.log(_text)  
                  $(this).text(_text);
                }
              });
            }
            overTexth();
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
        page++;
        $.ajax({
          url: api + 'news/getNewsList?page='+page+'&size='+size,
          type: 'post',
          dataType: 'json',
          contentType: "application/json;charset=UTF-8",
          data: JSON.stringify({
            pageSize: size,
            pageNo: page
          }),
        })
        .done(function(data) {
          var Data = data.data.list,
              arrLen = Data.length,
              newStr = "";
          if (arrLen > 0) {
            $.each(Data, function(index, val) {
                        
              var Img, cover,
                  // imgUrl = val.resource.url,
                  img_list = val.newsContent,
                  createTime = Data[index].createTime,
                  // 处理时间
                  cYears = ((createTime)?(createTime.substring(0,4)):'')+"年",
                  cMouth = ((createTime)?(createTime.substring(5,7)):'')+"月",
                  cDay = ((createTime)?(createTime.substring(8,10)):'')+"日",
                  // 处理后的新闻时间
                  newsTime = cYears+cMouth+cDay,
                  imgReg = /<img.*?(?:>|\/>)/gi, // 匹配图片
                  srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i, // 匹配src属性
                  defaultImg = "./img/Upcoming-events-bg.jpg";
                  // cover = (imgUrl)?imgUrl:defaultImg;
              // 匹配出img的src属性
              function Src(list) {
                if (list) {
                  var src,
                    arrImg = list.match(imgReg);
                  // 判断是否存在img标签
                  if (arrImg && (arrImg.length > 0)) {
                    src = arrImg[0].match(srcReg);
                    cover = src[1];
                  } else {
                    cover = defaultImg;
                  }
                } else {
                  cover = defaultImg;
                }
              };
              Src(img_list)

              // 拼接字符串
              newStr += "<div class='news-msg news opacity'>" +
                          "<div class='news-photo'>" +
                          "<img src='" + cover + "' class='img' alt=''>" +
                          "</div>" +
                          "<div class='news-detail' id='news-detail'>" +
                          "<a href='news-detail.html?" + val.newsId + "' class='title'>" + val.newsTitle + "</a>" +
                          "<div class='f'>" +
                          "<span>" + val.newsTag + "</span>" +
                          "<span>" + newsTime + "</span>" +
                          "</div>" +
                          "</div>" +
                        "</div>";

            });
          } else {
            // 锁定
            me.lock();
            // 无数据
            me.noData();
          }
          // 延时加载
          setTimeout(function() {
            $box.append(newStr);
            //截取未超出内容区片段
            var $title = $box.find(".title");
            function overTexth() {
              $.each($title, function(index, val) {
                var Text = $(this).text(),
                    tLength = Text.length;
                // console.log(tLength, Text)
                if (tLength > 20) {
                  var _text = Text.substring(0, 21);
                  // console.log(_text)  
                  $(this).text(_text);
                }
              });
            }
            overTexth();
            // 每次数据加载完，必须重置
            me.resetload();
          }, 500);  

          // 加载动画
          $(function($) {
            setTimeout(function() {
              var $loadbox = $("#loadmsg");
              $loadbox.addClass('fadeout');
              $loadbox.fadeOut(300).html('');
            }, 500);
          });
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
