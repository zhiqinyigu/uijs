/**
 * MI.Tag
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
/**
 * MI.Tag 个人标签
 * @namespace MI.Tag 个人标签
 * @type Object
 */
MI.Tag = {
	listTxt : [],
	/**
	 * 最大标签数
	 * @type Number
	 */
	max : 10,
	topic : {},
	topicNice : {
		'听音乐' : ['#分享音乐#'],
		'上网' : ['上网'],
		'看电影' : ['#电影#'],
		'爱睡觉' : ['#睡觉#'],
		'旅游' : ['#旅游#'],
		'K歌' : ['KTV'],
		'美食' : ['#美食#'],
		'游戏' : ['#游戏#'],
		'看书' : ['#我最喜欢的书#'],
		'小说' : ['#小说#'],
		'摄影' : ['#摄影#'],
		'动漫' : ['#动漫#'],
		'爱猫' : ['#每日一喵#'],
		'爱狗' : ['#狗狗#'],
		'美剧' : ['#美剧#'],
		'韩剧' : ['#韩剧#'],
		'日剧' : ['#日剧#'],
		'美食' : ['#美食#'],
		'美容' : ['#美容#'],
		'庚饭' : ['#庚饭#']
	},
	xhr : null,
	delay : null,
	/**
	 * 创建个人标签交互
	 * 
	 *            @example
	 *            MI.Tag.build();
	 */
	build : function(){
		var Self = this;
		Self._lists = $$('.tagsList a'); //Tags List
		Self._body = $$('.myTags')[0]; //My Tags
		Self._add = $('tagAdd'); //Add Tags
		Self._talk = $('tagTalk');
		Self._add.value = '';
		Self._users = $$('.hasCommon ul')[0]; //Same Tag's User
		Self._tip = UI.html('<span class="tagTips" style="display:none"><b>' + _('第<span class="tagTipsNum"></span>位拥有者') + '</b><em></em></span>')[0]; //Tip
		Self._noTag = $('noTag'); //No Tag Tip
		Self._topic = $('tagsTopic');
		Self._topicCont = $$(Self._topic,'.topicBox')[0];
		Self._changeCommon = $('changeCommon');
		UI.each(Self._lists,function(o){
			Self.listTxt.push(o.innerHTML);
			o.onclick = Self.listAdd;
		});

		Self.addEvent();

		Self._add.parentNode.onsubmit = function(){
			var value = Self._add.value;
			if (value){
				Self.add(value);
				MI.Bos('btnTagInputAdd');
			}
			else {
				MI.alert(_('请输入标签'));
			}
			return false;
		}
		Self._add.onfocus = function(){
			UI.hide(this.previousSibling);
		}
		Self._add.onblur = function(){
			if (!this.value){
				UI.show(this.previousSibling);
			}
		}
		if (Self._changeCommon){
			Self._changeCommon.onclick = function(){
				UI.ajax({url:'/asyn/tag_oper.php',data:{op:5},success:function(data){
					var data = MI.json(data);
					if (MI.card){
						UI.remove(MI.card._body);
					}
					if (data.result == 0){
						$('comList').innerHTML = data.info;
						MI.FollowBtn.build();
						Self.card();
					}
				}});
				return false;
			}
		}

		//Follow Btn
		/*UI.each($$('.comList .pic'),function(o){
			UI.append(UI.html('<div class="attentBox"></div>')[0],o);
		});*/
		MI.FollowBtn.boss = ['btnTagFollow','btnTagUnFollow'];
		MI.FollowBtn.followCall = function(btn){
			if(0 && MI.Uin() % 10 == 3){
				var matchTag = ['听音乐','上网','看电影','爱睡觉','旅游','K歌','美食','游戏','小说','看书'],text = UI.text(btn.parentNode.parentNode.parentNode);
				for (var i = 0,num = matchTag.length;i < num;i++){
					if (text.hasString('[' + matchTag[i] + ']')){
						followSayHi(btn,1);
						break;
					}
				}
			}
		}
		MI.app({
			Base : function(){
				if (MI.card){
					MI.card.followCall = function(isFollow,btn){
						//followSayHi(btn,2);
						setTimeout(function(){
							MI.Bos('btnTagCardFollow');
						},300);
					}
				}
			}
		});
		MI.FollowBtn.build();

		Self.card(); //添加资料卡片
		Self.count(); //统计标签个数
		
		function followSayHi(btn,type){ //收听回调函数 type：1-普通收听 2-资料卡片收听
			if (MI.isS){
				var sayHiStorage = Self.sayHiStorage(),
					li = type == 1 ? UI.parents(btn,'pic')[0] : UI.next(UI.parents(btn,'uCard')[0]),
					txtObj = {
						account : UI.A(li,'user'),
						tag : UI.A(li,'tag'),
						boss : type == 1 ? 'btnTagFollowReply' : 'btnTagCardFollowReply'
					};
				if (sayHiStorage == ''){
					Self.sayHiSet({
						call : function(){
							Self.sayHi(txtObj);
						}
					});
				}
				else if(sayHiStorage == 1) {
					Self.sayHi(txtObj);
				}
			}
		}
	},
	card : function(){
		MI.app({
			Base : function(){
				MI.Card.build($('comList'),'.pic img');
			}
		});
	},
	sayHi : function(obj){
		UI.ajax({
			url : '/publish.php',
			data : {
				content	: this.sayHiTxt(obj),
				pic	: '',
				countType : ''
			}
		});
		if (obj.boss){
			setTimeout(function(){
				MI.Bos(obj.boss);
			},500);
		}
	},
	sayHiStorage : function(value){
		var name = 'option_sayHi_' + MI.user.account;
		if (value){
			MI.S(name,value);
		}
		else {
			return MI.S(name);
		}
	},
	sayHiTxt : function(obj){
		account = '',tag = '';
		if (obj && obj.account && obj.tag){
			account = '@' + obj.account + '';
			tag = '“' + obj.tag + '”';
		}
		return account + _('我刚通过标签{0}收听了你，原来我们是#同道中人#！',tag);
	},
	sayHiSet : function(obj){
		/*
		 * {account:'doudou',tag:'85后'}
		 */
		var Self= this,txt = Self.sayHiTxt(obj);
		UI.remove($('tagAutoSet'));
		MI.dialog.show({
			title : '<h1 class="DmainTit">' + _('招呼设置') + '</h1>',
			html : '<div class="tagAutoSet" id="tagAutoSet">\
					<div class="cNote">' + _('找到同道中人只是第一步，互动交流才是同道之乐！') + '</div>\
					<div><textarea class="inputArea" readonly>' + txt + '</textarea></div>\
					<div class="setSel">' + _('下次自动发送：') + '<label><input type="radio" name="tagAutoSet" class="check1" checked="checked" onclick="MI.Bos(\'btnTagFollowReplyYes\')">' + _('是') + '</label><label><input type="radio" name="tagAutoSet" class="check1" onclick="MI.Bos(\'btnTagFollowReplyNo\')">' + _('否') + '</label></div>\
					<div class="btnBox"><button class="btn2">' + _('确定') + '</button><button class="btn2" onclick="MI.dialog.hide()">' + _('取消') + '</button></div>\
				</div>'
		});
		var wrap = $('tagAutoSet'),
			input = $$(wrap,'input'),
			button = $$(wrap,'button');
		if (Self.sayHiStorage() == -1){
			input[1].checked = true;
		}
		button[0].onclick = function(){
			Self.sayHiStorage(input[0].checked ? 1 : -1);
			MI.dialog.hide();
			if (obj && obj.call){
				obj.call();
			}
		}
	},
	listAdd : function(){
		if (!UI.hasClass(this,'disabled')){
			MI.Tag.add(this.innerHTML);
			MI.Bos('btnTagCategoryAdd');
		}
		return false;
	},
	/**
	 * 增加标签
	 * 
	 * @param {String} String 标签名
	 *            @example
	 *            MI.Tag.add('xhlv');
	 */
	add : function(txt){
		var Self = this;
		txt = txt.replace(/ /g,'');
		if (Self.count() >= Self.max){
			MI.alert(_('你最多可以拥有{0}个标签',10));
			return;
		}
		if (!Self.adding) {
			UI.ajax({
				url : '/asyn/tag_oper.php',
				data : {op:1,t:txt},
				success : function(data){
					//data = '{result:0,msg:"成功",info:{id:"12117796803083473608",user:{nick:"xhlv",name:"xhlv",pic:"http://t2.qlogo.cn/mbloghead/750167917e64b39e360a"},num:3}}';
					data = MI.json(data);
					Self.adding = 0;
					if (data.result == 0){
						var tag = UI.html('<li class="hover"><p class="tagFun"><a href="/search/tag.php?k=' + encodeURIComponent(txt) + '" onclick="MI.Bos(\'btnTagGoSearchMine\')" class="tag">' + txt + '</a><a href="#" class="delTag" rel="' + data.info.id + '">×</a></p><span class="tag">' + MI.string.cut(txt,8) + '</span></li>')[0],
							_tip = Self._tip,
							user = data.info.user,
							_user,
							topic = {};
						//Topic
						if (data.info.topic){
							topic[txt] = ['#' + data.info.topic + '#'];
							Self.topicSet(topic);
						}
						
						UI.C(tag,'opacity',UI.B.ie ? 1 : 0); //需改改为默认显示带阴影的tagFun，IE中滤镜无法同时使用两个
						UI.removeClass($$(Self._body,'.hover')[0],'hover');
						UI.append(tag,Self._body);
						UI.remove(_tip);
						_tip.style.cssText = 'margin-left:0;zoom:1;left:' + (UI.width($$(tag,'a')[0]) + 25) + 'px';
						UI.animate(tag,'opacity',1,function(){
							UI.C(tag,'filter','');
							$$(_tip,'.tagTipsNum')[0].innerHTML = data.info.num + 1;
							UI.C(_tip,'opacity',0);
							UI.show(_tip);
							UI.append(_tip,tag);
							clearInterval(Self.delay);
							Self.delay = UI.animate(_tip,'opacity',1,function(){
								setTimeout(function(){
									clearInterval(Self.delay);
									Self.delay = UI.animate(_tip,'opacity',0,function(){
										UI.remove(_tip);
										UI.hide(_tip);
										UI.removeClass(tag,'hover');
									});
								},800);
								if (txt == _('后驱控')) {
									MI.confirm({
										type : 'success',
										title : _('添加成功！'),
										content : _('召唤“后驱控”同道中人现身？'),
										confirm : function(){
											if(talkBox) {
												talkBox.failStart = function(data){
													if(data.result < 0){
														MI.alert(data.msg);
													}
												}
												talkBox._txt.value = _('对苍白的生活我不接受；对无力的驾驶我不妥协，我存在于后驱时代。我是后驱控，这是我的生活态度！一起来打“后驱控”标签，召唤同道中人现身！') + 'http://t.qq.com/setting_tag.php?bmw';
												talkBox.countTxt();
												talkBox.send();
											}
										}
									});
								}
							});
						});
						Self.addEvent(tag);
						tag.onmouseover();

						//Insert Same Tag's User
						if (user && user.name != MI.user.account) {
							_user = UI.html('<li><div class="pic" user="' + user.name + '" tag="' + txt + '"><a href="/' + user.name + '" title="' + user.nick + '(@' + user.name + ')" onclick="MI.Bos(\'btnTagGoUser\')"><img title="' + user.nick + '(@' + user.name + ')" src="' + (user.pic ? user.pic + '/50' : 'http://mat1.gtimg.com/www/mb/images/head_50.jpg') + '" /></a></div><div class="userInfo"><a href="/' + user.name + '" title="' + user.nick + '(@' + user.name + ')" onclick="MI.Bos(\'btnTagGoUser\')">' + user.nick + '</a><br />[' + txt + ']<br /><a href="/search/tag.php?k=' + encodeURIComponent(txt) + '" onclick="MI.Bos(\'btnTagGoSearch\')"><span class="tag" rel="' + txt + '">' + _('{0}位同道中人',data.info.num || 1) + '<span class="ffsong">>></span></span></a></div></li>')[0]
							UI.C(_user,'opacity',0);
							UI.append(_user,Self._users);
							UI.animate(_user,'opacity',1,function(){
								UI.C(_user,'filter','');
							});
							Self.card();
							MI.FollowBtn.build(_user,'.pic a');
						}

						if (Self.count() > 0 && Self._users.childNodes.length){
							UI.hide('noCommon');
							UI.show('hasCommon');
						}

						//Hide No Tag Tip
						UI.hide(Self._noTag);
						UI.addClass(Self._talk,'showTalkOpen');

						//Clear Input
						Self._add.value = '';
						Self._add.blur();
						UI.show(Self._add.previousSibling);
					}
					else if (data.msg){
						MI.alert(data.msg);
					}
				}
			});
		}
		Self.adding = 1;
	},
	/**
	 * 删除标签
	 * 
	 *            @example
	 *            el.onclick = MI.Tag.del;
	 */
	del : function(){
		var T = this,P = this.parentNode.parentNode,txt = T.previousSibling.innerHTML;
		if (!MI.Tag.deling) {
			UI.ajax({
				url : '/asyn/tag_oper.php',
				data : {op:3,id:UI.A(T,'rel')},
				success : function(data){
					//data = '{result:0,msg:"成功",info:"12117796803083473608"}';
					data = MI.json(data);
					MI.Tag.deling = 0;
					if (data.result == 0){
						UI.animate(P,'opacity',0,function(){
							//Topic Set
							delete MI.Tag.topic[txt];

							UI.remove(P);
							var num  = MI.Tag.count();
							if (num == 0 || !MI.Tag._users.childNodes.length){
								UI.show('noCommon');
								UI.hide('hasCommon');
								if (num == 0) {
									UI.show(MI.Tag._noTag);
									MI.Tag._noTag.style.cssText = '*zoom:1'; //Kill Position Bug In IE
									UI.removeClass(MI.Tag._talk,'showTalkOpen');
								}
							}
						});

						//Active Tag In List
						UI.each(MI.Tag.listTxt,function(o,i){
							if(o == txt) {
								MI.Tag._lists[i].className = '';
							}
						});

						//Delete Same Tag's User
						UI.each($$('.hasCommon ul .userInfo .tag'),function(o){
							if (UI.A(o,'rel') == txt){
								var P = o.parentNode.parentNode.parentNode;
								UI.animate(P,'opacity',0,function(){
									UI.remove(P);
								});
							}
						});
					}
				}
			});
			MI.Bos('btnTagDel');
		}
		MI.Tag.deling = 1;
		return false;
	},
	addEvent : function(target){
		target = [target] || $$('.myTags li');
		var tags = [],
			delBtn,
			Self = this;
		UI.each($$('.myTags li'),function(o){
			delBtn = $$(o,'.delTag')[0];
			delBtn.onclick = Self.del;
			UI.A(delBtn,'hideFocus','true');
			o.onmouseover = function(){
				this.className = 'hover';
				var fun = $$(this,'.tagFun')[0],funChild = fun.childNodes;
				fun.style.width = UI.width(funChild[0]) + UI.width(funChild[1]) - 3 + 'px';
			}
			o.onmouseout = function(){
				if (UI.C(Self._tip,'display') == 'none' || Self._tip.parentNode != this) {
					this.className = '';
				}
			}
			tags.push($$(o,'a')[0].innerHTML);
		});
		UI.each(Self.listTxt,function(o,i){
			Self._lists[i].className = UI.has(tags,o) ? 'disabled' : '';
		});
	},
	/**
	 * 推荐话题展示
	 * 
	 *            @example
	 */
	topicShow : function(){
		var Self = this,
			topic = [],
			isLab = true;//MI.Uin().toString().slice(-1) == 0;
		if (Self._topic && isLab) {
			UI.each(Self.tag,function(o){
				if (Self.topic[o]) {
					topic = topic.concat(Self.topic[o]);
				}
			});
			UI.each(topic,function(o,i){
				var topicName = o,url;
				if (o.hasString('#')) {
					topicName = o.replace(/#/g,'');
					url = '/k/' + encodeURIComponent(topicName);
				}
				else {
					url = '/search/message.php?k=' + encodeURIComponent(topicName);
				}
				topic[i] = '<a href="' + url + '" target="_blank" onclick="MI.Bos(\'btnTagGoTopic\',\'' + encodeURI(topicName) + '\')" title="' + topicName + '">' + o + '</a> ';
			});
			if (topic.length) {
				Self._topicCont.innerHTML = '' + topic.slice(0,10).join('');
				UI.show(Self._topic);
			}
			else {
				Self._topicCont.innerHTML = '';
				UI.hide(Self._topic);
			}
		}
	},
	/**
	 * 推荐话题设置
	 * 
	 *            @example
	 */
	topicSet : function(obj){
		var Self = this;
		for (var i in obj) {
			Self.topic[i] = obj[i];
		}
		for (var i in Self.topicNice) {
			Self.topic[i] = Self.topicNice[i];
		}
	},
	/**
	 * 获取我的标签数
	 * 
	 * @return {Number} 返回标签数
	 *            @example
	 *            MI.Tag.count();
	 */
	count : function(){
		var li = $$(this._body,'li p .tag'),
			len = li.length,
			tag = [];
		UI.each(li,function(o){
			tag.push(o.innerHTML);
		});
		this.tag = tag;
		this.topicShow();
		return len;
	}
}