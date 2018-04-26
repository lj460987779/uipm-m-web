$(function () {
	
	// 初始化节点
	var Node = {
		oldpwd: $("#oldpwd"),
		newpwd: $("#newpwd"),
		confirmpwd: $("#confirmpwd")
	};
	// 初始化target
	var target = {
		Topwd: false,
		Tnpwd: false,
		Tvercode: false
	};
	// 正则验证
	var rpwd = /^[a-zA-Z0-9\W]{1,16}$/,
		rcode = /^[0-9]{5}\d$/;

	// 自定义错误提示
	$.mvalidateExtend({
		oldpwd: {
			required: true,
			pattern: rpwd,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">原始密码不能为空</div>',
				pattern: '<div class="field-invalidmsg">密码格式不正确</div>',
				valid: '<div class="field-validmsg">密码格式正确</div>'
			}
		},
		newpwd: {
			required: true,
			pattern: rpwd,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">请输入新的密码</div>',
				pattern: '<div class="field-invalidmsg">密码格式不正确</div>',
				valid: '<div class="field-validmsg">密码格式正确</div>'
			}
		}
	});

	// 初始化修改密码表单
	$('#resetPwd-form').mvalidate({
		type: 2,
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
		eachValidField: function(val) {},
		eachInvalidField: function(event, status, options) {},
		conditional: {
			newpwd: function(val, options) {
				Node.confirmpwd.trigger("keyup." + options.namespace);
				return true;
			},
			confirmpwd: function(val) {
				var flag;
				return (val == Node.newpwd.val()) ? true : false;
			}
		},
		descriptions: {
			confirmpassword: {
				required: '<div class="field-invalidmsg">请再次输入密码</div>',
				conditional: '<div class="field-invalidmsg">两次密码不一致</div>',
				valid: '<div class="field-validmsg">验证通过</div>'
			}
		}
	});

	// 修改密码
	var Changepwd = (function () {
		var flag = true; // 用来作为判断两次是否一致的标识
		var reset = {
			init: function () {
				this.initNode();
				this.addEvent();
			},
			// 初始化节点
			initNode: function () {
				this.$oldpwd = Node.oldpwd;
				this.$newpwd = Node.newpwd;
				this.$confirmpwd = Node.confirmpwd;
				this.$affirm = $('#resetPwd-form').find('button');
			},
			// 绑定事件
			addEvent: function () {
				// 绑定修改密码点击事件
				this.$affirm.on('click', this.validate.bind(this));
			},
			// 验证
			validate: function () {
				var voldp = $.trim(this.$oldpwd.val()),
					vnewp = $.trim(this.$newpwd.val()),
					confirmpwd = $.trim(this.$confirmpwd.val());
				// 判断两次输入的密码是否一致
				(vnewp === confirmpwd)?(flag = true):(flag = false);
				this.verifypwd(voldp, vnewp);
				// 根据正则验证成功与否来调用ajax
				if ((target.Topwd === true) && (target.Tnpwd === true) && (flag === true)) {
					resetPwd(voldp, vnewp);
				}
			},
			// 
			verifypwd: function(oldpwd, newpwd) { // 正则验证旧密码、新密码
				rpwd.test(oldpwd)?(target.Topwd = true):(target.Topwd = false);
				rpwd.test(newpwd)?(target.Tnpwd = true):(target.Tnpwd = false);
			}
		}
		return reset;
	})();
	Changepwd.init();

	// ajax
	var userToken = localStorage.getItem('_TOKEN_');
	function resetPwd(inOldPwd, inNewPwd) {
		$.ajax({
			url: api + 'user/updatePassWord',
			type: 'post',
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				oldPassWord: inOldPwd,
				newPassWord: inNewPwd
			}),
			headers: {
				"Authorization": `Bearer ${userToken}`
			}
		})
		.done(function(data) {
			if (data.success) {
				localStorage.clear();
				$.mvalidateTip("修改密码成功，即将重新登录！");
				$(function($){
					setTimeout(function() {
						window.location.href = "user.html";
					}, 1500);
				});	
			} else {
				$.mvalidateTip(data.msg);
			}
		})
		.fail(function() {
			$.mvalidateTip('网络错误，请重试！');
		});
	}

	// 改变按钮背景颜色
	var btnbg = $("#resetpBtn");
	btnbg.on('touchstart', function(event) {
		btnbg.addClass("btnbgColor");
	}).on('touchend', function(event) {
		setTimeout(function() {
			btnbg.removeClass("btnbgColor");
		}, 200);	
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
