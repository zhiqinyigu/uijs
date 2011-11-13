/**
 * MI.Sidebar 首页右侧sidebar
 * @namespace MI.Sidebar
 * @type Object
 */
 MI.Sidebar = {
 	_id : null, //页面片id
 	_targetDom : null, //页面片dom
 	_userList : null, //推荐用户列表
 	_userNum : 0, //一屏显示几个人
 	_scene : 0, //上报场景
 	_subName : '', //mi.load加载的url分类类别
	_subRel : '', //mi.load加载的url分类名称
 	_listBtn : UI.html('<a href="#" class="btn_goTypes type1"><b class="sep">|</b><strong>' + _('分类') + '</strong></a>')[0],
 	_listHtml : UI.html('<div class="tjTypeList"><a href="#" class="mobileBox" name="'+_('精选') + '" rel="" type="20">'+_('精选')+'</a><a href="#" class="foFun" name="'+_('娱乐')+'" rel="1.2.4" type="21">'+_('娱乐')+'</a><a href="#" class="foFun" rel="1.2.12" name="'+_('科技')+'" type="22">'+_('科技')+'</a><a href="#" class="foFun" rel="1.2.5" name="'+_('财经')+'" type="23">'+_('财经')+'</a><a href="#" class="foFun" rel="1.2.13" name="'+_('游戏')+'" type="24">'+_('游戏')+'</a><a href="#" class="foFun" rel="1.2.1" name="'+_('体育')+'" type="25">'+_('体育')+'</a><a href="#" class="foFun" rel="1.15.1" name="'+_('传媒')+'" type="26">'+_('传媒')+'</a><a href="#" class="foFun" rel="1.2.6" name="'+_('动漫')+'" type="27">'+_('动漫')+'</a><a href="#" class="foFun" rel="1.2.2" name="'+_('文化')+'" type="28">'+_('文化')+'</a><a href="#" class="foFun" rel="1.11.1" name="'+_('政府')+'" type="29">'+_('政府')+'</a><a href="#" class="foFun" rel="1.2.7" name="'+_('星座')+'" type="30">'+_('星座')+'</a><span  onclick="MI.Bos(\'btnRecommendClass_more\');MI.FeedBack({name:\'class\',iPos:1,iBak1:31,id:1191});" type="31"><a href="http://t.qq.com/people" class="foFun" rel="more" target="_blank" name="'+_('更多')+'">'+_('更多')+'<em class="ffsong">&gt;&gt;</em></a></span></div>')[0],
 	//初始化sidebar部分的dom
 	build : function(id){
 		 var Self = this;
 		 Self._id = id;
 		 Self._targetDom = $(Self._id);
 		 Self._userList = $$(Self._targetDom,'li');
 		 if(Self._id=='star'){
 		 	Self._userNum = 3;
 		 	Self._scene=1;
 		 }
 		 else if(Self._id=='recommend'){ 
 		 	Self._userNum = 4;
 		 	Self._scene=5;
 		 	Self._subName=''; //可能感兴趣的人，暂时不要分类
 		 }
		 if(Self._id == 'star' || Self._id=='recommend'){
		 	Self.delFun(Self._id,Self._subName);	
		 	Self.refresh(Self._id,Self._scene,Self._userNum,Self._subName);
		 	if(window.MILang != 'en_US' && Self._id=='star'){
			 		var btnTitle='',btnDom;
			 		btnDom = $$($(id).parentNode,'.btn')[0];
			 		if(btnDom) btnTitle = UI.A(btnDom,'title');
			 		if(btnDom==null || btnTitle == _('收起')){
				 		Self.changeHrefMore(Self._id,Self._subRel);
				 		Self.addListBtn(Self._id,Self._scene);
			 		}
		 	}
		 	Self.recommendStat(Self._id);
		 	Self.clickEvent(Self._id,Self._scene);
		 	Self.resizeInfo(Self._targetDom);
		 	Self.img(Self._targetDom);
		 }
		 if(Self._id == 'activity')
		 	Self.advertiseHD();
		 else if(Self._id == 'brand')
		 	Self.advertisePP();
 	},
 	//event
 	subClassClick : function(id,scene,subClass){	
 		var Self = this;
 		var userNum;
  		 if(id=='star'){
 		 	userNum = 3;
 		 }
 		 else if(id=='recommend'){ 
 		 	userNum = 4;
 		 }		
	 	UI.each(subClass,function(o,i){
	 		o.onclick = function(){
				var bossName = 'btnRecommendClass_';
	 			var sublist = UI.A(o,'rel');
	 			if(sublist!='more'){
		 			Self._subName = sublist;
		 			var typeNo = UI.A(o,'type');
		 			Self._subRel = UI.A(o,'name');
		 			UI.A($(id) ,'refresh',1);
					$$($(id).parendNode,'.btn_refresh')[0].style.display='';
		 			UI.remove($$($(id),'.tjTypeList')[0]);
		 			//精选展示默认的推荐名人
		 			var url = (sublist=='' ? '/asyn/mysidebar.php' : ('/asyn/mysidebar.php?class=' + sublist));
		 			MI.Load(id,url,id); 	
		 			Self._listBtn.innerHTML = '<b class="sep">|</b><strong>' + Self._subRel + '</strong>';
		 			bossName += sublist;
		 			MI.Bos(bossName);
		 			//delFun 和 refresh重新定义
		 			Self.delFun(id,Self._subName);
		 			Self.refresh(id,scene,userNum,Self._subName);
					MI.feedBack({name:'star',iPos:scene,iBak1:typeNo,id:1191});
		 			return false;
	 			}
	 		};
			o.onmouseover = function(){
				Self.removeLight();
		 		UI.removeClass(o,'foFun');
		 		UI.addClass(o,'mobileBox cur');
			};
	 	});			
 	},
 	removeLight : function(){
	 	var clicked = $$('.tjTypeList .mobileBox');
		if(clicked){
 			UI.each(clicked,function(obj){
 				UI.removeClass(obj,'mobileBox');
 				UI.addClass(obj,'foFun');
 			});
		}
		var cured = $$('.tjTypeList .cur');
		if(cured){
 			UI.each(cured,function(obj){
 				UI.removeClass(obj,'cur');
 			});
		}
 	},
 //拉取分类推荐数据之后，需要改变'更多'的链接到找人页此页卡
 	changeHrefMore : function(id,subname){
 		var morebtn = $$($(id),'.more a')[0];
 		var hrefTxt = '/people?id=', txt ='';
 		if(morebtn){
 			switch(subname){
 				case _('精选'): txt = ''; 
 					break
 				case _('娱乐'): txt = '101'; 
 					break
 				case _('科技'): txt = '105'; 
 					break
 				case _('财经'): txt = '104'; 
 					break
 				case _('游戏'): txt = '110'; 
 					break
 				case _('体育'): txt = '102'; 
 					break
 				case _('传媒'): txt = '294'; 
 					break
 				case _('动漫'): txt = '109'; 
 					break
 				case _('文化'): txt = '106';
 					break
 				case _('政府'): txt = '304'; 
 					break
 				case _('星座'): txt = '111'; 			
 					break
 			}
 			hrefTxt = hrefTxt + txt + '#dtop';
 			if(subname=='' || subname== _('精选'))
 				hrefTxt = 'http://t.qq.com/recommend.php?start=0';
 			UI.A(morebtn,'href',hrefTxt);
 		}
 	},
 	addListBtn : function(id,scene){
 		var Self = this;
 		var sibling = $$(UI.prev($(id)),'.btn_refresh')[0];
 		UI.before(Self._listBtn,sibling);
	 	//分类按钮动作
		 var listBtn = $$(UI.prev($(id)),'.btn_goTypes')[0];
		 if(listBtn){ 
		 	listBtn.onclick = function(){	 			
		 		var tjtype = $$('.tjTypeList')[0];
		 		if(tjtype){
					$$($(id).parendNode,'.btn_refresh')[0].style.display='';
					UI.show($$($(id).parendNode,'.btn_goTypes .sep')[0]);
					UI.show($$($(id),'.more')[0]);
		 			UI.remove(tjtype);
		 			UI.show($$($(id),'ul')[0]);
		 		}
		 		else{
					UI.hide($$($(id),'.more')[0]);
					UI.hide($$($(id).parendNode,'.btn_refresh')[0]);
					UI.hide($$($(id).parendNode,'.btn_goTypes .sep')[0]);
			 		Self.hideAndShow(id,scene);
			 		MI.Bos('btnStarList');
					MI.feedBack({name:'star',iPos:scene,iBak1:13,id:1191}); //上报说明，13为分类
		 		}
		 		return false;
		 	}
		 }
 	},
 	hideAndShow : function(id,scene){
 		var Self = this;
 		var target = $(id);
 		UI.hide($$(target,'ul')[0]);
 		UI.prepend(Self._listHtml,target);
 		//Self.removeLight();
 		var subClass = $$('.tjTypeList .foFun');
		if(subClass){
			Self.subClassClick(id,scene,subClass);
		}
		var special = $$('.tjTypeList .mobileBox');
		if(special){
			Self.subClassClick(id,scene,special);
		}		
 	},
 	clickEvent : function(id,scene){
		var Self = this;
		var targetDom = $(id);
		var moreBtn = $$(targetDom,'.more')[0];
		if(moreBtn){
			moreBtn.onclick = function(){
				id=='star' ? MI.Bos('btnViewMoreStars') : MI.Bos('btnMorerecommend');
				MI.feedBack({name:'star',iPos:scene,iBak1:7,id:1191});
			};
		}
		UI.each($$(targetDom,'.foFun'),function(o,i){
			var del = UI.html('<a href="#" class="foFun disabled">' + _('已收听') + '</a>')[0];
			if(o.style.display=='none') UI.show(del);
			o.onclick = function(){
				var S=this;
				if (!UI.hasClass(S,'disabled')) {
					var boss='';
				   (id=='star') ? boss='btnFollowstar' : boss='btnFollowrecommend';
					var	rel=UI.A(S,'rel');
					MI.Bos(boss,rel||'');
					(id=='star') ? MI.Bos('btnViewstar') : MI.Bos('btnViewrecommend');
					MI.follow(S.href.match(/[^\/]+$/g)[0],S,function(){
						UI.hide(S);
						UI.show(S.nextSibling);
						UI.after(del,o);
						if(id=='star') Self.recBoss(S.href.match(/[^\/]+$/g)[0],i);

					});
				}
				//曝光用户“点击收听”
				var domtemp = $$(UI.parents(o)[1],'.BossHref')[0];
				var account = UI.A(UI.parents(o)[2],'name');
				var uin = UI.A(domtemp,'uin');
				var reason = UI.A(domtemp,'reason');
				if(reason == '') reason = '0';
				reasons = uin + '.' + reason;
				MI.feedBack({name:'star',iPos:scene,iBak1:3,sBak2:reasons,id:1191});
				return false;
			}
			del.onclick = function(){
				return false;
			}
		});
		var tempL = $$(targetDom,'li');
		UI.each(tempL,function(o){
			$$(o,'a')[0].onclick = function(){
					(id=='star') ? MI.Bos('btnViewstar') : MI.Bos('btnViewrecommend');
					//曝光用户点击头像
					var domtemp = $$(UI.parents(o)[1],'.BossHref')[0];
					var account = UI.A(o,'name');
					var uin = UI.A(domtemp,'uin');
					var reason = UI.A(domtemp,'reason');
					if(reason == '') reason = '0';
					var reasons = uin + '.' + reason;
					MI.feedBack({name:'star',iPos:scene,iBak1:2,sBak2:reasons,id:1191});		
			}
		});
		UI.each($$(targetDom,'.BossHref'),function(o){
			o.onclick = function(){
				var	rel=UI.A(this,'rel');
				(id=='star') ? MI.Bos('btnViewstar',rel||'') : MI.Bos('btnViewrecommend',rel||'');
				//曝光用户“点击昵称”
				var domtemp = $$(UI.parents(o)[1],'.BossHref')[0];
				var account = UI.A(UI.parents(o)[2],'name');
				var uin = UI.A(domtemp,'uin');
				var reason = UI.A(domtemp,'reason');
				if(reason == '') reason = '0';
				var reasons = uin + '.' + reason;		
				MI.feedBack({name:'star',iPos:scene,iBak1:5,sBak2:reasons,id:1191});
			}
		});
 	},
 	//点 叉 的动作逻辑
 	/*
	 * @param {String} String 页面片id=》star recommend
	 * @param {String} String 推荐分类的类别代号 =》 1.2.4
 	 */
 	delFun : function(tempId,subName){
 		var target,
 			userNum,
 			id,
 			scene;
 		if(tempId){//内部调用
 			id = tempId;
	 		target = $(id);
	 		if(id=='star'){
		 		userNum = 3;
		 		scene=1;
	 		}
	 		else if(id=='recommend'){ 
		 		userNum = 4;
		 		scene=5;
	 		}
 		}
 		else{
	 		var Self = this;
 			userNum = Self._userNum;
 			id = Self._id;
 			scene = Self._scene;
 		}
	 	UI.each($$(target,'.knownInfo .del'),function(o){
			o.onclick=function(){
				var candidateUser;
				var P = o.parentNode.parentNode;
				if(P.parentNode.childNodes[userNum]){
					candidateUser = P.parentNode.childNodes[userNum];
					UI.after(candidateUser, P);
				}
				UI.animate(P,'opacity',0,function(){
					UI.remove(P);
					var count = 0;
					var userList= $$(target,'li');
					for(var i=0; i < userList.length; ++i)
					{
						if(count >= userNum)
						{
							//单独上报补充的这个用户
							var dom = $$(candidateUser,'.knownInfo .BossHref')[0];
							var reason = UI.A(dom,'reason');
							var uin = UI.A(dom,'uin');
							if(reason == '') reason = '0';
							var reasons = uin + '.' + reason;
							MI.feedBack({name:'star',iPos:scene,iBak1:1,sBak2:reasons,id:1191});
							break;
						}
						UI.show(userList[i]);
						MI.Sidebar.resizeInfo(target);
						count++;
					}
					if(userList.length < userNum){
							UI.A(target,'refresh',1);
							var url = '/asyn/mysidebar.php';
							if(subName){
								var url = url + '?class=' + subName;
							}
							MI.Load(id,url,id);
					}
				});
				var account = UI.A(o.parentNode.parentNode,'name');  
				var urlText = '/api/1.0/recommend/' + account + '/block.json';
				UI.ajax({url:urlText,success:function(){}});
				id=='star' ?  MI.Bos('btnViewstar') : MI.Bos('btnViewrecommend');
				id=='star' ?  MI.Bos('btnStarDelPeople') : MI.Bos('btnPotentialDelPeople');
				//曝光用户“点击叉”
				var reason = UI.A($$(UI.parents(o)[1],'.BossHref')[0],'reason');
				var uin = UI.A($$(UI.parents(o)[1],'.BossHref')[0],'uin');
				if(reason == '') reason = '0';
				var reasons = uin + '.' + reason;
				MI.feedBack({name:'star',iPos:scene,iBak1:6,sBak2:reasons,id:1191});
				return false;
			}
		});
 	},
 	//气泡自适应高度
 	resizeInfo : function(target){
	 	UI.each($$(target,'.kRelaInfo'),function(o){
			var a = $$(o.parentNode,'.topicIntro .middle a')[0];
			if (a){
				a.style.height = UI.height(o) + 'px';
			}
		});		
 	},
 	//换一换逻辑
 	refresh : function(id,scene,userNum,subName){
 		var Self = this;
 		Self._refresh = $$($(id).parentNode,'.btn_refresh')[0];
 		Self._refresh.onclick=function(){
			MI.feedBack({name:'star',iPos:scene,iBak1:9,id:1191});
 			var li = $$($(id),'li');
			var tempnum = userNum*2;
			if(li.length>=tempnum){
				for(var i=0;i<userNum;i++)
					UI.remove(li[i]);
				for(var i=userNum;i<tempnum;i++)
					UI.show(li[i]);
				id=='star' ?  MI.Bos('btnRefreshstar') : MI.Bos('btnRefreshrecommend');
				Self.resizeInfo($(id));
				setTimeout(function(){
					if(subName) Self.delFun(id,subName);
					else Self.delFun(id);
					Self.recommendStat(id); //调用上报逻辑
				},500);
			}
			else {
				UI.A($(id) ,'refresh',1);
				var url = '/asyn/mysidebar.php';
				if(subName){
					var url = url + '?class=' + subName;
				}
				MI.Load(id,url,id);
			}
			Self.img($(id));
			return false;
		}
 	},
 	//曝光用户推荐上报逻辑
 	recommendStat : function(id){
 		var arr = [];
 		var scene;
 		if(id){//如果是内部调用
 			arr = $$($(id),'li');
 			scene = (id=='star') ? 1 : 5;
 		}
 		else{
 			var Self = this;
 			arr = Self._userList;
 			scene = Self._scene;
 		}
		 MI.app({
			 Base:function(){ 
			//页面刷新，增加曝光用户的推荐上报
			var reasons='';
			var len = arr.length;
			for(var i=0;i<len;i++){
				if(!(UI.A(arr[i],'style') && arr[i].style.display=='none')){
					var reason = UI.A($$(arr[i],'.BossHref')[0],'reason');
					var uin = UI.A($$(arr[i],'.BossHref')[0],'uin');
					if(reason == '') reason = '0';
					var account = uin + '.' + reason;
					reasons = reasons + account + ',';
				}
			}	
			var lenAccout = reasons.length;
			var end = reasons.substring(lenAccout-1,lenAccout);
			if(end == ',')
				reasons =  reasons.substring(0,lenAccout-1);
			MI.feedBack({name:'star',iPos:scene,iBak1:1,sBak2:reasons,id:1191});
			}
		});	
 	},
 	img : function(target){
 		var targetDom;
 		if(target) targetDom = target; //如果是内部调用
 		else{
 			 var Self = this;
 			 targetDom = Self._targetDom;
 		}
	 	UI.each($$(targetDom,'img'),function(o){
			var rel=UI.A(o,'rel');
			if(rel){
				UI.A(o,'src',rel);
			}
		});		
 	},
	recBoss : function(toUin, pos)
	{
	    var param = 'tu=' + toUin + '&pos=' +pos;
	    UI.ajax({url:'/asyn/reccomandBoss.php',
	                   type:'get',
	                   data:param,
	                   success:function(data){}});
	},
 	//推荐活动广告投放逻辑
 	advertiseHD : function(){
		var urlText = 'http://l2.l.qq.com/lview?c=weibo&loc=weibo_huodong_TJHD&callback=applyDataActivity&r=' + MI.random();
		UI.getScript(urlText,function(){
		
		});		
		window.applyDataActivity = function (data){
			var isGet = true;
			var activitys = [];
			activitys = data;
			if(!UI.isArray(activitys))
			{
				isGet = false;
			}		
			if (isGet)
			{
				var tempFirst = $$('#activity .knownPeople li');
				UI.each(tempFirst,function(o,i){
					UI.remove(o);
				});
				var isDisplay = true;
				var display = 'style="display: block"';
				UI.each(activitys,function(o,i){
					var oid = o.oid; 
					var loc = o.loc;
					var advertiseId = 'oId="' + oid + '"';
					var location = 'loc="' + loc + '"';
					var activity = [];
					activity = o.fodder[0];
					var name = activity.topic;
					var url = activity.link_to;
					var comment = MI.string.html(activity.info);
					var head = activity.image;
					var starttime, endtime;
					var domHtml =  UI.html('<li ' + advertiseId + location + display + '><div class="userPic"><a href="'+ url + '">'
											+ '<img src="' + head + '" /></a></div>'
											+ '<div class="knownInfo"><p><a href="' + url + '">' + name + '</a></p><p>'
											+ comment + '&nbsp;&nbsp;<a class="ffsong" href="' + url + '">' + _('参加') + '&gt;&gt;</a></p></div></li>')[0];
					//插入到ul中
					// 
					UI.append(domHtml, $$('#activity .knownPeople')[0]);
				});
				//推荐活动曝光收集统计
				var allActivtiy = activitys;
				var urlFirst = 'http://p2.l.qq.com/p.jpg?oid=';
				var urlLast = '&loc=';
				UI.each(allActivtiy,function(obj,i){
						var oid = obj.oid;
						var loc = obj.loc;
						urlFirst += oid;
						urlLast += loc;
				});
				var url = urlFirst + urlLast;
				url +='&r=';
				url += MI.random();
				UI.getScript(url,function(){

				});	
				//推荐广告曝光上报结束
			}
			MI.Load.bottom();
		};
		//“换一换”按钮动作重新定义
		$$($('activity').parentNode,'.btn_refresh')[0].onclick=function(){
			var urltext = 'http://l2.l.qq.com/lview?c=weibo&loc=weibo_huodong_TJHD&callback=applyDataActivity&r=' + MI.random();
			UI.getScript(urltext,function(){
						
						});	
			return false;
		};
 	},
  	//推荐品牌广告投放逻辑
 	advertisePP : function(){
		var urlText = 'http://l2.l.qq.com/lview?c=weibo&loc=weibo_zhanghu_TJPP&callback=applyDataAccount&r=' + MI.random();
		UI.getScript(urlText,function(){
		
		});		
		window.applyDataAccount = function (data){
			var isGet = true;
			var accounts = [];
			accounts = data;
			if(!UI.isArray(accounts))
			{
				isGet = false;
			}		
			if (isGet)
			{


				var isDisplay = true;
				var display = 'style="display: block"';
				UI.each(accounts,function(o,i){
					var oid = o.oid; 
					var loc = o.loc;
					var advertiseId = 'oId="' + oid + '"';
					var location = 'loc="' + loc + '"';
					var user = [];
					user = o.fodder[0];
					var head = user.avatar  + '/50*50';
					var url = user.link_to;
					var comment = user.info;
					var accountName = user.account;
					var nick = user.nick;
	
					//判断用户是不是已收听用户
					var isfollowing = 0;	
					MI.ajax({
							url:'http://t.qq.com/asyn/userRelation.php?r='+ MI.random(),
							type:'get',
							data: {u:accountName},
							success : function(data){
								data = MI.json(data);
								 if(data.result==0){
									for(var obj in data.info)
										isfollowing = data.info[obj][0];
										var followText = '<a class="foFun addAttention" rel="1" href="/' + accountName + '">' + _('+') + _('收听') + '</a>';
										if (isfollowing)
										{
											followText = _('已收听');
										}
										var domHtml =  UI.html('<li ' + advertiseId + location + display + '><div class="userPic"><a rel="' + nick + '(@' + accountName + ')" href="' + url + '">'
																+ '<img src="' + head + '" card="1" ctype="4"/></a></div>'
																+ '<div class="knownInfo"><p><a rel="' + nick + '(@' + accountName + ')" href="' + url + '">' + nick + '</a></p><p>' + followText + '</p><p>'
																+ comment + '</p></div></li>')[0];
														var tempFirst = $$('#brand .knownPeople li');
										UI.each(tempFirst,function(o,i){
											UI.remove(o);
										});
										//插入到ul中
										UI.append(domHtml, $$('#brand .knownPeople')[0]);
										UI.each($$(domHtml,'.foFun'),function(o){
											var del = UI.html('<a href="#" class="foFun disabled">'  + _('已收听') + '</a>')[0];
											if(o.style.display=='none') UI.show(del);
											o.onclick = function(){
													var S=this;
													if (!UI.hasClass(S,'disabled')) {
															var boss='btnFollowrecommend',rel=UI.A(this,'rel');
															if(UI.text(S.parentNode.parentNode).hasString(_('同道中人'))) boss += 'Tag';
															if(UI.text(S.parentNode.parentNode).hasString(_('可能认识'))) boss += 'Qzone';
															MI.Bos(boss,rel||'');
															//帐号广告位收听次数统计
															var parentLi = S.parentNode.parentNode.parentNode;
															var oid = UI.A(parentLi,'oId');
															var loc = UI.A(parentLi,'loc');
															var url = 'http://m.l.qq.com?t=s&mid=100000001&actid=20001&oid=' + oid + '&locid=' + loc;
															UI.getScript(url,function(){
											
															});		
															//统计结束
															MI.follow(S.href.match(/[^\/]+$/g)[0],S,function(){
																	UI.hide(S);
																	UI.show(S.nextSibling);
																	UI.after(del,o);
															});
													}
													return false;
											}
											del.onclick = function(){
												return false;
											}
										});
										MI.Load.bottom();
								 }
							}
						 });
				});
				//推荐帐号 曝光收集统计
				var urlFirst = 'http://p2.l.qq.com/p.jpg?oid=';
				var urlLast = '&loc=';
				var allBrand = accounts;
				UI.each(allBrand,function(obj,i){
						var oid = obj.oid;
						var loc = obj.loc;
						urlFirst += oid;
						urlLast += loc;
				});
				var url = urlFirst + urlLast;
				url += '&r=';
				url += MI.random();
				UI.getScript(url,function(){
	
				});	
				//推荐广告曝光上报结束
			}
		};
		//“换一换”按钮动作重新定义
		$$($('brand').parentNode,'.btn_refresh')[0].onclick=function(){
			var urltext = 'http://l2.l.qq.com/lview?c=weibo&loc=weibo_zhanghu_TJPP&callback=applyDataAccount&r=' + MI.random();
			UI.getScript(urltext,function(){
						
						});	

			return false;
		};		
 	},
 	//以下是勋章提示逻辑
 	medalEvent : function(_body,type){
	 	var close = $$(_body,'.close')[0];
	 	var href = $$(_body,'.hrefid');
		var argu = (type==1 ? 1 :2); 
	 	close.onclick = function(){
	 		UI.remove(_body);
			MI.ajax({
				url:'http://t.qq.com/asyn/userMedalTips.php',
				data:{t:argu},
				type:'get',
				success:function(data){}
			});
	 		return false;
	 	};
	 	UI.each(href,function(o,i){
		 	o.onclick = function(){
		 		var title = UI.A(this,'value1');
		 		var content = UI.A(this,'value2');
		 		MI.talk(title,content,50);
		 		UI.remove(_body);
				MI.ajax({
					url:'http://t.qq.com/asyn/userMedalTips.php',
					data:{t:argu},
					type:'get',
					success:function(data){}
				});
		 		return false;
		 	}
	 	});
	},
	position : function(target,_body,type){
		var _body = _body,
			targetX = UI.getX(target),
			targetY = UI.getY(target),
			targetHeight = UI.height(target),
			_bodyHeight,
			scrollY = UI.scrollY(),
			scrollHack = UI.scrollY(target) - scrollY * (UI.B.safari && !UI.B.ipad ? 2 : 1);
		_body.style.cssText += ';top:' + (type==1 ? (targetY + targetHeight - scrollHack - 15) : (targetY + targetHeight - scrollHack)) + 'px;padding-left:10px;margin:25px 0 0 -39px;width:160px;left:' + ( targetX ) + 'px';
		_bodyHeight = UI.height(_body);
		if (_bodyHeight + UI.getY(_body) > scrollY + UI.windowHeight()) {
			_body.style.top = targetY - _bodyHeight - 5 - scrollHack + 'px';
		}
	},
 	/* 构建勋章提醒展示小黄条
 	 * @param {Object} 对象
 	 * @				{String} 小黄条html内容
 	 * @				{object} 目标dom元素
 	 * @				{type} 小黄条关闭按钮的不同type
 	 */
  	buildTips : function(o){
 		var _body = UI.html(o.content)[0];
 		if(o.target){
 			UI.append(_body,document.body);
 			UI.show(_body);
 			MI.Sidebar.position(o.target,_body,o.type);
 		}
 		MI.Sidebar.medalEvent(_body,o.type);
 	},
 	/* 勋章提醒展示
 	 * @param {Array} 勋章相关信息medalTips=[{'type':1,'value':'','level':''},{'type':2,'value':''},{'type':3,'value':''}]
 	 * 				  type=1:用户等级升级
 	 * 				  type=2:新勋章
 	 * 				  type=3：勋章升级
 	 * @example  MI.Sidebar.medalShow(array);
 	 */
 	medalShow : function(medalTips){
		//英文版不显示勋章提示
		if(window.MILang == 'en_US') return;
 		var Self = this;
 		if(!medalTips) return;
 		UI.css('.mdTips{position:absolute;z-index:9;margin:31px 0 0 -160px;width:210px;padding:10px 20px 10px 40px;border:1px solid #F0E5BA;background:#FFFFE9}.mdTips .close{position:absolute;float:none;margin-top:-2px;right:10px}.mdTips p{text-align:left;color:#333}.mdTips .links{text-align:right}.mdTips .SA{position:absolute;left:180px;top:auto;bottom:9px}.mdTips .SA em,.mdTips .SA span{width:17px;height:19px;color:#F0E5BA}.mdTips .SA span{top:-1px;left:0;color:#FFFFE9}.mdTips .SA.UP{top:-10px;bottom:auto}.mdTips .SA.R{left:30px;right:auto}.mdTips .SA.UP span{top:0}.mdTips .SA.UP em{top:-1px}.mdTips .links a{font-size:12px;margin:3px 0 0 20px;color:#2B4A78;text-decoration:underline}.mdTips .ico_light{position:absolute;left:14px;margin-top:5px}');
 		var tipCommon = _('快发微博炫耀下');
 		var tipMsgUp = _('恭喜升级！');
 		var tips = [];//小黄条提示文本
 		var reportTips = [];//炫耀文本
 		UI.each(medalTips,function(o,i){
 			if(o.type==1){
 				reportTips[o.type] = _('太好了，我的微博等级刚刚升到了{0}级！快来恭喜我一下！',o.level);
 				tips[o.type] = tipMsgUp + '<a href="#"><span class="hrefid" value1="'+ tipCommon + '" value2="' + reportTips[o.type] + '">'  +  tipCommon + '</span></a>';
 			}
 			else if(o.type == 2){
 				reportTips[o.type] = _('太好了，我刚刚获得了{0}勋章！必须炫耀一下！',o.value);
 				tips[o.type] = _('恭喜您获得了{0}勋章！',o.value) + '<a href="#"><span class="hrefid" value1="'+ tipCommon + '" value2="' + reportTips[o.type] + '">'  +  tipCommon + '</span></a>';
 			}
 				else if(o.type == 3){
  					reportTips[o.type] = _('太好了，我刚刚升级了{0}勋章！必须炫耀一下！',o.value);
  					tips[o.type] = _('您的{0}勋章升级了，',o.value) + '<a href="#"><span class="hrefid" value1="'+ tipCommon + '" value2="' + reportTips[o.type] + '">'  +  tipCommon + '</span></a>';
 				}
 		});
 		var html1 = '<div class="mdTips"><a href="#" class="close TipsClose" onclick="return false" title="关闭"></a><div class="SA UP R" style="left:50px"><em>◆</em><span>◆</span></div><div class="cntBox"><p><span>';
 		var html2= '</span></p></div></div>';
 		var target,type;
 		if(tips[1]){//等级有升级
			var levelUpHtml = html1 + tips[1] + html2;
			target = $$('#UIn .ico_level')[0];
			type=1;
			Self.buildTips({
				content : levelUpHtml,
				target : target,
				type : type
			});				
 		}
 		target = $$('#badgeBox .ico_badge')[1];
 		type=2;
		if(tips[2] && tips[3]){
			var modelNewAndUp = html1 + tips[2] + '<br>' + tips[3] + html2;
			Self.buildTips({
				content : modelNewAndUp,
				target : target,
				type : type
			});				
		}
		else if(tips[2]){
			var modelNew = html1 + tips[2] + html2;
			Self.buildTips({
				content : modelNew,
				target : target,
				type : type
			});				
		}
			else if(tips[3]){
				var modelUp = html1 + tips[3] + html2;	
				Self.buildTips({
					content : modelUp,
					target : target,
					type : type
				});				
			}
 	},
 	//将页面上读取得到的字符串转换成对象数组，进行勋章小黄条构建(暂时用不着)直接调用medalShow()
 	medaltips : function(content){
 		 var t = content;
		 if(t != ''){ 
			var str = t.replace(/},{/g,";").replace('[',"").replace('{',"").replace('}',"").replace(']',"");
			var medaltip = [];
			var temp = [];
			temp = str.split(';');
			UI.each(temp,function(o,i){
				var obj = {};
				if(o != ''){
					var index1 = o.indexOf("type");
					if(index1 != -1){
						obj.type = o.substring(index1+6,index1+7);
					}
					var index2  = o.indexOf("level");
					if(index2 != -1){
						obj.level = o.substring(index2+8,index2+9);
					}
					var index3 = o.indexOf("value");
					if(index3 != -1){
						var oq = o.substring(index3+8,o.length-1);
						var index4 = oq.indexOf("\"");
						if(index4 == -1)
							obj.value= oq;
						else 
							obj.value = oq.substring(0,index4-2);
					}
				}
				medaltip[i] = obj;
			})
			MI.Sidebar.medalShow(medaltip);
		}		
 	}
 }
