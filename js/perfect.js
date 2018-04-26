$(function () {
	
	// 初始化节点(全局)
	var Node = {
		name: $("#name"),
		sex: $("#sex"),
		birthDay: $("#birth"),
		tel: $("#tel"),
		email: $("#email"),
		id: $("#idInput"),
		urger: $("#urger"),
		urgtel: $("#urgtel")
	};

	// 获取内存数据渲染
	var userToken = localStorage.getItem('_TOKEN_'),
		getId = localStorage.getItem("_USERID_"),
		userInfro = JSON.parse(localStorage.getItem("u_info")),
	  urgerName = userInfro.emergencyName,
		urgtelPhone = userInfro.emergencyPhone;
	console.log(userInfro);
	// 将获取的紧急联系人信息填充进报名资料
	Node.urger.val(urgerName);
	Node.urgtel.val(urgtelPhone);

	// 选项日期
	Node.birthDay.datePicker({
		beginyear: 1910,
		theme: 'date',
	});

	// 初始化target
	var target = {
		Tname: false,
		Ttel: false,
		Temail: false,
		Tidcard: false
	}
	// 正则验证
	var rname = /^[\u4e00-\u9fa5]{1,}$/,
		rtel = /^1[3|4|5|7|8|9][0-9]\d{8}$/,
		remail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		ridcard = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;

	// 自定义错误提示
	$.mvalidateExtend({
		name: {
			required: true,
			pattern: rname,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">姓名不能为空</div>',
				pattern: '<div class="field-invalidmsg">姓名格式只能为中文</div>',
				valid: '<div class="field-validmsg">格式正确</div>'
			}
		},
		tel: {
			required: true,
			pattern: rtel,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">请输入手机号码</div>',
				pattern: '<div class="field-invalidmsg">手机号格式不正确</div>',
				valid: '<div class="field-validmsg">手机号格式正确</div>'
			}
		},
		email: {
			required: true,
			pattern: remail,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">请输入邮箱</div>',
				pattern: '<div class="field-invalidmsg">邮箱格式不正确</div>',
				valid: '<div class="field-validmsg">邮箱号格式正确</div>'
			}
		},
		idcard: {
			required: true,
			pattern: ridcard,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">请输入证件号码</div>',
				pattern: '<div class="field-invalidmsg">证件号格式不正确</div>',
				valid: '<div class="field-validmsg">证件号格式正确</div>'
			}
		},
		urger: {
			required: true,
			pattern: rname,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">紧急联系人不能为空</div>',
				pattern: '<div class="field-invalidmsg">请认真输入紧急联系人</div>',
				valid: '<div class="field-validmsg">格式正确</div>'
			}
		},
		urgtel: {
			required: true,
			pattern: rtel,
			each: function() {},
			descriptions: {
				required: '<div class="field-invalidmsg">请输入紧急联系人电话</div>',
				pattern: '<div class="field-invalidmsg">紧急联系人电话格式不正确</div>',
				valid: '<div class="field-validmsg">格式正确</div>'
			}
		}
	});
	// 初始化个人中心表单
	$('#perfect-form').mvalidate({
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
		eachInvalidField: function(event, status, options) {}
	});

	// 完善资料
	var personData = (function () {
		var flag = true; // 用来作为判断是否选择日期的标识
		var infor = {
			init: function () {
				this.initNode();
				this.addEvent();
			},
			// 初始化节点
			initNode: function () {
				this.birthDay = Node.birthDay;
				this.name = Node.name;
				this.tel = Node.tel;
				this.email = Node.email;
				this.id = Node.id;
				this.$btn = $("#nextStep").find("button");
			},
			// 绑定事件
			addEvent: function () {
				this.$btn.on('click', this.validate.bind(this));
			},
			// 验证
			validate: function () {
				var vname = $.trim(this.name.val()),
					vtel = $.trim(this.tel.val()),
					vemail = $.trim(this.email.val()),
					vid = $.trim(this.id.val()),
					vbirth = this.birthDay.val();
				// 判断是否选择日期
				if (vbirth === "") {
					$.mvalidateTip("请选择出生年月");
					flag = false;
				} else {
					flag = true;
				};
				this.message(vname, vtel, vemail, vid);
				// 判断验证，验证正确调用ajax
				if ((target.Tname === true)&&(flag === true)&&(target.Ttel === true)&&(target.Temail === true)&&(target.Tidcard === true)) {
					userApply(vname, vtel, vemail, vid, vbirth);
					return;	
				}
			},
			// 验证信息
			message: function (username, usertel, uemail, idcard) { // 进行正则匹配验证
				rname.test(username)?(target.Tname = true):(target.Tname = false);
				rtel.test(usertel)?(target.Ttel = true):(target.Ttel = false);
				remail.test(uemail)?(target.Temail = true):(target.Temail = false);
				ridcard.test(idcard)?(target.Tidcard = true):(target.Tidcard = false);
			}
		}
		return infor;
	})();
	personData.init();

	// ajax
	// 用户报名
	function userApply(userName, userTel, userEmail, idCard, birthDay) {
		$.ajax({
			url: api + 'match/addMatchRecord',
			type: 'post',
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				userId: getId,
				matchId: "1",
				name: userName,
				gender: Node.sex.val(),
				birthday: birthDay,
				phone: userTel,
				emile: userEmail,
				cardId: idCard
			}),
			headers: {
				"Authorization": `Bearer ${userToken}`
			}
		})
		.done(function(res) {
			console.log(res);
			if (res.success) {
				var matchId = res.data.matchId;
				localStorage.setItem("matchId", matchId);
				window.location.href = "Registration-details.html";
			} else {
				$.mvalidateTip(res.msg);
				return;
			}
		})
		.fail(function() {
			console.log("error");
		});
	}

	// 加载动画
	$(function ($) {
		var timer = setTimeout(function () {
			var $loadbox = $("#loadbox");
			$loadbox.addClass('fadeout');
			$loadbox.fadeOut(300).html('');
		}, 500);
	})

	// 改变按钮背景颜色
	var $btnbg = $("#nextStep").find('button');
	$btnbg.on('touchstart', function(event) {
		$btnbg.addClass("btnbgColor");
	}).on('touchend', function(event) {
		setTimeout(function() {
			$btnbg.removeClass("btnbgColor");
		}, 200);	
	});

})