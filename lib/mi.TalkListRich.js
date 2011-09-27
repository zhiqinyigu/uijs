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
MI.TalkList.prototype.creatBox = function(){
	var Self = this,
		box = [new MI.TalkBox(Self._talk),new MI.TalkBox(Self._relay),new MI.TalkBox(Self._comt)];
	UI.each(['replyBox','relayBox','comtBox'],function(o,i){
		for (var j in Self[o]){
			box[i][j] = Self[o][j];
		}
		Self[o] = box[i];
	});

	//Count TalkBox's Type For Product
	//Self.replyBox.countType = 3;
	//Self.relayBox.countType = 4;

	Self.replyBox.autoHeight = 30;
	Self.relayBox.autoHeight = 136;
	Self.comtBox.autoHeight = 136;
	Self.replyBox.txtTipSend = _('发送中');
	Self.relayBox.txtTipSend = _('转播中');
	Self.comtBox.txtTipSend = _('评论中');
	Self.replyBox._btn.title = _('发送');
	Self.relayBox._btn.title = _('转播');
	Self.comtBox._btn.title = _('评论');
	if(Self.type == 1 || Self.type == 2)
	{
		Self.comtBox._btn.title = _('评论');
	}
	Self.replyBox.hideCall = Self.relayBox.hideCall = Self.comtBox.hideCall = function(){
		UI.removeClass($(Self.cur),'cur');
	};
	Self.replyBox.start = Self.relayBox.start = Self.comtBox.start = function(){
		Self.checkTalkId();
		Self.updateRelayNum();
		Self.talkBox._txt.blur();
		Self.focus();
	}
	Self.replyBox.success = Self.relayBox.success = Self.comtBox.success = function(data){
		Self.talkBox.hide();
		Self.talkBox.display = 0;
		UI.removeClass($(Self.cur),'hover');
		if (Self._relayNum) {
			UI.each(Self._relayNum,function(o,i){
				if (!(Self.talkBox.type != 1 && i)){ //评论的二次转播数不+1
					MI.countNum(o,1);
				}
			});
			Self._relayNum = null;
		}
		if (Self.relayCall && Self.talkBox.type == 1){
			Self.relayCall(data);
		}
		else if (Self.replyCall && Self.talkBox.type == 2){
			Self.replyCall(data);
		}
		else if (Self.commentCall && (Self.talkBox.type == 4 || Self.talkBox.type == 5)){
			Self.commentCall(data);
		}
	};
	Self.relayBox._numSon = $$(Self.relayBox._body,'.number')[0];
	Self.relayBox._relayCheck = $$(Self.relayBox._body,'.check1')[0];
	Self.relayBox._relayCheck.onclick = function(){
		Self.relayBox.data.share = this.checked ? 1 : 0;
		MI.Bos('btnRelayQzoneCheckbox');
	}
	Self.comtBox._numSon = $$(Self.comtBox._body,'.number')[0];
	Self.comtBox._relayCheck = $$(Self.comtBox._body,'.check1')[0];
	Self.comtBox.addListCheck = 0;
	Self.comtBox._relayCheck.onclick = function(){
		var checked = this.checked;
		Self.comtBox.type = checked ? 1 : 5;
		Self.comtBox.talkId = checked ? Self.cur : Self.curSource;
		Self.comtBox._tip.innerHTML = '';
		Self.comtBox.countTxt();
		if (!Self.comtBox.addList || Self.comtBox.addListCheck){
			Self.comtBox.addList = checked ? Self.relayBox.addList : 0;
			Self.comtBox.addListCheck = 1;
		}
		MI.Bos('btnRelayistCheckbox');
	}
	
	//评论列表
	/*
	Self.comtBox._relayList = UI.html('<div class="relayList"></div>')[0];
	UI.append(Self.comtBox._relayList,Self.comtBox._body);
	*/

	if (UI.B.ipad) { //Focus To The First Position
		UI.EA(Self.relayBox._txt,'focus',function(){
			setTimeout(function(){
				MI.selectTxt(Self.relayBox._txt,0,0,0);
			},100);
		});
	}

	UI.EA(Self.replyBox._close,'click',function(){
		Self.replyHide();
	});
	UI.EA(Self.relayBox._close,'click',function(){
		Self.replyHide();
	});
	UI.EA(Self.comtBox._close,'click',function(){
		Self.replyHide();
	});
	
	Self.creatBox = function(){
	}
}
MI.TalkList.prototype.report = function(id,el){
	var Self = this,
		type = MI.user.fun.fastReport;
	if (el.innerHTML != _('举报')){ // 去掉fun.fastReport限制，强制有删除功能
		MI.ajax({
			url : MI.url.reportSpam,
			data : {id:id,type:1},
			success : function(data){
				data = MI.json(data);
				if (data.result == 0){
					var talk = $(id);
					MI.tip(_('删除成功'),function(){
						if (UI.hasClass(talk,'orginCnt')){ //消息底层页，删除后跳到首页
							MI.goHome();
						}
						else {
							UI.animate(talk,'opacity',0,function(){
								UI.remove(talk);
								Self.bottom();
							});
						}
					});
				}
			}
		});
		MI.Bos('btnReportFast');
	}
	else {
		var name = UI.A($$($(id),'.userName')[0] || $$($(id),'.msgCnt strong a')[0],'rel');
		jubao_msg(id,name);
	}
}
MI.TalkList.prototype.reportQun = function(id, qid, zone){
	zone=zone?zone:1;
	var name = UI.A($$($(id),'.userName')[0] || $$($(id),'.msgCnt strong a')[0],'rel');
	jubao_qun_msg(id,qid,zone);
}
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
		orderWrap = $$(el,'.orderWrap')[0], //订单
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
	if (view && !MI.user.isLab) { // 查看对话
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
	UI.each(trans,function(o){ //翻译
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
	});
	if (orderWrap){ //订单
		orderWrap.onclick = function(e){
			var E = UI.E(e),
				target = E.target;
				nodeName = target.nodeName,
				isClose = target.className.hasString('vClose'),
				T = this,
				Detail = $$(T,'.orderDetail')[0];
			if ((nodeName != 'A' && target.parentNode.nodeName != 'A' && target.parentNode.parentNode.nodeName != 'A') || isClose){
				if (!UI.A(T,'data')){
					if (!UI.A(T,'loading')){
						MI.ajax({
							type : 'get',
							url : MI.url.uploadOrder,
							data : {
								op : 4,
								type : UI.A(Detail,'type'),
								url : UI.A(Detail,'url')
							},
							success : function(data){
								data = MI.json(data);
								UI.A(T,'data',1);
								UI.A(T,'loading',0);
								if (data.result == 0 && data.info){
									var detail = UI.html(data.info)[0];
									Detail.innerHTML = detail.innerHTML;
								}
								UI.toggleClass(T,'orderView');
							}
						});
						UI.A(T,'loading',1);
					}
				}
				else {
					UI.toggleClass(T,'orderView');
				}
				if (isClose){
					return false;
				}
			}
		}
		/*UI.each($$(orderWrap,'a'),function(o){
			o.onclick = function(e){
				if (!this.className.hasString('vClose')){
					UI.E(e).stop();
				}
				else {
					return false;
				}
			}
		});*/
	}
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
MI.TalkList.prototype.reply = function(id,type,number){ //type : 0(reply) 1(relay) 2(comt)
	var Self = this,
		li = $(id);
	if (MI.card) {
		UI.remove(MI.card._body);
	}

	//Relay List
	Self.relayListHide(id);

	if (Self.talkBox) {
		Self.talkBox.hide();
		if (Self.replyTarget){
			Self.replyTarget.cont = Self.talkBox._txt.value;
		}
	}
	if (Self.talkBox && Self.cur && Self.cur != id && Self.talkBox.display) {
		Self.talkBox.display = 0;
	}
	if (type == 2) {
		Self.talkBox = Self.comtBox;
	}
	else {
		Self.talkBox = type ? Self.relayBox : Self.replyBox;
	}

	Self._talk = Self.talkBox._body;
	Self.talkBox.iconPic = Self.iconPic;
	Self.talkBox.startTime = 0;
	UI.C(Self.talkBox._txt,'height','');
	UI.removeClass(Self.talkBox._btn,'disabled');
	UI.removeClass(Self._talk,'pubSuc');
	if (!Self.talkBox.display) {
		var sourceId = id,
			cur = Self.cur,
			viewRelay = $$(li,'.zfNum')[0],
			author = $$(li,'.userName a')[0],
			name = '',
			name2,
			account,
			vip = $$(li,'.userName .vip').length,
			expo = $$(li,'.userName .ico_expo').length,
			url = '',
			title = '',
			cont = $$(li,'.msgCnt')[0],
			contClone = cont ? cont.cloneNode(1) : UI.DC('b'),
			content,
			contentBase,
			contentTmp,
			/*contentTopic,
			contentTopicLength,*/
			replyBox = $$(li,'.replyBox')[0],
			relay = $$(li,'.replyBox .msgCnt')[0],/*relayUser,*/
			userPic = $$(li,'.userPic')[0],
			addReplyTxt,
			talkBoxTxt = Self.talkBox._txt;
		if (author){
			name = author.innerHTML;
			url = author.href;
			title = author.title || UI.A(author,'rel');
		}
		if (viewRelay){
			sourceId = viewRelay.href.match(/[^\/]+$/g)[0];
		}
		//<a hre="" rel="@account">nick</a> : Replace "nick" Use "@account"
		if (type) { //Don't Change For Reply
			UI.each($$(contClone,'em'),function(o){
				var account = UI.A(o,'rel');
				if (account) {
					o.innerHTML = account;
				}
			});
			UI.each($$(contClone,'img'),function(o){
				var face = (UI.A(o,'k') || '') + o.title;
				if (face) {
					UI.after(UI.html('<b>/' + face + '</b>')[0],o);
				}
			});
			UI.each($$(contClone,'.btn_trans'),function(o){
				UI.remove(o);
			});
		}
		content = contentBase = UI.text(contClone);

		if (relay) {
			contentTmp = UI.text(relay).split(':');
			if (type) {
				name2 = name;
				name = contentTmp[0];
			}
			contentTmp = contentTmp.slice(1).join(':');
			if (type) {
				content = contentTmp;
			}
		}
		/*if (!replyBox) {
			content = name + ':&nbsp;"' + content;
		}*/
		if (cur) {
			UI.removeClass($(cur),'cur');
		}
		UI.addClass(li,'cur');

		this._relayNum = type ? $$(li,'.relayNum') : null;

		var className,curTitle,
			//relayTitle = '转播 <b>' + name + '</b>: "' + MI.string.html(MI.string.cut(content,20)) + '"',
			relayTitle = '',
			replyTitle = _('对话是半公开的，不会出现在你听众的主页上，但是可以到你的页面看到<br>对 <b>{0}</b> 说:',name),
			//comtTitle = relayTitle.replace('转播','评论'),
			comtTitle = '',
			delayAddReply;
		relayTitle += _('<br>顺便说两句:');
		//Title
		if (type == 2) {
			curTitle = comtTitle;
		}
		else {
			curTitle = type ? relayTitle : replyTitle;
		}
		$$(this._talk,'.replyTitle')[0].innerHTML = curTitle;

		//ClassName
		if (type == 2) {
			className = 'talkWrap comtWrap';
			if(Self.type==1 || Self.type==2)
			{
				//className = 'talkWrap';
			}
		}
		else {
			className = type ? 'zfWrap' : 'talkWrap';
		}
		this.talkBox._body.className = className;

		account = MI.string.account(title);
		if (replyBox && name2 && (type == 1 || type == 2)) { //添加转播评论
			this.talkBox._addReply.innerHTML = '&nbsp;<a href="#">[' + (type == 1 ? _('清空转播理由') : _('清空评论')) + ']</a>';
			addReplyTxt = this.talkBox._addReply.txt = ' || @' + account + ': ' + UI.trim(contentBase);
			UI.show(this.talkBox._addReply);
			if (!UI.B.ipad) {
				talkBoxTxt.onkeyup = function(){
					clearTimeout(delayAddReply);
					delayAddReply = setTimeout(function(){
						if (!talkBoxTxt.value.hasString(addReplyTxt)) {
							UI.hide(Self.talkBox._addReply);
							talkBoxTxt.onkeyup = null;
						}
					},400);
				}
			}
		}
		else {
			UI.hide(this.talkBox._addReply);
			talkBoxTxt.onkeyup = null;
		}
		//Bug After Gzip
		//$$(this._talk,'.replyTitle')[0].innerHTML = type ? '转播 "' + MI.string.escape(content.slice(0,30)) + (content.length > 30 ? '...' : '') + '"<br/>再说两句:' : '回复 ' + name + ':';

		//Set TalkBox Prototype
		if (isNaN( parseInt(id) )){
			Self.talkBox.talkId = id;
		}
		else {
			Self.talkBox.talkId = parseInt(id);
		}
		Self.talkBox.type = type ? 1 : 2;
		if (!Self.comtBox._relayCheck.checked && type == 2) { //评论
			Self.talkBox.talkId = Self.curSource;
			Self.talkBox.type = 5;
		}
		/*if (relay) {
			relayUser = $$(li,'.replyBox strong')[0].innerHTML;
		}
		else {
			relayUser = $$(li,'.userName strong')[0].innerHTML;
			if (!relayUser.match(/:$/g)) {
				relayUser += ':';
			}
		}*/
		/*this.talkBox.action = type ? '转播:&nbsp;' : '对<strong class="userTo"><a href="' + url + '" title="' + name + '(@' + account + ')">' + name + '</a>' + (vip ? '<a href="/certification" target="_blank" class="vip" title="腾讯认证"></a>': '') + (expo ? '<a href="/certification" target="_blank" class="ico_expo" title="上海世博"></a>': '') + '说:</strong>';
		if (type && !replyBox) {
			var clone = li.cloneNode(1),msgCnt = $$(clone,'.msgCnt')[0];
			UI.remove($$(clone,'.zfWrap')[0]);
			UI.remove($$(clone,'.talkWrap')[0]);
			UI.remove($$(clone,'.funBox')[0]);
			UI.C($$(clone,'.userName')[0],'display','inline');
			UI.C(msgCnt,'display','inline');
			msgCnt.innerHTML = msgCnt.innerHTML;
		}
		this.talkBox.source = {
			type : type ? 1 : 2,
			content : type ? (replyBox ? replyBox.innerHTML : clone.innerHTML) : contentBase,
			nick : name,
			cusPic : ( userPic && userPic.innerHTML.replace(/cusPic/gi,'hide').replace(/<a/i,'<a class="cusPic"') ) || 0 //Small Pic For Reply
		};*/

		this.talkBox._txt.value = '';
		/*contentTopic = (contentTmp || content).match(/(#\s*[^#\s]{1}[^#]{0,59}?\s*#)/g); //Auto Add Topic

		this.talkBox._txt.value = contentTopic && type ? contentTopic.join('') : '';
		contentTopicLength = this.talkBox._txt.value.length*/
		this.talkBox.countTxt();
		var atDetail = $$(li,'.at_detail')[0];
		if (atDetail){ //如果有At聚合，就插到At聚合前面
			UI.before(this._talk,atDetail);
		}
		else {
			UI.append(this._talk,$$(li,'.msgBox')[0]);
		}
		setTimeout(function(){
			talkBoxTxt.focus();
			if (Self.replyCont){
				talkBoxTxt.value += Self.replyCont;
			}
			if (addReplyTxt && !Self.replyCont) { //自动添加转播评论
				talkBoxTxt.value += addReplyTxt;
			}
			Self.talkBox.countTxt();
			MI.selectTxt(talkBoxTxt,0,0,0);
		},50);

		//Relay And Comt's Number
		if (type != 0) {
			var txtRepost =  (number<1) ? _('转播') : _('转播<i class="l"></i>');
			var txtComment = (number<1) ? _('评论') : _('评论<i class="l"></i>');
			var numHTML,
				numberType = type == 1 ? txtRepost : txtComment,
				bossName = type == 1 ? 'Relay' : 'Comt',
				link = type == 1 ? '?t=1' : '?t=2';
			if((Self.type==1 || Self.type==2) && type!=1)
			{
				numberType =  (number<1) ? _('评论') : _('评论<i class="l"></i>');
			}
			numHTML = numberType + _('原文');
			var tempHTML = window.MILang == 'en_US' ? '' : numberType;
			if (number > 0){
				numHTML += _('，') + '<a href="http://t.qq.com/p/t/' + sourceId + '/' + link + '" onclick="MI.Bos(\'btn' + bossName + 'View\')" target="_blank">' + 
					((number != 0 && number) ? _('共{0}条',number) + tempHTML : '') + '<em class="ffsong">>></em></a>';
			}
			else {
				numHTML += type == 1 ? _('，把它分享给你的听众') : '';
			}
			Self.talkBox._numSon.innerHTML = numHTML;
		}

		this.cur = id;
		this.talkBox.display = 1;
	}
	else {
		this.talkBox.hide();
		this.replyHide();
	}
	var boxs = [this.replyBox,this.relayBox,this.comtBox];
	UI.each(boxs,function(o,i){
		if (type != i) {
			o.hide();
			o.display = 0;
		}
	});
	if (this.replyBox.display || this.relayBox.display || this.comtBox.display) {
		UI.addClass($(this.cur),'cur');
		if (UI.B.ie6){
			UI.addClass($(this.cur),'hover');
		}
	}

	Self.setArrow($$(this.talkBox._body,'.SA')[0]);
	
	function checkTalkId(){ //兼容没有微博ID的情况
		var id = li.id;
		if (isNaN( parseInt(id) )){
			Self.talkBox.talkId = id;
		}
		else {
			Self.talkBox.talkId = parseInt(id);
		}
	}
	Self.checkTalkId = UI.isElement(id) ? checkTalkId : function(){};
}
MI.TalkList.prototype.remove = function(id,type,veriCode){
	id = String(id);
	var Self = this,
		talk = $(id),
		url = Self.removeUrl,
		data = {r:MI.random()},
		favBtn,
		shieldBtn,
		upTopBtn;
	if (isNaN( parseInt(id) )){
		data.id = id;
	}
	else {
		data.id = parseInt(id);
	}
	if (veriCode) {
		data.veriCode = veriCode;
	}
	if (type) {
		if (type == 8 || type == 9) {
			url =  Self.upTopUrl;
			data.op = type == 8 ? 1 : 2;
		} 
		else {
			url =  Self.favorUrl;
			data.op = type < 2 ? 1 : 2;
		}	
	}
	if (Self.mId) { //For Delete Comment
		data.mId = Self.mId;
	}
	if(Self.type == 1 || Self.type == 2 || 
		MI.user.fun.btnStyle == 6 || MI.user.fun.btnStyle == 5)
	{
		if(MI.Group.qid)
		{
			data.time = ($$(talk,'.time')[0].rel);
			data.qid = MI.Group.qid;
			data.zone = Self.type?Self.type:MI.TalkBox.prototype.data.cflag;
		}
	}
	var temp = data.id;
	if(type == 4){  //屏蔽
		data={id:temp,t:0};
		url = Self.shieldUrl;
	}
	else if(type == 5 || type == 6){ //取消屏蔽
		data = {id:temp,t:1};
		url = Self.shieldUrl;
	}
	if (!talk.sending) {
		MI.ajax({
			url : url,
			data : data,
			type : 'post',
			success : function(data){
				talk.sending = 0;
				data = MI.json(data);
				if (data.result == 0) {
					favBtn = $$(talk,'.fav')[0];
					shieldBtn = $$(talk,'.shield')[0];
					upTopBtn = $$(talk,'.upTop')[0];
					if (type == 1) {
						UI.addClass(favBtn,'light');
						favBtn.innerHTML = _('取消收藏');
						favBtn.type = 3;
						if (MI.user.fun.favGroup){
							MI.app({
								TalkListFav : function(){
									MI.favorites && MI.favorites.favSuccess(id);
								}	
							});
						}	
						//favBtn.blur();
					}
					else {
						UI.remove(Self._confirm);
						if (type == 4){
							UI.addClass(shieldBtn,'light');
							shieldBtn.innerHTML = _('取消屏蔽');
							shieldBtn.type = 5;
						}
						else if (type == 8) {
							UI.addClass(upTopBtn,'light');
							upTopBtn.innerHTML = _('取消置顶');
							upTopBtn.type = 9;
							var url = "http://t.qq.com/" + MI.user.account;
							var content = _('我刚置顶了一条微博，大家来看看吧~') + url + '?preview';
							MI.talk(_('置顶成功，把我的置顶告诉大家:&nbsp;&nbsp;<span style="color:#999">[最多置顶3条微博]</span>'),content,'50');
							MI.reply.talkBox.successStart=function(){
								MI.dialog.showTip({html:_('广播成功!')});
								document.location.href = url + '?preview';
							}
						}
						else {
							if (MI.talkBox && !type && data.info != 7) {
								MI.talkBox.countNum(-1);
							}
							if (type == 3) {
								UI.removeClass(favBtn,'light');
								favBtn.innerHTML = _('收藏');
								favBtn.type = 1;
							}
							else if(type == 5){
								UI.removeClass(shieldBtn,'light');
								shieldBtn.innerHTML = _('屏蔽@提醒');
								shieldBtn.type = 4;
							}
							else if(type ==9){
								UI.removeClass(upTopBtn,'light');
								upTopBtn.innerHTML = _('置顶');
								upTopBtn.type = 8;
							}
							else {
								if (Self.removeCall) { //删除回调
									Self.removeCall();
								}
								UI.addClass(talk,'delMsg'); //Add Delete CSS
								setTimeout(function(){
									if (UI.hasClass(talk,'orginCnt')){ //消息底层页，删除后跳到首页
										MI.tip(_('删除成功'),function(){
											MI.goHome();
										})
									}
									else {
										UI.animate(talk,'opacity',0,function(){
											// 删除最新发布的消息时，将发布的内容回填到发布框中
											if (UI.hasClass(talk, 'fill-back') && MI.talkBox){
												var cnt = $$(talk, '.msgCnt')[0],
													fillBackCnt = "", children = cnt.childNodes;
												UI.each(children, function (o) {
													if (o.nodeName === "EM"){
														fillBackCnt += UI.A(o, 'rel');
													}else{
														fillBackCnt += o.nodeValue || o.innerHTML;
													}
												});
												MI.talkBox._txt.value = fillBackCnt;
												MI.talkBox.countTxt();
												MI.talkBox._txt.select();
											}
											UI.remove(talk);
											//Check More's Position
											Self.bottom();
										});
										//TODO::停止音乐播放
										if (MI.user.fun.newMusic && window.MUSIC && MUSIC.ICMusic){
											MUSIC.ICMusic.hideFlash(MI.TalkList.lastMusic);
										}
									}
								},300);
							}
						}
					}
				}
				else if (MI.code.check(data.result)) {
					MI.code.show({msg:data.msg,code:data.info,call:function(code){
						Self.remove(id,type,code);
					}});
				}
				else if (data.msg){
					//alert(data.msg);
					if(type == 8 || type == 1) {
						MI.alert(data.msg); //超过三条置顶,超过1000条收藏
					}
				}
			}
		});

		talk.sending = 1;
	}
}
MI.TalkList.prototype.confirm = function(id,type,call){
	id = String(id);
	var Self = this,
		talk = $(id),
		msg = $$(talk,'.msgBox')[0],
		tipMsg;
	if(type){ //type=6时，屏蔽删除，type=2，收藏删除, type =4, 屏蔽消息二次提醒,type=8 删除置顶
	if(type == 2) tipMsg = Self.unfavTip;
	else if(type == 4) tipMsg = Self.shieldTip;
		else if(type == 6) tipMsg = Self.unShieldTip;
	//		else if(type == 8) tipMsg = Self.unUpTopTip;
	}
	var	tip = type ? tipMsg : Self.removeTip,
		replyBox = $$(talk,'.replyBox')[0],
		relayNum = $$(talk,'.relayNum')[0];
	UI.append(Self._confirm,msg);
	Self.relayListHide(id);
	setTimeout(function(){
		$$(Self._confirm,'input')[0].focus();
	},0);
	Self._confirm.tid = talk.id;
	Self._confirm.type = type;
	if (!type && !replyBox && relayNum){
		tip = _('这条广播已经被{0}人转播点评过，确认删除吗？',relayNum.innerHTML);
	}
	Self._confirmTip.innerHTML = tip;

	if (Self.talkBox && Self.talkBox.display && Self.cur == talk.id) { //Hide TalkBox When Click Delete Button
		UI.remove(Self.talkBox._body);
		UI.removeClass(talk,'cur');
		Self.talkBox.display = 0;
	}
}

MI.tmpl.geolocation = '<div style="top:0;left:0" class="comTips1 cardT"><a class="close" href="#"></a><div class="detailAddress" style="background:#fff;width:340px;"><p style="padding:3px 5px;min-height:20px;_height:20px;color:#666;line-height:18px;border-bottom:1px solid #999;"></p></div><div class="areaWrap" id="areaWrap"></div><div class="SA"><em>◆</em><span>◆</span><b>◆</b></div></div>'

MI.TalkList.prototype.geolocation = (function(){
	UI.css('.comTips1 #Attribution {display:none;}');  //隐藏地图版权标识
	
	var mapObj = null,
		mark = null,
		SM = null,
		body = UI.html(MI.tmpl.geolocation)[0], 
		mapWrap = $$(body,'.areaWrap')[0],
		close =  $$(body,'.close')[0],
		address = $$(body,'.detailAddress p')[0],
		pos = [39.90923,116.397428],	//当前坐标
		addressList = {},  //缓存详细地址
		loadedMapFile = false, //是否已加载地图js文件
		initialize = 0;

	function init(){
		SM = soso.maps;
		UI.append(body,document.body);	

		//创建地图
		mapObj = new SM.Map(mapWrap, {
			animation : true, 						//是否启用地图移动/缩放动画，默认启用。
			center : new SM.LatLng(pos[1],pos[0]), 	//地图中心地理坐标。
			keyBoard : true, 						//是否启用键盘操作地图功能，默认启用。
			scrollWheel : true, 					//是否启用鼠标滚轮缩放功能，默认启用。
			zoomInByDblClick : true, 				//是否启用鼠标双击放大功能，默认启用。
			zoomLevel : 15							//地图缩放级别。
		});
		
		//导航条
		var navControl = new SM.NavigationControl({
			align: SM.ALIGN.TOP_LEFT,
			margin: new SM.Size(5, 15),
			style:SM.NavigationControlStyle.SMALL,
			map: mapObj
		  });
		
		//蒲公英图标
		var icon = new SM.MarkerImage('http://mat1.gtimg.com/www/mb/images/map/mapb2_110321.png', 
			new SM.Size(28,32),new SM.Point(12,35),new SM.Point(0,35)
		);

		//图标标记点
		mark = new SM.Marker({
			map : mapObj,
			position : new SM.LatLng(pos[1],pos[0]),
			icon : icon,
			animation : SM.Animation.JUMP
		});
	}
	
	//改变地图
	function changeLocation(){
		if(!mapObj) init();
		mapObj.moveTo(new SM.LatLng(pos[1]*1,pos[0]*1));	//根据城市信息，重新设置中心点
		mark.setPosition(new SM.LatLng(pos[1]*1,pos[0]*1));
		//mapObj.fitBounds(mapObj.getBounds()); //设置地图的中心点地理坐标和缩放级别，使其与指定范围相符。
	}

	//改变详细地址
	function changeTip(el){
		var m =  UI.A(el,'merchant'),d = UI.A(el,'address');
		m = !m ? '' : m + '<br />';
		d = !d ? '' : _('地址：') + d;
		address.innerHTML = m  +  d;
	}

	//设置定位
	function setPos(el){
		body.style.left = UI.getX(el) - 150 + 'px';			//150 水平偏移量,是地图和按钮中央对齐	
		body.style.top = UI.getY(el) + 25 + 'px';
		var topOffset = UI.getY(el) + 25 + 220 + UI.height(address) - UI.windowHeight() - UI.scrollY();  //220是地图高度 25垂直偏移量
		if(topOffset>0) UI.scrollTo(document.body,UI.scrollX(),UI.scrollY()+topOffset + 5);
	}

	function show(el){
		pos = UI.A(el,'pos').split(',');
		if(pos.length < 2 || !UI.isNumber(pos[0]*1) || !UI.isNumber(pos[1]*1)) return;
		UI.show(body);
		changeLocation();
		changeTip(el); 
		setPos(el);
		show.delay = 1;
		setTimeout(function(){
			show.delay = 0;
		},100)
	}

	function hide(){
		if(show.delay==0) UI.hide(body);
	}
	
	close.onclick = function(){
		hide();
		return false;
	}

	UI.EA(document,'click',hide);		//地图展示按钮需要阻止冒泡
	
	UI.EA(body,'click',function(e){
		UI.E(e).stop();
	})

	return {
		'show' : function(el){	
			if(!loadedMapFile) {
				UI.getScript('http://api.map.soso.com/v1.0/main.js',function(){
					show(el);
					loadedMapFile = true;
				},'utf-8',1);
			}	
			else {
				show(el);
			}
			return false;
		},
		'hide' : hide
	}
})();


MI.tmpl.trans = '<div class="comTips1"><div class="transWrap"><div class="transBox"></div><div class="transNote"><span class="left">' + _('小贴士：越早参与翻译越容易被推荐！') + '</span><span class="right"><a class="transMe" href="#">'+ _('我来翻译') + '</a></span></div></div><div class="loading" style="position:absolute;width:100%;height:100%;top:0;left:0;background-color:#fff;background-position:22% 50%;"><span style="padding-left:90px;">' + _('翻译机器人正在为你翻译...') + '</span></div></div>';

MI.TalkList.prototype.trans = (function(){
	var body = UI.html(MI.tmpl.trans)[0],
		transDiv = $$(body,'.transBox')[0],
		transMe = $$(body,'.transMe')[0],
		loading = $$(body,'.loading')[0],
		transBox = null,	//我来翻译，对话框
		resultList = {},  	//缓存结果
		transId = '',
		pNode = null,
		isShowing = false,
		offsetY = 300,
		initialize = 0;

	function init(){
		if(initialize) return;
		UI.append(body,document.body);
 		initialize = 1;
	}

	//显示翻译结果
	function showTransResult(o){
		var str = '';
	 	for(var i=0;i<o.length;i++) {
			str += '<p><span class="cNote">' + _('译') + '：</span>' + o[i].content;  
			str += '<br /><span class="cNote">' + _('此翻译由'); 
			str += o[i].link ? (_('博友') + '<a target="_blank" href="' + o[i].link + '">@' + o[i].name + '</a>') : o[i].name;
			str += (o[i].link ?_('提供，欢迎你也来翻译') :_('提供，仅供参考')) + '</span></p>';
		}
		transDiv.innerHTML = str;
	}

	function showLoad(){
		var h = UI.height(body);
		loading.style.lineHeight = h -1 + 'px';
		UI.show(loading);
	}

	function hideLoad(){
		loading.style.lineHeight = 1;
		UI.hide(loading);
	}

	function trans(){
		if(resultList[transId]) {
			showTransResult(resultList[transId]);
			resetPos();
			return;
		}

		//UI.addClass(body,'loading');
		showLoad();
		MI.ajax({
			url:MI.url.translate,
			data:{id:transId},  
			success:function(data){
				hideLoad();
				//UI.removeClass(body,'loading');
				data = MI.json(data);
				if(data.result == 0){
					showTransResult(data.info.result);
					resultList[transId] = data.info.result;
					resetPos();
				}
				else {
					MI.alert(data.msg);
					hide();
				}
			}
		});
	}

	function setPos(el){
		var x = UI.getX(el) - 140,y = UI.getY(el) + 25,fx = UI.getX(pNode);   //140横向偏移，25垂直偏移，使卡片对按钮居中
		if(x<fx) x = fx;								//左边超出，150是卡片宽，560是talkList宽
		if((x + 300)> (fx + 560)) x = fx + 560 - 300; 	//右边超出 
		body.style.left = x + 'px';
		body.style.top = y +  'px';
		offsetY = y;//设置用户翻译对话框的偏移量
	}

	//翻译内容加载后 重设定位
	function resetPos(){
		var topOffset = UI.getY(body) + UI.height(body)  - UI.windowHeight() - UI.scrollY();  
		if(topOffset>0) UI.scrollTo(document.body,UI.scrollX(),UI.scrollY()+topOffset + 5);
	}

	function show(el){
		if(isShowing)  return;
		var msgBox = UI.parents(el,'msgBox')[0];
		pNode = msgBox.parentNode;
		transId = UI.A(el,'tid') || $$(msgBox,'.time')[0].href.replace(/.*\//,'');
		init();
		setPos(el);
		UI.show(body);
		isShowing = true;
		trans();
		MI.Bos('btnShowTrans');
	}

	function hide(){
		clearTimeout(hide.delay);
		hide.delay = setTimeout(function(){
			UI.hide(body);
			hideLoad();
			isShowing = false;
		},100);	
	}

	transMe.onclick = function(){
		if(!transBox) transBox = new MI.TransMe('trans');
		transBox.show({cont:'',title:_('我来更准确的翻译:'),talkId:transId,offsetY:offsetY,type:1});
		MI.Bos('btnTransByMe');
		return false;
	}

	body.onmouseout = hide;
	body.onmouseover = function(){
		clearTimeout(hide.delay);
		UI.show(body);
	}
	
	return {
		'show' : show,
		'hide' : hide
	}

})();
MI.TalkList.vote = function(el){ //显示投票
	var P = el.parentNode.parentNode,
		box = $$(P,'.vBox')[0],
		realUrl = UI.A(P,'realurl'),
		shortUrl = UI.A(P,'shorturl'),
		iframe;
	UI.addClass(P,'vPlay');
	iframe = '<div style="height:200px"></div><iframe style="height:200px;display:none" onload="UI.show(this);try{var height=(this.contentWindow.document.body.scrollHeight||this.contentWindow.document.documentElement.scrollHeight)+5+\'px\';this.style.height=height;}catch(e){};UI.hide(this.previousSibling);UI.removeClass(this.parentNode,\'loading\');" src="' + realUrl + '" frameborder="0" scrolling="no" allowtransparency="true"></iframe>';
	if (box){
		UI.addClass(box,'loading');
		box.innerHTML = iframe;
	}
	else {
		UI.after(UI.html('<div class="vBox loading">' + iframe + '</div>')[0],el);
	}
}
MI.TalkList.voteClose = function(el){ //隐藏投票
	var P = el.parentNode.parentNode;
	UI.removeClass(P,'vPlay');
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
			MI.Bos('btnVoteView');
			return false;
		}
		vClose.onclick = function(){
			MI.TalkList.voteClose(this);
			MI.Bos('btnVoteClose');
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
					if (MI.user.fun.newMusic){
						
					}
					else {
						//获取是否已经展开了音乐
						if(musicBoxCur && musicBoxCur.isOpen) {
						  try{Self.musicClose()} catch(e){}
						} else {
						  Self.music(musicBoxCur);
						}
						return false;
					}
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