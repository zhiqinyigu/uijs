/**
 * MI.Face Author : xhlv@tencent.com Datetime : Last Eidt:
 */
/**
 * MI.Face 头像交互
 * 
 * @namespace MI.Face 头像交互
 * @type Object
 */
MI.Face = {
	css : '.setFaceSuc{width:390px;padding:5px 0;background:#fff}\
		.sucTips{width:358px;margin:0 auto 20px}\
		.sucTips .userPic{padding:0 25px 0 0}\
		.sucTips .left{float:left;width:280px;padding-top:10px;font:normal 18px/29px "MicroSoft YaHei","SimHei"}\
		.sucTips .ico_tsW{margin-top:5px;margin-left:0}\
		.setFaceSuc .talkWrap{width:370px;padding:9px 10px 0;border-top:1px solid #E5E5E5}\
		.setFaceSuc .talkWrap .inputTxt{width:358px;height:55px}\
		.cusHisface{width:464px;padding-top:22px}\
		.cusFaceList{display:none;width:456px;margin:15px 0 20px 9px}\
		.cusFaceList li{float:left;width:48px;height:48px;margin-right:9px;text-align:center}\
		.cusFaceList img{width:40px;height:40px;margin-top:1px;padding:2px;border:1px solid #D2D2D2;background:#fff;cursor:pointer}\
		.cusFaceList li.select img{border:2px solid #32A1CC;margin:0}\
		.cusFaceList li.nohisFace img{border-style:dashed;cursor:default}\
		.faceViewBox,.faceView p{width:464px;overflow:hidden}.faceView{width:3712px;white-space:nowrap}\
		.faceViewBox{margin-bottom:20px}\
		.faceView p{float:left;text-align:center;background:url(http://mat1.gtimg.com/www/mb/images/loading.gif) no-repeat 50% 50%;height:300px}.faceView img{}\
		.cusHisface .talkWrap{display:none;padding:9px 10px 0;border-top:1px solid #E5E5E5}',
	_preload : UI.html('<div style="display:none"></div>')[0],
	_talkBox : UI
			.html('<div class="setFaceSuc">\
		<div class="sucTips clear"><div class="userPic"><img></div><div class="left"><span class="ico_tsW"><span class="ico_ts"></span></span>' + _('修改头像成功！') + '</div></div>\
		'
					+ MI.tmpl.reply + '\
		</div>')[0],
	_picBox : UI
			.html('<div class="cusHisface">\
		<div class="faceViewBox"><div class="faceView"><p><a target="_blank"><img onload="var t=this;setTimeout(function(){ UI.show(t);if(t.width>460){t.height=460/t.width*t.height;t.width=460}if(t.height>300){t.width=300/t.height*t.width;t.height=300}if(t.height>0&&t.height<300){t.style.marginTop=150 - t.height / 2 + \'px\'} },0);"></a></p></div></div>\
		<div class="cusFaceList"><ul class="clear"></ul></div>\
		'
					+ MI.tmpl.reply + '\
		</div>')[0],
	talkBox : null, // Talk Box
	data : [],
	delay : null,
	shareTxt : [_('#露个脸#黄瓜必须拍，人生必须嗨，头像必须晒！我刚换了头像，你看给力么？也来说几句吧~'),
			_('#露个脸#我刚换了头像，如果你来看我，我就在你眼里，头像神马的才不是浮云！'),
			_('#露个脸#虽不能以貌取人，但我可以相会友。我刚换了头像，等你来围观！'),
			_('#露个脸#有图有真相，大图才有大真相！我刚换了头像，点击看大图给你我的真面目！')],
	curPic : null, // Current Pic Url
	curIndex : 0, // Current Pic Index
	pic : function(id, size) {
		if (id.hasString('mat1.gtimg.com')) {
			return id + '/head_120.jpg';
		}
		return id + '/' + size;
	},
	picNum : 0, // 头像个数
	isPriv : 0, // 是否公开历史头像
	priv : function(el) { // 设置是否公开历史头像
		UI.ajax({
					url : '/asyn/userBitAttrSave.php',
					data : {
						t : 100,
						v : el.checked ? 1 : 0
					},
					success : function(data) {
						data = MI.json(data);
						if (data.result == 0) {

						}
					}
				});
		Self.isPriv = !Self.isPriv;
	},
	save : function(el) { // 保存历史头像
		var Self = this;
		Self.curPic = UI.A(el, 'src').replace(/\/[^\/]+$/g, '');

		var select = $$(el.parentNode.parentNode, '.select')[0];
		if (select) {
			UI.removeClass(select, 'select');
			select.title = '';
		}

		UI.addClass(el.parentNode, 'select');
		el.title = _('正在保存...');

		UI.ajax({
					url : '/asyn/historyFace.php',
					data : {
						picUrl : Self.curPic
					},
					success : function(data) {
						data = MI.json(data);
						if (data.result == 0) {
							el.title = '';
							Self.saveSuccess();
						} else {
							MI.tip(data.msg);
						}
					}
				});
	},
	saveSuccess : function() { // 保存成功，分享自己的头像
		var Self = this;
		if (!Self.talkBox) {
			Self.talkBox = new MI.TalkBox(Self._talkBox);
			Self.talkBox.sourcePic = Self.curPic + '/0';
			$$(Self.talkBox._body, '.replyTitle')[0].innerHTML = _('也来<a href="/k/露个脸" target="_blank">#露个脸#</a>，发条广播把头像分享给你的听众吧 ：）');
			Self.talkBox.successStart = function() {
				MI.tip(_('发表成功'));
			}
			var curPic = $$(Self.talkBox._body, '.sucTips .userPic img')[0];
			if (Self.curPic) {
				UI.show(curPic);
				UI.A(curPic, 'src', Self.curPic + '/50');
			} else {
				UI.hide(curPic);
			}
			UI.css(Self.css);
		}
		MI.dialog.show({
					title : '',
					html : Self._talkBox,
					start : function() {
						setTimeout(function() {
									var num = Self.shareTxt.length - 1;
									Self.talkBox._txt.value = Self.shareTxt[UI
											.random(0, num)]
											+ (Self.picNum > 0 && !Self.isPriv
													? _('更多我的头像在这里')
													: '')
											+ 'http://t.qq.com/'
											+ MI.user.account + '?face';
									//MI.focus(Self.talkBox._txt);
									Self.talkBox.countTxt();
								}, 0);
					},
					end : function() {
						document.location.reload();
					}
				});
	},
	view : function(el) { // 查看客人页大头像
		var Self = this;
		Self.curPic = UI.A(el, 'src').replace(/\/[^\/]+$/g, '');

		if (!Self.talkBox) {
			Self.talkBox = new MI.TalkBox(Self._picBox);
			Self.talkBox.sourcePic = Self.curPic + '/0';
			$$(Self.talkBox._body, '.replyTitle')[0].innerHTML = _('发表一下你对照片的看法吧：');
			Self.talkBox.successStart = function() {
				MI.tip(_('发表成功'));
			}
			Self.viewPic(Self.curPic);
			var html = [], empty, list = $$(Self.talkBox._body,
					'.cusFaceList ul')[0];
			if (Self.data && Self.data.length > 1) {
				UI.each(Self.data, function(o, i) {
							html.push('<li'
									+ (i == Self.curIndex
											? ' class="select"'
											: '') + '><img index="' + i
									+ '" onclick="MI.Face.viewOne(this)" src="'
									+ o + '/50"></li>');
						});
				empty = 8 - html.length;
				if (empty > 0) {
					for (var i = 0; i < empty; i++) {
						html
								.push('<li class="nohisFace"><img src="http://mat1.gtimg.com/www/mb/images/nohisFace.png"></li>');
					}
				}
				list.innerHTML = html.join('');
			} else {
				UI.hide(list);
			}
			UI.css(Self.css);
		} else {
			Self
					.viewOne($$(Self.talkBox._body, '.cusFaceList ul img')[Self.curIndex]);
		}

		MI.dialog.show({
					title : '',
					html : Self._picBox,
					width : 520,
					start : function() {
						setTimeout(function() {
									var num = Self.shareTxt.length - 1;
									/*
									 * Self.talkBox.topic = '更多@' +
									 * Self.viewUser + '的头像在这里http://t.qq.com/' +
									 * Self.viewUser + '?face';
									 */
									Self.talkBox._txt.value = _('#品头论像#一起来围观@{0}的头像~ ',Self.viewUser);
									//MI.focus(Self.talkBox._txt);
									Self.talkBox.countTxt();
								}, 0);
					},
					end : function() {

					}
				});
	},
	viewUser : null,
	viewOne : function(el) {
		if (el) {
			var Self = this, cur = $$(Self.talkBox._body,
					'.cusFaceList ul .select')[0];
			if (cur) {
				UI.removeClass(cur, 'select');
			}
			UI.addClass(el.parentNode, 'select');
			Self.curIndex = UI.A(el, 'index');
			Self.viewPic(Self.data[Self.curIndex]);
		}
	},
	viewPic : function(img) {
		var Self = this, pic = $$(Self.talkBox._body,
				'.faceViewBox .faceView img')[0];
		UI.hide(pic);
		if (img.hasString('mat1.gtimg.com')) {
			img = img + '/head_120.jpg';
		}
		else {
			img = img + '/0';
		}
		UI.C(pic, 'marginTop', '0');
		UI.A(pic, 'width', '');
		UI.A(pic, 'height', '');
		UI.A(pic, 'src', img);
		UI.A($$(Self.talkBox._body, '.faceViewBox .faceView a')[0], 'href', img);
		Self.talkBox.sourcePic = img;
	},
	preview : function(el) { // 客人页大头像预览
		var Self = this;
		if (el && Self.data) {
			Self.data.unshift(UI.A(el, 'src').replace(/\/[^\/]+$/g, ''));
			var length = Self.data.length - 1, html = [], x = UI.getX(el), y = UI
					.getY(el), X, Y, isMove;
			UI.each(Self.data, function(o) {
						html.push('<img src="' + Self.pic(o, 120) + '">');
					});
			if (html.length) {
				Self._preload.innerHTML = html.join('');
				UI.ready(function() {
							UI.append(Self._preload, document.body);
						});
				el.onmouseover = function() {
					var img = this;
					Self.delay = setInterval(function() {
								if (isMove) {
									Self.curIndex = UI.random(0, length);
									img.src = Self.pic(
											Self.data[Self.curIndex], 180);
								}
							}, 100);
				}
				el.onmousemove = function(e) {
					isMove = 1;
					setTimeout(function() {
								isMove = 0;
							}, 100);
				}
				el.onmousedown = el.onmouseout = function() {
					clearInterval(Self.delay);
				}
			}
		}
	}
}