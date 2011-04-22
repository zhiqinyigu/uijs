
String.prototype.toTitle = function(){
	return this.replace(/\r/g, '')
		.replace(/\n/g, "")
		.replace(/\'/g, '&#39;')
		.replace(/\"/g, '&#34;')
		.replace(/</g,"&#60;")
		.replace(/>/g,"&#62;");
};
$ = UI.G;
$$ = UI.GC;

(function(){
var V1='talk[i].source',V2='info.source',V3='<div class="SA"><em>◆</em><span>◆</span></div>',V5=' href="#"',V6=' onerror="MI.Pic(this,120)"',V7=' title="<%=talk[i].nick.toTitle()%>(@<%=talk[i].name%>)"';
MIIco = ['auth','expo','cic']; //Set Icon's Order
MIIcoHtml = ['<a href="/certification" target="_blank" class="vip" title="腾讯认证"></a>','<a href="http://blog.qq.com/zt/2010/2010expo/shibovol.htm" title="2010上海世博志愿者" target="_blank" class="ico_expo"></a>','<a href="http://t.qq.com/group.php?g=cic2010" onclick="MI.Bos(\'btnIconCic\')" class="ico_net" title="互联网大会认证名人"></a>'];
MIIcoWC = function(id){
	return '<a href="/k/' + MIIcoWC.v[id] + '队" title="去' + MIIcoWC.v[id] + '队主场一起狂欢" class="ico_flag flag' + id + '" target="_blank"></a>';
}
MIIcoWC.v = ['','南非','墨西哥','乌拉圭','法国','阿根廷','尼日利亚','韩国','希腊','英格兰','美国','阿尔及利亚','斯洛文尼亚','德国','澳大利亚','塞尔维亚','加纳','荷兰','丹麦','日本','喀麦隆','意大利','巴拉圭','新西兰','斯洛伐克','巴西','朝鲜','科特迪瓦','葡萄牙','西班牙','瑞士','洪都拉斯','智利','中国'];
MI_icon = function(obj){
	return '<%for(var k=0,num=MIIco.length;k<num;k++){if('+obj+'[MIIco[k]]){%><%=MIIcoHtml[k]%><%;break;}}if('+obj+'.wc){%><%=MIIcoWC('+obj+'.wc)%><%;}%>';
}
MI = {
	time : null, //Server's System Time
	user : {},
	string : {
		length : function(str){
			var arr = str.match(/[^\x00-\x80]/g);
			return str.length + (arr ? arr.length : 0);
		},
		escape : function(str){
			return MI.string.html(str).replace(/'/g,"\\'");
		},
		escapeReg : function(str){
			var buf = [];
			for(var i = 0;i < str.length;i++){
				var c = str.charAt(i);
				switch (c) {
					case '.' : buf.push('\\x2E');break;
					case '$' : buf.push('\\x24');break;
					case '^' : buf.push('\\x5E');break;
					case '{' : buf.push('\\x7B');break;
					case '[' : buf.push('\\x5B');break;
					case '(' : buf.push('\\x28');break;
					case '|' : buf.push('\\x28');break;
					case ')' : buf.push('\\x29');break;
					case '*' : buf.push('\\x2A');break;
					case '+' : buf.push('\\x2B');break;
					case '?' : buf.push('\\x3F');break;
					case '\\' : buf.push('\\x5C');break;
					default : buf.push(c);
				}
			}
			return buf.join('');
		},
		html : function(str){
			return str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		},
		cut : function(str,num){
			var arrNew = [],
				strNew = '',
				arr,
				length = MI.string.length(str);
			if (length > num) {
				arr = str.split('');
				for (var i = 0,len = arr.length;i < len;i++) {
					if (num > 0) {
						arrNew.push(arr[i]);
						num -= MI.string.length(arr[i]);
					}
					else {
						break;
					}
				}
				strNew = arrNew.join('') + '...';
			}
			else {
				strNew = str;
			}
			return strNew;
		}
	},
	number : {
		format : function(str){ //Format: 1000 --> 1,000
			return (str + '').replace(/(?=(?!\b)(?:\w{3})+$)/g,",")
		}
	},
	random : function(delay){ //delay = 1000 ---> 1s
		delay = delay || 1;
		return parseInt( new Date().getTime()/delay );
	},
	drop : {}, //Cache Drop Menu
	delay : {},
	validate : {
		
	},
	canvas : {}, //Cache Canvas Object
	blur : function(){ //For <a> Blur
		this.blur();
	},
	click : function(){ //For <a> No Href
		 return false;
	},
	hideFocus : function(){
		UI.A(this,'hideFocus','true');
		this.onmouseover = null;
	},
	ajax : 0, //Ajax Times
	talkNew : [],
	talkMore : [],
	crs : [], //Lazy Load Images With ClassName Of '.crs' (Src)
	json : function(data){
		var o = {};
		try{
			o = eval('(' + data + ')');
		}catch(e){};
		return o;
	},
	txtHeight : [220,500], //[有图,无图]
	talks : {},
	tmpl : {
		listAll : '<%for(var i=0,n=talk.length;i<n;i++){MI.talks[talk[i].id]=talk[i];%><li id="<%=talk[i].id%>"<%if(fav){%> fav="<%=talk[i].favortimestamp%>"<%}%> rel="<%=talk[i].timestamp%>" aid="<%=talk[i].ID%>"><div class="user_con cl"><%if(!guest){%><%if('+V1+' && talk[i].type==4){%><div class="userPic"><a href="/<%=talk[i].name%>"'+V7+' class="masPic"><img src="<%=talk[i].pic%>"'+V6+'/></a><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)" class="cusPic"><img src="<%='+V1+'.pic%>"'+V6+'/></a></div><%}else{%><div class="userPic"><a href="/<%=talk[i].name%>"'+V7+'><img src="<%=talk[i].pic%>"'+V6+'/></a></div><%}%><%}%><div class="msgBox"><div class="userName" rel="<%=talk[i].name%>"><strong><a href="/<%=talk[i].name%>"'+V7+'><%if(talk[i].ismobile){if(talk[i].wallname){%><%=talk[i].wallname%><%}else{%>手机用户<%=talk[i].phone%><%}}else{%><%=talk[i].nick%><%}%></a>'+MI_icon('talk[i].flag')+'<%=talk[i].icon%><%if(!'+V1+'){%>:&nbsp;<%}%></strong><%if('+V1+' && talk[i].type==2){%>转播:&nbsp;<%}else if('+V1+' && talk[i].type==4){%>对<strong class="userTo"><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%if(talk[i].ismobile){if('+V1+'.wallname){%><%='+V1+'.wallname%><%}else{%>手机用户<%='+V1+'.phone%><%}}else{%><%='+V1+'.nick%><%}%></a>'+MI_icon(V1+'.flag')+'说:&nbsp;<%}%></strong></div><div class="msgCnt<%if(talk[i].Flag == 1){%> red<%}%> "><%=talk[i].content||"&nbsp;"%></div><%if(talk[i].image && talk[i].image.length){%><div class="picWrap"><%for(var j=0;j<talk[i].image.length;j++){%><div class="picBox"><a href="<%=talk[i].image[j]%>/160" class="pic"><img src="<%=talk[i].image[j]%>/160"></a></div><%}%></div><%}%><%if('+V1+' && talk[i].type==2){%><div class="replyBox"><div class="msgBox"><div class="msgCnt"><strong><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%='+V1+'.nick%></a>'+MI_icon(V1+'.flag')+'<%='+V1+'.icon%>:&nbsp;</strong><%='+V1+'.content%></div><%if('+V1+'.image && '+V1+'.image.length){%><div class="picWrap"><%for(var j=0;j<'+V1+'.image.length;j++){%><div class="picBox"><a href="<%='+V1+'.image[j]%>/160" class="pic"><img src="<%='+V1+'.image[j]%>/160"></a></div><%}%></div><%}%><div class="pubInfo"><span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" href="/p/t/<%='+V1+'.id%>" target="_blank"><%='+V1+'.time%></a> <%='+V1+'.from%> <%if(MI.user.account){%><a href="/p/z/<%='+V1+'.id%>" class="zfNum" target="_blank">查看转播(<b class="relayNum"><%='+V1+'.count%></b>)</a><%}else{%><span class="zfNum"><b class="relayNum"><%='+V1+'.count%></b>人转播</span><%}%></span><%if(MI.user.account&&UI.isNumber('+V1+'.comt)){%><div class="funBox"><a href="/p/c/<%='+V1+'.id%>" class="comt">评论</a><a href="/p/c/<%='+V1+'.id%>" target="_blank">(<em><%='+V1+'.comt%></em>条)</a></div><%}%></div></div></div><%}%><div class="pubInfo"><span class="left"><a class="time" href="/p/t/<%=talk[i].id%>" target="_blank"><%=talk[i].time%></a> <%=talk[i].from%><%if(talk[i].count){if(MI.user.account){%> <a href="/p/z/<%=talk[i].id%>" class="zfNum" target="_blank">查看转播(<b class="relayNum"><%=talk[i].count%></b>)</a><%}else{%> <span class="zfNum"><b class="relayNum"><%=talk[i].count%></b>人转播</span><%}}%><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%> <a class="view zfNum" href="/p/r/<%=talk[i].id%>">查看对话</a><%}%></span><div class="mbLogo"></div><div class="funBox"<%if(!MI.user.account){%> style="display:none"<%}%>><%if(UI.isNumber(talk[i].comt)){%><a href="#" class="comt">评论</a><a href="/p/c/<%=talk[i].id%>" target="_blank">(<em><%=talk[i].comt%></em>条)</a><span>|</span><%}%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><a'+V5+' class="delBtn">删除</a><span>|</span><a'+V5+' class="relay">转播</a><%}else{%><a'+V5+' class="reply">对话</a><span>|</span><a'+V5+' class="relay">转播</a><%}%><span>|</span><a class="fav" href="#" title="收藏"><img src="http://mat1.gtimg.com/www/mb/images/cic_favor.png" /></a><%}%></div></div><%if('+V1+' && talk[i].type==4){%><div class="talkDetail"><b><%='+V1+'.nick%>:</b> <%='+V1+'.content%></div><%}%></div></div></li><%}%>',
		picTool : '<div class="tools"><a href="#" class="btnBack"><em></em>向左转</a><span>|</span><a href="#" class="btnPrev"><em></em>向右转</a><a href="$Url/2000" class="btnOriginal" target="_blank">查看原图</a></div>',
		msgBox : '<div><table border="0" cellspacing="0" cellpadding="0" class="letterBg"><tr><th>收信人</th><td><div class="txtWrap"><input type="text" name="userName" id="userName" class="msgTo inputTxt" value=""/> <span class="cNote">请输入你的听众的微博帐号</span></div></td></tr><tr><th>内　容</th><td><div class="txtWrap"><textarea type="text" class="inputArea noAutoCmt"></textarea></div></td></tr><tr><th></th><td><input type="button" class="sendBtn inputBtn" value="发送" title="快捷键 Crtl+Enter" /><span class="countTxt"></span></td></tr></table></div>',
		reply : '<div class="talkWrap">'+V3+'<div class="top"><span class="left"><span class="replyTitle"></span>　<span class="addReply"></span></span><a'+V5+' class="close" title="关闭">关闭</a></div><iframe class="comts" src="about:blank" frameborder="0" scrolling="no" style="height:0"></iframe><div class="cont"><textarea class="inputTxt"></textarea></div><div class="bot"><div class="left"></div><input type="button" class="inputBtn sendBtn" value="" /><span class="countTxt"></span></div><div class="talkSuc" style="display:none"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg"></span></div></div>',
		black : '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>确定将<%=sex%>拉入黑名单？</h2><p><span class="fs14">拉入之后...</span><br/>你将取消收听<%=sex%>的所有广播，不再收到来自<%=sex%>的私信与任何通知</p><p><input type="button" value="确定" id="blackTipBtn" /><input type="button" value="取消" onclick="MI.dialog.hide()"/></p></div>',
		unblack : '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>你真的原谅<%=sex%>了吗？</h2><p><span class="fs14">取消之后...</span><br/>你会重新收到来自<%=sex%>的私信和其它通知</p><p><input type="button" value="确定" id="blackTipBtn"/><input type="button" value="取消" onclick="MI.dialog.hide()"/></p></div>',
		card : '<div class="uCard"><div class="tip">这是你自己</div><div class="userPic"><a></a><p class="btn"><input type="button" class="addAttention" value="" /><a href="#" class="delAttention" title="取消收听">取消</a></p></div><div class="uCardcnt"><p class="userName"></p><p class="nums loading"></p><p class="btn"><a href="#" class="reply">对话</a><a href="#" class="msg">私信</a><a href="#" class="black">拉黑</a></p><a href="#" class="ico_sFo"></a></div></div>',
		code : '<div class="verify"><span class="ico_tsW"><span class="ico_te"></span></span><h3></h3><div class="clear"><form><div class="left">验证码：</div><div class="verifyInput"><input type="text" class="inputTxt" /><div class="cNote">输入下图中的字符，不区分大小写</div><img width="130" height="53">&nbsp;<a href="#" class="codeChange">看不清，换一张</a></div></div><div class="btnBox"><button type="submit" class="btn2">确定</button><button class="btn2">取消</button></form></div></div>'
	},
	selectTxt : function(el,start,end,curPosition){
		var range;
		if (document.createRange) {
			el.setSelectionRange(start,end);
		}
		else {
			range = el.createTextRange();
			range.collapse(1);
			range.moveStart('character',start);
			range.moveEnd('character',end - start);
			range.select();
		}
	},
	insertTxt : function(el,text,cursorX,del){
		if (del == undefined) {
			del = 0;
		}
		el.focus();
		if (document.selection) {
			var range = document.selection.createRange()
			range.moveStart('character',-del);
			range.text = text;
		}
		else {
			var textTmp = el.value,
				cursor = cursorX + text.length - del;
			el.value = textTmp.substring(0,cursorX - del) + text + textTmp.substring(cursorX,textTmp.length);
			MI.selectTxt(el,cursor,cursor,cursor);
		}
	},
	cursorX : function(el){
		if (document.selection){
			/*var range = document.selection.createRange();
			console.log(range.offsetTop);
			console.log(range.offsetLeft);*/

			var range = document.selection.createRange(),position = 0,txt;
			range.moveStart ('character',-el.value.length);
			txt = range.text.split('\001');
			position = txt[txt.length - 1].replace(/\r/g,'').length;
			//document.title = position + ' ' + txt.length;
			return position;

			/*var txt = "\001",
				range = document.selection.createRange(),
				rangeTmp = range.duplicate(),
				position = 0
				selectTxt = range.text;
			rangeTmp.moveToElementText(el);
			range.text = range.text + txt;
			position = rangeTmp.text.indexOf(txt);
			range.moveStart('character',-1);
			range.text = '';
			return position < 0 ? el.value.replace(/\r/g,'').length : position;*/

			/*var range = document.selection.createRange(),
				rangeTmp = range.duplicate(),
				rangeAll,
				position = 0;
			el.select();
			rangeAll = document.selection.createRange();
			while(rangeTmp.compareEndPoints('StartToStart',rangeAll) > 0){
				rangeTmp.moveStart('character',-1);
				position++;
			}
			range.select();
			return position;*/

			/*el.focus();
			document.selection.createRange().text = 'л';
			var  range = el.createTextRange(),
				value = el.value,
				position,br;
			position = value.indexOf('л');
			br = (el.value.match(/\n/g) || []).length;
			range.collapse(1);
			range.moveStart('character',position - br);
			range.moveEnd("character",1);
			range.select();
			if (range.text == 'л') {
				document.selection.clear();
			}
			return position;*/

			/*var range = document.selection.createRange(),tmp = document.selection.createRange(),position;
			tmp.collapse(true);
			tmp.select();
			range.setEndPoint('StartToStart',document.selection.createRange());
			position = range.text.length;
			MI.selectTxt(el,position,position,position);
			return position;*/
		}
		else return el.selectionStart;
	},
	countNum : function(el,num,format){
		if (!el) return;
		var cur = el.innerHTML || 0;
		if (format) {
			cur = MI.number.format(parseInt(cur.replace(/,/g,'')) + num);
		}
		else cur = parseInt(cur) + num;
		el.innerHTML = cur < 0 ? 0 : cur;
	},
	fC : { //followConfig
		numFormat : [],
		num : []
	},
	follow : function(id,el,call,veriCode){
		/*
			DOM:
				'followNumAll'
				'followNum_' + id
				'followedNum_' + id
		*/
		if (!MI.fC.init) {
			MI.fC.numFormat = $$('.followNumFormat');
			MI.fC.num = $$('.followNum');
			MI.fC.init = 1;
		}
		if (!el.sending) {
			var isFollow = -1,url,className = el.className,classNameFollow = 'addAttention',classNameUnfollow = 'delAttention',followedNum = $('followedNum_' + id),followNum = $('followNum_' + id),isNotButton = className != classNameFollow && className != classNameUnfollow;
			if ( className == classNameFollow || isNotButton ) {
				isFollow = 1;
				url = '/follow.php';
			}
			else {
				url = '/unfollow.php';
			}

			el.sending = 1;
			//UI.get(url,'u=' + id + '&r=' + MI.random(),function(data){
			UI.ajax({
				url : url,
				data : {u:id,r:MI.random(),veriCode:veriCode||''},
				success : function(data){
					el.sending = 0;
					data = MI.json(data);
					if (data.result == 0) {
						//Change Button's ClassName
						if (!isNotButton) {
							if (isFollow == 1) {
								el.className = classNameUnfollow;
							}
							else el.className = classNameFollow;
						}

						//Count Number
						if (followedNum) {
							MI.countNum(followedNum,isFollow);
						}
						if (followNum) {
							MI.countNum(followNum,isFollow);
						}
						for (var i = 0,num = MI.fC.numFormat.length;i < num;i++) {
							MI.countNum(MI.fC.numFormat[i],isFollow,1);
						}
						for (var i = 0,num = MI.fC.num.length;i < num;i++) {
							if (UI.A(MI.fC.num[i],'rel') == id) {
								MI.countNum(MI.fC.num[i],isFollow);
							}
						}

						//Callback Function
						if (call) {
							call(isFollow);
						}
					}
					else if (data.result == -100) {
						MI.code.show({msg:data.msg,code:data.info,call:function(code){
							MI.follow(id,el,call,code);
						}});
					}
					else if (data.msg){
						//alert(data.msg);
					}
				}
			});
		}
	},
	sFollow : function(id,el,call){
		var className = 'foLight',follow = UI.hasClass(el,className) ? 0 : 1;
		if (!el.sending) {
			UI.ajax({
				url : '/asyn/group_oper.php',
				data : {u:id,op:follow},
				success : function(data){
					//data = "{result:0,msg:'',info:{nick:'t684000008',follow:1,followed:1,block:0,gender:1,'flag':{'wc':0},num:[84,3]},group:{'im':0}}";
					data = MI.json(data);
					if (data.result == 0) {
						if (follow) {
							UI.addClass(el,className);
							el.title = MI.sFollowTip[1];
						}
						else {
							UI.removeClass(el,className);
							el.title = MI.sFollowTip[0];
						}
						if (call) {
							call(follow);
						}
					}
					else {
						MI.alert(data.msg);
					}
					el.sending = 0;
				}
			});
			el.sending = 1;
		}
	},
	sFollowTip : ['添加到特别收听','取消特别收听'],
	black : function(o){
		var btn,blackDel = 'blackDel',isBlack = UI.hasClass(o.target,blackDel) ? 1 : 0,type = isBlack ? 'un' : '',txt = ['拉黑名单','取消拉黑'];
		MI.dialog.show({width:420,html:new UI.tmplString(MI.tmpl[type + 'black'])(o)});
		o.txt = UI.isUndefined(o.txt) ? 1 : o.txt; //Change Btn's Text
		if (UI.isArray(o.txt)) {
			txt = o.txt;
		}
		btn = $('blackTipBtn');
		btn.focus();
		btn.onclick = function(){
			var Self = this;
			if (!Self.sending) {
				UI.ajax({
					url : '/asyn/' + type + 'block.php',
					data : {u:o.u,r:MI.random()},
					success : function(data){
						data = MI.json(data);
						if (data.result == 0) {
							if (o.txt) {
								o.target.innerHTML = '<b></b>' + (isBlack ? txt[0] : txt[1]);
							}
							if (isBlack) {
								UI.removeClass(o.target,blackDel);
							}
							else {
								UI.addClass(o.target,blackDel);
							}
							MI.dialog.hide();
							if (o.call) {
								o.call(isBlack);
							}
						}
						else {
							//alert(data.msg);
						}
						Self.sending = 0;
					}
				});
				Self.sending = 1;
			}
		}
	},
	topic : function(id,el,del){
		if (!el.sending) {
			var isDel = del || UI.hasClass(el,'btnCancel'),type = isDel ? '2' : '1';
			//UI.get('/asyn/topic.php','r=' + MI.random() + '&tid=' + id + '&type=' + type,function(data){
			UI.ajax({
				url : '/asyn/topic.php',
				data : {tid:id,type:type,r:MI.random()},
				success : function(data){
					data = MI.json(data);
					//data.result = 0;
					if (data.result == 0) {
						if (del) {
							var Parent = el.parentNode;
							UI.animate(Parent,'opacity',0,function(){
								UI.remove(Parent);
							});
						}
						else {
							el.className = isDel ? 'btnCollect' : 'btnCancel';
							el.innerHTML = isDel ? '收听此话题' : '取消收听';
						}
						MI.countNum($('followedNum_' + id),isDel ? -1 : 1);
					}
					else if (data.msg){
						//alert(data.msg);
					}
					el.sending = 0;
				}
			});
		}
		el.sending = 1;
	},
	topicDel : function(id,el){
		MI.topic(id,el,1);
	},
	newCount : function(type){
		type = type || '4,3,2,1';
		//type = type || '4,3,2', //暂时去掉气泡提示
		setInterval(newCout,30000);
		setTimeout(function(){ //不加延迟，IE中偶尔请求会被阻断
			newCout();
		},10);
		var fail = 0;
		function newCout(){
			if (fail < 6) { //6次未登录后不再拉取
				UI.get('/asyn/newMsgCount.php','type=' + type + '&r=' + MI.random(),function(data){
					data = MI.json(data);
					//data = {"result":0,"msg":"\u6210\u529f","info":[{"type":1,"value":999},{"type":2,"value":2},{"type":3,"value":3},{"type":4,"value":4}]};
					if (data.result == 0) {
						var target,num,maxNum,tip,_new;
						UI.each(data.info,function(o,i){
							num = o.value;
							if (o.type == 1) {
								target = $('newCountFollower');
								if (target && num) {
									var _num = target.firstChild,followerNum = $('followerNum');
									maxNum = 999;
									_num.innerHTML =  num > maxNum ? '<strong>' + maxNum + '</strong>+' : '+<strong>' + num + '</strong>';
									_num.title =  '有' + (num > maxNum ? '超过' + maxNum : num) + '个新听众';
									UI.addClass(UI.next(_num),'bubble');
									UI.show(target);
									/*if (followerNum) {
										followerNum.num = followerNum.num || parseInt(followerNum.innerHTML);
										followerNum.innerHTML = followerNum.num + num;
									}*/
								}
								else if (target){
									UI.hide(target);
								}
							}
							if (o.type == 2) {
								target = $('newCoutMsg');
								if (target) {
									target.innerHTML = target && num ? '(' + num + ')' : '';
								}
							}
							if ((o.type == 3 || o.type == 5) && !MI.noNewCount) {
								if (MI.talkList && MI.talkList._new) {
									maxNum = 50000;
									if (num > maxNum) {
										tip = '超过<strong>' + maxNum + '</strong>条的';
									}
									else tip = '<strong>' + num + '</strong>条';
									_new = MI.talkList._new;
									_new.innerHTML = '<a href="javascript:void(0)">有' + tip + '新广播，点击更新</a>';

									//Title Tip
									if (!document.titleTmp) {
										document.titleTmp = document.title;
									}
									if (num > maxNum) {
										document.title = '(' + maxNum + '+) ' + document.titleTmp;
									}
									else {
										document.title = (num ? '(' + num + ') ' : '') + document.titleTmp;
									}

									if (num) {
										_new.style.display = 'block';
									}
									else {
										UI.hide(_new);
									}
									if (_new.num != num) {
										UI.C(_new,'opacity',0);
										UI.animate(_new,'opacity',1);
									}
									_new.num = num;
									/*if (num > 9) { //Auto Show New Talks
										MI.talkList.newly();
									}*/
								}
							}
							if (o.type == 4) {
								target = $('newCoutAt');
								if (target) {
									target.innerHTML = target && num ? '(' + num + ')' : '';
								}
							}
						});
						fail = 0;
					}
					else if (data.result == -1) { //未登录
						fail++;
					}
				});
			}
		}
	},
	addHover : function(el){
		var delayHover,delayOut;
		el.onmouseover = function(){
			var Self = this;
			clearTimeout(delayOut);
			delayHover = setTimeout(function(){
				UI.addClass(Self,'hover');
			},20);
		}
		el.onmouseout = function(){
			var Self = this;
			clearTimeout(delayHover);
			delayOut = setTimeout(function(){
				UI.removeClass(Self,'hover');
				UI.removeClass(Self,'newMsg');
			},20);
		}
	},
	bottom : function(id){ //Set Page Or More Bar To Bottom
		var lists = $$('.main .LC'),list=lists[lists.length - 1],main = UI.parents($(id),'main')[0],side = UI.next(main),wrap = main.parentNode,y;
		if (list) {
			UI.C(list,'marginBottom',0);
			y = UI.height(main) - UI.height(wrap);
			UI.C(list,'marginBottom',y < 0 ? - y + 'px' : '');
		}
	},
	alert : function(str,call){
		if(str) {
			MI.dialog.alert(str,call);
		}
	},
	tip : function(str,call){
		if(str) {
			MI.dialog.showTip({html:str,end:call});
		}
	},
	confirm : function(){
		
	}
}
MI.S = function(name,value){ //Storage
	try{
		if (window.localStorage) { //For HTML5 : IE8+,FF3.5+,Chrome,Safari,Opera...
			/*if (value == '') {
				delete localStorage[name];
			}
			else */if (value != undefined) {
				localStorage[name] = value;
			}
			else return localStorage[name] || '';
		}
		/*else if (window.globalStorage) { //For Firefox2 And Firefox3
			//console.dir(window.globalStorage);
			var domain = MI.Storage.domain;
			if (value != undefined) {
				globalStorage[domain].setItem(name,value);
			}
			else return globalStorage[domain].getItem('time');
		}*/
		else if (UI.B.ie) { //For IE6,IE7
			var _body = MI.S._body;
			if (!_body.appended) {
				document.body.appendChild(_body);
				_body.appended = 1;
			}
			try{
				_body.load('oXMLBranch');
			}catch(e){}
			if (value != undefined) {
				if (value == '') {
					_body.removeAttribute(name);
				}
				else UI.A(_body,name,value);
				_body.save('oXMLBranch');
			}
			else {
				return UI.A(_body,name) || '';
			}
		}
		else {
			return '$No$';
		}
	}catch(e){
		MI.Bos('btnStorageFull');
		MI.S.clear();
	}
}
MI.S._body = UI.html('<input style="display:none;behavior:url(#default#userData)" id="usersData">')[0];
MI.S.clear = function(){
	var filter = /^draft|top|time|option/,local = window.localStorage; //|follow @联想数据过大，有时后会有问题
	if (local) {
		try{
			for (var i in local) {
				if (!i.match(filter)) {
					local[i] = '';
				}
			}
		}catch(e){};
	}
	else if (UI.B.ie) {
		var _body = MI.S._body;
		_body.load('oXMLBranch');
		var attrs = _body.xmlDocument.firstChild.attributes;
		UI.each(attrs,function(o){
			try{
				var nodeName = o.nodeName;
				if (!nodeName.match(filter)) {
					_body.removeAttribute(nodeName);
				}
			}catch(e){};
		});
		_body.save('oXMLBranch');
	}
}
MI.Pic = function(o,size){
	o.src = 'http://mat1.gtimg.com/www/mb/cic/cic_header_120.jpg';
}
MI.Crs = function(reset){
	clearTimeout(MI.delay.crs);
	var y = UI.scrollY() + UI.windowHeight() * 1.5,noCrs = 1,className = 'crs';
	if (reset) {
		MI.crs = $$('.' + className);
	}
	UI.each(MI.crs,function(o){
		if (UI.hasClass(o,className) && UI.getY(o) < y) {
			var src = UI.A(o,className)
			if (MI.Crs.iconPic && src.hasString('mblogpic') && !UI.hasClass(o,'noIconPic')) { //For Big Picture
				if (MI.Crs.iconPic.hasString(src)) {
					src = 'http://mat1.gtimg.com/www/mb/images/vT.png';
					UI.addClass(o.parentNode.parentNode.parentNode,'iconPic');
				}
				else {
					setTimeout(function(){
						UI.remove($$(o.parentNode,'.preview')[0]);
					},10);
					MI.Crs.iconPic += src;
				}
			}
			o.src = src;
			o.style.display = 'inline';
			UI.removeClass(o,className);
		}
	});
}
MI.Crs.iconPic = 'x';
})();
MI.Dialog = function(o){ //Dialog
	o = o || {};
	var Self = this;

	//Dom
	//Self._body.innerHTML = o.tmpl || '<div class="bg"></div><div class="CR"><div class="top"><span class="left"><em></em></span><span class="right"><em></em></span></div><div class="DTitle"></div><a' + V5 + ' class="DClose" title="关闭">关闭</a><div class="DLoad"></div><div class="DCont"></div><div class="bot"><span class="left"><em></em></span><span class="right"><em></em></span></div></div>';
	var html = o.tmpl || '<div class="D">' + (UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"><div class="bgCover"></div></div><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><a title="关闭" class="DClose close" href="#">关闭</a><div class="DLoad"></div><div class="DCont"></div></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	Self._body = UI.html(html)[0];
	Self._bg = Self.$('.bg');
	Self._cover = Self.$('.cover_select');
	Self._wrap = Self.$('.CR');
	Self._title = Self.$('.DTitle');
	Self._close = Self.$('.DClose');
	Self._cont = Self.$('.DCont');
	Self._load = Self.$('.DLoad');

	//Event
	/*Self.key = function(e) {
		switch(UI.E(e).key) {
			case 27:
				Self.hide();
				break;
		}
	};*/
	Self.resizeBg = function(init){
		if (Self.display) {
			if (UI.B.ie) Self._bg.style.cssText += ';width:100%;';
			Self.delay = setTimeout(function(){
				var h_page = UI.pageHeight(),h_window = UI.windowHeight();
				Self._bg.style.cssText += ';margin-left:0;width:' + UI.pageWidth() + 'px;height:' + (h_page < h_window ? h_window : h_page) + 'px;';
				if (UI.B.ie6) {
					Self._cover.style.cssText = Self._bg.style.cssText;
				}
			},0);
		}
	};
	var wrap = Self._wrap;
	Self._title.onmousedown = Self._title.ontouchstart = function(e) { //Move
		var E = UI.E(e);
		var _x = E.x - parseInt(wrap.style.marginLeft);
		var _y = E.y - parseInt(wrap.style.marginTop);
		var w = UI.windowWidth(),h = UI.windowHeight(); //Kill Bug
		E.prevent();
		//UI.addClass(wrap,'move');
		document.onmousemove = document.ontouchmove = function(e) {
			var E = UI.E(e);
			if (!UI.B.ie && (E.x < 0 || E.y < 0 || E.x > w || E.y > h)) return false;
			wrap.style.marginTop = E.y - _y + 'px';
			wrap.style.marginLeft = E.x - _x + 'px';
			return false;
		}
		document.onmouseup = document.ontouchend = function() {
			document.onmousemove = document.ontouchmove = null;
			document.onmouseup = document.ontouchend = null;
			//UI.removeClass(wrap,'move');
		}
		return false;
	};
	//UI.EA(document,'keyup',Self.key);
	UI.EA(window,'resize',Self.resizeBg);
	Self._close.onclick = function(){
		Self.hide();
		return false;
	}
}
MI.Dialog.prototype = {
	width : 462,
	close : 1,
	show : function(o){
		var Self = this,css;
		if (!Self._append) {
			document.body.appendChild(Self._body);
			Self._append = 1;
			//UI.C(Self._bg,'marginLeft','-9999px');
		}

		Self.close = o.close != undefined ? o.close : Self.close;
		Self.ico = o.ico;
		if (Self.close) {
			UI.show(Self._close);
		}
		else UI.hide(Self._close);

		Self._title.innerHTML = o.title || '';
		UI.C(Self._title,'height',o.title ? '' : '0');
		if (o.html) {
			for (var i = 0,num = Self._cont.childNodes.length;i < num;i++) {
				var contChild = Self._cont.childNodes[i];
				if (contChild.nodeType == 1) {
					UI.hide(contChild);
					UI.append(contChild,document.body);
				}
			}
		}
		if (UI.isString(o.html)) {
			Self._cont.innerHTML = o.html;
		}
		else if (UI.isObject(o.html)) {
			UI.append(o.html,Self._cont);
			UI.show(o.html);
		}
		if (o.width) {
			Self.width = o.width;
		}
		if (o.height) {
			Self.height = o.height;
		}
		UI.C(Self._wrap,'width',Self.width + 'px');
		UI.C(Self._wrap,'opacity',0);
		UI.show(Self._body);
		if (Self.height) {
			UI.C(Self._cont,'height',Self.height + 'px');
		}

		css = 'width:' + Self.width + 'px;margin:' + ( UI.scrollY() - UI.height(Self._wrap)/2 ) + 'px 0 0 -' + Self.width/2 + 'px;';
		if (o.left != undefined) {
			css += 'left:' + o.left + 'px;margin-left:0;';
		}
		if (o.top != undefined) {
			css += 'top:' + o.top + 'px;margin-top:0;';
		}
		setTimeout(function(){
			Self.resizeBg();
			Self._wrap.style.cssText = css;
		},0);
		Self._wrap.style.cssText = css;

		//Function
		if (o.html) {
			if (o.start) { //Run When Open Dialog
				o.start();
			}
			if (o.end) { //Run When Close Dialog
				Self.end = o.end;
			}
			else Self.end = null;
			if (this.call) { //Run Callback Function When Open Dialog
				this.call();
			}
		}

		Self.display = 1;
		if (!UI.B.firefox) {
			UI.C(UI.B.ie ? document.documentElement : document.body,'overflowX','hidden');
		}
	},
	resize : function(){
		var Self = this;
		css = 'width:' + Self.width + 'px;margin:' + ( UI.scrollY() - UI.height(Self._wrap)/2 ) + 'px 0 0 -' + Self.width/2 + 'px;';
		setTimeout(function(){
			Self.resizeBg();
			Self._wrap.style.cssText = css;
		},0);
		Self._wrap.style.cssText = css;	
	},
	hide : function(){
		UI.hide(this._body);
		this.hideLoad();
		if (this.end) {
			this.end();
		}
		this.display = 0;
		if (!UI.B.firefox) {
			UI.C(UI.B.ie ? document.documentElement : document.body,'overflowX','auto');
		}
	},
	showLoad : function(target,top,left,width,height){
		target = target || this._cont;
		var css = '',
			width = width || UI.width(target),
			height = height || UI.height(target);
		if (UI.isNumber(top)) {
			css += 'top:' + top + 'px;';
		}
		if (UI.isNumber(left)) {
			css += 'left:' + left + 'px;';
		}
		this._load.style.cssText = 'width:' + width + 'px;height:' + height + 'px;' + css;
	},
	hideLoad : function(){
		UI.hide(this._load);
	},
	showTip : function(o){ //{html:'发送成功！',ico:'ico_te',delay:1000}
		var Self = this,close = Self.close;
		o.close = 0;
		o.html = '<div class="popBox"><span class="ico_tsW"><span class="' + (o.ico ? o.ico : 'ico_ts') + '"></span></span><h2>' + o.html + '</h2><p></p></div>';
		o.end = o.end || Self.end;
		Self.show({width:9999});
		Self.show(o);
		Self.show({width:UI.width(Self._cont) + 40});
		setTimeout(function(){
			Self.hide();
			Self.close = close;
		},o.delay ? o.delay : 1000);
	},
	alert : function(str,call){
		var Self = this,btn;
		Self.show({width:9999});
		Self.show({html:'<div class="popBox"><span class="ico_tsW"><span class="ico_te"></span></span><h3>' + str + '</h3><p><input type="button" value="知道了" onclick="MI.dialog.hide()"></p></div>',end:call});
		setTimeout(function(){
			Self.show({width:UI.width(Self._cont) + 40});
			btn = $$(Self._cont,'input')[0];
			if (btn) {
				btn.focus();
			}
		},0);
	},
	$ : function(className){
		return $$(this._body,className)[0];
	}
}

MI.CicTalkList = function(id){ //Msg Dialog
	var Self = this,_more = $('moreList');
	Self._body = UI.isString(id) ? $(id) : id;
	Self._more = Self._bottom = _more ? $$(_more,'a')[0] : UI.DC('a');
	Self._new = $('talkNew'); //New Talk Button
	Self._list = UI.children(Self._body);
	Self._rid = Self._body.getAttribute('rid');
	Self._control = $('control_area');
	Self._play = $('play');
	Self._imgPopup = $('imgPopup');
	Self._bigPic = $('bigPic');

	Self._topbox = $('topbox');
	Self._msgNum = $$(Self._topbox,'.msgNum')[0];
	Self._topic = $$(Self._topbox,'.topic')[0];
	//alert(Self._msgNum)
	var p = Self._body.parentNode;
	Self._singleHeight = UI.height(p)-85;
	Self._maxHeight = UI.height(p);

	Self.add = [], //Cache Added List
	Self.list = $$(Self._body,'li');
	if(Self.list && Self.list.length > 0){
		for(var i=0,num=Self.list.length;i<num;i++){
			Self.add.push(Self.list[i].id);
		}
	}
	if(Self._play){
		Self._play.onclick = function(){
			var play  = UI.A(this,'play');
			if(!play){
				Self.stopNewly();
				UI.A(this,'play','1');
			}else{
				Self.startNewly();
				UI.A(this,'play','');
			}
		}
	}
	if(Self._topbox){
		Self._topbox.onclick = function(){
			MI.page.page(0);
		}
	}

	if(Self._imgPopup){
		Self._imgPopup.onclick = function(){
			UI.hide(Self._imgPopup);
		}
	}

	//alert(Self._rid)
}
MI.CicTalkList.prototype = {
	tmpl : MI.tmpl.listAll,
	asyn : '/asyn/cic.php',
	key : '',//md5
	lot : '',
	lotid : '',
	lotTimer : null,
	cur : null, //Current List
	_tip : null, //List Tip
	_news : [], //New Talks
	_autoSizeMark : false,
	auto : 0, //Auto Load Ajax Data When Browser's Back
	iconPic : 0, //Use Simple View Model
	moreTimes : 0, //More Times
	last : {}, //Cache Last List's Info
	first : { //Cache First List's Info
		time : 1
	}, 
	time : [],
	talkdelaytime : null,
	newtalk : null,
	talkheight : '',
	delaytime : null,
	listcount : 30,
	startNewly : function(){
		var Self = this;
		Self.stopNewly();
		UI.removeClass(Self._play,'play');
		UI.addClass(Self._play,'pause');
		Self.delaytime = setInterval(function(){
			Self.newly();
		},1000*5);
	},
	stopNewly : function(){
		var Self = this;
		UI.removeClass(Self._play,'pause');
		UI.addClass(Self._play,'play');
		if(Self.delaytime){
			clearInterval(Self.delaytime);
		}
	},
	/*if(Self.delaytime) clearInterval(Self.delaytime);*/
	newly : function(){
		var Self = this;
		UI.get(Self.asyn,'id='+Self._rid+'&r='+MI.random(),function(json){
			Self.addNewly(json);
		});
	},
	autoFontSize : function(talk, height, step){
		var Self = this;
		var cont = $$(talk,'.msgCnt');
		var pub = $$(talk,'.pubInfo');
		var replyBox = $$(talk,'.replyBox')[0];
		var pubInfo = $$(talk,'.pubInfo')[0];
		var username = $$(talk,'.userName')[0];
		var s = step || 2;

		var h = 0;
		try{
			if (cont[0]) h += UI.height(cont[0]);
			if (cont[1]) h += UI.height(cont[1]);
			if (pub[0]) h += UI.height(pub[0]);
			if (pub[1]) h += UI.height(pub[1]);
		}
		catch(e){
		}

//		document.title = height + ":" + (cont[0] ? UI.height(cont[0]) : 0)  + ":" + (cont[1] ? UI.height(cont[1]) : 0) + ":" +h;
		
		if ( h > height ){
			var s = parseInt(username.style.fontSize || 36) - step;
			UI.each(cont,function(o,i){
				o.style.fontSize = parseInt(s) + 'px';
				o.style.lineHeight = parseInt(s) + 17 + 'px';
			});
			UI.each(pub,function(o,i){
				o.style.fontSize = Math.max(parseInt(s)-12, 12) + 'px';
			});
			username.style.fontSize = parseInt(s) + 'px';
			username.style.lineHeight = parseInt(s) + 17 + 'px';
			username.style.height = parseInt(s) + 15 + 'px';
			Self._autoSizeMark = true;
			Self.autoFontSize(talk, height, step);
		}
	},
	addNewly : function(json){
		var Self = this,ajax = UI.isString(json);
		data = ajax ? MI.json(json) : json;

		if(data.info){
			if(data.info.key && data.info.topic){
				Self.carousel(data.info);
			}
			//打开消息数量显示
			if(cfg.showNum && Self._msgNum && parseInt(data.info.total) > parseInt(Self._msgNum.innerHTML)){
				Self._msgNum.innerHTML = data.info.total;
			}
			if(data.info.delIDs && data.info.delIDs.length){
				Self.delNewly(data.info.delIDs);
			}
		}
		try{
		if (data.result == 0 && data.info.talk.length > 0) {
			data.info.guest = Self.guest;
			data.info.fav = 0;
			data.info.iconPic = Self.iconPic;
			if(data.info.talk[0].ismobile){
				data.info.talk[0].from = '来自现场';
				data.info.talk[0].pic = 'http://mat1.gtimg.com/www/mb/cic/cic_mobile_header_120.png';
			}
			var pic = data.info.talk[0].pic;
			if(data.info.talk[0].wallhead){
				data.info.talk[0].pic = data.info.talk[0].wallhead;
			}
			if(pic){
				if(pic.match(/head_50.jpg/g)){
					data.info.talk[0].pic = 'http://mat1.gtimg.com/www/mb/cic/cic_header_120.png';
				}else if(pic.match(/\/50/g)){
					data.info.talk[0].pic = pic.replace(/\/50/g,'\/120');
				}
			}

			var list = $$(Self._body,'li');
			var removeAll = 0;//data.info.talk[0].image.length > 0 ? 1: 0;
			if(list.length > 0){
				for(var i=0,num=list.length;i<num;i++){
					if(removeAll){
						UI.remove(list[i]);
					}else{
						if (list[i].id == data.info.talk[0].id && i > 0) {
							UI.remove(list[i]);
							break;
						}else if(list[i].id == data.info.talk[0].id && i == 0){
							return;
						}
					}
				}
			}
			list = null;
			var newTalk = UI.html(new UI.tmplString(Self.tmpl)(data.info))[0];
			UI.prepend(newTalk,Self._body);
			Self.updateTime(data.info.time);

			Self.newtalk = $$(newTalk,'.user_con')[0];
			var picBox = $$(newTalk,'.pic')[0];
			Self.talkheight = (cfg.showOne) ? Self._singleHeight : UI.height(Self.newtalk);  // 由于图片的加载缘故，UI.height(Self.newtalk)可能取不到最终的高度 

			var scrollY = UI.scrollY(),scroll;
			UI.C(Self.newtalk,'height',0);
			

			if(cfg.showOne){//单条展示时，自动调整字体大小
				var cont = $$(newTalk,'.msgCnt');
				var replyBox = $$(newTalk,'.replyBox')[0];
				var pubInfo = $$(newTalk,'.pubInfo')[0];
				var msgBox = $$(newTalk,'.msgBox')[0];

				var user_con = $$(newTalk,'.user_con')[0];
				var username = $$(newTalk,'.userName')[0];
//				var txt  = UI.text(cont[0]);
//				var txtReplyLen  = 140;
//				if (cont[1]) txtReplyLen = Math.ceil(140 - UI.text(cont[1]).length);
//				var txtLen =  Math.ceil(140 - txt.length);
//				var s = txtLen;
				//s=s-(pic?30:10);
				var s=72;
		//		if(txtLen<30 || cont[1])	s=36;
		//		if(txtLen<30 && txtReplyLen<0)	s=30;
		//		if(picBox && txtReplyLen<80)	s=30;
		//		if(picBox && txtReplyLen<40)	s=28;
		//		if(picBox && txtLen<100) s=42;
		//		if(picBox && txtLen<70) s=36;
		//		if(picBox && txtLen<40) s=30;
		//		if(picBox && txtReplyLen<80 && txtLen<80) s=28;
				UI.each(cont,function(o,i){
					o.style.fontSize = parseInt(s) + 'px';
					o.style.lineHeight = parseInt(s) + 17 + 'px';
					username.style.fontSize = parseInt(s) + 'px';
					username.style.lineHeight = parseInt(s) + 17 + 'px';
					username.style.height = parseInt(s) + 15 + 'px';
				})

				setTimeout(function(){
					var maxHeight = Self.talkheight - ( picBox ? 200 : 0 ) - 30;
					Self.autoFontSize(newTalk, maxHeight, 2);
				}, 0);
			}else{
				var maxHeight = Self._singleHeight - ( picBox ? 200 : 0 );
				Self.autoFontSize(newTalk, maxHeight, 1);
			}
			setTimeout(function(){
				Self.talkdelaytime = UI.animate(Self.newtalk,'height',Self.talkheight,function(){
					Self.talkdelaytime = null;
					if (!cfg.showOne){
						UI.C(Self.newtalk,'height','');
					}
					MI.Crs(1);
				},0.5);
			},0);

			//广播点击
			newTalk.onclick = function(){
				Self.stopNewly();

				var cloneTalk = this.cloneNode(true);
					var cont = $$(cloneTalk,'.msgCnt');
					var user_con = $$(cloneTalk,'.user_con')[0];
					var username = $$(cloneTalk,'.userName')[0];
					var msgBox = $$(cloneTalk,'.msgBox')[0];
					var bigPicBox = $$(cloneTalk,'.bigPicBox')[0];
					var pic = $$(cloneTalk,'.picWrap')[0];
					UI.C(user_con,'height', '');
					if(bigPicBox){
						msgBox.style.display = '';
						UI.C(msgBox,'opacity',1);
						bigPicBox.style.display = 'none';
					}

					if(pic){
						var smallPic = $$(pic, 'img')[0];
						var imgUrl = UI.A(smallPic, 'src');
						var bigPicUrl = imgUrl.replace(/\/160/g,'\/2000');
						Self._bigPic.innerHTML = "<img src='" + bigPicUrl + "'/>";
						smallPic.onclick = function(e){
							var bigPicDrap = $("bigPic");
							var bigPic = $$(bigPicDrap, 'img')[0];
							var pHeight = UI.pageHeight();
							var minPicH= Math.max(bigPic.height, 460);
							var mt = (pHeight - Math.min(minPicH, Self._singleHeight))/2;
					//		document.title = pHeight + ":" + bigPic.height;
							bigPic.style.marginTop = (mt - 20) + "px"; 
							Self._imgPopup.style.display = "block";
							UI.E(e).stop();
						}
					}

					var txt  = UI.text(cont[0]);
					var s =  Math.ceil(140 - txt.length);
					//s=s-(pic?30:10);
					if(s>50)	s=50;
					if(s<30 || cont[1])	s=36;
					//document.title = txt.length + " : "+ s;
					UI.each(cont,function(o){
						o.style.fontSize = parseInt(s) + 'px';
						o.style.lineHeight = parseInt(s) + 17 + 'px';
					})
					username.style.fontSize = parseInt(s) + 'px';
					username.style.lineHeight = parseInt(s) + 17 + 'px';
					username.style.height = parseInt(s) + 15 + 'px';
					

					MI.dialog.show({width:960, html:cloneTalk});
					UI.C(MI.dialog._body, 'opacity', 0);

					setTimeout(function(){
						var maxHeight = Self._singleHeight - ( pic ? 160 : 0 );
						Self.autoFontSize(cloneTalk, maxHeight, 1);
						MI.dialog.resize();
						UI.C(MI.dialog._body,'opacity',1);
					}, 0);
				return false;
			}
			removeLinkHref();

			var img;
			if(data.info.talk[0].image && data.info.talk[0].image[0]){
				img = data.info.talk[0].image[0];
			}else if(data.info.talk[0].source){
				if(data.info.talk[0].source.image && data.info.talk[0].source.image[0]){
					img = data.info.talk[0].source.image[0];
				}
			}
			if(img){
				img = img+'/460';
				var cnt = 10000;
				var cnt2 = 5000;
				var con = $$(newTalk,'.user_con')[0];
				var msgBox = $$(newTalk,'.msgBox')[0];
				var html = '<div class="bigPicBox" style="display:none;"><img src="$URL" class="bigPic" /></div>';
				var tmpl = UI.html(html.replace(/\$URL/g,img))[0];
				UI.append(tmpl,con);
				setTimeout(function(){
					UI.C(tmpl,'opacity',0);
					UI.C(msgBox,'opacity',0.8);
					UI.animate(msgBox,'opacity',0,function(){
						msgBox.style.display = 'none';
						tmpl.style.display = '';
						UI.animate(tmpl,'opacity',1,function(){
							setTimeout(function(){
								UI.animate(tmpl,'opacity',0,function(){
									msgBox.style.display = '';
									tmpl.style.display = 'none';
									UI.animate(msgBox,'opacity',1);
								});
							},cnt2);
						});
					});
				},cnt);

			}
		}
		}
		catch(e){alert(e)}
		setTimeout(function(){
			list = $$(Self._body,'li');
			if(list.length > Self.listcount){
				for(var i=Self.listcount,num=list.length;i<num;i++){
					UI.remove(list[i]);
				}
			}
		},500);
	},
	delNewly : function(data){
		var Self = this;
		if(data){
			//data = data.split(',');
			UI.each($$(Self._body,'li'),function(o){
				//alert(data.length)
				for(var i=0,n=data.length;i<n;i++){
					if(data[i] == UI.A(o,'aid')){
						UI.remove(o);
					}
				}
			})
		}
	},
	carousel : function(data){
		if(!data)	return;
		var Self = this;
		var key = data.key,topic = data.topic,timer,item=[];
		if(key == Self.key || topic.length <= 0)	return;

		var num = 0,cnt = 30000,tmpl = '<div class="adPic"><img src="$URL" /></div>',html;
		var defaultImg = 'http://mat1.gtimg.com/www/mb/cic/spic/dx05.png';
		if(timer){clearInterval(timer);}
		Self.key = key;
		timer = setInterval(function(){
			if(topic[num]){
				html = UI.html(tmpl.replace(/\$URL/g,topic[num]))[0];
				UI.prepend(html,Self._topic);
				var img = $$(html,'img')[0];
				img.onload = function(){
					var height = 95;
					UI.C(html,'height',0);
					UI.animate(html,'height',height,function(){
						UI.C(html,'height','');
					},0.2);
				}
				img.onerror = function(){
					this.src = defaultImg;
				}
				if(html.nextSibling){
					var nx = html.nextSibling;
					UI.C(nx,'opacity',0.8);
					UI.animate(nx,'opacity',0,function(){UI.remove(nx);});
				}

			}
			num++;
			if(num > topic.length)	num = 0;
		},cnt);
	},
	lottery : function(a){
		var Self = this;
		Self.talklist1 = $('talkList_1');
		Self.talklist2 = $('talkList_2');
		var param = 'num=50'+(Self.lotid ? '&id='+Self.lotid : '')+'&r='+MI.random();
		UI.get('/asyn/cicprice.php',param,function(json){
			Self.lot = MI.json(json);
		});
	},
	lotteryStart : function(a){
		var Self = this;
		var data = Self.lot,timer;

		if(data && data.info.talk.length > 0){
			data.info.guest = Self.guest;
			data.info.fav = 0;
			data.info.iconPic = Self.iconPic;
			for(var i=0,n=data.info.talk.length;i<n;i++){
				if(data.info.talk[i].ismobile){
					data.info.talk[i].from = '来自现场';
					data.info.talk[i].pic = 'http://mat1.gtimg.com/www/mb/cic/cic_mobile_header_120.png';
				}
				var pic = data.info.talk[i].pic;
				if(data.info.talk[i].wallhead){
					data.info.talk[i].pic = data.info.talk[i].wallhead;
				}
				if(pic){
					if(pic.match(/head_50.jpg/g)){
						data.info.talk[i].pic = 'http://mat1.gtimg.com/www/mb/cic/cic_header_120.png';
					}else if(pic.match(/\/50/g)){
						data.info.talk[i].pic = pic.replace(/\/50/g,'\/120');
					}
				}
			}
			if( data.w && data.w.talk && data.w.talk.length > 0){
				data.w.guest = Self.guest;
				data.w.fav = 0;
				data.w.iconPic = Self.iconPic;
				for(var i=0,n=data.w.talk.length;i<n;i++){
					if(data.w.talk[i].ismobile){
						data.w.talk[i].from = '来自现场';
						data.w.talk[i].pic = 'http://mat1.gtimg.com/www/mb/cic/cic_mobile_header_120.png';
					}
					var pic = data.w.talk[i].pic;
					if(data.w.talk[i].wallhead){
						data.w.talk[i].pic = data.w.talk[i].wallhead;
					}
					if(pic){
						if(pic.match(/head_50.jpg/g)){
							data.w.talk[i].pic = 'http://mat1.gtimg.com/www/mb/cic/cic_header_120.png';
						}else if(pic.match(/\/50/g)){
							data.w.talk[i].pic = pic.replace(/\/50/g,'\/120');
						}
					}
				}
			}
			//data.info.flag = data.info.talk[0].Flag;
			//data.info.ismobile = data.info.talk[0].ismobile;
			//data.info.phone = data.info.talk[0].phone;

			UI.C(Self.talklist2,'opacity',0.8);
			UI.animate(Self.talklist2,'opacity',0,function(){
				//UI.C(Self.talklist1,'opacity',0);
				Self.talklist2.style.display = 'none';
				Self.talklist1.style.display = '';
			},0.6);
		}
		if(a){
			if(Self.lotTimer){clearInterval(Self.lotTimer);}
			var newTalk = UI.html(new UI.tmplString(Self.tmpl)(data.info));
			var num = 0;
			UI.removeClass(Self.talklist1,'talkList_1');
			UI.addClass(Self.talklist1,'talkList');
			Self.lotTimer = setInterval(function(){
				UI.prepend(newTalk[num],Self._body);
				UI.C(newTalk[num],'opacity',0.1);
				UI.animate(newTalk[num],'opacity',1,function(){},0.3);
				var p = num-1;
				p = p < 0 ? 0 : p;
				if(newTalk[p]){
					UI.animate(newTalk[p],'opacity',0,function(){
						UI.remove(newTalk[p]);
					},0.3);
				}
				num ++;
				if(num >= newTalk.length)	num = 0;
			},300);
		}else{
			var html = '<div class="cj_hjlogo" style="display: block;"></div>';
			if(Self.lotTimer){clearInterval(Self.lotTimer);}
			Self._body.innerHTML = '';
			
			var newTalk, l, rnd;
			if ( data.w && data.w.talk && data.w.talk[0] )
			{
				newTalk = UI.html(new UI.tmplString(Self.tmpl)(data.w));
				rnd = 0;
			}
			else
			{
				newTalk = UI.html(new UI.tmplString(Self.tmpl)(data.info));
				l = newTalk.length;
				rnd = parseInt(Math.random() * l);
				rnd =  rnd > l ? rnd - l : rnd;
			}
			UI.prepend(newTalk[rnd],Self._body);
			UI.append(UI.html(html)[0],newTalk[rnd]);

			UI.removeClass(Self.talklist1,'talkList');
			UI.addClass(Self.talklist1,'talkList_1');
			UI.C(newTalk[rnd],'opacity',0.1);
			UI.animate(newTalk[rnd],'opacity',1,function(){},0.1);

		}
	},
	cacheLast : function(){ //Cache Last Id For More
		var children = UI.children(this._body),
			last = children[children.length - 1],
			fav;

		if (last) {
			fav = UI.A(last,'fav');
			this.last = {
				id : last.id,
				time : UI.A(last,'rel'),
				fav : fav ? fav : 0
			};
		}
	},
	cacheFirst : function(){ //Cache First List
		var _first = UI.children(this._body)[0];
		if (_first) {
			this.first = {
				time : UI.A(_first,'rel'),
				id : _first.id
			};
		}
	},
	bottom : function(){ //Check More's Position
		var main = UI.parents(this._body,'main')[0],side,wrap,y;
		if (main) {
			side = UI.next(main),wrap = main.parentNode,y
			if (side) {
				UI.C(this._body,'marginBottom',0);
				y = UI.height(main) - UI.height(wrap) - 1;
				UI.C(this._body,'marginBottom',y < 0 ? - y + 'px' : '');
			}
		}
	},
	updateTime : function(newTime){ //Update Talk's Time
		newTime = Number(newTime);
		if (!MI.time || newTime - MI.time > 60) { //Don't Update In 60 Seconds
			MI.time = newTime;
			UI.each(this.time,function(o,i){
				var info,
					now = MI.time,
					Now = new Date(),
					pubTime = UI.A(o,'rel'),
					PubTime = new Date(),
					gapTime = now - pubTime,
					minute = parseInt(gapTime / 60),
					hour = parseInt(gapTime / 3600),
					day = parseInt(gapTime / 86400),
					clock = o.title.split(' ')[1];
				Now.setTime(now + '000');
				PubTime.setTime(pubTime + '000');
				if (minute == 0) {
					info = '刚刚';
				}
				else if (minute < 60) {
					info = minute + '分钟前';
				}
				/*else if (minute > 59 && hour < 6) {
					info = hour + '小时' + minute % 60 + '分钟前';
				}*/
				//else if (hour > 5 && day == 0) {
				else if (minute > 59 && day == 0) {
					info = (Now.getDate() == PubTime.getDate() ? '今天' : '昨天') + ' ' + clock;
				}
				else if (day == 1 && Now.getDate() - PubTime.getDate() < 2) {
					info = '昨天 ' + clock;
				}
				else if (Now.getFullYear() == PubTime.getFullYear()) {
					info = o.title.split('年')[1];
				}
				else {
					info = o.title;
				}
				if (info) {
					o.innerHTML = info;
				}
			});
		}
	}
}
MI.Page = function(o){
	var Self = this;

	//Dom
	Self._body = o.target;
	Self._prev = Self.$('.up');
	Self._next = Self.$('.down');

	Self._ul = MI.talkList._body;

	Self.step = 3;

	//Event
	UI.EA(Self._prev,'click',function(){
		refData();
		if(!Self.cur)	return false;
		Self.prev();
		return false
	});
	UI.EA(Self._next,'click',function(){
		refData();
		if(!Self.cur || !Self.count || Self.count < Self.step)	return false;
		Self.next();
		return false
	});

	//refData();

	function refData(){
		Self._list = UI.GC(Self._ul,'li');
		Self.count = Self._list.length;
		//Self.total = Math.ceil(Self.count/Self.step);
		if(!Self.cur && Self._list.length )Self.cur = Self._list[0];

		//Data
		Self.stepSmall = Math.ceil(UI.height(Self._ul)/Self._total);
		//Self._total = Self._count;//Math.ceil(Self._ul.length / Self.perPage);
	}

}
MI.Page.prototype = {
	/**
	 * 是否循环
	 * @type Boolean
	 */
	loop : 1,
	/**
	 * 当前页
	 * @type Number
	 */
	//cur : 1,
	delaytime : null,
	h : 0,
	$ : function(selector){
		return UI.GC(this._body,selector)[0];
	},
	refData : function(){
		this._list = UI.GC(this._ul,'li');
		this.count = this._list.length;
		//Self.total = Math.ceil(Self.count/Self.step);
		if(!this.cur && this._list.length )this.cur = this._list[0];

		//Data
		this.stepSmall = Math.ceil(UI.height(this._ul)/this._total);	
	},
	/**
	 * 跳到某页
	 * 
	 * @param {Number} Number 页码
	 *            @example
	 *            MI.slide.page(2);
	 */
	page : function(num){
		//this.cur = this._list[num] || this.cur;
		//if(!this.cur)	this.cur = this._list[0]
		/*if (this.cur < 1) {
			this.cur = this.loop ? this.total : 1;
		}
		else if (this.cur > this.total) {
			this.cur = this.loop ? 1 : this.total;
		}*/

		this.scroll(num);
		/*if (this.call) {
			this.call(this.cur);
		}*/
	},
	/**
	 * 上一页
	 * 
	 *            @example
	 *            MI.slide.prev();
	 */
	prev : function(){
		if(this.cur.id == this._list[0].id)	return;
		this.step = 1;
		this.h = this.cur.offsetHeight;//UI.height(this.cur);
		if(UI.prev(this.cur)){
			this.cur = UI.prev(this.cur);
			this.h += this.cur.offsetHeight+20;//UI.height(this.cur);
			if(this.cur.tagName.toLowerCase() == 'li'){
				this.page();
			}
		}else{
			this.cur = this._list[0];
			this.page(0);
		}
	},
	/**
	 * 下一页
	 * 
	 *            @example
	 *            MI.slide.next();
	 */
	next : function(){
		this.step = -1;
		this.h = this.cur.offsetHeight+10;//UI.height(this.cur);
		if(UI.next(this.cur)){
			this.cur = UI.next(this.cur);
			if(this.cur.tagName.toLowerCase() == 'li'){
				this.page();
			}
		}else{
			this.cur = this._list[0];
			this.page(0);
		}
	},
	scroll : function(num){
		//if(!this.cur)	return;
		//clearInterval(this.delay);
		//alert(parseInt(UI.C(this._ul,'marginTop')))
		//alert(- (UI.getY(this._list[(this.cur - 1) * this.step])))
		/*if(MI.talkList.talkdelaytime){
			clearInterval(MI.talkList.talkdelaytime);
			UI.C(MI.talkList.newtalk,'height',MI.talkList.talkheight);
		}*/
		var Self = this,y=num,t=0;
		if(y!=0){
			if(this.h<150)	h=150
			t = parseInt(UI.C(this._ul,'marginTop').replace('px',''));

			if(this.step == -1){
				y = t - this.h;
			}else{
				y = t + this.h;
			}
			//y = UI.isNumber(y) ? y:0;
			y = parseInt(y);
		}
		//document.title = y;
		if(!y || y > 0 )	y=0;
		//document.title = t + ' : '+this.h + ' : '+y;
		if(this.delaytime){
			clearInterval(this.delaytime);
		}
		this.delaytime = UI.animate(this._ul,'marginTop',y,function(){
			UI.C(Self._ul,'marginTop',y+'px');
			if(y==0){
				MI.talkList.startNewly();
			}else{
				MI.talkList.stopNewly();
			}
		},0.7);
		//UI.C(this._ul,'marginTop',y+'px')
	}
}

function removeLinkHref(){
	UI.each($$('a'),function(o){
		o.title = '';
		o.removeAttribute('href');
		o.onclick = function(){return false;}
	});
}
UI.ready(function(){
	//Create Dialog && Card && DialogTip
	MI.dialog = MI.dialog || new MI.Dialog();
	MI.dialog._bg.style.height = UI.pageHeight() + 'px';

	UI.EA(MI.dialog._body,'click',function(){
		MI.talkList.newly();//关闭浮窗之后，赶紧先拉一条最新的
		MI.talkList.startNewly();
		MI.dialog.hide();
	})
	UI.EA(window,'keydown',function(e){
		var E = UI.E(e);

		//x
		if(E.key == 88){
			MI.talkList.stopNewly();
		}
		//z
		if(E.key == 90 || E.key == 27){

			if(E.key == 27 && MI.talkList._imgPopup.style.display != 'none'){  //如果是图片放大状态
				UI.hide(MI.talkList._imgPopup);
			}else
			{
				MI.dialog.hide();
				MI.talkList.newly();//关闭浮窗之后，赶紧先拉一条最新的
				MI.talkList.startNewly();
			}
		}
		//t
		if(E.key == 84 || E.key == 36){
			MI.page.page(0);
		}
		
		// up 或 pageup
		if(E.key == 38 || E.key == 33 ){
			MI.page.refData();
			if(!MI.page.cur) return false;
			MI.page.prev();
		}
		//down 或 pagedown
		if(E.key == 40 || E.key == 34 ){
			MI.page.refData();
			if(!MI.page.cur || !MI.page.count || MI.page.count < MI.page.step)return false;
			MI.page.next();
		}
	});
	document.body.onselectstart = function(e) {
		UI.E(e).prevent();
	}
	removeLinkHref();
	MI.page = new MI.Page({target:$('control_area')});
	
})
