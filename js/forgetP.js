$(function () {
	
	// 初始化节点
	var Node = {
		tel: $("#usertel"),
		vercode: $("#vercode"),
		pwd: $("#userpwd")
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
	
	// 验证码60s倒计时
	var countdown = 59,
		$vcodeBtn = $('#codeBtn1');
	function settime(obj) {
		var timer; // 定义定时器变量
		if (countdown == -1) {
			clearTimeout(timer);
			$(obj).prop('disabled',false);
			obj.value = "重新发送";
			countdown = 59;
			return;
		} else {
			$(obj).prop('disabled',true)
			obj.value = "已发送("+ countdown +")";
			countdown--;
			timer = setTimeout(function() {
				settime(obj);
			},1000)
		}
	}
	$vcodeBtn.on('click', function() {
		var phone = $.trim(Node.tel.val());
		if (!phone) {
			$.mvalidateTip("请输入手机号!");
			return;
		} else if (!rtel.test(phone)) {
			$.mvalidateTip("手机号格式不正确!");
			return;
		}
		settime(this);
		userVercode();
	});
	
	// 自定义错误提示
	$.mvalidateExtend({
		phone: {
			required: true,
			pattern: rtel,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">请输入手机号码</div>',
				pattern: '<div class="field-invalidmsg">手机号格式不正确</div>',
				valid: '<div class="field-validmsg">手机号格式正确</div>'
			}
		},
		password: {
			required: true,
			pattern: rpwd,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">请输入密码</div>',
				pattern: '<div class="field-invalidmsg">密码格式不正确</div>',
				valid: '<div class="field-validmsg">密码格式正确</div>'
			}
		},
		vercode: {
			required: true,
			pattern: rcode,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">请输入验证码</div>',
				pattern: '<div class="field-invalidmsg">验证码格式不正确</div>',
				valid: '<div class="field-validmsg">验证码格式正确</div>'
			}
		}
	});
	// 初始化注册表单
	$('#fogetForm').mvalidate({
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
	
	// 修改密码
	var Changepwd = (function () {
		var reset = {
			init: function () {
				this.initNode();
				this.addEvent();
			},
			// 初始化节点
			initNode: function () {
				this.tel = Node.tel;
				this.pwd = Node.pwd;
				this.vercode = Node.vercode;
				this.$affirm = $('#finshaff').find('button');
			},
			// 绑定事件
			addEvent: function () {
				this.$affirm.on('click', this.validate.bind(this));
			},
			// 验证
			validate: function () {
				var vtel = $.trim(this.tel.val()),
					vnewp = $.trim(this.pwd.val()),
					vcode = $.trim(this.vercode.val());
				this.verifypwd(vtel, vnewp, vcode);
				// 根据正则验证成功与否来调用ajax
				if ((target.Ttel === true) && (target.Tpwd === true) && (target.Tvercode === true)) {
					resetPwd(vtel, vnewp, vcode);
					return;
				}
			},
			// 验证手机号、密码、验证码
			verifypwd: function(tel, pwd, vercode) { 
				rtel.test(tel)?(target.Ttel = true):(target.Ttel = false);
				rpwd.test(pwd)?(target.Tpwd = true):(target.Tpwd = false);
				rcode.test(vercode)?(target.Tvercode = true):(target.Tvercode = false);	
			}
		}
		return reset;
	})();
	Changepwd.init();
	
	// ajax
	// 修改密码API
	function resetPwd(uTel, uPwd, uSmscode) {
		$.ajax({
			url: api + 'auth/updatePassWord',
			type: 'post',
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				username: uTel,
				password: uPwd,
				smscode: uSmscode,
				smsCaptchaType: 2
			})
		})
		.done(function(data) {
			// console.log(data);
			if (data.success) {
				$.mvalidateTip("修改密码成功，3s后将跳转到登录界面!");
				$(function($){
					setTimeout(function() {
						window.location.href = "user.html";
					}, 3000);
				});	
			} else {
				$.mvalidateTip(data.msg);
			}
		})
		.fail(function() {
			$.mvalidateTip('网络错误，请重试！');
			console.log("error");
		});
	}
	
	// 短信验证码
	function userVercode() { 
		var $retel = $('#usertel');
		$.ajax({
			url: api + 'auth/sendSmsCode',
			type: 'post',
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				username: $retel.val(),
				smsCaptchaType: 2
			}),
		})
		.done(function(data) {
			console.log(data);
		})
		.fail(function() {
			console.log("error");
		});
	}

	// 改变按钮背景颜色
	var $btnbg = $("#finshaff").find('button');
	$btnbg.on('touchstart', function(event) {
		$btnbg.addClass("btnbgColor");
	}).on('touchend', function(event) {
		setTimeout(function() {
			$btnbg.removeClass("btnbgColor");
		}, 200);	
	});

	// 验证码按钮颜色
	function codebg(codeBtn) {
		codeBtn.on('touchstart', function(event) {
			codeBtn.addClass("codebtnBg");
		}).on('touchend', function(event) {
			setTimeout(function() {
				codeBtn.removeClass("codebtnBg");
			}, 200);
		});
	}
	codebg($vcodeBtn);

	// 加载动画
	$(function($) {
		var timer = setTimeout(function() {
			var $loadbox = $("#loadbox");
			$loadbox.addClass('fadeout');
			$loadbox.fadeOut(300).html('');
		}, 500);
	})

})
