/**
 * MI.MiniSite
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
/*
	talkList:
		btnTime 广播时间链接点击
		btnMore 更多消息（点击）
		btnMoreAuto 更多消息（自动）
		btnMoreOpen 更多消息（新窗口）

	other:
		btnGoReg 立即开通微博
		btnGoLogin 登录微博
		btnGoNews 看看大家在说什么
		btnGoAt 提到我的
		btnGoHome 我的主页
		btnGoTalk 发表广播
		btnFindUser 找人
		btnStayTime 页面停留时间
		btnScroll 页面滚动行为
		btnHotTopic 热门话题
		btnHotUser 推荐用户
*/
$ = UI.G;
$$ = UI.GC;
(function(){
var V1='talk[i].source',V2='info.source',V3='<div class="SA"><em>◆</em><span>◆</span></div>',V5=' href="#"',V6=' onerror="MI.Pic(this,50)"',V7=' title="<%=talk[i].nick.toTitle()%>(@<%=talk[i].name%>)"';
MIIco = ['auth','expo','cic','moon']; //Set Icon's Order
MIIcoHtml = ['<a href="http://t.qq.com/certification" target="_blank" class="vip" title="腾讯认证"></a>','<a href="http://blog.qq.com/zt/2010/2010expo/shibovol.htm" title="2010上海世博志愿者" target="_blank" class="ico_expo"></a>','<a href="http://t.qq.com/group.php?g=cic2010" onclick="MI.Bos(\'btnIconCic\')" class="ico_net" title="互联网大会认证名人"></a>','<a href="http://t.qq.com/group_s.php?g=changetai" onclick="MI.Bos(\'btnIconMoon\')" class="ico_moon" title="嫦娥二号升空微博报道团认证用户"></a>'];
/*MIIcoWC = function(id){
	return '<a href="/k/' + MIIcoWC.v[id] + '队" title="去' + MIIcoWC.v[id] + '队主场一起狂欢" class="ico_flag flag' + id + '" target="_blank"></a>';
}
MIIcoWC.v = ['','南非','墨西哥','乌拉圭','法国','阿根廷','尼日利亚','韩国','希腊','英格兰','美国','阿尔及利亚','斯洛文尼亚','德国','澳大利亚','塞尔维亚','加纳','荷兰','丹麦','日本','喀麦隆','意大利','巴拉圭','新西兰','斯洛伐克','巴西','朝鲜','科特迪瓦','葡萄牙','西班牙','瑞士','洪都拉斯','智利','中国'];*/
MI_icon = function(obj){
	return '<%for(var k=0,num=MIIco.length;k<num;k++){if('+obj+'[MIIco[k]]){%><%=MIIcoHtml[k]%><%;break;}}%>';//if('+obj+'.wc){%><%=MIIcoWC('+obj+'.wc)%><%;}
}
MI = {
	time : null, //Server's System Time
	user : {
		fun : {}
	},
	string : {
		length : function(str){
			var arr = str.match(/[^\x00-\x80]/g);
			return str.length + (arr ? arr.length : 0);
		}/*,
		escape : function(str){
			return MI.string.html(str).replace(/'/g,"\\'");
		},
		escapeReg : function(str){
			var buf = [];
			for(var i = 0;i < str.length;i++){
				var c = str.charAt(i);
				switch (c) {
					case '.' : buf.push('\\x2E');break;
					case '$' : buf.push('\\x24');break;
					case '^' : buf.push('\\x5E');break;
					case '{' : buf.push('\\x7B');break;
					case '[' : buf.push('\\x5B');break;
					case '(' : buf.push('\\x28');break;
					case '|' : buf.push('\\x28');break;
					case ')' : buf.push('\\x29');break;
					case '*' : buf.push('\\x2A');break;
					case '+' : buf.push('\\x2B');break;
					case '?' : buf.push('\\x3F');break;
					case '\\' : buf.push('\\x5C');break;
					default : buf.push(c);
				}
			}
			return buf.join('');
		},
		html : function(str){
			return str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		},
		cut : function(str,num,replace){
			replace = UI.isUndefined(replace) ? '...' : replace;
			var arrNew = [],
				strNew = '',
				arr,
				length = MI.string.length(str);
			if (length > num) {
				arr = str.split('');
				for (var i = 0,len = arr.length;i < len;i++) {
					if (num > 0) {
						arrNew.push(arr[i]);
						num -= MI.string.length(arr[i]);
					}
					else {
						break;
					}
				}
				strNew = arrNew.join('') + replace;
			}
			else {
				strNew = str;
			}
			return strNew;
		}*/
	},
	random : function(delay){ //delay = 1000 ---> 1s
		delay = delay || 1;
		return parseInt( new Date().getTime()/delay );
	},
	hideFocus : function(){
		UI.A(this,'hideFocus','true');
		this.onmouseover = null;
	},
	ajax : 0, //Ajax Times
	talkNew : [],
	talkMore : [],
	crs : [], //Lazy Load Images With ClassName Of '.crs' (Src)
	json : function(data){
		var o = {};
		try{
			o = eval('(' + data + ')');
		}catch(e){};
		return o;
	},
	tmpl : {
		listAll : '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>"<%if(fav){%> fav="<%=talk[i].favortimestamp%>"<%}%> rel="<%=talk[i].timestamp%>">\
			<%if(!guest){%>\
				<%if('+V1+' && talk[i].type==4){%>\
					<div class="userPic"><a href="http://t.qq.com/<%=talk[i].name%>"'+V7+' class="masPic" target="_blank"><img src="<%=talk[i].pic%>"'+V6+'/></a><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)" class="cusPic" target="_blank"><img src="<%='+V1+'.pic%>"'+V6+'/></a></div>\
				<%}else{%>\
					<div class="userPic"><a href="http://t.qq.com/<%=talk[i].name%>"'+V7+' target="_blank"><img src="<%=talk[i].pic%>"'+V6+'/></a></div>\
				<%}%>\
			<%}%>\
			<div class="msgBox">\
				<div class="userName" rel="<%=talk[i].name%>"><strong><a href="http://t.qq.com/<%=talk[i].name%>"'+V7+' target="_blank"><%=talk[i].nick%></a>'+MI_icon('talk[i].flag')+'<%=talk[i].icon%><%if(!'+V1+'){%>:<%}%></strong><%if('+V1+' && talk[i].type==2){%>转播:&nbsp;<%}else if('+V1+' && talk[i].type==4){%>对<strong class="userTo"><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)" target="_blank"><%='+V1+'.nick%></a>'+MI_icon(V1+'.flag')+'说:<%}%></strong>\
				</div>\
				<div class="msgCnt"><%=talk[i].content||"&nbsp;"%></div>\
				<%var Imgage=talk[i].image && talk[i].image.length,Videos=talk[i].videos && talk[i].videos.length,Music=talk[i].music && talk[i].music.length;if(Imgage || Videos || Music){%>\
					<%if(Imgage){%>\
						<%for(var j=0;j<talk[i].image.length;j++){%>\
							<a href="http://t.qq.com/p/t/<%=talk[i].id%>" target="_blank"><em class="thumbs_img"></em></a>\
						<%}%>\
					<%}%>\
				<%}%>\
				<%if('+V1+' && talk[i].type==2){%>\
					<div class="replyBox">\
						<div class="msgBox">\
							<div class="msgCnt"><strong><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)" target="_blank"><%='+V1+'.nick%></a>'+MI_icon(V1+'.flag')+'<%='+V1+'.icon%>:</strong><%='+V1+'.content%></div>\
							<%var Imgage='+V1+'.image && '+V1+'.image.length,Videos='+V1+'.videos && '+V1+'.videos.length,Music='+V1+'.music && '+V1+'.music.length;if(Imgage || Videos || Music){%><div class="mediaWrap">\
								<%if(Imgage){%>\
										<%for(var j=0;j<'+V1+'.image.length;j++){%>\
											<div class="picBox"><a href="<%='+V1+'.image[j]%>/460" class="pic" target="_blank"><img class="crs" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%='+V1+'.image[j]%>/160<%}%>"></a></div>\
										<%}%>\
								<%}%>\
							</div><%}%>\
							<div class="pubInfo"><span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" href="http://t.qq.com/p/t/<%='+V1+'.id%>" target="_blank"><%='+V1+'.time%></a> <%='+V1+'.from%><%if(0 && '+V1+' && '+V1+'.count){if(MI.user.account){%>\
								<a href="http://t.qq.com/p/z/<%='+V1+'.id%>" class="zfNum" target="_blank">查看转播(<b class="relayNum"><%='+V1+'.count%></b>)</a>\
							<%}else{%>\
								<em class="zfNum">查看转播(<b class="relayNum"><%='+V1+'.count%></b>)</em>\
							<%}}%></span></div>\
						</div>\
					</div>\
				<%}%>\
				<div class="pubInfo"><span class="left"><a class="time" href="http://t.qq.com/p/t/<%=talk[i].id%>" target="_blank"><%=talk[i].time%></a> <%=talk[i].from%><%if(0 && talk[i].count){if(MI.user.account){%>\
					<a href="http://t.qq.com/p/z/<%=talk[i].id%>" class="zfNum" target="_blank">查看转播(<b class="relayNum"><%=talk[i].count%></b>)</a><%}else{%>\
					<em class="zfNum">查看转播(<b class="relayNum"><%=talk[i].count%></b>)</em><%}}%><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%>\
					<a class="view" href="http://t.qq.com/p/r/<%=talk[i].id%>">查看对话</a><%}%></span><div class="funBox"></div>\
				</div>\
				<%if('+V1+' && talk[i].type==4){%><div class="talkDetail"><b><%='+V1+'.nick%>:</b> <%='+V1+'.content%></div><%}%>\
			</div>\
		</li><%}%>',
		userInfo : '<div class="userName"><a href="http://t.qq.com/<%=userinfo.id%>" title="点击打开我的主页" target="_blank"<%=MI.bos[0]%>><em class="ico_pgy"></em><%=userinfo.nick%></a></div><div class="right"><span class="atMe"><a href="http://t.qq.com/at"<%=MI.bos[1]%>>@我的<b id="newCoutAt"></b></a></span><span><a href="http://t.qq.com/<%=userinfo.id%>" class="btn_pub"<%=MI.bos[2]%>>发表广播</a></span></div>'
	},
	bos : [
		' onclick="MI.Bos(\'btnGoHome\')"',
		' onclick="$(\'newCoutAt\').innerHTML=\'\';MI.Bos(\'btnGoAt\')"',
		' onclick="MI.Bos(\'btnGoTalk\')"'
	],
	newCount : function(type){
		type = type || '4,3,2,1';
		//type = type || '4,3,2', //暂时去掉气泡提示
		setInterval(newCout,30000);
		setTimeout(function(){ //不加延迟，IE中偶尔请求会被阻断
			newCout();
		},10);
		function newCout(){
			if (MI.newCountFail < 6) { //6次未登录后不再拉取
				UI.getScript('http://mini.t.qq.com/mini/newMsgCount.php?type=' + type + '&callback=MI.newCountCall&r=' + MI.random());
				//MI.newCountCall({"result":0,"msg":"\u6210\u529f","info":[{"type":1,"value":999},{"type":2,"value":2},{"type":3,"value":3},{"type":4,"value":4}]});
			}
		}
	},
	newCountFail : 0,
	newCountCall : function(data){
		if (data.result == 0) {
			var target,num,maxNum,tip,_new;
			UI.each(data.info,function(o,i){
				num = o.value;
				/*if (o.type == 1) {
					target = $('newCountFollower');
					if (target && num) {
						var _num = target.firstChild,followerNum = $('followerNum');
						maxNum = 999;
						_num.innerHTML =  num > maxNum ? '<strong>' + maxNum + '</strong>+' : '+<strong>' + num + '</strong>';
						_num.title =  '有' + (num > maxNum ? '超过' + maxNum : num) + '个新听众';
						UI.addClass(UI.next(_num),'bubble');
						UI.show(target);
					}
					else if (target){
						UI.hide(target);
					}
				}
				if (o.type == 2) {
					target = $('newCoutMsg');
					if (target) {
						target.innerHTML = target && num ? '(' + num + ')' : '';
					}
				}*/
				if ((o.type == 3 || o.type == 5) && !MI.noNewCount) {
					if (MI.talkList && MI.talkList._new) {
						maxNum = 50000;
						if (num > maxNum) {
							tip = '超过<strong>' + maxNum + '</strong>条的';
						}
						else tip = '<strong>' + num + '</strong>条';
						_new = MI.talkList._new;
						_new.innerHTML = '<a href="javascript:void(0)" tabindex="4">有' + tip + '新广播，点击查看</a>';

						//Title Tip
						if (!document.titleTmp) {
							document.titleTmp = document.title;
						}
						if (num > maxNum) {
							document.title = '(' + maxNum + '+) ' + document.titleTmp;
						}
						else {
							document.title = (num ? '(' + num + ') ' : '') + document.titleTmp;
						}

						if (num) {
							_new.style.display = 'block';
						}
						else {
							UI.hide(_new);
						}
						if (_new.num != num) {
							UI.C(_new,'opacity',0);
							UI.animate(_new,'opacity',1);
						}
						_new.num = num;
					}
				}
				if (o.type == 4) {
					target = $('newCoutAt');
					if (target) {
						target.innerHTML = target && num ? '(' + num + ')' : '';
					}
				}
			});
			MI.newCountFail = 0;
		}
		else if (data.result == -1) { //未登录
			MI.newCountFail++;
		}
	},
	addHover : function(el){
		var delayHover,delayOut;
		el.onmouseover = function(){
			var Self = this;
			clearTimeout(delayOut);
			delayHover = setTimeout(function(){
				UI.addClass(Self,'hover');
			},20);
		}
		el.onmouseout = function(){
			var Self = this;
			clearTimeout(delayHover);
			delayOut = setTimeout(function(){
				UI.removeClass(Self,'hover');
				UI.removeClass(Self,'newMsg');
			},20);
		}
	},
	jump : {},
	jumpEvent : function(el){
		if (MI.jump.uin && MI.jump.key) {
			UI.each(el,function(o){
				var url = UI.A(o,'href');
				if (url.hasString('qq.com')) {
					if (UI.B.ie6) {
						url = encodeURI(UI.utfDecode(url));
					}
					UI.A(o,'href',(UI.B.ie ? ' ' : '') + 'http://ptlogin2.qq.com/jump?clientuin=' + MI.jump.uin + '&clientkey=' + MI.jump.key + '&u1=' + encodeURIComponent(url) + (url.hasString('?') ? '&' : '?') + 'pref=minisite');
				}
			});
		}
	}
}
MI.PV = function(name){
	if (window.pvCurUrl && pvCurUrl != '') {
		if (!pvCurUrl.match(new RegExp(name + '$'))) {
			pvCurUrl += '/mini_' + name;
		}
		pvRepeatCount = 1;
		if(typeof(pgvMain) == 'function') pgvMain();
	}
}
MI.Bos = function(op,value){ //Boss Using : MI.Bos('frontClick');
	try{
		var ouin = UI.trim(UI.cookie('o_cookie'));
		MI.Bos.pic.src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=202&iFlow=0' + (value ? '&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=' + value : '');
	}catch(e){}
}
MI.Bos.pic = new Image();
})();
MI.TalkList = function(id){
	var Self = this,_more = $('moreList');
	Self._body = UI.isString(id) ? $(id) : id;
	Self._more = Self._bottom = _more ? $$(_more,'a')[0] : UI.DC('a');
	Self._new = $('talkNew'); //New Talk Button
	Self._list = UI.children(Self._body);

	//Cache Last
	Self.cacheLast();
	//Cache First
	Self.cacheFirst();

	//Event
	if (Self._more) {
		Self._more.onmouseover = MI.hideFocus;
		Self._more.onclick = function(e){
			if (UI.B.ie && Self.moreTimes > 2) {
				MI.Bos('btnMoreOpen');
				return true;
			}
			Self.more();
			UI.E(e).prevent();
		}
		//Self._more.onfocus = MI.blur;
	}
	if (Self._new) {
		Self._new.onclick = function(){
			Self.newly();
			MI.Bos('btnkNew');
			return false;
		}
		/*var hideNewDelay;
		UI.EA(window,'scroll',function(){
			clearTimeout(hideNewDelay);
			hideNewDelay = setTimeout(hideNew,50);
		});
		function hideNew(){
			var y = UI.scrollY() + UI.windowHeight();
			UI.each(Self._news,function(o){
				if (UI.hasClass(o,'newMsg') && UI.getY(o) + UI.height(o) + 70 < y) {
					UI.removeClass(o,'newMsg');
				}
			});
		}*/
	}
	setTimeout(function(){ //页面渲染玩再执行
		for (var i = 0,num = Self._list.length;i < num;i++) {
			Self.addEvent(Self._list[i]);
		}
	},0);
}
MI.TalkList.prototype = {
	cur : null, //Current List
	curSource : null, //Current List's Sourse Message
	_tip : null, //List Tip
	_news : [], //New Talks
	auto : 0, //Auto Load Ajax Data When Browser's Back
	iconPic : 0, //Use Simple View Model
	moreTimes : 0, //More Times
	removeUrl : '/delete.php',
	favorUrl : '/mini/favoritemsg.php',
	removeTip : '确定删除这条广播？',
	removeCall : 0, //Call Function After Remove
	unfavTip : '确定删除这条收藏？',
	callBack : { //Call Back Name For JSON
		newly : '',
		more : ''
	},
	xhr : {}, //Cache XHR
	last : {}, //Cache Last List's Info
	first : { //Cache First List's Info
		time : 1
	},
	add : [], //Cache Added List
	time : [],
	addEvent : function(el){
		var Self = this,
			time = $$(el,'.time'),
			view = $$(el,'.view')[0],
			fav = $$(el,'.fav')[0],
			unfav = $$(el,'.light.fav')[0],
			report = $$(el,'.alarm')[0],
			viewContent = $$(el,'.talkDetail')[0],
			_viewRelay = $$(el,'.zfNum'),
			viewRelay = _viewRelay[_viewRelay.length - 1],
			content = $$(el,'.msgCnt')[0],
			comt = $$(el,'.comt')[0],
			reply = $$(el,'.reply')[0],
			relay = $$(el,'.relay')[0],
			del = $$(el,'.delBtn')[0],
			//moreFun = $$(el,'.moreFun')[0],
			replyMsg = $$(el,'.replyMsg')[0],
			picBox = $$(el,'.picBox'),
			videoBox = $$(el,'.videoBox'),
			musicBox = $$(el,'.musicBox');
		if (!UI.B.ipad && el.nodeName == 'LI') {
			MI.addHover(el);
		}

		MI.jumpEvent($$(el,'a'));

		//Add Time Title
		for (var i = 0,num = time.length;i < num;i++) {
			if (!UI.A(time[i],'rel')) {
				UI.A(time[i],'rel',UI.A(el,'rel'));
			}
			var timeObj = new Date();
			timeObj.setTime(UI.A(time[i],'rel') + '000');
			time[i].title = UI.formatDate(timeObj,'yyyy年M月d日 hh:mm');
			Self.time.push(time[i]);
			time[i].onclick = timeBos;
		}
		function timeBos(){
			if (this.nodeName == 'A') {
				MI.Bos('btnTime');
			}
		}
	},
	cacheLast : function(){ //Cache Last Id For More
		var children = UI.children(this._body),
			last = children[children.length - 1],
			fav;

		if (last) {
			fav = UI.A(last,'fav');
			this.last = {
				id : last.id,
				time : UI.A(last,'rel'),
				fav : fav ? fav : 0
			};
		}
	},
	cacheFirst : function(){ //Cache First List
		var _first = UI.children(this._body)[0];
		if (_first) {
			this.first = {
				time : UI.A(_first,'rel'),
				id : _first.id
			};
		}
	},
	updateTime : function(newTime){ //Update Talk's Time
		newTime = Number(newTime);
		if (!MI.time || newTime - MI.time > 60) { //Don't Update In 60 Seconds
			MI.time = newTime;
			UI.each(this.time,function(o,i){
				var info,
					now = MI.time,
					Now = new Date(),
					pubTime = UI.A(o,'rel'),
					PubTime = new Date(),
					gapTime = now - pubTime,
					minute = parseInt(gapTime / 60),
					hour = parseInt(gapTime / 3600),
					day = parseInt(gapTime / 86400),
					clock = o.title.split(' ')[1];
				Now.setTime(now + '000');
				PubTime.setTime(pubTime + '000');
				if (minute == 0) {
					info = '刚刚';
				}
				else if (minute < 60) {
					info = minute + '分钟前';
				}
				/*else if (minute > 59 && hour < 6) {
					info = hour + '小时' + minute % 60 + '分钟前';
				}*/
				//else if (hour > 5 && day == 0) {
				else if (minute > 59 && day == 0) {
					info = (Now.getDate() == PubTime.getDate() ? '今天' : '昨天') + ' ' + clock;
				}
				else if (day == 1 && Now.getDate() - PubTime.getDate() < 2) {
					info = '昨天 ' + clock;
				}
				else if (Now.getFullYear() == PubTime.getFullYear()) {
					info = o.title.split('年')[1];
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
	more : function(auto){
		var Self = this,
			children = UI.children(Self._body),
			last = children[children.length - 1],
			url = 'r=' + MI.random() + '&num=10&category=1&time=' + (Self.last.fav ? Self.last.fav : Self.last.time) + '&id=' + Self.last.id + (Self.guest ? '&u=' + Self.guest : ''),
			rel = UI.A(Self._more,'rel');
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
							//vip : 1,
							flag : {
								auth : 0,
								vivi : 0,
								expo : 0
							},
							name : 'xhlv',
							nick : 'xhlv',
							pic : 'http://mat1.gtimg.com/www/mb/images/img2.jpg',
							image : [],
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
			if (rel) {
				UI.getScript(rel + '?callback=' + Self.callBack.more + '&' + url);
				//UI.get(rel,url,function(json){
				//	Self.addMore(json);
				//});
				MI.Bos(auto ? 'btnMoreAuto' : 'btnMore');
			}
		}
		Self._more.sending = 1;
	},
	newly : function(){
		var Self = this,_new = Self._new;
		if (!_new.sending) {
			if (_new.num > 15) {
				document.location.reload();
				//document.location.href = '/' + MI.user.account; //location.reload()在Firefox中会导致发图表单重新提交的问题
			}
			else {
				UI.addClass(_new,'loading');
				UI.getScript('http://mini.t.qq.com/mini/home.php?callback=' + Self.callBack.newly + '&category=1&time=' + Self.first.time + '&p=2&type=1&r=' + MI.random());
				//UI.get('/mini/home.php',{time:Self.first.time,p:2,type:1,r:MI.random()},function(json){
				//	Self.addNewly(json);
				//});
			}
		}
		_new.sending = 1;
	},
	addNewly : function(json){
		var Self = this,
			_new = Self._new,
			ajax = UI.isString(json);
		data = ajax ? MI.json(json) : json;
		if (data.result == 0) {
			data.info.guest = Self.guest;
			data.info.fav = 0;
			data.info.iconPic = Self.iconPic;

			if (!Self.guest && data.info.user != MI.user.account) { //Kill Change Account Bug
				document.location.reload();
				return;
			}

			UI.each(Self.add,function(o){ //Remove Added List
				if ($(o)) {
					UI.remove($(o));
				}
			});

			var list,cache = document.createDocumentFragment(),o = UI.html(new UI.tmplString(MI.tmpl.listAll)(data.info).replace(/<li id="/gi,ajax ? '<li class="newMsg" id="' : '<li id="')),length = data.info.talk.length;
			if (length) {
				if (Self._newLine) {
					UI.removeClass(Self._newLine,'pageLine');
				}
				for (var i = 0,num = o.length;i < num;i++) {
					Self.addEvent(o[i]);
					UI.append(o[i],cache);
					if (i == num - 1) {
						Self._newLine = o[i]; //New Line Dom
						UI.addClass(o[i],'pageLine');
					}
				}
				if (length > 50) {
					Self._body.innerHTML = '';
				}
				list = Self._news;
				for (var i = 0,num = list.length;i < num;i++) {
					UI.removeClass(list[i],'newMsg');
				}

				UI.prepend(cache,Self._body);
				Self._news = $$(Self._body,'.newMsg');
				//Self.card();
				//Self.buildTips();


				UI.each(Self.add,function(o){ //Remove Added List's NewMsg ClassName
					if ($(o)) {
						UI.removeClass($(o),'newMsg');
					}
				});
				Self.cacheFirst();
				Self.add = [];

				if (Self._tip) { //Hide Talk List's Tip
					UI.hide(Self._tip);
				}
				Self.updateTime(data.info.time);

				MI.PV('new');

				//For Ajax Back Forward
				if (ajax) {
					MI.ajax++;
					MI.talkNew.push(json);
				}
			}
		}
		UI.hide(_new);
		if (document.titleTmp) {
			document.title = document.titleTmp;
		}
		UI.removeClass(_new,'loading');
		_new.sending = 0;
	},
	addMore : function(json){
		var Self = this,
			_new = Self._new,
			ajax = UI.isString(json),
			children = UI.children(Self._body),
			last = children[children.length - 1];
		data = ajax ? MI.json(json) : json;
		//data = {result : 0,msg : '',info : { hasNext : 1,talk : [{id : '123456',time : '5分钟前',content : '内容'},{id : '1234567',time : '5分钟前',content : '内容'}] }};
		//data = {result:0,msg:'成功','info':{'hasNext':1,'talk':[]}};
		if (data.result == 0) {
			if (!Self.guest && MI.user.account && data.info.user != MI.user.account) { //Kill Change Account Bug
				document.location.reload();
				return;
			}

			data.info.guest = Self.guest;
			data.info.fav = Self.last.fav ? 1 : 0; //Fav List Tmpl
			data.info.iconPic = Self.iconPic;

			var cache = document.createDocumentFragment(),o = UI.html(new UI.tmplString(MI.tmpl.listAll)(data.info));
			if (data.info.talk.length) {
				for (var i = 0,num = o.length;i < num;i++) {
					UI.append(o[i],cache);
				}
				setTimeout(function(){ //渲染完再添加事件，比较耗时间
					for (var i = 0,num = o.length;i < num;i++) {
						Self.addEvent(o[i]);
					}
					/*Self.card();
					Self.buildTips();
					MI.Crs(1);*/
				},0);
				UI.append(cache,Self._body);

				MI.PV('more');

				//For Ajax Back Forward
				if (ajax) {
					MI.ajax++;
					MI.talkMore.push(json);
				}
			}

			//More
			if (data.info.hasNext == 0 || !data.info.talk.length) {
				UI.addClass(Self._more.parentNode,'hide');
				Self.more = function(){};
			}
			else {
				if (last) {
					UI.addClass(last,'pageLine');
				}
				Self.cacheLast();
				Self.cacheFirst();
			}

			Self.updateTime(data.info.time);
			Self.moreTimes++;
		}
		else if (data.msg){
			//MI.alert(data.msg);
		}
		UI.removeClass(Self._more,'loading');
		Self._more.sending = 0;
	}
}
MI.MiniSite = function(id){
	this._body = UI.isString(id) ? $(id) : id;
	if (this._body) {
		var Self = this;

		//DOM
		//用户信息
		Self._mainWrap = Self.$('.AL')
		Self._recomWrap = Self.$('.recomList');//Self.$('.regWrap');
		Self._userInfo = Self.$('.userInfo');
		Self._userInfoRight = Self.$('.right');

		Self._loading = Self.$('.loadBox');
		Self._more = Self.$('.moreFoot');

		//tips
		Self._tipsFind = $$(this._body,'.goFind')[0];
		Self._tipsLogin = $$(this._body,'.goLogin')[0];
		Self._tipsReg = $$(this._body,'.goReg')[0];
		Self._tipsNews = $$(this._body,'.goNews')[0];

		/*Self._btnReg = Self.$('.btn_reg');

		if(Self._btnReg){//注册按钮点击事件
			Self._btnReg.onclick = function(){
				var p = UI.parseUrl();//url中传递了uin，key
				var uin = p.clientuin;
				var key = p.clientkey;
				var href = UI.A(this,'href')
				if(uin && key){//通过ptlogin2 jump，保证带登录态跳转到t.qq.com
					var url ='http://ptlogin2.qq.com/jump?clientuin='+uin+'&clientkey='+key+'&u1='+href+'&from=minisite'
					UI.A(this,'href',url);
				}
			}
		}*/
	}
}
MI.MiniSite.prototype = {
	timeout : null,
	callback : function(data){
		//测速代码
		QosSS.t[4]= (new Date()).getTime();

		var Self = this;
		var html;
		if(!data){
			data = {result:null,msg:'未知错误'}
		}
		UI.hide(Self._loading);

		//data.result = -2
		if(data.result == 0){//返回成功
			//登录成功且开通微博 加载用户信息
			var user = data.info.userinfo;
			if(user){
				MI.user.account = data.info.userinfo.id;

				html = UI.html(new UI.tmplString(MI.tmpl.userInfo)(data.info));
				var frag = document.createDocumentFragment();
				UI.each(html,function(o){
					UI.append(o,frag);
				});
				Self._userInfo.innerHTML = '';
				UI.append(frag,Self._userInfo);
				MI.jumpEvent($$(Self._userInfo,'a'));
			}
			//user.num[2] = 0;
			//data.info.talk = '';
			if(data.info.talk && data.info.talk.length > 0){//有广播
				MI.talkList.addMore(data);
				MI.newCount('4,5,2,1');
				Self.showContent();
				UI.show(Self._more);
			}else{//fo一些人试试吧
				if(user.num[2] == 0){//如果没有fo任何人
					Self.showFind();
				}else{//fo了人，但是这些人都没有广播
					Self.showNews();
				}
			}			
		}else if(data.result == -1){//未登录
			Self.showLogin();
		}else if(data.result == -2){//登录成功但是未开通微博
			Self.showReg();
		}

		//测速代码
		QosSS.c = new Image();
		QosSS.c.onload = (QosSS.c.onerror = function() {delete QosSS.c;});
		QosSS.t[5]= (new Date()).getTime();
		QosSS.c.src="http://qos.report.qq.com/collect?type=1&name="+"mini_t_my_index"+"&1="+ (QosSS.t[1]- QosSS.t[0])+"&2="+ (QosSS.t[2]- QosSS.t[0])+ "&3="+ (QosSS.t[3]- QosSS.t[0])+"&4="+ (QosSS.t[4]- QosSS.t[0])+ "&5="+ (QosSS.t[5]- QosSS.t[0]);
	},
	showContent : function(){
		UI.show(this._mainWrap);
		UI.hide(this._recomWrap);
		UI.hide(this._tipsLogin);
		UI.hide(this._tipsReg);
		UI.hide(this._tipsFind);
	},
	showLogin : function(){
		UI.hide(this._mainWrap);
		UI.show(this._recomWrap);
		UI.show(this._tipsLogin);
	},
	showReg : function(){
		UI.hide(this._mainWrap);
		UI.show(this._recomWrap);
		UI.show(this._tipsReg);
	},
	showFind : function(){
		UI.hide(this._mainWrap);
		UI.show(this._recomWrap);
		UI.show(this._tipsFind);
	},
	showNews : function(){
		UI.hide(this._mainWrap);
		UI.show(this._recomWrap);
		UI.show(this._tipsNews);
	},
	$ : function(className){
		return $$(this._body,className)[0];
	}

}
UI.ready(function(){
	window.onbeforeunload = function(){
		MI.Bos('btnStayTime',new Date().getTime() - QosSS.t[0]);
	}
	UI.each($$('.hotTopicList a'),function(o){
		o.onclick = function(){
			MI.Bos('btnHotTopic');
		}
	});
	UI.each($$('.hotUser a'),function(o){
		o.onclick = function(){
			MI.Bos('btnHotUser');
		}
	});
	var url = UI.parseUrl();
	MI.jump = {
		uin : url.clientuin,
		key : url.clientkey
	}
	MI.jumpEvent($$('a'));
});
