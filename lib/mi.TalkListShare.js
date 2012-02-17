MI.TalkListShare = 1;
UI.css('.shareMsg{min-height:200px;_height:200px;}');
MI.tmpl.shareMsg = '<div class="shareMsg" style="display:none;padding-top:10px;"></div>';
MI.tmpl.shareMail = '<div class="shareToMail"><div class="mailCnt" style="visibility:hidden"><dl class="clear"><dt>' + _('发件人：') + '</dt><dd><p class="sender"><select></select></p><p class="cNote">(' + _('不想透露您的QQ号码？') + '<a href="https://mail.qq.com" target="_blank">' + _('注册英文邮箱账户') + '</a>)</p></dd><dt>' + _('收件人：') + '</dt><dd style="position:relative;"><textarea class="inputArea friendTextArea">' + _('一次最多可分享给20个好友') + '</textarea></dd><dt></dt><dd><div class="comPeople" style="display:none"><a href="#">' + _('常用联系人') + '<em class="btn_ldrop"></em></a><div class="mail_listWrap" style="display:none;"><div class="mail_lHead"><a class="close" title="' + _("关闭") + '"></a><table cellspacing="0" cellpadding="0" border="0" class="tHead"><tbody><tr><td class="t1"><input type="checkbox" class="selectAll"></td><td class="t2">' + _('姓名') + '</td><td class="t3">' + _('Email地址') + '</td></tr></tbody></table></div> <div class="mailBox" style="height:0"><ul class="mail_lcont"></ul></div> </div></div></dd></dl><div class="DmailCnt clear"><div class="dt">' + _('正文：') + '</div><div class="msgContent"><textArea class="shareReason"></textArea><p>' + _('以下内容来自腾讯微博：') +'</p><div class="msgSource"></div></div></div>\
	<div class="clear"><p class="btnBox"><button class="btn3 btnSend">' + _('分享') + '</button><button class="btn_cancel">' + _('取消') + '</button></p></div></div>\
	<div style="display: none;" class="mailStatus">' + _('你还没有关联QQ邮箱，') + '<a href="#">' + _('立即开通') + '<em class="ffsong">&gt;&gt;</em></a></div> <div style="display:none" class="mailStatus">自动开通失败，请<a href="https://mail.qq.com" target="_blank">' + _('点击此处') + '</a>手动开通</div><div style="display: none;" class="mailStatus"><a href="#"  style="margin-right:40px;">' + _('开通成功') + '</a><a  href="https://mail.qq.com" target="_blank">' + _('开通失败，再试一次') + '</a></div><div style="display: none;" class="mailStatus"><a href="#" style="margin-right:40px;">' + _('英文邮箱注册成功') + '</a><a href="#">' + _('下次再注册') + '</a></div><span class="countTxt"></span></div>';
MI.tmpl.shareQQ = '<div class="shareToFriend" style="display:none"><div class="shareMenu"><ul class="shareTab"><li class="select"><a href="#">' + _('QQ好友') + '</a></li><li><a href="#">' + _('QQ群') + '</a></li></ul><div class="shareSearch"><input type="text" class="inputTxt gray" value="' + _('输入QQ好友昵称或备注名称') + '"><span class="atbtn"><a class="btn_search2" title="' + _('搜索') + '" href="#"></a></span></div></div><div style="height:300px" class="shareFList"></div><div style="display:none;height:300px" class="shareFList"></div><div class="btnBox"><span class="error"></span><button class="btn3 btnSend">' + _('分享') + '</button><button class="btn_cancel">' + _('取消') + '</button></div><div class="noResult">' + _('没有找到合适的好友，重新试试') + '</div></div>';	MI.tmpl.shareQzone = '<div class="shareToQzone"  style="display:none"><dl class="clear"><dt>' + _('分享理由：') + '</dt><dd><textarea class="inputArea shareReason" style="height:60px"></textarea></dd><dt></dt><dd><p class="btnBox"><button class="btn3 btn_send">' + _('分享') + '</button><button class="btn_cancel">' + _('取消') + '</button></p><span class="countTxt">' + _('还能输入') + '<em>140</em>' + _('字') + '</span></dd></dl></div>';
MI.tmpl.shareTY = '<div style="padding:0 0 15px 60px;margin-top:-15px;visibility:hidden;" class="c_ty"><i class="ico"></i><a href="javascript:void(0)" target="_blank" onclick="MI.Bos(\'btnShareByTY\')">' + _('通过翼分享，免费将本条微博发送到电信手机') + '</a></div>';

MI.TalkList.shareCollection = (function(){
	var collectionTab = '<div class="DshareWrap"><div class="tabStyle1 shareTitle"><ul><li  class="select"><a href="#">' + _('邮箱分享') + '</a></li><li><a href="#">' + _('空间分享') + '</a></li><li><a href="#">' + _('QQ分享') + '</a></li><li><a href="#">' + _('私信分享') + '</a></li></ul></div>',	
		tmpHtml = collectionTab +  MI.tmpl.shareMail +  MI.tmpl.shareQzone  + MI.tmpl.shareQQ + MI.tmpl.shareMsg + MI.tmpl.shareTY + '</div>',
		body = UI.html(tmpHtml)[0],
		tyPhone = $$(body,'.c_ty a')[0],
		msgBox  = $$(body,'.shareMsg')[0],	  
		mailBox = $$(body,'.shareToMail')[0],
		qqBox = $$(body,'.shareToFriend')[0],
		qZoneBox = $$(body,'.shareToQzone')[0],
		tabs = $$(body,'.shareTitle li'),
		tabArray = ['shareMail','shareQzone','shareQQ','shareMsg'],  //和tab对应
		boxArray = [mailBox,qZoneBox,qqBox,msgBox],  	//和tab对应
		lastIndex = 0,			//最后一次点击的tab
		currId = '';			//当前id

	function init(){
		MI.TalkList.shareCollection[tabArray[lastIndex]](currId,1);  //初始化时显示第一个分享
		//init = function(){};
	}

	function show(id){
		currId = id.replace(/[^0-9]+/g,'');
		MI.dialog.show({title:'<h1 class="DmainTit"> </h1>',html:body,width:580,start:init});
		tabs[lastIndex].onclick();  //显示聚合时，触发上一次tab的点击
		shareByTY(id); //翼分享
		MI.Bos('btnShareCollection');
	}

	function hide(){
		MI.dialog.hide();
	}

	function hideLoad(){
		MI.dialog.hideLoad();
		UI.C(tyPhone.parentNode,'visibility','visible');
	}

	function showLoad(){
		MI.dialog.showLoad();
		UI.C(tyPhone.parentNode,'visibility','hidden');
	}

	UI.each(tabs,function(o,i){
		o.onclick = function(){
			if(UI.hasClass(this,'select')) return;
			hideLoad();	
			setTimeout(function(){
					MI.TalkList.shareCollection[tabArray[i]](currId)
			},0);  //调用各自的分享接口
			UI.each(boxArray,function(o,j){
				if(i==j) {
					UI.addClass(tabs[j],'select');
					UI.show(o);
				}	
				else {
					UI.removeClass(tabs[j],'select');
					UI.hide(o);
				}	
			});
			lastIndex = i;
			return false;
		}
	})

	//翼分享
	function shareByTY(id){
		var _msgBox = $$($(id),'.msgBox')[0],
		_cnt = $$(_msgBox,'.msgCnt')[0],
		_time = $$(_msgBox,'.pubInfo .time'),
		title = UI.text(_cnt).replace(/#/g,'＃').replace(/([^\x00-\xff])/g,function($1){
 			return escape($1).replace('%','\\');
		}),
		url =  UI.utfEncode(_time[_time.length-1].href || location.href);
		tyPhone.href = 'http://s.189share.com/interface.jsp?title=' + title + '&url=' + url;
	}

	return {
		show:show,
		hide:hide,
		hideLoad:hideLoad,
		showLoad:showLoad,
		body:body,
		msgBox:msgBox,
		mailBox:mailBox,
		qqBox:qqBox,
		qZoneBox:qZoneBox
	}
})();

MI.TalkList.shareCollection.shareMsg = (function(){  //私信分享
	var body = MI.TalkList.shareCollection.msgBox,
		loaded,
		contentId; //当前广播id

	function getContent(id){
		var _msgBox = $$($(id),'.msgBox')[0],
			_replyBox = $$(_msgBox,'.replyBox')[0],
			_uName = $$(_msgBox,'.userName a')[0]||$$(_msgBox,'strong a')[0],
			_cnt = $$(_msgBox,'.msgCnt')[0],
			_time = $$(_msgBox,'.pubInfo .time'),
			txt = _('推荐微博：“'),
			cntTxt = UI.text(_cnt);
        //简版微博 用户姓名 获取节点 不一致
		txt += UI.text(_uName) + ':';
		if(_replyBox) {
			txt += MI.string.cut((cntTxt + ' || ' +  UI.text($$(_replyBox,'.msgCnt')[0])),76,'……');
		} else {
			txt += MI.string.cut(cntTxt,76,'……');
		}
		txt +=  '” - ' + _('原文地址:') +  (_time[_time.length-1].href || location.href);
		return txt;
	}
	
	function RunOnce(){
		//if(loaded) return;
		var sendBtn = $$(body,'.btn_send')[0];
		var cancelBtn = UI.html('<button class="btn_cancel">' + _('取消') + '<button>')[0];
		UI.after(cancelBtn,sendBtn);
		sendBtn.innerHTML = _('分享');
		cancelBtn.parentNode.style.cssText = 'text-align:right;';
		cancelBtn.onclick = function(){
				MI.dialog.hide();
				MI.Bos('btnCancelShareMsg');
		};
		UI.EA(sendBtn,'click',function(){
			MI.Bos('btnConfirmShareMsg');
		});
	}

	var config = {
			dom:body,
			content:'',
			'onload':function(){
				MI.TalkList.shareCollection.hideLoad();
				RunOnce();
				loaded = 1;
			},
			onsendcomplete:function(){
				MI.tip(_('分享成功'));
			}
		};

	return function(id,auto){
		if(!auto && id == contentId) return;
		if(!loaded) MI.TalkList.shareCollection.showLoad();
		contentId = id;
		config.content = getContent(id);
		MI.pmembedcompose(config);
		MI.Bos('btnShareMsg');
	}
})();

MI.TalkList.shareCollection.shareQzone = (function(id){ // 分享到Qzone
	var body = MI.TalkList.shareCollection.qZoneBox,
		postId = '',
		sendBtn = $$(body,'.btn_send')[0],
		cancelBtn = $$(body,'.btn_cancel')[0],
		reason = $$(body,'.shareReason')[0],
		tip = $$(body,'.countTxt')[0],
		nickRe = /\|\|\s?[^()|]+?\(([^()|]+?)\)/gi;


	var shareCountObject = {
			_txt:reason,
			_btn:sendBtn,
			_tip:tip,
			_autoBackspace:null,
			countUrl:null,
			txtMax : 140,
			delay:{},
			txtTip : {empty : _('请输入内容')},
			showTip:MI.TalkBox.prototype.showTip,
			flashTip:MI.TalkBox.prototype.flashTip
		}
		
		function setReason(id){
			var wrap = $(id),txt = '';
			if(wrap && $$(wrap,'.replyBox').length>0) {
				txt = UI.text($$(wrap,'.msgCnt')[0]);
				var ele=$$(wrap,'.userName a')[0]||$$(wrap,'strong a')[0],rel;
				rel=UI.A(ele,"rel");							
				if (!rel) {
					rel = UI.A(ele, "title");									
					//截取 用户nick
					var userName=UI.text($$(wrap,'.msgCnt strong')[0]);
					txt=txt.slice(userName.length);					
				}				
				reason.value = (' || ' + rel  + ': ' +  txt).replace(nickRe,'|| $1');				
			}else {
				reason.value = '';
			}	
			count();
		}

		//分享理由，字数计算
		function count(isFlash){
				var o = shareCountObject;
				MI.TalkBox.prototype.countTxt.call(o);
				if(o._txt.value == '') o._btn.disable = 0;
				if(isFlash===true) o.flashTip();
		}

		
		//发送
		function send(){
			count(true);
			if(sendBtn.disable) return;
			MI.TalkList.shareCollection.showLoad();
			MI.ajax({
					url : MI.url.shareQzone,   //请求广播正文
					data : {id:postId,reason:reason.value},
					success : function(data){
						MI.TalkList.shareCollection.hideLoad();
						data = MI.json(data);
						if (data.result == 0){  
							MI.tip(_('分享成功'));
						}
						else {
							tip.innerHTML = '<span class="error">' + data.msg + '</span>';
						}	
					}
				});
			}


		UI.EA(reason,'keyup',count); 
		//UI.EA(reason,'keydown',count);
		UI.EA(reason,'blur',count);

		UI.EA(sendBtn,'click',function(){
			send();
			MI.Bos('btnConfirmShareQzone');
		});
		UI.EA(cancelBtn,'click',function(){
			MI.dialog.hide();
			MI.Bos('btnCancelShareQzone');
		});
		

	return function(id){
		setReason(id);
		postId = id;
		MI.TalkList.shareCollection.hideLoad();
		MI.Bos('btnShareQzone');
	}
})();

//邮箱输入自动联想
MI.FilterArea = function(o){
	this.queryStr = o.queryStr || ';';
	this.data = o.data;
	this.body = UI.html(o.html || '<div class="shareMailSug"></div>')[0];
	this.shadow = UI.html('<div class="mailTxtShadow"><span></span><b>|</b><span></span></div>')[0];
	this.target = o.target;
	this.sugResult = [];
	this.maxNum = 0;
	this.sugList = null;
	this.curr = 0;
	this.display = 0;
	this.cursorX = 0;

	UI.after(this.shadow,o.target);
	this.txtStart = this.shadow.firstChild;
	this.txtCursor = this.txtStart.nextSibling;
	this.txtEnd = this.shadow.lastChild;
	if (UI.B.ie) {
		UI.before(UI.html('<b style="display:none;width:0;overflow:hidden">\001</b>')[0],o.target);
	}

	this.build();
};

MI.FilterArea.prototype = {
	build:function(){  
		var Self = this;
		UI.append(Self.body,document.body);

		//事件
		UI.EA(Self.target,'keydown',function(e){
			var E = UI.E(e),index = Self.curr;
			if(!Self.display) return true;
			if(E.key == 38 || E.key == 40){
					if (E.key == 38) {
						index--
					}
					else if (E.key == 40) {
						index++;
					}
					if (index < 0) {
						index = Self.maxNum;
					}
					else if (index > Self.maxNum) {
						index = 0;
					}
				Self.setIndex(index);
				Self.body.scrollTop = (index+1)*20 - 100;
				E.prevent();
			}

			else if (E.key == 13 && Self.curr>=0) {
				Self.sugList[Self.curr].onclick();
				E.prevent();
			}
			else {
				Self.hide();
			}	
		});

		UI.EA(Self.target,'keyup',function(e){
			var E = UI.E(e);
			if(E.key == 13 || E.key == 38 || E.key == 40) {
				return false;
			}	
			if(E.key ==37 || E.key == 39) return true;

			Self.filter(Self.getKey());
		})

		UI.EA(document,'click',function(){Self.hide()});
		UI.EA(Self.body,'click',function(e){UI.E(e).stop();});
	},
	setIndex : function(index){ //设定结果列表当前项
		var Self = this;
		if(Self.curr>=0) UI.removeClass(Self.sugList[Self.curr],'on');
		UI.addClass(Self.sugList[index],'on');
		Self.curr = index;
	},
	getKey:function(){	//获取要查找的关键字，和选区范围
		var Self= this,x=0,val='',start=0,front='',end=0,key='';
		val = Self.target.value;
		x = MI.cursorX(Self.target);
		if(UI.B.ie && !UI.B.ie9) x += val.split('\n').length-1;  //ie6,7,8下换行计算偏差
		front = val.substring(0,x);
		start = front.lastIndexOf(Self.queryStr) + 1;		//光标前一个;号位置，如果没有则为0
		end = val.substring(start).indexOf(Self.queryStr);
		//if(end>0 && UI.B.ie) x--;  //ie中一像素偏差
		key = front.substring(start,x);
		end =  end<0 ? val.length  : end + start;	//光标后一个分号位置，如果没有则为最后
		
		Self.cursorX = x;
		Self.start = start;
		Self.end = end;		

		Self.txtStart.innerHTML = Self.shadowText(front);
		Self.txtEnd.innerHTML = Self.shadowText(val.substring(x));
		return UI.trim(key);
	},
	filter : function(key){
		var Self=this,o = Self.data,result=[],mail,name;
		if(!key) return;
		for(i in o) {
			if(i.hasString(key) || o[i].hasString(key)) {
				mail = i.split(key).join('<b>' + key + '</b>');
				name = o[i].split(key).join('<b>' + key + '</b>');
				result.push('<li data="' + i + '">"' + name + '" ' + mail + '</li>'); 
			}
		}
		Self.sugResult = result;
		Self.show();
	},
	updata : function(str){	
		var Self = this;
		var del = Self.end-Self.start;
		if(Self.end == Self.target.value.length) {
			str =  str + ';';
		}	
		MI.selectTxt(Self.target,Self.end,Self.end); //ie中需要先将光标移到end位置
		MI.insertTxt(Self.target,str,Self.end,del); //光标前后;号之间插入
		Self.hide();
	},
	setPos : function(){
		var Self = this;
		Self.shadow.scrollTop = Self.target.scrollTop;
		Self.body.style.left = UI.getX(Self.txtCursor) + 'px';
		Self.body.style.top =  UI.getY(Self.txtCursor) - Self.shadow.scrollTop  + 20 +  'px'; //16为文字高度偏移
	},
	shadowText : function(text){
		return text.replace(/\r\n|\n/g,'<br>').replace(/ /g,'&nbsp;');
	},
	show : function(){
		var Self = this;
		if(!Self.sugResult.length) return;
		clearTimeout(Self.delay);
		Self.body.innerHTML = '<ul>' + Self.sugResult.join('') + '</ul>'; 
		Self.sugList = UI.GT(Self.body,'li');
		Self.maxNum = Self.sugList.length -1;
		Self.curr = -1;
		
		Self.setPos();
		UI.show(Self.body);
		Self.setIndex(0);
		Self.display = 1;
		

		UI.each(Self.sugList,function(o,i){
			o.onmouseover = function(){
				Self.setIndex(i);
			}
			o.onclick = function(){
				var selected = UI.A(Self.sugList[Self.curr],'data')
				Self.updata(selected);
			}
		})		
	},
	hide : function(){
		var Self = this;
		clearTimeout(Self.delay);
		Self.delay = setTimeout(function(){
			UI.hide(Self.body);
			Self.display = 0;
		},200);	
	}
};


MI.TalkList.shareCollection.shareMail = (function(){

	//	var html = UI.html(MI.tmpl.shareMail)[0],
		var html = MI.TalkList.shareCollection.mailBox,
			title = _('腾讯微博分享'),
			mailCnt = $$(html,'.mailCnt')[0],
			mailStatus = $$(html,'.mailStatus'),
			sender = $$(mailCnt,'.sender')[0],		 		//发件人
			comPeople = $$(mailCnt,'.comPeople')[0],   		//联系人
			msgCntBox = $$(html,'.msgContent')[0],		//转发正文
			reason = $$(msgCntBox,'.shareReason')[0],			//转发理由
			//reason2 = $$(msgCntBox,'.notes')[0],
			msgSource = $$(msgCntBox,'.msgSource')[0],	 //消息原文
			sourceNum = 0,									//原文字数
			cNote = $$(mailCnt,'.cNote')[0],		  		 //英文邮箱提醒
			regEnBtn = UI.GT(cNote,'a')[0],	  
			textArea = $$(mailCnt,'.friendTextArea')[0],	 	//textarea
			tip = $$(html,'.countTxt')[0],					//字数计算
			mail_lcont = $$(comPeople,'.mail_lcont')[0],   //联系人列表
			close = $$(comPeople,'.close')[0],				//关闭联系人列表
			mail_listWrap = $$(comPeople,'.mail_listWrap')[0], 
			mailBox = $$(mail_listWrap,'.mailBox')[0],
			dropToggle = UI.GT(comPeople,'a')[0],
			selectAll = $$(comPeople,'.selectAll')[0],  
			btn_ldrop = UI.GT(dropToggle,'em')[0],
			regAuto = UI.GT(mailStatus[0],'a')[0],		 //未注册邮箱提醒
			regBySelf = UI.GT(mailStatus[1],'a')[0],
			regSucc = UI.GT(mailStatus[2],'a')[0],	 	//手动注册成功
			regAgian = UI.GT(mailStatus[2],'a')[1],		//手动注册失败
			regEnSucc = UI.GT(mailStatus[3],'a')[0],  	 //英文邮箱等待
			regEnNext = UI.GT(mailStatus[3],'a')[1],	//下次注册
			sendBtn = $$(html,'.btnBox .btnSend')[0],  	  //发送邮件
			cancelBtn = $$(html,'.btnBox .btn_cancel')[0],   //取消按钮
			hasContact = false,   						//是否已加载联系人
			hasCheckedMail = false,						//是否检查过邮件账户
			msgId = '',   							//广播消息id
			animate, 								//折叠动画计时器
			splitNum=0,								//输入框当前的分号数量
			comHeight=260,							//联系人列表下拉框高度
			myMail = [],							//发件人邮箱
			msgCache = {},   						//存储广播正文
			mailObject = {},						//存储常用联系人
			re = /^[^<>()[\]\\;:\s@]+@(([a-zA-Z0-9]\-?)*?[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/;


		

		//设置正文预览
		function getMsgCont(id){
			//msgSource.innerHTML = $(id).innerHTML;
			if(msgCache[id])  {
				setMsgCont(msgCache[id]);
			} else {
				MI.ajax({
					url : MI.url.shareMail,   //请求广播正文
					data : {body:parseInt(id),type:1},
					success : function(data){
						data = MI.json(data);
						if (data.result == 0){
							setMsgCont(data.info);
							msgCache[id] = data.info;
						}
						else {
							setError(data.msg);	
						}	
					}
				});
			}	
		}
		

		function setMsgCont(txt) {
			msgSource.innerHTML = txt;
			sourceNum = MI.string.length(UI.text(msgSource));
			if(hasContact) count();
			UI.each(UI.GT(msgSource,'a'),function(o){
				o.onclick = function(){return false;}	
			});
		}

		//选择
		function toggleAddress(){
			var mail = UI.A(this,'mail');
			var tmpReg = new RegExp(mail,'g');
			var hasStr = textArea.value.indexOf(mail) != -1;
			if(this.checked && !hasStr) {
				textArea.value = (textArea.value + ';' + mail);
			}
			else if(!this.checked && hasStr) {
				textArea.value = textArea.value.replace(tmpReg,'');
			}
		}
		
		//错误信息
		function setError(str,isBlink,isCount){  //是否闪烁和是否为计算字数
			clearInterval(tip.fadeIn);
			clearInterval(tip.fadeOut);
			if(!isCount) {tip.innerHTML = '<span class="error">' + str + '</span>';}
			else {tip.innerHTML = str};
			if(isBlink) {
				tip.fadeOut = UI.animate(tip,'opacity',0,function(){
					tip.fadeIn = UI.animate(tip,'opacity',1,function(){
					},0.4);
				},0.4);
			}
		}

		//联系人列表
		function buildContact(c){
			var list = [],j=0;
			for(i in c) {
				j++;
				list.push('<li' + (j%2 ? ' class="cbg2"' : '') + '>'  );
				list.push('<table cellspacing="0" cellpadding="0" border="0" class="tCont"><tbody><tr><td class="c1"><input ');
				list.push('mail="' + i + '" type="checkbox"></td>');
				list.push('<td class="c2">' + (MI.string.length(c[i]) > 13 ? MI.string.cut(c[i],10,'...') : c[i]) + '</td>');
				list.push('<td class="c3" title="' + i + '">' + MI.string.cut(i,18,'...') + '</td></tr></tbody></table></li>');
				mailObject[i] = c[i];
			}
			if(j>0) {
				mail_lcont.innerHTML = list.join('');
				UI.show(comPeople);
				UI.each(UI.GT(mail_lcont,'input'),function(o){
					o.onclick = function(e){
						if(e || window.event) UI.E(e).stop();
						if(textArea.value == textArea.defaultValue) textArea.value = '';
						toggleAddress.call(o);
						checkNum();
					}
					UI.parents(o,'tCont')[0].onclick = function(){
						o.checked = !o.checked;
						o.onclick();
					}
				});
				hasContact = true;
				comHeight = j>10 ? 260 : j*26 ;
			}
			var filterMail = new MI.FilterArea({data:mailObject,target:textArea});
		}

		//发件人
		function setSender(o){
			if(o.enMail) UI.hide(cNote);
			if(o.mail && !o.mailist) o.mailist = [o.mail]; //自动开通
			if(o.mailist && o.mailist.length != myMail.length) {
				var opt = '<select>';
				UI.each(o.mailist,function(p){
					opt += '<option value="' + p + '">' + p + '</option>';
				})
				opt += '</select>';
				sender.innerHTML = opt;
				myMail = o.mailist;
			}
		}


		//检查邮箱
		function checkMail(call1,call2,call3){
			MI.TalkList.shareCollection.showLoad();
			MI.ajax({
				url : MI.url.shareMailList,
				data : {op:1},
				success : function(data){
					setError('');
					MI.TalkList.shareCollection.hideLoad();
					data = MI.json(data);
					if (data.result == 0){  //有邮箱
						var o = data.info;
					setSender(o);
						if(!UI.isArray(o.contact) && !hasContact) { //有联系人
							buildContact(o.contact);
						}
						hasCheckedMail = true;
						if(call1) call1();
					}
					else if(data.result == -126 || data.result == -130) {  //没有注册邮箱
						if(call2) call2();
					}
					else {
						if(call3) call3(data);
					}
				}
			});
		}
				

		//检查有效收件人
		function checkNum(unFilter){
			setError('');
			UI.removeClass(textArea,'gray');
			var tmpStr = textArea.value.replace(/;;+/g,';').replace(/(^;|;$)/g,'');
			textArea.value = !unFilter ? tmpStr : textArea.value;  //键盘输入时，不替换输入框文字
			if(UI.trim(tmpStr)=='') return false;
			var oldArr = tmpStr.split(';');
			if(oldArr.length > 20) {
				setError(_('收件人多于20个'),this==sendBtn);
				return false;
			}
			var newArr = [],i=0;
			UI.each(oldArr,function(o){
				if(re.test(UI.trim(o))) {
					newArr.push(o);
				}
				else {
					i++;
				}
			});
			if(unFilter && textArea.value.charAt(textArea.value.length-1) != ';') i--;  //退格键时，最后不是';'的话，忽略最后一个
			if(i>0) setError(_('有') + i + _('个收件人邮箱不合法'),this==sendBtn);
			return newArr.join(';');
		}

		//发送邮件
		function sendMail(){
			if((textArea.value == textArea.defaultValue) || UI.trim(textArea.value) == '') {
				setError(_('请填写收件人邮箱地址'),true);
				return false;
			}
			var contact = checkNum.call(sendBtn);
			if(!contact) return false;

			var checkTxt = count(true);
			if(!checkTxt) return false;
			var reasonText = reason.value;
			slideUpConact();
			MI.TalkList.shareCollection.showLoad();
			MI.ajax({
				url:MI.url.shareMail,
				data:{mailAddr:UI.GT(sender,'select')[0].value,mlist:contact,subject:title,body:msgId,reason:reasonText},  //只发20个联系人
				success:function(data){
					MI.TalkList.shareCollection.hideLoad();
					data = MI.json(data);
					if(data.result == 0){
						setTimeout(function(){
							MI.tip(_('分享成功'));
						},0);	
						if(MI.isS) MI.S('option_shareMail_' + MI.user.account ,contact);
					}
					else {
						setError(data.msg);
					}
				}
			});
			MI.Bos('btnConfirmShareMail');
		}

		//没拉取到邮箱数据前的检查
		function firstCheck(){
			if(hasCheckedMail) {
				setFocus();
				return;
			};
			checkMail(function(){
				mailCnt.style.visibility = 'visible';
				if(MI.isS) textArea.value = MI.S('option_shareMail_' + MI.user.account) || '';
				setFocus();
			},function(){
				UI.hide(mailCnt);
				UI.show(mailStatus[0]);
				UI.hide(mailStatus[1]);
			},function(data){
				//MI.alert(data.msg);
				setError(data.msg);
			});
		};

		//设置焦点
		function setFocus(){
			if(!UI.trim(textArea.value) || textArea.value == textArea.defaultValue){
				textArea.focus();
			}else {
				var x = reason.value.length;
				reason.focus();
				MI.selectTxt(reason,x,x);
			}
		}

		//多选
		selectAll.onclick = function(){
			var isCheck = this.checked;
			var checkbox = UI.GT(mail_lcont,'input');
			if(textArea.value == textArea.defaultValue) textArea.value = '';
			UI.each(checkbox,function(o){
				o.checked = isCheck;
				toggleAddress.call(o);
			});
			checkNum();
		}

		//折叠
		dropToggle.onclick = function(e){
			clearInterval(animate);
			UI.E(e).prevent();
			UI.toggleClass(btn_ldrop,'lopen');
			if(UI.hasClass(btn_ldrop,'lopen')) {
				UI.show(mail_listWrap);
				animate = UI.animate(mailBox,'height',comHeight,function(){},0.4);
				MI.Bos('btnShareContact');
			}
			else {
				animate = UI.animate(mailBox,'height',0,function(){
					UI.hide(mail_listWrap);
				},0.4);
			}	
		}

		//还原折叠
		function slideUpConact(){
			setError('');
			UI.hide(mail_listWrap);
			UI.removeClass(btn_ldrop,'lopen');
			mailBox.style.height = 0 + 'px';
		}
		
		//注册
		regAuto.onclick = function(e){
			UI.E(e).prevent();
			MI.TalkList.shareCollection.showLoad();
			MI.ajax({
				url : MI.url.shareMailActive,
				data : '',
				success : function(data){   //自动开通
					MI.TalkList.shareCollection.hideLoad();
					data = MI.json(data);
					if(data.result == 0) {
						setSender(data.info);
						UI.hide(mailStatus[0]);
						setSender(data.info);
						UI.show(mailCnt);
						mailCnt.style.visibility = 'visible';
						hasCheckedMail = true;
					}
					else {
						UI.hide(mailStatus[0]);
						UI.show(mailStatus[1]);
					}
					
				}
			});
			MI.Bos('btnShareRegMail');
		}
		
		//自动注册失败，点击此处
		regBySelf.onclick = function(e){
			UI.hide(mailStatus[1]);
			UI.show(mailStatus[2]);
		}

		//注册成功 
		regSucc.onclick = function(e){
			UI.E(e).prevent();
			checkMail(function(){
				UI.show(mailCnt);
				mailCnt.style.visibility = 'visible';
				UI.hide(mailStatus[2]);
			},function(){
				UI.show(mailStatus[0]);
				UI.hide(mailStatus[2]);
			},function(data){
				setError(data.msg);
			});
		} 
		
		//注册失败，再试一次
		regAgian.onclick = function(e) {
			setError('');
		}

		//注册英文邮箱
		regEnBtn.onclick = function(){
			setError('');
			UI.hide(mailCnt);
			UI.show(mailStatus[3]);
			MI.Bos('btnShareRegEnMail');
		}

		//英文邮箱注册成功
		regEnSucc.onclick = function(e){
			UI.E(e).prevent();
			checkMail(function(){
				UI.show(mailCnt);
				UI.hide(mailStatus[3]);
			},function(){
				UI.show(mailCnt);
				UI.hide(mailStatus[3]);
			},function(data){
				setError(data.msg);
			});
		}
		
		//下次注册
		regEnNext.onclick = function(e){
			setError('');
			UI.E(e).prevent();
			UI.hide(mailStatus[3]);
			UI.show(mailCnt);
		}

		//textArea 占位文字
		textArea.onfocus = function(){
			setError('');
			if(this.value == this.defaultValue) {
				this.value = '';
			}
			UI.removeClass(textArea,'gray');
		}

		//输入框中的分号数量
		function getSplitNum(){
			var str = textArea.value,n=0;
			for(var i=0;i<str.length;i++){
				if(str.charAt(i)==';') n++; 
			}
			return n;
		}
		//处理space键和逗号
		textArea.onkeydown = function(e){
			e = UI.E(e);
			if(e.key == 32 || e.key == 188){
				var x = MI.cursorX(this);
				MI.insertTxt(this,';',x);	//空格和逗号替换成分号
				splitNum = getSplitNum();
				checkNum(true);
				MI.selectTxt(this,x,x); //还原光标位置
				return false;
			}
			splitNum = getSplitNum();
		}

		//键盘事件
		textArea.onkeyup = function(e){
			e = UI.E(e);
			var x = MI.cursorX(this);
			if(e.key == 186 || e.key == 59) {	//逗号
				checkNum(true);
				MI.selectTxt(this,x,x);  //还原光标位置
			}
			else if(e.key == 8) {	//退格
				var str = textArea.value;
				if(UI.trim(str) == '') checkNum(true);  //删除所有文本
				else if(str.charAt(str.length-1)==';') checkNum(true);	//最后是';'
				else if(splitNum != getSplitNum()) checkNum(true);		//';'数量有变化
				MI.selectTxt(this,x,x);  //还原光标位置
			}
			
		}
		
		textArea.onblur = function(){
			checkNum(true);
			if(UI.trim(textArea.value)=='') {
				textArea.value = textArea.defaultValue;
				UI.addClass(textArea,'gray');
			}
		}

		//分享理由，字数计算
		function count(isBlink){
			var txtMax = 5000, 
				tipTxt = '',
				len = MI.string.length,
				check = true,
				length = Math.ceil(len(reason.value)/2 + sourceNum/2);

			if(!length) {return check;}
			/*
			else if(length <= txtMax) {
				tipTxt = _('还能输入') + '<em>' + Math.abs(txtMax - length) + '</em>'  +  _('字');
			}*/
			if(length > txtMax) {
				tipTxt = _('正文内容超出') + '<em class="error">' + Math.abs(txtMax - length) + '</em>'+ _('字');
				check = false;
			}
			setError(tipTxt,isBlink,true);
			return check;
		};

		var delayHeight;
		function autoHeight(autoScroll){
			var el = reason,maxHeight = 2000;  
			clearTimeout(delayHeight);
			delayHeight = setTimeout(function(){
				UI.C(el,'height','');
				var height = el.scrollHeight;
				if (UI.B.ie && height < 31) {
					height = 30;
				}
				UI.C(el,'height',height + 'px');
				if(autoScroll && height>150) {
					msgCntBox.scrollTop = height - 150;  //调整外层div的滚动条距离	
				}	
			},UI.B.ipad ? 800 : 100);
			count();
		}
	
		//UI.EA(reason,'propertychange',autoHeight);
		UI.EA(reason,'keyup',function(){autoHeight(1)});
		UI.EA(reason,'blur',function(){autoHeight()});
		UI.EA(reason,'focus',function(){autoHeight()});

		//取消按钮
		cancelBtn.onclick = function(){
			slideUpConact();
			MI.dialog.hide();
			MI.Bos('btnCancelShareMail');
		}
		
		//关闭联系人列表
		close.onclick = function(){
			slideUpConact();
		}
		
		//发送邮件
		sendBtn.onclick = sendMail;
		
		return function(id){
			//MI.dialog.show({title:'<h1 class="DmainTit">' + _('通过QQMail分享给好友') + '</h1>',html:html,width:444,start:firstCheck});
			firstCheck();
			msgId = id;
			getMsgCont(id);
			MI.Bos('btnShareMail');
		}
})();

//分享到qq好友
MI.TalkList.shareCollection.shareQQ = (function(){
	//var html = UI.html(MI.tmpl.shareQQ)[0],
	  var html = MI.TalkList.shareCollection.qqBox,
		tab = $$(html,'.shareTab li'),
		box = $$(html,'.shareFList'),
		sInput = $$(html,'.shareSearch input')[0],
		clearBtn = $$(html,'.atbtn .btn_search2')[0],
		shareBtn = $$(html,'.btnBox button'),  
		errorTips = $$(html,'.error')[0],
		noResult = $$(html,'.noResult')[0],
		hideTitle = [false,false],	//存储dt状态
		hasResult = [true,true],  //存储是否有搜索结果
		sValue = ['',''],	//存储搜索关键词
		sDefaultValue = [_('输入QQ好友昵称或备注名称'),_('输入QQ群名称')], //初始提示 
		sNode = [],			//存储p
		checkBox = null,	//存储checkbox
		sKey = [{},{}],		//存储姓名
		curr = 0,  			//当前tab
		hasPulled = false,  //是否拉取过qq数据
		selectedId = [{num:0,member:{},checkable:true},{num:0,member:{},checkable:true}],	//已选择的好友
		postId = '';   //微博消息id

	//拉取好友数据
	function pullData(){
		if(hasPulled) return;
		MI.TalkList.shareCollection.showLoad();
		MI.ajax({
			url : MI.url.shareQQList,
			type : 'get',
			data : 'account=' + MI.user.account + '&r=' + MI.random(),
			success : function(data){
				MI.TalkList.shareCollection.hideLoad();
				data = MI.json(data);
				if(data.result == 0) {
					createList(data.info);
					hasPulled = true;
				}
				else {
					//MI.alert(data.msg);
					setError(data.msg);
				}
			}
		});
	}
	
	//生成联系人列表

	function createList(data){
		var f = [],g = [],index=0,j=0;
		UI.each(data.friend,function(o,i){
			f.push('<dl ' + (i==0 ? 'class="on"' : '') + '><dt><em class="btn_ldrop"></em>' + o.name.toTitle() + '</dt><dd>');
			UI.each(o.member,function(p){
				p.nick += '';
				f.push('<p class="f' + p.qq + '"><label><input type="checkbox" id="' + p.qq +'">');
				f.push('<span>' + p.nick.toTitle() + '</span></label></p>');
				sKey[0]['f' + p.qq] = p.nick.toLowerCase();
				
				index++;
			});
			f.push('</dd></dl>');
		});
		
		g.push('<dl class="on"><dd>');
		for(qq in data.group) {
			data.group[qq] += '';
			g.push('<p class="g' + qq + '"><label><input type="checkbox" id="' + qq +'">');
			g.push('<span>' + data.group[qq].toTitle() + '</span></label></p>');
			sKey[1]['g' + qq] = data.group[qq].toLowerCase();
			j++;
		}
		g.push('</dd></dl>');
		if(j==0) g.push('<div class="noGroup">' + _('你还没有加入任何QQ群') + '</div>');

		box[0].innerHTML = f.join('');
		box[1].innerHTML = g.join('');
		slide();
	}



	/*

	function createList(data){
		var f = [],g = [],index=0,j=0;
		UI.each(data.friend,function(o,i){
			f.push('<dl ' + (i==0 ? 'class="on"' : '') + '><dt><em class="btn_ldrop"></em>' + o.name.toTitle() + '</dt><dd>');
			UI.each(o.member,function(p){
				f.push('<p class="f' + index + '"><label><input type="checkbox" id="' + p.qq +'">');
				f.push('<span>' + p.nick.toTitle() + '</span></label></p>');
				sKey[0]['f' + index] = p.nick.toLowerCase();
				index++;
			});
			f.push('</dd></dl>');
		});

		UI.each(data.group,function(o,i){
			g.push('<dl ' + (i==0 ? 'class="on"' : '') + '><dt><em class="btn_ldrop"></em>' + o.name.toTitle() + '</dt><dd>');
			UI.each(o.member,function(p){
				g.push('<p class="g' + j + '"><label><input type="checkbox" id="' + p.qq +'">');
				g.push('<span>' + p.nick.toTitle() + '</span></label></p>');
				sKey[1]['g' + j] = p.nick.toLowerCase();
				j++;
			});
			g.push('</dd></dl>');
		});
		if(j==0) g.push('<div class="noGroup">' + _('你还没有加入任何QQ群') + '</div>');

		box[0].innerHTML = f.join('');
		box[1].innerHTML = g.join('');
		slide();
	}
	*/

	//折叠
	function slide(){
		UI.each($$(html,'.shareFList dt'),function(o){
			var p = o.parentNode;
			o.onclick = function(){
				UI.each(UI.GT(p.parentNode,'dl'),function(q){
					if(q==p) {
						UI.toggleClass(q,'on');
					}
					else {
						UI.removeClass(q,'on');	
					}		
				});
			}

			o.onmouseover = function(){
				UI.addClass(p,'hover');
			}
			
			o.onmouseout = function(){
				UI.removeClass(p,'hover');
			}
		});

		UI.each(tab,function(o,i){
			sNode[i] = UI.GT(box[i],'p');
			o.onclick = function(){
				if(i!=curr) {
					sValue[curr]= sInput.value;
					UI.hide(box[curr]);
					UI.removeClass(tab[curr],'select');
					UI.show(box[i]);
					UI.addClass(tab[i],'select');
					setError('');
					sInput.value = sValue[i];
					toggleSearchBtn();
					curr = i;
					if(i==1) MI.Bos('btnQQShareGroupTab');
					if(sValue[i]=='') {sInput.value = sDefaultValue[i]};
					if(sInput.value == sDefaultValue[i]) {
						UI.addClass(sInput,'gray');
					} else {
						UI.removeClass(sInput,'gray');
					}
					noResult.style.display = hasResult[curr] ? 'none' : 'block';
					noResult.innerHTML = _('没有找到合适的{0}，重新试试',[_('好友'),_('群')][curr]);
				}	
				return false;
			}
		})

		checkBox = $$(html,'.shareFList input');
		UI.each(checkBox,function(o){
			o.onclick = function(e){
				UI.E(e).stop();
				checkNum.call(this);
			}
		})
	}

	//复选框处理
	function checkNum(){
		var o = selectedId[curr],id = this.id,n = [3,2][curr],type=[_('好友'),_('群')][curr];
		if(this.checked) {
			o.member[id] = id;
			o.num++;
		}
		else {
			delete o.member[id];
			o.num--;
		}
		setError(o.num > n ? _('已选择{0}个{1},最多只能选择{2}个{3}',o.num,type,n,type) : _('还能选择{0}个{1}',n - o.num,type));
		MI.Bos(['btnQQShareFriend','btnQQShareGroup'][curr]);
	}
	
	/*
	function toogleCheck(bool) {
		UI.each(sNode[curr],function(o){
			var input = UI.GT(o,'input')[0];
			if(!input.checked) input.disabled = bool;	
		})
	}
	*/
	
	//提示
	function setError(str,isBlink){
		clearInterval(errorTips.fadeIn);
		clearInterval(errorTips.fadeOut);
		errorTips.innerHTML = str;
		if(isBlink) {
			errorTips.fadeOut = UI.animate(errorTips,'opacity',0,function(){
				errorTips.fadeIn = UI.animate(errorTips,'opacity',1,function(){
				},0.4);
			},0.4);
		}
	}
	
	//搜索
	function search(value){
		var s = {};
		hasResult[curr] = false;
		value = value.toLowerCase();
		for(i in sKey[curr]) {
			if(sKey[curr][i].indexOf(value) != -1) {
				s[i]= i;
				hasResult[curr] = true;
			}	
		}
		noResult.style.display = hasResult[curr] ? 'none' : 'block';
		UI.each(sNode[curr],function(o){
			o.style.display = s[o.className] ? 'block' :'none';
			if(s[o.className] && value!='') delete s[o.className];
		})
	}

	//发送消息
	function sendMsg(){
		setError('');
		if(0 == selectedId[0].num + selectedId[1].num) {
			setError(_('请选择好友或群'),true);
			return false;
		}

		var outnumber = false,conf=[[],[]];
		UI.each(selectedId,function(o,i){
			var type = [_('好友'),_('群')][i];
			if(o.num > [3,2][i])  {
				setError(_('已选择{0}个{1}，最多只能选择{2}个{3}',o.num,type,[3,2][i],type),true);
				outnumber = true;
			}
			UI.each(o.member,function(m){
				conf[i].push(m);
			})
		})
		if(outnumber) return false;

		MI.TalkList.shareCollection.showLoad();
		MI.ajax({
			url:MI.url.shareQQ,
			data:{id:postId,uins:conf[0].join(','),group:conf[1].join(',')},  
			success:function(data){
				MI.TalkList.shareCollection.hideLoad();
				data = MI.json(data);
				if(data.result == 0){
					setTimeout(function(){
						MI.tip(_('分享成功'));
					},0);	
				}
				else {
					setError(data.msg);
				}
			}
		});
		MI.Bos('btnConfirmShareQQ');
	}

	//改变搜索按钮状态
	function toggleSearchBtn(){
		var noValue = sInput.value == '';
		clearBtn.className = noValue ? 'btn_search2' : 'del';
		clearBtn.title = noValue ? _('搜索') : _('清除');
	}

	//事件
	sInput.onkeyup = function(){
		if(!sNode[curr].length)  return;
		var noValue = this.value == '';
		search(this.value);
		if(!hideTitle[curr]) {
			UI.each(UI.GT(box[curr],'dl'),function(o){
				UI.addClass(o,'find');
			})
			hideTitle[curr] = true;
		}
		if(noValue && hideTitle[curr]) {
			UI.each(UI.GT(box[curr],'dl'),function(o){
				UI.removeClass(o,'find');
			})
			hideTitle[curr] = false;
		}
		toggleSearchBtn();
	}
	
	sInput.onfocus = function(){
		if(this.value == sDefaultValue[curr]) this.value = '';
		UI.removeClass(this,'gray');
	}

	sInput.onblur = function(){
		if(this.value == '') {
			this.value = sDefaultValue[curr];
			UI.addClass(this,'gray');
		}
	}


	//清除搜索
	clearBtn.onclick = function(){
		if(this.className == 'del') {
			sInput.value = '';
			sInput.onkeyup();
		}
		sInput.focus();
		return false;
	}
	//分享
	shareBtn[0].onclick = sendMsg;
	shareBtn[0].onblur = function(){
		setError('');
	}
	//取消
	shareBtn[1].onclick = function(){
		MI.dialog.hide();
		MI.Bos('btnCancelShareQQ');
	}

	//接口
	return function(id){
		setError('');
		//MI.dialog.show({title:'<h3 class="DmainTit">' +  _('分享给QQ好友') + '</h3>',html:html,width:444,start:pullData});
		pullData();
		postId = id;
		MI.Bos('btnShareQQ');
	}
})();
