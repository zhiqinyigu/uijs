MI.Base = {};
String.prototype.toTitle = function(){
	return this.replace(/\r/g, '')
		.replace(/\n/g, "")
		.replace(/\'/g, '&#39;')
		.replace(/\"/g, '&#34;')
		.replace(/</g,"&#60;")
		.replace(/>/g,"&#62;");
};
//举报
function jubao(urlParam){
	var url="http://jubao.qq.com/cn/jubao?";
	if(urlParam!='') url += urlParam;

	var wrap = UI.html('<div style="width:530px;height:400px;overflow:hidden;border:solid #FFF;border-width:5px 0 10px"><iframe src="about:blank" frameborder="0" scrolling="no" onload="MI.dialog.hideLoad()"></iframe></div>')[0],oIFrame = wrap.firstChild;
	oIFrame.style.cssText = 'width:538px;height:430px;background:#FFF;margin:-28px 0 0 -5px;-margin-top:-32px;border-style:none';
	MI.dialog.show({title:'<h3 class="DmainTit">' + _('腾讯举报平台') + '</h3>',width:562,html:wrap});
	MI.dialog.showLoad();
	oIFrame.src = url;
}
function jubao_onClose(){
	MI.dialog.hide();
}
function jubao_msg(id){
	jubao('appname=micoblog&subapp=web&jubaotype=msg&tw_msg_id='+id+'&tw_name=&tw_vip=&envname=web');
}
function jubao_user(name){
	jubao('appname=micoblog&subapp=web&jubaotype=uin&tw_pic_url=&tw_name='+name+'&tw_vip=&envname=web');
}
function jubao_qun_msg(id,qid,zone){
	zone = zone?zone:1;
	jubao('appname=micoblog&subapp=weiqun&jubaotype=msg&tw_msg_id='+id+'&tw_name=&tw_vip=&envname=web&groupid='+qid+"&zone="+zone);
}

MIIco = ['star','dyh']; //Set Icon's Order
MIIcoHtml = ['<a href="http://ent.qq.com/zt2010/star2010/fans.htm" class="ico_star" title="' + _('星光达人') + '" target="_blank"></a>','<a href="http://z.t.qq.com/sz2011/index.htm" target="_blank" class="ico_dyh" title="' + _('大运会') + '"></a>'];
/*MIIcoWC = function(id){
	return '<a href="/k/' + MIIcoWC.v[id] + '队" title="去' + MIIcoWC.v[id] + '队主场一起狂欢" class="ico_flag flag' + id + '" target="_blank"></a>';
}
MIIcoWC.v = ['','南非','墨西哥','乌拉圭','法国','阿根廷','尼日利亚','韩国','希腊','英格兰','美国','阿尔及利亚','斯洛文尼亚','德国','澳大利亚','塞尔维亚','加纳','荷兰','丹麦','日本','喀麦隆','意大利','巴拉圭','新西兰','斯洛伐克','巴西','朝鲜','科特迪瓦','葡萄牙','西班牙','瑞士','洪都拉斯','智利','中国'];*/
function MIIcon(obj){
	return '<%for(var k=0,num=MIIco.length;k<num;k++){if('+obj+'[MIIco[k]]){%><%=MIIcoHtml[k]%><%;}}%>';//if('+obj+'.wc){%><%=MIIcoWC('+obj+'.wc)%><%;}
}

(function(){
var $ = UI.G;
var $$ = UI.GC;
if (!(window.MIApp && !window.MIApp.lib)){
	window.$ = UI.G;
	window.$$ = UI.GC;
}

MI.tmpl.msg = '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>">\
			<div class="msgBox"><div class="userName">' + _('发给') + ' <a href="http://t.qq.com/<%=talk[i].name%>" title="<%=talk[i].bkname||talk[i].nick%>(@<%=talk[i].chName || talk[i].name%>)"><%=talk[i].bkname||talk[i].nick%></a>'+MIIcon('talk[i].flag')+'</div><div class="msgCnt"><%=talk[i].content%></div><div class="pubTime"><span class="time"><%=talk[i].time%></span> <%=talk[i].from%></div><p class="btnBox"><a href="#" class="replyMsg btn" rel="<%=talk[i].chName || talk[i].name%>">' + _('再写一封') + '</a><a class="btn delBtn" href="#">' + _('删除') + '</a></p></div>\
		</li><%}%>';
MI.tmpl.msgIn = '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>">\
			<div class="userPic"><a href="http://t.qq.com/<%=talk[i].name%>" title="<%=talk[i].bkname||talk[i].nick%>(@<%=talk[i].chName || talk[i].name%>)"><img src="<%=talk[i].pic%>"></a></div>\
			<div class="msgBox"><div class="userName"><strong><a href="http://t.qq.com/<%=talk[i].name%>" title="<%=talk[i].bkname||talk[i].nick%>(@<%=talk[i].chName || talk[i].name%>)"><%=talk[i].bkname||talk[i].nick%></a>'+MIIcon('talk[i].flag')+':</strong></div><div class="msgCnt"><%=talk[i].content%></div><div class="pubTime"><span class="time"><%=talk[i].time%></span> <%=talk[i].from%></div><p class="btnBox"><a href="#" class="replyMsg btn" rel="<%=talk[i].chName || talk[i].name%>">' + _('回信') + '</a><a class="btn delBtn" href="#">' + _('删除') + '</a></p></div>\
		</li><%}%>';
MI.tmpl.msgBox = '<div><table border="0" cellspacing="0" cellpadding="0" class="letterBg"><tr><th>' + _('收信人') + '</th><td><div class="txtWrap"><input type="text" name="userName" id="userName" class="msgTo inputTxt" value=""/> <span class="cNote">' + _('请输入你的听众的微博帐号') + '</span></div></td></tr><tr><th>' + _('内　容') + '</th><td><div class="txtWrap"><textarea type="text" class="inputArea noAutoCmt"></textarea></div></td></tr><tr><th></th><td><input type="button" class="sendBtn inputBtn" value="' + _('发送') + '" title="' + _('快捷键') + ' Crtl+Enter" /><span class="countTxt"></span><a href="#" class="ico_face" title="' + _('表情') + '"></a></td></tr></table></div>';
MI.tmpl.note = '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>">\
			<div class="msgBox">\
				<div class="msgCnt"><%=talk[i].content%></div>\
				<div class="pubTime"><span class="time"><%=talk[i].time%></span></div>\
				<p class="btnBox"><a href="#" class="replyMsg btn">' + _('修改') + '</a><a href="#" class="btn delBtn">' + _('删除') + '</a></p>\
			</div>\
		</li><%}%>';
MI.tmpl.black = '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>' + _('确定将{0}拉入黑名单？','<%=sex%>') + '</h2><p><span class="fs14">' + _('拉黑之后') + '...</span><br/>' + _('你们之间的收听关系将被解除，对方无法再收听你，而且你也不再收到来自{0}的任何消息与通知','<%=sex%>') + '</p><p><input type="button" value="' + _('确定') + '" /><input type="button" value="' + _('取消') + '" onclick="MI.dialog.hide()"/></p></div>';
MI.tmpl.unblack = '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>' + _('你真的原谅{0}了吗？','<%=sex%>') + '</h2><p><span class="fs14">' + _('取消之后') + '...</span><br/>' + _('你会重新收到来自{0}的私信和其它通知','<%=sex%>') + '</p><p><input type="button" value="' + _('确定') + '"/><input type="button" value="' + _('取消') + '" onclick="MI.dialog.hide()"/></p></div>';
MI.tmpl.card = '<div class="uCard"><div class="tip">' + _('这是你自己') + '</div><div class="tip"></div><div class="userPic"><a></a><p class="btn"><input type="button" class="addAttention" value="" /><a href="#" class="delAttention" title="' + _('取消收听') + '">' + _('取消<i class="l"></i>') + '</a><a href="#" class="delEach" title="取消收听"><i class="ico_each"></i>取消<i class="l"></i></a></p></div><div class="uCardcnt"><p class="userName"></p><p class="nums"></p><p class="btn"><a href="#" class="reply">' + _('对话') + '</a><a href="#" class="msg">' + _('私信') + '</a><a href="#" class="chat">' + _('聊天') + '<a href="javascript:void(0)" class="more">' + _('更多') + '<em class="btn_ldrop"></em></a></p><div class="moreFun" style="display:none;"><ul><li><a href="#" class="note">' + _('备注') + '</a></li><li><a class="list" href="#">' + _('名单') + '</a></li><li><a class="addqq" href="#">' + _('加QQ')+ '</a></li><li class="sep"><a class="reFollow" href="#">' + _('求收听') + '</a></li><li class="sep"><a class="recom" href="#">' + _('推荐') + '</a></li><li><a href="#" class="black">' + _('拉黑') + '</a></li><li><a class="report" href="#">' + _('举报') + '</a></li></ul></div><div class="uInfobox"><div class="sepline"></div><p class="uIntro"></p><p class="tagBox"></p><p class="company"></p><p class="school"></p></div><div class="uRelaBox"></div><a href="#" class="ico_sFo"></a></div><div class="rf clear" style="display:none"><dl style="display:none"><dt class="commenNum"></dt><dd class="commenFriend"></dd></dl><dl style="display:none"><dt class="commenNum"></dt><dd class="commenFriend"></dd></dl></div><div class="uloadBox"><em class="loading"></em>' + _('资料卡加载中') + '</div><div class="SA"><em>◆</em><span>◆</span><b>◆</b></div></div>';
MI.tmpl.code = '<div class="verify"><span class="ico_tsW"><span class="ico_te"></span></span><h3></h3><div class="clear"><form><div class="left">' + _('验证码：') + '</div><div class="verifyInput"><input type="text" class="inputTxt" /><div class="cNote">' + _('输入下图中的字符，不区分大小写') + '</div><img width="130" height="53">&nbsp;<a href="#" class="codeChange">' + _('看不清，换一张') + '</a></div></div><div class="btnBox"><button type="submit" class="btn2">' + _('确定') + '</button><button type="button" class="btn2">' + _('取消') + '</button></form></div></div>';

MI.tmpl.know = '<div class="tjRelaWrap"><div class="title"><div class="left">' +_('可能认识的人') + '<a class="cSign" style="display:none"></a><a class="change" href="#">[' +_('换一换') +']</a><a href="http://t.qq.com/potential.php" target="_blank">[' +_('全部') + ']</a></div><div class="right"><a href="#" class="closebtn">' +_('关闭') + '</a></div></div><ul class="tjRelaList clear"><ul></div>';


MI.loadPM = function(_afJsOnload)
{
	var _sHost = location.protocol + "//pm.t.qq.com/",
		_sStaticHost = location.protocol + "//rescdn.qqmail.com/pmweb/",
		_jsName = { zh_TW : "wbpm.zh_TW.js", en_US : "wbpm.en_US.js" }[window.MILang] || "wbpm.zh_CN.js",
		_sJsUrl = [_sStaticHost, "zh_CN/htmledition/js/", _jsName, "?version=111103"].join(""),
		_sCssUrl = _sStaticHost + "zh_CN/htmledition/style/wbpm.css?v=111021a";
	window.PMCMarkTime = +new Date;
	if (window.PM)
	{
		//已经加载了wbpm.css与wbpm.js
		_afJsOnload && _afJsOnload();
	}
	else
	{
		UI.getCss(_sCssUrl, function(){});
		var _bLoaded = 0;
		setTimeout(function()
			{
				if (!_bLoaded)
				{
					var qq = MI.Uin(),
						r = "&=" + Math.random(),
						a = window.g_pmcompose_btrace = new Image,
						b = window.g_pmcompose_invest = new Image;
					a.onload = a.onerror = function()
					{
						 window.g_pmcompose_btrace = null;
					};
					b.onload = b.onerror = function()
					{
						 window.g_pmcompose_invest = null;
					};
					a.src = _sHost + "cgi-bin/getinvestigate?stat=wbpm&type=pmloginfail&subtype=" + qq + ",8" + r;
					b.src = "http://btrace.qq.com/collect?sIp=&iQQ=" + qq + "&sBiz=pm&sOp=login&iSta=8&iTy=454&iFlow=" + r;
				}
			},
			2000
		);
		UI.getScript(_sJsUrl, function()
			{
				_bLoaded = 1;
				_afJsOnload && _afJsOnload();
			}
		);
	}
};

/**
 * 打开写私信对话框
 *
 * @param {String} name 收件人帐号
 * @param {Integer} type 用来统计用户从哪里启动写私信对话框，1: profile tip处发出，3: Profile页面发私信
 * @param {String} content 默认显示的文件内容
 * @param {String} String 私信框类型
 * 
 * @return {Boolean} true 执行成功，false 失败
 *
 *  @example
 *		MI.pmcompose("t", 1)
 *
 */
MI.pmcompose = function(name, from, content, bostype)
{
	var config = {
			type : "compose",
			to : name,
			from : from,
			bostype : bostype,
			content : content
		};

	var _nStatus = 0; //0 初始化，1 用户自动关闭，2 写私信状态

	MI.dialog.show({
		width:570,
		html : '<div style="width:508px;height:169px;text-align:center;line-height:12;"><img style="margin:0 5px -3px;" src="http://mat1.gtimg.com/www/mb/images/loading.gif"/>加载中...</div>',
		end : function()
		{
			//这是用户强制关闭
			_nStatus = 1;
		}
	});
	MI.loadPM(function()
		{
			if (_nStatus != 1)
			{
				_nStatus = 2;
				//在加载过程中，用户强制关闭，不再打开
				PM.init(config);
			}
		}
	);
	return false;
};

/**
 *
 *
 *  @param {Object} _aoCfg {
 *			dom: 用innerHTML 替换里面的内容
 *			to : string, 收件人
 *			bostype : 
 *			content : 内容
 *			onload : function() 初始化完毕
 *			onsendcomplete: function() 发完信
 *		}
 *
 *  用法例子
 *		dom.innerHTML = "加载中...";
 *		MI.pmembedcompose({
 *				dom : dom,
 *				content : "需要内容"
 *				onsendcomplete : function()
 *					{
 *						alert('成功');
 *					}
 *			});
 */
MI.pmembedcompose = function(config)
{
	config.type = "embedcompose";
	config.from = 5; //日志类型
	MI.loadPM(function()
		{
			PM.init(config);
		}
	);
};

MI.TalkBox.prototype.addFace = function(){
	var Self = this;
	MI.app({
		Tmpl : function(){
			if (!Self._faceBox){
				Self._faceBox = UI.html(new UI.tmplString(MI.tmpl.face)({}))[0];
				UI.C(Self._faceBox,'z-index',9999);
				Self._facePreview = $$(Self._faceBox,'.facePreview')[0];
				Self._faceClose = $$(Self._faceBox,'.close')[0];
				Self._faceArrow = $$(Self._faceBox,'.SA')[0];
				Self._faceTab = $$(Self._faceBox,'.tabStyle3 li');
				Self._faceCont = $$(Self._faceBox,'.faceBox');
				Self._facePage = $$(Self._faceBox,'.pages')[0];
				Self._faceList = [];
				Self._faceTabCur = 0;
				UI.append(Self._faceBox,document.body);
				var ipad = UI.hasClass(document.body,'ipad');
				
				//Event
				Self._faceClose.onclick = function(){
					Self.hideFace();
					return false;
				}
				UI.EA(document.body,'click',function(){
					Self.hideFace();
				});
				UI.EA(Self._faceBox,'click',function(e){
					UI.E(e).stop();
				});
				UI.each(Self._faceTab,function(o,i){ //页卡切换
					o.onclick = function(){
						if (Self._faceTabCur != i){
							UI.each(Self._faceTab,function(e,j){
								if (i == j){
									e.innerHTML = '<b>' + UI.text(e) + '</b>';
								}
								else {
									e.innerHTML = '<a href="#">' + UI.text(e) + '</a>';
								}
							});
							UI.removeClass(Self._faceTab[Self._faceTabCur],'select');
							UI.addClass(o,'select');
							UI.hide(Self._faceCont[Self._faceTabCur]);
							UI.show(Self._faceCont[i]);
							Self._faceTabCur = i;
							Self._faceList = $$(Self._faceCont[Self._faceTabCur],'.faceCell');
							Self.page.show(1,Self._faceList.length);
						}
						return false;
					}
				});
				Self.page = new MI.Page({
					target : Self._facePage, //翻页DOM
					call : function(num){ //回调函数
						UI.each(Self._faceList,function(o){
							if (UI.C(o,'style') != 'none'){
								UI.hide(o);
							}
						});
						UI.show(Self._faceList[num - 1]);
					},
					num : 3 //当前页左右的页数
				});
				UI.each($$(Self._faceBox,'.faceBox .faceCell a'),function(o,i){ //表情事件
					o.onclick = function(){
						var temp = (UI.A(this,'type') || '') + this.title;
						if(window.MILang=='en_US')
							Self.addTopic(' /[' + temp + ']');							
						else
							Self.addTopic(' /' + temp);
						Self.hideFace();
						return false;
					}
					o.onmouseover = function(){
						var file = 'face/' + this.className.replace('f',''),
							P = this.parentNode.parentNode,
							fold = UI.A(P,'fold'),
							num = 15,
							index;
						if (!UI.A(P,'index')){
							UI.each($$(P,'a'),function(o,i){
								if (!UI.A(o,'i')){
									UI.A(o,'i',i + '');
								}
							});
							UI.A(P,'index',1);
						}
						index = Number( UI.A(this,'i') || i );
						if (fold){
							file = fold + (1 + index);
							UI.A(this,'type',fold.split('/')[1]);
							num = 14;
						}
						Self._facePreview.innerHTML = '<div><p class="faceImg"><img src="http://mat1.gtimg.com/www/mb/images/' + file + '.gif" alt=""></p><p class="faceName">' + this.title + '</p></div>';
						Self._facePreview.style.cssText = index % num > 7  ? 'left:12px;' : '';
					}
					o.onmouseout = function(){
						UI.hide(Self._facePreview);
					}
				});
			}
			if (Self._faceBox.style.display == 'none'){
				setTimeout(function(){
					Self._faceBox.style.cssText = 'top:' + (UI.getY(Self._face) + UI.height(Self._face) - MI.scrollHack(Self._face) + 4) + 'px;left:' + (UI.getX(Self._face) - 4) + 'px';
					if (Self._faceArrow && UI.text(Self._face)){
						if(MI.Nano){
                            UI.C(Self._faceArrow,'left',(UI.width(Self._face) + 0) / 2 + 'px');
                        }else{
                            UI.C(Self._faceArrow,'left',(UI.width(Self._face) + 16) / 2 + 'px');
                        }
					}
					else {
						UI.hide(Self._faceArrow);
					}
					var firstLink = $$(Self._faceBox,'a')[0];
					if (firstLink){
						firstLink.focus();
					}
				},0);
			}
			else {
				Self._faceBox.style.cssText = 'display:none';
			}
		}
	});
}
MI.TalkBox.prototype.hideFace = function(){
	var Self = this;
	if (Self._faceBox){
		UI.hide(Self._facePreview);
		UI.hide(Self._faceBox);
	}
}

/*MI.TalkList.prototype.sportTips = function(tips){
	var target = this;
	MI.ajax({
		url:MI.url.topicInfo,
		type:'get',
		success : function(data){
			data = MI.json(data);
			 if(data.result==0){
			 	var num = data.info.total;
				tips.innerHTML ='<div>' + _('361° 腾讯微博大运梦想传递参与：{0}人次',num)+'</div>';
				UI.show(tips);
				MI.tips.position(target);
				MI.Bos('btnCheckDyh');
			 }
		}
	 });
}*/
MI.TalkList.prototype.gongyiTips = function(tips){
	var target = this;
	var url = 'http://gongyi.qq.com/js/wgy/weigy.js' + '?t=' + MI.random(); 
	UI.getScript(url,
			function() {
			 	var num = weigy_weibo_total;
				tips.innerHTML ='<div>' + _('筑力计划•微爱参与人数：{0}人次',num)+'</div>';
				UI.show(tips);
				MI.tips.position(target);
				MI.Bos('btnCheckGongyi');
			});
}
MI.TalkList.prototype.levelTips = function(tips){
	var target = this,
		data = {mid:'10243'},
		user = UI.A(this,'user');
	if (user){
		data.u = user;
	}
	MI.ajax({
		url:MI.url.medal,
		data:data,
		type:'get',
		success : function(data){
			data = MI.json(data);
			 if(data.result==0){
			 	var num = data.info.html;
				tips.innerHTML = '<div>' +  num +'</div>';
				UI.show(tips);
				MI.tips.position(target);
				MI.Bos('btnCheckLevel');
			 }
		}
	 });
}
MI.TalkList.prototype.urlTips = function(tips){
	if (this.nodeName == 'A') {
		var target = this,
			urlTipsTxt = [_('原链接'),_('QQ电脑管家提醒您，不建议打开原链接'),_('腾讯网'),_('原链接'),_('搜搜')],
			href = target.href,
			id = href.match(/[^\/]+$/g)[0].split('?')[0],
			tip = '',
			url = '',
			br = '',
			Time,Time_1,Time_2,Time_3;
		if (!href.hasString('?')){
			var time = $$(UI.parents(target,'msgBox')[0],'.time'),timeNum = time.length,timeFrom;
			if (timeNum){
				timeFrom = UI.A(time[timeNum - 1],'from');
				if (!timeFrom){
					timeFrom = '';
				}
			}
			UI.A(target,'href',(UI.B.ie ? ' ' : '') + href + '?type=1&from=19&u=' + MI.user.account + '&s=' + timeFrom + '&f=1&skey=');
		}
		if (target.title) { //Cache Title
			UI.A(target,'reltitle',target.title);
			target.title = '';
		}
		if (MI.Tips.url[id]) {
			show(MI.Tips.url[id]);
			MI.Bos('btnViewUrl','',0.01);
		}
		else {
			Time = + new Date();
			MI.ajax({
				url : MI.url.urlDetail,
				type : 'get',
				data : 'url=' + id,
				success : function(data){
					Time_1 = + new Date() - Time;
					data = MI.json(data);
					if (data.result == 0) {
						show(data);
						MI.Tips.url[id] = data;
						MI.Bos('btnViewUrl','',0.01);
					}
					
					//Speed
					Time_2 = + new Date() - Time;
					setTimeout(function(){
						Time_3 = + new Date() - Time;
						MI.Speed('t_asyn_url',0.1,Time_1,Time_2,Time_3);
					},0);
				}
			});
		}
	}
	function show(data){
		if (data.result == 0) {
			var title = UI.A(target,'reltitle');
			if (title) {
				data.info.title = title;
			}
			url = data.info.url;
			var ico = {
				"5":/soso\.com/gi
			};
			for(var i in ico)
			{
				if(ico[i].test(url))
					data.info.safe = i;
			}
			if (data.info.title && data.info.safe > 2) { //Show Title
				tip = MI.string.cut(data.info.title,26);
				url =  MI.string.cut(url,60);
				br = '<br>';
			}
			else {
				tip = urlTipsTxt[data.info.safe - 1] || urlTipsTxt[0];
				br = '：';
				url = MI.string.cut(url,80);
			}
			url = url.breakWord(0);
			if (data.info.safe > 2) { //Go Source Url
				//UI.A(target,'href',(UI.B.ie ? ' ' : '') + data.info.url);
			}
			var copyAndReport = '';
			if(data.info.safe == 1 || data.info.safe == 2){
				var text1 = (!UI.B.ie) 
							? '' 
							: ('<a href="#" onclick="var a=window.clipboardData.setData(\'Text\',this.previousSibling.value),b=this.nextSibling;UI.hide(this);UI.show(b);b.innerHTML=a?\''
							+ _('复制成功')
							+ '\':\''
							+ _('复制失败')
							+ '\';return false">' + _('复制网址') + '</a><a class="cNote" style="display:none;text-decoration:none"></a>');
				var text2 = '<a href="http://guanjia.qq.com/trojan_false.html" target="_blank">' + _('举报链接') + '</a>';
				copyAndReport = '<p class="safeFun"><textarea style="display:none">' + data.info.url + '</textarea>'+ text1 + text2 +'</p>';
			}
			tips.innerHTML = copyAndReport + '<div class="safeBox clear"><em class="ico safe_' + (data.info.safe || 1) + '"></em><p class="safeType">' + MI.string.html(tip) + br + url + '</p></div></div>';
			UI.show(tips);
			MI.tips.position(target);
		}
	}
}


MI.viewSet = function(id){
	if (MI.user.fun.newViewSet){
		if (MI.viewSet._body){
			show();
		}
		else {
			if (!MI.viewSet.loading){
				UI.ajax({
					type : 'post',
					url : '/asyn/myViewSetting.php',
					success : function(data) {
						data = MI.json(data);
						MI.viewSet._body = UI.html(data.info)[0];
						var target = MI.viewSet._body,btn = $$(target,'button'),input = $$(target,'input');
						setTimeout(function(){
							btn[0].focus();
						},0);
						btn[1].onclick = function(){
							MI.dialog.hide();
						}
						if ($$(target,'.wqList dd label').length > 8){
							$$(target,'.wqList dd')[0].style.cssText = 'height:120px;overflow:auto;';
						}
						show();
						MI.app({
							Validate : function(){
								UI.remove($('showModSet'));
								var validate = new MI.Validate({
									id : 'myViewSetting',
									inputs : {
										viewModel : {noIco : true},
										pageSet : {noIco : true},
										faceTrans : {noIco : true},
										fb : {noIco : true},
										wqIds : {noIco : true}
									},
									messages : function(el){
										return UI.next(el);
									},
									success : function(){
										MI.tip(_('保存成功'),function(){
											document.location.reload();
										});
									}
								});
							}
						});
						MI.viewSet.loading = 0;
						MI.Bos('btnViewSet');
					},
					fail : function(){
						MI.viewSet.loading = 0;
					}
				});
			}
			MI.viewSet.loading = 1;
		}
	}
	else {
		UI.css('.showModSet{width:340px}');
		var target = $(id),btn = $$(target,'button'),input = $$(target,'input');
		MI.dialog.show({
			title : '<h1 class="DmainTit">' + _('浏览设置') + '</h1>',
			html : target,
			width : 380
		});
		setTimeout(function(){
			btn[0].focus();
		},0);
		MI.Bos('btnViewSet');
		btn[0].onclick = function(){
			var url = UI.parseUrl(),value = [];
			UI.each(input,function(o){
				if (o.checked) {
					url[UI.A(o,'name')] = o.value;
				}
			});
			for (var i in url) {
				value.push(i + '=' + (url[i] || ''));
			}
			document.location.href = document.location.pathname + '?' + value.join('&');
		}
		btn[1].onclick = function(){
			MI.dialog.hide();
		}
	}

	function show(){
		MI.dialog.show({
			title : '<h1 class="DmainTit">' + _('浏览设置') + '</h1>',
			html : MI.viewSet._body,
			width : 560
		});
	}
}
MI.navMenu = function(){ //Nav Menu
	var nav = $('nav'),
		subNav,
		curNav,
		timerHover,
		timerOut,
		account = MI.user.account;
	if (!nav){
		(function(){
			var headNav = $$(document.body,'.headWrap')[0];
			var navApp = $$(headNav,'.apps')[0];
			var navMsg = $$(headNav,'.right .topNavItem')[0];
			var navSet = $$(headNav,'.right .topNavItem')[1];
			var searchKey = $('searchKey');
			var tSearch = $$(headNav,'.tSearchNew')[0];
			if(!headNav) return; //如果没有新导航，跳出下面的执行
			MI.Bos('usingNewNavNow');	
			if(UI.B.ie6){
					//if(!document.documentElement.style.backgroundImage)document.documentElement.style.cssText = 'background:#BBEDFF fixed';
					headNav.style.setExpression("top","eval((document.documentElement||document.body).scrollTop) + 'px'");
			}
			
			var hide = function(e){
				var subNav = $$(this,'.topNavSub')[0];
				var btn = $$(this,'.txt')[0];
				UI.hide(subNav);
				UI.removeClass(btn,'active');
			}
			var show = function(e){
				var subNav = $$(this,'.topNavSub')[0];
				var btn = $$(this,'.txt')[0];
				//隐藏音乐
				if(this == navApp) {
					if (subNav && !(MI.user.medal && MI.user.medal[1] > 2)){
						UI.hide($$(subNav,'li')[2]);
					}
				}
				UI.show(subNav);
				UI.addClass(btn,'active');
			}
			
			UI.each([navApp,navSet,navMsg],function(o){
				if(o) {
					o.onmouseover = show;
					o.onmouseout = hide;
				}
			})

			if(searchKey){
				UI.EA(searchKey,'blur',function(){
					UI.removeClass(tSearch,'active');
				});
				UI.EA(searchKey,'focus',function(){
					UI.addClass(tSearch,'active');
				});
			}
			setTimeout(function(){
				var topNav = $$(document.body,'.topNav a');
				var selfPathname = document.location.href;
				var pathList = {
					home : {
						element : topNav[0],
						pathname :['t.qq.com/' + MI.user.account]
					},
					news : {
						element : topNav[1],
						pathname :['/p/news','/p/city','/p/top','/college_anas.php']
					},
					qun : {
						element : topNav[2],
						pathname :['qun.t.qq.com']
					},
					people : {
						element : topNav[3],
						pathname :['/people','/potential.php','/rank.php','/lists.php','/list2.php']
					},
					app : {
						element : topNav[4],
						pathname :['app.t.qq.com','t.qq.com/app']
					},
					client : {
						element : topNav[8],
						pathname :['/client.php']
					}
				}

				for(name in pathList){
					for(str in pathList[name]['pathname']){
						if(new RegExp(pathList[name]['pathname'][str]).test(selfPathname)){
							UI.addClass(pathList[name]['element'],'active');
							break;
						}
					}
				}
			},10)
		})();
	}
	else {
		nav = {
			//news : $$(nav,'.news')[0],
			app : $$(nav,'.app')[0],
			topic : $$(nav,'.topic')[0]
		};
		var menu = {
			//news : UI.html('<div class="subNav" onclick="MI.Bos(\'btnTopMenuNews\')"><p><a href="http://t.qq.com/p/news">' + _('大家在说') + '</a></p><p><a href="http://t.qq.com/p/mobile">' + _('手机广播') + '</a></p><p><a href="http://t.qq.com/p/city">' + _('同城广播') + '</a></p><p><a href="http://t.qq.com/p/top">' + _('热门广播') + '</a></p><p><a href="http://t.qq.com/college_anas.php">' + _('经典语录') + '</a></p><p><a href="http://t.qq.com/dandelion.php?g">' + _('蒲 公 英') +  '</a></p>' + ((window.MILang=='en_US') ? '' : ('<p><a href="http://t.qq.com/hotspot.php">' + _('微 热 点') + '</a></p>')) + '<p><a href="http://t.qq.com/rank.php">' + _('排 行 榜') + '</a></p><p><a href="http://t.qq.com/lists.php">' + _('名单广场') + '</a></p><p class="last">'+ ((window.MILang=='en_US')? '' : ('<a href="http://z.t.qq.com/weibotalk.htm" target="_blank">' + _('微 访 谈') + '</a>')) + '</p></div>')[0],
			app : UI.html('<div class="subNav"><p><a href="http://t.qq.com/app/qzblog/' + account + '" onmousedown="MI.Bos(\'btnTopMenuAppBlog\')">' + _('日志') + '</a></p><p' + (MI.user.fun.app == 1 ? '' : ' style="display:none"') + '><a href="http://t.qq.com/app/qzphoto/' + account + '" onmousedown="MI.Bos(\'btnTopMenuAppPhoto\')">' + _('相册') + '</a></p><p' + ((MI.user.medal && MI.user.medal[1] > 2) ? '' : ' style="display:none"') + '><a href="http://t.qq.com/app/music/' + account + '" onmousedown="MI.Bos(\'btnTopMenuAppMusic\')">' + _('音乐') + '</a></p><p><a href="http://tv.t.qq.com/index.php" target="_blank" onmousedown="MI.Bos(\'btnTopMenuAppTV\')">' + _('微电视') + '</a></p><p><a href="http://fm.t.qq.com/fm" target="_blank" onmousedown="MI.Bos(\'btnTopMenuAppFM\')">' + _('微电台') + '</a></p><p class="last"><a href="http://app.t.qq.com" onmousedown="MI.Bos(\'btnTopMenuAppChannel\')">' + _('应用频道') + '</a></p><p class="last" style="display:none"><a href="http://open.t.qq.com/apps/appslist.php" >' + _('我的应用') + '</a></p></div>')[0],
			topic : UI.html('<div class="subNav"><p><a href="http://t.qq.com/p/topic" onmousedown="MI.Bos(\'btnTopMenuTopicHot\')">' + _('热议') + '</a></p><p class="last"><a href="http://t.qq.com/p/event" onmousedown="MI.Bos(\'btnTopMenuTopicActive\')">' + _('活动') + '</a></p></div>')[0]
		},
		append = {
			//news : 0,
			app : 0,
			topic : 0
		};
		UI.each(menu,function(o,i){
			if (nav[i]){
				UI.hide(o);
				o.onmouseover = nav[i].onmouseover = show;
				o.onmouseout = nav[i].onmouseout = hide;
			}
		});
	}
	function show(e){
		var T = this,
			type = getType(T);
		if (!append[type]){
			UI.append(menu[type],nav[type]);
			append[type] = 1;
		}
		if (curNav == type){
			clearTimeout(timerOut);
		}
		timerHover = setTimeout(function(){
			UI.addClass(nav[type],'hover');
			UI.show(menu[type]);
			curNav = type;
		},100);
		UI.E(e).stop();
	}
	function hide(e){
		var T = this,
			type = getType(T);
		clearTimeout(timerHover);
		timerOut = setTimeout(function(){
			UI.removeClass(nav[type],'hover');
			UI.hide(menu[type]);
		},200);
		UI.E(e).stop();
	}
	function getType(target){
		var type = target.className.split(' ')[0];
		if (type == 'subNav'){
			type = target.parentNode.className.split(' ')[0]
		}
		return type;
	}
}
MI.searchKey = function(isNano){ //Search Key
	//MI.dropTips = new MI.DropTips('searchKey');
	var searchKey = $('searchKey'),searchKeyTip;
	if (searchKey){
		searchKeyTip = searchKey.previousSibling;
		var searchUrl = "http://t.qq.com/search/index.php";
		if (isNano){
			searchUrl = "http://1.t.qq.com/search/message.php";
		}
		//是否新版导航
		var newNav =  (UI.hasClass(searchKey.parentNode.parentNode,'tSearchNew')) ? 1 : 0;
		MI.searchKeyBox = new MI.SmartBox('searchKey', function() {
				$('searchForm').submit();
				$('searchForm').action = searchUrl;
			}, '', {
				left : (newNav ? -3 : -8),
				top : UI.B.ie ? 4 : 6,
				width : (newNav ? 172 : 202),
				type : 1,
				history : 1,
				isnano : isNano
			});
		searchKeyTip.onmouseup = function(){
			searchKey.focus();
		}
	}
}
MI.themeSet = function(){ //Theme Setting
	var setTheme = $('setTheme');
	if (setTheme) {
		setTheme.onclick = function(){
			var T = this,
				homePage = '/' + MI.user.account;
			if (document.location.pathname != homePage) {
				document.location.href = 'http://t.qq.com' + homePage + '?setTheme=1';
				return false;
			}
			if (MI.talkBox) {
				setTimeout(function(){
					MI.talkBox._txt.blur();
				},1000);
			}
			if (!UI.A(T,'loaded')) {
				MI.app({
					Theme : function(){
						MI.Theme.build();
						UI.A(T,'loaded',1)
					}
				});
			}
			else {
				MI.Theme.show();
			}
			MI.Bos('btnThemeSetOpen');
			return false;
		}
		if (UI.parseUrl().setTheme != undefined) {
			setTheme.onclick();
		}
	}
}

//可能认识的人，左侧
MI.MayBeKnow= (function(){
	var _body,_list,_newSign,_change,_all,_toggle,SHOW_NUM=3,dataCache;
	var followingNum =  $('followingNum') && parseInt($('followingNum').innerHTML);
	
	function getData(){
		MI.MayBeKnow.returnResult = 0;
		var d = new Date();
		var weektime = d.getDay();
		//MI.user.fun.showRecommend
	        if(MI.user.fun.showRecommend){
				MI.ajax({
					url:MI.url.recommend,
					data:{scene:2,count:18},
					type:'get',
					success:function(data){
						data = MI.json(data);
						if(data.result==0 && data.info.list && data.info.list.length) {
							var o = data.info;
							dataCache = o;
							//返回数据不少于3个，显示推荐模块,控制不显示banner
							if(o.list.length >= 3) MI.MayBeKnow.returnResult = 1;
							else return;
							buildBody(dataCache);	
						}
					}
				});
	        }
	}

	//生成结构
	function buildBody(o){
		if(!_body) {
			_body = UI.html(MI.tmpl.know)[0];
			_list = $$(_body,'.tjRelaList')[0];
			_newSign = $$(_body,'.cSign')[0];
			_change = $$(_body,'.change')[0];
			_toggle = $$(_body,'.closebtn')[0];
			_all = $$(_body,'.left a')[2];
			if(!$('talkBox')) return;
			UI.after(_body,$('talkBox'));
			hideBanner();
			_change.onclick = function(e){
				MI.feedBack({name:'timeline',iPos:11,iBak1:9,id:1191});
				changeAfter(e);
				return false;
			}
			_toggle.onclick = toggle;
			_all.onclick = allFun;
		}
		_newSign.innerHTML = o.newNum > 0 ?  _('新来(+{0})',o.newNum) : '';
		change();
	}
	
	//隐藏homeBanner
	function hideBanner(){
		UI.hide('homeBannerTip');
		UI.hide('NewGuideBannerTip');
	}
	//展示推荐用户列表并且绑定事件
	function change(e){
		var arr= [],o = dataCache;
		for(var i=0;i<o.list.length;i++){
			if(!o.list[i].added) {
				arr.push(o.list[i]);
				o.list[i].added = true;
			}
         	//if(arr.length >= SHOW_NUM) break;
		}
		_list.innerHTML = buildList(arr);
		bindEvent();
		if(e || window.event) MI.Bos('btnRefreshMayBeKnow');
		return false;
	}
	//换一换
	function changeAfter(e){
		var domlist = $$('.tjRelaList li');
		if(domlist.length>=6){
			var totalAccount='';
			for(var i=0;i<3;i++)
				UI.remove(domlist[i]);
			for(var i=3;i<6;i++){
				UI.show(domlist[i]);
				var account = UI.A(domlist[i],'uin');
				totalAccount += account;
				totalAccount += ',';
			}
			var lenAccout = totalAccount.length;
			var end = totalAccount.substring(lenAccout-1,lenAccout);
			if(end == ',')
				totalAccount =  totalAccount.substring(0,lenAccout-1);
			MI.feedBack({name:'timeline',iPos:11,iBak1:1,sBak1:totalAccount,id:1191});
		}
		else{ 
			getData();
			return false;
		}
		if(e || window.event) MI.Bos('btnRefreshMayBeKnow');
		return false;
	}
	function allFun(){
		MI.feedBack({name:'timeline',iPos:11,iBak1:10,id:1191});
	}
	//隐藏和展开
	function toggle(){
		/*var isOpen = UI.hasClass(this,'flod')*1;
		UI.toggle(_list);
		UI.toggleClass(this,'flod');
		MI.Bos(isOpen ? 'btnUnFoldMayBeKnow' : 'btnFoldMayBeKnow');
		this.innerHTML  = '<em class="arrow1"></em>' + (isOpen? _('展开') : _('收起'));
		UI.toggle(_change);
		var type = isOpen ? 11 : 12;
		MI.feedBack({"scene":11,"type":type});
		*/
		MI.Bos('btnTimeineClose');
		MI.feedBack({name:'timeline',iPos:11,iBak1:14,id:1191});
		UI.hide(_body);
		UI.cookie('mb_mayBeEveryday',1,1);
		MI.user.fun.showRecommend=0;
		UI.show('NewGuideBannerTip');
		UI.show('homeBannerTip');
		MI.bannerTips();
		return false;
	};
	
	//生成列表
	function buildList(arr) {
		var str = '';
		UI.each(arr,function(p,i){
			var title = (p.bkname||p.nick).toTitle() + '(@' + (p.chName || p.name) + ')',href = '/' + p.account;		
			var nickName = MI.string.cut((p.bkName || p.nick),14,''); //截取字符串
			str += '<li account="' + p.account + '"' + ((i>= SHOW_NUM)? 'style="display:none"' : '')+' uin="' + p.uin +'"><div class="userPic">';
			str += '<a title="' + title + '" href="' + href + '" target="_blank">';
			str += '<img onerror="MI.Pic(this,50)" src="' + (p.avatar ? p.avatar + '/50' : 'http://mat1.gtimg.com/www/mb/images/head_50.jpg') + '" /></a>';
			str +=  p.isNew ? '<em class="sign_new">' + _('新') + '</em>' : '';
			str += '</div><div class="knownInfo">';
			str += '<p><a class="uname" title="' + title + '" href="' + href + '" target="_blank">' + nickName + '</a>' + ((p.vip==true)? '<a href="http://t.qq.com/certification" target="_blank" class="vip" title="腾讯认证"></a>' : '') + '</p>';
			str += '<p class="middle">'+ p.reason + '<p>';
			str += '<p class="attentBox" account="' + p.account + '"><input type="button" class="addAttention" value="' +_('收听') + '">';
			str += '<a href="#" class="delAttention" style="display:none">' +_('取消') + '</a>' + (p.isFollower ? p.isFollower : '') + '</p>';
			str += '<a href="#" class="del" title="' + _('不再推荐此人') + '">×</a>';
			str += '</div></li>';
		});
		return str;
	}
    //收听或者叉掉以后，消失，补充下一个
	function showNext(P){
		UI.animate(P,'opacity',0,function(){
				UI.remove(P);
				var count = 0;
				var userList= $$(_list,'li');
				
				for(var i=0; i < userList.length; ++i)
				{
					if(count >= SHOW_NUM)
					{
						MI.feedBack({name:'timeline',iPos:11,iBak1:1,sBak1:UI.A(userList[count-1],'uin'),id:1191});
						break;
					}
					UI.show(userList[i]);
					count++;
				}
				if(userList.length < SHOW_NUM){
					change();
				}				
		});
	}
	//follow
	function bindEvent(){
		UI.each($$(_list,'.attentBox'),function(o,i){
			var account = UI.A(o,'account'),_follow=$$(o,'.addAttention')[0],_unFollow = $$(o,'.delAttention')[0];
			var uin = UI.A(UI.parents(o)[1],'uin');
			_follow.onclick = function(e){
				UI.E(e).prevent();
				MI.follow(account,this,function(isFollow){
					UI.show(_unFollow);
					UI.hide(_follow);
					_follow.className = 'addAttention';
					MI.Bos('btnFollowMayBeKnow');
				})
				MI.feedBack({name:'timeline',iPos:11,iBak1:3,sBak1:uin,id:1191});
				//收听以后，消失，补充下一个
				var P = UI.parents(o)[1];
				setTimeout(function(){
					showNext(P);
				},1000);
			};

			_unFollow.onclick = function(e){
				UI.E(e).prevent();
				MI.follow(account,this,function(isFollow){
					UI.show(_follow);
					UI.hide(_unFollow);
					_unFollow.className = 'delAttention';
					MI.Bos('btnUnFollowMayBeKnow');
				})
				MI.feedBack({name:'timeline',iPos:11,iBak1:8,sBak1:uin,id:1191});
			}			
		});
		UI.each($$(_list,'.del'),function(o,i){
			o.onclick = function(){
				var P = UI.parents(o)[1];
				var account = UI.A(P,'account');
				var uin = UI.A(P,'uin');
				setTimeout(function(){
					showNext(P);
				},500);
				MI.feedBack({name:'timeline',iPos:11,iBak1:6,sBak1:uin,id:1191});
				var urlText = '/api/1.0/recommend/' + account + '/block.json';
				UI.ajax({url:urlText,success:function(){}});
				return false;
			}
		});
		//曝光上报以及头像，昵称上报
		var people = $$(_list,'li');
		var totalAccount = '';
		UI.each(people,function(o,i){
			o.onmouseover = function(){
				UI.addClass(o,'hover');
			}
			o.onmouseout = function(){
				UI.removeClass(o,'hover');
			}
			var account = UI.A(o,'uin');
			$$(o,'.userPic a')[0].onclick = function(e){
				MI.feedBack({name:'timeline',iPos:11,iBak1:2,sBak1:account,id:1191});
			};
			$$(o,'.uname')[0].onclick = function(e){
				MI.feedBack({name:'timeline',iPos:11,iBak1:5,sBak1:account,id:1191});
			};
			if(o.style.display != 'none'){
				totalAccount += account;
				totalAccount += ',';
			}
		});
		var lenAccout = totalAccount.length;
		var end = totalAccount.substring(lenAccout-1,lenAccout);
		if(end == ',')
			totalAccount =  totalAccount.substring(0,lenAccout-1);
		MI.feedBack({name:'timeline',iPos:11,iBak1:1,sBak1:totalAccount,id:1191});
		
		MI.Card.build(_list,'.userPic img',4);
		MI.Card.build(_body,'.knownInfo .uname',2);
		MI.Card.build(_body,'.knownInfo .middle a',2);
	};

	return {
		getData : getData
	}
})();




MI.tmpl.volume = '<div style="display:none"><div class="mLimWrap"><div class="mLimFun"><a href="#" class="btn_mdown" title="' + _('缩小音量') + '">-</a><p class="mLim"><a href="#" class="mLim_s select"><em>小</em></a><a href="#" class="mLim_m select"><em>中</em></a><a href="#" class="mLim_b"><em>大</em></a></p><a href="#" class="btn_mup" title="' + _('放大音量') + '">+</a></div><div class="mLimIntro">' + _('缩小音量，筛选出精华内容') + '<br />' + _('放大音量，获得更多的消息来源') + '<br /><a target="_blank" href="http://t.qq.com/k/%E5%BE%AE%E5%8D%9A%E9%9F%B3%E9%87%8F%E6%84%8F%E8%A7%81%E5%8F%8D%E9%A6%88">' + _('意见反馈') + '<em class="ffsong">&gt;&gt;</em></a></div><div class="mLimTips" style="display:none"><div class="SA"><em>◆</em><span>◆</span></div><p></p></div></div><div class="mLimLoad loading">正在为您调整合适的音量...</div></div>';

//音量控制
MI.volume = (function(){
	UI.css('.mLimWrap,.mLimFun a,.mLimFun em,.mLimIntro{background:url(http://mat1.gtimg.com/www/mb/images/mlimBg.png) no-repeat}.mLimWrap{width:430px;height:84px;padding:0 10px 0 120px;overflow:hidden;*zoom:1;border-bottom:1px solid #CACACA}.mLimFun{float:left;width:240px;margin-top:30px}.mLimFun a{float:left;display:block;position:relative;width:52px;height:9px;overflow:hidden;padding:6px 5px;line-height:20em;background-position:-118px -88px}.mLimFun a.btn_mdown,.mLimFun a.btn_mup{width:27px;height:21px;padding:0}.mLimFun a.btn_mdown{background-position:0 -88px}.mLimFun a.btn_mdown:hover{background-position:-29px -88px}.mLimFun a.btn_mup{background-position:-58px -88px}.mLimFun a.btn_mup:hover{background-position:-87px -88px}.mLim{position:relative;float:left;width:186px;height:21px}.mLim a:hover{background-position:-182px -88px}.mLim em{display:none;position:absolute;width:52px;height:9px;left:5px;overflow:hidden;cursor:pointer;background-position:-246px -94px}.mLim a:hover em,.mLim .select em{display:block}.mLim .mLim_m em{background-position:-308px -94px;width:114px}.mLim .mLim_b em{width:176px;background-position:-370px -94px;}.mLimIntro{float:right;width:170px;padding:12px 0 0 12px;color:#999;background-position:-562px 0}.mLimTips{float:right;width:152px;margin-top:14px;padding:6px 14px;border:1px solid #F0E5BA;background:#FFFFCE}.mLimTips .SA{z-index:1;left:-22px;top:9px}.mLimTips .SA *{color:#F0E5BA}.mLimTips .SA span{color:#FFFFCE}.mLimLoad{display:none;width:160px;margin:20px auto;padding-left:20px;padding-bottom:0px;background-position:0 2px;background-color:transparent!important}');

	var tips = [_('筛选出你收听的原创内容，适合在忙碌时用'),'',_('混合了你订阅的名单的微博 适合在时间充裕的时候用'),_('因您还未订阅名单，无法放大，去看看') + '<a target="_blank"  style="margin:0 3px" href="http://t.qq.com/lists.php">' + _('热门名单')  + '</a>' + _('吧')],
		html = UI.html(MI.tmpl.volume)[0],
		downClass = 'btn_mdown',
		down = $$(html,'.' + downClass)[0],
		up = $$(html,'.btn_mup')[0],
		mLim = $$(html,'.mLim a'),
		intro = $$(html,'.mLimIntro')[0],
		tipWrap = $$(html,'.mLimTips')[0],
		tipBox = UI.GT(tipWrap,'p')[0],
		loading = $$(html,'.loading')[0],
		initializa = false,			//是否初始化
		rss,						//是否有订阅名单，如没有，值为0
		index=MI.user.fun.vol || 1;  //音量值
		
	//toggle
	function toggle(){
		if(!initializa) init();
		UI.toggle(html);
	}
	
	//第一次拉取
	function init(){
		UI.before(html,$('talkNew'));
		changeView(index);
		initializa = true;
	}

	//设置音量并拉取数据
	function setVol(n){
		if(index == n) return;
		toogleLoad(1)	
		UI.ajax({
			url : 'setvol.php',
			data : {vol:n},
			success : function(data){
				toogleLoad(0);
				data = MI.json(data);
				if(data.result == 0) {
					index = n;
					rss = data.info.rss; 
					changeView(n);
					setTips(n);
					MI.talkList.addNewly(data);
				}
				else {
					MI.alert(data.msg);
				}
			}
		})
	}	
	
	//切换loading和talkList状态
	function toogleLoad(k){
		var v = k ? 'hidden' : 'visible';
		loading.style.display = k ? 'block' : 'none';
		MI.talkList._more.style.visibility = v;
		MI.talkList._new.style.visibility = v;
		MI.talkList._body.style.visibility = v;
	}

	//改变音量条状态
	function changeView(n){
		UI.each(mLim,function(o,i){
			if(i<=n) {UI.addClass(o,'select');}	
			else {UI.removeClass(o,'select');}	
		});
	}

	//提示
	function setTips(n){
		clearTimeout(setTips.delay);
		clearInterval(setTips.anim);
		if(n==1) {
			UI.hide(tipWrap);
			UI.show(intro);
		}
		else {
			if(n==2 && rss==0) n=3;		//如果没有订阅名单，则显示第四个提示
			tipBox.innerHTML = tips[n];
			UI.hide(intro);
			UI.C(tipWrap,'opacity',1);
			UI.show(tipWrap);
			//setTips.anim = UI.animate(tipWrap,'opacity',1,function(){
				setTips.delay = setTimeout(function(){
					setTips.anim = UI.animate(tipWrap,'opacity',0,function(){
						UI.hide(tipWrap);
						UI.show(intro);
					},0.4);
				},5000);
			//},0.4);
		}
	}
	
	//增大减小按钮
	down.onclick = up.onclick = function(){
		var i = index + (this.className == downClass ? - 1 : 1);
		if(i>2) i=2;
		if(i<0) i=0;
		setVol(i);
		return false;
	}

	//音量条事件
	UI.each(mLim,function(o,i){
		o.onclick = function(e){
			UI.E(e).prevent();
			setVol(i);
		}
		o.onmouseover = function(){
			changeView(i);
		}
		o.onmouseout = function(){
			changeView(index);
		}
	})

	return {
		toggle:toggle
	}

})();

MI.listDrop = function(o){
	this._id = o.id;
	this.ctrlHtml = ['<a href="http://qun.t.qq.com/">' + _('去微群广场逛逛') + '</a>','<a href="http://t.qq.com/lists.php">' + _('广场') + '</a>|<a href="#" class="creatList" onclick="MI.viewListHide&&MI.viewListHide();MI.List.add();MI.Bos(\'btnListViewAdd\');return false">' + _('创建') + '</a>|<a href="http://t.qq.com/list_mine.php" onclick="MI.Bos(\'btnListViewAdmin\')">' + _('管理') + '</a>',''][o.type];
	this._html = '<div class="listDrop" style="display:none;"><div class="ldList"><a href="#" class="ld_btn pageUp" title="' + _('向上滚动') + '" style="display:none"><em></em></a><div class="ldListBox"><ul></ul></div><a href="#" class="ld_btn pageDown" title="' + _('向下滚动') + '" style="display:none"><em></em></a></div>' + (this.ctrlHtml ? '<p class="ctrlBar">' + this.ctrlHtml + '</p>' : '') + '</div>';
	this._listDropBtn = $(o.id);
	this._arrow = null;//UI.GT(this._listDropBtn,'em')[0];		//箭头
	this._selectedBtn = null;//$$(this._listDropBtn.parentNode,'.select')[0];	//当前选中的tab
	this._body = UI.html(this._html)[0];							
	//this._ctrlBar = $$(this._body,'.ctrlBar')[0];	//列表操作按钮
	this._pageUp = $$(this._body,'.pageUp')[0];		
	this._pageDown = $$(this._body,'.pageDown')[0];  
	this._addList =  $$(this._body,'.creatList')[0];  //添加列表
	this._listUl =  $$(this._body,'.ldListBox ul')[0];	
	this.delay= {};
	this.liHeight = 19; 
	this._type = o.type;
	this._tab = o.tab;
	this._dataUrl = o.url; //请求地址
	this.data = o.data || ''; //请求参数
	this.current = o.current; //当前项
	this._bos = o.bos;
	this.build();
}

MI.listDrop.box = {};
MI.listDrop.build = function(classStr){				//外部调用静态方法
	classStr = classStr || '.homeTab a';
	var btns = $$(classStr),
		dropList = {
			'home_mygroup_top':{	//微群
				type:0,
				url:MI.url.qunList,
				current:null,
				bos: $('headWrap') ? 'btnGroupView' : 'btnGroupViewNew',
				tab:_('我的微群')
			},
			'home_mylist_top':{		//名单
				type:1,
				url:MI.url.allMyList,
				current:MI.listDrop.current,
				bos:'btnListView',
				tab:_('我的名单')
			},
			'fav_myfav_top':{
				type:2,
				url:MI.url.favGroup,
				data : {op:4,type:1},
				current:MI.favCurrent,
				bos:'btnFavView',
				tab:_('更多')
			}
		};
	
	if(!btns) return;
	UI.each(btns,function(o){
			var id = o.parentNode.id;
			if(!id || !dropList[id] || !($$(o,'.btn_ldrop')[0] || $$(o,'.btn_drop')[0])) {
				return;
			}
			if(!MI.listDrop.box[id]) {
				dropList[id].id = id;
				MI.listDrop.box[id] = new MI.listDrop(dropList[id]);
			}
	});
	//MI.listDrop.filterBar();
};

//tab筛选栏（暂时注释掉，没用到，且与图片模式的有事件冲突，用的话还需要改一下）
/*MI.listDrop.filterBar = function(){
	var filterBar = $$('.filterBar1')[0],closeStr = 'filterBarClose',toggleBtn;
	if(filterBar) {
		toggleBtn = $$(filterBar,'.right a')[0];
		if(toggleBtn) {
			toggleBtn.onclick = function(){
				var isOpen = UI.hasClass(this,'flod')*1;
				UI.toggleClass(filterBar,closeStr);
				UI.toggleClass(toggleBtn,'flod');
				MI.Bos(isOpen ? 'btnFilterBarClose' : 'btnFilterBarOpen');
				toggleBtn.innerHTML  = '<em class="arrow1"></em>' + (isOpen? _('展开') : _('收起'));
				MI.ajax({
					url:MI.url.userBit,
					data:{t:108,v:isOpen},
					success : function(data){
					}		
				});
				return false;
			}
		}
	}
};*/


MI.listDrop.prototype = {
	listId : {}, //存储数据
	call : null, //加载完的回调函数
	isLab : 1,
	load :function(id){
		var Self = this;
		UI.addClass(Self._listUl,id);
		if(Self.listId[id] && Self._listUl.innerHTML) {
				Self.show(Self.listId[id]);
				return;
		}
		else {
			//请求
			MI.app({List:null});
			var Time,Time_1,Time_2,Time_3;
			Time = + new Date();
			MI.ajax({
				url : Self._dataUrl,
				data : Self.data,
				success : function(data){
					Time_1 = + new Date() - Time;
					data = MI.json(data);
					if (data.result == 0) {
						Self.listId[id] = data;
						Self.show(data);
					}
					//Speed
					Time_2 = + new Date() - Time;
					setTimeout(function(){
						Time_3 = + new Date() - Time;
						MI.Speed('t_asyn_mylist',1,Time_1,Time_2,Time_3);
					},0);
				}
			});
		}
	},
	show : function(data){
			var Self = this;
			Self._listUl.innerHTML = data.info;
			//Self._ctrlBar.style.display = Self._type ? '' : 'none'; //微群不显示按钮
			if(Self._type == 1) Self._addList.style.display = data.canCreate ? '' : 'none'; //能否创建新名单

			UI.addClass(Self._listDropBtn,'select');
			UI.addClass(Self._arrow,'lopen');
			UI.show(Self._body);
			Self.pos();
			Self.page(0);
			

			var a = $$(Self._listUl,'a');
			if(Self.current) {
				UI.each(a,function(o,i){
					if (UI.A(o,'href').hasString(Self.current)){
						//UI.addClass(o.parentNode,'select');
						UI.C(o,'color','#ccc');
						UI.C(o,'backgroundColor','#fff');
						UI.C(o,'cursor','default');
						o.onclick = function(){return false;}
					}
				});

				if(Self._type ==1) {
					UI.prepend(UI.html('<li class="select"><a title="' + Self._tab + '" style="color:#333">' + Self._tab + '</a></li>')[0],Self._listUl);
				}
			}	
			if (Self.call){
				Self.call();
			}

			MI.Bos(Self._bos);	
			try{
				a[0].focus();
			}catch(e){}
	},
	hide : function(){
		var Self = this;
		Self.delay.hide = setTimeout(function(){
			UI.hide(Self._body);
			UI.removeClass(Self._arrow,'lopen');
			if(Self._listDropBtn != Self._selectedBtn) UI.removeClass(Self._listDropBtn,'select');
			if (Self.hideCall){
				Self.hideCall();
			}
		},200);	
	},
	pos : function(){
		var Self = this,P = Self._listDropBtn,PP = P.parentNode,liHeight,listHeight,windowHeight;
		Self._body.style.left = UI.getX(P) + 'px';
		Self._body.style.top = UI.getY(P) + UI.height(P) + 'px';
		Self._listUl.style.height = 'auto';

		listHeight = UI.height(Self._body);
		//windowHeight = UI.windowHeight() - (Self.isLab ? 65 : 40) - 100 - UI.getY(PP);
		windowHeight = UI.windowHeight() + UI.scrollY() - UI.getY(P) - (Self.isLab ? 65 : 40);
		if (windowHeight < 210){
			windowHeight = 210;
		}
		if(!UI.hasClass(document.body,'ipad') && listHeight > windowHeight){
			liHeight = UI.height($$(Self._listUl,'a')[0]);
			Self._listUl.style.cssText += ';overflow:hidden;height:' + liHeight * (windowHeight / liHeight - 1) + 'px';
		}
		Self.liHeight = liHeight;
	},
	build :function(){
		var Self = this,
			o = UI.GT(Self._listDropBtn,'a')[0];

			Self._arrow = UI.GT(Self._listDropBtn,'em')[0];		//箭头
			Self._selectedBtn = $$(Self._listDropBtn.parentNode,'.select')[0];	//当前选中的tab

			UI.append(Self._body,document.body);
			
			o.onmouseover = function(){
				Self.beforeShow(this.parentNode.id);
				if (Self.mouseover){
					Self.mouseover();
				}
			};	
			o.onmouseout = Self._body.onmouseout =  function(){
				Self.hide();
				clearTimeout(Self.delay.load);
			};
	
			Self._body.onmouseover = function(){
				if (Self.mouseover){
					Self.mouseover();
				}
				clearTimeout(Self.delay.hide);
			}

			if(Self._type ==1) o.onclick = function(){
					Self.beforeShow(this.parentNode.id);
					return false;
			};	

		Self.pageEvent();
	},
	beforeShow : function(id){
		var Self = this;
		clearTimeout(Self.delay.hide);
		clearTimeout(Self.delay.load);
		Self.delay.load = setTimeout(function(){
			Self.load(id);
		},100);
	},
	pageEvent : function(){
		var Self = this,
		_pageUp = Self._pageUp,_pageDown = Self._pageDown,liHeight = Self.liHeight;

				_pageUp.onmousedown = function(){
					Self.page(-liHeight);
					Self.delay.page = setInterval(function(){
					Self.page(-liHeight);
					},100);
					return false;
				}
				_pageDown.onmousedown = function(){
					Self.page(liHeight);
					Self.delay.page = setInterval(function(){
						Self.page(liHeight);
					},100);
					return false;
				}
				_pageUp.onclick = _pageDown.onclick = _pageUp.onmouseup = _pageDown.onmouseup = function(){
					clearInterval(Self.delay.page);
					return false;
				}
				var pageScroll = function(e){
					var E = UI.E(e);
					if (E.wheel == 1){
						Self.page(-liHeight);
					}
					else {
						Self.page(liHeight);
					}
					E.prevent();
				}
				UI.EA(Self._listUl.parentNode.parentNode,'mousewheel',pageScroll);
				if (!UI.B.ie){
					Self._listUl.parentNode.parentNode.onmousewheel = pageScroll;
				}
	},
	page : function(action){
		var Self = this,
			height = UI.height(Self._listUl),
			totalHeight = Self._listUl.scrollHeight,
			scrollTop = Self._listUl.scrollTop + action || 0;
		Self._listUl.scrollTop = scrollTop;

		if (Self._listUl.scrollTop > 0){
			UI.show(Self._pageUp);
		}
		else {
			UI.hide(Self._pageUp);
			clearInterval(Self.delay.page);
		}
		if (height + scrollTop < totalHeight){
			UI.show(Self._pageDown);
		}
		else {
			UI.hide(Self._pageDown);
			clearInterval(Self.delay.page);
		}
	}
};


MI.badge = {
	appended : 0,
	delay : 0,
	build : function() {
		var Self = this;
		if (MI.user.account){
			Self.badges = $$('.ico_badge');
			UI.each(Self.badges, function(o) {
						o.onmouseover = function() {
							var T = this;
							clearTimeout(Self.delay);
							Self.delay = setTimeout(function() {
										Self.show(T);
									}, 200);
						}
						o.onmouseout = function() {
							clearTimeout(Self.delay);
							Self.delay = setTimeout(function() {
										Self.hide();
									}, 200);
						}
					});
		}
	},
	show : function(el) {
		var Self = this, data = '', id = UI.A(el, 'rel'), isSet = UI.A(el, 'isSet'), user = UI.A(el,
				'user');
		if (!Self.appended) {
			Self._body = UI
					.html('<div class="badgeTips"><div class="SA" style="position:absolute"><em>◆</em><span>◆</span></div><div class="badgeCnt"></div></div>')[0];
			Self._cont = $$(Self._body, '.badgeCnt')[0];
			Self._arrow = $$(Self._body, '.SA')[0];
			UI.hide(Self._body);
			UI.append(Self._body, document.body);
			Self.appended = 1;

			// Event
			Self._body.onmouseover = function() {
				clearTimeout(Self.delay);
				UI.show(this);
			}
			Self._body.onmouseout = function() {
				Self.delay = setTimeout(function() {
							Self.hide();
						}, 200);
			}
		}

		if (id) {
			data += 'mid=' + id + '&';
		}
		if (isSet) {
			data += 'isSet=1&';
		}
		if (user) {
			data += 'u=' + user + '&';
		}
		UI.hide(Self._body);
		if (Self.cache[id]) {
			Self.position(el, Self.cache[id]);
		} else {
			MI.ajax({
				url : MI.url.medal,
				type : 'get',
				data : data,
				success : function(data) {
					//data = '{result:0,msg:"成功",info:{html:\'<div class="bIntro clear"><div class="ico_badge badge_sj"><em></em><span><b></b></span></div><div class="left"><p><b>手机达人</b></p><p class="bLevel">您在一周内发表过手机微博，获得手机达人称号</p></div></div><div class="bUpIntro"><p>如果连续一周都没有用手机发表过微博，手机勋章会自动熄灭哦</p></div>\'}}';
					data = MI.json(data);
					if (data.result == 0) {
						Self.cache[id] = data;
						Self.position(el, data);
					}
				}
			});
		}
	},
	hide : function() {
		UI.hide(this._body);
	},
	position : function(el, data) {
		var Self = this,
			y = UI.getY(el),
			x = UI.getX(Self.badges[0]),
			X = UI.getX(el),
			offsetX = 0;	//偏移量
		if(MI.hostType == 2) {	//校园微博
			offsetX = 160;
		}
		el.title = '';
		Self._body.style.cssText = 'top:' + y + 'px;left:'
				+ (x + offsetX) + 'px;';
		Self._arrow.style.margin = '0 0 0 ' + (X - x - offsetX) + 'px';
		Self._cont.innerHTML = data.info.html;
	},
	cache : {}
}
MI.autoMore = function(){
	var maxTimes = 2,moreDelay,getMore = function(){
		clearTimeout(moreDelay);
		setTimeout(more,200);
	};
	function more(){
		if (MI.talkList.moreTimes < maxTimes && UI.pageHeight() - UI.scrollY() - UI.windowHeight() < 700) {
			MI.talkList.more(1);
		}
		if (MI.talkList.moreTimes >= maxTimes) {
			if (!MI.user.fun.autoMoreContinue){
				UI.ER(window,'scroll',getMore);
			}
			UI.show('pageSetLink');
		}
	}
	UI.EA(window,'scroll',getMore);
}
MI.linkBoss = function(){ //Link Boss
	setTimeout(function(){
		var link = $$('#UIn a,.SM a,.mobileBox a,.proposal a'),hotTopic = $$('#hotTopic li'),topMenu = $$('.topMenu a'),topNewMenu = $$('.topNav a');
		UI.each(link,function(o,i){
			UI.EA(o,'mousedown',function(){
				//新增听众数、我的主页，提到我的页面，私信，新旧导航分开布码
				if(topNewMenu.length != 0 && (i==7 || i==11 || i==13 || i==16)){
					MI.Bos('btnNewMenuSide' + i);
				}
				else
					MI.Bos('btnSide' + i);
			});
			o.onmousemove = function(){
				UI.A(this,'hideFocus','true');
				this.onmousemove = null;
			};
		});
		UI.each(hotTopic,function(o,i){
			o.onmousedown = function(){
				var a = $$(this,'a')[0];
				if (a){
					var url = a.getAttribute('href',2).replace(/http:\/\/t.qq.com/g,'');
					//MI.Bos('btnHotTopicList',i + ',' + url,1,1125);
					MI.Bos({
						name : 'btnHotTopicList',
						iBak1 : i,
						sBak1 : url,
						id : 1158
					});
					MI.Bos('btnHotTopicList',url.replace(/\/k\//g,''));
				}
			}
		});
		UI.each(topMenu,function(o,i){
			UI.EA(o,'mousedown',function(){
				MI.Bos('btnTopMenu_' + (i + 1));
			});
		});
		UI.each(topNewMenu,function(o,i){
			UI.EA(o,'mousedown',function(){
				MI.Bos('btnTopNewMenu_' + (i + 1));
			});
		});
	},2000);
	/*setTimeout(function(){ //百度等第三方来源上报
		var ouin = MI.Uin(),
			sOp = UI.cookie('pgv_r_cookie') || '',
			url = UI.parseUrl(),
			sSource = url.semsource || '',
			SKeyword = url.semkeyword || '',
			img = new Image();
		if (sSource){
			img.src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=&sOp=' + sOp + '&iSta=&iTy=315&iFlow=&sSource=' + sSource + '&SKeyword=' + SKeyword;
		}
	},3000);*/
}
MI.sFollow = function(id,el,call){
	var className = 'foLight',follow = UI.hasClass(el,className) ? 0 : 1;
	if (!el.sending) {
		MI.ajax({
			url : MI.url.sFollow,
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
}
MI.Note = {
	_body : null, // 设置框
	_user : null, // 设置框用户昵称
	_target : null, // 目标Dom
	title : '', // 用户title
	account : '', // 用户帐号,
	updateClassName : '.AL .msgBox .userName a,.AL .msgBox .msgCnt a',
	updateName : function(nick,title){
		var Self = this,
			newTitle = nick + '(@' + (Self.chName || Self.account) + ')';
		UI.each($$(MI.Note.updateClassName),function(o){
			if (o.title == title){
				o.innerHTML = nick;
				o.title = newTitle;
			}
			else if (UI.A(o,'rel') == title){
				o.innerHTML = nick;
				UI.A(o,'rel',newTitle);
			}
		});
		Self.title = newTitle;
	},
	add : function(el,call){
		var Self = this;
		Self.nick = UI.A(el,'nick') || '';
		Self.account = UI.A(el,'account') || '';
		Self.chName = UI.A(el,'chName') || '';
		Self.note = UI.A(el,'note') || '';
		Self.call = call;
		Self.title = (Self.note || Self.nick) + '(@' + (Self.chName || Self.account) + ')';
		if (!Self._body){
			//UI.css('.Dnick{width:253px;padding:0 0 10px 5px}.Dnick h4 b{margin:0 4px}.Dnick .funBox{padding:6px 0 2px}.Dnick .inputTxt{width:180px}.Dnick .btn1{margin-left:5px}');
			Self._body = UI.html('<div class="Dnick">\
				<form action="' + MI.url.bkName + '" method="post" id="addNoteForm" onsubmit="return false">\
					<h4>' + _('对<b></b>添加备注') + '：</h4>\
					<span><input name="u" id="u" value="" type="hidden"><input name="op" id="op" value="0" type="hidden"></span><b></b>\
					<div class="funBox"><input name="bk" id="bk" type="text" class="inputTxt" value="' + Self.note + '"><button type="submit" class="btn1">' + _('保存') + '</button></div>\
					<div class="error">&nbsp;</div>\
				</form>\
			</div>')[0];
			Self._user = $$(Self._body,'b')[0];
			MI.app({
				Validate : function(){
					setTimeout(function(){
						new MI.Validate({
							id : 'addNoteForm',
							inputs : {
								bk : {
									noIco : true,
									rule : function(str){
										var length = str.length,w=str.split('');
										if (str.match(/[^\u4e00-\u9fa5\w-]/g)) return _('仅支持中文、字母、数字、下划线或减号');
										if (length > 12) return _('仅支持{0}个中文、字母、数字、下划线或减号','1-12');
									}
								},
								u : {noIco : true},
								op : {noIco : true}
							},
							messages : function(el){
								return UI.next(el.parentNode);
							},
							success : function(data){
								setTimeout(function(){
									MI.tip(_('添加成功'));
								},0);
								var note = $('bk').value;
								if (Self.call){
									data.bkname = note;
									Self.call(data);
								}
								else {
									var P = Self._target.parentNode.parentNode;
									if (UI.hasClass(P,'nickFun')){
										if (note){
											UI.addClass(P,'nickFunDis');
										}
										else {
											UI.removeClass(P,'nickFunDis');
										}
									}
									Self._target.innerHTML = note || _('添加备注');
									UI.A(Self._target,'note',note);
									var o = MI.Card.users[Self.account];
									if (o){
										o.bkname = note;
									}
								}
								Self.updateName(note || Self.nick,Self.title);
								
								//Clear Time For At AutoCmt
								MI.S('time',0);
							}
						});
					},100);
				}
			});
		}
		Self._target = el;
		Self._user.innerHTML = Self.nick;
		MI.dialog.show({
			title : '',
			width : 290,
			html : Self._body,
			start : function(){
				$('u').value = Self.account;
				$('bk').value = Self.note;
				MI.focus($('bk'));
			}
		});
		MI.Bos('btnNoteAdd');
	}
}
MI.black = function(o){
	var btn,
		blackDel = 'blackDel',
		isBlack = UI.hasClass(o.target,blackDel) ? 1 : 0,
		type = isBlack ? 'un' : '',
		url = isBlack ? MI.url.unblock : MI.url.block,
		txt = [_('拉黑名单'),_('取消拉黑')];
	if (!MI.black[type + 'black']){
		MI.black[type + 'black'] = UI.html(new UI.tmplString(MI.tmpl[type + 'black'])(o))[0];
	}
	MI.dialog.show({width:420,html:MI.black[type + 'black']});
	o.txt = UI.isUndefined(o.txt) ? 1 : o.txt; //Change Btn's Text
	if (UI.isArray(o.txt)) {
		txt = o.txt;
	}
	btn = $$(MI.black[type + 'black'],'input')[0];
	try{
		btn.focus();
	}catch(e){}
	btn.onclick = function(){
		var Self = this;
		if (!Self.sending) {
			MI.ajax({
				url : url,
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
						MI.alert(data.msg);
					}
					Self.sending = 0;
				}
			});
			Self.sending = 1;
		}
	}
}
/**
 * 确认提示
 * 
 * @param {Object} Object 确认配置
 *            @example
 *            MI.confirm({
 *                type : 'success',
 *                title : '标题',
 *                content : '内容',
 *                width : 330, //建议不设置，默认330
 *                confirmTxt : '下一步',
 *                confirm : function(){ //确认的回调函数
 *                    
 *                },
 *                cancelTxt : '取消',
 *                cancel : function(){ //取消的回调函数
 *                    
 *                }
 *            });
 */
MI.confirm = function(obj){ //obj = {type:'success',title:'',content:'',confirmTxt:'下一步',confirm:function(){},cancelTxt:'取消',cancel:function(){}}
	var str;
	if(obj) {
		obj.type = obj.type ==  'success' ? 's' : 'e';
		obj.title = obj.title || '';
		obj.content = obj.content || '';
		obj.confirmTxt = obj.confirmTxt || _('确定');
		obj.cancelTxt = obj.cancelTxt || _('取消');
		obj.width = obj.width || 330;
		if (MI.confirm.html) {
			UI.remove(MI.confirm.html);
			MI.confirm.html = null;
		}
		MI.confirm.html = UI.html('<div class="blackTip" style="width:' + obj.width + 'px"><h2><span class="ico_tsW"><span class="ico_t' + obj.type + '"></span></span>' + obj.title + '</h2><p>' + obj.content + '</p><p><input type="button" value="' + obj.confirmTxt + '" id="__confirmBtn__" /><input type="button" value="' + obj.cancelTxt + '" id="__cancelBtn__" /></p></div>')[0];
		MI.dialog.show({
			html : MI.confirm.html,
			width : obj.width + 80
		});
		if (obj.confirm) {
			$('__confirmBtn__').onclick = obj.confirm;
		}
		$('__cancelBtn__').onclick = function(){
			MI.dialog.hide();
			if (obj.cancel) {
				obj.cancel.apply(this);
			}
		}
		setTimeout(function(){
			$('__confirmBtn__').focus();
		},100);
	}
}

MI.TalkList.prototype.levelTips = function(tips){
	var target = this,
		data = {mid:'10243'},
		user = UI.A(this,'user');
	if (user){
		data.u = user;
	}
	MI.ajax({
		url:MI.url.medal,
		data:data,
		type:'get',
		success : function(data){
			data = MI.json(data);
			 if(data.result==0){
			 	var num = data.info.html;
				tips.innerHTML = '<div>' +  num +'</div>';
				UI.show(tips);
				MI.tips.position(target);
				MI.Bos('btnCheckLevel');
			 }
		}
	 });
}

MI.Flash = {
	version : 0,
	getObject : function(o,src,width,height) {
		var html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+width+'" height="'+height+'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0"><param name="allowScriptAccess" value="always" /><param name="movie" value="'+src+'" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><embed src="'+src+'" width="'+width+'" height="'+height+'" quality="high" wmode="transparent" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowScriptAccess="always" type="application/x-shockwave-flash"/></object>';
		if (o){
			o.innerHTML = html;
		}
		else {
			return html;
		}
	},
	getVersion : function(){
		var v = '0',n = navigator,tmpV;
		if(this.version) return this.version;
		if(n.plugins && n.plugins.length) {
			UI.each(n.plugins,function(o){
				if(o.name.hasString('Shockwave Flash')){
					tmpV = parseFloat(o.description.split('Shockwave Flash')[1]);
					v = Math.max(tmpV,v);  //可能装有多个flashPlayer播放器
				}
			})
		}
		else if (window.ActiveXObject) {
			for(var i = 7;i<13;i++){
				try{
					var f = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + i + "');");
					if(f) {v = f.GetVariable("$version").split('WIN')[1].replace(/\,/g,'.')};
				}
				catch(e){};
			}
		}
		this.version = parseFloat(v);
		return this.version;		   
	},
	updateTip : function(version){
		var v = this.getVersion(),html,version=version || '';
		html = '<div class="flashVersion"><p>';
		html += v ? _('你当前的FlashPlayer播放器版本是{0}，<br>低于此功能所需版本{1}',v,version) :  _('你的系统中没有安装FlashPlayer播放器'); 
		html += _('，请更新播放器版本后再试');
		html += '</p><p><a target="_blank" href="http://get.adobe.com/cn/flashplayer/">' + _('点此链接下载最新版') + '</a></p></div>';
		return html;
	}
}



MI.SmartBox = function(id,callback,type,style){ //input element,callback,search type (keyword:用户输入的关键字提示,布尔值,可以为空）
	if(id && UI.isString(id)) {
		this._key = $(id);
		if(!this._key) {
			return;
		}
	} else if(UI.isElement(id)) {
		this._key = id;
	} else {
		return false;
	}
	var Self = this,
		delay;
	this._callback = callback?callback:null;
	this.url = MI.url.smartBox;//smartbx统一服务接口
	this._type = type?type:'';//数据类型
	this._fix = UI.B.ie?[0,0]:[1,2];//用于修复ie，ff下的位置
	this.param = 'key=%key%';
	this._valTip = !!style.type;
	//根据是否客人页，传递不同的参数
	this._query = (MI.guest)
			? UI.html('<span><input type="hidden" id="label" name="label" value="8" /><input type="hidden" id="uname" name="uname" value=' + MI.guest.user + '></span>')[0]
			: UI.html('<span><input type="hidden" id="label" name="label" value="8" /><input type="hidden" id="poster" name="poster" value="2" /></span>')[0];
	// smartBox给后台传递参数设置
	this._queryAll = UI.html('<input type="hidden" class="pos" name="pos"/>')[0];	
	//微群搜索页参数
	this._queryQun = UI.html('<input type="hidden" id="from" name="from" value="smart" />')[0];
	this._style = style?style:{left:0,top:0,width:306};
	this._pos = { //获取smartbox input 坐标
		x : UI.getX(this._key),
		y : UI.getY(this._key)
	};
	//找到搜索form，以方便重定义action
	var temp=null;
	if(this._key.parentNode.id=='searchForm' || this._key.parentNode.id=='userKeyForm') temp = this._key.parentNode;
	else if(this._key.parentNode.id=='f1') temp = this._key.parentNode;
	this._form = temp;
	//初始化smartbox容器
	this._select = UI.html('<div class="smartBox" style="display:none"></div>')[0];
	this._ldrop = $$('#searchForm .btn_ldrop')[0];
	this._list = [];//消息条数
	this.s = [];//存放结构
	this._isBoss = 0;//是否统计上报搜索操作（页面右上角主搜索）
	if(Self._form){
		if(UI.hasClass(Self._form.parentNode,'tSearchNew'))
			Self._isBoss = 1;
		else if(UI.hasClass(Self._form.parentNode,'tSearch'))
			Self._isBoss = 2;					
	}
	UI.append(this._select,document.body);
	this._key.blur();
	//Self.hide();
	//右侧搜索框点击小三角，出现历史搜索和订阅搜索
	if(Self._style.history == 1){
		if(Self._ldrop){
			Self._ldrop.onclick = function(e){
				if(Self._form){
					if(Self._isBoss == 1){
						MI.Bos('btnClickHistoryNew');
					}
					else if(Self._isBoss == 2)
						MI.Bos('btnClickHistoryOld');						
				}
				var E = UI.E(e);
				E.stop();
				clearTimeout(delay);
				if(!UI.hasClass(Self._ldrop,'lopen')){
					Self.getHistory();
					UI.addClass(Self._ldrop,'lopen');
				}
				else {
					MI.focus(Self._key);
					UI.removeClass(Self._ldrop,'lopen');
				}
				return false;
			}
		}
	}
	this._tip = this._key.previousSibling,this.tip = this._tip && this._tip.nodeName == 'LABEL';
	if (this.tip) {
		if(this._key.value){
			UI.hide(this._tip);
		}
		this._tip.onclick = function(){
			Self._key.focus();
		}
		if(MI.boss == 13) Self._tip.innerHTML =  _('搜我的广播/搜全站');
		else if(MI.guest) Self._tip.innerHTML =  _(MI.string.sprintf('搜%s的广播/搜全站',MI.guest.sex));
	}

	UI.EA(document.body,'click',function(){
		Self.hide();
	});
	/*UI.EA(window,'resize',function(){
		Self.resize();
	});*/
	UI.EA(this._key,'focus',function(){
		if (Self.tip) {
			UI.hide(Self._tip);
		}
		if(!Self.isDisplay) Self.hide();
		Self.getMsg(Self._key.value);
	});
	UI.EA(this._key,'blur',function(e){
		var target = UI.E(e).target;
		if(Self.tip && !target.value){
			UI.show(Self._tip);
		}
		delay = setTimeout(function(){
			Self.hide();
		},500);

		//add by xiaokangran
		if(Self._style.onblur && UI.isFunction(Self._style.onblur)){
			Self._style.onblur(e);
		}
	});

	/*this._key.onblur = function(){
		if(!this.value) UI.show(UI.prev(this));
	}*/
	this._key.onbeforeeditfocus = function(){
		if(!Self.isDisplay) Self.hide();
	}
	this._key.onclick = function(e){
		UI.E(e).stop();

		//add by xiaokangran
		if(Self._style.onclick && UI.isFunction(Self._style.onclick)){
			Self._style.onclick(e);
		}
	}
	this._key.onkeydown = function(e){
		var E = UI.E(e);
		//document.title = Self.isDisplay;
		if(!Self.isDisplay){
			if(UI.trim(this.value)){
				if(Self._list.length > 0 && (E.key == 40 ||E.key == 38)){
					Self.show();
				}else{
					Self.getMsg(this.value);
				}
			}
			//add by xiaokangran
			if(Self._style.onkeydown && UI.isFunction(Self._style.onkeydown)){
				return Self._style.onkeydown(e, Self);
			}
			return;
		}
		if (E.key == 40 || E.key == 38) {
			Self.removePara();
			if(Self._form != null) {
				Self._form.action="http://t.qq.com/search/index.php";
				if (Self._style.isnano)
				{
					Self._form.action="http://1.t.qq.com/search/message.php";
				}
			}
			if (E.key == 38) {
				Self.index = (Self.index - 1 < 0) ? (Self.indexMax) :(Self.index - 1);
			}else if (E.key == 40) {
				Self.index = (Self.index + 1 > Self.indexMax) ? 0 :(Self.index + 1)
			}
			if(Self._valTip){
				var parentNodePos = $$(Self._key.parentNode,'.pos')[0];
				for(var n = 0,l = Self._list.length; n < l; n++ ){
					UI.removeClass(Self._list[n],'on');
				}
				if(UI.hasClass(Self._list[Self.index],'special') || UI.hasClass(Self._list[Self.index],'speak')) {
					if(UI.hasClass(Self._list[Self.index],'special')){
						UI.after(Self._query,Self._key);
						UI.A($$(Self._key.parentNode,'.pos')[0],'value','173');
					}
					else UI.A(parentNodePos,'value','174');
					this.value = UI.text($$(Self._select,'span')[0]);
				}else if(UI.hasClass(Self._list[Self.index],'searchUser')){
					UI.A(parentNodePos,'value','176');
					this.value = UI.text($$(Self._select,'span')[0]);
					if(Self._form != null) {
						Self._form.action="http://t.qq.com/search/user.php";
						if (Self._style.isnano) {
							Self._form.action="http://1.t.qq.com/search/user.php";
						}	
					}
				}else{
					if(UI.hasClass(Self._list[Self.index],'searchQun')){
						UI.A(parentNodePos,'value','178');
						UI.after(Self._queryQun,Self._key);
						this.value = UI.text($$(Self._select,'span')[0]);
						if(Self._form != null) Self._form.action="http://t.qq.com/search/qun.php";
					}
					else{
						if(UI.hasClass(Self._list[Self.index],'qunGet') || UI.hasClass(Self._list[Self.index],'userGet')){
							UI.A(parentNodePos,'value','0');
							var uname = UI.A(Self._list[Self.index],'name');
							var value = UI.A(Self._list[Self.index],'value');
							var index = value.indexOf('<a');
							this.value = (index == -1) ? value : value.substring(0,index);
							if(UI.hasClass(Self._list[Self.index],'qunGet')){
								if(Self._form != null) Self._form.action='http://qun.t.qq.com/' + uname + '?from=smart';
							}
							else if(UI.hasClass(Self._list[Self.index],'userGet')){
								if(Self._form != null) {
									Self._form.action='http://t.qq.com/' + uname;
									if (Self._style.isnano){
										Self._form.action="http://1.t.qq.com/" + uname;
									}
								}
							}
						}
						else{
							UI.A(parentNodePos,'value','174');
							this.value =(Self._list[Self.index].nodeName == 'DT') ? UI.text($$(Self._list[Self.index],'span')[0]) : UI.text(Self._list[Self.index]);
						}
					}
				}
			}else{
				this.value = UI.text(Self._list[Self.index]);
			}
			Self.select(Self.index);
		}else if (E.key == 13 || E.key == 27) { //Space Key : || E.key == 32 || E.key == 229
			if (E.key == 27) {
				Self.hide();
			}
			else {
				Self.select();
			}
		}

		//add by xiaokangran
		if(Self._style.onkeydown && UI.isFunction(Self._style.onkeydown)){
			return Self._style.onkeydown(e, Self);
		}
	}
	this._key.onkeyup = function(e){
		var E = UI.E(e);
		//添加操作boss上报
		if(E.key == 13){
			if(Self._form){
				if(Self._isBoss == 1){
					MI.Bos('btnSubmitSearchNew');
				}
				else if(Self._isBoss == 2){
					MI.Bos('btnSubmitSearchOld');
				}
			}	
		}
		if(E.key == 40 || E.key == 38 || E.key == 13 || E.key == 27) return;
		Self.getMsg(this.value);
	}
}
MI.SmartBox.prototype = {
	//keyword : '',
	lastOrigin : null,
	isDisplay : false,
	timer : null,
	index : -1,
	indexMax : 0,
	cache : [], //存放搜索结果cache
	hide : function(){
		if(this._ldrop){		
			UI.removeClass(this._ldrop,'lopen');
		}		
		UI.hide(this._select);
		this.isDisplay = false;
	},
	show : function(){
		if (!MI.user.fun.search) {
			return;
		}
		this.resize();
		UI.show(this._select);
		this.isDisplay = true;
	},
	select : function(index){
		this.index = index;
		if (this._list[this.index]) UI.addClass(this._list[this.index],'on');
		if (this.lastOrigin) UI.removeClass(this.lastOrigin,'on');
		this.lastOrigin = this._list[this.index];
	},
	resize : function(){
		var a = {
			x : UI.getX(this._key),
			y : UI.getY(this._key)
		}
		this._pos = a;
		this._select.style.width = this._style.width + 'px';
		this._select.style.left = this._pos.x + this._style.left + this._fix[0] + 'px';
		this._select.style.top = this._pos.y + this._key.offsetHeight + this._style.top - this._fix[1] + 'px';
	},
	//移除键盘上下或者鼠标按下smartBox内选项的时候，改变pos参数的值，去掉默认的搜索框pos参数
	removePara : function(){
		var pos = $('pos');
		if(pos) UI.remove(pos);
		var posInput = $$(this._key.parentNode,'input');
		if(posInput){
			UI.each(posInput,function(o){
				if (UI.A(o,'name') && UI.A(o,'name')=='pos'){
					if(UI.A(o,'value')){
						t = UI.A(o,'value');
						if(t=='172' || t=='401' || t=='201' || t=='28'){
							UI.remove(o);
						}
					}
				}
			});
		}
		UI.after(this._queryAll,this._key);
	},
	getMsg : function(value){
		var Self = this;
		//document.title = UI.trim(value);
		//if(tmp == this.keyword){
		if(!UI.trim(value)){
			Self.hide();
			//this.keyword = tmp;
			return;
		}
		//}
		//this.keyword = UI.trim(value);
		var param = this.param.replace(/\%key\%/g,encodeURIComponent(value));
		value = MI.string.html(value);
		if(this.timer)	clearTimeout(this.timer);
		if(this._type == 'music'){
			this.timer=window.setTimeout(function(){
				UI.getScript(Self.url+"?"+param);
			},150);
		}else{
			//做页面缓存
			var id = UI.A(Self._key,'id');
			if(Self.cache[value] && Self.cache[value][id]){
				var data = Self.cache[value][id];
				Self.buildDom(data,value);
			}
			else{
				this.timer=window.setTimeout(function(){
					MI.ajax({
						url : Self.url,
						type : 'get',
						data : param,//"key=" + encodeURIComponent(value),
						success : function(data){
							var data = MI.json(data);
							Self.cache[value]=[];
							Self.cache[value][id]= data;//搜索缓存,存放：搜索关键字，搜索框id，以及搜索json结果
							Self.buildDom(data,value);
						}
					});
				},150);
			}
		}
	},
	//构建smartBox内dom元素
	buildDom : function(data,value){
		var Self = this;
		if (data.result == 0) {
			Self.s = [];
			var len1=0, len2=0, len3=0, len=0;
			var typePage = (MI.boss == 13 || MI.boss == 7) ? _('搜全站广播：') : _('搜广播：');
			var total = '<dt class="speak">' + typePage + '<span index="0" value=\"'+ value +'\" class="cSign">'+value+'</span></dt>'; 
			var localMy = '<dt class="special">' + _('搜我的广播：') + '<span index="1" value=\"'+ value +'\" class="cSign">'+value+'</span></dt>'; 
			var txt,localHis;
			if(MI.guest){
				txt = _(MI.string.sprintf('搜%s的广播: ',MI.guest.sex));
				localHis = '<dt class="special">' + txt +'<span class="cSign" index="1" value=\"'
														+ value
														+ '\">'
														+ value
														+ '</span></dt>';
			}
			var localUser = '<dt class="searchUser">' + _('搜用户：') +'<span class="cSign" index="1" value=\"'
														+ value
														+ '\">'
														+ value
														+ '</span></dt>';
			var localQun = '<dt class="searchQun">' + _('搜微群：') +'<span class="cSign" index="1" value=\"'
														+ value
														+ '\">'
														+ value
														+ '</span></dt>';	
			Self.s.push(Self._valTip ? '<dl class="s1">' : '');
			//搜用户,灰度用户不显示搜用户
			if(data.info.user && Self._type !== 'group'){
				Self.s.push(Self._valTip? localUser : '');
				len2 = data.info.user.length;
				if(len2 != 0){
					Self.s.push(Self._valTip? '<dd><ul class=\"uList\">' : '');
					UI.each(data.info.user,function(o,i){
						Self.s
								.push(Self._valTip
										? '<li class=\"userGet\" value=\"'
												+ o.nick
												+ '\" name=\"' + o.account
												+'\"><div class=\"userPic\"><img src=\"'
												+ o.src
												+ '\"></div><div class=\"userInfo\"><span class=\"userName\">'
												+ o.nick
												+ '</span><span class=\"userId\">@'
												+ o.account
												+ '</span></div>'
												+ '</li>'
										: '');
					});
					Self.s.push(Self._valTip? '</ul></dd>' : '');
				}
			}
			else len2 = -1;
			//搜用户结束
			//搜微群	
			if(!Self._style.isnano && data.info.qun){
				Self.s.push(Self._valTip? localQun : '');
				len3 = data.info.qun.length;
				if(len3 != 0){
					Self.s.push(Self._valTip? '<dd><ul class=\"uList\">' : '');
					UI.each(data.info.qun,function(o,i){
						Self.s
								.push(Self._valTip
										? '<li class=\"qunGet\" value=\"'
												+ o.nick
												+ '\" name=\"' + o.id
												+'\"><div class=\"userPic\"><img src=\"'
												+ o.src
												+ '\"></div><div class=\"userInfo\"><span class=\"userName\">'
												+ o.nick
												+ '</span><span class=\"userId\">' + _('成员')
												+ o.num + _('人')
												+ '</span></div>'
												+ '</li>'
										: '');
					});
					Self.s.push(Self._valTip? '</ul></dd>' : '');
					len3 += 1;
				}
				else
					len3 = 1;
			}
			//搜微群结束
			var data2=[];
			data2 = (data.info.msg) ? data.info.msg : data.info; //兼容不同接口返回不同格式的数据
			if(data2.length != 0 && Self._type !== 'group'){ //有自动匹配的搜索关键词
				len = data2.length;
				Self.index = -1;
				//搜全站
				Self.s.push(Self._valTip ?  total + '<dd><ul>' : '<ul>');
				UI.each(data2,function(o,i){
					Self.s.push('<li value=\"'+ o +'\" index="' + (parseInt(i)+1) + '">' + o + '</li>');
				});	
				Self.s.push(Self._valTip ? '</ul></dd>' : '</ul>');
				len1 = len +1;
				//我的广播页或者客人页，搜“我的广播”放在第一项
				if (MI.boss == 13 || MI.boss == 7){ 
					if(MI.guest){
						Self.s.push(Self._valTip ? localHis : '');
					}
					else
						Self.s.push(Self._valTip ?  localMy : '');
					len1 = len+2;
				}
			}
			else if(data2.length == 0 && Self._type !== 'group'){ //没有自动匹配的搜索关键词，右侧搜索框也出现“搜全站”和”搜我(他)的广播“
				if(Self._valTip){
					if (MI.boss == 13 || MI.boss == 7){ 
						Self.indexMax = 2;
						if(MI.guest){
							Self.s.push(total + localHis);
						}
						else{
							Self.s.push(total + localMy);
						}
						len1 = 2;
					}
					else{
						Self.indexMax = 1;
						Self.s.push(total);
						len1 = 1;
					}
				}
				else Self.hide(); 
			}
			Self.s.push(Self._valTip ? '</dl>' : '');
			Self.indexMax = Self._valTip ? len1 + len2 + len3 : len-1;
			if (Self.s.length == 2)
				return;
			Self._select.innerHTML = Self.s.join("");
			if(Self._valTip || (!Self._valTip && Self._select.innerHTML != '')) Self.show();
			Self._list = $$(Self._select,'li');
			if(Self._list == null) //如果没有自动匹配的关键词列表，新建一个数组
				Self._list = [];
			if(Self._valTip){
				if(data.info.user && $$(Self._select,'.searchUser')[0])
					Self._list.unshift($$(Self._select,'.searchUser')[0]);
				if(!Self._style.isnano && data.info.qun)
					Self._list.splice(len2+1,0,$$(Self._select,'.searchQun')[0]);
				Self.removePara();	
				var parentNodePos = $$(Self._key.parentNode,'.pos')[0];
				if($$(Self._select,'.speak')[0]) {
					Self._list.splice(len2+len3+1,0,$$(Self._select,'.speak')[0]);
					UI.EA($$(Self._select,'.speak')[0],'mousedown',function(){
						UI.A(parentNodePos,'value','174');
					});
				}
				if (MI.boss == 13 || MI.boss == 7){  //如果是广播页或者客人页
					var $special = $$(Self._select,'.special')[0];
					if($special) {
						Self._list.push($special);
						UI.EA($special,'mousedown',function(){
							UI.A(parentNodePos,'value','173');
							UI.after(Self._query,Self._key);
						});
					}
				}
				if(data.info.user && $$(Self._select,'.searchUser')[0]){
					UI.EA($$(Self._select,'.searchUser')[0],'mousedown',function(){
						UI.A(parentNodePos,'value','176');
					});
				}
				if(!Self._style.isnano && data.info.qun){
					UI.EA($$(Self._select,'.searchQun')[0],'mousedown',function(){
						UI.A(parentNodePos,'value','178');
						UI.after(Self._queryQun,Self._key);
					});
				}
			}
			//Event
			UI.each(Self._list,function(el,i){
				el.onmouseover = function(){
					for(var n = 0,len = Self._list.length; n < len; n++ ){
						UI.removeClass(Self._list[n],'on');
					}
					UI.addClass(this,'on');
				}
				el.onclick = function(){
					if(UI.hasClass(el,'userGet')){
						var uname = UI.A(el,'name');
						if(Self._style.isnano) {
							document.location='http://1.t.qq.com/' + uname;
						} else {
							document.location='http://t.qq.com/' + uname;
						}
					}
					else{
						if(UI.hasClass(el,'qunGet')){
							var uname = UI.A(el,'name');
							document.location='http://qun.t.qq.com/' + uname + '?from=smart';											
						}
						else{
							Self._key.value = (this.nodeName == 'DT') ? UI.text($$(this,'span')[0]) : UI.text(this);
							if (Self._key.value) {
								if (Self._tip && Self._tip.nodeName == 'LABEL') {
									UI.hide(Self._tip);
								}
							}
							UI.A(Self._key,'index',UI.A(this,'index'));
							if(this.nodeName != 'DT'){
								Self.removePara();
								UI.A($$(Self._key.parentNode,'.pos')[0],'value','174');
							}
							Self.submit(el);
						}
					}
				}
			});	
		}else{Self.hide();}
	},
	submit : function(el){
		if(this._form != null) {
			this._form.action="http://t.qq.com/search/index.php";
			if (this._style.isnano){
				this._form.action="http://1.t.qq.com/search/message.php";
			}
		}
		if(this._callback){
			//搜用户或者搜微群的时候，需要更改action值，在callback里要改回来
			if(el && UI.hasClass(el,'searchUser')){
				if(Self._form != null) {
					Self._form.action="http://t.qq.com/search/user.php";
					if (Self._style.isnano) {
						Self._form.action="http://1.t.qq.com/search/user.php";
					}	
				}
			}
			else if(el && UI.hasClass(el,'searchQun')){if(this._form != null) this._form.action="http://t.qq.com/search/qun.php";}
			this._callback(); 
		}
		if(this._form){
			if(this._isBoss == 1){
				MI.Bos('btnSubmitSearchNew');
			}
			else if(this._isBoss == 2){
				MI.Bos('btnSubmitSearchOld');	
			}
		}
		//var action = this.action,value = encodeURIComponent(this._key.value);
		//document.location.href = action + (action.hasString('?') ? value : encodeURIComponent(value));
	},
	/**
	 * 获取收藏订阅和历史搜藏
	 */
	getHistory : function(){
		var Self = this;
		if(this.timer)	clearTimeout(this.timer);
		this.timer=window.setTimeout(function(){
			MI.ajax({
			 	url:MI.url.searchList,
			 	type:'post',
			 	success:function(data){
			 		data = MI.json(data);
							Self.bulidList(data);
				}
			 })
		},50);		
	},
	bulidList : function(data){
		var Self = this;
		if (data.result == 0) {
			if(data.info){
				var s = [];
				var len = data.info.length;
				Self.indexMax = (Self._style.history == 1) ? len-1 : len;
				Self.index = -1;
				var Number=0;
				s.push('<ul>');//s.push('<ul>');
				UI.each(data.info,function(o,i){
					s.push('<li value=\"'+ o +'\" index="' + (parseInt(i)+1) + '" class="">' + ((data.stat[Number]==1) ? '<b class="ico_rss"></b>' : '<b class="ico_his"></b>') +  '<span>' + o + '</span>'  + '</li>');//等待icon制作成功即可加icon
					Number++;
				});
				s.push('</ul>');
				if (s.length == 2) {
					return;
				}
				Self._select.innerHTML = s.join("");
				Self.show();
				Self._list = $$(Self._select,'li');
				//Event
				UI.each(Self._list,function(el,i){
					el.onmouseover = function(){
						for(var n = 0,len = Self._list.length; n < len; n++ ){
							UI.removeClass(Self._list[n],'on');
						}
						UI.addClass(this,'on');
					}
					el.onclick = function(){
						Self._key.value = (this.nodeName == 'DT') ? UI.text($$(this,'span')[0]) : UI.text(this);
						UI.A(Self._key,'index',UI.A(this,'index'));
						if (Self._key.value) {
							if (Self._tip && Self._tip.nodeName == 'LABEL') {
								UI.hide(Self._tip);
							}
						}
						Self.submit();
					}
				});
			}else{Self.hide();}
		}else{Self.hide();}
	}
}
MI.AutoCmt = function(o){ //Auto Complete
	/*
		URL : /asyn/nicktips.php?type=1&num=100 //0-All, 1-Following, 2-Followed(Use In Message), 3-Follow Each Other
		{
			"result":0,
			"msg":"成功",
			"info":{"222":"\u5730\u65b9","232":"\u5730\u65b9\u5730\u65b9"} //[id,name]
		}
	*/
	var Self = this;
	Self._target = o.target;
	Self.key = o.key;
	Self.call = o.call; //Call Back After Select
	Self.clickCall = o.clickCall; //Call Back After Click Select List
	Self.type = o.type || 0; //Type
	Self.align = o.align || 'left'; //Align Action
	Self.topic = o.topic || 0; //Insert Topic
	Self.face = o.face || 0; //Insert Face
	Self.tips = UI.isUndefined(o.tips) ? 1 : o.tips; //Tips
	Self.minWidth = o.minWidth; //Min Width
	Self.maxWidth = o.maxWidth; //Max Width

	//Dom
	Self._body = UI.html('<div class="atWrap" style="display:none">\
		<div class="musicTab" style="display:none"><div class="atSearch"><input type="text" class="inputTxt"><span class="atbtn"><input type="button" class="btn_search2"><a href="#" class="del" title="' + _('清空') + '"></a></span></div><a href="#" class="close" title="' + _('关闭') + '"></a></div>\
		<div class="autoCmt" style="display:none"><div class="autoCmtAll"></div><div class="autoCmtKey"></div></div>\
		<div class="tips" style="display:none">' + (UI.isString(Self.tips) ? Self.tips : _('@朋友帐号,他就能在[提到我的]页收到')) + '</div>\
	</div>')[0];
	Self._shadow = UI.html('<div class="txtShadow"><span></span><b>|</b><span></span></div>')[0];
	UI.after(Self._shadow,o.target);
	Self._txt = Self._shadow.firstChild;
	Self._cursor = Self._txt.nextSibling;
	Self._txtEnd = Self._shadow.lastChild;
	if (UI.B.ie) {
		UI.before(UI.html('<b style="display:none;width:0;overflow:hidden">\001</b>')[0],o.target);
	}

	//Event
	UI.EA(o.target,'keydown',function(e){
		var E = UI.E(e);
		Self.keyEvent(E);
	});
	/**/
	//UI.EA(window,'resize',hide);
	UI.EA(document.body,'click',hide);
	/*UI.EA(Self._target,'click',function(e){
		UI.E(e).stop();
	});*/
	//UI.EA(Self._target,'blur',hide);
	UI.EA(o.target,'keyup',show);
	UI.EA(o.target,'focus',show);
	UI.EA(o.target,'mouseup',show);
	function show(e){
		var E = UI.E(e);
		clearTimeout(Self.delay);
		Self.delay = setTimeout(function(){
			_show();
		},150);
	}
	function _show(){
		var text,textEnd,textLast,textLength,
			value = Self._target.value;
		if (Self.clicks > 0) {
			Self.clicks--;
			return;
		}
		Self.cursorX = MI.cursorX(Self._target);
		if (document.selection && document.selection.createRange().text == MI.TalkBox.prototype.txtTopic.slice(1,-1)){
			Self.cursorXHack = 6;
			Self.cursorX -= Self.cursorXHack;
		}
		else {
			Self.cursorXHack = 0;
		}
		value = value.replace(/\r/g,'');
		text = value.slice(0,Self.cursorX).replace(/＠/,'@');
		if (!Self.key && text.match(/^@/)) {
			Self.filter = '@';
			text = text.replace(/^@/,'');
		}
		else {
			Self.filter = '';
		}
		textEnd = value.slice(Self.cursorX);
		textLast = text.slice(-1);
		Self.word = Self.key ? text.match(/@[^\s@\n\r]{0,64}$/g) : text.match(/[^\s\n\r]{0,64}$/g);
		Self.text = text;
		if (Self.topic && textLast == '#' && text.match(/#/g).length % 2 != 0){ // || text.replace(MI.TalkBox.prototype.txtTopic.slice(1,-1),'').slice(-1) == '#'
			var topic = MI.json(MI.S('option_topic_' + MI.user.account)),html = [],index = 0,topicName;
			Self.creatDom();
			Self._txt.innerHTML = Self.key ? Self.shadowText(text) : '';
			for (var i in topic){
				topicName = decodeURI(i).slice(1,-1);
				html.push('<li title="' + topicName + '"' + (index ? '' : ' class="on"') + '><span>' + MI.string.cut(topicName,20,'') + '</span></li>');
				index++;
			}
			if (index){
				Self._body.style.cssText = '';
				Self._cont.style.cssText = '';
				UI.hide(Self._all);
				UI.hide(Self._search);
				UI.hide(Self._tips);
				UI.show(Self._key);
				Self._key.innerHTML = '<ul>' + html.join('') + '</ul>';
				Self.list = $$(Self._key,'li');
				UI.each(Self.list,function(o,i){
					o.onclick = select;
					o.onmouseover = hover;
					o.index = i;
				});
				Self.index = 0;
				Self.indexMax = Self.list.length - 1;
				
				UI.show(Self._body);
				Self.display = 0;
				Self.position();
				Self.display = 1;
			}
			Self.selectType = 1;
			Self.model = 0;
			return;
		}
		else if (Self.word) {
			Self.word = Self.word[0];
			textLength = Self.word.length;
			if (textLength > 1) {
				text = text.slice(0,- textLength + 1);
			}
			Self.selectType = 0;
			Self.model = 0;
			
			UI.show(Self._tips);
		}
		else if (Self.model == 1){
			return;
		}
		else {
			clearTimeout(Self.delay);
			Self.hide();
			return;
		}
		Self._txt.innerHTML = Self.key ? Self.shadowText(text) : '';
		Self._txtEnd.innerHTML = Self.shadowText(textEnd);

		//if (Self.word) { //E.key == 50
			Self.creatDom(function(){
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
			});

			Self.getData();
		/*}
		else {
			Self.hide();
		}*/
	}
	function hide(){
		Self.hide();
	}
	
	function select(e){
		var E = UI.E(e);
		Self.select(E);
		if (Self.clickCall) {
			Self.clickCall();
		}
	}
	function hover(){
		if (Self.index == null) {
			Self.index = 0;
		}
		UI.removeClass(Self.list[Self.index],'on');
		UI.addClass(this,'on');
		Self.index = this.index;
	}
}
MI.AutoCmt.prototype = {
	_body : 0,
	_search : 0,
	_cont : 0,
	_all : 0, //所有人
	_key : 0, //搜索结果
	_tips : 0, //提示
	max : 1000, //最大搜索结果数
	maxCss : 'height:220px;overflow-y:scroll;overflow-x:hidden;', //最大高度的样式
	allList : 0, //所有人列表
	keyList : 0, //搜索结果列表
	list : 0, //当前列表
	display : 0,
	clicks : 0,
	index : 0,
	filter : '', //Filter @
	cursorX : 0, //CursorX
	cursorXHack : 0, //IE CursorX 修正
	shadowText : function(text){
		return text.replace(/\r\n|\n/g,'<br>').replace(/ /g,'&nbsp;');
	},
	tips : 1, //<div class="tips">@朋友帐号,他就能在[提到我的]页收到</div>
	creatDom : function(call){ //构建Dom
		var Self = this;
		if (!Self._body.appended) {
			UI.append(Self._body,document.body);
			Self._body.appended = 1;
		}
		if (!Self._cont){
			Self._search = $$(Self._body,'.musicTab')[0];
			Self._input = $$(Self._body,'.inputTxt')[0];
			Self._btn = $$(Self._body,'.btn_search2')[0];
			Self._close = $$(Self._body,'.close')[0];
			Self._del = $$(Self._body,'.del')[0];
			Self._cont = $$(Self._body,'.autoCmt')[0];
			Self._all = $$(Self._body,'.autoCmtAll')[0];
			Self._key = $$(Self._body,'.autoCmtKey')[0];
			if (Self.tips){
				Self._tips = $$(Self._body,'.tips')[0];
				UI.show(Self._tips);
			}
			
			//Event
			/*Self._search.onclick = function(e){
				UI.E(e).stop();
			}*/
			Self._close.onclick = function(){
				Self.hide();
				MI.Bos('btnAutoAtClose');
				return false;
			}
			Self._btn.onclick = function(){
				MI.focus(Self._input);
			}
			Self._del.onclick = function(e){
				Self._input.value = '';
				Self._input.focus();
				Self._input.onkeyup(e);
				UI.show(Self._btn);
				MI.Bos('btnAutoAtDel');
				return false;
			}
			Self._input.onkeyup = Self._input.onfocus = function(e){
				var E = UI.E(e),
					value = UI.trim(this.value).replace(/^@/g,'');
				if (!(E.key == 38 || E.key == 37 || E.key == 39 || E.key == 40 || E.key == 13) && MI[Self.usersStorageKey]){
					Self.show(MI[Self.usersStorageKey], MI[Self.usersStorageKeyPY],1);
				}
				if (value){
					UI.hide(Self._btn);
				}
				else {
					UI.show(Self._btn);
				}
			}
			Self._input.onkeydown = function(e){
				Self.keyEvent(e);
			}
			Self._body.onclick = function(e){
				if (Self.model == 1){
					UI.E(e).stop();
				}
			}
		}
		if (call){
			call();
		}
	},
	keyEvent : function(e){ //键盘事件
		var Self = this,
			E = UI.E(e);
		if (!Self.display || !UI.isNumber(Self.index)) {
			return;
		}
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
			Self._cont.scrollTop = (Self.index - 4) * 22;
			Self.clicks = 1;
			clearTimeout(Self.delay);
			E.prevent();
		}
		else if (E.key == 13 || E.key == 27) { //Space Key : || E.key == 32 || E.key == 229
			if (E.key == 27) {
				Self.hide();
			}
			else {
				if (Self.model == 1 && UI.isNumber(Self.index) && Self.list[Self.index]){
					Self.cursorX = MI.cursorX(Self._target);
					Self.list[Self.index].onclick(e);
				}
				else {
					Self.select(E);
				}
			}
			Self.clicks = 1;
			clearTimeout(Self.delay);
			E.prevent();
		}
	},
	selectType : 0, //Select Type: 0-@ 1-Topic 2-Face
	select : function(E){ //选择@帐号
		var Self = this;
		if (MI.TalkBox.cur && MI.TalkBox.cur._txt == Self._target){
			MI.TalkBox.cur.guideTextRemove();
		}
		if (Self.selectType == 0){
			if (UI.isNumber(Self.index) && Self.list[Self.index]) {
				var scrollTop = Self._target.scrollTop,
					txt = Self.list[Self.index].txt,
					count;
				//Self._target.focus();
				MI.selectTxt(Self._target,Self.cursorX,Self.cursorX,Self.cursorX);
	
				//Save Use History
				if (Self.word){
					MI.insertTxt(Self._target,txt + ' ',Self.cursorX,Self.word.slice(1).length);
				}
				else {
					MI.insertTxt(Self._target,'@' + txt + ' ',Self.cursorX,0);
				}
				count = MI.users[txt];
				MI.users[txt] = count ? count + 1 : 1;
	
				if (!Self.key) {
					Self._target.value = Self.filter + txt;
				}
				if (Self.call) {
					Self.call(E);
				}
				Self._target.scrollTop = scrollTop;
				MI.Bos('btnAutoAtAccount' + (Self.model ? Self.model : ''));
			}
		}
		else if (Self.selectType == 1){
			var txt = '#' + Self.list[Self.index].title + '#',
				cursorX = Self.cursorX,
				end,
				del = 1;
			if (!UI.B.ie){
				Self._target.value = Self._target.value.replace(MI.TalkBox.prototype.txtTopic,'#');
			}
			if (Self.cursorXHack){
				del = Self.cursorXHack;
				MI.selectTxt(Self._target,cursorX + del - 1,cursorX + del + 1);
			}
			MI.insertTxt(Self._target,txt,cursorX,del);
			if (Self.cursorXHack){
				end = cursorX + txt.length - 1;
				MI.selectTxt(Self._target,end,end);
			}
			MI.Bos('btnAutoAddTopic');
		}
		if (Self.model == 0){
			Self.hide();
		}
	},
	getData : function(call){ //获取数据
		var Self = this,
			type = 'follow_' + Self.type + '_',
			usersStorageKey = type + MI.user.account,
			usersTopStorageKey = 'top_' + MI.user.account,
			usersStorageKeyPY = usersStorageKey + '_PY',
			//usersKey = type + 'users',
			users = MI.S(usersStorageKey),
			usersTop = MI.S(usersTopStorageKey);
		Self.usersStorageKey = usersStorageKey;
		Self.usersStorageKeyPY = usersStorageKeyPY;
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
		if (!MI[usersStorageKey] && !Self.sending && (!users || (new Date().getTime() - MI.S('time') > 43200000) || !newData(users))){ //12小时 2小时-7200000
			Self.sending = 1;
			var Time,Time_1,Time_2,Time_3;
			Time = + new Date();
			MI.ajax({
				url : MI.url.at,
				type : 'get',
				data : 'user=' + MI.user.account + '&type=' + (Self.type ? Self.type : 0) + '&num=' + (UI.B.ie ? 750 : 2000),
				success : function(data){
					//旧data = '{"result":0,"info":{"hecaitou":"Lecter","clarence":"kaka","pony":"pony","patrick":"贺炜","thomas":"唐沐"}}';
					//新data = '{"result":0,"info":[["hecaitou","Lecter","L|e|c|t|e|r"],["clarence","kaka","k|a|k|a"],["pony","pony","p|o|n|y"],["patrick","贺炜"],["thomas","唐沐",'tang|mu']]}';
					//var Data = MI.json(unescape(data));
					Time_1 = + new Date() - Time;
					var Data = MI.json(data);
					if (Data.result == 0) {
						MI.S(usersStorageKey,data);
						MI.S('time',new Date().getTime());
						var ret = parseData(Data);
						MI[usersStorageKey] = ret[0];
						MI[usersStorageKeyPY] = ret[1];
						Self.show(MI[usersStorageKey], MI[usersStorageKeyPY]);
						if (call){
							call();
						}
					}
					Self.sending = 0;
				
					//Speed
					Time_2 = + new Date() - Time;
					setTimeout(function(){
						Time_3 = + new Date() - Time;
						MI.Speed('t_asyn_nicktips',1,Time_1,Time_2,Time_3);
					},0);
				}
			});
		}
		else {
			if (!MI[usersStorageKey]) {
				var ret = parseData(MI.json(users));
				MI[usersStorageKey] = ret[0];
				MI[usersStorageKeyPY] = ret[1];
			}
			/*
			if (MI[usersStorageKey] && MI[usersStorageKey].info) {
				MI[usersStorageKey].info[MI.user.account] = MI.user.name; //Add Current User's Account
			}
			*/
			Self.show(MI[usersStorageKey], MI[usersStorageKeyPY]);
			if (call){
				call();
			}
		}
		function parseData(data) {
			//旧data = '{"result":0,"info":{"hecaitou":"Lecter","clarence":"kaka","pony":"pony","patrick":"贺炜","thomas":"唐沐"}}';
			//新data = '{"result":0,"info":[["hecaitou","Lecter","L|e|c|t|e|r"],["clarence","kaka","k|a|k|a"],["pony","pony","p|o|n|y"],["patrick","贺炜"],["thomas","唐沐",'tang|mu']]}';
			var nick = {info:{}}, py = {};
			if (UI.isArray(data.info)) {
				for (var i=0; i<data.info.length; ++i) {
					nick.info[data.info[i][0]] = data.info[i][1];
					if (data.info[i][2]) py[data.info[i][0]] = [data.info[i][2].toLowerCase(), MI.MatchPY.whole2sim(data.info[i][2])];
				}
			} else nick = data;
			return [nick, py];
		}
		// 新数据
		function newData(users) {
			return users.indexOf(']]}') != -1;
		}
	},
	model : 0, //显示模式： 0-普通模式	1-浮层模式
	showAll : function(el){
		var Self = this;
		Self.creatDom();
		if (Self._all.innerHTML == ''){
			Self.word = '';
			Self.getData(function(){
				position();
			});
		}
		position();
		function position(){ //控制显示和位置
			UI.show(Self._search);
			UI.show(Self._all);
			UI.show(Self._tips);
			UI.hide(Self._key);
			UI.show(Self._btn);
			
			Self._body.style.cssText = 'top:' + (UI.getY(el) + UI.height(el) + 3 - MI.scrollHack(el)) + 'px;left:' + (UI.getX(el) - 1) + 'px';
			Self._input.value = '';
			Self._input.blur();
			Self._input.focus();

			Self.display = 1;
			Self.selectType = 0;
			Self.model = 1;
		}
	},
	show : function(o, py, model){
		py = py || {};
		var Self = this,
		reRegtxt = function(p){return '<b>' + p + '</b>'};
		if (!model){
			UI.hide(Self._search);
		}
		//if (this.word) {
			var match = [],
				matchLength = 0,
				hasWord = this.word,
				//word = MI.string.html(this.word.slice(1)),
				word = model ? UI.trim(Self._input.value.replace(/^@/g,'')) : (this.key ? this.word.slice(1) : this.word),
				regTxt = MI.string.escapeReg(word),
				reg = new RegExp('(^' + regTxt + ')','i'),
				regAll = new RegExp('(' + regTxt + ')','ig'),
				regTxt1,reg1,regAll1, //简繁体正则
				length = word.length,
				m,
				n,
				historyMax = model ? 50 : 10, //显示@联想使用历史的个数
				//html = word ? '<b>' + word + '</b>' : '',
				//html = 'з' + word + 'З',//有风险，暂时先这样，没有更好办法了
				index = 0,
				txt = [],
				txtObj = {},
				x,
				y,
				users = o.info;
			if (word) {
				for (var i in users) {
					/*if (!word && index > 9) {
						break;
					}*/
					if (matchLength >= Self.max) {
						break;
					}
					if (users[i]){
						//match.push(MI.string.html(o.info[i].replace(reg,html) + ' (' + i.replace(reg,html) + ')').replace(/з/,'<b>').replace(/З/,'</b>'));
						if(i.match(reg) || users[i].match(reg)){
							match.push(users[i].replace(reg,reRegtxt) + ' (' + i.replace(reg,reRegtxt) + ')' + ((i.substr(0,1)=="*") ? '<em class="ico_qGroup"></em>' : ''));
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
						}
					}
					index++;
				}
				if (MI.TransformST){ //简繁体逻辑
					regTxt1 = MI.TransformST.toggle(regTxt);
					reg1 = new RegExp('(^' + regTxt1 + ')','i');
					regAll1 = new RegExp('(' + regTxt1 + ')','ig');
					if(regTxt1 != regTxt){
						for (var i in users) {
							if (matchLength >= Self.max) {
								break;
							}
							if (users[i]){
								if(i.match(reg1) || users[i].match(reg1)){
									match.push(users[i].replace(reg1,reRegtxt) + ' (' + i.replace(reg1,reRegtxt) + ')' + ((i.substr(0,1)=="*") ? '<em class="ico_qGroup"></em>' : ''));
									txt.push(i);
									txtObj[i] = 1;
									matchLength++;
								}
							}
							index++;
						}
					}
				}
				else {
					MI.app({
						TransformST : function(){
							Self.show(o, py, model);
						}
					});
				}
				if (matchLength < Self.max) {
					var w = word.toLowerCase();
					var rs;
					for (var i in users) {
						if (matchLength >= Self.max) {
							break;
						}
						if (!py[i] || txtObj[i]) continue;
						rs = MI.MatchPY.sim(py[i][1], w);
						if (rs) {
						//如果搜索word是以*开始的
							match.push(users[i].substring(0, rs[0]) + '<b>' + users[i].substring(rs[0], rs[0]+rs[1]) + '</b>' + users[i].substring(rs[0]+rs[1]) + ' (' + i + ')' + ((i.substr(0,1)=="*") ? '<em class="ico_qGroup"></em>' : ''));
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
						}
						index++;
					}
				}
				if (matchLength < Self.max) {
					var w = word.toLowerCase();
					var rs;
					for (var i in users) {
						if (matchLength >= Self.max) {
							break;
						}
						if (!py[i] || txtObj[i]) continue;
						rs = MI.MatchPY.whole(py[i][0], w);
						if (rs) {
							//如果搜索word是以*开始的
							match.push(users[i].substring(0, rs[0]) + '<b>' + users[i].substring(rs[0], rs[0]+rs[1]) + '</b>' + users[i].substring(rs[0]+rs[1]) + ' (' + i + ')' + ((i.substr(0,1)=="*") ? '<em class="ico_qGroup"></em>' : ''));
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
						}
						index++;
					}
				}
				if (matchLength < Self.max) {
					for (var i in users) {
						if (matchLength >= Self.max) {
							break;
						}
						if (users[i] && ( i.slice(1).match(regAll) || users[i].slice(1).match(regAll) ) && !txtObj[i]) {
							//如果搜索word是以*开始的
							match.push(users[i].replace(regAll,reRegtxt) + ' (' + i.replace(regAll,reRegtxt) + ')' + ((i.substr(0,1)=="*") ? '<em class="ico_qGroup"></em>' : ''));
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
						}
						index++;
					}
					if(regAll1 && regAll1 != regAll){ //简繁体逻辑
						for (var i in users) {
							if (matchLength >= Self.max) {
								break;
							}
							if (users[i] && ( i.slice(1).match(regAll1) || users[i].slice(1).match(regAll1) ) && !txtObj[i]) {
								//如果搜索word是以*开始的
								match.push(users[i].replace(regAll1,reRegtxt) + ' (' + i.replace(regAll1,reRegtxt) + ')' + ((i.substr(0,1)=="*") ? '<em class="ico_qGroup"></em>' : ''));
								txt.push(i);
								txtObj[i] = 1;
								matchLength++;
							}
							index++;
						}
					}
				}
			}
			else {
				if (MI.usersArr && MI.usersArr.length) {
					this.sort();
					for (var i = 0,num = MI.usersArr.length;i < num;i++) {
						if (i >= historyMax) {
							break;
						}
						var userName = MI.usersArr[i].account,userNick = o.info[userName]
						if(userNick) { //判断常用联系人是否在当前联系人中
							match.push(userNick + ' (' + userName + ')');
							matchLength++;
							txt.push(userName);
							txtObj[userName] = 1;
						}
					}
				}
				else if (Self.word == '@'){
					if (!Self._body.appended) {
						UI.append(Self._body,document.body);
						Self._body.appended = 1;
					}
					Self._txt.innerHTML = Self.key ? Self.shadowText(Self.text) : '';
		
					Self._body.style.cssText = '';
					//Self._body.innerHTML = Self.tips; //提示信息
					Self.list = $$(Self._body,'li');
					Self.index = 0;
		
					Self.display = 0;
					Self.position();
					Self.display = 1;
					//return;
				}
			}
			
			if (!word && model){ //假如关键字为空，并且为浮层模式，插入所有帐号
				for (var i in users) {
					if (matchLength >= Self.max) {
						break;
					}
					if (!txtObj[i]){
						match.push(users[i] + ' (' + i + ')' + ((i.substr(0,1)=="*") ? '<em class="ico_qGroup"></em>' : ''));
						txt.push(i);
						txtObj[i] = 1;
						matchLength++;
					}
					index++;
				}
			}
			if (1 || matchLength || model) {
				if (matchLength > 10) {
					this._cont.style.cssText = Self.maxCss;
					this._cont.scrollTop = 0;
				}
				else {
					this._cont.style.cssText = '';
				}
				if (!model){
					this._body.style.cssText = '';
				}
				var html = '<ul><li><img src="http://mat1.gtimg.com/www/mb/images/head_20.jpg"><span>' + match.join('</span></li><li><img src="http://mat1.gtimg.com/www/mb/images/head_20.jpg"><span>') + '</span></li></ul>';
				if (!matchLength){
					html = '';
				}
				if (!word && !this.allList && model){
					this._all.innerHTML = html;
					this.allList = $$(this._all,'li');
					UI.each(this.allList,function(o,i){
						o.onclick = select;
						o.onmouseover = hover;
						o.txt = txt[i];
						o.index = i;
					});
				}
				else if (word || !model){
					this._key.innerHTML = html;
					this.keyList = $$(this._key,'li');
					UI.each(this.keyList,function(o,i){
						o.onclick = select;
						o.onmouseover = hover;
						o.txt = txt[i];
						o.index = i;
					});
				}
				UI.removeClass(this.list[this.index],'on');
				if (!word && model) { //显示所有人
					UI.hide(this._key);
					UI.show(this._all);
					if (this.allList && this.allList.length > 10) {
						this._cont.style.cssText = Self.maxCss;
					}
					this.list = this.allList;
				}
				else { //显示搜索结果
					UI.show(this._key);
					UI.hide(this._all);
					this.list = this.keyList;
				}
				if (!matchLength){
					UI.hide(Self._cont);
					if (word && !model){
						UI.hide(Self._body);
					}
				}
				this.display = 0;
				this.index = 0;
				this.indexMax = this.list.length - 1;
				UI.addClass(this.list[0],'on');
			}
			else {
				//this._body.innerHTML = '';
				this.indexMax = 0;
				this.hide();
				return;
			}
			if (!model){
				this.position();
			}
			this.display = 1;
		/*}
		else {
			this.hide();
		}*/
		function select(e){
			var E = UI.E(e);
			if (Self.model == 1){
				E.stop();
			}
			Self.select(E);
			if (Self.clickCall) {
				Self.clickCall();
			}
		}
		function hover(){
			if (Self.index == null) {
				Self.index = 0;
			}
			UI.removeClass(Self.list[Self.index],'on');
			UI.addClass(this,'on');
			Self.index = this.index;
		}
	},
	hide : function(){
		if (this.display) {
			UI.hide(this._body);
			UI.removeClass(this.list[this.index],'on');
			this.index = null;
			this.model = 0;
		}
	},
	position : function(){
		var x,
			y,
			width,
			windowWidth,
			leftFix,
			cssText;
		if (!this.display) {
			windowWidth = UI.windowWidth();
			width = UI.width(this._body);
			if (this.key) {
				x = UI.getX(this._cursor) - 12;
				y = UI.getY(this._cursor) - this._target.scrollTop - MI.scrollHack(this._cursor) + 26;
			}
			else {
				x = UI.getX(this._target);
				y = UI.getY(this._target) + UI.height(this._target) - 1;
			}
			if (this.minWidth && width <= this.minWidth) {
				this._body.style.width = this.minWidth + 'px';
			}
			if (this.maxWidth && width > this.maxWidth) {
				this._body.style.width = this.maxWidth + 'px';
			}
			if (this.align == 'right') {
				x = x - (width - UI.width(this._target));
			}
			cssText = ';top:' + y + 'px;left:' + x + 'px;';
			leftFix = windowWidth - (width + x);
			if (leftFix < 0){
				cssText += 'left:auto;right:0;';
			}
			this._body.style.cssText += cssText;
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
MI.MatchPY = {
	sp: '|',
	sim: function(py, word) {
		var idx = py.indexOf(word);
		return (idx == -1) ? null : [idx, word.length];
	},
	whole: function(py, word) {
		var Self = this;
		var arr = py.split(Self.sp);
		var str = arr.join('');
		var len = arr.length;
		if (len == 1) return str == word ? [0, 1] : null;
		for (var i=0; i<len; ++i) {
			if (Self.startsWith(str, word)) {
				return [i, Self.len(arr, i, word)];
			}
			str = str.substring(arr[i].length);
		}
		return null;
	},
	whole2sim: function(whole) {
		var arr = whole.split(this.sp);
		var str = '';
		for (var i=0; i<arr.length; ++i) str += (arr[i].charAt(0)||'?');
		return str.toLowerCase();
	},
	len: function(arr, start, word) {
		var len = word.length;
		var sum = 0;
		var size = arr.length;
		for (var i=start; i<size; ++i) {
			sum += arr[i].length;
			if (len == sum) return i-start+1;
			else if (len < sum) return i-start;
		}
		return size;
	},
	startsWith: function(str, prefix) {
		return str.lastIndexOf(prefix, 0) == 0;
	}
}
MI.Dialog = function(o){ //Dialog
	o = o || {};
	var Self = this;

	//Dom
	//Self._body.innerHTML = o.tmpl || '<div class="bg"></div><div class="CR"><div class="top"><span class="left"><em></em></span><span class="right"><em></em></span></div><div class="DTitle"></div><a' + V5 + ' class="DClose" title="关闭">关闭</a><div class="DLoad"></div><div class="DCont"></div><div class="bot"><span class="left"><em></em></span><span class="right"><em></em></span></div></div>';
	//var html = o.tmpl || '<div class="D">' + (UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"></div><div class="CR"><div class="DWrap"><div class="DTitle"></div><a title="' + _('关闭') + '" class="DClose close" href="#">' + _('关闭') + '</a><div class="DLoad"></div><div class="DCont"></div></div></div></div></div>';
	var html = o.tmpl || '<div class="D">' + (UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"></div><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><a title="' + _('关闭') + '" class="DClose close" href="#">' + _('关闭') + '</a><div class="DLoad"></div><div class="DCont"></div></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
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
		var _x = E.x - parseInt(wrap.style.left);
		var _y = E.y - parseInt(wrap.style.top);
		var w = UI.windowWidth(),h = UI.windowHeight(); //Kill Bug
		E.prevent();
		//UI.addClass(wrap,'move');
		document.onmousemove = document.ontouchmove = function(e) {
			var E = UI.E(e);
			if (!UI.B.ie && (E.x < 0 || E.y < 0 || E.x > w || E.y > h)) return false;
			wrap.style.top = E.y - _y + 'px';
			wrap.style.left = E.x - _x + 'px';
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
		if (Self.closeEnd){
			Self.closeEnd();
		}
		Self.hide();
		return false;
	}
}
MI.Dialog.prototype = {
	width : 462,
	close : 1,
	/**
	 * 弹出对话框
	 * 
	 * @param {Object} Object 对话框参数
	 *            @example
	 *            MI.dialog.show({
	 *                title : '标题',
	 *                html : $('id'),
	 *                start : function(){ //弹出对话框的回调函数
	 *                },
	 *                end : function(){ //关闭对话框的回调函数
	 *                },
	 *                closeEnd : function(){
	 *                }
	 *            });
	 */
	show : function(o){
		var Self = this,css;
		if (o.html) {
			//append it every time when show to make sure it's on the top
			document.body.appendChild(Self._body);
		}
		else {
			if (!Self._append) {
				document.body.appendChild(Self._body);
				Self._append = 1;
				//UI.C(Self._bg,'marginLeft','-9999px');
			}
		}

		Self.close = o.close != undefined ? o.close : Self.close;
		Self.ico = o.ico;
		if (Self.close) {
			UI.show(Self._close);
		}
		else UI.hide(Self._close);

		/*if (o.title && !o.title.hasString('DmainTit')){
			o.title = '<h3 class="DmainTit">' + o.title + '</h3>';
		}*/
		Self._title.innerHTML = o.title || '';
		UI.C(Self._title,'height',o.title ? '' : '0');
		//o.noReserve = true, old content will not be reserved in document,body
		if (o.html && !o.noReserve) {
			for (var i = Self._cont.childNodes.length;i > 0;i--) {
				var contChild = Self._cont.childNodes[i - 1];
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
			Self._cont.innerHTML = '';
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

		css = 'width:' + Self.width + 'px;top:' + ( UI.scrollY() + UI.windowHeight() / 2 - UI.height(Self._wrap) / 2 ) + 'px;left:' + (UI.windowWidth() / 2 - Self.width / 2) + 'px;';
		if (o.left != undefined) {
			css += 'left:' + o.left + 'px;margin-left:0;';
		}
		if (o.top != undefined) {
			css += 'top:' + o.top + 'px;margin-top:0;';
		}
		setTimeout(function(){
			Self.resizeBg();
		//	Self._wrap.style.cssText = css;
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
			if (o.closeEnd) { //Run When Close Dialog On Button
				Self.closeEnd = o.closeEnd;
			}
			else Self.closeEnd = null;
			if (this.call) { //Run Callback Function When Open Dialog
				this.call();
			}
		}

		Self.display = 1;
		if (!UI.B.firefox) {
			UI.C(UI.B.ie ? document.documentElement : document.body,'overflowX','hidden');
		}
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
		var Self = this;
		setTimeout(function(){
			UI.hide(Self._load);
		},0);
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
		Self.show({html:'<div class="popBox"><span class="ico_tsW"><span class="ico_te"></span></span><h3>' + str + '</h3><p><input type="button" value="' + _('知道了') + '" onclick="MI.dialog.hide()"></p></div>',end:call});
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
/*MI.DialogTip = function(o){
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

MI.DialogMsg = function(o){
	o = o || {};
	//o.tmpl = '<div class="bg"></div><div style="position:absolute;z-index:999;top:0;left:25%;padding:25px" class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm" style="overflow:hidden"></td><td class="tr"></td></tr><tr><td class="lm"></td><td style="*padding:0;"><div class="floatWrap"><div class="close DClose"></div><div class="DTitle" style="padding:0;border:0;"></div><div class="DLoad"></div><div class="DCont" style="padding:0;border:0;background:none;"></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	o.tmpl = '<div class="bg"></div><div class="D"><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><div class="DClose close"></div><div class="DLoad"></div><div class="DCont"></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	MI.Dialog.call(this,o);
}
MI.DialogMsg.prototype = MI.Dialog.prototype;*/
MI.PV = function(name){
	if (window.pvCurUrl && pvCurUrl != '') {
		//if (!pvCurUrl.match(new RegExp(name + '$'))) {
			pvCurUrl = '/' + name;
		//}
		pvRepeatCount = 1;
		if(typeof(pgvMain) == 'function') pgvMain();
	}
}
MI.Code = function(){
	var Self = this;
	Self._body = UI.html(MI.tmpl.code)[0];
	Self._msg = $$(Self._body,'h3')[0]; //
	Self._code = $$(Self._body,'img')[0];
	Self._form = $$(Self._body,'form')[0];
	Self._codeChange = $$(Self._body,'.codeChange')[0];
	Self._btn = $$(Self._body,'button');
	Self._value = $$(Self._body,'input')[0];

	//Event
	Self._btn[0].onclick = submit;
	Self._btn[1].onclick = function(){
		MI.dialog.hide();
	}
	Self._codeChange.onclick = function(){
		Self._code.src = UI.A(Self._code,'crs') + '&' + Math.random();
		Self._value.focus();
		return false;
	}
	Self._form.onsubmit = submit;
	function submit(){
		var value = Self._value.value;
		if (!value || value.length < 4 || value.length > 5) {
			Self._value.focus();
			Self._msg.innerHTML = _('你输入的验证码有误，请重新输入');
		}
		else if (value) {
			MI.dialog.hide();
			if (Self.call) {
				setTimeout(function(){
					//平台的验证码为-100，其他均为微博自己的验证码，需要把类型加到code里面返回给后台PHP处理
					if (Self.type && Self.type != '-100'){
						value += ',' + Self.type;
					}
					Self.call(value);
				},300);
			}
		}
		return false;
	}
}
MI.Code.prototype = {
	type : null, //验证码类型
	typeCheck : {
		'-100' : 1,
		'-110' : 1
	},
	check : function(type){ //验证码校验
		this.type = type;
		return this.typeCheck['' + type];
	},
	show : function(o){ // o = {msg:'您的操作出现异常，请输入验证码',code:'http://ptlogin2.qq.com/getimage?aid=13001401&Math.random()',call:function(){}}
		var Self = this,dialog = MI.dialog,content,width;
		this._msg.innerHTML = o.msg;
		this._value.value = '';
		this.call = o.call;
		this._code.src = o.code + '&' + Math.random();
		UI.A(this._code,'crs',o.code);
		if (dialog.display) { //Show Old Dialog When Close Verify Code's Dialog
			content = dialog._cont.firstChild;
			width = dialog.width;
			Self.end = function(){
				dialog.show({html:content,width:width,end:function(){
					Self.end = null;
				}});
			}
		}
		dialog.show({
			html:this._body,
			width:o.width || 363,
			end:Self.end
		});
		setTimeout(function(){
			Self._value.focus();
		},0);
	}
}
MI.DisableDblClickSelect = function(obj){
	if (obj) {
		var aau = "_MouseDownNoSelect_";
		function getAtts() {
			return (obj.getAttribute(aau) || "").toString().split(",");
		}
		function setAtts(jz, ao) {
			obj.setAttribute(aau, [jz, ao]);
		}
		function now() {
			return + new Date;
		}
		if (getAtts().length == 1) {
			setAtts(now(), "up");
			obj.onmousedown = function(ag) {
				var hd = now(),
				vb = parseInt(getAtts()[0]);
				setAtts(hd, "down");
				if (hd - vb < 500) {
					UI.E(ag).prevent();
				}
			}
			obj.onmouseup = function() {
				setAtts(getAtts()[0], "up");
			}
			obj.onselectstart = function(ag) {
				if (getAtts().pop() == "up") {
					UI.E(ag).prevent();
				}
			}
		}
	}
	return obj;
}
MI.MsgBox = function(id){ //MsgBox
	var Self = new MI.TalkBox(id);
	Self.txtTipSend = _('发送中');
	Self._msgTo = Self.$('.msgTo');
	Self._num = $$('.msgNum');
	Self.type = 3;
	Self.url = MI.url.message;
	Self.msgTo = {};
	Self.getMsgTo = function(){
		var name = Self._msgTo.value;
		if (name){
			MI.ajax({
				url : MI.url.userCard,
				type : 'get',
				data : {
					u : name,
					r : MI.random()
				},
				success : function(data){
					data = MI.json(data);
					if (data.result == 0){
						data.info.name = name;
						var gender = data.info.gender ? _('他') : _('她');
						if (data.info.gender == 2){
							gender = _('它');
						}
						data.info.gender = gender;
						Self.msgTo[name] = data;
					}
				}
			});
		}
	}
	Self.successStart = function(data){
		var name = Self._msgTo.value;
		if (data.result == 0){
			if (Self.msgTo[name] && !Self.msgTo[name].info.follow){
				MI.confirm({
					type : 'success',
					title : data.msg,
					content : _('你还没有收听{0}，收听后才能收到的{1}回信',Self.msgTo[name].info.nick,Self.msgTo[name].info.gender),
					confirmTxt : _('立即收听'),
					cancelTxt : _('以后再说'),
					confirm : function(){
						MI.follow(Self.msgTo[name].info.name,UI.html('<b></b>')[0],function(isFollow){
							if (!MI.user.fun.followList) MI.tip(_('收听成功'));
						});
						MI.Bos('btnMsgFollow');
					},
					cancel : function(){
						MI.Bos('btnMsgFollowCancel');
					}
				});
			}
			else {
				MI.tip(data.msg);
			}
		}
	}

	if (!UI.B.ie6 || !UI.hasClass(Self._txt,'noAutoCmt')) {
		new MI.AutoCmt({
			target : Self._msgTo,
			type : 2,
			tips : _('只能发给收听你的用户'),
			call : function(){
				Self.countTxt();
			}
		});
	}

	//Event
	UI.EA(Self._msgTo,'keyup',count); //IE和FF中的执行顺序有差异，比较郁闷...
	UI.EA(Self._msgTo,'keydown',count);
	UI.EA(Self._msgTo,'blur',count);
	function count(){
		Self.countTxt();
	}
	return Self;
}
MI.MsgList = function(id){ //MsgList
	var Self = new MI.TalkList(id);
	Self.removeTip = _('确定删除这条私信？');
	//Self.removeUrl = '/del.php';
	return Self;
}
/**
 * 对话框
 * @constructor
 *            @example
 *            MI.reply = new MI.Reply();
 *            MI.reply.show({
 *                title : '写出你的生存技巧：',
 *                cont : '我的生存技巧……',
 *                height : 40
 *            });
 */
MI.Reply = function(boxType){ //Reply Dialog
	
	var Self = this,talkBox;

	Self._body = UI.html(MI.tmpl.reply)[0];
	UI.hide(Self._body);

	Self.talkBox = new MI.TalkBox(Self._body);
	Self._talkTo = $$(Self._body,'.replyTitle')[0];
	Self._msg = $$(Self._body,'.msg')[0];
	Self.talkBox.boxType = boxType;
	
	talkBox = Self.talkBox;
	talkBox._btn.value = '发送';
	talkBox.txtTipSend = _('发送中');
	talkBox.successStart=function(){
		MI.dialog.showTip({html:_('发送成功!')});
		if(boxType=='recom') {
			MI.ajax({url:MI.url.comm,data:{accounts:talkBox.recomAccount}});
		}
	}
	talkBox.success=function(){
		UI.removeClass(talkBox._body,'pubSuc');
	}

	if(boxType=='trans') {
		Self.talkBox.topic = _('#我来翻译#');
	}
}
MI.Reply.prototype = {
	/**
	 * 对话框DOM
	 * @type Object
	 */
	
	/**
	 * TalkBox对象
	 * @type Object
	 */
	talkBox : null,
	/**
	 * 弹出对话框
	 * @type Object
	 *            @example
	 *            MI.reply = new MI.Reply();
	 *            MI.reply.show({
	 *                title : '写出你的生存技巧：',
	 *                cont : '我的生存技巧……',
	 *                height : 40
	 *            });
	 */
	show : function(obj){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({html:Self._body,width:475});
		Self._talkTo.innerHTML = _('对 <b>{0}</b> 说:',talkBox.talkTo);
		talkBox._txt.value = '';
		talkBox.talkId = '';
		talkBox.type = '';
		
		if (obj){
			if (obj.title){
				Self._talkTo.innerHTML = obj.title;
			}
			if (obj.cont){
				talkBox._txt.value = obj.cont;
			}
			if (obj.height){
				UI.C(talkBox._txt,'height',obj.height + 'px');
			}
			if(obj.type) {
				talkBox.type = obj.type;
			}

			if(obj.talkId) {
				talkBox.talkId = obj.talkId;
			}
			if(obj.offsetY) {
				$$(document.body,'.CR')[0].style.top = obj.offsetY + 'px';
			}

			if (obj.success) {
				talkBox.success = function () {
					if (obj && obj.success) {
						obj.success();
						obj = null;
					}
					UI.removeClass(talkBox._body,'pubSuc');
				};
			}
		}
		if ((obj && obj.doFocus !== false) || !obj) {
			setTimeout(function(){
				MI.focus(talkBox._txt);
				talkBox.countTxt();
			},200);
		}
	}
}

MI.Recom = MI.Reply;
MI.TransMe = MI.Reply;



MI.Msg = function(){ //Msg Dialog
	var Self = this,talkBox;
	
	UI.hide(Self._body);
	
	Self.talkBox = new MI.MsgBox(Self._body);
	talkBox = Self.talkBox;
	talkBox.success = function(){
		UI.removeClass(talkBox._body,'pubSuc');
	}
}
MI.Msg.prototype = {
	_body : UI.html(MI.tmpl.msgBox)[0],
	show : function(){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({width:570,html:Self._body,start:function(){
			//talkBox._msgTo.value = msgTo ? msgTo : '';
			talkBox._txt.value = '';
			UI.removeClass(talkBox._btn,'btnNoStr');
			/*try{setTimeout(function(){
				talkBox._msgTo.focus();
				if (talkBox._msgTo.value) talkBox._txt.focus();
			},0);}catch(e){};*/
		}});
		talkBox.getMsgTo();
		setTimeout(function(){
			talkBox._txt.focus();
			talkBox.countTxt();
		},0);
	}
}
/**
 * 翻页控件
 * @namespace MI.Page 翻页控件
 * @constructor
 * @param {Object} Object 配置
 *            @example
 *            Self.page = new MI.Page({
 *                target : Self._facePage, //翻页DOM
 *                call : function(num){ //回调函数
 *                    
 *                },
 *                num : 3, //当前页左右的页数
 *                max : 200 // 最多页数 默认0 任意页
 *            });
 */
MI.Page = function(obj){
	var Self = this;
	Self.num = obj.num || 3;
	Self.max = obj.max || 0;
	Self.target = obj.target || UI.DC('b');
	Self.target.onclick = function(e){
		var target = UI.E(e).target;
		if (target.nodeName == 'A' && !UI.hasClass(target,'disabled')){
			Self.show(Number(UI.A(target,'page')),Self.total);
		}
		return false;
	}
	if (obj.call){
		Self.call = obj.call;
	}
	if (obj.total){
		Self.total = obj.total;
	}
}
/**
 * 显示翻页
 * @param {Number} Number 当前页码
 * @param {Number} Number 总页码
 *            @example
 *            MI.page.show(5,10);
 */
MI.Page.prototype.show = function(cur, total, toCallback){
	var Self = this,
		num = Self.num;
	total = total || Self.total;
	if (!total) return;
	total = !Self.max || total < Self.max ? total : Self.max;
	Self.total = total;
	
	if (total > 1) {
		if (cur > total){
			cur = total;
		}
		else if (cur < 1){
			cur = 1;
		}
		var html = [],start,end;
		html.push('<a page="' + (cur - 1) + '" ' + (cur == 1 ? 'class="disabled"' : 'href="#"') + '>' + _('上一页') + '</a>');
		html.push('<a page="1" ' + (cur == 1 ? 'class="cur"' : 'href="#"') + '>1</a>');
		if (total > 2) {
			if (cur - num > 2) {
				html.push('<span>...</span>');
			}
			start = cur > num + 1 ? cur - num : 2;
			if (total - start < num * 2) {
				start = total - num * 2;
				if (start < 2) {
					start = 2;
				}
			}
			end = start + (start == 2 ? num * 2 : num * 2 + 1);
			for (var i = start;i < end && i < total;i++) {
				html.push('<a page="' + i + '" ' + (cur == i ? 'class="cur"' : 'href="#"') + '>' + i + '</a>');
			}
			if (i <= total - 1) {
				html.push('<span>...</span>');
			}
		}
		html.push('<a page="' + total + '" ' + (cur == total ? 'class="cur"' : 'href="#"') + '>' + total + '</a>');
		html.push('<a page="' + (cur + 1) + '" ' + (cur == total ? 'class="disabled"' : 'href="#"') + '>' + _('下一页') + '</a>');
		Self.target.innerHTML = html.join('');
		UI.show(Self.target);
	}
	else {
		UI.hide(Self.target);
	}
	if (Self.call && (typeof(toCallback) === 'undefined' || !!toCallback)){
		Self.call(cur);
	}
}
MI.Card = function(){ //Info Card	资料卡
	var Self = this,
		_body = Self._body,
		follow = 'addAttention',
		unfollow = 'delAttention',
		uneach = 'delEach',
		replyBox,msgBox,recomBox,reFollowBox,txtMax;
	Self._pic = $$(_body,'.userPic a')[0];  //a
	Self._name = $$(_body,'.userName')[0];  //用户名
	Self._num = $$(_body,'.nums')[0];	   //广播和听众数
	Self._note = $$(_body,'.note')[0];	  //备注
	Self._reply = $$(_body,'.reply')[0];	//对话
	Self._msg = $$(_body,'.msg')[0];		//私信，只能发给自己的听众
	Self._follow = $$(_body,'.' + follow)[0];	  //收听
	Self._unfollow = $$(_body,'.' + unfollow)[0];  //取消收听
	Self._uneach = $$(_body,'.' + uneach)[0]; //取消相互收听
	Self._more = $$(_body,'.more')[0];			//更多
	Self._moreFun = $$(_body,'.moreFun')[0];   //更多下拉列表
	Self._black = $$(_body,'.black')[0];	  //拉黑
	Self._chat = $$(_body,'.chat')[0];		//聊天
	Self._list = $$(_body,'.list')[0];		 //名单
	Self._recom = $$(_body,'.recom')[0];	  //推荐												  
	Self._reFollow = $$(_body,'.reFollow')[0]; //求收听
	Self._report = $$(_body,'.report')[0];	  //举报
	Self._blackTip = $$(_body,'.tip')[1];	 //特殊提示 “这是你自己”...
	Self._sFollow = $$(_body,'.ico_sFo')[0];  //添加到特别收听
	Self._tag = $$(_body,'.tagBox')[0];	   //标签
	Self._sepline = $$(_body,'.sepline')[0]; //分隔符
	Self._uIntro = $$(_body,'.uIntro')[0]; //简介
	Self._company = $$(_body,'.company')[0]; //公司信息
	Self._school = $$(_body,'.school')[0]; //学校和院系
	Self._uRela = $$(_body,'.uRelaBox')[0]; //我收听的人中收听他的
	Self._addQQ = $$(_body,'.addqq')[0];  //加QQ
	Self._rf = $$(_body,'.rf')[0]; //共同朋友展示
	Self.creatBox = function(){
		Self.reply = new MI.Reply();  
		Self.msg = new MI.Msg();
		Self.recom = new MI.Recom('recom');
		Self.reFollow = new MI.Reply('reFollow');
		reFollowBox = Self.reFollow.talkBox;
		replyBox = Self.reply.talkBox;
		msgBox = Self.msg.talkBox;
		recomBox = Self.recom.talkBox;
		txtMax = replyBox.txtMax;	
		Self.creatBox = function(){} 
	}
	if (MI.Note){
		Self.updateName = MI.Note.updateName;  
	}

	//Event
	Self._pic.onclick = function(){
		MI.Bos('btnCardHead'); 
	}
	Self._body.onclick = function(e){
		if (UI.hasClass(this,'small')) {  
			document.location.href = Self.baseUrl + '/' + Self.account;
		}
		UI.E(e).stop();
	}
	Self._body.onmouseout = function(){
		Self.hide();   
	}
	Self._body.onmouseover = function(){
		clearTimeout(MI.Card.hideCard);	
		UI.show(Self._body);   
	}
	Self._follow.onclick = function(){
		var sFollow = Self._sFollow,
			T = this;
		//if (!this.send) {
			MI.follow(Self.account,T,function(isFollow){
				UI.hide(Self._follow);
				if(Self.follow && Self.followed)
					UI.show(Self._uneach);
				else
					UI.show(Self._unfollow);
				UI.show(Self._sFollow);
				if (MI.user.fun.note){
					UI.show(Self._note);
				}

				var o = MI.Card.users[Self.account];
				o.follow = 1;
				UI.removeClass(sFollow,'foLight');
				sFollow.title = MI.sFollowTip[0];
				o.num[1]++;
				Self.num(o);
				Self._follow.className = follow;
				
				//更新[添加备注]模式
				var P = UI.next(Self._target.parentNode.parentNode),
					note = $$(P,'.nickFun')[0],
					noteBtn = $$(P,'.nickFun a')[0];
				if (note){
					UI.show(note);
				}

				if (Self.followCall) {
					Self.followCall(isFollow,T);
				}
				//UI.hide(Self._rf);
				/*
				UI.animate($$(Self._rf,'dl')[1],'opacity',0,function(){
					Self.getCommenFriend(Self.account,0);
				});
				*/
				MI.Bos('btnCardFollow');
				//this.send = 0;
			});
		//}
		//this.send = 1;
		return false;
	}
	Self._uneach.onclick = Self._unfollow.onclick = function(){
		var T = this;
		//if (!this.send) {
			MI.follow(Self.account,T,function(isFollow){
				//UI.hide(Self._unfollow);
				UI.hide(T);
				UI.hide(Self._sFollow);
				UI.hide(Self._note);
				UI.show(Self._follow);
				var o = MI.Card.users[Self.account];
				o.follow = 0;
				if (o.group) {
					o.group.im = 0;
				}
				o.num[1]--;
				o.bkname = '';
				Self.num(o);
				Self.setName(o);
				Self._unfollow.className = unfollow;
				
				//更新卡片用户姓名
				Self.updateName(Self.name,Self.title);
				
				//更新[添加备注]模式
				var P = UI.next(Self._target.parentNode.parentNode),
					note = $$(P,'.nickFun')[0],
					noteBtn = $$(P,'.nickFun a')[0];
				if (note){
					UI.hide(note);
					UI.removeClass(note,'nickFunDis');
					UI.A(noteBtn,'note','');
					noteBtn.innerHTML = _('添加备注');
				}

				if (Self.followCall) {
					Self.followCall(isFollow,T);
				}
				/*
				UI.animate($$(Self._rf,'dl')[0],'opacity',0,function(){
					Self.getCommenFriend(Self.account,1);
				});
				*/
				MI.Bos('btnCardUnFollow');
				//this.send = 0;
			});
		//}
		//this.send = 1;
		return false;
	}
	Self._note.onclick = function(){
		MI.Note.add(this,function(data){
			var o = MI.Card.users[Self.account];
			if (o){
				o.bkname = data.bkname;
			}
			
			//更新卡片用户姓名
			Self.updateName(data.bkname || Self.name,Self.title);
			
			//更新[添加备注]模式
			var P = UI.next(Self._target.parentNode.parentNode),
				note = $$(P,'.nickFun')[0],
				noteBtn = $$(P,'.nickFun a')[0];
			if (note){
				if (data.bkname){
					UI.addClass(P,'nickFunDis');
				}
				else {
					UI.removeClass(P,'nickFunDis');
				}
				noteBtn.innerHTML = data.bkname || _('添加备注');
				UI.A(noteBtn,'note',data.bkname);
			}
		});
		MI.Bos('btnNoteCardAdd');
		return false;
	}
	Self._reply.onclick = function(){
		Self.creatBox();
		var type,talkId = '';
		if (Self.chName && Self.chName.match(/^[^\d]/g)){
			//对话某人
			replyBox.topic = '@' + Self.chName + ' ';
			type = 7;
		}
		else {
			//对话某条消息
			talkId = Self.chName;
			replyBox.topic = '';
			type = 2;
		}
		replyBox.talkTo = Self.bkname || Self.name;
		replyBox.txtMax = txtMax - replyBox.topic.length;
		Self.reply.show({
			type : type,
			talkId : talkId
		});
		MI.Bos('btnCardReply');
		return false;
	}
	//求收听
	Self._reFollow.onclick = function(){
		if(UI.hasClass(this,'disabled')) return false;
		var content = _('我收听你了，你也快来收听我吧！');
		Self.creatBox();
		reFollowBox.topic = '@' + Self.account + ' ';
		reFollowBox.talkTo = Self.bkName || Self.name;
		reFollowBox.txtMax = txtMax - reFollowBox.topic.length - content.length;
		Self.reFollow.show({
			type : 7,
			//talkId:Self.chName,
			cont : content,
			title:_('邀请') + ' <b>' + (Self.bkname || Self.name) + '</b> ' + _('收听你:') + '<span class="gray">' + _(' (会作为一条半公开的对话发出来)') + '</span>'
		});
		if(Self._moreFun.style.display != 'none') MI.Bos('btnCardReFollow');
		return false;
	};
	Self._msg.onclick = function(){
		if (MI.user.fun.msgLab){
			if (!UI.hasClass(this,'disabled')){
				MI.pmcompose(Self.chName, 1);
			}
			return false;
		}
		Self.creatBox();
		if (!UI.hasClass(this,'disabled')) {
			msgBox._msgTo.value = Self.chName;
			Self.msg.show();
			MI.Bos('btnCardMsg');
		}
		else {
			MI.Bos('btnCardMsgDisabled');
		}
		return false;
	}
	Self._black.onclick = function(){
		var o = MI.json(UI.A(this,'rel'));
		o.txt = [_('拉黑'),_('取消拉黑')];
		o.target = this;
		o.call = function(){
			var obj = MI.Card.users[o.u],isBlack = UI.hasClass(o.target,'blackDel');
			if (obj.follow && isBlack) {
				obj.follow = 0;
				if (obj.group) {
					obj.group.im = 0;
				}
				obj.num[1]--;
			}
			obj.block = isBlack;

			if (Self.blackCall) {
				Self.blackCall(isBlack);
			}
		};
		MI.black(o);
		return false;
	}
	Self._sFollow.onclick = function(){
		var follow = UI.hasClass(this,'foLight') ? 0 : 1;
		MI.sFollow(Self.account,this,function(isFollow){
			var user = MI.Card.users[Self.account];
			if (user.group) {
				user.group.im = follow;
			}
			if (Self.sFollowCall) {
				Self.sFollowCall(isFollow);
			}
		});
		if (follow) {
			MI.Bos('btnCardSFollow');
		}
		else {
			MI.Bos('btnCardUnSFollow');
		}
		return false;
	}
	//聊天
	Self._chat.onclick = function(){
		if(!Self.chat) return false;
		MI.chat(Self.account,Self.name,Self.avatar);
		MI.Bos('btnCardChat');
		return false;
	}
	//加qq
	Self._addQQ.onclick = function(){
		if(UI.hasClass(Self._addQQ,'disabled') != true)
		{
			MI.Bos('btnCardQQ');
			MI.addQQ(Self.name,Self.qq,Self.account,MI.user.name,MI.user.account,Self.gender,MI.Uin(),Self.addQQ);
			return false;
		}
		else
			return false;
	}
	//名单
	Self._list.onclick = function(){
		MI.app({
			List:function(){
				MI.List.listFollow(Self.account,{title:_('名单分组'),bkname:' ',foset:' '});
			}	
		});
		MI.Bos('btnCardList');
		return false;
	}
	//举报
	Self._report.onclick = function(){
		MI.report(Self.account);
		MI.Bos('btnCardReportUser');
		return false;
	}
	//推荐
	Self._recom.onclick = function(){
		Self.creatBox();
		recomBox.recomAccount = Self.account; 
		Self.recom.show({cont:_('#推荐收听# {0} 是个挺有趣的人，大家快来强势围观吧。','@'+Self.account),
				title:_('把 <b>{0}</b> 介绍给大家:',Self.bkname || Self.name)});
		MI.Bos('btnCardRecom');
		return false;
	}
	//更多
	Self._more.onmouseover = function(){
		UI.show(Self._moreFun);
		UI.addClass(Self._more,'hover');
	}

	Self._more.onmouseout = function(){
		clearTimeout(Self._more.delay);
		Self._more.delay = setTimeout(function(){
			UI.hide(Self._moreFun);
			UI.removeClass(Self._more,'hover');
		},1000);	
	}

	Self._moreFun.onmouseover = function(){
		clearTimeout(Self._more.delay);
		UI.show(Self._moreFun);
		UI.addClass(Self._more,'hover');
	}

	Self._moreFun.onmouseout = function(){
		UI.hide(Self._moreFun);
		UI.removeClass(Self._more,'hover');
	}

	Self._company.onmousedown = function(){
		MI.Bos('btnCardCompany');
	}
}
MI.Card.prototype = {
	_body : UI.html(MI.tmpl.card)[0],
	_target : null, // 目标Dom
	title : '', // 用户链接的标题
	account : '', // 帐号
	chName : '', // 中文账号
	name : '', // 昵称
	bkname : '', // 备注
	target : null, // 目标Dom
	avatar : '',
	addQQ : '', //是否设置为允许加qq
	qq : '', //用户qq号
	follow : '', //收听了他
	followed : '', //听众
	gender : '', //性别
	baseUrl:'http://t.qq.com',		// 根URL 如：http://t.qq.com
	getPos : function(el){
		var x = UI.getX(el) + (parseFloat(UI.C(el,'paddingLeft')) || 0);
		var y = UI.getY(el) + (parseFloat(UI.C(el,'paddingTop')) || 0);
		
		//解决祖先元素有滚动条的情况下，UI.getY计算不准确的问题，必要时考虑修改UI.getY方法
		var tmpParent = el.parentNode;
		while(tmpParent && (tmpParent != document.body)) {
			if(tmpParent.scrollTop) {
				y -= tmpParent.scrollTop;
			}	
			tmpParent = tmpParent.parentNode;
		};
		if(this.cType == '2') {
			var wHeight = UI.windowHeight();  //窗体高度
			var sHeight = UI.scrollY(document.documentElement || document.body); //垂直滚动高度
			var cHeight = UI.height(this._body) || 100;   //资料卡高度
			var eHeight = UI.height(el) > 20 ? 17 : UI.height(el); 	//目标元素的高度,链接换行的话，取单行行高17
			var dHeight = 10;	//资料卡距离链接的位置
			if(y + cHeight + dHeight > wHeight + sHeight){
				y = y - cHeight - dHeight;
				UI.addClass(this._body,'cardB');
			}
			else {
				y = y + eHeight + dHeight;
				UI.removeClass(this._body,'cardB');
			}
		}
		else if((this.cType == '3' || this.cType == '4') && x < 260) {	  //资料卡加箭头宽度260，css中负margin-left的值
			UI.removeClass(this._body,'cardR');
			UI.addClass(this._body,'cardL');
			x = x + 260 + UI.width(el) + 10;   //箭头宽度10
		}
		return{
			x : x,
			y : y
		}
	},
	setPos : function(el){
		var _pos = this.getPos(el);
		this._body.style.left = _pos.x + "px";
		this._body.style.top = _pos.y + "px";
	},
	//获取共同朋友或者相似朋友 type=0，已收听，显示相似朋友，type=1，未收听，显示共同朋友
	getCommenFriend : function(account,type){
		var Self = this;
		if(MI.Card.commenFriends && MI.Card.commenFriends[account] && MI.Card.commenFriends[account][type]){
			Self.showCommenFriend(MI.Card.commenFriends[account][type],type);
		}
		else{
			var commenUrl = MI.url.relations + '/' + account + ',' + MI.user.account + '/same_idol.json';
			var urlRelation = type ? commenUrl : MI.url.recommend;
			MI.ajax({
				url : urlRelation,
				data : type ? {} : {srv:"common_old",medium:account,count:5},
				success : function(data){
					data = MI.json(data);
					if(data.result == 0) {
						Self.showCommenFriend(data.info,type);
						//做缓存，防止多次重复调用接口
						MI.Card.commenFriends[account] = {};
						MI.Card.commenFriends[account][type] = data.info;
					}
					else
						UI.hide(Self._rf);
				}
			});
		}
	},
	showCommenFriend : function(o,type){
		var Self = this;
		if(o.list && o.list.length){
			var str = '';
			var index = 0;
			UI.each(o.list,function(p){
				if(index<5){
					var href = '/' + p.name;
					str += '<a href="' + href + '">'
					str += '<img onerror="MI.Pic(this,30)" title="' + p.nick + '(@' + p.name + ')" src="' + (p.avatar ? p.avatar + '/30' : 'http://mat1.gtimg.com/www/mb/images/head_50.jpg') + '" />';
					str += '</a>';
					index ++;
				}
			});
			var commenAnother = type==1 ? 0 :1;
			var domDl = $$(Self._rf,'dl');
			$$(Self._rf,'.commenNum')[type].innerHTML = type==1 ? _('{0}位共同朋友:',index) : _('与他相似的人：');
			$$(Self._rf,'.commenFriend')[type].innerHTML = str;
			UI.show(domDl[type]);
			UI.C(domDl[type],'opacity','1')
			UI.hide(domDl[commenAnother]);
			UI.show(Self._rf);
		}
		else
			UI.hide(Self._rf);
	},
	show : function(el){
		var Self = this;
		if (Self.target == el) {
			UI.show(Self._body);
			return;
		}
		var cType = UI.A(el,'ctype');
		
		if(cType=='2') {   //talkList中的账户链接
			var P = el;
			var pic = '';
		}
		else {
			var P = el.parentNode;
			var pic = el.src;
			//填写工作信息 etc
			if (P.href.indexOf('/setting_work.php')!=-1) {  //暂时没有好的判断方法，回头让后台补充区分标记
				return;
			}
			if (pic){
				Self._pic.innerHTML = '<img src="' + pic  + '">'; 
			}
		};
		
		var title = UI.A(P,'rel') || '@..',
			reg = /@[^@]+$/g,
			account = MI.string.id(P.href.split('?')[0]);
		if(UI.A(P,'account')) account = UI.A(P,'account'); //兼容广告帐号href有变化的情况
		var chName = title.match(reg)[0].slice(1,-1), //含中文ID
			name = title.replace(reg,'').slice(0,-1),
			url = Self.baseUrl + '/' + account,
			uRela = UI.A(P,'uRela') || '',
			Time,Time_1,Time_2,Time_3;
		Self._body.className = 'uCard' + ' cType' + cType + ' card' + [0,1,'T','R','R'][cType*1];
		Self.cType = cType;
		Self.account = account;
		Self.name = name;
		Self.chName = chName;
		Self._pic.href = url;
		Self.uRela = uRela;
		//Self._pic.innerHTML = '<img src="' + pic + '">';   //构建头像html
		UI.hide(Self._follow);
		UI.hide(Self._unfollow);
		UI.hide(Self._uneach);
		//UI.hide(Self._msg);
		Self.setPos(el);   //loading时候重新确定一下loading的位置
		if(Self.cType == '1') {
			UI.addClass(Self._body,'small');
		} 
		else {	
			UI.addClass(Self._body,'loading');
		}
		UI.append(Self._body,document.body);  //追加到body最后
		UI.removeClass(Self._body,'isMe');
		UI.show(Self._body);
		Self._target = Self.target = el;
		UI.hide(Self._rf);
		if (MI.Card.users[account]) {
			show(MI.Card.users[account]);  //从缓存中读取
		}
		else {
			Time = + new Date();
			MI.ajax({
				url : MI.url.userCard,
				type : 'get',
				data : 'u=' + account + '&t=' + Self.cType +'&r='+MI.random(),
				success : function(data){
					Time_1 = + new Date() - Time;
					data = MI.json(data);
					/*data = {
						result : 0,
						msg : '',
						info : {
							nick : '',
							follow : true,
							followed : true,
							block : 0,
							//vip : true,
							//vv : false,
							gender : 0,
							flag : {
								auth : 0,
								vivi : 0,
								expo : 0
							},
							num : [12,281,123], //[广播数,听众数,收听人数]
							group : {
								im : 0
							},
							avatar,
							tag : '',
							uIntro : '',
							company : {
								comName : '',
								href : ''
							},
							school : {
								name : '',
								href : '',
								objectName : '',
								objectHref : ''
							},
							
						}
					}*/
					if (data.result == 0) {
						show(data.info);
						MI.Card.users[account] = data.info;  //缓存
					}
					else {
						Self.hide();
					}
					
					//Speed
					Time_2 = + new Date() - Time;
					setTimeout(function(){
						Time_3 = + new Date() - Time;
						MI.Speed('t_asyn_card',0.1,Time_1,Time_2,Time_3);
					},0);
				}
			});
		}
		function show(o){
			var notSelf = Self.account.toLocaleLowerCase() != MI.user.account.toLocaleLowerCase(),btn;
			if(o.follow && o.followed) btn = Self._uneach;
			else if(o.follow) btn = Self._unfollow;
			else btn = Self._follow;
			var sFollow = Self._sFollow,
				note = Self._note,
				gender = o.gender ? _('他') : _('她'),
				rel;
			Self.bkname = o.bkname;
			Self.name = o.nick;
			Self.avatar = o.avatar;
			Self.title = (Self.bkname || Self.name) + '(@' + (Self.chName || Self.account) + ')';
			Self.chat = o.chat;
			if(MI.user.fun.chat!== 1) {
				UI.hide(Self._chat);
			}
			else {
				UI.show(Self._chat);
				if(!Self.chat) {
					UI.addClass(Self._chat,'disabled');
				} else {
					UI.removeClass(Self._chat,'disabled');
				}
			}
			//增加资料卡里显示加qq的逻辑
			Self.addQQ = o.addQQ; //用户是否设置为允许加qq
			Self.qq = o.qq; //用户qq号
			Self.follow = o.follow;
			Self.followed = o.followed;
			Self.gender = o.gender;
			/* if(MI.user.isLab != 1) { //是否是实验室用户
				UI.hide(Self._addQQ);
			}
			else {
			*/
				UI.show(Self._addQQ);
				//互听用户“加QQ可点”
				if(!(Self.follow && Self.followed)) {
					UI.addClass(Self._addQQ,'disabled');
				}
				else {
					UI.removeClass(Self._addQQ,'disabled');
				}
			//}
			//加qq逻辑结束
			if(Self.cType != '1'){
				var _picLink = o.avatar;
				_picLink = _picLink ? _picLink + '/50' : 'http://mat1.gtimg.com/www/mb/images/head_50.jpg';
				Self._pic.innerHTML = '<img src="' +  _picLink + '" />';   //构建头像html
			}
			if (o.gender == 2) {
				gender = _('它');
			}
			Self.gender = gender;
			rel = "{u:'" + Self.account + "',name:'" + (Self.bkname || Self.name) + "',sex:'" + Self.gender + "'}";
			if (o.block) {
				Self._black.innerHTML = _('取消拉黑');
				UI.addClass(Self._black,'blackDel');
				Self._blackTip.style.display = 'block';
				Self._blackTip.innerHTML = '<a href="#" class="right blackDel" rel="' + rel + '">[' + _('移出') + ']</a>' + _('{0}在你的黑名单里',Self.gender);
				$$(Self._blackTip,'a')[0].onclick = Self._black.onclick;
			}
			else {
				Self._black.innerHTML = _('拉黑');
				UI.removeClass(Self._black,'blackDel');
				UI.hide(Self._blackTip);
			}
			UI.A(Self._black,'rel',rel);
			Self.num(o);
			Self.setName(o);
			if (notSelf) {
				btn.style.display = 'block';
			}
			else {
				UI.addClass(Self._body,'isMe');
			}
			if (o.mail || (notSelf && o.followed)) {
				UI.removeClass(Self._msg,'disabled');
				Self._msg.title = '';
			}
			else {
				UI.addClass(Self._msg,'disabled');
				Self._msg.title = _('私信只能发给你的听众');
			}
			if (o.follow && notSelf && !o.followed){  //已收听，未被收听
				UI.removeClass(Self._reFollow,'disabled');
			}
			else {
				UI.addClass(Self._reFollow,'disabled');
			}
			if (notSelf && o.follow) {
				if (o.group) {
					if (o.group.im) {
						UI.addClass(sFollow,'foLight');
						sFollow.title = MI.sFollowTip[1];
					}
					else {
						UI.removeClass(sFollow,'foLight');
						sFollow.title = MI.sFollowTip[0];
					}
					UI.show(sFollow);
				}
				else {
					UI.hide(sFollow);
				}
				UI.show(note);
			}
			else {
				UI.hide(sFollow);
				UI.hide(note);
			}
			
			//备注
			UI.A(note,'account',Self.account);
			UI.A(note,'chName',Self.chName);
			UI.A(note,'note',o.bkname || '');
			UI.A(note,'nick',o.nick);
			if (!MI.user.fun.note){
				UI.hide(Self._note);
			}

			if(Self.cType != '3' && Self.cType != '4') {
				o.company = o.school = '';
			}
			if(o.tag || o.uIntro || o.company || o.school) {
				 //显示分隔符
				UI.show(Self._sepline)
			}
			else {
				UI.hide(Self._sepline);
			}
			if (o.tag) {
				Self._tag.innerHTML = _('标签：') + o.tag + '';
				if((Self.cType == '3' || Self.cType == '4') || (o.uIntro || o.company || o.school)) {
				   var  sList=$$(Self._tag,'span'),num = 0,len = 0,sTag = true;  
					UI.each(sList,function(o,i){
						if(sTag) {
							num += MI.string.length(UI.text(o))*6 + 8;   //半个字符6px，margin-right的8px，暂时没有完美的解决办法，先这样
							if(num>185) {								//超过185px，截取
								len = sList.length - i;
								sTag = false;
							}
						}
					});
					while(len) {
						Self._tag.removeChild(Self._tag.lastChild);
						len--;
					}
					if(!sTag) {
						Self._tag.innerHTML += '<span class="etc"><a title="' + _('更多') + '" href="' + Self.baseUrl + '/' + Self.account + '">...</a></span>';
					}		

				}
				UI.show(Self._tag);
			}
			else {
				UI.hide(Self._tag);
			}
			//简介
			if (o.uIntro) {
				Self._uIntro.innerHTML = o.uIntro;
				var _uTitle = UI.text(Self._uIntro); //显示以后再计算和截取
				if(MI.string.length(_uTitle) > 72) {
					Self._uIntro.title = _uTitle;
					Self._uIntro.innerHTML = MI.string.cut(_uTitle,72,'...');
				}
				else {
					Self._uIntro.removeAttribute('title');
				}
				
				UI.show(Self._uIntro);
			}
			else {
				UI.hide(Self._uIntro);
			}		
			if (o.company) {
				var comName =  MI.string.cut(o.company.comName,30,'...');
				Self._company.innerHTML =  _('公司：') + '<a href="' + o.company.href + '" title="' + o.company.comName + '">' + comName + '</a>';
				UI.show(Self._company);
			}
			else {
				UI.hide(Self._company);
			}
			if (o.school) {
				var schoolName,schoolNameAll,objectName,objectNameAll;
				schoolName = schoolNameAll = o.school.name || '';
				var schoolHref = o.school.href || '';
				objectName = objectNameAll = o.school.objectName || '';
				var objectHref = o.school.objectHref || '';
				if(MI.string.length(schoolName + objectName) > 30) {
					schoolName = MI.string.cut(schoolName,14,'...');
					objectName = MI.string.cut(objectName,12,'...');
				}
				if(objectHref) {
					Self._school.innerHTML =  _('学校：') + '<a href="' + schoolHref + '" title="' + schoolNameAll + '">' + schoolName + '</a> <a href="' + objectHref + '" title="' + objectNameAll + '">' + objectName + '</a>';
					UI.EA($$(Self._school,'a')[1],'mousedown',function(){
						MI.Bos('btnCardSchoolObject');
					});
				}
				else {
					Self._school.innerHTML =  _('学校：') + '<a href="' + schoolHref + '" title="' + schoolNameAll + '">' + schoolName + '</a> <span title="' + objectNameAll + '">' + objectName + '</span>';
				}
				UI.EA($$(Self._school,'a')[0],'mousedown',function(){
					MI.Bos('btnCardSchool');
				});
				UI.show(Self._school);
			}
			else {
				UI.hide(Self._school);
			}
			//显示共同朋友或者相似朋友
			var type=0;
			if(o.follow) type=0;
			else type=1;
			//Self.getCommenFriend(Self.account,type);
			//我收听的人中收听他的
			Self._uRela.innerHTML = Self.uRela;
			Self._uRela.style.display = Self.uRela ? 'block' : 'none';
			

			//clearTimeout(Self.deelay);
			UI.removeClass(Self._body,'loading');
			UI.removeClass(Self._body,'small');
			Self.setPos(el);	//所有内容完全显示后再次设置定位
			MI.Bos('btnCardOpen',null,0.01);
		}
	},
	setName : function(o){
		var Self = this,
			icon = '';
		for (var i = 0,len = MIIco.length;i < len;i++) {
			if (o.flag[MIIco[i]]) {
				icon += MIIcoHtml[i];
				break;
			}
		}
		if (o.icon){
			icon += o.icon;
		}
		Self._name.innerHTML = '<a href="'+ Self.baseUrl +'/' + Self.account + '">' + (o.bkname || o.nick) + '</a>' + icon + '<br /><span class="en">' + (o.bkname ? o.nick : '') + '@' + Self.chName + '</span>';
	},
	updateName : function(){
	},
	num : function(o){
		var num = o.num;
		this._num.innerHTML = _('广播{0}条',num[0]) + '<span>' + (o.flag.vivi ? '' : '|</span>' + _('听众{0}人',num[1]) + '');//|</span>收听了' + num[2] + '人
	},
	//hide : function(){
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
	clearTimeout(MI.Card.hideCard);
	MI.Card.delay = setTimeout(function(){
		MI.card.show(el.nodeName == 'SPAN' ? el.parentNode : el); //识别span，兼容搜索结果页的标红问题，暂时先这样处理 by xhlv
	},400);
}
MI.Card.users = {};
MI.Card.commenFriends = {};
MI.Card.hide = function(){
	clearTimeout(MI.Card.delay);
	clearTimeout(MI.Card.hideCard);
	MI.Card.hideCard = setTimeout(function(){	//鼠标离开头像，滑向选项卡过程中会触发mouseout事件，所以做延迟处理
		MI.card.hide();
	},500);
}
MI.Card.build = function(el,className,cType){
	if (!MI.user.fun.card){
		return;
	}
	cType = cType || 1;
	UI.each($$(el,className),function(o){
		if (!UI.A(o,'card')) {
			UI.A(o,'card','1');
			UI.A(o,'ctype',cType);

			var P = cType === 2 ? o : o.parentNode;
			UI.A(P,'rel',P.title);
			o.title = P.title;
			if (o.title && MI.string.account(o.title)){
				UI.EA(o,'mouseover',MI.Card.show);
				UI.EA(o,'mouseover',function(){
					P.title = o.title = '';
				});
				UI.EA(o,'touchstart',MI.Card.show);
				UI.EA(o,'mouseout',MI.Card.hide);
				UI.EA(o,'touchend',MI.Card.hide);
				UI.EA(o,'click',function(){
					MI.Bos('btnHead');
				});
			}
		}
	});
}
MI.GoTop = {
	_body : UI.html('<div class="sToolbar single"><div class="bg"></div><div class="sToolbarBg"><em></em></div></div>')[0],
	_mBox : UI.html('<div class="mSimpleBox" style="display:none"><a href="#" class="ico_mState" style="display:none"></a><button class="btn_mPlay">' + _('播放') + '<b class="mask"></b></button><button class="btn_mPause" style="display:none">' + _('暂停') + '<b class="mask"></b></button><b class="mbg"></b></div>')[0],
	_tBox : UI.html('<div class="goTopBox" style="display:none"><a href="#" class="btn_goTop" onclick="window.scrollTo(0,0);MI.Bos(\'btnTop\');this.blur();return false" title="' + _('返回顶部') + '">' + _('返回顶部') + '<b class="mask"></b></a></div>')[0],
	_qBox : UI.html('<div class="qTalkBox"><a href="#" onclick="return false" class="btn_qTalk" title="' + _('实时聊天加载中...') + '"><b class="mask"></b></a></div>')[0],
	_qqBox : UI.html('<div id="EQQ_Container"></div>')[0],
	delay : {},
	resize : 0,
	btnNum : 1,
	chat : 0, //是否有聊天按钮
	btnClass : ['sToolbar single','sToolbar double','sToolbar'],
	btnSet : function(){ //外层按钮样式名控制
		var Self = this;
		Self._body.className = Self.btnClass[Self.btnNum - 1];
	},
	position : function(){
		if (MI.user.fun.goTop){
			this.build();
		}
	},
	build : function(target) {
		var Self = this;
		target = target || $('mainWrapper');
		if (!Self._target){
			Self._target = target;
		}
		if (UI.hasClass(document.body,'ipad') || !Self._target) {
			return;
		}
		if (!MI.newCountShow || document.location.href.hasString('/k/') || document.location.href.hasString('/search/')){
			MI.newCount && MI.newCount((MI.user.fun.relayFilter ? '14' : '4') + ',2,1,20,18,19');
		}
		if (UI.isNumber(MI.user.fun.chat)){
			//载入WebQQ
			setTimeout(function(){
				MI.app({WebQQ:function(){
					var qbox = $$(MI.GoTop._qBox,'.btn_qTalk')[0];
					if (qbox){
						UI.C(qbox,'background','none');
						UI.C(qbox,'filter','');
						qbox.title = '';
					}
				}});
			},50);
		}
		var leftFix = 5,//UI.B.ie ? 1 : 3, //各浏览器fix统一修改为5px，css中统一控制了。
			rightFix = 6,
			_main = Self._target,
			//left = UI.getX(_main) + UI.width(_main) - leftFix,
			left,
			right,
			foot,
			windowHeight = UI.windowHeight(),
			pageHeight = UI.pageHeight(),
			scrollY,
			resize,
			y,
			state = MI.music.state;
		if (UI.isNumber(MI.user.fun.chat)){
			Self.chat = 1;
		}
		if (UI.B.ie6){
			rightFix -= 5;
		}
		else if (UI.B.ie){
			rightFix -= 4;
		}
		if (!window.innerWidth){ //修正滚动条宽度
			rightFix += 21;
		}
		if (UI.B.mac){ //修正Mac滚动条宽度
			rightFix += 2;
		}
		if(UI.pageHeight() <= UI.windowHeight()){ //没有滚动条时
			rightFix += 15;			
		}
		if (_main) {
			UI.after(Self._mBox,$$(Self._body,'.bg')[0]);
			if (Self.chat){
				UI.after(Self._qBox,$$(Self._body,'.bg')[0]);
				UI.append(Self._qqBox,document.body);
			}
			else {
				//Self.btnClass = ['sToolbar single','sToolbar single','sToolbar double'];
				Self.btnClass.unshift(Self.btnClass[0]);
			}
			UI.after(Self._tBox,$$(Self._body,'.mSimpleBox')[0]);
			UI.append(Self._body,document.body);
			Self.musicBoxEvent();
			if(state!=null){
				UI.show(Self._mBox);
			}
			foot = pageHeight - (UI.getY(_main) + UI.height(_main));
			position();
			Self._body.onfocus = function(){
				this.blur();
			}
			/*Self._body.firstChild.onclick = function(){
				clearInterval(Self.delay.scroll);
				Self.delay.scroll = UI.animate(document.body,'scrollTop',0);
				return false;
			}*/
			UI.EA(window,'scroll',position);
			UI.EA(window,'resize',position);

		}
		resize = 1;
		set();
		function position(e){
			resize = (e && UI.E(e).type == 'resize') || Self.resize;
			clearTimeout(Self.delay.position);
			if (UI.B.ie6) {
				if (MI.dialog && MI.dialog.display){ //Kill Dialog Bug When Scrolling Page
					return;
				}
				UI.hide(Self._body);
				UI.hide(Self._qqBox);
			}
			Self.delay.position = setTimeout(set,UI.B.ie ? 1000 : 100);
			if (MI.card){
				MI.card.hide();
			}
		}
		function set(){
			var state =  MI.music.state;
			pageHeight = UI.pageHeight();
			if (resize) {
				windowHeight = UI.windowHeight()
				left = UI.getX(_main) + UI.width(_main) - leftFix;
				right = UI.windowWidth() - UI.getX(_main) - UI.width(_main) - 30 - 31 + rightFix;
				Self.resize = 0;
			}
			scrollY = UI.scrollY();
			if (parseInt(UI.C(Self._body,'left')) != left){
				Self._body.style.cssText = 'left:' + left + 'px;';
			}
			if (parseInt(UI.C(Self._qqBox,'right')) != right){
				Self._qqBox.style.cssText = 'right:' + right + 'px;';
			}
			if(scrollY < 52){
				UI.hide(Self._tBox);
				Self.btnNum = state != null ? 2 : 1;
				if (!Self.chat && state == null){
					UI.hide(Self._body);
				}
			}
			else{
				Self.btnNum--;
				UI.show(Self._tBox);
				UI.show(Self._body);
				if(state != null){
					UI.show(Self._mBox);
				}
				if (Self.chat){
					UI.show(Self._body);
				}
				Self.btnNum = state != null ? 3 : 2;
			}
			Self.btnSet();
			y = scrollY + windowHeight - pageHeight;
			if (y >= -foot) {
				Self._body.style.cssText += ';position:absolute;top:' + (pageHeight - 37 - foot) + 'px';
				Self._qqBox.style.cssText += ';position:absolute;top:' + (pageHeight - foot) + 'px';
			}
			else if (UI.C(Self._body,'position') == 'absolute'){
				Self._body.style.cssText = 'left:' + left + 'px;';
				Self._qqBox.style.cssText = 'right:' + right + 'px;';
			}
		}
	},
	showMusicBox : function(state){//1:播放，0|null:暂停
		var Self = this,
			tBoxDisplay = Self._tBox.style.display != 'none',
			mBox = Self._mBox,
			mState = $$(mBox,'.ico_mState')[0],
			mPlay = $$(mBox,'.btn_mPlay')[0],
			mPause = $$(mBox,'.btn_mPause')[0],
			s;
		//var state = MI.music.state;
		Self.btnNum = Self._tBox.style.display != 'none' ? 3 : 2;
		Self.btnSet();
		if (Self.chat || tBoxDisplay || state != null){
			UI.show(Self._body);
		}
		UI.show(mBox);
		if(state==1){
			s=_('正在播放 ');
			UI.show(mState);
			UI.hide(mPause);
			UI.hide(mPlay);
		}else{
			s=_('点击播放 ');
			UI.show(mPlay);
			UI.hide(mPause);
			UI.hide(mState);
		}
		mBox.title = s + MI.music.info.songName + '-' + MI.music.info.singerName;
	},
	hideMusicBox : function(){
		var Self = this,
			tBoxDisplay = Self._tBox.style.display != 'none';
		Self.btnNum = tBoxDisplay ? 2 : 1;
		Self.btnSet();
		UI.hide(Self._mBox);
		setTimeout(function(){
			if (!Self.chat && !tBoxDisplay && MI.music.state == null){
				UI.hide(Self._body);
			}
		},0);
	},
	musicBoxEvent : function(){
		var Self = this;
		var state = 0;
		var mBox = Self._mBox,
			mState = $$(mBox,'.ico_mState')[0],
			mPlay = $$(mBox,'.btn_mPlay')[0],
			mPause = $$(mBox,'.btn_mPause')[0];
		mBox.onmouseover = function(){
			state = MI.music.state;
			if(state!=0 && state!=1 && state!=2 && state!=6){
				UI.show(mPause);
				UI.hide(mPlay);
			}else{
				UI.show(mPlay);
				UI.hide(mPause);
			}
			UI.hide(mState);
		}
		mBox.onmouseout = function(){
			state = MI.music.state;
			if(state!=0 && state!=1 && state!=2 && state!=6){
				UI.show(mState);
				UI.hide(mPlay);
			}else{
				UI.show(mPlay);
				UI.hide(mState);
			}
			UI.hide(mPause);
		}
		mPlay.onclick = function(){
			MI.TalkList.musicPlay(MI.music.info);
			MI.Bos('btnMiniPlayerPlay');
		}
		mPause.onclick = function(){
			MI.TalkList.musicStop();
			MI.Bos('btnMiniPlayermPause');
		}
	}
}
UI.EA(window,'unload',function(){
	//避免刷新后插件继续播放音乐
	try{MI.TalkList.musicStop()}catch(e){}
	
	//内存回收
	/*if (window.CollectGarbage) {
		CollectGarbage();
	}
	if (MI.talkBox && MI.talkBox.autoSave) {
		MI.talkBox.save();
	}
	try{
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
	}catch(e){}*/
});

})();
