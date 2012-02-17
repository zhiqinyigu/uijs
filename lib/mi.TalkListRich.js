MI.TalkListRich = 1;
(function(){
/**
 * ID获取DOM
 * 
 * @param {String} String DOM的ID
 * @return {Object} Object DOM对象
 *            @example
 *            var talkBox = $('talkBox');
 */
var $ = UI.G;
/**
 * CSS路径获取DOM
 * 
 * @param {String} String DOM的CSS路径
 * @return {Array} Array DOM对象的数组
 *            @example
 *            var talkBox = $$('#talkBox')[0];
 *            var heads = $$('.LC .userPic img');
 */
var $$ = UI.GC;
if (!(window.MIApp && !window.MIApp.lib)){
	window.$ = UI.G;
	window.$$ = UI.GC;
}
/*
 视频自动播放目前支持优酷和腾讯网
 flashvars参数：
  isAutoPlay=true //优酷
  auto=1 //腾讯
*/
MI.tmpl.videoTool = '<div class="vTools bor_bg" style="display:block"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="$VideoRealUrl" class="vUrl" target="_blank"><em></em>$VideoTitle</a></div>';
MI.tmpl.videoThumbs = '<a href="#" class="vThumbs" url="$VideoPlayUrl"><span class="mask"><em></em></span><img src="$VideoPicUrl" /></a>';
MI.tmpl.videoObject = '<object name="$VideoPlayID" id="$VideoPlayID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="460" height="372" ><param name="wmode" value="transparent" /><param name="movie" value="$VideoPlayUrl" /><param name="allowFullScreen" value="true" /><param name="flashvars" value="playMovie=true&amp;isAutoPlay=true&amp;auto=1&amp;autoPlay=true&amp;adss=0"><param name="swfversion" value="50536.0.0.0" /><param name="expressinstall" value="Scripts/expressInstall.swf" /></object>';
MI.tmpl.videoEmbed = '<embed name="$VideoPlayID" id="$VideoPlayID" src="$VideoPlayUrl" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="460" height="372" allowFullScreen="true" flashvars="playMovie=true&amp;isAutoPlay=true&amp;auto=1&amp;autoPlay=true&amp;adss=0" wmode="transparent"></embed>';
MI.tmpl.videoHTML5 = '<video width="460" height="362" controls="1" autoplay="autoplay" autobuffer="true" src="$VideoPlayUrl"></video>';
MI.TalkList.prototype.creatBox = function(obj){//obj 微群新增参数，传递当前的li对象。默认展开的talklist无需创建talkbox，取现有元素即可
	var Self = this,
		eid = obj ? UI.A(obj,'id'):'',
		mode = obj ? UI.A(obj,'vmode') : '',
		replyBoxTmp='replyBox',relayBoxTmp='relayBox',comtBoxTmp='comtBox',relayListBoxTmp='relayListBox',relayListBoxTmp2 = 'relayListBox_'+eid;
	var box =[],gBox = [];
	if(Self.insTalkbox && !mode)	return;//talkbox list已经创建并且不是微群的话跳出

	isRelay = 1;
	if(Self.type == 2){ //群内私聊没有转播
		isRelay = 0;
	}
	var relayListHtml = Self.talkBoxTmpl.replace('talkWrap',(Self.type == 2 || mode) ? 'zfWrap comtWrap' : 'zfWrap').replace('<div class="left"></div>','<div class="left" style="display:;"><label style="display:none;"><input id="replayListCheckbox" type="checkbox"' + (isRelay ? ' checked' : '') + ' class="check1">' + _('同时转播给你的听众') + '</label> <label style="display:"><input type="checkbox" ' + (MI.user.fun.syncQzone ? ' checked' : '') + ' class="replayQzoneCheckbox check1">' +  _('同步到空间') + '</label></div>').replace('talkSuc','');
	if(!Self.insTalkbox){
		relayListBox = UI.html(relayListHtml)[0];
		box = [new MI.TalkBox(Self._talk),new MI.TalkBox(Self._relay),new MI.TalkBox(Self._comt),new MI.TalkBox(relayListBox)];
		gBox = [replyBoxTmp,relayBoxTmp,comtBoxTmp,relayListBoxTmp];
		if(mode && !Self[relayListBoxTmp2]){
			relayListBox = UI.html(relayListHtml)[0];
			Self[relayListBoxTmp2] = {}; // 微群默认展开的浮层转播框
			box.push(new MI.TalkBox(relayListBox));
			gBox.push(relayListBoxTmp2);
		}
	}else if(mode && !Self[relayListBoxTmp2]){
		relayListBox = UI.html(relayListHtml)[0];
		Self[relayListBoxTmp2] = {}; // 微群默认展开的浮层转播框
		box.push(new MI.TalkBox(relayListBox));
		gBox.push(relayListBoxTmp2);
	}
	if(gBox.length){
		UI.each(gBox,function(o,i){
			for (var j in Self[o]){ //继承默认属性
				box[i][j] = Self[o][j];
			}
			box[i]['addListTmp'] = box[i]['addList']; //存储默认的addList属性
			Self[o] = box[i];
			Self[o]._txt.id = Self[o]._txt.name = o + '_' + MI.random();
		});
	}
	if(Self.insTalkbox)	return;//初始化talkbox list之后，这里跳出即可
	Self[replyBoxTmp].guideTextKeep = 0;

	//Count TalkBox's Type For Product
	//Self[replyBoxTmp].countType = 3;
	//Self[relayBoxTmp].countType = 4;

	Self[replyBoxTmp].autoHeight = 30;
	Self[relayBoxTmp].autoHeight = 136;
	Self[comtBoxTmp].autoHeight = 136;
	Self[replyBoxTmp].txtTipSend = _('发送中');
	Self[relayBoxTmp].txtTipSend = _('转播中');
	Self[comtBoxTmp].txtTipSend = _('评论中');
	Self[replyBoxTmp]._btn.title = _('发送');
	Self[relayBoxTmp]._btn.title = _('转播');
	Self[comtBoxTmp]._btn.title = _('评论');
	if(Self.type == 1 || Self.type == 2){
		Self[comtBoxTmp]._btn.title = _('评论');
	}
	Self[replyBoxTmp].hideCall = Self[relayBoxTmp].hideCall = Self[comtBoxTmp].hideCall = function(){
		UI.removeClass($(Self.cur),'cur');
		Self.showComtReply($(Self.cur)); //评论回复
	};
	Self[replyBoxTmp].start = Self[relayBoxTmp].start = Self[comtBoxTmp].start = function(){
		Self.checkTalkId();
		//Self.updateRelayNum();
		Self.talkBox._txt.blur();
		Self.focus();
	}
	Self[replyBoxTmp].success = Self[relayBoxTmp].success = Self[comtBoxTmp].success = function(data){
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
	Self[relayBoxTmp]._numSon = $$(Self[relayBoxTmp]._body,'.number')[0];
	Self[relayBoxTmp]._relayCheck = $$(Self[relayBoxTmp]._body,'.check1')[0] || UI.DC('b');

	//转播列表
	if(Self[relayBoxTmp]._relayList){
		UI.remove(Self[relayBoxTmp]._relayList);
	}
	Self[relayBoxTmp]._relayList = UI.html('<div class="relayList bgr3" style="display:none"></div>')[0];
	UI.append(Self[relayBoxTmp]._relayList,Self[relayBoxTmp]._body);
	
	//评论列表
	if(Self[comtBoxTmp]._relayList){
		UI.remove(Self[comtBoxTmp]._relayList);
	}
	Self[comtBoxTmp]._relayList = UI.html('<div class="relayList bgr3" style="display:none"></div>')[0];
	UI.append(Self[comtBoxTmp]._relayList,Self[comtBoxTmp]._body);

	Self[comtBoxTmp]._numSon = $$(Self[comtBoxTmp]._body,'.number')[0];
	Self[comtBoxTmp]._relayCheck = $$(Self[comtBoxTmp]._body,'.check1')[0] || UI.DC('b');
	Self[comtBoxTmp].addListCheck = 0;
	Self[comtBoxTmp]._relayCheck.onclick = function(){
		var checked = this.checked;
		Self[comtBoxTmp].type = checked ? 1 : 5;
		Self[comtBoxTmp].talkId = MI.string.parseInt(Self.cur);
		Self[comtBoxTmp]._tip.innerHTML = '';
		Self[comtBoxTmp].countTxt();
		if (!Self[comtBoxTmp].addList || Self[comtBoxTmp].addListCheck){
			Self[comtBoxTmp].addList = checked ? Self[relayBoxTmp].addList : 0;
			Self[comtBoxTmp].addListCheck = 1;
		}
		MI.Bos('btnRelayistCheckbox');
	}
	//评论列表
	/*
	Self[comtBoxTmp]._relayList = UI.html('<div class="relayList"></div>')[0];
	UI.append(Self[comtBoxTmp]._relayList,Self[comtBoxTmp]._body);
	*/

	if (UI.B.ipad) { //Focus To The First Position
		UI.EA(Self[relayBoxTmp]._txt,'focus',function(){
			setTimeout(function(){
				MI.selectTxt(Self[relayBoxTmp]._txt,0,0,0);
			},100);
		});
	}

	UI.EA(Self[replyBoxTmp]._close,'click',function(){
		Self.replyHide();
	});
	UI.EA(Self[relayBoxTmp]._close,'click',function(){
		Self.replyHide();
	});
	UI.EA(Self[comtBoxTmp]._close,'click',function(){
		Self.replyHide();
	});
	Self.insTalkbox = 1;//微群要多次调用creatBox，所以用状态为来记录是否已经创建了共用的relaybox，replybox，comtbox
	if(!MI.Group || !MI.Group.TalkListStyle){
		Self.creatBox = function(){}
	}
}
MI.TalkList.prototype.report = function(id,el,msgtype,data){//2012/2/13 raymli msgtype:消息类型 0|null 主站 1 微群
	var Self = this,
		type = MI.user.fun.fastReport,
		msgtype = msgtype ? msgtype : 0,
		data = data ? data : {qid:'' , zone:''};
	if (el.innerHTML != _('举报')){ // 去掉fun.fastReport限制，强制有删除功能
		MI.ajax({
			url : MI.url.reportSpam,
			data : {id:MI.string.parseInt(id),type:1},
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
	}else {
		var name = UI.A($$($(id),'.userName')[0] || $$($(id),'.msgCnt strong a')[0],'rel');
		if(msgtype == 0){//主站默认逻辑
			jubao_msg(MI.string.parseInt(id),name);
		}else if (msgtype == 1){//微群逻辑
			var zone = data.zone ?data.zone : 1,
				qid = data.qid ? data.qid : '';
			jubao_qun_msg(MI.string.parseInt(id),qid,zone);
		}
	}
}
MI.TalkList.prototype.reportQun = function(id, qid, zone){//2012/2/13 raymli重构了report方法，针对群的这个方法不会调用了，暂时未删
	zone=zone?zone:1;
	var name = UI.A($$($(id),'.userName')[0] || $$($(id),'.msgCnt strong a')[0],'rel');
	jubao_qun_msg(MI.string.parseInt(id),qid,zone);
}
MI.TalkList.prototype.getComtReply = function(el){ //获取评论回复DOM
	return $$(el,'.comtOrg')[0];
}
MI.TalkList.prototype.showComtReply = function(el){ //显示评论回复DOM
	if (MI.user.fun.comtReply){
		UI.show(this.getComtReply(el));
	}
}
MI.TalkList.prototype.hideComtReply = function(el){ //隐藏评论回复DOM
	if (MI.user.fun.comtReply){
		UI.hide(this.getComtReply(el));
	}
}
MI.TalkList.prototype.addOneAnimate = function(btn){
	var Self = this,i = 0;
	Self.addOnePop = Self.addOnePop || UI.html('<b style="color:#f00;width:30px;position:absolute;left:-10px;text-decoration:none;font-size:18px;">+1</b>')[0];
	UI.append(Self.addOnePop,btn);
	UI.animate(Self.addOnePop,'top','-30',function(){
		UI.remove(Self.addOnePop);
		UI.C(Self.addOnePop,'top',0);
	},0.2);
	UI.animate(Self.addOnePop,'opacity',0,function(){
		UI.C(Self.addOnePop,'opacity',1);
	},0.2);
};

MI.TalkList.prototype.praise =function(o,praiseBtn){
	var Self = this;
	var num = $$(o,'.top_num')[0];
	if(num){
		num.innerHTML = (parseInt(num.innerHTML) || 0) + 1;
	} else {
		UI.after(UI.html('<a class="top_num c_tx3">1</a>')[0],praiseBtn);
	};
	
	Self.addOneAnimate(praiseBtn);
	Self.praiseCache[o.id] = 1;
	UI.addClass(praiseBtn,'ico_notop');
	praiseBtn.onclick = function(){return false};
	
	if (MI.user.isLab) {
		MI.ajax({
			url : MI.url.praiseReply,
			data : {id : o.id.split('_')[0]} //17688098035048_relay or 17688098035048
		});
	}
}

//同步到QZone
MI.TalkList.prototype.showSyncQzone = function(talkBox,li,isComt){
	talkBox._syncQzone = talkBox._syncQzone || $$(talkBox._body,'.replayQzoneCheckbox')[0];
	if(talkBox._syncQzone) {
		var s = talkBox._syncQzone,p = s.parentNode,pp = p.parentNode;
		talkBox.syncQzoneOld = UI.A(li,'syncQzone') ? 0 : 1; //1:空间分享(旧)，0：说说(新)
		
		if(talkBox.syncQzoneOld) { //空间分享(旧)
			p.style.display = isComt ? 'none' : '';
			pp.style.display = '';		
			talkBox.data.share = isComt ? 0 : talkBox._syncQzone.checked*1;
			talkBox.data.syncQzone = 0;	
		} else { //说说(新)
			p.style.display = '';
			pp.style.display = '';
			talkBox.data.syncQzone = talkBox._syncQzone.checked*1;
			talkBox.data.share = 0;
		}
	}
}

MI.TalkList.prototype._iconPicToggle = function(el){ //切换图标模式
	var Self = this,
		isIconPic = UI.hasClass(Self._body,'iconPic');
	UI.toggleClass(Self._body,'iconPic');
	Self.iconPic = isIconPic ? 0 : 1;
	MI.Crs(1);
	UI.each($$(Self._body,'.picBox'),function(o,i){
		var imgs = $$(o,'a img'),
			img = imgs.length > 1 ? imgs[1] : imgs[0],
			a,
			picUrl,
			src;
		if (img){
			if (imgs.length > 1 && img.className != '' && img.className != 'preview' && img.className != 'crs'){ //无缩略图预览，且已经放大的情况
				img = imgs[0];
			}
			a = img.parentNode;
			if (a.nodeName == 'A' && a.href){
				picUrl = a.href.replace(/460$/,'');
				src = isIconPic ? (picUrl + '160') : MI.Crs.iconPicUrl;
				if (UI.hasClass(img,'crs')){
					UI.A(img,'crs',src);
				}
				else {
					img.src = src;
				}
			}
		}
	});
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
		replyBox = $$(el,'.replyBox')[0],
		comt = $$(el,'.comt')[0],
		reply = $$(el,'.reply')[0],
		relay = $$(el,'.relay')[0],
		del = $$(el,'.delBtn')[0],
		moreFun = $$(el,'.mFun a')[0],
		trans = $$(el,'.btn_trans'),
		//moreFun = $$(el,'.moreFun')[0],
		replyMsg = $$(el,'.replyMsg')[0],
		areaInfo = $$(el,'.areaInfo a'),
		eventPic = $$(el,'.eventPic')[0],   //活动图标，如（圣诞送礼）
		shortUrl = $$(el,'.url'), //短url	
		fileBox = $$(el,'.fileBox'), //文件分享
		musicBox = $$(el,'.musicBox,.musicAlbum'),
		orderWrap = $$(el,'.orderWrap')[0], //订单
		voteBox = $$(el,'.voteBox'),//投票
		relayListTmp = $$(el,'.relayList')[0];//默认展开的relayList
		vMode = relayListTmp ? UI.A(relayListTmp,'vmode') : 0;//是否默认展开了 relayList
		if(!viewRelay){
			vMode = 0;
			if(relayListTmp)	UI.hide(relayListTmp);
		}
		if(vMode){//将默认展开的talklist状态记录到主li节点上
			UI.A(el,'vmode',vMode);
		}

	if(!Self.praiseCache) Self.praiseCache = {}; //缓存用户“赞”过的转播和评论
	if (!Self.apiType && MI.api.type){
		Self.apiType = MI.api.type;
	}
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
		if (MI.user.fun.comtReply){ //默认显示的评论回复框
			var comtReply = Self.getComtReply(el);
			if (comtReply){
				comtReply.onclick = function(){
					comt.onclick();
					MI.Bos('btnComtReply');
				}
			}
		}
		comt.onclick = function(){
			var mode = UI.A(el,'vmode');
			//var comtBoxTmp = mode ? 'comtBox_' + elId : 'comtBox';
			var comtBoxTmp = 'comtBox';
			if(Self.type == 2 && !Self[comtBoxTmp]){ //如果是群内讨论页面的评论
				Self._comt = UI.html(Self.talkBoxTmpl.replace('<div class="left"></div>','<div class="left"><label style="display:"><input id="replayListCheckbox" type="checkbox" class="check1" style="display:none;">'  + '</label></div>'))[0];
			}
			Self.creatBox(el);
			if(Self.isQun == 1){
				var wqid = MI.string.parseInt(UI.A(el,"wqid"));
				Self[comtBoxTmp].data.wqid = wqid;
			}
			var qroot = UI.A(el,"qroot")
			if(qroot){
				Self[comtBoxTmp].data.qroot = qroot;
			}
			try{
				Self.curSource = this.href.match(/[^\/]+$/g)[0].match(/[0-9]*[0-9]/g);
			}catch(e){}
			Self.setArrowX(UI.parents(this,'mFun')[0] || this,time);
			Self[comtBoxTmp]._relayCheck.checked = false;
			Self[comtBoxTmp]._relayCheck.onclick();
			Self.reply(elId || el,2,UI.A(this,'num'));
			Self.replyCont = UI.A(this,'cont');
			Self.replyTarget = this;
			Self.showSyncQzone(Self[comtBoxTmp],el,comt); //显隐syncQzone
			// 评论列表
			Self.createComtList(0,elId || el);
			MI.Bos('btnComt');
			return false;
		}
	}
	if (reply) { // 对话
		reply.onclick = function(){
			Self.creatBox(el);
			Self.setArrowX(UI.parents(this,'mFun')[0] || this,time);
			Self.reply(elId || el,0);
			Self.replyCont = UI.A(this,'cont');
			Self.replyTarget = this;
			MI.Bos('btnReply');
			return false;
		}
	}
	if (relay) { // 转播
		relay.onclick = function(){
			var mode = UI.A(el,'vmode');
			//var relayBoxTmp = mode ? 'relayBox_' + elId : 'relayBox';
			var relayBoxTmp = 'relayBox';
			Self.creatBox(el);
			if(Self.isQun==1){
				var wqid=MI.string.parseInt(UI.A(el,"wqid"));
				Self[relayBoxTmp].data.wqid=wqid;
			}
			var qroot = UI.A(el,"qroot")
			if(qroot){
				Self[relayBoxTmp].data.qroot = qroot;
			}
			Self.setArrowX(this,time);
			Self.reply(elId || el,1,UI.A(this,'num'));
			Self.replyCont = UI.A(this,'cont');
			Self.replyTarget = this;
			Self.showSyncQzone(Self[relayBoxTmp],el); 
			// 转播列表
			if (MI.user.fun.newRelay2){
				Self.createComtList(1,elId || el);
			}
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
	if ( (viewRelay && !viewRelay.innerHTML.hasString(_('对话'))) || vMode) { // 查看转播
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
				if (Self.apiType){
					data += '&apiType=' + Self.apiType;
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
				/*
				  * 微群Timeline改版，默认展开了全部转播和评论
				  * mode为新增参数
				  * 微群中新版talklist传递进来的参入，mode==1代表relayList获取已经存在，只需绑定事件，无需data处理
				*/
				var mode = UI.A(el,'vmode'),tmpMode = UI.A(relayList,'vmode'),relayListBoxTmp = relayBoxTmp = 'relayListBox';
				if(mode){
					relayListBoxTmp = 'relayListBox_' + elId;
					relayBoxTmp = 'relayListBox_' + elId;
				}
				data = MI.json(data);
				if (!mode && data.result != 0){//主站才使用此逻辑，微群不用此处逻辑
					if (data.msg){
						MI.alert(data.msg);
					}
					Self.relayListHide();
					return;
				}
				UI.hide(relayListLoad);
				if(!tmpMode){
					UI.remove(Self[relayListBoxTmp]._body);
				}
				if(!tmpMode)	relayListCont.innerHTML = data.info;//type为微群新增的字段，!type时触发主站逻辑，type==1时触发微群新talklist逻辑
				UI.show(relayListCont);

				//Eval Javascript
				if(!tmpMode)	UI.evalScript(data.info);//type为微群新增的字段，主站才使用此逻辑，微群不用此处逻辑

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
							//try{
								var _relayCite = $$(o,'.relayCite')[0],
									_replyCite = $$(o,'.replyCite')[0],
									_praiseCite = $$(o,'.ico_top1')[0], 
									_report = $$(o,'.alarm')[0];
								if (_relayCite) {
									_relayCite.onclick = function(){
										if(mode){
											relayListBoxTmp = 'relayListBox_' + elId;
											relayBoxTmp = 'relayListBox_' + elId;
										}
										Self[relayBoxTmp].guideText = null;
										UI.show(Self[relayBoxTmp]._body);
										UI.addClass(Self[relayBoxTmp]._body,'zfWrap');
										if(UI.hasClass(Self[relayBoxTmp]._body,'comtWrap')){
											UI.removeClass(Self[relayBoxTmp]._body,'comtWrap');
										}
										UI.removeClass(Self[relayBoxTmp]._txt,'cNote');
										Self.getRelayOld(o,'.content',Self[relayBoxTmp]);
										Self[relayBoxTmp].txtTipSend = _('转播中');
										Self[relayBoxTmp]._btn.value = _('转播');
										Self.showSyncQzone(Self[relayBoxTmp],el);
	
										Self[relayBoxTmp].talkId = MI.string.parseInt(o.id);

										//Auto Select CheckBox Of Relay
										Self[relayBoxTmp]._relayCheck.checked = true;
										Self[relayBoxTmp]._relayCheck.onclick();
										return false;
									}
								}
								if (_replyCite){
									_replyCite.onclick = function(){
										if(mode){
											relayListBoxTmp = 'relayListBox_' + elId;
											relayBoxTmp = 'relayListBox_' + elId;
										}
										Self[relayBoxTmp].guideText = null;
										UI.show(Self[relayBoxTmp]._body);
										UI.addClass(Self[relayBoxTmp]._body,'zfWrap');
										UI.addClass(Self[relayBoxTmp]._body,'comtWrap');
										UI.removeClass(Self[relayBoxTmp]._txt,'cNote');
										Self.getRelayOld(o,'.content',Self[relayBoxTmp]);
										Self[relayBoxTmp].txtTipSend = _('评论中');
										Self[relayBoxTmp]._btn.value = _('评论');
										Self.showSyncQzone(Self[relayBoxTmp],el,1);
			
										Self[relayBoxTmp].talkId = MI.string.parseInt(o.id);
										
										//Auto Select CheckBox Of Relay
										Self[relayBoxTmp]._relayCheck.checked = false;
										Self[relayBoxTmp]._relayCheck.onclick();
										return false;
									}
								}
								if(_praiseCite) {
									if(Self.praiseCache[o.id]) {
										UI.addClass(_praiseCite,'ico_notop');
										_praiseCite.onclick = function(){return false;};
									} else {
										_praiseCite.onclick = function(){
											Self.praise(o,this);
											return false;
										}
									}
								}
								if (_report){
									_report.onclick = function(){
										if(MI.user.fun.btnStyle==5 || MI.user.fun.btnStyle==6){
											//Self.reportQun(o.id,MI.Group.qid,1);
											Self.report(o.id,this,1,{qid:MI.Group.qid,zone:1});
										}
										else {
											Self.report(o.id,this);
										}
										return false;
									}
								}
							//}catch(e){}
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
				UI.A(relayBoxTip,'vmode',mode);//传递微群talklist mode进去
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

				//Callback
				if (Self.relayListCall){
					Self.relayListCall(relayList);
				}

				MI.PV('relay');
			},
			createRelayBox = function(){
				UI.hide(this);
				var relay,isRelay = 1,relayListBoxTmp = 'relayListBox',relayBoxTmp = 'relayBox',mode = UI.A(el,'vmode'),tmpMode = UI.A(relayList,"vmode");//MI.S('option_relayListCheck_' + MI.user.account) != -1
				if(mode){
					relayListBoxTmp = 'relayListBox_'+elId;
					//relayBoxTmp = 'relayBox_'+elId;
					relayBoxTmp = 'relayBox';
				}
				if(Self.type == 2 || mode){	//群内私聊没有转播
					isRelay = 0;
				}
				if (!this.appended) {
					Self.creatBox(el);

					//relayBox = Self[relayListBoxTmp];
					relayTip = $$(relayListCont,'.relayThumb')[0];
					if(Self.isQun == 1){
						var wqid = MI.string.parseInt(UI.A(el,"wqid"));
						Self[relayListBoxTmp].data.wqid = wqid;
					}
					var qroot = UI.A(el,"qroot");
					if(qroot){
						Self[relayListBoxTmp].data.qroot = qroot;
					}
					Self[relayListBoxTmp]._txt.value = '';
					Self[relayListBoxTmp].countTxt();
					Self[relayListBoxTmp]._relayCheck = $$(Self[relayListBoxTmp]._body,'.check1')[0];
					Self[relayListBoxTmp].successStart = function(){
						var refresh = $$(relayListCont,'.refreshBth')[0];
						if (refresh) {
							refresh.onclick();
						}
						//简版不显示弹出层
						if(!MI.Nano){
							if (Self[relayListBoxTmp].type == 1){
								MI.tip(_('转播成功！'));
								MI.Bos('btnSendRelayList');
							}
							else {
								MI.tip(_('评论成功！'));
								MI.Bos('btnSendComtList');
							}
						}
						Self.updateRelayNum(Self[relayListBoxTmp].type);
					}
					Self[relayListBoxTmp].start = function(){
						clearTimeout(delay);
					}

					relay = Self[relayListBoxTmp]._body;
					if(tmpMode){
						UI.replace(relay,$$(this.parentNode,'.zfWrap')[0]);
					}else{
						UI.after(relay,this);
					}
					
					/*UI.EA(relayBox._txt,'blur',function(){
						if (!relayBox._txt.value) {
							delay = setTimeout(function(){
								UI.hide(relayBox._body);
								UI.show(relayTip); 
							},300);
						}
					});*/
					//UI.after(relay,this);
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
					Self[relayListBoxTmp]._body.ondblclick = function(e){
						UI.E(e).stop();
					}
					if (!UI.B.ie) {
						Self[relayListBoxTmp]._body.onmousedown = function(e){
							UI.E(e).stop();
						}
					}
					//同时转播给你的听众
					Self[relayListBoxTmp]._relayCheck.onclick = function(){
						var checked = this.checked;
						Self[relayListBoxTmp].type = checked ? 1 : 4;
						Self[relayListBoxTmp]._tip.innerHTML = '';
						Self[relayListBoxTmp].countTxt();
						Self[relayListBoxTmp].addList = checked ? Self[relayBoxTmp].addList : 0;
						//MI.S('option_relayListCheck_' + MI.user.account,checked ? 1 : -1);
						MI.Bos('btnRelayistCheckbox');
					}
					if(!tmpMode)	this.appended = 1;
					if (!Self.relayListMulti){
						Self.talkBox = Self[relayListBoxTmp];
					}
					
				}
				else {
					UI.show(this.nextSibling);
				}
				
				//转播框状态初始化
				if (MI.user.fun.relayListBoxCondensed){
					UI.addClass(Self[relayListBoxTmp]._body,'condensed');
					Self[relayListBoxTmp].guideTextAdd(isRelay ? _('点击转播') : _('点击评论'));
				}
				else if(!tmpMode){
					setTimeout(function(){
						Self[relayListBoxTmp].focus();
						//Self.getRelayOld(el,'.msgBox .msgCnt',Self[relayListBoxTmp]);
					},100);
				}
				Self[relayListBoxTmp].txtTipSend = isRelay ? _('转播中') : _('评论中');
				Self[relayListBoxTmp]._btn.value = isRelay ? _('转播') : _('评论');
				Self[relayListBoxTmp].addList = isRelay ? Self.relayBox.addList : 0;
				//Self[relayListBoxTmp].talkId = UI.A(viewRelay,'rel');
				Self[relayListBoxTmp].talkId = elId;
				Self[relayListBoxTmp].type = isRelay ? 1 : 4;
				Self[relayListBoxTmp].apiType = Self.apiType;
				Self[relayListBoxTmp].iconPic = Self.iconPic;
				Self[relayListBoxTmp].autoHeight = 30;
				Self.showSyncQzone(Self[relayListBoxTmp],el,!isRelay);
				
			};
		var viewRelayEvent = function(e,obj){
			if(e){
				var E = UI.E(e),
					userClick = E.type;
				Self.msgMode = userClick ? 0 : 1;
			}
			obj = obj ?obj :this;
			var mode = UI.A(el,'vmode'),tmpMode;
			if (!relayList){ //设置转播列表DOM
				if (Self.relayListMulti){
					relayListId = elId;
				}
				if (!Self['_relayList' + relayListId] || Self.relayListMulti){
					Self.relayListCreate(relayListId,mode);
				}
				relayList = Self['_relayList' + relayListId];
				relayListLoad = Self['_relayListLoad' + relayListId];
				relayListCont = Self['_relayListCont' + relayListId];
			}
			tmpMode = UI.A(relayList,'vmode');
			var _showAll = $$(relayListCont,'.pages .left')[0];
			if(tmpMode){
				_showAll.onclick = function(){
					var s = UI.A(this,'expand');
					if(!s){
						viewRelay.onclick();
						UI.A(this,'expand',1);
						return false;
					}else{
						return true;
					}
				}
			}
			if (Self.xhr.relay && !Self.relayListMulti) {
				Self.xhr.relay.abort();
			}
			var href = obj.href,
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
			UI.A(obj,'rel',id);
			relayListNum = obj;

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
				if(!tmpMode){
					UI.hide(relayListCont);
					UI.show(relayListLoad);
				}
				UI.append(relayList,$$(el,'.msgBox')[0]);
				Self.hideComtReply(el); //评论回复
				
				Time = + new Date();
				
				var ajaxUrl = MI.url.relayList, //请求地址
					messageUrl = { //请求参数
						id : id,
						viewModel : Self.iconPic,
						r : MI.random()
					};
				if (Self.apiType){
					messageUrl.apiType = Self.apiType;
				}
				if(Self.type==2){
					messageUrl.zone = 2;
				}
				if (relayListOption){ //如果是At聚合
					if (relayListOption.url){
						ajaxUrl = relayListOption.url;
					}
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
				if(tmpMode){//新版微群timeline，默认无需载入转播列表，直接处理相关事件即可
					pageLink('',el);//
					UI.A(relayList,'vmode',0);
				}else{
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
				}
				
				scrollTop = UI.scrollY();
				Y = UI.getY(obj);
				if (Y && Y < scrollTop) { //(Y > scrollTop + windowHeight * 3 / 4) || 
					window.scrollTo(0,Y);
				}

				if(!tmpMode){
					UI.addClass(el,'cur');
					Self.cur = li;
					relayList.display = 1;
				}
				MI.Bos('btnViewRelay',li);
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
			
			return false;
		}
		if(vMode){
			viewRelayEvent('',viewRelay);
		}
		viewRelay.onclick = viewRelayEvent;
	}
	if (viewRelay2 && viewRelay2.nodeName == 'A'){ //二次转播
		viewRelay2.onclick = function(){			
			if (Self.relay2Cur && Self.relay2Cur == this){ //隐藏列表
				Self.relayListHide();
			} else { //显示列表
				Self.relayListOption = {
					url : MI.url.relayListSecond, //请求地址
					data : { //请求参数
						id : elId
					},
					call : function(){ //回调函数
						
					}
				}
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
				target = E.target,
				nodeName = target.nodeName,
				isClose = target.className.hasString('vClose'),
				T = this,
				Detail = $$(T,'.orderDetail')[0],
				Img = $$(T,'img')[0];
			var toggle = function(){
				Detail = $$(T,'.orderDetail')[0];
				Img = $$(T,'img')[0];
				UI.toggleClass(T,'orderView');
				MI.Bos('btnViewOrderDetail');
				if (Img){ //修复渲染bug，日后扩展可能会带来麻烦
					if (!UI.hasClass(Img,'goodsPic')){
						UI.remove(Img.parentNode);
						UI.prepend(Img,Detail);
					}
					UI.addClass(Img,'goodsPic');
				}
			}
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
								toggle();
							}
						});
						UI.A(T,'loading',1);
					}
				}
				else {
					toggle();
				}
				if (isClose){
					return false;
				}
			}
			else if (nodeName == 'A' || target.parentNode.nodeName == 'A' || target.parentNode.parentNode.nodeName == 'A') {
				MI.Bos('btnViewOrderLink');
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
				var wqid=MI.string.parseInt(UI.A(el,"wqid"));
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
				var wqid=MI.string.parseInt(UI.A(el,"wqid"));
				MI.Group.qid=wqid;
			}
			Self.upTop(elId,this.type);
			UI.E(e).stop();
			return false;
		}
		upTop.onmouseover = MI.hideFocus;
	}
	/*
	if (unUpTop) {	//删除置顶
		unUpTop.onclick = function(){
			if(Self.isQun==1)
			{
				var wqid=MI.string.parseInt(UI.A(el,"wqid"));
				MI.Group.qid=wqid;
			}
			Self.confirm(elId,8);
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
				var wqid=MI.string.parseInt(UI.A(el,"wqid"));
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
				var wqid=MI.string.parseInt(UI.A(el,"wqid"));
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
				var wqid=MI.string.parseInt(UI.A(el,"wqid"));
				MI.Group.qid=wqid;
			}
			if (Self.type == 3) {
				Self.confirm(elId,10);
				MI.Bos('btnNoticeDel');
			} else {
				Self.confirm(elId);
				if (MI.talkBox && MI.talkBox.type == 6){
					MI.Bos('btnNotepadDel');
				}
				else {
					MI.Bos('btnDel');
				}
			}
			return false;
		}
	}
	if (report.length) { // 举报
		UI.each(report,function(o){
			o.onclick = function(){
				if((MI.user.fun.btnStyle==5 || MI.user.fun.btnStyle==6) )
				{
					//Self.reportQun(el.id, MI.Group.qid, 1);
					Self.report(elId,this,1,{qid:MI.Group.qid,zone:1});
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
	if (MI.user.fun.urlPreview && shortUrl.length) {
		if(!UI.A(el,'preview')) {
			UI.each(shortUrl,function(o){
				Self.urlPreview.showPreview(o);
				return false;
			})
		}
		UI.A(el,'preview',1);
	}
	if (areaInfo.length) {
		UI.each(areaInfo,function(o,i){
			o.onclick = function(){
				Self.geolocation.show(this);
				return false;
			}
		})
	}
	if (eventPic) {
		eventPic.title = _('点击试试');
		eventPic.onclick = function(){
			var eventId = UI.A(this,'eventId');
			if(!eventId) return false;
			MI.app({
				TalkBoxRich : function(){
					MI.sendGiftShow(eventId);	
				}
			})	
			return false;
		}	
	}
	if (musicBox) {
		MI.TalkList.musicEvent(musicBox);
	}
	if (voteBox) {
		MI.TalkList.voteEvent(voteBox);
	}
	if (fileBox) {
		MI.TalkList.fileEvent(fileBox, el);	
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
MI.TalkList.prototype.createComtList = function(type,id){ //type:0-评论列表 1-转播列表
	var Self = this;
	if (!Self.comtBoxList){
		return;
	}
	var elId = Self.cur,
		el = $(elId),
		mode = UI.A(el,'vmode'),
		relayBoxTmp = 'relayBox',
		comtBoxTmp = 'comtBox';
		//relayBoxTmp = mode ? 'relayBox_' + elId : 'relayBox',
		//comtBoxTmp = mode ? 'comtBox_' + elId : 'comtBox';
	var comtBox = type ? Self[relayBoxTmp] : Self[comtBoxTmp],
		comtList = type ? Self[relayBoxTmp]._relayList : Self[comtBoxTmp]._relayList,		
		comt = $$(el,'.comt')[0],
		relay = $$(el,'.relay')[0],
		replyBox = $$(el,'.replyBox')[0];
	var Y,
		scrollTop,
		pageLinkClick = function(){
			var messageUrl = {
				t : type ? 1 : 2,
				r : MI.random()
			};
			if (Self.apiType){
				messageUrl.apiType = Self.apiType;
			}
			MI.ajax({
				url : this.href,
				type : 'get',
				data : messageUrl,
				success : function(data){
					pageLink(data);
				}
			});
			//Self.relayListPosition();
			return false;
		},
		pageLink = function(data){
			data = MI.json(data);
			if (!(data.result == 0 && data.info)){
				return;
			}
			comtList.innerHTML = data.info;
			UI.show(comtList);

			//Eval Javascript
			UI.evalScript(data.info);
			
			//Update Number
			var num = $$(comtList,'.num,.num2')[0],numValue,numDom;
			if (num){
				numValue = num.innerHTML;
				if (numValue){
					numDom = $$(Self[relayBoxTmp]._body,'.number a')[0];
					numTarget = type ? relay : comt;
					if (numDom){
						numDom.innerHTML = numDom.innerHTML.replace(/\d+/g,numValue);
						UI.A(numTarget,'num',numValue);
					}
					if (MI.user.fun.newRelay2 && replyBox){
						numTarget.innerHTML = numTarget.innerHTML.replace(/\d+/g,numValue);
						UI.A(numTarget,'num',numValue);
						if (numTarget.title){
							numTarget.title = numTarget.title.replace(/\d+/g,numValue);
						}
					}
				}
			}

			//Page Control
			var pages = $$(comtList,'.pages a,.tabStyle1 a');
			UI.each(pages,function(o){
				if (!UI.A(o,'target')) {
					o.onclick = pageLinkClick;
				}
			});
			var li = $$(comtList,'li');
			if (li.length) {
				UI.addClass(li[li.length - 1],'nobor');
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
						_praiseCite = $$(o,'.ico_top1')[0], 
						_report = $$(o,'.alarm')[0];
						if (_relayCite) {
							_relayCite.onclick = function(){
								UI.addClass(comtBox._body,'zfWrap');
								if(UI.hasClass(comtBox._body,'comtWrap')){
									UI.removeClass(comtBox._body,'comtWrap');
								}
								UI.removeClass(comtBox._txt,'cNote');
								Self.getRelayOld(o,'.content',comtBox);
								comtBox.txtTipSend = _('转播中');
								comtBox._btn.value = _('转播');
								comtBox._btn.title = _('转播');
								Self.showSyncQzone(comtBox,el);
								comtBox.type = 1;
								comtBox.talkId = MI.string.parseInt(o.id);
								return false;
							}
						}
						if (_replyCite) {
							if (1){
								_replyCite.onclick = function(){
									UI.addClass(comtBox._body,'zfWrap');
									UI.addClass(comtBox._body,'comtWrap');
									UI.removeClass(comtBox._txt,'cNote');
									Self.getRelayOld(o,'.content',comtBox);
									comtBox.txtTipSend = _('评论中');
									comtBox._btn.value = _('评论');
									comtBox._btn.title = _('评论');
									Self.showSyncQzone(comtBox,el,1);
									comtBox.type = 5;
									comtBox.addList = Self[comtBoxTmp].addListTmp;
									comtBox.talkId = MI.string.parseInt(o.id);
									return false;
								}
							}
							else {
								_replyCite.onclick = function(){
									var account = $$(UI.parents(this,'msgCnt')[0],'strong a')[0];
									if (account){
										comtBox._txt.value = _('回复') + '@' + MI.string.account(account.title || UI.A(account,'rel')) + ':';
									}
									Self.showSyncQzone(comtBox,el,1);
									comtBox.focus();
									return false;
								}
							}
						}
						if(_praiseCite) {
							if(Self.praiseCache[o.id]) {
								UI.addClass(_praiseCite,'ico_notop');
								_praiseCite.onclick = function(){return false;};
							} else {
								_praiseCite.onclick = function(){
									Self.praise(o,this);
									return false;
								}
							}
						}
						if (_report){
							_report.onclick = function(){
								Self.report(o.id,this);
								return false;
							}
						}
					}catch(e){}
				});
			}
			
			//Disabled dblclick select
			comtList.onclick = function(){
				MI.DisableDblClickSelect(this);
			}
			comtList.ondblclick = function(){ //Auto Go Next Page When Double Click
				var hasNext = 0;
				UI.each($$(comtList,'.pages a'),function(o){
					if (o.innerHTML.hasString(_('下一页'))) {
						hasNext = o;
					}
				});
				if (hasNext) {
					hasNext.onclick();
				}
				else {
					comtBox.hide();
					Self.replyHide();
				}
			}
			if (UI.B.ie) { //Kill Select Txt Bug In IE
				comtList.onmousedown = function(){
					comtList.onselectstart = null;
				}
				comtList.onmouseup = function(){
					comtList.onselectstart = function(){
						return false;
					}
				}
			}

			//Build Tips
			Self.buildTips(comtList);
			MI.Card.build(comtList,'.msgCnt strong a,.msgCnt em a,.cNote2 a,.more a',2);
			
			//Show Face
			MI.Crs(1);
			
			//Callback
			if (Self.relayListCall){
				Self.relayListCall(comtList);
			}

			MI.PV('comt');
		},
		Time,Time_1,Time_2,Time_3;
	Time = + new Date();
	if (Self.xhr.comt) {
		Self.xhr.comt.abort();
	}
	
	//重置转播框属性，因为转播列表既有转播又有评论
	if (type){
		UI.addClass(comtBox._body,'zfWrap');
		if(UI.hasClass(comtBox._body,'comtWrap')){
			UI.removeClass(comtBox._body,'comtWrap');
		}
		comtBox.txtTipSend = _('转播中');
		comtBox._btn.value = _('转播');
		comtBox._btn.title = _('转播');
		comtBox.type = 1;
		comtBox.addList = comtBox.addListTmp;
	}
	
	//清空老列表
	comtList.innerHTML = '';
	UI.hide(comtList);
	
	//拉取新列表
	var messageUrl = {
		t : type ? 1 : 2,
		id : (MI.user.fun.newRelay2 && replyBox ? elId : Self.curSource),
		viewModel : Self.iconPic,
		r : MI.random()
	};
	if(Self.type==2){
		messageUrl.zone = '2';
	}
	if (Self.apiType){
		messageUrl.apiType = Self.apiType;
	}
	if ((type && replyBox) || !type){
		Self.xhr.comt = MI.ajax({
			url : (MI.user.fun.newRelay2 && replyBox ? MI.url.relayListSecond : MI.url.relayList),
			type : 'get',
			data : messageUrl,
			success : function(data){
				Time_1 = + new Date() - Time;
				pageLink(data);

				//Speed
				Time_2 = + new Date() - Time;
				setTimeout(function(){
					Time_3 = + new Date() - Time;
					MI.Speed('t_asyn_comt',0.1,Time_1,Time_2,Time_3);
				},0);
			}
		});
	}
	
	//定位
	scrollTop = UI.scrollY();
	Y = UI.getY(type ? relay : comt);
	if (Y && Y < scrollTop) { //(Y > scrollTop + windowHeight * 3 / 4) || 
		window.scrollTo(0,Y);
	}
	
	//回调
	comtBox.successStart = function(){
		Self.updateRelayNum();
		UI.hide(comtList);
		var refresh = $$(comtList,'.refreshBth')[0];
		if (refresh) {
			refresh.onclick();
		}
	}
}
MI.TalkList.prototype.reply = function(id,type,number){ //type : 0(reply) 1(relay) 2(comt)
	var Self = this,
		li = $(id),
		mode = UI.A(li,'vmode'),
		comtBoxTmp = 'comtBox',
		relayBoxTmp = 'relayBox',
		replyBoxTmp = 'replyBox';
		//comtBoxTmp = mode ? 'comtBox_' + id : 'comtBox',
		//relayBoxTmp = mode ? 'relayBox_' + id : 'relayBox',
		//replyBoxTmp = mode ? 'replyBox_' + id : 'replyBox';
	if (MI.card) {
		UI.remove(MI.card._body);
	}
	//Relay List
	Self.relayListHide(id);

	if (Self.talkBox) {
		Self.talkBox.hide();
		if (Self.replyTarget){
			UI.A(Self.replyTarget,'cont',Self.talkBox._txt.value);
		}
	}
	if (Self.talkBox && Self.cur && Self.cur != id && Self.talkBox.display) {
		Self.talkBox.display = 0;
	}
	if (type == 2) {
		Self.talkBox = Self[comtBoxTmp];
	}
	else {
		Self.talkBox = type ? Self[relayBoxTmp] : Self[replyBoxTmp];
	}
	
	Self.talkBox.apiType = Self.apiType;
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
			author = $$(li,'.userName a')[0] || $$(li,'strong a')[0],
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

		Self._relayNum = type ? $$(li,'.relayNum') : null;

		var className,_curTitle,curTitle,
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
		_curTitle = $$(Self._talk,'.replyTitle')[0];
		if (_curTitle) {
			_curTitle.innerHTML = curTitle;
		}

		//ClassName
		if (type == 2) {
			className = 'talkWrap comtWrap bgr3';
			if(Self.type==1 || Self.type==2)
			{
				//className = 'talkWrap';
			}
		}
		else {
			className = (type ? 'zfWrap' : 'talkWrap') + ' bgr3';
		}
		Self.talkBox._body.className = className;

		account = MI.string.account(title);
		if (replyBox && name2 && (type == 1 || type == 2) && !$$(li,'.view')[0]) { //添加转播评论
			Self.talkBox._addReply.innerHTML = '&nbsp;<a href="#">[' + (type == 1 ? _('清空转播理由') : _('清空评论')) + ']</a>';
			addReplyTxt = Self.talkBox._addReply.txt = ' || @' + account + ': ' + UI.trim(contentBase);
			UI.show(Self.talkBox._addReply);
			/*
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
			*/
		}
		else {
			UI.hide(Self.talkBox._addReply);
			//talkBoxTxt.onkeyup = null;
		}

		//Set TalkBox Prototype
		if (isNaN( MI.string.parseInt(id) )){
			Self.talkBox.talkId = id;
		}
		else {
			Self.talkBox.talkId = MI.string.parseInt(id);
		}
		Self.talkBox.type = type ? 1 : 2;
		if (!Self[comtBoxTmp]._relayCheck.checked && type == 2) { //评论
			Self.talkBox.talkId = MI.string.parseInt(id);
			Self.talkBox.type = 5;
		}

		Self.talkBox._txt.value = '';
		/*contentTopic = (contentTmp || content).match(/(#\s*[^#\s]{1}[^#]{0,59}?\s*#)/g); //Auto Add Topic

		Self.talkBox._txt.value = contentTopic && type ? contentTopic.join('') : '';
		contentTopicLength = Self.talkBox._txt.value.length*/
		Self.talkBox.countTxt();
		var atDetail = $$(li,'.at_detail')[0];
		if (atDetail){ //如果有At聚合，就插到At聚合前面
			UI.before(Self._talk,atDetail);
		}
		else {
			UI.append(Self._talk,$$(li,'.msgBox')[0]);
		}
		setTimeout(function(){
			talkBoxTxt.focus();
			if (Self.replyCont){ //默认内容
				talkBoxTxt.value += Self.replyCont;
			}
			else { //自动添加转播评论
				if (type) {
					Self.getRelayOld(li,'.msgCnt',Self.talkBox);
				}
			}

			Self.talkBox.countTxt();
			MI.selectTxt(talkBoxTxt,0,0,0);

			/*if (type == 2 && MI.user.fun.comtReply){ //评论回复
				var comtReply = Self.getComtReply(li);
				if (comtReply){
					talkBoxTxt.value = comtReply.innerHTML;
					Self.talkBox.focus();
				}
			}*/
		},50);

		//Relay And Comt's Number
		if (type != 0) {
			var txtRepost =  (number < 1) ? _('转播') : _('转播<i class="l"></i>');
			var txtComment = (number < 1) ? _('评论') : _('评论<i class="l"></i>');
			var numHTML,
				numberType = type == 1 ? txtRepost : txtComment,
				bossName = type == 1 ? 'Relay' : 'Comt',
				link = type == 1 ? '?filter=5' : '?filter=6';
			if((Self.type == 1 || Self.type == 2) && type != 1){
				numberType = (number < 1) ? _('评论') : _('评论<i class="l"></i>');
			}
			numHTML = numberType + _('原文');
			var tempHTML = window.MILang == 'en_US' ? '' : numberType;
			if (number > 0 && !(MI.user.fun.newRelay2 && relay) && MI.user.fun.btnStyle != 6){//私密群不展示评论条数// && !MI.user.isLab （实验室二传手不显示数字）
				//numHTML += _('，') + '<a href="http://t.qq.com/p/t/' + sourceId + '/' + link + '" onclick="MI.Bos(\'btn' + bossName + 'View\')" target="_blank">' + 
				numHTML += _('，') + '<a href="' + MI.getInternalUrl(1, sourceId, '/' + link) + '" onclick="MI.Bos(\'btn' + bossName + 'View\')" target="_blank">' + 
					((number != 0 && number) ? _('共{0}条',number) + tempHTML : '') + '<em class="ffsong">>></em></a>';
			}
			else {
				numHTML += type == 1 ? _('，把它分享给你的听众') : '';
			}
			Self.talkBox._numSon.innerHTML = numHTML;
		}

		var btnName;
		if (type == 1){
			btnName = _('转播');
		}
		else if (type == 2){
			btnName = _('评论');
		}
		else {
			btnName = _('对话');
		}
		Self.talkBox._btn.value = btnName;

		Self.cur = id;
		Self.talkBox.display = 1;
	}
	else {
		Self.talkBox.hide();
		Self.replyHide();
	}
	var boxs = [Self[replyBoxTmp],Self[relayBoxTmp],Self[comtBoxTmp]];
	UI.each(boxs,function(o,i){
		if (type != i) {
			o.hide();
			o.display = 0;
		}
	});
	if (Self[replyBoxTmp].display || Self[relayBoxTmp].display || Self[comtBoxTmp].display) {
		UI.addClass($(Self.cur),'cur');
		if (UI.B.ie6){
			UI.addClass($(Self.cur),'hover');
		}
		Self.hideComtReply(li); //评论回复
	}

	Self.setArrow($$(Self.talkBox._body,'.SA')[0]);

	function checkTalkId(){ //兼容没有微博ID的情况
		var id = li.id;
		if (isNaN( MI.string.parseInt(id) )){
			Self.talkBox.talkId = id;
		}
		else {
			Self.talkBox.talkId = MI.string.parseInt(id);
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
	if (isNaN( MI.string.parseInt(id) )){
		data.id = id;
	}
	else {
		data.id = MI.string.parseInt(id);
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
	if(type == 10) { //删除通知
		data = {id:temp,r:data.r};
		url = Self.delNoticeUrl;
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
				/*		if (MI.user.fun.favGroup){
							MI.app({
								TalkListFav : function(){
									MI.favorites && MI.favorites.favSuccess(id);
								}	
							});
						}	
				*/		//favBtn.blur();
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
							if (MI.guest){ // 客人页置顶刷新页面
								MI.dialog.closeEnd = function(){
									MI.Bos('btnUpTopClose');
									MI.goHome('preview');
								}
							}
							MI.talk.reply.talkBox.successStart = function(){
								MI.Bos('btnUpTopSend');
								MI.tip(_('广播成功!'));
								MI.goHome('preview');
							}
							MI.Bos('btnUpTop');
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
								if (MI.guest){ // 客人页取消置顶刷新页面
									MI.goHome('preview');
								}
								MI.Bos('btnUnUpTop');
							}
							else {
								if (Self.removeCall) { //删除回调
									Self.removeCall(id);
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
													cntClone,
													fillBackCnt = "";
												if (cnt){
													cntClone = cnt.cloneNode(1);
													UI.remove($$(cntClone,'strong')[0]);
													UI.remove($$(cntClone,'.mediaWrap')[0]);
													UI.each($$(cntClone,'em'),function(o){
														o.innerHTML = UI.A(o,'rel');
													});
													fillBackCnt = UI.trim(UI.text(cntClone));
												}
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
					if(type == 8 || type == 1 || data.result == -15) {
						//data.result == -15 帐号存在风险，删除功能冻结
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
	if(type){ //type=6时，屏蔽删除，type=2，收藏删除, type =4, 屏蔽消息二次提醒,type=8 删除置顶,type =10时 删除通知
	if(type == 2) tipMsg = Self.unfavTip;
		else if(type == 4) tipMsg = Self.shieldTip;
		else if(type == 6) tipMsg = Self.unShieldTip;
		else if(type == 10) tipMsg = Self.noticeTip;
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


MI.tmpl.urlPreview = '<div class="urlPreview"><div class="SA" style="display:none;"><em>◆</em><span>◆</span></div><a class="close" href="javascript:void(0)"></a><div class="urlIntro"><a class="ulink" target="_blank" href="#"></a></div><div class="urlCnt"></div></div>';

MI.TalkList.prototype.urlPreview = (function(){
	var Self = {
			navH : 0,
			MIN_H : 400,
			MIN_W : 360,
			MAX_W : 550
		},_body,_title,_cnt,_ifr,_close,_arrow,delay,delayShow,_testDiv,lastSrc,cache = {};

	function init(){
		_body = UI.html(Self.tmpl)[0];
		_title = $$(_body,'.ulink,.urlIntro p')[0];
		_cnt = $$(_body,'.urlCnt')[0];
		_close = $$(_body,'.close')[0];
		_arrow = $$(_body,'.SA')[0];
		_testDiv = UI.DC('div');  //验证返回html
		Self.navH = Self.navH || ($$(document.body,'.tSearchNew')[0] ? UI.height($('header') || $('headWrap')) : 0);   //是否是新导航
		Self._body = _body;
		Self._cnt = _cnt;
		Self._title = _title;
		Self._close = _close;
		Self._arrow = _arrow;
		Self.build();
		bindEvent();
	}

	function setLocation(src){
		if(src == lastSrc) return;
		var info = cache[src].info;
		var txt = info.html;
		var result = '';
		lastSrc = src;
		_title.href = src;
		
		txt = txt.replace(/<\/?(html|head|base|meta)[^>]*?>/gi,''); 	//过滤其他可能影响页面的标签
		
		result += '<div class="urlDescribeBox">';
		try{
		if (info.url && (info.safe == 1 || info.safe == 3 || info.safe == 4)){
			var safeTips = {};
			safeTips[1] = _('安全等级：<span>该网站安全风险暂时未知</span>');
			safeTips[3] = _('安全等级：<span>暂无安全风险</span>');
			safeTips[4] = _('安全等级：<span>暂无安全风险</span>');
			var unsafeCls = '';
			var reportHtml = '';
			if (info.safe == 1) {
				unsafeCls = 'unsafe';
				reportHtml = '<a target="_blank" class="report" href="http://guanjia.qq.com/trojan_false.html">' + _('举报') + '</a>';
			}

            var tdomain = "";
			if(info.site && info.site['url']){
				tdomain = MI.string.html(decodeURIComponent(info.site['url']))
			} else {
				tdomain = MI.string.html(decodeURIComponent(info.url));
				tdomain = tdomain.match(/(http:\/\/|https:\/\/)?(www.)?[\w-]+\.(com|net|org|gov|cc|biz|info|cn|it)(\.(cn|hk))*/);
				if (tdomain.length > 0){
					tdomain = tdomain[0];
				} else {
					tdomain = "";
				}
			}
			result += '<span class="safeBox clear"><em class="ico safe_' + info.safe + '"></em><span class="safeLevel ' + unsafeCls + '"><strong>' + _('来源网站 ')  + tdomain
			+ '</strong><br /><a href="' + MI.string.html(decodeURIComponent(info.url)) + '" target="_blank">' + MI.string.html(decodeURIComponent(info.url)) + '</a><span class="level">' + safeTips[info.safe] + '</span></span>' + '<a class="btn4" href="' + MI.string.html(decodeURIComponent(info.url)) + '" target="_blank">' + _('访问该链接') + '</a>' + reportHtml + '</span>';    
		}}catch(e){}
		
		if (info.site && info.site["abstract"]){
			result += '<div class="urlDescribe"><p class="noDuty">'+_('免责声明：您需要谨慎判断安全风险。互联网网页变化快速，以上安全参考资料或者遗漏和不准确，仅供参考') + '</p></div>';
		}
		result += '</div>';	
		
		if(txt.hasString('<body>')){ 
			if(!/<body>\s*<\/body>/i.test(txt)) { 	//判断body中是否有内容，无法排除<body><div></div></body>的情况,估计不常见
				result += '<div class="urlContent">' + txt + '</div>';
			}
		} else { 														//没有body，检测UI.text()返回
			txt = txt.replace(/<title>[^<>]*?<\/title>/gi,'');   		//过滤title标签
			txt = txt.replace(/<\!--[^<>]*?-->/g,'');  					//过滤html注释
			_testDiv.innerHTML = txt;
			if(UI.trim(UI.text(_testDiv))){ 							//有可见文本
				result += '<div class="urlContent">' + txt + '</div>';
			}
		}
		_cnt.innerHTML = result || _('抱歉，页面没有返回数据，暂时无法预览。');
		_title.innerHTML = info.title || info.url;
		
		//内容链接点击统计
		UI.each(UI.GT(_cnt,'a'),function(o){
			if(!o) return false;
			UI.EA(o,'click',function(){
				MI.Bos('btnUrlPreviewContLink');
			})
		});
	}

	function setPos(pos){
		var w,h,
			x = pos[0],
			y = pos[1],
			margin = 5,	 //距离浏览器边距
			winH = UI.windowHeight() - 2*margin - Self.navH,  //40为新导航条高度
			winW = UI.windowWidth() - ((UI.B.ie && !UI.B.ie9) ? -5 : 13) - margin; //20为垂直滚动条宽度
			
		if(winH >= Self.MIN_H) {
			h = winH;	
		} else {
			h = Self.MIN_H;
		}
		if(winW - pos[0] > Self.MAX_W) {
			w = Self.MAX_W;
		} else if (winW - pos[0] < Self.MIN_W) {
			w = Self.MIN_W;
			x = winW - w;
		} else {
			w = winW - pos[0];
		}
		y = UI.scrollY() + margin + Self.navH;
		
		if(UI.B.ie6) {
			_body.style.cssText = 'left:' + ( x - 5 )+ 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;';
		} else {
			_body.style.cssText =  'left:' + ( x - 5 )+ 'px;top:' + (Self.navH + margin) + 'px;width:' + w + 'px;height:' + h + 'px;position:fixed'
			_cnt.style.cssText = 'width:' + (w - 20) + 'px;height:' + (h - 20 - 36) + 'px;';  //36为标题高度
		}
	//	_arrow.style.cssText = 'top:' + (pos[1] + margin - y) + 'px;';
	}

	function bindEvent(){
		var margin = 5;
		_close.onclick = function(){
			hide();
			MI.Bos('btnUrlPreviewClose');
		}	
		UI.EA(_body,'mouseover',function(){
			clearTimeout(delay);
		});
		UI.EA(_body,'mouseout',delayHide);
		UI.EA(_title,'click',function(e){
			UI.E(e).stop();
		});

		//滚动位置不变
		if(UI.B.ie6) {
			UI.EA(window,'scroll',function(){
				_body.style.top = UI.scrollY() + margin + Self.navH + 'px';
			});	
		};
		
		//又见双滚动条控制
		// PC终端双滚动条滚动问题FIX
        if (!UI.hasClass(document.body, 'ipad')){                
            _cnt.onmousewheel = relayScrollPrevent;
            if (UI.B.firefox){
                _cnt.addEventListener('DOMMouseScroll', relayScrollPrevent, false);
            }
        }

		//兼容取回的html中脚本报错
		window.imgLoad = window.imgLoad || function(img){
			if(!UI.B.ie6) return false;
			var maxWidth = UI.width(_cnt);
			if(img.width > maxWidth) img.width = maxWidth;  //限制最大宽度
		};
		window.imgError = window.imgError || function(){};
	}	
    function relayScrollPrevent(e){
         e = e || window.event;
         var E = UI.E(e), direction = 0, speed = 1;
         if (e.detail){
            direction = e.detail > 0 ? 1 : -1;
            if(e.wheelDelta<-3||e.wheelDelta>3) speed=2;
         }else{
            direction = e.wheelDelta < 0 ? 1 : -1;
            if(e.wheelDelta<-120||e.wheelDelta>120) speed=2;
         }	            
         // IE下猛烈滚动浮层会导致Window滚动，原因是浮层尚未滚到底(顶)时，window的scroll事件已经被触发
         // 部分解决：当浮层到底(顶)距离小于80时，将浮云滚到底(顶)，并阻止默认事件。
         // 当滚动过于猛烈或者浮层高度比较不给力时，window还是会滚动一小下 具体是怎么个不给力法，描述不清。。。
         //if (UI.B.ie){ 
		 //console.log(speed)
		 
		 var scrollHeight = _cnt.scrollHeight,
		     offsetHeight = _cnt.offsetHeight,
			 scrollTop = _cnt.scrollTop;
		 	       
         if(scrollHeight <= offsetHeight){//console.log("scroll")           
            //可滚动模式
            return true;
         }		 
         if(speed > 1){//console.log("over speed")
            //快速滚动 且 panel可滚动 禁止                        
            E.prevent();
			return false;                        
         }
		// console.log(direction=="1"?"下":"上")
         if (direction === 1 && scrollHeight - scrollTop - offsetHeight < 80){//console.log("end")            
            if (scrollTop != (scrollHeight - offsetHeight)) {
				_cnt.scrollTop = scrollHeight - offsetHeight;
			}
			E.prevent();
            return false;
         }else if (direction === -1 && scrollTop < 80) {//console.log("top")
            E.prevent();			
            _cnt.scrollTop = 0;
            return false;
         }
		 
         return true;      
    }
	function hide(){
		UI.hide(_body);
	}

	function delayHide(){
		clearTimeout(delay);
		delay = setTimeout(hide,250);
	}

	//block qzone.qq.com pengyou.com t.qq.com weibo.com
	function inBlankList(url){
		if(!url) return false;
		return /[\/.](qzone\.qq|pengyou|weibo|t\.qq)\.com/.test(url);
	}

	function showPreview(el){
		var url = el.href;
		if(!url) return;
		if(cache[url]) {
			addPreviewIcon(el,url);
		} else {
			var data = {url : url};
			if (Self.data){
				for (var i in Self.data){
					data[i] = Self.data[i];
				}
			}
			MI.ajax({
				type : 'get',
				url : MI.url.urlPreview,
				data : data,
				success : function(data) {
					data = MI.json(data);
					cache[url] = data;
					if(data.result == 0) {
						addPreviewIcon(el,url);
					}
				}
			});
		}
	}

	function addPreviewIcon(el,url){
		if(!cache[url].info || !cache[url].info.html) return;
		if(inBlankList(cache[url].info.url)) return;
		var preViewBtn = UI.html('<a title="' + _('查看预览') + '"class="tIcon ico_page" href="javascript:void(0)"></a>')[0];
		UI.after(preViewBtn,el);
		preViewBtn.onmouseover = function(){
			var that = this;
			delayShow = setTimeout(function(){
				show(that,url);
			},200);	
		}

		preViewBtn.onmouseout = function(){
			clearTimeout(delayShow);
		}
	}

	function show(el,url){
		var msgBox = UI.parents(el,'msgBox'),
			P = msgBox[msgBox.length-1].parentNode,
			pos = [UI.getX(P) + UI.width(P) + 20,UI.getY(el)];

		if(!_body) init();
		setLocation(url);
		Self.setPos(pos);
		UI.EA(P,'mouseout',delayHide);
		UI.EA(P,'mouseover',function(){
			clearTimeout(delay);
		});
		UI.show(_body);
		MI.Bos('btnUrlPreview');
	}

	//外围DOM
	Self._body = _body;
	//请求额外参数
	Self.data = {};
	//DOM模版
	Self.tmpl = MI.tmpl.urlPreview;
	//DOM处理
	Self.build = function(){
		UI.append(Self._body,document.body);
	}
	//定位
	Self.setPos = setPos;
	//显示浮层
	Self.showPreview = showPreview;
	//关闭浮层
	Self.close = hide;
	return Self;
})();

MI.tmpl.geolocation = '<div style="top:0;left:0" class="comTips1 cardT"><a class="close" href="#"></a><div class="detailAddress" style="background:#fff;width:340px;"><p style="padding:3px 5px;color:#666;line-height:18px;border-bottom:1px solid #999;"></p></div><div class="areaWrap" id="areaWrap"></div><div class="SA"><em>◆</em><span>◆</span><b>◆</b></div></div>';

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
		var d = UI.A(el,'address') || '&nbsp;';
		address.innerHTML = d;
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
	close = null;

	UI.EA(document,'click',hide);		//地图展示按钮需要阻止冒泡
	
	UI.EA(body,'click',MI.cancelBubble);

	return {
		'show' : function(el){	
			if(!loadedMapFile) {
				UI.getScript('http://api.map.soso.com/v1.01/main.js',function(){
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

MI.tmpl.download = '<div class="bigFileInfo dlLink"><b class="trib"><i class="tris"></i></b><span>' + _('下载方式：') + '</span><a href="#">' + _('直接下载') + '</a> <a href="#">' + _('旋风下载') + '</a><div class="loading" style="display:none;position:absolute;left:5%;top:5%;width:90%;height:90%;background-color:#fff;"></div></div>';


MI.TalkList.prototype.download = (function(){
	var body,dlBtn = [],delayHide,pathCache = {},isWQ = 0,file,title = '好东西要分享，转播让你的朋友们也看看吧！',content;

	function init(){
		body = UI.html(MI.tmpl.download)[0];
		dlBtn[0] = UI.GT(body,'a')[0];
		dlBtn[1] = UI.GT(body,'a')[1];
		loading = UI.GT(body,'div')[0];

		UI.append(body,document.body);
		bindEvent();
	}

	function setPos(el){
		var x = UI.getX(el) - 10,y = UI.getY(el) + 20;
		body.style.cssText = 'left:' + x + 'px;top:' + y + 'px;margin-left:0;';
	}

	//获取文件地址
	function setDownLoadUrl (file){
		UI.A(dlBtn[0],'qHref','');
		UI.A(dlBtn[1],'qHref','');
		if(pathCache[file.id]) {
			UI.A(dlBtn[0],'href',pathCache[file.id][0]);
			UI.A(dlBtn[1],'href',pathCache[file.id][1]);
			return false;
		}
		UI.show(loading);
		//旋风离线分享
		if(file.ftype == 3 || file.ftype == 25) {
			MI.ajax({
				url : MI.url.applyDownloadXF,
				type : 'get',
				data : {
					filehash : file.path,
					filename : file.name,
					R: + new Date()
				},
				success : function(data){
					UI.hide(loading);
					  data = MI.json(data);
					  if(data.ret == 0 && data.data){
					  	data = data.data;
						  UI.cookie('FTN5K',data.com_cookie,1,'qq.com');
						  UI.A(dlBtn[0],'href',data.com_url);
						  UI.A(dlBtn[1],'href',data.xf_url);
						  pathCache[file.id] = [data.com_url, data.xf_url]; //缓存
					  }
					  // 微群尚不支持旋风离线分享，不存在这种情况
					  // else if (file.qid && (data.result == -8)) {
						  // MI.confirm({
							  // type : 'error',
							  // title : _('是否加入微群？'),
							  // content : _('只有群成员才能下载该文件'),
							  // confirmTxt : _('申请加入'),
							  // confirm : function(){
								  // window.open('http://qun.t.qq.com/' + data.qid);
								  // MI.dialog.hide();
							  // },
							  // cancelTxt : _('取消'),
							  // cancel : function(){}
						  // });
						  // hide();
					  // }
					  else{
						  MI.alert(_('获取文件信息失败')); 
						  MI.Bos('btnFileDownloadFialXF' + isWQ);
						  hide();
					  }
				  }
			});
		} else {//非旋风离线分享
			MI.ajax({
				url : MI.url.applyDownload,   //asyn?
				type : 'post',
				data : {
					fileKey : file.path,
					appid : file.qid != 0 ? 1 : 0 , //0 :  微博 ,1:  微群
					qid : file.qid,
					ftype : file.ftype
				},
				success : function(data){
					UI.hide(loading);
					  //'http://' + o.dns + '/ftn_handler/' + o.url + '/' + fileName;
					  data = MI.json(data);
					  if(data.result == 0 && data.info){
						  if(data.info.keys){
							  var keys = data.info.keys[0];
							  var link = 'http://'+keys.attach.dns+'/ftn_handler/'+keys.strKey+'/'+encodeURIComponent(file.name);
							  UI.cookie('FTN5K',keys.attach.cookies,1,'qq.com');
							  UI.A(dlBtn[0],'href',link);
							  UI.A(dlBtn[1],'href',link);
							  pathCache[file.id] = [link, link]; //缓存
						  }
					  } else if (file.qid && (data.result == -8)) {
						  MI.confirm({
							  type : 'error',
							  title : _('是否加入微群？'),
							  content : _('只有群成员才能下载该文件'),
							  confirmTxt : _('申请加入'),
							  confirm : function(){
								  window.open('http://qun.t.qq.com/' + data.qid);
								  MI.dialog.hide();
							  },
							  cancelTxt : _('取消'),
							  cancel : function(){}
						  });
						  hide();
					  }
					  else{
						  MI.alert(_('获取文件信息失败')); 
						  MI.Bos('btnFileDownloadFial' + isWQ);
						  hide();
					  }
				  }
			});			
		}
	}

	function hide(){
		delayHide = setTimeout(function(){
			UI.hide(body);
		},100)	
	}

	function bindEvent(){
		body.onmouseout = hide;
		body.onmouseover = function(){clearTimeout(delayHide)};
		
		//是否是私密群
		var isPrivate = (function() {
			return MI.TalkBox && MI.TalkBox.prototype && MI.TalkBox.prototype.data && MI.TalkBox.prototype.data.cflag == 2;
		})();
		
		MI.app({TalkBoxRich: function() {
			dlBtn[0].onclick = function(){
				hide();
				!isPrivate && MI.relay(file.id, content, title);
				MI.Bos('btnFileDownloadDefault' + isWQ);
				setTimeout(function(){ MI.Bos('btnFileDownload',escape(file.path)); }, 1000);
			}	
			dlBtn[1].onclick = function(event){
				MI.App.qqDownload(this,event,21506);
				!isPrivate && MI.relay(file.id, content, title);
				MI.Bos('btnFileDownloadXF' + isWQ);
				setTimeout(function(){ MI.Bos('btnQQDownload',escape(file.path)); }, 1000);				
				return false;
			};
		}});
	}

	function show(download, el){
		if(!body) init();
		var P = download.parentNode;
		var fileName = $$(P,'.fileName')[0];
		var name = UI.A(P,'rel');
		try {
			name = decodeURI(name);
		} catch(e) {
			name = UI.text(fileName);
		}
		file = {
			path : P.id,
			qid : UI.A(P,'qid') || 0,
			name : name,
			ftype : UI.A(P,'ftype') || '1',
			id: UI.A(el, 'id')
		}
		content = '我刚刚下载了文件【' + file.name + '】，推荐给你看看。http://t.qq.com/p/t/' + file.id + (file.qid == 0 ? '' : '/1');
		isWQ = (file.qid == 0) ? '0' : '1';
		setPos(download);
		UI.show(body);
		setDownLoadUrl(file);
		MI.Bos('btnShowDownload' + isWQ);
	}

	return {
		show : show
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
			str += '<br /><span class="cNote">';
			str += o[i].from || '';
			str += '</span></p>';
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
		transId = UI.A(el,'tid') ||
			$$(msgBox,'.time')[0].href.replace((MI.hostType === 3 ? /.*#id=/ : /.*\//),'');
			
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
	transMe = null;

	body.onmouseout = hide;
	body.onmouseover = function(){
		clearTimeout(hide.delay);
		UI.show(body);
	}
	UI.clear(function(){
		body = null;
	});
	
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
	UI.addClass(P,'vPlay bgr2');
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
	UI.removeClass(P,'vPlay bgr2');
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
//文件分享
MI.TalkList.fileEvent = function(fileBox, el) {
	var Self = this;
	for(var i = 0,num = fileBox.length; i< num; i++){
		var fileBoxCur = fileBox[i];
		var download = $$(fileBoxCur,'.download')[0];
		if(download) {
			download.onclick = function(){
				MI.TalkList.prototype.download.show(this, el);
				return false;
			}
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
	//简版微博 media 放置与 msgCnt或mediaPreview中的内容后面 故p使用 msgCnt或mediaPreview节点 by wujian 
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
	UI.addClass(box,'vPlay bgr2');
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
	UI.removeClass(box,'vPlay bgr2');
	UI.removeClass(vBox,'loading');
	vThumbsBox.style.display = 'inline';
	MI.TalkList.resizePic(thumbs);
	tools.style.display = 'none';
	UI.remove(vBox);
	MI.mediaMutex(vWrap,1);
	MI.TalkList.lastVideo.isOpen = false;  //关闭视频展开的状态位
	return false;
}

})();
