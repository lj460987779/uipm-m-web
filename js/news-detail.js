$(function () {
	
	var $box = $("#boxs"), // 初始化节点
        idInfro = window.location.search.replace(/\?/,""); // 分割出newsId;   

    // ajax
    $.ajax({
        url: api+'news/getNewsById',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json;charset=UTF-8", 
        data: JSON.stringify({
            newsId: idInfro
        }),
    })
    .done(function(data) {
        // console.log(data);
        var newStr = "",
            Data = data.data,
            Content = Data.newsContent,
            createTime = Data.createTime,
            // 处理时间
            cYears = ((createTime)?(createTime.substring(0,4)):'')+"年",
            cMouth = ((createTime)?(createTime.substring(5,7)):'')+"月",
            cDay = ((createTime)?(createTime.substring(8,10)):'')+"日",
            // 处理后的新闻时间
            newsTime = cYears+cMouth+cDay; // 匹配src属性
            // console.log(Content);

        // 取出新闻文本内容
        // var textStr; // 定义新文本
        // function newsText(text) {
        //     newsT = text.replace(imgReg, '');
        //     textStr = newsT.replace(/<.*?>/ig, '');
        // };
        // newsText(Content);

        // 字符串
        newStr  =   "<div class='news-content'>"+
                        "<div class='d1'>"+Data.newsTitle+"</div>"+
                        "<div class='d2'>"+
                            "<span>"+Data.newsTag+"</span>"+
                            "<span>"+newsTime+"</span>"+
                        "</div>"+
                        "<div id='d4' class='d4'>"+Content+"</div>"+
                    "</div> ";
        // 进行渲染
        $box.append(newStr);

        // 替换页面顶部标题
        var title_data = Data.newsTitle,
            $title = $(".title").find("p"),        
            nTitle = $title.text(title_data);              
        function overTexth() {
            var tLength = title_data.length;         
            if(tLength > 10){
                $title.text($title.text().substring(0,10));
                $title.html($title.html()+"...");   // 超出内容区显示省略号
            }
        }  
        overTexth();

        // 没有新闻内容隐藏div
        // console.log(Content.length);
        var $text = $("#d4");
        function hiddenText(newText) {
            if (newText.length = 0) { // 通过判断新文本是否有内容，没有就隐藏div
                $text.css({
                    display: 'none'
                });
            };
        };
        hiddenText(Content);
        
        // 加载动画
        $(function($) {
            var timer = setTimeout(function() {
                var $loadbox = $("#loadbox");
                $loadbox.addClass('fadeout');
                $loadbox.fadeOut(300).html('');
            }, 500); 
        })
    })
    .fail(function() {
        console.log("error");
    });      
	
})
