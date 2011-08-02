/**
 * MI.Theme 皮肤设置
 * 
 * @namespace MI.Theme 皮肤设置
 * @author xhlv@tencent.com
 * @type Object
 */
MI.Theme = {
	title : '<span class="ico_skin"></span>' + _('皮肤设置'),
	xhr : null,
	themeId : null,
	themeName : '',
	enAblegif : false,
	build : function() {
		var Self = this;
		// Theme Bos Style
		UI
				.css('.D2{width:100%;height:100%;position:absolute;top:0;left:0;z-index:99}\.D2 .DCont{*zoom:1}\
.D2 .bg{background:#FFF;position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;-height:expression(document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + "px")}\
.D2 iframe.cover_select{width:100%;height:100%;position:absolute;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;z-index:-1;display:none;-display:}\
.D2 .DLoad{filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5;position:absolute;z-index:5;background:url(http://mat1.gtimg.com/www/mb/images/loading.gif) #FFF 50% 50% no-repeat;}\
.D2 .CR{position:absolute;top:50%;left:50%;margin:0 0 0 -9999px}\
.D2 .DTitle,.D2 .ico_skin,.DtabTitle,.ico_lock,.D2 .funBox,.themebg_sel button,.themebg .del,.bgPosition,.bgPosition a.select,.D2 .color,.palettes .mask,.themeDiy .pages a{background:url(http://mat1.gtimg.com/www/mb/images/skinBg1d.png) no-repeat}\
.D2 .DTitle{cursor:move;height:36px;overflow:hidden;padding-left:10px;font-family:Simsun;font-size:14px;line-height:35px;font-weight:bold;border-bottom:1px solid #D5D5D5;background-position:0 -34px;background-repeat:repeat-x}\
.D2 .ico_skin{float:left;margin:9px 5px 0 0;_margin-right:0;background-position:0 -124px}\
.D2 .close{position:absolute;float:none;top:12px;right:12px;margin:0}\
.D2 .DWrap{width:586px;padding:1px;border:1px solid #7B828B;background:#fff;filter:progid:DXImageTransform.Microsoft.Shadow(color="#909090",Direction=135,Strength=4);-moz-box-shadow:2px 2px 5px #909090;-webkit-box-shadow:2px 2px 5px #909090}\
.D2 .pages{width:544px;margin:0 auto;padding:10px 5px 8px;border-bottom:1px dotted #C9C9C9}\.D2 .pages .disabled{color:#999;cursor:default;text-decoration:none;background:none}\
.D2 .funBox{height:36px;padding-top:9px;text-align:center;background-position:0 -75px;background-repeat:repeat-x}\
.D2 .btn_save{margin-right:10px}\
.DtabTitle{height:29px;padding-right:10px;*zoom:1;overflow:hidden;line-height:29px;background-repeat:repeat-x}\
.DtabTitle ul{float:left}\
.DtabTitle li{display:inline-block;float:left;margin-left:-1px;border:1px solid #D5D5D5;border-width:0 1px}\
.DtabTitle li.select{padding:0 15px;background:#fff}\.DtabTitle li a{display:block;padding:0 15px}\
.DtempList{width:556px;height:188px;margin:10px 0 0 20px}\
.DtempList li{position:relative;float:left;width:129px;height:84px;margin:10px 10px 0 0;color:#fff;line-height:19px;text-align:center;cursor:pointer}\
.DtempList img{margin:1px;width:121px;height:76px;padding:2px;border:1px solid #DFDFDF}\
.DtempList .tempName,.DtempList .mask{position:absolute;z-index:2;left:4px;bottom:4px;width:121px;height:19px}\
.DtempList .ico_lock{display:none;position:absolute;z-index:2;left:6px;top:6px;width:11px;height:16px;background-position:-20px -125px}\
.DtempList .mask{z-index:1;background:#000;filter:alpha(opacity:70);opacity:0.7}\
.DtempList li.hover img{border-color:#32A1CC}\
.DtempList .select img{margin:0;border:2px solid #32A1CC}\
.DtempList .locked img{border-color:#5F5F5F!important;background:#fff;filter:alpha(opacity:20);opacity:0.2}\
.DtempList .locked .ico_lock{display:block}\
.themeDiy{width:558px;height:213px;margin:20px auto 0;color:#999;border-bottom:1px dotted #C9C9C9}\
.themebgWrap{float:left;width:283px;height:203px;border:1px solid #DFDFDF}\
.themebg_sel{position:relative;height:49px;padding:10px 8px 0;line-height:25px;background:#EBEBEB}\
.themebg_sel .inputTxt{width:180px;margin-right:5px;border:1px solid #C5C5C5;position:relative;z-index:1;cursor:pointer}\
.themebg_sel button{width:60px;height:21px;border:0;background-position:0 -145px}\
.selfilemask{position:absolute;z-index:100;width:20px;height:20px;overflow:hidden;*zoom:1;filter:alpha(opacity:0);opacity:0}\
.selfilemask input{position:absolute;right:0;height:21px;cursor:pointer}\
.themebg_set{width:267px;margin:15px auto 0;}\
.themebg{float:left;position:relative;width:106px;height:106px;padding:2px;border:2px solid #32A1CC}\
.themebg .nobg{cursor:default;height:106px;color:#999;line-height:106px;text-align:center;background-color:#EFEFEF}\
.themebg .loading{padding-left:16px;background-position:20% 50%}\
.themebg .imgbg{width:106px;text-align:center;overflow:hidden}\
.themebg .imgbg img{height:106px}\
.themebg .del{position:absolute;top:0;right:0;width:18px;height:18px;background-position:-35px -124px}\
.bgSetting{float:right;width:143px;padding-top:38px}\
.bgPosition{width:150px;height:22px;margin:5px 0;background-position:0 -168px}\
.bgPosition a{display:inline-block;width:38px;height:19px;padding-top:1px;margin:1px;color:#333;line-height:19px;text-align:center; vertical-align:middle;}\
.bgPosition a:hover{text-decoration:none;background-color:#FDFDFD}\
.bgPosition a.select,.bgPosition a.select:hover{color:#fff;background-position:-64px -145px}\
.bgSetting label{margin-right:8px;white-space:nowrap}\
.themecolorWrap{position:relative;float:right;width:252px;height:203px;padding:0 4px 0 9px;border:1px solid #DFDFDF}\
.themecolorWrap h4{height:24px;padding-top:3px}\
.themePreview{float:left;width:134px}\
.D2 .colorBox{height:29px;padding-left:1px}\
.D2 .color{display:inline-block;width:16px;height:16px;padding:3px;background-position:0 -192px}\
.D2 .colorBox .select{position:relative;background-position:-24px -192px}\
.TpreviewBox{width:112px;height:110px;overflow:hidden;*zoom:1;padding:10px;border:1px solid #DFDFDF}\
.Tmain,.Tface{background:#fff url(http://mat1.gtimg.com/www/mb/images/skinFixmod.png) no-repeat}\
.Tmain{float:left;width:77px;height:110px;margin-right:-1px}\
.Tside{float:right;width:34px;height:110px;}\
.TUIn{width:28px;padding:6px 3px 2px;overflow:hidden;*zoom:1}\
.Tface{float:left;width:14px;height:14px;margin-bottom:4px;background-position:-81px 0}\
.Tnums{float:right;width:12px}\
.Tside .textColor{width:12px;height:3px;overflow:hidden;margin-bottom:1px;background:#9C000D}\
.Tside .linkColor{clear:both;width:50%;height:2px;overflow:hidden;margin-bottom:2px;background:#FFA869}\
.Tside .sepLine{height:0;overflow:hidden;border:1px solid;border-width:1px 0}\
.TsideMod{width:28px;margin:4px auto}\.TsideMod .textColor{margin-bottom:3px}\
.TsideMod .linkColor{width:16px}\
.ThotList .SA{z-index:0;left:0;top:-5px;*top:-6px;_top:-5px}\.ThotList .SA *{width:18px;height:5px}\.ThotList .SA span{left:0;top:1px}\
.ThotList{margin-top:3px;height:12px}\
.palettelist{float:right;position:relative;width:108px;overflow:hidden}\
.paletteWrap{height:142px;width:1000px;overflow:hidden}\
.paletteWrap li{float:left;width:108px}\
.palettes,.palettes *{display:block;height:27px;overflow:hidden;}\
.palettes{position:relative;float:left;width:48px;padding:3px;margin:4px 0 10px;cursor:pointer}\
.palettes .c{float:left;width:8px}\
.palettes .mask{position:absolute;top:0;left:0;clear:both;width:54px;height:33px;background-position:0 -218px}\
.paletteWrap .select .mask{background-position:-56px -218px}\
.D2 .themeDiy .pages{position:absolute;right:4px;bottom:15px;clear:both;width:108px;height:16px;overflow:hidden;padding:0;border:none}\
.themeDiy .pages *{float:left;margin:0}\
.themeDiy .pages a{width:20px;height:16px;background-position:-74px -124px}\
.themeDiy .pages .btn_prev_disabled{background-position:-59px -124px;cursor:default}\
.themeDiy .pages .btn_next{background-position:-102px -124px}\
.themeDiy .pages .btn_next_disabled{background-position:-87px -124px;cursor:default}\
.themeDiy .pageInfo{width:68px;text-align:center}\
.themeHisWrap{position:absolute;left:15px;bottom:13px;*bottom:17px;height:24px;overflow:hidden;*zoom:1;line-height:25px}\
.themeHis{float:left;width:16px;height:16px;padding:2px;margin:1px 2px;overflow:hidden;border:1px solid #DFDFDF;background-position:center top;cursor:pointer}\
.themeHis .Tmain{filter:alpha(opacity=10);opacity:0.1;width:9px;height:16px;background:#fff}\
.themeHis .Tside{width:6px;height:16px}\
.themeHisWrap .select{margin:0 1px;border:2px solid #32A1CC}\
.colorPickerPosition{position:absolute;height:0;margin:-31px 0 0 -222px}');

		// Tips Style
		UI
				.css('#headWrap{z-index:10}.settingTips{position:absolute;z-index:999;top:30px;right:-32px;width:200px;padding:12px 30px 10px 46px;font-size:14px;border:1px solid #F0E5BA;background:#FFFFE9}.settingTips .close{position:absolute;float:none;margin-top:-2px;right:10px}.settingTips .links{text-align:right}.settingTips .SA{position:absolute;top:-9px;left:130px}.settingTips .SA em,.settingTips .SA span{width:17px;height:8px;color:#F0E5BA}.settingTips .SA span{top:1px;left:0;color:#FFFFE9}.settingTips .links a{font-size:12px;margin:3px 0 0 20px;color:#2B4A78;text-decoration:underline}.settingTips .ico_light{position:absolute;left:14px}.arrowBot .SA{top:auto;bottom:9px}.arrowBot{font-size:12px}.arrowBot .SA em,.arrowBot .SA span{height:19px}.arrowBot .SA span{top:-1px}');
		Self._tip = UI
				.html('<div class="settingTips arrowBot" style="display:none"><a href="#" class="close" onclick="UI.hide(MI.Theme._tip);MI.Bos(\'btnThemeTipClose\');return false">' + _('关闭') + '</a><div class="SA"><em>◆</em><span>◆</span></div><div class="cntBox"><div class="ico ico_light"></div><p>' + _('还差<span class="collegeStepNum">N</span>步就可以领取纪念版皮肤了，<br/>去页面左侧的广播学院继续努力吧！') + '</p><p class="links" style="display:none"><a href="#">' + _('现在就去设置') + '</a><a href="#">' + _('我知道了') + '</a></p></div></div>')[0];
		Self._tipNum = $$(Self._tip, '.collegeStepNum')[0];
		UI.append(Self._tip, document.body);
		UI.EA(document.body, 'mousedown', function() {
					UI.hide(Self._tip);
				});
		Self._tip.onclick = function(e) {
			UI.E(e).stop();
		}

		Self.dialog = new MI.Dialog({
			tmpl : '<div class="D2">'
					+ (UI.B.ie6
							? '<iframe src="javascript:false;" class="cover_select"></iframe>'
							: '')
					+ '<div class="bg"></div><div class="CR"><div class="DWrap"><div class="DTitle"></div><a title="' + _('关闭') + '" class="DClose close" href="#">' + _('关闭') + '</a><div class="DLoad"></div><div class="DCont"></div></div></div>'
		});
		UI.hide(Self.dialog._bg);
		UI.C(Self.dialog._body, 'width', '0');
		UI.C(Self.dialog._body, 'height', '0');
		$$(Self.dialog._body, '.DClose')[0].onclick = function() {
			Self._cancel.onclick();
			return false;
		}

		// Talk Box
		Self._talkBox = UI
				.html('<div class="talkWrap" style="display:none"><div class="SA"><em>◆</em><span>◆</span></div><div class="top"><span class="left"><span class="replyTitle">' + _('让大家来看看你换的新皮肤') + ':</span></span></div><div class="cont"><textarea class="inputTxt noAutoComplete"></textarea></div><div class="bot" style="margin:5px 0 7px"><input type="button" class="inputBtn sendBtn"/><span class="countTxt">' + _('还能输入<em>140</em>字') + '</span></div><div style="display: none;" class="talkSuc"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg" id="msg"></span></div></div>')[0];
		Self.talkBox = new MI.TalkBox(Self._talkBox);
		Self.talkBox.txtTipSend = _('发送中');
		Self.talkBox.successStart = function() {
			MI.dialog.showTip({
						html : _('发送成功!')
					});
		}

		var position = Self.getPosition();
		Self.dialog.show({
			title : Self.title,
			// html : '<div style="height:300px"></div>',
			width : 590,
			height : 308,
			top : position[0],
			left : position[1]
				/**/
			});
		Self.load('/setting_theme_frame.php');
	},
	tipNum : function(num) {
		if (num) {
			this._tipNum.innerHTML = num;
		}
	},
	tipPosition : function(el) {
		UI.show(this._tip);
		if (el.className == 'themeCollegeTip') {
			this._tip.style.cssText = 'top:'
					+ (UI.getY(el) - UI.height(el) - 59) + 'px;left:'
					+ (UI.getX(el) - UI.width(el) / 2 + 20) + 'px';
		} else {
			this._tip.style.cssText = 'top:'
					+ (UI.getY(el) - UI.height(el) + 10) + 'px;left:'
					+ (UI.getX(el) - UI.width(el) / 2 - 10) + 'px';
		}
	},
	getPosition : function() {
		var headWrap = $('headWrap'), top = 0, left = 0, position = [0, 0];
		if (headWrap) {
			position[0] = UI.height(headWrap) - 7;
			position[1] = UI.getX(headWrap) - 1;
		}
		return position;
	},
	setPosition : function() {
		var position = this.getPosition(), wrap = this.dialog._wrap;
		wrap.style.top = position[0] + 'px';
		wrap.style.left = position[1] + 'px';
	},
	preview : function(id) {
		var Self = this, style = $('viewTheme'), curTheme = $('curTheme'), url = '/asyn/theme_preview.php?id='
				+ id;
		if (!style) {
			style = UI.DC('link');
			style.id = 'viewTheme';
			UI.A(style, 'type', 'text/css');
			UI.A(style, 'rel', 'stylesheet');
			UI.append(style, $$('head')[0]);
		}
		UI.getCss(url, function() {
					Self.setPosition();
				}, style);
		if (curTheme) {
			UI.remove(curTheme);
			Self.setPosition();
		}
		Self.themeId = id;
		MI.Bos('btnThemePreview',id);
	},
	load : function(url) {
		var Self = this;
		Self.dialog.showLoad();
		if (Self.xhr) {
			Self.xhr.abort();
		}
		if (Self.themeId) {
			url += '&curId=' + Self.themeId;
		}
		Self.xhr = UI.get(url + (url.hasString('?') ? '' : '?') + '&r='
						+ MI.random(), '', function(data) {
					if (data != '') {
						if (!Self.loadError) {
							Self.dialog._cont.innerHTML = data;
							Self.addEvent();
							UI.C(Self.dialog._cont, 'height', '');
						}
						UI.evalScript(data);
						Self.loadError = 0;
					}
					Self.dialog.hideLoad();
				});
		UI.remove(Self._diyStyle);
		if (Self._diyImageUpload) {
			UI.remove(Self._diyImageUpload.parentNode.parentNode);
		}
		Self.diyTimes = -1;
		Self._diyBody = null;
		MI.Bos('btnThemePage');
	},
	loadError : 0,
	save : function() {
		var Self = this, cont = Self.dialog._cont, selected = Self.themeId, url, data = {};
		if (selected || Self._diyBody) {
			if (Self.xhr) {
				Self.xhr.abort();
			}
			if (Self._diyBody) { // 自定义皮肤
				url = 'http://upload.t.qq.com/asyn/saveSkin.php';
				data = Self.diyPreview(1);
				var index = 0;
				for (var i in data) {
					Self._diySaveFormInput[index].value = data[i];
					index++;
				}
				Self._diySaveForm.submit();
			} else {
				url = '/asyn/theme_save.php';
				data.id = selected;
				Self.xhr = UI.ajax({
							url : url,
							data : data,
							success : function(data) {
								data = MI.json(data);
								Self.saveSuccess(data);
							}
						});
			}
			Self.dialog.showLoad();
		} else {
			Self.hide();
		}
	},
	saveSuccess : function(data) {
		var Self = this;
		if (MI.code.check(data.result)) { // Verify code
			MI.code.show({
						msg : data.msg,
						code : data.info,
						call : function(code) {
							Self._diySaveFormCode.value = code;
							Self.save();
						}
					});
		} else if (data.result == 0) {
			/*
			 * MI.confirm({ type : 'success', title : '皮肤保存成功', content :
			 * '发送一条广播，让大家来看看你换的新皮肤吧！', confirm : function(){
			 * Self.talk($$(selected,'.tempName')[0].innerHTML); } });
			 * Self.hide();
			 */
			Self.dialog.hide();
			MI.tip(_('保存成功！'), function() {
						Self.diyTimes = 0;
						Self.goHome();
					});
		} else {
			MI.alert(data.msg);
		}
		Self.dialog.hideLoad();
	},
	talk : function() {
		var Self = this;
		MI.dialog.show({
					html : Self._talkBox,
					width : 500
				});
		Self.talkBox._txt.value = _('我换了新皮肤“{0}”，快来我的主页看看吧！',Self.themeName)
				+ 'http://t.qq.com/' + MI.user.account;
		setTimeout(function() {
					var len = Self.talkBox._txt.value.length;
					Self.talkBox._txt.focus();
					MI.selectTxt(Self.talkBox._txt, len, len, len);
					Self.talkBox.countTxt();
				}, 0);

		MI.Bos('btnThemeTalk');
		/*
		 * if (!Self.talk.sending) { UI.ajax({ url : '/publish.php', data : {
		 * content : '我换了新皮肤“' + name + '”，快来我的主页看看吧！' + 'http://t.qq.com/' +
		 * MI.user.account, countType : '', viewModel : 0 }, success :
		 * function(data){ document.location.href = '/' + MI.user.account; } }); }
		 * this.talk.sending = 1;
		 */
	},
	addEvent : function() {
		var Self = this, cont = Self.dialog._cont, list = $$(cont,
				'.DtempList li'), link = $$(cont, '.DtabTitle li a,.pages a'), btnSave = $$(
				cont, '.btn_save')[0], btnCancel = $$(cont, '.btn_cancel')[0], themeCollegeTip = $$(
				cont, '.themeCollegeTip')[0], themeTalk = $$(cont, '.themeTalk')[0];
		UI.each(list, function(o) { // Theme List
					if (UI.hasClass(o, 'locked')) {
						o.onclick = function() {
							Self.tipPosition(this);
							Self.showCollege();
						}
					} else {
						o.onmouseover = function() {
							UI.addClass(this, 'hover');
						}
						o.onmouseout = function() {
							UI.removeClass(this, 'hover');
						}
						o.onclick = function() {
							var cur = $$(cont, '.DtempList .select')[0], themeId = UI
									.A(this, 'themeId');
							if (cur) {
								UI.removeClass(cur, 'select');
							}
							UI.addClass(this, 'select');
							Self.preview(themeId);
							Self.themeId = themeId;
						}
					}
				});
		UI.each(link, function(o) { // Load Page
					var href = UI.A(o, 'href');
					o.onclick = function() {
						if (href && !href.hasString('#')
								&& !UI.hasClass(o, '.disabled')) {
							Self.load(href);
						}
						return false;
					}
				});
		if (btnSave) { // Save
			btnSave.onclick = function() {
				Self.save();
			}
		}
		if (btnCancel) { // Cancel
			btnCancel.onclick = function() {
				Self.hide();
			}
		}
		if (themeCollegeTip) { // Tip
			themeCollegeTip.onclick = function(e) {
				Self.tipPosition(this);
				Self.showCollege();
				UI.E(e).stop();
			}
		}
		if (themeTalk) { // Talk
			UI.EA(themeTalk, 'click', function() {
						Self.talk();
					});
		}
		Self._save = btnSave;
		Self._cancel = btnCancel;

		window.onbeforeunload = function() {
			if (Self.diyTimes > 0) {
				return _('自定义皮肤尚未保存，确定离开？');
			}
		}
		/*
		 * document.body.onclick = function(e){ var E = UI.E(e);
		 * console.log(E.target.nodeName); if (Self.diyTimes > 0) { if
		 * (!confirm('自定义皮肤尚未保存，确定离开？')) { E.stop(); E.prevent(); return false; } } }
		 */
	},
	goHome : function() {
		document.location.href = '/' + MI.user.account;
	},
	showCollege : function() {
		if (MI.College) {
			MI.S('tips_collegeStep_' + MI.user.account, 1);
			MI.College._openCont.onclick();
			MI.College.showStep = 0;
		} else {
			UI.getScript(MI.version.College, function() {
						MI.College.build();
						MI.College._openCont.onclick();
						MI.College.showStep = 0;
					});
		}
	},
	show : function() {
		UI.show(this.dialog._body);
		this.dialog.display = 1;
	},
	hide : function() {
		var Self = this;
		Self.dialog.hide();
		if (Self.themeId) {
			/*
			 * MI.confirm({ type : 'error', title : '是否保存当前选中的皮肤？', confirm :
			 * function(){ Self.save(); }, cancel : function(){ Self.goHome(); }
			 * });
			 */
			Self.goHome();
		}
	},
	_diyImage : null, // 背景图片
	_diyImageUpload : null, // 背景图片上传
	_diyImageForm : null, // 背景图片上传表单
	_diyImageLoading : null, // 背景图片上传中
	_diyImageWrap : null, // 背景图片框
	_diyImageEmpty : null, // 无背景图片
	_diyImagePosition : null, // 背景图片
	_diyImageRepeat : null, // 背景图片
	_diyColor : null, // 色块
	_diyColors : null, // 色块组
	_diyStyle : null, // 样式
	// _diyColorPreview : [],
	diyTimes : 0, // 自定义预览次数
	diyId : 0, // 自定义皮肤ID
	diy : function() { // 自定义皮肤
		var Self = this, delay;

		// Dom
		Self._diyBody = $$('.themeDiy')[0];
		Self._diyImage = $$(Self._diyBody, '.imgbg img')[0];
		Self._diyImageForm = $$(Self._diyBody, '.themebgWrap form')[0];
		Self._diyImageInput = $$(Self._diyBody, '.themebgWrap form input');
		Self._diyImageBtn = Self._diyImageInput[0];
		Self._diyImageWidth = Self._diyImageInput[1];
		Self._diyImageCode = Self._diyImageInput[2];
		Self._diyImageUpload = $$(Self._diyBody, '.selfilemask input')[0];
		Self._diyImageWrap = $$(Self._diyBody, '.themebg .imgbg')[0];
		Self._diyImageEmpty = $$(Self._diyBody, '.themebg div')[0];
		Self._diyImageLoading = $$(Self._diyBody, '.themebg div')[1];
		Self._diyImagePosition = $$(Self._diyBody, '.bgPosition')[0];
		Self._diyImageRepeat = $$(Self._diyBody, '.bgSetting input');
		Self._diyImageDel = $$(Self._diyBody, '.imgbg .del')[0];
		Self._diySaveForm = $('diySaveForm');
		Self._diySaveFormInput = $$(Self._diySaveForm, 'input');
		Self._diySaveFormCode = Self._diySaveFormInput[Self._diySaveFormInput.length
				- 1];
		Self._diyColor = $$('.themePreview .colorBox a');
		Self._diyColors = $$('.palettelist .palettes');
		Self._diyColorPickerPosition = $$('.colorPickerPosition')[0];
		if (!Self._diyStyle) {
			Self._diyStyle = UI.DC('style');
			UI.A(Self._diyStyle, 'type', 'text/css');
		}
		UI.append(Self._diyStyle, UI.GT(document, 'head')[0]);
		UI.append(Self._diyImageUpload.parentNode.parentNode, document.body);

		// Event
		UI.each(Self._diyColor, function(o, i) {
			if (i == 0) {
				// Self._diyColorPreview[0] =
				// [document.body,$$('.TpreviewBox')[0],o];
			}
			o.onclick = function(e) {
				var T = this, E = UI.E(e);
				UI
						.removeClass($$(Self._body, '.colorBox .select')[0],
								'select');
				UI.addClass(T, 'select');
				UI.ColorPicker.show(E, {
							title : UI.A(o, 'colorName'),
							position : Self._diyColorPickerPosition,
							hide : function() {
								UI.removeClass(T, 'select');
							},
							drag : function(value) {
							},
							stop : function(value) {
								T.style.cssText = '*zoom:1;background-color:'
										+ value;
								UI.A(T, 'rel', value);
								Self.diyPreview();
								UI.removeClass($$(Self._diyBody,
												'.palettelist .select')[0],
										'select');
								UI.removeClass($$(Self._diyBody,
												'.themeHisWrap .select')[0],
										'select');
							}
						});
				MI.Bos('btnThemeDiyColor');
				return false;
			}
			UI.A(o, 'colorName', o.title);
				// o.title = '';
			});
		UI.each(Self._diyColors, function(o) { // 设置颜色
					o.onclick = function() {
						UI.removeClass(
								$$(Self._diyBody, '.palettelist .select')[0],
								'select');
						UI.addClass(this, 'select');
						UI.each($$(this, '.c'), function(el, i) {
							var value = UI.A(el, 'rel');
							Self._diyColor[i].style.cssText = '*zoom:1;background-color:'
									+ value;
							UI.A(Self._diyColor[i], 'rel', value);
						});
						Self.diyPreview();
						UI.removeClass($$(Self._diyBody,
										'.themeHisWrap .select')[0], 'select');
						MI.Bos('btnThemeDiyColors');
					}
				});
		UI.each($$(Self._diyImagePosition, 'a'), function(o) { // 设置背景位置
					o.onclick = function() {
						var cur = $$(this.parentNode, '.select')[0];
						UI.removeClass(cur, 'select');
						UI.addClass(this, 'select');
						Self.diyPreview();
						return false;
					}
				});
		UI.each(Self._diyImageRepeat, function(o) { // 设置背景平铺
					o.onclick = function() {
						Self.diyPreview();
					}
				});
		UI.each($$(Self._diyBody, '.themeHisWrap .themeHis'), function(o) { // 选择颜色组
					o.onclick = function() {
						// pic=""
						// color="#ebeae8|#F04842|#CBDB82|#342220|#FE9C7A|#FE9C7A"
						// fix="0" pos="0" flat="0"
						UI.removeClass($$(this.parentNode, '.select')[0],
								'select');
						Self.diyHistory({
									pic : UI.A(this, 'pic'),
									color : UI.A(this, 'color'),
									fix : UI.A(this, 'fix'),
									pos : UI.A(this, 'pos'),
									flat : UI.A(this, 'flat')
								});
						UI.addClass(this, 'select');
						UI.removeClass(
								$$(Self._diyBody, '.palettelist .select')[0],
								'select');
					}
				});
		Self._diyImageDel.onclick = function() { // 删除图片
			Self.diyId = 0;
			UI.hide(Self._diyImageWrap);
			UI.show(Self._diyImageEmpty);
			UI.A(Self._diyImage, 'src', '');
			Self.diyPreview();
			MI.Bos('btnThemeDiyPicDel');
			return false;
		}
		Self._diyImageForm.onsubmit = function() { // 上传图片
			if (!Self._diyImageBtn.value) {
				return false;
			}
		}
		Self._diyImageUpload.onchange = function() {
			var fileName = this.value, fileType;
			if (fileName) {
				fileType = fileName.substring(fileName.lastIndexOf('.') + 1,
						fileName.length).toLowerCase()
				if(Self.enAblegif) {
					if (!'jpg,jpeg,png,gif'.hasString(fileType)) {
						MI.alert(_('仅支持gif、jpg、jpeg、png图片文件'));
						return false;
					}
				}
				else {
					if (!'jpg,jpeg,png'.hasString(fileType)) {
						MI.alert(_('仅支持jpg、jpeg、png图片文件'));
						return false;
					}
				}
				UI.A(Self._diyImageForm,'action',Self.diyImageFormActoin + '?width=' + Self._diyImageWidth.value + '&code=' + Self._diyImageCode.value);
				Self._diyImageForm.submit();
				UI.show(Self._diyImageLoading);
				UI.hide(Self._diyImageWrap);
				UI.hide(Self._diyImageEmpty);
				MI.Bos('btnThemeDiyPicUpload');
			}
		}

		Self.diyPreview();
		MI.app({
			Slide : function() {
				MI.slideTheme = new MI.Slide({
					target : $('palettelist'),
					call : function() {
						$$(Self._diyBody, '.pageInfo')[0].innerHTML = MI.slideTheme.cur
								+ '/' + MI.slideTheme.total;
						if (MI.slideTheme.cur == MI.slideTheme.total) {
							UI.addClass(MI.slideTheme._next,
									'btn_next_disabled');
						} else {
							UI.removeClass(MI.slideTheme._next,
									'btn_next_disabled');
						}
						if (MI.slideTheme.cur == 1) {
							UI.addClass(MI.slideTheme._prev,
									'btn_prev_disabled');
						} else {
							UI.removeClass(MI.slideTheme._prev,
									'btn_prev_disabled');
						}

					}
				});
				MI.slideTheme.loop = 0;
				MI.slideTheme.page(1);
			}
		});
		
		Self.diyImageFormActoin = UI.A(Self._diyImageForm,'action');
		Self._diyImageWidth.value = window.screen.width;
	},
	addPic : function(obj) {
		// {result:0,msg:'成功',info:{pic:"http://upload.t.qq.com/picture/20110113/11/1f6720529ab11d6e5331916addaf3110.png",host:"upload1.t.qq.com"}}
		var Self = this;
		if (obj.result == -100) { // Verify code
			MI.code.show({
						msg : obj.msg,
						code : obj.info,
						call : function(code) {
							Self._diyImageCode.value = code;
							Self._diyImageUpload.onchange();
						}
					});
		} else if (obj.result == 0) {
			Self.diyData = {};
			UI.A(Self._diyImage, 'src', '');
			Self._diyImage.onload = function() {
				UI.show(Self._diyImageWrap);
				UI.hide(Self._diyImageLoading);
				UI.hide(Self._diyImageEmpty);
				Self.diyPreview();
				Self._diyImageForm.reset();
				Self._diyImageCode.value = '';
			}
			if (UI.isString(obj.info)){
				Self._diyImage.src = obj.info;
			}
			else {
				Self._diyImage.src = obj.info.pic;
				UI
						.A(Self._diySaveForm, 'action', 'http://'
										+ (obj.info.host
												? obj.info.host
												: 'upload.t.qq.com')
										+ '/asyn/saveSkin.php');
			}
			Self.diyId = 0;
		} else {
			MI.alert(obj.msg);
			UI.hide(Self._diyImageLoading);
			if (UI.A(Self._diyImage, 'src')) {
				UI.show(Self._diyImageWrap);
			} else {
				UI.show(Self._diyImageEmpty);
			}
			Self._diyImageForm.reset();
		}
	},
	diyCss : '.TpreviewBox{background-color:<%=color_0%>}\
.Tside{border-left:1px solid <%=color_5%>;background-color:<%=color_1%>}\
.Tside .sepLine{border-top-color:<%=color_5%>;border-bottom-color:<%=color_4%>}\
.Tside .textColor{background:<%=color_2%>}\
.Tside .linkColor{background:<%=color_3%>}\
.ThotList{border:1px solid <%=color_5%>;background:<%=color_4%>}\
.ThotList .SA em{color:<%=color_5%>}\
.ThotList .SA span{color:<%=color_4%>}\
.themebg .imgbg{background-color:<%=color_0%>}\
body{background:url(<%=image%>) <%=color_0%> <%=imagePosition%> 0 <%=imageRepeat%> <%=imageAttachment%>}\
.topMenu,.SM li,.SC .btn,.dotList .dot{background:none}\
#logo a,.SM i{background-image:url(http://mat1.gtimg.com/www/mb/images/theme/b3_110107.png);_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=crop,src="http://mat1.gtimg.com/www/mb/images/theme/b3_110107.png")}\
#talkBox .cntBox textarea,#talkBox .txtShadow{border-color:#D0D0D0}\
#talkBox .cntBox textarea.focus{border-color:#A8A8A8;-moz-outline-color:#E4E4E4;-webkit-box-shadow:0 0 10px rgba(219,219,219,.6)}\
.SM li a.newNum{color:#f00}\
.FTL li em,.hotTopicList li em{color:#999}\
.SM .index i,.topicIntro .top{display:none}\
.SC a.btn em,.topicIntro .SA{display:block}\
#mainWrapper{background:<%=color_1%>}\
.main{border-right:1px solid <%=color_5%>}\
.SC{border-top-color:<%=color_5%>}\
.SC h3,.proposal,.SM{border-top-color:<%=color_4%>}\
.side,.SC h3 a,#UIn .nums a{color:<%=color_2%>}\
.topMenu a,#nav a,.side a,.proposal,.SC h3 a strong,#UIn .nums a strong{color:<%=color_3%>}\
.SM i{display:block;position:absolute;top:0;left:0;z-index:-1;width:200px;height:1px;overflow:hidden;_padding-top:50px;_margin-top:-50px;background-position:0 -50px}\
.SM li:hover i,.SM li.hover i{left:1px;display:block;height:33px;background-position:0 -55px;_padding-top:55px;_margin-top:-55px;border-bottom:1px solid <%=color_1%>}\
.SM li.current{width:201px;background:none!important}\
.SM li.current i,.SM li.current:hover i{display:block;left:0;top:1px;width:199px;height:31px;margin:0;padding:0;border:1px solid <%=color_5%>;border-left-color:#fff;background:#fff;_filter:none}\
.side .foFun{background:<%=color_5%>;color:#fff}\
.side .qqFriend .disabled,.side .knownInfo .disabled{background:none;color:#999}\
.mobileBox,.vDateBox,.topicIntro a,.topicIntro a:hover{border:1px solid <%=color_5%>;background:<%=color_4%>;color:#333}\
.mobileBox a,.vDateBox a{color:#2B4A78}\
.HT .side .SA em,.topicIntro .SA em{color:<%=color_5%>}\
.topicIntro .SA span{color:<%=color_4%>}\
.topicIntro .middle em{visibility:hidden}\
#Copyright .wrapper,#Copyright .wrapper a{color:<%=color_2%>}\
	',
	diyData : {},
	diyHistory : function(obj) {
		var Self = this, position = [0, 0, 1, 2], color = obj.color.split('|');
		UI.show(Self._diyImageWrap);
		UI.hide(Self._diyImageLoading);
		UI.hide(Self._diyImageEmpty);
		UI.A(Self._diyImage, 'src', obj.pic);
		Self._diyImageRepeat[0].checked = obj.flat ? true : false;
		Self._diyImageRepeat[1].checked = obj.fix ? true : false;
		UI.removeClass($$(Self._diyImagePosition, '.select')[0], 'select');
		UI.addClass($$(Self._diyImagePosition, 'a')[position[obj.pos]],
				'select');
		UI.each(Self._diyColor, function(o, i) {
					UI.A(o, 'rel', color[i]);
					UI.C(o, 'background-color', color[i]);
				});
		Self.diyPreview();
	},
	diyPreview : function(save) {
		/*
		 * /asyn/saveSkin.php file_name : 上传皮肤 pic_name : 图片url pos : 位置 0 无效
		 * 1居左 2 居中 3居右 flat ：0 不平铺 1 平铺 fix ： 0 不固定 1 固定 color : 字符串，以|分隔
		 */
		var Self = this, data = {}, viewTheme = $('viewTheme'), curTheme = $('curTheme'), position = [
				'', 'left', 'center', 'right'];
		if (!save) {
			Self.diyTimes++;
		}
		if (curTheme) {
			UI.remove(curTheme);
		}
		if (viewTheme) {
			UI.remove(viewTheme);
		}
		if (save) {
			data.id = Self.diyId || '';
			data.pic_name = (UI.A(Self._diyImage, 'src') || '').replace(
					'http://mat1.gtimg.com', '').replace('http://t.qq.com', '');
			var curPosition = $$(Self._diyImagePosition, '.select')[0];
			data.pos = curPosition ? UI.A(curPosition, 'rel') : 0;
			data.flat = Self._diyImageRepeat[0].checked ? 1 : 0;
			data.fix = Self._diyImageRepeat[1].checked ? 1 : 0;
			data.color = [];
			UI.each(Self._diyColor, function(o, i) {
						data.color.push(UI.A(o, 'rel'));
					});
			data.color = data.color.join('|');
			for (var i in Self.diyData) {
				data[i] = Self.diyData[i];
			}
		} else {
			UI.each(Self._diyColor, function(o, i) {
						data['color_' + i] = UI.A(o, 'rel');
					});
			data.image = UI.A(Self._diyImage, 'src');
			var curPosition = $$(Self._diyImagePosition, '.select')[0];
			data.imagePosition = position[curPosition ? UI
					.A(curPosition, 'rel') : 0];
			data.imageRepeat = Self._diyImageRepeat[0].checked
					? 'repeat'
					: 'no-repeat';
			data.imageAttachment = Self._diyImageRepeat[1].checked
					? 'fixed'
					: '';
		}
		if (save) {
			return data;
		}
		UI.css(new UI.tmplString(Self.diyCss)(data), Self._diyStyle);
	},
	diyImageUploadBtn : function(e, target) {
		var Self = this, E = UI.E(e);
		Self._diyImageUpload.parentNode.parentNode.style.cssText = 'top:'
				+ (E.y - 10 + UI.scrollY()) + 'px;left:' + (E.x - 10) + 'px;';
	}
}