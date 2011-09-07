/**
 * MI Login
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
$ = UI.G;
$$ = UI.GC;
MI = {
	/**
	 * 获取Json对象
	 * 
	 * @param {String} String Json字符串
	 * @return {Object} Object Json对象
	 *            @example
	 *            data = MI.json(data); //主要用于Json容错
	 */
	json : function(data){
		var o = {};
		try{
			o = eval('(' + data + ')');
		}catch(e){};
		return o;
	}
}
function trim(str) {
	return str.replace(/^\s*|\s*$/g, '');
}
function gcookie(n) {
	var N = n + '=',C = document.cookie.split(';');
	for(var i=0;i<C.length;i++) {
		var c = C[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(N) == 0) return decodeURIComponent(c.substring(N.length,c.length));
	}
	return null;
}
var Bos = function(op,value) {
	try{
		var ouin = trim(gcookie('o_cookie')||'');
		Bos.pic.src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=18&iFlow=0' + (value ? '&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=' + value : '');
	}catch(e){}
}
Bos.pic = new Image();
UI.ready(function(){
	new MI.TalkListUpdate({
		id : 'wording',
		hoverStop : 1,
		url : '/login/loginNews.php',
		tmpl : '<li class="clear">\
		<div class="pic"><a><img src="<%=pic%>"></a></div>\
		<div class="msgBox"><p><strong><a><%=nick%></a><%=icon%>：</strong><%=content%></p><p class="pubInfo"><%=from%></p></div>\
		</li>'
	});
	function show(){
	}
	function load(firstLoad){

	}
	var story = $('story').firstChild,
		topic = $$(story,'a'),
		length = topic.length;
	UI.C(topic[length - 1],'marginRight','100px');
	/*UI.C(topic[0],'border',0);
	new MI.Scroll({
		id : 'story',
		width : 475
	});*/
	UI.each($$('.story a'),function(o){
		o.onclick = function(){
			Bos('btnLoginTopic');
		}
	});
	UI.each($$('.people a'),function(o){
		o.onclick = function(){
			Bos('btnLoginUser');
		}
	});
	UI.each($$('.rank a'),function(o){
		o.onclick = function(){
			Bos('btnLoginHotUser');
		}
	});

	setTimeout(function(){
			MI.Card.build(document.body,'.people a img',5);
			MI.Card.build(document.body,'.rank a',6);
	},100);
	
	//微博素材预加载
	var mat1 = 'http://mat1.gtimg.com/www/mb/',
		url = mat1 + 'images/',
		html = [],
		loader = UI.html('<div style="display:none"></div>')[0];
	if (window.vJS){
		html.push('<img src="' + mat1 + 'js/mi_' + vJS + '.js">');
	}
	if (window.vCSS){
		html.push('<img src="' + mat1 + 'css/style_' + vCSS + '.css">');
	}
	UI.each(vImg,function(o){
		html.push('<img src="' + url + o + '">');
	});
	setTimeout(function(){
		loader.innerHTML = html.join('');
		UI.append(loader,document.body);
	},100);
});



//登录浮层
function mb_quick_reg(el,from){
	MI.dialog.show({title:'微博登录',end:function(){
          },html:'<iframe src="http://mini.t.qq.com/mblogin_quick.htm" frameborder="0" scrolling="no" width="571" height="187" id="QuickLoginFrame"></iframe>',width:620});
	Bos('btnPortalQuickLogin',from);
}
function mb_quick_reg_call(){
	MI.dialog.hide();
	if(MI.card && MI.card.account) {
		location.href = 'http://t.qq.com/' + MI.card.account;
	} else {
		location.reload();
	}	
}


if (!window._){
	window._ = function(str){
		if (arguments.length == 1) return str;
		var args = Array.prototype.slice.call(arguments, 1);
		return str.replace(/\{(\d+)\}/g, function(m, i) {
					return args[i];
				});
	}
}


Speed = function(name,random,n1,n2,n3){
	if (name && Math.random() < random){
		n1 = n1 || 0;
		n2 = n2 || 0;
		n3 = n3 || 0;
		Speed.pic.src = 'http://qos.report.qq.com/collect?type=1&name=' + name + '&1=' + n1 + '&2=' + n2 + '&3=' + n3 + '&4=0&5=0';
	}
}
Speed.pic = new Image();


MI.random = function(delay){ //delay = 1000 ---> 1s
		delay = delay || 1;
		return parseInt( new Date().getTime()/delay );
	};

MI.string = MI.string || {};


MI.string.id = function(str){
	var str = str.match(/[^\/]+$/g);
	return str && str[0] ? str[0].replace('#M','') : '';
};

MI.string.account = function(str){
	var account = str.match(/@[^@]+$/g);
	return account && account[0] ? account[0].slice(1,-1) : '';
};

MI.string.length =  function(str){
			var arr = str.match(/[^\x00-\x80]/g);
			return str.length + (arr ? arr.length : 0);
		};

MI.string.cut = function(str,num,replace){
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
		};

//名人资料卡
//
MI.tmpl = MI.tmpl || {};
MI.tmpl.card = '<div class="uCard"><div class="tip"></div><div class="userPic"><a></a><p class="btn"><input type="button" class="addAttention" value="" /></p></div><div class="uCardcnt"><p class="userName"></p><p class="nums"></p><div class="uInfobox"><div class="sepline"></div><p class="uIntro"></p></div></div><div class="uloadBox"><em class="loading"></em>' + _('资料卡加载中') + '</div><div class="SA"><em>◆</em><span>◆</span><b>◆</b></div></div>';;

MI.Card = function(){ //Info Card    资料卡
	var Self = this,
		_body = Self._body,  
		follow = 'addAttention';
		//unfollow = 'delAttention';

	Self._pic = $$(_body,'.userPic a')[0];  //a
	Self._name = $$(_body,'.userName')[0];  //用户名
	Self._num = $$(_body,'.nums')[0];       //广播和听众数
	Self._follow = $$(_body,'.' + follow)[0];      //收听
	//Self._unfollow = $$(_body,'.' + unfollow)[0];  //取消收听
	
	Self._sepline = $$(_body,'.sepline')[0]; //分隔符
	Self._uIntro = $$(_body,'.uIntro')[0]; //简介

	//Event
	Self._pic.onclick = function(){
		Bos('btnCardHead',Self.cType); 
	}
	Self._body.onclick = function(e){
		if (UI.hasClass(this,'small')) {  
			document.location.href = '/' + Self.account;
		}
		UI.E(e).stop();
	}
	Self._body.onmouseout = function(){
		Self.hide();   
	}
	Self._body.onmouseover = function(){
		clearTimeout(MI.Card.hideCard);	
		UI.show(Self._body);   
	}
	Self._follow.onclick = function(){
		mb_quick_reg(document.body,'') //登录卡片
		return false;
	}
}


MI.Card.prototype = {
	_body : UI.html(MI.tmpl.card)[0],
	_target : null, // 目标Dom
	title : '', // 用户链接的标题
	account : '', // 帐号
	chName : '', // 中文账号
	name : '', // 昵称
	bkname : '', // 备注
	target : null, // 目标Dom
	avatar : '',
	getPos : function(el){
		var x = UI.getX(el);
		var y = UI.getY(el);
		if(this.cType=='5') {
			y = y - (UI.height(this._body) || 94);
		}
		if(this.cType=='6') {
			x = x + 60;
			y = y - 10;
		}

		return{
			x : x,
			y : y
		}
	},
	setPos : function(el){
		var _pos = this.getPos(el);
		this._body.style.left = _pos.x + "px";
		this._body.style.top = _pos.y + "px";
	},
	show : function(el){
		var Self = this;
		if (Self.target == el) {
			UI.show(Self._body);
			return;
		}
		var cType = UI.A(el,'ctype');
		
		if(cType=='6') {   //热门用户中的账户链接
			var P = el;
			var pic = '';
		}
		else {
			var P = el.parentNode;
			var pic = el.src;
			if (pic){
				Self._pic.innerHTML = '<img src="' + pic  + '">'; 
			}
			
		};
		
		var reg = /@[^@]+$/g,
			//title = UI.text(P),//UI.A(P,'rel') || '@..',	
			account = MI.string.id(P.href.split('?')[0]),
			//chName = title,//title.match(reg)[0].slice(1,-1), //含中文ID
			//name = title.replace(reg,'').slice(0,-1),
			url = '/' + account,
			Time,Time_1,Time_2,Time_3;
		
		Self._body.className = 'uCard' + ' cType' + cType + ' card' + [0,1,'T','R','R','B','L'][cType*1];
		Self.cType = cType;
		Self.account = account;
		Self.name = name;
		//Self.chName = chName;
		Self._pic.href = url;
		UI.hide(Self._follow);
		UI.hide(Self._unfollow);
		
			Self.setPos(el);   //loading时候重新确定一下loading的位置
			UI.addClass(Self._body,'loading');
			
		//}
		UI.append(Self._body,document.body);  //追加到body最后
		UI.removeClass(Self._body,'isMe');
		UI.show(Self._body);
		Self._target = Self.target = el;
		if (MI.Card.users[account]) {
			show(MI.Card.users[account]);  //从缓存中读取
		}
		else {
			Time = + new Date();
			UI.get('/asyn/userCard.php','u=' + account + '&t=' + Self.cType +'&r='+MI.random(),function(data){
				//data = '{result:0,msg:"",info:{nick:"贾葭",follow:0,bkname:"",followed:0,block:0,gender:1,flag:{auth:1},num:[1466,46402],avatar:"http://t3.qlogo.cn/mbloghead/eb8ee860f1f590599560",uIntro:"毕业于南京大学，资深杂志编辑。南方都市报、台湾旺报等多家媒体专栏作家。&gt;&gt;【贾葭腾讯博客】",group:{im:0}}}';
				Time_1 = + new Date() - Time;
				data = MI.json(data);
				if (data.result == 0) {
					show(data.info);
					MI.Card.users[account] = data.info;  //缓存
				}
				else {
					Self.hide();
				}
				
				//Speed
				Time_2 = + new Date() - Time;
				setTimeout(function(){
					Time_3 = + new Date() - Time;
					Speed('t_asyn_card',0.1,Time_1,Time_2,Time_3);
				},0);
			});
		}
		function show(o){
			var btn = o.follow ? Self._unfollow : Self._follow,
				gender = o.gender ? _('他') : _('她'),
				rel;

			Self.bkname = o.bkname;
			Self.name = o.nick;
			Self.avatar = o.avatar;
			//Self.title = (Self.bkname || Self.name) + '(@' + (Self.chName || Self.account) + ')';
			
			if(Self.cType != '5'){
				var _picLink = o.avatar;
				_picLink = _picLink ? _picLink + '/50' : 'http://mat1.gtimg.com/www/mb/images/head_50.jpg';
				Self._pic.innerHTML = '<img src="' +  _picLink + '" />';   //构建头像html
			}
			if (o.gender == 2) {
				gender = _('它');
			}
			Self.gender = gender;
			//rel = "{u:'" + Self.account + "',name:'" + (Self.bkname || Self.name) + "',sex:'" + Self.gender + "'}";
			

			Self.num(o);
			Self.setName(o);
			btn.style.display = 'block';
		
			//简介
			if (o.uIntro) {
				Self._uIntro.innerHTML = o.uIntro;
				var _uTitle = UI.text(Self._uIntro);
				if(MI.string.length(_uTitle) > 72) {
					Self._uIntro.title = _uTitle;
				    Self._uIntro.innerHTML = MI.string.cut(_uTitle,72,'...');
				}
				else {
					Self._uIntro.removeAttribute('title');
				}
				//Self._uIntro.innerHTML = _(_uTitle);
				
				UI.show(Self._uIntro);
				UI.show(Self._sepline);
			}
			else {
				UI.hide(Self._sepline);
				UI.hide(Self._uIntro);
			}
	
			//clearTimeout(Self.deelay);
			UI.removeClass(Self._body,'loading');
			//UI.removeClass(Self._body,'small');
			Self.setPos(el);    //所有内容完全显示后再次设置定位
			Bos('btnCardOpen',Self.cType);
		}
	},
	setName : function(o){
		var Self = this,
			icon = '';
		if (o.icon){
			icon = o.icon;
		}
		Self._name.innerHTML = '<a href="/' + Self.account + '">' + (o.bkname || o.nick) + '</a>' + icon + '<br />' + '<span></span>';
	},
	updateName : function(){
	},
	num : function(o){
		var num = o.num;
		this._num.innerHTML = _('广播{0}条',num[0]) + '<span>' + (o.flag.vivi ? '' : '|</span>' + _('听众{0}人',num[1]) + '');//|</span>收听了' + num[2] + '人
	},
	//hide : function(){
	hide : function(){
		var Self = this;
		if (UI.hasClass(Self._body,'loading')) {
			//return;
		}
		UI.hide(Self._body);
		Self.target = null;
	}
}
MI.Card.show = function(e){
	var el = UI.E(e).target;
	clearTimeout(MI.Card.delay);
	clearTimeout(MI.Card.hideCard);
	MI.Card.delay = setTimeout(function(){
		MI.card.show(el.nodeName == 'SPAN' ? el.parentNode : el); //识别span，兼容搜索结果页的标红问题，暂时先这样处理 by xhlv
	},400);
}

MI.Card.users = {};
MI.Card.hide = function(){
	clearTimeout(MI.Card.delay);
	clearTimeout(MI.Card.hideCard);
	MI.Card.hideCard = setTimeout(function(){    //鼠标离开头像，滑向选项卡过程中会触发mouseout事件，所以做延迟处理
		MI.card.hide();
	},500);
}
MI.Card.build = function(el,className,cType){
	cType = cType || 5;
	UI.each($$(el,className),function(o){
		if (!UI.A(o,'card')) {
			UI.A(o,'card','1');
			UI.A(o,'ctype',cType);

			//var P = cType === 6 ? o : o.parentNode;   //6是文字连接，无图片
			//UI.A(P,'rel',P.title);
			//o.title = P.title;
			//if (o.title && MI.string.account(o.title)){
				UI.EA(o,'mouseover',MI.Card.show);
				UI.EA(o,'mouseover',function(){
					//P.title = o.title = '';
				});
				UI.EA(o,'touchstart',MI.Card.show);
				UI.EA(o,'mouseout',MI.Card.hide);
				UI.EA(o,'touchend',MI.Card.hide);
				UI.EA(o,'click',function(){
					Bos('btnHead');
				});
			//}
		}
	});
}

MI.card = new MI.Card();



//Dialog层
MI.Dialog = MI.Dialog || {};
MI.Dialog = function(o){ //Dialog
	o = o || {};
	var Self = this;

	//Dom
	//Self._body.innerHTML = o.tmpl || '<div class="bg"></div><div class="CR"><div class="top"><span class="left"><em></em></span><span class="right"><em></em></span></div><div class="DTitle"></div><a' + V5 + ' class="DClose" title="关闭">关闭</a><div class="DLoad"></div><div class="DCont"></div><div class="bot"><span class="left"><em></em></span><span class="right"><em></em></span></div></div>';
	var html = o.tmpl || '<div class="D">' + (UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"></div><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><a title="' + _('关闭') + '" class="DClose close" href="#">' + _('关闭') + '</a><div class="DLoad"></div><div class="DCont"></div></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
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
		var _x = E.x - parseInt(wrap.style.left);
		var _y = E.y - parseInt(wrap.style.top);
		var w = UI.windowWidth(),h = UI.windowHeight(); //Kill Bug
		E.prevent();
		//UI.addClass(wrap,'move');
		document.onmousemove = document.ontouchmove = function(e) {
			var E = UI.E(e);
			if (!UI.B.ie && (E.x < 0 || E.y < 0 || E.x > w || E.y > h)) return false;
			wrap.style.top = E.y - _y + 'px';
			wrap.style.left = E.x - _x + 'px';
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
		if (Self.closeEnd){
			Self.closeEnd();
		}
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
			for (var i = Self._cont.childNodes.length;i > 0;i--) {
				var contChild = Self._cont.childNodes[i - 1];
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

		css = 'width:' + Self.width + 'px;top:' + ( UI.scrollY() + UI.windowHeight() / 2 - UI.height(Self._wrap) / 2 ) + 'px;left:' + (UI.windowWidth() / 2 - Self.width / 2) + 'px;';
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
			if (o.closeEnd) { //Run When Close Dialog On Button
				Self.closeEnd = o.closeEnd;
			}
			else Self.closeEnd = null;
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
		var Self = this;
		setTimeout(function(){
			UI.hide(Self._load);
		},0);
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
		Self.show({html:'<div class="popBox"><span class="ico_tsW"><span class="ico_te"></span></span><h3>' + str + '</h3><p><input type="button" value="' + _('知道了') + '" onclick="MI.dialog.hide()"></p></div>',end:call});
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
MI.dialog = new MI.Dialog();
