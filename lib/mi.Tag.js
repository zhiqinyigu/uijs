/**
 * MI.Tag ���˱�ǩ
 * @namespace MI.Tag ���˱�ǩ
 * @type Object
 */
MI.Tag = {
	listTxt : [],
	/**
	 * ����ǩ��
	 * @type Number
	 */
	max : 10,
	xhr : null,
	delay : null,
	/**
	 * �������˱�ǩ����
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
		Self._tip = UI.html('<span class="tagTips" style="display:none"><b>��<span class="tagTipsNum"></span>λӵ����</b><em></em></span>')[0]; //Tip
		Self._noTag = $('noTag'); //No Tag Tip
		Self._topic = $('tagsTopic');
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
				MI.alert('�������ǩ');
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

		//Topic
		Self.topicSet({
			'������' : ['#��������#'],
			'����' : ['����'],
			'����Ӱ' : ['#��Ӱ#'],
			'��˯��' : ['#˯��#'],
			'����' : ['#����#'],
			'K��' : ['KTV'],
			'��ʳ' : ['#��ʳ#'],
			'��Ϸ' : ['#��Ϸ#'],
			'����' : ['#����ϲ������#'],
			'С˵' : ['#С˵#'],
			'��Ӱ' : ['#��Ӱ#'],
			'����' : ['#����#'],
			'��è' : ['#ÿ��һ��#'],
			'����' : ['#����#'],
			'����' : ['#����#'],
			'����' : ['#����#'],
			'�վ�' : ['#�վ�#'],
			'��ʳ' : ['#��ʳ#'],
			'����' : ['#����#'],
			'����' : ['#����#']
		});

		Self.card();
		Self.count();
	},
	card : function(){
		MI.Card.build($('comList'),'.pic img');
	},
	listAdd : function(){
		if (!UI.hasClass(this,'disabled')){
			MI.Tag.add(this.innerHTML);
			MI.Bos('btnTagCategoryAdd');
		}
		return false;
	},
	/**
	 * ���ӱ�ǩ
	 * 
	 * @param {String} String ��ǩ��
	 *            @example
	 *            MI.Tag.add('xhlv');
	 */
	add : function(txt){
		var Self = this;
		txt = txt.replace(/ /g,'');
		if (Self.count() >= Self.max){
			MI.alert('��������ӵ��10����ǩ');
			return;
		}
		if (!Self.adding) {
			UI.ajax({
				url : '/asyn/tag_oper.php',
				data : {op:1,t:txt},
				success : function(data){
					//data = '{result:0,msg:"�ɹ�",info:{id:"12117796803083473608",user:{nick:"xhlv",name:"xhlv",pic:"http://t2.qlogo.cn/mbloghead/750167917e64b39e360a"},num:3}}';
					data = MI.json(data);
					Self.adding = 0;
					if (data.result == 0){
						var tag = UI.html('<li class="hover"><p class="tagFun"><a href="/search/tag.php?k=' + encodeURIComponent(txt) + '" onclick="MI.Bos(\'btnTagGoSearchMine\')" class="tag">' + txt + '</a><a href="#" class="delTag" rel="' + data.info.id + '">��</a></p><span class="tag">' + MI.string.cut(txt,8) + '</span></li>')[0],
							_tip = Self._tip,
							user = data.info.user,
							_user;
						UI.C(tag,'opacity',UI.B.ie ? 1 : 0); //��ĸ�ΪĬ����ʾ����Ӱ��tagFun��IE���˾��޷�ͬʱʹ������
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
							});
						});
						Self.addEvent(tag);
						tag.onmouseover();

						//Insert Same Tag's User
						if (user && user.name != MI.user.account) {
							_user = UI.html('<li><div class="pic"><a href="/' + user.name + '" title="' + user.nick + '(@' + user.name + ')" onclick="MI.Bos(\'btnTagGoUser\')"><img title="' + user.nick + '(@' + user.name + ')" src="' + (user.pic ? user.pic + '/50' : 'http://mat1.gtimg.com/www/mb/images/head_50.jpg') + '" /></a></div><div class="userInfo"><a href="/' + user.name + '" title="' + user.nick + '(@' + user.name + ')" onclick="MI.Bos(\'btnTagGoUser\')">' + user.nick + '</a><br />[' + txt + ']<br /><a href="/search/tag.php?k=' + encodeURIComponent(txt) + '" onclick="MI.Bos(\'btnTagGoSearch\')"><span class="tag" rel="' + txt + '">' + (data.info.num || 1) + 'λͬ������>></span></a></div></li>')[0]
							UI.C(_user,'opacity',0);
							UI.append(_user,Self._users);
							UI.animate(_user,'opacity',1,function(){
								UI.C(_user,'filter','');
							});
							Self.card();
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
	 * ɾ����ǩ
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
					//data = '{result:0,msg:"�ɹ�",info:"12117796803083473608"}';
					data = MI.json(data);
					MI.Tag.deling = 0;
					if (data.result == 0){
						UI.animate(P,'opacity',0,function(){
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
	 * �Ƽ�����չʾ
	 * 
	 *            @example
	 */
	topicShow : function(){
		var Self = this,
			topic = [];
		if (Self._topic) {
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
				topic[i] = '<a href="' + url + '" target="_blank" onclick="MI.Bos(\'btnTagGoTopic_' + Self.topicIndex[o] + '\')" title="' + topicName + '">' + o + '</a> ';
			});
			Self._topic.innerHTML = topic.length ? '�Ƽ����ģ�' + topic.slice(0,10).join('') : '';
		}
	},
	/**
	 * �Ƽ���������
	 * 
	 *            @example
	 */
	topicSet : function(obj){
		var Self = this,index = 1;
		Self.topic = obj;
		Self.topicIndex = {};
		for (var i in Self.topic) {
			UI.each(Self.topic[i],function(o){
				Self.topicIndex[o] = index;
			});
			index++;
		}
	},
	/**
	 * ��ȡ�ҵı�ǩ��
	 * 
	 * @return {Number} ���ر�ǩ��
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
		if (len) {
			this.topicShow();
		}
		return len;
	}
}