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
		MI.Tag._lists = $$('.tagsList a'); //Tags List
		MI.Tag._body = $$('.myTags')[0]; //My Tags
		MI.Tag._add = $('tagAdd'); //Add Tags
		MI.Tag._add.value = '';
		MI.Tag._users = $$('.hasCommon ul')[0]; //Same Tag's User
		MI.Tag._tip = UI.html('<span class="tagTips"><b>��<span class="tagTipsNum"></span>λӵ����</b><em></em></span>')[0]; //Tip
		MI.Tag._noTag = $('noTag'); //No Tag Tip
		UI.each(MI.Tag._lists,function(o){
			MI.Tag.listTxt.push(o.innerHTML);
			o.onclick = MI.Tag.listAdd;
		});

		MI.Tag.addEvent();

		MI.Tag._add.parentNode.onsubmit = function(){
			var value = MI.Tag._add.value;
			if (value){
				MI.Tag.add(value);
			}
			else {
				MI.alert('�������ǩ');
			}
			return false;
		}
		MI.Tag._add.onfocus = function(){
			UI.hide(this.previousSibling);
		}
		MI.Tag._add.onblur = function(){
			if (!this.value){
				UI.show(this.previousSibling);
			}
		}
	},
	listAdd : function(){
		if (!UI.hasClass(this,'disabled')){
			MI.Tag.add(this.innerHTML);
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
		txt = txt.replace(/ /g,'');
		if (MI.Tag.count() >= MI.Tag.max){
			MI.alert('��������ӵ��10����ǩ');
			return;
		}
		if (!MI.Tag.adding) {
			UI.ajax({
				url : '/asyn/tag_oper.php',
				data : {op:1,t:txt},
				success : function(data){
					//data = '{result:0,msg:"�ɹ�",info:{id:"12117796803083473608",user:{nick:"xhlv",name:"xhlv",pic:"http://t2.qlogo.cn/mbloghead/750167917e64b39e360a"},num:3}}';
					data = MI.json(data);
					MI.Tag.adding = 0;
					if (data.result == 0){
						var tag = UI.html('<li class="hover"><p class="tagFun"><a href="/search/tag.php?k=' + encodeURIComponent(txt) + '" class="tag">' + txt + '</a><a href="#" class="delTag" rel="' + data.info.id + '">��</a></p><span class="tag">' + MI.string.cut(txt,8) + '</span></li>')[0],
							_tip = MI.Tag._tip,
							user = data.info.user,
							_user;
						UI.C(tag,'opacity',UI.B.ie ? 1 : 0); //��ĸ�ΪĬ����ʾ����Ӱ��tagFun��IE���˾��޷�ͬʱʹ������
						UI.removeClass($$(MI.Tag._body,'.hover')[0],'hover');
						UI.append(tag,MI.Tag._body);
						UI.remove(_tip);
						_tip.style.cssText = 'margin-left:0;zoom:1;left:' + (UI.width($$(tag,'a')[0]) + 25) + 'px';
						UI.animate(tag,'opacity',1,function(){
							UI.C(tag,'filter','');
							$$(_tip,'.tagTipsNum')[0].innerHTML = data.info.num + 1;
							UI.C(_tip,'opacity',0);
							UI.append(_tip,tag);
							clearInterval(MI.Tag.delay);
							MI.Tag.delay = UI.animate(_tip,'opacity',1,function(){
								setTimeout(function(){
									clearInterval(MI.Tag.delay);
									MI.Tag.delay = UI.animate(_tip,'opacity',0,function(){
										UI.remove(_tip);
										UI.removeClass(tag,'hover');
									});
								},800);
							});
						});
						MI.Tag.addEvent(tag);
						tag.onmouseover();

						//Insert Same Tag's User
						if (user && user.name != MI.user.account) {
							_user = UI.html('<li><div class="pic"><a href="/' + user.name + '"><img title="' + user.nick + '(@' + user.name + ')" src="' + (user.pic ? user.pic + '/50' : 'http://mat1.gtimg.com/www/mb/images/head_50.jpg') + '" /></a></div><div class="userInfo"><a href="/' + user.name + '" title="' + user.nick + '(@' + user.name + ')">' + user.nick + '</a><br />����ӵ����ͬ��ǩ:<br /><a href="/search/tag.php?k=' + encodeURIComponent(txt) + '"><span class="tag" rel="' + txt + '">' + MI.string.cut(txt,14) + '</span>(' + (data.info.num || 1) + ')</a></div></li>')[0]
							UI.C(_user,'opacity',0);
							UI.append(_user,MI.Tag._users);
							UI.animate(_user,'opacity',1,function(){
								UI.C(_user,'filter','');
							});
						}

						if (MI.Tag.count() > 0 && MI.Tag._users.childNodes.length){
							UI.hide('noCommon');
							UI.show('hasCommon');
						}

						//Hide No Tag Tip
						UI.hide(MI.Tag._noTag);

						//Clear Input
						MI.Tag._add.value = '';
						UI.show(MI.Tag._add.previousSibling);
					}
					else if (data.msg){
						MI.alert(data.msg);
					}
				}
			});
		}
		MI.Tag.adding = 1;
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
		}
		MI.Tag.deling = 1;
		return false;
	},
	addEvent : function(target){
		target = [target] || $$('.myTags li');
		var tags = [],
			delBtn;
		UI.each($$('.myTags li'),function(o){
			delBtn = $$(o,'.delTag')[0];
			delBtn.onclick = MI.Tag.del;
			UI.A(delBtn,'hideFocus','true');
			o.onmouseover = function(){
				this.className = 'hover';
				var fun = $$(this,'.tagFun')[0],funChild = fun.childNodes;
				fun.style.width = UI.width(funChild[0]) + UI.width(funChild[1]) - 3 + 'px';
			}
			o.onmouseout = function(){
				this.className = '';
			}
			tags.push($$(o,'a')[0].innerHTML);
		});
		UI.each(MI.Tag.listTxt,function(o,i){
			MI.Tag._lists[i].className = UI.has(tags,o) ? 'disabled' : '';
		});
	},
	/**
	 * ��ȡ�ҵı�ǩ��
	 * 
	 * @return {Number} ���ر�ǩ��
	 *            @example
	 *            MI.Tag.count();
	 */
	count : function(){
		return $$(MI.Tag._body,'li').length;
	}
}