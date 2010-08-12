﻿/*
	Json Interface:
		{
			result : 0,
			msg : '发言成功',
			info : {
				id : '123456',
				time : '5分钟前',
				content : '内容'
			}
		}

		{
			result : 0,
			msg : '发言成功',
			info : [
				{
					name : 'xhlv',
					nick : 'xhlv',
					pic : 'http://mat1.gtimg.com/www/mb/images/img2.jpg'
				}
			]
		}

	Cookie:
		refresh 广播大厅自动刷新： 0不刷新、1刷新
		mb_vT_[account] 查看消息列表类型（viewType）： 只看原创|简约模式|只看我收听的人|客人页只看原创|客人页简约模式

	LocalStorage:
		option_[type]_[account] 首页右侧栏：1展开、-1收起 （type = topic/recommend/follow/hot）
		tips_[type]_[account] 提示：1显示、-1隐藏 （type = relayList）
*/
/*
	MI.Bos('');

	talkBox:
		btnTopic 新建话题
		btnPic 上传图片
		btnPicCancel 图片上传中取消
		btnPicDel 图片删除
		btnSend 广播
		btnSendReply 对话发送
		btnSendRelay 转播
		btnSendMsg 私信
		btnOpenTalk 来说两句（话题）
		btnCloseTalk 收起来说两句（话题）
		btnCtrlEnter 快捷键
		btnGuideLink 引导词链接
		btnAutoAtAccount 使用@联想

	talkList:
		btnCardOpen 展开资料卡片
		btnCardFollow 资料卡片中收听
		btnCardReply 资料卡片中对话
		btnCardMsg 资料卡片中私信
		btnCardUnFollow 资料卡片中取消收听
		btnCardHead 点击资料卡中用户头像
		btnCardSFollow 资料卡中特殊收听
		btnCardUnSFollow 资料卡中取消特殊收听
		btnHead 点击用户头像
		btnPicBig 放大图片
		btnPicSmall 缩小图片
		btnPicWhirl 旋转图片
		btnReport 举报
		btnReply 对话
		btnViewReply 查看对话
		btnComt 评论
		btnRelay 转播
		btnFav 收藏
		btnUnFav 取消收藏
		btnDel 删除
		btnClose 对话转播的关闭
		btnAddReply 引入XXX的点评
		btnkNew 新消息
		btnMore 更多消息（点击）
		btnMoreAuto 更多消息（自动）
		btnTop 返回顶部
		btnTime 广播时间链接点击
		btnViewType0 只看原创
		btnViewType1 简约模式
		btnViewType2 只看我收听的人
		btnViewType_0 只看原创（客人页）
		btnViewType_1 简约模式（客人页）
		btnTopicFirst 话题首页按钮
		btnTopicLast 话题尾页按钮

	msgList:
		btnReplyMsg 回复私信
		btnOpenSendMsg 发私信（打开发私信浮层）

	start:
		btnStep1 上一步（引导）
		btnStep2 下一步（引导）
		btnStepColse 关闭（引导）
		btnStepTip1 第一课结束
		btnStepTip2 第二课结束
		btnStepTip3 下课
		btnStepTip4 逃课
		btnFollowAll 收听他们（引导页）
		btnFollowNone 跳过这一步（引导页）
	
	side:
		btnSide1 （侧栏）头像
		btnSide2 （侧栏）主页预览
		btnSide3 （侧栏）我的听众数
		btnSide4 （侧栏）我的新增听众数
		btnSide5 （侧栏）我的广播数
		btnSide6 （侧栏）我的主页
		btnSide7 （侧栏）我的广播
		btnSide8 （侧栏）提到我的
		btnSide9 （侧栏）新增提到我的数
		btnSide10 （侧栏）我的收藏
		btnSide11 （侧栏）私信
		btnSide12 （侧栏）新增私信数
		btnSide13 （侧栏）手机直接访问t.3g.qq.com
		btnSide14 （侧栏）手机客户端更新微博
		btnSide15 （侧栏）短信/彩信更新微博
		btnSide16 （侧栏）立即下载
		btnSide17 （侧栏）意见反馈
		btnSide18 （侧栏）新手学堂

	other:
		btnRefresh 自动刷新（广播大厅）
		btnUnFoldrecommend 展开我可能认识的人
		btnFoldrecommend 收起我可能认识的人
		btnUnFoldfollow 展开我收听的人
		btnFoldfollow 收起我收听的人
		btnUnFoldtopic 展开我收听的话题
		btnFoldtopic 收起我收听的话题
		btnUnFoldhot 展开热门话题
		btnFoldhot 收起热门话题
		btnMoreTopic 查看更多热门话题
		btnHotPeople1 - btnHotPeople12 分类推荐页签（第1个～第12个）
		btnUser_liuxiang btnUser_juntang ... （找人页）用户点击量
		btnTopic_1 -  btnTopic_90 （话题页）话题点击量
		btnReportUser 客人页举报
		btnTopicSearch 相关话题（综合搜索页）
		btnCityHistory 最近看过的地方
		btnHotPeopleGuide1 - btnHotPeopleGuide12 引导页分类推荐页签（第1个～第12个）
		btnCityTopic 同城话题
		btnFollowAllSide 全部收听（广播大厅）
		btnRegFollowUserUp 引导页推荐给你上方用户点击
		btnRegFollowUserDown 引导页推荐给你下方用户点击
		btnRegError 注册表单填错
		btnFollowKnowUsers 收听可能认识的人
		btnUnFollowKnowUsers 取消收听可能认识的人
		btnQuickViewFriends 快速访问（好友列表）
		btnViewAgainstTab 查看世界杯对阵页签（广播大厅）
		btnHotTopicListNew_1 新热门话题列表
		btnHotTopicList_1 热门话题列表
		btnRegSet 注册完成设置
		btnLoginError 登录错误
		btnSetSpecilFollowShow 设置特别收听展示
		btnRemoveKnowUsers 移出收听可能认识的人
		btnChangeKnowUsers 换一批收听可能认识的人
		btnPhoneTip 首页手机发微博Tips
		btnPhoneIconTip 手机图标Tips中“这里”
		btnFollowQQFriend 收听QQ好友
		btnViewUrl 查看原链接
		btnTopic_GSZQNSL1 甘肃泥石流点击统计-我的主页
		btnTopic_GSZQNSL2  甘肃泥石流点击统计-广播搜索结果页
		btnTopic_GSZQNSL3  甘肃泥石流点击统计-话题页
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
//举报
function jubao(urlParam){
	var url="http://jubao.qq.com/cgi-bin/jubao?";
	if(urlParam!='') url += urlParam;

	var wrap = UI.html('<div style="width:620px;height:436px;overflow:hidden;border:solid #FFF;border-width:5px 0 10px"><iframe src="about:blank" frameborder="0" scrolling="no" onload="MI.dialog.hideLoad()"></iframe></div>')[0],oIFrame = wrap.firstChild;
	oIFrame.style.cssText = 'width:628px;height:470px;background:#FFF;margin:-13px 0 0 -5px;-margin-top:-32px;border-style:none';
	MI.dialog.show({title:'腾讯举报平台',width:670,html:wrap});
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
var V1='talk[i].source',V2='info.source',V3='<div class="SA"><em>◆</em><span>◆</span></div>',V5=' href="#"',V6=' onerror="MI.Pic(this,50)"',V7=' title="<%=talk[i].nick.toTitle()%>(@<%=talk[i].name%>)"';
MIIco = ['auth','expo']; //Set Icon's Order
MIIcoHtml = ['<a href="/certification" target="_blank" class="vip" title="腾讯认证"></a>','<a href="http://blog.qq.com/zt/2010/2010expo/shibovol.htm" title="2010上海世博志愿者" target="_blank" class="ico_expo"></a>'];
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
	tmpl : {
		listAll : '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>"<%if(fav){%> fav="<%=talk[i].favortimestamp%>"<%}%> rel="<%=talk[i].timestamp%>"><%if(!guest){%><%if('+V1+' && talk[i].type==4){%><div class="userPic"><a href="/<%=talk[i].name%>"'+V7+' class="masPic"><img src="<%=talk[i].pic%>"'+V6+'/></a><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)" class="cusPic"><img src="<%='+V1+'.pic%>"'+V6+'/></a></div><%}else{%><div class="userPic"><a href="/<%=talk[i].name%>"'+V7+'><img src="<%=talk[i].pic%>"'+V6+'/></a></div><%}%><%}%><div class="msgBox"><div class="userName" rel="<%=talk[i].name%>"><strong><a href="/<%=talk[i].name%>"'+V7+'><%=talk[i].nick%></a>'+MI_icon('talk[i].flag')+'<%=talk[i].icon%><%if(!'+V1+'){%>:<%}%></strong><%if('+V1+' && talk[i].type==2){%>转播:&nbsp;<%}else if('+V1+' && talk[i].type==4){%>对<strong class="userTo"><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%='+V1+'.nick%></a>'+MI_icon(V1+'.flag')+'说:<%}%></strong></div><div class="msgCnt"><%=talk[i].content||"&nbsp;"%></div><%if(talk[i].image && talk[i].image.length){%><div class="picWrap"><%for(var j=0;j<talk[i].image.length;j++){%><div class="picBox"><a href="<%=talk[i].image[j]%>/460" class="pic"><img class="crs" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%=talk[i].image[j]%>/160<%}%>"></a></div><%}%></div><%}%><%if('+V1+' && talk[i].type==2){%><div class="replyBox"><div class="msgBox"><div class="msgCnt"><strong><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%='+V1+'.nick%></a>'+MI_icon(V1+'.flag')+'<%='+V1+'.icon%>:</strong><%='+V1+'.content%></div><%if('+V1+'.image && '+V1+'.image.length){%><div class="picWrap"><%for(var j=0;j<'+V1+'.image.length;j++){%><div class="picBox"><a href="<%='+V1+'.image[j]%>/460" class="pic"><img class="crs" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%='+V1+'.image[j]%>/160<%}%>"></a></div><%}%></div><%}%><%if('+V1+'.videos && '+V1+'.videos.length){%><div class="videoWrap"><div class="videoBox"><div class="vTools"><a href="#" class="vClose"><em></em>收起</a><a href="<%='+V1+'.videos[0].realUrl%>" class="vUrl" target="_blank"><em></em><%if('+V1+'.videos[0].title){%><%=MI.string.cut('+V1+'.videos[0].title,40)%><%}%></a></div><div class="vWrap"><%if(iconPic){%><a href="#" class="vSimple" url="<%='+V1+'.videos[0].playerUrl%>" style="display:block"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/vSimple.png" /></a><%}else{%><a href="#" class="vThumbs" url="<%='+V1+'.videos[0].playerUrl%>"><span class="mask"><em></em></span><img class="crs" crs="<%='+V1+'.videos[0].miniPicUrl%>" /></a><%}%></div></div></div><%}%><div class="pubInfo"><span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" href="/p/t/<%='+V1+'.id%>" target="_blank"><%='+V1+'.time%></a> <%='+V1+'.from%> <%if(MI.user.account){%><a href="/p/z/<%='+V1+'.id%>" class="zfNum" target="_blank">查看转播(<b class="relayNum"><%='+V1+'.count%></b>)</a><%}else{%><span class="zfNum"><b class="relayNum"><%='+V1+'.count%></b>人转播</span><%}%></span><%if(MI.user.account&&UI.isNumber('+V1+'.comt)){%><div class="funBox"><a href="/p/c/<%='+V1+'.id%>" class="comt">评论</a><a href="/p/c/<%='+V1+'.id%>" target="_blank">(<em><%='+V1+'.comt%></em>条)</a></div><%}%></div></div></div><%}%><%if(talk[i].videos && talk[i].videos.length){%><div class="videoWrap"><div class="videoBox"><div class="vTools"><a href="#" class="vClose"><em></em>收起</a><a href="<%=talk[i].videos[0].realUrl%>" class="vUrl" target="_blank"><em></em><%if(talk[i].videos[0].title){%><%=MI.string.cut(talk[i].videos[0].title,40)%><%}%></a></div><div class="vWrap"><%if(iconPic){%><a href="#" class="vSimple" url="<%=talk[i].videos[0].playerUrl%>" style="display:block"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/vSimple.png" /></a><%}else{%><a href="#" class="vThumbs" url="<%=talk[i].videos[0].playerUrl%>"><span class="mask"><em></em></span><img class="crs" crs="<%=talk[i].videos[0].miniPicUrl%>" /></a><%}%></div></div></div><%}%><div class="pubInfo"><span class="left"><a class="time" href="/p/t/<%=talk[i].id%>" target="_blank"><%=talk[i].time%></a> <%=talk[i].from%><%if(talk[i].count){if(MI.user.account){%> <a href="/p/z/<%=talk[i].id%>" class="zfNum" target="_blank">查看转播(<b class="relayNum"><%=talk[i].count%></b>)</a><%}else{%> <span class="zfNum"><b class="relayNum"><%=talk[i].count%></b>人转播</span><%}}%><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%> <a class="view zfNum" href="/p/r/<%=talk[i].id%>">查看对话</a><%}%></span><div class="funBox"<%if(!MI.user.account){%> style="display:none"<%}%>><%if(UI.isNumber(talk[i].comt)){%><a href="#" class="comt">评论</a><a href="/p/c/<%=talk[i].id%>" target="_blank">(<em><%=talk[i].comt%></em>条)</a><span>|</span><%}%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><a'+V5+' class="delBtn">删除</a><span>|</span><a'+V5+' class="relay">转播</a><%}else{%><a'+V5+' class="reply">对话</a><span>|</span><a'+V5+' class="relay">转播</a><%}%><span>|</span><a'+V5+' class="fav<%if(fav){%> light<%}%>" title="<%if(fav){%>取消<%}%>收藏"></a><%}%></div></div><%if('+V1+' && talk[i].type==4){%><div class="talkDetail"><b><%='+V1+'.nick%>:</b> <%='+V1+'.content%></div><%}%></div></li><%}%>',
		picTool : '<div class="tools"><a href="#" class="btnBack"><em></em>向左转</a><span>|</span><a href="#" class="btnPrev"><em></em>向右转</a><a href="$Url/2000" class="btnOriginal" target="_blank">查看原图</a></div>',
		videoTool : '<div class="vTools" style="display:block"><a href="#" class="vClose"><em></em>收起</a><a href="$VideoRealUrl" class="vUrl" target="_blank"><em></em>$VideoTitle</a></div>',
		videoThumbs : '<a href="#" class="vThumbs" url="$VideoPlayUrl"><span class="mask"><em></em></span><img src="$VideoPicUrl" /></a>',
		videoObject : '<div class="vBox" style="display:block"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0" width="460" height="372" ><param name="wmode" value="transparent" /><param name="movie" value="$VideoPlayUrl" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="flashvars" value="playMovie=true"></object></div>',
		videoEmbed : '<div class="vBox" style="display:block"><embed src="$VideoPlayUrl" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="460" height="372" allowScriptAccess="always" allowFullScreen="true" flashvars="playMovie=true" wmode="transparent"></embed></div>',
		msg : '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>"><div class="msgBox"><div class="userName">发给 <a href="/<%=talk[i].name%>" title="<%=talk[i].nick%>(@<%=talk[i].name%>)"><%=talk[i].nick%></a>'+MI_icon('talk[i].flag')+'</div><div class="msgCnt"><%=talk[i].content%></div><div class="pubTime"><span class="time"><%=talk[i].time%></span></div><p class="btnBox"><a href="#" class="replyMsg btn" rel="<%=talk[i].name%>">再写一封</a><a class="btn delBtn"'+V5+'>删除</a></p></div></li><%}%>',
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
						alert(data.msg);
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
							alert(data.msg);
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
									_new.innerHTML = '<a href="javascript:void(0)" tabindex="4">有' + tip + '新广播，点击更新</a>';

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
/*
MI.DropTips = function(id){ //DropTips For Top Search
	var Self = this;
	this._key = $(id);
	if (this._key) {
		this._form = UI.parent(this._key);
		this._btn = this._key.nextSibling;
		this._select = UI.html('<ul class="dropTips"><li class="on">找人</li><li>搜话题</li></div>')[0];
		this._list = $$(this._select,'li');
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
		this._key.previousSibling.onclick = function(){
			Self._key.focus();
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
	},
	submit : function(){
		var action = this.action[this.index],value = encodeURIComponent(this._key.value);
		document.location.href = action + (action.hasString('?') ? value : encodeURIComponent(value));
	}
}*/
MI.SmartBox = function(id,callback,type,style){ //input element,callback,search type
	if(!$(id)) return;
	var Self = this;
	this._callback = callback?callback:null;
	this._key = $(id);
	this._server = '/asyn/messagetips.php';//smartbx统一服务接口
	this._type = type?type:'';//数据类型
	this._fix = UI.B.ie?[0,0]:[1,2];//用于修复ie，ff下的位置

	this._style = style?style:{left:0,top:0,width:306};
	this._pos = { //获取smartbox input 坐标
		x : UI.getX(this._key),
		y : UI.getY(this._key)
	};

	//初始化smartbox容器
	this._select = UI.html('<div class="smartBox"></div>')[0];
	this._list = [];//消息条数
	UI.append(this._select,document.body);
	this._key.blur();
	Self.hide();

	this._tip = this._key.previousSibling,this.tip = this._tip && this._tip.nodeName == 'LABEL';
	if (this.tip) {
		this._tip.onclick = function(){
			Self._key.focus();
		}
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
		setTimeout(function(){
			Self.hide();
		},500);
	});

	/*this._key.onblur = function(){
		if(!this.value) UI.show(UI.prev(this));
	}*/
	this._key.onbeforeeditfocus = function(){
		if(!Self.isDisplay) Self.hide();
	}
	this._key.onclick = function(e){
		UI.E(e).stop();
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
			return;
		}
		if (E.key == 40 || E.key == 38) {
			if (E.key == 38) {
				Self.index = (Self.index - 1 < 0) ? (Self.indexMax) :(Self.index - 1);
			}else if (E.key == 40) {
				Self.index = (Self.index + 1 > Self.indexMax) ? 0 :(Self.index + 1)
			}
			this.value = Self._list[Self.index].innerHTML;
			Self.select(Self.index);
		}else if (E.key == 13 || E.key == 27) { //Space Key : || E.key == 32 || E.key == 229
			if (E.key == 27) {
				Self.hide();
			}
			else {
				Self.select();
			}
		}
	}
	this._key.onkeyup = function(e){
		var E = UI.E(e);
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
	hide : function(){
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
		if(this.timer)	clearTimeout(this.timer);
		this.timer=window.setTimeout(function(){
			UI.get(
				'/asyn/messagetips.php',
				"key=" + encodeURIComponent(value),
				function(data){
					data = MI.json(data);
					if (data.result == 0) {
						if(data.info && data.info.length > 0){
							var s = [];
							var l = data.info.length;
							Self.indexMax = l - 1;
							Self.index = -1;
							s.push('<ul>');
							for(var i=0;i<l;i++){
								//s.push('<p>' + Self.termJson(data.info[i],[Self.keyword]) + '</p>');
								s.push('<li value=\"'+ data.info[i] +'\">' + data.info[i] + '</li>');
							}
							s.push('</ul>');
							Self._select.innerHTML = s.join("");
							Self.show();
							Self._list = $$(Self._select,'li');
							//Event
							UI.each(Self._list,function(el,i){
								el.onmouseover = function(){
									Self.select(i);
								}
								el.onclick = function(){
									Self._key.value = this.innerHTML;
									Self.submit();
								}
							});
						}else{Self.hide();}
						
						//Callback Function
						//if (call) {
							//call();
						//}
					}else{Self.hide();}
				}
			)
		},150);
	},
	submit : function(){
		if(this._callback) this._callback();
		//var action = this.action,value = encodeURIComponent(this._key.value);
		//document.location.href = action + (action.hasString('?') ? value : encodeURIComponent(value));
	}
}
MI.AutoCmt = function(o){ //Auto Complete
	/*
		URL : /asyn/nicktips.php?type=1&num=100 //0-All, 1-Following, 2-Followed(Use In Message)
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
	Self.minWidth = o.minWidth; //Min Width

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
		var text,textEnd,textLength,
			value = Self._target.value;
		if (Self.clicks > 0) {
			Self.clicks--;
			return;
		}
		Self.cursorX = MI.cursorX(Self._target);
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

		//if (Self.word) { //E.key == 50
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

			var type = 'follow_' + Self.type + '_',
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
				UI.get('/asyn/nicktips.php','user=' + MI.user.account + '&type=' + (Self.type ? Self.type : 0) + '&num=' + (UI.B.ie ? 1000 : 2000),function(data){
					//data = '{"result":0,"info":{"hecaitou":"Lecter","clarence":"kaka","pony":"pony","patrick":"贺炜","thomas":"唐沐"}}';
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
				/*
				if (MI[usersStorageKey] && MI[usersStorageKey].info) {
					MI[usersStorageKey].info[MI.user.account] = MI.user.name; //Add Current User's Account
				}
				*/
				Self.show(MI[usersStorageKey]);
			}
		/*}
		else {
			Self.hide();
		}*/
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

			//Save Use History
			MI.insertTxt(this._target,txt + ' ',this.cursorX,this.word.slice(1).length);
			count = MI.users[txt];
			MI.users[txt] = count ? count + 1 : 1;

			if (!this.key) {
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
		//if (this.word) {
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
					if (matchLength >= 40) {
						break;
					}
					if (i.match(reg) || users[i].match(reg)) {
						//match.push(MI.string.html(o.info[i].replace(reg,html) + ' (' + i.replace(reg,html) + ')').replace(/з/,'<b>').replace(/З/,'</b>'));
						match.push(users[i].replace(reg,'<b>' + RegExp.$1 + '</b>') + ' (' + i.replace(reg,'<b>' + RegExp.$1 + '</b>') + ')');
						txt.push(i);
						txtObj[i] = 1;
						matchLength++;
					}
					index++;
				}
				if (matchLength < 40) {
					for (var i in users) {
						if (matchLength >= 40) {
							break;
						}
						if (( i.slice(1).match(regAll) || users[i].slice(1).match(regAll) ) && !txtObj[i]) {
							match.push(users[i].replace(regAll,'<b>' + RegExp.$1 + '</b>') + ' (' + i.replace(regAll,'<b>' + RegExp.$1 + '</b>') + ')');
							txt.push(i);
							txtObj[i] = 1;
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
						if(userNick) { //判断常用联系人是否在当前联系人中
							match.push(userNick + ' (' + userName + ')');
							matchLength++;
							txt.push(userName);
						}
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
				if (this.minWidth && UI.width(this._body) <= this.minWidth) {
					this._body.style.width = this.minWidth + 'px';
				}
				if (this.align == 'right') {
					x = x - (UI.width(this._body) - UI.width(this._target));
				}
				this._body.style.cssText += ';top:' + y + 'px;left:' + x + 'px';
			}
			this.display = 1;
		/*}
		else {
			this.hide();
		}*/
		function select(){
			Self.select();
			if (Self.clickCall) {
				Self.clickCall();
			}
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
	//Self._body.innerHTML = o.tmpl || '<div class="bg"></div><div class="CR"><div class="top"><span class="left"><em></em></span><span class="right"><em></em></span></div><div class="DTitle"></div><a' + V5 + ' class="DClose" title="关闭">关闭</a><div class="DLoad"></div><div class="DCont"></div><div class="bot"><span class="left"><em></em></span><span class="right"><em></em></span></div></div>';
	var html = o.tmpl || '<div class="bg"></div><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><a title="关闭" class="DClose close" href="#">关闭</a><div class="DLoad"></div><div class="DCont"></div></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div>'
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
		UI.C(Self._wrap,'width',Self.width + 'px');
		UI.C(Self._wrap,'opacity',0);
		UI.show(Self._body);

		css = 'width:' + Self.width + 'px;margin:' + ( UI.scrollY() - UI.height(Self._wrap)/2 ) + 'px 0 0 -' + Self.width/2 + 'px;';
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
		UI.C(UI.B.ie ? document.documentElement : document.body,'overflowX','hidden');
	},
	hide : function(){
		UI.hide(this._body);
		this.hideLoad();
		if (this.end) {
			this.end();
		}
		this.display = 0;
		UI.C(UI.B.ie ? document.documentElement : document.body,'overflowX','auto');
	},
	showLoad : function(){
		this._load.style.cssText = 'width:' + UI.width(this._cont) + 'px;height:' + UI.height(this._cont) + 'px';
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
		Self.show({width:UI.width(Self._cont) + 40});
		btn = $$(Self._cont,'input')[0];
		if (btn) {
			btn.focus();
		}
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
	var filter = /^draft|top|time|option|tips/,local = window.localStorage; //|follow @联想数据过大，有时后会有问题
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
MI.videoThumb = function(o,size){
    size = size ? size : 50;
	o.src = 'http://mat1.gtimg.com/www/mb/images/vNoThumbs.jpg';
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
MI.Code = function(){
	var Self = this;
	this._body = UI.html(MI.tmpl.code)[0];
	this._msg = $$(this._body,'h3')[0]; //
	this._code = $$(this._body,'img')[0];
	this._form = $$(this._body,'form')[0];
	this._codeChange = $$(this._body,'.codeChange')[0];
	this._btn = $$(this._body,'button');
	this._value = $$(this._body,'input')[0];

	//Event
	this._btn[0].onclick = submit;
	this._btn[1].onclick = function(){
		MI.dialog.hide();
	}
	this._codeChange.onclick = function(){
		Self._code.src = Self._code.src + '&' + Math.random();
		Self._value.focus();
		return false;
	}
	this._form.onsubmit = submit;
	function submit(){
		var value = Self._value.value;
		if (value) {
			MI.dialog.hide();
			if (Self.call) {
				setTimeout(function(){
					Self.call(value);
				},300);
			}
		}
		else {
			Self._value.focus();
		}
		return false;
	}
}
MI.Code.prototype = {
	show : function(o){ // o = {msg:'您的操作出现异常，请输入验证码',code:'http://ptlogin2.qq.com/getimage?aid=13001401&Math.random()',call:function(){}}
		var Self = this,dialog = MI.dialog,content,width;
		this._msg.innerHTML = o.msg;
		this._value.value = '';
		this.call = o.call;
		this._code.src = o.code + '&' + Math.random();
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
MI.Tips = function(o){
	var Self = this;

	//Event
	Self._body.onmouseover = function(){
		UI.show(Self._body);
		clearTimeout(Self.delay);
	}
	Self._body.onmouseout = function(){
		clearTimeout(Self.delay);
		Self.delay = setTimeout(function(){
			Self.hide();
		},150);
	}
}
MI.Tips.prototype = {
	txt : '',
	delay : 0,
	_body : UI.html('<div class="cmtTip"></div>')[0],
	build : function(o){
		var Self = this,
			mouseover = function(){
				clearTimeout(Self.delay);
				var S = this;
				Self.delay = setTimeout(function(){
					Self.show(S,o.txt);
					UI.C(Self._body,'width',o.width ? o.width + 'px' : '');
				},150);
			},
			mouseout = function(){
				clearTimeout(Self.delay);
				Self.delay = setTimeout(function(){
					Self.hide();
				},150);
			};
		UI.each($$(o.area,o.target),function(el){
			if (!el.tips) {
				el.onmouseover = mouseover;
				el.onmouseout = mouseout;
				el.tips = 1;
			}
		});
	},
	show : function(target,txt){
		var Self = this;
		if (!Self.appended) {
			Self.appended = 1;
			UI.append(Self._body,document.body);
		}
		if (UI.isString(txt)) {
			Self._body.innerHTML = txt;
			UI.show(Self._body);
			Self.position(target);
		}
		else {
			txt.call(target,Self._body);
		}
	},
	position : function(target){
		var _body = this._body,
			targetX = UI.getX(target),
			targetY = UI.getY(target),
			targetHeight = UI.height(target),
			_bodyHeight,
			scrollY = UI.scrollY(),
			scrollHack = UI.scrollY(target) - scrollY * (UI.B.safari && !UI.B.ipad ? 2 : 1);
		_body.style.cssText += ';top:' + ( targetY + targetHeight - scrollHack + 5 ) + 'px;left:' + ( targetX - 20 ) + 'px';
		_bodyHeight = UI.height(_body);
		if (_bodyHeight + UI.getY(_body) > scrollY + UI.windowHeight()) {
			_body.style.top = targetY - _bodyHeight - 5 - scrollHack + 'px';
		}
	},
	hide : function(){
		UI.hide(this._body);
		this._body.style.left = '-999px';
	}
}
MI.Tips.txt = ['这条消息来自手机微博。<br>想要成为微博手机达人？点<a href="/client.php?t=mobile" onclick="MI.Bos(\'btnPhoneIconTip\')" target="_blank" class="ulink">这里</a>'];
MI.Tips.url = {};
MI.Load = function(id,url,type,boss){
	var el = $(id),P = el.parentNode,btn = $$(P,'h3')[0].lastChild,_fold='收起',_unfold='展开',_loading='loading',_folded='fold',folded = UI.hasClass(P,_folded);
	btn.title = folded ? _fold : _unfold;
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
				UI.evalScript(data.info[type]); //Eval Javascript
				MI.Load.bottom();
			}
			UI.removeClass(btn,_loading);
		});
	}
	else {
		UI.toggleClass(P,_folded);
	}
	MI.Load.bottom();
	btn.blur();
	MI.S('option_' + type + '_' + MI.user.account,folded ?  1 : -1);
	if (boss != 0) {
		MI.Bos('btn' + (folded ? 'Un' : '') + 'Fold' + type);
	}
}
MI.Load.bottom = function(){
	var className = 'pageNav';
	if (MI.talkList) {
		MI.talkList.bottom();
	}
	if ($(className)) {
		MI.bottom(className);
	}
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
MI.Bos = function(op,value){ //Boss Using : MI.Bos('frontClick');
	try{
		var ouin = UI.trim(UI.cookie('o_cookie'));
		MI.Bos.pic.src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=18&iFlow=0' + (value ? '&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=' + value : '');
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
		var E = UI.E(e),dataPost = {},target,tmp;
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
							dataPost[i] = tmp[j].value;
							break;
						}
					}
				}
				else {
					dataPost[i] = $(i).value;
				}
			}
			post();
		}
		else if (!Self.success) {
			E.prevent();
		}
		function post(){
			UI.ajax({url:UI.A(Self._body,'action'),data:dataPost,success:function(data){
				//data = {result:0,msg:'用户未登陆',info:[{result:0,msg:'正确'},{result:0,msg:'正确'}]};
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
				else if (data.result == -100) {
					MI.code.show({msg:data.msg,code:data.info,call:function(code){
						dataPost.veriCode = code;
						post();
					}});
				}
				else if (data.msg){
					//MI.dialogTip.show({html:data.msg,ico:'ico_te'});
					alert(data.msg);
				}
			}});
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
				//data = {result:0,msg:'用户未登陆',info:[{result:0,msg:'正确'},{result:0,msg:'正确'}]};
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
		url.r = MI.random();
		if (!isSubmit && !error && input.url && target.blured && E.type == 'blur') {
			UI.get(input.url,url,function(data){
				data = MI.json(data);
				if (data.result == 0) {
					Self.hideMessage(input);
				}
				else {
					Self.showMessage(input,data.msg);
					Self.success = 0;
					MI.Bos('btnRegError');
				}
				if (input.urlCall) {
					input.urlCall(data);
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
		o.message.innerHTML = '<div class="SA"><em>◆</em><span>◆</span></div>' + text;
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
			UI.hide(o.message);
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
	option.innerHTML = MI_RelateSelect_tips[0];
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
		option.innerHTML = MI_RelateSelect_tips[2];
		UI.prepend(option,this._third);
		option = UI.DC('option');
		option.value = '';
		option.innerHTML = MI_RelateSelect_tips[1];
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
				option.innerHTML = MI_RelateSelect_tips[2];
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
	Self.call = o.call;

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
		if (this.call) {
			this.call(this.cur);
		}
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
		Self._guide = Self.$('h2 em');
		Self._tipBig = Self.$('.talkSuc');
		Self._btn = Self.$('.sendBtn');
		Self._topic = Self.$('.creatNew');
		Self._video = Self.$('.uploadVideo');
		Self._videoAnchor = Self.$('.newVideo');
		Self._pic = Self.$('.uploadPic');
		Self._picForm = Self.$('.picForm');
		Self._picBtn = Self.$('.picForm input');
		Self._close = Self.$('.close');
		Self._num = [$('talkNum')];
		Self._addReply = Self.$('.addReply');
		Self._addComt = Self.$('.addComt');
		Self._comts = Self.$('.comts');

		if (Self._guide) {
			Self.guide = Self._guide.innerHTML;
		}

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
					showGuide();
				}
			},
			countTxtDelay = function(){
				setTimeout(countTxt,0);
			};
			function guide(name){
				return '对 ' + name + ' 说：';
			}
			function showGuide(){
				clearTimeout(Self.delay.guide);
				Self.delay.guide = setTimeout(function(){
					if (Self._guide) { //智能引导提示 【对 xhlv 说：】
						var content = Self._txt.value,account = UI.trim(content).match(/^@[a-zA-Z]{1}[\w|-]{0,19}(?![\w-])/g),nick,users = MI['follow_' + MI.user.account];
						if (account && account[0].length != content.length) {
							account = account[0].slice(1);
							if (UI.A(Self._guide,'user') != account) {
								if (users) { //从@联想中获取姓名
									nick = users.info[account];
								}
								if (nick) {
									Self._guide.innerHTML = guide(nick);
								}
								else { //异步拉取姓名
									UI.get('/asyn/userCard.php','u=' + account + '&r=' + MI.random(),function(data){
										//data = "{result:0,msg:'',info:{nick:'xhlv'}}";
										data = MI.json(data);
										if (data.result == 0 && data.info.nick) {
											Self._guide.innerHTML = guide(data.info.nick);
										}
										else { //拉取失败或帐号不存在，直接当普通广播处理
											Self.guideReset();
										}
									});
								}
								UI.A(Self._guide,'user',account);
							}
						}
						else {
							Self.guideReset();
						}
					}
				},200);
			}
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
			Self._body.onkeyup = function(){
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
				showGuide();
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
						MI.Bos('btnAutoAtAccount');
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
			//Add Video //qq video,tudou//youku,56
			if (Self._video) {
				/* URL : /asyn/validvideo.php		Size : 160 460 2000
					{
						result : 0,
						url : '',
						title : ''
					}
				*/
				Self._errMsg = ['请先登录再进行操作','稍等一下，喝杯茶，转贴的视频正在来的路上','转贴的视频丢在路上了，再试一次？','暂不支持该视频地址，<a href="#" class="vNormalBtn">作为普通链接显示</a>'];

				var html = UI.html('<form name="videoUploadFrom" id="videoUploadFrom" class="videoUploadFrom" method="get"><div class="vloadWrap" style="display:none"><a href="#" class="close"></a><p>请粘贴视频播放页地址<span class="cNote">(腾讯网、QQvideo、土豆)</span></p><p class="clear"><input type="text" class="inputTxt" /><input type="submit" class="btn" value="确定" /></p><p class="cError" style="display:none">'+Self._errMsg[3]+'</p></div></form>'),frag = document.createDocumentFragment();

				UI.each(html,function(o){
					UI.append(o,frag);
				});
				UI.append(frag,Self._video);

				Self._videoClose = $$(Self._video,'.close')[0];
				Self._videoCon = $$(Self._video,'.vloadWrap')[0];
				Self._videoForm = $$(Self._video,'.videoUploadFrom')[0];
				Self._videoTxt = $$(Self._video,'.inputTxt')[0];
				Self._videoBtn = $$(Self._video,'.btn')[0];
				Self._videoError = $$(Self._video,'.cError')[0];
				Self._videoNormalBtn = $$(Self._video,'.vNormalBtn')[0];
				if(Self._videoClose){
					Self._videoClose.onclick = function(){
						UI.hide(Self._videoCon);
						return false;
					}
				}
				Self._videoForm.onsubmit = function(){
					if(!UI.trim(Self._videoTxt.value)){
						Self._videoTxt.focus();
						return false;
					}
					Self.getVideo(UI.trim(Self._videoTxt.value));
					return false;
				}
				Self._videoNormalBtn.onclick = function(){
					if(UI.trim(Self._videoTxt.value)){
						Self._txt.value += UI.trim(Self._videoTxt.value);
						UI.hide(Self._videoCon);
					}
					return false;
				}
				Self._videoAnchor.onclick = function(){
					UI.hide(Self._videoError);
					UI.show(Self._videoCon);
					if(UI.trim(Self._videoTxt.value)){
						Self._videoTxt.select();
					}else{
						Self._videoTxt.focus();
					}
				}
				Self._videoBtn.onclick = function(){
					if(!UI.trim(Self._videoTxt.value)){
						Self._videoTxt.focus();
						return;
					}
					Self.getVideo(UI.trim(Self._videoTxt.value));
				}
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
				var html = UI.html('<span class="pidLoad" style="display:none">上传中 <a href="#" class="cancel">[取消]</a></span><span style="display:none" class="preview"><span class="link"></span><a href="#" class="del">[删除]</a></span><iframe id="imageUpload" name="imageUpload" src="about:blank" style="display:none"></iframe>'),
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
				Self._picLoading = $$(Self._pic,'.pidLoad')[0];
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
						alert('仅支持jpg、jpeg、gif、png图片文件');
						return false;
					}
					UI.show(Self._picLoading);
					UI.addClass(Self._picLoading,'loading');
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
				Self._picCancel.onclick = function(){ //Cancel
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
	delayVideo : null,
	url : '/publish.php',
	type : null, //Value: null(Talk)  1(Relay)  2(Reply) 3(Message) 4(Comment)
	countType : '', //Count TalkBox's Type For Product
	iconPic : 0, //View Model 0 1(Simple Model)
	pic : '', //Save Pic's Url
	//video : '', //Save Video's Url
	code : null, //Verify Code
	topic : null, //Auto Add Topic
	talkId : null, //Id To Reply Or Relay
	txtMax : 140,
	txtCache : '', //Cache Success Talk
	txtTopic : '#输入话题标题#',
	txtPic : '分享照片',
	txtTip : {
		empty : '请输入内容',
		fail : '发送失败,请重试',
		repeat : '请不要连续发表重复内容'
	},
	txtTipSend : '广播中',
	addList : 0, //If Add New Talk To List
	addCheck : null, //Check Content Of Add New Talk To List
	addNum : 1, //Add Num When Send Success
	autoHeight : 0, //Auto Change Textarea's Height
	tmpl : MI.tmpl.listAll,
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
			talkTip = '超出<em class="error">';
			Self._btn.disable = 1;
			//UI.addClass(Self._btn,'disabled');
		}
		else {
			talkTip = '还能输入<em>';
			Self._btn.disable = 0;
			//UI.removeClass(Self._btn,'disabled');
		}
		if (length == 0) {
			Self._btn.disable = 1;
			//UI.addClass(Self._btn,'disabled');
		}
		Self.showTip(talkTip + Math.abs(Self.txtMax - length) + '</em>字');
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
	guideReset : function(){
		this._guide.innerHTML = this.guide;
		UI.A(this._guide,'user','');
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
		/*if (content && content == Self.txtCache) {
			Self.showTip(Self.txtTip.repeat,1);
			Self.flashTip();
			Self.sending = 0;
			return;
		}*/
		Self._btn.disable = 1;
		UI.addClass(Self._btn,'disabled');

		//Go To User's Page
		if (!Self.type && !Self.pic && !Self.topic && content.match(/^@[a-zA-Z]{1}[\w|-]{0,19}$/g)) {
			document.location.href = '/' + content.slice(1) + '?from=1';
			return;
		}

		//Show Sending Tip
		Self.delay.tip = setTimeout(function(){
			Self.showTip(Self.txtTipSend,2);
		},500);

		//Post Data
		data = {content:content.replace(/＠/g,'@').replace(/＃/g,'#'),pic:Self.pic,countType:Self.countType,viewModel:Self.iconPic};
		if (Self.code) {
			data.veriCode = Self.code;
		}
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
				if (Self.start) {
					Self.start();
				}
				clearTimeout(Self.delay.timeout);
				data = MI.json(data);
				/*
					data = {
						result : 0,
						msg : '发言成功',
						info : {
							id : '123456',
							time : '5分钟前',
							content : '内容',
							form : '腾讯微博'
						}
					};
					//Verify Code
					data = {
						result : -100,
						msg : '您的操作出现异常，请输入验证码',
						info : 'http://ptlogin2.qq.com/getimage?aid=13001401&Math.random()'
					};
				*/
				if (MI.user && data.info && UI.isObject(data.info)) {
					var talk = data.info.talk[0],user = MI.user;
					talk.pic = user.pic;
					talk.nick = talk.nick || user.name;
					talk.name = talk.name || user.account;
					talk.flag = (talk.flag && UI.isArray(talk.flag) ? user.flag : talk.flag);
					data.info.iconPic = Self.iconPic;
					data.info.guest = 0;
					data.info.fav = 0;
				}

				//Self._txt.blur();

				//Show Tips
				if (data.result == -100) { //Verify code
					MI.code.show({msg:data.msg,code:data.info,call:function(code){
						Self.code = code;
						Self.send();
					}});
					UI.removeClass(Self._btn,'disabled');
					Self._btn.disable = 0;
					setTimeout(function(){
						Self.countTxt();
					},500);
				}
				else {
					clearTimeout(Self.delay.tip);
					Self.showTip(data.msg || '',data.result < 0 ? 1 : 0);
					Self.flashTip();
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
								Self.code = null;
								if (Self._guide) {
									Self.guideReset();
								}
							}
							if (Self.success && data.result == 0) {
								Self.success();
								UI.hide(Self._tipBig);
							}
						});
					},data.result == 0 ? Self.delayTime : Self.delayTime + 1000);
				}

				//Callback
				if (Self.successStart && data.result == 0) {
					Self.successStart();
				}

				//Add New Talk To List
				if (MI.talkList && Self.addList && data.result == 0 && addCheck) {
					/*idata.info.source = {};
					f (Self.type && Self.type != 4) { //From Reply And Relay
						data.info.action = Self.action;
						data.info.source = Self.source;
					}*/
					if (MI.talkList._tip) { //Hide Talk List's Tip
						UI.hide(MI.talkList._tip);
					}

					MI.talkList.add.push(data.info.talk[0].id);

					var newTalk = UI.html(new UI.tmplString(Self.tmpl)(data.info))[0];
					MI.talkList.addEvent(newTalk);
					UI.addClass(newTalk,'newMsg'); //Add Delete CSS
					//UI.C(newTalk,'opacity',0);
					UI.prepend(newTalk,MI.talkList._body);
					MI.talkList.card();
					MI.talkList.buildTips();
					MI.talkList._news.push(newTalk);
					var height = UI.height(newTalk),scrollY = UI.scrollY(),scroll;
					UI.C(newTalk,'height',0);
					/*
						偶尔会有抖动，跟dom元素个数及内容多少有关，越多则样式渲染所需时间越多，抖动越明显。
						IE里设置一个延迟效果要好很多，其他浏览器则不需要（效果反而更差）。
						这也反映出浏览器的性能，chrome不会有任何抖动。
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
						MI.talkList.updateTime(data.info.talk[0].timestamp);
					}

					Self.txtCache = content;
				}
			}
		});
		Self.delay.timeout = setTimeout(function(){ //Tips For Time Out
			Self.showTip(Self.txtTip.fail,1)
		},20000);//定的是15s，但为了安全起见，算上网络延迟、请求排队等因素，将时间扩大到20秒
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
			fileName = MI.string.cut(fileName,14) + fileType;
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
			this._picForm.reset();
			UI.hide(this._picPreview);
			UI.hide(this._picLoading);
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
	getVideo : function(value){
		var Self = this;
		Self.ayncVideoResult = null;
		if(!UI.trim(value)){
			//Self.hide();
			return;
		}
		if(this.delayVideo)	clearTimeout(this.delayVideo);
		this.delayVideo=window.setTimeout(function(){
			UI.hide(Self._videoError);
			UI.get(
				'/asyn/validvideo.php',
				"url=" + encodeURIComponent(value),
				function(data){ 
					data = MI.json(data);
					Self.ayncVideoResult = data.result;
					if (data.result == 0){
						if(data.url){
							//Self.video = Self._videoTxt.value;//'http://url.cn/'+data.url;
							Self._txt.value += data.title + '：http://url.cn/'+data.url;
							UI.hide(Self._videoError);
							Self._videoTxt.value = '';
							UI.hide(Self._videoCon);
							Self.countTxt();
						}
					}else if(data.result == -1){//未登录errMsg
						Self._videoError.innerHTML = Self._errMsg[0];
						UI.show(Self._videoError);
					}else if(data.result == -3){//暂不支持
						Self._videoError.innerHTML = Self._errMsg[3];
						UI.show(Self._videoError);
						Self._videoNormalBtn = $$(Self._video,'.vNormalBtn')[0];
						Self._videoNormalBtn.onclick = function(){
							if(UI.trim(Self._videoTxt.value)){
								Self._txt.value += UI.trim(Self._videoTxt.value);
								Self._videoTxt.value = '';
								UI.hide(Self._videoCon);
							}
							return false;
						}
					}else{//获取不到或异常
						Self._videoError.innerHTML = Self._errMsg[2];
						UI.show(Self._videoError);
					}
				}
			)
			window.setTimeout(function(){ //Get Video For Time Out
				if(!Self.ayncVideoResult){
					Self._videoError.innerHTML = Self._errMsg[2];
					UI.show(Self._videoError);
				}
			},20000);//
		},200);
	},
	$ : function(className){
		return $$(this._body,className)[0];
	}
}
MI.TalkList = function(id){ //Talk List
	var Self = this,_more = $('moreList');
	Self._body = UI.isString(id) ? $(id) : id;
	Self._more = Self._bottom = _more ? $$(_more,'a')[0] : UI.DC('a');
	Self._new = $('talkNew'); //New Talk Button
	Self._list = UI.children(Self._body);
	var html = new UI.tmplString(MI.tmpl.reply)({});
	Self._talk = Self._relay = UI.html(html)[0]; //Talk Box
	//Self._relay = UI.html(html.replace(/<\/textarea>/g,'').replace(/textarea/g,'input'))[0];
	Self._relayList = UI.html('<div class="relayList"><div class="top"><span class="left"><a href="#" target="_blank">查看全部&gt;&gt;</a></span><a href="#" class="close">关闭</a></div><div class="loading">正在加载...</div><div class="cont"></div></div>')[0];
	Self._relayListLoad = $$(Self._relayList,'.loading')[0];
	Self._relayListCont = $$(Self._relayList,'.cont')[0];
	Self._relay = UI.html(html)[0];
	Self._comt = UI.html(MI.tmpl.reply)[0];

	//Delete Confirm
	Self._confirm = UI.html('<div class="delChose"><span></span><br><input value="确定" type="button">&nbsp;&nbsp;<input value="取消" type="button"></div>')[0];
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
	Self.comtBox = new MI.TalkBox(Self._comt);

	//Count TalkBox's Type For Product
	//Self.replyBox.countType = 3;
	//Self.relayBox.countType = 4;

	Self.replyBox.autoHeight = 136;
	Self.relayBox.autoHeight = 30;
	Self.replyBox.txtTipSend = '发送中';
	Self.relayBox.txtTipSend = '转播中';
	Self.replyBox._btn.title = '发送';
	Self.relayBox._btn.title = '转播';
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
	if (UI.B.ipad) { //Focus To The First Position
		UI.EA(Self.relayBox._txt,'focus',function(){
			setTimeout(function(){
				MI.selectTxt(Self.relayBox._txt,0,0,0);
			},100);
		});
	}

	//Comment Box Option
	var comtBox = Self.comtBox;
	comtBox._talkTo = $$(comtBox._body,'.replyTitle')[0];
	comtBox._viewComt = $$(comtBox._body,'.bot .left')[0];
	comtBox._msg = $$(comtBox._body,'.msg')[0];
	comtBox.txtTipSend = '发送中';
	comtBox.type=4;
	comtBox.url='/comment/publish.php';
	UI.addClass(comtBox._txt,'noAutoComplete');
	comtBox.successStart=function(){
		MI.dialog.showTip({html:'发送成功!',delay:500});
	}
	comtBox.delayTime = 500;
	comtBox.success=function(){
		UI.removeClass(comtBox._body,'pubSuc');
		MI.countNum(comtBox._comtNum,1);
	}

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
		Self._more.onmouseover = MI.hideFocus;
		Self._more.onclick = function(e){
			Self.more();
			UI.E(e).prevent();
		}
		//Self._more.onfocus = MI.blur;
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
	$$(Self._relayList,'.close')[0].onclick = function(){
		Self.relayListHide();
		return false;
	}
	var _relayListCont = Self._relayListCont;
	_relayListCont.ondblclick = function(){ //Auto Go Next Page When Double Click
		var hasNext = 0;
		UI.each($$(Self._relayListCont,'.pages a'),function(o){
			if (o.innerHTML.hasString('下一页')) {
				hasNext = o;
			}
		});
		if (hasNext) {
			hasNext.onclick();
		}
		else {
			Self.relayListHide();
			Self.relayListPosition();
		}
		MI.S('tips_relayList_' + MI.user.account,-1);
	}
	if (UI.B.ie) { //Kill Select Txt Bug In IE
		_relayListCont.onmousedown = function(){
			_relayListCont.onselectstart = null;
		}
		_relayListCont.onmouseup = function(){
			_relayListCont.onselectstart = function(){
				return false;
			}
		}
	}
	/*Self._relayList.onclick = function(e){ //For Hide List When Click Other Space
		UI.E(e).stop();
	}*/
	//UI.ready(function(){
		setTimeout(function(){ //页面渲染玩再执行
			Self.bottom();
			for (var i = 0,num = Self._list.length;i < num;i++) {
				Self.addEvent(Self._list[i]);
			}
			if (MI.user.account) {
				Self.card();
			}
			/*UI.EA(document.body,'click',function(){
				Self.relayListHide();
			});*/
			Self.buildTips();
		},0);
	//});
}
MI.TalkList.prototype = {
	cur : null, //Current List
	_tip : null, //List Tip
	_news : [], //New Talks
	auto : 0, //Auto Load Ajax Data When Browser's Back
	iconPic : 0, //Use Simple View Model
	moreTimes : 0, //More Times
	removeUrl : '/delete.php',
	favorUrl : '/asyn/favoritemsg.php',
	removeTip : '确定删除这条广播？',
	removeCall : 0, //Call Function After Remove
	unfavTip : '确定删除这条收藏？',
	xhr : {}, //Cache XHR
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
				o.title = P.title;
				UI.EA(o,'mouseover',MI.Card.show);
				UI.EA(o,'mouseover',function(){
					P.title = o.title = '';
				});
				UI.EA(o,'touchstart',MI.Card.show);
				UI.EA(o,'mouseout',MI.Card.hide);
				UI.EA(o,'touchend',MI.Card.hide);
				UI.EA(o,'click',Self.bosHead);
			}
		});
	},
	buildTips : function(area){ //Build Phone Tips And Url Tips
		var Self = this;
		setTimeout(function(){
			MI.tips.build({
				area : area || Self._body,
				target : '.ico_phone',
				txt : MI.Tips.txt[0]
			});
			MI.tips.build({
				area : area || Self._body,
				target : '.url,.ico_video',
				txt : Self.urlTips,
				width : 220
			});
		},200);
	},
	urlTips : function(tips){
		if (this.nodeName == 'A') {
			var target = this,
				urlTipsTxt = ['原链接有风险','原链接不建议打开','腾讯网','原链接'],
				id = target.innerHTML.match(/[^\/]+$/g)[0],
				tip = '',
				url = '',
				br = '',
				time = + new Date();
			if (target.title) { //Cache Title
				UI.A(target,'reltitle',target.title);
				target.title = '';
			}
			if (MI.Tips.url[id]) {
				show(MI.Tips.url[id]);
				MI.Bos('btnViewUrl');
			}
			else {
				UI.get('/asyn/urldetail.php','url=' + id,function(data){
					data = MI.json(data);
					if (data.result == 0) {
						show(data);
						MI.Tips.url[id] = data;
						MI.Bos('btnViewUrl',+ new Date() - time);
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
				if (data.info.title && data.info.safe > 2) { //Show Title
					tip = MI.string.cut(data.info.title,26);
					url =  MI.string.cut(url,30);
					br = '<br>';
				}
				else {
					tip = urlTipsTxt[data.info.safe - 1] || urlTipsTxt[0];
					br = '：';
					url = MI.string.cut(url,80);
				}
				if (!UI.B.ie) {
					url = url.breakWord(1);
				}
				else { //Copy Button
					url += ' <a href="#" onclick="var a=window.clipboardData.setData(\'Text\',\'' + data.info.url + '\'),b=this.nextSibling;UI.hide(this);UI.show(b);b.innerHTML=a?\'复制成功\':\'复制失败\';return false">[复制]</a><span class="cNote" style="display:none"></span>';
				}
				if (data.info.safe > 2) { //Go Source Url
					UI.A(target,'href',(UI.B.ie ? ' ' : '') + data.info.url);
				}
				tips.innerHTML = '<em class="ico safe_' + (data.info.safe || 1) + '"></em><div class="safeType">' + MI.string.html(tip) + br + url + '</div></div>';
				UI.show(tips);
				MI.tips.position(target);
			}
		}
	},
	bosHead : function(){
		MI.Bos('btnHead');
	},
	remove : function(id,type,veriCode){
		id = String(id);
		var Self = this,
			talk = $(id),
			url = Self.removeUrl,
			data = {id:id,r:MI.random()},
			favBtn;
		if (veriCode) {
			data.veriCode = veriCode;
		}
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
							favBtn.title = "取消收藏";
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
								favBtn.title = "收藏";
								favBtn.type = 1;
								favBtn.blur();
							}
							else {
								UI.addClass(talk,'delMsg'); //Add Delete CSS
								setTimeout(function(){
									UI.animate(talk,'opacity',0,function(){
										UI.remove(talk);
										if (Self.tip && !UI.children(Self._body).length) { //提示显示隐藏有问题
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
					else if (data.result == -100) {
						MI.code.show({msg:data.msg,code:data.info,call:function(code){
							Self.remove(id,type,code);
						}});
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
		Self.relayListHide();
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

		//Relay List
		Self.relayListHide();

		if (Self.talkBox) {
			Self.talkBox.hide();
		}
		if (Self.talkBox && Self.current && Self.current != id && Self.talkBox.display) {
			Self.talkBox.display = 0;
		}
		Self.talkBox = type ? Self.relayBox : Self.replyBox;
		Self._talk = Self.talkBox._body;
		Self.talkBox.iconPic = Self.iconPic;
		UI.C(Self.talkBox._txt,'height','');
		UI.removeClass(Self.talkBox._btn,'disabled');
		UI.removeClass(Self._talk,'pubSuc');
		if (!Self.talkBox.display) {
			var li = $(id),
				cur = Self.current,
				name = $$(li,'.userName strong a')[0].innerHTML,
				name2,
				account,
				vip = $$(li,'.userName .vip').length,
				expo = $$(li,'.userName .ico_expo').length,
				url = $$(li,'.userName a')[0].href,
				cont = $$(li,'.msgCnt')[0],
				contClone = cont.cloneNode(1),
				content,
				contentBase,
				contentTmp,
				/*contentTopic,
				contentTopicLength,*/
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
			var replyTitle = '转播 <b>' + name + '</b>: "' + MI.string.html(content.slice(0,20)),relayTitle = '对 <b>' + name + '</b> 说:';
			if (content.length > 20) {
				replyTitle += '...';
			}
			replyTitle += '"<br>再说两句:';
			$$(this._talk,'.replyTitle')[0].innerHTML = type ? replyTitle : relayTitle;
			account = url.split('/');
			account = account[account.length - 1];
			if (replyBox && name2) { //添加转播点评
				this.talkBox._addReply.innerHTML = '<a href="#" title="你可以通过“删除引用”来去掉前面人的转播理由">［删除之前的点评］</a>';
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
			//$$(this._talk,'.replyTitle')[0].innerHTML = type ? '转播 "' + MI.string.escape(content.slice(0,30)) + (content.length > 30 ? '...' : '') + '"<br/>再说两句:' : '回复 ' + name + ':';

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
			/*this.talkBox.action = type ? '转播:&nbsp;' : '对<strong class="userTo"><a href="' + url + '" title="' + name + '(@' + account + ')">' + name + '</a>' + (vip ? '<a href="/certification" target="_blank" class="vip" title="腾讯认证"></a>': '') + (expo ? '<a href="/certification" target="_blank" class="ico_expo" title="上海世博"></a>': '') + '说:</strong>';
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
			};*/

			this.talkBox._txt.value = '';
			/*contentTopic = (contentTmp || content).match(/(#\s*[^#\s]{1}[^#]{0,59}?\s*#)/g); //Auto Add Topic

			this.talkBox._txt.value = contentTopic && type ? contentTopic.join('') : '';
			contentTopicLength = this.talkBox._txt.value.length*/
			this.talkBox.countTxt();
			UI.append(this._talk,$$(li,'.msgBox')[0]);
			setTimeout(function(){
				talkBoxTxt.focus();
				if (addReplyTxt) { //自动添加转播点评
					talkBoxTxt.value += addReplyTxt;
				}
				Self.talkBox.countTxt();
				MI.selectTxt(talkBoxTxt,0,0,0);
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
		if (this.talkBox) {
			this.talkBox.display = 0;
		}
	},
	relayListHide : function(){
		if (this._relayList.display) {
			UI.remove(this._relayList);
			this._relayList.display = 0;
			UI.removeClass($(this.current),'cur');
			UI.removeClass($(this.current),'hover');
		}
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
			viewRelay = $$(el,'.zfNum')[0],
			content = $$(el,'.msgCnt')[0],
			comt = $$(el,'.comt')[0],
			reply = $$(el,'.reply')[0],
			relay = $$(el,'.relay')[0],
			del = $$(el,'.delBtn')[0],
			moreFun = $$(el,'.moreFun')[0],
			replyMsg = $$(el,'.replyMsg')[0],
			picBox = $$(el,'.picBox'),
			videoBox = $$(el,'.videoBox');
		if (!UI.B.ipad && el.nodeName == 'LI') {
			MI.addHover(el);
		}
		if (comt) {
			/*UI.A(comt,'target','_blank');*/
			if (comt.href.hasString('#')) {
				comt.href = '/p/c/' + el.id;
			}
			comt.onclick = function(){
				var comtBox = Self.comtBox,href = comt.nextSibling.href;
				MI.dialog.show({html:Self._comt,width:500});
				comtBox._comtNum = $$(comt.nextSibling,'em')[0];
				comtBox.talkId = href.match(/\d+$/)[0];
				comtBox._talkTo.innerHTML = '发表评论:';
				comtBox._viewComt.innerHTML = '<a href="' + href + '" target="_blank">查看已有评论</a>';
				comtBox._txt.value = '';
				setTimeout(function(){
					comtBox._txt.focus();
					comtBox.countTxt();
				},0);
				MI.Bos('btnComt');
				return false;
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
			view.onmouseover = view.ontouchstart = function(){
				UI.C(viewContent,'display','block');
				MI.Bos('btnViewReply');
			}
			view.onmouseout = view.ontouchend = function(){
				UI.hide(viewContent);
			}
			view.style.cursor = 'pointer';
			UI.A(view,'target','_blank');
			/*view.onclick = function(){
				return false;
			}*/
		}
		if (viewRelay && viewRelay.innerHTML.hasString('转播')) { //View Relay List
			var relayList = Self._relayList,
				relayListNum, //Cache View Relay List's Button
				relayTip,
				relayBox,
				delay,
				pageLinkClick = function(){
					UI.get(this.href,'&r=' + MI.random(),function(data){
						pageLink(data);
					});
					Self.relayListPosition();
					return false;
				},
				pageLink = function(data){
					UI.hide(Self._relayListLoad);
					Self._relayListCont.innerHTML = data;
					UI.show(Self._relayListCont);

					//Eval Javascript
					UI.evalScript(data);

					//Tips
					if (UI.B.ipad || MI.S('tips_relayList_' + MI.user.account) == -1) {
						UI.hide($$(Self._relayListCont,'.nfunTips')[0]);
					}

					//Page Control
					var pages = $$(Self._relayListCont,'.pages a');
					UI.each(pages,function(o){
						if (!UI.A(o,'target')) {
							o.onclick = pageLinkClick;
						}
					});
					//if (!pages.length) {
						var li = $$(Self._relayListCont,'li');
						if (li.length) {
							UI.addClass(li[li.length - 1],'nobor');
						}
					//}
					
					//Relay Number
					var relayNum = $$(relayList,'.num')[0];
					if (relayNum) {
						$$(relayListNum,'.relayNum')[0].innerHTML = relayNum.innerHTML;
					}

					//Relay Box
					var relayBoxTip = $$(Self._relayListCont,'.relayThumb')[0];
					if (relayBoxTip) {
						relayBoxTip.onclick = createRelayBox;
					}

					//Build Tips
					Self.buildTips(relayList);

					MI.PV('relay');
				},
				createRelayBox = function(){
					UI.hide(this);
					var relay;
					if (!this.appended) {
						relay = UI.html(MI.tmpl.reply.replace('talkWrap','zfWrap').replace('talkSuc',''))[0];
						relayTip = $$(Self._relayListCont,'.relayThumb')[0];
						relayBox = new MI.TalkBox(relay);
						relayBox.countTxt();
						relayBox.txtTipSend = '转播中';
						relayBox.addList = Self.relayBox.addList;
						relayBox.talkId = el.id;
						relayBox.type = 1;
						relayBox.successStart = function(){
							var refresh = $$(Self._relayListCont,'.refreshBth')[0];
							if (refresh) {
								refresh.onclick();
							}
							MI.tip('转播成功！');
						}
						relayBox.start = function(){
							clearTimeout(delay);
						}
						UI.EA(relayBox._txt,'blur',function(){
							if (!relayBox._txt.value) {
								delay = setTimeout(function(){
									UI.hide(relayBox._body);
									UI.show(relayTip); 
								},300);
							}
						});
						UI.after(relay,this);
						this.appended = 1;
					}
					else {
						UI.show(this.nextSibling);
					}
					setTimeout(function(){
						relayBox._txt.focus();
					},0);
				};
			viewRelay.onclick = function(e){
				if (Self.xhr.relay) {
					Self.xhr.relay.abort();
				}
				var href = this.href,
					id = href.match(/[^\/]+$/g)[0],
					li = id == el.id ? id : el.id,
					Y,
					windowHeight = UI.windowHeight(),
					scrollTop;
				relayListNum = this;
				if (relayList.display && Self.current == li) {
					$$(relayList,'.close')[0].onclick();
				}
				else {
					UI.removeClass($(Self.current),'cur');
					UI.remove(Self._confirm);
					Self.replyHide();
					if (Self.talkBox) {
						Self.talkBox.hide();
					}

					$$(relayList,'.left a')[0].href = href;
					$$(this,'.relayNum')[0].innerHTML;
					UI.hide(Self._relayListCont);
					UI.show(Self._relayListLoad);
					UI.append(relayList,$$(el,'.msgBox')[0]);
					Self.xhr.relay = UI.get('/message_relay_frame.php','id=' + id + '&viewModel=' + Self.iconPic + '&r=' + MI.random(),function(data){
						pageLink(data);
					});
					scrollTop = UI.scrollY();
					Y = UI.getY(this);
					if (Y < scrollTop) { //(Y > scrollTop + windowHeight * 3 / 4) || 
						window.scrollTo(0,Y);
					}

					UI.addClass(el,'cur');
					Self.current = li;
					relayList.display = 1;
				}
				Self.relayListPosition = function(){
					var Y = UI.getY(viewRelay);
					if (UI.scrollY() > Y) {
						window.scrollTo(0,Y);
					}
				}
				UI.E(e).stop();
				return false;
			}
		}
		if (fav) {
			fav.type = 1;
			fav.title = (UI.hasClass(fav,'light') ? '取消' : '') + '收藏';
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
		if (videoBox) {
			MI.TalkList.videoEvent(videoBox);
		}
		//Add Time Title
		for (var i = 0,num = time.length;i < num;i++) {
			if (!UI.A(time[i],'rel')) {
				UI.A(time[i],'rel',UI.A(el,'rel'));
			}
			var timeObj = new Date();
			timeObj.setTime(UI.A(time[i],'rel') + '000');
			time[i].title = UI.formatDate(timeObj,'yyyy年M月d日 hh:mm');
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
							//vip : 1,
							flag : {
								auth : 0,
								vivi : 0,
								expo : 0
							},
							name : 'xhlv',
							nick : 'xhlv',
							pic : 'http://mat1.gtimg.com/www/mb/images/img2.jpg',
							image : [],
							count : null,
							time : '5分钟前',
							from : 'web',
							timestamp : '1232542321',
							content : '内容',
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
				document.location.href = '/' + MI.user.account; //location.reload()在Firefox中会导致发图表单重新提交的问题
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
            //alert(new UI.tmplString(MI.tmpl.listAll)(data.info).replace(/<li id="/gi,ajax ? '<li class="newMsg" id="' : '<li id="'))
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
				list = Self._news;
				for (var i = 0,num = list.length;i < num;i++) {
					UI.removeClass(list[i],'newMsg');
				}

				UI.prepend(cache,Self._body);
				Self._news = $$(Self._body,'.newMsg');
				Self.card();
				Self.buildTips();


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
		//data = {result : 0,msg : '',info : { hasNext : 1,talk : [{id : '123456',time : '5分钟前',content : '内容'},{id : '1234567',time : '5分钟前',content : '内容'}] }};
		//data = {result:0,msg:'成功','info':{'hasNext':1,'talk':[]}};
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
				setTimeout(function(){ //渲染完再添加事件，比较耗时间
					for (var i = 0,num = o.length;i < num;i++) {
						Self.addEvent(o[i]);
					}
					Self.card();
					Self.buildTips();
					MI.Crs(1);
				},0);
				UI.append(cache,Self._body);
				UI.C(Self._body,'marginBottom','');

				//Resize Dialog's Bg
				if (MI.dialog && MI.dialog.display) {
					MI.dialog.resizeBg();
				}

				MI.PV('more');

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
			//alert(data.msg); //需模拟alert
		}
		UI.removeClass(Self._more,'loading');
		Self._more.sending = 0;
	}
}
//video event process
MI.TalkList.video = function(a,b){ //Video Event
	var _this = a;
	//MI.TalkList.videoCheck();//close last video
	var _flashObject = UI.B.ie ? MI.tmpl.videoObject : MI.tmpl.videoEmbed;
	var box;
	if(b == 1){
		var picurl = unescape(_this.getAttribute('minipicurl')),playurl = unescape(_this.getAttribute('playurl')),realurl = unescape(_this.getAttribute('realurl')),title = _this.getAttribute('title')?_this.getAttribute('title'):_this.getAttribute('reltitle'),title = MI.string.cut(title,40),box = $$(_this.parentNode.parentNode,'.videoBox')[0],vWrap = $$(box,'.vWrap')[0],vBox = $$(box,'.vBox')[0],vSimple = $$(box,'.vSimple')[0],vThumbs = $$(box,'.vThumbs')[0];
		var tTools = $$(box,'.vTools')[0],oTools = UI.html(MI.tmpl.videoTool.replace('$VideoTitle',title).replace('$VideoRealUrl',realurl))[0],flash = UI.html(_flashObject.replace(/\$VideoPlayUrl/g,playurl))[0],vClose = $$(oTools,'.vClose')[0];
		if(vSimple){
			//vSimple.setAttribute('url',playurl);//多视频时使用。目前只显示单个视频，先注释掉。
			UI.hide(vSimple);
		}
		if(vThumbs){
			/*var t = UI.html(MI.tmpl.videoThumbs.replace('$VideoPicUrl',picurl).replace('$VideoPlayUrl',playurl))[0];
			UI.replace(t,vThumbs);//多视频时使用。目前只显示单个视频，先注释掉。
			t.onclick = function(){
				MI.TalkList.video(this,2);
				return false;
			}*/
			UI.hide(vThumbs);
		}
		UI.replace(oTools,tTools);
		vClose.onclick = MI.TalkList.videoClose;
		if(box.play){
			var a=$$(_this.parentNode.parentNode,'.videoBox')[0];
			var c=$$(a,'.vClose')[0];
			try{
				MI.TalkList.videoClose(c,1);
			}catch(e){alert(e)}
			box.play = 0;
			return false;
		}
		if(!vBox){
			UI.append(flash,vWrap);
		}else{
			UI.replace(flash,vBox);
		}
	}else if(b == 2){
		var url = _this.getAttribute("url");
		var tools = _this.parentNode.previousSibling;
		box = _this.parentNode.parentNode;
		if(box.play){
			box.play = 0;
			return false;
		}

		UI.hide(_this);
		tools.style.display = 'block';
		UI.after(UI.html(_flashObject.replace(/\$VideoPlayUrl/g,url))[0],_this);
	}
	box.play = 1;
	UI.addClass(box,'vPlay');
	UI.addClass($$(box,'.vBox')[0],'loading');
	return false;
}
MI.TalkList.videoEvent = function(videoBox){
	for (var i = 0,num = videoBox.length;i < num;i++) {
		var videoBoxCur = videoBox[i],video = $$(videoBoxCur,'.vSimple')[0]||$$(videoBoxCur,'.vThumbs')[0],videoTools = $$(videoBoxCur,'.vTools')[0],videoClose = $$(videoBoxCur,'.vClose')[0],mask = $$(video,'.mask')[0],thumb = $$(video,'img')[0];
		if(mask){
			thumb.onload = function(){
				this.load = 1;
				mask.style.display = 'block';
			}
			thumb.onerror = function(){
				MI.videoThumb(this);
			}
			setTimeout(function(){
				if(thumb.load && (!mask.style.display || mask.style.display != 'block')){
					mask.style.display = 'block';
				}
			},1500);
		}
		var msgCnt = $$(videoBoxCur.parentNode.parentNode,'.msgCnt')[0];
		var videoLink = $$(msgCnt,'.ico_video');
		if(videoLink && videoLink.length > 0){
			for(var j = 0,n = videoLink.length;j < n;j++){
				var vLink = videoLink[j];
				vLink.onclick = function(){
					MI.TalkList.video(this,1);
					return false;
				}
			}
		}
		video.onclick = function(){
			MI.TalkList.video(this,2);
			return false;
		}
		videoClose.onclick = MI.TalkList.videoClose;
	}
}
MI.TalkList.videoClose = function(a,b){
	var _this = b ? a : this;
	var v = $$(_this.parentNode.parentNode,'.vSimple')[0] || $$(_this.parentNode.parentNode,'.vThumbs')[0];//this.parentNode.nextSibling.firstChild;
	var tools = _this.parentNode;
	var box = _this.parentNode.parentNode;
	var vBox = $$(box,'.vBox')[0];
	box.play = 0;
	UI.removeClass(box,'vPlay');
	UI.removeClass(vBox,'loading');
	v.style.display = 'inline';
	tools.style.display = 'none';
	UI.remove(vBox);
	return false;
}
MI.TalkList.pic = function(){ //Picture Event
	var pic = $$(this,'img')[0],
		picBig,
		picBigUrl = pic.parentNode.href,
		P,
		isBig = UI.hasClass(this.parentNode,'big');
	if (UI.hasClass(pic,'preview')) {
		pic = pic.nextSibling;
	}
	//pic.load = 0;
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
			if (UI.B.ie && !this.fileSize && this.load) { //Kill IE's Bug While Load Fail,Dont's Show Error Pic
				return;
			}
			this.load = 1;
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
		if (isBig) {
			var Y = UI.getY(picBig);
			if (UI.height(picBig) > UI.windowHeight() && Y < UI.scrollY()) {
				setTimeout(function(){
					window.scrollTo(0,Y);
				},0);
			}
		}
		UI.toggleClass(this.parentNode,'big');

	}
	MI.Bos(isBig ? 'btnPicSmall' : 'btnPicBig');
	return false;
}
MI.TalkList.picEvent = function(picBox){
	for (var i = 0,num = picBox.length;i < num;i++) {
		var picBoxCur = picBox[i],pic = $$(picBoxCur,'img')[0],
			link = pic.parentNode,
			hasPic = $$(picBoxCur,'.tools'),
			preview;
		if (!hasPic.length) {
			UI.before(UI.html(MI.tmpl.picTool.replace('$Url',link.href.replace(/\/460$/g,'')))[0],link); //Add Tools
		}
		else {
			UI.each(hasPic,function(o){
				var P = o.parentNode,img = $$(P,'img')[0];
				UI.removeClass(P,'big');
				img.src = img.src.replace(/460$/,'160');
			});
		}
		if (!UI.B.ipad) {
			preview = UI.html('<img class="preview" crs="' + link.href.replace(/460$/,'160') + '"/>')[0];
			UI.prepend(preview,link);
			/*preview.onmousemove = function(){
				UI.removeClass(this.parentNode,'hover');
			}*/
			link.onmouseover = function(){
				var src = UI.A(preview,'crs');
				if (src) {
					UI.A(preview,'src',src);
					UI.A(preview,'crs','');
				}
				UI.addClass(this,'hover');
				UI.A(this,'hideFocus','true');
			}
			link.onmouseout = function(){
				UI.removeClass(this,'hover');
			}
		}
		link.onclick = MI.TalkList.pic;
		//link.onfocus = MI.blur;
		if (!UI.B.ie) {
			UI.A(pic,'alt','[图片]');

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
		Pic = $$(P,'img'),
		pic = Pic[Pic.length - 1];
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
	Self.txtTipSend = '发送中';
	Self._msgTo = Self.$('.msgTo');
	Self._num = $$('.msgNum');
	Self.type = 3;
	Self.url = '/messages/send.php';

	if (!UI.B.ie6 || !UI.hasClass(Self._txt,'noAutoCmt')) {
		new MI.AutoCmt({
			target : Self._msgTo,
			type : 2,
			call : function(){
				Self.countTxt();
				MI.Bos('btnAutoAtAccount');
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
	Self.removeTip = '确定删除这条私信？';
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
		var replyTitle = '转播 <b>' + UI.trim(Self.name) + '</b>: "' + MI.string.html(Self.content.slice(0,25)),relayTitle = '对 <b>' + Self.name + '</b> 说:';
		if (Self.content.length > 25) {
			replyTitle += '...';
		}
		replyTitle += '"<br/>再说两句:';
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
	Self._black = $$(_body,'.black')[0];
	Self._sFollow = $$(_body,'.ico_sFo')[0];

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
		var sFollow = Self._sFollow;
		//if (!this.send) {
			MI.follow(Self.account,this,function(isFollow){
				UI.hide(Self._follow);
				UI.show(Self._unfollow);
				UI.show(Self._sFollow);
				var o = MI.Card.users[Self.account];
				o.follow = 1;
				UI.removeClass(sFollow,'foLight');
				sFollow.title = MI.sFollowTip[0];
				o.num[1]++;
				Self.num(o);
				Self._follow.className = follow;

				if (Self.followCall) {
					Self.followCall(isFollow);
				}

				MI.Bos('btnCardFollow');
				//this.send = 0;
			});
		//}
		//this.send = 1;
		return false;
	}
	Self._unfollow.onclick = function(){
		//if (!this.send) {
			MI.follow(Self.account,this,function(isFollow){
				UI.hide(Self._unfollow);
				UI.hide(Self._sFollow);
				UI.show(Self._follow);
				var o = MI.Card.users[Self.account];
				o.follow = 0;
				if (o.group) {
					o.group.im = 0;
				}
				o.num[1]--;
				Self.num(o);
				Self._unfollow.className = unfollow;

				if (Self.followCall) {
					Self.followCall(isFollow);
				}

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
		if (!UI.hasClass(this,'disabled')) {
			msgBox._msgTo.value = Self.account;
			Self.msg.show();
			MI.Bos('btnCardMsg');
		}
		return false;
	}
	Self._black.onclick = function(){
		var o = MI.json(UI.A(this,'rel'));
		o.txt = ['拉黑','取消拉黑'];
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
		//UI.hide(Self._msg);
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
					}
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
			var notSelf = Self.account != MI.user.account,btn = o.follow ? Self._unfollow : Self._follow,sFollow = Self._sFollow,icon = '',gender = o.gender ? '他' : '她';
			if (o.block) {
				Self._black.innerHTML = '取消拉黑';
				UI.addClass(Self._black,'blackDel');
			}
			else {
				Self._black.innerHTML = '拉黑';
				UI.removeClass(Self._black,'blackDel');
			}
			UI.A(Self._black,'rel','{u:"' + Self.account + '",name:"' + name + '",sex:"' + gender + '"}');
			Self.num(o);
			for (var i = 0,len = MIIco.length;i < len;i++) {
				if (o.flag[MIIco[i]]) {
					icon += MIIcoHtml[i];
					break;
				}
			}
			Self._name.innerHTML = '<a href="' + url + '">' + name + '</a>' + icon + '<br /><span class="en">@' + account + '</span>';
			if (notSelf) {
				btn.style.display = 'block';
			}
			else {
				UI.addClass(Self._body,'isMe');
			}
			if (notSelf && o.followed) {
				UI.removeClass(Self._msg,'disabled');
				Self._msg.title = '';
			}
			else {
				UI.addClass(Self._msg,'disabled');
				Self._msg.title = '私信只能发给你的听众';
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
			}
			else {
				UI.hide(sFollow);
			}
			//clearTimeout(Self.deelay);
			UI.removeClass(Self._num,'loading');
			UI.removeClass(Self._body,'small');
			MI.Bos('btnCardOpen');
		}
	},
	num : function(o){
		var num = o.num;
		this._num.innerHTML = '广播' + num[0] + '条<span>' + (o.flag.vivi ? '' : '|</span>听众' + num[1] + '人<span>');//|</span>收听了' + num[2] + '人
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
	UI.hide(Self._body);

	Self.talkBox = new MI.TalkBox(Self._body);
	Self._talkTo = $$(Self._body,'.replyTitle')[0];
	Self._msg = $$(Self._body,'.msg')[0];
	
	talkBox = Self.talkBox;
	talkBox.txtTipSend = '发送中';
	UI.addClass(talkBox._txt,'noAutoComplete');
	talkBox.successStart=function(){
		MI.dialog.showTip({html:'发送成功!'});
	}
	talkBox.success=function(){
		UI.removeClass(talkBox._body,'pubSuc');
	}
}
MI.Reply.prototype = {
	//_body : UI.html('<div class="talkWrap" id="reply' + MI.random() + '" style="display:none"><div class="SA"><em>◆</em><span>◆</span></div><div class="top"><span class="left"><span class="replyTitle">对 <b></b>说:</span></span></div><div class="cont"><textarea class="inputTxt noAutoComplete" style="overflow-y: hidden; height: 38px;"></textarea></div><div class="bot" style="margin:5px 0 7px"><input type="button" class="inputBtn sendBtn"/><span class="countTxt">还能输入<em>140</em>字</span></div><div style="display: none;" class="talkSuc"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg" id="msg"></span></div></div>')[0],
	_body : UI.html(MI.tmpl.reply)[0],
	show : function(){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({html:Self._body,width:500});
		Self._talkTo.innerHTML = '对 <b>' + talkBox.talkTo + '</b> 说:';
		talkBox._txt.value = '';
		setTimeout(function(){
			talkBox._txt.focus();
			talkBox.countTxt();
		},0);
	}
}
MI.Msg = function(){ //Msg Dialog
	var Self = this,talkBox;
	UI.hide(Self._body);

	Self.talkBox = new MI.MsgBox(Self._body);
	talkBox = Self.talkBox;
	talkBox.successStart=function(){
		MI.dialog.showTip({html:'发送成功!'});
	}
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
	}catch(e){}
});
UI.ready(function(){
	//UI.addClass(document.body,'ipad');
	//setTimeout(function(){
		try{MI.isS = MI.S('x') != '$No$';}catch(e){};
		//MI.dropTips = new MI.DropTips('searchKey');
		MI.searchKeyBox = new MI.SmartBox('searchKey',function(){$('searchForm').submit()},'',{left:-8,top:UI.B.ie?4:6,width:202});
		UI.EA(document.body,'click',function(){
			for (var i in MI.drop) {
				UI.addClass(MI.drop[i],'off');
				delete MI.drop[i];
			}
		});

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

		if (MI.talkList && MI.talkList.auto) { //自动加载更多消息
			var account = MI.user.account,
				listStorageName = account + '_' + MI.talkList.first.id + '_' + MI.talkList.last.id,
				//listName = 'list_' + account,
				newList = 'new_' + listStorageName,
				moreList = 'more_' + listStorageName,
				scrollTop = 'scroll_' + listStorageName,
				listTime = MI.S('listTime');
			window.onbeforeunload = function(){
				var time = + new Date();
				if (!MI.isS || !listStorageName) {
					return;
				}
				location.hash = 'M';
				MI.S(scrollTop,UI.scrollY());
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
			if (MI.isS) {
				var time = + new Date();
				if (!listTime || time - listTime > 1200000) { //3600000
					MI.S.clear();
					MI.S('listTime',time);
				}

				if (location.hash == '#M') {
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
		}

		var gotTop = $$('.goTop')[0],link = $$('#UIn a,.SM a,.mobileBox a,.proposal a');
		if (gotTop) {
			gotTop.onclick = function(){
				MI.Bos('btnTop');
			}
		}
		if (link) {
			UI.each(link,function(o,i){
				o.onclick = function(){
					MI.Bos('btnSide' + i);
				}
				o.onmouseover = MI.hideFocus;
			});
		}

		if (MI.talkBox && !UI.B.ipad) {
			var draft = 'draft_' + MI.user.account;
			if (MI.talkBox.autoSave && MI.isS) {
				/*UI.EA(window,'beforeunload',function(){
					var txt = MI.talkBox._txt.value;
					MI.S(draft,txt || '');
				});*/
				MI.talkBox._txt.value = MI.S(draft).replace(/^undefined|^Null/,'') || ''; //有隐患，有时间再查一下
				MI.talkBox.countTxt();

				setTimeout(function(){ //Auto Focus
					if (!MI.talkBox._msgTo && location.hash != '#M' && UI.scrollY() < 250) {
							try{
								var length = MI.talkBox._txt.value.length;
								MI.talkBox._txt.focus();
								MI.selectTxt(MI.talkBox._txt,length,length,length);
							}catch(e){}
					}
				},500);
			}
		}

		//Create Dialog && Card && DialogTip
		MI.dialog = MI.dialog || new MI.Dialog();
		MI.dialog._bg.style.height = UI.pageHeight() + 'px';
		MI.card = new MI.Card();
		MI.code = new MI.Code();
		MI.tips = new MI.Tips();
		//MI.dialogTip = new MI.DialogTip();

		//MI.user.fun 的默认值
		if (MI.user.fun) {
			var fun = {search:1};
			for (var i in fun) {
				if (UI.isUndefined(MI.user.fun[i])) {
					MI.user.fun[i] = fun[i];
				}
			}
		}

	//},100);
	setTimeout(function(){
		var delayCrs = function (){
			MI.delay.crs = setTimeout(MI.Crs,200);
		};
		if (MI.talkList || MI.talkBox) {
			MI.Crs(1);
			UI.EA(window,'scroll',delayCrs);
			UI.EA(window,'resize',delayCrs);
		}
	},1);
});