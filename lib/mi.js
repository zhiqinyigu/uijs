MI = {
	String : {
		trim : function(){
			
		},
		length : function(str){
			var arr = str.match(/[^\x00-\x80]/g);
			return str.length + (arr ? arr.length : 0);
		}
	},
	tmpl : {
		list : '<li class="_newMsg" id="talk_<%=info.id%>"><div class="userPic"><a href="#"><img src="<%=info.userPic%>" alt="" /></a></div><div class="msgBox"><div class="userName"><a href="#"><strong><%=info.userName%></strong></a> 转播</div><div class="msgCnt"><%=info.content%></div><div class="pubInfo"><span class="left"><a href="#"><%=info.time%></a>通过<a href="#">QQ</a><a href="#" class="zfNum">转<strong>876</strong>次</a></span><p class="funBox"><a href="javascript:void(0)" onclick="MI.talkList.remove(\'talk_<%=info.id%>\')" class="del">删除</a><!-- <a href="#" class="talk">回复</a><a href="#" class="zf">转播</a> --></p></div></div></li>'
	},
	$ : function(className){
		return UI.GC(this._box,className)[0];
	}
}
MI.TalkList = function(id){ //Talk List
	this._body = UI.G(id);
};
MI.TalkList.prototype = {
	remove : function(id){
		var talk = UI.G(id);
		UI.animate(talk,'opacity',0,function(){
			UI.remove(talk);
		});
	}
};
MI.TalkBox = function(id){ //Talk Box
	this._box = UI.G(id);
	if (this._box) {
		var Self = this;

		//DOM
		Self._txt = MI.$('textarea');
		Self._tip = MI.$('.countTxt');
		Self._btn = MI.$('.sendBtn');
		Self._topic = MI.$('.creatNew');
		Self._video = MI.$('.newVideo');
		Self._pic = MI.$('.insertPic');
		Self._close = MI.$('.closeBtn');
		
		UI.ready(function(){
			setTimeout(function(){
				Self._txt.value = '';
				Self._txt.blur();
			},0);

			//Talk Text
			Self._txt.onkeydown = function(e){
				Self.countTxt();
				var E = UI.E(e);
				if (E.ctrl && E.key == 13) {
					Self.send();
				}
			};
			Self._txt.onkeyup = function(){
				Self.countTxt();
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
		var txt = this._txt,talkTip,length = Math.ceil(MI.String.length(txt.value.replace(new RegExp(this.txtTopic,'g'),'')) / 2);
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
			data : 'content=' + Self._txt.value,
			success : function(data){
				data = eval('(' + data + ')');
				/*data = {
					result : 0,
					msg : '发言成功',
					info : {
						id : '123456',
						time : '5分钟前',
						content : '内容'
					}
				};*/
				data.info.userPic = MI.user.pic;
				data.info.userName = MI.user.name;

				//Show Tips
				Self.showTip('<span' + (data.result < 0 ? ' class="error"' : '') + '><em>&nbsp;</em>' + data.msg + '</span>');
				Self.delay.tip = setTimeout(function(){
					UI.animate(Self._tip,'opacity',0,function(){
						Self._txt.value = '';
						Self._txt.focus();
						Self.countTxt();
						UI.C(Self._tip,'opacity','');
						Self._tip.style.filter = '';
					});
				},1000);

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
	}
}
MI.Validate = function(o){
	this.data = o;
	this._body  = UI.G(o.id);
	//this._btn = UI.GC(this._body,'input[type=submit]')[0];
	
	var Self = this,msgFunction,index = 0,target;
	if (UI.isFunction(o.messages)) {
		msgFunction = true;
	}
	/*
		account : {
			rule : [
				function(){
					
				}
			],
			text : [
				'error'
			]
		}
	*/
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

		//Event
		target.onfocus = function(){
			this.focused = true;
		};
		UI.EA(target,'blur',validate);
		UI.EA(target,'keyup',validate);
	}

	UI.EA(this._body,'submit',function(e){
		var E = UI.E(e);
		for (var i in Self.data.inputs) { //Validate All Input
			validate(i);
		}
		E.prevent();
	});
	function validate(e){
		var E,i,value,error = 0,isSubmit = 0;
		if (UI.isString(e)) {
			i = e;
			isSubmit = 1;
		}
		else {
			E = UI.E(e);
			i = UI.A(E.target,'name');
		}
		value = Self.data.inputs[i].target.value;
		if (Self.data.inputs[i].replace) {
			Self.data.inputs[i].target.value = Self.data.inputs[i].replace(value);
		}
		if (isSubmit ? 1 : Self.data.inputs[i].target.focused) {
			for (var j = 0,num = Self.data.inputs[i].rule.length;j < num;j++) { //Rule
				if (Self.data.inputs[i].rule[j](Self.data.inputs[i].target.value)){
					Self.showMessage(Self.data.inputs[i],j);
					error = 1;
					break;
				}
			}
			if (!error) { //Not Error
				Self.hideMessage(Self.data.inputs[i]);
			}
		}
	};
	console.log(this.data);
}
MI.Validate.prototype = {
	showMessage : function(o,index){
		o.message.innerHTML = o.text[index];
		UI.addClass(o.message,'error');
	},
	hideMessage : function(o){
		o.message.innerHTML = UI.A(o.message,'rel');
		UI.removeClass(o.message,'error');
	}
}