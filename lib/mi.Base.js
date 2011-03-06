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
	var url="http://jubao.qq.com/cgi-bin/jubao?";
	if(urlParam!='') url += urlParam;

	var wrap = UI.html('<div style="width:620px;height:436px;overflow:hidden;border:solid #FFF;border-width:5px 0 10px"><iframe src="about:blank" frameborder="0" scrolling="no" onload="MI.dialog.hideLoad()"></iframe></div>')[0],oIFrame = wrap.firstChild;
	oIFrame.style.cssText = 'width:628px;height:470px;background:#FFF;margin:-13px 0 0 -5px;-margin-top:-32px;border-style:none';
	MI.dialog.show({title:_('腾讯举报平台'),width:670,html:wrap});
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

MIIco = ['auth','star']; //Set Icon's Order
MIIcoHtml = ['<a href="/certification" target="_blank" class="vip" title="' + _('腾讯认证') + '"></a>','<a href="http://ent.qq.com/zt2010/star2010/fans.htm" class="ico_star" title="' + _('星光达人') + '" target="_blank"></a>'];
/*MIIcoWC = function(id){
	return '<a href="/k/' + MIIcoWC.v[id] + '队" title="去' + MIIcoWC.v[id] + '队主场一起狂欢" class="ico_flag flag' + id + '" target="_blank"></a>';
}
MIIcoWC.v = ['','南非','墨西哥','乌拉圭','法国','阿根廷','尼日利亚','韩国','希腊','英格兰','美国','阿尔及利亚','斯洛文尼亚','德国','澳大利亚','塞尔维亚','加纳','荷兰','丹麦','日本','喀麦隆','意大利','巴拉圭','新西兰','斯洛伐克','巴西','朝鲜','科特迪瓦','葡萄牙','西班牙','瑞士','洪都拉斯','智利','中国'];*/
function MIIcon(obj){
	return '<%for(var k=0,num=MIIco.length;k<num;k++){if('+obj+'[MIIco[k]]){%><%=MIIcoHtml[k]%><%;}}%>';//if('+obj+'.wc){%><%=MIIcoWC('+obj+'.wc)%><%;}
}
(function(){
var V1='talk[i].source',V2='info.source',V3='<div class="SA"><em>◆</em><span>◆</span></div>',V5=' href="#"',V6=' onerror="MI.Pic(this,50)"',V7=' title="<%=(talk[i].bkname||talk[i].nick).toTitle()%>(@<%=talk[i].chName || talk[i].name%>)"';
MI.tmpl.listAll = '<%for(var i=0,n=talk.length;i<n;i++){\
		var numAll,numRelay,numComt;numRelay=talk[i].counts[0]||0;numComt=talk[i].counts[1]||0;\
		if('+V1+'){numRelay='+V1+'.counts[0]||0;numComt='+V1+'.counts[1]||0;}\
		numAll=numRelay+numComt;%><li id="<%=talk[i].id%>"<%if(fav){%> fav="<%=talk[i].favortimestamp%>"<%}%> rel="<%=talk[i].timestamp%>">\
			<%if(!guest){%>\
				<%if('+V1+' && talk[i].type==4){%>\
					<div class="userPic"><a href="/<%=talk[i].name%>"'+V7+' class="masPic"><img src="<%=talk[i].pic%>"'+V6+'/></a><a href="/<%='+V1+'.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)" class="cusPic"><img src="<%='+V1+'.pic%>"'+V6+'/></a></div>\
				<%}else{%>\
					<div class="userPic"><a href="/<%=talk[i].name%>"'+V7+'><img src="<%=talk[i].pic%>"'+V6+'/></a></div>\
				<%}%>\
			<%}%>\
			<div class="msgBox">\
				<div class="userName" rel="<%=talk[i].name%>"><strong><a href="/<%=talk[i].name%>"'+V7+'><%=talk[i].bkname||talk[i].nick%></a>'+MIIcon('talk[i].flag')+'<%=talk[i].icon%><%if(!'+V1+' || talk[i].type==5){%>:<%}%></strong><%if('+V1+' && talk[i].type==2){%>转播:&nbsp;<%}else if('+V1+' && talk[i].type==7){%>点评:&nbsp;<%}else if('+V1+' && (talk[i].type==4)){%>对<strong class="userTo"><a href="/<%='+V1+'.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)"><%='+V1+'.bkname||'+V1+'.nick%></a>'+MIIcon(V1+'.flag')+'说:<%}%></strong>\
				</div>\
				<div class="msgCnt"><%=talk[i].content||"&nbsp;"%></div>\
				<%var Imgage=talk[i].image && talk[i].image.length,Videos=talk[i].videos && talk[i].videos.length,Music=talk[i].music && talk[i].music.length;if(Imgage || Videos || Music){%><div class="mediaWrap">\
					<%if(Imgage){%>\
						<%for(var j=0;j<talk[i].image.length;j++){%>\
							<div class="picBox"><a href="<%=talk[i].image[j]%>/460" class="pic"><img class="crs" show="1" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%=talk[i].image[j]%>/160<%}%>"></a></div>\
						<%}%>\
					<%}%>\
					<%if(Videos){%>\
						<div class="videoBox" realurl="<%=talk[i].videos[0].realUrl%>" playurl="<%=talk[i].videos[0].playerUrl%>" minipicurl="<%=talk[i].videos[0].miniPicUrl%>" shorturl="<%=talk[i].videos[0].shortUrl%>" reltitle="<%=talk[i].videos[0].title%>">\
							<div class="vTools"><a href="#" class="vClose"><em></em>收起</a><a href="<%=encodeURI(talk[i].videos[0].realUrl)%>" class="vUrl" target="_blank"><em></em><%if(talk[i].videos[0].title){%><%=MI.string.cut(talk[i].videos[0].title,40)%><%}%></a></div>\
							<div class="vWrap" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>"><a href="#" class="vThumbsBox"><span class="vThumbs"><span class="mask"><em></em></span><img class="crs" show="1" crs="<%=talk[i].videos[0].miniPicUrl%>" /></span><span class="vSimple"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/vSimple.png" /></span></a></div>\
						</div>\
					<%}%>\
					<%if(Music){%>\
						<div class="musicBox" style="clear:both;" song="<%=talk[i].music[0].sMusicName%>" singer="<%=talk[i].music[0].sMusicAuthor%>" songurl="<%=talk[i].music[0].sMusicUrl%>" songid="<%=talk[i].music[0].dwMusicID%>" songtype="<%=talk[i].music[0].dwMusicSourceID%>">\
							<a href="#" class="mThumbsBox" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>">\
								<span class="mThumbs"><em class="ico_audios"></em><%=talk[i].music[0].sMusicName%>-<%=talk[i].music[0].sMusicAuthor%></span>\
							</a>\
							<div class="mBox">\
								<button class="btn_mPlay" title="播放">播放</button>\
								<button class="btn_mPause_hover" title="暂停" style="display:none">暂停</button>\
								<span class="mTitBox"></span>\
								<button class="btn_mClose" title="关闭">关闭</button>\
							</div>\
						</div>\
					<%}%>\
				</div><%}%>\
				<%if('+V1+' && (talk[i].type==2 || talk[i].type==7)){%>\
					<div class="replyBox">\
						<div class="msgBox">\
							<div class="msgCnt"><strong><a href="/<%='+V1+'.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)"><%='+V1+'.bkname||'+V1+'.nick%></a>'+MIIcon(V1+'.flag')+'<%='+V1+'.icon%><%if(!'+V1+'.source){%>:<%}%></strong><%if('+V1+'.source && ('+V1+'.type==4 || '+V1+'.type==5)){%><em class="userTo">对</em><strong class="userTo"><a href="/<%='+V1+'.source.name%>" title="<%=('+V1+'.source.bkname||'+V1+'.source.nick).toTitle()%>(@<%='+V1+'.source.chName || '+V1+'.source.name%>)"><%='+V1+'.source.bkname||'+V1+'.source.nick%></a>'+MIIcon(V1+'.source.flag')+'说:<%}%></strong>\<%='+V1+'.content%></div>\
							<%var Imgage='+V1+'.image && '+V1+'.image.length,Videos='+V1+'.videos && '+V1+'.videos.length,Music='+V1+'.music && '+V1+'.music.length;if(Imgage || Videos || Music){%><div class="mediaWrap">\
								<%if(Imgage){%>\
										<%for(var j=0;j<'+V1+'.image.length;j++){%>\
											<div class="picBox"><a href="<%='+V1+'.image[j]%>/460" class="pic"><img class="crs" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%='+V1+'.image[j]%>/160<%}%>"></a></div>\
										<%}%>\
								<%}%>\
								<%if(Videos){%>\
									<div class="videoBox" realurl="<%='+V1+'.videos[0].realUrl%>" playurl="<%='+V1+'.videos[0].playerUrl%>" minipicurl="<%='+V1+'.videos[0].miniPicUrl%>" shorturl="<%='+V1+'.videos[0].shortUrl%>" reltitle="<%='+V1+'.videos[0].title%>">\
										<div class="vTools"><a href="#" class="vClose"><em></em>收起</a><a href="<%=encodeURI('+V1+'.videos[0].realUrl)%>" class="vUrl" target="_blank"><em></em><%if('+V1+'.videos[0].title){%><%=MI.string.cut('+V1+'.videos[0].title,40)%><%}%></a></div>\
										<div class="vWrap" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>"><a href="#" class="vThumbsBox" ><span class="vThumbs"><span class="mask"><em></em></span><img class="crs" crs="<%='+V1+'.videos[0].miniPicUrl%>" /></span><span class="vSimple"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/vSimple.png" /></span></a></div>\
									</div>\
								<%}%>\
								<%if(Music){%>\
									<div class="musicBox" style="clear:both;" song="<%='+V1+'.music[0].sMusicName%>" singer="<%='+V1+'.music[0].sMusicAuthor%>" songurl="<%='+V1+'.music[0].sMusicUrl%>" songid="<%='+V1+'.music[0].dwMusicID%>" songtype="<%='+V1+'.music[0].dwMusicSourceID%>">\
										<a href="#" class="mThumbsBox" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>">\
											<span class="mThumbs"><em class="ico_audios"></em><%='+V1+'.music[0].sMusicName%>-<%='+V1+'.music[0].sMusicAuthor%></span>\
										</a>\
										<div class="mBox">\
											<button class="btn_mPlay" title="播放" style="display:none">播放</button>\
											<button class="btn_mPause_hover" title="暂停" style="display:">暂停</button>\
											<span class="mTitBox"></span>\
											<button class="btn_mClose" title="关闭">关闭</button>\
										</div>\
									</div>\
								<%}%>\
							</div><%}%>\
							<div class="pubInfo"><span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" href="/p/t/<%='+V1+'.id%>" target="_blank"><%='+V1+'.time%></a> <%='+V1+'.from%><%if(1 && '+V1+' && numAll){if(MI.user.account){%>\
								 <a href="/p/t/<%='+V1+'.id%>" class="zfNum" target="_blank">查看转播和点评(<b class="relayNum"><%=numAll%></b>)</a>\
							<%}else{%>\
								 <em class="zfNum">查看转播和点评(<b class="relayNum"><%=numAll%></b>)</em>\
							<%}}%></span></div>\
						</div>\
					</div>\
				<%}%>\
				<div class="pubInfo"><span class="left"><a class="time" href="/p/t/<%=talk[i].id%>" target="_blank"><%=talk[i].time%></a> <%=talk[i].from%><%if(1 && !'+V1+' && numAll){if(MI.user.account){%>\
					 <a href="/p/t/<%=talk[i].id%>" class="zfNum" target="_blank">查看转播和点评(<b class="relayNum"><%=numAll%></b>)</a><%}else{%>\
					 <em class="zfNum">查看转播和点评(<b class="relayNum"><%=numAll%></b>)</em><%}}%><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%>\
					<a class="view" href="/p/r/<%=talk[i].id%>">查看对话</a><%}%><%if(MI.user.fun.fastReport == 1 && (talk[i].type == 2 || talk[i].type == 7) && talk[i].name != MI.user.account && '+V1+'.name == MI.user.account){%> <a'+V5+' class="alarm">删除</a><%}else if(MI.user.fun.report && talk[i].name != MI.user.account){%> <a'+V5+' class="alarm">举报</a><%}%></span><div class="funBox">\
						<%if(MI.user.account){%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><a'+V5+' class="relay" num="<%=numRelay%>">转播</a><span>|</span><a href="/p/t/<%=talk[i].id%>" class="comt" num="<%=numComt%>">点评</a><span>|</span><a'+V5+' class="delBtn">删除</a><%}else{%><a'+V5+' class="relay" num="<%=numRelay%>">转播</a><span>|</span><a href="/p/t/<%=talk[i].id%>" class="comt" num="<%=numComt%>">点评</a><span>|</span><a'+V5+' class="reply">对话</a><%}}%><span>|</span><a'+V5+' class="fav<%if(fav){%> light<%}%>" title="<%if(fav){%>取消<%}%>收藏"></a><%}%><%if(0){%><%if(talk[i].count){%><%if(MI.user.account){%>\
							<span>|</span><a href="/p/t/<%=talk[i].id%>" class="zfNum zfNumShow" target="_blank">点评<b class="relayNum">(<%=talk[i].count%>)</b></a>\
						<%}else{%>\
							<em class="zfNum zfNumShow">点评<b class="relayNum">(<%=talk[i].count%>)</b></em>\
						<%}}else if('+V1+' && '+V1+'.count){if(MI.user.account){%>\
							<span>|</span><a href="/p/t/<%='+V1+'.id%>" class="zfNum zfNumShow" target="_blank">点评<b class="relayNum">(<%='+V1+'.count%>)</b></a>\
						<%}else{%>\
							<em class="zfNum zfNumShow">点评<b class="relayNum">(<%='+V1+'.count%>)</b></em>\
						<%}}else{if(MI.user.account){%>\
							<span>|</span><a href="/p/t/<%=talk[i].id%>" class="zfNum" target="_blank">点评<b class="relayNum"></b></a>\
						<%}else{%>\
							<em class="zfNum">点评<b class="relayNum"></b></em>\
						<%}}%><%}%><%if(0 && MI.user.account){%><span>|</span><a href="/p/t/<%=talk[i].id%>" class="comt" target="_blank">点评</a><%}%>\
					</div>\
				</div>\
				<%if('+V1+' && talk[i].type==4){%><div class="talkDetail"><b><%='+V1+'.bkname||'+V1+'.nick%>:</b> <%='+V1+'.content%></div><%}%>\
			</div>\
		</li><%}%>';
MI.tmpl.msg = '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>">\
			<div class="msgBox"><div class="userName">发给 <a href="/<%=talk[i].name%>" title="<%=talk[i].bkname||talk[i].nick%>(@<%=talk[i].chName || talk[i].name%>)"><%=talk[i].bkname||talk[i].nick%></a>'+MIIcon('talk[i].flag')+'</div><div class="msgCnt"><%=talk[i].content%></div><div class="pubTime"><span class="time"><%=talk[i].time%></span></div><p class="btnBox"><a href="#" class="replyMsg btn" rel="<%=talk[i].chName || talk[i].name%>">再写一封</a><a class="btn delBtn" href="#">删除</a></p></div>\
		</li><%}%>';
MI.tmpl.msgIn = '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>">\
			<div class="userPic"><a href="/<%=talk[i].name%>" title="<%=talk[i].bkname||talk[i].nick%>(@<%=talk[i].chName || talk[i].name%>)"><img src="<%=talk[i].pic%>"></a></div>\
			<div class="msgBox"><div class="userName"><strong><a href="/<%=talk[i].name%>" title="<%=talk[i].bkname||talk[i].nick%>(@<%=talk[i].chName || talk[i].name%>)"><%=talk[i].bkname||talk[i].nick%></a>'+MIIcon('talk[i].flag')+':</strong></div><div class="msgCnt"><%=talk[i].content%></div><div class="pubTime"><span class="time"><%=talk[i].time%></span></div><p class="btnBox"><a href="#" class="replyMsg btn" rel="<%=talk[i].chName || talk[i].name%>">回信</a><a class="btn delBtn" href="#">删除</a></p></div>\
		</li><%}%>';
MI.tmpl.msgBox = '<div><table border="0" cellspacing="0" cellpadding="0" class="letterBg"><tr><th>收信人</th><td><div class="txtWrap"><input type="text" name="userName" id="userName" class="msgTo inputTxt" value=""/> <span class="cNote">请输入你的听众的微博帐号</span></div></td></tr><tr><th>内　容</th><td><div class="txtWrap"><textarea type="text" class="inputArea noAutoCmt"></textarea></div></td></tr><tr><th></th><td><input type="button" class="sendBtn inputBtn" value="发送" title="快捷键 Crtl+Enter" /><span class="countTxt"></span><a href="#" class="ico_face" title="表情"></a></td></tr></table></div>';
MI.tmpl.note = '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>">\
			<div class="msgBox">\
				<div class="msgCnt"><%=talk[i].content%></div>\
				<div class="pubTime"><span class="time"><%=talk[i].time%></span></div>\
				<p class="btnBox"><a href="#" class="replyMsg btn">修改</a><a href="#" class="btn delBtn">删除</a></p>\
			</div>\
		</li><%}%>';
MI.tmpl.black = '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>确定将<%=sex%>拉入黑名单？</h2><p><span class="fs14">拉黑之后...</span><br/>你们之间的收听关系将被解除，对方无法再收听你，而且你也不再收到来自<%=sex%>的任何消息与通知</p><p><input type="button" value="确定" id="blackTipBtn" /><input type="button" value="取消" onclick="MI.dialog.hide()"/></p></div>';
MI.tmpl.unblack = '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>你真的原谅<%=sex%>了吗？</h2><p><span class="fs14">取消之后...</span><br/>你会重新收到来自<%=sex%>的私信和其它通知</p><p><input type="button" value="确定" id="blackTipBtn"/><input type="button" value="取消" onclick="MI.dialog.hide()"/></p></div>';
MI.tmpl.card = '<div class="uCard"><div class="tip">这是你自己</div><div class="tip"></div><div class="userPic"><a></a><p class="btn"><input type="button" class="addAttention" value="" /><a href="#" class="delAttention" title="取消收听">取消</a></p></div><div class="uCardcnt"><p class="userName"></p><p class="nums loading"></p><p class="btn"><a href="#" class="reply">对话</a><a href="#" class="msg">私信</a><a href="#" class="black">拉黑</a></p><div class="tagBox"></div><a href="#" class="ico_sFo"></a></div></div>';
MI.tmpl.code = '<div class="verify"><span class="ico_tsW"><span class="ico_te"></span></span><h3></h3><div class="clear"><form><div class="left">' + _('验证码：') + '</div><div class="verifyInput"><input type="text" class="inputTxt" /><div class="cNote">' + _('输入下图中的字符，不区分大小写') + '</div><img width="130" height="53">&nbsp;<a href="#" class="codeChange">' + _('看不清，换一张') + '</a></div></div><div class="btnBox"><button type="submit" class="btn2">' + _('确定') + '</button><button class="btn2">' + _('取消') + '</button></form></div></div>';
})();
MI.viewSet = function(id){
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
MI.navMenu = function(){ //Nav Menu
	var nav = $('nav'),
		news = $$(nav,'.news')[0],
		btn_arr = $$(news,'.btn_arr')[0],
		subNav,
		/*subHeight,
		animate_timer,*/
		btn_timer;
	if (news){
		subNav = UI.html('<div class="subNav" onclick="MI.Bos(\'btnTopMenuNews\')"><p><a href="/p/news">' + _('大家在说') + '</a></p><p><a href="/p/mobile">' + _('手机广播') + '</a></p><p><a href="/p/city">' + _('同城广播') + '</a></p><p><a href="/p/top">' + _('热门广播') + '</a></p><p><a href="/college_anas.php">' + _('经典语录') + '</a></p><p><a href="/dandelion.php?g">' + _('蒲 公 英') + '</a></p><p><a href="/p/rank">' + _('排 行 榜') + '</a></p><p class="last"><a href="/lists.php">' + _('名单集市') + '</a></p></div>')[0];
		UI.append(subNav,news);
		//subHeight = UI.height(subNav);
		UI.hide(subNav);
		subNav.onmouseover = news.onmouseover = show;
		subNav.onmouseout = news.onmouseout = hide;
	}
	function show(){
		clearTimeout(btn_timer);
		btn_timer = setTimeout(function(){
			UI.addClass(news,'hover');
			//UI.C(subNav,'opacity',0);
			//UI.C(subNav,'height',0);
			UI.show(subNav);
			/*UI.animate(subNav,'opacity',0.8,function(){
				UI.C(subNav,'opacity','');
			},0.3);*/
			//clearInterval(animate_timer);
			//animate_timer = UI.animate(subNav,'height',subHeight);
		},100)
	}
	function hide(){
		clearTimeout(btn_timer);
		//clearInterval(animate_timer);
		btn_timer = setTimeout(function(){
			UI.removeClass(news,'hover');
			UI.hide(subNav);
		},200)
	}
}
MI.searchKey = function(){ //Search Key
	//MI.dropTips = new MI.DropTips('searchKey');
	var searchKey = $('searchKey'),searchKeyTip;
	if (searchKey){
		searchKeyTip = searchKey.previousSibling;
		MI.searchKeyBox = new MI.SmartBox('searchKey',function(){$('searchForm').submit()},'',{left:-8,top:UI.B.ie?4:6,width:202});
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
				document.location.href = homePage + '?setTheme=1';
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
MI.listDrop = function(floatList){ //List Drop Button
	var listDropBtn = $$('.listDropBtn')[0],
		listWrap = $('listDrop'),
		listUL,
		P,
		PP,
		arrow,
		selected,
		noList = 1,
		keyOnly = 1, //纯键盘操作
		isLab = 1, //实验室 MI.user.isLab
		positionSet,
		_page,
		_pageUp,
		_pageDown,
		pageDelay;
	if (listDropBtn){
		P = listDropBtn.parentNode;
		PP = P.parentNode;
		arrow = $$(listDropBtn,'em')[0];
		selected = UI.A(P,'selected');
		listDropBtn.onclick = function(){
			load();
			show();
			return false;
		}
		listDropBtn.onmouseover = function(){
			keyOnly = 0;
			clearTimeout(MI.delay.viewListShow);
			MI.delay.viewListShow = setTimeout(function(){
				show();
			},500);
			load();
			return false;
		}
		listDropBtn.onmouseout = function(){
			clearTimeout(MI.delay.viewListShow);
		}
	}
	else if (floatList){
		listDropBtn = $$('.homeTab li a')[0];
		P = listDropBtn.parentNode;
		PP = P.parentNode;
		arrow = $$(listDropBtn,'em')[0];
		selected = UI.A(P,'selected');
		load();
	}
	function hide(){
		UI.removeClass(arrow,'lopen');
		if(UI.hasClass(P,'select') && !selected){
			UI.removeClass(P,'select');
		}
		UI.hide(listWrap);
	}
	function show(){
		if (listWrap.innerHTML == '' || UI.C(listWrap,'display') != 'none'){
			return;
		}
		if (!floatList){
			UI.addClass(P,'select');
			UI.addClass(arrow,'lopen');
		}
		UI.show(listWrap);
		if (!positionSet){
			var child = $$(listWrap,'ul')[0],a = $$(child,'a')[0],windowHeight,listHeight,liHeight;
			if (child) {
				listUL = child;
				listWrap.style.cssText += ';margin:' + (UI.getY(PP) + UI.height(PP) - UI.getY(PP.parentNode) - 6) + 'px 0 0 ' + (UI.getX(P) - UI.getX(PP)) + 'px';
				if (floatList){
					UI.addClass(listWrap,'slistDrop');
					UI.C(listWrap,'marginLeft','-120px');
					if (!UI.B.ie6){
						UI.C(listWrap,'position','fixed');
					}
				}
				child.style.height = 'auto';
				listHeight = UI.height(listWrap);
				windowHeight = UI.windowHeight() - (isLab ? 65 : 40) - 100 - UI.getY(PP);
				if (windowHeight < 210){
					windowHeight = 210;
				}
				if(!UI.hasClass(document.body,'ipad') && listHeight > windowHeight){
					liHeight = UI.height(a);
					child.style.cssText += ';overflow:hidden;height:' + liHeight * (windowHeight / liHeight - 1) + 'px';
				}
			}
			//翻页逻辑
			_page = $$(listWrap,'.ld_btn');
			_pageUp = _page[0];
			_pageDown = _page[1];
			if (_pageUp && _pageDown){
				_pageUp.onmousedown = function(){
					page(-liHeight);
					pageDelay = setInterval(function(){
						page(-liHeight);
					},100);
					return false;
				}
				_pageDown.onmousedown = function(){
					page(liHeight);
					pageDelay = setInterval(function(){
						page(liHeight);
					},100);
					return false;
				}
				_pageUp.onclick = _pageDown.onclick = _pageUp.onmouseup = _pageDown.onmouseup = function(){
					clearInterval(pageDelay);
					return false;
				}
				var pageScroll = function(e){
					var E = UI.E(e);
					if (E.wheel == 1){
						page(-liHeight);
					}
					else {
						page(liHeight);
					}
					E.prevent();
				}
				UI.EA(child.parentNode.parentNode,'mousewheel',pageScroll);
				if (!UI.B.ie){
					child.parentNode.parentNode.onmousewheel = pageScroll;
				}
				page(0);
			}
			//当前状态
			var current = MI.listDrop.current;
			if (current){
				UI.each($$(child,'a'),function(o){
					if (UI.A(o,'href').hasString(current)){
						UI.addClass(o.parentNode,'select');
					}
				});
			}
			positionSet = 1;
		}
		MI.Bos('btnListView');
	}
	function page(action){
		var height = UI.height(listUL),
			totalHeight = listUL.scrollHeight,
			scrollTop = listUL.scrollTop + action || 0;
		listUL.scrollTop = scrollTop;
		if (listUL.scrollTop > 0){
			UI.show(_pageUp);
		}
		else {
			UI.hide(_pageUp);
			clearInterval(pageDelay);
		}
		if (height + scrollTop < totalHeight){
			UI.show(_pageDown);
		}
		else {
			UI.hide(_pageDown);
			clearInterval(pageDelay);
		}
	}
	function load(){
		if (noList) {
			if (!UI.A(listWrap,'EA')) {
				UI.A(listWrap,'EA',1);
				if (UI.hasClass(P,'select')){
					UI.A(P,'selected',1);
				}
				if (!floatList){
					P.onmouseout = listWrap.onmouseout = function(){
						MI.delay.viewList = setTimeout(function(){
							hide();
						},100);
					}
					P.onmouseover = listWrap.onmouseover = function(){
						clearTimeout(MI.delay.viewList);
					}
					MI.viewListHide = function(){
						hide();
					}
				}
			}
			MI.app({List:null});
			var Time,Time_1,Time_2,Time_3;
			Time = + new Date();
			UI.ajax({
				url : '/asyn/allmylist.php',
				data : '',
				success : function(data){
					Time_1 = + new Date() - Time;
					data = MI.json(data);
					if (data.result == 0) {
						var create = data.canCreate ? '<a href="#" onclick="MI.viewListHide&&MI.viewListHide();MI.List.add();MI.Bos(\'btnListViewAdd\');return false">' + _('创建') + '</a>|' : '',
							floatListBtn = '';
						if (isLab){
							floatListBtn = floatList ? '<div class="ldHead"><div onclick="document.location.href=document.location.pathname+\'?floatlist=0\';return false" class="goNormal" title="' + _('收起模式') + '"><em></em>' + _('我的名单') + '</div></div>' : '<div class="ldHead"><div onclick="document.location.href=document.location.pathname+\'?floatlist=1\';return false" class="goSide" title="' + _('悬浮模式') + '"><em></em>' + _('悬浮模式') + '</div></div>';
						}
						listWrap.innerHTML = '<div>' + floatListBtn + '</div><div class="ldList"><a href="#" class="ld_btn pageUp" title="' + _('向上滚动') + '" style="display:none"><em></em></a><div class="ldListBox"><ul>' + data.info + '</ul></div><a href="#" class="ld_btn pageDown" title="' + _('向下滚动') + '" style="display:none"><em></em></a></div><p><a href="/lists.php">' + _('集市') + '</a>|' + create + '<a href="/list_mine.php" onclick="MI.Bos(\'btnListViewAdmin\')">' + _('管理') + '</a></p>';
						if (keyOnly){
							show();
						}
					}
		
					//Speed
					Time_2 = + new Date() - Time;
					setTimeout(function(){
						Time_3 = + new Date() - Time;
						MI.Speed('t_asyn_mylist',1,Time_1,Time_2,Time_3);
					},0);
				}
			});
			noList = 0;
		}
	}
}
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
			UI.get('/asyn/medalpoint.php', data, function(data) {
						//data = '{result:0,msg:"成功",info:{html:\'<div class="bIntro clear"><div class="ico_badge badge_sj"><em></em><span><b></b></span></div><div class="left"><p><b>手机达人</b></p><p class="bLevel">您在一周内发表过手机微博，获得手机达人称号</p></div></div><div class="bUpIntro"><p>如果连续一周都没有用手机发表过微博，手机勋章会自动熄灭哦</p></div>\'}}';
						data = MI.json(data);
						if (data.result == 0) {
							Self.cache[id] = data;
							Self.position(el, data);
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
			X = UI.getX(el);
		el.title = '';
		Self._body.style.cssText = 'top:' + y + 'px;left:'
				+ x + 'px;';
		Self._arrow.style.margin = '0 0 0 ' + (X - x) + 'px';
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
			UI.ER(window,'scroll',getMore);
			UI.show('pageSetLink');
		}
	}
	UI.EA(window,'scroll',getMore);
}
MI.linkBoss = function(){ //Link Boss
	setTimeout(function(){
		var link = $$('#UIn a,.SM a,.mobileBox a,.proposal a'),hotTopic = $$('.hotTopicList a'),topMenu = $$('.topMenu a');
		UI.each(link,function(o,i){
			UI.EA(o,'click',function(){
				MI.Bos('btnSide' + i);
			});
			o.onmouseover = MI.hideFocus;
		});
		UI.each(hotTopic,function(o,i){
			o.onclick = function(){
				MI.Bos('btnHotTopicList_' + (i + 1));
			}
		});
		UI.each(topMenu,function(o,i){
			UI.EA(o,'click',function(){
				MI.Bos('btnTopMenu_' + (i + 1));
			});
		});
	},500);
	setTimeout(function(){ //百度等第三方来源上报
		var ouin = MI.Uin(),
			sOp = UI.cookie('pgv_r_cookie') || '',
			url = UI.parseUrl(),
			sSource = url.semsource || '',
			SKeyword = url.semkeyword || '',
			img = new Image();
		if (sSource){
			img.src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=&sOp=' + sOp + '&iSta=&iTy=315&iFlow=&sSource=' + sSource + '&SKeyword=' + SKeyword;
		}
	},3000);
}
MI.sFollow = function(id,el,call){
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
}
MI.Note = {
	_body : null, // 设置框
	_user : null, // 设置框用户昵称
	_target : null, // 目标Dom
	add : function(el,call){
		var Self = this,
			nick = UI.A(el,'nick') || '',
			account = UI.A(el,'account') || '',
			note = UI.A(el,'note') || '';
		Self.call = call;
		if (!Self._body){
			UI.css('.Dnick{width:253px;padding:0 0 10px 5px}.Dnick h4 b{margin:0 4px}.Dnick .funBox{padding:6px 0 2px}.Dnick .inputTxt{width:180px}.Dnick .btn1{margin-left:5px}');
			Self._body = UI.html('<div class="Dnick">\
				<form action="/asyn/bkName_oper.php" method="post" id="addNoteForm" onsubmit="return false">\
					<h4>' + _('对<b></b>添加备注') + '：</h4>\
					<span><input name="u" id="u" value="" type="hidden"><input name="op" id="op" value="0" type="hidden"></span><b></b>\
					<div class="funBox"><input name="bk" id="bk" type="text" class="inputTxt" value="' + note + '"><button type="submit" class="btn1">' + _('保存') + '</button></div>\
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
										str = UI.trim(str);
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
									var o = MI.Card.users[account];
									if (o){
										o.bkname = note;
									}
								}
								
								//Clear Time For At AutoCmt
								MI.S('time',0);
							}
						});
					},100);
				}
			});
		}
		Self._target = el;
		Self._user.innerHTML = nick;
		MI.dialog.show({
			title : '',
			width : 300,
			html : Self._body,
			start : function(){
				$('u').value = account;
				$('bk').value = note;
				MI.focus($('bk'));
			}
		});
	}
}
MI.black = function(o){
	var btn,blackDel = 'blackDel',isBlack = UI.hasClass(o.target,blackDel) ? 1 : 0,type = isBlack ? 'un' : '',txt = [_('拉黑名单'),_('取消拉黑')];
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
						MI.alert(data.msg);
					}
					Self.sending = 0;
				}
			});
			Self.sending = 1;
		}
	}
}
MI.confirm = function(obj){ //obj = {type:'success',title:'',content:'',confirmTxt:'下一步',confirm:function(){},cancelTxt:'取消',cancel:function(){}}
	var str;
	if(obj) {
		obj.type = obj.type ==  'success' ? 's' : 'e';
		obj.title = obj.title || '';
		obj.content = obj.content || '';
		obj.confirmTxt = obj.confirmTxt || _('确定');
		obj.cancelTxt = obj.cancelTxt || _('取消');
		if (MI.confirm.html) {
			UI.remove(MI.confirm.html);
			MI.confirm.html = null;
		}
		MI.confirm.html = UI.html('<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_t' + obj.type + '"></span></span>' + obj.title + '</h2><p>' + obj.content + '</p><p><input type="button" value="' + obj.confirmTxt + '" id="__confirmBtn__" /><input type="button" value="' + obj.cancelTxt + '" id="__cancelBtn__" /></p></div>')[0];
		MI.dialog.show({html:MI.confirm.html,width:obj.width||410});
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
/**
 * 控制Banner和Tips
 * 
 * @param {Object} Object Json字符串
 *            @example
 *            MI.bannerTips({banner:{......}});
 *            MI.bannerTips(); //用于需要异步弹出的Tips，异步执行完调用
 */
MI.bannerTips = function(obj){
	/*
	obj = {
		banner : { //Banner
			id : "14",
			title : "\u4e16\u535a", //标题
			pic : "http:\/\/img1.gtimg.com\/microblog\/pics\/hv1\/99\/165\/614\/39967524.jpg", //图片
			url : "http:\/\/blog.qq.com\/zt\/2010\/2010expo\/index.htm", //链接
			blank : "1", //新窗口
			close : "1" //点连接关闭banner
		},
		msg : { //推广消息
			id : "14",
			content : "html",
		},
		tips : { //新功能Tips
			id : 14,
			target : '.tag a',
			content : 'html',
			css : 'css',
		}
	}
	*/
	obj = obj || MI.bannerTipsCache;
	var oBanner = obj.banner,
		oTips = obj.tips,
		oMsg = obj.msg,
		talkBox = $('talkBox');
	if (oBanner && talkBox){
		UI.css('#homeBannerTip{position:relative;width:576px;height:129px;margin:9px 0 0 8px; overflow:hidden; font-size:12px;}\
#homeBannerTip ul{width:9999px}\
#homeBannerTip li{float:left}\
#homeBannerTip .content{display:block;width:576px;height:129px;*zoom:1;line-height:100em;overflow:hidden}\
#homeBannerTip .close{float:none;position:absolute;margin:0;top:10px;right:13px}\
#homeBannerTip .nums_list{position:absolute;bottom:10px;right:10px; z-index:999; cursor:pointer;}\
#homeBannerTip .nums_list a{display:block;float:left;width:16px;height:16px;line-height:16px;vertical-align:middle;text-align:center;border:1px solid #ccc;background:#fff;margin:0 2px;}\
#homeBannerTip .nums_list a.on{background:#FF6600;color:#fff;}\
');
		var id = 'homeBannerTip',
			link,
			close = 'UI.ajax({url:\'/asyn/updateTips.php\',data:{id:\''+oBanner.id+'\',status:0}});',
			bannerHtml = [],
			bannerPic = oBanner.pic.split(','),
			bannerUrl = oBanner.url.split(','),
			bannerTitle = oBanner.title.split(','),
			banner;
		UI.each(bannerPic,function(o,i){
			if (o){
				bannerHtml.push('<li><a' + (oBanner.blank ? ' target="_blank"' : '') + ' href="' + bannerUrl[i] + '" style="background:url(' + bannerPic[i] + ') 50% 50% no-repeat;" title="' + (bannerTitle[i] || '') + '" class="content"></a></li>');
			}
		});
		banner = UI.html('<div id="homeBannerTip"><a href="#" class="close" title="' + _('关闭') + '"></a>\
				<ul>' + bannerHtml.join('') + '</ul><div class="nums_list page"></div></div>')[0];
		UI.after(banner,talkBox);
		link = $$($(id),'a');
		link[0].onclick = function(){
			UI.hide(id);
			eval(close);
			return false;
		}
		link[1].onclick = function(){
			MI.Bos('homeBannerTip_' + oBanner.id);
			if (oBanner.close){
				eval(close);
			}
		}
		if (bannerPic.length > 1){
			MI.app({
				Slide : function(){
					MI.slide = new MI.Slide({
						target : $('homeBannerTip'),
						auto : 5000,
						tmpl : '<%for(var i=0;i<num;i++){%><a href="#" class="<%if(i==0){%>on<%}%>"><%=i+1%></a><%}%>'
					});
				}
			});
		}
		delete obj.banner;
	}
	if (oMsg && talkBox){
		var idMsg = 'homeMsgTip',
			msg,
			followAll;
		msg = UI.html('<div class="newsTips1" id="' + idMsg + '"><em class="ico_ntips"></em><span class="left">' + oMsg.content + '</span><a href="#" onclick="UI.hide(\'' + idMsg + '\');UI.ajax({url:\'/asyn/updateTips.php\',data:{id:\''+oMsg.id+'\',status:0}});MI.Bos(\'btnMsg_' + oMsg.id + '\');return false" class="close" title="' + _('关闭') + '"></a></div>')[0];
		UI.after(msg,talkBox);
		msg.onmouseover = function(){
			UI.addClass(this,'h1');
		}
		msg.onmouseout = function(){
			UI.removeClass(this,'h1');
		}
		followAll = $$(msg,'.newsTipsFollow')[0];
		if (followAll){
			followAll.onclick = function(){
				var link = $$(this.parentNode,'a'),
					user = [];
				UI.each(link,function(o){
					var href = UI.A(o,'href'),
						id = MI.string.id(href);
					if (!href.hasString('#') && !href.hasString('/k/') && id.length <= 20){
						user.push(id);
						UI.EA(o,'click',function(){
							MI.Bos('btnMsgUser_' + oMsg.id);
						});
					}
				});
				if (user.length){
					MI.follow(user.join(','),this,function(){
						if (!MI.user.fun.followList || user.length > 1){
							MI.tip(_('收听成功'));
						}
					});
				}
				MI.Bos('btnMsgFollow_' + oMsg.id);
				return false;
			}
		}
		delete obj.msg;
	}
	if (oTips){
		var target = $$(oTips.target)[0],html;
		if (target){
			/*
				{
					id:'',
					target:'',
					css:'',
					content
				}
			*/
			UI.css(oTips.css);
			html = UI.html(new UI.tmplString(oTips.content)({
						name : MI.user.account,
						nick : MI.user.name
					}))[0];
			UI.append(html,document.body);
			html.style.cssText += ';top:' + UI.getY(target) + 'px;left:' + UI.getX(target) + 'px;';
			//if (target.nodeName == 'A'){
				UI.EA(target,'click',function(e){
					closeTips(UI.E(e).target);
					return false;
				});
			//}
			UI.each($$(html,'.TipsClose'),function(o,i){
				o.onclick = function(e){
					closeTips(UI.E(e).target);
					return false;
				}
			});
			function closeTips(el){
				var url = el.href;
				UI.ajax({url:'/asyn/updateTips.php',data:{id:oTips.id,status:0}});
				MI.Bos('btnTips_' + oTips.id + '_' + i);
				UI.hide(html);
				if (url){
					if (!url.hasString('#')){
						document.location.href = url;
					}
				}
			}
		}
	}
	MI.bannerTipsCache = obj;
}
MI.TalkBox.topic = {};
/*MI.TalkBox.prototype.showTopic = function(){
	var Self = this,
		index = 0,
		topic = MI.json(MI.S('option_topic_' + MI.user.account)),
		topicName,
		html = [];
	for (var i in topic){
		if (i){
			topicName = decodeURI(i).slice(1,-1);
			html.push('<li><a href="#" title="' + topicName + '">' + topicName + '</a></li>');
			index++;
		}
	}
	if (index){
		Self._topicWrap.innerHTML = '<b></b><ul>' + html.join('') + '</ul>';
		UI.show(Self._topicWrap);
	}
}
MI.TalkBox.prototype.hideTopic = function(){
	var Self = this;
	UI.hide(Self._topicWrap);
}*/
MI.TalkBox.prototype.cacheTopic = function(content){
	var topic = 'option_topic_' + MI.user.account,
		index = 0,
		topicData = [],
		topicOld = MI.json(MI.S(topic)),
		topicNew = {},
		topicNames = content.match(/(#\s*[^#\s]{1}[^#]{0,39}?\s*#)/g),
		topicName;
	if (topicNames){
		UI.each(topicNames,function(o){
			topicName = encodeURI(o);
			topicNew[topicName] = 1;
			delete topicOld[topicName];
		});
	}
	for (var i in topicOld){
		if (i){
			topicNew[i] = 1;
		}
	}
	MI.TalkBox.topic = topicNew;
	topicData.push('{');
	for (var i in topicNew){
		if (index > 5){
			break;
		}
		topicData.push((index == 0 ? '' : ',') + '"' + i + '":1');
		index++;
	}
	topicData.push('}');
	MI.S(topic,topicData.join(''));
}
//MI.TalkBox.prototype.face = [14,1,2,3,4,5,6,7,8,9,10,11,12,13,0,15,16,96,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,89,113,114,115,60,61,46,63,64,116,66,67,53,54,55,56,57,117,59,75,74,69,49,76,77,78,79,118,119,120,121,122,123,124,42,85,43,41,86,125,126,127,128,129,130,131,132,133,134];
//MI.TalkBox.prototype.faceName = ['微笑','撇嘴','色','发呆','得意','流泪','害羞','闭嘴','睡','大哭','尴尬','发怒','调皮','呲牙','惊讶','难过','酷','冷汗','抓狂','吐','偷笑','可爱','白眼','傲慢'];
MI.TalkBox.prototype.addFace = function(){
	var Self = this;
	if (!Self._faceBox){
		Self._faceBox = UI.html('<div class="faceWrap" style="display:none"><a href="#" class="close" title="' + _('关闭') + '"></a><div class="faceBox"><a href="#" class="f14" title="' + _('微笑') + '"></a><a href="#" class="f1" title="' + _('撇嘴') + '"></a><a href="#" class="f2" title="' + _('色') + '"></a><a href="#" class="f3" title="' + _('发呆') + '"></a><a href="#" class="f4" title="' + _('得意') + '"></a><a href="#" class="f5" title="' + _('流泪') + '"></a><a href="#" class="f6" title="' + _('害羞') + '"></a><a href="#" class="f7" title="' + _('闭嘴') + '"></a><a href="#" class="f8" title="' + _('睡') + '"></a><a href="#" class="f9" title="' + _('大哭') + '"></a><a href="#" class="f10" title="' + _('尴尬') + '"></a><a href="#" class="f11" title="' + _('发怒') + '"></a><a href="#" class="f12" title="' + _('调皮') + '"></a><a href="#" class="f13" title="' + _('呲牙') + '"></a><a href="#" class="f0" title="' + _('惊讶') + '"></a><a href="#" class="f15" title="' + _('难过') + '"></a><a href="#" class="f16" title="' + _('酷') + '"></a><a href="#" class="f96" title="' + _('冷汗') + '"></a><a href="#" class="f18" title="' + _('抓狂') + '"></a><a href="#" class="f19" title="' + _('吐') + '"></a><a href="#" class="f20" title="' + _('偷笑') + '"></a><a href="#" class="f21" title="' + _('可爱') + '"></a><a href="#" class="f22" title="' + _('白眼') + '"></a><a href="#" class="f23" title="' + _('傲慢') + '"></a><a href="#" class="f24" title="' + _('饥饿') + '"></a><a href="#" class="f25" title="' + _('困') + '"></a><a href="#" class="f26" title="' + _('惊恐') + '"></a><a href="#" class="f27" title="' + _('流汗') + '"></a><a href="#" class="f28" title="' + _('憨笑') + '"></a><a href="#" class="f29" title="' + _('大兵') + '"></a><a href="#" class="f30" title="' + _('奋斗') + '"></a><a href="#" class="f31" title="' + _('咒骂') + '"></a><a href="#" class="f32" title="' + _('疑问') + '"></a><a href="#" class="f33" title="' + _('嘘') + '"></a><a href="#" class="f34" title="' + _('晕') + '"></a><a href="#" class="f35" title="' + _('折磨') + '"></a><a href="#" class="f36" title="' + _('衰') + '"></a><a href="#" class="f37" title="' + _('骷髅') + '"></a><a href="#" class="f38" title="' + _('敲打') + '"></a><a href="#" class="f39" title="' + _('再见') + '"></a><a href="#" class="f97" title="' + _('擦汗') + '"></a><a href="#" class="f98" title="' + _('抠鼻') + '"></a><a href="#" class="f99" title="' + _('鼓掌') + '"></a><a href="#" class="f100" title="' + _('糗大了') + '"></a><a href="#" class="f101" title="' + _('坏笑') + '"></a><a href="#" class="f102" title="' + _('左哼哼') + '"></a><a href="#" class="f103" title="' + _('右哼哼') + '"></a><a href="#" class="f104" title="' + _('哈欠') + '"></a><a href="#" class="f105" title="' + _('鄙视') + '"></a><a href="#" class="f106" title="' + _('委屈') + '"></a><a href="#" class="f107" title="' + _('快哭了') + '"></a><a href="#" class="f108" title="' + _('阴险') + '"></a><a href="#" class="f109" title="' + _('亲亲') + '"></a><a href="#" class="f110" title="' + _('吓') + '"></a><a href="#" class="f111" title="' + _('可怜') + '"></a><a href="#" class="f112" title="' + _('菜刀') + '"></a><a href="#" class="f89" title="' + _('西瓜') + '"></a><a href="#" class="f113" title="' + _('啤酒') + '"></a><a href="#" class="f114" title="' + _('篮球') + '"></a><a href="#" class="f115" title="' + _('乒乓') + '"></a><a href="#" class="f60" title="' + _('咖啡') + '"></a><a href="#" class="f61" title="' + _('饭') + '"></a><a href="#" class="f46" title="' + _('猪头') + '"></a><a href="#" class="f63" title="' + _('玫瑰') + '"></a><a href="#" class="f64" title="' + _('凋谢') + '"></a><a href="#" class="f116" title="' + _('示爱') + '"></a><a href="#" class="f66" title="' + _('爱心') + '"></a><a href="#" class="f67" title="' + _('心碎') + '"></a><a href="#" class="f53" title="' + _('蛋糕') + '"></a><a href="#" class="f54" title="' + _('闪电') + '"></a><a href="#" class="f55" title="' + _('炸弹') + '"></a><a href="#" class="f56" title="' + _('刀') + '"></a><a href="#" class="f57" title="' + _('足球') + '"></a><a href="#" class="f117" title="' + _('瓢虫') + '"></a><a href="#" class="f59" title="' + _('便便') + '"></a><a href="#" class="f75" title="' + _('月亮') + '"></a><a href="#" class="f74" title="' + _('太阳') + '"></a><a href="#" class="f69" title="' + _('礼物') + '"></a><a href="#" class="f49" title="' + _('拥抱') + '"></a><a href="#" class="f76" title="' + _('强') + '"></a><a href="#" class="f77" title="' + _('弱') + '"></a><a href="#" class="f78" title="' + _('握手') + '"></a><a href="#" class="f79" title="' + _('胜利') + '"></a><a href="#" class="f118" title="' + _('抱拳') + '"></a><a href="#" class="f119" title="' + _('勾引') + '"></a><a href="#" class="f120" title="' + _('拳头') + '"></a><a href="#" class="f121" title="' + _('差劲') + '"></a><a href="#" class="f122" title="' + _('爱你') + '"></a><a href="#" class="f123" title="NO"></a><a href="#" class="f124" title="OK"></a><a href="#" class="f42" title="' + _('爱情') + '"></a><a href="#" class="f85" title="' + _('飞吻') + '"></a><a href="#" class="f43" title="' + _('跳跳') + '"></a><a href="#" class="f41" title="' + _('发抖') + '"></a><a href="#" class="f86" title="' + _('怄火') + '"></a><a href="#" class="f125" title="' + _('转圈') + '"></a><a href="#" class="f126" title="' + _('磕头') + '"></a><a href="#" class="f127" title="' + _('回头') + '"></a><a href="#" class="f128" title="' + _('跳绳') + '"></a><a href="#" class="f129" title="' + _('挥手') + '"></a><a href="#" class="f130" title="' + _('激动') + '"></a><a href="#" class="f131" title="' + _('街舞') + '"></a><a href="#" class="f132" title="' + _('献吻') + '"></a><a href="#" class="f133" title="' + _('左太极') + '"></a><a href="#" class="f134" title="' + _('右太极') + '"></a><div class="facePreview" style="display:none"></div></div></div>')[0];
		UI.C(Self._faceBox,'z-index',9999);
		Self._facePreview = $$(Self._faceBox,'.facePreview')[0];
		Self._faceClose = $$(Self._faceBox,'.close')[0];
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
		UI.each($$(Self._faceBox,'.faceBox a'),function(o,i){
			o.onclick = function(){
				Self.addTopic(' /' + this.title);
				Self.hideFace();
				return false;
			}
			if (!ipad){
				o.onmouseover = function(){
					Self._facePreview.innerHTML = '<div><p class="faceImg"><img src="http://mat1.gtimg.com/www/mb/images/face/' + this.className.replace('f','') + '.gif" alt=""></p><p class="faceName">' + this.title + '</p></div>';
					Self._facePreview.style.cssText = i % 15 > 7  ? 'left:0' : '';
				}
				o.onmouseout = function(){
					UI.hide(Self._facePreview);
				}
			}
		});
	}
	if (Self._faceBox.style.display == 'none'){
		setTimeout(function(){
			Self._faceBox.style.cssText = 'top:' + (UI.getY(Self._face) + UI.height(Self._face) + 5) + 'px;left:' + (UI.getX(Self._face) - 50) + 'px';
		},0);
	}
	else {
		Self._faceBox.style.cssText = 'display:none';
	}
}
MI.TalkBox.prototype.hideFace = function(){
	var Self = this;
	if (Self._faceBox){
		UI.hide(Self._facePreview);
		UI.hide(Self._faceBox);
	}
}
MI.TalkList.prototype.urlTips = function(tips){
	if (this.nodeName == 'A') {
		var target = this,
			urlTipsTxt = [_('原链接有风险'),_('原链接不建议打开'),_('腾讯网'),_('原链接')],
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
			UI.A(target,'href',(UI.B.ie ? ' ' : '') + href + '?type=1&from=19&u=' + MI.user.account + '&s=' + timeFrom + '&f=1');
		}
		if (target.title) { //Cache Title
			UI.A(target,'reltitle',target.title);
			target.title = '';
		}
		if (MI.Tips.url[id]) {
			show(MI.Tips.url[id]);
			MI.Bos('btnViewUrl');
		}
		else {
			Time = + new Date();
			UI.get('/asyn/urldetail.php','url=' + id,function(data){
				Time_1 = + new Date() - Time;
				data = MI.json(data);
				if (data.result == 0) {
					show(data);
					MI.Tips.url[id] = data;
					MI.Bos('btnViewUrl');
				}
				
				//Speed
				Time_2 = + new Date() - Time;
				setTimeout(function(){
					Time_3 = + new Date() - Time;
					MI.Speed('t_asyn_url',0.1,Time_1,Time_2,Time_3);
				},0);
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
				url =  MI.string.cut(url,60);
				br = '<br>';
			}
			else {
				tip = urlTipsTxt[data.info.safe - 1] || urlTipsTxt[0];
				br = '：';
				url = MI.string.cut(url,80);
			}
			url = url.breakWord(0);
			if (UI.B.ie) { //Copy Button
				url += ' <textarea style="display:none">' + data.info.url + '</textarea><a href="#" onclick="var a=window.clipboardData.setData(\'Text\',this.previousSibling.value),b=this.nextSibling;UI.hide(this);UI.show(b);b.innerHTML=a?\'' + _('复制成功') + '\':\'' + _('复制失败') + '\';return false">[' + _('复制') + ']</a><span class="cNote" style="display:none"></span>';
			}
			if (data.info.safe > 2) { //Go Source Url
				//UI.A(target,'href',(UI.B.ie ? ' ' : '') + data.info.url);
			}
			tips.innerHTML = '<em class="ico safe_' + (data.info.safe || 1) + '"></em><div class="safeType">' + MI.string.html(tip) + br + url + '</div></div>';
			UI.show(tips);
			MI.tips.position(target);
		}
	}
}
MI.SmartBox = function(id,callback,type,style){ //input element,callback,search type
	if(!$(id)) return;
	var Self = this;
	this._callback = callback?callback:null;
	this._key = $(id);
	this.url = '/asyn/messagetips.php';//smartbx统一服务接口
	this._type = type?type:'';//数据类型
	this._fix = UI.B.ie?[0,0]:[1,2];//用于修复ie，ff下的位置
	this.param = 'key=%key%';

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
		var param = this.param.replace(/\%key\%/g,encodeURIComponent(value));
		if(this.timer)	clearTimeout(this.timer);
		if(this._type == 'music'){
			this.timer=window.setTimeout(function(){
				UI.getScript(Self.url+"?"+param);
			},150);
		}else{
			this.timer=window.setTimeout(function(){
				UI.get(
					Self.url,
					param,//"key=" + encodeURIComponent(value),
					function(data){
						data = MI.json(data);
						if (data.result == 0) {
							if(data.info){
								var s = [];
								var l = data.info.length;
								Self.indexMax = l - 1;
								Self.index = -1;
								s.push('<ul>');
								for(var i in data.info){
									//s.push('<p>' + Self.termJson(data.info[i],[Self.keyword]) + '</p>');
									s.push('<li value=\"'+ data.info[i] +'\" index="' + i + '">' + data.info[i] + '</li>');
								}
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
										Self.select(i);
									}
									el.onclick = function(){
										Self._key.value = this.innerHTML;
										UI.A(Self._key,'index',UI.A(this,'index'));
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
		}
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
	Self.topic = o.topic || 0; //Insert Topic
	Self.face = o.face || 0; //Insert Face
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
		if (Self.face && textLast == '\/'){
			/*var face = MI.TalkBox.prototype.face,faceName = MI.TalkBox.prototype.faceName,html = [],index = 0;
			if (!Self._body.appended) {
				UI.append(Self._body,document.body);
				Self._body.appended = 1;
			}
			Self._txt.innerHTML = Self.key ? Self.shadowText(text) : '';
			for (var i in face){
				html.push('<li' + (index ? '' : ' class="on"') + '><span><img src="http://mat1.gtimg.com/www/mb/images/face/' + face[index] + '.gif" style="width:18px;display:none;vertical-align:middle">' + faceName[index] + '</span></li>');
				index++;
			}
			Self._body.style.cssText = '';
			Self._body.innerHTML = html.join('');
			Self.list = Self._body.childNodes;
			UI.each(Self.list,function(o,i){
				UI.EA(o,'click',select);
				UI.EA(o,'mouseover',hover);
				o.index = i;
			});
			Self.index = 0;
			Self.indexMax = Self.list.length - 1;
			if (Self.list.length > 10) {
				Self._body.style.cssText = 'height:210px;overflow-y:scroll;overflow-x:hidden;';
				Self._body.scrollTop = 0;
			}
			
			UI.show(Self._body);
			Self.display = 0;
			Self.position();
			Self.display = 1;

			Self.selectType = 2;*/
			return;
		}
		else if (Self.topic && textLast == '#' && text.match(/#/g).length % 2 != 0){ // || text.replace(MI.TalkBox.prototype.txtTopic.slice(1,-1),'').slice(-1) == '#'
			var topic = MI.json(MI.S('option_topic_' + MI.user.account)),html = [],index = 0,topicName;
			if (!Self._body.appended) {
				UI.append(Self._body,document.body);
				Self._body.appended = 1;
			}
			Self._txt.innerHTML = Self.key ? Self.shadowText(text) : '';
			for (var i in topic){
				topicName = decodeURI(i).slice(1,-1);
				html.push('<li title="' + topicName + '"' + (index ? '' : ' class="on"') + '><span>' + MI.string.cut(topicName,20,'') + '</span></li>');
				index++;
			}
			if (index){
				Self._body.style.cssText = '';
				Self._body.innerHTML = '<ul>' + html.join('') + '</ul>';
				Self.list = $$(Self._body,'li');
				UI.each(Self.list,function(o,i){
					UI.EA(o,'click',select);
					UI.EA(o,'mouseover',hover);
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
			return;
		}
		else if (Self.word) {
			Self.word = Self.word[0];
			textLength = Self.word.length;
			if (textLength > 1) {
				text = text.slice(0,- textLength + 1);
			}
			Self.selectType = 0;
		}
		else {
			clearTimeout(Self.delay);
			Self.hide();
			return;
		}
		Self._txt.innerHTML = Self.key ? Self.shadowText(text) : '';
		Self._txtEnd.innerHTML = Self.shadowText(textEnd);

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
				usersStorageKeyPY = usersStorageKey + '_PY',
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
			if (!Self.sending && (!users || (new Date().getTime() - MI.S('time') > 7200000) || !newData(users))){ //3600000
				Self.sending = 1;
				var Time,Time_1,Time_2,Time_3;
				Time = + new Date();
				UI.get('/asyn/nicktips.php','user=' + MI.user.account + '&type=' + (Self.type ? Self.type : 0) + '&num=' + (UI.B.ie ? 750 : 2000),function(data){
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
					}
					Self.sending = 0;
				
					//Speed
					Time_2 = + new Date() - Time;
					setTimeout(function(){
						Time_3 = + new Date() - Time;
						MI.Speed('t_asyn_nicktips',1,Time_1,Time_2,Time_3);
					},0);
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
			}
		/*}
		else {
			Self.hide();
		}*/
	}
	function hide(){
		Self.hide();
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
}
MI.AutoCmt.prototype = {
	_body : UI.html('<div class="autoCmt" style="display:none"></div>')[0],
	display : 0,
	clicks : 0,
	index : 0,
	filter : '', //Filter @
	cursorX : 0, //CursorX
	cursorXHack : 0, //IE CursorX 修正
	shadowText : function(text){
		return text.replace(/\r\n|\n/g,'<br>').replace(/ /g,'&nbsp;');
	},
	tips : '<div class="tips">' + _('@朋友帐号,他就能在[提到我的]页收到') + '</div>',
	selectType : 0, //Select Type: 0-@ 1-Topic 2-Face
	select : function(){
		var Self = this;
		if (Self.selectType == 0){
			if (UI.isNumber(Self.index)) {
				var scrollTop = Self._target.scrollTop,
					txt = Self.list[Self.index].txt,
					count;
				Self._target.focus();
	
				//Save Use History
				MI.insertTxt(Self._target,txt + ' ',Self.cursorX,Self.word.slice(1).length);
				count = MI.users[txt];
				MI.users[txt] = count ? count + 1 : 1;
	
				if (!Self.key) {
					Self._target.value = Self.filter + txt;
				}
				if (Self.call) {
					Self.call();
				}
				Self._target.scrollTop = scrollTop;
			}
			MI.Bos('btnAutoAtAccount');
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
		else if (Self.selectType == 2){
			var txt = '/' + UI.text(Self.list[Self.index]);
			MI.insertTxt(Self._target,txt,Self.cursorX,1);
			MI.Bos('btnAutoAddFace');
		}
		Self.hide();
	},
	show : function(o, py){
		py = py || {};
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
					var w = word.toLowerCase();
					var rs;
					for (var i in users) {
						if (matchLength >= 40) {
							break;
						}
						if (!py[i] || txtObj[i]) continue;
						rs = MI.MatchPY.sim(py[i][1], w);
						if (rs) {
							match.push(users[i].substring(0, rs[0]) + '<b>' + users[i].substring(rs[0], rs[0]+rs[1]) + '</b>' + users[i].substring(rs[0]+rs[1]) + ' (' + i + ')');
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
						}
						index++;
					}
				}
				if (matchLength < 40) {
					var w = word.toLowerCase();
					var rs;
					for (var i in users) {
						if (matchLength >= 40) {
							break;
						}
						if (!py[i] || txtObj[i]) continue;
						rs = MI.MatchPY.whole(py[i][0], w);
						if (rs) {
							match.push(users[i].substring(0, rs[0]) + '<b>' + users[i].substring(rs[0], rs[0]+rs[1]) + '</b>' + users[i].substring(rs[0]+rs[1]) + ' (' + i + ')');
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
						}
						index++;
					}
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
				if (MI.usersArr && MI.usersArr.length) {
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
				else if (Self.word == '@'){
					if (!Self._body.appended) {
						UI.append(Self._body,document.body);
						Self._body.appended = 1;
					}
					Self._txt.innerHTML = Self.key ? Self.shadowText(Self.text) : '';
		
					Self._body.style.cssText = '';
					Self._body.innerHTML = Self.tips;
					Self.list = $$(Self._body,'li');
					Self.index = 0;
		
					Self.display = 0;
					Self.position();
					Self.display = 1;
					return;
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
				this._body.innerHTML = '<ul><li class="on"><span>' + match.join('</span></li><li><span>') + '</span></li></ul>' + this.tips;
				this.list = $$(this._body,'li');
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
			this.position();
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
	position : function(){
		var x,y;
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
		Self._code.src = UI.A(Self._code,'crs') + '&' + Math.random();
		Self._value.focus();
		return false;
	}
	this._form.onsubmit = submit;
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
	Self.url = '/messages/send.php';
	Self.msgTo = {};
	Self.getMsgTo = function(){
		var name = Self._msgTo.value;
		if (name){
			UI.ajax({
				url : '/asyn/userCard.php',
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
		var replyTitle = _('转播') + ' <b>' + UI.trim(Self.name) + '</b>: "' + MI.string.html(Self.content.slice(0,25)),relayTitle = _('对 <b>{0}</b> 说:',Self.name);
		if (Self.content.length > 25) {
			replyTitle += '...';
		}
		replyTitle += '"<br/>' + _('再说两句:');
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
MI.Reply = function(){ //Reply Dialog
	var Self = this,talkBox,talkBox;
	UI.hide(Self._body);

	Self.talkBox = new MI.TalkBox(Self._body);
	Self._talkTo = $$(Self._body,'.replyTitle')[0];
	Self._msg = $$(Self._body,'.msg')[0];
	
	talkBox = Self.talkBox;
	talkBox.txtTipSend = _('发送中');
	UI.addClass(talkBox._txt,'noAutoComplete');
	talkBox.successStart=function(){
		MI.dialog.showTip({html:_('发送成功!')});
	}
	talkBox.success=function(){
		UI.removeClass(talkBox._body,'pubSuc');
	}
}
MI.Reply.prototype = {
	//_body : UI.html('<div class="talkWrap" id="reply' + MI.random() + '" style="display:none"><div class="SA"><em>◆</em><span>◆</span></div><div class="top"><span class="left"><span class="replyTitle">对 <b></b>说:</span></span></div><div class="cont"><textarea class="inputTxt noAutoComplete" style="overflow-y: hidden; height: 38px;"></textarea></div><div class="bot" style="margin:5px 0 7px"><input type="button" class="inputBtn sendBtn"/><span class="countTxt">还能输入<em>140</em>字</span></div><div style="display: none;" class="talkSuc"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg" id="msg"></span></div></div>')[0],
	_body : UI.html(MI.tmpl.reply)[0],
	show : function(obj){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({html:Self._body,width:500});
		Self._talkTo.innerHTML = _('对 <b>{0}</b> 说:',talkBox.talkTo);
		talkBox._txt.value = '';
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
		}
		setTimeout(function(){
			MI.focus(talkBox._txt);
			talkBox.countTxt();
		},0);
	}
}
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
			UI.removeClass(talkBox._btn,'disabled');
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
	Self._blackTip = $$(_body,'.tip')[1];
	Self._sFollow = $$(_body,'.ico_sFo')[0];
	Self._tag = $$(_body,'.tagBox')[0];

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
		var sFollow = Self._sFollow,
			T = this;
		//if (!this.send) {
			MI.follow(Self.account,T,function(isFollow){
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
					Self.followCall(isFollow,T);
				}

				MI.Bos('btnCardFollow');
				//this.send = 0;
			});
		//}
		//this.send = 1;
		return false;
	}
	Self._unfollow.onclick = function(){
		var T = this;
		//if (!this.send) {
			MI.follow(Self.account,T,function(isFollow){
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
					Self.followCall(isFollow,T);
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
		replyBox.topic = '@' + Self.chName + ' ';
		replyBox.txtMax = txtMax - replyBox.topic.length;
		Self.reply.show();
		MI.Bos('btnCardReply');
		return false;
	}
	Self._msg.onclick = function(){
		if (!UI.hasClass(this,'disabled')) {
			msgBox._msgTo.value = Self.chName;
			Self.msg.show();
			MI.Bos('btnCardMsg');
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
}
MI.Card.prototype = {
	_body : UI.html(MI.tmpl.card)[0],
	show : function(el){
		var Self = this,
			pic = el.src,
			P = el.parentNode,
			title = UI.A(P,'rel'),
			reg = /@[^@]+$/g,
			account = MI.string.id(P.href),
			chName = title.match(reg)[0].slice(1,-1), //含中文ID
			name = title.replace(reg,'').slice(0,-1),
			url = '/' + account,
			Time,Time_1,Time_2,Time_3;
		if (Self.target == el) {
			return;
		}
		Self.account = account;
		Self.name = name;
		Self.chName = chName;
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
		else {
			Time = + new Date();
			UI.get('/asyn/userCard.php','u=' + account + '&r='+MI.random(),function(data){
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
				
				//Speed
				Time_2 = + new Date() - Time;
				setTimeout(function(){
					Time_3 = + new Date() - Time;
					MI.Speed('t_asyn_card',0.1,Time_1,Time_2,Time_3);
				},0);
			});
		}
		function show(o){
			var notSelf = Self.account != MI.user.account,
				btn = o.follow ? Self._unfollow : Self._follow,
				sFollow = Self._sFollow,
				icon = '',
				gender = o.gender ? '他' : '她',
				rel;
			if (o.gender == 2) {
				gender = '它';
			}
			rel = "{u:'" + Self.account + "',name:'" + name + "',sex:'" + gender + "'}";
			if (o.block) {
				Self._black.innerHTML = '取消拉黑';
				UI.addClass(Self._black,'blackDel');
				Self._blackTip.style.display = 'block';
				Self._blackTip.innerHTML = '<a href="#" class="right blackDel" rel="' + rel + '">[移出]</a>' + gender + '在你的黑名单里';
				$$(Self._blackTip,'a')[0].onclick = Self._black.onclick;
			}
			else {
				Self._black.innerHTML = '拉黑';
				UI.removeClass(Self._black,'blackDel');
				UI.hide(Self._blackTip);
			}
			UI.A(Self._black,'rel',rel);
			Self.num(o);
			for (var i = 0,len = MIIco.length;i < len;i++) {
				if (o.flag[MIIco[i]]) {
					icon += MIIcoHtml[i];
					break;
				}
			}
			Self._name.innerHTML = '<a href="' + url + '">' + name + '</a>' + icon + '<br /><span class="en">@' + chName + '</span>';
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
			if (o.tag) {
				Self._tag.innerHTML = '<h5></h5>标签：' + o.tag + '';
				UI.each($$(Self._tag,'span'),function(o){
					if (!UI.hasClass(o,'last')) {
						//UI.append(UI.html('<span>、</span>')[0],o);
					}
				});
				/*UI.each($$(Self._tag,'a'),function(o){ //Break Tag Name
					o.innerHTML = o.innerHTML.breakWord();
				});*/
				UI.show(Self._tag);
			}
			else {
				UI.hide(Self._tag);
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
MI.Card.build = function(el,className,clickHead){
	UI.each($$(el,className),function(o){
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
			UI.EA(o,'click',function(){
				MI.Bos('btnHead');
			});
		}
	});
}
MI.GoTop = {
	_body : UI.html('<div class="sToolbar single"><div class="bg"></div><div class="sToolbarBg"><em></em></div></div>')[0],
	_mBox : UI.html('<div class="mSimpleBox" style="display:none"><a href="#" class="ico_mState" style="display:none"></a><button class="btn_mPlay">' + _('播放') + '<b class="mask"></b></button><button class="btn_mPause" style="display:none">' + _('暂停') + '<b class="mask"></b></button><b class="mbg"></b></div>')[0],
	_tBox : UI.html('<div class="goTopBox"><a href="#" class="btn_goTop" onclick="window.scrollTo(0,0);MI.Bos(\'btnTop\');this.blur();return false">' + _('返回顶部') + '<b class="mask"></b></a></div>')[0],
	delay : {},
	resize : 0,
	position : function(){
		this.build();
	},
	build : function() {
		if (UI.hasClass(document.body,'ipad') || !$('mainWrapper')) {
			return;
		}
		var Self = this,
			//各浏览器fix统一修改为5px，css中统一控制了。
			leftFix = 5,//UI.B.ie ? 1 : 3,
			_main = $('mainWrapper'),
			left = UI.getX(_main) + UI.width(_main) - leftFix,
			foot,
			windowHeight = UI.windowHeight(),
			pageHeight = UI.pageHeight(),
			scrollY,
			resize,
			y,
			state = MI.music.state;
		if (_main) {
			UI.after(Self._mBox,$$(Self._body,'.bg')[0]);
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
		function position(e){
			resize = (e && UI.E(e).type == 'resize') || Self.resize;
			clearTimeout(Self.delay.position);
			if (UI.B.ie6) {
				if (MI.dialog && MI.dialog.display){ //Kill Dialog Bug When Scrolling Page
					return;
				}
				UI.hide(Self._body);
			}
			Self.delay.position = setTimeout(set,UI.B.ie6 ? 400 : 0);
		}
		function set(){
			var state =  MI.music.state;
			pageHeight = UI.pageHeight();
			if (resize) {
				windowHeight = UI.windowHeight()
				left = UI.getX(_main) + UI.width(_main) - leftFix;
				Self.resize = 0;
			}
			scrollY = UI.scrollY();
			Self._body.style.cssText = 'left:' + left + 'px;';
			if(scrollY < 52){
				UI.hide(Self._tBox);
				if(state==null){
					UI.hide(Self._body);
				}
				UI.addClass(Self._body,'single');
			}else{
				UI.show(Self._tBox);
				UI.show(Self._body);
				if(state!=null){
					UI.removeClass(Self._body,'single');
					UI.show(Self._mBox);
				}
			}
			y = scrollY + windowHeight - pageHeight;
			if (y >= -foot) {
				Self._body.style.cssText += ';position:absolute;top:' + (pageHeight - 37 - foot) + 'px';
			}
		}
	},
	showMusicBox : function(state){//1:播放，0|null:暂停
		var Self = this;
		var mBox = Self._mBox,
			mState = $$(mBox,'.ico_mState')[0],
			mPlay = $$(mBox,'.btn_mPlay')[0],
			mPause = $$(mBox,'.btn_mPause')[0],
			s;
		//var state = MI.music.state;
		if(Self._tBox.style.display != 'none'){
			UI.removeClass(Self._body,'single');
		}
		UI.show(Self._body);
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
		var Self = this;
		if(Self._tBox.style.display == 'none'){
			UI.hide(Self._body);
		}
		UI.hide(Self._mBox);
		UI.addClass(Self._body,'single');
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
