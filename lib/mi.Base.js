MI.Base = {};
MI.tmpl.msg = '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>"><div class="msgBox"><div class="userName">发给 <a href="/<%=talk[i].name%>" title="<%=talk[i].nick%>(@<%=talk[i].name%>)"><%=talk[i].nick%></a>'+MIIcon('talk[i].flag')+'</div><div class="msgCnt"><%=talk[i].content%></div><div class="pubTime"><span class="time"><%=talk[i].time%></span></div><p class="btnBox"><a href="#" class="replyMsg btn" rel="<%=talk[i].name%>">再写一封</a><a class="btn delBtn" href="#">删除</a></p></div></li><%}%>';
MI.tmpl.msgBox = '<div><table border="0" cellspacing="0" cellpadding="0" class="letterBg"><tr><th>收信人</th><td><div class="txtWrap"><input type="text" name="userName" id="userName" class="msgTo inputTxt" value=""/> <span class="cNote">请输入你的听众的微博帐号</span></div></td></tr><tr><th>内　容</th><td><div class="txtWrap"><textarea type="text" class="inputArea noAutoCmt"></textarea></div></td></tr><tr><th></th><td><input type="button" class="sendBtn inputBtn" value="发送" title="快捷键 Crtl+Enter" /><span class="countTxt"></span></td></tr></table></div>';
MI.tmpl.black = '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>确定将<%=sex%>拉入黑名单？</h2><p><span class="fs14">拉黑之后...</span><br/>你们之间的收听关系将被解除，对方无法再收听你，而且你也不再收到来自<%=sex%>的任何消息与通知</p><p><input type="button" value="确定" id="blackTipBtn" /><input type="button" value="取消" onclick="MI.dialog.hide()"/></p></div>';
MI.tmpl.unblack = '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>你真的原谅<%=sex%>了吗？</h2><p><span class="fs14">取消之后...</span><br/>你会重新收到来自<%=sex%>的私信和其它通知</p><p><input type="button" value="确定" id="blackTipBtn"/><input type="button" value="取消" onclick="MI.dialog.hide()"/></p></div>';
MI.tmpl.card = '<div class="uCard"><div class="tip">这是你自己</div><div class="tip"></div><div class="userPic"><a></a><p class="btn"><input type="button" class="addAttention" value="" /><a href="#" class="delAttention" title="取消收听">取消</a></p></div><div class="uCardcnt"><p class="userName"></p><p class="nums loading"></p><p class="btn"><a href="#" class="reply">对话</a><a href="#" class="msg">私信</a><a href="#" class="black">拉黑</a></p><div class="tagBox"></div><a href="#" class="ico_sFo"></a></div></div>';
MI.tmpl.code = '<div class="verify"><span class="ico_tsW"><span class="ico_te"></span></span><h3></h3><div class="clear"><form><div class="left">验证码：</div><div class="verifyInput"><input type="text" class="inputTxt" /><div class="cNote">输入下图中的字符，不区分大小写</div><img width="130" height="53">&nbsp;<a href="#" class="codeChange">看不清，换一张</a></div></div><div class="btnBox"><button type="submit" class="btn2">确定</button><button class="btn2">取消</button></form></div></div>';

MI.SmartBox = function(id,callback,type,style){ //input element,callback,search type
	if(!$(id)) return;
	var Self = this;
	this._callback = callback?callback:null;
	this._key = $(id);
	this.url = '/asyn/messagetips.php';//smartbx统一服务接口
	this._type = type?type:'';//数据类型
	this._fix = UI.B.ie?[0,0]:[1,2];//用于修复ie，ff下的位置
	this.param = 'key=%key%';

	this._style = style?style:{left:0,top:0,width:306};
	this._pos = { //获取smartbox input 坐标
		x : UI.getX(this._key),
		y : UI.getY(this._key)
	};

	//初始化smartbox容器
	this._select = UI.html('<div class="smartBox"></div>')[0];
	this._list = [];//消息条数
	UI.append(this._select,document.body);
	this._key.blur();
	Self.hide();

	this._tip = this._key.previousSibling,this.tip = this._tip && this._tip.nodeName == 'LABEL';
	if (this.tip) {
		this._tip.onclick = function(){
			Self._key.focus();
		}
	}

	UI.EA(document.body,'click',function(){
		Self.hide();
	});
	/*UI.EA(window,'resize',function(){
		Self.resize();
	});*/
	UI.EA(this._key,'focus',function(){
		if (Self.tip) {
			UI.hide(Self._tip);
		}
		if(!Self.isDisplay) Self.hide();
		Self.getMsg(Self._key.value);
	});
	UI.EA(this._key,'blur',function(e){
		var target = UI.E(e).target;
		if(Self.tip && !target.value){
			UI.show(Self._tip);
		}
		setTimeout(function(){
			Self.hide();
		},500);
	});

	/*this._key.onblur = function(){
		if(!this.value) UI.show(UI.prev(this));
	}*/
	this._key.onbeforeeditfocus = function(){
		if(!Self.isDisplay) Self.hide();
	}
	this._key.onclick = function(e){
		UI.E(e).stop();
	}
	this._key.onkeydown = function(e){
		var E = UI.E(e);
		//document.title = Self.isDisplay;
		if(!Self.isDisplay){				
			if(UI.trim(this.value)){
				if(Self._list.length > 0 && (E.key == 40 ||E.key == 38)){
					Self.show();
				}else{
					Self.getMsg(this.value);
				}
			}
			return;
		}
		if (E.key == 40 || E.key == 38) {
			if (E.key == 38) {
				Self.index = (Self.index - 1 < 0) ? (Self.indexMax) :(Self.index - 1);
			}else if (E.key == 40) {
				Self.index = (Self.index + 1 > Self.indexMax) ? 0 :(Self.index + 1)
			}
			this.value = Self._list[Self.index].innerHTML;
			Self.select(Self.index);
		}else if (E.key == 13 || E.key == 27) { //Space Key : || E.key == 32 || E.key == 229
			if (E.key == 27) {
				Self.hide();
			}
			else {
				Self.select();
			}
		}
	}
	this._key.onkeyup = function(e){
		var E = UI.E(e);
		if(E.key == 40 || E.key == 38 || E.key == 13 || E.key == 27) return;
		Self.getMsg(this.value);
	}
}
MI.SmartBox.prototype = {
	//keyword : '',
	lastOrigin : null,
	isDisplay : false,
	timer : null,
	index : -1,
	indexMax : 0,
	hide : function(){
		UI.hide(this._select);
		this.isDisplay = false;
	},
	show : function(){
		if (!MI.user.fun.search) {
			return;
		}
		this.resize();
		UI.show(this._select);
		this.isDisplay = true;
	},
	select : function(index){
		this.index = index;
		if (this._list[this.index]) UI.addClass(this._list[this.index],'on');
		if (this.lastOrigin) UI.removeClass(this.lastOrigin,'on');
		this.lastOrigin = this._list[this.index];
	},
	resize : function(){
		var a = {
			x : UI.getX(this._key),
			y : UI.getY(this._key)
		}
		this._pos = a;
		this._select.style.width = this._style.width + 'px';
		this._select.style.left = this._pos.x + this._style.left + this._fix[0] + 'px';
		this._select.style.top = this._pos.y + this._key.offsetHeight + this._style.top - this._fix[1] + 'px';
	},
	getMsg : function(value){
		var Self = this;
		//document.title = UI.trim(value);
		//if(tmp == this.keyword){
		if(!UI.trim(value)){
			Self.hide();
			//this.keyword = tmp;
			return;
		}
		//}
		//this.keyword = UI.trim(value);
		var param = this.param.replace(/\%key\%/g,encodeURIComponent(value));
		if(this.timer)	clearTimeout(this.timer);
		if(this._type == 'music'){
			this.timer=window.setTimeout(function(){
				UI.getScript(Self.url+"?"+param);
			},150);
		}else{
			this.timer=window.setTimeout(function(){
				UI.get(
					Self.url,
					param,//"key=" + encodeURIComponent(value),
					function(data){
						data = MI.json(data);
						if (data.result == 0) {
							if(data.info){
								var s = [];
								var l = data.info.length;
								Self.indexMax = l - 1;
								Self.index = -1;
								s.push('<ul>');
								for(var i in data.info){
									//s.push('<p>' + Self.termJson(data.info[i],[Self.keyword]) + '</p>');
									s.push('<li value=\"'+ data.info[i] +'\" index="' + i + '">' + data.info[i] + '</li>');
								}
								s.push('</ul>');
								if (s.length == 2) {
									return;
								}
								Self._select.innerHTML = s.join("");
								Self.show();
								Self._list = $$(Self._select,'li');
								//Event
								UI.each(Self._list,function(el,i){
									el.onmouseover = function(){
										Self.select(i);
									}
									el.onclick = function(){
										Self._key.value = this.innerHTML;
										UI.A(Self._key,'index',UI.A(this,'index'));
										Self.submit();
									}
								});
							}else{Self.hide();}
							
							//Callback Function
							//if (call) {
								//call();
							//}
						}else{Self.hide();}
					}
				)
			},150);
		}
	},
	submit : function(){
		if(this._callback) this._callback();
		//var action = this.action,value = encodeURIComponent(this._key.value);
		//document.location.href = action + (action.hasString('?') ? value : encodeURIComponent(value));
	}
}
MI.Dialog = function(o){ //Dialog
	o = o || {};
	var Self = this;

	//Dom
	//Self._body.innerHTML = o.tmpl || '<div class="bg"></div><div class="CR"><div class="top"><span class="left"><em></em></span><span class="right"><em></em></span></div><div class="DTitle"></div><a' + V5 + ' class="DClose" title="关闭">关闭</a><div class="DLoad"></div><div class="DCont"></div><div class="bot"><span class="left"><em></em></span><span class="right"><em></em></span></div></div>';
	var html = o.tmpl || '<div class="D">' + (UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"></div><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><a title="关闭" class="DClose close" href="#">关闭</a><div class="DLoad"></div><div class="DCont"></div></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	Self._body = UI.html(html)[0];
	Self._bg = Self.$('.bg');
	Self._cover = Self.$('.cover_select');
	Self._wrap = Self.$('.CR');
	Self._title = Self.$('.DTitle');
	Self._close = Self.$('.DClose');
	Self._cont = Self.$('.DCont');
	Self._load = Self.$('.DLoad');

	//Event
	/*Self.key = function(e) {
		switch(UI.E(e).key) {
			case 27:
				Self.hide();
				break;
		}
	};*/
	Self.resizeBg = function(init){
		if (Self.display) {
			if (UI.B.ie) Self._bg.style.cssText += ';width:100%;';
			Self.delay = setTimeout(function(){
				var h_page = UI.pageHeight(),h_window = UI.windowHeight();
				Self._bg.style.cssText += ';margin-left:0;width:' + UI.pageWidth() + 'px;height:' + (h_page < h_window ? h_window : h_page) + 'px;';
				if (UI.B.ie6) {
					Self._cover.style.cssText = Self._bg.style.cssText;
				}
			},0);
		}
	};
	var wrap = Self._wrap;
	Self._title.onmousedown = Self._title.ontouchstart = function(e) { //Move
		var E = UI.E(e);
		var _x = E.x - parseInt(wrap.style.marginLeft);
		var _y = E.y - parseInt(wrap.style.marginTop);
		var w = UI.windowWidth(),h = UI.windowHeight(); //Kill Bug
		E.prevent();
		//UI.addClass(wrap,'move');
		document.onmousemove = document.ontouchmove = function(e) {
			var E = UI.E(e);
			if (!UI.B.ie && (E.x < 0 || E.y < 0 || E.x > w || E.y > h)) return false;
			wrap.style.marginTop = E.y - _y + 'px';
			wrap.style.marginLeft = E.x - _x + 'px';
			return false;
		}
		document.onmouseup = document.ontouchend = function() {
			document.onmousemove = document.ontouchmove = null;
			document.onmouseup = document.ontouchend = null;
			//UI.removeClass(wrap,'move');
		}
		return false;
	};
	//UI.EA(document,'keyup',Self.key);
	UI.EA(window,'resize',Self.resizeBg);
	Self._close.onclick = function(){
		Self.hide();
		return false;
	}
}
MI.Dialog.prototype = {
	width : 462,
	close : 1,
	show : function(o){
		var Self = this,css;
		if (!Self._append) {
			document.body.appendChild(Self._body);
			Self._append = 1;
			//UI.C(Self._bg,'marginLeft','-9999px');
		}

		Self.close = o.close != undefined ? o.close : Self.close;
		Self.ico = o.ico;
		if (Self.close) {
			UI.show(Self._close);
		}
		else UI.hide(Self._close);

		Self._title.innerHTML = o.title || '';
		UI.C(Self._title,'height',o.title ? '' : '0');
		if (o.html) {
			for (var i = 0,num = Self._cont.childNodes.length;i < num;i++) {
				var contChild = Self._cont.childNodes[i];
				if (contChild.nodeType == 1) {
					UI.hide(contChild);
					UI.append(contChild,document.body);
				}
			}
		}
		if (UI.isString(o.html)) {
			Self._cont.innerHTML = o.html;
		}
		else if (UI.isObject(o.html)) {
			UI.append(o.html,Self._cont);
			UI.show(o.html);
		}
		if (o.width) {
			Self.width = o.width;
		}
		if (o.height) {
			Self.height = o.height;
		}
		UI.C(Self._wrap,'width',Self.width + 'px');
		UI.C(Self._wrap,'opacity',0);
		UI.show(Self._body);
		if (Self.height) {
			UI.C(Self._cont,'height',Self.height + 'px');
		}

		css = 'width:' + Self.width + 'px;margin:' + ( UI.scrollY() - UI.height(Self._wrap)/2 ) + 'px 0 0 -' + Self.width/2 + 'px;';
		if (o.left != undefined) {
			css += 'left:' + o.left + 'px;margin-left:0;';
		}
		if (o.top != undefined) {
			css += 'top:' + o.top + 'px;margin-top:0;';
		}
		setTimeout(function(){
			Self.resizeBg();
			Self._wrap.style.cssText = css;
		},0);
		Self._wrap.style.cssText = css;

		//Function
		if (o.html) {
			if (o.start) { //Run When Open Dialog
				o.start();
			}
			if (o.end) { //Run When Close Dialog
				Self.end = o.end;
			}
			else Self.end = null;
			if (this.call) { //Run Callback Function When Open Dialog
				this.call();
			}
		}

		Self.display = 1;
		if (!UI.B.firefox) {
			UI.C(UI.B.ie ? document.documentElement : document.body,'overflowX','hidden');
		}
	},
	hide : function(){
		UI.hide(this._body);
		this.hideLoad();
		if (this.end) {
			this.end();
		}
		this.display = 0;
		if (!UI.B.firefox) {
			UI.C(UI.B.ie ? document.documentElement : document.body,'overflowX','auto');
		}
	},
	showLoad : function(target,top,left,width,height){
		target = target || this._cont;
		var css = '',
			width = width || UI.width(target),
			height = height || UI.height(target);
		if (UI.isNumber(top)) {
			css += 'top:' + top + 'px;';
		}
		if (UI.isNumber(left)) {
			css += 'left:' + left + 'px;';
		}
		this._load.style.cssText = 'width:' + width + 'px;height:' + height + 'px;' + css;
	},
	hideLoad : function(){
		UI.hide(this._load);
	},
	showTip : function(o){ //{html:'发送成功！',ico:'ico_te',delay:1000}
		var Self = this,close = Self.close;
		o.close = 0;
		o.html = '<div class="popBox"><span class="ico_tsW"><span class="' + (o.ico ? o.ico : 'ico_ts') + '"></span></span><h2>' + o.html + '</h2><p></p></div>';
		o.end = o.end || Self.end;
		Self.show({width:9999});
		Self.show(o);
		Self.show({width:UI.width(Self._cont) + 40});
		setTimeout(function(){
			Self.hide();
			Self.close = close;
		},o.delay ? o.delay : 1000);
	},
	alert : function(str,call){
		var Self = this,btn;
		Self.show({width:9999});
		Self.show({html:'<div class="popBox"><span class="ico_tsW"><span class="ico_te"></span></span><h3>' + str + '</h3><p><input type="button" value="知道了" onclick="MI.dialog.hide()"></p></div>',end:call});
		setTimeout(function(){
			Self.show({width:UI.width(Self._cont) + 40});
			btn = $$(Self._cont,'input')[0];
			if (btn) {
				btn.focus();
			}
		},0);
	},
	$ : function(className){
		return $$(this._body,className)[0];
	}
}
/*MI.DialogTip = function(o){
	var Self = this;
	o = o || {};
	o.tmpl = '<div class="bg"></div><div class="CR"><div class="DTitle"></div><div class="DClose"></div><div class="DLoad"></div><div class="floatTip"><div class="lside"></div><span class="ico_tsW"><span class="ico_ts"></span></span><b class="DCont"></b><div class="rside"></div></div>';//ico_ts ico_te
	MI.Dialog.call(this,o);
	UI.hide(this._close);
	this.close = 0;
	this.delayHide = 1000;
	this.width = 860
	this._tip = this._cont.parentNode;
	this._tipWrap = $$(this._body,'.floatTip')[0];
	this._ico = $$(this._body,'.ico_tsW span')[0];
	UI.hide(this._title);
	this.call = function(){
		Self._ico.className = Self.ico || 'ico_ts';
		Self._tipWrap.style.marginLeft = - UI.width(Self._tipWrap) / 2 + 'px';
		clearTimeout(Self._delay);
		Self._delay = setTimeout(function(){
			//Self.hide();
			UI.animate(Self._tip,'opacity',0,function(){
				Self.hide();
				UI.C(Self._tip,'opacity',1);
			});
		},Self.delayHide);
	}
}
MI.DialogTip.prototype = MI.Dialog.prototype;

MI.DialogMsg = function(o){
	o = o || {};
	//o.tmpl = '<div class="bg"></div><div style="position:absolute;z-index:999;top:0;left:25%;padding:25px" class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm" style="overflow:hidden"></td><td class="tr"></td></tr><tr><td class="lm"></td><td style="*padding:0;"><div class="floatWrap"><div class="close DClose"></div><div class="DTitle" style="padding:0;border:0;"></div><div class="DLoad"></div><div class="DCont" style="padding:0;border:0;background:none;"></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	o.tmpl = '<div class="bg"></div><div class="D"><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><div class="DClose close"></div><div class="DLoad"></div><div class="DCont"></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	MI.Dialog.call(this,o);
}
MI.DialogMsg.prototype = MI.Dialog.prototype;*/
MI.PV = function(name){
	if (window.pvCurUrl && pvCurUrl != '') {
		//if (!pvCurUrl.match(new RegExp(name + '$'))) {
			pvCurUrl = '/' + name;
		//}
		pvRepeatCount = 1;
		if(typeof(pgvMain) == 'function') pgvMain();
	}
}
MI.Code = function(){
	var Self = this;
	this._body = UI.html(MI.tmpl.code)[0];
	this._msg = $$(this._body,'h3')[0]; //
	this._code = $$(this._body,'img')[0];
	this._form = $$(this._body,'form')[0];
	this._codeChange = $$(this._body,'.codeChange')[0];
	this._btn = $$(this._body,'button');
	this._value = $$(this._body,'input')[0];

	//Event
	this._btn[0].onclick = submit;
	this._btn[1].onclick = function(){
		MI.dialog.hide();
	}
	this._codeChange.onclick = function(){
		Self._code.src = UI.A(Self._code,'crs') + '&' + Math.random();
		Self._value.focus();
		return false;
	}
	this._form.onsubmit = submit;
	function submit(){
		var value = Self._value.value;
		if (!value || value.length < 4 || value.length > 5) {
			Self._value.focus();
			Self._msg.innerHTML = '你输入的验证码有误，请重新输入';
		}
		else if (value) {
			MI.dialog.hide();
			if (Self.call) {
				setTimeout(function(){
					Self.call(value);
				},300);
			}
		}
		return false;
	}
}
MI.Code.prototype = {
	show : function(o){ // o = {msg:'您的操作出现异常，请输入验证码',code:'http://ptlogin2.qq.com/getimage?aid=13001401&Math.random()',call:function(){}}
		var Self = this,dialog = MI.dialog,content,width;
		this._msg.innerHTML = o.msg;
		this._value.value = '';
		this.call = o.call;
		this._code.src = o.code + '&' + Math.random();
		UI.A(this._code,'crs',o.code);
		if (dialog.display) { //Show Old Dialog When Close Verify Code's Dialog
			content = dialog._cont.firstChild;
			width = dialog.width;
			Self.end = function(){
				dialog.show({html:content,width:width,end:function(){
					Self.end = null;
				}});
			}
		}
		dialog.show({
			html:this._body,
			width:o.width || 363,
			end:Self.end
		});
		setTimeout(function(){
			Self._value.focus();
		},0);
	}
}
MI.DisableDblClickSelect = function(obj){
	if (obj) {
		var aau = "_MouseDownNoSelect_";
		function getAtts() {
			return (obj.getAttribute(aau) || "").toString().split(",");
		}
		function setAtts(jz, ao) {
			obj.setAttribute(aau, [jz, ao]);
		}
		function now() {
			return + new Date;
		}
		if (getAtts().length == 1) {
			setAtts(now(), "up");
			obj.onmousedown = function(ag) {
				var hd = now(),
				vb = parseInt(getAtts()[0]);
				setAtts(hd, "down");
				if (hd - vb < 500) {
					UI.E(ag).prevent();
				}
			}
			obj.onmouseup = function() {
				setAtts(getAtts()[0], "up");
			}
			obj.onselectstart = function(ag) {
				if (getAtts().pop() == "up") {
					UI.E(ag).prevent();
				}
			}
		}
	}
	return obj;
}
MI.MsgBox = function(id){ //MsgBox
	var Self = new MI.TalkBox(id);
	Self.txtTipSend = '发送中';
	Self._msgTo = Self.$('.msgTo');
	Self._num = $$('.msgNum');
	Self.type = 3;
	Self.url = '/messages/send.php';

	if (!UI.B.ie6 || !UI.hasClass(Self._txt,'noAutoCmt')) {
		new MI.AutoCmt({
			target : Self._msgTo,
			type : 2,
			call : function(){
				Self.countTxt();
				MI.Bos('btnAutoAtAccount');
			}
		});
	}

	//Event
	UI.EA(Self._msgTo,'keyup',count); //IE和FF中的执行顺序有差异，比较郁闷...
	UI.EA(Self._msgTo,'keydown',count);
	UI.EA(Self._msgTo,'blur',count);
	function count(){
		Self.countTxt();
	}
	return Self;
}
MI.MsgList = function(id){ //MsgList
	var Self = new MI.TalkList(id);
	Self.removeTip = '确定删除这条私信？';
	//Self.removeUrl = '/del.php';
	return Self;
}
MI.Talk = function(id){ //Talk
	var Self = this,html = new UI.tmplString(MI.tmpl.reply)({});
	Self.id = id;
	Self._body = $(id);
	Self._talk = UI.html(html)[0]; //Talk Box
	Self._relay = UI.html(html.replace(/<\/textarea>/g,'').replace(/textarea/g,'input'))[0];
	Self._relayNum = $('relay' + id);
	Self.replyBox = new MI.TalkBox(Self._talk);
	Self.relayBox = new MI.TalkBox(Self._relay);
	Self.replyBox.success = function(){
		MI.dialog.hide();
	};
	Self.relayBox.success = function(){
		MI.dialog.hide();
		if (Self._relayNum) {
			MI.countNum(Self._relayNum,1);
		}
	};
	Self.replyBox.talkId = this.relayBox.talkId = id;

	Self.reply = function(type){
		Self.talkBox = type ? Self.relayBox : Self.replyBox;
		UI.removeClass(Self.talkBox._body,'pubSuc');
		var replyTitle = '转播 <b>' + UI.trim(Self.name) + '</b>: "' + MI.string.html(Self.content.slice(0,25)),relayTitle = '对 <b>' + Self.name + '</b> 说:';
		if (Self.content.length > 25) {
			replyTitle += '...';
		}
		replyTitle += '"<br/>再说两句:';
		$$(Self.talkBox._body,'.replyTitle')[0].innerHTML = type ? replyTitle : relayTitle;
		Self.talkBox._body.className = type ? 'zfWrap' : 'talkWrap';
		Self.talkBox.type = type ? 1 : 2;
		Self.talkBox._txt.value = '';
		Self.talkBox.countTxt();
		MI.dialog.show({width:500,html:Self.talkBox._body});
		setTimeout(function(){
			Self.talkBox._txt.focus();
		},0);
	}

	//Talk Info
	var userLink = $$(Self._body,'a')[1];
	Self.name = UI.text(userLink);
	Self.account = UI.A(userLink,'rel');
	Self.content = UI.text($$(Self._body,'.msgCnt')[0]);

	var report = $$(Self._body,'.alarm')[0],
		reply = $$(Self._body,'.reply')[0],
		relays = $$(Self._body,'.relay'),
		relay = relays[0],
		relay2 = relays[1],
		fav = $$(Self._body,'.fav')[0],
		picBox = $$(Self._body,'.picBox');
	//Event
	if (reply) {
		reply.onclick = function(){
			Self.reply();
			return false;
		}
	}
	if (relay) {
		relay.onclick = function(){
			Self.reply(1);
			return false;
		}
	}
	if (relay2) {
		relay2.onclick = function(){
			Self.reply(1);
			return false;
		}
	}
	if (report) {
		report.onclick = function(){
			jubao_msg(Self.id,Self.account);
			return false;
		}
	}
	if (fav) {
		fav.type = 1;
		fav.onclick = function(){
			Self.fav(Self._body.id,this.type);
			MI.Bos('btnFav');
			return false;
		}
	}
	if (picBox) {
		MI.TalkList.picEvent(picBox);
	}
}
MI.Talk.prototype = MI.TalkList.prototype;
MI.Reply = function(){ //Reply Dialog
	var Self = this,talkBox,talkBox;
	UI.hide(Self._body);

	Self.talkBox = new MI.TalkBox(Self._body);
	Self._talkTo = $$(Self._body,'.replyTitle')[0];
	Self._msg = $$(Self._body,'.msg')[0];
	
	talkBox = Self.talkBox;
	talkBox.txtTipSend = '发送中';
	UI.addClass(talkBox._txt,'noAutoComplete');
	talkBox.successStart=function(){
		MI.dialog.showTip({html:'发送成功!'});
	}
	talkBox.success=function(){
		UI.removeClass(talkBox._body,'pubSuc');
	}
}
MI.Reply.prototype = {
	//_body : UI.html('<div class="talkWrap" id="reply' + MI.random() + '" style="display:none"><div class="SA"><em>◆</em><span>◆</span></div><div class="top"><span class="left"><span class="replyTitle">对 <b></b>说:</span></span></div><div class="cont"><textarea class="inputTxt noAutoComplete" style="overflow-y: hidden; height: 38px;"></textarea></div><div class="bot" style="margin:5px 0 7px"><input type="button" class="inputBtn sendBtn"/><span class="countTxt">还能输入<em>140</em>字</span></div><div style="display: none;" class="talkSuc"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg" id="msg"></span></div></div>')[0],
	_body : UI.html(MI.tmpl.reply)[0],
	show : function(){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({html:Self._body,width:500});
		Self._talkTo.innerHTML = '对 <b>' + talkBox.talkTo + '</b> 说:';
		talkBox._txt.value = '';
		setTimeout(function(){
			talkBox._txt.focus();
			talkBox.countTxt();
		},0);
	}
}
MI.Msg = function(){ //Msg Dialog
	var Self = this,talkBox;
	UI.hide(Self._body);

	Self.talkBox = new MI.MsgBox(Self._body);
	talkBox = Self.talkBox;
	talkBox.successStart=function(){
		MI.dialog.showTip({html:'发送成功!'});
	}
	talkBox.success = function(){
		UI.removeClass(talkBox._body,'pubSuc');
	}
}
MI.Msg.prototype = {
	_body : UI.html(MI.tmpl.msgBox)[0],
	show : function(){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({width:570,html:Self._body,start:function(){
			//talkBox._msgTo.value = msgTo ? msgTo : '';
			talkBox._txt.value = '';
			UI.removeClass(talkBox._btn,'disabled');
			/*try{setTimeout(function(){
				talkBox._msgTo.focus();
				if (talkBox._msgTo.value) talkBox._txt.focus();
			},0);}catch(e){};*/
		}});
		setTimeout(function(){
			talkBox._txt.focus();
			talkBox.countTxt();
		},0);
	}
}
MI.Card = function(){ //Info Card
	var Self = this,
		_body = Self._body,
		follow = 'addAttention',
		unfollow = 'delAttention',
		replyBox,msgBox,txtMax;
	Self._pic = $$(_body,'.userPic a')[0];
	Self._name = $$(_body,'.userName')[0];
	Self._num = $$(_body,'.nums')[0];
	Self._reply = $$(_body,'.reply')[0];
	Self._msg = $$(_body,'.msg')[0];
	Self._follow = $$(_body,'.' + follow)[0];
	Self._unfollow = $$(_body,'.' + unfollow)[0];
	Self._black = $$(_body,'.black')[0];
	Self._blackTip = $$(_body,'.tip')[1];
	Self._sFollow = $$(_body,'.ico_sFo')[0];
	Self._tag = $$(_body,'.tagBox')[0];

	Self.reply = new MI.Reply();
	Self.msg = new MI.Msg();
	replyBox = Self.reply.talkBox;
	msgBox = Self.msg.talkBox;
	txtMax = replyBox.txtMax;

	//Event
	Self._pic.onclick = function(){
		MI.Bos('btnCardHead');
	}
	Self._body.onclick = function(){
		if (UI.hasClass(this,'small')) {
			document.location.href = '/' + Self.account;
		}
	}
	Self._body.onmouseout = function(){
		Self.hide();
	}
	Self._body.onmouseover = function(){
		UI.show(Self._body);
	}
	Self._follow.onclick = function(){
		var sFollow = Self._sFollow,
			T = this;
		//if (!this.send) {
			MI.follow(Self.account,T,function(isFollow){
				UI.hide(Self._follow);
				UI.show(Self._unfollow);
				UI.show(Self._sFollow);
				var o = MI.Card.users[Self.account];
				o.follow = 1;
				UI.removeClass(sFollow,'foLight');
				sFollow.title = MI.sFollowTip[0];
				o.num[1]++;
				Self.num(o);
				Self._follow.className = follow;

				if (Self.followCall) {
					Self.followCall(isFollow,T);
				}

				MI.Bos('btnCardFollow');
				//this.send = 0;
			});
		//}
		//this.send = 1;
		return false;
	}
	Self._unfollow.onclick = function(){
		var T = this;
		//if (!this.send) {
			MI.follow(Self.account,T,function(isFollow){
				UI.hide(Self._unfollow);
				UI.hide(Self._sFollow);
				UI.show(Self._follow);
				var o = MI.Card.users[Self.account];
				o.follow = 0;
				if (o.group) {
					o.group.im = 0;
				}
				o.num[1]--;
				Self.num(o);
				Self._unfollow.className = unfollow;

				if (Self.followCall) {
					Self.followCall(isFollow,T);
				}

				MI.Bos('btnCardUnFollow');
				//this.send = 0;
			});
		//}
		//this.send = 1;
		return false;
	}
	Self._reply.onclick = function(){
		replyBox.talkTo = Self.name;
		replyBox.topic = '@' + Self.account + ' ';
		replyBox.txtMax = txtMax - replyBox.topic.length;
		Self.reply.show();
		MI.Bos('btnCardReply');
		return false;
	}
	Self._msg.onclick = function(){
		if (!UI.hasClass(this,'disabled')) {
			msgBox._msgTo.value = Self.account;
			Self.msg.show();
			MI.Bos('btnCardMsg');
		}
		return false;
	}
	Self._black.onclick = function(){
		var o = MI.json(UI.A(this,'rel'));
		o.txt = ['拉黑','取消拉黑'];
		o.target = this;
		o.call = function(){
			var obj = MI.Card.users[o.u],isBlack = UI.hasClass(o.target,'blackDel');
			if (obj.follow && isBlack) {
				obj.follow = 0;
				if (obj.group) {
					obj.group.im = 0;
				}
				obj.num[1]--;
			}
			obj.block = isBlack;

			if (Self.blackCall) {
				Self.blackCall(isBlack);
			}
		};
		MI.black(o);
		return false;
	}
	Self._sFollow.onclick = function(){
		var follow = UI.hasClass(this,'foLight') ? 0 : 1;
		MI.sFollow(Self.account,this,function(isFollow){
			var user = MI.Card.users[Self.account];
			if (user.group) {
				user.group.im = follow;
			}
			if (Self.sFollowCall) {
				Self.sFollowCall(isFollow);
			}
		});
		if (follow) {
			MI.Bos('btnCardSFollow');
		}
		else {
			MI.Bos('btnCardUnSFollow');
		}
		return false;
	}
}
MI.Card.prototype = {
	_body : UI.html(MI.tmpl.card)[0],
	show : function(el){
		var Self = this,
			pic = el.src,
			P = el.parentNode,
			title = UI.A(P,'rel'),
			reg = /@[^@]+$/g,
			account = title.match(reg)[0].slice(1,-1),
			name = title.replace(reg,'').slice(0,-1),
			url = '/' + account;
		if (Self.target == el) {
			return;
		}
		Self.account = account;
		Self.name = name;
		Self._pic.href = url;
		Self._pic.innerHTML = '<img src="' + pic + '">';
		UI.hide(Self._follow);
		UI.hide(Self._unfollow);
		//UI.hide(Self._msg);
		UI.addClass(Self._body,'small');
		//Self.delay = setTimeout(function(){
			UI.addClass(Self._num,'loading');
		//},200);
		UI.before(Self._body,P.parentNode);
		UI.removeClass(Self._body,'isMe');
		UI.show(Self._body);
		Self.target = el;
		if (MI.Card.users[account]) {
			show(MI.Card.users[account]);
		}
		else UI.get('/asyn/userCard.php','u=' + account + '&r='+MI.random(),function(data){
			data = MI.json(data);
			/*data = {
				result : 0,
				msg : '',
				info : {
					follow : true,
					followed : true,
					block : 0,
					//vip : true,
					//vv : false,
					gender : 0,
					flag : {
						auth : 0,
						vivi : 0,
						expo : 0
					},
					num : [12,281,123], //[广播数,听众数,收听人数]
					group : {
						im : 0
					}
				}
			}*/
			if (data.result == 0) {
				show(data.info);
				MI.Card.users[account] = data.info;
			}
			else {
				Self.hide();
			}
		});
		function show(o){
			var notSelf = Self.account != MI.user.account,
				btn = o.follow ? Self._unfollow : Self._follow,
				sFollow = Self._sFollow,
				icon = '',
				gender = o.gender ? '他' : '她',
				rel;
			if (o.gender == 2) {
				gender = '它';
			}
			rel = "{u:'" + Self.account + "',name:'" + name + "',sex:'" + gender + "'}";
			if (o.block) {
				Self._black.innerHTML = '取消拉黑';
				UI.addClass(Self._black,'blackDel');
				Self._blackTip.style.display = 'block';
				Self._blackTip.innerHTML = '<a href="#" class="right blackDel" rel="' + rel + '">[移出]</a>' + gender + '在你的黑名单里';
				$$(Self._blackTip,'a')[0].onclick = Self._black.onclick;
			}
			else {
				Self._black.innerHTML = '拉黑';
				UI.removeClass(Self._black,'blackDel');
				UI.hide(Self._blackTip);
			}
			UI.A(Self._black,'rel',rel);
			Self.num(o);
			for (var i = 0,len = MIIco.length;i < len;i++) {
				if (o.flag[MIIco[i]]) {
					icon += MIIcoHtml[i];
					break;
				}
			}
			Self._name.innerHTML = '<a href="' + url + '">' + name + '</a>' + icon + '<br /><span class="en">@' + account + '</span>';
			if (notSelf) {
				btn.style.display = 'block';
			}
			else {
				UI.addClass(Self._body,'isMe');
			}
			if (notSelf && o.followed) {
				UI.removeClass(Self._msg,'disabled');
				Self._msg.title = '';
			}
			else {
				UI.addClass(Self._msg,'disabled');
				Self._msg.title = '私信只能发给你的听众';
			}
			if (notSelf && o.follow) {
				if (o.group) {
					if (o.group.im) {
						UI.addClass(sFollow,'foLight');
						sFollow.title = MI.sFollowTip[1];
					}
					else {
						UI.removeClass(sFollow,'foLight');
						sFollow.title = MI.sFollowTip[0];
					}
					UI.show(sFollow);
				}
				else {
					UI.hide(sFollow);
				}
			}
			else {
				UI.hide(sFollow);
			}
			if (o.tag) {
				Self._tag.innerHTML = '<h5></h5>标签：' + o.tag + '';
				UI.each($$(Self._tag,'span'),function(o){
					if (!UI.hasClass(o,'last')) {
						//UI.append(UI.html('<span>、</span>')[0],o);
					}
				});
				/*UI.each($$(Self._tag,'a'),function(o){ //Break Tag Name
					o.innerHTML = o.innerHTML.breakWord();
				});*/
				UI.show(Self._tag);
			}
			else {
				UI.hide(Self._tag);
			}
			//clearTimeout(Self.deelay);
			UI.removeClass(Self._num,'loading');
			UI.removeClass(Self._body,'small');
			MI.Bos('btnCardOpen');
		}
	},
	num : function(o){
		var num = o.num;
		this._num.innerHTML = '广播' + num[0] + '条<span>' + (o.flag.vivi ? '' : '|</span>听众' + num[1] + '人<span>');//|</span>收听了' + num[2] + '人
	},
	hide : function(){
		var Self = this;
		if (UI.hasClass(Self._body,'small')) {
			return;
		}
		UI.hide(Self._body);
		Self.target = null;
	}
}
MI.Card.show = function(e){
	var el = UI.E(e).target;
	clearTimeout(MI.Card.delay);
	MI.Card.delay = setTimeout(function(){
		MI.card.show(el);
	},400);
}
MI.Card.users = {};
MI.Card.hide = function(){
	clearTimeout(MI.Card.delay);
}
MI.Card.build = function(el,className,clickHead){
	UI.each($$(el,className),function(o){
		if (!UI.A(o,'card')) {
			UI.A(o,'card','1');
			var P = o.parentNode;
			UI.A(P,'rel',P.title);
			o.title = P.title;
			UI.EA(o,'mouseover',MI.Card.show);
			UI.EA(o,'mouseover',function(){
				P.title = o.title = '';
			});
			UI.EA(o,'touchstart',MI.Card.show);
			UI.EA(o,'mouseout',MI.Card.hide);
			UI.EA(o,'touchend',MI.Card.hide);
			UI.EA(o,'click',function(){
				MI.Bos('btnHead');
			});
		}
	});
}
MI.GoTop = {
	_body : UI.html('<div class="goTopBox"><a href="#" class="btn_goTop" onclick="window.scrollTo(0,0);MI.Bos(\'btnTop\');this.blur();return false" title="返回顶部">返回顶部</a></div>')[0],
	delay : {},
	resize : 0,
	position : function(){
		this.build();
	},
	build : function() {
		if (UI.hasClass(document.body,'ipad')) {
			return;
		}
		var Self = this,
			leftFix = UI.B.ie ? 1 : 3,
			_main = $('mainWrapper'),
			left = UI.getX(_main) + UI.width(_main) - leftFix,
			foot,
			windowHeight = UI.windowHeight(),
			pageHeight = UI.pageHeight(),
			scrollY,
			resize,
			y;
		if (_main) {
			UI.append(Self._body,document.body);
			foot = pageHeight - (UI.getY(_main) + UI.height(_main));
			position();
			Self._body.onfocus = function(){
				this.blur();
			}
			/*Self._body.firstChild.onclick = function(){
				clearInterval(Self.delay.scroll);
				Self.delay.scroll = UI.animate(document.body,'scrollTop',0);
				return false;
			}*/
			UI.EA(window,'scroll',position);
			UI.EA(window,'resize',position);
		}
		function position(e){
			resize = (e && UI.E(e).type == 'resize') || Self.resize;
			if (top != self || UI.B.ie) {
				clearTimeout(Self.delay.position);
				if (UI.B.ie6) {
					if (MI.dialog && MI.dialog.display){ //Kill Dialog Bug When Scrolling Page
						return;
					}
					UI.hide(Self._body);
				}
				Self.delay.position = setTimeout(set,UI.B.ie6 ? 400 : 0);
			}
			else {
				set();
			}
		}
		function set(){
			pageHeight = UI.pageHeight();
			if (resize) {
				windowHeight = UI.windowHeight();
				left = UI.getX(_main) + UI.width(_main) - leftFix;
				Self.resize = 0;
			}
			scrollY = UI.scrollY();
			Self._body.style.cssText = 'left:' + left + 'px;display:' + (scrollY < 52 ? 'none' : 'block');
			y = scrollY + windowHeight - pageHeight;
			if (y >= -foot) {
				Self._body.style.cssText += ';position:absolute;top:' + (pageHeight - 34 - foot) + 'px';
			}
		}
	}
}