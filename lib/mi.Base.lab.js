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
	MI.dialog.show({title:_('腾讯举报平台'),width:570,html:wrap});
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
MI.tmpl.listAll = '<%var D=MI.TalkList.date;for(var i=0,n=talk.length;i<n;i++){\
		var sid=talk[i].id,numAll,numRelay,numComt,numRelay2;numRelay=talk[i].counts[0]||0;numComt=talk[i].counts[1]||0;numRelay2=talk[i].counts[2]||0;\
		if('+V1+'){sid='+V1+'.id;numRelay='+V1+'.counts[0]||0;numComt='+V1+'.counts[1]||0;}\
		numAll=numRelay+numComt;%><li id="<%=talk[i].id%>"<%if(fav){%> fav="<%=talk[i].favortimestamp%>"<%}%> rel="<%=talk[i].timestamp%>">\
			<%if(D){\
				var date=UI.formatDate(UI.zoneDate(talk[i].timestamp+\'000\',8),\'yyyy-MM-d\'),dateD=date.slice(8),dateM=date.slice(0,7);\
				if(date!=D){\
					%><div class="pubDate"><span class="pDate"><%=dateD%></span><br><%=dateM%></div><%\
					D=date;\
				}\
			}else if(!guest){%>\
				<%if('+V1+' && talk[i].type==4){%>\
					<div class="userPic"><a href="http://t.qq.com/<%=talk[i].name%>"'+V7+' class="masPic"><img src="<%=talk[i].pic%>"'+V6+'/></a><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)" class="cusPic"><img src="<%='+V1+'.pic%>"'+V6+'/></a></div>\
				<%}else{%>\
					<div class="userPic"><a href="http://t.qq.com/<%=talk[i].name%>"'+V7+'><img src="<%=talk[i].pic%>"'+V6+'/></a></div>\
				<%}%>\
			<%}%>\
			<div class="msgBox">\
				<div class="userName" rel="<%=talk[i].name%>"><strong><a href="http://t.qq.com/<%=talk[i].name%>"'+V7+'><%=talk[i].bkname||talk[i].nick%></a>'+MIIcon('talk[i].flag')+'<%=talk[i].icon%><%if(!'+V1+' || talk[i].type==5){%>:<%}%></strong><%if('+V1+' && talk[i].type==2){%>' + _('转播') + ':&nbsp;<%}else if('+V1+' && talk[i].type==7){%>' + _('评论') + ':&nbsp;<%}else if('+V1+' && (talk[i].type==4)){%>' + _('对') + '<strong class="userTo"><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)"><%='+V1+'.bkname||'+V1+'.nick%></a>'+MIIcon(V1+'.flag')+'' + _('说') + ':<%}%></strong>\
				</div>\
				<div class="msgCnt"><%=talk[i].content||"&nbsp;"%>\
				<%if(talk[i].tran>0){%>\
					<a class="btn_trans"  href="#">[' + _('译') + ']</a>\
				<%}%>\
				</div>\
				<%var Imgage=talk[i].image && talk[i].image.length,Videos=talk[i].videos && talk[i].videos.length,Music=talk[i].music && talk[i].music.length,Vote=talk[i].vote && talk[i].vote.length;if(Imgage || Videos || Music || Vote){%><div class="mediaWrap">\
					<%if(Vote || !(Imgage || Videos || Music)){%>\
						<div class="videoBox voteBox" realurl="http://vote.t.qq.com/vote/vote.php?id=<%=talk[i].vote[0].realUrl%>&result=yes&tpl=mini" shorturl="http://url.cn/<%=talk[i].vote[0].shortUrl%>" realtitle="<%=talk[i].vote[0].title%>">\
							<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="http://vote.t.qq.com/vote/vote.php?id=<%=encodeURI(talk[i].vote[0].realUrl)%>" class="vUrl" target="_blank"><em></em><%if(talk[i].vote[0].title){%><%=MI.string.cut(talk[i].vote[0].title,40)%><%}%></a></div>\
							<div class="vWrap"><a href="#" class="vtThumbs"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/voteResulte.png" /></a></div>\
						</div>\
					<%}%>\
					<%if(Imgage){%>\
						<%for(var j=0;j<talk[i].image.length;j++){%>\
							<div class="picBox"><a href="<%=talk[i].image[j]%>/460" class="pic"><img class="crs" show="1" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%=talk[i].image[j]%>/160<%}%>"></a></div>\
						<%}%>\
					<%}%>\
					<%if(Videos){%>\
						<div class="videoBox" realurl="<%=talk[i].videos[0].realUrl%>" playurl="<%=talk[i].videos[0].playerUrl%>" minipicurl="<%=talk[i].videos[0].miniPicUrl%>" shorturl="<%=talk[i].videos[0].shortUrl%>" reltitle="<%=talk[i].videos[0].title%>">\
							<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="<%=encodeURI(talk[i].videos[0].realUrl)%>" class="vUrl" target="_blank"><em></em><%if(talk[i].videos[0].title){%><%=MI.string.cut(talk[i].videos[0].title,40)%><%}%></a></div>\
							<div class="vWrap" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>"><a href="#" class="vThumbsBox"><span class="vThumbs"><span class="mask"><em></em></span><img class="crs" show="1" crs="<%=talk[i].videos[0].miniPicUrl%>" /></span><span class="vSimple"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/vSimple.png" /></span></a></div>\
						</div>\
					<%}%>\
					<%if(Music){%>\
						<div class="musicBox" style="clear:both;" song="<%=talk[i].music[0].sMusicName%>" singer="<%=talk[i].music[0].sMusicAuthor%>" songurl="<%=talk[i].music[0].sMusicUrl%>" songid="<%=talk[i].music[0].dwMusicID%>" songtype="<%=talk[i].music[0].dwMusicSourceID%>">\
							<a href="#" class="mThumbsBox" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>">\
								<span class="mThumbs"><em class="ico_audios"></em><%=talk[i].music[0].sMusicName%>-<%=talk[i].music[0].sMusicAuthor%></span>\
							</a>\
							<div class="mBox">\
								<button class="btn_mPlay" title="' + _('播放') + '">' + _('播放') + '</button>\
								<button class="btn_mPause_hover" title="' + _('暂停') + '" style="display:none">' + _('暂停') + '</button>\
								<span class="mTitBox"></span>\
								<button class="btn_mClose" title="' + _('关闭') + '">' + _('关闭') + '</button>\
							</div>\
						</div>\
					<%}%>\
				</div><%}%>\
				<%if('+V1+' && (talk[i].type==2 || talk[i].type==7)){%>\
					<div class="replyBox">\
						<div class="msgBox">\
							<%if('+V1+'.status==1){%>\
								<div class="noMSource">' + _('内容已删除。') + '</div>\
							<%}else if('+V1+'.status==3){%>\
								<div class="noMSource">' + _('对不起，原文已经被作者删除。') + '</div>\
							<%}else{%>\
								<div class="msgCnt"><strong><a href="/<%='+V1+'.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)"><%='+V1+'.bkname||'+V1+'.nick%></a>'+MIIcon(V1+'.flag')+'<%='+V1+'.icon%><%if(!'+V1+'.source){%>:<%}%></strong><%if('+V1+'.source && ('+V1+'.type==4 || '+V1+'.type==5)){%><em class="userTo">' + _('对') + '</em><strong class="userTo"><a href="http://t.qq.com/<%='+V1+'.source.name%>" title="<%=('+V1+'.source.bkname||'+V1+'.source.nick).toTitle()%>(@<%='+V1+'.source.chName || '+V1+'.source.name%>)"><%='+V1+'.source.bkname||'+V1+'.source.nick%></a>'+MIIcon(V1+'.source.flag')+'' + _('说') + ':<%}%></strong>\<%='+V1+'.content%></div>\
								<%var Imgage='+V1+'.image && '+V1+'.image.length,Videos='+V1+'.videos && '+V1+'.videos.length,Music='+V1+'.music && '+V1+'.music.length,Vote='+V1+'.vote && '+V1+'.vote.length;if(Imgage || Videos || Music || Vote){%><div class="mediaWrap">\
									<%if(Vote || !(Imgage || Videos || Music)){%>\
										<div class="videoBox voteBox" realurl="http://vote.t.qq.com/vote/vote.php?id=<%='+V1+'.vote[0].realUrl%>&result=yes&tpl=mini" shorturl="http://url.cn/<%='+V1+'.vote[0].shortUrl%>" realtitle="<%='+V1+'.vote[0].title%>">\
											<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="http://vote.t.qq.com/vote/vote.php?id=<%=encodeURI('+V1+'.vote[0].realUrl)%>" class="vUrl" target="_blank"><em></em><%if('+V1+'.vote[0].title){%><%=MI.string.cut('+V1+'.vote[0].title,40)%><%}%></a></div>\
											<div class="vWrap"><a href="#" class="vtThumbs"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/voteResulte.png" /></a></div>\
										</div>\
									<%}%>\
									<%if(Imgage){%>\
											<%for(var j=0;j<'+V1+'.image.length;j++){%>\
												<div class="picBox"><a href="<%='+V1+'.image[j]%>/460" class="pic"><img class="crs" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/vT.png<%}else{%><%='+V1+'.image[j]%>/160<%}%>"></a></div>\
											<%}%>\
									<%}%>\
									<%if(Videos){%>\
										<div class="videoBox" realurl="<%='+V1+'.videos[0].realUrl%>" playurl="<%='+V1+'.videos[0].playerUrl%>" minipicurl="<%='+V1+'.videos[0].miniPicUrl%>" shorturl="<%='+V1+'.videos[0].shortUrl%>" reltitle="<%='+V1+'.videos[0].title%>">\
											<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="<%=encodeURI('+V1+'.videos[0].realUrl)%>" class="vUrl" target="_blank"><em></em><%if('+V1+'.videos[0].title){%><%=MI.string.cut('+V1+'.videos[0].title,40)%><%}%></a></div>\
											<div class="vWrap" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>"><a href="#" class="vThumbsBox" ><span class="vThumbs"><span class="mask"><em></em></span><img class="crs" crs="<%='+V1+'.videos[0].miniPicUrl%>" /></span><span class="vSimple"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/vSimple.png" /></span></a></div>\
										</div>\
									<%}%>\
									<%if(Music){%>\
										<div class="musicBox" style="clear:both;" song="<%='+V1+'.music[0].sMusicName%>" singer="<%='+V1+'.music[0].sMusicAuthor%>" songurl="<%='+V1+'.music[0].sMusicUrl%>" songid="<%='+V1+'.music[0].dwMusicID%>" songtype="<%='+V1+'.music[0].dwMusicSourceID%>">\
											<a href="#" class="mThumbsBox" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>">\
												<span class="mThumbs"><em class="ico_audios"></em><%='+V1+'.music[0].sMusicName%>-<%='+V1+'.music[0].sMusicAuthor%></span>\
											</a>\
											<div class="mBox">\
												<button class="btn_mPlay" title="' + _('播放') + '" style="display:none">' + _('播放') + '</button>\
												<button class="btn_mPause_hover" title="' + _('暂停') + '" style="display:">' + _('暂停') + '</button>\
												<span class="mTitBox"></span>\
												<button class="btn_mClose" title="' + _('关闭') + '">' + _('关闭') + '</button>\
											</div>\
										</div>\
									<%}%>\
								</div><%}%>\
								<div class="pubInfo"><span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" href="/p/t/<%=sid%>" target="_blank"><%='+V1+'.time%></a> <%='+V1+'.from%><%if('+V1+'.city){%> <%='+V1+'.city%><%}%><%if(1 && '+V1+' && numAll){if(MI.user.account){%>\
									 <a href="/p/t/<%=sid%>" class="zfNum" target="_blank">' + _('查看全部转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</a>\
								<%}else{%>\
									 <em class="zfNum">' + _('查看全部转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</em>\
								<%}}%></span></div>\
							<%}%>\
						</div>\
					</div>\
				<%}%>\
				<div class="pubInfo"><span class="left"><a class="time" href="/p/t/<%=talk[i].id%>" target="_blank"><%=talk[i].time%></a> <%=talk[i].from%><%if(talk[i].city){%> <%=talk[i].city%><%}%><%if(!'+V1+' && numAll){if(MI.user.account){%>\
					 <a href="/p/t/<%=talk[i].id%>" class="zfNum" target="_blank">' + _('查看全部转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</a><%}else{%>\
					 <em class="zfNum">' + _('查看全部转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</em><%}}%><%if(talk[i].type == 2 && numRelay2){%>\
					 <em class="zfNum2" title="<%=(talk[i].bkname||talk[i].nick).toTitle()%> ' + _('转播后引发的转播次数') + '">' + _('该条转播') + '(<b class="relayNum"><%=numRelay2%></b>)</em><%}%><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%>\
					<a class="view" href="http://t.qq.com/p/r/<%=talk[i].id%>">' + _('查看对话') + '</a><%}%><%if(MI.user.fun.fastReport == 1 && (talk[i].type == 2 || talk[i].type == 7) && talk[i].name != MI.user.account && '+V1+'.name == MI.user.account){%> <a'+V5+' class="alarm">' + _('删除') + '</a><%}%></span><div class="funBox">\
						<%if(MI.user.account){\
							if(MI.user.fun.btnStyle!=6){%><a'+V5+' class="relay" num="<%=numRelay%>">' + _('转播') + '</a><span>|</span><%}\
							if(MI.user.fun.btnStyle==5||MI.user.fun.btnStyle==6){\
								%><a'+V5+' class="reply">' + _('回复') + '</a><%\
							}else if(MI.user.fun.btnStyle==1){\
								%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><a'+V5+' class="delBtn">' + _('删除') + '</a><%}else{%><a'+V5+' class="reply">' + _('对话') + '</a><%}}%><%\
							}else{\
								%><a href="/p/t/<%=sid%>" class="comt" num="<%=numComt%>">' + _('评论') + '</a><%\
							}%><span>|</span><div class="mFun"><a href="#">' + _('更多') + '<em class="btn_ldrop"></em></a><div class="mFunDrop"><b></b><b class="mask"></b>\
								<%if(MI.user.fun.btnStyle==1){\
									%><p><a href="/p/t/<%=sid%>" class="comt" num="<%=numComt%>">' + _('评论') + '</a></p><%\
								}else{\
									%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><p><a'+V5+' class="delBtn">' + _('删除') + '</a></p><%}else{%><p><a'+V5+' class="reply">' + _('对话') + '</a></p><%}}%><%\
								}%>\
								<p><a'+V5+' class="fav<%if(fav){%> light<%}%>"><%if(fav){%>' + _('取消') + '<%}%>' + _('收藏') + '</a></p>\
								<div class="shareBtn"><p><a href="#">' + _('发邮件') + '</a></p></div>\
								<p><a href="/p/t/<%=talk[i].id%>" target="_blank">' + _('详情') + '</a></p>\
								<%if(MI.user.fun.report && talk[i].name != MI.user.account){%><p><a'+V5+' class="alarm">' + _('举报') + '</a></p><%}%>\
							</div><%\
						}%>\
					</div>\
					</div>\
				</div>\
				<%if('+V1+' && talk[i].type==4){\
					%><div class="talkDetail"><%\
					if('+V1+'.status==1){\
						%>' + _('内容已删除。') + '<%\
					}else if('+V1+'.status==3){\
						%>' + _('对不起，原文已经被作者删除。') + '<%\
					}else{\
						%><b><%='+V1+'.bkname||'+V1+'.nick%>:</b> <%='+V1+'.content%><%\
					}\
					%></div><%\
				}%>\
			</div>\
		</li><%}%>';
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
MI.tmpl.black = '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>' + _('确定将{0}拉入黑名单？','<%=sex%>') + '</h2><p><span class="fs14">' + _('拉黑之后') + '...</span><br/>' + _('你们之间的收听关系将被解除，对方无法再收听你，而且你也不再收到来自{0}的任何消息与通知','<%=sex%>') + '</p><p><input type="button" value="' + _('确定') + '" id="blackTipBtn" /><input type="button" value="' + _('取消') + '" onclick="MI.dialog.hide()"/></p></div>';
MI.tmpl.unblack = '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>' + _('你真的原谅{0}了吗？','<%=sex%>') + '</h2><p><span class="fs14">' + _('取消之后') + '...</span><br/>' + _('你会重新收到来自{0}的私信和其它通知','<%=sex%>') + '</p><p><input type="button" value="' + _('确定') + '" id="blackTipBtn"/><input type="button" value="' + _('取消') + '" onclick="MI.dialog.hide()"/></p></div>';
MI.tmpl.card = '<div class="uCard"><div class="tip">' + _('这是你自己') + '</div><div class="tip"></div><div class="userPic"><a></a><p class="btn"><input type="button" class="addAttention" value="" /><a href="#" class="delAttention" title="' + _('取消收听') + '">' + _('取消') + '</a></p></div><div class="uCardcnt"><p class="userName"></p><p class="nums"></p><p class="btn"><a href="#" class="reply">' + _('对话') + '</a><a href="#" class="msg">' + _('私信') + '</a><a href="#" class="chat">' + _('聊天') + '<a href="javascript:void(0)" class="more">' + _('更多') + '<em class="btn_ldrop"></em></a></p><div class="moreFun" style="display:none;"><ul><li><a href="#" class="note">' + _('备注') + '</a></li><li><a class="list" href="#">' + _('名单') + '</a></li><li class="sep"><a class="recom" href="#">' + _('推荐') + '</a></li><li><a href="#" class="black">' + _('拉黑') + '</a></li><li><a class="report" href="#">' + _('举报') + '</a></li></ul></div><div class="uInfobox"><div class="sepline"></div><p class="uIntro"></p><p class="tagBox"></p><p class="company"></p><p class="school"></p></div><a href="#" class="ico_sFo"></a></div><div class="uloadBox"><em class="loading"></em>' + _('资料卡加载中') + '</div><div class="SA"><em>◆</em><span>◆</span><b>◆</b></div></div>';
MI.tmpl.code = '<div class="verify"><span class="ico_tsW"><span class="ico_te"></span></span><h3></h3><div class="clear"><form><div class="left">' + _('验证码：') + '</div><div class="verifyInput"><input type="text" class="inputTxt" /><div class="cNote">' + _('输入下图中的字符，不区分大小写') + '</div><img width="130" height="53">&nbsp;<a href="#" class="codeChange">' + _('看不清，换一张') + '</a></div></div><div class="btnBox"><button type="submit" class="btn2">' + _('确定') + '</button><button type="button" class="btn2">' + _('取消') + '</button></form></div></div>';
})();
/**
 * 打开写私信对话框
 * 
 * @param {String} name 收件人帐号
 * @param {Integer} type 用来统计用户从哪里启动写私信对话框，1: profile tip处发出，3: Profile页面发私信
 * @return {Boolean} true 执行成功，false 失败
 *
 *  @example
 *		MI.pmcompose("t", 1)
 *
 */
MI.pmcompose = function(name, from)
{
	var config = {
			type : "compose",
			to : name,
			from : from
		};
	if (window.PM)
	{
		//已经加载了wbpm.js
		PM.init(config);
		return false;
	}

	var _sHost = location.protocol + "//pm.t.qq.com/",
		_jsName = { zh_TW : "wbpm.zh_TW.js" }[window.MILang] || "wbpm.zh_CN.js",
		_sJsUrl = [_sHost, "zh_CN/htmledition/js/", _jsName, "?version=110428"].join(""),
		_sCssUrl = _sHost + "zh_CN/htmledition/style/wbpm.css?v=110428",
		_bClose = false;
	window.PMCMarkTime = +new Date;

	UI.getCss(_sCssUrl, function(){});

	MI.dialog.show({
		width:570,
		html : '<div style="width:508px;height:169px;text-align:center;line-height:12;"><img style="margin:0 5px -3px;" src="http://mat1.gtimg.com/www/mb/images/loading.gif"/>加载中...</div>',
		end : function()
		{
			//这是用户强制关闭
			_bClose = true;
		}
	});
	setTimeout(function()
		{
			(new Image).src = [_sHost, "cgi-bin/getinvestigate?stat=wbpm&type=1&subtype=", from || 0, '&r=', Math.random()].join('');
		},
		100
	);
	UI.getScript(_sJsUrl, function()
		{
			if (!_bClose)
			{
				//在加载过程中，用户强制关闭，不再打开
				PM.init(config);
			}
		}
	);
	return false;
};
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
		btn_timer,
		topic = $$(nav,'.topic')[0],
		btnTopic_arr = $$(topic,'.btn_arr')[0],
		subTopicNav,
		btnTopic_timer;
	if (news){
		subNav = UI.html('<div class="subNav" onclick="MI.Bos(\'btnTopMenuNews\')"><p><a href="http://t.qq.com/p/news">' + _('大家在说') + '</a></p><p><a href="http://t.qq.com/p/mobile">' + _('手机广播') + '</a></p><p><a href="http://t.qq.com/p/city">' + _('同城广播') + '</a></p><p><a href="http://t.qq.com/p/top">' + _('热门广播') + '</a></p><p><a href="http://t.qq.com/college_anas.php">' + _('经典语录') + '</a></p><p><a href="http://t.qq.com/dandelion.php?g">' + _('蒲 公 英') + '</a></p><p><a href="http://t.qq.com/p/rank">' + _('排 行 榜') + '</a></p><p class="last"><a href="http://t.qq.com/lists.php">' + _('名单集市') + '</a></p></div>')[0];
		UI.append(subNav,news);
		//subHeight = UI.height(subNav);
		UI.hide(subNav);
		subNav.onmouseover = news.onmouseover = show;
		subNav.onmouseout = news.onmouseout = hide;
	}	
	if (topic){
		subTopicNav = UI.html('<div class="subNav" onclick="MI.Bos(\'btnTopMenuTopic\')"><p><a href="http://t.qq.com/p/topic">' + _('热议') + '</a></p><p class="last"><a href="http://t.qq.com/p/event">' + _('活动') + '</a></p></div>')[0];
		UI.append(subTopicNav,topic);
		//subHeight = UI.height(subNav);
		UI.hide(subTopicNav);
		subTopicNav.onmouseover = topic.onmouseover = showTopic;
		subTopicNav.onmouseout = topic.onmouseout = hideTopic;
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
	
	function showTopic(){
		clearTimeout(btnTopic_timer);
		btnTopic_timer = setTimeout(function(){
			UI.addClass(topic,'hover');
			UI.show(subTopicNav);
		},100)
	}
	function hideTopic(){
		clearTimeout(btnTopic_timer);
		btnTopic_timer = setTimeout(function(){
			UI.removeClass(topic,'hover');
			UI.hide(subTopicNav);
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
		var link = $$('#UIn a,.SM a,.mobileBox a,.proposal a'),hotTopic = $$('#hotTopic li a'),topMenu = $$('.topMenu a');
		UI.each(link,function(o,i){
			UI.EA(o,'mousedown',function(){
				MI.Bos('btnSide' + i);
			});
			o.onmouseover = MI.hideFocus;
		});
		UI.each(hotTopic,function(o,i){
			o.onmousedown = function(){
				MI.Bos('btnHotTopicList',encodeURIComponent(this.title));
			}
		});
		UI.each(topMenu,function(o,i){
			UI.EA(o,'mousedown',function(){
				MI.Bos('btnTopMenu_' + (i + 1));
			});
		});
	},500);
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
				<form action="/asyn/bkName_oper.php" method="post" id="addNoteForm" onsubmit="return false">\
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
			width : 300,
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
		talkBox = $('talkBox'),
		tipsPosition = function(){};
	if (oMsg && talkBox){
		var idMsg = 'homeMsgTip',
			msg,
			link,
			followAll,
			user = [];
		msg = UI.html('<div class="newsTips1 h1" id="' + idMsg + '"><em class="ico_ntips"></em><span class="left">' + oMsg.content + '</span><a href="#" onclick="UI.hide(\'' + idMsg + '\');UI.ajax({url:\'/asyn/updateTips.php\',data:{id:\''+oMsg.id+'\',status:0}});MI.Bos(\'btnMsg_' + oMsg.id + '\');return false" class="close" title="' + _('关闭') + '"></a></div>')[0];
		UI.after(msg,talkBox);
		/*msg.onmouseover = function(){
			UI.addClass(this,'h1');
		}
		msg.onmouseout = function(){
			UI.removeClass(this,'h1');
		}*/
		link = $$(msg,'.left a');
		followAll = $$(msg,'.newsTipsFollow')[0];
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
		if (followAll){
			followAll.onclick = function(){
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
	if (oBanner && talkBox){
		/*UI.css('#homeBannerTip{position:relative;width:576px;height:129px;margin:9px 0 0 8px; overflow:hidden; font-size:12px;}\
#homeBannerTip ul{width:9999px}\
#homeBannerTip li{float:left}\
#homeBannerTip .content{display:block;width:576px;height:129px;*zoom:1;line-height:100em;overflow:hidden}\
#homeBannerTip .close{float:none;position:absolute;margin:0;top:10px;right:13px;z-index:1}\
#homeBannerTip .nums_list{position:absolute;bottom:10px;right:10px;z-index:9;cursor:pointer;}\
#homeBannerTip .nums_list a{display:block;float:left;width:16px;height:16px;line-height:16px;vertical-align:middle;text-align:center;border:1px solid #ccc;background:#fff;margin:0 2px;}\
#homeBannerTip .nums_list a.on{background:#FF6600;color:#fff;}\
');*/
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
			tipsPosition();
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
			setTimeout(function(){
				UI.append(html,document.body);
				tipsPosition();
			},200);
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
			tipsPosition = function(){
				html.style.cssText += ';top:' + UI.getY(target) + 'px;left:' + UI.getX(target) + 'px;';
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
MI.TalkBox.prototype.addVote = function(){ // 新建投票
	var Self = this;
	if (!Self._voteWrap){
		Self._voteWrap = UI.html('<div class="mloadWrap">\
			<div class="musicTab"><ul><li class="select"><b>' + _('新建投票') + '</b></li></ul><a href="#" class="close" title="' + _('关闭') + '">' + _('关闭') + '</a></div>\
			<div class="m_voteBox clear">\
				<form action="/asyn/vote.php" onsubmit="return false" name="voteAddFrom" id="voteAddFrom" target="voteAddIframe" method="post">\
				<table>\
					<tr class="voteAddTr"><th>' + _('标题：') + '</th><td valign="top"><input type="text" name="sbjtitle" id="sbjtitle" class="inputTxt"><br><a href="#" class="ffsong addBrief" onclick="var brief=$(\'brief\'),P=brief.parentNode.parentNode.parentNode;brief.value=\'\';UI.toggle(P);$$(P,\'.voteAddError\')[0].innerHTML=\'\';try{brief.focus()}catch(e){}return false">' + _('添加说明') + '>></a></td><td valign="top"><span class="voteAddError"></span></td></tr>\
					<tr class="voteAddTr" style="display:none"><th></th><td valign="top"><div><textarea name="brief" id="brief" class="inputTxt"></textarea></div></td><td valign="top"><span class="voteAddError"></span></td></tr>\
					<tr class="voteAddTr"><th>' + _('类型：') + '</th><td valign="top"><label><input class="check1" type="radio" name="ftype" id="ftype" value="1" checked>' + _('单选') + '</label> <label><input class="check1" type="radio" name="ftype" value="2">' + _('多选') + '</label></td><td><b class="voteAddError"></b></td></tr>\
					<tr class="voteAddTr"><th>' + _('选项：') + '</th><td valign="top">\
						<ul>\
							<li><input type="text" name="opttitle" id="opttitle" class="inputTxt"></li>\
							<li><input type="text" name="opttitle" class="inputTxt"><div></div></li>\
							<li><input type="text" name="opttitle" class="inputTxt"><div></div></li>\
							<li><input type="text" name="opttitle" class="inputTxt"><div></div></li>\
						</ul>\
						<a href="#" class="voteAddOption ffsong">' + _('增加选项') + '>></a>\
					</td><td valign="top"><span class="voteAddError cNote"></span></td></tr>\
				</table>\
				<div class="right"><input type="submit" class="btn2" value="' + _('确定') + '"></p>\
				</form>\
			</div>\
			<p class="cError" style="display:none"></p>\
			<iframe id="voteAddIframe" name="voteAddIframe" src="about:blank" style="display:none"></iframe>\
		</div>')[0];
		UI.after(Self._voteWrap,Self._vote);
		Self._voteClose = $$(Self._voteWrap,'.close')[0];
		Self._voteForm = $('voteAddFrom');
		Self._voteOptions = $$(Self._voteWrap,'td ul')[0];
		Self._voteAddOption = $$(Self._voteWrap,'.voteAddOption')[0];
		
		//Event
		Self._voteClose.onclick = function(){
			Self.hideVote();
			return false;
		}
		Self._voteAddOption.onclick = function(){
			if ($$(this.parentNode,'li').length >= 18){
				UI.hide(this);
			}
			Self.addVoteOption();
			return false;
		}
		MI.app({
			Validate : function(){
				new MI.Validate({
					id : 'voteAddFrom',
					inputs : {
						sbjtitle : {
							rule : function(str){
								str = UI.trim(str);
								var length = str.length,w=str.split('');
								if (length == 0) return _('这里一定要填');
								//if (str.match(/[^\u4e00-\u9fa5\w-]/g)) return '仅支持中文、字母、数字、下划线或减号';
								//if (length > 12) return '仅支持1-12个中文、字母、数字、下划线或减号';
							},
							noIco : true
						},
						brief : {noIco : true},
						ftype : {noIco : true},
						opttitle : {
							rule : function(str,isSubmit){
								str = UI.trim(str);
								var length = str.length,w=str.split(''),
									inputs = $$($('opttitle').parentNode.parentNode,'input'),
									successNum = 0;
								UI.each(inputs,function(o){
									value = UI.trim(o.value);
									if (value){
										successNum++;
									}
								});
								if (successNum < 2 && isSubmit) return _('至少两个选项');
								//if (length == 0) return '这里一定要填';
								//if (str.match(/[^\u4e00-\u9fa5\w-]/g)) return '仅支持中文、字母、数字、下划线或减号';
								//if (length > 12) return '仅支持1-12个中文、字母、数字、下划线或减号';
							},
							result :  function(el){
								var values = [],
									inputs = $$($('opttitle').parentNode.parentNode,'input'),
									value;
								UI.each(inputs,function(o){
									value = UI.trim(o.value);
									if (value){
										values.push(value);
									}
								});
								return values.join('||');
							},
							noIco : true
						}
					},
					messages : function(el){
						return $$(UI.parents(el,'voteAddTr')[0],'.voteAddError')[0];
					},
					success : function(data){
						//{"result":0,"info":{"title":"\"\\u8fd9\\u662f\\u4e00\\u4e2a\\u6295\\u7968demo\"","url":"http:\/\/url.cn\/0mYAMr","voteid":1}}
						if (data.result == 0){
							Self._txt.value += _('我发起了一个投票【{0}】，地址：',data.info.title) + 'http://url.cn/' + data.info.url;
							Self.focus();
							Self.vote = data.info.voteid;
							Self.resetVote();
							Self.hideVote();
						}
						else if(data.msg){
							MI.alert(data.msg);
						}
					}
				});
			}
		});
	}
	UI.show(Self._voteWrap);
}
MI.TalkBox.prototype.addVoteOption = function(){ // 增加投票选项
	var Self = this,
		html = UI.html('<li><input type="text" name="opttitle" class="inputTxt"><div></div></li><li><input type="text" name="opttitle" class="inputTxt"><div></div></li>'),
		frag = document.createDocumentFragment();
	UI.each(html,function(o){
		UI.append(o,frag);
	});
	UI.append(frag,Self._voteOptions);
}
MI.TalkBox.prototype.hideVote = function(){ // 隐藏投票
	var Self = this;
	if (Self._voteWrap){
		UI.hide(Self._voteWrap);
	}
}
MI.TalkBox.prototype.resetVote = function(){ // 投票表单重置
	var Self = this;
	UI.show(Self._voteAddOption);
	var input = $$(Self._voteOptions,'input');
	UI.each(input,function(o,i){
		if (i > 3){
			UI.remove(o.parentNode);
		}
		else {
			o.value = '';
		}
	});
	$('sbjtitle').value = '';
	$('brief').value = '';
	UI.hide($('brief').parentNode.parentNode.parentNode);
	$('ftype').checked = true;
}
MI.tmpl.shareMail = '<div class="shareToMail"> <h4 class="mailLogo" style="float:left;">' + _('QQ邮箱') + '</h4><p style="float:left;text-indent:5em" class="error"></p> <dl class="clear" style="visibility:hidden"><dt>' + _('发件人：') + '</dt><dd><p class="sender"><select></select></p><p class="cNote">(' + _('不想透露您的QQ号码？') + '<a href="https://mail.qq.com" target="_blank">' + _('注册英文邮箱账户') + '</a>)</p></dd><dt>' + _('收件人：') + '</dt><dd><textarea class="inputArea">' + _('一次最多可分享给20个好友') + '</textarea></dd><dt></dt><dd><div class="comPeople" style="display:none"><a href="#">' + _('常用联系人') + '<em class="btn_ldrop"></em></a><div class="mail_listWrap" style="display:none;"> <div class="mail_lHead"><table cellspacing="0" cellpadding="0" border="0" class="tHead"><tbody><tr><td class="t1"><input type="checkbox" class="selectAll"></td><td class="t2">' + _('姓名') + '</td><td class="t3">Email地址</td></tr></tbody></table></div> <div class="mailBox" style="height:0"><ul class="mail_lcont"></ul></div> </div></div><p class="btnBox"><button class="btn1">' + _('分享') + '</button><button class="btn1">' + _('取消') + '</button></p></dd></dl> <div style="display: none;" class="mailStatus">' + _('你还没有关联QQ邮箱，') + '<a href="#">' + _('立即开通') + '<em class="ffsong">&gt;&gt;</em></a></div> <div style="display:none" class="mailStatus">自动开通失败，请<a href="https://mail.qq.com" target="_blank">' + _('点击此处') + '</a>手动开通</div><div style="display: none;" class="mailStatus"><a href="#"  style="margin-right:40px;">' + _('开通成功') + '</a><a  href="https://mail.qq.com" target="_blank">' + _('开通失败，再试一次') + '</a></div><div style="display: none;" class="mailStatus"><a href="#" style="margin-right:40px;">' + _('英文邮箱注册成功') + '</a><a href="#">' + _('下次再注册') + '</a></div></div>';
MI.TalkList.prototype.shareMail = (function(){
		//UI.css('.shareToMail{width:390px;padding:15px 7px}.shareToMail .mailLogo{width:99px;height:21px;overflow:hidden;line-height:20em;background:url(http://mat1.gtimg.com/www/mb/images/maillogo.png) no-repeat}.shareToMail dl{width:390px;margin-top:5px;line-height:19px}.shareToMail dt{float:left;clear:left;width:50px;height:21px;margin-top:10px;_padding-top:2px;font-family:Simsun}.shareToMail dd{float:left;width:340px;margin-top:10px}.shareToMail .inputArea{width:326px;height:30px;border-color:#CECECE}.shareToMail .comPeople{position:relative;float:left}.shareToMail .btn_ldrop{position:absolute;top:0;cursor:pointer}.shareToMail .lopen{margin-top:3px}.shareToMail .comPeople .loading{right:-32px;height:16px;margin-top:2px}.shareToMail .btnBox{float:right}.shareToMail .btn1{margin-left:10px}.shareToMail .mailStatus{padding:30px 0 20px;text-align:center}.shareToMail .marl{margin-left:40px}.mail_listWrap{position:absolute;width:270px;left:0;top:19px;background:#fff}.shareToMail .mailBox{width:268px;padding:0;margin:0;overflow:hidden;overflow-y:auto;border:1px solid #C1C8D2;border-top:0}.mail_lHead{height:21px;padding:1px;border:1px solid #C1C8D2}.mail_lHead .tHead{width:100%;height:21px;line-height:1.231;background-color:#FAFAFA}.mail_lHead .t1{width:26px;padding:0;text-align:center;border-right:1px solid #C4CACD;vertical-align:middle}.mail_lHead .t2,.mail_lHead .t3{padding-bottom:3px;padding-bottom:2px\9;padding-left:14px;vertical-align:bottom}.mail_lHead .t2{width:80px;border-right:1px solid #C4CACD}.mail_lcont{width:268px;overflow:hidden;*zoom:1}.mail_lcont li{float:left;width:100%;margin-top:-1px;padding-top:1px;border-top:1px solid #E3E6EB}.mail_lcont .cbg2{background:#FAFAFA}.mail_lcont li:hover{background:#EEF4F7}.mail_lcont .tCont{width:100%;height:25px;line-height:1.231}.mail_lcont .c1{width:28px;padding:0;text-align:center;vertical-align:middle}.mail_lcont .c2,.mail_lcont .c3{padding-bottom:6px;padding-bottom:5px\9;padding-left:14px;vertical-align:bottom}.mail_lcont .c2{width:81px}');
		var html = UI.html(MI.tmpl.shareMail)[0],
			title = _('腾讯微博分享'),
			mailCnt = UI.GT(html,'dl')[0],
			mailStatus = $$(html,'.mailStatus'),
			sender = $$(mailCnt,'.sender')[0],         		//发件人
			comPeople = $$(mailCnt,'.comPeople')[0],   		//联系人
			cNote = $$(mailCnt,'.cNote')[0],          		 //英文邮箱提醒
			regEnBtn = UI.GT(cNote,'a')[0],      
			textArea = $$(mailCnt,'.inputArea')[0],     	//textarea
			mail_lcont = $$(comPeople,'.mail_lcont')[0],   //联系人列表
			mail_listWrap = $$(comPeople,'.mail_listWrap')[0], 
			mailBox = $$(mail_listWrap,'.mailBox')[0],
			dropToggle = UI.GT(comPeople,'a')[0],
			selectAll = $$(comPeople,'.selectAll')[0],  
			btn_ldrop = UI.GT(dropToggle,'em')[0],
			regAuto = UI.GT(mailStatus[0],'a')[0],    	 //未注册邮箱提醒
			regBySelf = UI.GT(mailStatus[1],'a')[0],
			regSucc = UI.GT(mailStatus[2],'a')[0],     	//手动注册成功
			regAgian = UI.GT(mailStatus[2],'a')[1],		//手动注册失败
			regEnSucc = UI.GT(mailStatus[3],'a')[0],  	 //英文邮箱等待
			regEnNext = UI.GT(mailStatus[3],'a')[1],	//下次注册
			sendBtn = $$(mailCnt,'.btnBox .btn1')[0],  	  //发送邮件
			cancelBtn = $$(mailCnt,'.btnBox .btn1')[1],   //取消按钮
			errorTip = $$(html,'.error')[0],            //错误提示
			hasContact = false,   						//是否已加载联系人
			hasCheckedMail = false,						//是否检查过邮件账户
			msgId = '',   							//广播消息id
			animate, 								//折叠动画计时器
			splitNum=0,								//输入框当前的分号数量
			comHeight=260,							//联系人列表下拉框高度
			myMail = [],							//发件人邮箱							
			re = /^[^<>()[\]\\;:\s@]+@(([a-zA-Z0-9]\-?)+[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/;

		//选择
		function toggleAddress(){
			var mail = UI.A(this,'mail');
			var hasStr = textArea.value.indexOf(mail) != -1;
			if(this.checked && !hasStr) {
				textArea.value = (textArea.value + ';' + mail);
			}
			else if(!this.checked && hasStr) {
				textArea.value = textArea.value.replace(mail,'');
			}
		}
		
		//错误信息
		function setError(str){
			errorTip.innerHTML = str;
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
			}
			if(j>0) {
				mail_lcont.innerHTML = list.join('');
				UI.show(comPeople);
				UI.each(UI.GT(mail_lcont,'input'),function(o){
					o.onclick = function(){
						if(textArea.value == textArea.defaultValue) textArea.value = '';
						toggleAddress.call(this);
						checkNum();
					}
				});
				hasContact = true;
				comHeight = j>10 ? 260 : j*26 ;
			}
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
			MI.dialog.showLoad();
			UI.ajax({
				url : '/mail/mailist.php',
				data : {op:1},
				success : function(data){
					setError('');
					MI.dialog.hideLoad();
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
				setError(_('收件人多于20个'));
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
			if(i>0) setError(_('有') + i + _('个收件人邮箱不合法'));
			return newArr.join(';');
		}

		//发送邮件
		function sendMail(){
			if((textArea.value == textArea.defaultValue) || UI.trim(textArea.value) == '') {
				setError(_('请填写收件人邮箱地址'));
				return false;
			}
			
			var contact = checkNum();
			if(!contact) return false;
			
			MI.dialog.showLoad();
			slideUpConact();
			UI.ajax({
				url:'/mail/mailShare.php',
				data:{mailAddr:UI.GT(sender,'select')[0].value,mlist:contact,subject:title,body:msgId},  //只发20个联系人
				success:function(data){
					MI.dialog.hideLoad();
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
			if(hasCheckedMail) return;
			if(MI.isS) textArea.value = MI.S('option_shareMail_' + MI.user.account) || textArea.defaultValue;
			if(textArea.value == textArea.defaultValue) UI.addClass(textArea,'gray');
			checkMail(function(){
				mailCnt.style.visibility = 'visible';
			},function(){
				UI.hide(mailCnt);
				UI.show(mailStatus[0]);
				UI.hide(mailStatus[1]);
			},function(data){
				MI.alert(data.msg);	
			});
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
			MI.dialog.showLoad();
			UI.get('/mail/mailActive.php','',function(data){   //自动开通
				MI.dialog.hideLoad();
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
				
			})
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
			for(i=0;i<str.length;i++){
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
				return false;
			}
			splitNum = getSplitNum();
			
		}

		//键盘事件
		textArea.onkeyup = function(e){
			e = UI.E(e);
			if(e.key == 186 || e.key == 59) {	//逗号
				checkNum(true);
			}
			else if(e.key == 8) {	//退格
				var str = textArea.value;
				if(UI.trim(str) == '') checkNum(true);  //删除所有文本
				else if(str.charAt(str.length-1)==';') checkNum(true);	//最后是';'
				else if(splitNum != getSplitNum()) checkNum(true);		//';'数量有变化
			}
		}
		
		textArea.onblur = function(){
			checkNum(true);
			if(UI.trim(textArea.value)=='') {
				textArea.value = textArea.defaultValue;
				UI.addClass(textArea,'gray');
			}
		}

		//取消按钮
		cancelBtn.onclick = function(){
			slideUpConact();
			MI.dialog.hide();
			MI.Bos('btnCancelShareMail');
		}
		
		//发送邮件
		sendBtn.onclick = sendMail;
		
		return function(id){
			MI.dialog.show({title:'<h1 class="DmainTit">' + _('通过QQMail分享给好友') + '</h1>',html:html,width:444,start:firstCheck});
			msgId = id;
			MI.Bos('btnShareMail');
		}
})();

MI.tmpl.shareQQ = '<div class="shareToFriend"><div class="shareMenu"><ul class="shareTab"><li class="select"><a href="#">' + _('QQ好友') + '</a></li><li><a href="#">' + _('QQ群') + '</a></li></ul><div class="shareSearch"><input type="text" class="inputTxt"><span class="atbtn"><a class="btn_search2" title="' + _('搜索') + '" href="#"></a></span></div></div><div style="height:300px" class="shareFList"></div><div style="display:none;height:300px" class="shareFList"></div><div class="btnBox"><span class="error" style="float:left">' + _('') + '</span><button class="btn1">' + _('分享') + '</button><button class="btn1">' + _('取消') + '</button></div><div class="noResult">' + _('无搜索结果') + '</div></div>';

//分享到qq好友
MI.TalkList.prototype.shareQQ = (function(){
	//UI.css('.shareToFriend{width:324px;padding:15px 8px}.shareToFriend h3{margin:-20px 0 10px}.shareToFriend .btnBox{text-align:right;margin-top:10px}.shareToFriend .btn1{margin-left:10px}.shareMenu{position:relative;height:27px;overflow:hidden;*zoom:1}.shareSearch{float:right;width:196px;}.shareSearch .inputTxt{float:left;width:184px;border-color:#CBE0EA;background:none}.shareSearch .btn_search2{float:left;margin:1px 0 0 -19px}.shareTab{float:left}.shareTab li{position:relative;float:left;height:25px;margin-right:-1px;line-height:23px;text-align:center;border:1px solid #CBE0EA;background:#EDF7FB}.shareTab .select{padding-bottom:1px;border-bottom:0}.shareTab a{display:inline-block;padding:0 10px;border:1px solid #fff;background:#EAF6FA;background:-webkit-gradient(linear,0 0,0 100%,from(#fff),to(#EAF6FA));background:-moz-linear-gradient(top,#fff,#EAF6FA);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,startColorStr=#FFFFFFFF,endColorStr=#FFEAF6FA)}.shareTab .select a{color:#333;border:none;padding:1px 11px;background:#EDF7FB;background:-webkit-gradient(linear,0 0,0 100%,from(#F6FBFE),to(#EDF7FB));background:-moz-linear-gradient(top,#F6FBFE,#EDF7FB);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,startColorStr=#FFF6FBFE,endColorStr=#FFEDF7FB)}.shareTab .select a:hover{text-decoration:none}.shareFList{width:322px;overflow:hidden;overflow-y:auto;margin-top:-1px;border:1px solid #CBE0EA}.shareFList dl{width:322px;margin-top:-1px;border-top:1px solid #CBE0EA}.shareFList dt{height:21px;padding:0 4px;overflow:hidden;*zoom:1;line-height:21px;line-height:23px\\0;background:#EDF7FB}.shareFList .btn_ldrop{float:left;margin:6px 5px 0 0}.shareFList .on .btn_ldrop{margin-top:4px;background-position:-297px -161px}.shareFList .on dt{color:#fff;background:#3188C7;background:-webkit-gradient(linear,0 0,0 100%,from(#3F98D9),to(#3188C7));background:-moz-linear-gradient(top,#3F98D9,#3188C7);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,startColorStr=#FF3F98D9,endColorStr=#FF3188C7)}.shareFList dd{display:none}.shareFList .on dd{display:block;width:300px;margin:0 0 5px 16px;overflow:hidden}.shareFList p{height:17px;overflow:hidden;margin:4px 0}.shareFList p *{*zoom:1;vertical-align:middle}.shareFList img{width:16px;height:16px;margin:-4px 4px 0 0;*margin-top:-2px}.shareFList label{position:static;font-family:Tahoma,Arial;color:#333;line-height:1.231;white-space:nowrap}.shareFList .find {border:none;}.shareFList .find dt {display:none;}.shareFList .find dd {margin-bottom:0;overflow:visible;}');

	var html = UI.html(MI.tmpl.shareQQ)[0],
		tab = $$(html,'.shareTab li'),
		box = $$(html,'.shareFList'),
		searchBtn = $$(html,'.shareSearch input'),
		clearBtn = $$(html,'.atbtn .btn_search2')[0],
		shareBtn = $$(html,'.btnBox button'),  
		errorTips = $$(html,'.error')[0],
		noResult = $$(html,'.noResult')[0],
		hideTitle = [false,false],	//存储dt状态
		sValue = ['',''],	//存储搜索关键词
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
		MI.dialog.showLoad();
		UI.get('/share/qqList.php','account=' + MI.user.account + '&r=' + MI.random(),function(data){
			MI.dialog.hideLoad();
			data = MI.json(data);
			if(data.result == 0) {
				createList(data.info);
				hasPulled = true;
			}
			else {
				MI.alert(data.msg);
			}
		})
	}
	
	//生成联系人列表
	function createList(data){
		var f = [],g = [],index=0,j=0;
		UI.each(data.friend,function(o,i){
			f.push('<dl ' + (i==0 ? 'class="on"' : '') + '><dt><em class="btn_ldrop"></em>' + o.name + '</dt><dd>');
			UI.each(o.member,function(p){
				f.push('<p class="f' + index + '"><label><input type="checkbox" id="' + p.qq +'">');
				f.push('<span>' + p.nick + '</span></label></p>');
				sKey[0]['f' + index] = p.nick;
				
				index++;
			});
			f.push('</dd></dl>');
		});
		
		g.push('<dl class="on"><dd>');
		for(qq in data.group) {
			g.push('<p class="g' + j + '"><label><input type="checkbox" id="' + qq +'">');
			g.push('<span>' + data.group[qq] + '</span></label></p>');
			sKey[1]['g' + j] = data.group[qq];
			j++;
		}
		g.push('</dd></dl>');
		if(j==0) g.push('<div class="noGroup">' + _('你还没有加入任何QQ群') + '</div>');

		box[0].innerHTML = f.join('');
		box[1].innerHTML = g.join('');
		slide();
	}

	//折叠
	function slide(){
		UI.each($$(html,'.shareFList dt'),function(o){
			o.onclick = function(){
				UI.toggleClass(this.parentNode,'on');
			}
		});

		UI.each(tab,function(o,i){
			sNode[i] = UI.GT(box[i],'p');
			o.onclick = function(){
				if(i!=curr) {
					sValue[curr]= searchBtn[0].value;
					UI.hide(box[curr]);
					UI.removeClass(tab[curr],'select');
					UI.show(box[i]);
					UI.addClass(tab[i],'select');
					setError('');
					searchBtn[0].value = sValue[i];
					toggleSearchBtn();
					curr = i;
					if(i==1) MI.Bos('btnQQShareGroupTab');
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
		var o = selectedId[curr],id = this.id,n = 3 - curr;
		if(this.checked) {
			o.member[id] = id;
			o.num++;
		}
		else {
			delete o.member[id];
			o.num--;
		}
		setError(o.num > n ? _('一次只能分享给{0}个',n) + [_('好友'),_('群')][curr] : '');
		MI.Bos(['btnQQShareFriend','btnQQShareGroup'][curr]);
	}
	
	/*
	function toogleCheck(bool) {
		UI.each(sNode[curr],function(o){
			var input = UI.GT(o,'input')[0];
			if(!input.checked) input.disabled = bool;	
		})
	}*/
	
	//提示
	function setError(str){
		errorTips.innerHTML = str;
	}
	
	//搜索
	function search(value){
		var s = {},hasResult = false;
		for(i in sKey[curr]) {
			if(sKey[curr][i].indexOf(value) != -1) {
				s[i]= i;
				hasResult = true;
			}	
		}
		noResult.style.display = hasResult ? 'none' : 'block';
		UI.each(sNode[curr],function(o){
			o.style.display = o.className in s ? 'block' :'none';
		})
	}

	//发送消息
	function sendMsg(){
		setError('');
		if(0 == selectedId[0].num + selectedId[1].num) {
			setError(_('请选择好友或群'));
			return false;
		}

		var outnumber = false,conf=[[],[]];
		UI.each(selectedId,function(o,i){
			if(o.num > [3,2][i])  {
				setError(_('一次只能分享给{0}个',[3,2][i]) + [_('好友'),_('群')][i]);
				outnumber = true;
			}
			UI.each(o.member,function(m){
				conf[i].push(m);
			})
		})
		if(outnumber) return false;

		MI.dialog.showLoad()
		UI.ajax({
			url:'/share/shareMsg.php',
			data:{id:postId,uins:conf[0].join(','),group:conf[1].join(',')},  
			success:function(data){
				MI.dialog.hideLoad();
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

	//事件
	searchBtn[0].onkeyup = function(){
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
	
	//改变搜索按钮状态
	function toggleSearchBtn(){
		var noValue = searchBtn[0].value == '';
		clearBtn.className = noValue ? 'btn_search2' : 'del';
		clearBtn.title = noValue ? _('搜索') : _('清除');
	}

	//清除搜索
	clearBtn.onclick = function(){
		if(this.className == 'del') {
			searchBtn[0].value = '';
			searchBtn[0].onkeyup();
		}
		searchBtn[0].focus();
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
		MI.dialog.show({title:'<h3 class="DmainTit">' +  _('分享给QQ好友') + '</h3>',html:html,width:444,start:pullData});
		postId = id;
		MI.Bos('btnShareQQ');
	}
})()


MI.tmpl.trans = '<div class="comTips1"><div class="transWrap"><div class="transBox"><span class="cNote">' + _('译：') + '</span><span class="transResult"></span></div><div class="transNote"><span class="left">' + _('此翻译由金山词霸提供，仅供参考') + '</span><span class="right"><a class="transMe" target="_blank" style="display:" href="http://t.qq.com">'+ _('我来翻译') + '</a></span></div></div><div class="loading"></div></div>';

MI.TalkList.prototype.trans = (function(){

	var body = UI.html(MI.tmpl.trans)[0],
		result = $$(body,'.transResult')[0],
		transMe = $$(body,'.transMe')[0],
		resultList = {},  	//缓存结果
		transId = '',
		pNode = null,
		initialize = 0;

	function init(){
		if(initialize) return;
		UI.append(body,document.body);
 		initialize = 1;
	}

	function trans(){
		if(resultList[transId]) {
			result.innerHTML = resultList[transId];
			resetPos();
			return;
		}

		UI.addClass(body,'loading');
		UI.ajax({
			url:'/asyn/translate.php',
			data:{id:transId},  
			success:function(data){
				UI.removeClass(body,'loading');
				data = MI.json(data);
				if(data.result == 0){
					result.innerHTML = data.info.result;
					resultList[transId] = data.info.result;
					resetPos();
				}
				else {
					MI.alert(data.msg);
					hide();
				}
			}
		});
	}

	function setPos(el){
		var x = UI.getX(el) - 140,y = UI.getY(el) + 25,fx = UI.getX(pNode);   //140横向偏移，25垂直偏移，使卡片对按钮居中
		if(x<fx) x = fx;								//左边超出，150是卡片宽，560是talkList宽
		if((x + 300)> (fx + 560)) x = fx + 560 - 300; 	//右边超出 
		body.style.left = x + 'px';
		body.style.top = y +  'px';
	}

	//翻译内容加载后 重设定位
	function resetPos(){
		var topOffset = UI.getY(body) + UI.height(body)  - UI.windowHeight() - UI.scrollY();  
		if(topOffset>0) UI.scrollTo(document.body,UI.scrollX(),UI.scrollY()+topOffset + 5);
	}

	function show(el){
		var msgBox = UI.parents(el,'msgBox')[0];
		pNode = msgBox.parentNode;
		transId = UI.A(el,'tid') || $$(msgBox,'.time')[0].href.replace(/.*\//,'');
		init();
		setPos(el);
		UI.show(body);
		trans();
	}

	function hide(){
		clearTimeout(hide.delay);
		hide.delay = setTimeout(function(){
			UI.hide(body);
		},100);	
	}

	body.onmouseout = hide;
	body.onmouseover = function(){
		clearTimeout(hide.delay);
		UI.show(body);
	}
	
	return {
		'show' : show,
		'hide' : hide
	}

})();

MI.TalkList.prototype.shareQzone = function(id){ // 分享到Qzone
	window.share2qzone={
		resizePopup : function(o){
			UI.A($('qzShareFrame'),'height',o.height);
		},
		closePopup : function(){
			MI.dialog.hide();
		}
	};
	window.ptlogin2_onResize = function(width,height){
		UI.A($('qzShareFrame'),'height',height);
	};
	UI.remove($('qzShareFrame'));
	MI.dialog.show({
		title : '<h1 class="DmainTit">分享到QQ空间</h1>',
		width : 445,
		html :'<iframe frameborder="0" scrolling="no" width="400" height="180" onload="MI.dialog.hideLoad()" id="qzShareFrame" src="http://imgcache.qq.com/qzone/app/qzshare/share.html#name='+MI.user.account+'&nick='+MI.user.name+'&json=1&id='+id+'&desc='+''+'&rootid=&desc=&title='+encodeURIComponent(UI.text($$($(id),'.msgBox .msgCnt')[0]))+'&from=t&cgi='+encodeURIComponent("http://wb.qzone.qq.com/cgi-bin/wb_add_share.cgi")+'"></iframe>'
	});
	MI.Bos('btnShareQzone');
	MI.dialog.showLoad();	
}
MI.TalkList.prototype.shareCopy = function(id){ // 复制链接分享
	/*UI.css('.shareLink .shareOrgin{width:404px;padding:10px 0 5px;color:#999}\
		.shareLink .inputTxt{width:392px}\
		.shareLink .btnBox{padding:12px 0;text-align:center}\
		.shareLink .btn2{margin:0 5px}\
		.clipboardswf{position:absolute;margin:33px 0 0 -265px;width:72px;height:24px;display:none\9;overflow:hidden}\
		@media screen and (-webkit-min-device-pixel-ratio:0){.clipboardswf{margin:33px 0 0 -265px;}}\
		.clipboardswf embed{width:76px;height:24px}\
		.noClipboard .clipboardswf{display:none}\
	');*/
	MI.dialog.show({
		title : '<h1 class="DmainTit">复制链接分享</h1>',
		width : 445,
		html :'<div class="shareLink">'
			   +'<div class="shareOrgin">下面是这条广播的链接地址，复制下来，用QQ或MSN分享给朋友吧：</div>'
			   +'<div>'
			   +'<input type="text" id="linkStr" class="inputTxt" value="http://t.qq.com/p/t/'+id+'">'
			   +'<span class="clipboardswf">'
			   +'<embed name="clipboardswf" onmouseover="setcopy_gettext(this)" devicefont="false" src="/clipboard.swf" menu="false" allowscriptaccess="sameDomain" swliveconnect="true" wmode="transparent" type="application/x-shockwave-flash">'
			   +'</span>'
			   +'</div>'
			   +'<div class="btnBox">'
			   +'<button id="btnCopy" class="btn2">复制链接</button>'
			   +'<button class="btn2" onclick="MI.dialog.hide()">取消</button>'
			   +'</div>'
			   +'</div>'
	});
	var tips='#\n嗨，你好！\n我是'+MI.user.name+'，最近我在玩腾讯微博，看到这条有意思的广播，想要分享给你，没准儿你也会喜欢呢！常联系，关心常在温馨常在~';
	var linkPut = $('linkStr');

	window.copyUrl = function(url){
		url = url || linkPut;
		if (window.clipboardData){
			window.clipboardData.setData("Text", url.value+tips);
			MI.tip('链接复制成功')
		}
		else{
			MI.tip('您所用浏览器不支持该功能，请手动复制链接');
		}
		url.select();
	}
	window.selectUrl = function(){
		if(UI.B.ie) copyUrl(this);
		this.select();
	}
	window.Global_FlashVersion = function(){
		if (navigator.plugins && navigator.mimeTypes.length){
			var x = navigator.plugins["Shockwave Flash"];

			if (typeof x != "undefined" && typeof x.description != "undefined"){
				return x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".")[0] || 0;
			}
		}
		else{
			var version = [9, 8, 7, 6];

			for (var i=0; i<version.length; i++){
				try{
					var x = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + version[i]);
					return version[i];
				}
				catch (e){}
			}
		}
		return 0;
	}();
	var input;
	window.setcopy_gettext = function(el){
		if(el){
			el.SetVariable('str', linkPut.value+tips);
		}
	}
	window.floatwin = function(){
		MI.tip(_('链接复制成功'));
	}
	if (Global_FlashVersion < 8){
		UI.addClass(document.body,'noClipboard');
	}
	$('btnCopy').onclick=copyUrl;
	linkPut.onclick=selectUrl;
	MI.Bos('btnShareCopy');
}
MI.TalkList.prototype.sportTips = function(tips){
	var target = this;
	UI.ajax({
		url:'/asyn/topicInfo.php',
		type:'get',
		success : function(data){
			data = MI.json(data);
			 if(data.result==0){
			 	var num = data.info.total;
				tips.innerHTML ='<div>' + _('361° 腾讯微博火炬传递参与：') + num + _('人次')+'</div>';
				UI.show(tips);
				MI.tips.position(target);
			 }
		}
	 });
}
MI.TalkList.prototype.urlTips = function(tips){
	if (this.nodeName == 'A') {
		var target = this,
			urlTipsTxt = [_('原链接有风险'),_('原链接不建议打开'),_('腾讯网'),_('原链接'),_('搜搜')],
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
MI.TalkList.vote = function(el){ //显示投票
	var P = el.parentNode.parentNode,
		box = $$(P,'.vBox')[0],
		realUrl = UI.A(P,'realurl'),
		shortUrl = UI.A(P,'shorturl'),
		iframe;
	UI.addClass(P,'vPlay');
	iframe = '<div style="height:200px"></div><iframe style="height:200px;display:none" onload="UI.show(this);try{var height=(this.contentWindow.document.body.scrollHeight||this.contentWindow.document.documentElement.scrollHeight)+5+\'px\';this.style.height=height;}catch(e){};UI.hide(this.previousSibling);UI.removeClass(this.parentNode,\'loading\');" src="' + realUrl + '" frameborder="0" scrolling="no" allowtransparency="true"></iframe>';
	if (box){
		UI.addClass(box,'loading');
		box.innerHTML = iframe;
	}
	else {
		UI.after(UI.html('<div class="vBox loading">' + iframe + '</div>')[0],el);
	}
}
MI.TalkList.voteClose = function(el){ //隐藏投票
	var P = el.parentNode.parentNode;
	UI.removeClass(P,'vPlay');
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
								UI.each(data.info,function(o,i){
									s.push('<li value=\"'+ o +'\" index="' + i + '">' + o + '</li>');
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
	Self.tips = UI.isUndefined(o.tips) ? 1 : o.tips; //Tips
	Self.minWidth = o.minWidth; //Min Width

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
			
			Self._body.style.cssText = 'top:' + (UI.getY(el) + UI.height(el) + 3) + 'px;left:' + (UI.getX(el) - 1) + 'px';
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
		var Self = this;
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
					if (users[i] && (i.match(reg) || users[i].match(reg))) {
						//match.push(MI.string.html(o.info[i].replace(reg,html) + ' (' + i.replace(reg,html) + ')').replace(/з/,'<b>').replace(/З/,'</b>'));
							match.push(users[i].replace(reg,'<b>' + RegExp.$1 + '</b>') + ' (' + i.replace(reg,'<b>' + RegExp.$1 + '</b>') + ')');
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
					}
					index++;
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
							match.push(users[i].substring(0, rs[0]) + '<b>' + users[i].substring(rs[0], rs[0]+rs[1]) + '</b>' + users[i].substring(rs[0]+rs[1]) + ' (' + i + ')');
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
							match.push(users[i].substring(0, rs[0]) + '<b>' + users[i].substring(rs[0], rs[0]+rs[1]) + '</b>' + users[i].substring(rs[0]+rs[1]) + ' (' + i + ')');
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
						match.push(users[i] + ' (' + i + ')');
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
			tips : _('只能发给你收听的用户'),
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
	/**
	 * 对话框DOM
	 * @type Object
	 */
	_body : UI.html(MI.tmpl.reply)[0],
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
		},200);
	}
}

MI.Recom = function(){ //Recom Dialog
	var Self = this,talkBox,talkBox;
	UI.hide(Self._body);

	Self.talkBox = new MI.TalkBox(Self._body);
	Self._title = $$(Self._body,'.replyTitle')[0];
	Self._msg = $$(Self._body,'.msg')[0];
	
	talkBox = Self.talkBox;
	talkBox.txtTipSend = _('推荐中');
	UI.addClass(talkBox._txt,'noAutoComplete');
	talkBox.successStart=function(){
		MI.dialog.showTip({html:_('推荐成功!')});
		UI.ajax({url:'/asyn/comm.php',data:{accounts:Self.account}});
	}
	talkBox.success=function(){
		UI.removeClass(talkBox._body,'pubSuc');
	}
}

MI.Recom.prototype = {
	_body : UI.html(MI.tmpl.reply)[0],
	talkBox : null,
	show : function(obj){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({html:Self._body,width:500});
		Self._title.innerHTML = _('把 <b>{0}</b> 介绍给大家:',talkBox.talkTo);
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
			Self.account = obj.account;
		}
		setTimeout(function(){
			MI.focus(talkBox._txt);
			talkBox.countTxt();
		},200);
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
MI.Card = function(){ //Info Card    资料卡
	var Self = this,
		_body = Self._body,  
		follow = 'addAttention',
		unfollow = 'delAttention',
		replyBox,msgBox,recomBox,txtMax;
	Self._pic = $$(_body,'.userPic a')[0];  //a
	Self._name = $$(_body,'.userName')[0];  //用户名
	Self._num = $$(_body,'.nums')[0];       //广播和听众数
	Self._note = $$(_body,'.note')[0];      //备注
	Self._reply = $$(_body,'.reply')[0];    //对话
	Self._msg = $$(_body,'.msg')[0];        //私信，只能发给自己的听众
	Self._follow = $$(_body,'.' + follow)[0];      //收听
	Self._unfollow = $$(_body,'.' + unfollow)[0];  //取消收听
	Self._more = $$(_body,'.more')[0];			//更多
	Self._moreFun = $$(_body,'.moreFun')[0];   //更多下拉列表
	Self._black = $$(_body,'.black')[0];      //拉黑
	Self._chat = $$(_body,'.chat')[0];        //聊天
	Self._list = $$(_body,'.list')[0];		 //名单
	Self._recom = $$(_body,'.recom')[0];	  //推荐                                                  
	Self._report = $$(_body,'.report')[0];	  //举报
	Self._blackTip = $$(_body,'.tip')[1];     //特殊提示 “这是你自己”...
	Self._sFollow = $$(_body,'.ico_sFo')[0];  //添加到特别收听
	Self._tag = $$(_body,'.tagBox')[0];       //标签
	Self._sepline = $$(_body,'.sepline')[0]; //分隔符
	Self._uIntro = $$(_body,'.uIntro')[0]; //简介
	Self._company = $$(_body,'.company')[0]; //公司信息
	Self._school = $$(_body,'.school')[0]; //学校和院系

	Self.creatBox = function(){
		Self.reply = new MI.Reply();  
		Self.msg = new MI.Msg();
		Self.recom = new MI.Recom();
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
		MI.Bos('btnCardHead',Self.cType); 
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
		clearTimeout(MI.Card.hideCard);	
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

				MI.Bos('btnCardFollow',Self.cType);
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

				MI.Bos('btnCardUnFollow',Self.cType);
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
		MI.Bos('btnNoteCardAdd',Self.cType);
		return false;
	}
	Self._reply.onclick = function(){
		Self.creatBox();
		replyBox.talkTo = Self.bkname || Self.name;
		replyBox.topic = '@' + Self.chName + ' ';
		replyBox.txtMax = txtMax - replyBox.topic.length;
		Self.reply.show();
		MI.Bos('btnCardReply',Self.cType);
		return false;
	}
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
			MI.Bos('btnCardMsg',Self.cType);
		}
		else {
			MI.Bos('btnCardMsgDisabled',Self.cType);
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
			MI.Bos('btnCardSFollow',Self.cType);
		}
		else {
			MI.Bos('btnCardUnSFollow',Self.cType);
		}
		return false;
	}
	//聊天
	Self._chat.onclick = function(){
		if(!Self.chat) return false;
		MI.chat(Self.account,Self.name,Self.avatar);
		MI.Bos('btnCardChat',Self.cType);
		return false;
	}
	//名单
	Self._list.onclick = function(){
		MI.app({
			List:function(){
				MI.List.listFollow(Self.account,{title:_('名单分组'),bkname:' ',foset:' '});
			}	
		});
		MI.Bos('btnCardList',Self.cType);
		return false;
	}
	//举报
	Self._report.onclick = function(){
		MI.report(Self.account);
		MI.Bos('btnCardReportUser',Self.cType);
		return false;
	}
	//推荐
	Self._recom.onclick = function(){
		Self.creatBox();
		recomBox.talkTo = Self.bkname || Self.name;
		recomBox.txtMax = txtMax;// - recomBox.topic.length;
		Self.recom.show({account:Self.account,cont:_('#推荐收听# {0} 是个挺有趣的人，大家快来强势围观它吧。','@'+Self.account)});
		MI.Bos('btnCardRecom',Self.cType);
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
		MI.Bos('btnCardCompany',Self.cType);
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
	getPos : function(el){
		var x = UI.getX(el);
		var y = UI.getY(el);
		if(this.cType == '2') {
			var wHeight = UI.windowHeight();  //窗体高度
			var sHeight = UI.scrollY(document.documentElement || document.body); //垂直滚动高度
			var cHeight = UI.height(this._body) || 100;   //资料卡高度
			var eHeight = UI.height(el) > 20 ? 17 : UI.height(el); 	//目标元素的高度,链接换行的话，取单行行高17
			var dHeight = 10;    //资料卡距离链接的位置
			if(y + cHeight + dHeight > wHeight + sHeight){
				y = y - cHeight - dHeight;
				UI.addClass(this._body,'cardB');
			}
			else {
				y = y + eHeight + dHeight;
				UI.removeClass(this._body,'cardB');
			}
		}
		else if((this.cType == '3' || this.cType == '4') && x < 260) {      //资料卡加箭头宽度260，css中负margin-left的值
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
			account = MI.string.id(P.href.split('?')[0]),
			chName = title.match(reg)[0].slice(1,-1), //含中文ID
			name = title.replace(reg,'').slice(0,-1),
			url = '/' + account,
			Time,Time_1,Time_2,Time_3;
		
		Self._body.className = 'uCard' + ' cType' + cType + ' card' + [0,1,'T','R','R'][cType*1];
		Self.cType = cType;
		Self.account = account;
		Self.name = name;
		Self.chName = chName;
		Self._pic.href = url;
		//Self._pic.innerHTML = '<img src="' + pic + '">';   //构建头像html
		UI.hide(Self._follow);
		UI.hide(Self._unfollow);
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
		if (MI.Card.users[account]) {
			show(MI.Card.users[account]);  //从缓存中读取
		}
		else {
			Time = + new Date();
			UI.get('/asyn/userCard.php','u=' + account + '&t=' + Self.cType +'&r='+MI.random(),function(data){
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
			});
		}
		function show(o){
			var notSelf = Self.account != MI.user.account,
				btn = o.follow ? Self._unfollow : Self._follow,
				sFollow = Self._sFollow,
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
			if(Self.cType != '1'){
				var _picLink = o.avatar;
				_picLink = _picLink ? _picLink + '/50' : 'http://mat1.gtimg.com/www/mb/images/head_50.jpg';
				Self._pic.innerHTML = '<img src="' +  _picLink + '" />';   //构建头像html
			}
			if (o.gender == 2) {
				gender = _('它');
			}
			rel = "{u:'" + Self.account + "',name:'" + (Self.bkname || Self.name) + "',sex:'" + gender + "'}";
			if (o.block) {
				Self._black.innerHTML = _('取消拉黑');
				UI.addClass(Self._black,'blackDel');
				Self._blackTip.style.display = 'block';
				Self._blackTip.innerHTML = '<a href="#" class="right blackDel" rel="' + rel + '">[' + _('移出') + ']</a>' + _('{0}在你的黑名单里',gender);
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
			if (notSelf && o.followed) {
				UI.removeClass(Self._msg,'disabled');
				Self._msg.title = '';
			}
			else {
				UI.addClass(Self._msg,'disabled');
				Self._msg.title = _('私信只能发给你的听众');
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
						Self._tag.innerHTML += '<span class="etc"><a title="' + _('更多') + '" href="' + '/' + Self.account + '">...</a></span>';
					}		

				}
				UI.show(Self._tag);
			}
			else {
				UI.hide(Self._tag);
			}
			//简介
			if (o.uIntro) {
				var _uTitle = o.uIntro
				if(MI.string.length(_uTitle) > 72) {
					Self._uIntro.title = _uTitle;
				    _uTitle = MI.string.cut(_uTitle,72,'...');
				}
				else {
					Self._uIntro.removeAttribute('title');
				}
				Self._uIntro.innerHTML = _(_uTitle);
				
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
				var schoolName = schoolNameAll = o.school.name || '';
				var schoolHref = o.school.href || '';
				var objectName = objectNameAll = o.school.objectName || '';
				var objectHref = o.school.objectHref || '';
				if(MI.string.length(schoolName + objectName) > 30) {
					schoolName = MI.string.cut(schoolName,14,'...');
					objectName = MI.string.cut(objectName,12,'...');
				}
				if(objectHref) {
					Self._school.innerHTML =  _('学校：') + '<a href="' + schoolHref + '" title="' + schoolNameAll + '">' + schoolName + '</a> <a href="' + objectHref + '" title="' + objectNameAll + '">' + objectName + '</a>';
					UI.EA($$(Self._school,'a')[1],'mousedown',function(){
						MI.Bos('btnCardSchoolObject',Self.cType);
					});
				}
				else {
					Self._school.innerHTML =  _('学校：') + '<a href="' + schoolHref + '" title="' + schoolNameAll + '">' + schoolName + '</a> <span title="' + objectNameAll + '">' + objectName + '</span>';
				}
				UI.EA($$(Self._school,'a')[0],'mousedown',function(){
					MI.Bos('btnCardSchool',Self.cType);
				});
				UI.show(Self._school);
			}
			else {
				UI.hide(Self._school);
			}
			//clearTimeout(Self.deelay);
			UI.removeClass(Self._body,'loading');
			UI.removeClass(Self._body,'small');
			Self.setPos(el);    //所有内容完全显示后再次设置定位
			MI.Bos('btnCardOpen',Self.cType);
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
		Self._name.innerHTML = '<a href="/' + Self.account + '">' + (o.bkname || o.nick) + '</a>' + icon + '<br /><span class="en">' + (o.bkname ? o.nick : '') + '@' + Self.chName + '</span>';
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
MI.Card.hide = function(){
	clearTimeout(MI.Card.delay);
	clearTimeout(MI.Card.hideCard);
	MI.Card.hideCard = setTimeout(function(){    //鼠标离开头像，滑向选项卡过程中会触发mouseout事件，所以做延迟处理
		MI.card.hide();
	},500);
}
MI.Card.build = function(el,className,cType){
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
		this.build();
	},
	build : function() {
		if (UI.hasClass(document.body,'ipad') || !$('mainWrapper')) {
			return;
		}
		if (UI.isNumber(MI.user.fun.chat)){
			//载入WebQQ
			MI.app({WebQQ:function(){
				var qbox = $$(MI.GoTop._qBox,'.btn_qTalk')[0];
				if (qbox){
					UI.C(qbox,'background','none');
					UI.C(qbox,'filter','');
					qbox.title = '';
				}
			}});
		}
		var Self = this,
			//各浏览器fix统一修改为5px，css中统一控制了。
			leftFix = 5,//UI.B.ie ? 1 : 3,
			rightFix = 6,
			_main = $('mainWrapper'),
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
			Self.delay.position = setTimeout(set,UI.B.ie6 ? 400 : 0);
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
			Self._body.style.cssText = 'left:' + left + 'px;';
			Self._qqBox.style.cssText = 'right:' + right + 'px;';
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
