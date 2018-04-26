$(function () {

  // 初始化节点(全局)
  var Node = {
    vercode: $("#vercode"),
    logintel: $("#logintel"),
    loginpwd: $("#loginpwd"),
    loginbtn: $("#loginbtn").find('button'),
    wxLogin: $("#wxLogin").find('button')
  };

  // 微信登录
  var wxcode = localStorage.getItem('wx_code'), 
    appId = 'wx03d28629b0575ce1', 
    wxBtn = Node.wxLogin;
  wxBtn.on('click', function () {
    if (!wxcode) {
      weachatGetCode(window.location.href.split('?')[0])
    } else {
      getWxInfo(wxcode)
    }
  })
  function weachatGetCode(url, scope = 'snsapi_userinfo', state = 'getCode') {
    var weaChat_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
    window.location.href = weaChat_url
  }
  //获取code
  function getWxInfo(code) {
    var that = this;
    $.ajax({
      url: api + 'auth/wxLogin',
      type: 'post',
      dataType: 'json',
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify({
        clientType: 1,
        codeFromWeixin: code
      })
    })
    .done(function (data) {
      console.log(data);
      if(data.success) {
        setWxCode(data.data, 'weachat')
        window.location.href = 'personal.html'
      } else {
        // weachatGetCode(window.location.href.split('?')[0])
      }
    })
    .fail(function () {
      console.log("error");
    });
  } 
  function setWxCode(data, type) {
    if (type === 'weachat') {
      localStorage.setItem('wx_code', JSON.stringify(data))  // 待更
    }
  }

  // 初始化target
  var target = {
    Ttel: false,
    Tpwd: false,
    Tvercode: false
  }
  // 正则验证
  var rtel = /^1[3|4|5|7|8|9][0-9]\d{8}$/,
    rpwd = /^[a-zA-Z0-9\W]{1,16}$/,
    rcode = /^[0-9]{5}\d$/;
  // 自定义错误提示
  $.mvalidateExtend({
    logintel: {
      required: true,
      pattern: rtel,
      each: function() {},
      descriptions: {
        required: '<div class="field-invalidmsg">请输入用户名或手机号码</div>',
        pattern: '<div class="field-invalidmsg">用户名或手机号码格式不正确</div>',
        valid: '<div class="field-validmsg">手机号格式正确</div>'
      }
    },
    loginpwd: {
      required: true,
      pattern: rpwd,
      each: function() {},
      descriptions: {
        required: '<div class="field-invalidmsg">请输入密码</div>',
        pattern: '<div class="field-invalidmsg">密码格式不正确</div>',
        valid: '<div class="field-validmsg">密码格式正确</div>'
      }
    }
  });

  // 初始化登录表单
  $('#secLogin').mvalidate({
    type:2,
    onKeyup: true,
    sendForm: true,
    firstInvalidFocus: true,
    valid: function(event, options) {
      // 点击提交按钮时,表单通过验证触发函数
      event.preventDefault();
    },
    invalid: function(event, status, options) {
      // 点击提交按钮时,表单未通过验证触发函数
    },
    eachField: function(event, status, options) {
      // 点击提交按钮时,表单每个输入域触发这个函数 this 执向当前表单输入域，是jquery对象
    },
    eachValidField:function(val){},
    eachInvalidField:function(event, status, options){}
  });

  // 登录
  var Login = (function() {
    var login = {
      init: function() {
        this.initNode();
        this.addEvent();
      },
      initNode: function() { // 初始化节点
        this.$logintel = Node.logintel;
        this.$loginpwd = Node.loginpwd;
        this.$loginBtn = Node.loginbtn;
      },
      addEvent: function() { // 绑定事件
        this.$loginBtn.on('click', this.validate.bind(this));
      },
      validate: function() { // 验证登录
        var logintel = $.trim(this.$logintel.val()),
          loginpwd = $.trim(this.$loginpwd.val());
        this.logintest(logintel, loginpwd);  // 改为this调试接口 //
        if ((target.Ttel === true) && (target.Tpwd === true)) {
          userLogin(logintel, loginpwd);
          return;
        }
      },
      logintest: function (tel, pwd) { // 正则匹配验证
        rtel.test(tel)?(target.Ttel = true):(target.Ttel = false);
        rpwd.test(pwd)?(target.Tpwd = true):(target.Tpwd = false);
      }
    }
    return login;
  })();
  Login.init();

  // ajax
  // 登录API
  function userLogin(phone, pwd) { 
    var tokenInfro, Id;
    $.ajax({
      url: api + 'auth/login',
      type: 'post',
      dataType: 'json',
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify({
        username: phone,
        password: pwd
      }),
    })
    .done(function(data) {
      // console.log(data);
      if ((data.msg === 'success')) {
        tokenInfro = data.data.token;
        Id = data.data.userId;
        localStorage.setItem('_TOKEN_', tokenInfro);
        localStorage.setItem('_USERID_', Id);
        Node.loginbtn.html("<img src='https://ohc5vthqm.qnssl.com/syshu/2017-12-04/Spinner.svg'>登录中...");
        setTimeout(function() {
          window.location.href = 'personal.html';            
        }, 1000);
      } if ((data.msg === '请先注册！')) {
        $.mvalidateTip(data.msg);
        return;
      } else if ((data.msg === '用户名或密码错误')) {
        $.mvalidateTip(data.msg);
        return;
      }
    })
    .fail(function() {
      console.log("error");
    });
  }

  // 改变按钮背景颜色
  var wxLogin = $("#wxLogin").find('button'),
    logbtngb = $("#loginbtn").find('button');
  function changeBg(btn) {
    btn.on('touchstart', function(event) {
      btn.addClass("btnbgColor");
    }).on('touchend', function(event) {
      setTimeout(function() {
        btn.removeClass("btnbgColor");
      }, 200);
    });
  }
  changeBg(wxLogin); // 微信登录按钮bg
  changeBg(logbtngb); // 登录按钮bg

  // 加载动画
  $(function($) {
    var timer = setTimeout(function() {
      var $loadbox = $("#loadbox");
      $loadbox.addClass('fadeout');
      $loadbox.fadeOut(300).html('');
    }, 500);
  });

})
