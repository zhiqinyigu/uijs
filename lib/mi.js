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
String.prototype.toTitle = function(){
	return this.replace(/\r/g, '')
		.replace(/\n/g, "")
		.replace(/\'/g, '&#39;')
		.replace(/\"/g, '&#34;')
		.replace(/</g,"&#60;")
		.replace(/>/g,"&#62;");
};

(function(){
var V1 = 'talk[i].source',V2 = 'info.source',V3 = '<div class="SA"><em>◆</em><span>◆</span></div>',V4 = '%><b class="vip"></b><%',V5 = ' href="javascript:void(0)"',V6 = ' onerror="MI.Pic(this,50)"',V7 = ' title="<%=talk[i].nick.toTitle()%>(@<%=talk[i].name%>)"',V8 = V5 + ' onclick="if(confirm(MI.tips.del))MI.talkList.remove(';
MI = {
	time : null, //Server's System Time
	string : {
		length : function(str){
			var arr = str.match(/[^\x00-\x80]/g);
			return str.length + (arr ? arr.length : 0);
		},
		escape : function(str){
			return str.replace(/'/g,"\\'").replace(/</g,"&lt;").replace(/>/g,"&gt;");
		}
	},
	number : {
		format : function(str){ //Format: 1000 --> 1,000
			return (str + '').replace(/(?=(?!\b)(?:\w{3})+$)/g,",")
		}
	},
	random : function(delay){ //delay = 1000 ---> 1s
		delay = delay || 1;
		return parseInt( new Date().getTime()/delay );
	},
	tips : {
		del : '是否删除该内容？'
	},
	delay : {},
	validate : {
		
	},
	json : function(data){
		var o = {};
		try{
			o = eval('(' + data + ')');
		}catch(e){};
		return o;
	},
	tmpl : {
		list : '<li id="<%=info.id%>" rel="<%=info.timestamp%>"><div class="userPic"><a href="/<%=info.account%>" title="(<%=info.nick.toTitle()%>@<%=info.account%>)"<%if(' + V2 + '.type==2){%> class="masPic"<%}%>><img src="<%=info.userPic%>"' + V6 + '/></a><%if(' + V2 + '.type==2){%><%=' + V2 + '.cusPic%><%}%></div><div class="msgBox"><div class="userName"><a href="<%=info.account%>" title="(<%=info.nick.toTitle()%>@<%=info.account%>)"><strong><%=info.nick%></strong></a><%if(info.vip){ ' + V4 + '}%> <%=info.action%></div><div class="msgCnt"><%=info.content%></div><%if(' + V2 + '.type==1){%><div class="replyBox"><%=' + V2 + '.content%></div><%}%><div class="pubInfo"><span class="left"><span class="time"><%=info.time%></span> 发自<%=info.sorurce%> <%if(' + V2 + '.type==2){%><a class="view zfNum"' + V5 + '>查看对话</a></b><%}%></span><p class="funBox"><a' + V8 + '\'<%=info.id%>\',this)" class="del">删除</a></p></div><%if(' + V2 + '.type==2){%><div class="talkDetail"><%=' + V2 + '.nick%>: <%=' + V2 + '.content%></div><%}%></div></li>',
		listAll : '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>"><%if(!guest){%><%if(' + V1 + ' && talk[i].type==4){%><div class="userPic"><a href="/<%=talk[i].name%>"' + V7 + ' class="masPic"><img src="<%=talk[i].pic%>"' + V6 + '/></a><a href="/<%=' + V1 + '.name%>" title="<%=' + V1 + '.nick.toTitle()%>(@<%=' + V1 + '.name%>)" class="cusPic"><img src="<%=' + V1 + '.pic%>"' + V6 + '/></a></div><%}else{%><div class="userPic"><a href="/<%=talk[i].name%>"' + V7 + '><img src="<%=talk[i].pic%>"' + V6 + '/></a></div><%}%><%}%><div class="msgBox"><div class="userName" rel="<%=talk[i].name%>"><a href="/<%=talk[i].name%>"' + V7 + '><strong><%=talk[i].nick%></strong></a><%if(talk[i].vip){ ' + V4 + ' }%> <%if(' + V1 + ' && talk[i].type==2){%>转播<%}else if(' + V1 + ' && talk[i].type==4){%>回复<a href="/<%=' + V1 + '.name%>" title="<%=' + V1 + '.nick.toTitle()%>(@<%=' + V1 + '.name%>)"><%=' + V1 + '.nick%></a><%if (' + V1 + '.vip){' + V4 + ' }%>:<%}%></div><div class="msgCnt"><%=talk[i].content%></div><%if(' + V1 + ' && talk[i].type==2){%><div class="replyBox">' + V3 + '<div class="userPic"><a href="/<%=' + V1 + '.name%>" title="<%=' + V1 + '.nick.toTitle()%>(@<%=' + V1 + '.name%>)"><img src="<%=' + V1 + '.pic%>"' + V6 + '/></a></div><div class="msgBox"><div class="msgCnt"><a href="/<%=' + V1 + '.name%>" title="<%=' + V1 + '.nick.toTitle()%>(@<%=' + V1 + '.name%>)"><strong><%=' + V1 + '.nick%></a><%if(' + V1 + '.vip){' + V4 + '}%></strong>: <%=' + V1 + '.content%></div><div class="pubInfo"><span class="left"><span class="time"><%=' + V1 + '.time%></span> 发自<%=' + V1 + '.from%> <a class="zfNum" href="/t/<%=talk[i].id%>"><strong class="relayNum"><%=' + V1 + '.count%></strong>人转播</a></span></div></div></div><%}%><div class="pubInfo"><span class="left"><span class="time"><%=talk[i].time%></span> 发自<%=talk[i].from%><%if(' + V1 + ' && ' + V1 + '.content && ' + V1 + '.content.length && talk[i].type==4){%> <a class="view zfNum"' + V5 + '>查看对话</a><%}%></span><p class="funBox"><%if(MI.user){if(!guest && MI.user.account==talk[i].name){%><a class="del"' + V8 + '<%=talk[i].id%>,this)">删除</a><%}else{%><a' + V5 + ' class="report">举报</a><a class="reply talk"' + V5 + '>回复</a><a class="relay zf"' + V5 + '>转播</a><%}%><%}%></p></div><%if(' + V1 + ' && talk[i].type==4){%><div class="talkDetail"><%=' + V1 + '.nick%>: <%=' + V1 + '.content%></div><%}%></div></li><%}%>',
		msg : '<li id="<%=info.id%>"><div class="msgBox"><div class="userName"><a href="/<%=info.account%>"><%=info.nick%></a><%if(info.vip){ ' + V4 + '}%></div><div class="msgCnt"><%=info.content%></div><div class="pubTime"><span class="time"><%=info.time%></span></div></div><p class="btnBox"><a class="btn"' + V8 + '<%=info.id%>,this)">删除</a></p></li>',
		reply : '<div class="talkWrap">' + V3 + '<div class="top"><span class="left replyTitle"></span><a' + V5 + ' class="close" title="关闭">关闭</a></div><div><textarea class="inputTxt"></textarea></div><div class="bot"><input type="button" class="inputBtn sendBtn" value="" /><span class="countTxt"></span></div></div>'
	},
	selectTxt : function(el,start,end,curPosition){
		var range;
		if (document.createRange) {
			el.setSelectionRange(start,end);
		}
		else {
			range = el.createTextRange();
			range.collapse(1);
			range.moveStart("character",start);
			range.moveEnd("character",end - start);
			range.select();
		}
	},
	countNum : function(el,num,format){
		if (!el) return;
		var cur = el.innerHTML || 0;
		if (format) {
			el.innerHTML = MI.number.format(parseInt(cur.replace(/,/g,'')) + num);
		}
		else el.innerHTML = parseInt(cur) + num;
	},
	fC : { //followConfig
		numFormat : [],
		num : []
	},
	follow : function(id,el,call){
		/*
			DOM:
				'followNumAll'
				'followNum_' + id
				'followedNum_' + id
		*/
		if (!MI.fC.init) {
			MI.fC.numFormat = UI.GC('.followNumFormat');
			MI.fC.num = UI.GC('.followNum');
			MI.fC.init = 1;
		}
		if (!el.sending) {
			var isFollow = -1,url,className = el.className,classNameFollow = 'addAttention',classNameUnfollow = 'delAttention',followedNum = UI.G('followedNum_' + id),followNum = UI.G('followNum_' + id),isNotButton = className != classNameFollow && className != classNameUnfollow;
			if ( className == classNameFollow || isNotButton ) {
				isFollow = 1;
				url = '/follow.php';
			}
			else {
				url = '/unfollow.php';
			}

			el.sending = 1;
			UI.get(url,'u=' + id + '&r=' + MI.random(),function(data){
				el.sending = 0;
				data = MI.json(data);
				if (data.result == 0) {
					//Change Button's ClassName
					if (!isNotButton) {
						if (isFollow == 1) {
							el.className = classNameUnfollow;
						}
						else el.className = classNameFollow;
					}

					//Count Number
					if (followedNum) {
						MI.countNum(followedNum,isFollow);
					}
					if (followNum) {
						MI.countNum(followNum,isFollow);
					}
					for (var i = 0,num = MI.fC.numFormat.length;i < num;i++) {
						MI.countNum(MI.fC.numFormat[i],isFollow,1);
					}
					for (var i = 0,num = MI.fC.num.length;i < num;i++) {
						if (UI.A(MI.fC.num[i],'rel') == id) {
							MI.countNum(MI.fC.num[i],isFollow);
						}
					}

					//Callback Function
					if (call) {
						call();
					}
				}
				else if (data.msg){
					alert(data.msg);
				}
			});
		}
	},
	topic : function(id,el,del){
		if (!el.sending) {
			var isDel = del || UI.hasClass(el,'btnCancel'),type = isDel ? '2' : '1';
			UI.get('/asyn/topic.php','r=' + MI.random() + '&tid=' + id + '&type=' + type,function(data){
				data = MI.json(data);
				//data.result = 0;
				if (data.result == 0) {
					if (del) {
						var Parent = el.parentNode;
						UI.animate(Parent,'opacity',0,function(){
							UI.remove(Parent);
						});
					}
					else {
						el.className = isDel ? 'inputBtn btnAdd' : 'inputBtn btnCancel';
					}
				}
				else if (data.msg){
					alert(data.msg);
				}
				el.sending = 0;
			});
		}
		el.sending = 1;
	},
	topicDel : function(id,el){
		MI.topic(id,el,1);
	},
	addHover : function(el){
		el.onmouseover = function(){
			var Self = this;
			setTimeout(function(){
				UI.addClass(Self,'hover');
			},0);
		}
		el.onmouseout = function(){
			var Self = this;
			setTimeout(function(){
				UI.removeClass(Self,'hover');
			},0);
		}
	}
}
MI.TalkBox = function(id){ //Talk Box
	this._body = UI.isString(id) ? UI.G(id) : id;
	if (this._body) {
		var Self = this;

		//DOM
		Self._txt = Self.$('textarea') || Self.$('.inputTxt');
		Self._tip = Self.$('.countTxt');
		Self._btn = Self.$('.sendBtn');
		Self._topic = Self.$('.creatNew');
		Self._video = Self.$('.newVideo');
		Self._pic = Self.$('.insertPic');
		Self._close = Self.$('.close');
		Self._num = [UI.G('talkNum')];
		
		UI.ready(function(){
			setTimeout(function(){
				Self._txt.blur();

				//Fix IE6's Bug
				UI.hide(UI.prev(Self._txt));
				UI.show(UI.prev(Self._txt));
			},0);

			//Talk Text
			Self._txt.onkeydown = function(e){
				if (!Self.sending) {
					Self.countTxt();
					var E = UI.E(e);
					if (E.ctrl && E.key == 13) {
						Self.sending = 1; //Don't Count And Send When 'sending == true'
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
				this.focused = 1;
			};
			Self._txt.onblur = function(){
				if (Self._txt.value == 0) {
					UI.show(UI.prev(this));
				}
				this.focused = 0;
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
			if (Self._close) {
				Self._close.onclick = function(){
					Self.hide();
				}
			}
		});
	}
}
MI.TalkBox.prototype = {
	delay : {},
	url : '/publish.php',
	type : null, //Value: null(Talk)  1(relay)  2(reply)
	talkId : null, //Id To Reply Or Relay
	txtMax : 140,
	txtTopic : '#输入话题标题#',
	addList : 0, //If Add New Talk To List
	addNum : 1, //Add Num When Send Success
	autoHeight : 0,
	tmpl : MI.tmpl.list,
	countTxt : function(){
		var Self = this,txt = Self._txt,talkTip,length = Math.ceil(MI.string.length(UI.trim(txt.value).replace(new RegExp(Self.txtTopic,'g'),'')) / 2);
		if (length > this.txtMax) {
			talkTip = '超出<em class="error">';
			UI.addClass(Self._btn,'disabled');
		}
		else {
			talkTip = '还能输入<em>';
			UI.removeClass(Self._btn,'disabled');
		}
		if (length == 0) {
			UI.addClass(Self._btn,'disabled');
		}
		Self.showTip(talkTip + Math.abs(Self.txtMax - length) + '</em>字');
		if (Self._msgTo && (Self._msgTo.value == '' || Self._msgTo.error)) {
			UI.addClass(Self._btn,'disabled');
		}
		if (length <= Self.txtMax && Self.type == 1) {
			UI.removeClass(Self._btn,'disabled');
		}
		if (Self.autoHeight) {
				/*
			clearTimeout(this.delay.height);
			this.delay.height = setTimeout(function(){
				if (Self._txt.scrollHeight <= 140) {
					UI.C(Self._txt,'height','');
				}
				var height = Self._txt.scrollHeight;
				if (height > 40) {
					UI.C(Self._txt,'height',(height < 140 ? height : 140) + 'px');
				}
			},500);
				*/
		}
	},
	showTip : function(msg){
		this._tip.innerHTML = msg;
	},
	hide : function(){ //Hide TalkBox
		UI.remove(this._body);
		if (this.hideCall) {
			this.hideCall();
		}
	},
	hideCall : null, //Callback After Hide
	successCall : null, //Callback After Send Success
	send : function(){
		var Self = this,data;

		if (UI.hasClass(Self._btn,'disabled')) {
			if (UI.trim(Self._txt.value).length) {
				Self._txt.focus();
			}
			if (Self._msgTo && UI.trim(Self._msgTo).value == '') {
				Self._msgTo.focus();
			}
			Self.sending = 0;
			return;
		}
		UI.addClass(Self._btn,'disabled');
		Self.delay.tip = setTimeout(function(){
			Self.showTip('发送中');
		},500);

		//Post Data
		data = {content:Self._txt.value.replace(new RegExp(Self.txtTopic,'g'),'')};
		if (Self.type) {
			data.pId = Self.talkId;
			data.type = Self.type;
		}
		if (Self._msgTo) {
			data.account = Self._msgTo.value;
		}
		UI.ajax({
			url : Self.url,
			data : data,
			success : function(data){
				data = MI.json(data);
				/*data = {
					result : 0,
					msg : '发言成功',
					info : {
						id : '123456',
						time : '5分钟前',
						content : '内容',
						form : '腾讯微博'
					}
				};*/
				if (MI.user && data.info) {
					data.info.userPic = MI.user.pic;
					data.info.nick = data.info.nick || MI.user.name;
					data.info.account = data.info.account || MI.user.account;
					data.info.vip = data.info.vip || MI.user.vip;
				}

				//Show Tips
				clearTimeout(Self.delay.tip);
				Self.showTip('<span' + (data.result < 0 ? ' class="error"' : '') + '>' + data.msg + '</span>');
				Self.delay.tip = setTimeout(function(){
					UI.animate(Self._tip,'opacity',0,function(){
						if (data.result == 0) {
							Self._txt.value = '';
						}
						Self._txt.focus();
						Self.countTxt();
						UI.C(Self._tip,'opacity','');
						Self._tip.style.filter = '';
						Self.sending = 0;
						if (Self.successCall && data.result == 0) {
							Self.successCall();
						}

						//Add New Talk To List
						if (Self.addList && data.result == 0) {
							data.info.source = {};
							if (Self.type) { //From Reply And Relay
								data.info.action = Self.action;
								data.info.source = Self.source;
							}
							if (MI.talkList._tip) { //Hide Talk List's Tip
								UI.hide(MI.talkList._tip);
							}

							var newTalk = UI.html(new UI.tmplString(Self.tmpl)(data))[0],relayNum = UI.GC(newTalk,'.relayNum')[0];
							if (relayNum) {
								var P = relayNum.parentNode;
								MI.countNum(relayNum,1);
								if (P.nodeName == 'A') {
									P.href = '/t/' + data.info.id;
								}
							}
							MI.talkList.addEvent(newTalk);
							UI.C(newTalk,'opacity',0);
							UI.prepend(newTalk,MI.talkList._body);
							var height = UI.height(newTalk),scrollY = UI.scrollY(),scroll;
							if (scrollY > UI.getY(MI.talkList._body)) { //Auto Scroll Page With NewTalk Height
								/*
									偶尔会有抖动，跟dom元素个数及内容多少有关，越多则样式渲染所需时间越多，抖动越明显。
									IE里设置一个延迟效果要好很多，其他浏览器则不需要（效果反而更差）。
									这也反映出浏览器的性能，chrome不会有任何抖动。
								*/
								scroll = function(){
									UI.scrollTo(document.documentElement,0,scrollY + height);
									//document.documentElement.scrollTop = UI.scrollY() + height;
								}
								if (UI.B.ie) {
									setTimeout(scroll,0);
								}
								else scroll();
							}
							setTimeout(function(){
								UI.animate(newTalk,'opacity',1,0,0.2);
							},0);
						}

						//Count Talk Number
						if (data.result == 0) {
							Self.countNum(1);

							MI.talkList.updateTime(data.info.timestamp);
						}
					});
				},1000);
			}
		});
		return;
	},
	countNum : function(value){ //Count Talk Num
		if (value > 0 && !this.addNum) {
			return;
		}
		if (this._num.length) {
			for (var i = 0,num = this._num.length;i < num;i++) {
				MI.countNum(this._num[i],value);
			}
		}
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
		MI.selectTxt(this._txt,indexOf + 1,len - 1,1);
		this._txt.scrollTop = 999; //Textarea Scroll To End

		this.countTxt();
	},
	$ : function(className){
		return UI.GC(this._body,className)[0];
	}
}
MI.MsgBox = function(id){ //MsgBox
	var Self = new MI.TalkBox(id);
	Self._msgTo = Self.$('.msgTo');
	Self._num = UI.GC('.msgNum');
	Self.url = '/messages/send.php';

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
	//Self.removeUrl = '/del.php';
	return Self;
}
MI.TalkList = function(id){ //Talk List
	var Self = this;
	Self._body = UI.G(id);
	Self._more = Self._bottom = UI.GC(UI.G('moreList'),'a')[0];
	Self._new = UI.G('talkNew'); //New Talk Button
	Self._list = UI.children(Self._body);
	var html = new UI.tmplString(MI.tmpl.reply)({});
	Self._talk = UI.html(html)[0]; //Talk Box
	Self._relay = UI.html(html.replace(/<\/textarea>/g,'').replace(/textarea/g,'input'))[0];

	Self.replyBox = new MI.TalkBox(Self._talk);
	Self.relayBox = new MI.TalkBox(Self._relay);
	Self.replyBox.autoHeight = 1;
	Self.replyBox.hideCall = Self.relayBox.hideCall = function(){
		UI.removeClass(UI.G(Self.current),'cur');
	};
	Self.replyBox.successCall = Self.relayBox.successCall = function(){
		Self.talkBox.hide();
		Self.talkBox.display = 0;
		if (Self._relayNum) {
			MI.countNum(Self._relayNum,1);
			Self._relayNum = null;
		}
	};
	UI.EA(Self.replyBox._close,'click',function(){
		Self.replyHide();
	});
	UI.EA(Self.relayBox._close,'click',function(){
		Self.replyHide();
	});

	Self.cacheLast();

	//Event
	if (Self._more) {
		Self._more.onclick = function(e){
			Self.more();
			UI.E(e).prevent();
		}
		Self._more.onfocus = function(){
			this.blur();
		}
	}
	if (Self._new) {
		Self._new.onclick = function(){
			if (!this.sending) {
				if (this.num > 20) {
					document.location.reload();
				}
				else UI.get('/asyn/home.php',{time:UI.A(UI.children(Self._body)[0],'rel'),p:2,type:1,r:MI.random()},function(data){
				//else UI.get('/asyn/home.php','time=1262850125&id=12000000171132&r=' + MI.random(),function(data){
					data = MI.json(data);
					data.info.guest = Self.guest;
					if (data.result == 0) {
						var list,cache = document.createDocumentFragment(),o = UI.html(new UI.tmplString(MI.tmpl.listAll)(data.info).replace(/<li id="/gi,'<li class="newMsg" id="')),length = data.info.talk.length;
						if (length) {
							for (var i = 0,num = o.length;i < num;i++) {
								Self.addEvent(o[i]);
								UI.append(o[i],cache);
							}
							if (length > 50) {
								Slef._body.innerHTML = '';
							}
							list = UI.GC(Self._body,'.newMsg');
							for (var i = 0,num = list.length;i < num;i++) {
								UI.removeClass(list[i],'newMsg');
							}
							UI.prepend(cache,Self._body);
							UI.hide(Self._new);
						}
					}
					Self._new.sending = 0;
				});
			}
			this.sending = 1;
		}
		setInterval(function(){
			UI.get('/asyn/newMsgCount.php',{type:3,r:MI.random(10000)},function(data){
				data = MI.json(data);
				//data = {"result":0,"msg":"\u6210\u529f","info":[{"type":3,"value":11}]};
				if (data.result == 0) {
					var num = data.info[0].value,tip;
					if (data.info && num) {
						if (num > 20) {
							tip = '超过<strong>' + num + '</strong>条的';
						}
						else tip = '<strong>' + num + '</strong>条';
						Self._new.innerHTML = '<a href="javascript:void(0)">有' + tip + '新消息，点击更新</a>';
						UI.show(Self._new);
						if (Self._new.num != num) {
							UI.C(Self._new,'opacity',0);
							UI.animate(Self._new,'opacity',1);
						}
						Self._new.num = num;
					}
				}
			});
		},60000);
	}
	UI.ready(function(){
		Self.bottom();
	});
	for (var i = 0,num = Self._list.length;i < num;i++) {
		Self.addEvent(Self._list[i]);
	}
}
MI.TalkList.prototype = {
	cur : null, //Current List
	_tip : null, //List Tip
	removeUrl : '/delete.php',
	last : {}, //Cache Last List's Info
	time : [],
	remove : function(id,target){
		id = String(id);
		var Self = this,talk = UI.G(id);
		if (!talk.sending) {
			UI.get(Self.removeUrl,{id:id,r:MI.random()},function(data){
				talk.sending = 0;
				data = MI.json(data);
				if (data.result == 0) {
					if (MI.talkBox) {
						MI.talkBox.countNum(-1);
					}
					UI.animate(talk,'opacity',0,function(){
						UI.remove(talk);
						if (Self.tip && !UI.children(Self._body).length) { //提示显示隐藏有问题
							//UI.append(Self.tip,Self._body);
						}
						//Check More's Position
						Self.bottom();
					});
				}
				else if (data.msg){
					alert(data.msg);
				}
			});

			talk.sending = 1;
		}
	},
	reply : function(id,type){
		if (this.talkBox && this.current && this.current != id && this.talkBox.display) {
			this.talkBox.hide();
			this.talkBox.display = 0;
		}
		this.talkBox = type ? this.relayBox : this.replyBox;
		this._talk = this.talkBox._body;
		if (!this.talkBox.display) {
			var li = UI.G(id),cur = this.current,name = UI.GC(li,'.userName strong')[0].innerHTML,vip = UI.GC(li,'.userName .vip').length,url = UI.GC(li,'.userName a')[0].href,cont = UI.GC(li,'.msgCnt')[0],content = UI.text(cont),contentBase = cont.innerHTML,replyBox = UI.GC(li,'.replyBox')[0],relay = UI.GC(li,'.replyBox .msgCnt')[0],userPic = UI.GC(li,'.userPic')[0];
			if (relay) {
				content = UI.text(relay);
			}
			if (!replyBox) {
				content = name + ': ' + content;
			}
			if (cur) {
				UI.removeClass(UI.G(cur),'cur');
			}
			UI.addClass(li,'cur');

			this._relayNum = type ? UI.GC(li,'.relayNum')[0] : null;

			this.talkBox._body.className = type ? 'zfWrap' : 'talkWrap';
			var replyTitle = '转播 "' + MI.string.escape(content.slice(0,30)),relayTitle = '回复 ' + name + ':';
			if (content.length > 30) {
				replyTitle += '...';
			}
			replyTitle += '"<br/>再说两句:';
			UI.GC(this._talk,'.replyTitle')[0].innerHTML = type ? replyTitle : relayTitle;
			//Bug After Gzip
			//UI.GC(this._talk,'.replyTitle')[0].innerHTML = type ? '转播 "' + MI.string.escape(content.slice(0,30)) + (content.length > 30 ? '...' : '') + '"<br/>再说两句:' : '回复 ' + name + ':';

			//Set TalkBox Prototype
			this.talkBox.talkId = id;
			this.talkBox.type = type ? 1 : 2;
			this.talkBox.action = type ? '转播' : '回复<a href="' + url + '">' + name + '</a>' + (vip ? '<b class="vip"></b>': '') + ':';
			if (type && !replyBox) {
				var clone = li.cloneNode(1),msgCnt = UI.GC(clone,'.msgCnt')[0];
				UI.remove(UI.GC(clone,'.zfWrap')[0]);
				UI.remove(UI.GC(clone,'.talkWrap')[0]);
				UI.remove(UI.GC(clone,'.funBox')[0]);
				UI.C(UI.GC(clone,'.userName')[0],'display','inline');
				UI.C(msgCnt,'display','inline');
				msgCnt.innerHTML = ': ' + msgCnt.innerHTML;
			}
			this.talkBox.source = {
				type : type ? 1 : 2,
				content : type ? (replyBox ? replyBox.innerHTML : V3 + clone.innerHTML) : contentBase,
				nick : name,
				cusPic : ( userPic && userPic.innerHTML.replace(/cusPic/gi,'hide').replace(/<a/i,'<a class="cusPic"') ) || 0 //Small Pic For Reply
			};
			this.talkBox._txt.value = '';
			this.talkBox.countTxt();
			UI.append(this._talk,UI.GC(li,'.msgBox')[0]);
			this.talkBox._txt.focus();

			this.current = id;
			this.talkBox.display = 1;
		}
		else {
			this.talkBox.hide();
			this.replyHide();
		}
		if (type) {
			this.replyBox.hide();
			this.replyBox.display = 0;
		}
		else {
			this.relayBox.hide();
			this.relayBox.display = 0;
		}
		if (this.replyBox.display || this.relayBox.display) {
			UI.addClass(UI.G(this.current),'cur');
			UI.addClass(UI.G(this.current),'hover');
		}
	},
	replyHide : function(){
		UI.removeClass(UI.G(this.current),'cur');
		UI.removeClass(UI.G(this.current),'hover');
		this.talkBox.display = 0;
	},
	relay : function(id){
		this.reply(id,'relay');
	},
	report : function(id){
		var name = UI.A(UI.GC(UI.G(id),'.userName')[0],'rel');
		jubao_msg(id,name);
	},
	fav : function(){
		
	},
	addEvent : function(el){
		var Self = this,time = UI.GC(el,'.time'),view = UI.GC(el,'.view')[0],report = UI.GC(el,'.report')[0],viewContent = UI.GC(el,'.talkDetail')[0],content = UI.GC(el,'.msgCnt')[0],reply = UI.GC(el,'.reply')[0],relay = UI.GC(el,'.relay')[0],replyMsg = UI.GC(el,'.replyMsg')[0];
		MI.addHover(el);
		if (reply) {
			reply.onclick = function(){
				Self.reply(el.id);
			}
		}
		if (relay) {
			relay.onclick = function(){
				Self.relay(el.id);
			}
		}
		if (view) {
			view.onmouseover = function(){
				UI.C(viewContent,'display','block');
			}
			view.onmouseout = function(){
				UI.hide(viewContent);
			}
		}
		if (content && content.innerHTML == '') {
			UI.hide(content);
		}
		if (report) {
			report.onclick = function(){
				Self.report(el.id);
			}
		}
		if (replyMsg) {
			replyMsg.onclick = function(){
				MI.talkBox._msgTo.value = UI.A(this,'rel');
				MI.talkBox._msgTo.focus();
				MI.talkBox._txt.select();
			}
		}
		for (var i = 0,num = time.length;i < num;i++) {
			if (!UI.A(time[i],'rel')) {
				UI.A(time[i],'rel',UI.A(el,'rel'));
			}
			var timeObj = new Date();
			timeObj.setTime(UI.A(time[i],'rel') + '000');
			time[i].title = UI.formatDate(timeObj,'yyyy年MM月dd日 hh:mm');;
			Self.time.push(time[i]);
		}
	},
	cacheLast : function(){ //Cache Last Id For More
		var children = UI.children(this._body),last = children[children.length - 1];

		if (last) {
			this.last = {
				id : last.id,
				time : UI.A(last,'rel')
			};
		}
	},
	bottom : function(){ //Check More's Position
		var main = this._bottom.parentNode.parentNode,side = UI.next(main),y;
		if (side) {
			UI.C(this._body,'marginBottom',0);
			y = UI.height(main) - UI.height(side);
			UI.C(this._body,'marginBottom',y < 0 ? - y + 'px' : '');
		}
	},
	updateTime : function(newTime){ //Update Time
		if (!MI.time) {
			MI.time = newTime;
		}
		if (newTime - MI.time > 60) { //Don't Update In 60 Seconds
			MI.time = newTime;
			UI.each(this.time,function(o,i){
				var info,now = MI.time,Now = new Date(),pubTime = UI.A(o,'rel'),PubTime = new Date(),gapTime = now - pubTime,minute = parseInt(gapTime / 60),hour = parseInt(gapTime / 3600),day = parseInt(gapTime / 86400),clock = o.title.split(' ')[1];
				Now.setTime(now + '000');
				PubTime.setTime(pubTime + '000');
				if (minute == 0) {
					info = '刚刚发表';
				}
				else if (minute < 60) {
					info = minute + '分钟前';
				}
				else if (minute > 59 && hour < 6) {
					info = hour + '小时' + minute % 60 + '分钟前';
				}
				else if (hour > 5 && day == 0) {
					info = (Now.getDate() == PubTime.getDate() ? '今天' : '昨天') + ' ' + clock;
				}
				else if (day == 1 && Now.getDate() - PubTime.getDate() < 2) {
					info = '昨天 ' + clock;
				}
				else {
					info = o.title;
				}
				if (info) {
					o.innerHTML = info;
				}
			});
		}
	},
	more : function(){
		var Self = this,children = UI.children(Self._body),last = children[children.length - 1],url = 'r=' + MI.random() + '&time=' + Self.last.time + '&id=' + Self.last.id + (Self.guest ? '&u=' + Self.guest : '');
		/*
			/home.php?time=
			/at.php?time=
			/index.php?time=

			/index.php?time=&u=

			{
				result : 0,
				msg : '',
				info : {
					hasNext : 1,
					talk : [
						{
							id : '123456',
							type : 1,
							vip : 1,
							name : 'xhlv',
							nick : 'xhlv',
							pic : 'http://mat1.gtimg.com/www/mb/images/img2.jpg',
							count : null,
							time : '5分钟前',
							from : 'web',
							timestamp : '1232542321',
							content : '内容',
							source : {
								...
							}
						}
					]
				}
			}
		*/
		if (!Self._more.sending) {
			UI.addClass(Self._more,'loading');
			UI.get(UI.A(Self._more,'rel'),url,function(data){
				data = MI.json(data);
				//data = {result : 0,msg : '',info : { hasNext : 1,talk : [{id : '123456',time : '5分钟前',content : '内容'},{id : '1234567',time : '5分钟前',content : '内容'}] }};
				//data = {result:0,msg:'成功','info':{'hasNext':1,'talk':[]}};
				if (data.result == 0) {
					data.info.guest = Self.guest;
					var cache = document.createDocumentFragment(),o = UI.html(new UI.tmplString(MI.tmpl.listAll)(data.info));
					if (data.info.talk.length) {
						for (var i = 0,num = o.length;i < num;i++) {
							Self.addEvent(o[i]);
							UI.append(o[i],cache);
						}
						UI.append(cache,Self._body);
						UI.C(Self._body,'marginBottom','');
						if (window.pgvUrl && pgvUrl != '') {
							mbPgvAdd(pgvUrl + '/more');
						}
					}

					//More
					if (data.info.hasNext == 0 || !data.info.talk.length) {
						UI.addClass(Self._more.parentNode,'hide');
					}
					else {
						UI.addClass(last,'pageLine');
						Self.cacheLast();
					}

					Self.updateTime(data.info.time);
				}
				else if (data.msg){
					alert(data.msg); //需模拟alert
				}
				UI.removeClass(Self._more,'loading');
				Self._more.sending = 0;
			});
		}
		Self._more.sending = 1;
	}
}
MI.Talk = function(id){ //Talk
	var Self = this,html = new UI.tmplString(MI.tmpl.reply)({});
	Self.id = id;
	Self._body = UI.G(id);
	Self._talk = UI.html(html)[0]; //Talk Box
	Self._relay = UI.html(html.replace(/<\/textarea>/g,'').replace(/textarea/g,'input'))[0];
	Self._relayNum = UI.G('relay' + id);
	Self.replyBox = new MI.TalkBox(Self._talk);
	Self.relayBox = new MI.TalkBox(Self._relay);
	Self.replyBox.successCall = function(){
		MI.dialog.hide();
	};
	Self.relayBox.successCall = function(){
		MI.dialog.hide();
		if (Self._relayNum) {
			MI.countNum(Self._relayNum,1);
		}
	};
	Self.replyBox.talkId = this.relayBox.talkId = id;

	//Talk Info
	var userLink = UI.GC(Self._body,'.userDetail a')[1];
	Self.name = UI.text(userLink);
	Self.account = UI.A(userLink,'rel');
	Self.content = UI.text(UI.GC(Self._body,'.msgCnt')[0]);

	var report = UI.GC(Self._body,'.report')[0],reply = UI.GC(Self._body,'.reply')[0],relays = UI.GC(Self._body,'.relay'),relay = relays[0],relay2 = relays[1];
	//Event
	if (reply) {
		reply.onclick = function(){
			Self.reply();
		}
	}
	if (relay) {
		relay.onclick = function(){
			Self.reply(1);
		}
	}
	if (relay2) {
		relay2.onclick = function(){
			Self.reply(1);
		}
	}
	if (report) {
		report.onclick = function(){
			Self.report();
		}
	}
}
MI.Talk.prototype = {
	reply : function(type){
		var Self = this;
		Self.talkBox = type ? Self.relayBox : Self.replyBox;
		var replyTitle = '转播 "' + UI.trim(Self.name) + ': ' + Self.content.slice(0,25),relayTitle = '回复 ' + Self.name + ':';
		if (Self.content.length > 25) {
			replyTitle += '...';
		}
		replyTitle += '"<br/>再说两句:';
		UI.GC(Self.talkBox._body,'.replyTitle')[0].innerHTML = type ? replyTitle : relayTitle;
		Self.talkBox._body.className = type ? 'zfWrap' : 'talkWrap';
		Self.talkBox.type = type ? 1 : 2;
		Self.talkBox._txt.value = '';
		Self.talkBox.countTxt();
		MI.dialog.show({width:462,html:this.talkBox._body});
		setTimeout(function(){
			Self.talkBox._txt.focus();
		},0);
	},
	report : function(){
		jubao_msg(this.id,this.account);
	}
}
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
	
	var Self = this,msgFunction,index = 0,input,target;
	if (UI.isFunction(o.messages)) {
		msgFunction = 1;
	}

	for (var i in Self.data.inputs) {
		input = Self.data.inputs[i];
		target = input.target = UI.G(i); //Target Dom
		if (msgFunction) {
			input.message = o.messages(o.inputs[i].target);
		}
		else {
			input.message = o.messages[index];
			index++;
		}
		UI.A(input.message,'rel',input.message.innerHTML || '');
		input.ico = UI.html('<b class="pass" style="display:none"></b>')[0];
		UI.after(input.ico,input.target);

		//Event
		target.onfocus = function(){
			this.ico = 0;
			this.focused = 1;
		};
		target.onblur = function(){
			this.blured = 1; //If Need To Check
			this.ico = 1; //If Need To Add Ico
			this.focused = 0;
		};
		UI.EA(target,'blur',validate);
		UI.EA(target,'keyup',validate);
	}

	UI.EA(Self._body,'submit',function(e){
		var E = UI.E(e),data = {},target,tmp;
		Self.success = 1; //No Error
		if (Self.isAjax) {
			E.prevent();
		}
		if (Self.check && Self.check()) {
			return;
		}
		for (var i in Self.data.inputs) { //Validate All Input
			validate(i);
		}
		//Submit
		if (Self.success && Self.isAjax) {
			for (var i in Self.data.inputs) {
				target = UI.G(i);
				if (target.type == 'radio') {
					tmp = UI.GC(target.parentNode,'input[type=radio]');
					for (var j = 0,num = tmp.length;j < num;j++) {
						if (tmp[j].checked) {
							data[i] = tmp[j].value;
							break;
						}
					}
				}
				else {
					data[i] = UI.G(i).value;
				}
			}
			UI.ajax({url:UI.A(Self._body,'action'),data:data,success:function(data){
				//data = {result:0,msg:'用户未登陆',info:[{result:0,msg:'正确'},{result:0,msg:'正确'}]};
				data = MI.json(data);
				var index = 0,success = 1,input;
				if (data.result == 0) {
					if (data.info) {
						for (var i in Self.data.inputs) {
							input = Self.data.inputs[i];
							if (data.info[index].result == 0) {
								if (!input.removed) {
									if (input.success) {
										Self.showMessage(input,input.success,1);
									}
									else Self.hideMessage(input);
									if (input.remove) {
										UI.A(input.target,'disabled','disabled');
										input.removed = 1;
									}
								}
							}
							else {
								Self.showMessage(input,data.info[index].msg);
								success = 0;
							}
							index++;
						}
					}
					if (success && Self.data.success) {
						Self.data.success();
					}
				}
				else if (data.msg){
					alert(data.msg);
				}
			}});
		}
		else if (!Self.success) {
			E.prevent();
		}
	});
	function validate(e){
		var E,i,input,value,valueReplaced,error = 0,isSubmit = 0,url = {};
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
			return;
		}
		if (input.replace) {
			valueReplaced = input.replace(value);
			if (value != valueReplaced) {
				target.value = valueReplaced;
			}
		}
		if (isSubmit ? 1 : target.blured) {
			error = input.rule ? input.rule(target.value) : 0;
			if (!error) { //Not Error
				if (!input.url || (input.url && target.focused) ) {
					Self.hideMessage(input);
					target.error = 0;
				}
			}
			else {
				Self.showMessage(input,error);
				target.error = 1;
				Self.success = 0;
			}
		}
		//Ajax Check
		url[i] = value;
		if (!isSubmit && !error && input.url && target.blured && E.type == 'blur') {
			UI.get(input.url,url,function(data){
				data = MI.json(data);
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
		if (!o.noIco && success) {
			UI.show(o.ico);
		}
		else UI.hide(o.ico);
	},
	hideMessage : function(o){
		o.message.innerHTML = UI.A(o.message,'rel') || '';
		UI.removeClass(o.message,'error');
		UI.removeClass(o.message,'success');
		if (!o.noIco && o.target.ico) {
			UI.show(o.ico);
		}
	}
}
MI.RelateSelect = function(o){ //RelateSelect
	var Self = this,select,selectFirst,option,value;
	Self._body = UI.G(o.id);
	select = UI.GT(Self._body,'select');
	Self._first = select[0];
	Self._second = select[1];
	Self.data = {};

	Self._first.innerHTML = Self._second.innerHTML = '';
	for (var i in o.data) {
		option = UI.DC('option'),value = i.split(',');
		option.innerHTML = value[0];
		option.value = value[1];
		UI.append(option,this._first);
		Self.data[value[1]] = o.data[i];

		if (!selectFirst) {
			selectFirst = value[1];
		}
	}
	Self.show(selectFirst);

	//Event
	Self._first.onchange = function(){
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
MI.Dialog = function(o){ //Dialog
	var Self = this;

	//Dom
	Self._body = UI.DC('div');
	Self._body.className = 'D';
	Self._body.innerHTML = '<div class="bg"></div><div class="CR"><div class="top"><span class="left"><em></em></span><span class="right"><em></em></span></div><div class="DTitle"></div><a' + V5 + ' class="DClose" title="关闭">关闭</a><div class="DCont"></div><div class="bot"><span class="left"><em></em></span><span class="right"><em></em></span></div></div>';
	Self._bg = Self.$('.bg');
	Self._wrap = Self.$('.CR');
	Self._title = Self.$('.DTitle');
	Self._close = Self.$('.DClose');
	Self._cont = Self.$('.DCont');

	//Event
	Self.key = function(e) {
		switch(UI.E(e).key) {
			case 27:
				Self.hide();
				break;
		}
	};
	Self.resizeBg = function(init){
		if (Self.display) {
			if (UI.B.ie) Self._bg.style.cssText += ';width:100%;';
			Self.delay = setTimeout(function(){
				var h_page = UI.pageHeight(),h_window = UI.windowHeight();
				Self._bg.style.cssText += ';margin-left:0;width:' + UI.pageWidth() + 'px;height:' + (h_page < h_window ? h_window : h_page) + 'px;';
			},0);
		}
	};
	UI.EA(document,'keyup',Self.key);
	UI.EA(window,'resize',Self.resizeBg);
	Self._close.onclick = function(){
		Self.hide();
	}
}
MI.Dialog.prototype = {
	width : 462,
	close : 1,
	show : function(o){
		var Self = this;
		if (!Self._append) {
			document.body.appendChild(Self._body);
			Self._append = 1;
			UI.C(Self._bg,'marginLeft','-9999px');
		}

		Self.close = o.close != undefined ? o.close : 1;
		if (Self.close) {
			UI.show(Self._close);
		}
		else UI.hide(Self._close);

		Self._title.innerHTML = o.title || '';
		UI.C(Self._title,'height',o.title ? '' : '0');
		if (UI.isString(o.html)) {
			Self._cont.innerHTML = o.html;
		}
		else if (UI.isObject(o.html)) {
			for (var i = 0,num = Self._cont.childNodes.length;i < num;i++) {
				UI.remove(Self._cont.childNodes[0]);
			}
			UI.append(o.html,Self._cont);
			UI.show(o.html);
		}
		if (o.width) {
			Self.width = o.width;
		}
		UI.C(Self._wrap,'width',Self.width + 'px');
		UI.C(Self._wrap,'opacity',0);
		UI.show(Self._body);

		setTimeout(function(){
			Self.resizeBg();
			Self._wrap.style.cssText = 'width:' + Self.width + 'px;margin:' + ( UI.scrollY() - UI.height(Self._wrap)/2 ) + 'px 0 0 -' + Self.width/2 + 'px;';
		},0);

		//Function
		if (o.start) { //Run When Open Dialog
			o.start();
		}
		if (o.end) { //Run When Close Dialog
			Self.end = o.end;
		}
		else Self.end = null;

		Self.display = 1;
	},
	hide : function(){
		UI.hide(this._body);
		if (this.end) {
			this.end();
		}
		this.display = 0;
	},
	$ : function(className){
		return UI.GC(this._body,className)[0];
	}
}
MI.Pic = function(o,size){
	o.src = 'http://mat1.gtimg.com/www/mb/images/head_' + size + '.jpg';
}
})();

//举报
function jubao(urlParam){
	var url="http://jubao.qq.com/cgi-bin/jubao?";
	if(urlParam!='') url += urlParam;

	var wrap = UI.html('<div style="width:620px;height:436px;overflow:hidden;border:solid #FFF;border-width:5px 0 10px"></div>')[0],oIFrame = document.createElement("iframe");
	oIFrame.frameborder = '0';
	oIFrame.scrolling = 'no';
	oIFrame.style.cssText = 'width:628px;height:470px;background:#FFF;margin:-13px 0 0 -5px;-margin-top:-32px;border-style:none';
	wrap.appendChild(oIFrame);
	MI.dialog.show({title:'腾讯举报平台',width:670,html:wrap});
	oIFrame.src = url;
}
try{document.domain='qq.com'}catch(e){}
function jubao_onClose(){
	MI.dialog.hide();
}
function jubao_msg(id){
	jubao('appname=micoblog&subapp=web&jubaotype=msg&tw_msg_id='+id+'&tw_name=&tw_vip=&envname=web');
}
function jubao_user(name){
	jubao('appname=micoblog&subapp=web&jubaotype=uin&tw_pic_url=&tw_name='+name+'&tw_vip=&envname=web');
}

function setHeight(){
	var copyright = UI.G('Copyright'),className = 'position';
	if (copyright) {
		if(UI.pageHeight() > UI.windowHeight()){
			UI.removeClass(copyright,className);
		}
		else{
			UI.addClass(copyright,className);
		}
	}
} 
UI.EA(window,'load',setHeight);
UI.EA(window,'resize',setHeight);
UI.ready(function(){
	setHeight();
});

//Create Dialog
MI.dialog = new MI.Dialog();
