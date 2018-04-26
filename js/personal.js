$(function () {
	
	// 初始化节点(全局)
	var Node = {
		name: $("#name"),
		sex: $("#sex"),
		birthDay: $("#birth"),
		tel: $("#tel"),
		email: $("#email"),
		id: $("#documents"),
		idType: $("#cardType"),
		urger: $("#urger"),
		urgtel: $("#urgtel"),
		addRess: $("#expressArea"),
		country: $("#country"),
		bloodType: $("#bloodtype"),
		education: $("#education"),
		job: $("#job"),
		postCode: $("#postcode"),
		finshBtn: $("#finshBtn").find('button')
	}

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
		Tidcard: false,
		Turger: false,
		Turgtel: false
	};
	// 正则验证表达式
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
				pattern: '<div class="field-invalidmsg">紧急联系人格式不正确</div>',
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
	$('#personal-form').mvalidate({
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

	// 个人资料验证
	var personData = (function () {
		var infor = {
			init: function () {
				this.initNode();
				this.addEvent();
			},
			// 初始化节点
			initNode: function () {
				this.name = Node.name;
				this.birthDay = Node.birthDay;
				this.tel = Node.tel;
				this.email = Node.email;
				this.id = Node.id;
				this.urger = Node.urger;
				this.urgtel = Node.urgtel;
				this.$btn = $("#finshBtn").find("button");
			},
			// 绑定事件
			addEvent: function () {
				this.$btn.on('click', this.validate.bind(this));
			},
			// 验证
			validate: function () {
				var vname = this.name.val(),
					vbirth = this.birthDay.val(),
					vtel = this.tel.val(),
					vemail = this.email.val(),
					vid = this.id.val(),
					vurger = this.urger.val(),
					vurgtel = this.urgtel.val();
				// 判断是否选择日期
				if (vbirth === "") {
					$.mvalidateTip("请选择出生年月");
					return;
				};
				this.message(vname, vtel, vemail, vid, vurger, vurgtel);
				// 判断验证，验证正确调用ajax
				if ((target.Tname === true)&&(target.Ttel === true)&&(target.Temail === true)&&(target.Tidcard === true)&&(target.Turger === true)&&(target.Turgtel === true)) {
					Node.finshBtn.html("<img src='https://ohc5vthqm.qnssl.com/syshu/2017-12-04/Spinner.svg'>保存中...");
					Node.finshBtn.prop('disabled', true);
					userCenter.updataUser();
					return;
				}
			},
			// 验证信息
			message: function (username, usertel, useremail, idcard, userurger, userurgtel) { // 进行正则匹配验证
				rname.test(username)?(target.Tname = true):(target.Tname = false);
				rtel.test(usertel)?(target.Ttel = true):(target.Ttel = false);
				remail.test(useremail)?(target.Temail = true):(target.Temail = false);
				ridcard.test(idcard)?(target.Tidcard = true):(target.Tidcard = false);
				rname.test(userurger)?(target.Turger = true):(target.Turger = false);
				rtel.test(userurgtel)?(target.Turgtel = true):(target.Turgtel = false);
			}	
		}
		return infor;
	})();
	personData.init();

	// ajax
	var userToken = localStorage.getItem('_TOKEN_'),
		getId = localStorage.getItem("_USERID_");
	// 个人中心
	var userCenter = (function() {
		var myCenter = {
			init: function() {
				this.getUserInfo();
			},
			// 获取用户信息
			getUserInfo: function() {
				var that = this;
				$.ajax({
					url: api + 'user/getUserInfo',
					type: 'post',
					dataType: 'json',
					contentType: "application/json;charset=UTF-8",
					data: JSON.stringify({
						userId: getId
					})
				})
				.done(function(data) {
					// console.log(data);
					let p = new Promise((resolve, reject) => {
						resolve(data.data)
					})
					p.then(res => {
						console.log('res:', res)
					})
					if ((data.success === true)) { // 如果成功重新渲染页面
						var newbirth = '',
							Data = data.data,
							IDtype = Data.cardType,
							birth = Data.birthday,
							province = Data.province ? Data.province : '',
							city = Data.city ? Data.city : '',
							place = Data.place ? Data.place : '',
							addRess = Data.place ? `${province}-${city}-${place}` : city ? `${province}-${city}` : '';	 
						// 传入参数，调用函数commRender
						that.commRender(newbirth, Data, IDtype, birth, addRess, Data.country, Data.bloodType, Data.education, Data.profesion);
					}
					// 加载动画
					$(function($) {
						var timer = setTimeout(function() {
							var $loadbox = $("#loadbox");
							$loadbox.addClass('fadeout');
							$loadbox.fadeOut(300).html('');
						}, 500);
					});
				})
				.fail(function() {
					console.log("error");
				});
			},
			// 更新用户信息
			updataUser: function() {
				var initNode = {
					name: $.trim(Node.name.val()),
					sex: Node.sex.val(),
					birthDay: Node.birthDay.val(),
					tel: $.trim(Node.tel.val()),
					email: $.trim(Node.email.val()),
					id: $.trim(Node.id.val()),
					idType: Node.idType.val(),
					urger: $.trim(Node.urger.val()),
					urgtel: $.trim(Node.urgtel.val()),
					uaddRess: $.trim(Node.addRess.text()),
					nationality: Node.country.val(),
					bloodtype: Node.bloodType.val(),
					education: Node.education.val(),
					job: Node.job.val(),
					postcode: $.trim(Node.postCode.val())
				};
				var site = initNode.uaddRess.split('-')
				var newsite = {
					province: site[0] ? site[0] : '',
					city: site[1] ? site[1] : '',
					place: site[2] ? site[2] : ''
				}
				$.ajax({
					url: api + 'user/updateUser',
					type: 'post',
					dataType: 'json',
					contentType: "application/json;charset=UTF-8",
					data: JSON.stringify({
						userId: getId,
						name: initNode.name,
						gender: initNode.sex,
						birthday: initNode.birthDay,
						phone: initNode.tel,
						emile: initNode.email,
						cardId: initNode.id,
						cardType: initNode.idType,
						province: newsite.province,
						city: newsite.city,
						place: newsite.place,
						country: initNode.nationality,
						bloodType: initNode.bloodtype,
						education: initNode.education,
						profesion: initNode.job,
						postCode: initNode.postcode,
						emergencyName: initNode.urger,
						emergencyPhone: initNode.urgtel
					}),
					headers: {
						"Authorization": `Bearer ${userToken}`
					}
				})
				.done(function(data) {
					// console.log(data);
					// 加载动画
					$(function($) {
						var timer = setTimeout(function() {
							Node.finshBtn.html("保 存");
							Node.finshBtn.prop('disabled', false);
							$.mvalidateTip("保存成功");
						}, 1000);
					});
				})
				.fail(function() {
					console.log("error");
				});
			},
			// 公共渲染，增加渲染速率
			commRender: function (userbirth, res, type, birthday, address, countryType, blood, edubg, jobType) {
				(birthday != null ? (userbirth = birthday.replace(/T00:00:00/, "")) : userbirth); // 判断生日是否为空
				(res.gender == '2' ? (Node.sex.val('2')) : (Node.sex.val('1'))); // 判断男女
				// 判断证件类型
				switch (type) {
					case 1:
						Node.idType.val("1");
						break;
					case 2:
						Node.idType.val("2");
						break;
					case 3:
						Node.idType.val("3");
						break;
					case 4:
						Node.idType.val("4");
						break;
				};
				// 国籍
				switch (Number(countryType)) {
					case 1:
						Node.country.val("1");
						break;
					case 2:
						Node.country.val("2");
						break;
					case 3:
						Node.country.val("3");
						break;
				};
				// 血型
				switch (Number(blood)) {
					case 1:
						Node.bloodType.val("1");
						break;
					case 2:
						Node.bloodType.val("2");
						break;
					case 3:
						Node.bloodType.val("3");
						break;
					case 4:
						Node.bloodType.val("4");
						break;
					case 5:
						Node.bloodType.val("5");
						break;
				};
				// 学历
				switch (Number(edubg)) {
					case 1:
						Node.education.val("1");
						break;
					case 2:
						Node.education.val("2");
						break;
					case 3:
						Node.education.val("3");
						break;
					case 4:
						Node.education.val("4");
						break;
					case 5:
						Node.education.val("5");
						break;
				};
				// 职业
				switch (Number(jobType)) {
					case 1:
						Node.job.val("1");
						break;
					case 2:
						Node.job.val("2");
						break;
					case 3:
						Node.job.val("3");
						break;
					case 4:
						Node.job.val("4");
						break;
					case 5:
						Node.job.val("5");
						break;
					case 6:
						Node.job.val("6");
						break;
				};
				Node.name.val(res.name);
				Node.birthDay.val(userbirth);
				Node.tel.val(res.phone);
				Node.email.val(res.emile);
				Node.id.val(res.cardId);
				Node.urger.val(res.emergencyName);
				Node.urgtel.val(res.emergencyPhone);
				Node.addRess.text(address);
				Node.postCode.val(res.postCode);
				// 存储用户信息
				localStorage.setItem('u_info', JSON.stringify(res));
			}
		};
		return myCenter;	
	})();
	userCenter.init();

	// 改变按钮背景颜色
	var $btnbg = $("#finshBtn").find('button');
	$btnbg.on('touchstart', function(event) {
		$btnbg.addClass("btnbgColor");
	}).on('touchend', function(event) {
		setTimeout(function() {
			$btnbg.removeClass("btnbgColor");
		}, 200);	
	});
})