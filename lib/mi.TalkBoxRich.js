MI.TalkBoxRich = 1;
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

MI.PicTurn = {
	pos: 0,
	url : 'http://upload.t.qq.com',
	path: '',
	cache: [],
	build: function(tb) {
		var Self = this,
			iframeId = 'imageRotate' + MI.random();
		Self.talkBox = tb;
		Self._body = UI.html('<div '
						+ (UI.B.ie6 ? '' : 'class="big"')
						+ ' style="display:none;margin:3px 0 8px;padding:4px;border:1px solid #e5e5e5;background:#f9f9f9;position:absolute;z-index:20;top:15px;left:0px;"><div class="tools"'
						+ ((window.MILang == "en_US")
								? 'style="width:200px"'
								: 'style="width:130px"')
						+ '><a class="btnBack" href="#" style=""><em'
						+ (UI.B.ie6
								? ' style="width:17px;background:url(\'http://mat1.gtimg.com/www/mb/images/b2_100907.png\') no-repeat scroll -162px -233px transparent;"'
								: '')
						+ '></em>'
						+ _('向左转')
						+ '</a><span>|</span><a class="btnPrev" href="#"><em'
						+ (UI.B.ie6
								? ' style="width:17px;background:url(\'http://mat1.gtimg.com/www/mb/images/b2_100907.png\') no-repeat scroll -179px -233px transparent;"'
								: '')
						+ '></em>'
						+ _('向右转')
						+ '</a></div><div class="loading" style="width:112px;line-height:1.231;height:19px;_height:21px;display:none;">'
						+ _('处理中')
						+ '...</div><div class="imgct" style="clear:both;text-align:center;_width:160px;"></div><form method="POST" target="' + iframeId + '" action="/asyn/rotatepic.php"><input type="hidden" id="irRetType" name="retType" value="0" /><input type="hidden" id="irPath" name="path" /><input type="hidden" id="irDegrees" name="degrees" /></form><iframe id="' + iframeId + '" name="' + iframeId + '" src="about:blank" style="display:none"></iframe></div>')[0];
		Self._imgCt = $$(Self._body, '.imgct')[0];
		Self._picLoading = $$(Self._body,'.loading')[0];
		Self._tools = $$(Self._body, '.tools')[0];
		Self._form = $$(Self._body, 'form')[0];
		$$(Self._body, '.btnPrev')[0].onclick = function() {
			this.blur();
			Self.turn(1);
			MI.Bos('btnPicTurn');
			return false;
		}
		$$(Self._body, '.btnBack')[0].onclick = function() {
			this.blur();
			Self.turn(-1);
			MI.Bos('btnPicTurn');
			return false;
		}
		Self._body.onmouseover = function() {
			clearTimeout(Self.hl);
			Self.show();
		}
		Self._body.onmouseout = function() {
			Self.hide();
		}
		return Self._body;
	},
	// 1: 顺时针 -1: 逆时针
	turn: function(dir) {
		var Self = this;
		Self.pos += dir;
		if (Self.pos > 3) Self.pos -= 4;
		else if (Self.pos < 0) Self.pos += 4;
		var pic = Self.cache[Self.pos];
		if (!pic) Self.get();
		else {
			Self.talkBox.pic = pic;
			Self.set(pic);
		}
	},
	get: function() {
		var Self = this;
		UI.hide(Self._tools);
		Self._picLoading.style.display = 'block';
		
		UI.A(Self._form, 'action', MI.PicTurn.url+'/asyn/rotatepic.php');
		$('irPath').value = Self.path;
		$('irDegrees').value = Self.pos*90;
		Self._form.submit();
	},
	over: function(data) {
		var Self = this;
		if (data.result == 0) {
			var pic = data.info.image;
			Self.talkBox.pic = pic;
			Self.cache[Self.pos] = pic;
			Self.set(pic);
		}
		UI.hide(Self._picLoading);
		UI.show(Self._tools);
	},
	set: function(src) {
		var Self = this;
		Self._imgCt.innerHTML = '<img src="' + src + '/160" /><br /><div style="display:' + (UI.B.ipad ? 'none':'inline') + ';white-space:nowrap;"><a href="#" class="useFilter" style="float:none;display:inline-block;padding:5px 0;">' + _('魔法滤镜') + '</a></div>';

		$$(Self._imgCt,'.useFilter')[0].onclick = function(){
			MI.app({
				Base:function(){
					var pic = src.replace('mblogpic.store.qq.com/mblogpic','t0.qpic.cn/mblogpic');
					MI.photoFilter.build(pic + '/2000','http://t.qq.com/asyn/updateGrabPic.php');
					MI.TalkBox.cur = Self.talkBox;
				}	
			});
			MI.Bos('btnPhotoFilter');
			return false;
		}
	},
	show: function() {
		var Self= this;
		clearTimeout(Self.autoHideDelay);
		UI.show(Self._body);
	},
	hide: function() {
		UI.hide(this._body);
	},
	hideT: function() {
		var Self = this;
		Self.hl = setTimeout(function() {
			Self.hide();
		}, 200);
	},
	reset: function(src, path) {
		var Self = this;
		Self.pos = 0;
		Self.path = path;
		Self.cache = [src];
		Self.set(src);
		UI.hide(Self._picLoading);
		UI.show(Self._tools);
	}
}
MI.TalkBox.prototype.uploadPic = function(){
	var Self = this;
	if (Self.upPic.flashCapture) {   //截屏到多图时loading
		UI.addClass(Self.upPic._picCapture[1],'loading');
	}	
	else {
		Self.upPic.hide();
		UI.append(Self._uploadPicS,Self._sendStatus);
		!(UI.hasClass(Self._sendCnt,'hasMedia')) && UI.addClass(Self._sendCnt,'hasMedia');
		UI.show(Self._picLoading);
		UI.addClass(Self._picLoading,'loading');
	}
	MI.TalkBox.cur = Self;
}
MI.TalkBox.prototype.qbUploadCookie = function () {
	return document.cookie;
}
MI.TalkBox.prototype.qbUploadPosition = function () {
	return $$(this.upPic._picForm, 'input')[0];
}
MI.TalkBox.prototype.qbUploadAddPic = function (o) {
	if (o && o.info && !o.info.fileName)
		o.info.fileName = _('图片.jpg');
	this.addPic(o);
}
MI.TalkBox.prototype._addMusic = function(obj){
	var Self = this, type;
	if (obj.music || obj.mlist) {
		if (obj.music) {
			Self.music = obj.music;
			Self.mlist = '';
		}
		if (obj.mlist) {
			Self.mlist = obj.mlist;
			Self.music = '';
		}
		if (Self._music) {
			MI.app({
				Music : function() {
					if (Self.music && Self.music.id) {
						UI.A(Self._music, 'music', ''
										+ Self.music.id + ','
										+ Self.music.songurl
										+ ','
										+ Self.music.singer
										+ ',' + Self.music.song
										+ ',3');
						type = 2;
					} else if (Self.mlist) {
						UI.A(Self._music, 'music', ''
										+ Self.mlist.uin + ','
										+ Self.mlist.url + ','
										+ '' + ','
										+ Self.mlist.name
										+ ',3');
						type = 3;
					}
					MI.Music.addPreview(Self._music, '', type);
					MI.Music.hide();
				}
			});
		}
	}
}
MI.TalkBox.prototype._send = function(){
	var Self = this,
		obj,
		addCheck = 1,
		content = UI.trim( Self._txt.value.replace(new RegExp(Self.txtTopic,'g'),'').replace(/＠/g,'@').replace(/＃/g,'#') ),
		Time,Time_1,Time_2,Time_3;
	if (!Self.tmpl){
		MI.app({
			Tmpl : function(){
				Self.tmpl = MI.tmpl.listAll;
			}
		});
	}

	//if (UI.hasClass(Self._btn,'btnNoStr')) {
	if (UI.hasClass(Self._btn,'btnNoStr')) {
		return;
	}
	if (Self._btn.disable || UI.hasClass(Self._btn,'btnNoStr')) {
		if (Self.length == 0) {
			Self.showTip(Self.txtTip.empty,1);
		}
		Self._txt.focus();
		/*if (UI.trim(Self._txt.value).length) {
			Self._txt.focus();
		}*/
		if (Self._msgTo && UI.trim(Self._msgTo.value) == '') {
			Self._msgTo.focus();
		}
		Self.sending = 0;
		Self.flashTip();
		return;
	}
	/*if (content && content == Self.txtCache) {
		Self.showTip(Self.txtTip.repeat,1);
		Self.flashTip();
		Self.sending = 0;
		return;
	}*/
	Self._btn.disable = 1;
	UI.addClass(Self._btn,'btnNoStr');

	//Go To User's Page
	if (!Self.type && !Self.pic && !Self.sourcePic && !Self.topic && content.match(/^@[a-zA-Z]{1}[\w|-]{0,19}$/g)) {
		MI.Bos('btnAtAccountOnly');
		if(MI.user.fun.gotoNanoUserProfile){
			Self.goUser('http://1.t.qq.com/' + content.slice(1));
		}else{
			Self.goUser('http://t.qq.com/' + content.slice(1) + '?from=1');
		}		
		Self.reset();
		return;
	}

	//Show Sending Tip
	Self.delay.tip = setTimeout(function(){
		Self.showTip(Self.txtTipSend,2);
	},500);

	//Start Callback
	if (Self.start) {
		Self.start();
	}

	//Post Data
	obj = {
		content : content,
		startTime : Self.startTime,
		endTime : new Date().getTime(),
		countType : Self.countType,
		viewModel : Self.iconPic || ''
	};
	if (Self.code) {
		obj.veriCode = Self.code;
	}
	if (Self.emotion){  //心情签到类型
		obj.emotion = Self.emotion; 
	}
	if (Self.pass) {
		obj.pass = Self.pass;
	}
	if (Self.type) {
		obj.pId = Self.talkId;
		obj.type = Self.type;
	}
	if (Self._msgTo) {
		obj.account = Self._msgTo.value.replace(/^@/,'');
	}
	if (Self.sourcePic) {
		obj.sourcepic = Self.sourcePic;
	}
	else {
		obj.pic = Self.pic;
	}
	if(Self.longText){
		obj.longText = Self.longText;
	}
	if (Self.topic) {
		obj.content = (obj.content.match(new RegExp(MI.string.escapeReg(Self.topic))) ? '' : Self.topic) +  obj.content;
	}
	if (Self.music && Self.music.id){ //歌曲
		obj.musicID = Self.music.id;
		obj.musicSong = Self.music.song;
		obj.musicSinger = Self.music.singer;
		obj.musicLocation = Self.music.songurl;
		obj.musicShortUrl = Self.music.shorturl;
		if(Self.music.songtype)	obj.musicSource = Self.music.songtype;
	}
	else if (Self.mlist){ //歌单
		//obj.mlistId = Self.mlist.id;
		obj.mlistUin = Self.mlist.uin;
		obj.mlistName = Self.mlist.name;
		obj.mlistCnt = Self.mlist.num;
		obj.mlistUrl = Self.mlist.url;
		obj.mlistPic = Self.mlist.pic;
	}
	if (Self.file && Self.file.uriId){ //文件
		obj.fileUriId = Self.file.uriId;//文件id
		obj.fileName = Self.file.name;//文件名字
		obj.fileValidTime = Self.file.validTime;//失效时间
		obj.fileFlag = Self.file.flag;//存储方式
	}
	if (Self.video) {
		obj.video = Self.video;
	}
	if (Self.vid) { // 上传视频的ID
		obj.vid = Self.vid;
	}
	if (Self.vote) {
		obj.vote = Self.vote;
	}
	if (Self.addCheck && !obj.content.toLocaleLowerCase().hasString(Self.addCheck.toLocaleLowerCase())) { //If Check False,Don't Add NewTalk To List
		addCheck = 0;
	}
	if (Self.source) {
		obj.source = Self.source;
	}
	if (Self.apiType) {
		obj.apiType = Self.apiType;
	}
	else if (MI.api.type){
		obj.apiType = Self.apiType = MI.api.type;
	}
	if (Self.rmsg) { // 富媒体
		obj.rmsgType = Self.rmsg.type;
		obj.rmsgId = Self.rmsg.id;
	}
	if (Self.data) { // 附加数据
		for (var i in Self.data){
			obj[i] = Self.data[i];
		}
	}
	if (Self.emotion && obj.wqid){  //心情签到排除微群id
		delete obj.wqid;
	}
	if(UI.parseUrl().pref){ //增加来源参数上报
		obj.pgv_ref = UI.parseUrl().pref;
	}
	Time = + new Date();
	MI.ajax({
		url : Self.url,
		data : obj,
		success : function(data){
			Time_1 = + new Date() - Time;
			clearTimeout(Self.delay.timeout);
			data = MI.json(data);
			/*
				data = {
					result : 0,
					msg : '发言成功',
					info : {
						id : '123456',
						time : '5分钟前',
						content : '内容',
						form : '腾讯微博'
					}
				};
				//Verify Code
				data = {
					result : -100,
					msg : '您的操作出现异常，请输入验证码',
					info : 'http://ptlogin2.qq.com/getimage?aid=13001401&Math.random()'
				};
			*/
			if (MI.user && data.result == 0 && data.info && UI.isObject(data.info)) {
				var talk = data.info.talk[0],user = MI.user;
				talk.pic = user.pic;
				talk.nick = talk.nick || user.name;
				talk.name = talk.name || user.account;
				if (Self.type != 4){
					talk.chName = talk.chName || user.chName;
				}
				talk.flag = (talk.flag && UI.isArray(talk.flag) ? user.flag : talk.flag);
				data.info.iconPic = Self.iconPic;
				data.info.guest = 0;
				data.info.fav = 0;
				data.info.shield = 0;
				UI.hasClass(Self._sendCnt,'hasMedia') && UI.removeClass(Self._sendCnt,'hasMedia');
			}

			//Self._txt.blur();

			//Show Tips
			if (MI.code.check(data.result)) { //Verify code
				MI.code.show({msg:data.msg,code:data.info,call:function(code){
					Self.code = code;
					Self.send();
				}});
				Self.reset();
			}
			else if (data.result == -104){ //只@了一个存在的中文帐号
				MI.Bos('btnAtAccountOnlyCN');
				if (data.info){
					Self.goUser('http://t.qq.com/' + data.info + '?from=1');
					Self.reset();
				}
			}
			else if (data.result == -103){ //不规则中文帐号
				var accountError = [];
				if (UI.isArray(data.info)){
					UI.each(data.info,function(o){
						if (UI.isString(o)){
							accountError.push(o.slice(1));
						}
					});
				}
				MI.app({
					Base : function(){
						MI.confirm({
							title : _('确定继续发送？'),
							content : _('你在广播中@到了{0}，可能忘了添加空格，因此未成功@到正确账号。','“' + accountError.join('”、“') + '”'),
							confirmTxt : _('继续发送'),
							confirm : function(){
								MI.dialog.hide();
								Self.pass = data.result;
								Self.send();
								MI.Bos('btnSendAtConfirm');
								if (Self.emotion) MI.Mood.floatBox.show(); //恢复心情浮层
								if (Self.QX && MI.Gift) MI.Gift.buildTalk(); //恢复七雄争霸的广播框 
							},
							cancelTxt : _('返回修改'),
							cancel : function(){
								if (Self.emotion) MI.Mood.floatBox.show();  //恢复心情浮层
								if (Self.QX && MI.Gift) MI.Gift.buildTalk(); //恢复七雄争霸的广播框
								if (UI.isArray(data.info) && UI.isString(data.info[0])){
									var index = Self._txt.value.indexOf(data.info[0]);
									if (index != -1){
										index += data.info[0].length;
										MI.selectTxt(Self._txt,index,index,index);
									}
									else {
										Self.focus();
									}
								}
								MI.Bos('btnSendAtCancel');
							}
						});
						Self.reset();
					}
				});
			}
			else if (data.result == -206 || data.result == -207 || data.result == -208){ //@*微群错误（想关掉可以给cgi多传一个参数attips=0）
				var accountError = [],
					contentError = [];
				if (UI.isArray(data.info)){
					UI.each(data.info,function(o){
						accountError.push(o);
						contentError.push(_('“') + o + _('”'));
					});
					contentError.join(_('、'));
				}
				switch(data.result) {
					case -206:
						contentError = _('您在广播中@*到群{0}，可能输入有误，这个群不存在，请返回修改。', contentError);
						break;
					case -207:
						contentError = _('您在广播中@*到群{0}，您还不是这个群的成员，请<a href="http://qun.t.qq.com/' + accountError[0] + '" target="_blank">点击这里</a>先加入这个群，或者返回修改。', contentError);
						break;
					case -208:
						contentError = _('不能从私密群转发消息，这条广播将不会被转发。');
						break;
				}
				MI.app({
					Base : function(){
						MI.confirm({
							title : _('确定继续发送？'),
							content : contentError,
							confirmTxt : _('继续发送'),
							confirm : function(){
								MI.dialog.hide();
								Self.pass = data.result;
								Self.send();
								MI.Bos('btnSendAtConfirm');
								if (Self.emotion) MI.Mood.floatBox.show(); //恢复心情浮层
								if (Self.QX && MI.Gift) MI.Gift.buildTalk(); //恢复七雄争霸的广播框 
							},
							cancelTxt : _('返回修改'),
							cancel : function(){
								if (Self.emotion) MI.Mood.floatBox.show();  //恢复心情浮层
								if (Self.QX && MI.Gift) MI.Gift.buildTalk(); //恢复七雄争霸的广播框
								if (UI.isArray(data.info) && UI.isString(data.info[0])){
									var index = Self._txt.value.indexOf(data.info[0]);
									if (index != -1){
										index += data.info[0].length;
										MI.selectTxt(Self._txt,index,index,index);
									}
									else {
										Self.focus();
									}
								}
								MI.Bos('btnSendAtCancel');
							}
						});
						Self.reset();
					}
				});
			}
			/*
			 * 进行是否可以发微博判断
			 */
			else if(data.result == -22){
				MI.confirm({
					type : 'error',
					width : 250,
					title : _('请完成身份验证'),
					content : _('体验期间不能发表内容哦，</br>只有完成身份验证后才能发表微博。'),
					confirmTxt : _('进行身份验证'),
					cancelTxt : _('取消'),
					confirm : function(){
						MI.Bos('btnSendAtAccessVerify');
						document.location.href = 'http://t.qq.com/reg/confirm.php?s&t';
					},
					cancel : function(){
						MI.Bos('btnSendAtCancelVerify');
						Self._tip.innerHTML = '';
					}
				});
				Self.reset();
			}
			//禁言用户给出申诉入口
			else if(data.result == -23){ 
				clearTimeout(Self.delay.tip);
				var tipPre = Self._tip.innerHTML;
				Self._tip.innerHTML = '<span>' + _('已被禁言') + '，<a class="gotoAsk" href="###">' + _('立即申诉') + '>></a></span>';
			    var askTip = $$(Self._tip,'.gotoAsk')[0];
				if(askTip){
					askTip.onclick = function(){
						UI.ajax({
							url:'http://t.qq.com/asyn/complain.php',
							success:function(data){
								data=MI.json(data);
								alert(_('你的申诉已经提交，请耐心等待'));
								Self._tip.innerHTML='';
							}
						});
					}
					askTip = null;
				}
			}
			//验证判断结束
			else {
				clearTimeout(Self.delay.tip);
				Self.showTip(data.msg || '',data.result < 0 ? 1 : 0);
				Self.flashTip();
				if (data.result == 0 && Self._tipBig) {
					$$(Self._tipBig,'.msg')[0].innerHTML = data.msg;
					if (Self.type != 4) { //除了主Timeline评论外
						UI.addClass(Self._body,'pubSuc');
					}
					UI.show(Self._tipBig);
				}
				Self.delay.tip = setTimeout(function(){
					UI.animate(Self._tip,'opacity',1,function(){
						if (data.result == 0) {
							Self._txt.value = '';
						}
						try{
							if(Self._body.style.display != 'none') Self._txt.focus(); //Hided Element Can't Be Focused In IE (Bug)
						}catch(e){};
						Self.countTxt();
						if (Self._msgTo && data.result > -9 && data.result < -5) { //result : -6 -7 -8
							try{
								Self._msgTo.select();
							}catch(e){};
						}
						UI.C(Self._tip,'opacity','');
						Self._tip.style.filter = '';
						Self.sending = 0;
						UI.removeClass(Self._btn,'btnNoStr');
						if (data.result == 0) {
							Self.delPic();
							Self.delVideo();
							Self.delMusic();
							Self.rmsg = null;
							Self.vote = null;
							Self.code = null;
							Self.pass = null;
							if(MI.Music && MI.Music.builded){
								MI.Music.clear();
							}
							if (Self._guide) {
								Self.guideReset();
							}
						}
						if (Self.success && data.result == 0) {
							Self.success(data);
							UI.hide(Self._tipBig);
						}
					});
				},data.result == 0 ? Self.delayTime : Self.delayTime + 1000);
			}

			//Callback
			if (Self.successStart && data.result == 0) {
				Self.successStart(data);
			}
			if (Self.failStart && data.result != 0) {
				Self.failStart(data);
			}

			//Add New Talk To List
			// 默认的加入list是MI.talkList
			// 群里边 要 加入 MI.talkListHot
			var AddedTalkList = MI.talkList;
			if(Self.data.wqid && MI.talkListHot) {
				AddedTalkList = MI.talkListHot;
			}
			if (AddedTalkList && Self.addList && data.result == 0 && addCheck) {
				/*idata.info.source = {};
				f (Self.type && Self.type != 4) { //From Reply And Relay
					data.info.action = Self.action;
					data.info.source = Self.source;
				}*/
				if (AddedTalkList._tip) { //Hide Talk List's Tip
					UI.hide(AddedTalkList._tip);
				}

				AddedTalkList.add.push(data.info.talk[0].id);
				
				data.info.type = AddedTalkList.type;

				var newTalk = UI.html(new UI.tmplString(Self.tmpl)(data.info))[0];
				AddedTalkList.addEvent(newTalk);
				UI.addClass(newTalk,'newMsg'); //Add Delete CSS
				// fill-back样式用于标识消息是否为刚刚发布 拥有叫fill-back标识的消息，被删除时会将它的内容回填到发布框中。
				// 非原创消息不进行回填。原创消息中的富媒体内容不回填。
				if (!Self.type) {
					UI.addClass(newTalk, 'fill-back');
					// 发布后30秒清除刚刚发布的标识fill-back样式 删除此消息时不会
					setTimeout(function () {
						UI.removeClass(newTalk, 'fill-back');
					}, 30000);
				}
				UI.prepend(newTalk,AddedTalkList._body);
				AddedTalkList.addFollowBtn(newTalk);
				AddedTalkList._news.push(newTalk);
				AddedTalkList.news++;
				var height = UI.height(newTalk),scrollY = UI.scrollY(),scroll;
				UI.C(newTalk,'height',0);

				setTimeout(function(){
					UI.animate(newTalk,'height',height - 22,function(){
						UI.C(newTalk,'height','');
						AddedTalkList.bottom();
						MI.Crs(1);
					},0.3);
				},0);
			}

			if (data.result == 0) {
				//Clear Start Time
				Self.startTime = 0;

				//Save Draft
				if (Self.autoSave && MI.isS) {
					var draft = 'draft_' + MI.user.account,
						draftPic = 'draft_pic_' + MI.user.account;
					MI.S(draft,'');
					MI.S(draftPic,'');
				}
				
				//Save Topic
				if (MI.isS && !Self.type) {
					MI.app({
						TalkBoxRich : function(){
							Self.cacheTopic(obj.content);
						}
					});
				}
									
				//如果是群私聊区发起评论，分享条数也+1
				try {
					if(MI.Group && MI.Group.qid && MI.talkList && MI.talkList.type === 2 && Self.type === 5) {
						Self.countNum(1);
					}
				} catch(e) {}
									
				//Count Talk Number					
				if (Self.type != 4 && Self.type != 5) {
					//如果不是在群里发起的对话，才+1
					if(!MI.Group || !MI.Group.qid || (Self.type !== 7 && Self.type !== 2)) {
						Self.countNum(1);							
					}
				}
				if (MI['talkList'] && data.info.talk[0].timestamp) {
					MI.talkList.updateTime(data.info.talk[0].timestamp);
				}
				if(MI['talkListHot'] && data.info.talk[0].timestamp)
				{
					MI.talkListHot.updateTime(data.info.talk[0].timestamp);
				}
				Self.txtCache = content;
			}
			
			//Speed
			Time_2 = + new Date() - Time;
			setTimeout(function(){
				Time_3 = + new Date() - Time;
				MI.Speed('t_asyn_talk',0.1,Time_1,Time_2,Time_3);
			},0);
		}
	});
	Self.delay.timeout = setTimeout(function(){ //Tips For Time Out
		Self.showTip(Self.txtTip.fail,1);
		Self._btn.disable = 0;
		UI.removeClass(Self._btn,'btnNoStr');
		MI.Bos('btnSendTimeout');
	},20000);//定的是15s，但为了安全起见，算上网络延迟、请求排队等因素，将时间扩大到20秒
	return;
}
/**
 * 删除图片
 *            @example
 *            MI.talkBox.delPic();
 */
MI.TalkBox.prototype.delPic = function(){
	var Self = this;
	if (Self._pic && Self.upPic) {
		Self.pic = this.sourcePic = '';
		Self.upPic._picForm.reset();
		UI.hide(Self._picPreview);
		UI.hide(Self._picLoading);
		if (Self._txt.value == Self.txtPic) {
			Self._txt.value = '';
		}
		if(Self.txtSummary){
			Self._txt.value = Self._txt.value.replace(Self.txtSummary,'');
			Self.txtSummary = '';
		}
		Self.longText = '';  //文转图，完整文本
		if (MI.Capture && MI.Capture.uploader){
			MI.Capture.uploader.StopUpload();
		}
		
		if(UI.B.chrome) {  //解决chrome下 传同一张图片不触发change事件的问题
			Self.upPic._picForm.innerHTML = Self.upPic._picForm.innerHTML;
			Self.upPic._picBtn = UI.GT(Self.upPic._picForm,'input')[0];
			Self.upPic._picBtn.onchange = Self.upPic.picChange;
		}
		Self.countTxt();
		UI.removeClass(Self._picAnchor,'disabled');
		(UI.children(Self._sendStatus,'sendThumbs').length < 2) && UI.removeClass(Self._sendCnt,'hasMedia');
	}
	
	//删除上传过的图片
	if (Self.autoSave){
		try{
			MI.S('draft_pic_' + MI.user.account,'');
		}catch(e){};
	}
}
/**
 * 删除视频
 *            @example
 *            MI.talkBox.delVideo();
 */
MI.TalkBox.prototype.delVideo = function(){
	if (this._video) {
		this.video = '';
		UI.remove(this._videoPreview);
		//UI.show(this._videoAnchor);
		UI.removeClass(this._videoAnchor,'disabled');
		(UI.children(this._sendStatus,'sendThumbs').length < 2) && (this._picPreview.style.display == 'none') && UI.removeClass(this._sendCnt,'hasMedia');
		if (this._txt.value == this.txtVideo) {
			this._txt.value = '';
		}
		this.countTxt();
	}
}
/**
 * 删除音乐
 *            @example
 *            MI.talkBox.delMusic();
 */
MI.TalkBox.prototype.delMusic = function(){
	this.music = '';
	this.mlist = '';
	if (this._music && this.upMusic) {
		UI.remove(this._musicPreview);
		UI.hide(this.upMusic._musicBox);
		//UI.show(this._musicAnchor);
		UI.removeClass(this._musicAnchor,'disabled');
		//如果有录音按钮，同时激活录音按钮
		if(this._recordAnchor) {
			UI.removeClass(this._recordAnchor,'disabled');
		}
		if (this._txt.value.hasString(this.txtMusic)) {
			this._txt.value = this._txt.value.replace(this.txtMusic,'');
		}
		this.countTxt();
	}
}
MI.TalkBox.prototype.cancelPic = function(){
	if (this._pic && this.upPic) {
		this.pic = '';
		UI.hide(this._picLoading);
		this.upPic._iframe.src = 'about:blank';
		this.upPic._picForm.reset();
		UI.removeClass(this._picAnchor,'disabled');
		this.upPic._picCapture[1] && UI.removeClass(this.upPic._picCapture[1],'loading');
		(UI.children(this._sendStatus,'sendThumbs').length < 2) && UI.removeClass(this._sendCnt,'hasMedia');
	}
}
MI.TalkBox.prototype._addPic = function(o){
	var Self = this,
		pic,
		normalPic,
		host,
		Time,Time_1,Time_2,Time_3;
	if(!Self.upPic){ //触发图片浮层build
		setTimeout(function(){
			if (Self.picUploadBuild){
				Self.picUploadBuild();
			}
			Self.addPic(o);
		},100);
		return;
	}
	Time = Self.upPic.PicUpTime;
	Time_1 = + new Date();
	UI.hide(Self._picLoading);
	if (o.result == 0) {
		if(Self.upPic.flashCapture) { //截屏到多图flash
			MI.PhotoMultiUpload.captureImg(o.info.image + "/2000");
			UI.removeClass(Self.upPic._picCapture[1],'loading');
			return;
		}
		!(UI.hasClass(Self._sendCnt,'hasMedia')) && UI.addClass(Self._sendCnt,'hasMedia');
		//UI.removeClass(Self._pic,'hover');
		host = o.info.host;
		pic = o.info.image;
		normalPic = pic.hasString('mblogpic.store.qq.com/mblogpic') || pic.hasString('qpic.cn'); 
		if (normalPic){
			Self.pic = pic;
		}
		else {
			Self.sourcePic = pic;
		}
		if (MI.PicTurn){
			MI.PicTurn.url = 'http://' + (host ? host : 'upload.t.qq.com');
		}
		if (MI.user.fun.turnPic && o.info.path) {
			MI.PicTurn.reset(Self.pic,o.info.path);
		}
		var turnPicAble = MI.user.fun.turnPic && o.info.path,
			fileName = o.info.fileName || Self.upPic._picBtn.value,
			fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length);

		fileName = fileName.match(/[^\/|\\]*$/)[0].replace(new RegExp(fileType + '$'),'');
		fileName = MI.string.cut(fileName,10) + fileType;
		if (turnPicAble) {
			Self._picLink.innerHTML = '<em class="sico ico_pic"></em><a href="' + pic  + '/2000" class="fileName" target="_blank">' + fileName + '</a>';
			UI.addClass(Self._picAnchor,'disabled');
		}
		else {
			UI.append(Self._uploadPicS,Self._sendStatus);
			UI.addClass(Self._picAnchor,'disabled');
			Self._picLink.innerHTML = '<em class="sico ico_pic"></em><a href="' + pic + '/2000" class="fileName" target="_blank" style="position:relative;">' + fileName + '<span class="simg" style="cursor:default;"><img  src="' + pic +  "/160" + '" /><br /><span style="white-space:nowrap;display:' + (UI.B.ipad ? 'none':'inline' ) + '"><span class="useFilter" style="cursor:pointer;display:inline-block;padding:5px 0;" href="javascript:void(0)">' + _('魔法滤镜') + '</span></span></span></a>';
			$$(Self._picLink,'.useFilter')[0].onclick = function(){
				MI.app({
					Base:function(){
						var src = pic.replace('mblogpic.store.qq.com/mblogpic','t0.qpic.cn/mblogpic');
						MI.photoFilter.build(src + "/2000",'http://t.qq.com/asyn/updateGrabPic.php');
						MI.TalkBox.cur = Self;
					}	
				});
				MI.Bos('btnPhotoFilter');
				return false;
			}		
		}

		var _fileName = $$(Self._picLink,'.fileName')[0],delayHide,
			show = function(){
				if(turnPicAble) {
					MI.PicTurn.show();
				} else {			
					clearTimeout(delayHide);
					clearTimeout(MI.PicTurn.autoHideDelay);
					UI.addClass(_fileName,'hover');
				}	
			},
			hide = function(){
				if(turnPicAble) {
					MI.PicTurn.hideT();
				} else {		
					delayHide = setTimeout(function(){
						UI.removeClass(_fileName,'hover');
					},200);
				}
			};

		UI.EA(_fileName,'mouseover',show);
		UI.EA(_fileName,'mouseout',hide);
		show();
		MI.PicTurn.autoHideDelay = setTimeout(hide,3000);
		UI.show(Self._picPreview);
		Self.guideTextRemove();
		if (Self._txt.value == '' && fileName != _('表情.jpg')) {
			Self._txt.value = Self.txtPic;
			Self.countTxt();
		}
		Self.focus();
	}
	else {
		Self.cancelPic();
		MI.alert(o.msg);
	}
	Self.upPic._picForm.reset();

	//Speed
	if (Time){
		Time_2 = + new Date() - Time;
		setTimeout(function(){
			Time_3 = + new Date() - Time;
			MI.Speed('t_asyn_uploadpic',1,Time_1,Time_2,Time_3);
		},0);
	}
	Self.upPic.PicUpTime = null;

	//存储上传过的图片
	if (Self.autoSave && o){
		try{
			o.info.fileName = fileName;
			MI.S('draft_pic_' + MI.user.account,UI.json2str(o));
		}catch(e){};
	}
}
MI.TalkBox.prototype._getVideo = function(value){
	var Self = this;
	var upV = Self.upVideo;
	Self.ayncVideoResult = null;
	if(!UI.trim(value)){
		//Self.hide();
		return;
	}
	if(this.delayVideo)	clearTimeout(this.delayVideo);
	this.delayVideo=window.setTimeout(function(){
		if (upV){
			upV._videoError.innerHTML = upV._errMsg[1];
			UI.show(upV._videoError);
		}
		MI.ajax({
			url : MI.url.validateVideo,
			type : 'get',
			data : "url=" + encodeURIComponent(value)+'&r='+MI.random(),
			success : function(data){
				if (upV){
					upV._videoBtn.disabled = false;
				}
				data = MI.json(data);
				Self.ayncVideoResult = data.result;
				if (data.result == 0){
					if (upV){
						UI.hide(upV._videoError);
					}
					if(data.url){
						//upV.video = upV._videoTxt.value;//'http://url.cn/'+data.url;
						clearTimeout(Self.delayVideoTime);
						var title = data.title.replace(/\&lt;/g,'<').replace(/\&gt;/g,'>').replace(/\&quot;/g,'"');
						var v = _('#分享视频#') + title + ' http://url.cn/'+data.url+' ';
						Self.video = data.url;
						Self.txtVideo = v;
						if (upV){
							Self.addTopic(v);
							upV._videoTxt.value = '';
						}
						Self.countTxt();
						Self.focus();

						var preview = '<div class="sendThumbs uploadVideo"><span class="preview"><span class="link"><em class="sico ico_videos"></em><a class="fileName" href="#">%title%<span class="vThumbs"><span class="mask"><em></em></span><img src="%pic%" /></span></a></span><a class="del" href="#" title="' + _('删除') + '">[' + _('删除') + ']</a></span></div>';
						data.pic = data.pic ? data.pic : 'http://mat1.gtimg.com/www/mb/images/vNoThumbs.jpg';
					//	var op = $$(upV._box,'.preview')[0];
						var p = preview.replace(/\%title\%/g,MI.string.cut(MI.string.html(title),10)).replace(/\%pic\%/g,data.pic);
						Self._videoPreview = UI.html(p)[0];
					//	if(op)	UI.remove(op);
						UI.append(Self._videoPreview,Self._sendStatus);
						UI.addClass(this,'disabled');
						!(UI.hasClass(Self._sendCnt,'hasMedia')) && UI.addClass(Self._sendCnt,'hasMedia');

						var del = $$(Self._videoPreview,'.del')[0];
						del.onclick = function(e){
							UI.E(e).stop();
							Self.delVideo();
							return false;
						}
						del = null;
						UI.addClass(Self._videoAnchor,'disabled');
						if (upV){
							upV.hide();
						}
					}
				}else if(data.result == -1){//未登录errMsg
					if (upV){
						upV._videoError.innerHTML = upV._errMsg[0];
						UI.show(upV._videoError);
					}
				}else if(data.result == -3){//暂不支持
					if (upV){
						upV._videoError.innerHTML = upV._errMsg[3];
						UI.show(upV._videoError);
						Self._videoNormalBtn = $$(upV._box,'.vNormalBtn')[0];
						Self._videoNormalBtn.onclick = function(){
							if(UI.trim(upV._videoTxt.value)){
								Self._txt.value += UI.trim(upV._videoTxt.value);
								upV._videoTxt.value = '';
								clearTimeout(Self.delayVideoTime);
								upV.hide();
							}
							return false;
						}
					}
			
				}else{//获取不到或异常
					if (upV){
						upV._videoError.innerHTML = upV._errMsg[2];
						UI.show(upV._videoError);
					}
				}
			}
		});
		if (upV){
			Self.delayVideoTime = setTimeout(function(){ //Get Video For Time Out
				if(!Self.ayncVideoResult && upV){
					upV._videoError.innerHTML = upV._errMsg[2];
					UI.show(upV._videoError);
				}
			},20000);//
		}
	},200);
}
MI.TalkBox.prototype.uploadCollection =  function(o){
		var Self = this,
			type = o.type,    			//上传浮层类型，暂时未用
			name = o.name, 				//名称 Pic,Music,Video
			tab = o.tab, 				//tab中的文字:['音乐搜索','收藏','录音',]
			cnt = o.cnt, 				//内容html
			query = o.query, 			//内容subDiv的共同class
			className = o.className, 	//浮层 className
			flashTab = o.flashTab || [], 		//对不支持flash的设备隐藏tab，序列[3,4]
			buildEvent = o.buildEvent, 		//初始化时事件
			tabEvent = o.tabEvent, 		//切换tab时事件
			showEvent = o.showEvent, 	//展开浮层时事件
			hideEvent = o.hideEvent, 	//关闭浮层时事件
			_open = o._open; 			//展开按钮，talkBox下方入口
		

		var up = Self['up' + name] = {};
		var hmtlStr =  '<div class="D3 ' + className + '" style="display:none"><div class="tabStyle3"><ul>';
		UI.each(tab,function(o,i){
			hmtlStr += '<li><a href="javascript:void(0)">' + o + '</a></li>';
		});
		hmtlStr += '</ul><a class="close" href="#" title="' + _('关闭') + '"></a></div>';
		hmtlStr += cnt;
		hmtlStr += '<div class="SA"><em>◆</em><span>◆</span></div></div>';
		
		up._box = UI.html(hmtlStr)[0];
		up._open = _open;
		up._tab = $$(up._box,".tabStyle3 li");
		up._div = $$(up._box,query);
		up._close = $$(up._box,".tabStyle3 .close")[0];
		up._arrows = $$(up._box,".SA")[0];
		UI.after(up._box,Self._sendStatus);
		
		
		//隐藏多图，文图，拍照tab，以及截屏,录音，录像等
		if(UI.B.ipad || MI.user.fun.qbUpload || Self.noFlash) {
			UI.each(flashTab,function(o,i){
				UI.hide(up._tab[o]);
			})
		}
		
		//切换tab
		up.switchTab = function(i){
			if(UI.hasClass(this,'select')) return;
			UI.each(up._div,function(d,j){
				if(i==j) {
					UI.addClass(up._tab[j],'select');
					UI.removeClass(up._div[j],'hideDcnt');
				}	
				else {
					UI.removeClass(up._tab[j],'select');
					UI.addClass(up._div[j],'hideDcnt');
				}
			});
			if(tabEvent){
				MI.app({
					Base : function(){
						tabEvent(up,i);
					}	
				});	
			}
		} 
		
		UI.each(up._tab,function(o,i){
			o.onclick = function(){
				up.switchTab(i);
			}
		});
		
		//关闭浮层
		up.hide = function(){
			if(up._box.style.display == 'none') return;
		//	UI.removeClass(up._open,'disabled');
			hideEvent && hideEvent(up);
			UI.hide(up._box);
		}

		//箭头定位
		up.setArrPos = function(btn){
			if(!btn) return;
			var x = up.arrPos || (UI.getX(btn) + UI.width(btn)/2 - UI.getX(up._box.parentNode));
			if (!UI.text(btn)){ //只有图标
				x = x - 14 / 2;
			}
			
			up._arrows.style.left = x + 'px';
			//up.arrPos = x;
			return  x;
		}

		//打开浮层
		up.show = function(i){
			MI.TalkBox.cur = Self;
			if(up._box.style.display != 'none') return false;
			Self.hideMedia();
			if(UI.hasClass(up._open,'disabled')) return false;
			UI.show(up._box);
			showEvent && showEvent(up);
			up.switchTab(i||0)  //触发指定tab展开，默认第一个
			up._open.blur();
			MI.Bos('btn' + name);
			up.setArrPos(up._open);
			up.showed = 1;
			return false;
		}
		
		//关闭按钮
		up._close.onclick = function(){
			up.hide();
			return false;
		}
		
		//打开按钮
		up._open.onclick = function(){
			up.show(0);
			return false;
		};
		
		buildEvent && buildEvent(up);
		//自动打开
		//up.show(0);
		
};

MI.TalkBox.prototype.addEvent = function(){ // 事件绑定
	var Self = this;
	if(Self.addEvented) return;
	//DOM
	Self._insertFun = Self.$('.insertFun');
	Self._topic = Self.$('.creatNew');
	Self._topicNewYear = Self.$('.atWen .txt');
	Self._at = Self.$('.atSome');
	Self._face = Self.$('.insertFace .txt,a.ico_face');
	Self._mood = Self.$('.newFeel .txt');
	Self._vote = Self.$('.newVote .txt');
	Self._order = Self.$('.newOrder .txt'); //商品
	Self._gift = Self.$('.newGift .txt'); //送礼
	Self._file = Self.$('.uploadFile .txt'); //文件分享
	Self._video = Self.$('.uploadVideo');
	Self._videoAnchor = $$(Self._video,'.txt')[0];
	Self._music = Self.$('.uploadMusic');
	Self._musicAnchor = $$(Self._music,'.txt')[0];
	Self._record = Self.$('.record');
	if (Self._record){
		Self._recordAnchor = $$(Self._record,'.txt')[0];
	}
	Self._pic = Self.$('.uploadPic');
	Self._picAnchor = $$(Self._pic,'.txt')[0];
	Self._syncQzoneUnite = Self.$('.synchFrm .txt'); //同步到空间（联动）
	Self._syncQzone = Self.$('.replayQzoneCheckbox'); //同步到空间（不联动）
	
	Self._more = Self.$('.smoreFun');//‘更多’区域
	Self._moreBox = $$(Self._more,'.moreBox')[0];//‘更多’下拉菜单盒子
	Self._moreAnchor = $$(Self._more,'.more')[0];//‘更多’下拉菜单按钮
	Self._moreDropBox = $$(Self._more,'.dropBox')[0];//‘更多’下拉菜单
	Self._sendCnt = Self.$('.sendCnt');//talkbox 外层盒子
	Self._autoBackspace = Self.$('.autoBackspace');

	Self._sendStatus = Self.$('.sendStatus') || UI.DC('div');//图片,视频,音乐等附件上传状态栏

	var countTxt = function(e){
		if (!Self.sending) {
			Self.countTxt();
			//showGuide();
		}
	},
	countTxtDelay = function(e){
		var type,E = UI.E(e);
		if (!Self.startTime && e){
			type = E.type;
			if (type == 'input' || type == 'paste' || type == 'cut' || type.hasString('key')){
				Self.startTime = + new Date();
				MI.ajax({
					url : MI.url.notice,
					type : 'get',
					data : 'op=1'
				});
			}
		}
		clearTimeout(Self.delay.count);
		if (E.target == Self._txt){
			Self.guideTextRemove(); //移除引导词
		}
		Self.delay.count = setTimeout(countTxt,75);
	};
	/*
	function guide(name){
		return _('对{0}说：',' ' + name + ' ');
	}
	function showGuide(){
		return;
		clearTimeout(Self.delay.guide);
		Self.delay.guide = setTimeout(function(){
			if (Self._guide) { //智能引导提示 【对 xhlv 说：】
				var content = Self._txt.value,account = UI.trim(content).match(/^@[a-zA-Z]{1}[\w|-]{0,19}(?![\w-])/g),nick,users = MI['follow_' + MI.user.account];
				if (account && account[0].length != content.length) {
					account = account[0].slice(1);
					if (UI.A(Self._guide,'user') != account) {
						if (users) { //从@联想中获取姓名
							nick = users.info[account];
						}
						if (nick) {
							Self._guide.innerHTML = guide(nick);
						}
						else { //异步拉取姓名
							UI.get('/asyn/userCard.php','u=' + account + '&r=' + MI.random(),function(data){
								//data = "{result:0,msg:'',info:{nick:'xhlv'}}";
								data = MI.json(data);
								if (data.result == 0 && data.info.nick) {
									Self._guide.innerHTML = guide(data.info.nick);
								}
								else { //拉取失败或帐号不存在，直接当普通广播处理
									Self.guideReset();
								}
							});
						}
						UI.A(Self._guide,'user',account);
					}
				}
				else {
					Self.guideReset();
				}
			}
		},200);
	}
	*/
	UI.EA(Self._txt,'keypress',countTxtDelay);
	UI.EA(Self._txt,'input',countTxtDelay);
	UI.EA(Self._txt,'paste',countTxtDelay);
	UI.EA(Self._txt,'cut',countTxtDelay);
	Self._txt.onbeforeeditfocus = countTxtDelay;
	Self._body.onkeydown = function(e){
		if (!Self.sending) {
			var E = UI.E(e);
			if (E.ctrl && E.key == 13) { //Alt+S : E.alt && E.key == 83
				//E.prevent();
				Self.sending = 1; //Don't Count And Send When 'sending == true'
				countTxtDelay();
				Self.send();
				MI.Bos('btnCtrlEnter');
			}
			else if (Self._pic && E.key == 86 && E.ctrl){
				if(!Self.installCapturePluginTip) Self.tmpTxt = Self._txt.value;
				MI.app({
					Capture:function(){
						if(MI.Capture && MI.Capture.uploader){
							if(!Self.upPic && Self.picUploadBuild) Self.picUploadBuild();
							MI.Capture.upload();
						}
					}
				});	
			}
		}
	};
	Self._body.onkeyup = function(e){
		var E = UI.E(e);
		if (!Self.sending) {
			countTxtDelay();
		}
		if(Self.installCapturePluginTip || (E.target != Self._txt)) return;
		if (Self._pic && (E.ctrl && E.key == 86)){ //无法检测先松开ctrl键的情况
			if(Self.tmpTxt == Self._txt.value){
				MI.app({
					Capture:function(){
						if (!MI.Capture || !MI.Capture.enable){
							MI.confirm({
								title : _('你想直接粘贴图片吗？'),
								content : _('安装截屏插件，就可以在输入框中粘贴图片并随时截屏'),
								confirmTxt : _('安装'),
								confirm : function(){
									MI.Capture.install();
								}
							});
						}
					}
				});	
				Self.installCapturePluginTip = 1;				
			};
		}
	};

	//话题引导
	if(MI.user.fun.relTopic && Self._sendCnt){
		var showRelTopic = function(e){
			if(Self.noRelTopic) return;
			clearTimeout(Self.relTopicDelay);
			var tmpTxt = Self._txt.value;
			var delayTime = (UI.E(e).key != 8) ? 1000 : 250;  //退格键250毫秒
			if(MI.string.length(tmpTxt)< 20) {
				if(Self.upRelTopic) Self.upRelTopic.hide();
				return;
			};
			Self.relTopicDelay = setTimeout(function(){
				if(tmpTxt == Self._txt.value) {
					MI.app({
						TalkBoxRich : function(){
							try{
								Self.showRelTip();
							} catch(e){}
						}
					})
				}
			},delayTime);
		};

		UI.EA(Self._txt,'keyup',showRelTopic);
	}

	//Auto Complete
	if (!UI.hasClass(Self._txt,'noAutoCmt')) {
		setTimeout(function(){
			MI.app({
				Base : function(){
						Self.autoCmt = new MI.AutoCmt({
							target : Self._txt,
							key : 1,
							topic : 1,
							face : 1,
							tips: Self.tips ? Self.tips : 1,
							call : function(){
								countTxtDelay();
							}
						});
				}
			});
		},50);
	}

	//New Topic
	if (Self._topic) {
		Self._topic.onclick = function(){
			Self.guideTextRemove(1);
			var sTxt = MI.getSelectTxt(Self._txt); //给选中文字加话题
			if(Self._txt.value && sTxt.txt && (sTxt.txt != Self.txtTopic.replace(/#/g,''))) {
				MI.selectTxt(Self._txt,sTxt.start,sTxt.start); //for ie
				MI.insertTxt(Self._txt,'#',sTxt.start);
				MI.selectTxt(Self._txt,sTxt.end + 1,sTxt.end + 1); //for ie
				MI.insertTxt(Self._txt,'#',sTxt.end + 1);
				MI.selectTxt(Self._txt,sTxt.start + 1,sTxt.end + 1);
				Self.countTxt();
				MI.Bos('btnTopic');
				return false;
			}
			Self.addTopic();
			MI.Bos('btnTopic');
			return false;
		}
		/*MI.app({
			Base : function(){
				if (MI.isS) {
					Self._topicWrap = UI.html('<div class="mytopicWrap" style="display:none"></div>')[0];
					UI.after(Self._topicWrap,Self._topic);
					Self._topicWrap.onclick = function(e){
						var E = UI.E(e),
							target = E.target;
						if (target.nodeName == 'A'){
							Self.addTopic('#' + target.innerHTML + '# ');
						}
						return false;
					}
					Self._topicWrap.onmouseover = Self._topic.onmouseover = function(){
						clearTimeout(Self.delay.topic);
						Self.delay.topic = setTimeout(function(){
							Self.showTopic();
						},200);
					}
					Self._topicWrap.onmouseout = Self._topic.onmouseout = function(){
						clearTimeout(Self.delay.topic);
						Self.delay.topic = setTimeout(function(){
							Self.hideTopic();
						},200);
					}
				}
			}
		});*/
	}
	if(Self._more){
		Self._moreAnchor.onclick = function(){
			UI.addClass(Self._moreBox,'sopen');
			return false;
		}
		Self._moreBox.onmouseover = function(){
			clearTimeout(Self.delay.moreBox);
		}
		Self._moreBox.onmouseout = function(){
			Self.delay.moreBox = setTimeout(function(){
				UI.removeClass(Self._moreBox,'sopen');
			},200)
		}
	}

	//New Year Topic
	if (Self._topicNewYear){
		Self._topicNewYear.onclick = function(){
			var word = '',
				user = UI.A(this,'user'),
				topic = '#' + (UI.A(this,'topic') || _('微博拜年')) + '#',
				txt = Self._txt.value;
			if (!txt.hasString(topic)){
				word += topic;
			}
			if (txt.slice(MI.cursorX(Self._txt) - 1) != '@' && !user){
				word += '@';
			}
			if (user && !txt.hasString(user)){
				word += '@' + user + ' ';
			}
			if (word){
				Self.addTopic(word);
			}
			else {
				MI.focus(Self._txt);
			}
			Self._moreBox && UI.removeClass(Self._moreBox,'sopen');
			MI.Bos('btnTopicNewYear');
			return false;
		}
	}
	
	//At
	if (Self._at){
		Self._at.onclick = function(e){
			var T = this;
			Self.hideMedia();
			setTimeout(function(){
				if (Self.autoCmt) {
					Self.autoCmt.showAll(T);
				}
			},0);
			MI.TalkBox.cur = Self;
			MI.Bos('btnAt',0,0.01);
			return false;
		}
	}
	
	//Insert Face
	if (Self._face) {
		Self._face.onclick = function(){
			Self.hideMedia();
			MI.app({
				TalkBoxRich : function(){
					Self.addFace();
				}
			});
			MI.Bos('btnFace',(Self.type || 1) + '');
			return false;
		}
	}

	// Add Mood
	if (Self._mood) {
		var ico = $$(Self._mood,'.ico_feel')[0];
		if(MI.user.fun.feelTip && Self.feelTip){
			UI.A(Self._mood,'title',_('跳动的小心脏提醒你记录每日心情'));
			ico.innerHTML = '<img src="http://mat1.gtimg.com/www/mb/images/feel.gif" alt="">';
		}
		Self._mood.onclick = function() {
			if(MI.user.fun.feelTip && ico.innerHTML != ''){
				UI.A(Self._mood,'title',_('心情'));
				ico.innerHTML = '';
				MI.Bos('btnMoodClickFlick');
			}
			MI.app({
				Mood : function(){
					MI.Mood.floatBox.show();
				}
			});
			MI.Bos(UI.A(this,'sign') ? 'btnMoodTalkBoxLook' : 'btnMoodTalkBoxWrite'); // 改为页面中嵌入代码上报
			return false;
		}
		 //鼠标没有点击,闪烁5次后停止
		setTimeout( function(){
			if(ico.innerHTML != ''){
					UI.A(Self._mood,'title',_('心情'));
					ico.innerHTML = '';												
			}
		},15000);
	}
	if(Self._syncQzoneUnite || Self._syncQzone) {
		//syncQzone
		if(Self._syncQzoneUnite) {
			Self._sico = $$(Self._syncQzoneUnite,'.sico')[0]
			
			Self.toogleSyncQzone = function(isSync){
				Self._sico.className = isSync ? 'sico ico_diary' : 'sico ico_diary_gray';
				Self._syncQzoneUnite.title = isSync ? _('已同步至QQ空间') : _('未同步至QQ空间');
				Self.data.syncQzone =  isSync*1;	
			};
			
			Self._syncQzoneUnite.onclick = function(){	
				//发送请求，同步设置
				MI.ajax({
					type : 'get',
					url : MI.url.syncQzoneSet,
					data : {ss:!MI.user.fun.syncQzone*1,t:2},
					success : function(data){
						data = MI.json(data);
						if(data.result == 0) {
							MI.user.fun.syncQzone = !MI.user.fun.syncQzone*1;
							Self.toogleSyncQzone(MI.user.fun.syncQzone*1);
						}
					}
				})
				MI.Bos('btnSyncQzoneUnite');
				return false;
			}
			Self.toogleSyncQzone(!!MI.user.fun.syncQzone*1);	
		}; 
		
		//syncQzone checkBox
		if(Self._syncQzone) {
			if(Self.syncQzoneOld) {
				Self.data.share = Self._syncQzone.checked*1;
				Self.data.syncQzone = 0;	
			} else {
				Self.data.syncQzone = Self._syncQzone.checked*1;
				Self.data.share = 0;
			}
			Self._syncQzone.onclick = function(){
				if(Self.syncQzoneOld) {
					Self.data.share = this.checked*1;
					MI.Bos('btnShareQzoneCheckBox');
				} else {
					Self.data.syncQzone = this.checked*1;
					MI.Bos('btnSyncQzoneCheckBox');
				}
			}	
		} 
		
	} else {
		Self.data.syncQzone = 0;	
	}
	
	//送礼
	if(Self._gift) {
		Self._gift.onclick = function(){
			var eventId = UI.A(this,'eventId');
			MI.sendGiftShow(eventId*1);
			MI.Bos('btnTalkBoxSendGift' + eventId);
			return false;
		}	
	}

	//Add Vote
	if (Self._vote){
		Self._vote.onclick = function(){
			Self.addVote();
			Self._moreBox && UI.removeClass(Self._moreBox,'sopen');
			MI.Bos('btnVote');
			return false;
		}
	}
	
	if(MI.user.fun.relTopic) {
		var relHtml = '<div class="relTopicBox" style="width:290px;">\
          	<ul class="relTopicList"></ul>\
            <div class="cNote">' + _('你的广播内容可能与以上话题相关') + '</div>\
          </div>';
		
		Self.showRelTip = function(){
			if(!Self.upRelTopic) Self.uploadCollection({
					type : null,
					name : 'RelTopic',
					tab : [_('加入话题可获得更多关注和互动')],
					cnt : relHtml,
					query : '.relTopicBox',
					className : 'relTopic',
					flashTab : [],
					_open : UI.DC('div'),
					buildEvent : function(o){
						o._relTopicList = $$(o._box,'.relTopicList')[0];
						o._tips = $$(o._box,'.cNote')[0];
						o.added = [];
						o.arrPos = o.setArrPos(Self._topic) || '231';
						o.topicReg = /(#\s*[^#\s]{1}[^#]{0,59}?\s*#)/;
						UI.GT(o._tab[0],'a')[0].style.cssText = 'cursor:default;text-decoration:none';
						UI.C(o._box,'width','340px');

						o._close.onclick = function(){
							o.hide();
							if(o._tips.style.display != 'none') o.notShowAgain = 1;
							return false;
						};

						//发布成功之后
						o.showResult = function(){
							o.hide();
							if(o.added.length) {
								var tmpStr = '<li>' + _('去');
								UI.each(o.added,function(k){
									tmpStr += '<a target="_blank" href="' + 'http://t.qq.com/k/' + k + '">#' + k + '#</a> ';
								});
								tmpStr += _('看看大家都在说什么吧') + '</li>';
								o._relTopicList.innerHTML = tmpStr;
								UI.hide(o._tips);
								UI.show(o._box);
								o.added = [];
							}
							o.notShowAgain = 0;
						};

						var handler = Self.success;
						if(UI.isFunction(handler)) {
							Self.success = function(data){
								handler.call(Self,data);
								o.showResult();
							}
						} else {
							Self.success = function(data) {
								o.showResult();
							}
						}	
					},
					showEvent : function(o){
						UI.show(o._tips);
					}
			});
			
			
			var tpObj = Self.upRelTopic;
			if(tpObj.notShowAgain) {  //手动关闭后 不再显示
				return false; 
			}
			if(tpObj.topicReg.test(Self._txt.value)) {
				return false; //有话题，不发请求
			}	
			MI.ajax({
				url : MI.url.relativeTopics,
				type : 'post',
				data : {t : Self._txt.value,r : MI.random()},
				success : function(data){
					data = MI.json(data);
					if((data.result == 0) && data.info.s) {
						
						var listHtml = '';
						UI.each(data.info.s,function(o){
							listHtml += '<li><a href="javascript:void(0)">#' + o + '#</a></li>';
						});
						tpObj._relTopicList.innerHTML = listHtml;

						UI.each(UI.GT(tpObj._relTopicList,'a'),function(a){
							a.onclick = function(){
								var topic = a.innerHTML;
								if(!Self._txt.value.hasString(topic)){
									Self._txt.value = topic + ' ' + Self._txt.value;
									tpObj.added.push(topic.replace(/#/g,''));
									Self.countTxt();
								}
								tpObj.hide();
								return false;
							}	
						});
						tpObj.show(0);
					} 
					else {
						tpObj.hide();
					}
				}
			})
		
			return false;
		}
	}

	//文件上传
	if (Self._file) {
		Self._file.onclick = function(){
			var width = 594,
				height = 320,
				top = (window.screen.availHeight - 30 - height)/2,
				left = (window.screen.availWidth - 10 - width)/2, 
				upUrl = 'http://t.qq.com/uploadfile.php?qid=0';
			window.open(upUrl,'wbUploadFile','height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',scrollbars=yes,resizable=yes');
			MI.Bos('btnUploadFile');
			return false;
		}
	}
	
	//商品
	if (Self._order) {
		var orderHtml = '<div class="orderBox"><p>' + _('粘贴商品地址') + '</p><p class="clear"><input type="text" class="inputTxt"><button class="btn1">' + _('确定') + '</button></p><p class="cError" style="display:none"></p></div>';

		Self._order.onclick = function(){
			Self.uploadCollection({
					type : null,
					name : 'Order',
					tab : [_('商品')],
					cnt : orderHtml,
					query : '.orderBox',
					className : 'insertOrder',
					flashTab : [],
					_open : Self._order,
					buildEvent : function(o){
						var strRegex = new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*','i'),
						orderTip = [_('你输入的商品链接已提交，请等待'), _('商品地址不能为空，请在输入框粘贴或输入') ,_('不支持该地址，请重新输入')];
						o._inputTxt = $$(o._box,'.inputTxt')[0];
						o._submit = $$(o._box,'.btn1')[0];
						o._tip = $$(o._box,'.cError')[0];
						o._submit.onclick = function(){
							var value = UI.trim(o._inputTxt.value);
							if(strRegex.test(value)){
								o._submit.disabled = true;
								o._tip.innerHTML = orderTip[0];
								UI.show(o._tip);
								MI.ajax({
									url : MI.url.uploadOrder, //拉取地址需要修改
									type : 'post',
									data : {
										op : 1,
										url : UI.utfEncode(value),
										r : MI.random()
									},
									success : function(data){
										data =  MI.json(data);
										if (data.result == 0 && data.info){
											var txt = (data.info.topic || '') + (data.info.name || '');
											if(!Self._txt.value.hasString(txt)) Self.addTopic(txt);
											o._tip.innerHTML = orderTip[0];
											o.hide();
											Self.rmsg = {
												type : 0,
												id : data.info.id
											}
										}else{
											o._submit.disabled = false;	
											o._tip.innerHTML = data.msg;
										}
									}
								});
							}else{
								o._inputTxt.focus();
								o._tip.innerHTML = !value ? orderTip[1] : orderTip[2];
								UI.show(o._tip);
							}
						}					
					},
					showEvent : function(o){
						//Self._moreBox && UI.removeClass(Self._moreBox,'sopen');
						o._inputTxt.value = '';
						o._submit.disabled = false;
						o._tip.innerHTML = '';
						o._inputTxt.focus();
					}
			});
			Self.upOrder.show(0);
			return false;
		}
	}

	//Add QQ Music
	if (Self._music) {
		var musicHtml = '<div class="m_sResult rSearch"><div class="m_self"><a href="#">'+ _('我要自己上传') + '<em class="ffsong">&gt;&gt;</em></a></div></div>\
			  <div class="m_sResult rFav hideDcnt"></div>\
			  <div class="m_sResult recordBox hideDcnt"></div>';
				
			Self.musicUploadBuild = function(){
				if(Self.upMusic) return;
				//英文版cut“我要录音”
				var tabContent = !MI.user.fun.newMusicBox ? [_('上传音乐'),_('音乐收藏')] : [_('分享歌曲'),_('分享歌单')];
				if(window.MILang != 'en_US' && MI.user.fun.audioRecord)
					tabContent[2] = Self.recordTabName || _('我要录音');
				Self.uploadCollection({
					type : 2,
					name : 'Music',
					tab : tabContent,
					cnt : musicHtml,
					query : '.m_sResult',
					className : 'insertMusic',
					flashTab : window.MILang=='en_US' ? [] : [2],
					_open : Self._musicAnchor,
					buildEvent : function(o){
						if(!($$(Self._sendStatus,'.uploadMusic')[0])){
							if(!MI.Music){
								MI.app({Music:function(){
									if(MI.Music){
										MI.Music.build(Self);
										MI.Music.show();
									}
								}});
							}else{
								if (!MI.Music.builded || !Self.MusicBuild){
									MI.Music.build(Self);
									Self.MusicBuild = 1;
								}
								MI.Music.show();
							}
						}
						//自己上传
						o._audioUpload = $$(o._box,'.m_self')[0];
						if(!MI.user.fun.audioUpload) {
							UI.hide(o._audioUpload);
							UI.hide(o._tab[2]);
							return false;
						}
						if (o._audioUpload){
							o._audioUpload.onclick = function(){
								o.hide();
								Self.audioUpload();
								return false;
							}
						}
					},
					showEvent : function(o){
						if(!MI.Music || !MI.Music.talkBoxList) return;
						UI.each(MI.Music.talkBoxList,function(talk){
							if(talk == Self) {
								MI.Music.talkBox = Self;
							} else {
								talk.upMusic.hide();
							}
						})	
					},
					hideEvent : function(o){
						clearTimeout(Self.delayMusicTime);
						o._div[2].innerHTML = ''; //清除录音flash
						if(MI.Music) MI.Music.stop();
					},
					tabEvent : function(o,i){
						if(i==2) {
							if(MI.Flash && (MI.Flash.getVersion() < 9)){
								o._div[2].innerHTML = MI.Flash.updateTip(9);
								return;
							}
							else if(o._div[2].innerHTML == '') {
								o._div[2].innerHTML = MI.user.fun.audioRecord ? '<div class="flashWrap">' +  MI.Flash.getObject(null,MI.swf.MusicRecord,404,160,'musicRecord') + '</div>' : '';  //插入录音flash
							}	
						}
					}
				});
			}

			Self._musicAnchor.onclick = function(){
				Self.musicUploadBuild();
				Self.upMusic.show(0);
				//点击音乐按钮，适配点击录音按钮，调整相关UI
				UI.EA(Self._musicAnchor, 'click', function() {
					Self.upMusic.setArrPos(Self._musicAnchor);
					UI.show(Self.upMusic._tab[0]);
					UI.show(Self.upMusic._tab[1]);
					Self.upMusic.switchTab(0);
				});
				return false;
			}
			if(Self._recordAnchor) {
				//点击录音按钮，模拟点击音乐按钮，并调整相关UI
				Self._recordAnchor.onclick = function(){
					UI.fireEvent(Self._musicAnchor, 'click');
					Self.upMusic.setArrPos(Self._recordAnchor);
					UI.hide(Self.upMusic._tab[0]);
					UI.hide(Self.upMusic._tab[1]);
					Self.upMusic.switchTab(2);
					return false;
				}				
			}
			
		window.getMicRecUploadResult = function($result, $url, $shortUrl){  //录音回调
			if($result ==0) {
				UI.A(Self.upMusic._tab[2],'music','0,' + $url + ',' + MI.user.account + ',' + _('录音'));
				MI.Music.addPreview(Self.upMusic._tab[2],'',1);
				Self.upMusic.hide();
				Self.music.songtype = 3;
				Self.music.shorturl = $shortUrl;
				Self.txtMusic = _('来，听听我的声音。')  + ' http://url.cn/'  + $shortUrl + ' ';
				if(Self._txt.value != Self.txtMusic){
					Self._txt.value += Self.txtMusic;
				}else{
					Self._txt.value = Self.txtMusic;
				}
				Self.countTxt();
				Self.focus();
			}	
		}

		window.getRecDuration = function() { // [总时间,警告开始时间,倒数开始时间,来源]
			var result = [60, 40, 50, 17]; // 3分钟, 上传类型：微群语音微博 from=16  私信语音微博 from=16  主站语音微博from=15 主站无权限限制语音微博from=18 
			//var result = [60, 40, 50]; // 1分钟
			//var result = [180, 120, 170, 15]; // 3分钟
			if(MI.TalkBox.prototype.data.cflag==2)
			{
				//私聊区
				result = [180,120,170,17];
			}
			return result;
		}

	}
	//Add Video //qq video,tudou//youku,56
	if (Self._video) {
		/* URL : /asyn/validvideo.php		Size : 160 460 2000
			{
				result : 0,
				url : '',
				title : ''
			}
		*/

		var videoHtml = '<div class="videoWrap urlVideo"><form method="get" class="videoUploadFrom" id="videoUploadFrom" name="videoUploadFrom"><p>' + _('粘贴视频播放页地址') + '<br><span class="cNote">(' + _('支持QQvideo、优酷、土豆、酷六、CNTV') + ')</span></p><p class="clear"><input type="text" class="inputTxt"><input type="button" value="' + _('确定') + '" class="btn1"></p><p class="cError" style="display: none; "><a href="#" class="vNormalBtn"></a></p><p><a class="videoUpload ulink" href="#">' + _('我要自己上传视频') + '<em class="ffsong">&gt;&gt;</em></a></p></form></div>\
	  	<div class="videoWrap hideDcnt cameraVideo">\
			<div class="flashWrap"></div><div class="maskLoading"></div>\
		</div>';
		
			Self.videoUploadBuild = function(){
				Self.uploadCollection({
					type : 1,
					name : 'Video',
					tab : !MI.user.fun.selfVideo ? [_('视频链接')] : [_('视频链接'), _('拍摄视频')], //[_('视频链接'),_('摄像头拍摄')],
					cnt : videoHtml,
					query : '.videoWrap',
					className : 'insertVideo',
					flashTab : [1],
					_open : Self._videoAnchor,
					buildEvent : function(o){
						o._videoForm = $$(o._box,'.videoUploadFrom')[0];
						o._videoTxt = $$(o._box,'.inputTxt')[0];
						o._videoBtn = $$(o._box,'.btn1')[0];
						o._videoError = $$(o._box,'.cError')[0];
						o._videoUpload =  $$(o._box,'.videoUpload')[0];
						o._errMsg = [_('请先登录再进行操作'),_('稍等一下，喝杯茶，转贴的视频正在来的路上'),_('转贴的视频丢在路上了，再试一次？'),_('暂不支持该视频地址，') + '<a href="#" class="vNormalBtn">' + _('作为普通链接显示') + '</a>'];

						o._videoForm.onsubmit = function(){
							if(!UI.trim(o._videoTxt.value)){
								o._videoTxt.focus();
								return false;
							}
							Self.getVideo(UI.trim(o._videoTxt.value));
							o._videoBtn.disabled = true;
							return false;
						}

						o._videoBtn.onclick = function(){
							if(!UI.trim(o._videoTxt.value)){
								o._videoTxt.focus();
								return;
							}
							Self.getVideo(UI.trim(o._videoTxt.value));
							this.disabled = true;
							return false;
						}
						o._videoUpload.onclick = function(){
							o.hide();
							var upUrl = MI.url.uploadVideo,
								width = 594,
								height = 320,
								top = (window.screen.availHeight - 30 - height)/2,
								left = (window.screen.availWidth - 10 - width)/2; 

							if(Self.data && Self.data.wqid){
								upUrl = upUrl + "?qid=" + Self.data.wqid + "&zone=" + Self.data.cflag;
							}
							window.open(upUrl,'wbVideo','height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',scrollbars=yes,resizable=yes');
							MI.Bos('btnVideoUpload');
							return false;
						}

						//if(MI.Music && !MI.Music.builded){    //?
						//		MI.Music.build(Self);
						//}
					},
					showEvent : function(o){
						UI.hide(o._videoError);
						if(UI.trim(o._videoTxt.value)){
							o._videoTxt.select();
						}else{
							o._videoTxt.focus();
						}
					},
					tabEvent : function(o,i){
						if(i == 1){		//摄像头拍摄
							var target = o._div[i],
								flashCall = ['', 'VideoRecord'][i],
								bos = ['', 'btnVideoRecord'][i];
							MI.app({
								TalkBoxRich:function(){
									MI[flashCall].build(target, "#");
									MI.TalkBox.cur = Self;
								}
							});
							MI.Bos(bos);
						}
					},
					hideEvent : function(o){
						clearTimeout(Self.delayVideoTime);
						
						MI.app({
							TalkBoxRich:function(){
								MI.VideoRecord && MI.VideoRecord.clear();		//清空视频录制状态
							}
						});
					}
				});	
			}

			Self._videoAnchor.onclick = function(){
				Self.videoUploadBuild();
				Self.upVideo.show(0);
				return false;
			}
		}


	//Add Photo
	if (Self._pic) {
		/* URL : /asyn/uploadpic.php		Size : 160 460 2000
			{
				result : 0,
				msg : '',
				info : {
					image : 'http://url.cn/a32j98'
				}
			}
		*/
		var imageUploadName = 'imageUpload_' + MI.random(),
			action = MI.url.uploadPic,
			inputType = MI.user.fun.qbUpload ? ' type="button" value="&nbsp;" ' : ' type="file" size="3"',  //size for firefox
			uploadPicS = '<div class="sendThumbs uploadPicS"><span style="display:none" class="pidLoad loading">' + _("上传中") + '<a class="cancel" href="#">[' + _("取消") + ']</a></span><span style="display:none;" class="preview"><span class="link"><em class="sico ico_pic"></em></span><a href="#" class="del">[' + _("删除") + ']</a></span><iframe id="' + imageUploadName + '" name="' + imageUploadName + '" src="about:blank" style="display:none"></iframe></div>',
			picHtml = '<div class="picDiv singlePic">\
					<p><form target="imageUpload" method="post" enctype="multipart/form-data" class="sPicForm"><a class="btn_addPic" href="javascript:void(0);"><span><em>+</em>' + _('添加图片') + '</span><input class="filePrew" name="pic"' + inputType + 'title="' + _('支持jpg、jpeg、gif、png格式，文件小于5M') + '" tabindex="3"/></a></form></p>\
					<p><a class="ulink capture" style="display:none;" href="#">' + _('直接截屏上传') + '</a></p>\
				</div>\
				<div class="picDiv hideDcnt multiPic"><p>' + _('按住Ctrl 键可一次选中并上传多张图片（最多8张），拖动图片可以调整顺序') + '</p><div class="flashWrap"></div><div class="clear"><p class="left"><a class="ulink capture" style="display:none;" href="#">' + _('直接截屏上传') + '</a></p><p class="right"><span class="error"></span><button class="btnSend btn1">' + _('确定') + '</button><button class="btnCancel btn1">' + _('取消') + '</button></p></div><div class="maskLoading"></div></div>\
				<div class="picDiv hideDcnt urlPic">\
					<p>' + _('粘贴图片地址') + '<span class="cNote">(' + _('可在广播中直接显示图片') + ')</span></p>\
					<form method="get" class="sourcepicFrom" name="sourcepicFrom"><p class="clear"><input type="text" class="inputTxt"><input type="submit" value="' + _('确定') + '" class="btn1"></p><p class="cError" style="display:none">' + _('图片地址不能为空，请在输入框粘贴或输入') + '</p></form>\
				</div>\
				<div class="picDiv hideDcnt Text2Pic">\
					<p class="cNote">' + _('会自动帮你提取话题、@帐号、链接，2000字以内。') + '</p>\
					<div class="txtCnt type1"><div class="tbg"></div><div class="cbg"><b style="display:none;width:0;overflow:hidden">\001</b><textarea class="inputArea  longText"></textarea></div><div class="fbg"></div><span class="tip"></span></div>\
					<div class="flashWrap"></div>\
					<div class="clear"><p class="typeSel"><a class="select" href="#"><img alt="" src="http://mat1.gtimg.com/www/mb/images/tp/tb/1.png"></a><a href="#"><img alt="" src="http://mat1.gtimg.com/www/mb/images/tp/tb/2.png"></a><a href="#"><img alt="" src="http://mat1.gtimg.com/www/mb/images/tp/tb/3.png"></a><a href="#"><img alt="" src="http://mat1.gtimg.com/www/mb/images/tp/tb/4.png"></a></p><p class="right"><button class="btn1 btnSend">' + _('确定') + '</button><button class="btn1 btnCancel">' + _('取消') + '</button></p><div class="maskLoading"></div><span class="tip"></span></div>\
				</div>\
				<div class="picDiv hideDcnt cameraPic">\
					<div class="flashWrap"></div><div class="clear" style="display:none"><p class="left"><span class="tip"></span></p><p class="right"><button class="btnSend btn1">' + _('确定') + '</button><button class="btn1 btnCancel">' + _('取消') + '</button></p></div><div class="maskLoading"></div>\
				</div>\
				<div class="picDiv hideDcnt searchPic" style="height:208px"><div class="p_sResult"></div></div>';

		Self._uploadPicS = UI.html(uploadPicS)[0];
		Self._picLoading = $$(Self._uploadPicS,'.pidLoad')[0];
		Self._picPreview = $$(Self._uploadPicS,'.preview')[0];
		Self._picLink = $$(Self._uploadPicS,'.link')[0];
		UI.append(Self._uploadPicS,Self._sendStatus);

		if (MI.user.fun.turnPic) {
			UI.append(MI.PicTurn.build(Self),Self._uploadPicS);
			action = MI.PicTurn.url + action;
		}
			
		Self.picUploadBuild = function(){
			Self.uploadCollection({
				type : 0,
				name : 'Pic',
				tab : window.MILang == 'en_US' ? [_('本地上传'),_('多图'),_('链接'),_('文图'),_('拍照')] : [_('本地上传'),_('多图'),_('链接'),_('文图'),_('拍照'),_('搜图')],
				cnt : picHtml,
				query : '.picDiv',
				className : 'insertPic',
				flashTab : [1,3,4],
				_open : Self._picAnchor,
				buildEvent : function(o){
					o._picForm = $$(o._box,'.sPicForm')[0];
					o._iframe = $(imageUploadName);
					o._picBtn = UI.GT(o._picForm,'input')[0];
					o._picDel = $$(Self._uploadPicS,'.del')[0];
					o._picCancel = $$(Self._uploadPicS,'.cancel')[0];
					o._picCapture = $$(o._box, ".capture");//图片截屏项
					o._sourcepicBox = o._div[2];//图片粘贴浮动层
					o._sourcepicTxt = $$(o._sourcepicBox, ".inputTxt")[0];
					o._sourcepicBtn = $$(o._sourcepicBox, ".btn1")[0];
					o._sourceError = $$(o._sourcepicBox, ".cError")[0];
					o._sourcepicFrom = $$(o._sourcepicBox, ".sourcepicFrom")[0];
					o._searchPicBox = o._div[5];//搜图内容区域
					Self._searchPicBox = o._searchPicBox;//外部MI.SearchPic访问
					//隐藏截屏按钮
					if(UI.B.ipad || MI.user.fun.qbUpload) {
						UI.hide(o._picCapture[0]); 
					}

					//截屏
					if (!MI.user.fun.qbUpload &&!(UI.B.ipad)&&!(UI.hasClass(document.body,'ipad'))&&!Self.pic && (!Self._picLoading || UI.C(Self._picLoading,'display') == 'none') && MI.TalkBox.captureEnable()){
						UI.each(o._picCapture,function(p,i){
							UI.show(p);
							p.onclick = function(){
								MI.app({
									Capture:function(){
										if (MI.Capture && MI.Capture.enable){
											o.flashCapture = i; //是否为多图flash截屏按钮
											MI.Capture.screen.DoCapture();
										}
										else {
											MI.confirm({
												title : _('你还未安装腾讯微博截屏插件'),
												content : _('安装后，你就可以使用截屏功能'),
												confirmTxt : _('安装'),
												confirm : function(){
													MI.Capture.install();
												}
											});
										}
										
									}
								})
								return false;
							}
						})
					} 
					
					
					//链接上传
					o.resetSourcePic = function(){
						UI.hide(o._sourceError);
						o._sourcepicTxt.value = '';
						o._sourceError.innerHTML = '';
						o._sourcepicBtn.disabled = false;
					};

					o._sourcepicBtn.onclick = o._sourcepicFrom.onsubmit  = function(){
						var strRegex = new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*','i');
						var srcPicErr = [_('你输入的图片链接已提交，请等待'), _('图片地址不能为空，请在输入框粘贴或输入') ,_('你输入的图片地址不是正确的URL格式，请重新输入')];
						o._sourcepicValue = UI.trim(o._sourcepicTxt.value);
						if(strRegex.test(o._sourcepicValue)){
							o._sourcepicBtn.disabled = true;
							o._sourceError.innerHTML = srcPicErr[0];
							UI.show(o._sourceError);
							MI.ajax({
								url : MI.url.uploadUrlPic,
								type : 'get',
								data : "sourcepic=" + encodeURIComponent(o._sourcepicValue)+'&r='+MI.random(),
								success : function(data){
									data =  MI.json(data);
									if (data.result == 0 && data.info){
										o.hide();
										Self.addPic({result:0,msg:_('上传成功'),'info':{'image':data.info.image,'fileName':_('链接.jpg')}});
										!(UI.hasClass(Self._sendCnt,'hasMedia')) && UI.addClass(Self._sendCnt,'hasMedia');
									}else{
										o._sourcepicBtn.disabled = false;					
									}
									o._sourceError.innerHTML = data.msg;													
								}
							});
						}else{
							o._sourcepicTxt.focus();
							o._sourceError.innerHTML = !o._sourcepicValue ?   srcPicErr[1] :  srcPicErr[2];
							UI.show(o._sourceError);
						}
						MI.Bos('btnSourcePic');
						return false;
					}
					
					//form上传
					o._picForm.reset();
					if (MI.user.fun.qbUpload){ // for qq browser in iOS
						action = 'http://wbupload://t.qq.com/asyn/updateGrabPic.php?retType=1&cookiejs=MI.TalkBox.cur.qbUploadCookie&successjs=MI.TalkBox.cur.qbUploadAddPic&positionjs=MI.TalkBox.cur.qbUploadPosition';
						// copy from picChange
						o._qbPicUploadBtn = $$(o._picForm, 'input')[0];
						o._picForm.removeAttribute('target');
						o._qbPicUploadBtn.onclick = function () {
							o.PicUpTime = + new Date(); //图片上传时间
							o._picForm.submit();
							o.hide();
							MI.TalkBox.cur = Self;
							MI.Bos('btnPic');
						};
					} else {
						UI.A(o._picForm,'target',imageUploadName);
					}
					UI.A(o._picForm,'action',action);
				
					o.picChange = function(){ //Upload
						var fileName = this.value.toLowerCase();
						if (!(/\.(png|jpg|jpeg|gif)$/.test(fileName))) {
							MI.alert(_('仅支持jpg、jpeg、gif、png图片文件'));
							return false;
						}
						Self.uploadPic();
						o.PicUpTime = + new Date(); //图片上传时间
						o._picForm.submit();
						MI.TalkBox.cur = Self;
						MI.Bos('btnPic');
					}
		
					o._picBtn.onchange = o.picChange; 
					
					o._picDel.onclick = function(){ //Delete
						Self.delPic();
						MI.Bos('btnPicDel');
						return false;
					}
					o._picCancel.onclick = function(){ //Cancel
						Self.cancelPic();
						MI.Bos('btnPicCancel');
						return false;
					}
				},
				showEvent : function(o){},
				tabEvent : function(o,i){
					if(i==1 || i==3 || i== 4) {
						var target = o._div[i],
							flashCall = ['','PhotoMultiUpload','','Text2Pic','PhotoCameraUpload'][i],
							bos = ['','btnPhotoMulti','','btnText2Pic','btnPhotoCamera'][i];
						MI.app({
							TalkBoxRich:function(){
								MI[flashCall].build(target,'http://t.qq.com/asyn/updateGrabPic.php');
								MI.TalkBox.cur = Self;
							}	
						});
						MI.Bos(bos);
					}else if(i==2) {
						o._sourcepicTxt.focus();
					}else if(i==5){
						if(!MI.SearchPic){
							MI.app({TalkBoxRich:function(){
								if(MI.SearchPic){
									MI.SearchPic.build(Self);
									MI.SearchPic.show();
								}
							}});
						}else{
							if (!MI.SearchPic.builded){
								MI.SearchPic.build(Self);
							}
							MI.SearchPic.show();
						}
						MI.Bos('btnPicSearch');
					}
					o.flashCapture = 0; //还原为非截屏到flash模式
				},
				hideEvent : function(o){
					o.resetSourcePic && o.resetSourcePic(); 	//清空链接状态
					MI.app({
						TalkBoxRich : function(){
							MI.PhotoMultiUpload && MI.PhotoMultiUpload.clear(); //清空多图状态
							MI.PhotoCameraUpload && MI.PhotoCameraUpload.clear();  //清空拍照状态
							MI.Text2Pic && MI.Text2Pic.clear(); //清空文图状态
						}
					});
				}
			});
		}

		Self._picAnchor.onclick = function(e){
			if (!MI.user.fun.qbUpload && UI.hasClass(document.body,'ipad')){ //Disable Upload
				if (UI.B.ipad){
					//MI.alert(_('此浏览器暂不支持图片上传，请到App Store下载并安装<a href="http://itunes.apple.com/cn/app/id370130751" style="text-decoration:underline">腾讯微博免费客户端</a>。'));
					alert(_('此浏览器暂不支持图片上传，请到App Store下载并安装腾讯微博免费客户端。'));
				}
				else {
					alert(_('此浏览器暂不支持图片上传，建议您使用QQ浏览器。'));
				}
				MI.Bos('btnPicDisable');
				UI.E(e).stop();
				return false;
			};				
			
			Self.picUploadBuild();
			Self.upPic.show(0);
			return false;
		}
	}
	//Add Reply
	if (Self._addReply) {
		Self._addReply.onclick = function(e){
			var E = UI.E(e);
			if (E.target.nodeName == 'A'){
				UI.hide(this);
				Self._txt.value = '';
				Self.focus();
				/*
				var length = Self._txt.value.length;
				Self._txt.value = Self._txt.value.replace(this.txt,'');
				Self.countTxt();
				Self._txt.focus();
				MI.selectTxt(Self._txt,length,length,length);
				*/
				MI.Bos('btnAddReply');
			}
			return false;
		}
	}
	//Add Comment
	if (Self._addComt) {
		Self._addComt.onclick = function(){
			Self._txt.focus();
			return false;
		}
	}

	if (Self._autoBackspace) {
		Self._autoBackspace.onclick = function(){
			var val = Self._txt.value;
			var length = Self._txt.value.length;
			var txtMax = MI.TalkBox.prototype.txtMax;
			var valArr = val.split('||');
			if(!Self.zhCount){
				if(valArr[0].length >= txtMax){
					Self._txt.value = valArr[0];
					MI.selectTxt(Self._txt,length,length,length);
				}else{
					while(valArr.join('||').length > txtMax-20) {
						valArr.pop();
					}
					Self._txt.value = valArr.join('||');
					MI.selectTxt(Self._txt,0,0,0);
				}						
			}
			else{
				if(MI.string.length(valArr[0]) >= txtMax){
					Self._txt.value = valArr[0];
					MI.selectTxt(Self._txt,length,length,length);
				}else{
					while(MI.string.length(valArr.join('||')) > txtMax*2-20) {
						valArr.pop();
					}
					Self._txt.value = valArr.join('||');
					MI.selectTxt(Self._txt,0,0,0);
				}
			}
			Self.countTxt();
			UI.hide(Self._autoBackspace);
			Self._txt.focus();
			MI.Bos('btnAutoBackspace');
			return false;
		}
	}

	//Submit Button
	//Self._btn.onfocus = MI.blur;
	Self._btn.onclick = function(){
		if (UI.hasClass(this,'btnNoStr')) {
			return;
		}		
		
		//发布按钮 disabled 则return 提示 都木有。。。
		if (MI.user.fun.sendBtnDisabledOnNoText) {
			if (UI.hasClass(Self._btn, 'disabled')) {
				return;
			}
		}
		
		/*if (Self._btn.disable) {
			//Self.showTip(Self.txtTip.empty,true);
			return;
		}*/
		Self.countTxt();
		Self.send();
		switch (Self.type) {
			case null:	
				if(Self.boxType == 'recom') {
					MI.Bos('btnSendRecom');
				}
				MI.Bos('btnSend','',0.01);
				break;
			case 1:
				MI.Bos('btnSendRelay');
				break;
			case 2:
				if(Self.boxType == 'trans'){
					MI.Bos('btnSendTrans');
				}
				else {
					MI.Bos('btnSendReply','',0.01);
				}	
				break;
			case 3:
				MI.Bos('btnSendMsg');
				break;
			case 4:
				MI.Bos('btnSendRelayList');
				break;
			case 5:
				MI.Bos('btnSendComt');
				break;
			case 6:
				MI.Bos('btnSendNotepad');
				break;
			case 7:
				if(Self.boxType == 'reFollow') {
					MI.Bos('btnSendReFollow');
				}
				break;
		}
	};
	if (Self._close) {
		Self._close.onclick = function(){
			if (UI.B.ie) { //Kill ":hover" Bug In IE
				UI.C(Self._close,'right','9999px');
			}
			setTimeout(function(){
				Self.hide();
				UI.C(Self._close,'right','');
			},0);
			MI.Bos('btnClose');
			return false;
		}
	}	
	Self.addEvented = 1;
}
MI.TalkBox.topic = {};
/*MI.TalkBox.prototype.showTopic = function(){
	var Self = this,
		index = 0,
		topic = MI.json(MI.S('option_topic_' + MI.user.account)),
		topicName,
		html = [];
	for (var i in topic){
		if (i){
			topicName = decodeURI(i).slice(1,-1);
			html.push('<li><a href="#" title="' + topicName + '">' + topicName + '</a></li>');
			index++;
		}
	}
	if (index){
		Self._topicWrap.innerHTML = '<b></b><ul>' + html.join('') + '</ul>';
		UI.show(Self._topicWrap);
	}
}
MI.TalkBox.prototype.hideTopic = function(){
	var Self = this;
	UI.hide(Self._topicWrap);
}*/
MI.TalkBox.prototype.cacheTopic = function(content){
	var topic = 'option_topic_' + MI.user.account,
		index = 0,
		topicData = [],
		topicOld = MI.json(MI.S(topic)),
		topicNew = {},
		topicNames = content.match(/(#\s*[^#\s]{1}[^#]{0,39}?\s*#)/g),
		topicName;
	if (topicNames){
		UI.each(topicNames,function(o){
			topicName = encodeURI(o);
			topicNew[topicName] = 1;
			delete topicOld[topicName];
		});
	}
	for (var i in topicOld){
		if (i){
			topicNew[i] = 1;
		}
	}
	MI.TalkBox.topic = topicNew;
	topicData.push('{');
	for (var i in topicNew){
		if (index > 5){
			break;
		}
		topicData.push((index == 0 ? '' : ',') + '"' + i + '":1');
		index++;
	}
	topicData.push('}');
	MI.S(topic,topicData.join(''));
}
//MI.TalkBox.prototype.face = [14,1,2,3,4,5,6,7,8,9,10,11,12,13,0,15,16,96,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,89,113,114,115,60,61,46,63,64,116,66,67,53,54,55,56,57,117,59,75,74,69,49,76,77,78,79,118,119,120,121,122,123,124,42,85,43,41,86,125,126,127,128,129,130,131,132,133,134];
//MI.TalkBox.prototype.faceName = ['微笑','撇嘴','色','发呆','得意','流泪','害羞','闭嘴','睡','大哭','尴尬','发怒','调皮','呲牙','惊讶','难过','酷','冷汗','抓狂','吐','偷笑','可爱','白眼','傲慢'];
MI.TalkBox.prototype.addVote = function(){ // 新建投票
	var Self = this;
	if(!Self.upVote) {
		var voteHtml = '<div class="voteDiv">\
				<div class="m_voteBox clear">\
					<form action="' + MI.url.vote + '" onsubmit="return false" name="voteAddFrom" id="voteAddFrom" target="voteAddIframe" method="post">\
					<table>\
						<tr class="voteAddTr"><th>' + _('标题：') + '</th><td valign="top"><input type="text" name="sbjtitle" id="sbjtitle" class="inputTxt"><br><a href="#" class="ffsong addBrief">+'+ _('添加说明') + '</a></td><td valign="top"><span class="voteAddError"></span></td></tr>\
						<tr class="voteAddTr" style="display:none"><th></th><td valign="top"><div><textarea name="brief" id="brief" class="inputTxt"></textarea></div></td><td valign="top"><span class="voteAddError"></span></td></tr>\
						<tr class="voteAddTr"><th>' + _('类型：') + '</th><td valign="top"><label><input class="check1" type="radio" name="ftype" id="ftype" value="1" checked>' + _('单选') + '</label> <label><input class="check1" type="radio" name="ftype" value="2">' + _('多选') + '</label></td><td><b class="voteAddError"></b></td></tr>\
						<tr class="voteAddTr"><th>' + _('选项：') + '</th><td valign="top">\
							<ul>\
								<li><span class="index">1.</span><input type="text" name="opttitle" id="opttitle" class="inputTxt"></li>\
								<li><span class="index">2.</span><input type="text" name="opttitle" class="inputTxt"><div></div></li>\
								<li><span class="index">3.</span><input type="text" name="opttitle" class="inputTxt"><div></div></li>\
								<li><span class="index">4.</span><input type="text" name="opttitle" class="inputTxt"><div></div></li>\
							</ul>\
							<a href="#" class="voteAddOption ffsong">+' + _('增加选项') + '</a>\
						</td><td valign="top"><span class="voteAddError cNote"></span></td></tr>\
					</table>\
					<div class="right"><input type="submit" class="btn2" value="' + _('确定') + '"></p>\
					</form>\
				</div>\
				<p class="cError" style="display:none"></p>\
				<iframe id="voteAddIframe" name="voteAddIframe" src="about:blank" style="display:none"></iframe>\
			</div>';

		Self.uploadCollection({
				type : null,
				name : 'Vote',
				tab : [_('投票')],
				cnt : voteHtml,
				query : '.voteDiv',
				className : 'insertVote',
				flashTab : [],
				_open : Self._vote,
				buildEvent : function(o){
					o._voteForm = $('voteAddFrom');
					o._voteOptions = $$(o._box,'td ul')[0];
					o._voteAddOption = $$(o._box,'.voteAddOption')[0];
					o._addBrief = $$(o._box,'a.addBrief')[0];
					UI.GT(o._tab[0],'a')[0].style.cssText = 'cursor:default;text-decoration:none';
					
					//Event
					o._voteAddOption.onclick = function(){
						if ($$(this.parentNode,'li').length >= 18){
							UI.hide(this);
						}
						Self.addVoteOption(o);
						return false;
					}

					o._addBrief.onclick = function(){
						var brief=$('brief'),
							P=brief.parentNode.parentNode.parentNode;
						brief.value='';
						UI.toggle(P);
						this.innerHTML = this.innerHTML == '+' + _('添加说明') ? '-'+_('不需要说明了') : '+'+_('添加说明') ;
						$$(P,'.voteAddError')[0].innerHTML='';
						try{brief.focus()}catch(e){}
						return false
					}
				},
				showEvent : function(o){
					MI.app({
						Validate : function(){
							new MI.Validate({
								id : 'voteAddFrom',
								inputs : {
									sbjtitle : {
										rule : function(str){
											str = UI.trim(str);
											var length = str.length,w=str.split('');
											if (length == 0) return _('这里一定要填');
											//if (str.match(/[^\u4e00-\u9fa5\w-]/g)) return '仅支持中文、字母、数字、下划线或减号';
											//if (length > 12) return '仅支持1-12个中文、字母、数字、下划线或减号';
										},
										noIco : true
									},
									brief : {noIco : true},
									ftype : {noIco : true},
									opttitle : {
										rule : function(str,isSubmit){
											str = UI.trim(str);
											var length = str.length,w=str.split(''),
												inputs = $$($('opttitle').parentNode.parentNode,'input'),
												successNum = 0;
											UI.each(inputs,function(o){
												value = UI.trim(o.value);
												if (value){
													successNum++;
												}
											});
											if (successNum < 2 && isSubmit) return _('至少两个选项');
											//if (length == 0) return '这里一定要填';
											//if (str.match(/[^\u4e00-\u9fa5\w-]/g)) return '仅支持中文、字母、数字、下划线或减号';
											//if (length > 12) return '仅支持1-12个中文、字母、数字、下划线或减号';
										},
										result :  function(el){
											var values = [],
												inputs = $$($('opttitle').parentNode.parentNode,'input'),
												value;
											UI.each(inputs,function(o){
												value = UI.trim(o.value);
												if (value){
													values.push(value);
												}
											});
											return values.join('||');
										},
										noIco : true
									}
								},
								messages : function(el){
									return $$(UI.parents(el,'voteAddTr')[0],'.voteAddError')[0];
								},
								success : function(data){
									//{"result":0,"info":{"title":"\"\\u8fd9\\u662f\\u4e00\\u4e2a\\u6295\\u7968demo\"","url":"http:\/\/url.cn\/0mYAMr","voteid":1}}
									if (data.result == 0){
										Self.addTopic(_('我发起了一个投票【{0}】，地址：',data.info.title) + 'http://url.cn/' + data.info.url);
										Self.focus();
										Self.vote = data.info.voteid;
										Self.resetVote();
										o.hide();
									}
									else if(data.msg){
										MI.alert(data.msg);
									}
								}
							});
						}
					});			
				}	
		});
	};
	Self.upVote.show(0);
}
MI.TalkBox.prototype.addVoteOption = function(voteBox){ // 增加投票选项
	var Self = this,
		html = UI.html('<li><span class="index"></span><input type="text" name="opttitle" class="inputTxt"><div></div></li><li><span class="index"></span><input type="text" name="opttitle" class="inputTxt"><div></div></li>'),
		frag = document.createDocumentFragment();
	UI.each(html,function(o){
		UI.append(o,frag);
	});
	UI.append(frag,voteBox._voteOptions);
		var index = $$(voteBox._box,'li .index');
		if(index){
			for(var i=0,l=index.length;i<l;i++){
				index[i].innerHTML = i+1+'.';
			}
		}
}

MI.TalkBox.prototype.resetVote = function(voteBox){ // 投票表单重置
	var Self = this;
	UI.show(voteBox._voteAddOption);
	var input = $$(voteBox._voteOptions,'input');
	UI.each(input,function(o,i){
		if (i > 3){
			UI.remove(o.parentNode);
		}
		else {
			o.value = '';
		}
	});
	$('sbjtitle').value = '';
	$('brief').value = '';
	UI.hide($('brief').parentNode.parentNode.parentNode);
	$('ftype').checked = true;
	voteBox._addBrief.innerHTML = '+'+_('添加说明');
}

MI.SearchPic = {
	//Dom
	talkBox : null,
	builded : false,
	_tUrl : false,
	_pSearch : null,
	_pSearchPage : null,
	_segword : '',
	_radioValue : '0',//当前单选按钮的值
	_preRadioValue : '0', //上一状态单选按钮的值
	_isPageClick : 0, //是否是点击页码，为了是否刷新页码做判断
	_pageNow : 0,
	build : function(o){
		var Self = this;
		if (UI.A(o._searchPicBox,'builded')){
			return;
		}
		this.PageNum = 16;
		Self.talkBox = o;
		var html = UI.html('<div class="loading" style="display:none;"></div><div class="p_searchBox clear"><span class="sosoLogo"><em class="ico_soso"></em>图片</span><form method="get"><input type="text" class="inputTxt" /><input type="submit" class="btn1" value="搜索"><p class="p_searchSel"><label><input type="radio" class="check1" name="picClass" value="0">表情图片</label><label><input type="radio" class="check1" name="picClass" value="1">普通图片</label></p></form></div>'),frag = document.createDocumentFragment();
		//x-webkit-speech="x-webkit-speech" speech="speech" onwebkitspeechchange="MI.Bos(\'btnPicSearchSpeech\')" 
		UI.each(html,function(o){
			UI.append(o,frag);
		});
		UI.prepend(frag,o._searchPicBox);
		o._picSearchKey = $$(o._searchPicBox,'.inputTxt')[0];
		o._picSearchBtn = $$(o._searchPicBox,'.btn1')[0];
		o._picSearchFrom = $$(o._searchPicBox,'form')[0];
		Self._sLoading = $$(o._searchPicBox,'.loading')[0];
		o._radioInput = $$(o._searchPicBox,'.p_searchSel label');
		$$(o._radioInput[0],'.check1')[0].checked =true;
		var radioSelect = document.getElementsByName('picClass');
		UI.each(radioSelect,function(obj){
			if(obj.checked == true){
				Self._preRadioValue = Self._radioValue = obj.value;
			}
		});
		UI.show(Self._sLoading);
		UI.getScript('http://cache.soso.com/js/an-app.js',function(){
			//__sosostat.sc = "wb_bq_search";
			//__sosostat.run();
		});
		o._radioInput[0].onmousedown = o._radioInput[1].onmousedown = o._picSearchBtn.onclick = o._picSearchFrom.onsubmit= function(e){
			var E = UI.E(e);
			var target = E.target;
			//增加单选按钮点击时，进行搜索的操作
			if(target.nodeName.toLowerCase()=='label' || target.className=='check1'){
				Self._preRadioValue = Self._radioValue;
				Self._radioValue = target.nodeName.toLowerCase()=='label' ? UI.A($$(target,'.check1')[0],'value') : UI.A(target,'value');
				MI.Bos('BtnSearchClass_'+Self._radioValue);				
			}	
			else if(radioSelect){
				UI.each(radioSelect,function(obj,i){
					if(obj.checked == true){
						Self._preRadioValue = Self._radioValue;
						Self._radioValue = obj.value;
						MI.Bos('BtnSearchClass_'+i);
					}
				});
			}
			Self.searchPic(o._picSearchKey.value,0,Self._radioValue);//Self._resetPage
			if(window.__sosostat && window.__sosostat.prget) __sosostat.prget(document.location.href, 't.1.1.0' , 0,'bq_app');//上报soso
			MI.Bos('btnPicSearchGo');
			return false;
		}
		Self.searchPic('',0);//默认请求图片
		UI.hide(Self._sLoading);
		UI.A(o._searchPicBox,'builded',1);
		//Self.builded = 1;
	},
	tmpl : '<div class="p_sResult">\
				<%if(errCode == 0){%>\
					<%var allnum = general.allnum,segword = general.segword;%>\
					<%if(items.length > 0){%>\
						<div class="p_sList">\
							<ul class="clear">\
								<%for(var i=0,n=items.length;i<n;i++){%>\
									<%var px,\
									picid = items[i].MD,\
									Src = items[i].SRC,\
									sSrc = items[i].SSRC,\
									tit = items[i].TI || "";%>\
									<%if(i%8 > 3){px="4px"}else{px ="";}%>\
									<li><a href="<%=Src%>" rel="<%=px%>" onclick="return false;"><img id="<%=picid%>" src="<%=sSrc%>" alt="<%=tit%>" title="<%=tit%>" /></a></li>\
								<%}%>\
							</ul>\
						</div>\
						<%if(segword){%>\
							<p class="p_sNum">'+ _('搜索到') +'<b><%=allnum%></b>个和<span class="cSign"><%=segword%></span>'+ _('相关的图片') +'</p>\
						<%}%>\
					<%}%>\
				<%}%>\
			</div>',
	show : function(){},
	/*
	 * key 为空字符串时使用默认请求,radioValue为单选按钮的值
	 * isPageClick: 1 为点击页码进行的搜索请求
	 */
	searchPic : function(key,p,radioValue,isPageClick){
		/*
		http://vdap.soso.com/service?src=37&kd=e&w=hello&sn=0&nu=10&ie=utf8&mark=MD|SRC|SSRC|TI&ofmt=json&var=abc
		参数：
		w: {当前请求关键字}
		sn:{偏移量}
		nu:{当前请求返回的条数}
		var:{注册的变量名}
		*/
		var Self = this,
		_DefaultKey = '',
		_P = 0,
		url,
		p = parseInt(p) > 0?parseInt(p):_P,
		key =  MI.string.html(key); 
		Self._Key = key;
		if(isPageClick!=null && isPageClick==1)
			Self._isPageClick=1;
		else Self._isPageClick=0;
		var sosoUrl = 'http://vdap.soso.com/service',//用soso搜图的
			param = ['src=37&ie=utf8&mark=MD|SRC|SSRC|TI&ofmt=json&nu=16','w='+UI.encode(key),'sn='+p,'r='+MI.random(),'var=jsonSoSoPic'],
			paramTem = '';
		if(radioValue != null){
			var param1 = 'kd=e&ng=on',
				param2 = 'kd=i&ity=1&size=1';
			paramTem = (radioValue=='1')? param2 : param1;
		}
		else{
			paramTem = 'kd=e&ng=on';
		}
		sosoUrl += ("?"+paramTem);
		sosoUrl += ("&" + param.join('&'));
		var tUrl = MI.url.uploadSearchPic + '?p=' + p + '&var=jsonSoSoPic&r=' + MI.random();//默认的url
		url = sosoUrl;
		if(UI.trim(key) == _DefaultKey){
			url = tUrl;
			Self._tUrl = 1;
		}else{
			url = sosoUrl;
			Self._tUrl = 0;
		}

		if (!Self._tUrl){
			UI.getScript(url,function(){
				show();
			},'gb2312');
		}
		else {
			MI.ajax({
				url : url,
				success : function(data){
					try{
						eval(data);
					}catch(e){}
					show();
				}
			});
		}
		function show(){
			if (window.jsonSoSoPic){
				if(Self._radioValue=='0')
					Self.searchPicCallBack(jsonSoSoPic.sosovdap.expression);
				else if(Self._radioValue=='1')
					Self.searchPicCallBack(jsonSoSoPic.sosovdap.image);			
			}
		}
	},
	searchPicCallBack : function(data){
		var Self = this;
			if(data && data.errCode == 0){
				var rSearch, pages,p_Preview;
				UI.hide(Self._sLoading);
				if(data.general && !data.general.segword) data.general.segword = '';//补充默认搜索配图的字段
				if(Self._noResult){
					UI.remove(Self._noResult);
				}
				// 搜索结果层
				Self._pSearch = $$(Self.talkBox._searchPicBox,'.p_sResult')[0];

				if (!Self.talkBox._pSearchPage){ // 分页
					pages = UI.html('<div class="pages"></div>')[0];
					UI.append(pages, Self._pSearch);
					Self.talkBox._pSearchPage = new MI.Page({
						target : pages,
						num : 2,
						call : function (i) {
							function num(){
								var num = Self._tUrl ? i : ((i - 1)*16);
								return num;
							}
							Self.searchPic(Self._Key,num(),Self._radioValue,1);
						}
					});
					//计算显示页数，如果大于999页，则最多只显示999页
					var pagesNow = Math.ceil(data.general.allnum / Self.PageNum);
					Self._pageNow = (pagesNow>999)? 999 : pagesNow;
					Self.talkBox._pSearchPage.show(0, Self._pageNow, false);
					Self._segword = Self._Key;
				}

				Self.searchPage(data);
				// 如果返回值不正确&列表中存在少于一页的图片 则删除可能存在的分页条
				if (data.errCode !=0 || data.general.allnum < Self.PageNum) {
					if (Self.talkBox._pSearchPage && Self.talkBox._pSearchPage.target){
						UI.remove(Self.talkBox._pSearchPage.target);
						Self.talkBox._pSearchPage = null;
					}
				}
				
				if (Self._pSearch && (!Self.p_Preview)){
					p_Preview = UI.html('<div class="picPreview" style="visibility:hidden;"><img style="max-width:97px;max-height:97px;" src="http://mat1.gtimg.com/www/mb/images/loading.gif" alt=""></div>')[0];
					UI.append(p_Preview,Self._pSearch);
					Self.p_Preview = p_Preview;
					Self.p_img = $$(p_Preview,'img')[0];
				}
			}else if(data && data.errCode != 0){
				UI.hide(Self._sLoading);
				if (Self._pSearch){
					UI.remove(Self._pSearch);
				}
				if(Self._noResult){
					UI.remove(Self._noResult);
				}
				var noResult = UI.html('<div class="p_noResult"><p>' + _('对不起，未找到')+'<b>"'+Self._Key+'"</b>'+_('的相关图片。') + '</p><p>' + _('请检查关键词是否正确，或更换其他关键字搜索。') + '</p></div>')[0];
				UI.append(noResult, Self.talkBox._searchPicBox);
				Self._noResult = noResult;
			}
	},
	searchPage : function (data) {
		var Self = this;
		if(!data || data.errCode != 0) return;
		var searchResult = UI.html(new UI.tmplString(Self.tmpl)(data)), frag = document.createDocumentFragment();
		UI.each(UI.children(searchResult[0]), function(o){
			if (UI.isElement){
				UI.append(o, frag);
			}
		});
		var m_total = $$(Self._pSearch, '.p_sNum')[0];
		var m_list = $$(Self._pSearch, '.p_sList')[0];
		var m_noResult = $$(Self._pSearch, '.p_noResult')[0];
		var p_pages = $$(Self._pSearch, '.pages')[0];
		if (m_total){
			UI.remove(m_total);
		}
		if (m_list){
			UI.remove(m_list);
		}
		if (m_noResult){
			UI.remove(m_noResult);
		}
		if(p_pages && !Self._isPageClick && ((Self._preRadioValue != Self._radioValue) || (UI.trim(Self._segword) != UI.trim(Self._Key)))){//刷新页码
			//计算显示页数，如果大于999页，则最多只显示999页
			var pagesNow = Math.ceil(data.general.allnum / Self.PageNum);
			Self._pageNow = (pagesNow>999)? 999 : pagesNow;
			Self.talkBox._pSearchPage.show(0, Self._pageNow, false);
			Self._segword = UI.trim(Self._Key);
		}
		UI.prepend(frag, Self._pSearch);
		Self.m_total = $$(Self._pSearch, '.p_sNum')[0];
		if(Self.m_total){
			Self.cSign = $$(Self.m_total, '.cSign')[0];
			Self.cSign && (Self.cSign.innerHTML = UI.trim(MI.string.cut(Self._Key,16)));
		}
		//修改结果显示总数
		if(Self._pageNow==999) 
			$$(Self._pSearch,'.p_sNum b')[0].innerHTML = Self._pageNow * 16;
		Self.bindEvent($$(Self._pSearch,'.p_sList')[0]);
	},
	bindEvent : function(o){
		if(!o)	return;
		var Self = this,
			p_sList = o;
		if(Self._radioValue=='1'){
			var imgList = $$(p_sList,'li img');
			UI.each(imgList,function(obj){
				obj.style.width="48px";
			});
		}
		p_sList.onmouseover = function(e){
			var E = UI.E(e);
			if(E.target.nodeName == 'IMG'){
				setTimeout(function(){
					if(Self._radioValue=='1'){
						Self.p_img.src = E.target.src;
					}
					else
						Self.p_img.src = UI.parent(E.target).href;
					Self.p_Preview.style.left = UI.parent(E.target).rel;
					Self.p_Preview.style.visibility = 'visible';					
					/*  预览源图的动作，先注释掉
					Self.p_img.src = UI.parent(E.target).href;
					if(Self._radioValue=='0'){
						Self.p_Preview.style.left = UI.parent(E.target).rel;
						Self.p_Preview.style.visibility = 'visible';						
					}
					if(Self._radioValue=='1'){
						Self.p_img.src = E.target.src;
						UI.A(Self.p_img,'onload','UI.A(this,"load",1);');
						var times=30;
						var t = setInterval(function(){
							if(times != 0){
								times--;
								if(UI.A(Self.p_img,'load')==1){
									Self.p_Preview.style.left = UI.parent(E.target).rel;
									Self.p_Preview.style.visibility = 'visible';
								}
							}
							else{
								clearInterval(t);
							}
						},100);
					}
					*/
				},10);
			}else{
				setTimeout(function(){Self.p_Preview.style.visibility = 'hidden';},10);
				
			}
			E.stop();
		}
		p_sList.onmouseout = function(e){
			var E = UI.E(e);
			if(E.target.nodeName == 'IMG'){
				setTimeout(function(){Self.p_Preview.style.visibility = 'hidden'; UI.A(Self.p_img,"load",0);},10);
			}
			E.stop();
		}
		p_sList.onclick = function(e){
			var E = UI.E(e);
			if(E.target.nodeName == 'IMG'){
				UI.hide(Self.talkBox.upPic._box);
				UI.append(Self.talkBox._uploadPicS,Self.talkBox._sendStatus);
				!(UI.hasClass(Self.talkBox._sendCnt,'hasMedia')) && UI.addClass(Self.talkBox._sendCnt,'hasMedia');
				UI.addClass(Self.talkBox._picLoading,'loading');
				UI.show(Self.talkBox._picLoading);
				MI.ajax({
					url : MI.url.uploadUrlPic,
					type : 'get',
					data : "sourcepic=" + encodeURIComponent(UI.parent(E.target).href)+'&r='+MI.random(),
					success : function(data){
					data =  MI.json(data);
						if (data.result == 0 && data.info){
							Self.talkBox.addPic({result:0,msg:_('上传成功'),'info':{'image':data.info.image,'fileName':_('搜图.jpg')}});
						}else{
							//如果搜图上传失败，则自动关掉上传失败的图片
							if(data.result == -7) MI.talkBox.delPic();
							MI.dialog.alert(data.msg || _('图片上传失败，请重试'));
						}
					}
				});
				if(window.__sosostat && window.__sosostat.prget) __sosostat.prget(document.location.href, 't.2.2.'+ E.target.id, 0, 'bq_app');//上报soso
				MI.Bos('btnPicSearchUse');
			}
			E.stop();
			return false;
		}
	}
}

//多图上传开始
MI.PhotoMultiUpload = {
	html : '',
	sendBtn:null,
	cancelBtn:null,
	uploadUrl:'',
	build:function(target,uploadUrl){		//外部调用build方法
		var Self = this;
		Self.html = MI.Flash.getObject(null,MI.swf.MultiPhoto,462,165,'MultiPhoto')
		if(MI.Flash.getVersion() < 10.3){
			target.innerHTML = MI.Flash.updateTip(10.3);
			return;
		}
		Self.uploadUrl = uploadUrl || 'http://upload.t.qq.com';
		if(Self.builded) {
			UI.C(Self.loading,'opacity',1);
			UI.show(Self.loading);
			Self.show();
			UI.B.ie6 && Self.resizeLoading();
			return
		}
		Self.target = target;
		Self.sendBtn = $$(target,'.btnSend')[0];
		Self.cancelBtn = $$(target,'.btnCancel')[0];
		Self.flashWrap = $$(target,'.flashWrap')[0];
		Self.loading = $$(target,'.maskLoading')[0];
		Self.tip = $$(target,'.error')[0];
		Self.flashWrap.innerHTML = Self.html;	
		Self.builded = 1;
		
		Self.sendBtn.onclick = function(){Self.upload()};
		Self.cancelBtn.onclick = Self.hide;
		window['_flash_resizeFlashHeight'] = function(h){Self.resetSize(h)};  //注册给flash调用，_flash_resetFilterSize名字不能改
		window['_flash_multiUploadCall'] = function(data){Self.uploadCall(data)}; //注册给flash调用，可以改，同时改upload方法的参数
		window['_flash_setMultiTip'] = function(str){Self.setTip(str)};
		window['_flash_MultiLoaded'] = function(){
			Self.show();
		}
		//Self.show();
		return false;
	},
	show:function(){
		var Self = this;
		if(document.MultiPhoto && document.MultiPhoto.multiPic_startSave) {
			UI.hide(Self.loading);
			UI.C(Self.loading,'opacity',0.5);
		}	
	},
	hide : function(){
		MI.TalkBox.cur.upPic.hide();
	},
	captureImg : function(url){
		document.MultiPhoto && document.MultiPhoto.multiPic_captureImg(url);  //注册回调			 
	},
	upload:function(){
		var Self = this;
		UI.B.ie6 && Self.resizeLoading();
		UI.show(Self.loading);
		document.MultiPhoto.multiPic_startSave(Self.uploadUrl,'_flash_multiUploadCall');  //注册回调
		MI.Bos('btnPhotoMultiSend');
	},
	clear:function(){
		var Self = this;
	  	document.MultiPhoto && document.MultiPhoto.multiPic_clearStage && document.MultiPhoto.multiPic_clearStage();
		UI.hide(Self.loading);
	//	MI.Bos('btnPhotoMultiClose');
	},
	resetSize:function(h){	//调整flash宽高
		var Self = this;
		Self.setTip('');
		if(document.MultiPhoto) document.MultiPhoto.height = h*1;
		//var wrap = $$(document.body,'.CR')[0];
		//if(wrap) window.scrollTo(0,parseInt(wrap.style.top) + UI.height(wrap) - UI.windowHeight());
		var y = UI.getY(Self.flashWrap) + h + 100 - UI.windowHeight();
		if(y>=0 || UI.scrollY() > 225) window.scrollTo(0,y);
	},
	resizeLoading : function(){
		var Self = this;
		UI.C(Self.loading,'height',UI.height(Self.target));				
	},
	uploadCall:function(data){
		var Self = this;
		UI.hide(Self.loading);
		data = MI.json(data);
		if(data.result ==0) {
			MI.TalkBox.cur.upPic.hide();
			Self.clear();
			MI.TalkBox.cur.upPic.flashCapture = 0;
			setTimeout(function(){
				MI.tip(_('上传成功'),function(){
					//UI.hide(MI.TalkBox.cur._multiPic);
					MI.TalkBox.cur.addPic({'result':0,'msg':_('上传成功'),info:{'image':data.info.image,'path':data.info.path,'host':data.info.host,'fileName':_('多图') + '.jpg'}});
				});
			},0);		
		} else {
			MI.alert(data.msg);
		}
	},
	setTip:function(str){
		var Self = this;
		Self.tip.innerHTML = str;
	}
};

//摄像头拍照上传开始
MI.PhotoCameraUpload = {
	html : '',
	sendBtn:null,
	cancelBtn:null,
	uploadUrl:'',
	build:function(target,uploadUrl){		//外部调用build方法
		var Self = this;
		if(MI.Flash.getVersion() < 10.0){
			target.innerHTML = MI.Flash.updateTip(10.0);
			return;
		}
		Self.html = MI.Flash.getObject(null,MI.swf.CameraPhoto,462,335,'CameraPhoto')
		Self.uploadUrl = uploadUrl || 'http://upload.t.qq.com';
		if(Self.builded) {
			UI.C(Self.loading,'opacity',1);
			UI.show(Self.loading);
			Self.show();
			UI.B.ie6 && Self.resizeLoading();
			UI.B.firefox && UI.hide(Self.ButtonWrap);
			return
		}
		Self.target = target;
		Self.sendBtn = $$(target,'.btnSend')[0];
		Self.cancelBtn = $$(target,'.btnCancel')[0];
		Self.flashWrap = $$(target,'.flashWrap')[0];
		Self.buttonWrap = $$(target,'.clear')[0];
		Self.loading = $$(target,'.maskLoading')[0];
		Self.tip = $$(target,'.tip')[0];
		Self.flashWrap.innerHTML = Self.html;
		Self.builded = 1;
		
		Self.sendBtn.onclick = function(){Self.upload()};
		Self.cancelBtn.onclick = Self.hide;
		window['_flash_resetCameraHeight'] = function(h){Self.resetSize(h)};  //注册给flash调用，_flash_resetFilterSize名字不能改
		window['_flash_cameraUploadCall'] = function(data){Self.uploadCall(data)}; //注册给flash调用，可以改，同时改upload方法的参数
		window['_flash_setCameraTip'] = function(str){Self.setTip(str)};
		window['_flash_cameraLoaded'] = function(type){  //负责flash通知js，加载完成，显示loading,拍第一张后显示按钮(传type==1)
			Self.show();
			if(type==1) {
				UI.show(Self.buttonWrap);
			}
		}
		//Self.show();
		return false;
	},
	show:function(){
		var Self = this;
		if(document.CameraPhoto && document.CameraPhoto.camera_startSave) {
			UI.hide(Self.loading);
			UI.C(Self.loading,'opacity',0.5);
		}	
	},
	hide : function(){
		MI.TalkBox.cur.upPic.hide();
	},
	upload:function(){
		var Self = this;
		UI.B.ie6 && Self.resizeLoading();
		Self.setTip('');
		UI.show(Self.loading);
		document.CameraPhoto.camera_startSave(Self.uploadUrl,'_flash_cameraUploadCall');  //注册回调
		MI.Bos('btnPhotoCameraSend');
	},
	clear:function(){
		var Self = this;
		Self.setTip('');
		document.CameraPhoto && document.CameraPhoto.camera_clearStage && document.CameraPhoto.camera_clearStage();
		Self.buttonWrap && UI.hide(Self.buttonWrap);
		Self.loading && UI.hide(Self.loading);
	//	MI.Bos('btnPhotoMultiClose');
	},
	resetSize:function(h){	//调整flash宽高
		var Self = this;
		Self.setTip('');
		if(document.CameraPhoto) document.CameraPhoto.height = h*1;
		var y = UI.getY(Self.flashWrap) + h + 100 - UI.windowHeight();
		if(y>=0 || UI.scrollY() > 225) window.scrollTo(0,y);
	},
	resizeLoading : function(){
		var Self = this;
		UI.C(Self.loading,'height',UI.height(Self.target));				
	},
	uploadCall:function(data){
		var Self = this;
		UI.hide(Self.loading);
		data = MI.json(data);
		if(data.result ==0) {
			MI.TalkBox.cur.upPic.hide();
			Self.clear();
			setTimeout(function(){
				MI.tip(_('上传成功'),function(){
					MI.TalkBox.cur.addPic({'result':0,'msg':_('上传成功'),info:{'image':data.info.image,'path':data.info.path,'host':data.info.host,'fileName':_('拍照') + '.jpg'}});
				});
			},0);		
		} else {
			Self.setTip(data.msg);
		}
	},
	setTip:function(str){
		var Self = this;
		if(Self.tip) Self.tip.innerHTML = str;
	}
};

//视频录制上传开始
MI.swf.VideoRecord = 'http://mat1.gtimg.com/www/mb/swf/VideoRecord_111206.swf';
MI.VideoRecord = {
	html : '',
	uploadUrl:'',	
	build:function(target, uploadUrl){
		var Self = this;
		if(MI.Flash.getVersion() < 10.0){
			target.innerHTML = MI.Flash.updataTip(10.0);
			return;
		}
		Self.html = MI.Flash.getObject(null,MI.swf.VideoRecord,462,335,'VideoRecord');
		Self.uploadUrl = uploadUrl || 'http://upload.t.qq.com';
		if(Self.builded){
			UI.C(Self.loading, 'opacity', 1);
			UI.show(Self.loading);
			Self.show();
			UI.B.ie6 && Self.resizeLoading();
			UI.B.firefox && UI.hide(Self.ButtonWarp);
			return;
		}
		Self.target = target;
		Self.flashWrap = $$(target, '.flashWrap')[0];
		Self.buttonWrap = $$(target, '.clear')[0];
		Self.loading = $$(target, '.maskLoading')[0];
		Self.tip = $$(target, '.tip')[0];
		Self.flashWrap.innerHTML = Self.html;
		Self.builded = 1;
		
		window['jfRecordUploadCall'] = function(){Self.uploadCall();};	//注册给flash调用
		window['jfRecordUploadError'] = function(msg){Self.uploadError(msg);};
		window['jfTweet'] = function(data){Self.tweet(data);};
		window['jfGetKeyFail'] = function(){Self.getKeyFail();};
		window['jfRecordLoaded'] = function(){Self.show();};
		window['jfGetUserAccount'] = function(){return MI.user.account;};	
		
		Self.show();		//IE8下刷新不加载flash
		
		return false;
	},
	show:function(){
		var Self = this;	
		if(document.VideoRecord && document.VideoRecord.fjClearStage){		//判断flash是否重新加载			
			UI.hide(Self.loading);
			UI.C(Self.loading, 'opacity', 0.5);			
		}
	},
	hide:function(){
		
	},
	upload:function(){
	
	},
	uploadCall:function(){
		var Self = this;
		UI.show(Self.loading);
		MI.Bos('btnVideoRecordSend');
	},
	uploadError:function(msg){
		MI.tip(msg);
	},
	getKeyFail:function(){
		var Self = this;
		UI.hide(Self.loading);
		MI.TalkBox.cur.upVideo.hide();
		Self.clear();
		MI.alert('今天上传达到最大数量!');
	},
	tweet:function(data){		//发布微博
		var Self = this;
		UI.hide(Self.loading);
		MI.TalkBox.cur.upVideo.hide();
		Self.clear();
		MI.talk('视频录制成功!', '#分享视频#http://boke.qq.com/play.html?v=' + data, 40, {'vid':data, 'msg':'该微博会在转码完毕后发布，届时将会收到私信通知'});
		/*
		MI.TalkBox.cur._txt.value = '#分享视频#' + ' http://boke.qq.com/play.html?v=' + data;
		MI.TalkBox.cur.countTxt();
		MI.TalkBox.cur.vid = data;*/
	},
	clear:function(){
		var Self = this;
		document.VideoRecord && document.VideoRecord.fjClearStage && document.VideoRecord.fjClearStage();
		Self.loading && UI.hide(Self.loading);
	}
	
	
};

MI.Text2Pic = {
	html : '',
	theme : 0,
	build:function(target,url){
	 	var Self = this;
		if(MI.Flash.getVersion() < 9){
			target.innerHTML = MI.Flash.updateTip(9);
			return;
		}
		Self.html = MI.Flash.getObject(null,MI.swf.Text2Pic,462,10,'Text2Pic');
		Self.uploadUrl = url;
		Self.txtMinHeight = [98,104,52,69]; //输入框高度
		if(Self.builded) {
			if(UI.B.ie && !Self.flashWrap.innerHTML) Self.flashWrap.innerHTML = Self.html;  //强制重新加载
			UI.C(Self.loading,'opacity',1);
			UI.show(Self.loading); 
			Self.show();
			return;
		};
		Self.target = target;
		Self.flashWrap = $$(target,'.flashWrap')[0];
		Self.sendBtn = $$(target,'.btnSend')[0];
		Self.cancelBtn = $$(target,'.btnCancel')[0];
		Self.tip = $$(target,'.tip')[0];
		Self.txt = $$(target,'.longText')[0];
		Self.txtCnt = $$(target,'.txtCnt')[0];
		Self.loading = $$(target,'.maskLoading')[0];
		Self.themeLink = $$(target,'.typeSel a');
		Self.sendBtn.onclick = function(){Self.upload()};
		Self.cancelBtn.onclick = Self.hide;
		Self.flashWrap.innerHTML = Self.html;
		Self.builded =1;
		window['_flash_Text2PicUploadCall'] = function(data){Self.uploadCall(data)};
		window['_flash_Text2PicTip'] = function(str){Self.setTip(str,true)};
		window['_flash_Text2PicLoaded'] = function(){  //flash加载完成时调用
			//UI.C(Self.body,'opacity',1);
			Self.show();
			Self.txt.focus();
			//Self.loaded = true;
		}

		UI.each(Self.themeLink,function(o,i){
			o.onclick = function(){	
				if(!UI.B.ie) Self.txt.focus();
				Self.theme = i;
				Self.txtCnt.className = 'txtCnt type' + (i + 1); 
				UI.each(Self.themeLink,function(p,j){
					if(i == j) UI.addClass(p,'select');
					else UI.removeClass(p,'select');
				});
				var h = Self.txtMinHeight[i];
				UI.C(Self.txt,'height',h + 'px');
				if(Self.txt.scrollHeight <= h) {
					Self.txt.style.height = Self.txt.parentNode.style.height = h + 'px';
				} else {
					Self.resetTxtHeight(Self.txt);
				}
				setTimeout(function(){
					MI.selectTxt(Self.txt,Self.txtCurX,Self.txtCurX); //还原光标位置
				},100);	
				MI.Bos('btnText2PicTheme' + (i + 1));
				return false;
			}

			o.onmousedown = function(){
				Self.txtCurX = MI.cursorX(Self.txt) || 0;
			}
		});

		Self.txt.onkeyup = Self.txt.onmouseup = Self.txt.oninput = function(){
			Self.resetTxtHeight(Self.txt);
		}

		if(!UI.B.ie) {
			Self.flashWrap.style.cssText = "position:absolute;z-index:-2;top:0;"   //解决上传时flash显现的问题
		}

		return false;
	},
	resetTxtHeight : function(el,tmpScroll){
		var Self = this,h = Self.txtMinHeight[Self.theme];
		clearTimeout(Self.delayHeight);
		Self.delayHeight = setTimeout(function(){
			//UI.C(el,'height',h + 'px');
			Self.txt.style.height = h + 'px';
			h = el.scrollHeight > h ? el.scrollHeight : h;
			Self.txt.style.height = Self.txt.parentNode.style.height = h + 'px';
			if(MI.cursorX(el) >= el.value.length) {
				Self.txtCnt.scrollTop = 2*h;
			}
		},100);				 
	},
	show:function(){
		var Self = this;
		if(document.Text2Pic && document.Text2Pic._Text2PicBuildImg) {
			UI.hide(Self.loading);
			UI.C(Self.loading,'opacity',0.5);
			Self.txt.focus();
		}
		Self.resetTxtHeight(Self.txt);
	//	Self.txt.style.height = Self.txt.parentNode.style.height = Self.txtMinHeight[Self.theme] + 'px';
	},
	hide : function(){
		MI.TalkBox.cur.upPic.hide();
	},
	upload:function(){
		var Self = this;
		var txt = Self.txt.value;
		var len = MI.string.length(txt);
		if(!UI.trim(txt)) {
			Self.setTip(_('<span class="error">文本不能为空</span>'),true);
			Self.txt.focus();
			return;
		} 
		if(len>4000) {
			Self.setTip(_('字数超出<span class="error">{0}</span>字，请删减',Math.ceil((len-4000)/2)),true);
			return;
		}  
		clearTimeout(Self.delay);
		UI.show(Self.loading);
		Self.setTip(_('正在转换成图片，请稍候...'));
	
		txt = '\n' + txt + '\n\n';
		txt = txt.replace(/  /g,' ').replace(/\t/g,'    '); //两个空格替换成1个空格，1个tab替换成4个空格 for flash
		document.Text2Pic._Text2PicBuildImg(Self.uploadUrl,txt,'_flash_Text2PicUploadCall',MI.Flash.version,Self.theme);
		MI.Bos('btnText2PicSend');
	
	},
	uploadCall:function(data){
		var Self = this,txt = Self.txt.value;
		UI.hide(Self.loading);
		data = MI.json(data);
		if(data.result ==0) {
			UI.hide(Self.tip);
			Self.setSummary();
			//Self.clear();
			MI.TalkBox.cur.upPic.hide();
			setTimeout(function(){
				MI.tip(_('上传成功'),function(){
					MI.TalkBox.cur.addPic({'result':0,'msg':_('上传成功'),info:{'image':data.info.image,'path':data.info.path,'host':data.info.host,'fileName':_('文图') + '.jpg'}});
					MI.TalkBox.cur.longText = txt;
				})
			},0);
		} else {
			Self.setTip('<span class="error">' + data.msg + '</span>',true);
		}
	},
	setTip:function(str,autoHide){
		var Self = this;
		clearTimeout(Self.delayTip);
		Self.tip.innerHTML = str;
		//UI.show(Self.tip);
		Self.tip.style.display = 'block';
		if(autoHide) {
			Self.tip.style.paddingLeft = '20px';
			Self.tip.style.backgroundPosition = '15px 200%';
			Self.delayTip = setTimeout(function(){
				UI.hide(Self.tip);
			},1000)
		}else {
			Self.tip.style.paddingLeft = '40px';
			Self.tip.style.backgroundPosition = '15px 50%';
		}
		Self.tip.style.left = (492 - UI.width(Self.tip))/2 + 'px';	
	},
	clear:function(){
		var Self = this;
		if(Self.txt) Self.txt.value = '';
		if(Self.tip) UI.hide(Self.tip);
		if(Self.flashWrap && UI.B.ie) Self.flashWrap.innerHTML = '';
	},
	formTalk : function(talk,display){
		var Self = this;
		if (!MI.user.fun.autoTxt2Pic){
			return;
		}
		if(!Self.useTxt2Pic) {
			Self.useTxt2Pic = UI.html('<span class="text2PicBtn" style="float:right;height:30px;line-height:30px;margin-left:5px;">[<a href="#">' + _('转成图片') + '</a>]</span>')[0];
			UI.before(Self.useTxt2Pic,talk._tip);
			UI.GT(Self.useTxt2Pic,'a')[0].onclick = function(){
				if(!talk.upPic) talk.picUploadBuild(); //触发图片浮层build
				talk.upPic.show(3); //触发Text2Pic build
				Self.txt.focus();
				Self.txt.value = talk._txt.value;
				Self.txt.scrollTop = Self.txt.scrollHeight;  //for chrome
				talk._txt.value = '';
				talk.countTxt();
				MI.Bos('btnText2PicFormTalk');
				return false;
			}
		}
		display ? UI.show(Self.useTxt2Pic) : UI.hide(Self.useTxt2Pic);
	},
	setSummary:function(){
		var Self= this,
			_txt = MI.TalkBox.cur._txt,
			tmpTxt = '', //处理url后的内容
			urlArr = [], //url列表
			atArr, //@列表
			topicArr, //#列表
			summary = '',
			atReg = /@([a-zA-Z]|[\u4e00-\u9fa5])([a-zA-Z0-9_-]|[\u4e00-\u9fa5]){0,19}/g
			topicReg = /(#\s*[^#\s]{1}[^#]{0,59}?\s*#)/g,
			urlReg = new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*','gi'),
			zhCount = (window.MILang && window.MILang=='en_US') ? 0 : 1,
			len = MI.countTxt(_txt.value,true,zhCount),
			n = len<=100 ? 100 - len : 0; //talkBox中不满100字时，补充摘要字数
		if(len>=139) return;  //超过139字
		tmpTxt = Self.txt.value.replace(urlReg,function($m){ //先处理url，摘要中不包含url地址
			urlArr.push($m);
			return '';
		});
		if(n>0) summary = MI.string.cut(tmpTxt,n*2,'......').replace(/@([a-zA-Z]|[\u4e00-\u9fa5])([a-zA-Z0-9_-]|[\u4e00-\u9fa5]){0,19}(?=\.\.\.$)/,'......');  //处理截断的@账号
		topicArr = tmpTxt.match(topicReg) || [];
		
		//处理截断的#话题
		var topicBreak = (summary.match(/#\s*[^#\s]{1}[^#]{0,59}?\s*(?=\.\.\.)/g) || [])[0];
		if(topicBreak && topicArr.join('').hasString(topicBreak)) {
			summary = summary.replace(/#\s*[^#\s]{1}[^#]{0,59}?\s*\.\.\./g,'......');
		}

		atArr = tmpTxt.match(atReg) || [];
		var tmpArr = atArr.concat(topicArr).concat(urlArr);
		UI.each(tmpArr,function(o){
			if(topicReg.test(o) && ((_txt.value + summary).match(topicReg) || []).length >= 2) return;  //#话题不能超过2个
			if(summary.hasString(o) || MI.countTxt(summary + o,true) + 1 > (140 - len)) return;
			summary += ' ' + o + ' ';
		});
		//if(summary!= tmpTxt) summary += _(' [更多点击图片]');
		MI.TalkBox.cur.txtSummary = summary;
		if(!_txt.value.hasString(summary)){
			_txt.value += summary;
		}
		MI.TalkBox.cur.countTxt();
		MI.TalkBox.cur.focus();
	} 
};

//滤镜开始
MI.photoFilter = {
	html :'<div class="filterPic" style="width:517px;padding:5px 0;text-align:center"><div class="flashWrap"></div><div class="clear"><p style="text-align:right;padding:5px;" class="btnBox"><span class="error" style="padding-right:20px"></span><button class="btn3 btnSend">' + _('确定') + '</button>&nbsp;<button class="btnCancel btn_cancel">' + _('取消') + '</button></p></div></div>',
	flashHtml : '',
	body:null,
	sendBtn:null,
	cancelBtn:null,
	sourceUrl:'',
	uploadUrl:'',
	build:function(sUrl,upUrl){		//外部调用build方法
		var Self = this;
		if(MI.Flash.getVersion() < 9){
			MI.dialog.show({
				html:MI.Flash.updateTip(9.0)
			});
			return;
		}
		Self.flashHtml = MI.Flash.getObject(null,MI.swf.FilterPhoto,462,250,'FilterPhoto');
		//if(Self.body) UI.remove(Self.body);  //必须移除之前的flash重新加载，否则ie下as注册的方法失效
		Self.sourceUrl = sUrl;
		Self.uploadUrl = upUrl;
		if(Self.body) {Self.show();return;}
		Self.body = UI.html(Self.html)[0];
		Self.sendBtn = $$(Self.body,'.btnSend')[0];
		Self.cancelBtn = $$(Self.body,'.btnCancel')[0];
		Self.tip = $$(Self.body,'.error')[0];
		Self.flashWrap = $$(Self.body,'.flashWrap')[0];
		Self.sendBtn.onclick = function(){Self.upload()};
		Self.cancelBtn.onclick = function(){Self.hide()};
		window['_flash_resetFilterSize'] = Self.resetSize;  //注册给flash调用，_flash_resetFilterSize名字不能改
		window['_flash_filterUploadCall'] = Self.uploadCall; //注册给flash调用，可以改，同时改upload方法的参数
		window['_flash_setfilterTip'] = function(str) {Self.setTip(str)};
		Self.show();
		return false;
	},
	show:function(){
		var Self = this;
		MI.dialog.show({
			title:'<h3 class="DmainTit">' + _('魔法滤镜') + '</h3>',
			html:Self.body,
			width:542,
			start:function(){
				Self.flashWrap.innerHTML = Self.flashHtml;
			}
		});
		MI.dialog.showLoad();
		Self.pushImg(); //可能需要判断flash是否已经加载完成
	},
	pushImg:function(){
		var Self = this;
		clearTimeout(Self.delay);
		if(document.FilterPhoto && document.FilterPhoto.sendImgUrl_ToFlash) {
			document.FilterPhoto.sendImgUrl_ToFlash(Self.sourceUrl);	//调用flash提供的方法，传递原始图片
		} else {
			Self.delay = setTimeout(function(){Self.pushImg()},100);
		}
	},
	upload:function(){
		var Self = this;
		MI.dialog.showLoad();
		setTimeout(function(){
			document.FilterPhoto.filter_upload(Self.uploadUrl,'_flash_filterUploadCall');
		},100);	
		MI.Bos('btnPhotoFilterSend');
	},
	hide:function(){
		var Self = this;
		MI.dialog.hide();
		UI.remove(Self.body);
		MI.Bos('btnPhotoFilterClose');
	},
	resetSize:function(w,h){	//调整flash宽高
		if(document.FilterPhoto) {
			document.FilterPhoto.width = w;
			document.FilterPhoto.height = h;
			var wrap = $$(document.body,'.CR')[0];
			if(wrap) window.scrollTo(0,parseInt(wrap.style.top) + (UI.height(wrap) - UI.windowHeight())/2);
		}	
	},
	uploadCall:function(data){
		MI.dialog.hideLoad();
		data = MI.json(data);
		if(data.result ==0) {
			setTimeout(function(){
				MI.tip(_('上传成功'),function(){
					MI.TalkBox.cur.addPic({'result':0,'msg':_('上传成功'),info:{'image':data.info.image,'path':data.info.path,'host':data.info.host,'fileName':_('滤镜') + '.jpg'}});
				})
			},0);
		} else {
			MI.alert(data.msg);
		}
	},
	setTip:function(str){
	   	var Self = this;
		Self.tip.innerHTML = str;
	}
};


/*
 * 活动送礼祝福浮层（圣诞，元旦等）	
 * @anthor : sapjax(609004948@qq.com)
 * @constructor
 * @param {Object} 参数配置对象
 * 		example : 		
 *			MI.app({   
 *				SendGift : function(){      
 *					MI.sendGift = new MI.SendGift({
 *						title : _('圣诞祝福'),
 *						bodyClass : 'chrisWrap',
 *						placeHolder : _('输入好友姓名，最多可添加5个好友'),
 *						giftConfig : [
 *							{
 *							name : '礼物1',
 *							pic : 'http://mat1.gtimg.com/www/mb/images/theme/chrisTip/chrisTree.jpg',
 *							word : '1111111111'
 *							}
 *						]
 *					});
 *					MI.sendGift.show();
 *				}
 *			})	
 */
MI.SendGift = function(opt){
	this.eventId = opt.eventId;									//活动id
	this.title = opt.title;										//标题
	this.topic = opt.topic;										//广播话题
	this.selectOpt = opt.selectOpt;								//select选择配置
	this.bodyClass = opt.bodyClass || '';						//主结构class
	this.giftConfig = opt.giftConfig || [];						//礼物配置列表
	this.placeHolder = opt.placeHolder || _('选择或输入好友');	//默认占位文字
	this.index = this.index || 0;								//初始礼物设置
	this.publishBos = opt.publishBos;							//发表成功上报
	this.btnValue = opt.btnValue;								//广播按钮文字
	this.recordTabName = opt.recordTabName; 					//语音祝福 tab名
	this.wordingList = opt.wordingList;							//输入框默认文本
	
	//初始化
	this.init();
};

MI.SendGift.prototype = {
	atReg : /@([a-zA-Z]|[\u4e00-\u9fa5]|\*)([a-zA-Z0-9_-]|[\u4e00-\u9fa5]){0,19}/g,
	getHtml : function(){
		var Self = this;
		return '<div class="sendGiftWrap dialogTalkBox ' + Self.bodyClass + '"><div class="chrisBg"><p class="chrisTipTop"></p><div class="sendCnt chrisFrm clear" style="display:;"><dl><dt>' + _('送给') + '：</dt><dd><input type="text" value="' + Self.placeHolder + '" class="chirsPut sendTo"></dd><dt>' + _('祝福') + '：</dt><dd><textarea class="chrisArea sendWord inputTxt"></textarea><div class="bot"><div class="sendStatus clear"></div><div class="insertFun"><div class="sendList insertFace"><a class="txt" href="#" title="' + _('表情') + '"><em class="sico ico_face"></em></a></div><div class="sendList uploadMusic"><a class="txt" href="#" title="' + _('可按歌名、歌手名搜索并添加音乐') + '" tabindex="3"><em class="sico ico_audio"></em></a></div></div><div class="left"></div><input type="button" class="inputBtn sendBtn" value="' + _('广 播') + '"><span class="countTxt">' + _('还能输入{0}字','<em>140</em>') + '</span>	</div></dd></dl><div class="cPrizeRig"><p>' + _('选择礼物') + '：<span  class="giftName"></span></p><div class="chrisPrizeFrm" style="width:180px"><a class="cArrowLeft prev" href="#" style="margin:0;left:0;"></a><ul class="cPrizeCont giftList"></ul><a class="cArrowRight next" href="#"></a></div><p class="cPrizeNum page"></p></div></div></div></div>'
	},
	init : function(){
		var Self = this;
		//插入额外结构		
		Self.build();
		Self.div = [];
		Self.talkArray = [];
		Self.myFriendArray = [];
		Self.myFriendList = [];
		Self.domTitle = '<ul class="pr_rep_tit"><li><a href="#@">' + Self.title[0] + '</a></li><li><a href="#@">' + Self.title[1] + '</a></li><li><a href="#@">' + Self.title[2] + '</a></li><li style="' + ((window.MILang != 'en_US' && MI.user.fun.audioRecord) ? '' : 'display:none') + '"><a href="#@">' + Self.title[3] + '</a></li></ul>';
		Self.myFriend = UI.html('<div class="pr_friend_pn"><p class="pr_friend_hd">' + _('你最亲密的人，直接点击头像给他们祝福') + '</p><div class="pr_friend_bd"><div  class="loading">' + _('数据加载中') +'</div></div></div>')[0];	
		Self.div[0] = $$(Self.body,'.chrisFrm')[0];
		Self.div[1] = UI.html('<div class="art_pn faceSpring" style="display:none">' + MI.tmpl.fullMediaTalk + '</div>')[0];
		Self.div[2] = UI.html('<div class="art_pn msgSpring pr_letter_pn" style="display:none;"></div>')[0];
		Self.div[3] = UI.html('<div class="art_pn voiceSpring" style="display:none">' + MI.tmpl.fullMediaTalk + '</div>')[0];
		UI.after(Self.div[1],Self.div[0]);
		UI.after(Self.div[2],Self.div[1]);
		UI.after(Self.div[3],Self.div[2]);
		UI.after(Self.myFriend,Self.div[3]);
		
		//广播框处理
		Self.talkArray[0] = Self.talk;
		Self.talkArray[1] = Self.bindTalkEvent(Self.div[1],1,1);
	//	Self.talkArray[2] = Self.bindTalkEvent(Self.div[2],1);
		Self.talkArray[3] = Self.bindTalkEvent(Self.div[3],3,0);
		Self.talkArray[0].faceHideTabIndex = {3:3}; //隐藏艺术表情
		Self.talkArray[1].faceSingleTabIndex = 3; //默认展开艺术表情
	//	Self.talkArray[1].faceHideTabIndex = {0:0,1:1,2:2}; //隐藏其他表情tab
		Self.talkArray[3].recordTabName = Self.recordTabName ||  _('我要录音');
	},	
	build : function(){
		var Self = this;
		Self.body = UI.html(Self.getHtml())[0];
		Self.sendTo = $$(Self.body,'.sendTo')[0];
		Self.giftBox = $$(Self.body,'.cPrizeRig')[0];
		Self.giftList = $$(Self.body,'.giftList')[0];
		Self.giftName = $$(Self.body,'.giftName')[0];
		Self.listHtml = '';
		
		UI.each(Self.giftConfig,function(o){
			Self.listHtml += '<li><span style="background:url(' + o.pic + ');_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=crop,src=\'' + o.pic + '\')"></span></li>';
		});
		Self.giftList.innerHTML = Self.listHtml;
		
		//TalkBox
		Self.talk = Self.bindTalkEvent(Self.body,0,1);
		Self.sendWord = Self.talk._txt;
		
		//delete music topic
		UI.EA(Self.sendWord,'focus',function(){
			var re = new RegExp(_('#(分享音乐|分享音樂)#'));
			if(Self.talk.txtMusic && re.test(Self.talk.txtMusic)) {
				setTimeout(function(){
					Self.talk.txtMusic = Self.talk.txtMusic.replace(re,'');
					if(Self.sendWord.value) Self.sendWord.value = Self.sendWord.value.replace(re,'');
				},100);	
			}	
		});
		
		//redo countTxt 
		UI.EA(Self.sendTo,'blur',function(){
			var txt = (Self.sendTo.value == Self.placeHolder) ? '' : Self.sendTo.value;
			Self.talk.countTxt();
		});
		
		//Select
		MI.app({
			ItemSelect : function(){
				Self.select = new MI.ItemSelect(Self.selectOpt || {
					target : Self.sendTo,
					type : 1,
					splitStr : ' ',
					dataUrl : 'http://t.qq.com/asyn/userFriends.php?',
		 			queryData : {u:MI.user.account,t:'3,2,1'},
		 			noResultTip : _('你还没有好友'),
		 			noSearchTip : _('没找到匹配的好友，请重新输入'),
		 			awaysSetPos : 1	
				});
				if(Self.selectHandler) Self.selectHandler(); //select对象创建后绑定的处理事件	
			}	
		})
		
		Self.sendWord.onkeyup = function(){
			Self.userEdited = 1;	
		}
		Self.builded = 1;
	},
	buildSlide : function() {
		var Self = this;
		MI.app({
			Slide : function(){
					UI.C(Self.giftList,'width',180*Self.giftConfig.length + 'px');
					Self.slide = new MI.Slide({
						target : Self.giftBox,
						tmpl : '<%for(var i=0;i<num;i++){%><a href="#" class="<%if(i==0){%>on<%}%>"><%=i+1%></a><%}%>',
						call : function(i){
							Self.changeGift(i-1);
						}
					})
					Self.changeGift(0);
			}	
		});	
	},
	//ItemSelect对象创建后回调
	selectHandler : function(){
		var Self = this;
		//自动拉取数据，并生成亲密朋友列表
		Self.select.pullData(function(data){
			var friendHtml = '';
			var index = 0;
			UI.each(data,function(o,i){
				if(index < 13) {
					friendHtml += '<a href="#" data-account="' + o.name + '" title="' + o.nick + '"><img src="' + o.url + '/30"/></a>';
					Self.myFriendArray.push(o.name);
				}
				index++;	
			});
			friendHtml = friendHtml.replace(/src="\/30"/gi,'src="http://mat1.gtimg.com/www/mb/images/head_30.jpg"');
			UI.GT(Self.myFriend,'div')[0].innerHTML = friendHtml;
			Self.myFriendList = UI.GT(Self.myFriend,'a');
		});
		
		//亲密朋友点击事件
		UI.EA(Self.myFriend,'click',function(e){
			var E = UI.E(e);
			var nodeName = E.target.nodeName.toLowerCase();
			if(nodeName == 'a' || nodeName == 'img') {
				var p = (nodeName == 'a') ? E.target : E.target.parentNode;
				var name = UI.A(p,'data-account');
				if(UI.hasClass(p,'on')) {
					UI.removeClass(p,'on');
					Self.select.selectEvent(name);
					Self.changeTalkValue(name,0);	
				} else {
					UI.addClass(p,'on');
					Self.changeTalkValue(name,1);	
					Self.select.unSelectEvent(name);
				}
				if(Self.currTab != 2) Self.talkArray[Self.currTab*1 || 0].countTxt(); //重新计算字数
				MI.Bos('btnSpringFriendClick');
				
			}
			E.prevent();	
		});
		
		//根据输入框的值，改变亲密朋友的选中状态
		Self.select.refreshDataEvent = function(data){
			if(!Self.myFriend) return;
			UI.each(Self.myFriendArray,function(name,i){
				if(name in data) {
					if(!UI.hasClass(Self.myFriendList[i],'on')) {
						UI.addClass(Self.myFriendList[i],'on');
						Self.changeTalkValue(name,1);	
					}
				} else {
					if(UI.hasClass(Self.myFriendList[i],'on')) {
						UI.removeClass(Self.myFriendList[i],'on');
						Self.changeTalkValue(name,0);	
					}
				}
			});
		}
	},
	//改变输入框的值
	changeTalkValue : function(id,isAdd) {
		var Self = this;
		var account = '@' + id;
		UI.each(Self.talkArray,function(talk){
			if(!talk) return;
			var value = talk._txt.value;
			var hasId = value.hasString(account);
			if(isAdd) {
				if(!hasId) talk._txt.value = (value + ' ' + account + ' ').replace(/  /g,' '); 
			} else {
				if(hasId) talk._txt.value = value.replace(new RegExp(account,'g'),'');	
			}
		});
		Self.talkArray[Self.currTab].countTxt();
		if(UI.B.ie) {
			setTimeout(function(){
				Self.select.hide();
			},120);	
		}	
		Self.userEdited = 1;
	},
	//根据输入框的输入，调整选中数据
	changeSelectData : function(talk){
		var Self = this;
		var atArr = talk._txt.value.match(Self.atReg) || [];
		UI.each(Self.myFriendArray,function(id,i){
			if(UI.has(atArr,'@' + id)) {
				if(!(id in Self.select.selected.data)) {
					var avatar = Self.myFriendList[i];
					UI.addClass(avatar,'on');
					Self.select.unSelectEvent(id);
					Self.changeTalkValue(id,1);
				}	
			} else {
				if(id in Self.select.selected.data) {
					var avatar = Self.myFriendList[i];
					UI.removeClass(avatar,'on');
					Self.select.selectEvent(id);
					Self.changeTalkValue(id,0);
				}	
			}
		});
	},
	//处理TalkBox对象
	bindTalkEvent : function(el,index,noFlash){
		var Self = this,
			talk = new MI.TalkBox(el, {
				noFlash : noFlash,
				data : {eventId : Self.eventId}
			}),
			send = $$(el,'.sendBtn')[0];
			
		talk.noRelTopic = 1;
		talk.topic = Self.topic[index] + ' ';
		talk.txtMax = 140 - MI.countTxt(Self.topic[index]);
		if((MI.boss == 11) || (MI.boss == 13)) talk.addList = 1; //先这样，主页和广播页加入talkList
		talk.success = function(data){
			Self.publishSuccess(data);
		};
		//覆盖send方法
		if(Self.btnValue) send.value = Self.btnValue;
		send.onmouseover = function(){
			this.onclick = function(){
				if(Self.checkSend(talk)) {
					talk.send();
				}	
			}
		};
		//改变选中数据
		UI.EA(talk._txt,'keyup',function(){
			Self.changeSelectData(talk);
		});

		return talk;
	},
	//切换tab
	changeTab : function(index){
		var Self = this;
		UI.each(Self.tab,function(o,i){
			if(index == i) {
				UI.show(Self.div[i]);
				UI.addClass(o,'on');
			} else {
				UI.hide(Self.div[i]);
				UI.removeClass(o,'on');
			}
			if(index == 2) { //私信拜年不显示亲密朋友
				UI.hide(Self.myFriend);
			} else {
				UI.show(Self.myFriend);
			}
			if(index == 1) {
				if(!Self.talkArray[1]._face)  Self.talkArray[1].addEvent();
				Self.talkArray[1].addFace();
			}
			if(index == 3 && (MI.user.fun.audioRecord && window.MILang != 'en_US')) {
				if(!Self.talkArray[3]._recordAnchor) Self.talkArray[3].addEvent();
				UI.show(Self.talkArray[3]._record);
				UI.fireEvent(Self.talkArray[3]._recordAnchor,'click');	
			}
			if(index == 0) { //隐藏下拉选择
				clearTimeout(Self.slideDelay);
				Self.slideDelay = setTimeout(function(){
					if(!Self.slide) Self.buildSlide();
				},250);	
			}
		});
		Self.hideWbpmauto();
		Self.currTab = index;	
	},
	//显示浮层并注册tab事件
	bindTabEvent : function(){
		var Self = this;
		Self.tab = UI.GT(Self._title,'li');
		UI.each(Self.tab,function(o,i){
			o.onclick = function(e){
				if(i == Self.currTab) return;
				Self.changeTab(i);
				MI.Bos('btnSpringTabClick' + i);
				UI.E(e).prevent();
			};	
		});
	},
	//检查发送条件
	checkSend : function(talk){
		var Self = this,
		atArr = talk._txt.value.match(Self.atReg) || [],
		selectNum = atArr.length || 0,
		tip = '';
		var value = talk._txt.value;
		talk.countTxt();
		
		if(!selectNum) {
			tip = _('请先选择好友');
		} else if (selectNum > Self.select.max) {
			tip = _('一次最多选{0}个好友',Self.select.max);
		} else if(!value) {
			tip = _('写点祝福语吧！');
		} 
		if(tip) talk.showTip(tip,1);
		return !tip;
	},
	//发送成功
	publishSuccess : function(data){
		var Self = this;
		MI.tip(_('发送成功'));
		Self.publishBos && MI.Bos(Self.publishBos,(data.info && data.info.talk && data.info.talk[0] && data.info.talk[0].id) + Self.currTab);
	},
	//切换礼物
	changeGift : function(i){
		var Self = this;
		Self.index = i;
		if(!Self.giftConfig[i]) return false;
		Self.giftName.innerHTML = Self.giftConfig[i].name;
		if(!Self.userEdited || !UI.trim(Self.sendWord.value)) Self.sendWord.value = Self.giftConfig[i].word;
		if(Self.eventId != 1) Self.talk.sourcePic = Self.giftConfig[i].pic.replace(/\.png$/,'.jpg');
		Self.talk.countTxt();
	},
	//重置状态
	reset : function(tabIndex){
		var Self = this;
		UI.each(Self.talkArray,function(talkBox,i){
			if(!talkBox) return;
			talkBox._txt.value = Self.wordingList[i];
			if(talkBox.hasMedia()) {
				talkBox._txt.value = '';
				talkBox.hideMedia();
				talkBox.reset();
				talkBox.delPic();
				talkBox.delMusic();
			}	
		});
		Self.talkArray[1].countTxt();
		Self.talkArray[3].countTxt();
		if(Self.select) {
			Self.select.resetAllData();
			Self.select.refreshDataEvent({});
			Self.sendTo.value = Self.placeHolder;
		}
		if(Self.slide) {
			Self.changeGift(Self.index);
			Self.talk.countTxt();
		}
		if(!Self._wrap) {
			Self._wrap = UI.parents(Self.body,'DWrap')[0];
			Self._title = $$(Self._wrap,'.DTitle')[0];
			Self._close = $$(Self._wrap,'.DClose')[0];
			Self._close.onmouseover = function(){
				Self.select && Self.select.hide();
				Self.hideWbpmauto();			
			};
		}
		Self.bindTabEvent();
		Self.userEdited = 0;
		Self.changeTab((UI.isUndefined(tabIndex) ? 0 : tabIndex)); //默认打开的tab
		//私信拜年
		if(Self.div[2] && Self.wordingList[2]) { //每次打开都执行
			MI.pmembedcompose({
				type : "compose",
				to : _(''),
				from : null,
				dom : Self.div[2],
				content : Self.wordingList[2],
				'onload' : function(){
					MI.dialog.hideLoad();
					var sendBtn = $$(Self.div[2],'.btn_send')[0];
					sendBtn.innerHTML = _('拜年');
				},
				onsendcomplete : function(){
					MI.tip(_('发送成功'));
				}
			});	
		}			
	},
	//隐藏私信选择下拉
	hideWbpmauto : function(){
		var Self = this;
		wbpmauto = $$(document.body,'.wbpmauto')[0];
		if(wbpmauto) UI.hide(wbpmauto);
	},
	/**
	 * 打开送礼浮层
	 *
	 *  @example
	 *		var o = new MI.SendGift({...});
	 *		o.show();
	 */	
	show : function(tabIndex){
		var Self = this;
		if(!Self.builded) Self.build();
		MI.dialog.show({
			title : Self.domTitle || ('<div class="chrisTit"><strong>' + Self.title + '</strong></div>'),
			html : Self.body,
			width : 580,
			start : function(){
				Self.reset(tabIndex);
			}
		})	
	}
};

/**
 * 打开现有送礼浮层
 * @param {Integer} eventId (eventId : 1-圣诞，2-元旦)
 * @param {Integer} tabIndex 默认打开的tab
 *  	@example
 *			MI.sendGiftShow(3,1)
 */	
MI.sendGiftShow = function(eventId,tabIndex){
	eventId = 3;
	if(eventId == 3) {
		if ($('topic') && $('topic').innerHTML == _('#拜年#')) {
			MI.user.fun.audioRecord = 1;
		}	
		MI.springFestivalGift =  MI.springFestivalGift || new MI.SendGift({
			eventId : 3,
			topic : [_('#新春祝福#'),_('#拜年#'),'',_('#拜年#')],
			btnValue : _('拜年'),
			title : [_('礼物拜年'),_('表情拜年'),_('私信拜年'),_('语音拜年')],
			bodyClass : 'springWrap',
			placeHolder : _('输入好友姓名，最多可添加5个好友'),
			recordTabName : _('语音拜年'),
			publishBos : 'btnSpringFestivalPublished',
			wordingList : ['',_('不管你看与不看，我的祝福就在这条微博里，不离不弃。祝你在新的一年里龙腾虎跃、前程似锦！'),_('平平淡淡才是真，只愿你在新的一年里平安、健康、幸福！'),_('用我最真实声音，送上最诚挚的新春祝福！')],
			giftConfig : [
					{
						name : _('大红包'),
						pic : 'http://mat1.gtimg.com/www/mb/images/theme/chrisTip/springPrize1.png',
						word : _('雪花飘，春节到，送你一个大红包！祝你龙年新貌龙马精神，健康快乐生龙活虎，吉星高照龙凤呈祥，前程似锦鱼跃龙门，鸿运当头龙飞凤舞，合家兴旺龙腾虎跃！真心说一句：有你们真好！')
					},
					{
						name : _('欢喜爆竹'),
						pic : 'http://mat1.gtimg.com/www/mb/images/theme/chrisTip/springPrize3.png',
						word : _('一只祥龙飞抵人间，一副春联写满欢乐，一碗米酒醉美心田，一桌年饭喜庆团圆，一串爆竹迎春接福，一条微博给你拜年！真心说一句：有你们真好！')
					},
					{
						name : _('如意饺子'),
						pic : 'http://mat1.gtimg.com/www/mb/images/theme/chrisTip/springPrize5.png',
						word : _('除夕之夜吃水饺，阖家欢聚真热闹，吉祥如意围着绕，幸福快乐没烦恼，祝您龙年行大运，笑口常开人不老！真心说一句：有你们真好！')
					},	
					{
						name : _('福来到'),
						pic : 'http://mat1.gtimg.com/www/mb/images/theme/chrisTip/springPrize2.png',
						word : _('新年到，福来到：大财、小财、意外财，财源滚滚；亲情、爱情、朋友情，份份真情；官运、财运、桃花运，运运亨通；爱人、亲人、家里人，人人平安。真心说一句：有你们真好！')
					},
					{
						name : _('吉祥汤圆'),
						pic : 'http://mat1.gtimg.com/www/mb/images/theme/chrisTip/springPrize4.png',
						word : _('风起，云现，除夕之夜雪连绵。星移，斗转，新春佳节在眼前。汤圆他乡有，还是故乡甜。龙腾虎跃迎新年，家家户户都团圆！真心说一句：有你们真好！')
					}
				]
		});
		MI.springFestivalGift.show(tabIndex);
	}	
	MI.Bos('btnSendGiftShow');	
};

})();