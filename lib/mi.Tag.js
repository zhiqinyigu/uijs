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
        sending : 0,
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
		Self._users = $$('.hasCommon ul'); //Same Tag's User
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
                    MI.Bos('btnTagChange');
			Self._changeCommon.onclick = function(){
				if (MI.Tag.sending == 0){
					MI.Tag.sending = 1;
					UI.ajax({url:'/asyn/tag_oper.php',data:{op:6},success:function(data){
						var data = MI.json(data);
						if (MI.card){
							UI.remove(MI.card._body);
						}
						if (data.result == 0 && data.info.html != ""){
							var simiround = $$($("hasCommon"),".similar")[0];
							var simlist = $$(simiround,".taglist")[0];
							simlist.innerHTML = data.info.html;
                                                        
                                                        if (data.info.html)
                                                        {
                                                            $('mulTagTitle').style.display="";
                                                        }
                                                        
                                                        var simtitle = $$(simiround,".more a")[0];
							var peoplenum = $$(simtitle,".peopleTotal")[0];
							peoplenum.innerHTML= data.info.num;
							simtitle.href = '/search/tag.php?k='+data.info.keys+'&pos=708';
							MI.FollowBtn.build(simlist ,'.pic a');
							Self.card();
                                                        UI.C(simiround,'opacity', 1 );
							simiround.style.display="";
						}
						MI.Tag.sending = 0;
					}});
				}
				return false;
			}
		}

		//Follow Btn
		/*UI.each($$('.comList .pic'),function(o){
			UI.append(UI.html('<div class="attentBox"></div>')[0],o);
		});*/
		MI.FollowBtn.boss = ['btnTagFollow','btnTagUnFollow'];
		MI.FollowBtn.followCall = function(btn){
                                var roundDiv = UI.parents(btn,'round')[0];
                                var bossType = 0;
                                if (!roundDiv)
                                {
                                    var minorUsers = UI.parents(btn,'minorUsers')[0];
                                    bossType = 1;
                                }else
                                {
                                    var similar = (UI.hasClass(roundDiv, 'similar'));
                                    if (similar)
                                    {
                                        bossType = 2;
                                    }else
                                    {
                                        var last = (UI.hasClass(roundDiv, 'last'));
                                        if (last)
                                        {
                                            bossType = 3;
                                        }
                                    }
                                }
                                MI.Bos('btnTagFollowDetail', bossType);

				var matchTag = ['Twitter','twitter','Facebook','饭否','豆瓣','iPhone','产品经理','宫崎骏','名侦探柯南','几米'],text = UI.text(btn.parentNode.parentNode.parentNode);
				var sayhi = false;
				for (var i = 0,num = matchTag.length;i < num;i++){
					if (text.hasString('[' + matchTag[i] + ']')){
						followSayHi(btn,1);
						sayhi = true;
						break;
					}
				}
				if (!sayhi)
				{
					var roundDiv = UI.parents(btn,'round')[0]
					if (UI.hasClass(roundDiv, 'similar'))
					{
						followSayHi(btn,1);
					}
				}
		}
		MI.app({
			Base : function(){
				if (MI.card){
					MI.card.followCall = function(isFollow,btn){
                                            
                                            var taget = MI.card._target;
                                            var roundDiv = UI.parents(taget,'round')[0];
                                            var bossType = 0;
                                            if (!roundDiv)
                                            {
                                                var minorUsers = UI.parents(taget,'minorUsers')[0];
                                                bossType = 1;
                                            }else
                                            {
                                                var similar = (UI.hasClass(roundDiv, 'similar'));
                                                if (similar)
                                                {
                                                    bossType = 2;
                                                }else
                                                {
                                                    var last = (UI.hasClass(roundDiv, 'last'));
                                                    if (last)
                                                    {
                                                        bossType = 3;
                                                    }
                                                }
                                            }

						followCardSayHi();
						setTimeout(function(){
							MI.Bos('btnTagCardFollow',bossType);
						},300);
					}
				}
			}
		});

		Self.buildFollowBtn();

		Self.card(); //添加资料卡片
		Self.count(); //统计标签个数

		function followCardSayHi()
		{
			var target = MI.card._target;
			if ((UI.parents(target, 'minorUsers').length > 0) || (UI.parents(target, 'similar').length > 0))
			{
				var btn = target;
				followSayHi(btn, 1);
			}
		}

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
				MI.Card.build($('hasCommon'),'.pic img');
			}
		});
	},
	commonNum : function()
	{
		return $$($('hasCommon'),'.pic img').length;
	},
	buildFollowBtn : function()
	{
		var Self = this;
			var commonRowNum = Self._users.length;
			for (var i=1; i < commonRowNum; i++)
			{
				MI.FollowBtn.build(Self._users[i] ,'.pic a');
			}
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
//		if (obj.boss){
//			setTimeout(function(){
//				MI.Bos(obj.boss);
//			},500);
//		}
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

	/** 增加标签
	 * 
	 * @param {String} String 标签名
	 *            @example
	 *            MI.Tag.otherAdd('xhlv');
	 */	
	otherAdd : function(txt){
		txt = txt.replace(/ /g,'');
		UI.ajax({
			url : '/asyn/tag_oper.php',
			data : {op:1,t:txt},
			success : function(data){
				data = MI.json(data);
				if (data.result == 0){
					MI.tip( _('贴标签成功!'));
				}
				else if(data.result == -107){
						MI.confirm({
							title : _('你已贴满了10个标签'),
							content : _('要增加新标签，去标签设置页进行设置吧'),
							confirmTxt : _('设置标签'),
							confirm : function(){
								 window.open( "http://t.qq.com/setting/tag"); 
							}
						});
						return false;
				}
				else if (data.msg){
					MI.alert(data.msg);
				}
			}
		});
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
							topic[txt] = [data.info.topic];
							Self.topicSet(topic);
						}
						
                                                if (data.info.minorUsers){
                                                    $('star').innerHTML = data.info.minorUsers;
                                                    $('star').style.display = "";
                                                    MI.Tag._users[0] = $$($('star'), '.minorUsers')[0];
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
							var commRowNum = Self._users.length;
							UI.append(_user,Self._users[commRowNum - 1]);
							UI.animate(_user,'opacity',1,function(){
								UI.C(_user,'filter','');
							});
							Self.card();
							MI.FollowBtn.build(_user,'.pic a');
						}
						var commonNum = MI.Tag.commonNum();
						if (Self.count() > 0 && commonNum){
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

						Self._changeCommon.onclick();
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
		var Self = this;
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
							var commonNum = MI.Tag.commonNum();
							if (num == 0 || commonNum == 0){
								UI.show('noCommon');
								UI.hide('hasCommon');
								if (num == 0) {
									UI.show(MI.Tag._noTag);
									MI.Tag._noTag.style.cssText = '*zoom:1'; //Kill Position Bug In IE
									UI.removeClass(MI.Tag._talk,'showTalkOpen');
								}
							}
						});

						MI.Tag._changeCommon.onclick();

						//Active Tag In List
						UI.each(MI.Tag.listTxt,function(o,i){
							if(o == txt) {
								MI.Tag._lists[i].className = '';
							}
						});
						//del the minor users
						if (UI.A(MI.Tag._users[0],'tag') == txt)
						{
							$('star').style.display = "none";
						}
						//Delete Same Tag's User
						UI.each($$('#round1 ul .userInfo .tag'),function(o){
							if (UI.A(o,'rel') == txt){
								var P = o.parentNode.parentNode.parentNode;
								UI.animate(P,'opacity',0,function(){
									UI.remove(P);
								});
							}
						});
						UI.each($$('.round .taglist .userInfo .tagsBox'),function(o){
						UI.each($$(o, 'a'), function(link){
							if (!UI.hasClass(link, 'disabled') && link.innerHTML==txt)
							{
									var P = link.parentNode.parentNode.parentNode;
									UI.animate(P,'opacity',0,function(){
											UI.remove(P);
											MI.Tag.delRound();
									});
							}
						});
						});
					}
				}
			});
			MI.Bos('btnTagDel');
		}
		MI.Tag.deling = 1;
		return false;
	},

	delRound : function(){
		clearTimeout(this.rnddelay);
				this.rnddelay = setTimeout(function(){
				UI.each($$('.round'),function(o){
					 if ($$(o,'.pic img').length == 0)
					 {
						   UI.animate(o,'opacity',0,function(){
											o.style.display="none";
                                                                                        $('mulTagTitle').style.display="none";
									});
					 }
				}
			);
			},300);
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
				var lastIndex = topicName.lastIndexOf('(');
				var topicNameSlice = topicName.slice(0, lastIndex);
				var num = topicName.slice(lastIndex);
				url = '/k/' + encodeURIComponent(topicNameSlice);
                                
                                if (topicNameSlice != "")
                                {
                                    topic[i] = '<a href="' + url + '" target="_blank" onclick="MI.Bos(\'btnTagGoTopic\',\'' + encodeURI(topicNameSlice) + '\')" title="' + topicName + '">' + topicNameSlice+'<em>'+ num +'</em>'+ '</a> ';
                                }
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
//		for (var i in Self.topicNice) {
//			Self.topic[i] = Self.topicNice[i];
//		}
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
};
/**
 * 标签墙
 */
MI.TagWall = function (id) {
	if (!id) return;
	var Self =this;
	Self._body = UI.isString(id) ? $(id) : id;
	Self._reset = $$(document.body, '.moreBox a')[0];
	Self._childrenNodes = $$(Self._body, '.tagTypes');
	Self._children = (function (){
		var children = new Array();
		UI.each(Self._childrenNodes, function (o){
			children.push(new MI.TagWall.Tag(o));
		});
		return children;
	})();
	UI.EA(Self._body, 'click', function (e) {
		var E = UI.E(e), tar = E.target, p = tar.parentNode;
		while (tar.nodeName !== 'A') { tar = p; p = p.parentNode; }
		if (p){
			if (UI.hasClass(p, 'tuserList')){
				MI.Bos('btnTagWallUser');
			}else if (UI.hasClass(p, 'tagInfo')){
				MI.Bos('btnTagWallTag ');
			}
		}
	});
	if (Self._reset){
		Self._reset.onclick = function () {
			Self.reload();
			return false;
		};
	}
	Self.order();
};
MI.TagWall.prototype = {
	// TODO 暂时性的 发布时需要改回去
	url : 'http://t.qq.com/asyn/tagsWallAsyn.php',
	/**
	 * 播放间隔 TagWall会每隔REFRESH_TIME时长来刷一个Tag
	 */
	REFRESH_TIME : 10000, 
	/**
	 * 主队列
	 */
	_stack : [],
	/**
	 * 缓存队列
	 */
	_fetchStack : null,
	/**
	 * 刷新Tag的顺序队列
	 */
	_order : [],
	/**
	 * 乱序生成函数
	 */ 
	order : function () {
		var Self = this, i = 0, j = Self.TAG_NUMBER, k = -1, tmp = [], t = null;
		for (i=0;i<Self.TAG_NUMBER;i++) tmp.push(i);
		while (j > 0){
			k = Math.floor(Math.random()*j);
			t = tmp[k];
			tmp[k] = tmp[j-1];
			tmp[j-1] = t;
			j--;
		}
		Self._order = tmp;
	},
	/**
	 * TagWall中的Tag数目
	 */
	TAG_NUMBER : 15,
	/**
	 * 标识正在异步拉取Tag数据
	 */
	_isFetching : false,
	_fetchAjax : null,
	/**
	 * 异步拉取Tag信息并放入缓存区
	 */
	fetchMore : function (callback, tagNum){
		var Self = this;
		if (Self._isFetching) return;
		Self._isFetching = true;
		Self._fetchAjax = MI.ajax({
			url : Self.url,
			data : {num : tagNum ? tagNum : 15},
			type : 'get',
			success : function (result) {
				var tagConfig = null, label = null;
				Self._isFetching = false;
				result = MI.json(result);
				if (result.result === 0){
					Self._fetchStack = [];
					for (label in result.info){
						tagConfig = result.info[label];
						tagConfig.label = label;
						Self._fetchStack.push(tagConfig);
					}
					if (callback) {
						Self[callback]();
					}
				}
				Self._fetchAjax = null;
			},
			fail : function (result){
				Self._isFetching = false;
			}
		});
	},
	/**
	 * 播放计时器
	 */
	_playTimer : null,
	/**
	 * 开始播放TagWall 播放时使用主队列中的信息将进播放
	 * 每隔REFRESH_TIME时长进行一次Tag刷新。每次刷新先会使用使用load函数将缓存队列中的数据加载进主队列.
	 * 若缓存队列中也没有数据则先停止播放。load函数中会使用fetchMore加载数据，当数据加载到之后会自动重新开始播放。
	 */
	play : function () {
		var Self = this;
		if (Self._isPlaying) return;
		Self._playTimer = setInterval(function () {
			if (!Self.load(true)){Self.stop();return;}
			Self.updateTag(Self._stack.shift(), Self.getTag(Self._order.shift()));
		}, Self.REFRESH_TIME);
		Self._isPlaying = true;
	},
	/**
	 * 将缓存Tag加载入主队列 同时清空缓存Tag并开始异步拉取新的Tag
	 * 如果主队列中尚有数据并且缓存队列中有数据，不进行任何动作
	 * 若主队列为空、缓存队列中含有数据，则填充主队列、清空缓存队列并开始使用fecthMore拉取数据作为新的缓存数据
	 * 若主队列为空、缓存队列也为空，则使用fecthMore拉取数据
	 * @param isAutoLoad {boolean} 自动拉取缓存数据
	 */
	load : function (isAutoLoad) {
		var Self = this;
		// 主队列有数据 + 缓存队列有数据 -> 不进行任何动作
		if (Self._stack.length && Self._fetchStack) return true;
		// 主队列有数据 + 缓存队列无数据 -> 拉取数据 不停止播放 
		if (Self._stack.length && !Self._fetchStack && isAutoLoad) {
			if (isAutoLoad) Self.fetchMore('play');
		}
		// 主队列无数据 + 缓存队列有数据 -> 缓存数据加载进主队列 + 拉取新的缓存数据 + 不停止播放
		if (Self._fetchStack){
			Self._stack = Self._fetchStack;
			Self.order();
			Self._fetchStack = null;
			if (isAutoLoad) Self.fetchMore('play');
			return true;
		}
		// 主队列、缓存队列皆无数据 -> 拉取数据 + 停止播放
		if (isAutoLoad) Self.fetchMore('play');
		return false;
	},
	/**
	 * 标识正在播放
	 */
	_isPlaying : false,
	/**
	 * 是否正在播放
	 */
	isPlaying : function () {
		return _isPlaying;
	},
	/**
	 * 停止TagWall播放
	 */
	stop : function () {
		var Self = this;
		Self._isPlaying = false;
		clearInterval(Self._playTimer);
		Self._playTimer = null;
	},
	/**
	 * 更新一个Tag
	 * @param tagConfig Tag配置信息
	 * @param target 目标Tag
	 */
	updateTag : function (tagConfig, target) {
		target.update(tagConfig);
	},
	/**
	 * 获取一个Tag
	 * @param {i} number tag的下标
	 */
	getTag : function (i) {
		return this._children[i];
	},
	/**
	 * 重新加载TagWall中的全部Tag
	 */
	reload : function () {
		MI.Bos('btnTagWallSwitch');
		var Self = this;
		if (Self._isFetching) return;
		Self.stop();
		Self.fetchMore('reset', 45);
		
	},
	/**
	 * 根据缓存队列数据重置TagWall
	 * 缓存队列中最多可拥有三组数据
	 * 第一组：作为TagWall重置所用数据
	 * 第二组：作为主队列数据
	 * 第三组：作为缓存队列数据
	 */
	reset : function () {
		var Self = this, i = 0;
		if (!Self._fetchStack || !Self._fetchStack.length) return;
		for (;i<Self.TAG_NUMBER;i++){
			Self.updateTag(Self._fetchStack[i], Self.getTag(i));
		}
		if (Self._fetchStack.length >= Self.TAG_NUMBER * 2){
			Self._stack = Self._fetchStack.slice(Self.TAG_NUMBER, Self.TAG_NUMBER * 2);
		}
		if (Self._fetchStack.length === Self.TAG_NUMBER * 3) {
			Self._fetchStack = Self._fetchStack.slice(Self.TAG_NUMBER * 2);
		}
		Self.order();
		Self.play();
	}
};

MI.TagWall.Tag = function (el) {
	if (!el) return;
	var Self = this;
	Self._body = el;
	Self.tag = $$(Self._body, '.tagInfo a')[0];
	Self.tagName = $$(Self.tag, '.tagName')[0];
	Self.tagNum = $$(Self.tag, '.tagInfo b')[0];
	Self.users = $$(Self._body, '.tuserList a');
	Self.imgs = $$(Self._body, '.tuserList img');
	UI.EA(Self._body, 'mouseover', function () {
		UI.addClass(Self._body, 'hover');
	});
	UI.EA(Self._body, 'mouseout', function () {
		UI.removeClass(Self._body, 'hover');
	});
};
MI.TagWall.Tag.USER_NUM = 4;
MI.TagWall.Tag.prototype = {
	update : function (config) {
		var Self = this, i = 0;
		Self.tag.href = 'http://t.qq.com/search/user.php?pos=601&keyType=4&t='+encodeURIComponent(config.label);
		Self.tagName.innerHTML = config.label;
		Self.tagNum.innerHTML = config.num;
		UI.each(config.users, function (pic,username) {
			UI.A(Self.users[i],'href', username);
			Self.imgs[i++].src = pic;
		});
	}
};
/**
 * 标签板
 * @param id DOM元素ID
 * @param config 配置
 * {
 * 	refreshUrl : '换一换异步接口地址',
 * 	tipUrl : '异步提示信息接口地址',
 * 	pasteUrl : '异步贴上标签接口地址',
 *  type : '标签板类型，有唯一标签板和小圈子标签板，不同标签板使用不同的有趣标签'
 * }
 */
MI.FunnyTagBoard = function (id, type) {
	if (!id || !type) return;
	var Self = this, config = MI.FunnyTagBoard.DEFAUL[type];
	
	Self._refreshUrl = config.refreshUrl;
	Self._tipUrl = config.tipUrl;
	Self._pasteUrl = config.pasteUrl;
	
	Self._body = UI.isString(id) ? $(id) : id;
	Self._reset = $$(Self._body, '.title a')[0];
	
	Self.tags = (function () {
		var tags = new Array(), tmp = $$(Self._body, '.tjTags a');
		UI.each(tmp, function (o) {
			var tag = new MI.FunnyTagBoard[config.type](o);
			tag.setBoard(Self);
			tags.push(tag);
		});
		return tags;
	})();
	
	if (Self._reset) {
		Self._reset.onclick = function () {
			MI.Bos('btnTagBoardSwitch');
			Self.reset();
			return false;
		};
	}
};

MI.FunnyTagBoard.DEFAUL = {
	'specail' : {
		refreshUrl : 'http://t.qq.com/asyn/specialTagsAsyn.php',
		tipUrl : '',
		pasteUrl : '',
		type : 'SpecialTag'
	},
	'group' : {
		refreshUrl : 'http://t.qq.com/asyn/smallGroupTagAsyn.php',
		tipUrl : '',
		pasteUrl : '',
		type : 'GroupTag'
	}
};

MI.FunnyTagBoard.prototype = {
	isAutoRefreshing : false,
	autoRefreshTimer : null,
	/**
	 * 自动刷新标签板，间隔10秒
	 * 如果异步请求耗时超过10秒，会阻塞下一个自动刷新{_refresh函数特性}
	 * 如果标签板已经开始自动刷新，新的开始动作无效
	 */
	startAutoRefresh : function () {
		var Self = this;
		if (Self.autoRefreshTimer) return;
		Self.isAutoRefreshing = true;
		Self.autoRefreshTimer = setInterval(function () {
			Self._refresh();
		}, 10000);
	},
	/**
	 * 停止自动刷新标签板
	 * 消除自动刷新计时器、标识位，并中断异步AJAX请求
	 */
	stopAutoRefresh : function () {
		var Self = this;
		Self.isAutoRefreshing = false;
		if (Self.autoRefreshTimer) {
			clearInterval(Self.autoRefreshTimer);
			Self.autoRefreshTimer = null;
		}
		if (Self._refreshAjax) {
			Self._refreshAjax.abort();
			Self._refreshAjax = null;
		}
	},
	/**
	 * 正在异步拉取标签板内容标识位
	 */
	isRefreshing : false,
	/**
	 * 异步拉取标签板内容AJAX对象
	 */
	_refreshAjax : null,
	/**
	 * 异步刷新标签板
	 * 如果正在刷新，则无动作
	 * 异步拉取成功后将开始自动刷新标签板
	 */
	_refresh : function () {
		var Self = this;
		if (Self.isRefreshing) return;
		Self.isRefreshing = true;
		Self._refreshAjax = MI.ajax({
			url : Self._refreshUrl,
			type : 'get',
			data : {seq : encodeURIComponent(MI.GroupFunnyBoardSeq)},
			success : function (result) {
				Self.isRefreshing = false;
				Self._refreshAjax = null;
				result = MI.json(result);
				var tags = result.info.tags || result.info;
				if (result.result === 0){
					UI.each(tags, function (o, i) {
						Self.getTag(i).update(o);
					});
					if (result.info.seq) MI.GroupFunnyBoardSeq = result.info.seq;
				}
				Self.startAutoRefresh();
			},
			fail : function () {
				Self.isRefreshing = false;
				Self._refreshAjax = null;
			}
		});
	},
	/**
	 * 换一换 强制更新标签
	 * 如果正在刷新 则不动作
	 */
	reset : function () {
		var Self = this;
		if (Self.isRefreshing) return;
		Self.stopAutoRefresh();
		Self._refresh();
	},
	getTag : function (i) {
		return this.tags[i];
	},
	getTipElement : function (i) {
	}
};

MI.FunnyTagBoard.SpecialTag = function (el) {
	if (!el) return;
	var Self = this;
	Self._body = el;
	Self._body.onclick = function () {
		Self.paste();
		return false;
	};
	Self._body.onmouseover = function (){
		Self.showTip();
	};
	Self._body.onmouseout = function () {
		Self.hideTip();
	};
};

MI.FunnyTagBoard.SpecialTag.prototype = {
	showTip : function () {
		MI.FunnyTagBoard.SpecialTip.getInstance().show(this, 1000);
	},
	hideTip : function () {
		var tip = MI.FunnyTagBoard.SpecialTip.getInstance();
		tip.isVisible ? tip.hide(1000) : tip.hide();
	},
	update : function (config) {
		var Self = this;
		Self._body.innerHTML = config.content;
	},
	setBoard : function (board) {
		this._board = board;
	},
	getBoard : function () {
		return this._board;
	},
	_isPasting : false,
	paste : function () {
		var Self = this;
		MI.Bos('btnSpecialTagPaste');
		if (Self._isPasting) return;
		Self._isPasting = true;
		var txt = Self._body.innerHTML;
		MI.ajax({
			url : 'http://t.qq.com/asyn/tag_oper.php',
			data : {op:1, t:txt},
			success : function (result) {
				Self._isPasting = false;
				result = MI.json(result);
				if (!result.result){
					MI.talk(_('添加标签成功！#征用标签#，发条广播分享给大家吧！'), _('我刚刚征用了@'+result.info.user.name+'的标签#'+txt+'#，觉得好玩你也贴上吧！http://t.qq.com/setting/tag'), 40);
				}else if (result.result == -107){
					MI.alert('你最多可以拥有10个标签<br/><a href="http://t.qq.com/setting/tag">去个人标签设置页</a>');
				}
			},
			fail : function () {
				Self._isPasting = false;
			}
		});
	}
};

MI.FunnyTagBoard.GroupTag = function (el) {
	if (!el) return;
	var Self = this;
	
	Self._body = el;
	
	Self._body.onclick = function () {
		Self.paste();
		return false;
	};
	Self._body.onmouseover = function (){
		Self.showTip();
	};
	Self._body.onmouseout = function () {
		Self.hideTip();
	};
};

MI.FunnyTagBoard.GroupTag.prototype = {
	showTip : function () {
		MI.FunnyTagBoard.GroupTip.getInstance().show(this, 1000);
	},
	hideTip : function () {
		MI.FunnyTagBoard.GroupTip.getInstance().hide(1000);
	},
	update : function (tag) {
		this._body.innerHTML = tag.content + '(' + tag.num + ')';
		if (tag.tagged) {
			UI.addClass(this._body, 'cSign');
			this._body.title = '您已经贴上了这个标签';
		}else{
			UI.removeClass(this._body, 'cSign');
			this._body.title = '点击贴上';
		}
	},
	isPasting : false,
	paste : function () {
		var Self = this;
		MI.Bos('btnGroupTagPaste');
		if (Self._isPasting) return;
		Self._isPasting = true;
		var txt = Self._body.innerHTML;
		txt = txt.substring(0,txt.lastIndexOf('('));
		MI.ajax({
			url : 'http://t.qq.com/asyn/tag_oper.php',
			data : {op:1, t:txt},
			success : function (result) {
				Self._isPasting = false;
				result = MI.json(result);
				if (!result.result){
					MI.talk(_('添加标签成功！#征用标签#，发条广播分享给大家吧！'), _('我刚刚征用了@'+result.info.user.name+'的标签#'+txt+'#，觉得好玩你也贴上吧！http://t.qq.com/setting/tag'),	40);
				}else if (result.result == -107){
					MI.alert('你最多可以拥有10个标签<br/><a href="http://t.qq.com/setting/tag">去个人标签设置页</a>');
				}
			},
			fail : function () {
				Self._isPasting = false;
			}
		});
	},
	getBoard : function () {
		return this._board;
	},
	setBoard : function (board) {
		this._board = board;
	}
};

MI.FunnyTagBoard.SpecialTip = function (id) {
	if (!id) return;
	var Self = this;
	
	Self._body = UI.isString(id) ? $(id) : id;
	Self._imgUrl = $$(Self._body, '.userPic a')[0];
	Self._img = $$(Self._body, '.userPic img')[0];
	Self._userName = $$(Self._body, '.username')[0];
	Self._icoLevel = $$(Self._body, '.ico_level')[0];
	Self._numbers = $$(Self._body, '.nums')[0];
	Self._tags = $$(Self._body, '.tagBox')[0];
	Self._content = $$(Self._body, '.tCardcnt')[0];
	Self._loading = $$(Self._body, '.tloadBox')[0];
	Self._recom = $$(Self._body, '.right a')[0];
	Self._follow = $$(Self._body, '.addAttention')[0];
	Self._unFollow = $$(Self._body, '.delAttention')[0];
	
	UI.EA(Self._body, 'mouseover', function () {
		if (Self._hideDelayTimer){
			clearTimeout(Self._hideDelayTimer);
			Self._hideDelayTimer = null;
		}
	});
	
	UI.EA(Self._body, 'mouseout', function () {
		Self.hide();
	});
	
	if (Self._recom){
		Self._recom.onclick = function () {
			MI.Bos('btnSpecialTagTipRecom');
			Self.recom();
			return false;
		};
	}
	
	if (Self._follow){
		Self._follow.onclick = function (){
			MI.Bos('btnSpecialTagTipFollow');
			Self.follow();
			return false;
		};
	}
	
	if (Self._unFollow){
		Self._unFollow.onclick = function () {
			MI.Bos('btnSpecailTagTipUnfollow');
			Self.unFollow();
			return false;
		};
	}
	
	if (Self._imgUrl){
		Self._imgUrl.onclick = function () {
			MI.Bos('btnSpecialTagTipPortrait');
		};
	}
	
};

MI.FunnyTagBoard.SpecialTip.prototype = {
	_url : 'http://t.qq.com/asyn/specialDetailAsyn.php',
	isFetching : false,
	_fetch : function () {
		var Self = this, label = null;
		if (Self.isFetching || !Self._tag) return;
		MI.ajax({
			url : Self._url,
			type : 'get',
			data : {tagName : encodeURIComponent(Self._tag._body.innerHTML)},
			success : function (result) {
				Self.isFetching = false;
				result = MI.json (result);
				if (result.result === 0){
					for (label in result.info){
						Self._update(result.info[label]);
					}
					UI.removeClass(Self._body, 'loading');
				}
			},
			fail : function () { Self.isFetching = false; }
		});
	},
	_update : function (tip) {
		if (!tip) return;
		var Self = this;
		Self._img.src = tip.picUrl;
		Self._userName.innerHTML = tip.nick;
		UI.A(Self._imgUrl, 'href', tip.name);
		UI.A(Self._userName, 'href', tip.name);
		Self._icoLevel.className = Self._icoLevel.className.replace(/wbL[0-9]*/, 'wbL' + tip.level); 
		Self._numbers.innerHTML = '广播' + tip.messageTotal + '<span>|</span>收听' + tip.follower;
		// 更新标签
		var cache = UI.html('<div class="tagBox"></div>')[0], i = 0, tagId = null, tag = null;
		for (tagId in tip.tags){
			tag = UI.html('<span class="line"><a onclick="MI.Bos(\'btnTagCardGoSearch\');" href="http://t.qq.com/search/user.php?pos=601&keyType=4&t=' + encodeURIComponent(tip.tags[tagId]) +'">' + tip.tags[tagId] + '</a></span>')[0];
			if (tip.tagsNum - 1 === i++)
				UI.addClass(tag, 'last');
			UI.append(tag, cache);
		}
		UI.replace(cache, Self._tags);
		Self._tags = cache;
	},
	_tag : null,
	_showDelayTimer : null,
	/**
	 * 显示Tip
	 * 特性：
	 * 1：会延迟delay弹出
	 * 2：与隐藏Tip互斥，在延迟的时间里，如果隐藏动作被触发，则显示动作被取消
	 * 3：弹出后，先出现Loading，再出现内容
	 */
	show : function (tag, delay) {
		if (!tag) return;
		var Self = this;
		if (Self._showDelayTimer){
			clearTimeout(Self._showDelayTimer);
			Self._showDelayTimer = null;
		}
		if (Self._hideDelayTimer){
			clearTimeout(Self._hideDelayTimer);
			Self._hideDelayTimer = null;
		}
		Self._showDelayTimer = setTimeout(function () {
			// 定位
			UI.C(Self._body, 'top', UI.getY(tag._body) * 1 + 9 + 'px');
			UI.C(Self._body, 'left', UI.getX(tag._body) * 1 + UI.width(tag._body) + 9 + 'px');
			// 先显示Loading：通过添加样式来控制
			UI.addClass(Self._body, 'loading');
			// 再显示整个Tip
			UI.show(Self._body);
			Self.isVisible = true;
			// 停止标签板自动刷新内容
			tag.getBoard().stopAutoRefresh();
			// 重置收听按钮
			Self._resetFollow();
			// 异步拉取tip内容
			Self._tag = tag;
			Self._fetch();
		}, delay ? delay : 0);
	},
	_hideDelayTimer : null,
	/**
	 * 隐藏Tip
	 * 特性：
	 * 1：会延迟delay隐藏
	 * 2：与显示Tip互斥，在延迟的时间里，如果显示动作被触发，则隐藏动作被取消
	 */
	hide : function (delay) {
		var Self = this;
		if (Self._showDelayTimer){
			clearTimeout(Self._showDelayTimer);
			Self._showDelayTimer = null;
		}
		if (Self._hideDelayTimer){
			clearTimeout(Self._hideDelayTimer);
			Self._hideDelayTimer = null;
		}
		Self._hideDelayTimer = setTimeout(function (){
			// 启动标签板自动刷新内容
			if (Self._tag)
				Self._tag.getBoard().startAutoRefresh();
			// 隐藏Tip
			UI.hide(Self._body);
			// 更新标识
			Self.isVisible = false;
		}, delay ? delay : 0);
	},
	isVisible : false,
	recom : function () {
		var Self = this, name = Self._getName(), nick = Self._getNick();
		MI.recom(name, nick);
	},
	follow : function () {
		var Self = this,name = Self._getName();
		MI.follow(name, Self._follow, function (){
			UI.show(Self._unFollow);
			UI.hide(Self._follow);
			Self._follow.className='addAttention';
			Self._unFollow.className='delAttention';
		});
	},
	unFollow : function () {
		var Self = this,name = Self._getName();
		MI.follow(name, Self._unFollow, function(){
			UI.show(Self._follow);
			UI.hide(Self._unFollow);
			Self._follow.className='addAttention';
			Self._unFollow.className='delAttention';
		});
	},
	_getName : function () {
		var Self = this, user = Self._userName;
		return user.href.substring(user.href.lastIndexOf('/')+1);
	},
	_getNick : function () {
		return this._userName.innerHTML;
	},
	_resetFollow : function () {
		var Self = this;
		Self._follow.className = 'addAttention';
		UI.show(Self._follow);
		UI.hide(Self._unFollow);
		Self._unFollow.className='delAttention';
	}
};

MI.FunnyTagBoard.SpecialTip.getInstance = function () {
	if (!MI.FunnyTagBoard.SpecialTip.cur){
		MI.FunnyTagBoard.SpecialTip.cur = new MI.FunnyTagBoard.SpecialTip('uniqueTip');
	}
	return MI.FunnyTagBoard.SpecialTip.cur;
};

MI.FunnyTagBoard.GroupTip = function (id) {
	if (!id) return;
	var Self = this;
	Self._body = UI.isString(id) ? $(id) : id;
	Self._all = $$(Self._body, '.right a')[0];
	Self._children = $$(Self._body, '.imgList li');
	Self._body.onclick = function (e) {
		var E = UI.E(e), tar = E.target;
		if (tar.nodeName === 'IMG'){
			MI.Bos('btnGroupTagPortrait');
		}
	};
	if (Self._all){
		Self._all.onclick = function (){
			MI.Bos('btnGroupTagAll');
		};
	}
	UI.EA(Self._body, 'mouseover', function () {
		if (Self._hideDelayTimer){
			clearTimeout(Self._hideDelayTimer);
			Self._hideDelayTimer = null;
		}
	});
	UI.EA(Self._body, 'mouseout', function () {
		Self.hide();
	});
};

MI.FunnyTagBoard.GroupTip.prototype = {
	_url : 'http://t.qq.com/asyn/smallDetailAsyn.php',
	isVisible : false,
	_showDelayTimer : null,
	show : function (tag, delay) {
		if (!tag) return;
		var Self = this;
		if (Self._showDelayTimer){
			clearTimeout(Self._showDelayTimer);
			Self._showDelayTimer = null;
		}
		if (Self._hideDelayTimer){
			clearTimeout(Self._hideDelayTimer);
			Self._hideDelayTimer = null;
		}
		Self._showDelayTimer = setTimeout(function () {
			// 定位
			UI.C(Self._body, 'top', UI.getY(tag._body) * 1 + 9 + 'px');
			UI.C(Self._body, 'left', UI.getX(tag._body) * 1 + UI.width(tag._body) + 9 + 'px');
			// 先显示Loading：通过添加样式来控制
			UI.addClass(Self._body, 'loading');
			// 再显示整个Tip
			UI.show(Self._body);
			Self.isVisible = true;
			// 停止标签板自动刷新内容
			tag.getBoard().stopAutoRefresh();
			// 异步拉取tip内容
			Self._tag = tag;
			Self._fetch('show');
		}, delay ? delay : 0);
	},
	_hideDelayTimer : null,
	hide : function (delay) {
		var Self = this;
		if (Self._showDelayTimer){
			clearTimeout(Self._showDelayTimer);
			Self._showDelayTimer = null;
		}
		if (Self._hideDelayTimer){
			clearTimeout(Self._hideDelayTimer);
			Self._hideDelayTimer = null;
		}
		Self._hideDelayTimer = setTimeout(function (){
			// 启动标签板自动刷新内容
			if (Self._tag)
				Self._tag.getBoard().startAutoRefresh();
			// 隐藏Tip
			UI.hide(Self._body);
			// 更新标识
			Self.isVisible = false;
		}, delay ? delay : 0);
	},
	isFetching : false,
	_fetch : function (callback) {
		var Self = this;
		if (Self.isFetching || !Self._tag) return;
		var tagName = Self._tag._body.innerHTML;
		tagName = tagName.substring(0, tagName.lastIndexOf('('));
		MI.ajax({
			url : Self._url,
			type : 'get',
			data : {tagName : encodeURIComponent(tagName)},
			success : function (result) {
				Self.isFetching = false;
				result = MI.json (result);
				if (result.result === 0){
					Self._update(result.info);
					UI.removeClass(Self._body, 'loading');
				}
			},
			fail : function () {
				Self.isFetching = false;
			}
		});
	},
	_update : function (tip) {
		if (!tip) return;
		var Self = this, name = null, i = 0, imgWrap = null, img = null, titleWrap = null, title = null;
		var tmp = null;
		for (name in tip) {
			tmp = $$(Self._children[i], 'a');
			imgWrap = tmp[0];
			img = $$(imgWrap, 'img')[0];
			titleWrap = tmp[1];
			title = tip[name].nick + '(@' + name.substring(name.lastIndexOf('/') + 1) + ')';
			titleWrap.title = title;
			titleWrap.innerHTML = tip[name].nick;
			titleWrap.href = name;
			imgWrap.href = name;
			imgWrap.rel = title;
			img.src = tip[name].picUrl;
			i++;
		}
		var tagName = Self._tag._body.innerHTML;
		tagName = tagName.substring(0, tagName.lastIndexOf('('));
		Self._all.href = 'http://t.qq.com/search/user.php?pos=601&keyType=4&t='+encodeURIComponent(tagName);
	}
};

MI.FunnyTagBoard.GroupTip.getInstance = function (){
	if (!MI.FunnyTagBoard.GroupTip.cur){
		MI.FunnyTagBoard.GroupTip.cur = new MI.FunnyTagBoard.GroupTip('groupTip');
	}
	return MI.FunnyTagBoard.GroupTip.cur;
};