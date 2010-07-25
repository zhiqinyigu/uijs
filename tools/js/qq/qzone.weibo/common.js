var photoDoctorOk = false;/**
 * 模版替换引擎
 */

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
  
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
      
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})(); 
/**
 * 微博 app 前台通用库
 * @author camdyzeng [Qzone Frontend]
 */
var TWT = TWT || {};
(function(){
	var _um = {
		'index' : 'get_index_page.cgi',
		'update' : 'get_update_count.cgi',
		'user' : 'get_related_user.cgi',
		'addTweet' : 'add_tweet.cgi',
		'profile' : 'get_profile_page.cgi',
		'card' : 'get_user_info.cgi',
		'topic' : 'modify_favi_topic.cgi',
		'follow' : 'modify_friend_status.cgi',
		'delmsg' : 'del_tweet.cgi',
		'modifyFollow' : 'modify_friend_status.cgi',
		'search' : 'search_all_info.cgi',
		'modifyTopic' : 'modify_favi_topic.cgi',
		'upload' : 'upload_img.cgi',
		'searchTopic' : 'get_topic_page.cgi',
		'searchPage' : 'get_search_page.cgi',
		'mymsg' : 'get_private_page.cgi'
	};
	TWT.util = QZFL.object.extend(TWT.util,{
		getHttpParams : function(key){
			return ENV.get('queryString')[key] || ENV.get('queryHash')[key];
		},
		getUrl : function(key){
			return "http://wb.qzone.qq.com/cgi-bin/" + _um[key];
		},
		go : function(link,hash){
			var url = "";
			if(!link.match(/^http/)){
				url = "http://"+ parent.imgcacheDomain;
				if(!link.match(/^\//)){
					url += "/qzone/app/weibo/";
				}
			}
			url += link + (hash ? ("#" + hash) : "");
			try{
				window.location.href = url;
			}catch(e){
				frameElement.src = url;
			}
		},
		show : function(id){
			try{
				$(id).style.display = "block";
			}catch(e){}
		},
		showi : function(id){
			try{
				$(id).style.display = "inline";
			}catch(e){}
		},
		hide : function(id){
			try{
				$(id).style.display = "none";
			}catch(e){}
		},
		showHotTopic : function(id,titleId){
			var list = TWT.data.get('weiboHotTegic') || [];
			var html = [];
			for(var i = 0; i<list.length; ++i){
				var d = list[i];
				html.push([
					'<p><a href="search.html#type=topic&keyword=',encodeURI(d.name),'" class="c_tx" title="',d.name,'">',QZFL.string.cut(d.name,20,"..."),'(',d.twnum,')</a></p>'
				].join(""));
			}
			if(html.length){
				$(id).innerHTML = html.join("");
				TWT.util.show(id);
				TWT.util.show(titleId);
			}else{
				TWT.util.hide(id);
				TWT.util.hide(titleId);
			}
		},
		setScroll : function(){
			if(QZONE.FP.getScrollTop() > 200){
				QZONE.FP.setScrollTop(100);
			}
		},
		wording : function(){
			QZONE.FP.showMsgbox("功能正在建设中，稍后为您呈现",3,2000);
			return false;
		},
		feedback : function(){
			var dialog = new TWT.widget.DialogEditor({"type":2});
			dialog.setContent("#微博应用意见反馈#",true);
		}
	});

	var _d = (parent.QZFL || QZFL).dataCenter;
	var _dm = _d.get("TWTDATA") || (_d.save("TWTDATA",{}) && _d.get("TWTDATA"));
	TWT.data = {
		get : function(key){
			return _dm[key];
		},
		save : function(key,value){
			return _dm[key] = value;
		},
		del : function(key){
			return delete _dm[key];
		}
	};
	
	TWT.card = {
		uin : 0,
		name : '',
		obj : {},
		timer : 0,
		show : function(name,uin,o,nick,url){
			TWT.card.uin = uin;
			TWT.card.name = name;
			TWT.card.nick = nick;
			TWT.card.url = url;
			TWT.card.obj = o;
			window.clearTimeout(TWT.card.timer);
			if($('card'+name) && QZFL.css.hasClassName(TWT.card._Tep,"success") && TWT.card._Tep.rel == name )
			{
				var pos = QZFL.dom.getXY(o);
				if(ua.ie)
				{
					QZFL.dom.setStyle($('card'+name),'top',(pos[1]-7)+'px');
					QZFL.dom.setStyle($('card'+name),'left',(pos[0]-7)+'px');
				}
				else
				{
					QZFL.dom.setStyle($('card'+name),'top',(pos[1]-9)+'px');
					QZFL.dom.setStyle($('card'+name),'left',(pos[0]-9)+'px');
				}
				try{
					window.clearTimeout(TWT.card.timer);	
				}catch(e){
				}
				TWT.card.timer = window.setTimeout(function(){
					$e('div.cardbox').setStyle('display','none');
					TWT.util.show('card'+name);			
				},400);				
				return false;
			}
			else
			{
				var url = TWT.util.getUrl("card");
				var data = {
					uin : TWT.status.getLoginUin(),
					ouin : uin
				};
				var pos = QZFL.dom.getXY(TWT.card.obj);
				var slist = [3,12,15,17,30,31,28,81,83];
				var skinid = parent.g_StyleID;
				var _css = 'cardbox light';
				for(i in slist)
				{
					if(slist[i] == skinid)
					{
						_css = 'cardbox deep';	
					}
				}
				if(ua.ie)
				{
					TWT.card._Tep = $('card'+TWT.card.name) || QZFL.dom.createElementIn("div",document.body,false,{
						id : 'card'+TWT.card.name,
						className : _css,
						rel : TWT.card.name,
						style : 'display:none;top:'+(pos[1]-7)+'px; left:'+(pos[0]-7)+'px;'
					});
				}
				else{
					TWT.card._Tep = $('card'+TWT.card.name) || QZFL.dom.createElementIn("div",document.body,false,{
						id : 'card'+TWT.card.name,
						className : _css,
						rel : TWT.card.name,
						style : 'display:none;top:'+(pos[1]-9)+'px; left:'+(pos[0]-9)+'px;'
					});
				}
				TWT.card.timer = window.setTimeout(function(){TWT.net.dataLoader(url,data,TWT.card.getMainSuc,TWT.card.getMainErr);},400);
				
			}
		},
		getMainSuc : function(d){
			d.uin = d.uin || TWT.card.uin;
			TWT.card._d = d || TWT.card._d;
			var _tmpl = tmpl([
					'<div class="inr">',
						'<div class="info_pic">',
							'<a href="profile.html#uin=<%=uin%>" class="user_head_50" ><span class="skin_portrait_round"></span><img src="<%=portrait%>/50"  style="width:50px; height:50px;" /></a>',
							'<%if(!self){%>',
							'<span id="listen<%=TWT.card.uin%>">',
								'<%if(idol!=1){%>',
									'<p><a href="profile.html#uin=<%=uin%>#" class="buttons bt_hear_pop" onclick="TWT.card.listenUser(&quot;<%=TWT.card.uin%>&quot;,1,0);return false;">收听</a></p>',
								'<%}else{%>',
									'<p><img src="/ac/b.gif" alt="取消收听"  class="icons icon_tack" /><a href="javascript:void(0);" onclick="TWT.card.listenUser(&quot;<%=TWT.card.uin%>&quot;,0,0)" class="cancle" title="取消收听">取消收听</a></p>',
								'<%}%>',
							'</span>',
							'<%}else{%>',
								'<p>这是你自己</p>',
							'<%}%>',
						'</div>',
						'<div class="info_tx">',
							'<p class="p1"><a href="profile.html#uin=<%=uin%>" class="c_tx"><%=nick%></a><%if(flag1 & 0x01){%><img src="/ac/b.gif" alt="腾讯认证" title="腾讯认证" class="icons icon_verify"><%}%></p>',
							'<p>@<%=account%></p>',
							'<p class="p3"><span class="data">广播 <%=sendnum%> 条</span> <span>听众 <%=follower%> 人</span></p>',
						'</div>',
						'<%if(!self){%>',
						'<div class="op"><a href="javascript:void(0);" onclick="TWT.card.showDialog();return false;" class="buttons bt_pop">对话</a></div>',
						'<%}%>',
					'</div>'
			].join(''));
			TWT.card._Tep.innerHTML = _tmpl(d);
			TWT.util.show('card'+TWT.card.name);
			QZFL.css.addClassName(TWT.card._Tep,"success"); 
			//QZFL.css.removeClassName($('card'+TWT.card.name),'none');
			QZFL.event.addEvent(TWT.card._Tep,'mouseover',function(e){
				//try{
				//	window.clearTimeout(TWT.card.timer);	
				//}catch(e){
				//}
				//window.setTimeout(function(){
					$e('div.cardbox').setStyle('display','none');
					TWT.util.show('card'+TWT.card.name);			
				//},400);
			});
			QZFL.event.addEvent(TWT.card._Tep,'mouseout',function(e){
				//try{
				//	window.clearTimeout(TWT.card.timer);	
				//}catch(e){
				//}
				//TWT.card.timer = window.setTimeout(function(){TWT.util.hide('card'+TWT.card.name);},400);
				TWT.util.hide('card'+TWT.card.name);
			});
		},
		getMainErr : function(d){
			QZFL.css.addClassName(TWT.card._Tep,"faile"); 
			QZFL.css.removeClassName(TWT.card._Tep,"none"); 
			TWT.card._Tep.innerHTML = [
				'<div class="inr">',
					'<div class="info_pic">',
						'<a href="profile.html#uin='+TWT.card.uin+'" class="user_head_50"><span class="skin_portrait_round"></span><img src="'+TWT.card.url+'/50" style="width:50px; height:50px;" /></a>',
					'</div>',
					'<div class="info_tx">',
						'<p><a href="profile.html#uin='+TWT.card.uin+'">'+TWT.card.nick+'</a></p>',
						'<p><em>抱歉，信息无法显示</em></p>',
					'</div>',
				'</div>'
				].join('');					 
		},
		listenUser : function(u,type,a){
			var url = TWT.util.getUrl("follow");
			var data = {
				uin : TWT.status.getLoginUin(),
				ouin : u,
				type: type 
			};
			if(a){
				if(type){
					_success = function(){
						$('listen'+u).innerHTML = '<p class="hadall"><span><img class="icons icon_tack" alt="取消收听" src="/ac/b.gif"> 已收听</span><a href="javascript:void(0)" class="c_tx" onclick="TWT.card.listenUser(&quot;'+u+'&quot;,1,0)" title="取消收听">取消收听</a></p>';
					}
				}else{
					_success = function(){
						$('listen'+u).innerHTML = '<button class="buttons bt_hear" onclick="TWT.card.listenUser(&quot;'+u+'&quot;,1,1)">+收听</button>';
					}
				}
			}else{
				if(type){
					_success = function(){
						$('listen'+u).innerHTML = '<p><img src="/ac/b.gif" alt="取消收听"  class="icons icon_tack" /><a href="javascript:void(0);" onclick="TWT.card.listenUser(&quot;'+u+'&quot;,0,0)" class="cancle" title="取消收听">取消收听</a></p>';
					}			
				}else{
					_success = function(){
						$('listen'+u).innerHTML = '<p><a href="收听" class="buttons bt_hear_pop" onclick="TWT.card.listenUser(&quot;'+u+'&quot;,1,0);return false;">收听</a></p>';
					}			
				}
			}
			TWT.net.dataSender(url,data,function(d){
				QZONE.FP.showMsgbox('操作成功',4,2000);
				try{
				var _num = parseInt($('myFollowingNum').innerHTML);
					if(type){
						$('myFollowingNum').innerHTML = _num + 1;
						$('myListen').innerHTML = _num + 1;
					}else{
						$('myFollowingNum').innerHTML = _num - 1;	
						$('myListen').innerHTML = _num - 1;
					}
				}catch(e){
				}
				(_success || QZFL.emptyFn)(d.data);
			});						 
		},
		hide : function(name,u,o){
			try{
				window.clearTimeout(TWT.card.timer);	
			}catch(e){
			}
			TWT.util.hide('card'+name);			
		},
		showDialog : function(){
			try{
				$e('div.cardbox').setStyle('display','none');
			}catch(e){}
			var d = TWT.card._d;
			var dialog = new TWT.widget.DialogEditor({"account":d.account,"nick":d.nick,"uin":d.uin});
			dialog.onSuccess = function(d){
				if(controller.perpend){
					d.account = TWT.data.get('weiboMyname');
					d.nick = TWT.data.get('weiboMynick');
					d.portrait = TWT.data.get('weiboMyportrait');
					d.flag1 = TWT.data.get('weiboMyflag1')				
					controller.tweet.prepend([d],1);
				}
				$('myTweetNum').innerHTML = parseInt($('myTweetNum').innerHTML) + 1;
			}			
		}
	};
	
	function showLoginBox(sucCb,errCb){
		sucCb = sucCb || QZFL.emptyFn;
		var self = showLoginBox;
		self.suc = self.suc || [];
		self.err = self.err || [];
		self.suc.push(sucCb);
		self.err.push(errCb);
		if(!self.isloginging){
			self.isloginging = 1;
			QZONE.FP.showLoginBox("app",function(){
				self.isloginging = 0;
				var list = self.err;
				if(TWT.status.isOwner()){
					list = self.suc;
				}
				for(var i=0; i<list.length; ++i){
					(list[i] || QZFL.emptyFn)();
				}
				self.suc = [];
				self.err = [];
			});
		}
	}

	TWT.net = {
		dataLoader : function(url,data,sucCb,errCb,options){
			options = options || {};
			sucCb = sucCb || QZFL.emptyFn;
			errCb = errCb || QZFL.emptyFn;
			data = data || {};
			data.s = TWT.data.get("seed");
			data.json = 1;
			var arg = arguments;
			var snd = new QZFL.JSONGetter(url, void(0), data, options.charset || "utf-8");
			snd.onSuccess = function(o){
				o.result = o.result || {"code" : "-1","msg" : "对不起，网络繁忙，请稍后再试！"};
				if(o.result.code == 0){
					sucCb(o);
				}else if(o.result.code == -10000){
					showLoginBox(function(){
						arg.callee.apply(null,arg);
					},function(){
						errCb(o);
					});
				}else{
					errCb(o);
				}
			};
			snd.onError = function(){
				errCb({result:{
					"code" : "-1",
					"msg" : "对不起，网络繁忙，请稍后再试！"
				}});
			};
			snd.send("_Callback");
		},
		dataSender : function(url,data,sucCb,errCb,options){
			options = options || {showTips:true};
			sucCb = sucCb || QZFL.emptyFn;
			errCb = errCb || QZFL.emptyFn;
			data = data || {};
			data.json = 1;
			var arg = arguments;
			var post = new QZFL.FormSender(url,"post",data,options.charset || "utf-8");
			post.onSuccess = function(d){
				d.result = d.result || {"code" : "-1","msg" : "对不起，网络繁忙，请稍后再试！"};
				if( d.result.code == 0 ) {
					TWT.data.save("seed",Math.random());
					sucCb(d);
				}else if(d.result.code == -10000){
					showLoginBox(function(){
						arg.callee.apply(null,arg);
					},function(){
						if(options.showTips){
							QZONE.FP.showMsgbox(d.result.msg,5,2000);
						}
						errCb(d);
					});
				}else{
					if(options.showTips){
						QZONE.FP.showMsgbox(d.result.msg,5,2000);
					}
					errCb(d);
				}
			}
			post.onError = function(d){
				if(options.showTips){
					QZONE.FP.showMsgbox("对不起，网络繁忙，请稍后再试！",5,2000);
				}
				errCb({result:{
					"code" : "-1",
					"msg" : "对不起，网络繁忙，请稍后再试！"
				}});
			}
			post.send();
		}
	};
})()

TWT.status = {
	//主人uin
	getLoginUin : function(){
		return  QZONE.FP.getQzoneConfig().loginUin;
	},
	//客人态tuin
	getOwnerUin : function(){
		return QZONE.FP.getQzoneConfig().ownerUin;
	},
	getSessionUin : function(){
		var uin = parseInt(QZONE.cookie.get("zzpaneluin"),10);	
		if(isNaN(uin) || uin < 1000){
			uin = parseInt(QZONE.cookie.get("uin").replace(/[^\d]/g,""),10);
			if(isNaN(uin) || uin < 1000){
				uin = 0;
			}
		}
		return uin;
	},
	isOwner : function(){
		var uin = TWT.status.getOwnerUin();
		if(uin == TWT.status.getLoginUin() && uin == TWT.status.getSessionUin()){
			return true;
		}
		return false;
	},
	//显示来源
	getType : function(t){
		 //1-qq、2、手机短信 3-网站部 4、手机wap 5、手机彩信 6、iphone手机客户端 7、android手机客户端
		 t = parseInt(t);
		 var _from;
		 switch(t){
			case 1:
				_from = 'QQ';
				break;
			case 2:
				_from = '短信';
				break;
			case 4:
				_from = '手机腾讯网';
				break;
			case 5:
				_from = '手机';
				break;
			case 3:
				_from = '网页';
				break;
			case 6:
				_from = 'iPhone';
				break;
			case 7:
				_from = 'android';
				break;
			case 8:
			case 9:
			case 10:
				_from = '手机客户端';
				break;
			case 11:
				_from = 'QQ空间说说';
				break;
			case 12:
				_from = 'QQ拼音';
				break;
			default:
				_from = '腾讯微博';
				break;
		 }
		 return _from;
	},
	getArea : function(c,p,ci){
		var _pl = Area.List;
		var _tmp = [];
		for(var _i = 0;_i<_pl.length;_i++)
		{
			if(_pl[_i].code == c)
			{
				//_tmp.push('【<a href="broadpage.htm?co='+_pl[_i].code+'">'+_pl[_i].name+'</a>】');
				if(typeof p != 'undefined')
				{
					for(var _m = 0;_m<_pl[_i].p.length;_m++)
					{
						if(typeof _pl[_i].p[_m].code != 'undefined' && p == _pl[_i].p[_m].code)
						{
							//_tmp.push('【<a href="broad.php?co='+_pl[_i].code+'&pr='+_pl[_i].p[_m].code+'">'+_pl[_i].p[_m].name+'</a>】');		
							_tmp.push(_pl[_i].p[_m].name);
							var _tpl = _pl[_i].p[_m].list;
							if(typeof ct != 'undefined' && typeof _tpl != 'undefined')
							{
								for(var _n = 0;_n<_tpl.length;_n++)
								{
									if(_tpl[_n].code == ct)
									{
										//_tmp.push('【<a href="broad.php?co='+_pl[_i].code+'&pr='+_pl[_i].p[_m].code+'&ci='+_tpl[_n].code+'">'+_tpl[_n].name+'</a>】');		
										_tmp.push(' '+_tpl[_n].name);
										break;
									}
								}
							}
							break;	
						}
					}
				}
				break;
			}
		}
		return _tmp.join('');
	},
	getTime : function(t){
		var nowDate = new Date();
		var diff = parseInt(nowDate.getTime()/1000) - parseInt(t);
		if(diff<5) return '刚刚';	
		diff = parseInt(diff / 60);
		if(diff < 1) diff = 1;
		if(diff < 60) return  diff + "分钟前";

		diff = parseInt(diff/60);
		if(diff < 24) return diff + "小时前";

		diff = parseInt(diff/24);
		if(diff < 30) return diff + "天前";

		diff = parseInt(diff/30);
		if(diff < 12) return diff + "月前";

		diff = parseInt(diff/12);

		return diff + "年前";		 
	},
	getSex : function(t){
		var _tmp;
		switch(parseInt(t))
		{
			case 1:
				_tmp = '男';
				break;
			case 2:
				_tmp = '女';
				break;
			case 3:
				_tmp = '未知';
				break;
		}
		return _tmp;
	},
	getMyName : function(name){
		return TWT.data.get('weiboMyname');			
	},
	setViewMode : function(bit,value){
		var mode = TWT.status.getViewMode();//位标志，1：只原创，2：展示图片 3: 客人页原创 4: 客人页图片
		if(value){
			mode |= parseInt(1<<bit,'0x');
		}else{
			mode &=  ~parseInt(1<<bit,'0x');
		}
		TWT.status.getViewMode.mode = mode;
		var so = QZONE.FP._t.QZFL.shareObject.getValidSO();
		if(so){
			so.set("weiboViewMode",mode);
		}
		else{
			TWT.data.save('weiboViewMode',mode);
		}
	},
	getViewMode : function(){
		var t = TWT.status.getViewMode;
		if(typeof t.mode == "undefined"){
			var so = QZONE.FP._t.QZFL.shareObject.getValidSO();
			if(so){
				t.mode = so.get("weiboViewMode");
			}else{
				t.mode = TWT.data.get('weiboViewMode');
			}
		}
		if(typeof t.mode == "undefined"){
			t.mode = 0;
		}
		return parseInt(t.mode);
	},
	getStr : function(n){
		return n+'';		 
	}
};

/**
 * 微博通用页面初始化
 * @param {Function} func 初始化入口函数
 */
TWT.pageStart = function(sucCb,errCb,isScroll){
	//初始化参数
	QZFL.pageEvents.initHttpParams(); //初始化http参数
	try{
		document.execCommand("BackgroundImageCache", false, true);
	}catch(ex){}

	if(!TWT.data.get("seed")){
		TWT.data.save("seed",Math.random());
	}
	var hash = location.hash;
	QZFL.event.addEvent(document.body,'click',function(){
		setTimeout(function(){
			if(location.hash != hash){
				hash = location.hash;
				QZFL.pageEvents.initHttpParams();
				(sucCb || QZFL.emptyFn)();
				if(isScroll != false){
					TWT.util.setScroll();
				}
			}
		},0);
	}); 
	(sucCb || QZFL.emptyFn)();
	if(isScroll != false){
		TWT.util.setScroll();
	}
};
/**
 * 微博 编辑器
 * @author camdyzeng
 */

//主逻辑
(function(){
	//{placeHolder:}
	var Editor = function(cfg){
		var t = this;
		t.id = ++Editor.count;
		Editor.instance[t.id] = t;
		t.onWordChange = QZFL.emptyFn;//字数变化事件
		QZFL.object.extend(t,cfg);
		t.maxLen = t.maxLen || 140;
		t.init();
	};
	Editor.count = 0;
	Editor.instance = {};
	
	var range = {
		init : function(source){
			this._source = source || (document.defaultView?window.getSelection():document.selection);

			/**
			 * 范围对象
			 * @type element
			 * @private
			 */
			this.range =  null;

			this._controlList = new RegExp("(img|object|embed|iframe|table|td|tr|input|textarea)","ig")

			if (this._source.createRange) {
				this.range = this._source.createRange();
			}else{
				this.range = this._source.rangeCount?this._source.getRangeAt(0):null;
			};
		},
		getHtmlContents : function(){
			this.init();
			if (QZFL.userAgent.ie) {
				return (this._source.type == "Control"?this.range.item(0).outerHTML:this.range.htmlText);
			}else{
				var _df = document.createElement("div");
				_df.appendChild(this.range.cloneContents());
				return _df.innerHTML;
			}
		},
		insert : function(html,isReplace){
			try{
				var v = range.getHtmlContents();
				if(v.length && !isReplace){
					return;
				}
				if(ua.ie){
					var r = document.selection.createRange();
					r.pasteHTML(html);
				}else{
					var r = window.getSelection().getRangeAt(0);
					var div = document.createElement("div");
					div.innerHTML = html;
					r.deleteContents();
					r.insertNode(div.firstChild);
				}
			}catch(e){}
		},
		setCursor : function(el){
			if(ua.ie){
				var r = document.selection.createRange();
				r.moveToElementText(el);
				r.moveEnd('character', -1);
				r.select();
			}else{
				var s = window.getSelection();
				r = document.createRange();
				r.selectNode(el);
				r.collapse(true);
				s.removeAllRanges();
				s.addRange(r);
			}
		},
		select : function(el){
			if (document.selection) { //for ie
				var r = document.body.createTextRange();  //创建range
				r.moveToElementText(el);  //选择节点
				r.moveEnd('character', -1);  //调整range范围
				r.moveStart('character', 1);
				r.select();  //选中状态
			}else if (window.getSelection()) { //for firefox
				var s = window.getSelection();  //获取当前选择的对象
				s.removeAllRanges();
				var r = document.createRange(); //创建range
				el.innerHTML = '#<span>请在这里输入话题</span>#';
				r.selectNode(el.childNodes[1]);  //为range添加选中节点
				s.addRange(r);  //把range添加到当前选中的范围内
			}
		},
		getCommonAncestorContainer : function(){
			if (QZFL.userAgent.ie) {
				return this._source.type == "Control"?this.range.item(0).parentNode:this.range.parentElement();
			}else{
				return this.range.commonAncestorContainer;
			}
		}
	};

	QZFL.object.extend(Editor.prototype,{
		init : function(){
			var t = this;
			t.csName = "c_tx ";
			if(!(ua.ie || ua.firefox)){
				t.csName = '';
			}
			var id =  t.placeHolder.id || "editor_"+Editor.count;

			t.inpDiv = document.createElement("div");
			t.inpDiv.innerHTML = '<div class="textarea bor4 input_focus" contenteditable="true" id="'+id+'">'+(ua.firefox?'<br _moz_dirty="" />':'')+'</div>';
			t.inpDiv = t.inpDiv.firstChild;
			t.placeHolder.parentNode.replaceChild(t.inpDiv, t.placeHolder);
			t.inpDivN = $(id+"_inpPlace") || QZFL.dom.createElementIn("div",t.inpDiv.parentNode,false,{
				id :(id+"_inpPlace"),
				className : "textarea bor4 input_focus",
				//style : "top:-80px;left:0px;position:absolute;opacity:0;display:none;"
				style : "top:-80px;left:0px;position:absolute;opacity:1;display:none;"
			});
			t.tipsDiv = $("editorTipsPop") || QZFL.dom.createElementIn("div",document.body,false,{
				id : 'editorTipsPop',
				className : 'frm_pop bor2 bg',
				style : 'z-index:9001;top:110px; left:100px;display:none;'
			});
			t.hideOptions();
			setTimeout(t.onWordChange,0);
			t.bind();
			t.inpDiv.focus();
			if(ua.ie){
				t.setContent("");
			}
		},
		bind : function(){
			var t = this;
			QZFL.event.KEYS.ENTER = 13;
			t.inpDiv.onmouseup = t.inpDiv.onkeyup = QZFL.event.bind(t,t.onWrite);
			t.inpDiv.onkeydown = function(e){
				var e = QZFL.event.getEvent(e);
				var c = e.keyCode;
				t.inpContent = t.getContent();
				if(t.getContentLength() > 640){
					switch(true){
						case c == 8:
						case c == 46:
						case c>=37 && c<=40:break;
						default:return false;
					}
				}
				if(e.ctrlKey && c == QZFL.event.KEYS.ENTER){
					(t.onSubmit || QZFL.emptyFn)();
					return false;
				}

				if(t.tipsDiv.style.display != 'none'){
					switch (c) {
						case QZFL.event.KEYS.DOWN:t.changeOptions(1);return false;
						case QZFL.event.KEYS.UP:t.changeOptions(-1);return false;
						case QZFL.event.KEYS.ENTER:t.submitOptions();return false;
					}
				}
			};
			QZFL.event.addEvent(document.body,"click",QZFL.event.bind(t,t.hideOptions));
			/**/
			//t.inpDiv.onblur = QZFL.event.bind(t,t.hideOptions);
		},
		format : function(e){
			var t = this;
			e = e || {keyCode : 1};
			//标记光标
			var value = '';
			if(e.keyCode == 37 || e.keyCode == 39){//键盘的左右键
				$e(t.inpDivN).find(".mak_point").setHtml("!|");
				//var v = t.inpDivN.innerText || t.inpDivN.textContent || '';
				var v = t.getContent(t.inpDivN);
				if(e.keyCode == 37){
					value = v.replace(/(.)(\!\|)/,"$2$1");
				}else{
					value = v.replace(/(\!\|)(.)/,"$2$1");
				}
			}else{
				range.insert('<span class="mak_point">!|</span>');
				value = t.getContent();
				$e(t.inpDiv).find(".mak_point").remove();
			}
			t.inpDivN.innerHTML = value.replace("!|",'<span class="mak_point">&nbsp;</span>');//光标位置
			t.hideOptions();
			if(ua.firefox){
				if(t.getContent().length == 0){
					t.inpDiv.innerHTML = '<br _moz_dirty="" />';
					return;
				}
			}
			if(!t.inpDiv.innerHTML.match(/(<|@|#|news|telnet|nttp|file|http|ftp|https)/)){
				return;
			}
			value = escHTML(value);
			value = value.replace(/\r\n/g,"<br/>").replace(/\n/g,"<br/>").replace(/\s/g,"&nbsp;");//html
			value = value.replace(/(#(.|<br\/>){1,42}?#)/g,'<span class="'+t.csName+'mak_topic">$1</span>');//话题
			value = value.replace(/(@\w(\w|-)*)/g,'<span class="'+t.csName+'mak_name">$1</span>');//@人
			value = value.replace(/([^>])(@[\w\u4e00-\u9fa5]+)/g,'$1<span class="mak_name">$2</span>');//@中文提醒
			value = value.replace(/^(@[\w\u4e00-\u9fa5]+)/g,'<span class="mak_name">$1</span>');//@中文提醒
			/**/t.format.reg = t.format.reg || new RegExp("(((news|telnet|nttp|file|http|ftp|https)://)(([-A-Za-z0-9_]+(\\.[-A-Za-z0-9_]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!*(){},;:@&=?/~#%'`]*)*)","ig");
			value = value.replace(/<br\/>/,"\n");
			value = value.replace(t.format.reg,'<span class="'+t.csName+'mak_url">$1</span>');//url
			value = value.replace(/\n/,"<br/>");
			if(value.split("!|").length != 2){
				return;
			}
			t.inpDivN.innerHTML = value.replace("!|",'<span class="mak_point">&nbsp;</span>');//光标位置

			if(!e.keyCode){
				return;
			}
			var p = $e(t.inpDivN).find(".mak_point").elements[0];
			if(!p){
				return;
			}
			
			var el = p.previousSibling;
			if(el && el.tagName == 'SPAN' && QZFL.css.hasClassName(el,'mak_name')){
				var value = el.innerText || el.textContent;
				if(value.length < 3){
					t.inpDivN.style.display = "block";
					var p1 = QZFL.dom.getPosition(t.inpDiv);
					QZFL.dom.setSize(t.inpDivN,p1.width,p1.height);
					var p2 = QZFL.dom.getXY(t.inpDivN);
					var p3 = QZFL.dom.getXY(el);
					var x = p1.left + p3[0] - p2[0] + 5;
					var y = p1.top + p3[1] - p2[1] + 22 - t.inpDiv.scrollTop;
					QZFL.dom.setXY(t.tipsDiv,x,y);
					t.inpDivN.style.display = "none";
				}
				if(value.length > 1){
					var kw = value.slice(1);
					t.nameEl = el;
					TWT.status.loadFollow( QZFL.event.bind(t,t.showOptions,kw));
				}
			}else{
				t.hideOptions();
			}
			if(ua.ie || ua.firefox){
				t.replaceValue();
			}
			//QZFL.dom.removeElement(p);
		},
		onWrite : function(e){
			var t = this;
			var e = QZFL.event.getEvent(e);
			t.onWordChange();
			if(t.tipsDiv.style.display != 'none'){
				switch (e.keyCode) {
					case QZFL.event.KEYS.DOWN:
					case QZFL.event.KEYS.UP:
					case QZFL.event.KEYS.ENTER:return false;
				}
			}
			if(t.inpContent == t.getContent()){
				if(e.ctrlKey || e.shiftKey){
					return false;
				}
				if(!(e.keyCode >=37 && e.keyCode <= 40)){
					return false;
				}
			}
			t.format(e);
		},
		showOptions : function(kw,list){
			var t = this;
			var html = [];
			t.opt = [];
			kw = kw.toLowerCase();
			for(var i = 0; i<list.length; ++i){
				var d = list[i];
				var len = d.account.toLowerCase().indexOf(kw);
				if(len == 0){
					d.sortType = 1;
					t.opt.push(d);
				}else if(len > 0){
					d.sortType = 2;
					t.opt.push(d);
				}else if((len = d.nick.toLowerCase().indexOf(kw)) == 0){
					d.sortType = 3;
					t.opt.push(d);
				}else if(len > 0){
					d.sortType = 4;
					t.opt.push(d);
				}
			}
			t.opt = t.opt.sort(function(d1,d2){
				if(d1.sortType == d2.sortType){
					if(d1.account > d2.account){
						return 1;
					}else{
						return -1;
					}
				}else{
					return d1.sortType - d2.sortType
				}
			});
			
			var r = new RegExp("("+kw+")","ig");
			for(var i=0; i<t.opt.length; ++i){
				var d = t.opt[i];
				html.push(['<li idx="',i,'"><img src="/ac/b.gif" onload="QZFL.media.adjustImageSize(20,20,\'',d.portrait,'/20\');"  alt="" /><span>',d.account.replace(r,'<strong class="c_tx4">$1</strong>'),'(',d.nick,')</span></li>'].join(''));
			}
			if(html.length){
				t.tipsDiv.style.display = "none";
				t.tipsDiv.innerHTML = '<div class="listbox"><ul'+(html.length>10?' class="over_y"':'')+'>' + html.join("") + '</ul></div>';
				clearTimeout(t.hideOptions.timer);
				t.optIdx = 0;
				t.optLi = $e(t.tipsDiv).find("li").onMouseOver(function(e){
					t.optLi[t.optIdx].className = '';
					this.className = 'bg2';
					t.optIdx = parseInt(this.getAttribute("idx"));
				}).bind('click',function(e){
					t.submitOptions();
				}).elements;
				t.optLi[0].className = 'bg2';
				t.optUl = $e(t.tipsDiv).find("ul").elements[0];
				t.tipsDiv.onkeydown = function(e){
					var e = QZFL.event.getEvent(e);
					var c = e.keyCode;
					if(t.tipsDiv.style.display != 'none'){
						switch (c) {
							case QZFL.event.KEYS.DOWN:t.changeOptions(1);break;
							case QZFL.event.KEYS.UP:t.changeOptions(-1);break;
							case QZFL.event.KEYS.ENTER:t.submitOptions();break;
						}
					}
				};
				t.tipsDiv.style.display = "";
			}else{
				t.hideOptions();
			}
		},
		hideOptions : function(){
			var t = this;
			clearTimeout(t.hideOptions.timer);
			t.hideOptions.timer = setTimeout(function(){
				t.tipsDiv.style.display = "none";
			},10)
		},
		changeOptions : function(fix){
			var t = this;
			t.optLi[t.optIdx].className = '';
			t.optIdx = (t.optIdx + t.opt.length + fix) % t.opt.length;
			t.optLi[t.optIdx].className = 'bg2';
			var o = t.optLi[t.optIdx];
			var s1 = QZFL.dom.getXY(o);
			var s2 = QZFL.dom.getXY(t.optUl);
			var st = t.optUl.scrollTop;
			var ch = t.optUl.clientHeight;
			t.optUl.scrollTop = s1[1] + st - s2[1] - ch / 2;
		},
		submitOptions : function(){
			var t = this;
			t.replaceMention(t.optIdx);
		},
		replaceMention : function(idx){
			var t = this;
			var d = t.opt[idx];
			$e(t.inpDivN).find(".mak_point").remove();
			var o = t.nameEl;
			o.innerHTML = '@'+d.account+'&nbsp;';
			var p = document.createElement("span");
			p.className = "mak_point";
			p.innerHTML = "|";
			var ns = o.nextSibling;
			if(ns){
				o.parentNode.insertBefore(p,ns);
			}else{
				o.parentNode.appendChild(p);
			}
			t.hideOptions();
			t.replaceValue();
			return;
		},
		replaceValue : function(){
			var t = this;
			var o = t.inpDivN.cloneNode(true);
			$e(o).find(".mak_point").remove();
			var html = o.innerHTML;
			if(ua.ie){
				html = '<DIV>'+html+'</DIV>';
			}
			if(t.inpDiv.innerHTML == html){
				return;
			}

			var v = t.inpDivN.innerHTML;
			if(ua.ie){
				t.inpDiv.innerHTML = '<DIV>'+v+'</DIV>';
			}else{
				t.inpDiv.innerHTML = v;
			}
			var el = $e(t.inpDiv).find(".mak_point").elements[0];
			if(el){
				range.setCursor(el);
				QZFL.dom.removeElement(el);
			}
			t.inpDiv.focus();
			t.onWordChange();
		},
		addTopic : function(){
			var t = this;
			if(t.getContentLength() >= 630){
				return;
			}
			if(t.getContentLength() == 0){
				t.inpDivN.innerHTML = "";
			}
			var v = range.getHtmlContents();
			if(v.length){
				var o = range.getCommonAncestorContainer();
				var flag = false;
				for(var i=0;i<10;++i){
					if(o == t.inpDiv){
						flag = true;
						break;
					}
					if(o.parentNode && o != o.parentNode){
						o = o.parentNode;
					}else{
						break;
					}
				}
				if(flag){
					range.insert('<span class="mak_point">!|</span>',true);
					var value = t.getContent();
					$e(t.inpDiv).find(".mak_point").remove();
					t.inpDivN.innerHTML = value.replace("!|",'<span class="mak_point">&nbsp;</span>');//光标位置
				}
			}

			var o = $e(t.inpDivN).find(".mak_point").elements[0];
			if(!o){
				var o = QZFL.dom.createElementIn('span',t.inpDivN);
			}
			o.innerHTML = '#请在这里输入话题#';
			o.className = t.csName+'mak_topic_add';
			t.replaceValue();
			o.className = t.csName+"mak_topic";
			o = $e(t.inpDiv).find(".mak_topic_add").elements[0];
			range.select(o);
			o.className = t.csName+"mak_topic";
			t.inpDiv.focus();
		},
		feedback : function(){
			var t = this;
			if(t.getContentLength() >= 630){
				return;
			}
			if(t.getContentLength() == 0){
				t.setContent("#微博应用意见反馈#",true);
				return;
			}
			var v = range.getHtmlContents();
			if(v.length){
				var o = range.getCommonAncestorContainer();
				var flag = false;
				for(var i=0;i<10;++i){
					if(o == t.inpDiv){
						flag = true;
						break;
					}
					if(o.parentNode && o != o.parentNode){
						o = o.parentNode;
					}else{
						break;
					}
				}
				if(flag){
					range.insert('<span class="mak_point">!|</span>',true);
					var value = t.getContent();
					$e(t.inpDiv).find(".mak_point").remove();
					t.inpDivN.innerHTML = value.replace("!|",'<span class="mak_point">&nbsp;</span>');//光标位置
				}
			}

			var o = $e(t.inpDivN).find(".mak_point").elements[0];
			if(!o){
				var o = QZFL.dom.createElementIn('span',t.inpDivN);
			}
			o.innerHTML = '#微博应用意见反馈#<span class="mak_point">!|</span>';
			o.className = t.csName+'mak_topic';
			t.replaceValue();
			t.inpDiv.focus();
		},
		getContent : function(el){
			var t = this;
			el = el || t.inpDiv;
			if(ua.firefox){//ff下换行特殊处理
				var o = el.cloneNode(true);
				o.innerHTML = o.innerHTML.replace(/<br.*?>/ig,"\xa1");
				var value = o.textContent.replace(/\xa1/g,"\n");
			}else{
				var value = el.innerText || el.textContent || '';
			}
			return value;
		},
		setContent : function(c,isAppend){
			var t = this;
			t.inpDiv.focus();
			if(isAppend){
				t.inpDiv.innerHTML = c + '<span class="mak_point">&nbsp;</span>';
			}else{
				if(ua.ie){
					t.inpDiv.innerHTML = '<span class="mak_point">&nbsp;</span>'+c;
				}else{
					t.inpDiv.innerHTML = '';
					var div = document.createElement("span");
					div.innerHTML = c;
					t.inpDiv.appendChild(div);
				}
			}
			var el = $e(t.inpDiv).find(".mak_point").elements[0];
			if(el){
				range.setCursor(el);
				QZFL.dom.removeElement(el);
			}
			t.format();
			t.onWordChange();
		},
		getContentLength : function(){
			var t = this;
			var o = t.inpDiv.cloneNode(true);
			var el = $e(o).find(".mak_url");
			var count = el.elements.length;
			el.remove();
			var len = t.getContent(o).length + count * 20;
			if(len == 1 && t.inpDiv.innerHTML == '<br>'){
				len = 0;
			}
			return len;
		}
	});
	TWT.Editor = Editor;
})();
TWT.status.loadFollow = function(sucCb,errCb){
	sucCb = sucCb || QZFL.emptyFn;
	if(TWT.status.loadFollow._d){
		sucCb(TWT.status.loadFollow._d);
		return;
	}
	var url = TWT.util.getUrl('user');
	var data = {
		uin : TWT.status.getLoginUin(),
		num : 10000,
		type : 0,
		portrait : 1,
		sort : 0
	};
	TWT.net.dataLoader(url,data,function(d){
		d.infos = d.infos || {};
		d.infos.info = d.infos.info || [];
		TWT.status.loadFollow._d = d.infos.info;
		sucCb(d.infos.info);
	},function(d){
	});
}
TWT.widget = TWT.widget || {};

var publicFn = {
	imgUpload : function(){
		var t = this;
		t.imgUrl = "";
		var flag = TWT.data.get('imgFlag');
		t.imgFlag = flag;
		if(typeof flag == "undefined"){
			TWT.data.save('imgFlagCb',QZFL.event.bind(t,t.imgUpload));
		}else{
			TWT.data.del('imgFlagCb');
		}
		if(!flag){
			t.el.find(".pos2").setHtml('<a href="javascript:void(0);" onclick="return false;"><img src="/ac/b.gif" alt="" class="icons icon_up_pic_n" /></a>');
			return;
		}
		t.el.find(".pos2").setHtml([
			'<div class="formPlace" style="display:none"></div>',
			'<a href="javascript:void(0);" onclick="return false;" class="link_upload"><img src="/ac/b.gif" alt="上传图片" title="上传图片" class="icons icon_up_pic" /></a>',
			'<img alt="loading" src="/qzonestyle/qzone_app/app_weibo_v1/img/loading_comment.gif" class="loading" />',
			,'<span class="imgPlace"></span>'
		].join(""));
		t.upload = new TWT.Upload({
			placeHolder : t.el.find(".formPlace").elements[0]
		});
		t.upload.setPostUrl(TWT.util.getUrl("upload"));
		t.upload.setPostData({
			filename : 'pic',
			type : 0,
			uin : TWT.status.getLoginUin(),
			json : 1
		});
		t.upload.onFileDialogComplete = function(){
			var info = t.upload.getFileInfo();
			if(!trim(info.path)){
				return;
			}
			t.el.find(".pos2").find("input").hide();
			t.el.find(".pos2").removeClass("pos2").addClass("pos_tips").find(".loading").show();
			t.el.find(".imgPlace").setHtml("上传中…");
			var o = t.addEl.elements[0];
			if(o.className.indexOf("sent") >= 0){
				o.className = 'buttons bt_sent_n';
			}else{
				o.className = 'buttons bt_aoao_n';
			}
			t.upload.send();
		};
		t.upload.onSuccess = function(d){
			d = d || {};
			d.result = d.result || {};
			if(d.result.code == 0){
				t.el.find(".pos_tips").removeClass("pos_tips").addClass("pos2");
				t.imgSuc(d);
				t.el.find(".pos2").find("input").hide();
			}else{
				t.imgErr(d.result);
			}
		};
		t.upload.onError = QZFL.event.bind(t,t.imgErr);
	},
	imgSuc : function(d){
		var t = this;
		t.imgUrl = d.url;
		var info = t.upload.getFileInfo();
		info.name = QZFL.string.cut(info.name,10,'...');
		t.el.find(".pos2").setHtml([
			'<div onmouseover="TWT.media.imgShow(\''+d.url+'\',this,1);">',
				'<a href="javascript:void(0);" onclick="return false;" class="link_upload"><img src="/ac/b.gif" alt=""  class="icons icon_up_pic" /></a>',
				'<span class="c_tx3">'+info.name+'</span> <a href="javascript:void(0);" onclick="return false;" title="删除" name="del" onmouseover="QZFL.event.cancelBubble();"><img src="/ac/b.gif" alt="删除"  class="icons icon_del" /></a>',
			'</div>'
		].join("")).find("a[name=del]").bind("click",function(){
			t.imgUrl = "";
			t.imgUpload();
			t.wordChange();
		});
		t.wordChange();
	},
	imgErr : function(d){
		var t = this;
		t.el.find(".imgPlace").setHtml(d.msg);
		t.el.find(".pos_tips").find("input").show();
		t.el.find(".pos_tips").removeClass("pos_tips").addClass("pos2");
		t.wordChange();
		setTimeout(function(){
			t.el.find(".imgPlace").setHtml("");
		},3000);
	},
	addTopic : function(){
		var t = this;
		t.editor || t.startWrite();
		if(t.editor){
			t.el.find(".input_focus:first").show();
			t.el.find(".bor2").hide();
			t.editor.addTopic();
			if(t.endWrite){
				t.endWrite.bindFn = t.endWrite.bindFn || QZFL.event.bind(t,t.endWrite);
				QZFL.event.addEvent(document.body,"click",t.endWrite.bindFn);
			}
		}
	},
	feedback : function(){
		var t = this;
		t.editor || t.startWrite();
		if(t.editor){
			t.el.find(".input_focus:first").show();
			t.el.find(".bor2").hide();
			t.editor.feedback();
			if(t.endWrite){
				t.endWrite.bindFn = t.endWrite.bindFn || QZFL.event.bind(t,t.endWrite);
				QZFL.event.addEvent(document.body,"click",t.endWrite.bindFn);
			}
		}
	},
	wordChange : function(){//字数变化
		var t = this;
		var len = t.editor ? t.editor.getContentLength() : 0;
		var count = 140 - len - t.fixLen;
		if(t.imgUrl){
			count -= 20;
		}
		if(count >= 0){
			t.wordEl.setHtml('还能输入<strong class="c_tx2">'+count+'</strong>字');
		}else{
			t.wordEl.setHtml('超出<strong class="c_tx4">'+(-count)+'</strong>字');
		}
		if(t.imgFlag){
			if(len > 620){
				t.el.find(".pos2>a>img").addClass("icon_up_pic_n");
				t.el.find("input").hide();
			}else{
				t.el.find(".pos2>a>img").removeClass("icon_up_pic_n");
				t.el.find("input").show();
			}
		}
		if(len > 630){
			t.topicEl.addClass("icon_topic_n");
		}else{
			t.topicEl.removeClass("icon_topic_n");
		}
		var o = t.addEl.elements[0];
		if(o.className.indexOf("sent") >= 0){
			o.className = count >= 0 ? 'buttons bt_sent' : 'buttons bt_sent_n';
		}else{
			o.className = count >= 0 ? 'buttons bt_aoao' : 'buttons bt_aoao_n';
		}
	}
};

//{container}
TWT.widget.MainEditor = function(cfg){
	var t = this;
	t.fixLen = 0;
	t.el = t._c = $e("#"+cfg.container);
	t.el.setHtml([
	'<div onclick="QZFL.event.cancelBubble();" class="frm">',
		'<div class="textarea bor2 c_tx3">来，说说你在做什么，想什么...</div>',
		'<div class="textarea bor4 input_focus" style="display:none;"><span class="c_tx">@camdy</span>点击后出现<span class="c_tx"># bug #</span></div>',
		'<div class="op">',
			'<p class="font_nums c_tx3">还能输入<strong class="c_tx2">140</strong>字</p>',
			'<div class="pos_icons">',
				'<a href="javascript:void(0);" onclick="return false;" class="pos1"><img src="/ac/b.gif" alt="#" title="插入话题"  class="icons icon_topic" /></a>',
				'<div class="pos2"></div>',
				'<a href="javascript:void(0);" onclick="return false;" class="pos3"><img src="/ac/b.gif" alt="" title="意见反馈"  class="icons icon_response" /></a>',
			'</div>',
			'<button class="buttons bt_aoao" title="快捷键 Ctrl+Enter">广播</button>',
		'</div>',
	 '</div>'
	].join(""));
	t.el.find(".bor2").bind("click",QZFL.event.bind(t,t.startWrite));
	t.el.find(".buttons").bind("click",QZFL.event.bind(t,t.addTweet));
	t.el.find(".pos1").bind("click",QZFL.event.bind(t,t.addTopic));
	t.el.find(".icon_response").bind("click",QZFL.event.bind(t,t.feedback));
	t.wordEl = t.el.find(".font_nums");
	t.topicEl = t.el.find(".icon_topic");
	t.addEl = t.el.find(".bt_aoao");
	t.imgUpload();
};
QZFL.object.extend(TWT.widget.MainEditor.prototype,{
	startWrite : function(){
		var t = this;
		t.el.find(".bor2").hide();
		t.el.find(".input_focus:first").show();
		if(!t.editor){
			t.editor = new TWT.Editor({
				placeHolder : t.el.find(".input_focus").elements[0],
				onSubmit : QZFL.event.bind(t,t.addTweet),
				onWordChange : QZFL.event.bind(t,t.wordChange)
			});
		}else{
			if(ua.chrome || ua.safari){//可恶的浏览器兼容问题
				t.editor = new TWT.Editor({
					placeHolder : t.el.find(".input_focus").elements[0],
					onSubmit : QZFL.event.bind(t,t.addTweet),
					onWordChange : QZFL.event.bind(t,t.wordChange)
				});
			}else{
				t.editor.inpDiv.focus();
			}
		}
		t.endWrite.bindFn = t.endWrite.bindFn || QZFL.event.bind(t,t.endWrite);
		QZFL.event.addEvent(document.body,"click",t.endWrite.bindFn);
	},
	endWrite : function(){
		var t = this;
		if(t.editor){
			if(t.editor.getContentLength() == 0 || !trim(t.editor.getContent())){
				t.editor.setContent("");
				t.el.find(".input_focus").hide();
				t.el.find(".bor2").show();
				QZFL.event.removeEvent(document.body,"click",t.endWrite.bindFn);
			}
		}
	},
	addTweet : function(){
		var t = this;
		if(t.addEl.hasClass("bt_aoao_n")){
			return;
		}
		if(!t.editor){
			t.el.find(".font_nums").setHtml("请输入内容");
			return;
		}
		var len = t.editor.getContentLength();
		if(len == 0){
			t.el.find(".font_nums").setHtml("请输入内容");
			return;
		}
		if(len > 140){
			return false;
		}
		var c = trim(t.editor.getContent());
		if(!c){
			t.el.find(".font_nums").setHtml("请输入内容");
			return;
		}
		var url = TWT.util.getUrl("addTweet");
		var data = {
			uin : TWT.status.getLoginUin(),
			type : 1,
			content : c,
			img : t.imgUrl
		};
		t.addEl.removeClass("bt_aoao").addClass("bt_aoao_n");
		t.wordEl.setHtml('<img alt="loading" src="/qzonestyle/qzone_app/app_weibo_v1/img/loading_comment.gif" class="loading" />发送中...');
		TWT.net.dataSender(url,data,function(d){
			QZONE.FP.showMsgbox('广播成功',4,1000);
			t.imgUpload();//上传照片
			t.editor.setContent("");
			(t.onSuccess || QZFL.emptyFn)(d.data);
			t.addEl.removeClass("bt_aoao_n").addClass("bt_aoao");
		},function(d){
			t.wordEl.setHtml(d.result.msg);
			QZONE.FP.hideMsgbox();
			t.addEl.removeClass("bt_aoao_n").addClass("bt_aoao");
		});
	}
},publicFn);

TWT.widget.TweetEditor = function(cfg){
	var t = this;
	t.fixLen = 0;
	t.item = cfg.item;
	t.type = cfg.type;
	t.act = cfg.act;
	t.editorId = cfg.container;
	t.el = t._c = $e("#"+cfg.container);
	if(t.type == 2)
	{
		if(typeof t.item.rtweet != 'undefined')
		{
			var _nick = t.item.rtweet.nick;
			var _ocontent = t.item.rtweet.ocontent;
		}
		else
		{
			var _nick = t.item.nick;
			var _ocontent = t.item.ocontent;
		}
		if(_ocontent.length>15)
		{
			_ocontent = _ocontent.slice(0,15)+'...';
		}
		t.el.setHtml([
		'<div class="frm replay">',
			'<p class="talk_msg c_tx3"><span>转播 <strong>',_nick,'</strong>:'+_ocontent+'</span></p>',
			'<div class="textarea bor4 input_focus" contenteditable="true"><span class="c_tx">@username</span>点击后出现<span class="c_tx"># bug #</span></div>',
			'<div class="op">',
				'<div class="pos_icons">',
				'<a href="javascript:void(0);" onclick="return false;" class="pos1"><img src="/ac/b.gif" alt="#" title="插入话题" class="icons icon_topic" /></a>',
				'</div>',
				'<p class="font_nums c_tx2"><strong>140</strong></p>',
				'<button class="buttons bt_sent" title="快捷键 Ctrl+Enter">发送</button>',
			'</div>',
			'<button class="buttons bt_close_frm" title="关闭">关闭</button>',
			'<div class="comment_arrow c_bg3" style="right:6px">◆</div>',
		' </div>'
		].join("")).show();	
	}
	else
	{
		t.el.setHtml([
		'<div class="frm dialog">',
			'<p class="talk_msg c_tx3">对 <strong>',t.item.nick,'</strong> 说:</p>',
			'<div class="textarea bor4 input_focus" contenteditable="true"><span class="c_tx">@username</span>点击后出现<span class="c_tx"># bug #</span></div>',
			'<div class="op">',
				'<div class="pos_icons">',
				'<a href="javascript:void(0);" onclick="return false;" class="pos1"><img src="/ac/b.gif" alt="#" title="插入话题" class="icons icon_topic" /></a>',
				'</div>',
				'<p class="font_nums c_tx2"><strong>140</strong></p>',
				'<button class="buttons bt_sent" title="快捷键 Ctrl+Enter">发送</button>',
			'</div>',
			'<button class="buttons bt_close_frm" title="关闭">关闭</button>',
			'<div class="comment_arrow c_bg3" style="right:42px;">◆</div>',
		' </div>'
		].join("")).show();
		//t.fixLen = t.item.nick.length + 1;
	}
	t.el.find(".bt_sent").bind("click",QZFL.event.bind(t,t.addTweet));
	t.el.find(".pos1").bind("click",QZFL.event.bind(t,t.addTopic));
	t.el.find(".bt_close_frm").bind("click",QZFL.event.bind(t,t.close));
	t.wordEl = t.el.find(".font_nums");
	t.topicEl = t.el.find(".icon_topic");
	t.addEl = t.el.find(".bt_sent");
	t.startWrite();
};
QZFL.object.extend(TWT.widget.TweetEditor.prototype,{
	startWrite : function(){
		var t = this;
		if(!t.editor){
			t.editor = new TWT.Editor({
				placeHolder : t.el.find(".input_focus").elements[0],
				onSubmit : QZFL.event.bind(t,t.addTweet),
				onWordChange : QZFL.event.bind(t,function(){t.wordChange();
						var _div = QZFL.dom.getElementsByClassName('textarea bor4 input_focus','div',$(t.editorId))[0];
						var _pos = QZFL.dom.getSize(_div);
						if(_div.scrollHeight>50 && typeof t.changeheight == 'undefined'){
							QZFL.dom.setSize(_div,_pos[0],_pos[1]*2.5);
							t.changeheight = 1;
						}
						//alert($e('#editorBox28000118445362').find('textarea').scrollHeight);
					})
			});
		}
		if(t.type == 2)
		{
			if(t.item.type != 1)
			{
				t.editor.setContent(' ||@'+t.item.account + ':' + t.item.ocontent);
			}
		}
		t.el.find(".bor2").hide();
	},
	addTweet : function(){
		var t = this;
		if(t.addEl.hasClass("bt_send_n")){
			return;
		}
		var len = t.editor.getContentLength();
		if(t.type != 2 && len == 0){
			t.el.find(".font_nums").setHtml("请输入内容");
			return;
		}
		if(len > 140){
			return;
		}
		var c = trim(t.editor.getContent());
		if(t.type != 2 && !c){
			t.el.find(".font_nums").setHtml("请输入内容");
			return;
		}
		var url = TWT.util.getUrl("addTweet");
		var data = {
			uin : TWT.status.getLoginUin(),
			type : t.type,
			content : c,
			pareid : t.item.id,
			pareuin : t.item.uin
		};
		if(trim(data.content).indexOf('||') == 0)
		{
			data.content = ltrim(data.content).slice(2);	
		}
		t.addEl.removeClass("bt_sent").addClass("bt_sent_n");
		t.wordEl.setHtml('<img alt="loading" src="/qzonestyle/qzone_app/app_weibo_v1/img/loading_comment.gif" class="loading" />发送中...');
		TWT.net.dataSender(url,data,function(d){
			if(t.type == 2)
			{
			QZONE.FP.showMsgbox('转播成功',4,1000);
			}
			else
			{
			QZONE.FP.showMsgbox('对话成功',4,1000);
			}
			d.data.imgs = null;
			t.addEl.removeClass("bt_sent_n").addClass("bt_sent");
			(t.onSuccess || QZFL.emptyFn)(d.data);
		},function(d){
			t.wordEl.setHtml(d.result.msg);
			QZONE.FP.hideMsgbox();
			t.addEl.removeClass("bt_sent_n").addClass("bt_sent");
		});
	},
	close : function(){
		var t = this;
		t.el.find(".frm").remove();
		t.el.setHtml("").hide();
		$(t.act) && ($(t.act).setAttribute('show',0))
	}
},publicFn);

//{account,nick,uin,type}type=1：对话(默认)，2：话题
TWT.widget.DialogEditor = function(cfg){
	var t = this;
	QZFL.object.extend(t,cfg);
	t._c = $("editorpopup") || QZFL.dom.createElementIn("div",document.body,false,{
		id : "editorpopup",
		className : "pop_talk",
		style : "z-index:9000;left:60px; top:460px;display:none"
	});
	t.el = $e(t._c);
	t._c.innerHTML = [
	'<div class="frmbox" style="width:350px;">',
		'<div class="frm">',
			'<p class="talk_msg">',(t.type==2?'广播':['对 <strong><a href="profile.html#uin=',t.uin,'">',t.nick,'</a></strong> 说：'].join("")),'</p>',
			'<div class="textarea input_focus" contenteditable="true" style="width:340px; height:96px;"></div>',
			'<div class="op">',
				'<p class="font_nums"><strong>140</strong></p>',
				'<div class="pos_icons">',
					'<a href="javascript:void(0);" onclick="return false;" class="pos1"><img src="/ac/b.gif" alt="#" title="插入话题" class="icons icon_topic" /></a>',
					'<div class="pos2" onmousedown="QZFL.event.cancelBubble();"></div>',
				'</div>',
				'<button class="buttons bt_sent" title="快捷键 Ctrl+Enter">发送</button>',
			'</div>',
			'<button class="buttons bt_close_frm" title="关闭">关闭</button>',
		'</div>',
	'</div>',
	'<div class="fixopacity"></div>'
	].join("");
	t.wordEl = t.el.find(".font_nums");
	t.topicEl = t.el.find(".icon_topic");
	t.addEl = t.el.find(".bt_sent");
	t.show();
	t.startWrite();
	t.bind();
	t.imgUpload();
};
QZFL.object.extend(TWT.widget.DialogEditor.prototype,{
	bind : function(){
		var t = this;
		t.el.find(".bt_close_frm").bind("click",QZFL.event.bind(t,t.hide));
		t.el.find(".bt_sent").bind("click",QZFL.event.bind(t,t.addTweet));
		t.el.find(".pos1").bind("click",QZFL.event.bind(t,t.addTopic));
		t.el.find(".textarea").bind("mousedown",function(){QZFL.event.cancelBubble()});
		/*QZFL.dragdrop.registerDragdropHandler(t.el.find(".talk_msg").elements[0],t._c,{
		    rangeElement: [QZONE.dom.get(document.body), [1, 1, 1, 1]]
		});*/
		QZFL.dragdrop.registerDragdropHandler(t._c,t._c,{
		    rangeElement: [QZONE.dom.get(document.body), [1, 1, 1, 1]]
		});
	},
	show : function(){
		var t = this;
		TWT.media.dialogShow(t._c);
		/*TWT.util.show(t._c);
		var p1 = QZFL.dom.getPosition(document.body);
		var p2 = QZFL.dom.getPosition(t._c);
		var left = p1.left+(p1.width-p2.width)/2;
		var _t = QZFL.FP._t;
		var h1 = _t.QZFL.dom.getClientHeight();
		var h2 = QZFL.dom.getXY(frameElement.parentNode)[1];
		var top = QZFL.FP.getScrollTop() - h2 + (h1 - p2.height) / 2;
		QZFL.dom.setXY(t._c,left,top);
		
		t.startWrite();
		QZFL.css.insertCSSLink("/qzonestyle/global/css/qzfl.css");
		t._mid = QZFL.maskLayout.create();*/
	},
	hide : function(){
		var t = this;
		TWT.media.dialogHide(t._c);
	},
	startWrite : function(){
		var t = this;
		if(t.nick){
			t.fixLen = t.account.length + 2;
		}else{
			t.fixLen = 0;
		}
		if(!t.editor){
			t.editor = new TWT.Editor({
				placeHolder : t.el.find(".input_focus").elements[0],
				onSubmit : QZFL.event.bind(t,t.addTweet),
				onWordChange : QZFL.event.bind(t,t.wordChange)
			});
		}
	},
	addTweet : function(){
		var t = this;
		if(t.addEl.hasClass("bt_send_n")){
			return;
		}
		var len = t.editor.getContentLength();
		if(len == 0){
			t.el.find(".font_nums").setHtml("请输入内容");
			return;
		}
		if(len > 140){
			return;
		}
		var url = TWT.util.getUrl("addTweet");
		var c = trim(t.editor.getContent());
		if(!c){
			t.el.find(".font_nums").setHtml("请输入内容");
			return;
		}
		if(t.type != 2){
			c = ["@",t.account," ",c].join("");
		}
		var data = {
			uin : TWT.status.getLoginUin(),
			type : 1,
			content : c,
			img : t.imgUrl
		};
		t.addEl.removeClass("bt_sent").addClass("bt_sent_n");
		t.wordEl.setHtml('<img alt="loading" src="/qzonestyle/qzone_app/app_weibo_v1/img/loading_comment.gif" class="loading" />发送中...');
		TWT.net.dataSender(url,data,function(d){
			QZONE.FP.showMsgbox('对话成功',4,1000);
			d.data.imgs = null;
			t.addEl.removeClass("bt_sent_n").addClass("bt_sent");
			(t.onSuccess || QZFL.emptyFn)(d.data);
			t.hide();
		},function(d){
			t.wordEl.setHtml(d.result.msg);
			QZONE.FP.hideMsgbox();
			t.addEl.removeClass("bt_sent_n").addClass("bt_sent");
		});
	},
	setContent : function(c,isAppend){
		if(this.editor){
			this.editor.setContent(c,isAppend);
		}
	}
},publicFn);
/**
 * 微博 Upload list
 * @author camdyzeng
 */

//主逻辑
(function(){
	//{container:}
	var Upload = function(cfg){
		var t = this;
		t.id = ++Upload.count;
		Upload.instance[t.id] = t;
		t.gIns = "TWT.Upload.instance["+t.id+"]";
		t.targetId = "upTarget"+t.id;
		t.onSuccess = t.onError = t.onFileDialogComplete = QZFL.emptyFn;//事件
		QZFL.object.extend(t,cfg);
		t.init();
	};
	Upload.count = 0;
	Upload.instance = {};

	QZFL.object.extend(Upload.prototype,{
		init : function(){
			var t = this;
			if(!t.placeHolder){
				return;
			}
			var el = document.createElement("div");
			el.innerHTML = [
				'<form class="picform" enctype="multipart/form-data" method="post" target="',t.targetId,'">',
					'<input onchange="',t.gIns,'.change();" type="file" title="插入图片" name="pic" />',
					'<div class="upInput" style="display:none;"></div>',
				'</form>'
			].join("");
			t._c = el.firstChild;
			t.placeHolder.parentNode.replaceChild(t._c, t.placeHolder);
		},
		setPostData : function(d){
			var t = this;
			if(d.filename){
				$e(t._c).find("input[type=file]").setAttr("name",d.filename);
				delete d.filename;
			}
			var html = [];
			for(k in d){
				html.push('<input type="hidden" name="'+k+'" value="'+d[k]+'" />');
			}
			$e(t._c).find(".upInput").setHtml(html.join(""));
		},
		setPostUrl : function(url){
			var t = this;
			t._c.action = url;
			t.url = url;
		},
		change : function(){
			var t = this;
			t.onFileDialogComplete();
		},
		createIfm : function(){
			var t = this;
			if($(t.targetId)){
				return;
			}
			var ifm = QZONE.dom.createNamedElement("iframe",t.targetId);
			ifm.id = t.targetId;
			ifm.style.cssText = "top:0;left:0;height:1px;width:1px;border-width:0px;position:absolute;opacity:0;";
			
			function destroy(){
				destroy = QZFL.emptyFn;
				setTimeout(function(){
					ifm.src="about:blank";
					ifm.callback = null;
					ifm.onreadystatechange = null;
					QZFL.dom.removeElement(ifm);
					ifm = null;
					clearTimeout(timer);
					clearInterval(interval);
				},1000);
			}

			ifm.callback = function(d){
				destroy();
				ifm.callback = null;
				ifm.onreadystatechange = null;
				clearTimeout(timer);
				clearInterval(interval);
				t.onSuccess(d);
			};
			var timer;
			function err(){
				clearInterval(interval);
				ifm.onreadystatechange = null;
				timer = setTimeout(function(){
					t.onError({code:500,msg:"网络繁忙,请稍候再试"})
					destroy();
				},1000);
			}
			if(ua.ie){
				ifm.onreadystatechange = function(){
					if(ifm.readyState == "complete"){
						err();
					}
				};
			}else{
				var interval = setInterval(function(){
					try {
						var _t = ifm.contentWindow.location.href;
						if (_t.indexOf(t.url) == 0) {
							err();
						}
					} catch (e) {
						err();
					}
				}, 200);
			}
			document.body.appendChild(ifm);
		},
		send : function(){
			var t = this;
			t.createIfm();
			t._c.submit();
		},
		getFileInfo : function(){
			var t = this;
			var v = $e(t._c).find("input[type=file]").elements[0].value;
			return {
				type : (v.substr(v.lastIndexOf(".")+1)).toLowerCase(),
				name : (v.substr(v.lastIndexOf("\\")+1)),
				path : v
			}
		}
	});
	TWT.Upload = Upload;
})();
/**
 * 微博 Tweet list
 * @author camdyzeng
 */

//主逻辑
(function(){
	//{container:}
	var Tweet = function(cfg){
		var t = this;
		t.id = ++Tweet.count;
		Tweet.instance[t.id] = t;
		t.gIns = "TWT.Tweet.instance["+t.id+"]";
		t.viewMode = 0; //默认不展示照片
		t.type = 0;
		QZFL.object.extend(t,cfg);
		t._c = $(t.container);
		t.items = {};
		t.changeMode(t.viewMode);
	};
	Tweet.count = 0;
	Tweet.instance = {};

	function _getGTpl(){
		var tpl = _getGTpl.tpl || tmpl([
			'<li id="tweet<%=id%>" tid="<%=id%>" class="bbor3">',
				'<div class="item">',
					'<div class="tx_info">',
						'<p class="tx_con" id="twInfo<%=id%>">',
						'<%if(type==4 && typeof pare != "undefined"){%>',
							'<span class="c_tx3">对 <a href="profile.html#uin=<%=pare.uin%>" class="c_tx" title="<%=pare.nick%>(@<%=pare.account%>)"><%=pare.nick%></a> 说：</span>',
						'<%}else if(type==2){%>',
							'<span class="c_tx3">转播：</span>',
						'<%}%>',
						'<%=restHTML(content)%>',
						'</p>',
						'<%if(typeof rtweet == "object"){%>',
							'<div class="broadcast bg3">',
								'<p id="cont<%=id%>">',
									'<a href="profile.html#uin=<%=rtweet.uin%>" class="c_tx" title="<%=rtweet.nick%>(@<%=rtweet.account%>)"><%=rtweet.nick%></a>：',
									'<%=restHTML(rtweet.content)%>',
								'</p>',
							'<%if(rtweet.imgs && rtweet.imgs.img && rtweet.imgs.img[0]){%>',
								'<p class="look_pic" <%if(viewMode && !rtweet.imgs.first){%>style="display:block;"<%}%>>',
									'<a href="javascript:void(0)" onclick="TWT.media.imgPopup(&quot;<%=rtweet.imgs.img[0]%>/2000&quot;,this);return false;" onmouseover="TWT.media.imgShow(&quot;<%=rtweet.imgs.img[0]%>&quot;,this);" target="_blank" class="c_tx"><img src="/ac/b.gif"  class="icons icon_up_pic_small" />查看图片</a>',
								'</p>',
								'<p class="picbox clearfix <%if(viewMode && !rtweet.imgs.first){%>none<%}%>">',
									'<a class="c_tx" href="javascript:void(0);" onclick="TWT.media.imgPopup(&quot;<%=rtweet.imgs.img[0]%>/2000&quot;,this);return false;" title="点击查看大图"><%if(viewMode && rtweet.imgs.first){%><img src="<%=rtweet.imgs.img[0]%>/160" alt="点击查看大图"/><%}else{%><span tid="<%=id%>" class="picbox_img" src="<%=rtweet.imgs.img[0]%>/160">...</span><%}%></a>',
								'</p>',
							'<%}%>',
								'<span class="opbox c_tx3">',
									'<span><%=TWT.status.getTime(rtweet.time)%></span> ',
									'<span>来自<%=TWT.status.getType(rtweet.from)%> <%=TWT.status.getArea(rtweet.country,rtweet.province,rtweet.city)%> </span> ',
									'<%if(rtweet.count<101){%>',
									'<%=rtweet.count%>人转播',
									'<%}else{%>',
									'100+人转播',
									'<%}%>',
								'</span>',
							'</div>',
						'<%}%>',
						'<%if(typeof pare == "object" && type == 4){%>',
							'<div class="broadcast bg3">',
								'<p id="cont<%=id%>"><a href="profile.html#uin=<%=pare.uin%>" class="c_tx" title="<%=pare.nick%>(@<%=pare.account%>)"><%=pare.nick%></a>：<%=restHTML(pare.content)%></p>',
							'<%if(pare.imgs && pare.imgs.img && pare.imgs.img[0]){%>',
								'<p class="look_pic">',
									'<a href="javascript:void(0)" onclick="TWT.media.imgPopup(&quot;<%=pare.imgs.img[0]%>/2000&quot;,this);return false;" onmouseover="TWT.media.imgShow(&quot;<%=pare.imgs.img[0]%>&quot;,this);" target="_blank" class="c_tx"><img src="/ac/b.gif" alt=""  class="icons icon_up_pic_small" />查看图片</a>',
								'</p>',
								'<p class="picbox clearfix">',
									'<a class="c_tx" href="javascript:void(0);" onclick="TWT.media.imgPopup(&quot;<%=pare.imgs.img[0]%>/2000&quot;,this);return false;" title="点击查看大图"><%if(viewMode && rtweet.imgs.first){%><img src="<%=pare.imgs.img[0]%>/160" alt="点击查看大图"/><%}else{%><span tid="<%=id%>" class="picbox_img none" src="<%=pare.imgs.img[0]%>/160">...</span><%}%></a>',
								'</p>',
							'<%}%>',
							'</div>',
						'<%}%>',						
						'<%if(imgs && imgs.img && imgs.img[0]){%>',
							'<p class="look_pic" <%if(viewMode && !imgs.first){%>style="display:block;"<%}%>>',
								'<a href="javascript:void(0)" onclick="TWT.media.imgPopup(&quot;<%=imgs.img[0]%>/2000&quot;,this);return false;" onmouseover="TWT.media.imgShow(&quot;<%=imgs.img[0]%>&quot;,this);"  class="c_tx"><img src="/ac/b.gif" alt="" class="icons icon_up_pic_small" />查看图片</a>',
							'</p>',
							'<p class="picbox clearfix <%if(viewMode && !imgs.first){%>none<%}%>">',
								'<a class="c_tx" href="javascript:void(0);" onclick="TWT.media.imgPopup(&quot;<%=imgs.img[0]%>/2000&quot;,this);return false;" title="点击查看大图"><%if(viewMode && imgs.first){%><img src="<%=imgs.img[0]%>/160" alt="点击查看大图"/><%}else{%><span class="picbox_img" tid="<%=id%>" src="<%=imgs.img[0]%>/160">...</span><%}%></a>',
							'</p>',
						'<%}%>',
						'<div class="opbox c_tx3">',
							'<p>',
								'<p class="c_tx3">',
									'<span><%=TWT.status.getTime(time)%></span>',
									'<span>来自<%=TWT.status.getType(from)%></span>',
									'<%if(typeof count != "undefined" && count > 0){%>',
										'<span>',
										'<%if(count<101){%>',
                                    	'<%=count%>人转播',
										'<%}else{%>',
                                    	'100+人转播',
										'<%}%>',
										'</span>',
									'<%}%>',
								'</p>',
							'</p>',
							'<p class="op none" id="act<%=id%>" show="0">',
							  '<%if(TWT.status.getMyName() == account){%>',
							  '<a href="javascript:void(0);" onclick="<%=instance%>.delMsg(<%=id%>);return false;" class="c_tx">删除</a>',
							  '<%}else{%>',
							  '<a href="javascript:void(0);" onclick="<%=instance%>.showDialog(<%=id%>,4);return false;" class="c_tx">对话</a>',
							  '<%}%>',
							  '<a href="javascript:void(0);" onclick="<%=instance%>.showDialog(<%=id%>,2);return false;" class="c_tx">转播</a>',
							'</p>',
						'</div>',
						'<div id="editorBox<%=id%>" class="frmbox bg3" style="display:none;"></div>',
					'</div>',
				'</div>',
			'</li>'
		].join(''));
		_getGTpl.tpl = tpl;
		return tpl;	
	}
	function _getTpl(){
		var tpl = _getTpl.tpl || tmpl([
			'<li id="tweet<%=id%>" tid="<%=id%>" class="bbor3">',
				'<div class="item">',
					'<div onmouseover="TWT.card.show(&quot;<%=account%>&quot;,&quot;<%=uin%>&quot;,this,&quot;<%=nick%>&quot;,&quot;<%=portrait%>&quot;);" onmouseout="TWT.card.hide(&quot;<%=account%>&quot;,&quot;<%=uin%>&quot;,this,&quot;<%=nick%>&quot;,&quot;<%=portrait%>&quot;);" class="user_head">',
						'<p class="bg">',
							'<a href="profile.html#uin=<%=uin%>" class="user_head_50" ><span class="skin_portrait_round"></span><img src="<%=portrait%>/50" /></a>',
						'</p>',
					'</div>',
					'<div class="tx_info">',
						'<p class="tx_con" id="twInfo<%=id%>">',
							'<span id="name<%=id%>">',
								'<a href="profile.html#uin=<%=uin%>" class="c_tx" title="<%=nick%>(@<%=account%>)"><%=nick%></a><%if(flag1 & 0x01){%><img src="/ac/b.gif" alt="腾讯认证" title="腾讯认证" class="icons icon_verify"><%}%>',
								'<%if(typeof pare == "object" && type == 4){%>',
									'对 <a href="profile.html#uin=<%=pare.uin%>" class="c_tx" title="<%=pare.nick%>(@<%=pare.account%>)"><%=pare.nick%></a> 说',
								'<%}%>',
							'</span>：',
							'<%=restHTML(content)%>',
						'</p>',
						'<%if(typeof pare == "object" && type == 4){%>',
							'<div class="broadcast bg3">',
								'<p id="cont<%=id%>"><a href="profile.html#uin=<%=pare.uin%>" class="c_tx" title="<%=pare.nick%>(@<%=pare.account%>)"><%=pare.nick%></a>：<%=restHTML(pare.content)%></p>',
							'<%if(pare.imgs && pare.imgs.img && pare.imgs.img[0]){%>',
								'<p class="look_pic" >',
									'<a href="javascript:void(0)" onclick="TWT.media.imgPopup(&quot;<%=pare.imgs.img[0]%>/2000&quot;,this);return false;" onmouseover="TWT.media.imgShow(&quot;<%=pare.imgs.img[0]%>&quot;,this);" target="_blank" class="c_tx"><img src="/ac/b.gif" alt=""  class="icons icon_up_pic_small" />查看图片</a>',
								'</p>',
								'<p class="picbox clearfix">',
									'<a class="c_tx" href="javascript:void(0);" onclick="TWT.media.imgPopup(&quot;<%=pare.imgs.img[0]%>/2000&quot;,this);return false;" title="点击查看大图"><%if(viewMode){%><img src="<%=pare.imgs.img[0]%>/160" alt="点击查看大图"/><%}else{%><span tid="<%=id%>" class="picbox_img none" src="<%=pare.imgs.img[0]%>/160">...</span><%}%></a>',
								'</p>',
							'<%}%>',
							'</div>',
						'<%}%>',
						'<%if(typeof rtweet == "object"){%>',
							'<div class="broadcast bg3">',
								'<p id="cont<%=id%>">',
									'<a href="profile.html#uin=<%=rtweet.uin%>" class="c_tx" title="<%=rtweet.nick%>(@<%=rtweet.account%>)"><%=rtweet.nick%></a>：',
									'<%=restHTML(rtweet.content)%>',
								'</p>',
							'<%if(rtweet.imgs && rtweet.imgs.img && rtweet.imgs.img[0]){%>',
								'<p class="look_pic" <%if(viewMode && !rtweet.imgs.first){%>style="display:block;"<%}%>>',
									'<a href="javascript:void(0)" onclick="TWT.media.imgPopup(&quot;<%=rtweet.imgs.img[0]%>/2000&quot;,this);return false;" onmouseover="TWT.media.imgShow(&quot;<%=rtweet.imgs.img[0]%>&quot;,this);" target="_blank" class="c_tx"><img src="/ac/b.gif" alt=""  class="icons icon_up_pic_small" />查看图片</a>',
								'</p>',
								'<p class="picbox clearfix <%if(viewMode && !rtweet.imgs.first){%>none<%}%>">',
									'<a class="c_tx" href="javascript:void(0);" onclick="TWT.media.imgPopup(&quot;<%=rtweet.imgs.img[0]%>/2000&quot;,this);return false;" title="点击查看大图"><%if(viewMode  && rtweet.imgs.first){%><img src="<%=rtweet.imgs.img[0]%>/160" alt="点击查看大图"/><%}else{%><span class="picbox_img none" tid="<%=id%>" src="<%=rtweet.imgs.img[0]%>/160">...</span><%}%></a>',
								'</p>',
							'<%}%>',
								'<span class="opbox c_tx3"> ',
								'<span><%=TWT.status.getTime(rtweet.time)%></span> ',
								'<span>来自<%=TWT.status.getType(rtweet.from)%> <%=TWT.status.getArea(rtweet.country,rtweet.province,rtweet.city)%> </span> ',
								'<%if(rtweet.count<101){%>',
								'<%=rtweet.count%>人转播',
								'<%}else{%>',
								'100+人转播',
								'<%}%>',
								'</span>',
							'</div>',
						'<%}%>',
						'<%if(imgs && imgs.img && imgs.img[0]){%>',
							'<p class="look_pic" <%if(viewMode && !imgs.first){%>style="display:block;"<%}%>>',
								'<a href="javascript:void(0)" onclick="TWT.media.imgPopup(&quot;<%=imgs.img[0]%>/2000&quot;,this);return false;" onmouseover="TWT.media.imgShow(&quot;<%=imgs.img[0]%>&quot;,this);" class="c_tx"><img src="/ac/b.gif" alt="" class="icons icon_up_pic_small" />查看图片</a>',
							'</p>',
							'<p class="picbox clearfix <%if(viewMode && !imgs.first){%>none<%}%>">',
								'<a class="c_tx" href="javascript:void(0);" onclick="TWT.media.imgPopup(&quot;<%=imgs.img[0]%>/2000&quot;,this);return false;" title="点击查看大图"><%if(viewMode && imgs.first){%><img src="<%=imgs.img[0]%>/160" alt="点击查看大图"/><%}else{%><span class="picbox_img " tid="<%=id%>" src="<%=imgs.img[0]%>/160">...</span><%}%></a>',
							'</p>',
						'<%}%>',						
						'<div class="opbox c_tx3">',
							'<p>',
								'<p class="c_tx3">',
									'<span><%=TWT.status.getTime(time)%></span>',
									'<span>来自<%=TWT.status.getType(from)%> <%=TWT.status.getArea(country,province,city)%></span>',
									'<%if(typeof count != "undefined" && count > 0){%>',
										'<span>',
										'<%if(count<101){%>',
                                    	'<%=count%>人转播',
										'<%}else{%>',
                                    	'100+人转播',
										'<%}%>',
										'</span>',
									'<%}%>',
								'</p>',
							'</p>',
							'<p class="op none" id="act<%=id%>" show="0">',
							  '<%if(TWT.status.getMyName() == account){%>',
							  '<a href="javascript:void(0);" onclick="<%=instance%>.delMsg(<%=id%>);return false;" class="c_tx">删除</a>',
							  '<%}else{%>',
							  '<a href="javascript:void(0);" onclick="<%=instance%>.showDialog(<%=id%>,4);return false;" class="c_tx">对话</a>',
							  '<%}%>',
							  '<a href="javascript:void(0);" onclick="<%=instance%>.showDialog(<%=id%>,2);return false;" class="c_tx">转播</a>',
							'</p>',
						'</div>',
						'<div id="editorBox<%=id%>" class="frmbox bg3" style="display:none;"></div>',
					'</div>',
				'</div>',
			'</li>'
		].join(''));
		_getTpl.tpl = tpl;
		return tpl;
	}
	//私信模板
	function _getMTpl(){
		var tpl = _getMTpl.tpl || tmpl([
			'<li id="tweet<%=id%>" tid="<%=id%>" class="bbor3">',
				'<div class="item">',
					'<div onmouseover="TWT.card.show(&quot;<%=account%>&quot;,&quot;<%=uin%>&quot;,this,&quot;<%=nick%>&quot;,&quot;<%=portrait%>&quot;);" onmouseout="TWT.card.hide(&quot;<%=account%>&quot;,&quot;<%=uin%>&quot;,this,&quot;<%=nick%>&quot;,&quot;<%=portrait%>&quot;);" class="user_head">',
						'<p class="bg">',
							'<a href="profile.html#uin=<%=uin%>" class="user_head_50" ><span class="skin_portrait_round"></span><img src="<%=portrait%>/50" /></a>',
						'</p>',
					'</div>',
					'<div class="tx_info">',
						'<p class="tx_con" id="twInfo<%=id%>">',
							'<span id="name<%=id%>">',
								'<a href="profile.html#uin=<%=uin%>" class="c_tx" title="<%=nick%>(@<%=account%>)"><%=nick%></a><%if(flag1 & 0x01){%><img src="/ac/b.gif"  alt="腾讯认证" title="腾讯认证" class="icons icon_verify"><%}%>',
								'<%if(typeof pare == "object" && type == 4){%>',
									'对 <a href="profile.html#uin=<%=pare.uin%>" class="c_tx" title="<%=pare.nick%>(@<%=pare.account%>)"><%=pare.nick%></a> 说',
								'<%}%>',
							'</span>：',
							'<%=restHTML(content)%>',
						'</p>',
						'<%if(imgs && imgs.img && imgs.img[0]){%>',
							'<p class="look_pic" <%if(viewMode && !imgs.first){%>style="display:block;"<%}%>>',
								'<a href="javascript:void(0)" onclick="TWT.media.imgPopup(&quot;<%=imgs.img[0]%>/2000&quot;,this);return false;" onmouseover="TWT.media.imgShow(&quot;<%=imgs.img[0]%>&quot;,this);" class="c_tx"><img src="/ac/b.gif" alt="" class="icons icon_up_pic_small" />查看图片</a>',
							'</p>',
							'<p class="picbox clearfix <%if(viewMode && !imgs.first){%>none<%}%>">',
								'<a class="c_tx" href="javascript:void(0);" onclick="TWT.media.imgPopup(&quot;<%=imgs.img[0]%>/2000&quot;,this);return false;" title="点击查看大图"><%if(viewMode && imgs.first){%><img src="<%=imgs.img[0]%>/160" alt="点击查看大图"/><%}else{%><span class="picbox_img " tid="<%=id%>" src="<%=imgs.img[0]%>/160">...</span><%}%></a>',
							'</p>',
						'<%}%>',						
						'<div class="opbox c_tx3">',
							'<p>',
								'<p class="c_tx3">',
									'<span><%=TWT.status.getTime(time)%></span>',
									'<span>来自<%=TWT.status.getType(from)%> <%=TWT.status.getArea(country,province,city)%></span>',
									'<%if(typeof count != "undefined" && count > 0){%>',
										'<span>',
										'<%if(count<101){%>',
                                    	'<%=count%>人转播',
										'<%}else{%>',
                                    	'100+人转播',
										'<%}%>',
										'</span>',
									'<%}%>',
								'</p>',
							'</p>',
							'<%if(TWT.status.getMyName() == account){%>',
							'<p class="op">',
								'<a href="javascript:void(0)" onclick="<%=instance%>.showDialog(<%=id%>,6);return false;" title="回信" class="c_tx">回信</a>',
								'<a href="javascript:void(0)" onclick="<%=instance%>.delMsg(<%=id%>);return false;" title="删除" class="c_tx drop_layer_link" hidefocus="true">删除</a>',
							'</p>',
							'<%}%>',
						'</div>',
						'<div id="editorBox<%=id%>" class="frmbox bg3" style="display:none;"></div>',
					'</div>',
				'</div>',
			'</li>'
		].join(''));
		_getMTpl.tpl = tpl;
		return tpl;
	}	

	function _getDiv(){
		_getDiv.div = _getDiv.div || document.createElement("div");
		return _getDiv.div;
	}

	QZFL.object.extend(Tweet.prototype,{
		setHtml : function(el,data){
			var t = this;
			t.imgList = t.imgList || [];
			switch(t.type)
			{
				//默认
				case 0:
					var tplFn = _getTpl();
					break;
				//客人页
				case 1:
					var tplFn = _getGTpl();
					break;
				//私信
				case 2:
					var tplFn = _getMTpl();
					break;
			}
			/*
			if(t.type){
				var tplFn = _getGTpl();
			}else{
				var tplFn = _getTpl();
			}
			*/
			var _html = [],d;
			for(i in data){
				try{
					d = data[i];
					if(!t.items[d.id])
					{
						d.instance = t.gIns;
						d.viewMode = t.viewMode;
						if(d.imgs){
							var _src = d.imgs.img[0]+'/160';
							if(t.imgList[_src]){
								d.imgs.first = 0;
							}else{
								t.imgList[_src] = d.id;	
								d.imgs.first = 1;
							}	
						}
						if(d.rtweet && d.rtweet.imgs){
							var _src = d.rtweet.imgs.img[0]+'/160';
							if(t.imgList[_src]){
								d.rtweet.imgs.first = 0;
							}else{
								t.imgList[_src] = d.id;	
								d.rtweet.imgs.first = 1;
							}
							//alert(t.imgList[d.rtweet.imgs.img[0]]);
						}
						t.items[d.id] = d;
						_html.push(tplFn(d));						
					}else{
					}
				}catch(e){
				}
			}	
			el.innerHTML = _html.join('');
			if(t.type<2){
				$e(el).find("li.bbor3").onHover(function(e){
					var id = this.getAttribute("tid");
					if(parseInt($('act'+id).getAttribute('show')) != 1)
					{
						TWT.util.show("act"+id);
						QZFL.css.removeClassName($("act"+id),'none');
					}
				},function(e){
					var id = this.getAttribute("tid");
					if(parseInt($('act'+id).getAttribute('show')) != 1)
					{
						TWT.util.hide("act"+id);
					}
				});
			}
		},
		show : function(data){
			var t = this;
			t.items = {};
			t.setHtml(t._c,data);
		},
		append : function(data){
			var t = this;
			var div = _getDiv();
			t.setHtml(div,data);
			var nodes = _nodes = div.childNodes;
			var df = document.createDocumentFragment();
			for(var i=(nodes.length-1); i>=0; --i){
				df.insertBefore(nodes[i],df.firstChild);
			}
			t._c.appendChild(df);
		},
		prepend : function(data,isTween){
			var t = this;
			var div = _getDiv();
			t.setHtml(div,data);
			var nodes = div.childNodes;
			var df = document.createDocumentFragment()
			//for(var i=0; i<nodes.length; ++i){
			for(var i=(nodes.length-1); i>=0; --i){
				df.insertBefore(nodes[i],df.firstChild);
				//df.appendChild(nodes[i]);
			}
			t._c.insertBefore(df,t._c.firstChild);
			if(isTween){
				var item = t._c.firstChild;
				var s = QZFL.dom.getSize(item);
				QZFL.dom.setStyle(item,"height","1px");
				QZFL.dom.setStyle(item,"z-index","38");
				var tw = new QZFL.Tween(item,"height",QZFL.transitions.regularEaseInOut,'1px',s[1],0.4);
				tw.onMotionStop = function(){
					QZFL.dom.setStyle(item,"height","auto");
				}
				tw.start(false);
			}
		},
		delMsg : function(id){
			var url = TWT.util.getUrl("delmsg");
			var data = {
				uin : TWT.status.getLoginUin(),
				id : id
			};
			_succeess = function(){
				$('myTweetNum') && ($('myTweetNum').innerHTML = parseInt($('myTweetNum').innerHTML) -1);
				$('hisMsg') && ($('hisMsg').innerHTML = parseInt($('hisMsg').innerHTML)-1);
				var item = $('tweet'+id);
				var s = QZFL.dom.getSize(item);
				QZFL.dom.setStyle(item,"z-index","38");
				var tw = new QZFL.Tween(item,"height",QZFL.transitions.regularEaseIn,s[1]+'px',1,0.4);
				tw.onMotionStop = function(){
					QZFL.dom.removeElement($('tweet'+id));
				}
				tw.start(false);
			}
			TWT.net.dataSender(url,data,function(d){
				QZONE.FP.showMsgbox('删除成功',4,1000);
				(_succeess || QZFL.emptyFn)(d.data);
			});				 
		},
		showDialog : function(id,type){
			var t = this;
			try{
				//$e(t._c).find('p.op').setAttr('show',0).setStyle('display','none');
				$e(t._c).find('p.op').setAttr('show',0).hide();
				$e(t._c).find('div.cardbox').hide();
				$e(t._c).find('div.frmbox').hide();
			}catch(e){}
			$('act'+id).style.display = 'block';
			if($('editorBox'+id).innerHTML != '' && $('editorBox'+id))
			{
				if(type == 4 && QZFL.css.hasClassName($('editorBox'+id),'dialog'))
				{	
					$('act'+id).setAttribute('show',0);
					$('editorBox'+id).innerHTML = '';
					TWT.util.hide($('editorBox'+id));
					return;
				}
				if(type == 2 && QZFL.css.hasClassName($('editorBox'+id),'replay'))
				{
					$('act'+id).setAttribute('show',0);
					$('editorBox'+id).innerHTML = '';
					TWT.util.hide($('editorBox'+id));
					return;
				}
			}
			if(type == 4)
			{
				QZFL.css.addClassName($('editorBox'+id),'dialog');
				if(QZFL.css.hasClassName($('editorBox'+id),'replay'))
				{
					QZFL.css.removeClassName($('editorBox'+id),'replay');	
				}
			}
			else
			{
				QZFL.css.addClassName($('editorBox'+id),'replay')	
				if(QZFL.css.hasClassName($('editorBox'+id),'dialog'))
				{
					QZFL.css.removeClassName($('editorBox'+id),'dialog');	
				}
			}
			var _d = t.items[id];
			var editer = new TWT.widget.TweetEditor({container:'editorBox'+id,item:_d,type:type,act:'act'+id});
			$('act'+id).setAttribute('show',1);
			editer.onSuccess = function(d){
				$('act'+id).setAttribute('show',0);
				$('editorBox'+id).innerHTML = '';
				TWT.util.hide($('editorBox'+id));
				TWT.util.hide($('act'+id));
				//t.items[d.id] = d;
				d.account = TWT.data.get('weiboMyname');
				d.nick = TWT.data.get('weiboMynick');
				d.portrait = TWT.data.get('weiboMyportrait');
				d.flag1 = TWT.data.get('weiboMyflag1');
				if(type == 4){
					d.pare = _d;
				}
				if(type == 2)
				{
					if(typeof t.items[id].rtweet == 'undefined')
					{
						d.rtweet = t.items[id];  			
					}
					else
					{
						d.rtweet = t.items[id].rtweet;  			
					}
				}
				if(!t.guest){
					t.prepend([d],0);
					$('myTweetNum') && ($('myTweetNum').innerHTML = parseInt($('myTweetNum').innerHTML) + 1)
					$('hisMsg') && ($('hisMsg').innerHTML = parseInt($('hisMsg').innerHTML)+1);
				}
			}
		},
		changeMode : function(type){
			var t = this;
			t.viewMode = type;
			t.imgList = t.imgList || [];
			if(type){
				QZFL.css.addClassName(t._c,"none_pics_small");
				QZFL.css.removeClassName(t._c,"none_pics_ico");
				$e(t._c).find('.picbox_img').each(function(o){
					var _src = o.getAttribute("src");
					var _tid = o.getAttribute("tid");
					if(t.imgList[_src] == _tid){
						var img = document.createElement("img");
						o.parentNode.replaceChild(img,o);
						img.src = _src;
					}else{
						TWT.util.hide(o.parentNode.parentNode);	
						TWT.util.show(o.parentNode.parentNode.previousSibling);	
					}
				});
			}else{
				QZFL.css.removeClassName(t._c,"none_pics_small");
				QZFL.css.addClassName(t._c,"none_pics_ico");
			}
		}
	});
	TWT.Tweet = Tweet;
})();
(function(){
	var userInfo = function(cfg){
		var t = this;
		t.id = ++userInfo.count;
		userInfo.instance[t.id] = t;
		t.gIns = "TWT.userInfo.instance["+t.id+"]";
		QZFL.object.extend(t,cfg);
		t._c = $(t.container);
		t._c1 = $(t.container1);
		t.items = {};
		
	}; 
	userInfo.count = 0;
	userInfo.instance = {};
	function _getuTpl(){
		var tpl = _getuTpl.tpl || tmpl([
				'<a href="profile.html<%if(!self){%>#id=<%=account%>&uin=<%=ouin%><%}%>" class="user_head_100_bg2"><span class="skin_portrait_round"></span><img src="<%=portrait%>/100" alt="<%=nick%>(@<%=account%>)" /></a>',
				'<div class="tx_info">',
					'<p class="name c_tx3"><strong><a href="profile.html<%if(!self){%>#id=<%=account%>&uin=<%=ouin%><%}%>"><%=nick%></a></strong><%if(flag1 & 0x01){%><img src="/ac/b.gif" alt="腾讯认证" title="腾讯认证" class="icons icon_verify"><%}%></p>',
					'<p class="lk">@<%=account%></p>',
					//'<p class="lk"><a href="profile.html#id=<%=account%>&uin=<%=ouin%>" class="c_tx">http://t.qq.com/<%=account%></a></p>',
					'<p class="with">',
						'<span>广播<a href="profile.html<%if(!self){%>#id=<%=account%>&uin=<%=ouin%><%}%>" class="c_tx"><strong id="myTweetNum"><%=sendnum%></strong></a>条</span>   <span>听众<a href="follow.html#uin=<%=ouin%>&type=follower" class="c_tx"><strong id="myFollowerNum"><%=follower%></strong></a>人</span>   <span><span class="whose"><%if(self){%>我<%}else{%><%if(controller.sex==1){%>他<%}else{%>她<%}%><%}%></span>收听<a href="follow.html#uin=<%=ouin%>&type=following" class="c_tx"><strong id="myFollowingNum"><%=following%></strong></a>人</span>',
					'</p>',
					'<div class="opbox">',
						'<%if(!self){%>',
							'<p class="hadall" id="listen<%=ouin%>">',
							'<%if(idol==1){%>',
								'<span><img class="icons icon_tack" alt="已收听" src="/ac/b.gif"> 已收听</span><a href="javascript:void(0)" class="c_tx" onclick="<%=instance%>.modifyMain(0);return false;">取消</a>',
							'<%}else{%>',
								'<button onclick="<%=instance%>.modifyMain(1)" class="buttons bt_hear">+收听</button>',
							'<%}%>',
							'</p>',
							'<p class="btns"><button onclick="<%=instance%>.showDialog(&quot;<%=account%>&quot;,&quot;<%=nick%>&quot;);">对话</button><button onclick="<%=instance%>.toggle(this)">更多 <span>▼</span></button></p>',
						'<%}else{%>',
							'<p class="hadall">这是你自己</p>',
						'<%}%>',
					'</div>',
				'</div>'
			].join(''));
		_getuTpl.tpl = tpl;
		return tpl;
	};

	function _getuLTpl(){
		var tpl = _getuLTpl.tpl || tmpl([
				'<div class="her_tx_info bbor3">',
					'<h4>',
					'<%if(self){%>',
						'我',
					'<%}else{%>',
						'<%if(sex==2){%>',
							'她',
						'<%}else{%>',
							'他',
						'<%}%>',
					'<%}%>',
					'的资料</h4>',
						'<p class="lh">',
						'<%if(sex==2){%>',
							'女',
						'<%}else{%>',
							'男',
						'<%}%>，',
							'<%=TWT.status.getArea(country,province,city)%>',
						'</p>',
						'<p><%=intro%></p>',
				'</div>',
				'<%if(flag1 & 0x01 && typeof vipinfo != "undefined"){%>',
				'<div class="tc_tx_info">',
					'<div class="tit_info bg2"><h4>腾讯认证资料</h4></div>',
					'<p><%=restHTML(vipinfo)%></p>',
				'</div>',
				'<%}%>'
			].join(''));
		_getuLTpl.tpl = tpl;
		return tpl;
	};
	
	function hideWin(){
		TWT.util.hide('actWin');
		QZFL.event.removeEvent(document.body,'click',hideWin);
	}

	QZFL.object.extend(userInfo.prototype,{
		setHTML : function(el,el1,data){
			var t = this;
			var tplFn = _getuTpl();
			var tplLFn = _getuLTpl();
			t.uin = data.uin;	
			t.ouin = data.ouin;
			el.innerHTML = tplFn(data);
			el1.innerHTML = tplLFn(data);
		},
		show : function(data){
			var t = this;
			data.instance = t.gIns;
			t.item = data;
			t.setHTML(t._c,t._c1,data);
		},
		showDialog : function(){
			var t = this;
			var d = t.item;
			var dialog = new TWT.widget.DialogEditor({"account":d.account,"nick":d.nick,"uin":d.uin});
		},
		toggle : function(o){
			var t = this;
			t.initWin();
			var _to = $('actWin');
			if(_to.style.display == 'none'){
				var pos = QZFL.dom.getXY(o);
				QZFL.dom.setXY(_to,pos[0]+2,pos[1]+20);
				TWT.util.show('actWin');
				QZFL.event.cancelBubble();
				QZFL.event.addEvent(document.body,'click',hideWin);
			}else{
				hideWin();
			}
		},
		initWin : function(){
			var t = this;
			var html = [];
			var data = t.item;
			if(!data.self){
				html = [
					'<ul>',
						'<li><a href="javascript:void(0);" onclick="'+t.gIns+'.showDialog();return false;">对话</a></li>',
						'<li id="actWinmodify">',(data.idol?('<a href="javascript:void(0);" onclick="'+t.gIns+'.modifyMain(0);return false;">取消收听</a>'):('<a href="javascript:void(0);" onclick="'+t.gIns+'.modifyMain(1);return false;">收听</a>')),'</li>',
						'<li class="report tbor2"><a href="javascript:void(0);" onclick="'+t.gIns+'.alarm(0);return false;" title="举报">举报</a></li>',
					'</ul>'
				];
			}
			var o = $('actWin') || QZFL.dom.createElementIn("div",document.body,false,{
				id : 'actWin',
				className : 'pop_more bor2 bg2 ',
				style : 'display:none'
			});
			o.innerHTML = html.join("");
			t.initWin = QZFL.emptyFn
		},			 
		modifyMain : function(type){
			var t = this;
			var url = TWT.util.getUrl("modifyFollow");
			var data = {
				uin : t.uin,
				ouin : t.ouin,
				type : type
			};
			TWT.net.dataSender(url,data,function(ret){
				$('listen'+t.ouin).innerHTML = (type!=0?'<span><img class="icons icon_tack" src="/ac/b.gif"> 已收听</span><a href="javascript:void(0);" onclick="'+t.gIns+'.modifyMain(0);return false;" class="c_tx">取消</a>':'<button onclick="'+t.gIns+'.modifyMain(1)" class="buttons bt_hear">+收听</button>');
				try
				{
				$('actWinmodify').innerHTML = (type==0?'<a href="javascript:void(0);" onclick="'+t.gIns+'.modifyMain(1);return false;">收听</a>':'<a href="javascript:void(0);" onclick="'+t.gIns+'.modifyMain(0);return false;">取消收听</a>');
				}catch(e){}
			},function(d){
				//alert(d);
			});
		},
		alarm : function(){
			var t = this;
			var url = [
				'http://jubao.qq.com/cgi-bin/jubao?appname=micoblog&subapp=web&jubaotype=uin&envname=web',
				'tw_name='+t.item.account,
				'tw_pic_url=',
				'tw_vip='
			].join("&");
			
			var dialog = QZFL.dom.createElementIn("div",document.body,null,{
				id : "alarmDialog",
				style : "width:635px;height:485px;position:absolute;top:200;left:200;z-index:100000",
				innerHTML : '<iframe allowtransparency="yes" frameborder="no" id="alarmIfm" style="width:100%;height:100%" src="'+url+'"></iframe>'
			});
			TWT.media.dialogShow(dialog,true);
			window.jubao_onClose = function(){
				TWT.media.dialogHide(dialog,function(){
					setTimeout(function(){
						$("alarmIfm").src = "about:blank";
						dialog.innerHTML = "";
						QZFL.dom.removeElement(dialog);
						dialog = null;
					},2000);
				});
			};
		}
	});
	TWT.userInfo = userInfo;

	//听众列表
	var listenInfo = function(cfg){
		var t = this;
		t.id = ++listenInfo.count;
		listenInfo.instance[t.id] = t;
		t.gIns = "TWT.userInfo.instance["+t.id+"]";
		QZFL.object.extend(t,cfg);
		t._c = $(t.container);
		t.items = {};
	}; 

	QZFL.object.extend(listenInfo.prototype,{
		setHTML : function(el,data){
			var _userTmp = tmpl([
				'<li>',
					'<a href="profile.html#id=<%=account%>&uin=<%=uin%>" title="<%=nick%>(@<%=account%>)" class="user_head_35"><span class="skin_portrait_round"></span><img src="<%=portrait%>/50"  style="width:35px; height:35px;" title="<%=nick%>@<%=account%>" /></a>',
				'</li>'
			].join(''));
			var _html = [];
			if(data.self){
				_html.push('<h4>我收听<span class="c_tx"><a href="follow.html#type=following" class="c_tx" id="myListen">'+data.total+'</a></span>人</h4>');
			}else{
				if(data.sex){
				_html.push('<h4><span class="whose">他</span>收听<span class="c_tx"><a href="follow.html#type=following&uin='+data.ouin+'" class="c_tx">'+data.total+'</a></span>人</h4>');
				}else{
					_html.push('<h4><span class="whose">她</span>收听<span class="c_tx"><a href="follow.html#type=following&uin='+data.ouin+'"  class="c_tx">'+data.total+'</a></span>人</h4>');
				}
			}
			_html.push('<ul>');
			for(i in data.info)
			{
				if(i>7)
				{
					break;
				}
				_html.push(_userTmp(data.info[i]));
			}
			_html.push('</ul>');
			if(data.total>7){
				if(data.ouin){
					_html.push('<p class="more" id="seeAllfollow"><a href="follow.html#type=following&uin='+data.ouin+'" class="c_tx">查看全部 >></a></p>');	
				}else{
					_html.push('<p class="more" id="seeAllfollow"><a href="follow.html#type=following" class="c_tx">查看全部 >></a></p>');	
				}
			}
			if(data.total>0)
			{
				el.innerHTML = _html.join('');
			}
			else
			{
				el.style.display = 'none';
			}
		},
		show : function(data){
			var t = this;
			t.item = data;
			t.setHTML(t._c,data);
		}
	});
	listenInfo.count = 0;
	listenInfo.instance = {};	
	TWT.listenInfo = listenInfo;
 })();
(function(){
	function getTpl(){
		return tmpl([
		'<p id="topicP<%=id%>" onmouseover="TWT.util.showi(&quot;topic<%=id%>&quot;)" onmouseout="TWT.util.hide(&quot;topic<%=id%>&quot;)">',
			'<a href="search.html#type=topic&keyword=<%=encodeURI(name)%>" class="c_tx" title="<%=name%>"><%=QZFL.string.cut(name,20,"...")%>(<%=twnum%>)</a>',
			'<a href="javascript:void(0);" onclick="TWT.favList.del(<%=_idx%>);return false;" id="topic<%=id%>" class="none" title="取消收听"><img src="/ac/b.gif" alt="取消收听"  class="icons icon_del" /></a>',
		'</p>'
		].join(""));	
	}
	TWT.favList = {
		show : function(listId,titleId,data){
			t.items = data || [];
			var tplFn = getTpl();
			var html = [];
			for(var i=0; i<t.items.length; ++i){
				t.items[i]._idx = i;
				html.push(tplFn(t.items[i]));
			}
			if(html.length){
				$(listId).innerHTML = html.join("");
				TWT.util.show(listId);
				if(titleId != '')
				{
					TWT.util.show(titleId);
				}
			}else{
				TWT.util.hide(listId);
				if(titleId != '')
				{
					TWT.util.hide(titleId);
				}
			}
		},
		del : function(idx){
			var d = t.items[idx];
			var url = TWT.util.getUrl("topic");
			var data = {
				uin : TWT.status.getLoginUin(),
				id : d.id,
				type: 0
			};
			TWT.net.dataSender(url,data,function(){
				QZFL.dom.removeElement($('topicP'+d.id));
			});				 
		}
	};
	var t = TWT.favList
 })();
/**
 * 微博 app 照片相关
 * @author camdyzeng [Qzone Frontend]
 */

var TWT = TWT || {};
(function(){
	function imgLoad(url,sucCb,errCb){
		var img = new Image();
		img.onload = function(){
			img.onload = img.onerror = null;
			(sucCb || QZFL.emptyFn)(url,img.width,img.height);
			img = null;
		};
		img.onerror = function(){
			img.onload = img.onerror = null;
			(errCb || QZFL.emptyFn)(url);
			img = null;
		};
		img.src = url;
	}
	function getEl(){
		var div = $("tweetImgPop");
		if(!div){
			div = QZFL.dom.createElementIn("div",document.body,false,{
				className : "poppic",
				id : "tweetImgPop",
				style : "z-index:9001;display:none",
				innerHTML : [
				'<div id="tweetImg" class="inr"></div>',
				'<div class="supe" style="left:-3px;"><img src="/ac/b.gif" alt=""  class="icons icon_ahead_up" /></div>'
				].join("")
			});
			div.onmouseover = function(){
				clearTimeout(TWT.media.imgHide.timer);
			};
			div.onmouseout = TWT.media.imgHide;
		}
		return div;
	}
	function twShow(){
		var div = getEl();
		var w = parseInt(div.getAttribute("twidth"),10);
		var h = parseInt(div.getAttribute("theight"),10);
		var s = 400 - (new Date() - twShow.start);
		s = Math.max(s,0);
		twShow.timer = setTimeout(function(){
			twShow.timer = null;
			TWT.util.show(div);
			if(isNaN(w) || isNaN(h) || w < 20 || h < 20 || twShow.tw){
				return;
			}
			var img = $("tweetPic");
			var w1 = Math.min(20,w-1);
			var h1 = Math.min(20,h-1);
			var tw = new QZFL.Tween(img,"attr",QZFL.transitions.regularEaseInOut,1,100,0.2);
			tw.onMotionChange = function(o,p,v){
				var per = tw.getPercent() / 100;
				QZFL.dom.setSize(img,w1 + (w - w1) * per,h1 + (h - h1) * per);
			}
			tw.onMotionStop = function(){
				QZFL.dom.setStyle(img,"width","auto");
				QZFL.dom.setStyle(img,"height","auto");
				twShow.tw = null;
			}
			tw.start(false);
			twShow.tw = tw;
		},s);
	}

	TWT.media = {
		nowUrl : '',
		imgPopup : function(url,o){
			try{
				QZONE.FP.toggleDisplay(false,"thpfsr");
			}catch(e){
			}
			var _t = QZONE.FP._t;
			var _lastTween = _t.QZFL.dialog.tween;
			_t.QZFL.dialog.tween = false
			var	w = _t.QZFL.dom.getClientWidth();
			var	h = _t.QZFL.dom.getClientHeight();
			var p = QZFL.dom.getPosition(o);
			var s = QZFL.dom.getXY(frameElement.parentNode);
			p.left += s[0] + 20;
			p.top += s[1] - QZONE.FP.getScrollTop();
			if(ua.ie){
				TWT.data.save("popDialogMid",_t.QZFL.maskLayout.create());
			}
			var param = [
				'url='+url,
				"left="+p.left,
				"top="+p.top,
				"width="+p.width,
				"height="+p.height
			].join("&");
			var dialog = _t.QZFL.dialog.createBorderNone('<iframe allowtransparency="yes" frameborder="no" name="weiboDialogIfm" id="weiboDialogIfm" style="width:100%;height:'+h+'px" src="/qzone/app/weibo/imgView.html#'+param+'"></iframe>',w+30,h);
			if(!ua.ie){
				TWT.util.hide(dialog.dialog);
			}
			function resize(){
				try{
					_t.$("weiboDialogIfm").style.height = _t.QZFL.dom.getClientHeight()+"px";
					_t.$("weiboDialogIfm").style.width = _t.QZFL.dom.getClientWidth()+20+"px";			
					//_t.frames("weiboDialogIfm").document.body.style.width = _t.QZFL.dom.getClientWidth()+"px";
					//_t.frames("weiboDialogIfm").document.body.style.width = _t.QZFL.dom.getClientHeight()+20+"px";
				}catch(e){};
				
			}
			QZFL.event.addEvent(_t,"resize",resize);
			dialog.onUnload = function(){
				QZFL.event.removeEvent(_t,"resize",resize);
				dialog = null;
				TWT.data.del("popDialog");
				try{
					QZONE.FP.toggleDisplay(true,"thpfsr");
				}catch(e){}
				_t.QZFL.dialog.tween = _lastTween;
			}
			if(TWT.data.get("popDialog")){
				TWT.data.get("popDialog").unload();
			}

			TWT.data.save("popDialog",dialog);
			TWT.media.imgHide();
		},
		imgShow : function(url,el,isOnly){
			var t = TWT.media;
			if(t.nowUrl != url)
			{
				t.nowUrl = url;
			}
			else
			{
				clearTimeout(t.imgHide.timer);
			}
			var div = getEl();
			if(div.style.display != "none"){
				return;
			}
			el.onmouseout = t.imgHide;
			var p = QZFL.dom.getPosition(el);
			QZFL.dom.setXY(div,p.left,p.top+22);
			twShow.start = new Date();
			if(t.imgShow.url != url || div.getAttribute("ttop") != p.top){
				div.setAttribute("ttop",p.top);
				t.imgShow.url = url;
				imgLoad(url+"/160",function(u,w,h){
					div.setAttribute("twidth",w);
					div.setAttribute("theight",h);
					$("tweetImg").innerHTML = ['<a href="javascript:void(0);" onclick="',(isOnly?'':(['TWT.media.imgPopup(\'',url,'/2000\',this);'].join(""))),'return false;"><img id="tweetPic" src="',url,'/160" alt="" /></a>'].join("");
					twShow();
				},function(){
					$("tweetImg").innerHTML = ['<a href="javascript:void(0);" onclick="',(isOnly?'':(['TWT.media.imgPopup(\'',url,'/2000\',this);'].join(""))),'return false;"><img id="tweetPic" src="',url,'/160" alt="" /></a>'].join("");
					TWT.util.show(div);
				});
			}else{
				twShow();
			}
		},
		imgHide : function(){
			var t = TWT.media;
			clearTimeout(t.imgHide.timer);
			t.imgHide.timer = setTimeout(function(){
				twShow.tw && twShow.tw.stop();
				clearTimeout(twShow.timer);
				TWT.util.hide("tweetImgPop");
				$e("#tweetImgPop").find(".supe").show();
			},100);
		},
		dialogShow : function(el,isLayout){
			TWT.util.show(el);
			var p1 = QZFL.dom.getPosition(document.body);
			var p2 = QZFL.dom.getPosition(el);
			var left = p1.left+(p1.width-p2.width)/2;
			var _t = QZFL.FP._t;
			var h1 = _t.QZFL.dom.getClientHeight();
			var h2 = QZFL.dom.getXY(frameElement.parentNode)[1];
			var top = QZFL.FP.getScrollTop() - h2 + (h1 - p2.height) / 2;
			if(top < 30){
				top = 30;
			}
			var fix = p2.height * 0.1;
			fix = Math.min(30,fix);
			QZFL.dom.setXY(el,left,top-fix);
			//显示动画
			QZFL.dom.setStyle(el, "opacity", 0);
			var tw = new QZFL.Tween(el, "top", QZFL.transitions.regularEaseIn, top - fix + "px", top + "px", 0.3);
			tw.onMotionChange = function() {
				QZFL.dom.setStyle(el, "opacity", this.getPercent() / 100);
			}
			tw.onMotionStop = function() {
				QZFL.dom.setStyle(el, "opacity", 1);
				tw = null;
			}
			if(!TWT.media.isLoadCss){
				TWT.media.isLoadCss = 1;
				QZFL.css.insertCSSLink("/qzonestyle/global/css/qzfl.css");
			}
			if(isLayout){
				TWT.media._mid = QZFL.maskLayout.create();
			}
			setTimeout(function(){
				tw.start();
			},0);
		},
		dialogHide : function(el,onStop){
			var tw = new QZFL.Tween(el, "opacity", QZFL.transitions.regularEaseIn, 1, 0, 0.3);
			tw.onMotionStop = function() {
				tw = null;
				TWT.util.hide(el);
				(onStop || QZFL.emptyFn)();
			};
			if(TWT.media._mid){
				QZFL.maskLayout.remove(TWT.media._mid);
				TWT.media._mid = null;
			}
			tw.start();
		}
	}
})();
var photoDoctorOk = true;/*  |xGv00|bca621b5dd8f725d6d9e7be3a53535cb */