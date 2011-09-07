MI.TalkBoxRich = 1;
MI.TalkBox.prototype.addEvent = function(){ // 事件绑定
	var Self = this;

	//DOM
	Self._insertFun = Self.$('.insertFun');
	Self._topic = Self.$('.creatNew');
	Self._topicNewYear = Self.$('.atWen .txt');
	Self._at = Self.$('.atSome');
	Self._face = Self.$('.insertFace .txt,a.ico_face');
	Self._mood = Self.$('.newFeel .txt');
	Self._vote = Self.$('.newVote .txt');
	Self._video = Self.$('.uploadVideo');
	Self._videoAnchor = $$(Self._video,'.txt')[0];
	Self._music = Self.$('.uploadMusic');
	Self._musicAnchor = $$(Self._music,'.txt')[0];
	Self._pic = Self.$('.uploadPic');
	Self._picAnchor = $$(Self._pic,'.txt')[0];
	
	Self._more = Self.$('.smoreFun');//‘更多’区域
	Self._moreBox = $$(Self._more,'.moreBox')[0];//‘更多’下拉菜单盒子
	Self._moreAnchor = $$(Self._more,'.more')[0];//‘更多’下拉菜单按钮
	Self._moreDropBox = $$(Self._more,'.dropBox')[0];//‘更多’下拉菜单
	Self._sendCnt = Self.$('.sendCnt');//talkbox 外层盒子
	Self._autoBackspace = Self.$('.autoBackspace');

	Self._sendStatus = Self.$('.sendStatus');//图片,视频,音乐等附件上传状态栏

	var countTxt = function(e){
		if (!Self.sending) {
			Self.countTxt();
			//showGuide();
		}
	},
	countTxtDelay = function(e){
		var type;
		if (!Self.startTime && e){
			type = UI.E(e).type;
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
				MI.app({
					Capture:function(){
						if(MI.Capture && MI.Capture.uploader){
							if(!Self.upPic) Self.picUploadBuild();
							MI.Capture.upload();
						}		
					}
				});	
			}
		}
	};
	Self._body.onkeyup = function(){
		if (!Self.sending) {
			countTxtDelay();
		}
	};

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
			MI.Bos('btnAt');
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
		if(MI.user.fun.feelTip){
			UI.A(Self._mood,'title',_('跳动的小心脏提醒你记录每日心情'));
			ico.innerHTML = '<img src="http://mat1.gtimg.com/www/mb/images/feel.gif" alt="">';
		}
		Self._mood.onclick = function() {
			if(MI.user.fun.feelTip){
				UI.A(Self._mood,'title',_('心情'));
				ico.innerHTML = '';						
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
	
	//Add Vote
	if (Self._vote){
		Self._vote.onclick = function(){
			Self.hideMedia();
			MI.app({
				TalkBoxRich : function(){
					Self.addVote();
				}
			});
			Self._moreBox && UI.removeClass(Self._moreBox,'sopen');
			MI.Bos('btnVote');
			return false;
		}
	}

	
	Self.uploadCollection = function(o){
		var type = o.type,    			//上传浮层类型，暂时未用
			name = o.name, 				//名称 Pic,Music,Video
			tab = o.tab, 				//tab中的文字:['音乐搜索','收藏','录音',]
			cnt = o.cnt, 				//内容html
			query = o.query, 			//内容subDiv的共同class
			className = o.className, 	//浮层 className
			flashTab = o.flashTab, 		//对不支持flash的设备隐藏tab，序列[3,4]
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
		UI.after(up._box,Self._sendStatus);
		
		//隐藏多图，文图，拍照tab，以及截屏,录音，录像等
		if(UI.B.ipad || MI.user.fun.qbUpload) {
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
			tabEvent && tabEvent(up,i);
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
		
	}
		

	//Add QQ Music
	if (Self._music) {
		var musicHtml = '<div class="m_sResult rSearch"><div class="m_self"><a href="#">'+ _('我要自己上传') + '<em class="ffsong">&gt;&gt;</em></a></div></div>\
			  <div class="m_sResult rFav hideDcnt"></div>\
			  <div class="m_sResult recordBox hideDcnt"></div>';

		var recordHtml = (MI.user.isLab ? '<div class="flashWrap"><object width="404" height="160" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="musicRecord" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="http://mat1.gtimg.com/www/mb/swf/MusicRecord/Main_110830.swf" name="movie"><param value="high" name="quality"><param value="#FFFFFF" name="bgcolor"><param value="langVer=' + window.MILang + '" name="FlashVars" /><param name="wmode" value="transparent" /><param value="always" name="allowScriptAccess"><param value="all" name="allowNetworking"><embed width="404" height="160" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allownetworking="all" allowscriptaccess="always" loop="false" play="true" name="musicRecord" FlashVars="langVer=' + window.MILang + '" bgcolor="#FFFFFF" quality="high" src="http://mat1.gtimg.com/www/mb/swf/MusicRecord/Main_110830.swf"></object></div>' : '');
				
			Self.musicUploadBuild = function(){
				Self.uploadCollection({
					type : 2,
					name : 'Music',
					tab : !MI.user.fun.newMusic ? [_('上传音乐'),_('音乐收藏'),_('我要录音')] : [_('分享歌曲'),_('分享歌单'),_('我要录音')],
					cnt : musicHtml,
					query : '.m_sResult',
					className : 'insertMusic',
					flashTab : [2],
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
								if (!MI.Music.builded){
									MI.Music.build(Self);
								}
								MI.Music.show();
							}
						}
						//自己上传
						o._audioUpload = $$(o._box,'.m_self')[0];
						if(!MI.user.isLab) {
							UI.hide(o._audioUpload);
							UI.hide(o._tab[2]);
							return false;
						}
						o._audioUpload.onclick = function(){
							o.hide();
							Self.audioUpload();
							return false;
						}
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
								o._div[2].innerHTML = recordHtml;  //插入录音flash
							}	
						}		   
					}
				});
			}

			Self._musicAnchor.onclick = function(){
				Self.musicUploadBuild();
				Self.upMusic.show(0);
				return false;
			}

		window.getMicRecUploadResult = function($result, $url, $shortUrl){  //录音回调
			if($result ==0) {
				UI.A(Self.upMusic._tab[2],'music','0,' + $url + ',' + MI.user.account + ',' + _('录音'));
				MI.Music.addPreview(Self.upMusic._tab[2],'',true);
				Self.upMusic.hide();
				Self.music.songtype = 3;
				Self.music.shorturl = $shortUrl;
				Self.txtMusic = _('我刚刚发布了一条#语音微博#，快来听听我说了什么吧。')  + ' http://url.cn/'  + $shortUrl + ' ';
				if(Self._txt.value != Self.txtMusic){
					Self._txt.value += Self.txtMusic;
				}else{
					Self._txt.value = Self.txtMusic;
				}
				Self.countTxt();
				Self.focus();
			}	
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

		var videoHtml = '<div class="videoWrap urlVideo"><form method="get" class="videoUploadFrom" id="videoUploadFrom" name="videoUploadFrom"><p>' + _('粘贴视频播放页地址') + '<br><span class="cNote">(' + _('支持QQvideo、优酷、土豆、酷六') + ')</span></p><p class="clear"><input type="text" class="inputTxt"><input type="button" value="' + _('确定') + '" class="btn1"></p><p class="cError" style="display: none; "><a href="#" class="vNormalBtn"></a></p><p><a class="videoUpload ulink" href="#">' + _('我要自己上传视频') + '<em class="ffsong">&gt;&gt;</em></a></p></form></div>\
	  <div class="videoWrap hideDcnt cameraVideo"><div class="flashWrap"></div></div>';
		
			Self.videoUploadBuild = function(){
				Self.uploadCollection({
					type : 1,
					name : 'Video',
					tab : [_('视频链接')], //[_('视频链接'),_('摄像头拍摄')],
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
					tabEvent : function(o,i){},
					hideEvent : function(o){
						clearTimeout(Self.delayVideoTime);
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
					<p><textarea class="inputArea longText"></textarea><span class="tipPic"></span></p>\
					<div class="flashWrap"></div>\
					<div class="clear"><p class="right"><button class="btn1 btnSend">' + _('确定') + '</button><button class="btn1 btnCancel">' + _('取消') + '</button></p><div class="maskLoading"></div><span class="tip"></span></div>\
				</div>\
				<div class="picDiv hideDcnt cameraPic">\
					<div class="flashWrap"></div><div class="clear" style="display:none"><p class="left"><span class="tip"></span></p><p class="right"><button class="btnSend btn1">' + _('确定') + '</button><button class="btn1 btnCancel">' + _('取消') + '</button></p></div><div class="maskLoading"></div>\
				</div>\
				<div class="picDiv hideDcnt searchPic" style="height:195px">\
				</div>';

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
				tab : [_('本地上传'),_('多图'),_('链接'),_('文图'),_('拍照'),_('搜图')],
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
						var strRegex = new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*','gi');
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
										Self.addPic({result:0,msg:'上传成功','info':{'image':data.info.image,'fileName':_('链接.jpg')}});
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
				var length = Self._txt.value.length;
				Self._txt.value = Self._txt.value.replace(this.txt,'');
				Self.countTxt();
				Self._txt.focus();
				MI.selectTxt(Self._txt,length,length,length);
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
				if(Self.boxType == 'trans'){
					MI.Bos('btnSendTrans');
				}
				else {
					MI.Bos('btnSendReply','',0.01);
				}	
				break;
			case 2:
				MI.Bos('btnSendRelay');
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
MI.TalkBox.prototype.hasFace = false;
MI.TalkBox.prototype.showFace = function(){
	var Self = this;
	if (!Self.hasFace){
		/**
		 *  上线后引用http://image.soso.com/js/sosoexp_platform.js
		 *  引用js后用SOSO_EXP.Register方法注册表情按钮，该方法参数是一个对象，各参数定义如下：
		 *  @param object {
		 *		appid: 业务接入的id，微博用30010，必需
		 *		ref: 业务的来源域名，微博用't.qq.com'，必需
		 *		expBtn: 注册的表情按钮，点击弹出表情框，是一个dom元素，非必需
		 *		pos: 弹出表情框的位置，支持left/right/bottom/up，默认是bottom，非必需
		 *		editbox: 点击表情框中的图片之后，回调函数的第一个参数，非必需
		 *		callback: 点击表情框中的图片之后，触发的回调函数，由用户定义如何处理里层表情框传出来的图片url，第一个参数是editbox，第二个是图片url，必需
		 *		tab: 自定义tab页面提供的参数，支持4个tab自定义。非必需，格式如下： 
		 *			object {
		 *				0: [CustomTabName0, CustomTabUrl0],	// 第1个tab页的名称和iframe页面src，不填则该tab为'默认'页
		 *				1: [CustomTabName1, CustomTabUrl1],	// 第2个tab页的名称和iframe页面src，不填则该tab为'热搜'页
		 *				2: [CustomTabName2, CustomTabUrl2],	// 第3个tab页的名称和iframe页面src，不填则该tab为'系列'页
		 *				3: [CustomTabName3, CustomTabUrl3],	// 第4个tab页的名称和iframe页面src，不填则该tab为'趣味'页
		 *			}
		 *	}
		 */
		SOSO_EXP.Register({
			appid: 30010,
			ref: 't.qq.com',
			expBtn: Self._face,
			pos: 'bottom',
			editbox: Self._txt,
			callback: function(editbox,url){
				Self.addPic({result:0,msg:'上传成功','info':{'image':url,'fileName':_('表情.gif')}});
			},
			tab: {0: ['默 认', 'http://www.qq.com/mb/face.htm?v=110530']}
		});
		SOSO_EXP.Platform.popupBox(Self._face);
		Self.hasFace = true;
	}
}
MI.TalkBox.prototype.addFace = function(){
	var Self = this;
	if (0 && Self._pic){
		if (window.SOSO_EXP){
			Self.showFace();
		}
		else {
			UI.getScript('http://image.soso.com/js/sosoexp_platform.js',function(){
				Self.showFace();
			});
		}
		MI.TalkBox.cur = Self;
		return;
	}
	MI.app({
		Tmpl : function(){
			if (!Self._faceBox){
				Self._faceBox = UI.html(new UI.tmplString(MI.tmpl.face)({}))[0];
				UI.C(Self._faceBox,'z-index',9999);
				Self._facePreview = $$(Self._faceBox,'.facePreview')[0];
				Self._faceClose = $$(Self._faceBox,'.close')[0];
				Self._faceTab = $$(Self._faceBox,'.musicTab li');
				Self._faceCont = $$(Self._faceBox,'.faceBox');
				Self._facePage = $$(Self._faceBox,'.pages')[0];
				Self._faceList = [];
				Self._faceTabCur = 0;
				UI.append(Self._faceBox,document.body);
				var ipad = UI.hasClass(document.body,'ipad');
				
				//Event
				Self._faceClose.onclick = function(){
					Self.hideFace();
					return false;
				}
				UI.EA(document.body,'click',function(){
					Self.hideFace();
				});
				UI.EA(Self._faceBox,'click',function(e){
					UI.E(e).stop();
				});
				UI.each(Self._faceTab,function(o,i){ //页卡切换
					o.onclick = function(){
						if (Self._faceTabCur != i){
							UI.each(Self._faceTab,function(e,j){
								if (i == j){
									e.innerHTML = '<b>' + UI.text(e) + '</b>';
								}
								else {
									e.innerHTML = '<a href="#">' + UI.text(e) + '</a>';
								}
							});
							UI.removeClass(Self._faceTab[Self._faceTabCur],'select');
							UI.addClass(o,'select');
							UI.hide(Self._faceCont[Self._faceTabCur]);
							UI.show(Self._faceCont[i]);
							Self._faceTabCur = i;
							Self._faceList = $$(Self._faceCont[Self._faceTabCur],'.faceCell');
							Self.page.show(1,Self._faceList.length);
						}
						return false;
					}
				});
				Self.page = new MI.Page({
					target : Self._facePage, //翻页DOM
					call : function(num){ //回调函数
						UI.each(Self._faceList,function(o){
							if (UI.C(o,'style') != 'none'){
								UI.hide(o);
							}
						});
						UI.show(Self._faceList[num - 1]);
					},
					num : 3 //当前页左右的页数
				});
				UI.each($$(Self._faceBox,'.faceBox .faceCell a'),function(o,i){ //表情事件
					o.onclick = function(){
						var temp = (UI.A(this,'type') || '') + this.title;
						if(window.MILang=='en_US')
							Self.addTopic(' /[' + temp + ']');							
						else
							Self.addTopic(' /' + temp);
						Self.hideFace();
						return false;
					}
					if (!ipad){
						o.onmouseover = function(){
							var file = 'face/' + this.className.replace('f',''),
								P = this.parentNode.parentNode,
								fold = UI.A(P,'fold'),
								num = 15,
								index;
							if (!UI.A(P,'index')){
								UI.each($$(P,'a'),function(o,i){
									if (!UI.A(o,'i')){
										UI.A(o,'i',i + '');
									}
								});
								UI.A(P,'index',1);
							}
							index = Number( UI.A(this,'i') || i );
							if (fold){
								file = fold + (1 + index);
								UI.A(this,'type',fold.split('/')[1]);
								num = 14;
							}
							Self._facePreview.innerHTML = '<div><p class="faceImg"><img src="http://mat1.gtimg.com/www/mb/images/' + file + '.gif" alt=""></p><p class="faceName">' + this.title + '</p></div>';
							Self._facePreview.style.cssText = index % num > 7  ? 'left:11px;' : '';
						}
						o.onmouseout = function(){
							UI.hide(Self._facePreview);
						}
					}
				});
			}
			if (Self._faceBox.style.display == 'none'){
				setTimeout(function(){
					Self._faceBox.style.cssText = 'top:' + (UI.getY(Self._face) + UI.height(Self._face) + 5) + 'px;left:' + (UI.getX(Self._face) - 50) + 'px';
				},0);
			}
			else {
				Self._faceBox.style.cssText = 'display:none';
			}
		}
	});
}
MI.TalkBox.prototype.hideFace = function(){
	var Self = this;
	if (Self._faceBox){
		UI.hide(Self._facePreview);
		UI.hide(Self._faceBox);
	}
}
MI.TalkBox.prototype.addVote = function(){ // 新建投票
	var Self = this;
	if (!Self._voteWrap){
		Self._voteWrap = UI.html('<div class="mloadWrap">\
			<div class="musicTab"><a href="#" class="close" title="' + _('关闭') + '">' + _('关闭') + '</a></div>\
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
		</div>')[0];
		UI.after(Self._voteWrap,Self._moreBox);
		Self._voteClose = $$(Self._voteWrap,'.close')[0];
		Self._voteForm = $('voteAddFrom');
		Self._voteOptions = $$(Self._voteWrap,'td ul')[0];
		Self._voteAddOption = $$(Self._voteWrap,'.voteAddOption')[0];
		Self._addBrief = $$(Self._voteWrap,'a.addBrief')[0];

		//Event
		Self._voteClose.onclick = function(){
			Self.hideVote();
			return false;
		}
		Self._voteAddOption.onclick = function(){
			if ($$(this.parentNode,'li').length >= 18){
				UI.hide(this);
			}
			Self.addVoteOption();
			return false;
		}
		Self._addBrief.onclick = function(){
			var brief=$('brief'),
			P=brief.parentNode.parentNode.parentNode;
			brief.value='';
			UI.toggle(P);
			this.innerHTML = this.innerHTML == '+' + _('添加说明') ? '-'+_('不需要说明了') : '+'+_('添加说明') ;
			$$(P,'.voteAddError')[0].innerHTML='';
			try{brief.focus()}catch(e){}
			return false
		}
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
							Self._txt.value += _('我发起了一个投票【{0}】，地址：',data.info.title) + 'http://url.cn/' + data.info.url;
							Self.focus();
							Self.vote = data.info.voteid;
							Self.resetVote();
							Self.hideVote();
						}
						else if(data.msg){
							MI.alert(data.msg);
						}
					}
				});
			}
		});
	}
	UI.show(Self._voteWrap);
}
MI.TalkBox.prototype.addVoteOption = function(){ // 增加投票选项
	var Self = this,
		html = UI.html('<li><span class="index"></span><input type="text" name="opttitle" class="inputTxt"><div></div></li><li><span class="index"></span><input type="text" name="opttitle" class="inputTxt"><div></div></li>'),
		frag = document.createDocumentFragment();
	UI.each(html,function(o){
		UI.append(o,frag);
	});
	UI.append(frag,Self._voteOptions);
		var index = $$(Self._voteWrap,'li .index');
		if(index){
			for(var i=0,l=index.length;i<l;i++){
				index[i].innerHTML = i+1+'.';
			}
		}
}
MI.TalkBox.prototype.hideVote = function(){ // 隐藏投票
	var Self = this;
	if (Self._voteWrap){
		UI.hide(Self._voteWrap);
	}
}
MI.TalkBox.prototype.resetVote = function(){ // 投票表单重置
	var Self = this;
	UI.show(Self._voteAddOption);
	var input = $$(Self._voteOptions,'input');
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
	Self._addBrief.innerHTML = '+'+_('添加说明');
}

MI.SearchPic = {
	//Dom
	talkBox : null,
	builded : false,
	_tUrl : false,
	_rSearch : null,
	_rSearchPage : null,
	build : function(o){
		var Self = this;
		this.PageNum = 16;
		Self.talkBox = o;
		var html = UI.html('<div class="loading" style="display:none;"></div><div class="p_searchBox clear"><form method="get"><span class="sosoLogo"><em class="ico_soso"></em>表情</span><input type="text" class="inputTxt" /><input type="submit" class="btn1" value="搜索"></form></div>'),frag = document.createDocumentFragment();
		UI.each(html,function(o){
			UI.append(o,frag);
		});
		UI.append(frag,o._searchPicBox);
		o._picSearchKey = $$(o._searchPicBox,'.inputTxt')[0];
		o._picSearchBtn = $$(o._searchPicBox,'.btn1')[0];
		o._picSearchFrom = $$(o._searchPicBox,'form')[0];
		Self._sLoading = $$(o._searchPicBox,'.loading')[0];

		o._picSearchBtn.onclick = o._picSearchFrom.onsubmit= function(){
			Self.searchPic(o._picSearchKey.value,0);
			if (Self._rSearch && Self._rSearchPage && Self._rSearchPage.target){
				UI.remove(Self._rSearchPage.target);
				Self._rSearchPage = null;
				if(window.__sosostat && window.__sosostat.pr_get) __sosostat.pr_get('ourl', 't.1.1.0' , 0,'wb_bq_search');//上报soso
			}
			return false;
		}
		Self.searchPic('',0);//默认请求图片
		Self.builded = 1;
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
									tit = items[i].TI;%>\
									<%if(i%8 > 3){px="4px"}else{px ="";}%>\
									<li><a href="<%=Src%>" rel="<%=px%>" onclick="return false;"><img id="<%=picid%>" src="<%=sSrc%>" alt="<%=tit%>" title="<%=tit%>"  /></a></li>\
								<%}%>\
							</ul>\
						</div>\
						<%if(segword){%>\
							<p class="p_sNum">'+ _('搜索到') +'<b><%=allnum%></b>个和<span class="cSign"><%=segword%></span>'+ _('相关的表情') +'</p>\
						<%}%>\
					<%}else{%>\
						<div class="p_noResult"><h4>' + _('没有找到图片，请试试换个关键字搜索') + '</h4></div>\
					<%}%>\
				<%}else{%>\
					<div class="p_noResult"><h4>' + _('系统繁忙，请稍后再试') + '</h4></div>\
				<%}%>\
			</div>',
	show : function(){},
	searchPic : function(key,p){//key 为空字符串时使用默认请求
		/*
		http://vdap.soso.com/service?src=37&kd=e&w=hello&sn=0&nu=10&ie=utf8&mark=MD|SRC|SSRC|TI&ofmt=json&var=abc
		参数：
		w: {当前请求关键字}
		sn:{偏移量}
		nu:{当前请求返回的条数}
		var:{注册的变量名}
		*/
		var Self = this,
		_DefaultKey = _(''),
		_P = 0,
		url,
		p = parseInt(p) > 0?parseInt(p):_P;
		Self._Key = key;

		var sosoUrl = 'http://vdap.soso.com/service',//用soso搜图的
			param = ['src=37&kd=e&ie=utf8&mark=MD|SRC|SSRC|TI&ofmt=json&nu=16&ng=on','w='+UI.encode(key),'sn='+p,'r='+MI.random(),'var=jsonSoSoPic'];
			sosoUrl += ("?"+param.join('&'));
		var tUrl = 'http://t.qq.com/asyn/searchpic.php?p='+ p +'&var=jsonSoSoPic';//默认的url
		url = sosoUrl;
		if(!key || UI.trim(key) == _DefaultKey){
			url = tUrl;
			Self._tUrl = 1;
		}

		UI.show(Self._sLoading);
		UI.getScript(url,function(){Self.searchPicCallBack(jsonSoSoPic.sosovdap.expression)},'gb2312');
	},
	searchPicCallBack : function(data){
		var Self = this;
		var s = [];
			if(data){
				var rSearch, pages,p_Preview;
				// 搜索结果层
				if (!Self._rSearch){
					rSearch = UI.html('<div class="p_sResult"></div>')[0];
					UI.append(rSearch, Self.talkBox._searchPicBox);
					Self._rSearch = rSearch;
				} else if (!Self._rSearch.parentElement){
					UI.append(Self._rSearch, Self.talkBox._searchPicBox);
				}
				if (!Self._rSearchPage){
					// 分页
					pages = UI.html('<div class="pages"></div>')[0];
					UI.append(pages, Self._rSearch);
					Self._rSearchPage = new MI.Page({
						target : pages,
						num : 1,
						max : 40,
						call : function (i) {
							var num = Self._tUrl ? i : (i*16);
							Self.searchPic(Self._Key,num);
						}
					});
					Self._rSearchPage.show(0, Math.ceil(data.general.allnum / Self.PageNum), false);
				}
				Self.searchPage(data);

				UI.hide(Self._sLoading);
				// 如果返回值不正确&列表中存在少于一页的图片 则删除可能存在的分页条
				if ( !!data.retcode || data.general.allnum < Self.PageNum) {
					if (Self._rSearchPage && Self._rSearchPage.target){
						UI.remove(Self._rSearchPage.target);
						Self._rSearchPage = null;
					}
				}
				
				if (Self._rSearch && (!Self.p_Preview)){
					p_Preview = UI.html('<div class="picPreview" style="visibility:hidden;"><img style="max-width:97px;max-height:97px;" src="http://mat1.gtimg.com/www/mb/images/loading.gif" alt=""></div>')[0];
					UI.append(p_Preview,Self._rSearch);
					Self.p_Preview = p_Preview;
					Self.p_img = $$(p_Preview,'img')[0];
				}
			}
	},
	searchPage : function (data) {
		var Self = this;
		if(!data) return;
		var searchResult = UI.html(new UI.tmplString(Self.tmpl)(data)), frag = document.createDocumentFragment();
		UI.each(UI.children(searchResult[0]), function(o){
			if (UI.isElement){
				UI.append(o, frag);
			}
		});
		var m_total = $$(Self._rSearch, '.p_sNum')[0];
		var m_list = $$(Self._rSearch, '.p_sList')[0];
		var m_noResult = $$(Self._rSearch, '.p_noResult')[0];
		var p_pages = $$(Self._rSearch, '.pages')[0];
		if (m_total){
			UI.remove(m_total);
		}
		if (m_list){
			UI.remove(m_list);
		}
		if (m_noResult){
			UI.remove(m_noResult);
		}
		UI.prepend(frag, Self._rSearch);

		Self.bindEvent($$(Self._rSearch,'.p_sList')[0]);
	},
	bindEvent : function(o){
		if(!o)	return;
		var Self = this,
			p_sList = o;
		p_sList.onmouseover = function(e){
			var E = UI.E(e);
			if(E.target.nodeName == 'IMG'){
				setTimeout(function(){
					Self.p_img.src = UI.parent(E.target).href;
					Self.p_Preview.style.left = UI.parent(E.target).rel;
					Self.p_Preview.style.visibility = 'visible';
				},10);
			}else{
				setTimeout(function(){Self.p_Preview.style.visibility = 'hidden';},10);
				
			}
			E.stop();
		}
		p_sList.onmouseout = function(e){
			var E = UI.E(e);
			if(E.target.nodeName == 'IMG'){
				setTimeout(function(){Self.p_Preview.style.visibility = 'hidden';},10);
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
							Self.talkBox.addPic({result:0,msg:'上传成功','info':{'image':data.info.image,'fileName':_('搜图.jpg')}});
						}else{
							MI.dialog.alert(data.msg || _('图片上传失败，请重试'));
						}
					}
				});
				if(window.__sosostat && window.__sosostat.pr_get) __sosostat.pr_get('ourl', 't.1.1.'+ E.target.id, 0, 'wb_bq_search');//上报soso
			}
			E.stop();
			return false;
		}
	}
}
//多图上传开始
MI.PhotoMultiUpload = {
	html :'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="MultiPhoto" width="462" height="165" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="http://mat1.gtimg.com/www/mb/swf/MultiPhoto_110817.swf" /><param name="wmode" value="transparent" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always"/><param value="langVer=' + window.MILang + '" name="FlashVars" /><embed src="http://mat1.gtimg.com/www/mb/swf/MultiPhoto_110817.swf" quality="high" width="462" height="165" name="MultiPhoto" align="middle" play="true" loop="false" quality="high" wmode="transparent" allowScriptAccess="always" FlashVars="langVer=' + window.MILang + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>',
	sendBtn:null,
	cancelBtn:null,
	uploadUrl:'',
	build:function(target,uploadUrl){		//外部调用build方法
		var Self = this;
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
	html :'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="CameraPhoto" width="462" height="335" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="http://mat1.gtimg.com/www/mb/swf/CameraPhoto_110905.swf" /><param name="wmode" value="transparent" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always"/><param value="langVer=' + window.MILang + '" name="FlashVars" /><embed src="http://mat1.gtimg.com/www/mb/swf/CameraPhoto_110905.swf" quality="high" width="462" height="335" name="CameraPhoto" align="middle" play="true" loop="false" quality="high" wmode="transparent" allowScriptAccess="always" FlashVars="langVer=' + window.MILang + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>',
	sendBtn:null,
	cancelBtn:null,
	uploadUrl:'',
	build:function(target,uploadUrl){		//外部调用build方法
		var Self = this;
		if(MI.Flash.getVersion() < 10.0){
			target.innerHTML = MI.Flash.updateTip(10.0);
			return;
		}
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


MI.Text2Pic = {
	html :'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="Text2Pic" width="462" height="10" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="http://mat1.gtimg.com/www/mb/swf/Text2Pic_110817.swf" /><param name="wmode" value="transparent" /><param name="quality" value="high" /><param name="align" value="middle" /><param name="allowScriptAccess" value="always" /><param value="langVer=' + window.MILang + '" name="FlashVars" /> <embed src="http://mat1.gtimg.com/www/mb/swf/Text2Pic_110817.swf" quality="high" width="462" height="10"  name="Text2Pic" align="middle" play="true" loop="false" quality="high" wmode="transparent" allowScriptAccess="always" FlashVars="langVer=' + window.MILang + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>',
	build:function(target,url){
	 	var Self = this;
		if(MI.Flash.getVersion() < 9){
			target.innerHTML = MI.Flash.updateTip(9);
			return;
		}
		Self.uploadUrl = url;
		Self.loaded = false;
		if(Self.builded) {
			UI.C(Self.loading,'opacity',1);
			UI.show(Self.loading); 
			Self.show();
			Self.showWording();
			return;
		};
		Self.target = target;
		Self.flashWrap = $$(target,'.flashWrap')[0];
		Self.sendBtn = $$(target,'.btnSend')[0];
		Self.cancelBtn = $$(target,'.btnCancel')[0];
		Self.tip = $$(target,'.tip')[0];
		Self.txt = $$(target,'.longText')[0];
		Self.wording = $$(target,'.tipPic')[0];
		Self.loading = $$(target,'.maskLoading')[0];
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
	//	Self.show();
		Self.showWording();
		return false;
	},
	showWording:function(){
		var Self = this;
		UI.show(Self.wording);
		//UI.C(Self.wording,'opacity',1);
		Self.txt.oninput = Self.txt.onkeydown = Self.txt.onmousedown = function(){
			Self.hideWording();
		};
	},
	hideWording:function(){
		var Self = this;
		clearInterval(Self.delay);
		Self.delay = UI.animate(Self.wording,'opacity',0,function(){
			UI.hide(Self.wording);
		},0.4);
		Self.txt.oninput = Self.txt.onkeydown = Self.txt.onmousedown = null;
	},
	show:function(){
		var Self = this;
		if(document.Text2Pic && document.Text2Pic._Text2PicBuildImg) {
			UI.hide(Self.loading);
			UI.C(Self.loading,'opacity',0.5);
		}	
	//	if(Self.loaded) return;
	//	UI.C(Self.body,'opacity',0.1);
	//	MI.dialog.showLoad();
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
			return;
		} 
		if(len>4000) {
			Self.setTip(_('字数超出<span class="error">{0}</span>字，请删减',Math.ceil((len-4000)/2)),true);
			return;
		}  
		clearTimeout(Self.delay);
		UI.show(Self.loading);
		Self.setTip(_('正在转换成图片，请稍候...'));
	
		txt = '\n' + txt + '\n\n\n';
		document.Text2Pic._Text2PicBuildImg(Self.uploadUrl,txt,'_flash_Text2PicUploadCall',MI.Flash.version);
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
	},
	formTalk : function(talk,display){
		var Self = this;
		if(!Self.useTxt2Pic) {
			Self.useTxt2Pic = UI.html('<span style="float:right;height:30px;line-height:30px;margin-left:5px;">[<a href="#">' + _('转成图片') + '</a>]</span>')[0];
			UI.before(Self.useTxt2Pic,talk._tip);
			UI.GT(Self.useTxt2Pic,'a')[0].onclick = function(){
				if(!talk.upPic) talk.picUploadBuild(); //触发图片浮层build
				talk.upPic.show(3); //触发Text2Pic build
				Self.txt.focus();
				Self.txt.value = talk._txt.value;
				Self.txt.scrollTop = Self.txt.scrollHeight;  //for chrome
				Self.hideWording();
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
	flashHtml:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="FilterPhoto" width="462" height="250" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="http://mat1.gtimg.com/www/mb/swf/FilterPhoto_110804.swf" /><param name="wmode" value="transparent" /><param name="quality" value="high" /><param name="align" value="middle" /><param name="allowScriptAccess" value="always" /><param value="langVer=' + window.MILang + '" name="FlashVars" /> <embed src="http://mat1.gtimg.com/www/mb/swf/FilterPhoto_110804.swf" quality="high" width="462" height="215" name="FilterPhoto" align="middle" play="true" loop="false" quality="high" wmode="transparent" allowScriptAccess="always" FlashVars="langVer=' + window.MILang + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>',
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