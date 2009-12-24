/*
	Json Interface:
		{
			result : 0,
			msg : '发言成功',
			info : {
				id : '123456',
				time : '5分钟前',
				content : '内容'
			}
		}
*/
MI = {
	string : {
		trim : function(){
			
		},
		length : function(str){
			var arr = str.match(/[^\x00-\x80]/g);
			return str.length + (arr ? arr.length : 0);
		}
	},
	number : {
		format : function(str){ //Format: 1000 --> 1,000
			return (str + '').replace(/(?=(?!\b)(?:\w{3})+$)/g,",")
		}
	},
	validate : {
		account : {
			rule : function(str){
				if (str.length == 0) return '这里是必须要填的';
				if (str.length < 4 || str.length > 12 || str.match(/^\d/g)) return '4-12个英文汉字，以字母开头';
			},
			replace : function(str){
				var value = str.match(/[\d]|[a-zA-Z]/g);
				return value ? value.join('') : str;
			},
			remove : true, //If Submit Success Remove It
			success : '帐号已经注册成功',
			url : '/checkAccount.php'
		},
		nick : {
			rule : function(str){
				var length = MI.string.length(str);
				if (length == 0) return '这里是必须要填的';
				if (length < 4 || length > 12) return '4-12个字符长度的汉字、字母或数字';
			}
		}
	},
	tmpl : {
		list : '<li class="_newMsg" id="<%=info.id%>"><div class="userPic"><a href="#"><img src="<%=info.userPic%>" alt="" /></a></div><div class="msgBox"><div class="userName"><a href="#"><strong><%=info.userName%></strong></a> <!-- 转播 --></div><div class="msgCnt"><%=info.content%></div><div class="pubInfo"><span class="left"><a href="#"><%=info.time%></a>通过<a href="#"><%=info.sorurce%></a><!-- <a href="#" class="zfNum">转<strong>876</strong>次</a> --></span><p class="funBox"><a href="javascript:void(0)" onclick="MI.talkList.remove(\'<%=info.id%>\',this)" class="del">删除</a><!-- <a href="#" class="talk">回复</a><a href="#" class="zf">转播</a> --></p></div></div></li>'
	},
	countNum : function(el,num,format){
		if (format) {
			el.innerHTML = MI.number.format(parseInt(el.innerHTML.replace(/,/g,'')) + num);
		}
		else el.innerHTML = parseInt(el.innerHTML) + num;
	},
	followConfig : {
		numFormat : [],
		num : []
	},
	follow : function(id,el){
		/*
			DOM:
				'followNumAll'
				'followNum_' + id
				'followedNum_' + id
		*/
		if (!MI.followConfig.init) {
			MI.followConfig.numFormat = UI.GC('.followNumFormat');
			MI.followConfig.num = UI.GC('.followNum');
			MI.followConfig.init = 1;
		}
		if (!el.sending) {
			var isFollow = -1,url,className = el.className,classNameFollow = 'addAttention',classNameUnfollow = 'delAttention',followedNum = UI.G('followedNum_' + id),followNum = UI.G('followNum_' + id);
			if (className == classNameFollow) {
				isFollow = 1;
				url = '/follow.php';
			}
			else {
				url = '/unfollow.php';
			}

			el.sending = true;
			UI.get(url,{u:id,r:+new Date()},function(data){
				el.sending = false;
				data = eval('(' + data + ')');
				//data = {result:0,msg:''};
				if (data.result == 0) {
					//Change Button's ClassName
					if (isFollow == 1) {
						el.className = classNameUnfollow;
					}
					else el.className = classNameFollow;

					//Count Number
					if (followedNum) {
						MI.countNum(followedNum,isFollow);
					}
					if (followNum) {
						MI.countNum(followNum,isFollow);
					}
					for (var i = 0,num = MI.followConfig.numFormat.length;i < num;i++) {
						MI.countNum(MI.followConfig.numFormat[i],isFollow,true);
					}
					for (var i = 0,num = MI.followConfig.num.length;i < num;i++) {
						if (UI.A(MI.followConfig.num[i],'rel') == id) {
							MI.countNum(MI.followConfig.num[i],isFollow);
						}
					}
				}
				else alert(data.msg);
			});
		}
	}
}
MI.TalkBox = function(id){ //Talk Box
	this._box = UI.G(id);
	if (this._box) {
		var Self = this;

		//DOM
		Self._txt = Self.$('textarea');
		Self._tip = Self.$('.countTxt');
		Self._btn = Self.$('.sendBtn');
		Self._topic = Self.$('.creatNew');
		Self._video = Self.$('.newVideo');
		Self._pic = Self.$('.insertPic');
		Self._close = Self.$('.closeBtn');
		Self._num = UI.G('talkNum');
		
		UI.ready(function(){
			setTimeout(function(){
				Self._txt.value = '';
				Self._txt.blur();
			},0);

			//Talk Text
			Self._txt.onkeydown = function(e){
				if (!Self.sending) {
					Self.countTxt();
					var E = UI.E(e);
					if (E.ctrl && E.key == 13) {
						Self.sending = true; //Don't Count And Send When 'sending == true'
						Self.countTxt();
						Self.send();
					}
				}
			};
			Self._txt.onkeyup = function(){
				if (!Self.sending) {
					Self.countTxt();
				}
			};
			Self._txt.onfocus = function(){
				UI.hide(UI.prev(this));
				this.focused = true;
			};
			Self._txt.onblur = function(){
				if (Self._txt.value == 0) {
					UI.show(UI.prev(this));
				}
				this.focused = false;
			};

			//New Topic
			if (Self._topic) {
				Self._topic.onclick = function(){
					Self.addTopic();
				}
			}
			//Add Video
			if (Self._video) {
				
			}
			//Add Photo
			if (Self._pic) {
				
			}

			//Submit Button
			Self._btn.onfocus = function(){
				this.blur();
			};
			Self._btn.onclick = function(){
				Self.countTxt();
				Self.send();
			};
		});
	}
}
MI.TalkBox.prototype = {
	delay : {},
	txtMax : 140,
	txtTopic : '#请在这里输入自定义话题#',
	countTxt : function(){
		var txt = this._txt,talkTip,length = Math.ceil(MI.string.length(txt.value.replace(new RegExp(this.txtTopic,'g'),'')) / 2);
		if (length > this.txtMax) {
			talkTip = '超出<em class="error">';
			UI.addClass(this._btn,'disabled');
		}
		else {
			talkTip = '还能输入<em>';
			UI.removeClass(this._btn,'disabled');
		}
		if (length == 0) {
			UI.addClass(this._btn,'disabled');
		}
		this.showTip(talkTip + Math.abs(this.txtMax - length) + '</em>字');
	},
	selectTxt : function(el,start,end){
		var range;
		if (document.createRange) {
			el.setSelectionRange(start,end);
		}
		else {
			range = el.createTextRange();
			range.collapse(true);
			range.moveStart("character",start);
			range.moveEnd("character",end - start);
			range.select();
		}
	},
	showTip : function(msg){
		this._tip.innerHTML = msg;
	},
	send : function(){
		var Self = this;

		if (UI.hasClass(this._btn,'disabled')) {
			if (this._txt.value.length) {
				this._txt.focus();
			}
			return false;
		}
		UI.addClass(this._btn,'disabled');
		//Post Data
		UI.ajax({
			url : "/publish.php",
			data : {content:Self._txt.value},
			success : function(data){
				data = eval('(' + data + ')');
				/*data = {
					result : 0,
					msg : '发言成功',
					info : {
						id : '123456',
						time : '5分钟前',
						content : '内容',
						sorurce : '腾讯微博'
					}
				};*/
				if (data.info) {
					data.info.userPic = MI.user.pic;
					data.info.userName = MI.user.name;
				}

				//Show Tips
				Self.showTip('<span' + (data.result < 0 ? ' class="error"' : '') + '><em>&nbsp;</em>' + data.msg + '</span>');
				Self.delay.tip = setTimeout(function(){
					UI.animate(Self._tip,'opacity',0,function(){
						Self._txt.value = '';
						Self._txt.focus();
						Self.countTxt();
						UI.C(Self._tip,'opacity','');
						Self._tip.style.filter = '';
						Self.sending = false;
					});
				},1000);
				if (Self._num) {
					MI.countNum(Self._num,1);
				}

				//Add New Talk To Talk List
				if (data.result == 0) {
					var newTalk = UI.html(new UI.tmplString(MI.tmpl.list)(data))[0];
					UI.C(newTalk,'opacity',0);
					UI.prepend(newTalk,MI.talkList._body);
					UI.animate(newTalk,'opacity',1,null,0.2);
				}
			}
		});
		return false;
	},
	addTopic : function(){
		this._txt.focus();

		//Add Topic
		var txt = this._txt.value;
		if (!txt.hasString(this.txtTopic)) {
			this._txt.value = txt = txt + this.txtTopic;
		}
		var indexOf = txt.indexOf(this.txtTopic),len;
		if (indexOf == -1) {
			indexOf = 0
		}
		len = this.txtTopic.length + indexOf;
		this.selectTxt(this._txt,indexOf + 1,len - 1);
		this._txt.scrollTop = 999; //Textarea Scroll To End

		this.countTxt();
	},
	$ : function(className){
		return UI.GC(this._box,className)[0];
	}
}
MI.TalkList = function(id){ //Talk List
	this._body = UI.G(id);
};
MI.TalkList.prototype = {
	remove : function(id,target){
		var talk = UI.G(id);
		if (!talk.sending) {
			UI.get('/delete.php',{id:id},function(data){
				/*
					data.result :
						 0 = '删除成功'
						-1 = '未登录'
						-2 = '未注册用户'
						-3 = '系统繁忙'
				*/
				data = eval('(' + data + ')');
				if (data.result == 0) {
					if (MI.talkBox && MI.talkBox._num) {
						MI.countNum(MI.talkBox._num,-1);
					}
					UI.animate(talk,'opacity',0,function(){
						UI.remove(talk);
					});
				}
				else alert(data.msg);
				talk.sending = false;
			});
			talk.sending = true;
		}
	}
};
MI.Validate = function(o){ //Validate
	/*
		account : {
			rule : function(str){
				return 'error';
			},
			replace : function(str){
				
			}
		}
	*/
	this.data = o;
	this.check = o.check; //Other Validate
	this.isAjax = o.isAjax == undefined ? 1 : o.isAjax; //Submit By Ajax
	this._body  = UI.G(o.id); //Form
	
	var Self = this,msgFunction,index = 0,target;
	if (UI.isFunction(o.messages)) {
		msgFunction = true;
	}

	for (var i in this.data.inputs) {
		target = this.data.inputs[i].target = UI.G(i); //Target Dom
		if (msgFunction) {
			this.data.inputs[i].message = o.messages(o.inputs[i].target);
		}
		else {
			this.data.inputs[i].message = o.messages[index];
			index++;
		}
		UI.A(this.data.inputs[i].message,'rel',this.data.inputs[i].message.innerHTML);
		this.data.inputs[i].ico = UI.html('<b class="pass" style="display:none"></b>')[0];
		UI.after(this.data.inputs[i].ico,this.data.inputs[i].target);

		//Event
		target.onfocus = function(){
			this.ico = false;
			this.focused = true;
		};
		target.onblur = function(){
			this.blured = true; //If Need To Check
			this.ico = true; //If Need To Add Ico
			this.focused = false;
		};
		UI.EA(target,'blur',validate);
		UI.EA(target,'keyup',validate);
	}

	UI.EA(this._body,'submit',function(e){
		var E = UI.E(e),data = {};
		Self.success = 1; //No Error
		if (Self.isAjax) {
			E.prevent();
		}
		if (Self.check && Self.check()) {
			return false;
		}
		for (var i in Self.data.inputs) { //Validate All Input
			validate(i);
		}
		//Submit
		if (Self.success && Self.isAjax) {
			for (var i in Self.data.inputs) {
				data[i] = UI.G(i).value;
			}
			UI.get(UI.A(Self._body,'action'),data,function(data){
				//data = {result:0,msg:'用户未登陆',info:[{result:0,msg:'正确'},{result:0,msg:'正确'}]};
				data = eval('(' + data + ')');
				var index = 0,success = 1,input;
				if (data.result == 0) {
					for (var i in Self.data.inputs) {
						input = Self.data.inputs[i];
						if (data.info[index].result == 0) {
							if (!input.removed) {
								if (input.success) {
									Self.showMessage(input,input.success,true);
								}
								else Self.hideMessage(input);
								if (input.remove) {
									UI.A(input.target,'disabled','disabled');
									input.removed = true;
								}
							}
						}
						else {
							Self.showMessage(input,data.info[index].msg);
							success = 0;
						}
						index++;
					}
					if (success && Self.data.success) {
						Self.data.success();
					}
				}
				else {
					alert(data.msg);
				}
			});
		}
		else if (!Self.success) {
			E.prevent();
		}
	});
	function validate(e){
		var E,i,input,value,valueReplaced,error = 0,isSubmit = 0;
		if (UI.isString(e)) {
			i = e;
			isSubmit = 1;
		}
		else {
			E = UI.E(e);
			i = UI.A(E.target,'name');
		}
		input = Self.data.inputs[i],target = input.target,value = target.value;
		if (input.removed) { //Don't Validate Removed Input
			return false;
		}
		if (input.replace) {
			valueReplaced = input.replace(value);
			if (value != valueReplaced) {
				target.value = valueReplaced;
			}
		}
		if (isSubmit ? 1 : target.blured) {
			error = input.rule(target.value);
			if (!error) { //Not Error
				if (!input.url || (input.url && target.focused) ) {
					Self.hideMessage(input);
				}
			}
			else {
				Self.showMessage(input,error);
				Self.success = 0;
			}
		}
		//Ajax Check
		if (!isSubmit && !error && input.url && target.blured && E.type == 'blur') {
			UI.get(input.url,{i:value},function(data){
				data = eval('(' + data + ')');
				if (data.result == 0) {
					Self.hideMessage(input);
				}
				else {
					Self.showMessage(input,data.msg);
					Self.success = 0;
				}
			});
		}
	};
}
MI.Validate.prototype = {
	showMessage : function(o,text,success){
		if (!text) {
			text = UI.A(o.message,'rel');
		}
		o.message.innerHTML = text;
		UI.addClass(o.message,success ? 'success' : 'error');
		if (success) {
			UI.show(o.ico);
		}
		else UI.hide(o.ico);
	},
	hideMessage : function(o){
		o.message.innerHTML = UI.A(o.message,'rel');
		UI.removeClass(o.message,'error');
		UI.removeClass(o.message,'success');
		if (o.target.ico) {
			UI.show(o.ico);
		}
	}
}
MI.RelateSelect = function(o){ //RelateSelect
	var Self = this,select,selectFirst,option,value;
	this._body = UI.G(o.id);
	select = UI.GT(this._body,'select');
	this._first = select[0];
	this._second = select[1];
	this.data = {};

	this._first.innerHTML = this._second.innerHTML = '';
	for (var i in o.data) {
		option = UI.DC('option'),value = i.split(',');
		option.innerHTML = value[0];
		option.value = value[1];
		UI.append(option,this._first);
		this.data[value[1]] = o.data[i];

		if (!selectFirst) {
			selectFirst = value[1];
		}
	}
	this.show(selectFirst);

	//Event
	this._first.onchange = function(){
		Self.show(this.value);
	}
}
MI.RelateSelect.prototype = {
	show : function(index) {
		var option,value;
		this._second.innerHTML = '';
		for (var i = 0,num = this.data[index].length;i < num;i++) {
			option = UI.DC('option'),value = this.data[index][i].split(',');
			option.innerHTML = value[0];
			option.value = value[1];
			UI.append(option,this._second);
		}
	}
}