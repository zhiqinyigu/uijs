MI.TalkListRich = 1;
/*
 视频自动播放目前支持优酷和腾讯网
 flashvars参数：
  isAutoPlay=true //优酷
  auto=1 //腾讯
*/
MI.tmpl.videoTool = '<div class="vTools" style="display:block"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="$VideoRealUrl" class="vUrl" target="_blank"><em></em>$VideoTitle</a></div>';
MI.tmpl.videoThumbs = '<a href="#" class="vThumbs" url="$VideoPlayUrl"><span class="mask"><em></em></span><img src="$VideoPicUrl" /></a>';
MI.tmpl.videoObject = '<object name="$VideoPlayID" id="$VideoPlayID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="460" height="372" ><param name="wmode" value="transparent" /><param name="movie" value="$VideoPlayUrl" /><param name="allowFullScreen" value="true" /><param name="flashvars" value="playMovie=true&amp;isAutoPlay=true&amp;auto=1&amp;autoPlay=true"><param name="swfversion" value="50536.0.0.0" /><param name="expressinstall" value="Scripts/expressInstall.swf" /></object>';
MI.tmpl.videoEmbed = '<embed name="$VideoPlayID" id="$VideoPlayID" src="$VideoPlayUrl" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="460" height="372" allowFullScreen="true" flashvars="playMovie=true&amp;isAutoPlay=true&amp;auto=1&amp;autoPlay=true" wmode="transparent"></embed>';
MI.tmpl.videoHTML5 = '<video width="460" height="362" controls="1" autoplay="autoplay" autobuffer="true" src="$VideoPlayUrl"></video>';
MI.TalkList.prototype._addEvent = function(el){
	var Self = this,
		elId = el.id,
		time = $$(el,'.time'),
		from = $$(el,'.f'),
		view = $$(el,'.view')[0],
		fav = $$(el,'.fav')[0],
		unfav = $$(el,'.light.fav')[0],
		selectFav = $$(el,'.selectCls .popupDropBtn')[0], //收藏页，选择收藏分类
		upTop = $$(el,'.upTop')[0],		//置顶
		unUpTop = $$(el,'.light.upTop')[0], 
		shield = $$(el,'.shield')[0],	//屏蔽
		unshield = $$(el,'.light.shield')[0],  //取消屏蔽
		report = $$(el,'.alarm'),
		viewContent = $$(el,'.talkDetail')[0],
		_viewRelay = $$(el,'.zfNum'),
		viewRelay = _viewRelay[_viewRelay.length - 1],
		viewRelay2 = $$(el,'.zfNum2')[0],
		viewRelayAt = $$(el,'.at_detail')[0],
		content = $$(el,'.msgCnt')[0],
		comt = $$(el,'.comt')[0],
		reply = $$(el,'.reply')[0],
		relay = $$(el,'.relay')[0],
		del = $$(el,'.delBtn')[0],
		moreFun = $$(el,'.mFun a')[0],
		trans = $$(el,'.btn_trans'),
		//moreFun = $$(el,'.moreFun')[0],
		replyMsg = $$(el,'.replyMsg')[0],
		areaInfo = $$(el,'.areaInfo a')[0],
		musicBox = $$(el,'.musicBox,.musicAlbum'),
		voteBox = $$(el,'.voteBox');
	if (from) { // 来自XXX
		UI.each(from,function(o){
			o.onclick = function(){
				try{
					var time = $$(this.parentNode,'.time')[0],id = UI.A(time,'from'),url = UI.A(this,'href'),source = encodeURI(this.innerHTML.replace(_('来自'),'')),user = MI.user.account;
					MI.Bos('http://r.t.qq.com/cgi-bin/v?L=1&F=1&sourceid=' + id + '&source=' + source + '&url=' + url + '&name=' + user);
				}catch(e){}
			}
		});
	}
	if (comt) { // 评论
		comt.onclick = function(){
			if(Self.type == 2) //如果是群内讨论页面的评论
			{
				Self._comt=UI.html(MI.tmpl.reply.replace('<div class="left"></div>','<div class="left"><label for="replayListCheckbox" style="display:"><input id="replayListCheckbox" type="checkbox" class="check1" style="display:none;">'  + '</label></div>'))[0];
			}
			else
			{
				Self._comt=UI.html(MI.tmpl.reply.replace('<div class="left"></div>','<div class="left"><label for="replayListCheckbox" style="display:"><input id="replayListCheckbox" type="checkbox" class="check1">' + _('同时转播') + '</label></div>'))[0];
			}
			Self.creatBox();
			if(Self.isQun==1)
			{
				var wqid=parseInt(UI.A(el,"wqid"));
				Self.comtBox.data.wqid=wqid;
			}
			try{
				Self.curSource = this.href.match(/[^\/]+$/g)[0].match(/[0-9]*[0-9]/g);
			}catch(e){}
			Self.setArrowX(UI.parents(this,'mFun')[0] || this,time);
			Self.comtBox._relayCheck.checked = false;
			Self.comtBox._relayCheck.onclick();
			Self.reply(elId || el,2,UI.A(this,'num'));
			Self.replyCont = this.cont || UI.A(this,'cont');
			Self.replyTarget = this;
			
			MI.Bos('btnComt');
			return false;
		}
	}
	if (reply) { // 对话
		reply.onclick = function(){
			Self.creatBox();
			Self.setArrowX(UI.parents(this,'mFun')[0] || this,time);
			Self.reply(elId || el,0);
			Self.replyCont = this.cont || UI.A(this,'cont');
			Self.replyTarget = this;
			MI.Bos('btnReply');
			return false;
		}
	}
	if (relay) { // 转播
		relay.onclick = function(){
			Self.creatBox();
			if(Self.isQun==1)
			{
				var wqid=parseInt(UI.A(el,"wqid"));
				Self.relayBox.data.wqid=wqid;
			}
			Self.setArrowX(this,time);
			Self.reply(elId || el,1,UI.A(this,'num'));
			Self.replyCont = this.cont || UI.A(this,'cont');
			Self.replyTarget = this;
			
			// 分享到空间
			Self.relayBox._relayCheck.checked = false;
			Self.relayBox.data.share = 0;
			
			MI.Bos('btnRelay','',0.01);
			return false;
		}
	}
	if (view) { // 查看对话
		view.onmouseover = function(){
			if (!UI.hasClass(document.body,'ipad')){
				UI.C(viewContent,'display','block');
			}
			MI.Bos('btnViewReply');
		}
		view.onmouseout = function(){
			UI.hide(viewContent);
		}
		view.style.cursor = 'pointer';
		UI.A(view,'target','_blank');
	}
	if (viewRelay && !viewRelay.innerHTML.hasString(_('对话'))) { // 查看转播
		var relayList,
			relayListLoad,
			relayListCont,
			relayListId = '',
			relayListNum, //Cache View Relay List's Button
			relayTip,
			relayBox,
			delay,
			pageLinkClick = function(){
				Self.msgMode = 0;
				var data = '&r=' + MI.random();
				if (MI.api.type){
					data += '&apiType=' + MI.api.type;
				}
				MI.ajax({
					url : this.href,
					type : 'get',
					data : data,
					success : function(data){
						pageLink(data);
					}
				});
				Self.relayListPosition();
				return false;
			},
			pageLink = function(data){
				data = MI.json(data);
				if (data.result != 0){
					if (data.msg){
						MI.alert(data.msg);
					}
					Self.relayListHide();
					return;
				}
				UI.hide(relayListLoad);
				relayListCont.innerHTML = data.info;
				UI.show(relayListCont);

				//Eval Javascript
				UI.evalScript(data.info);

				//Tips
				//if (UI.B.ipad || MI.S('tips_relayList_' + MI.user.account) == -1) {
					UI.hide($$(relayListCont,'.nfunTips')[0]);
				//}

				//Page Control
				var pages = $$(relayListCont,'.pages a,.tabStyle1 a');
				UI.each(pages,function(o){
					if (!UI.A(o,'target')) {
						o.onclick = pageLinkClick;
					}
					
				});
				//if (!pages.length) {
					var li = $$(relayListCont,'ul.clear li');
					if (li.length) {
						if(Self.type !=1 && Self.type != 2)
						{
							UI.addClass(li[li.length - 1],'nobor');
						}
						UI.each(li,function(o){
							o.onmouseover = function(){
								UI.addClass(this,'subHover');
							}
							o.onmouseout = function(){
								UI.removeClass(this,'subHover');
							}
							try{
								var _relayCite = $$(o,'.relayCite')[0],
									_replyCite = $$(o,'.replyCite')[0],
									_report = $$(o,'.alarm')[0];
								if (_relayCite) {
									_relayCite.onclick = function(){
										UI.show(relayBox._body);
										UI.addClass(relayBox._body,'zfWrap');
										if(UI.hasClass(relayBox._body,'comtWrap'))
										{
											UI.removeClass(relayBox._body,'comtWrap');
										}
										Self.getRelayOld(o,'.content',relayBox);
										relayBox.txtTipSend = _('转播中');
										relayBox.talkId = o.id;

										//Auto Select CheckBox Of Relay
										relayBox._relayCheck.checked = true;
										relayBox._relayCheck.onclick();
										return false;
									}
								}
								if (_replyCite){
									_replyCite.onclick = function(){
										UI.show(relayBox._body);
										UI.addClass(relayBox._body,'zfWrap');
										if(Self.type!=2 && Self.type!=1)
										{
											//UI.addClass(relayBox._body,'comtWrap');
										}
										UI.addClass(relayBox._body,'comtWrap');
										if(Self.type==1 || Self.type == 2)
										{
											if(UI.hasClass(relayBox._body,'zfWrap'))
											{
												//UI.removeClass(relayBox._body,'zfWrap');
												//UI.addClass(relayBox._body,'talkWrap');
											}
										}
										Self.getRelayOld(o,'.content',relayBox);
										relayBox.txtTipSend = _('评论中');
										relayBox.talkId = o.id;
										
										//Auto Select CheckBox Of Relay
										relayBox._relayCheck.checked = false;
										relayBox._relayCheck.onclick();
										return false;
									}
								}
								if (_report){
									_report.onclick = function(){
										if(MI.user.fun.btnStyle==5 || MI.user.fun.btnStyle==6)
										{
											Self.reportQun(o.id,MI.Group.qid,1);
										}
										else
										{
											Self.report(o.id,this);
										}
										return false;
									}
								}
							}catch(e){}
						});
					}
				//}
				
				//Relay Number
				try{
					var relayNum = $$(relayList,'.num')[0],
						relayNumValue,
						relayListNumValue = $$(relayListNum,'.relayNum')[0],
						relay2Num = $$(relayList,'.num2')[0],
						relay2NumValue,
						relay2ListNumValue = $$(el,'.relayNum')[1];
					if (relayNum) {
						relayNumValue = relayNum.innerHTML;
						/*relayListNumValue.innerHTML = relayNumValue != 0 ? relayNumValue : '';
						if (relayNumValue != 0) {
							UI.addClass(viewRelay,'zfNumShow');
						}
						else {
							UI.removeClass(viewRelay,'zfNumShow');
						}*/
						if (relayNumValue == 0 && $$(relayList,'ul li').length == 0) {
							UI.hide($$(relayList,'ul')[0]);
							UI.hide($$(relayList,'.pages')[0]);
						}
						if (relayNumValue > parseInt(relayListNumValue.innerHTML)){
							relayListNumValue.innerHTML = relayNumValue;
						}
					}
					if (relay2Num && relay2ListNumValue){ //二次转播
						relay2NumValue = relay2Num.innerHTML;
						if (relay2NumValue > parseInt(relay2ListNumValue.innerHTML)){
							relay2ListNumValue.innerHTML = relay2NumValue;
						}
					}
				}catch(e){}

				//Relay Box
				var relayBoxTip = $$(relayListCont,'.relayThumb')[0];
				if (relayBoxTip) {
					relayBoxTip.onclick = createRelayBox;
					relayBoxTip.onclick();
				}

				//Disabled dblclick select
				relayListCont.onclick = function(){
					MI.DisableDblClickSelect(this);
				}

				//Build Tips
				Self.buildTips(relayList);
				MI.Card.build(relayList,'.msgCnt strong a,.msgCnt em a,.cNote2 a,.more a',2);
				
				//Show Face
				MI.Crs(1);

				MI.PV('relay');
			},
			createRelayBox = function(){
				UI.hide(this);
				var relay,isRelay = 1;//MI.S('option_relayListCheck_' + MI.user.account) != -1
				if (!this.appended) {
					relay = UI.html(MI.tmpl.reply.replace('talkWrap','zfWrap').replace('<div class="left"></div>','<div class="left" style="display:none"><label for="replayListCheckbox"><input id="replayListCheckbox" type="checkbox"' + (isRelay ? ' checked' : '') + ' class="check1">' + _('同时转播给你的听众') + '</label></div>').replace('talkSuc',''))[0];
					if(Self.type==2)		//群内私聊没有转播
					{
						isRelay = 0;
						relay = UI.html(MI.tmpl.reply.replace('talkWrap','zfWrap comtWrap').replace('<div class="left"></div>','<div class="left" style="display:none"><label for="replayListCheckbox"><input id="replayListCheckbox" type="checkbox"' + (isRelay ? ' checked' : '') + ' class="check1">' + _('同时转播给你的听众') + '</label></div>').replace('talkSuc',''))[0];
					}
					relayTip = $$(relayListCont,'.relayThumb')[0];
					relayBox = new MI.TalkBox(relay);
					if(Self.isQun==1)
					{
						var wqid=parseInt(UI.A(el,"wqid"));
						relayBox.data.wqid=wqid;
					}
					relayBox.countTxt();
					relayBox.txtTipSend = _('转播中');
					relayBox.addList = Self.relayBox.addList;
					//relayBox.talkId = UI.A(viewRelay,'rel');
					relayBox.talkId = elId;
					relayBox.type = 1;
					relayBox.iconPic = Self.iconPic;
					relayBox.autoHeight = 30;
					relayBox._relayCheck = $$(relayBox._body,'.check1')[0];
					relayBox.successStart = function(){
						var refresh = $$(relayListCont,'.refreshBth')[0];
						if (refresh) {
							refresh.onclick();
						}
						if (relayBox.type == 1){
							MI.tip(_('转播成功！'));
							MI.Bos('btnSendRelayList');
						}
						else {
							MI.tip(_('评论成功！'));
							MI.Bos('btnSendComtList');
						}
						Self.updateRelayNum(relayBox.type);
					}
					relayBox.start = function(){
						clearTimeout(delay);
					}
					if (!isRelay) {
						relayBox.type = 4;
						relayBox.addList = 0;
					}
					/*UI.EA(relayBox._txt,'blur',function(){
						if (!relayBox._txt.value) {
							delay = setTimeout(function(){
								UI.hide(relayBox._body);
								UI.show(relayTip); 
							},300);
						}
					});*/
					UI.after(relay,this);
					/*
					if(Self.type==1 && Self.msgMode == 1)
					{
						UI.hide(relay);
						//Self.msgMode = 0;
						relay.blur();
					}
					else
					{
						UI.show(relay);
					}
					*/
					relayBox._body.ondblclick = function(e){
						UI.E(e).stop();
					}
					if (!UI.B.ie) {
						relayBox._body.onmousedown = function(e){
							UI.E(e).stop();
						}
					}
					setTimeout(function(){
						Self.getRelayOld(el,'.msgBox .msgCnt',relayBox);
					},100);

					//同时转播给你的听众
					relayBox._relayCheck.onclick = function(){
						var checked = this.checked;
						relayBox.type = checked ? 1 : 4;
						relayBox._tip.innerHTML = '';
						relayBox.countTxt();
						relayBox.addList = checked ? Self.relayBox.addList : 0;
						//MI.S('option_relayListCheck_' + MI.user.account,checked ? 1 : -1);
						MI.Bos('btnRelayistCheckbox');
					}
					this.appended = 1;
					if (!Self.relayListMulti){
						Self.talkBox = relayBox;
					}
				}
				else {
					UI.show(this.nextSibling);
				}
			};
		viewRelay.onclick = function(e){
			var E = UI.E(e),
				userClick = E.type;
			Self.msgMode = userClick ? 0 : 1;
			if (!relayList){ //设置转播列表DOM
				if (Self.relayListMulti){
					relayListId = elId;
				}
				if (!Self['_relayList' + relayListId] || Self.relayListMulti){
					Self.relayListCreate(relayListId);
				}
				relayList = Self['_relayList' + relayListId];
				relayListLoad = Self['_relayListLoad' + relayListId];
				relayListCont = Self['_relayListCont' + relayListId];
			}
			if (Self.xhr.relay && !Self.relayListMulti) {
				Self.xhr.relay.abort();
			}
			var href = this.href,
				id = href.match(/[^\/]+$/g)[0],
				li = id == elId ? id : elId,
				Y,
				windowHeight = UI.windowHeight(),
				scrollTop,
				relayListOption,
				Time,Time_1,Time_2,Time_3;
			if (Self.relayListOption){
				relayListOption = {};
				for (var i in Self.relayListOption){
					relayListOption[i] = Self.relayListOption[i];
				}
			}
			UI.A(this,'rel',id);
			relayListNum = this;
			if ((!Self.relayAtCur || !relayListOption) && ((userClick && !Self.relayListSpecial) || (!userClick && Self.relayListSpecial)) && relayList.display && (Self.cur == li || Self.relayListMulti)) {
				$$(relayList,'.w_close')[0].onclick();
			}
			else {
				UI.removeClass($(Self.cur),'cur');
				UI.remove(Self._confirm);
				Self.replyHide();
				if (Self.talkBox) {
					Self.talkBox.hide();
				}

				//$$(relayList,'.left a')[0].href = href;
				//$$(this,'.relayNum')[0].innerHTML;
				UI.hide(relayListCont);
				UI.show(relayListLoad);
				UI.append(relayList,$$(el,'.msgBox')[0]);
				
				Time = + new Date();
				
				var ajaxUrl = MI.url.relayList, //请求地址
					messageUrl = { //请求参数
						id : id,
						viewModel : Self.iconPic,
						r : MI.random()
					};
				if (MI.api.type){
					messageUrl.apiType = MI.api.type;
				}
				if(Self.type==2){
					messageUrl.zone = 2;
				}
				if (relayListOption){ //如果是At聚合
					ajaxUrl = relayListOption.url;
					if (relayListOption.data){
						for (var i in relayListOption.data){
							messageUrl[i] = relayListOption.data[i]
						}
					}
				}
				
				/*
				if(Self.type == 1 && Self.msgMode != 0)
				{
					messageUrl += '&pi=0';
				}*/
				
				//拉取转播列表
				Self.xhr.relay = MI.ajax({
					url : ajaxUrl,
					type : 'get',
					data : messageUrl,
					success : function(data){
						Time_1 = + new Date() - Time;
						pageLink(data);
						if (relayListOption && relayListOption.call){
							relayListOption.call();
						}
						
						//Speed
						Time_2 = + new Date() - Time;
						setTimeout(function(){
							Time_3 = + new Date() - Time;
							MI.Speed('t_asyn_relay',0.1,Time_1,Time_2,Time_3);
						},0);
					}
				});
				
				scrollTop = UI.scrollY();
				Y = UI.getY(this);
				if (Y && Y < scrollTop) { //(Y > scrollTop + windowHeight * 3 / 4) || 
					window.scrollTo(0,Y);
				}

				UI.addClass(el,'cur');
				Self.cur = li;
				relayList.display = 1;
			}
			Self.relayListPosition = function(){ //列表定位
				var Y = UI.getY(viewRelay);
				if (Y && UI.scrollY() > Y) {
					window.scrollTo(0,Y);
				}
			}
			
			try{
				Self.focus();
			}catch(e){}
			
			E && E.stop();
			if (userClick){
				Self.relayListSpecial = 0;
			}
			Self.relayListOption = null;
			
			MI.Bos('btnViewRelay');
			return false;
		}
	}
	if (viewRelay2 && viewRelay2.nodeName == 'A'){ //二次转播
		viewRelay2.onclick = function(){
			Self.relayListOption = {
				url : MI.url.relayListSecond, //请求地址
				data : { //请求参数
					id : elId
				},
				call : function(){ //回调函数
					
				}
			}
			if (Self.relay2Cur && Self.relay2Cur == this){ //隐藏列表
				Self.relayListHide();
			}
			else { //显示列表
				if (relayList){
					relayList.display = 0;
				}
				viewRelay.onclick();
				Self.relay2Cur = this;
			}
			Self.relayListSpecial = 1;
			MI.Bos('btnViewRelay2');
			return false;
		}
	}
	if (viewRelayAt){ //At聚合
		UI.each($$(viewRelayAt,'a'),function(o){
			o.onclick = function(e){
				Self.relayListOption = {
					url : MI.url.relayListAt, //请求地址
					data : { //请求参数
						type : UI.A(this,'rel') || 0, //类型
						viewModel : Self.relayAtModel //只看有理由的
					},
					call : function(){ //回调函数
						var relayListAtNumValue = $$(o,'em')[0], num, next;
						if (relayListAtNumValue){
							num = UI.A(o, 'num');
							if (num){ // 有数字的一定是“全部提到我的” 除了转化本身的数字提示之外还要清空收听的人和认证用户的聚合数字
								relayListAtNumValue.innerHTML = '(' + num + ')';
								UI.addClass(relayListAtNumValue, 'checked');
								next = o.nextElementSibling; // 选取出下一个A，收听的人
								while(next){
									$$(next, 'em')[0].innerHTML = ''; // 删掉+1提示
									next = next.nextElementSibling; // 选取出下一个A，认证用户
								}
							}else{ // “收听的人”和“认证用户”被点击只需要清空+1提示
								relayListAtNumValue.innerHTML = '';
							}
							
						}
					}
				}
				if (Self.relayAtCur && Self.relayAtCur == this){ //隐藏列表
					Self.relayListHide();
				}
				else { //显示列表
					if (relayList){
						relayList.display = 0;
					}
					viewRelay.onclick();
					Self.relayAtCur = this;
				}
				Self.relayListSpecial = 1;
				MI.Bos('btnViewRelayAt');
				return false;
			}
		});
	}
	if (moreFun) { // 更多
		var moreFunWrap = moreFun.parentNode,
			moreFunDelay,
			moreFunOpenDelay;
		moreFun.onclick = function(e){
			clearTimeout(moreFunDelay);
			var T = this;
			moreFunOpenDelay = setTimeout(function(){
				Self.moreFun(T.parentNode,elId || el);
				MI.Bos('btnMoreFun',null,0.01);
			},150);
			if (UI.hasClass(T.parentNode,'mFunDis')){
				if (UI.hasClass(document.body,'ipad')){
					setTimeout(function(){
						UI.removeClass(T.parentNode,'mFunDis');
					},200);
				}
				UI.E(e).stop();
			}
			return false;
		}
		if (!UI.hasClass(document.body,'ipad')){
			moreFun.onmouseover = moreFun.onclick;
			moreFun.onmouseout = function(e){
				clearTimeout(moreFunOpenDelay);
			}
			moreFunWrap.onmouseover = function(){
				clearTimeout(moreFunDelay);
			}
			moreFunWrap.onmouseout = function(e){
				moreFunDelay = setTimeout(function(){
					clearTimeout(moreFunOpenDelay);
					Self.moreFunHide();
				},100);
			}
		}
	}
	UI.each(trans,function(o){
		o.onclick = function(){
			Self.trans.show(this);
			return false;
		}
		o.onmouseover = function(){
			Self.trans.show(this);
			return false;
		}
		o.onmouseout = function(){
			Self.trans.hide();
			return false;
		}
	})
	if (fav) { // 收藏
		fav.type = 1;
		fav.innerHTML = (UI.hasClass(fav,'light') ? _('取消收藏') : _('收藏'));
		fav.onclick = function(e){
			if(Self.isQun==1)
			{
				var wqid=parseInt(UI.A(el,"wqid"));
				MI.Group.qid=wqid;
			}
			Self.fav(elId,this.type);
			UI.E(e).stop();
			MI.Bos('btnFav');
			return false;
		}
		fav.onmouseover = MI.hideFocus;
	}
	if (unfav) { // 取消收藏
		unfav.onclick = function(){
			Self.unfav(elId);
			//Self.fav(elId,2);
			return false;
		}
		unfav.onmouseover = MI.hideFocus;
	}
	if (selectFav) { //选择收藏分类
		selectFav.onclick = function(){
			Self.selectFav(this);
			return false;
		}
	}
	if (upTop) { // 置顶
		upTop.innerHTML = (UI.hasClass(upTop,'light') ? _('取消置顶') : _('置顶'));
		upTop.type = UI.hasClass(upTop,'light') ? 9 : 8;
		upTop.onclick = function(e) {
			if(Self.isQun==1)
			{
				var wqid=parseInt(UI.A(el,"wqid"));
				MI.Group.qid=wqid;
			}
			Self.upTop(elId,this.type);
			UI.E(e).stop();
			MI.Bos('btnUpTop');
			return false;
		}
		upTop.onmouseover = MI.hideFocus;
	}
	/*
	if (unUpTop) {	//删除置顶
		unUpTop.onclick = function(){
			alert(1);
			if(Self.isQun==1)
			{
				var wqid=parseInt(UI.A(el,"wqid"));
				MI.Group.qid=wqid;
			}
			Self.confirm(elId,8);
			MI.Bos('btnUnUpTop');
			return false;
		}
	}
	*/
	if (shield) { // 屏蔽
		shield.type = UI.hasClass(shield,'light') ? 5 : 4;
		shield.innerHTML = (UI.hasClass(shield,'light') ? _('取消屏蔽') : _('屏蔽@提醒'));
		shield.onclick = function(e){
			if(Self.isQun==1)
			{
				var wqid=parseInt(UI.A(el,"wqid"));
				MI.Group.qid=wqid;
			}
			if(this.type == 4)
				Self.confirm(elId,this.type);
			else{
				Self.remove(elId,this.type);
				UI.E(e).stop();
			}
			MI.Bos('btnShield');
			return false;
		}
		shield.onmouseover = MI.hideFocus;
	}
	if (unshield) { // 取消屏蔽
		unshield.type = 5;
		unshield.onclick = function(){
			if(Self.isQun==1)
			{
				var wqid=parseInt(UI.A(el,"wqid"));
				MI.Group.qid=wqid;
			}
			//var talk = $(elId);
			Self.confirm(elId,6);	
			MI.Bos('btnUnShield');	
						
			return false;
		}
		unshield.onmouseover = MI.hideFocus;
	}
	if (del) { // 删除
		del.onclick = function(){
			if(Self.isQun==1)
			{
				var wqid=parseInt(UI.A(el,"wqid"));
				MI.Group.qid=wqid;
			}
			Self.confirm(elId);
			if (MI.talkBox && MI.talkBox.type == 6){
				MI.Bos('btnNotepadDel');
			}
			else {
				MI.Bos('btnDel');
			}
			return false;
		}
	}
	if (report.length) { // 举报
		UI.each(report,function(o){
			o.onclick = function(){
				if((MI.user.fun.btnStyle==5 || MI.user.fun.btnStyle==6) )
				{
					Self.reportQun(el.id, MI.Group.qid, 1);
					MI.Bos('btnReport_ qun');
				}
				else
				{
					Self.report(elId,this);
					MI.Bos('btnReport');
				}
				return false;
			}
		});
	}
	if (content && content.innerHTML == '') {
		//UI.hide(content);
		content.innerHTML = '&nbsp;';
	}
	if (replyMsg) { // 回信、修改记事本
		replyMsg.onclick = function(){
			if (MI.talkBox){
				if (MI.talkBox.type == 6){
					MI.dialog.show({width:560,title:'<h1 class="DmainTit">' + _('修改记事本') + '</h1>',html:$('talkBoxMsg')});
					MI.talkBoxMsg._txt.value = UI.text($$(el,'.msgCnt')[0]);
					MI.talkBoxMsg.talkId = elId;
					MI.talkBoxMsg.countTxt();
					MI.talkBoxMsg.successStart = function(data){
						$$(el,'.msgCnt')[0].innerHTML = MI.string.html(data.info.talk[0].content);
						MI.tip(_('修改成功'));
					}
					MI.focus(MI.talkBoxMsg._txt);
					MI.Bos('btnNotepadEdit');
				}
				else {
					MI.talkBox._msgTo.value = UI.A(this,'rel');
					UI.removeClass(MI.talkBox._btn,'btnNoStr');
					MI.talkBox._txt.value = '';
					MI.talkBox.countTxt();
					if (MI.dialog) {
						MI.dialog.show({width:560,html:$('talkBoxMsg')});
						//MI.talkBox._msgTo.focus();
						//UI.hide(MI.talkBox._msgTo.previousSibling);
						try{setTimeout('MI.talkBox._txt.focus()',0);}catch(e){};
						MI.talkBox.getMsgTo();
					}
					MI.Bos('btnReplyMsg');
				}
			}
			return false;
		}
	}
	if (areaInfo) {
		areaInfo.onclick = function(){
			Self.geolocation.show(this);
			return false;
		}
	}
	if (musicBox) {
		MI.TalkList.musicEvent(musicBox);
	}
	if (voteBox) {
		MI.TalkList.voteEvent(voteBox);
	}
	
	//Card And Tips
	Self.card(el);
	Self.buildTips(el);
	
	//Add Time Title
	for (var i = 0,num = time.length;i < num;i++) {
		if (!UI.A(time[i],'rel')) {
			UI.A(time[i],'rel',UI.A(el,'rel'));
		}
		var timeObj = UI.zoneDate(UI.A(time[i],'rel') + '000',8);
		time[i].title = UI.formatDate(timeObj,_('yyyy年M月d日 hh:mm'));
		Self.time.push(time[i]);
		time[i].onclick = timeBos;
	}
	function timeBos(){
		if (this.nodeName == 'A') {
			MI.Bos('btnTime');
		}
	}
}
MI.TalkList.voteEvent = function(voteBox){
	var Self = this;
	for (var i = 0,num = voteBox.length;i < num;i++) {
		var curBox = voteBox[i],
		vThumbsBox = $$(curBox,'.vtThumbs')[0],
		vTools = $$(curBox,'.vTools')[0],
		vClose = $$(curBox,'.vClose')[0];
		vThumbsBox.onclick = function(){
			MI.TalkList.vote(this);
			return false;
		}
		vClose.onclick = function(){
			MI.TalkList.voteClose(this);
			return false;
		}
	}
}
MI.TalkList.musicEvent = function(musicBox){
	var Self = this;
	for (var i = 0,num = musicBox.length;i < num;i++) {
		var musicBoxCur = musicBox[i];
		var mThumbsBox = $$(musicBoxCur,'.albumInfo .mThumbsBox')[0];
		if (mThumbsBox){ //歌单
			var albumPic = $$(musicBoxCur,'.albumPic a')[0],
			albumPicImg = $$(musicBoxCur,'.albumPic img')[0],
			albumInfo = $$(musicBoxCur,'.albumInfo .songTit a')[0];
			mThumbsBox.onclick = albumPic.onclick = albumInfo.onclick = function(){
				MI.app({
					Music : function(){
						MI.TalkList.music(musicBoxCur);
					}
				});
				return false;
			}
			if (albumPicImg){
				albumPicImg.onerror = function(){
					this.src = 'http://mat1.gtimg.com/www/mb/images/music_none.png';
					this.onerror = null; 
				}
			}
		}
		else { //歌曲
			mThumbsBox = $$(musicBoxCur,'.mThumbsBox')[0];
			var mBox = $$(musicBoxCur,'.mBox')[0],
			//bThumbs = Number(mThumbsBox.getAttribute('thumbs')),
			//mSimple = $$(mThumbsBox,'.mSimple')[0],
			//mThumbs = $$(mThumbsBox,'.mThumbs')[0],
			//mSimplePic = $$(mSimple,'img')[0],
			mTitBox = $$(mBox,'.mTitBox')[0],
			mClose = $$(mBox,'.btn_mClose')[0],
			mPlay = $$(mBox,'.btn_mPlay')[0],
			mPause = $$(mBox,'.btn_mPause_hover')[0],
			ico_music = $$(musicBoxCur.parentNode.parentNode,'.msgCnt .ico_music')[0] || $$(musicBoxCur.parentNode.parentNode,'.msgCnt .ico_qlz')[0];
			/*mSimplePic.onload = function(){
				UI.show(mSimple);
			}
			mSimplePic.onerror = function(){
				mSimple.innerHTML = _('播放音乐');
				UI.show(mSimple);
			}
			*/
			mThumbsBox.onclick = mPlay.onclick = function(){
				MI.app({
					Music : function(){
						MI.TalkList.music(musicBoxCur);
					}
				});
				return false;
			}
			if(ico_music){
				ico_music.onclick  = function(){
			//获取是否已经展开了音乐
			if(musicBoxCur && musicBoxCur.isOpen) {
			  try{Self.musicClose()} catch(e){}
			} else {
			  Self.music(musicBoxCur);
			}
					return false;
				}
			}
			mPause.onclick = function(){
				MI.TalkList.musicStop();
				return false;
			}
			mClose.onclick  = function(){
				MI.TalkList.musicClose();
			}
			var musicLink = $$(musicBoxCur.parentNode.parentNode,'.msgCnt .ico_qlz');
			UI.each(musicLink,function(o){
				o.title = _('绿钻贵族分享的高品质音乐，欢迎收听');
				//UI.before(UI.html('<span>（' + _('QQ音乐高品质试听') + '）</span>')[0],o);
			})
		}
	}
}
MI.mediaMutex = function(obj,b){
	var p = UI.parents(obj,'mediaWrap')[0];
	if(!p)	return;
	var s = ['picBox','videoBox'];
	for(var i=0,l=s.length;i<l;i++){
		if(!b){
			if(!UI.parents(obj,s[i])[0]){
				UI.hide($$(p,'.'+s[i])[0]);
				if(s[i] == 'picBox'){
					var picBox = $$(p,'.'+s[i])[0];
					if(picBox){
						if(UI.hasClass(picBox,'big')){
							UI.removeClass(picBox,'big');
						}
						var canvas = $$(picBox,'canvas')[0];
						if(canvas){
							UI.hide(canvas);
						}
					}
				}
			}else{
				UI.show($$(p,'.'+s[i])[0]);
			}
		}else{
			UI.show($$(p,'.'+s[i])[0]);
		}
	}
	
}
//video event process
MI.TalkList.videoUrlVoid = function(a){ //Video url
	var url = a;
	var r = /http:\/\/([^\/]+)\//i;
	var h = url.match(r);
	var c = '';
	if(!h[1])	return c;
	var m = ['qq.com','tudou.com','youku.com','56.com','tudou.com','ku6.com','yinyuetai.com','sohu.com','joy.cn','6.cn'];//从tudou开始为新添加的
	for(var i=0,n=m.length;i<n;i++){
		var patt = new RegExp(m[i]);
		if(patt.test(h[1])){
			c = m[i].split('.')[0];
			break;
		}
	}
	return c;
}
MI.TalkList.videoVid = function(a){ //Video url
	var url = a;
	var c = '';
	var reg = new RegExp("(^|&)vid=([^&]*)(&|$)"); 
	var r = url.split("?")[1].match(reg);
	if(r[2])	c = r[2];
	return c;
}
MI.TalkList.video = function(a,b){ //Video Event
	//关闭正在播放的音乐
	try{MI.TalkList.musicClose()}catch(e){}
	//关闭正在播放的其他视频
	try{MI.TalkList.videoClose();}catch(e){}
	var _this = a;
	var box;
	if(b == 1){
		box = $$(_this.parentNode.parentNode,'.videoBox')[0];
	}else if(b == 2){
		box = _this.parentNode.parentNode;
	}
	box.isOpen = true; //设置展开视频的状态位
	MI.TalkList.lastVideo = box;
	//MI.TalkList.videoCheck();//close last video
	var vUrl = box.getAttribute('playurl');
	var vMp4Url;
	var videoSource = MI.TalkList.videoUrlVoid(vUrl);
	if(videoSource == 'qq' && UI.B.ipad){
		var vid = MI.TalkList.videoVid(vUrl);
		var aysn = 'http://vv.video.qq.com/geturl';
		var url = aysn + "?vid="+vid+"&callvar=QZOutputJson&otype=json&r="+MI.random();
		//http://vv.video.qq.com/geturl?vid=Z0090YD4GeT&otype=json
		var c = '';
		UI.getScript(url,function(){//get html5 video
			vMp4Url = QZOutputJson.vd.vi[0].url;
			if(vMp4Url){
				MI.TalkList.videoOpen(_this,b,vMp4Url,'mp4');
			}
		});
	}else{
		MI.TalkList.videoOpen(_this,b,vUrl,'flash');
	}

	return false;
}
MI.TalkList.videoOpen = function(vCon,cType,vUrl,vType){
	var _this = vCon;
	var _videoObject;
	if(vType == 'mp4'){
		_videoObject = MI.tmpl.videoHTML5;
	}else{
		_videoObject = UI.B.ie ? MI.tmpl.videoObject : MI.tmpl.videoEmbed;
	}
	var box,vBox,flash;
	if(cType == 1){
		box = $$(_this.parentNode.parentNode,'.videoBox')[0];
	}else if(cType == 2){
		box = _this.parentNode.parentNode;
	}
	var vWrap = $$(box,'.vWrap')[0],vBox = $$(box,'.vBox')[0],vThumbsBox = $$(box,'.vThumbsBox')[0];
	var vBoxCon = UI.html('<div class="vBox" style="display:block"></div>')[0];
	
	var picurl = unescape(box.getAttribute('minipicurl')),playurl = vUrl ? vUrl : unescape(box.getAttribute('playurl')),realurl = unescape(box.getAttribute('realurl')),title = box.getAttribute('title')?box.getAttribute('title'):box.getAttribute('reltitle'),title = MI.string.cut(title,40),shorturl=unescape(box.getAttribute('shorturl'));//video 路径
	//视频自动播放url修改	
	var oUrl = box.getAttribute('playurl');
	var videoSource = MI.TalkList.videoUrlVoid(vUrl);
	var getVideoId = function(url,index){return url.split('/')[index];}
	var videoId = 'VideoPlay' + MI.random();

	switch(videoSource){
		case 'tudou':
			vUrl = 'http://www.tudou.com/v/'+getVideoId(oUrl,4)+'/&autoPlay=true/v.swf';	
			break;

		case 'ku6':
			vUrl = 'http://player.ku6.com/refer/'+getVideoId(oUrl,4)+'/v.swf&auto=1';	
			break;

		case '6':
			vUrl = vUrl + '&flag=1';	
			break;

		case 'joy':
			vUrl = 'http://client.joy.cn/flvplayer/v20081022.swf?strvid='+getVideoId(oUrl,4).slice(0,7)+'&playstatus=1';	
			break;

		case 'sohu':
			vUrl = 'http://www.yinyuetai.com/swf/explayer.swf?videoId='+getVideoId( oUrl,3)+'&autostart=true';
			break;

		case 'yinyuetai':
			vUrl = 'http://www.yinyuetai.com/swf/explayer.swf?videoId='+getVideoId(oUrl,5)+'&autostart=true';
			break;
	}

	if(cType == 1){
		var tTools = $$(box,'.vTools')[0],flash = _videoObject.replace(/\$VideoPlayID/g,videoId).replace(/\$VideoPlayUrl/g,playurl).replace(/\$MiniPic/g,picurl);
		//var oTools = UI.html(MI.tmpl.videoTool.replace('$VideoTitle',escape(title)).replace('$VideoRealUrl',encodeURI(realurl)))[0],vClose = $$(oTools,'.vClose')[0];
		if(vThumbsBox){
			//vSimple.setAttribute('url',playurl);//多视频时使用。目前只显示单个视频，先注释掉。
			UI.hide(vThumbsBox);
		}
		//UI.replace(oTools,tTools);
		//vClose.onclick = MI.TalkList.videoClose;
		UI.show(tTools);
		if(box.play){
			var a=$$(_this.parentNode.parentNode,'.videoBox')[0];
			var c=$$(a,'.vClose')[0];
			try{
				MI.TalkList.videoClose(c,1);
			}catch(e){
				//alert(e)
			}
			box.play = 0;
			return false;
		}
		if(!vBox){
			UI.append(vBoxCon,vWrap);
		}
	}else if(cType == 2){
		var tools = $$(box,'.vTools')[0];
		flash =_videoObject.replace(/\$VideoPlayID/g,videoId).replace(/\$VideoPlayUrl/g,playurl);
		if(box.play){
			box.play = 0;
			return false;
		}
		UI.hide(vThumbsBox);
		tools.style.display = 'block';
		if(!vBox){
			UI.append(vBoxCon,vWrap);
		}
	}
	box.play = 1;
	UI.addClass(box,'vPlay');
	if(!UI.B.ipad)	UI.addClass($$(box,'.vBox')[0],'loading');
	if((UI.B.ipad && vType == 'flash') || (MI.noFlash() && vType != 'mp4')){
		flash = '<div style="font-size:14px;padding:20px 0;background:#F9F9F9;margin:5px;">' + _('对不起，由于您的浏览器未安装Flash播放器，不支持播放。<br>建议您尝试来源网页：') + '<a href="http://url.cn/' + shorturl + '" target="_blank">http://url.cn/' + shorturl + '</a></div>';
	}
	vBoxCon.innerHTML = flash;
	MI.mediaMutex(vWrap);
	//MI.Bos('btnVideoView',shorturl);
	MI.Bos('btnVideoView',escape(realurl));
	return false;
}
MI.noFlash = function(){
	var MM_contentVersion = 6;
	var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"])
			? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin
			: 0;
	if (plugin) {
		var words = navigator.plugins["Shockwave Flash"].description.split(" ");
		for (var i = 0; i < words.length; ++i) {
			if (isNaN(parseInt(words[i])))
				continue;
			var MM_PluginVersion = words[i];
		}
		var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
	} else if (window.ActiveXObject){
		try{
			var obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			MM_FlashCanPlay = true;
		}catch(e){
			MM_FlashCanPlay = false;
		}
		
	}
	MI.noFlash = function(){
		return !MM_FlashCanPlay;
	}
	if (MM_FlashCanPlay) {
		return false;
	} else {
		return true;
	}
}
MI.TalkList.videoClose = function(a,b){
	/*var _this = b ? a : this;
	var p = _this.parentNode.parentNode;
	var vWrap = $$(p,'.vWrap')[0];
	var bThumbs = Number(vWrap.getAttribute('thumbs'));
	var vThumbsBox = $$(p,'.vThumbsBox')[0];//this.parentNode.nextSibling.firstChild;
	var tools = _this.parentNode;
	var box = _this.parentNode.parentNode;
	var vBox = $$(box,'.vBox')[0];*/
	var box = MI.TalkList.lastVideo;
	var vWrap = $$(box,'.vWrap')[0],vBox = $$(box,'.vBox')[0],vThumbsBox = $$(box,'.vThumbsBox')[0],tools = $$(box,'.vTools')[0],vThumbs = $$(vThumbsBox,'.vThumbs')[0],thumbs = $$(vThumbs,'img')[0];
	box.play = 0;
	UI.removeClass(box,'vPlay');
	UI.removeClass(vBox,'loading');
	vThumbsBox.style.display = 'inline';
	MI.TalkList.resizePic(thumbs);
	tools.style.display = 'none';
	UI.remove(vBox);
	MI.mediaMutex(vWrap,1);
	MI.TalkList.lastVideo.isOpen = false;  //关闭视频展开的状态位
	return false;
}