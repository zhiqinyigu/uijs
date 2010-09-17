MI.Theme = {
	title : '<span class="ico_skin"></span>皮肤设置',
	xhr : null,
	themeId : null,
	themeName : '',
	build : function(){
		var Self = this;
		//Theme Bos Style
		UI.css('.D2{width:100%;height:100%;position:absolute;top:0;left:0;z-index:99}.D2 .DCont{*zoom:1}.D2 .bg{background:#FFF;position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;-height:expression(document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + "px")}.D2 iframe.cover_select{width:100%;height:100%;position:absolute;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;z-index:-1;display:none;-display:}.D2 .DLoad{filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5;position:absolute;z-index:5;background:url(http://mat1.gtimg.com/www/mb/images/loading.gif) #FFF 50% 50% no-repeat;}.D2 .CR{position:absolute;top:50%;left:50%;margin:0 0 0 -9999px}.D2 .DTitle,.D2 .ico_skin,.DtabTitle,.ico_lock,.D2 .funBox{background:url(http://mat1.gtimg.com/www/mb/images/skinBg1a.png) repeat-x}.D2 .DTitle{cursor:move;height:36px;overflow:hidden;padding-left:10px;font-family:Simsun;font-size:14px;line-height:35px;font-weight:bold;border-bottom:1px solid #D5D5D5;background-position:0 -34px}.D2 .ico_skin{float:left;margin:9px 5px 0 0;_margin-right:0;background-position:0 -124px;background-repeat:no-repeat}.D2 .close{position:absolute;float:none;top:12px;right:12px;margin:0}.D2 .DWrap{width:586px;padding:1px;border:1px solid #7B828B;background:#fff;filter:progid:DXImageTransform.Microsoft.Shadow(color="#909090",Direction=135,Strength=4);-moz-box-shadow:2px 2px 5px #909090;-webkit-box-shadow:2px 2px 5px #909090}.D2 .pages{width:544px;margin:0 auto;padding:10px 5px 8px;border-bottom:1px dotted #C9C9C9}.D2 .pages .disabled{color:#999;cursor:default;text-decoration:none;background:none}.D2 .funBox{height:36px;padding-top:9px;text-align:center;background-position:0 -75px}.D2 .btn_save{margin-right:10px}.DtabTitle{height:29px;padding-right:10px;*zoom:1;overflow:hidden;line-height:29px}.DtabTitle ul{float:left}.DtabTitle li{display:inline-block;float:left;margin-left:-1px;border:1px solid #D5D5D5;border-width:0 1px}.DtabTitle li.select{padding:0 15px;font-weight:bold;background:#fff}.DtabTitle li a{display:block;padding:0 15px}.DtempList{height:188px;width:556px;margin:10px 0 0 20px}.DtempList li{position:relative;float:left;width:129px;height:84px;margin:10px 10px 0 0;color:#fff;line-height:19px;text-align:center;cursor:pointer}.DtempList img{margin:1px;width:121px;height:76px;padding:2px;border:1px solid #DFDFDF}.DtempList .tempName,.DtempList .mask{position:absolute;z-index:2;left:4px;bottom:4px;width:121px;height:19px}.DtempList .ico_lock{display:none;position:absolute;z-index:2;left:6px;top:6px;width:11px;height:16px;background-position:-20px -125px}.DtempList .mask{z-index:1;background:#000;filter:alpha(opacity:70);opacity:0.7}.DtempList li.hover img{border-color:#32A1CC}.DtempList .select img{margin:0;border:2px solid #32A1CC}.DtempList .locked img{border-color:#5F5F5F!important;background:#fff;filter:alpha(opacity:20);opacity:0.2}.DtempList .locked .ico_lock{display:block}');
		//Tips Style
		UI.css('#headWrap{z-index:10}.settingTips{position:absolute;z-index:999;top:30px;right:-32px;width:200px;padding:12px 30px 10px 46px;font-size:14px;border:1px solid #F0E5BA;background:#FFFFE9}.settingTips .close{position:absolute;float:none;margin-top:-2px;right:10px}.settingTips .links{text-align:right}.settingTips .SA{position:absolute;top:-9px;left:130px}.settingTips .SA em,.settingTips .SA span{width:17px;height:8px;color:#F0E5BA}.settingTips .SA span{top:1px;left:0;color:#FFFFE9}.settingTips .links a{font-size:12px;margin:3px 0 0 20px;color:#2B4A78;text-decoration:underline}.settingTips .ico_light{position:absolute;left:14px}.arrowBot .SA{top:auto;bottom:9px}.arrowBot{font-size:12px}.arrowBot .SA em,.arrowBot .SA span{height:19px}.arrowBot .SA span{top:-1px}');
		Self._tip = UI.html('<div class="settingTips arrowBot" style="display:none"><a href="#" class="close" onclick="UI.hide(MI.Theme._tip);MI.Bos(\'btnThemeTipClose\');return false">关闭</a><div class="SA"><em>◆</em><span>◆</span></div><div class="cntBox"><div class="ico ico_light"></div><p>还差<span class="collegeStepNum">N</span>步就可以领取纪念版皮肤了，<br/>去页面左侧的广播学院继续努力吧！</p><p class="links" style="display:none"><a href="#">现在就去设置</a><a href="#">我知道了</a></p></div></div>')[0];
		Self._tipNum = $$(Self._tip,'.collegeStepNum')[0];
		UI.append(Self._tip,document.body);
		UI.EA(document.body,'mousedown',function(){
			UI.hide(Self._tip);
		});
		Self._tip.onclick = function(e){
			UI.E(e).stop();
		}

		Self.dialog = new MI.Dialog({tmpl:'<div class="D2">' + (UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"></div><div class="CR"><div class="DWrap"><div class="DTitle"></div><a title="关闭" class="DClose close" href="#">关闭</a><div class="DLoad"></div><div class="DCont"></div></div></div>'});
		$$(Self.dialog._body,'.DClose')[0].onclick = function(){
			Self.hide();
			return false;
		}

		//Talk Box
		Self._talkBox = UI.html('<div class="talkWrap" style="display:none"><div class="SA"><em>◆</em><span>◆</span></div><div class="top"><span class="left"><span class="replyTitle">让大家来看看你换的新皮肤:</span></span></div><div class="cont"><textarea class="inputTxt noAutoComplete"></textarea></div><div class="bot" style="margin:5px 0 7px"><input type="button" class="inputBtn sendBtn"/><span class="countTxt">还能输入<em>140</em>字</span></div><div style="display: none;" class="talkSuc"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg" id="msg"></span></div></div>')[0];
		Self.talkBox = new MI.TalkBox(Self._talkBox);
		Self.talkBox.txtTipSend = '发送中';
		Self.talkBox.successStart = function(){
			MI.dialog.showTip({html:'发送成功!'});
		}

		var position = Self.getPosition();
		Self.dialog.show({
			title : Self.title,
			//html : '<div style="height:300px"></div>',
			width : 590,
			height : 308,
			top : position[0],
			left : position[1]/**/
		});
		Self.load('/setting_theme_frame.php');
	},
	tipNum : function(num){
		if (num) {
			this._tipNum.innerHTML = num;
		}
	},
	tipPosition : function(el){
		UI.show(this._tip);
		if (el.className == 'themeCollegeTip') {
			this._tip.style.cssText = 'top:' + (UI.getY(el) - UI.height(el) - 59) + 'px;left:' + (UI.getX(el) - UI.width(el) / 2 + 20) + 'px';
		}
		else {
			this._tip.style.cssText = 'top:' + (UI.getY(el) - UI.height(el) + 10) + 'px;left:' + (UI.getX(el) - UI.width(el) / 2 - 10) + 'px';
		}
	},
	getPosition : function(){
		var headWrap = $('headWrap'),top = 0,left = 0,position = [0,0];
		if (headWrap) {
			position[0] = UI.height(headWrap) - 7;
			position[1] = UI.getX(headWrap) - 1;
		}
		return position;
	},
	setPosition : function(){
		var position = this.getPosition(),wrap = this.dialog._wrap;
		wrap.style.top = position[0] + 'px';
		wrap.style.left = position[1] + 'px';
	},
	preview : function(id){
		var Self = this,
			style = $('viewTheme'),
			curTheme = $('curTheme'),
			url = '/asyn/theme_preview.php?id=' + id;
		if(!style){
			style = UI.DC('link');
			style.id = 'viewTheme';
			UI.A(style,'type','text/css');
			UI.A(style,'rel','stylesheet');
			UI.append(style,$$('head')[0]);
		}
		UI.A(style,'href',url);
		setTimeout(function(){
			Self.setPosition();
		},500);
		if (curTheme) {
			UI.remove(curTheme);
			Self.setPosition();
		}
		MI.Bos('btnThemePreview');
	},
	load : function(url){
		var Self = this;
		Self.dialog.showLoad();
		if (Self.xhr) {
			Self.xhr.abort();
		}
		if (Self.themeId) {
			url += '&curId=' + Self.themeId;
		}
		Self.xhr = UI.get(url + (url.hasString('?') ? '' : '?') + '&r=' + MI.random(),'',function(data){
			//data = '<div class="DtabTitle"><ul><li class="select">精选主题</li><li><a href="/setting_theme_frame.php?t=1">世界杯</a></li></ul><span class="right"><a href="#">成为新星主播，获取纪念版皮肤</a></span></div>	<div>		<ul class="DtempList clear">			<li class="hover"><img src="http://mat1.gtimg.com/www/mb/images/thumb.jpg"><p class="ico_lock"></p><p class="tempName">模板名字</p><div class="mask"></div></li>			<li class="locked"><img src="http://mat1.gtimg.com/www/mb/images/thumb.jpg"><p class="ico_lock"></p><p class="tempName">模板名字</p><div class="mask"></div></li>			<li class="select"><img src="http://mat1.gtimg.com/www/mb/images/thumb.jpg"><p class="ico_lock"></p><p class="tempName">模板名字</p><div class="mask"></div></li>			<li><img src="http://mat1.gtimg.com/www/mb/images/thumb.jpg"><p class="ico_lock"></p><p class="tempName">模板名字</p><div class="mask"></div></li>			<li><img src="http://mat1.gtimg.com/www/mb/images/thumb.jpg"><p class="ico_lock"></p><p class="tempName">模板名字</p><div class="mask"></div></li>			<li><img src="http://mat1.gtimg.com/www/mb/images/thumb.jpg"><p class="ico_lock"></p><p class="tempName">模板名字</p><div class="mask"></div></li>			<li class="locked"><img src="http://mat1.gtimg.com/www/mb/images/thumb.jpg"><p class="ico_lock"></p><p class="tempName">模板名字</p><div class="mask"></div></li>			<li><img src="http://mat1.gtimg.com/www/mb/images/thumb.jpg"><p class="ico_lock"></p><p class="tempName">模板名字</p><div class="mask"></div></li>		</ul>		<div class="pages"><a href="#" class="disabled">上一页</a><a href="/setting_theme_frame.php?t=1&p=2">下一页</a></div>	</div>	<div class="funBox"><input type="button" value="" class="btn_save"><input type="button" value="" onclick="MI.Theme.hide()" class="btn_cancel"></div></div>';
			if (data != '') {
				UI.evalScript(data);
				if (!Self.loadError) {
					Self.dialog._cont.innerHTML = data;
					Self.addEvent();
					UI.C(Self.dialog._cont,'height','');
				}
				Self.loadError = 0;
			}
			Self.dialog.hideLoad();
		});
		MI.Bos('btnThemePage');
	},
	loadError : 0,
	save : function(){
		var Self = this,
			cont = Self.dialog._cont,
			selected = Self.themeId;
		if (selected) {
			if (Self.xhr) {
				Self.xhr.abort();
			}
			Self.xhr = UI.ajax({
				url : '/asyn/theme_save.php',
				data : {id:selected},
				success : function(data){
					data = MI.json(data);
					if(data.result == 0){
						/*MI.confirm({
							type : 'success',
							title : '皮肤保存成功',
							content : '发送一条广播，让大家来看看你换的新皮肤吧！',
							confirm : function(){
								Self.talk($$(selected,'.tempName')[0].innerHTML);
							}
						});
						Self.hide();*/
						Self.dialog.hide();
						MI.tip('保存成功！',function(){
							Self.goHome();
						});
					}
					else {
						MI.alert(data.msg);
					}
					Self.dialog.hideLoad();
				}
			});
			Self.dialog.showLoad();
		}
		else {
			Self.hide();
		}
	},
	talk : function(){
		var Self = this;
		MI.dialog.show({html:Self._talkBox,width:500});
		Self.talkBox._txt.value = '我换了新皮肤“' + Self.themeName + '”，快来我的主页看看吧！' + 'http://t.qq.com/' + MI.user.account;
		setTimeout(function(){
			var len = Self.talkBox._txt.value.length;
			Self.talkBox._txt.focus();
			MI.selectTxt(Self.talkBox._txt,len,len,len);
			Self.talkBox.countTxt();
		},0);

		MI.Bos('btnThemeTalk');
		/*if (!Self.talk.sending) {
			UI.ajax({
				url : '/publish.php',
				data : {
					content : '我换了新皮肤“' + name + '”，快来我的主页看看吧！' + 'http://t.qq.com/' + MI.user.account,
					countType : '',
					viewModel : 0
				},
				success : function(data){
					document.location.href = '/' + MI.user.account;
				}
			});
		}
		this.talk.sending = 1;*/
	},
	addEvent : function(){
		var Self = this,
			cont = Self.dialog._cont,
			list = $$(cont,'.DtempList li'),
			link = $$(cont,'.DtabTitle li a,.pages a'),
			btnSave = $$(cont,'.btn_save')[0],
			btnCancel = $$(cont,'.btn_cancel')[0],
			themeCollegeTip = $$(cont,'.themeCollegeTip')[0],
			themeTalk = $$(cont,'.themeTalk')[0];
		UI.each(list,function(o){ //Theme List
			if (UI.hasClass(o,'locked')) {
				o.onclick = function(){
					Self.tipPosition(this);
					Self.showCollege();
				}
			}
			else {
				o.onmouseover = function(){
					UI.addClass(this,'hover');
				}
				o.onmouseout = function(){
					UI.removeClass(this,'hover');
				}
				o.onclick = function(){
					var cur = $$(cont,'.DtempList .select')[0],
						themeId = UI.A(this,'themeId');
					if (cur) {
						UI.removeClass(cur,'select');
					}
					UI.addClass(this,'select');
					Self.preview(themeId);
					Self.themeId = themeId;
				}
			}
		});
		UI.each(link,function(o){ //Load Page
			var href = UI.A(o,'href');
			o.onclick = function(){
				if (href && !href.hasString('#') && !UI.hasClass(o,'.disabled')) {
					Self.load(href);
				}
				return false;
			}
		});
		if (btnSave) { //Save
			UI.EA(btnSave,'click',function(){
				Self.save();
			});
		}
		if (btnCancel) { //Cancel
			UI.EA(btnCancel,'click',function(){
				Self.hide();
			});
		}
		if (themeCollegeTip) { //Tip
			themeCollegeTip.onclick = function(e){
				Self.tipPosition(this);
				Self.showCollege();
				UI.E(e).stop();
			}
		}
		if (themeTalk) { //Talk
			UI.EA(themeTalk,'click',function(){
				Self.talk();
			});
		}
		
	},
	goHome : function(){
		document.location.href = '/' + MI.user.account;
	},
	showCollege : function(){
		if (MI.College) {
			MI.S('tips_collegeStep_' + MI.user.account,1);
			MI.College._openCont.onclick();
			MI.College.showStep = 0;
		}
		else {
			UI.getScript(MI.version.College,function(){
				MI.College.build();
				MI.College._openCont.onclick();
				MI.College.showStep = 0;
			});
		}
	},
	show : function(){
		UI.show(this.dialog._body);
		this.dialog.display = 1;
	},
	hide : function(){
		var Self = this;
		Self.dialog.hide();
		if (Self.themeId) {
			/*MI.confirm({
				type : 'error',
				title : '是否保存当前选中的皮肤？',
				confirm : function(){
					Self.save();
				},
				cancel : function(){
					Self.goHome();
				}
			});*/
			Self.goHome();
		}
	}
}