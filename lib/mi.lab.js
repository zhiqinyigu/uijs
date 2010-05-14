/*
	Json Interface:
		{
			result : 0,
			msg : '���Գɹ�',
			info : {
				id : '123456',
				time : '5����ǰ',
				content : '����'
			}
		}

	Cookie:
		refresh �㲥�����Զ�ˢ�£� 0-��ˢ�� 1-ˢ��
		mb_vT �鿴��Ϣ�б����ͣ�viewType���� ֻ��ԭ��|��Լģʽ
*/
/*
	MI.Bos('');

	talkBox:
		btnTopic �½�����
		btnPic �ϴ�ͼƬ
		btnPicCancel ͼƬ�ϴ���ȡ��
		btnPicDel ͼƬɾ��
		btnSend �㲥
		btnSendReply �Ի�����
		btnSendRelay ת��
		btnSendMsg ˽��
		btnOpenTalk ��˵���䣨���⣩
		btnCloseTalk ������˵���䣨���⣩
		btnCtrlEnter ��ݼ�

	talkList:
		btnCardOpen չ�����Ͽ�Ƭ
		btnCardFollow ���Ͽ�Ƭ������
		btnCardReply ���Ͽ�Ƭ�жԻ�
		btnCardMsg ���Ͽ�Ƭ��˽��
		btnCardUnFollow ���Ͽ�Ƭ��ȡ������
		btnCardHead ������Ͽ����û�ͷ��
		btnHead ����û�ͷ��
		btnPicBig �Ŵ�ͼƬ
		btnPicSmall ��СͼƬ
		btnPicWhirl ��תͼƬ
		btnReport �ٱ�
		btnReply �Ի�
		btnViewReply �鿴�Ի�
		btnComt ����
		btnRelay ת��
		btnFav �ղ�
		btnUnFav ȡ���ղ�
		btnDel ɾ��
		btnClose �Ի�ת���Ĺر�
		btnAddReply ����XXX�ĵ���
		btnkNew ����Ϣ
		btnMore ������Ϣ�������
		btnMoreAuto ������Ϣ���Զ���
		btnTop ���ض���
		btnTime �㲥ʱ�����ӵ��

	msgList:
		btnReplyMsg �ظ�˽��
		btnOpenSendMsg ��˽�ţ��򿪷�˽�Ÿ��㣩

	start:
		btnStep1 ��һ����������
		btnStep2 ��һ����������
		btnStepColse �رգ�������
		btnStepTip1 ��һ�ν���
		btnStepTip2 �ڶ��ν���
		btnStepTip3 �¿�
		btnStepTip4 �ӿ�
		btnFollowAll �������ǣ�����ҳ��
		btnFollowNone ������һ��������ҳ��
	
	side:
		btnSide1 ��������ͷ��
		btnSide2 ����������ҳԤ��
		btnSide3 ���������ҵ�������
		btnSide4 ���������ҵ�����������
		btnSide5 ���������ҵĹ㲥��
		btnSide6 ���������ҵ���ҳ
		btnSide7 ���������ҵĹ㲥
		btnSide8 ���������ᵽ�ҵ�
		btnSide9 �������������ᵽ�ҵ���
		btnSide10 ���������ҵ��ղ�
		btnSide11 ��������˽��
		btnSide12 ������������˽����
		btnSide13 �����������ֻ�
		btnSide14 ����������������
		btnSide15 ���������������
		btnSide16 ������������ѧ��

	other:
		btnRefresh �Զ�ˢ�£��㲥������
		btnUnFoldfollow չ������������
		btnFoldfollow ��������������
		btnUnFoldtopic չ���������Ļ���
		btnFoldtopic �����������Ļ���
		btnUnFoldhot չ�����Ż���
		btnFoldhot �������Ż���
		btnMoreTopic �鿴�������Ż���
		btnHotPeople1 - btnHotPeople12 �����Ƽ�ҳǩ����1������12����
		btnUser_liuxiang btnUser_juntang ... ������ҳ���û������
		btnTopic_1 -  btnTopic_90 ������ҳ����������
		btnReportUser ����ҳ�ٱ�
		btnTopicSearch ��ػ��⣨�ۺ�����ҳ��
*/
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
//�ٱ�
function jubao(urlParam){
	var url="http://jubao.qq.com/cgi-bin/jubao?";
	if(urlParam!='') url += urlParam;

	var wrap = UI.html('<div style="width:620px;height:436px;overflow:hidden;border:solid #FFF;border-width:5px 0 10px"><iframe src="about:blank" frameborder="0" scrolling="no" onload="MI.dialog.hideLoad()"></iframe></div>')[0],oIFrame = wrap.firstChild;
	oIFrame.style.cssText = 'width:628px;height:470px;background:#FFF;margin:-13px 0 0 -5px;-margin-top:-32px;border-style:none';
	MI.dialog.show({title:'��Ѷ�ٱ�ƽ̨',width:670,html:wrap});
	MI.dialog.showLoad();
	oIFrame.src = url;
}
try{document.domain='qq.com'}catch(e){}
function jubao_onClose(){
	MI.dialog.hide();
}
function jubao_msg(id){
	jubao('appname=micoblog&subapp=web&jubaotype=msg&tw_msg_id='+id+'&tw_name=&tw_vip=&envname=web');
}
function jubao_user(name){
	jubao('appname=micoblog&subapp=web&jubaotype=uin&tw_pic_url=&tw_name='+name+'&tw_vip=&envname=web');
}
(function(){
var V1='talk[i].source',V2='info.source',V3='<div class="SA"><em>��</em><span>��</span></div>',V4='%><a href="/certification" target="_blank" class="vip" title="��Ѷ��֤"></a><%',V5=' href="#"',V6=' onerror="MI.Pic(this,50)"',V7=' title="<%=talk[i].nick.toTitle()%>(@<%=talk[i].name%>)"';
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
	tmpl : {
		list : '<li id="<%=info.id%>" rel="<%=info.timestamp%>"><div class="userPic"><a href="/<%=info.account%>" title="<%=info.nick.toTitle()%>(@<%=info.account%>)"<%if('+V2+'.type==2){%> class="masPic"<%}%>><img src="<%=info.userPic%>"'+V6+'/></a><%if('+V2+'.type==2){%><%='+V2+'.cusPic%><%}%></div><div class="msgBox"><div class="userName"><strong><a href="/<%=info.account%>" title="<%=info.nick.toTitle()%>(@<%=info.account%>)"><%=info.nick%></a><%if(info.vip){'+V4+'}%><%if(!info.action){%>:<%}%></strong><%=info.action%></div><div class="msgCnt"><%if('+V2+'.type){%> <%}%><%=info.content%>&nbsp;</div><%if('+V2+'.type==1){%><div class="replyBox"><%='+V2+'.content%></div><%}%><%if(info.image && info.image.length){%><div><%for(var i=0;i<info.image.length;i++){%><div class="picBox"><a href="<%=info.image[i]%>/460" class="pic"><img class="crs" crs="<%if(info.iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%=info.image[i]%>/160<%}%>"></a></div><%}%></div><%}%><div class="pubInfo"><span class="left"><a class="time" href="/p/t/<%=info.id%>" target="_blank"><%=info.time%></a> <%=info.sorurce%> <%if('+V2+'.type==2){%><a class="view zfNum"'+V5+'>�鿴�Ի�</a></b><%}%><%if(!info.vip){%> <a'+V5+' class="alarm">�ٱ�</a><%}%></span><div class="funBox"><%if(UI.isNumber(info.comt)){%><a href="#" class="comt">����(<em><%=info.comt%></em>)</a><span>|</span><%}%><a'+V5+' class="delBtn">ɾ��</a><span>|</span><a'+V5+' class="relay">ת��</a><span>|</span><a'+V5+' class="fav"></a></div></div><%if('+V2+'.type==2){%><div class="talkDetail"><b><%='+V2+'.nick%>:</b> <%='+V2+'.content%></div><%}%></div></li>',
		listAll : '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>"><%if(!guest){%><%if('+V1+' && talk[i].type==4){%><div class="userPic"><a href="/<%=talk[i].name%>"'+V7+' class="masPic"><img src="<%=talk[i].pic%>"'+V6+'/></a><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)" class="cusPic"><img src="<%='+V1+'.pic%>"'+V6+'/></a></div><%}else{%><div class="userPic"><a href="/<%=talk[i].name%>"'+V7+'><img src="<%=talk[i].pic%>"'+V6+'/></a></div><%}%><%}%><div class="msgBox"><div class="userName" rel="<%=talk[i].name%>"><strong><a href="/<%=talk[i].name%>"'+V7+'><%=talk[i].nick%></a><%if(talk[i].vip){ '+V4+' }%><%if(!'+V1+'){%>:<%}%></strong><%if('+V1+' && talk[i].type==2){%>ת��:&nbsp;<%}else if('+V1+' && talk[i].type==4){%>��<strong class="userTo"><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%='+V1+'.nick%></a><%if ('+V1+'.vip){'+V4+' }%>˵:<%}%></strong></div><div class="msgCnt"><%=talk[i].content||"&nbsp;"%></div><%if(talk[i].image && talk[i].image.length){%><div><%for(var j=0;j<talk[i].image.length;j++){%><div class="picBox"><a href="<%=talk[i].image[j]%>/460" class="pic"><img class="crs" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%=talk[i].image[j]%>/160<%}%>"></a></div><%}%></div><%}%><%if('+V1+' && talk[i].type==2){%><div class="replyBox"><div class="msgBox"><div class="msgCnt"><strong><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%='+V1+'.nick%></a><%if('+V1+'.vip){'+V4+'}%>:</strong><%='+V1+'.content%></div><%if('+V1+'.image && '+V1+'.image.length){%><br><%for(var j=0;j<'+V1+'.image.length;j++){%><div class="picBox"><a href="<%='+V1+'.image[j]%>/460" class="pic"><img class="crs" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%='+V1+'.image[j]%>/160<%}%>"></a></div><%}}%><div class="pubInfo"><span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" href="/p/t/<%='+V1+'.id%>" target="_blank"><%='+V1+'.time%></a> <%='+V1+'.from%> <b class="relayNum"><%='+V1+'.count%></b>��ת��</span><%if(UI.isNumber('+V1+'.comt)){%><div class="funBox"><a href="/p/c/<%='+V1+'.id%>" class="comt">����(<em><%='+V1+'.comt%></em>)</a></div><%}%></div></div></div><%}%><div class="pubInfo"><span class="left"><%if('+V1+' && talk[i].type==2){%><span class="time"><%=talk[i].time%></span><%}else{%><a class="time" href="/p/t/<%=talk[i].id%>" target="_blank"><%=talk[i].time%></a><%}%> <%=talk[i].from%><%if(talk[i].count){%> <b class="relayNum"><%=talk[i].count%></b>��ת��<%}%><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%> <a class="view zfNum"'+V5+'>�鿴�Ի�</a><%}%><%if(!talk[i].vip){%> <a'+V5+' class="alarm">�ٱ�</a><%}%></span><div class="funBox"><%if(UI.isNumber(talk[i].comt)){%><a href="#" class="comt">����(<em><%=talk[i].comt%></em>)</a><span>|</span><%}%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><a'+V5+' class="delBtn">ɾ��</a><span>|</span><a'+V5+' class="relay">ת��</a><%}else{%><a'+V5+' class="reply">�Ի�</a><span>|</span><a'+V5+' class="relay">ת��</a><%}%><span>|</span><a'+V5+' class="fav<%if(fav){%> light<%}%>" title="<%if(fav){%>ȡ��<%}%>�ղ�"></a><%}%></div></div><%if('+V1+' && talk[i].type==4){%><div class="talkDetail"><b><%='+V1+'.nick%>:</b> <%='+V1+'.content%></div><%}%></div></li><%}%>',
		picTool : '<div class="tools"><a href="#" class="btnBack" title="����ת"></a><span>|</span><a href="#" class="btnPrev" title="����ת"></a><a href="$Url/2000" class="btnOriginal" target="_blank">�鿴ԭͼ</a></div>',
		msg : '<li id="<%=info.id%>" rel="<%=info.timestamp%>"><div class="msgBox"><div class="userName">���� <a href="/<%=info.account%>" title="<%=info.nick%>(@<%=info.account%>)"><%=info.nick%></a><%if(info.vip){ '+V4+'}%></div><div class="msgCnt"><%=info.content%></div><div class="pubTime"><span class="time"><%=info.time%></span></div><p class="btnBox"><a class="btn delBtn"'+V5+'>ɾ��</a></p></div></li>',
		msgBox : '<div><table border="0" cellspacing="0" cellpadding="0" class="letterBg"><tr><th>������</th><td><div class="txtWrap"><input type="text" name="userName" id="userName" class="msgTo inputTxt" value=""/> <span class="cNote">������������ڵ�΢���ʺ�</span></div></td></tr><tr><th>�ڡ���</th><td><div class="txtWrap"><textarea type="text" class="inputArea noAutoCmt"></textarea></div></td></tr><tr><th></th><td><input type="button" class="sendBtn inputBtn" value="����" title="��ݼ� Crtl+Enter" /><span class="countTxt"></span></td></tr></table></div>',
		reply : '<div class="talkWrap">'+V3+'<div class="top"><span class="left"><span class="replyTitle"></span>��<span class="addReply"></span></span><a'+V5+' class="close" title="�ر�">�ر�</a></div><iframe class="comts" src="about:blank" frameborder="0" scrolling="no" style="height:0"></iframe><div class="cont"><textarea class="inputTxt"></textarea></div><div class="bot"><input type="button" class="inputBtn sendBtn" value="" /><span class="countTxt"></span></div><div class="talkSuc" style="display:none"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg"></span></div></div>',
		card : '<div class="uCard"><div class="tip">�������Լ�</div><div class="userPic"><a></a><p class="btn"><input type="button" class="addAttention" value="" /><a href="#" class="delAttention" title="ȡ������">ȡ��</a></p></div><div class="uCardcnt"><p class="userName"></p><p class="nums loading"></p><p class="btn"><a href="#" class="reply">�Ի�</a><a href="#" class="msg">˽��</a></p></div></div>'
	},
	selectTxt : function(el,start,end,curPosition){
		var range;
		if (document.createRange) {
			el.setSelectionRange(start,end);
		}
		else {
			range = el.createTextRange();
			range.collapse(1);
			range.moveStart("character",start);
			range.moveEnd("character",end - start);
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
			document.selection.createRange().text = '��';
			var  range = el.createTextRange(),
				value = el.value,
				position,br;
			position = value.indexOf('��');
			br = (el.value.match(/\n/g) || []).length;
			range.collapse(1);
			range.moveStart('character',position - br);
			range.moveEnd("character",1);
			range.select();
			if (range.text == '��') {
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
	follow : function(id,el,call){
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
				data : {u:id,r:MI.random()},
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
							call();
						}
					}
					else if (data.msg){
						alert(data.msg);
					}
				}
			});
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
							el.innerHTML = isDel ? '�����˻���' : 'ȡ������';
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
		type = type || '4,3,2,1',
		//type = type || '4,3,2', //��ʱȥ��������ʾ
		setInterval(newCout,30000);
		setTimeout(function(){ //�����ӳ٣�IE��ż������ᱻ���
			newCout();
		},10);
		function newCout(){
			UI.get('/asyn/newMsgCount.php','type=' + type + '&r=' + MI.random(),function(data){
				data = MI.json(data);
				//data = {"result":0,"msg":"\u6210\u529f","info":[{"type":1,"value":999},{"type":2,"value":2},{"type":3,"value":3},{"type":4,"value":4}]};
				if (data.result == 0) {
					var target,num,tip,_new;
					UI.each(data.info,function(o,i){
						num = o.value;
						if (o.type == 1) {
							target = $('newCountFollower');
							if (target && num) {
								var _num = target.firstChild,followerNum = $('followerNum');
								_num.innerHTML =  num > 250 ? '<strong>250</strong>+' : '+<strong>' + num + '</strong>';
								_num.title =  '��' + (num > 250 ? '����250' : num) + '��������';
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
						if (o.type == 3 && !MI.noNewCount) {
							if (MI.talkList && MI.talkList._new) {
								if (num > 200) {
									tip = '����<strong>200</strong>����';
								}
								else tip = '<strong>' + num + '</strong>��';
								_new = MI.talkList._new;
								_new.innerHTML = '<a href="javascript:void(0)">��' + tip + '�¹㲥���������</a>';

								//Title Tip
								if (!document.titleTmp) {
									document.titleTmp = document.title;
								}
								if (num > 200) {
									document.title = '(200+) ' + document.titleTmp;
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
				}
			});
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
		var list = $$('.main .LC')[0],main = UI.parents($(id),'main')[0],side = UI.next(main),wrap = main.parentNode,y;
		if (list) {
			UI.C(list,'marginBottom',0);
			y = UI.height(main) - UI.height(wrap);
			UI.C(list,'marginBottom',y < 0 ? - y + 'px' : '');
		}
	}
}
MI.DropTips = function(id){ //DropTips For Top Search
	var Self = this;
	this._key = $(id);
	if (this._key) {
		this._form = UI.parent(this._key);
		this._btn = this._key.nextSibling;
		this._select = UI.html('<ul class="dropTips"><li class="on">����</li><li>�ѻ���</li></div>')[0];
		this._list = $$(this._select,'li');
		/*this._select = UI.html('<div class="dropTips"><h5>��ѡ��������Χ</h5><p class="on">��<strong></strong>����</p><p>��<strong></strong>�Ļ���</p></div>')[0];
		this._list = $$(this._select,'p');
		this._value = $$(this._select,'strong');*/
		UI.after(this._select,this._key);
		this._key.value = '';
		this._key.blur();
		UI.hide(Self._select);

		//Event
		UI.each(Self._list,function(el,i){
			el.onmouseover = function(){
				Self.select(i);
			}
			el.onclick = function(){
				Self.submit();
			}
		});
		UI.EA(document.body,'click',function(){
			Self.hide();
		});
		this._key.onblur = function(){
			if(!this.value) UI.show(UI.prev(this));
		}
		this._key.onbeforeeditfocus = this._key.onfocus = function(){
			UI.hide(UI.prev(this));
			Self.select(Self.index);
		}
		this._key.onclick = function(e){
			UI.E(e).stop();
		}
		this._key.onkeyup = function(e){
			var E = UI.E(e),index = Self.index;
			if (E.key == 40) { //Down Key
				index++
			}
			else if (E.key == 38) { //Up Key
				index--;
			}
			Self.select(index);
		}
		this._form.onsubmit = function(){
			if(UI.trim(Self._key.value)) {
				Self.submit();
			}
			else {
				Self._key.focus();
			}
			return false;
		}
		MI.addHover(this._btn);
	}
}
MI.DropTips.prototype = {
	action : ['/search/index.php?pos=1&k=','/k/'],
	index : 0,
	hide : function(){
		UI.hide(this._select);
	},
	select : function(index){
		/*var maxIndex = this.action.length - 1,value = UI.trim(this._key.value);
		if (value) {
			UI.show(this._select);
		}
		else {
			UI.hide(this._select);
			return;
		}

		if (index < 0) {
			index = 0;
		}
		else if (index > maxIndex) {
			index = maxIndex;
		}
		UI.removeClass(this._list[this.index],'on');
		this.index = index;
		UI.addClass(this._list[this.index],'on');*/
	},
	submit : function(){
		var action = this.action[this.index],value = encodeURIComponent(this._key.value);
		document.location.href = action + (action.hasString('?') ? value : encodeURIComponent(value));
	}
}
MI.AutoCmt = function(o){ //Auto Complete
	/*
		URL : /asyn/nicktips.php?type=1&num=100 //0-All, 1-Following, 2-Followed(Use In Message)
		{
			"result":0,
			"msg":"�ɹ�",
			"info":{"222":"\u5730\u65b9","232":"\u5730\u65b9\u5730\u65b9"} //[id,name]
		}
	*/
	var Self = this;
	Self._target = o.target;
	Self.key = o.key;
	Self.call = o.call;

	//Dom
	Self._shadow = UI.html('<div class="txtShadow"><span></span><b>|</b><span></span></div>')[0];
	UI.after(Self._shadow,o.target);
	Self._txt = Self._shadow.firstChild;
	Self._cursor = Self._txt.nextSibling;
	Self._txtEnd = Self._shadow.lastChild;
	if (UI.B.ie) {
		UI.before(UI.html('<b style="display:none;width:0;overflow:hidden">\001</b>')[0],o.target);
	}
	//Self._body = UI.html('<ul class="autoCmt" style="display:none"></ul>')[0];

	//Event
	UI.EA(o.target,'keydown',function(e){
		if (!Self.display || !UI.isNumber(Self.index)) {
			return;
		}
		var E = UI.E(e);
		if (E.key == 40 || E.key == 38) {
			UI.removeClass(Self.list[Self.index],'on');
			if (E.key == 38) {
				Self.index--;
			}
			else if (E.key == 40) {
				Self.index++;
			}
			if (Self.index < 0) {
				Self.index = Self.indexMax;
			}
			else if (Self.index > Self.indexMax) {
				Self.index = 0;
			}
			UI.addClass(Self.list[Self.index],'on');
			Self._body.scrollTop = (Self.index - 4) * 21;
			Self.clicks = 1;
			clearTimeout(Self.delay);
			E.prevent();
		}
		else if (E.key == 13 || E.key == 27) { //Space Key : || E.key == 32 || E.key == 229
			if (E.key == 27) {
				Self.hide();
			}
			else {
				Self.select();
			}
			Self.clicks = 1;
			clearTimeout(Self.delay);
			E.prevent();
		}
	});
	/**/
	//UI.EA(window,'resize',hide);
	UI.EA(document.body,'click',hide);
	/*UI.EA(Self._target,'click',function(e){
		UI.E(e).stop();
	});*/
	//UI.EA(Self._target,'blur',hide);
	UI.EA(o.target,'keyup',show);
	UI.EA(o.target,'mouseup',show);
	function show(e){
		var E = UI.E(e);
		clearTimeout(Self.delay);
		Self.delay = setTimeout(function(){
			_show();
		},150);
	}
	function _show(){
		var text,textEnd,textLength,
			value = Self._target.value;
		if (Self.clicks > 0) {
			Self.clicks--;
			return;
		}
		Self.cursorX = MI.cursorX(Self._target);
		value = value.replace(/\r/g,'');
		text = value.slice(0,Self.cursorX);
		if (!Self.key && text.match(/^@/)) {
			Self.filter = '@';
			text = text.replace(/^@/,'');
		}
		else {
			Self.filter = '';
		}
		textEnd = value.slice(Self.cursorX);
		Self.word = Self.key ? text.match(/@[^\s@\n\r]{0,64}$/g) : text.match(/[^\s\n\r]{0,64}$/g);
		if (Self.word) {
			Self.word = Self.word[0];
			textLength = Self.word.length;
			if (textLength > 1) {
				text = text.slice(0,- textLength + 1);
			}
		}
		else {
			clearTimeout(Self.delay);
			Self.hide();
			return;
		}
		Self._txt.innerHTML = Self.key ? text.replace(/\r\n|\n/g,'<br>').replace(/ /g,'&nbsp;') : '';
		Self._txtEnd.innerHTML = textEnd.replace(/\r\n|\n/g,'<br>').replace(/ /g,'&nbsp;');

		if (Self.word) { //E.key == 50
			if (!Self._body.appended) {
				UI.append(Self._body,document.body);
				Self._body.appended = 1;
				/*Self._body.onmouseover = function(e){
					var E = UI.E(e);
					if (E.target.nodeName == 'LI') {
						if (Self.index == null) {
							Self.index = 0;
						}
						UI.removeClass(Self.list[Self.index],'on');
						UI.addClass(E.target,'on');
						Self.index = E.target.index;
					}
				}*/
				/*Self._body.onmouseup = function(e){
					var E = UI.E(e);
					if (E.target != this) {
						Self.select();
					}
				}*/
				UI.EA(window,'beforeunload',function(){ //Store User Count
					var key = 'top_' + MI.user.account;
					if (MI.isS) {
						var arr = [];
						for (var i in MI.users) {
							arr.push(i + ':' + MI.users[i]);
						}
						MI.S(key,'{' + arr.join(',') + '}');
					}
				})
			}

			var type = Self.key ? 'follow_' : 'followed_',
				usersStorageKey = type + MI.user.account,
				usersTopStorageKey = 'top_' + MI.user.account,
				//usersKey = type + 'users',
				users = MI.S(usersStorageKey),
				usersTop = MI.S(usersTopStorageKey);
			if (!MI.isS) {
				return;
			}
			if (!usersTop) {
				MI.S(usersTopStorageKey,'{}')
			}
			if (!MI.users) {
				MI.users = MI.json(MI.S(usersTopStorageKey));
				Self.sort();
			}
			if (!Self.sending && (!users || new Date().getTime() - MI.S('time') > 7200000)){ //3600000
				Self.sending = 1;
				UI.get('/asyn/nicktips.php','user=' + MI.user.account + '&type=' + (Self.key ? 0 : 2) + '&num=' + (UI.B.ie ? 1000 : 2000),function(data){
					//data = '{"result":0,"info":{"hecaitou":"Lecter","clarence":"kaka","pony":"pony","patrick":"���","thomas":"����"}}';
					//var Data = MI.json(unescape(data));
					var Data = MI.json(data);
					if (Data.result == 0) {
						MI.S(usersStorageKey,data);
						MI.S('time',new Date().getTime());
						MI[usersStorageKey] = Data;
						Self.show(MI[usersStorageKey]);
					}
					Self.sending = 0;
				});
			}
			else {
				if (!MI[usersStorageKey]) {
					MI[usersStorageKey] = MI.json(users);
				}
				MI[usersStorageKey].info[MI.user.account] = MI.user.name; //Add Current User's Account
				Self.show(MI[usersStorageKey]);
			}
		}
		else {
			Self.hide();
		}
	}
	function hide(){
		Self.hide();
	}
}
MI.AutoCmt.prototype = {
	_body : UI.html('<ul class="autoCmt" style="display:none"></ul>')[0],
	display : 0,
	clicks : 0,
	index : 0,
	filter : '', //Filter @
	select : function(){
		if (UI.isNumber(this.index)) {
			var scrollTop = this._target.scrollTop,
				txt = this.list[this.index].txt,
				count;
			this._target.focus();
			if (this.key) {
				MI.insertTxt(this._target,txt + ' ',this.cursorX,this.word.slice(1).length);
				count = MI.users[txt];
				MI.users[txt] = count ? count + 1 : 1;
			}
			else {
				this._target.value = this.filter + txt;
			}
			if (this.call) {
				this.call();
			}
			this._target.scrollTop = scrollTop;
			this.hide();
		}
	},
	show : function(o){
		var Self = this;
		if (this.word) {
			var match = [],
				matchLength = 0,
				hasWord = this.word,
				//word = MI.string.html(this.word.slice(1)),
				word = this.key ? this.word.slice(1) : this.word,
				regTxt = MI.string.escapeReg(word),
				reg = new RegExp('(^' + regTxt + ')','i'),
				regAll = new RegExp('(' + regTxt + ')','ig'),
				length = word.length,
				m,
				n,
				//html = word ? '<b>' + word + '</b>' : '',
				//html = '��' + word + '��',//�з��գ���ʱ��������û�и��ð취��
				index = 0,
				txt = [],
				x,
				y,
				users = o.info;
			if (word) {
				for (var i in users) {
					/*if (!word && index > 9) {
						break;
					}*/
					if (matchLength >= 40) {
						break;
					}
					if (i.match(reg) || users[i].match(reg)) {
						//match.push(MI.string.html(o.info[i].replace(reg,html) + ' (' + i.replace(reg,html) + ')').replace(/��/,'<b>').replace(/��/,'</b>'));
						match.push(users[i].replace(reg,'<b>' + RegExp.$1 + '</b>') + ' (' + i.replace(reg,'<b>' + RegExp.$1 + '</b>') + ')');
						txt.push(i);
						matchLength++;
					}
					index++;
				}
				if (matchLength < 40) {
					for (var i in users) {
						if (matchLength >= 40) {
							break;
						}
						if (i.slice(1).match(regAll) || users[i].slice(1).match(regAll)) {
							match.push(users[i].replace(regAll,'<b>' + RegExp.$1 + '</b>') + ' (' + i.replace(regAll,'<b>' + RegExp.$1 + '</b>') + ')');
							txt.push(i);
							matchLength++;
						}
						index++;
					}
				}
			}
			else {
				if (MI.usersArr) {
					this.sort();
					for (var i = 0,num = MI.usersArr.length;i < num;i++) {
						if (i >= 10) {
							break;
						}
						var userName = MI.usersArr[i].account,userNick = o.info[userName]
						if(userNick) { //�жϳ�����ϵ���Ƿ��ڵ�ǰ��ϵ����
							match.push(userNick + ' (' + userName + ')');
							matchLength++;
						}
						txt.push(userName);
					}
				}
			}
			//matchLength = match.length;
			if (matchLength) {
				if (matchLength > 10) {
					this._body.style.cssText = 'height:210px;overflow-y:scroll;overflow-x:hidden;';
					this._body.scrollTop = 0;
				}
				else {
					this._body.style.cssText = '';
				}
				this._body.innerHTML = '<li class="on"><span>' + match.join('</span></li><li>') + '</span></li>';
				this.list = this._body.childNodes;
				UI.each(this.list,function(o,i){
					UI.EA(o,'click',select);
					UI.EA(o,'mouseover',hover);
					o.txt = txt[i];
					o.index = i;
				});
				this.display = 0;
				this.index = 0;
				this.indexMax = this.list.length - 1;
			}
			else {
				this._body.innerHTML = '';
				this.indexMax = 0;
				this.hide();
				return;
			}
			if (!this.display) {
				if (this.key) {
					x = UI.getX(this._cursor) - 12;
					y = UI.getY(this._cursor) - this._target.scrollTop + 26;
				}
				else {
					x = UI.getX(this._target);
					y = UI.getY(this._target) + UI.height(this._target) - 1;
				}
				this._body.style.cssText += ';top:' + y + 'px;left:' + x + 'px';
			}
			this.display = 1;
		}
		else {
			this.hide();
		}
		function select(){
			Self.select();
		}
		function hover(e){
			var E = UI.E(e);
			if (E.target.nodeName == 'LI') {
				if (Self.index == null) {
					Self.index = 0;
				}
				UI.removeClass(Self.list[Self.index],'on');
				UI.addClass(E.target,'on');
				Self.index = E.target.index;
			}
		}
	},
	hide : function(){
		if (this.display) {
			UI.hide(this._body);
			this.index = null;
		}
	},
	sort : function(){ //Sort For Top Users
		delete MI.usersArr;
		var usersArr = [];
		for (var i in MI.users) {
			usersArr.push({account:i,count:MI.users[i]});
		}
		MI.usersArr = usersArr.sort(function(a,b){return b.count - a.count});
	}
}
MI.Dialog = function(o){ //Dialog
	o = o || {};
	var Self = this;

	//Dom
	Self._body = UI.DC('div');
	Self._body.className = 'D';
	//Self._body.innerHTML = o.tmpl || '<div class="bg"></div><div class="CR"><div class="top"><span class="left"><em></em></span><span class="right"><em></em></span></div><div class="DTitle"></div><a' + V5 + ' class="DClose" title="�ر�">�ر�</a><div class="DLoad"></div><div class="DCont"></div><div class="bot"><span class="left"><em></em></span><span class="right"><em></em></span></div></div>';
	var html = o.tmpl || '<div class="bg"></div><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><a title="�ر�" class="DClose close" href="#">�ر�</a><div class="DLoad"></div><div class="DCont"></div></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div>'
	Self._body.innerHTML = UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' + html : html;
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
		var Self = this;
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
		for (var i = 0,num = Self._cont.childNodes.length;i < num;i++) {
			var contChild = Self._cont.childNodes[i];
			if (contChild.nodeType == 1) {
				UI.hide(contChild);
				UI.append(contChild,document.body);
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
		UI.C(Self._wrap,'width',Self.width + 'px');
		UI.C(Self._wrap,'opacity',0);
		UI.show(Self._body);

		setTimeout(function(){
			Self.resizeBg();
			Self._wrap.style.cssText = 'width:' + Self.width + 'px;margin:' + ( UI.scrollY() - UI.height(Self._wrap)/2 ) + 'px 0 0 -' + Self.width/2 + 'px;';
		},0);

		//Function
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

		Self.display = 1;
	},
	hide : function(){
		UI.hide(this._body);
		this.hideLoad();
		if (this.end) {
			this.end();
		}
		this.display = 0;
	},
	showLoad : function(){
		this._load.style.cssText = 'width:' + UI.width(this._cont) + 'px;height:' + UI.height(this._cont) + 'px';
	},
	hideLoad : function(){
		UI.hide(this._load);
	},
	$ : function(className){
		return $$(this._body,className)[0];
	}
}
MI.DialogTip = function(o){
	var Self = this;
	o = o || {};
	o.tmpl = '<div class="bg"></div><div class="CR"><div class="DTitle"></div><div class="DClose"></div><div class="DLoad"></div><div class="floatTip"><div class="lside"></div><span class="ico_tsW"><span class="ico_ts"></span></span><b class="DCont"></b><div class="rside"></div></div>';//ico_ts ico_te
	MI.Dialog.call(this,o);
	UI.hide(this._close);
	this.close = 0;
	this.delayHide = 1000;
	this.width = 860
	this._tip = this._cont.parentNode;
	this._tipWrap = $$(this._body,'.floatTip')[0];
	this._ico = $$(this._body,'.ico_tsW span')[0];
	UI.hide(this._title);
	this.call = function(){
		Self._ico.className = Self.ico || 'ico_ts';
		Self._tipWrap.style.marginLeft = - UI.width(Self._tipWrap) / 2 + 'px';
		clearTimeout(Self._delay);
		Self._delay = setTimeout(function(){
			//Self.hide();
			UI.animate(Self._tip,'opacity',0,function(){
				Self.hide();
				UI.C(Self._tip,'opacity',1);
			});
		},Self.delayHide);
	}
}
MI.DialogTip.prototype = MI.Dialog.prototype;
/*
MI.DialogMsg = function(o){
	o = o || {};
	//o.tmpl = '<div class="bg"></div><div style="position:absolute;z-index:999;top:0;left:25%;padding:25px" class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm" style="overflow:hidden"></td><td class="tr"></td></tr><tr><td class="lm"></td><td style="*padding:0;"><div class="floatWrap"><div class="close DClose"></div><div class="DTitle" style="padding:0;border:0;"></div><div class="DLoad"></div><div class="DCont" style="padding:0;border:0;background:none;"></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	o.tmpl = '<div class="bg"></div><div class="D"><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><div class="DClose close"></div><div class="DLoad"></div><div class="DCont"></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	MI.Dialog.call(this,o);
}
MI.DialogMsg.prototype = MI.Dialog.prototype;*/
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
			_body.load('oXMLBranch');
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
	var filter = /^draft|top|follow|time|option/,local = window.localStorage;
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
	o.src = 'http://mat1.gtimg.com/www/mb/images/head_' + size + '.jpg';
}
MI.Crs = function(reset){
	clearTimeout(MI.delay.crs);
	var y = UI.scrollY() + UI.windowHeight() * 1.5,noCrs = 1,className = 'crs';
	if (reset) {
		MI.crs = $$('.' + className);
	}
	UI.each(MI.crs,function(o){
		if (UI.hasClass(o,className) && UI.getY(o) < y) {
			o.src = UI.A(o,className);
			o.style.display = 'inline';
			UI.removeClass(o,className);
		}
	});
}
MI.Load = function(id,url,type){
	var el = $(id),P = el.parentNode,btn = $$(P,'h3')[0].lastChild,_fold='����',_unfold='չ��',_loading='loading',_folded='fold',folded = UI.hasClass(P,_folded);
	if (UI.hasClass(btn,_loading)) {
		return;
	}
	else if (el.innerHTML == '') {
		UI.addClass(btn,_loading);
		UI.get(url,'t=' + type + '&r='+MI.random(10000),function(data){
			data = MI.json(data);
			if (data.result == 0){
				el.innerHTML = data.info[type];
				UI.removeClass(P,_folded);
				btn.title = _fold;
				if (MI.talkList) {
					MI.talkList.bottom()
				}
			}
			UI.removeClass(btn,_loading);
		});
	}
	else {
		UI.toggleClass(P,_folded);
	}
	if (MI.talkList) {
		MI.talkList.bottom();
	}
	btn.blur();
	btn.title = folded ? _unfold : _fold;
	MI.S('option_' + type + '_' + MI.user.account,folded ?  1 : -1);
	MI.Bos('btn' + (folded ? 'Un' : '') + 'Fold' + type);
}
MI.PV = function(name){
	if (window.pvCurUrl && pvCurUrl != '') {
		if (!pvCurUrl.match(new RegExp(name + '$'))) {
			pvCurUrl += '/' + name;
		}
		pvRepeatCount = 1;
		if(typeof(pgvMain) == 'function') pgvMain();
	}
}
MI.Bos = function(op){ //Boss Using : MI.Bos('frontClick');
	try{
		var ouin = UI.trim(UI.cookie("o_cookie"));
		MI.Bos.pic.src="http://btrace.qq.com/collect?sIp=&iQQ=" + ouin + "&sBiz=microblog&sOp=" + op +"&iSta=0&iTy=18&iFlow=0";
	}catch(e){}
}
MI.Bos.pic = new Image();
/*
MI.Validate = function(o){ //Validate
	//
	//	account : {
	//		rule : function(str){
	//			return 'error';
	//		},
	//		replace : function(str){
	//			
	//		}
	//	}
	//
	this.data = o;
	this.check = o.check; //Other Validate
	this.isAjax = o.isAjax == undefined ? 1 : o.isAjax; //Submit By Ajax
	this._body  = $(o.id); //Form
	
	var Self = this,msgFunction,index = 0,input,target;
	if (UI.isFunction(o.messages)) {
		msgFunction = 1;
	}

	for (var i in Self.data.inputs) {
		input = Self.data.inputs[i];
		target = input.target = $(i); //Target Dom
		if (msgFunction) {
			input.message = o.messages(o.inputs[i].target);
		}
		else {
			input.message = o.messages[index];
			index++;
		}
		UI.A(input.message,'rel',input.message.innerHTML || '');
		input.ico = UI.html('<b class="pass" style="display:none"></b>')[0];
		UI.after(input.ico,input.target);

		//Event
		target.onfocus = function(){
			this.ico = 0;
			this.focused = 1;
		};
		target.onblur = function(){
			this.blured = 1; //If Need To Check
			this.ico = 1; //If Need To Add Ico
			this.focused = 0;
		};
		UI.EA(target,'blur',validate);
		UI.EA(target,'keyup',validate);
	}

	UI.EA(Self._body,'submit',function(e){
		var E = UI.E(e),data = {},target,tmp;
		Self.success = 1; //No Error
		if (Self.isAjax) {
			E.prevent();
		}
		if (Self.check && Self.check()) {
			return;
		}
		for (var i in Self.data.inputs) { //Validate All Input
			validate(i);
		}
		//Submit
		if (Self.success && Self.isAjax) {
			for (var i in Self.data.inputs) {
				target = $(i);
				if (target.type == 'radio') {
					tmp = $$(target.parentNode,'input[type=radio]');
					for (var j = 0,num = tmp.length;j < num;j++) {
						if (tmp[j].checked) {
							data[i] = tmp[j].value;
							break;
						}
					}
				}
				else {
					data[i] = $(i).value;
				}
			}
			UI.ajax({url:UI.A(Self._body,'action'),data:data,success:function(data){
				//data = {result:0,msg:'�û�δ��½',info:[{result:0,msg:'��ȷ'},{result:0,msg:'��ȷ'}]};
				data = MI.json(data);
				var index = 0,success = 1,input;
				if (data.result == 0) {
					if (data.info) {
						for (var i in Self.data.inputs) {
							input = Self.data.inputs[i];
							if (data.info[index].result == 0) {
								if (!input.removed) {
									if (input.success) {
										Self.showMessage(input,input.success,1);
									}
									else Self.hideMessage(input);
									if (input.remove) {
										UI.A(input.target,'disabled','disabled');
										input.removed = 1;
									}
								}
							}
							else {
								Self.showMessage(input,data.info[index].msg);
								success = 0;
							}
							index++;
						}
					}
					if (success && Self.data.success) {
						Self.data.success();
					}
				}
				else if (data.msg){
					alert(data.msg);
				}
			}});
		}
		else if (!Self.success) {
			E.prevent();
		}
	});
	function validate(e){
		var E,i,input,value,valueReplaced,error = 0,isSubmit = 0,url = {};
		if (UI.isString(e)) {
			i = e;
			isSubmit = 1;
		}
		else {
			E = UI.E(e);
			i = UI.A(E.target,'name');
		}
		input = Self.data.inputs[i],target = input.target,value = target.value;
		if (input.removed) { //Don't Validate Removed Input
			return;
		}
		if (input.replace) {
			valueReplaced = input.replace(value);
			if (value != valueReplaced) {
				target.value = valueReplaced;
			}
		}
		if (isSubmit ? 1 : target.blured) {
			error = input.rule ? input.rule(target.value) : 0;
			if (!error) { //Not Error
				if (!input.url || (input.url && target.focused) ) {
					Self.hideMessage(input);
					target.error = 0;
				}
			}
			else {
				Self.showMessage(input,error);
				if (isSubmit) {
					Self.flashMessage(input);
				}
				target.error = 1;
				Self.success = 0;
			}
		}
		//Ajax Check
		url[i] = value;
		if (!isSubmit && !error && input.url && target.blured && E.type == 'blur') {
			UI.get(input.url,url,function(data){
				data = MI.json(data);
				if (data.result == 0) {
					Self.hideMessage(input);
				}
				else {
					Self.showMessage(input,data.msg);
					Self.success = 0;
				}
			});
		}
	};
}
MI.Validate.prototype = {
	showMessage : function(o,text,success){
		if (!text) {
			text = UI.A(o.message,'rel');
		}
		o.message.innerHTML = text;
		UI.addClass(o.message,success ? 'success' : 'error');
		if (!o.noIco && success) {
			UI.show(o.ico);
		}
		else UI.hide(o.ico);
	},
	hideMessage : function(o){
		o.message.innerHTML = UI.A(o.message,'rel') || '';
		UI.removeClass(o.message,'error');
		UI.removeClass(o.message,'success');
		if (!o.noIco && o.target.ico) {
			UI.show(o.ico);
		}
	},
	flashMessage : function(o){
		clearInterval(o.delay);
		UI.C(o.message,'opacity',0);
		o.delay = UI.animate(o.message,'opacity',1);
	}
}
MI.ValidateNew = function(o){ //Validate New For Register
	this.data = o;
	this.check = o.check; //Other Validate
	this.isAjax = o.isAjax == undefined ? 1 : o.isAjax; //Submit By Ajax
	this._body  = $(o.id); //Form
	
	var Self = this,msgFunction,index = 0,input,target;
	if (UI.isFunction(o.messages)) {
		msgFunction = 1;
	}

	for (var i in Self.data.inputs) {
		input = Self.data.inputs[i];
		target = input.target = $(i); //Target Dom
		if (msgFunction) {
			input.message = o.messages(o.inputs[i].target);
		}
		else {
			input.message = o.messages[index];
			index++;
		}
		UI.A(input.message,'rel',input.message.innerHTML || '');
		UI.hide(input.message);
		input.ico = UI.html('<b class="pass" style="display:none"></b>')[0];
		UI.after(input.ico,input.target);

		//Event
		target.onfocus = function(){
			UI.show(Self.data.inputs[this.id].message);
			this.ico = 0;
			this.focused = 1;
		};
		target.onblur = function(){
			var message = Self.data.inputs[this.id].message;
			if (!UI.hasClass(message,'error')) {
				UI.hide(message);
			}
			else {
				UI.show(message);
			}
			this.blured = 1; //If Need To Check
			this.ico = 1; //If Need To Add Ico
			this.focused = 0;
		};
		UI.EA(target,'blur',validate);
		UI.EA(target,'keyup',reset);
	}

	UI.EA(Self._body,'submit',function(e){
		var E = UI.E(e),data = {},target,tmp;
		Self.success = 1; //No Error
		if (Self.isAjax) {
			E.prevent();
		}
		if (Self.check && Self.check()) {
			return;
		}
		for (var i in Self.data.inputs) { //Validate All Input
			validate(i);
		}
		//Submit
		if (Self.success && Self.isAjax) {
			for (var i in Self.data.inputs) {
				target = $(i);
				if (target.type == 'radio') {
					tmp = $$(target.parentNode,'input[type=radio]');
					for (var j = 0,num = tmp.length;j < num;j++) {
						if (tmp[j].checked) {
							data[i] = tmp[j].value;
							break;
						}
					}
				}
				else {
					data[i] = $(i).value;
				}
			}
			UI.ajax({url:UI.A(Self._body,'action'),data:data,success:function(data){
				//data = {result:0,msg:'�û�δ��½',info:[{result:0,msg:'��ȷ'},{result:0,msg:'��ȷ'}]};
				data = MI.json(data);
				var index = 0,success = 1,input,errorNum = 0;
				if (data.result == 0) {
					if (data.info) {
						for (var i in Self.data.inputs) {
							if (!data.info[index]) {
								continue;
							}
							input = Self.data.inputs[i];
							if (data.info[index].result == 0) {
								if (!input.removed) {
									if (input.success) {
										Self.showMessage(input,input.success,1);
									}
									else Self.hideMessage(input);
									if (input.remove) {
										UI.A(input.target,'disabled','disabled');
										input.removed = 1;
									}
								}
							}
							else {
								if (errorNum == 0) {
									input.target.focus();
								}
								Self.showMessage(input,data.info[index].msg);
								success = 0;
								errorNum++;
							}
							index++;
						}
					}
					if (success && Self.data.success) {
						Self.data.success();
					}
				}
				else if (data.msg){
					alert(data.msg);
				}
			}});
		}
		else if (!Self.success) {
			E.prevent();
		}
	});
	function validate(e){
		var E,i,input,value,valueReplaced,error = 0,isSubmit = 0,url = {};
		if (UI.isString(e)) {
			i = e;
			isSubmit = 1;
		}
		else {
			E = UI.E(e);
			i = UI.A(E.target,'name');
		}
		input = Self.data.inputs[i],target = input.target,value = target.value;
		if (input.removed) { //Don't Validate Removed Input
			return;
		}
		if (input.replace) {
			valueReplaced = input.replace(value);
			if (value != valueReplaced) {
				target.value = valueReplaced;
			}
		}
		if (isSubmit ? 1 : target.blured) {
			error = input.rule ? input.rule(target.value) : 0;
			if (!error) { //Not Error
				if (!input.url || (input.url && target.focused) ) {
					Self.hideMessage(input);
					target.error = 0;
				}
			}
			else {
				Self.showMessage(input,error);
				target.error = 1;
				Self.success = 0;
			}
		}
		//Ajax Check
		url[i] = value;
		if (!isSubmit && !error && input.url && target.blured && E.type == 'blur') {
			UI.get(input.url,url,function(data){
				data = MI.json(data);
				if (data.result == 0) {
					Self.hideMessage(input);
				}
				else {
					Self.showMessage(input,data.msg);
					Self.success = 0;
				}
			});
		}
	};
	function reset(e){
		var E = UI.E(e),i = UI.A(E.target,'name'),input = Self.data.inputs[i];
		Self.hideMessage(input);
	}
}
MI.ValidateNew.prototype = {
	showMessage : function(o,text,success){
		if (!text) {
			text = UI.A(o.message,'rel');
		}
		o.message.innerHTML = '<div class="SA"><em>��</em><span>��</span></div>' + text;
		UI.show(o.message);
		UI.addClass(o.message.parentNode,success ? '' : 'error');
		UI.addClass(o.message,success ? 'success' : 'error');
		if (!o.noIco && success) {
			UI.show(o.ico);
		}
		else UI.hide(o.ico);
	},
	hideMessage : function(o){
		o.message.innerHTML = UI.A(o.message,'rel') || '';
		UI.removeClass(o.message.parentNode,'error');
		UI.removeClass(o.message,'error');
		UI.removeClass(o.message,'success');
		if (!o.noIco && o.target.ico) {
			UI.show(o.ico);
		}
	}
}
MI.RelateSelect = function(o){ //RelateSelect
	var Self = this,select,selectFirst,option,value;
	Self._body = $(o.id);
	select = $$(Self._body,'select');
	Self._first = select[0];
	Self._second = select[1];
	Self._third = select[2];
	Self.data = o.data;

	Self._first.innerHTML = Self._second.innerHTML = Self._second.innerHTML = '';
	for (var i in o.data) {
		option = UI.DC('option'),value = i.split(',');
		option.innerHTML = value[0];
		option.value = value[1];
		UI.append(option,this._first);

		if (!selectFirst) {
			selectFirst = value;
		}
	}
	//Self.first(selectFirst);
	
	option = UI.DC('option');
	option.innerHTML = '����/����';
	UI.prepend(option,this._first);

	//Event
	Self._first.onchange = function(){
		Self.first(Self.index(this));
	}
	Self._second.onchange = function(){
		Self.second(Self.index(this));
	}
}
MI.RelateSelect.prototype = {
	first : function(index) {
		if (!this.data[index]) {
			UI.hide(this._second);
			UI.hide(this._third);
			return;
		}
		var option,value,secondEmpty,secondTop,third;
		this._second.innerHTML = this._third.innerHTML = '';
		for (var i in this.data[index]) {
			if (!secondTop) {
				secondTop = i;
			}
			option = UI.DC('option'),value = i.split(',');
			option.innerHTML = value[0];
			option.value = value[1];
			if (value[1]) {
				UI.append(option,this._second);
			}
		}
		if (!this._second.innerHTML) {
			UI.hide(this._second);
			this._second.value = '';
			secondEmpty = 1;
		}
		else {
			UI.show(this._second);
		}
		third = this.data[index][secondEmpty ? ',' : secondTop];
		for (var i in third) {
			option = UI.DC('option'),value = third[i].split(',');
			option.innerHTML = value[0];
			option.value = value[1];
			UI.append(option,this._third);
		}
		if (!this._third.innerHTML) {
			UI.hide(this._third);
			this._third.value = '';
		}
		else {
			UI.show(this._third);
		}
		option = UI.DC('option');
		option.value = '';
		option.innerHTML = '����';
		UI.prepend(option,this._third);
		option = UI.DC('option');
		option.value = '';
		option.innerHTML = 'ʡ��';
		UI.prepend(option,this._second);
	},
	second : function(index) {
		if (this.data[this.index(this._first)]) {
			var option,value,third = this.data[this.index(this._first)][index];
			if (third && third.length) {
				this._third.innerHTML = '';
				for (var i = 0,num = third.length;i < num;i++) {
					option = UI.DC('option'),value = third[i].split(',');
					option.innerHTML = value[0];
					option.value = value[1];
					UI.append(option,this._third);
				}
				UI.show(this._third);
				option = UI.DC('option');
				option.value = '';
				option.innerHTML = '����';
				UI.prepend(option,this._third);
			}
			else {
				UI.hide(this._third);
				this._third.value = '';
			}
			UI.show(this._second);
		}
		else {
			UI.hide(this._second);
			this._second.value = '';
		}
	},
	index : function(el){
		return el.childNodes[el.selectedIndex].innerHTML + ',' + el.value;
	},
	set : function(el,name){
		if (name) {
			UI.each(el.childNodes,function(o){
				if (UI.isObject(o)) {
					var select = o.innerHTML == name ? 'selected' : '';
					UI.A(o,'selected',select);
					o.selected = select;
				}
			});
		}
	}
}
MI.Slide = function(o){
	var Self = this;
	//Dom
	Self._parent = o.target.parentNode.parentNode;
	Self._body = o.target;
	Self._list = UI.GC(o.target,'ul')[0];
	Self._li = UI.GC(Self._body,'li');
	Self._page = Self.$('.page');
	Self._prev = Self.$('.prev');
	Self._next = Self.$('.next');

	//Data
	Self.stepSmall = UI.width(Self._li[0]);
	Self.perPage = parseInt(UI.width(Self._body) / Self.stepSmall);
	Self.total = Math.ceil(Self._li.length / Self.perPage);
	Self.step = Self.perPage * Self.stepSmall;
	Self._page.innerHTML = new UI.tmplString(Self.tmpl.page)({num:Self.total});
	Self.page();

	//Event
	UI.EA(Self._prev,'click',function(){
		Self.prev();
	});
	UI.EA(Self._prev,'click',MI.Slide.click);
	UI.EA(Self._next,'click',function(){
		Self.next();
	});
	UI.EA(Self._next,'click',MI.Slide.click);
	UI.each(Self._page.childNodes,function(o,i){
		o.num = i + 1;
		UI.EA(o,'click',MI.Slide.click);
		UI.EA(o,'click',page);
	});

	function page(e){
		var el = UI.E(e).target;
		Self.page(el.num);
	}
}
MI.Slide.click = function(e){
	var E = UI.E(e);
	E.prevent();
	E.target.blur();
}
MI.Slide.prototype = {
	loop : 1,
	cur : 1,
	tmpl : {
		page : '<%for(var i=0;i<num;i++){%><a href="#" class="<%if(i==0){%>on<%}%>"></a><%}%>'
	},
	$ : function(selector){
		return UI.GC(this._parent,selector)[0];
	},
	page : function(num){
		this.cur = num || this.cur;

		if (this.cur < 1) {
			this.cur = this.loop ? this.total : 1;
		}
		else if (this.cur > this.total) {
			this.cur = this.loop ? 1 : this.total;
		}

		UI.removeClass(UI.GC(this._page,'.on')[0],'on');
		UI.addClass(this._page.childNodes[this.cur - 1],'on');

		this.scroll();
	},
	prev : function(){
		this.cur--;
		this.page();
	},
	next : function(){
		this.cur++;
		this.page();
	},
	scroll : function(){
		clearInterval(this.delay);
		this.delay = UI.animate(this._list,'marginLeft',- (this.cur - 1) * this.step);
	}
}
*/
})();
MI.TalkBox = function(id){ //Talk Box
	this._body = UI.isString(id) ? $(id) : id;
	if (this._body) {
		var Self = this;

		//DOM
		//console.time('talkBox');
		Self._txt = Self.$('textarea') || Self.$('.inputTxt');
		Self._tip = Self.$('.countTxt');
		Self._tipBig = Self.$('.talkSuc');
		Self._btn = Self.$('.sendBtn');
		Self._topic = Self.$('.creatNew');
		Self._video = Self.$('.newVideo');
		Self._pic = Self.$('.uploadPic');
		Self._picForm = Self.$('.picForm');
		Self._picBtn = Self.$('.picForm input');
		Self._close = Self.$('.close');
		Self._num = [$('talkNum')];
		Self._addReply = Self.$('.addReply');
		Self._addComt = Self.$('.addComt');
		Self._comts = Self.$('.comts');
		
		UI.ready(function(){
			setTimeout(function(){
				Self._txt.blur();

				//Fix IE6's Bug
				//UI.hide(UI.prev(Self._txt));
				//UI.show(UI.prev(Self._txt));
			},0);

			//Talk Text
			/*Self._txt.onkeydown = function(e){
				if (!Self.sending) {
					Self.countTxt();
				}
			};*/
			var countTxt = function(e){
				if (!Self.sending) {
					Self.countTxt();
				}
			},
			countTxtDelay = function(){
				setTimeout(countTxt,0);
			};
			UI.EA(Self._txt,'keypress',countTxt);
			UI.EA(Self._txt,'input',countTxt);
			UI.EA(Self._txt,'paste',countTxtDelay);
			UI.EA(Self._txt,'cut',countTxtDelay);
			Self._txt.onbeforeeditfocus = countTxtDelay;
			Self._body.onkeydown = function(e){
				if (!Self.sending) {
					var E = UI.E(e);
					if (E.ctrl && E.key == 13) { //Alt+S : E.alt && E.key == 83
						//E.prevent();
						Self.sending = 1; //Don't Count And Send When 'sending == true'
						Self.countTxt();
						Self.send();
						MI.Bos('btnCtrlEnter');
					}
				}
			};
			Self._txt.onkeyup = function(){
				if (!Self.sending) {
					clearTimeout(Self.delay.count);
					Self.delay.count = setTimeout(function(){
						Self.countTxt();
					},100);
				}
			};
			Self._txt.onfocus = function(){
				//UI.hide(UI.prev(this));
				UI.addClass(this,'focus');
				this.focused = 1;
			};
			Self._txt.onblur = function(){
				var el = this;
				clearTimeout(Self.delay.blur);
				Self.delay.blur = setTimeout(function(){
					UI.removeClass(el,'focus');
					if (!Self.sending) {
						Self.countTxt();
					}
				},0);
				/*if (Self._txt.value == 0) {
					UI.show(UI.prev(this));
				}*/
				this.focused = 0;
			};

			//Auto Complete
			if (!UI.hasClass(Self._txt,'noAutoCmt')) {
				new MI.AutoCmt({
					target : Self._txt,
					key : 1,
					call : function(){
						Self.countTxt();
					}
				});
			}

			//New Topic
			if (Self._topic) {
				Self._topic.onclick = function(){
					Self.addTopic();
					MI.Bos('btnTopic');
				}
			}
			//Add Video
			if (Self._video) {
				
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
				var html = UI.html('<span class="loading" style="display:none">�ϴ��� <a href="#" class="cancel" title="ȡ��">[ȡ��]</a></span><span style="display:none" class="preview"><span class="link"></span><a href="#" class="del" title="ɾ��">[ɾ��]</a></span><iframe id="imageUpload" name="imageUpload" src="about:blank" style="display:none"></iframe>'),
					frag = document.createDocumentFragment();
				UI.each(html,function(o){
					UI.append(o,frag);
				});
				UI.append(frag,Self._pic);

				Self._picForm.reset();
				UI.A(Self._picForm,'action','/asyn/uploadpic.php');

				Self._iframe = $('imageUpload');
				Self._picIco = $$(Self._pic,'.ico_pic')[0];
				Self._picTxt = $$(Self._pic,'.txt')[0];
				Self._picLoading = $$(Self._pic,'.loading')[0];
				Self._picPreview = $$(Self._pic,'.preview')[0];
				Self._picLink = $$(Self._pic,'.link')[0];
				Self._picDel = $$(Self._pic,'.del')[0];
				Self._picCancel = $$(Self._pic,'.cancel')[0];
				Self._pic.onmouseover = function(){
					UI.addClass(this,'hover');
				}
				Self._pic.onmouseout = function(){
					UI.removeClass(this,'hover');
				}
				Self._picForm.onsubmit = function(){
					if (!Self._picBtn.value) {
						return false;
					}
				}
				Self._picBtn.onchange = function(){ //Upload
					var fileName = this.value,
						fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length).toLowerCase();
					if (!'jpg,jpeg,gif,png'.hasString(fileType)) {
						alert('��֧��jpg��jpeg��gif��pngͼƬ�ļ�');
						return false;
					}
					UI.show(Self._picLoading);
					UI.hide(Self._picForm);
					UI.hide(Self._picTxt);
					UI.hide(Self._picIco);
					Self._picForm.submit();
					MI.Bos('btnPic');
				}
				Self._picDel.onclick = function(){ //Delete
					Self.delPic();
					MI.Bos('btnPicDel');
					return false;
				}
				Self._picCancel.onclick = function(){ //Delete
					Self.cancelPic();
					MI.Bos('btnPicCancel');
					return false;
				}
			}
			//Add Reply
			if (Self._addReply) {
				Self._addReply.onclick = function(){
					UI.hide(this);
					var length = Self._txt.value.length;
					Self._txt.value = Self._txt.value.replace(this.txt,'');
					Self.countTxt();
					Self._txt.focus();
					MI.selectTxt(Self._txt,length,length,length);
					MI.Bos('btnAddReply');
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

			//Submit Button
			//Self._btn.onfocus = MI.blur;
			Self._btn.onclick = function(){
				if (UI.hasClass(this,'disabled')) {
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
						MI.Bos('btnSend');
						break;
					case 1:
						MI.Bos('btnSendReply');
						break;
					case 2:
						MI.Bos('btnSendRelay');
						break;
					case 3:
						MI.Bos('btnSendMsg');
						break;
				}
			};
			if (Self._close) {
				Self._close.onclick = function(){
					Self.hide();
					MI.Bos('btnClose');
					return false;
				}
			}
		});
		//console.timeEnd('talkBox');
	}
}
MI.TalkBox.prototype = {
	delay : {},
	delayTime : 1500,
	url : '/publish.php',
	type : null, //Value: null(Talk)  1(Relay)  2(Reply) 3(Message) 4(Comment)
	countType : '', //Count TalkBox's Type For Product
	pic : '', //Save Pic's Url
	topic : null, //Auto Add Topic
	talkId : null, //Id To Reply Or Relay
	txtMax : 140,
	txtCache : '', //Cache Success Talk
	txtTopic : '#���뻰�����#',
	txtPic : '������Ƭ',
	txtTip : {
		empty : '����������',
		fail : '����ʧ��,������',
		repeat : '�벻Ҫ���������ظ�����'
	},
	txtTipSend : '�㲥��',
	addList : 0, //If Add New Talk To List
	addCheck : null, //Check Content Of Add New Talk To List
	addNum : 1, //Add Num When Send Success
	autoHeight : 0, //Auto Change Textarea's Height
	tmpl : MI.tmpl.list,
	countUrl : 1,
	countTxt : function(){
		var Self = this,
			txt = Self._txt,
			value = txt.value,
			talkTip,
			length,
			len,
			url = value.match(new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*','gi')) || [],
			urlExceed = 0,
			urlNum = 0;
		//Self.length = length = MI.string.length(value);
		Self.length = length = value.length;
		if (length < 500) {
			if (Self.countUrl) {
				UI.each(url,function(o){ //Dont's Match Small Url And Big Url
					value = value.replace(o,'_');
					urlNum++;
					len = o.length;
					if (len > 256) { //o.length > 20 && 
						urlExceed += len - 256;
					}
				});
			}
			//Self.length = length = Math.ceil((MI.string.length(UI.trim(value).replace(new RegExp(Self.txtTopic,'g'),'')) + urlNum * 19 + urlExceed) / 2);
			Self.length = length = Math.ceil(UI.trim(value).replace(new RegExp(Self.txtTopic,'g'),'').length + urlNum * 19 + urlExceed);
		}
		if (!length && Self._tip.innerHTML.hasString(Self.txtTip.empty)) {
			return;
		}
		if (length > this.txtMax) {
			talkTip = '����<em class="error">';
			Self._btn.disable = 1;
			//UI.addClass(Self._btn,'disabled');
		}
		else {
			talkTip = '��������<em>';
			Self._btn.disable = 0;
			//UI.removeClass(Self._btn,'disabled');
		}
		if (length == 0) {
			Self._btn.disable = 1;
			//UI.addClass(Self._btn,'disabled');
		}
		Self.showTip(talkTip + Math.abs(Self.txtMax - length) + '</em>��');
		if (Self._msgTo && (Self._msgTo.value == '' || Self._msgTo.error)) {
			Self._btn.disable = 1;
			//UI.addClass(Self._btn,'disabled');
		}
		if (length <= Self.txtMax && Self.type == 1) {
			Self._btn.disable = 0;
			//UI.removeClass(Self._btn,'disabled');
		}
		if (Self.autoHeight) {
				/**/
			clearTimeout(this.delay.height);
			this.delay.height = setTimeout(function(){
				UI.C(Self._txt,'height','');
				//if (Self._txt.scrollHeight <= 136) {
				//	UI.C(Self._txt,'height','');
				//}
				var height = Self._txt.scrollHeight;
				if (UI.B.ie) {
					if (Self.autoHeight > 40 && height < 38) {
						height = 37;
					}
					else if (Self.autoHeight <= 40 && height <= 18) {
						height = 16;
					}
				}
				if (Self.autoHeight > 40 && height >= Self.autoHeight) {
					height = Self.autoHeight;
				}
				if (height >= 136) {
					height = 136;
					UI.C(Self._txt,'overflowY','auto');
				}
				else {
					UI.C(Self._txt,'overflowY','hidden');
				}
				UI.C(Self._txt,'height',height + 'px');
				if (Self._txt.nextSibling) {
					UI.C(Self._txt.nextSibling,'height',height + 'px');
				}
			},100);
				
		}
		if (Self.autoSave && length <= this.txtMax && MI.isS) {
			clearTimeout(Self.delay.save);
			Self.delay.save = setTimeout(function(){
					Self.save();
			},80);
		}
	},
	save : function(){
		try{
			MI.S('draft_' + MI.user.account,this._txt.value.replace(new RegExp(this.txtTopic,'g'),'') || '');
		}catch(e){};
	},
	showTip : function(msg,type){ //type: 1-error 2-loading
		if (type == 2) {
			UI.addClass(this._tip,'loading');
		}
		else {
			UI.removeClass(this._tip,'loading');
		}
		this._tip.innerHTML = type == 1 ? '<span class="error">' + msg + '</span>' : msg;
	},
	flashTip : function(){
		clearInterval(this.delay.flashTip);
		UI.C(this._tip,'opacity','0');
		this.delay.flashTip = UI.animate(this._tip,'opacity',1,0,0.2);
	},
	hide : function(){ //Hide TalkBox
		UI.remove(this._body);
		if (this.hideCall) {
			this.hideCall();
		}
	},
	hideCall : null, //Callback After Hide
	success : null, //Callback After Send Success
	send : function(){
		var Self = this,
			data,
			addCheck = 1,
			content = UI.trim( Self._txt.value.replace(new RegExp(Self.txtTopic,'g'),'') );

		//if (UI.hasClass(Self._btn,'disabled')) {
		if (UI.hasClass(Self._btn,'disabled')) {
			return;
		}
		if (Self._btn.disable || UI.hasClass(Self._btn,'disabled')) {
			if (Self.length == 0) {
				Self.showTip(Self.txtTip.empty,1);
				Self.flashTip();
			}
			Self._txt.focus();
			/*if (UI.trim(Self._txt.value).length) {
				Self._txt.focus();
			}*/
			if (Self._msgTo && UI.trim(Self._msgTo.value) == '') {
				Self._msgTo.focus();
			}
			Self.sending = 0;
			return;
		}
		if (content && content == Self.txtCache) {
			Self.showTip(Self.txtTip.repeat,1);
			Self.flashTip();
			Self.sending = 0;
			return;
		}
		Self._btn.disable = 1;
		UI.addClass(Self._btn,'disabled');

		//Go To User's Page
		if (!Self.type && !Self.topic && content.match(/^@[\w|-]{0,64}$/g) && content.length > 1) {
			document.location.href = '/' + content.slice(1);
			return;
		}

		//Show Sending Tip
		Self.delay.tip = setTimeout(function(){
			Self.showTip(Self.txtTipSend,2);
		},500);

		//Post Data
		data = {content:content,pic:Self.pic,countType:Self.countType};
		if (Self.type) {
			data.pId = Self.talkId;
			data.type = Self.type;
		}
		if (Self._msgTo) {
			data.account = Self._msgTo.value.replace(/^@/,'');
		}
		if (Self.topic) {
			data.content = (data.content.match(new RegExp(MI.string.escapeReg(Self.topic))) ? '' : Self.topic) +  data.content;
		}
		if (Self.addCheck && !data.content.hasString(Self.addCheck)) { //If Check False,Don't Add NewTalk To List
			addCheck = 0;
		}
		UI.ajax({
			url : Self.url,
			data : data,
			success : function(data){
				clearTimeout(Self.delay.timeout);
				data = MI.json(data);
				/*data = {
					result : 0,
					msg : '���Գɹ�',
					info : {
						id : '123456',
						time : '5����ǰ',
						content : '����',
						form : '��Ѷ΢��'
					}
				};*/
				if (MI.user && data.info) {
					data.info.userPic = MI.user.pic;
					data.info.nick = data.info.nick || MI.user.name;
					data.info.account = data.info.account || MI.user.account;
					data.info.vip = data.info.vip || MI.user.vip;
					data.info.iconPic = Self.iconPic;
				}

				Self._txt.blur();

				//Show Tips
				clearTimeout(Self.delay.tip);
				//if (Self._msgTo || data.result < 0) { //Don't Show Success Msg In TalkBox
					Self.showTip(data.msg || '',data.result < 0 ? 1 : 0);
					Self.flashTip();
				//}
				if (data.result == 0 && Self._tipBig) {
					$$(Self._tipBig,'.msg')[0].innerHTML = data.msg;
					if (Self.type != 4) {
						UI.addClass(Self._body,'pubSuc');
					}
					UI.show(Self._tipBig);
				}
				Self.delay.tip = setTimeout(function(){
					UI.animate(Self._tip,'opacity',1,function(){
						if (data.result == 0) {
							Self._txt.value = '';
						}
						try{
							Self._txt.focus(); //Hided Element Can't Be Focused In IE (Bug)
						}catch(e){};
						Self.countTxt();
						if (Self._msgTo && data.result > -9 && data.result < -5) { //result : -6 -7 -8
							try{
								Self._msgTo.select();
							}catch(e){};
						}
						UI.C(Self._tip,'opacity','');
						Self._tip.style.filter = '';
						Self.sending = 0;
						UI.removeClass(Self._btn,'disabled');
						if (data.result == 0) {
							Self.delPic();
						}
						if (Self.success && data.result == 0) {
							Self.success();
							UI.hide(Self._tipBig);
						}
					});
				},data.result == 0 ? Self.delayTime : Self.delayTime + 1000);
				if (Self.successStart && data.result == 0) {
					Self.successStart();
				}

				//Add New Talk To List
				if (MI.talkList && Self.addList && data.result == 0 && addCheck) {
					data.info.source = {};
					if (Self.type && Self.type != 4) { //From Reply And Relay
						data.info.action = Self.action;
						data.info.source = Self.source;
					}
					if (MI.talkList._tip) { //Hide Talk List's Tip
						UI.hide(MI.talkList._tip);
					}

					MI.talkList.add.push(data.info.id);

					var newTalk = UI.html(new UI.tmplString(Self.tmpl)(data))[0],relayNum = $$(newTalk,'.relayNum')[0];
					if (relayNum) {
						var P = relayNum.parentNode;
						MI.countNum(relayNum,1);
						if (P.nodeName == 'A') {
							P.href = '/t/' + data.info.id;
						}
					}
					MI.talkList.addEvent(newTalk);
					UI.addClass(newTalk,'newMsg'); //Add Delete CSS
					//UI.C(newTalk,'opacity',0);
					UI.prepend(newTalk,MI.talkList._body);
					MI.talkList.card();
					MI.talkList._news.push(newTalk);
					var height = UI.height(newTalk),scrollY = UI.scrollY(),scroll;
					UI.C(newTalk,'height',0);
					/*
						ż�����ж�������domԪ�ظ��������ݶ����йأ�Խ������ʽ��Ⱦ����ʱ��Խ�࣬����Խ���ԡ�
						IE������һ���ӳ�Ч��Ҫ�úܶ࣬�������������Ҫ��Ч�����������
						��Ҳ��ӳ������������ܣ�chrome�������κζ�����
					*/
					/*if (scrollY > UI.getY(MI.talkList._body)) { //Auto Scroll Page With NewTalk Height
						scroll = function(){
							UI.scrollTo(document.documentElement,0,scrollY + height);
							//document.documentElement.scrollTop = UI.scrollY() + height;
						}
						if (UI.B.ie) {
							setTimeout(scroll,0);
						}
						else scroll();
					}*/
					setTimeout(function(){
						UI.animate(newTalk,'height',height - 22,function(){
							UI.C(newTalk,'height','');
							MI.talkList.bottom();
							MI.Crs(1);
						},0.3);
					},0);
				}

				//Save Draft
				var draft = 'draft_' + MI.user.account;
				if (Self.autoSave && MI.isS) {
					MI.S(draft,'');
				}

				//Count Talk Number
				if (data.result == 0) {
					if (Self.type != 4) {
						Self.countNum(1);
					}

					if (MI['talkList']) {
						MI.talkList.updateTime(data.info.timestamp);
					}

					Self.txtCache = content;
				}
			}
		});
		Self.delay.timeout = setTimeout(function(){ //Tips For Time Out
			Self.showTip(Self.txtTip.fail,1)
		},30000);//������15s����Ϊ�˰�ȫ��������������ӳ١������Ŷӵ����أ���ʱ������һ��
		return;
	},
	countNum : function(value){ //Count Talk Num
		if (value > 0 && !this.addNum) {
			return;
		}
		if (this._num.length) {
			for (var i = 0,num = this._num.length;i < num;i++) {
				MI.countNum(this._num[i],value);
			}
		}
	},
	addTopic : function(){
		this._txt.focus();

		//Add Topic
		if (!this._txt.value.hasString(this.txtTopic)) {
			MI.insertTxt(this._txt,this.txtTopic,MI.cursorX(this._txt));
			//this._txt.value = txt = txt + this.txtTopic;
		}
		var txt = this._txt.value,
			indexOf = txt.replace(/\r/g,'').indexOf(this.txtTopic),len;
		if (indexOf == -1) {
			indexOf = 0
		}
		len = this.txtTopic.length;
		MI.selectTxt(this._txt,indexOf + 1,indexOf + len - 1,indexOf);
		this._txt.scrollTop = 999; //Textarea Scroll To End

		this.countTxt();
	},
	addPic : function(o){
		UI.hide(this._picLoading);
		UI.show(this._picIco);
		if (o.result == 0) {
			UI.removeClass(this._pic,'hover');
			this.pic = o.info.image;
			var fileName = this._picBtn.value,
				fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length);
			fileName = fileName.match(/[^\/|\\]*$/)[0].replace(fileType,'');
			fileName = (fileName.length > 8 ? fileName.slice(0,8) + '...' : fileName) + fileType;
			this._picLink.innerHTML = '<a href="#" class="fileName" onclick="return false">' + fileName + '<img src="' + o.info.image + '/160" /></a>';
			UI.show(this._picPreview);
			if (this._txt.value == '') {
				this._txt.value = this.txtPic;
				this.countTxt();
				this._txt.select();
			}
		}
		else {
			UI.show(this._picTxt);
			UI.show(this._picForm);
			alert(o.msg);
		}
		this._picForm.reset();
	},
	delPic : function(){
		if (this._pic) {
			this.pic = '';
			UI.hide(this._picPreview);
			UI.show(this._picIco);
			UI.show(this._picTxt);
			UI.show(this._picForm);
			if (this._txt.value == this.txtPic) {
				this._txt.value = '';
			}
		}
	},
	cancelPic : function(){
		if (this._pic) {
			this.pic = '';
			UI.hide(this._picLoading);
			UI.show(this._picIco);
			UI.show(this._picForm);
			UI.show(this._picTxt);
			this._iframe.src = 'about:blank';
			this._picForm.reset();
		}
	},
	$ : function(className){
		return $$(this._body,className)[0];
	}
}
MI.TalkList = function(id){ //Talk List
	var Self = this,_more = $('moreList');
	Self._body = $(id);
	Self._more = Self._bottom = _more ? $$(_more,'a')[0] : UI.DC('a');
	Self._new = $('talkNew'); //New Talk Button
	Self._list = UI.children(Self._body);
	var html = new UI.tmplString(MI.tmpl.reply)({});
	Self._talk = Self._relay = UI.html(html)[0]; //Talk Box
	//Self._relay = UI.html(html.replace(/<\/textarea>/g,'').replace(/textarea/g,'input'))[0];
	Self._relay = UI.html(html)[0];

	//Delete Confirm
	Self._confirm = UI.html('<div class="delChose"><span></span><br><input value="ȷ��" type="button">&nbsp;&nbsp;<input value="ȡ��" type="button"></div>')[0];
	Self._confirmTip = $$(Self._confirm,'span')[0];
	var button = $$(Self._confirm,'input');
	button[0].onclick = function(){
		MI.talkList.remove(this.parentNode.tid,this.parentNode.type)
	}
	button[1].onclick = function(){
		UI.removeClass(this.parentNode.parentNode.parentNode,'hover');
		UI.remove(Self._confirm);
	}

	Self.replyBox = new MI.TalkBox(Self._talk);
	Self.relayBox = new MI.TalkBox(Self._relay);

	//Count TalkBox's Type For Product
	//Self.replyBox.countType = 3;
	//Self.relayBox.countType = 4;

	Self.replyBox.autoHeight = 136;
	Self.relayBox.autoHeight = 30;
	Self.replyBox.txtTipSend = '������';
	Self.relayBox.txtTipSend = 'ת����';
	Self.replyBox.hideCall = Self.relayBox.hideCall = function(){
		UI.removeClass($(Self.current),'cur');
	};
	Self.replyBox.success = Self.relayBox.success = function(){
		Self.talkBox.hide();
		Self.talkBox.display = 0;
		UI.removeClass($(Self.current),'hover');
		if (Self._relayNum) {
			MI.countNum(Self._relayNum,1);
			Self._relayNum = null;
		}
	};
	UI.EA(Self.replyBox._close,'click',function(){
		Self.replyHide();
	});
	UI.EA(Self.relayBox._close,'click',function(){
		Self.replyHide();
	});

	//Cache Last
	Self.cacheLast();
	//Cache First
	Self.cacheFirst();

	//Event
	if (Self._more) {
		Self._more.onclick = function(e){
			Self.more();
			UI.E(e).prevent();
		}
		Self._more.onfocus = MI.blur;
	}
	if (Self._new) {
		Self._new.onclick = function(){
			Self.newly();
			MI.Bos('btnkNew');
			return false;
		}
		var hideNewDelay;
		UI.EA(window,'scroll',function(){
			clearTimeout(hideNewDelay);
			hideNewDelay = setTimeout(hideNew,50);
		});
		function hideNew(){
			var y = UI.scrollY() + UI.windowHeight();
			UI.each(Self._news,function(o){
				if (UI.hasClass(o,'newMsg') && UI.getY(o) + UI.height(o) + 70 < y) {
					UI.removeClass(o,'newMsg');
				}
			});
		}
	}
	UI.ready(function(){
		setTimeout(function(){ //ҳ����Ⱦ����ִ��
			Self.bottom();
			for (var i = 0,num = Self._list.length;i < num;i++) {
				Self.addEvent(Self._list[i]);
			}
			if (MI.user.account) {
				Self.card();
			}
		},0);
	});
}
MI.TalkList.prototype = {
	cur : null, //Current List
	_tip : null, //List Tip
	_news : [], //New Talks
	moreTimes : 0, //More Times
	removeUrl : '/delete.php',
	favorUrl : '/asyn/favoritemsg.php',
	removeTip : 'ȷ��ɾ�������㲥��',
	removeCall : 0, //Call Function After Remove
	unfavTip : 'ȷ��ɾ�������ղأ�',
	last : {}, //Cache Last List's Info
	first : { //Cache First List's Info
		time : 1
	},
	add : [], //Cache Added List
	time : [],
	card : function(){
		var Self = this;
		UI.each($$(Self._body,'.userPic img'),function(o){
			if (!UI.A(o,'card')) {
				UI.A(o,'card','1');
				var P = o.parentNode;
				UI.A(P,'rel',P.title);
				P.title = '';
				UI.EA(o,'mouseover',MI.Card.show);
				UI.EA(o,'mouseout',MI.Card.hide);
				UI.EA(o,'click',Self.bosHead);
			}
		});
	},
	bosHead : function(){
		MI.Bos('btnHead');
	},
	remove : function(id,type){
		id = String(id);
		var Self = this,
			talk = $(id),
			url = Self.removeUrl,
			data = {id:id,r:MI.random()},
			favBtn;
		if (type) {
			url = Self.favorUrl;
			data.op = type < 2 ? 1 : 2;
		}
		if (Self.mId) { //For Delete Comment
			data.mId = Self.mId;
		}
		if (!talk.sending) {
			//UI.get(url,data,function(data){
			UI.ajax({
				url : url,
				data : data,
				success : function(data){
					talk.sending = 0;
					data = MI.json(data);
					if (data.result == 0) {
						favBtn = $$(talk,'.fav')[0];
						if (type == 1) {
							UI.addClass(favBtn,'light');
							favBtn.title = "ȡ���ղ�";
							favBtn.type = 3;
							favBtn.blur();
						}
						else {
							UI.remove(Self._confirm);
							if (MI.talkBox && !type) {
								MI.talkBox.countNum(-1);
							}
							if (type == 3) {
								UI.removeClass(favBtn,'light');
								favBtn.title = "�ղ�";
								favBtn.type = 1;
								favBtn.blur();
							}
							else {
								UI.addClass(talk,'delMsg'); //Add Delete CSS
								setTimeout(function(){
									UI.animate(talk,'opacity',0,function(){
										UI.remove(talk);
										if (Self.tip && !UI.children(Self._body).length) { //��ʾ��ʾ����������
											//UI.append(Self.tip,Self._body);
										}
										//Check More's Position
										Self.bottom();
									});
								},300);
							}
						}
						if (Self.removeCall) {
							Self.removeCall();
						}
					}
					else if (data.msg){
						//alert(data.msg);
					}
				}
			});

			talk.sending = 1;
		}
	},
	fav : function(id,type){
		this.remove(id,type);
	},
	confirm : function(id,type){
		id = String(id);
		var Self = this,
			talk = $(id),
			msg = $$(talk,'.msgBox')[0],
			tip = type ? Self.unfavTip : Self.removeTip;
		UI.append(Self._confirm,msg);
		$$(Self._confirm,'input')[0].focus();
		Self._confirm.tid = talk.id;
		Self._confirm.type = type;
		Self._confirmTip.innerHTML = tip;

		if (Self.talkBox && Self.talkBox.display && Self.current == talk.id) { //Hide TalkBox When Click Delete Button
			UI.remove(Self.talkBox._body);
			UI.removeClass(talk,'cur');
			Self.talkBox.display = 0;
		}
	},
	reply : function(id,type){ //type : undefined(reply) 1(relay) 2(comt)
		var Self = this;
		if (MI.card) {
			UI.remove(MI.card._body);
		}
		if (this.talkBox) {
			this.talkBox.hide();
		}
		if (this.talkBox && this.current && this.current != id && this.talkBox.display) {
			this.talkBox.display = 0;
		}
		this.talkBox = type ? this.relayBox : this.replyBox;
		this._talk = this.talkBox._body;
		UI.C(this.talkBox._txt,'height','');
		UI.removeClass(this.talkBox._btn,'disabled');
		UI.removeClass(this._talk,'pubSuc');
		if (!this.talkBox.display) {
			var li = $(id),
				cur = this.current,
				name = $$(li,'.userName strong a')[0].innerHTML,
				name2,
				account,
				vip = $$(li,'.userName .vip').length,
				url = $$(li,'.userName a')[0].href,
				cont = $$(li,'.msgCnt')[0],
				contClone = cont.cloneNode(1),
				content,
				contentBase,
				contentTmp,
				contentTopic,
				contentTopicLength,
				replyBox = $$(li,'.replyBox')[0],
				relay = $$(li,'.replyBox .msgCnt')[0],/*relayUser,*/
				userPic = $$(li,'.userPic')[0],
				addReplyTxt,
				talkBoxTxt = Self.talkBox._txt;

			//<a hre="" rel="@account">nick</a> : Replace "nick" Use "@account"
			if (type) { //Don't Change For Reply
				UI.each($$(contClone,'em'),function(o){
					var account = UI.A(o,'rel');
					if (account) {
						o.innerHTML = account;
					}
				});
			}
			content = contentBase = UI.text(contClone);

			if (relay) {
				contentTmp = UI.text(relay).split(':');
				if (type == 1) {
					name2 = name;
					name = contentTmp[0];
				}
				contentTmp = contentTmp.slice(1).join('');
				if (type == 1) {
					content = contentTmp;
				}
			}
			/*if (!replyBox) {
				content = name + ':&nbsp;"' + content;
			}*/
			if (cur) {
				UI.removeClass($(cur),'cur');
			}
			UI.addClass(li,'cur');

			this._relayNum = type ? $$(li,'.relayNum')[0] : null;

			this.talkBox._body.className = type ? 'zfWrap' : 'talkWrap';
			var replyTitle = 'ת�� <b>' + name + '</b>: "' + MI.string.html(content.slice(0,20)),relayTitle = '�� <b>' + name + '</b> ˵:';
			if (content.length > 20) {
				replyTitle += '...';
			}
			replyTitle += '"<br>��˵����:';
			$$(this._talk,'.replyTitle')[0].innerHTML = type ? replyTitle : relayTitle;
			account = url.split('/');
			account = account[account.length - 1];
			if (replyBox && name2) { //����ת������
				this.talkBox._addReply.innerHTML = '<a href="#" title="�����ͨ����ɾ�����á���ȥ��ǰ���˵�ת������">��ɾ��֮ǰ�ĵ�����</a>';
				addReplyTxt = this.talkBox._addReply.txt = ' || @' + account + ': ' + UI.trim(contentBase);
				UI.show(this.talkBox._addReply);
				talkBoxTxt.onkeyup = function(){
					if (!talkBoxTxt.value.hasString(addReplyTxt)) {
						UI.hide(Self.talkBox._addReply);
						talkBoxTxt.onkeyup = null;
					}
				}
			}
			else {
				UI.hide(this.talkBox._addReply);
				talkBoxTxt.onkeyup = null;
			}
			//Bug After Gzip
			//$$(this._talk,'.replyTitle')[0].innerHTML = type ? 'ת�� "' + MI.string.escape(content.slice(0,30)) + (content.length > 30 ? '...' : '') + '"<br/>��˵����:' : '�ظ� ' + name + ':';

			//Set TalkBox Prototype
			this.talkBox.talkId = id;
			this.talkBox.type = type ? 1 : 2;
			/*if (relay) {
				relayUser = $$(li,'.replyBox strong')[0].innerHTML;
			}
			else {
				relayUser = $$(li,'.userName strong')[0].innerHTML;
				if (!relayUser.match(/:$/g)) {
					relayUser += ':';
				}
			}*/
			this.talkBox.action = type ? 'ת��&nbsp;:&nbsp;' : '��<strong class="userTo"><a href="' + url + '" title="' + name + '(@' + account + ')">' + name + '</a>' + (vip ? '<a href="/certification" target="_blank" class="vip" title="��Ѷ��֤"></a>': '') + '˵:</strong>';
			if (type && !replyBox) {
				var clone = li.cloneNode(1),msgCnt = $$(clone,'.msgCnt')[0];
				UI.remove($$(clone,'.zfWrap')[0]);
				UI.remove($$(clone,'.talkWrap')[0]);
				UI.remove($$(clone,'.funBox')[0]);
				UI.C($$(clone,'.userName')[0],'display','inline');
				UI.C(msgCnt,'display','inline');
				msgCnt.innerHTML = msgCnt.innerHTML;
			}
			this.talkBox.source = {
				type : type ? 1 : 2,
				content : type ? (replyBox ? replyBox.innerHTML : clone.innerHTML) : contentBase,
				nick : name,
				cusPic : ( userPic && userPic.innerHTML.replace(/cusPic/gi,'hide').replace(/<a/i,'<a class="cusPic"') ) || 0 //Small Pic For Reply
			};

			contentTopic = (contentTmp || content).match(/(#\s*[^#\s]{1}[^#]{0,59}?\s*#)/g); //Auto Add Topic

			this.talkBox._txt.value = contentTopic && type ? contentTopic.join('') : '';
			contentTopicLength = this.talkBox._txt.value.length
			this.talkBox.countTxt();
			UI.append(this._talk,$$(li,'.msgBox')[0]);
			setTimeout(function(){
				talkBoxTxt.focus();
				if (addReplyTxt) { //�Զ�����ת������
					talkBoxTxt.value += addReplyTxt;
				}
				Self.talkBox.countTxt();
				MI.selectTxt(talkBoxTxt,contentTopicLength,contentTopicLength,contentTopicLength);
			},0);

			this.current = id;
			this.talkBox.display = 1;
		}
		else {
			this.talkBox.hide();
			this.replyHide();
		}
		if (type) {
			this.replyBox.hide();
			this.replyBox.display = 0;
		}
		else {
			this.relayBox.hide();
			this.relayBox.display = 0;
		}
		if (this.replyBox.display || this.relayBox.display) {
			UI.addClass($(this.current),'cur');
			UI.addClass($(this.current),'hover');
		}
	},
	replyHide : function(){
		UI.removeClass($(this.current),'cur');
		UI.removeClass($(this.current),'hover');
		this.talkBox.display = 0;
	},
	relay : function(id){
		this.reply(id,1);
	},
	report : function(id){
		var name = UI.A($$($(id),'.userName')[0],'rel');
		jubao_msg(id,name);
	},
	addEvent : function(el){
		var Self = this,
			time = $$(el,'.time'),
			view = $$(el,'.view')[0],
			fav = $$(el,'.fav')[0],
			unfav = $$(el,'.light.fav')[0],
			report = $$(el,'.alarm')[0],
			viewContent = $$(el,'.talkDetail')[0],
			content = $$(el,'.msgCnt')[0],
			comt = $$(el,'.comt')[0],
			reply = $$(el,'.reply')[0],
			relay = $$(el,'.relay')[0],
			del = $$(el,'.delBtn')[0],
			moreFun = $$(el,'.moreFun')[0],
			replyMsg = $$(el,'.replyMsg')[0];
			picBox = $$(el,'.picBox');
		MI.addHover(el);
		if (comt) {
			UI.A(comt,'target','_blank');
			if (comt.href.hasString('#')) {
				comt.href = '/p/c/' + el.id;
			}
			comt.onclick = function(){
				MI.Bos('btnComt');
			}
		}
		if (reply) {
			reply.onclick = function(){
				Self.reply(el.id);
				MI.Bos('btnReply');
				return false;
			}
		}
		if (relay) {
			relay.onclick = function(){
				Self.relay(el.id);
				MI.Bos('btnRelay');
				return false;
			}
		}
		if (view) {
			view.onmouseover = function(){
				UI.C(viewContent,'display','block');
				MI.Bos('btnViewReply');
			}
			view.onmouseout = function(){
				UI.hide(viewContent);
			}
			view.onclick = function(){
				return false;
			}
		}
		if (fav) {
			fav.type = 1;
			fav.title = '�ղ�';
			fav.onclick = function(){
				Self.fav(el.id,this.type);
				MI.Bos('btnFav');
				return false;
			}
		}
		if (unfav) {
			unfav.onclick = function(){
				Self.confirm(el.id,2);
				MI.Bos('btnUnFav');
				//Self.fav(el.id,2);
				return false;
			}
		}
		if (del) {
			del.onclick = function(){
				Self.confirm(el.id);
				MI.Bos('btnDel');
				return false;
			}
		}
		if (content && content.innerHTML == '') {
			//UI.hide(content);
			content.innerHTML = '&nbsp;';
		}
		if (report) {
			report.onclick = function(){
				Self.report(el.id);
				MI.Bos('btnReport');
				return false;
			}
		}
		/*if (moreFun) { //More Function
			moreFun.tid = 'moreFun' + el.id; //Tmp Id
			moreFun.onclick = function(e){
				UI.E(e).stop();
				for (var i in MI.drop) { //Hide Other Drop Menu
					if (i != this.tid) {
						UI.addClass(MI.drop[i],'off');
						delete MI.drop[i];
					}
				}
				UI.toggleClass(this,'off');
				if (!UI.hasClass(this,'off') && !MI.drop[this.tid]) {
					MI.drop[this.tid] = this;
				}
				return false;
			}
		}*/
		if (replyMsg) {
			replyMsg.onclick = function(){
				MI.talkBox._msgTo.value = UI.A(this,'rel');
				UI.removeClass(MI.talkBox._btn,'disabled');
				MI.talkBox._txt.value = '';
				MI.talkBox.countTxt();
				if (MI.dialog) {
					MI.dialog.show({width:560,html:$('talkBoxMsg')});
					//MI.talkBox._msgTo.focus();
					//UI.hide(MI.talkBox._msgTo.previousSibling);
					try{setTimeout('MI.talkBox._txt.focus()',0);}catch(e){};
				}
				MI.Bos('btnReplyMsg');
				return false;
			}
		}
		if (picBox) {
			MI.TalkList.picEvent(picBox);
		}

		//Add Time Title
		for (var i = 0,num = time.length;i < num;i++) {
			if (!UI.A(time[i],'rel')) {
				UI.A(time[i],'rel',UI.A(el,'rel'));
			}
			var timeObj = new Date();
			timeObj.setTime(UI.A(time[i],'rel') + '000');
			time[i].title = UI.formatDate(timeObj,'yyyy��M��d�� hh:mm');
			Self.time.push(time[i]);
			time[i].onclick = timeBos;
		}
		function timeBos(){
			if (this.nodeName == 'A') {
				MI.Bos('btnTime');
			}
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
					info = '�ո�';
				}
				else if (minute < 60) {
					info = minute + '����ǰ';
				}
				/*else if (minute > 59 && hour < 6) {
					info = hour + 'Сʱ' + minute % 60 + '����ǰ';
				}*/
				//else if (hour > 5 && day == 0) {
				else if (minute > 59 && day == 0) {
					info = (Now.getDate() == PubTime.getDate() ? '����' : '����') + ' ' + clock;
				}
				else if (day == 1 && Now.getDate() - PubTime.getDate() < 2) {
					info = '���� ' + clock;
				}
				else if (Now.getFullYear() == PubTime.getFullYear()) {
					info = o.title.split('��')[1];
				}
				else {
					info = o.title;
				}
				if (info) {
					o.innerHTML = info;
				}
			});
		}
	},
	more : function(auto){
		var Self = this,
			children = UI.children(Self._body),
			last = children[children.length - 1],
			url = 'r=' + MI.random() + '&time=' + (Self.last.fav ? Self.last.fav : Self.last.time) + '&id=' + Self.last.id + (Self.guest ? '&u=' + Self.guest : ''),
			rel = UI.A(Self._more,'rel');
		/*
			/home.php?time=
			/at.php?time=
			/index.php?time=

			/index.php?time=&u=

			{
				result : 0,
				msg : '',
				info : {
					hasNext : 1,
					talk : [
						{
							id : '123456',
							type : 1,
							vip : 1,
							name : 'xhlv',
							nick : 'xhlv',
							pic : 'http://mat1.gtimg.com/www/mb/images/img2.jpg',
							image : [],
							count : null,
							time : '5����ǰ',
							from : 'web',
							timestamp : '1232542321',
							content : '����',
							source : {
								...
							}
						}
					]
				}
			}
		*/
		if (!Self._more.sending) {
			UI.addClass(Self._more,'loading');
			if (rel) {
				UI.get(rel,url,function(json){
					Self.addMore(json);
				});
				MI.Bos(auto ? 'btnMoreAuto' : 'btnMore');
			}
		}
		Self._more.sending = 1;
	},
	newly : function(){
		var Self = this,_new = Self._new;
		if (!_new.sending) {
			if (_new.num > 15) {
				document.location.reload();
			}
			else {
				UI.addClass(_new,'loading');
				UI.get('/asyn/home.php',{time:Self.first.time,p:2,type:1,r:MI.random()},function(json){
					Self.addNewly(json);
				});
			}
		}
		_new.sending = 1;
	},
	addNewly : function(json){
		var Self = this,
			_new = Self._new,
			ajax = UI.isString(json);
		data = ajax ? MI.json(json) : json;
		if (data.result == 0) {
			data.info.guest = Self.guest;
			data.info.fav = 0;
			data.info.iconPic = Self.iconPic;

			if (!Self.guest && data.info.user != MI.user.account) { //Kill Change Account Bug
				document.location.reload();
				return;
			}

			UI.each(Self.add,function(o){ //Remove Added List
				if ($(o)) {
					UI.remove($(o));
				}
			});

			var list,cache = document.createDocumentFragment(),o = UI.html(new UI.tmplString(MI.tmpl.listAll)(data.info).replace(/<li id="/gi,ajax ? '<li class="newMsg" id="' : '<li id="')),length = data.info.talk.length;
			if (length) {
				if (Self._newLine) {
					UI.removeClass(Self._newLine,'pageLine');
				}
				for (var i = 0,num = o.length;i < num;i++) {
					Self.addEvent(o[i]);
					UI.append(o[i],cache);
					if (i == num - 1) {
						Self._newLine = o[i]; //New Line Dom
						UI.addClass(o[i],'pageLine');
					}
				}
				if (length > 50) {
					Self._body.innerHTML = '';
				}
				Self._news = $$(cache,'.newMsg');
				list = $$(Self._body,'.newMsg');
				for (var i = 0,num = list.length;i < num;i++) {
					UI.removeClass(list[i],'newMsg');
				}

				UI.prepend(cache,Self._body);
				Self.card();


				UI.each(Self.add,function(o){ //Remove Added List's NewMsg ClassName
					if ($(o)) {
						UI.removeClass($(o),'newMsg');
					}
				});
				Self.cacheFirst();
				Self.add = [];

				if (Self._tip) { //Hide Talk List's Tip
					UI.hide(Self._tip);
				}
				Self.updateTime(data.info.time);

				MI.PV('new');
				MI.Crs(1);

				//For Ajax Back Forward
				if (ajax) {
					MI.ajax++;
					MI.talkNew.push(json);
				}
			}
		}
		UI.hide(_new);
		if (document.titleTmp) {
			document.title = document.titleTmp;
		}
		Self.bottom();
		UI.removeClass(_new,'loading');
		_new.sending = 0;
	},
	addMore : function(json){
		var Self = this,
			_new = Self._new,
			ajax = UI.isString(json),
			children = UI.children(Self._body),
			last = children[children.length - 1];
		data = ajax ? MI.json(json) : json;
		//data = {result : 0,msg : '',info : { hasNext : 1,talk : [{id : '123456',time : '5����ǰ',content : '����'},{id : '1234567',time : '5����ǰ',content : '����'}] }};
		//data = {result:0,msg:'�ɹ�','info':{'hasNext':1,'talk':[]}};
		if (data.result == 0) {
			if (!Self.guest && data.info.user != MI.user.account) { //Kill Change Account Bug
				document.location.reload();
				return;
			}

			data.info.guest = Self.guest;
			data.info.fav = Self.last.fav ? 1 : 0; //Fav List Tmpl
			data.info.iconPic = Self.iconPic;

			var cache = document.createDocumentFragment(),o = UI.html(new UI.tmplString(MI.tmpl.listAll)(data.info));
			if (data.info.talk.length) {
				for (var i = 0,num = o.length;i < num;i++) {
					UI.append(o[i],cache);
				}
				setTimeout(function(){ //��Ⱦ���������¼����ȽϺ�ʱ��
					for (var i = 0,num = o.length;i < num;i++) {
						Self.addEvent(o[i]);
					}
					Self.card();
				},0);
				UI.append(cache,Self._body);
				UI.C(Self._body,'marginBottom','');

				MI.PV('more');
				MI.Crs(1);

				//For Ajax Back Forward
				if (ajax) {
					MI.ajax++;
					MI.talkMore.push(json);
				}
			}

			//More
			if (data.info.hasNext == 0 || !data.info.talk.length) {
				UI.addClass(Self._more.parentNode,'hide');
				Self.more = function(){};
			}
			else {
				if (last) {
					UI.addClass(last,'pageLine');
				}
				Self.cacheLast();
			}

			Self.updateTime(data.info.time);
			Self.moreTimes++;
		}
		else if (data.msg){
			//alert(data.msg); //��ģ��alert
		}
		UI.removeClass(Self._more,'loading');
		Self._more.sending = 0;
	}
}
MI.TalkList.pic = function(){ //Picture Event
	var pic = $$(this,'img')[0],
		picBig,
		picBigUrl = pic.parentNode.href,
		P;
	pic.load = 0;
	if (!pic.loaded) {
		if (pic.loading) {
			return false;
		}
		pic.loading = 1;
		var _loading = UI.html('<em class="ico_load"></em>')[0];
		P = this;
		_loading.style.cssText = 'width:' + UI.width(P) + 'px;height:' + UI.height(P) + 'px;';
		UI.prepend(_loading,P);

		picBig = UI.DC('img');
		picBig.className = 'large';
		picBig.r = 0;
		UI.after(picBig,pic);
		picBig.onload = function(){
			if (UI.B.ie && !this.fileSize) { //Kill IE's Bug While Load Fail,Dont's Show Error Pic
				return;
			}
			setTimeout(function(){
				MI.TalkList.picSize(picBig);
			},0);
			pic.loading = 0;
			pic.loaded = 1;
			pic.parentNode.blur();
			UI.remove(_loading);
			UI.toggleClass(pic.parentNode.parentNode,'big');
			this.onload = null;
		}
		picBig.src = picBigUrl;
	}
	else {
		/*UI.A(pic,'width','');
		UI.A(pic,'height','');
		pic.sUrl = pic.sUrl || pic.src;
		if (pic.src == pic.sUrl) {
			pic.src = picBigUrl;
		}
		else {
			pic.src = pic.sUrl;
		}*/
		pic.parentNode.blur();
		picBig = pic.nextSibling;
		if (picBig.style.display == 'none') {
			UI.toggle(picBig.nextSibling);
		}
		UI.toggleClass(this.parentNode,'big');
	}
	MI.Bos(UI.hasClass(this.parentNode,'big') ? 'btnPicSmall' : 'btnPicBig');
	return false;
}
MI.TalkList.picEvent = function(picBox){
	for (var i = 0,num = picBox.length;i < num;i++) {
		var picBoxCur = picBox[i],pic = $$(picBoxCur,'img')[0],
			link = pic.parentNode,
			hasPic = $$(picBoxCur,'.tools');
		if (!hasPic.length) {
			UI.before(UI.html(MI.tmpl.picTool.replace('$Url',link.href.replace(/\/460$/g,'')))[0],link); //Add Tools
		}
		else {
			UI.each(hasPic,function(o){
				var P = o.parentNode,img = $$(P,'img')[0];
				UI.removeClass(P,'big');
				img.src = img.src.replace(/460$/g,'160');
			});
		}
		link.onclick = MI.TalkList.pic;
		link.onfocus = MI.blur;
		if (!UI.B.ie) {
			var canvas = document.createElement('canvas');
			canvas.id = MI.random() * Math.random() + 'C';
			MI.canvas[canvas.id] = canvas.getContext('2d');
			if (hasPic) {
				UI.remove($$(picBoxCur,'canvas')[0]);
				UI.remove($$(picBoxCur,'.large')[0]);
			}
			link.appendChild(canvas);
			UI.A(canvas,'width',pic.width);
			UI.A(canvas,'height',pic.height);
			/*try{
				MI.canvas[canvas.id].drawImage(pic,0,0);
				UI.hide(pic);
			}catch(e){ //If Pic Load Fail
				UI.hide(canvas);
			}*/
			//canvas.onclick = MI.TalkList.pic;
		}
		//pic.onclick = MI.TalkList.pic;
		//pic.sUrl = pic.src;
		pic.r = 0;
		pic.onload = MI.TalkList.picLoad;
		$$(picBoxCur,'.btnBack')[0].onclick = $$(picBoxCur,'.btnPrev')[0].onclick = MI.TalkList.picTool;
	}
}
MI.TalkList.picLoad = function(){
	if (this.load) {
		return;
	}
	this.load = 1; //Image's Loaded Status,To Kill GIF's Load Bug In IE
	//this.style.display = this.whirl ? 'none' : 'inline';
	if (!UI.B.ie && this.whirl) {
		MI.TalkList.picDraw(this,this.nextSibling);
	}
	if (this.loaded) { //Show Tools After Loading
		UI.toggleClass(this.parentNode.parentNode,'big');
	}
}
MI.TalkList.picTool = function(){
	var P = this.parentNode.parentNode,clockWise = UI.hasClass(this,'btnPrev'),
		pic = $$(P,'img')[1];
	if (!UI.B.ie) { //Don't Use Canvas For Gif
		pic.whirl = 1;
	}

	if (clockWise) {
		pic.r++;
	}
	else {
		pic.r--;
	}
	if (pic.r > 3) {
		pic.r = 0;
	}
	else if (pic.r < 0) {
		pic.r = 4 + pic.r;
	}
	if (pic.r % 2 != 0) {
		if (pic.h > 460) {
			pic.width = 460 / pic.h * pic.w;
			pic.height = 460;
		}
	}
	else {
		pic.height = pic.h;
		pic.width = pic.w;
	}
	if (UI.B.ie) {
		pic.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(Rotation=' + pic.r + ')';
	}
	else {
		MI.TalkList.picDraw(pic,pic.nextSibling);
	}
	this.blur();
	MI.Bos('btnPicWhirl');
	return false;
}
MI.TalkList.picDraw = function(pic,canvas){
	var ctx = MI.canvas[canvas.id];
	//UI.hide(pic);
	pic.style.cssText = 'display:none!important';
	canvas.style.display = 'inline';
	canvas.t = pic.width; //Kill Chorme Bug
	switch (pic.r){
		case 0:
			UI.A(canvas,'width',pic.width);
			UI.A(canvas,'height',pic.height);
			ctx.drawImage(pic,0,0);
			break;
		case 1:
			UI.A(canvas,'width',pic.height);
			UI.A(canvas,'height',pic.width);
			ctx.rotate(90 * Math.PI / 180);
			ctx.drawImage(pic,0,-pic.height,pic.width,pic.height);
			break;
		case 2:
			UI.A(canvas,'width',pic.width);
			UI.A(canvas,'height',pic.height);
			ctx.rotate(180 * Math.PI / 180);
			ctx.drawImage(pic,-pic.width,-pic.height);
			break;
		case 3:
			UI.A(canvas,'width',pic.height);
			UI.A(canvas,'height',pic.width);
			ctx.rotate(270 * Math.PI / 180);
			ctx.drawImage(pic,-pic.width,0,pic.width,pic.height);
			break;
	}
}
MI.TalkList.picSize = function(pic){
	pic.w = pic.width;
	pic.h = pic.height;
	/*if (pic.r % 2 != 0) {
		if (pic.h > 460) {
			pic.width = 460 / pic.h * pic.w;
			pic.height = 460;
		}
	}*/
}
MI.MsgBox = function(id){ //MsgBox
	var Self = new MI.TalkBox(id);
	Self.txtTipSend = '������';
	Self._msgTo = Self.$('.msgTo');
	Self._num = $$('.msgNum');
	Self.type = 3;
	Self.url = '/messages/send.php';

	if (!UI.B.ie6 || !UI.hasClass(Self._txt,'noAutoCmt')) {
		new MI.AutoCmt({
			target : Self._msgTo,
			call : function(){
				Self.countTxt();
			}
		});
	}

	//Event
	UI.EA(Self._msgTo,'keyup',count); //IE��FF�е�ִ��˳���в��죬�Ƚ�����...
	UI.EA(Self._msgTo,'keydown',count);
	UI.EA(Self._msgTo,'blur',count);
	function count(){
		Self.countTxt();
	}
	return Self;
}
MI.MsgList = function(id){ //MsgList
	var Self = new MI.TalkList(id);
	Self.removeTip = 'ȷ��ɾ������˽�ţ�';
	//Self.removeUrl = '/del.php';
	return Self;
}
MI.Talk = function(id){ //Talk
	var Self = this,html = new UI.tmplString(MI.tmpl.reply)({});
	Self.id = id;
	Self._body = $(id);
	Self._talk = UI.html(html)[0]; //Talk Box
	Self._relay = UI.html(html.replace(/<\/textarea>/g,'').replace(/textarea/g,'input'))[0];
	Self._relayNum = $('relay' + id);
	Self.replyBox = new MI.TalkBox(Self._talk);
	Self.relayBox = new MI.TalkBox(Self._relay);
	Self.replyBox.success = function(){
		MI.dialog.hide();
	};
	Self.relayBox.success = function(){
		MI.dialog.hide();
		if (Self._relayNum) {
			MI.countNum(Self._relayNum,1);
		}
	};
	Self.replyBox.talkId = this.relayBox.talkId = id;

	Self.reply = function(type){
		Self.talkBox = type ? Self.relayBox : Self.replyBox;
		UI.removeClass(Self.talkBox._body,'pubSuc');
		var replyTitle = 'ת�� <b>' + UI.trim(Self.name) + '</b>: "' + MI.string.html(Self.content.slice(0,25)),relayTitle = '�� <b>' + Self.name + '</b> ˵:';
		if (Self.content.length > 25) {
			replyTitle += '...';
		}
		replyTitle += '"<br/>��˵����:';
		$$(Self.talkBox._body,'.replyTitle')[0].innerHTML = type ? replyTitle : relayTitle;
		Self.talkBox._body.className = type ? 'zfWrap' : 'talkWrap';
		Self.talkBox.type = type ? 1 : 2;
		Self.talkBox._txt.value = '';
		Self.talkBox.countTxt();
		MI.dialog.show({width:500,html:Self.talkBox._body});
		setTimeout(function(){
			Self.talkBox._txt.focus();
		},0);
	}

	//Talk Info
	var userLink = $$(Self._body,'a')[1];
	Self.name = UI.text(userLink);
	Self.account = UI.A(userLink,'rel');
	Self.content = UI.text($$(Self._body,'.msgCnt')[0]);

	var report = $$(Self._body,'.alarm')[0],
		reply = $$(Self._body,'.reply')[0],
		relays = $$(Self._body,'.relay'),
		relay = relays[0],
		relay2 = relays[1],
		fav = $$(Self._body,'.fav')[0],
		picBox = $$(Self._body,'.picBox');
	//Event
	if (reply) {
		reply.onclick = function(){
			Self.reply();
			return false;
		}
	}
	if (relay) {
		relay.onclick = function(){
			Self.reply(1);
			return false;
		}
	}
	if (relay2) {
		relay2.onclick = function(){
			Self.reply(1);
			return false;
		}
	}
	if (report) {
		report.onclick = function(){
			jubao_msg(Self.id,Self.account);
			return false;
		}
	}
	if (fav) {
		fav.type = 1;
		fav.onclick = function(){
			Self.fav(Self._body.id,this.type);
			MI.Bos('btnFav');
			return false;
		}
	}
	if (picBox) {
		MI.TalkList.picEvent(picBox);
	}
}
MI.Talk.prototype = MI.TalkList.prototype;
MI.Card = function(){ //Info Card
	var Self = this,
		_body = Self._body,
		follow = 'addAttention',
		unfollow = 'delAttention',
		replyBox,msgBox,txtMax;
	Self._pic = $$(_body,'.userPic a')[0];
	Self._name = $$(_body,'.userName')[0];
	Self._num = $$(_body,'.nums')[0];
	Self._reply = $$(_body,'.reply')[0];
	Self._msg = $$(_body,'.msg')[0];
	Self._follow = $$(_body,'.' + follow)[0];
	Self._unfollow = $$(_body,'.' + unfollow)[0];

	Self.reply = new MI.Reply();
	Self.msg = new MI.Msg();
	replyBox = Self.reply.talkBox;
	msgBox = Self.msg.talkBox;
	txtMax = replyBox.txtMax;

	//Event
	Self._pic.onclick = function(){
		MI.Bos('btnCardHead');
	}
	Self._body.onclick = function(){
		if (UI.hasClass(this,'small')) {
			document.location.href = '/' + Self.account;
		}
	}
	Self._body.onmouseout = function(){
		Self.hide();
	}
	Self._body.onmouseover = function(){
		UI.show(Self._body);
	}
	Self._follow.onclick = function(){
		//if (!this.send) {
			MI.follow(Self.account,this,function(){
				UI.hide(Self._follow);
				UI.show(Self._unfollow);
				MI.Card.users[Self.account].follow = 1;
				Self._follow.className = follow;

				MI.Bos('btnCardFollow');
				//this.send = 0;
			});
		//}
		//this.send = 1;
		return false;
	}
	Self._unfollow.onclick = function(){
		//if (!this.send) {
			MI.follow(Self.account,this,function(){
				UI.hide(Self._unfollow);
				UI.show(Self._follow);
				MI.Card.users[Self.account].follow = 0;
				Self._unfollow.className = unfollow;

				MI.Bos('btnCardUnFollow');
				//this.send = 0;
			});
		//}
		//this.send = 1;
		return false;
	}
	Self._reply.onclick = function(){
		replyBox.talkTo = Self.name;
		replyBox.topic = '@' + Self.account + ' ';
		replyBox.txtMax = txtMax - replyBox.topic.length;
		Self.reply.show();
		MI.Bos('btnCardReply');
		return false;
	}
	Self._msg.onclick = function(){
		msgBox._msgTo.value = Self.account;
		Self.msg.show();
		MI.Bos('btnCardMsg');
		return false;
	}
}
MI.Card.prototype = {
	_body : UI.html(MI.tmpl.card)[0],
	show : function(el){
		var Self = this,
			pic = el.src,
			P = el.parentNode,
			title = UI.A(P,'rel'),
			reg = /@[^@]+$/g,
			account = title.match(reg)[0].slice(1,-1),
			name = title.replace(reg,'').slice(0,-1),
			url = '/' + account;
		if (Self.target == el) {
			return;
		}
		Self.account = account;
		Self.name = name;
		Self._pic.href = url;
		Self._pic.innerHTML = '<img src="' + pic + '">';
		UI.hide(Self._follow);
		UI.hide(Self._unfollow);
		UI.hide(Self._msg);
		UI.addClass(Self._body,'small');
		//Self.delay = setTimeout(function(){
			UI.addClass(Self._num,'loading');
		//},200);
		UI.before(Self._body,P.parentNode);
		UI.removeClass(Self._body,'isMe');
		UI.show(Self._body);
		Self.target = el;
		if (MI.Card.users[account]) {
			show(MI.Card.users[account]);
		}
		else UI.get('/asyn/userCard.php','u=' + account + '&r='+MI.random(),function(data){
			data = MI.json(data);
			/*data = {
				result : 0,
				msg : '',
				info : {
					follow : true,
					followed : true,
					vip : true,
					vv : false,
					num : [12,281,123] //[�㲥��,������,��������]
				}
			}*/
			if (data.result == 0) {
				show(data.info);
				MI.Card.users[account] = data.info;
			}
			else {
				Self.hide();
			}
		});
		function show(o){
			var num = o.num,notSelf = Self.account != MI.user.account,btn = o.follow ? Self._unfollow : Self._follow;
			Self._num.innerHTML = '�㲥' + num[0] + '��<span>' + (o.vv ? '' : '|</span>����' + num[1] + '��<span>');//|</span>������' + num[2] + '��
			Self._name.innerHTML = '<a href="' + url + '">' + name + '</a>' + (o.vip ? '<a class="vip" target="_blank" title="��Ѷ��֤" href="/certification"></a>' : '') + '<br /><span class="en">@' + account + '</span>';
			if (notSelf) {
				btn.style.display = 'block';
			}
			else {
				UI.addClass(Self._body,'isMe');
			}
			if (notSelf && o.followed) {
				Self._msg.style.display = '';
			}
			//clearTimeout(Self.deelay);
			UI.removeClass(Self._num,'loading');
			UI.removeClass(Self._body,'small');
			MI.Bos('btnCardOpen');
		}
	},
	hide : function(){
		var Self = this;
		if (UI.hasClass(Self._body,'small')) {
			return;
		}
		UI.hide(Self._body);
		Self.target = null;
	}
}
MI.Card.show = function(e){
	var el = UI.E(e).target;
	clearTimeout(MI.Card.delay);
	MI.Card.delay = setTimeout(function(){
		MI.card.show(el);
	},400);
}
MI.Card.users = {};
MI.Card.hide = function(){
	clearTimeout(MI.Card.delay);
}
MI.Reply = function(){ //Reply Dialog
	var Self = this,talkBox,talkBox;
	//Self._body.id = 'reply' + MI.random();
	UI.hide(Self._body);
	//setTimeout(function(){
		//UI.append(Self._body,document.body);
		Self.talkBox = new MI.TalkBox(Self._body);
		Self._talkTo = $$(Self._body,'.replyTitle')[0];
		Self._msg = $$(Self._body,'.msg')[0];
		
		talkBox = Self.talkBox;
		talkBox.txtTipSend = '������';
		UI.addClass(talkBox._txt,'noAutoComplete');
		talkBox.successStart=function(){
			Self._msg.innerHTML = '���ͳɹ�';
			//MI.dialogTip.show({html:'���ͳɹ�!'});
			//MI.dialog.hide();
		}
		talkBox.delayTime = 500;
		talkBox.success=function(){
			MI.dialog.hide();
			UI.removeClass(talkBox._body,'pubSuc');
		}
	//},0);
}
MI.Reply.prototype = {
	//_body : UI.html('<div class="talkWrap" id="reply' + MI.random() + '" style="display:none"><div class="SA"><em>��</em><span>��</span></div><div class="top"><span class="left"><span class="replyTitle">�� <b></b>˵:</span></span></div><div class="cont"><textarea class="inputTxt noAutoComplete" style="overflow-y: hidden; height: 38px;"></textarea></div><div class="bot" style="margin:5px 0 7px"><input type="button" class="inputBtn sendBtn"/><span class="countTxt">��������<em>140</em>��</span></div><div style="display: none;" class="talkSuc"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg" id="msg"></span></div></div>')[0],
	_body : UI.html(MI.tmpl.reply)[0],
	show : function(){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({html:Self._body,width:500});
		Self._talkTo.innerHTML = '�� <b>' + talkBox.talkTo + '</b> ˵:';
		talkBox._txt.value = '';
		setTimeout(function(){
			talkBox._txt.focus();
			talkBox.countTxt();
		},0);
	}
}
MI.Msg = function(){ //Msg Dialog
	var Self = this,talkBox;
	//Self._body.id = 'msgBox' + MI.random();
	UI.hide(Self._body);

	//UI.append(Self._body,document.body);
	Self.talkBox = new MI.MsgBox(Self._body);
	talkBox = Self.talkBox;
	talkBox.successStart=function(){
		//MI.dialogTip.show({html:'���ͳɹ�!'});
		//MI.dialog.hide();
	}

	talkBox.delayTime = 500;
	talkBox.success = function(){
		MI.dialog.hide();
	}
}
MI.Msg.prototype = {
	_body : UI.html(MI.tmpl.msgBox)[0],
	show : function(){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({width:570,html:Self._body,start:function(){
			//talkBox._msgTo.value = msgTo ? msgTo : '';
			talkBox._txt.value = '';
			UI.removeClass(talkBox._btn,'disabled');
			/*try{setTimeout(function(){
				talkBox._msgTo.focus();
				if (talkBox._msgTo.value) talkBox._txt.focus();
			},0);}catch(e){};*/
		}});
		setTimeout(function(){
			talkBox._txt.focus();
			talkBox.countTxt();
		},0);
	}
}

/*function setHeight(){
	var copyright = $('Copyright'),className = 'position';
	if (copyright) {
		if(UI.pageHeight() > UI.windowHeight()){
			UI.removeClass(copyright,className);
		}
		else{
			UI.addClass(copyright,className);
		}
	}
} 
UI.EA(window,'load',setHeight);
UI.EA(window,'resize',setHeight);
UI.ready(function(){
	setHeight();
});*/

UI.EA(window,'unload',function(){
	if (window.CollectGarbage) {
		CollectGarbage();
	}
	if (MI.talkBox && MI.talkBox.autoSave) {
		MI.talkBox.save();
	}
	for (var i in MI) {
		if (UI.isObject(MI[i]) && !UI.isElement(MI[i])) {
			for (var j in MI[i]) {
				if (UI.isObject(MI[i][j]) && !UI.isElement(MI[i][j])) {
					for (var k in MI[i][j]) {
						MI[i][j][k] = null;
					}
					MI[i][j] = null;
				}
				MI[i][j] = null;
			}
		}
		MI[i] = null;
	}
});
UI.ready(function(){
	setTimeout(function(){
		try{MI.isS = MI.S('x') != '$No$';}catch(e){};
		MI.dropTips = new MI.DropTips('searchKey');
		UI.EA(document.body,'click',function(){
			for (var i in MI.drop) {
				UI.addClass(MI.drop[i],'off');
				delete MI.drop[i];
			}
		});
		if (MI.talkBox) {
			var draft = 'draft_' + MI.user.account;
			if (MI.talkBox.autoSave && MI.isS) {
				/*UI.EA(window,'beforeunload',function(){
					var txt = MI.talkBox._txt.value;
					MI.S(draft,txt || '');
				});*/
				MI.talkBox._txt.value = MI.S(draft).replace(/^undefined|^Null/,'') || ''; //����������ʱ���ٲ�һ��
				MI.talkBox.countTxt();
			}
			if (!MI.talkBox._msgTo && location.hash != '#M') {
				var delay = setInterval(function(){
					try{
						//MI.talkBox._txt.focus();
						var length = MI.talkBox._txt.value.length;
						MI.talkBox._txt.focus();
						MI.selectTxt(MI.talkBox._txt,length,length,length);
					}catch(e){}
					if (UI.hasClass(MI.talkBox._txt,'focus')) {
						clearInterval(delay);
					}
				},200);
			}
		}

		//Auto Get More Talk List
		if (MI.talkList && MI.talkBox && MI.talkList._more) {
			var maxTimes = 2,moreDelay,getMore = function(){
				clearTimeout(moreDelay);
				setTimeout(more,200);
			};
			function more(){
				if (MI.talkList.moreTimes < maxTimes && UI.pageHeight() - UI.scrollY() - UI.windowHeight() < 60) {
					MI.talkList.more(1);
				}
				if (MI.talkList.moreTimes > maxTimes) {
					UI.ER(window,'scroll',getMore);
				}
			}
			UI.EA(window,'scroll',getMore);
		}

		if (MI.talkList) { //���ַ�����ҳ��������ҳ����Ҫ�ù���
			var account = MI.user.account,
				listStorageName = account + '_' + MI.talkList.first.id + '_' + MI.talkList.last.id,
				//listName = 'list_' + account,
				newList = 'new_' + listStorageName,
				moreList = 'more_' + listStorageName,
				scrollTop = 'scroll_' + listStorageName,
				listTime = MI.S('listTime');
			window.onbeforeunload = function(){
				var time = new Date().getTime();
				if (!MI.isS || !listStorageName) {
					return;
				}
				MI.S(scrollTop,UI.scrollY());
				location.hash = 'M';
				if (!listTime || time - listTime > 120000) { //3600000
					MI.S.clear();
					MI.S('listTime',new Date().getTime());
				}
				if (MI.talkList && MI.ajax && MI.ajax < 10) {
					//try{
						MI.S(newList,'[' + MI.talkNew.join(',') + ']');
						MI.S(moreList,'[' + MI.talkMore.join(',') + ']');

						/*var listStorage = MI.S(listName),
							list = listStorage ? MI.json(listStorage) : [];
						list.push('"' + listStorageName + '"');
						MI.S(listName,'[' + list.join(',') + ']');*/
					//}catch(e){
					//	clear();
					//}
				}
				/*function clear(){ //Clear Storage
					var list = MI.json(MI.S(listName));
					if (UI.isArray(list)) {
						UI.each(list,function(o){
							MI.S('new_' + o,'');
							MI.S('more_' + o,'');
							MI.S('scroll_' + o,'');
						});
					}
					MI.S(listName,'');
					MI.S('listTime',new Date().getTime());
				}*/
			};
			if (location.hash == '#M' && MI.isS) {
				//if (document.referrer == '' || document.referrer == location.href) {
				//	return;
				//}
				var _newList = MI.S(newList),
					_new = MI.json(_newList),
					_moreList = MI.S(moreList),
					_more = MI.json(_moreList);
				if (_newList) {
					MI.talkNew.push(_newList.slice(1,-1) || '{}');
				}
				if (_moreList) {
					MI.talkMore.push(_moreList.slice(1,-1) || '{}');
				}
				if (_new) {
					UI.each(_new,function(o){
						MI.talkList.addNewly(o);
					});
				}
				if (_more) {
					UI.each(_more,function(o){
						MI.talkList.addMore(o);
					});
				}
				window.scrollTo(0,MI.S(scrollTop));
			}
		}

		var gotTop = $$('.goTop')[0],link = $$('#UI a,.SM a,.mobileBox a,.proposal a');
		if (gotTop) {
			gotTop.onclick = function(){
				MI.Bos('btnTop');
			}
		}
		if (link) {
			UI.each(link,function(o,i){
				o.onclick = function(e){
					MI.Bos('btnSide' + i);
					UI.E(e).stop();
				}
			});
		}

		//Create Dialog && Card && DialogTip
		MI.dialog = MI.dialog || new MI.Dialog();
		MI.card = new MI.Card();
		MI.dialogTip = new MI.DialogTip();

	},100);
	var crs = setInterval(function(){
		if (MI.talkList || MI.talkBox) {
			clearInterval(crs);
			MI.Crs(1);
			UI.EA(window,'scroll',delayCrs);
			UI.EA(window,'resize',delayCrs);
		}
	},50),delayCrs = function (){
		MI.delay.crs = setTimeout(MI.Crs,200);
	};
});