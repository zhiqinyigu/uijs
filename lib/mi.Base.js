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
	MI.dialog.show({title:_('腾讯举报平台'),width:562,html:wrap});
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

MIIco = ['auth','star','dyh']; //Set Icon's Order
MIIcoHtml = ['<a href="http://t.qq.com/certification" target="_blank" class="vip" title="' + _('腾讯认证') + '"></a>','<a href="http://ent.qq.com/zt2010/star2010/fans.htm" class="ico_star" title="' + _('星光达人') + '" target="_blank"></a>','<a href="http://z.t.qq.com/sz2011/index.htm" target="_blank" class="ico_dyh" title="' + _('大运会') + '"></a>'];
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
var V1='talk[i].source',V2='info.source',V3='<div class="SA"><em>◆</em><span>◆</span></div>',V5=' href="#"',V6=' onerror="MI.Pic(this,50)"',V7=' title="<%=(talk[i].bkname||talk[i].nick).toTitle()%>(@<%=talk[i].chName || talk[i].name%>)"';
MI.tmpl.listAll = '<%var D=MI.TalkList.date;for(var i=0,n=talk.length;i<n;i++){\
		var sid=talk[i].id,numAll,numRelay,numComt,numRelay2;numRelay=talk[i].counts[0]||0;numComt=talk[i].counts[1]||0;numRelay2=talk[i].counts[2]||0;\
		if('+V1+'){sid='+V1+'.id;numRelay='+V1+'.counts[0]||0;numComt='+V1+'.counts[1]||0;}\
		numAll=numRelay+numComt;%><li id="<%=talk[i].id%>"<%if(fav){%> fav="<%=talk[i].favortimestamp%>"<%}%> rel="<%=talk[i].timestamp%>" <%if(talk[i].qinfo){%>wqid="<%=talk[i].qinfo.wqid%>"<%}%>>\
			<%if(D){\
				var date=UI.formatDate(UI.zoneDate(talk[i].timestamp+\'000\',8),\'yyyy-MM-d\'),dateD=date.slice(8),dateM=date.slice(0,7);\
				if(date!=D){\
					%><div class="pubDate"><span class="pDate"><%=dateD%></span><br><%=dateM%></div><%\
					D=date;\
				}\
			}else {%>\
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
					<a class="btn_trans" href="#">[' + _('译') + ']</a>\
				<%}%>\
				</div>\
				<%var Imgage=talk[i].image && talk[i].image.length,Videos=talk[i].videos && talk[i].videos.length,Music=talk[i].music && talk[i].music.length,Vote=talk[i].vote && talk[i].vote.length;if(Imgage || Videos || Music || Vote){%><div class="mediaWrap">\
					<%if(Vote || !(Imgage || Videos || Music)){%>\
						<div class="videoBox voteBox" realurl="http://vote.t.qq.com/vote/vote.php?id=<%=talk[i].vote[0].realUrl%>&u=<%=talk[i].name%>&type=<%=talk[i].vote[0].type%>&result=yes&tpl=mini" shorturl="http://url.cn/<%=talk[i].vote[0].shortUrl%>" realtitle="<%=talk[i].vote[0].title%>">\
							<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="http://vote.t.qq.com/vote/vote.php?id=<%=encodeURI(talk[i].vote[0].realUrl)%>&u=<%=talk[i].name%>&type=<%=talk[i].vote[0].type%>" class="vUrl" target="_blank"><em></em><%if(talk[i].vote[0].title){%><%=MI.string.cut(talk[i].vote[0].title,40)%><%}%></a></div>\
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
								<div class="msgCnt"><strong><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)"><%='+V1+'.bkname||'+V1+'.nick%></a>'+MIIcon(V1+'.flag')+'<%='+V1+'.icon%><%if(!'+V1+'.source){%>:<%}%></strong><%if('+V1+'.source && ('+V1+'.type==4 || '+V1+'.type==5)){%><em class="userTo">' + _('对') + '</em><strong class="userTo"><a href="http://t.qq.com/<%='+V1+'.source.name%>" title="<%=('+V1+'.source.bkname||'+V1+'.source.nick).toTitle()%>(@<%='+V1+'.source.chName || '+V1+'.source.name%>)"><%='+V1+'.source.bkname||'+V1+'.source.nick%></a>'+MIIcon(V1+'.source.flag')+'' + _('说') + ':<%}%></strong>\<%='+V1+'.content%>\
									<%if('+V1+'.tran>0){%>\
										<a class="btn_trans" href="#">[' + _('译') + ']</a>\
									<%}%>\
								</div>\
								<%var Imgage='+V1+'.image && '+V1+'.image.length,Videos='+V1+'.videos && '+V1+'.videos.length,Music='+V1+'.music && '+V1+'.music.length,Vote='+V1+'.vote && '+V1+'.vote.length;if(Imgage || Videos || Music || Vote){%><div class="mediaWrap">\
									<%if(Vote || !(Imgage || Videos || Music)){%>\
										<div class="videoBox voteBox" realurl="http://vote.t.qq.com/vote/vote.php?id=<%='+V1+'.vote[0].realUrl%>&u=<%='+V1+'.name%>&type=<%='+V1+'.vote[0].type%>&result=yes&tpl=mini" shorturl="http://url.cn/<%='+V1+'.vote[0].shortUrl%>" realtitle="<%='+V1+'.vote[0].title%>">\
											<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="http://vote.t.qq.com/vote/vote.php?id=<%=encodeURI('+V1+'.vote[0].realUrl)%>&u=<%='+V1+'.name%>&type=<%='+V1+'.vote[0].type%>" class="vUrl" target="_blank"><em></em><%if('+V1+'.vote[0].title){%><%=MI.string.cut('+V1+'.vote[0].title,40)%><%}%></a></div>\
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
								<%if('+V1+' && '+V1+'.gps && '+V1+'.gps.address && '+V1+'.gps.pos){%>\
									<div class="areaInfo"><em title="' + _('地理位置') + '" class="ico_area"></em><span><%='+V1+'.gps.address%></span> - <a pos="<%='+V1+'.gps.pos%>" merchant="<%='+V1+'.gps.merchant%>"  address="<%='+V1+'.gps.address%>" href="#">' + _('地图展示') + '</a></div>\
								<%}%>\
								<div class="pubInfo"><span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" <%if(MI.user.fun.btnStyle!=6){%>href="/p/t/<%=sid%>" target="_blank"<%}%>><%='+V1+'.time%></a> <%='+V1+'.from%><%if('+V1+'.city){%> <%='+V1+'.city%><%}%><%if(1 && '+V1+' && numAll){if(MI.user.account){%>\
									 <a href="/p/t/<%=sid%>" class="zfNum" target="_blank">' + _('查看转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</a>\
								<%}else{%>\
									 <em class="zfNum">' + _('查看转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</em>\
								<%}}%></span></div>\
							<%}%>\
						</div>\
					</div>\
				<%}%>\
				<%if(talk[i].gps && talk[i].gps.address && talk[i].gps.pos){%>\
						<div class="areaInfo"><em title="' + _('地理位置') + '" class="ico_area"></em><span><%=talk[i].gps.address%></span> - <a pos="<%=talk[i].gps.pos%>" merchant="<%=talk[i].gps.merchant%>" address="<%=talk[i].gps.address%>" href="#">' + _('地图展示') + '</a></div>\
				<%}%>\
				<div class="pubInfo"><span class="left"><a class="time" <%if(MI.user.fun.btnStyle!=6){%>href="/p/t/<%=talk[i].id%>" target="_blank"<%}%>><%=talk[i].time%></a> <%=talk[i].from%><%if(talk[i].city){%> <%=talk[i].city%><%}%><%if(!'+V1+' && numAll){if(MI.user.account){%>\
					 <a href="/p/t/<%=talk[i].id%>" class="zfNum" target="_blank">' + _('查看转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</a><%}else{%>\
					 <em class="zfNum">' + _('查看转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</em><%}}%><%if(talk[i].type == 2 && numRelay2){%>\
					 <em class="zfNum2" title="<%=(talk[i].bkname||talk[i].nick).toTitle()%> ' + _('转播后引发的转播次数') + '">' + _('该条转播') + '(<b class="relayNum"><%=numRelay2%></b>)</em><%}%><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%>\
					<a class="view" href="http://t.qq.com/p/r/<%=talk[i].id%>">' + _('查看对话') + '</a><%}%><%if(MI.user.fun.fastReport == 1 && (talk[i].type == 2 || talk[i].type == 7) && talk[i].name != MI.user.account && '+V1+'.name == MI.user.account){%> <a'+V5+' class="alarm">' + _('删除') + '</a><%}%></span><div class="funBox">\
						<%if(MI.user.account){\
							if(MI.user.fun.btnStyle!=6){%><a'+V5+' class="relay" num="<%=numRelay%>">' + _('转播') + '</a><span>|</span><%}\
							if(MI.user.fun.btnStyle==5||MI.user.fun.btnStyle==6){\
								%><a href="/p/t/<%=sid%>" class="comt">' + _('评论') + '</a><%\
							}else if(MI.user.fun.btnStyle==1){\
								%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><a'+V5+' class="delBtn">' + _('删除') + '</a><%}else{%><a'+V5+' class="reply">' + _('对话') + '</a><%}}%><%\
							}else{\
								%><a href="/p/t/<%=sid%>" class="comt" num="<%=numComt%>">' + _('评论') + '</a><%\
							}%><span>|</span><%if(MI.user.fun.btnStyle!=6){%><div class="mFun"><a href="#">' + _('更多') + '<em class="btn_ldrop"></em></a><div class="mFunDrop"><b></b><b class="mask"></b>\
								<%if(MI.user.fun.btnStyle==1){\
									%><p><a href="/p/t/<%=sid%>" class="comt" num="<%=numComt%>">' + _('评论') + '</a></p><%\
								}else if(MI.user.fun.btnStyle==6 || MI.user.fun.btnStyle==5){\
									%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><p><a'+V5+' class="delBtn">' + _('删除') + '</a></p><%}}%><%\
								}else{\
									%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><p><a'+V5+' class="delBtn">' + _('删除') + '</a></p><%}else{%><p><a'+V5+' class="reply">' + _('对话') + '</a></p><%}}%><%\
								}%><%if(MI.user.fun.btnStyle!=6){%>\
									<p><a'+V5+' class="fav<%if(fav){%> light<%}%>"><%if(fav){%>' + _('取消') + '<%}%>' + _('收藏') + '</a></p>\
									<%if(MI.user.fun.btnStyle!=5) {%>\
									<div class="shareBtn">\
										<p><a href="#">' + _('分享') + '</a></p>\
									</div><%}%>\
									<p><a href="/p/t/<%=talk[i].id%>" class="detail" target="_blank">' + _('详情') + '</a></p><%}%>\
								<%if(MI.user.fun.report && talk[i].name != MI.user.account){%><p><a'+V5+' class="alarm">' + _('举报') + '</a></p><%}%>\
							</div>\
						</div>\
							<%}else{%>\
								<%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><a'+V5+' class="delBtn">' + _('删除') + '</a><%}}%>\
								<%if(MI.user.fun.report && talk[i].name != MI.user.account){%><a'+V5+' class="alarm">' + _('举报') + '</a><%}}%>\
						<%}%>\
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
/**
 * 打开写私信对话框
 *
 * @param {String} name 收件人帐号
 * @param {Integer} type 用来统计用户从哪里启动写私信对话框，1: profile tip处发出，3: Profile页面发私信
 * @param {String} content 默认显示的文件内容
 *
 * @return {Boolean} true 执行成功，false 失败
 *
 *  @example
 *		MI.pmcompose("t", 1)
 *
 */
MI.pmcompose = function(name, from, content)
{
	var config = {
			type : "compose",
			to : name,
			from : from,
			content : content
		};
	window.PMCMarkTime = +new Date;
	if (window.PM)
	{
		//已经加载了wbpm.js
		PM.init(config);
		return false;
	}
	var _sStaticHost = location.protocol + "//rescdn.qqmail.com/pmweb/",
		_sHost = location.protocol + "//pm.t.qq.com/",
		_jsName = { zh_TW : "wbpm.zh_TW.js" }[window.MILang] || "wbpm.zh_CN.js",
		_sJsUrl = [_sStaticHost, "zh_CN/htmledition/js/", _jsName, "?version=110602a"].join(""),
		_sCssUrl = _sStaticHost + "zh_CN/htmledition/style/wbpm.css?v=110602a",
		_nStatus = 0; //0 初始化，1 用户自动关闭，2 写私信状态

	UI.getCss(_sCssUrl, function(){});

	MI.dialog.show({
		width:570,
		html : '<div style="width:508px;height:169px;text-align:center;line-height:12;"><img style="margin:0 5px -3px;" src="http://mat1.gtimg.com/www/mb/images/loading.gif"/>加载中...</div>',
		end : function()
		{
			//这是用户强制关闭
			_nStatus = 1;
		}
	});
	setTimeout(function()
		{
			if (!_nStatus)
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
		subNav = UI.html('<div class="subNav" onclick="MI.Bos(\'btnTopMenuNews\')"><p><a href="http://t.qq.com/p/news">' + _('大家在说') + '</a></p><p><a href="http://t.qq.com/p/mobile">' + _('手机广播') + '</a></p><p><a href="http://t.qq.com/p/city">' + _('同城广播') + '</a></p><p><a href="http://t.qq.com/p/top">' + _('热门广播') + '</a></p><p><a href="http://t.qq.com/college_anas.php">' + _('经典语录') + '</a></p><p><a href="http://t.qq.com/dandelion.php?g">' + _('蒲 公 英') + '</a></p><p><a href="http://t.qq.com/p/rank">' + _('排 行 榜') + '</a></p><p><a href="http://t.qq.com/lists.php">' + _('名单集市') + '</a></p><p class="last"><a href="http://z.t.qq.com/weibotalk.htm" target="_blank">' + _('微 访 谈') + '</a></p></div>')[0];
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
		MI.searchKeyBox = new MI.SmartBox('searchKey',function(){$('searchForm').submit()},'',{left:-8,top:UI.B.ie?4:6,width:202,type:1,history:1});
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
MI.listDrop = function(id){
	this._id = id;
	this._html = '<div class="listDrop"><div class="ldList"><a href="#" class="ld_btn pageUp" title="' + _('向上滚动') + '" style="display:none"><em></em></a><div class="ldListBox"><ul></ul></div><a href="#" class="ld_btn pageDown" title="' + _('向下滚动') + '" style="display:none"><em></em></a></div><p class="ctrlBar"><a href="http://t.qq.com/lists.php">' + _('集市') + '</a>|<a href="#" class="creatList" onclick="MI.viewListHide&&MI.viewListHide();MI.List.add();MI.Bos(\'btnListViewAdd\');return false">' + _('创建') + '</a>|<a href="http://t.qq.com/list_mine.php" onclick="MI.Bos(\'btnListViewAdmin\')">' + _('管理') + '</a></p></div>';
	this._listDropBtn = $(id);
	this._arrow = null;//UI.GT(this._listDropBtn,'em')[0];		//箭头
	this._selectedBtn = null;//$$(this._listDropBtn.parentNode,'.select')[0];	//当前选中的tab
	this._body = UI.html(this._html)[0];							
	this._ctrlBar = $$(this._body,'.ctrlBar')[0];	//列表操作按钮
	this._pageUp = $$(this._body,'.pageUp')[0];		
	this._pageDown = $$(this._body,'.pageDown')[0];  
	this._addList =  $$(this._body,'.creatList')[0];  //添加列表
	this._listUl =  $$(this._body,'.ldListBox ul')[0];	
	this.delay= {};
	this.liHeight = 19;  
	this._dataUrl = null; //请求地址
	this._current = null; //当前项
	
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
				tab:_('我的微群')
			},
			'home_mylist_top':{		//名单
				type:1,
				url:MI.url.allMyList,
				current:MI.listDrop.current,
				tab:_('我的名单')
			}
		};
	
	if(!btns) return;
	UI.each(btns,function(o){
		o.onmouseover = function(){
			var id = o.parentNode.id;
			if(!$$(o,'.btn_ldrop')[0] || !dropList[id]) {
				o.onmouseover = function(){};
				return;
			}
			if(id && !MI.listDrop.box[id]) {
				MI.listDrop.box[id] = new MI.listDrop(id);
				MI.listDrop.box[id]._type = dropList[id].type;
				MI.listDrop.box[id]._dataUrl = dropList[id].url;
				MI.listDrop.box[id]._current = dropList[id].current;
				MI.listDrop.box[id]._tab = dropList[id].tab;

				MI.listDrop.box[id].build();
				o.onmouseover();
			}
		}	
	});
	MI.listDrop.filterBar();
};

//tab筛选栏
MI.listDrop.filterBar = function(){
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
};


MI.listDrop.prototype = {
	listId:{},				//存储数据
	isLab:1,
	load :function(id){
		var Self = this;
		if(Self.listId[id]) {
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
				data : '',
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
			Self._ctrlBar.style.display = Self._type ? '' : 'none'; //微群不显示按钮
			Self._addList.style.display = data.canCreate ? '' : 'none'; //能否创建新名单

			UI.addClass(Self._listDropBtn,'select');
			UI.addClass(Self._arrow,'lopen');
			UI.show(Self._body);
			Self.pos();
			Self.page(0);
			

			if(Self._current) {
				UI.each($$(Self._listUl,'a'),function(o){
					if (UI.A(o,'href').hasString(Self._current)){
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
	},
	hide : function(){
		var Self = this;
		Self.delay.hide = setTimeout(function(){
			UI.hide(Self._body);
			UI.removeClass(Self._arrow,'lopen');
			if(Self._listDropBtn != Self._selectedBtn) UI.removeClass(Self._listDropBtn,'select');
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
				var id = o.parentNode.id;
				clearTimeout(Self.delay.hide);
				Self.delay.load = setTimeout(function(){
					Self.load(id);
				},100);
			};	

			o.onmouseout = Self._body.onmouseout =  function(){
				Self.hide();
				clearTimeout(Self.delay.load);
			};

			Self._body.onmouseover = function(){
				clearTimeout(Self.delay.hide);
			}

			if(Self._type ==1) o.onclick = function(){ return false}; //点击微群tab跳转，名单不跳转
		

		Self.pageEvent();
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
			o.onmousemove = function(){
				UI.A(this,'hideFocus','true');
				this.onmousemove = null;
			};
		});
		UI.each(hotTopic,function(o,i){
			o.onmousedown = function(){
				MI.Bos('btnHotTopicList',UI.A(this,'href').slice(3));
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
MI.TalkBox.prototype.hasFace = false;
MI.TalkBox.prototype.showFace = function(){
	var Self = this;
	if (!Self.hasFace){
		/**
		 *  上线后引用http://image.soso.com/js/sosoexp_platform.js
		 *  引用js后用SOSO_EXP.Register方法注册表情按钮，该方法参数是一个对象，各参数定义如下：
		 *  @param object {
		 *		appid: 业务接入的id，微博用30010，必需
		 *		ref: 业务的来源域名，微博用't.qq.com'，必需
		 *		expBtn: 注册的表情按钮，点击弹出表情框，是一个dom元素，非必需
		 *		pos: 弹出表情框的位置，支持left/right/bottom/up，默认是bottom，非必需
		 *		editbox: 点击表情框中的图片之后，回调函数的第一个参数，非必需
		 *		callback: 点击表情框中的图片之后，触发的回调函数，由用户定义如何处理里层表情框传出来的图片url，第一个参数是editbox，第二个是图片url，必需
		 *		tab: 自定义tab页面提供的参数，支持4个tab自定义。非必需，格式如下： 
		 *			object {
		 *				0: [CustomTabName0, CustomTabUrl0],	// 第1个tab页的名称和iframe页面src，不填则该tab为'默认'页
		 *				1: [CustomTabName1, CustomTabUrl1],	// 第2个tab页的名称和iframe页面src，不填则该tab为'热搜'页
		 *				2: [CustomTabName2, CustomTabUrl2],	// 第3个tab页的名称和iframe页面src，不填则该tab为'系列'页
		 *				3: [CustomTabName3, CustomTabUrl3],	// 第4个tab页的名称和iframe页面src，不填则该tab为'趣味'页
		 *			}
		 *	}
		 */
		SOSO_EXP.Register({
			appid: 30010,
			ref: 't.qq.com',
			expBtn: Self._face,
			pos: 'bottom',
			editbox: Self._txt,
			callback: function(editbox,url){
				Self.addPic({result:0,msg:'上传成功','info':{'image':url,'fileName':_('表情.gif')}});
			},
			tab: {0: ['默 认', 'http://www.qq.com/mb/face.htm?v=110530']}
		});
		SOSO_EXP.Platform.popupBox(Self._face);
		Self.hasFace = true;
	}
}
MI.TalkBox.prototype.addFace = function(){
	var Self = this;
	if (0 && Self._pic){
		if (window.SOSO_EXP){
			Self.showFace();
		}
		else {
			UI.getScript('http://image.soso.com/js/sosoexp_platform.js',function(){
				Self.showFace();
			});
		}
		MI.TalkBox.cur = Self;
		return;
	}
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
			<div class="musicTab"><a href="#" class="close" title="' + _('关闭') + '">' + _('关闭') + '</a></div>\
			<div class="m_voteBox clear">\
				<form action="' + MI.url.vote + '" onsubmit="return false" name="voteAddFrom" id="voteAddFrom" target="voteAddIframe" method="post">\
				<table>\
					<tr class="voteAddTr"><th>' + _('标题：') + '</th><td valign="top"><input type="text" name="sbjtitle" id="sbjtitle" class="inputTxt"><br><a href="#" class="ffsong addBrief">'+ _('+添加说明') + '</a></td><td valign="top"><span class="voteAddError"></span></td></tr>\
					<tr class="voteAddTr" style="display:none"><th></th><td valign="top"><div><textarea name="brief" id="brief" class="inputTxt"></textarea></div></td><td valign="top"><span class="voteAddError"></span></td></tr>\
					<tr class="voteAddTr"><th>' + _('类型：') + '</th><td valign="top"><label><input class="check1" type="radio" name="ftype" id="ftype" value="1" checked>' + _('单选') + '</label> <label><input class="check1" type="radio" name="ftype" value="2">' + _('多选') + '</label></td><td><b class="voteAddError"></b></td></tr>\
					<tr class="voteAddTr"><th>' + _('选项：') + '</th><td valign="top">\
						<ul>\
							<li><span class="index">1.</span><input type="text" name="opttitle" id="opttitle" class="inputTxt"></li>\
							<li><span class="index">2.</span><input type="text" name="opttitle" class="inputTxt"><div></div></li>\
							<li><span class="index">3.</span><input type="text" name="opttitle" class="inputTxt"><div></div></li>\
							<li><span class="index">4.</span><input type="text" name="opttitle" class="inputTxt"><div></div></li>\
						</ul>\
						<a href="#" class="voteAddOption ffsong">' + _('+增加选项') + '</a>\
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
		Self._addBrief = $$(Self._voteWrap,'a.addBrief')[0];
		
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
		Self._addBrief.onclick = function(){
			var brief=$('brief'),
			P=brief.parentNode.parentNode.parentNode;
			brief.value='';
			UI.toggle(P);
			this.innerHTML = this.innerHTML == _('+添加说明') ? _('-不需要说明了') : _('+添加说明') ;
			$$(P,'.voteAddError')[0].innerHTML='';
			try{brief.focus()}catch(e){}
			return false
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
		html = UI.html('<li><span class="index"></span><input type="text" name="opttitle" class="inputTxt"><div></div></li><li><span class="index"></span><input type="text" name="opttitle" class="inputTxt"><div></div></li>'),
		frag = document.createDocumentFragment();
	UI.each(html,function(o){
		UI.append(o,frag);
	});
	UI.append(frag,Self._voteOptions);
		var index = $$(Self._voteWrap,'li .index');
		if(index){
			for(var i=0,l=index.length;i<l;i++){
				index[i].innerHTML = i+1+'.';
			}
		}
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
	Self._addBrief.innerHTML = _('+添加说明');
}



MI.tmpl.geolocation = '<div style="top:0;left:0" class="comTips1 cardT"><a class="close" href="#"></a><div class="detailAddress" style="background:#fff;width:340px;"><p style="padding:3px 5px;min-height:20px;_height:20px;color:#666;line-height:18px;border-bottom:1px solid #999;"></p></div><div class="areaWrap" id="areaWrap"></div><div class="SA"><em>◆</em><span>◆</span><b>◆</b></div></div>'


MI.TalkList.prototype.geolocation = (function(){
	UI.css('.comTips1 #Attribution {display:none;}');  //隐藏地图版权标识
	
	var mapObj = null,
		body = UI.html(MI.tmpl.geolocation)[0], 
		mapWrap = $$(body,'.areaWrap')[0],
		close =  $$(body,'.close')[0],
		address = $$(body,'.detailAddress p')[0];
		pos = [],	//当前坐标
		addressList = {},  //缓存详细地址
		loadedMapFile = false, //是否已加载地图js文件
		initialize = 0;

	function init(){
		if(initialize) return;
		//创建地图
		UI.append(body,document.body);	
		var mapOptions = new MMapOptions();				//构建地图辅助类
		mapOptions.zoom= 17;							//要加载的地图的缩放级别
		mapOptions.center=new MLngLat(116.397428,39.90923);			//要加载的地图的中心点经纬度坐标
		mapOptions.toolbar = MINI;					//设置地图初始化工具条
		mapOptions.toolbarPos = new MPoint(0,5);	//工具条位置
		mapOptions.overviewMap = HIDE; 				//设置鹰眼地图的状态，
		mapOptions.scale = HIDE;					 //设置地图初始化比例尺状态
		//mapOptions.zoomBox = false;					//鼠标滚轮缩放和双击放大时是否有红框动画效果。
		mapObj = new MMap('areaWrap',mapOptions); //地图初始化 绑定地图包裹元素
		initialize = 1;
	}
	
	//改变地图
	function changeLocation(){
		init();
		mapObj.clearMap();
		var opt = new MBoxOptions();
		opt.content = '<div class="selPoint"><em></em></div>';
		var box = new MBox(new MLngLat(pos[0],pos[1]),opt);
		box.id = 'm' + pos[0] + pos[1];
		mapObj.addOverlay(box,true);
		UI.C($(box.id),'overflow','visible');   //取消标记物的父元素的overflow:hidden，否则标记无法显示
		try {
			var bounds = mapObj.getLngLatBounds();  //获取视野范围矩形区域西南和东北角点的经纬度坐标
			mapObj.setLngLatBounds(bounds);	//根据经纬度bounds设置最合适的地图位置和zoom级别
		} catch (e) {
			//
		}
		//mapObj.setCenter(new MLngLat(x,y));
		//if(zoom) mapObj.setZoomLeave(zoom);
	}

	//改变详细地址
	function changeTip(el){
		var m =  UI.A(el,'merchant'),d = UI.A(el,'address');
		m = !m ? '' : m + '<br />';
		d = !d ? '' : _('地址：') + d;
		address.innerHTML = m  +  d;
	}

	//设置定位
	function setPos(el){
		body.style.left = UI.getX(el) - 150 + 'px';			//150 水平偏移量,是地图和按钮中央对齐	
		body.style.top = UI.getY(el) + 25 + 'px';
		var topOffset = UI.getY(el) + 25 + 220 + UI.height(address) - UI.windowHeight() - UI.scrollY();  //220是地图高度 25垂直偏移量
		if(topOffset>0) UI.scrollTo(document.body,UI.scrollX(),UI.scrollY()+topOffset + 5);
	}

	function show(el){
		pos = UI.A(el,'pos').split(',');
		if(pos.length < 2 || !UI.isNumber(pos[0]*1) || !UI.isNumber(pos[1]*1)) return;
		UI.show(body);
		changeLocation();
		changeTip(el); 
		setPos(el);
		show.delay = 1;
		setTimeout(function(){
			show.delay = 0;
		},100)
	}

	function hide(){
		if(show.delay==0) UI.hide(body);
	}
	
	close.onclick = function(){
		hide();
		return false;
	}

	UI.EA(document,'click',hide);		//地图展示按钮需要阻止冒泡
	
	UI.EA(body,'click',function(e){
		UI.E(e).stop();
	})

	return {
	'show' : function(el){	
			if(!loadedMapFile) {
				var MapABC;
				window.docWrite = document.write;
				document.write = function(script){   //解决ame20101028.js中document.write异步加载，导致页面刷新的问题。
						var src = script.match(/http:\/\/[^"']+/gi)[0];
						if(src) UI.getScript(src,function(){},'utf-8',1);
				};		
				UI.getScript('http://cache.soso.com/30d/js/map20100926/ame20101028.js',function(){
					var repeat = setInterval(function(){
						if(typeof Mapabc!=undefined) {
							show(el);
							document.write = window.docWrite;
							clearInterval(repeat);
						}
					},50)
					loadedMapFile = true;
				},'utf-8',1);
			}	
			else {
				show(el);
			}
			return false;
		},
		'hide' : hide
	}
})();


MI.tmpl.trans = '<div class="comTips1"><div class="transWrap"><div class="transBox"></div><div class="transNote"><span class="left">' + _('小贴士：越早参与翻译越容易被推荐！') + '</span><span class="right"><a class="transMe" href="#">'+ _('我来翻译') + '</a></span></div></div><div class="loading"></div></div>';

MI.TalkList.prototype.trans = (function(){
	var body = UI.html(MI.tmpl.trans)[0],
		transDiv = $$(body,'.transBox')[0],
		transMe = $$(body,'.transMe')[0],
		transBox = null,	//我来翻译，对话框
		resultList = {},  	//缓存结果
		transId = '',
		pNode = null,
		isShowing = false,
		offsetY = 300,
		initialize = 0;

	function init(){
		if(initialize) return;
		UI.append(body,document.body);
 		initialize = 1;
	}

	//显示翻译结果
	function showTransResult(o){
		var str = '';
     	for(i=0;i<o.length;i++) {
			str += '<p><span class="cNote">' + _('译') + '：</span>' + o[i].content;  
			str += '<br /><span class="cNote">' + _('此翻译由'); 
			str += o[i].link ? (_('博友') + '<a target="_blank" href="' + o[i].link + '">@' + o[i].name + '</a>') : o[i].name;
			str += (o[i].link ?_('提供，欢迎你也来翻译') :_('提供，仅供参考')) + '</span></p>';
		}
		transDiv.innerHTML = str;
	}

	function trans(){
		if(resultList[transId]) {
			showTransResult(resultList[transId]);
			resetPos();
			return;
		}

		UI.addClass(body,'loading');
		MI.ajax({
			url:MI.url.translate,
			data:{id:transId},  
			success:function(data){
				UI.removeClass(body,'loading');
				data = MI.json(data);
				if(data.result == 0){
					showTransResult(data.info.result);
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
		offsetY = y;//设置用户翻译对话框的偏移量
	}

	//翻译内容加载后 重设定位
	function resetPos(){
		var topOffset = UI.getY(body) + UI.height(body)  - UI.windowHeight() - UI.scrollY();  
		if(topOffset>0) UI.scrollTo(document.body,UI.scrollX(),UI.scrollY()+topOffset + 5);
	}

	function show(el){
		if(isShowing)  return;
		var msgBox = UI.parents(el,'msgBox')[0];
		pNode = msgBox.parentNode;
		transId = UI.A(el,'tid') || $$(msgBox,'.time')[0].href.replace(/.*\//,'');
		init();
		setPos(el);
		UI.show(body);
		isShowing = true;
		trans();
		MI.Bos('btnShowTrans');
	}

	function hide(){
		clearTimeout(hide.delay);
		hide.delay = setTimeout(function(){
			UI.hide(body);
			isShowing = false;
		},100);	
	}

	transMe.onclick = function(){
		if(!transBox) transBox = new MI.TransMe('trans');
		transBox.show({cont:'',title:_('我来更准确的翻译:'),talkId:transId,offsetY:offsetY,type:1});
		MI.Bos('btnTransByMe');
		return false;
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
MI.TalkList.prototype.sportTips = function(tips){
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
			urlTipsTxt = [_('QQ电脑管家提醒，原链接可能有风险'),_('QQ电脑管家提醒您，不建议打开原链接'),_('腾讯网'),_('原链接'),_('搜搜')],
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
			if (UI.B.ie) { //Copy Button
				//黑名单不加“复制”
				var text = (data.info.safe == 2)
							? ''
							: ('<a href="#" onclick="var a=window.clipboardData.setData(\'Text\',this.previousSibling.value),b=this.nextSibling;UI.hide(this);UI.show(b);b.innerHTML=a?\''
									+ _('复制成功')
									+ '\':\''
									+ _('复制失败')
									+ '\';return false">[' + _('复制') + ']</a>');
				url += ' <textarea style="display:none">' + data.info.url
							+ '</textarea>' + text 	+ '<span class="cNote" style="display:none"></span>';
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
MI.SmartBox = function(id,callback,type,style){ //input element,callback,search type (keyword:用户输入的关键字提示,布尔值,可以为空）
	if(!$(id)) return;
	var Self = this,
		delay;
	this._callback = callback?callback:null;
	this._key = $(id);
	this.url = MI.url.smartBox;//smartbx统一服务接口
	this._type = type?type:'';//数据类型
	this._fix = UI.B.ie?[0,0]:[1,2];//用于修复ie，ff下的位置
	this.param = 'key=%key%';
	this._valTip = !!style.type;
	//根据是否客人页，传递不同的参数
	this._query = (MI.guest)
			? UI.html('<span><input type="hidden" id="label" name="label" value="8" /><input type="hidden" id="uname" name="uname" value=' + MI.guest.user + '></span>')[0]
			: UI.html('<span><input type="hidden" id="label" name="label" value="8" /><input type="hidden" id="poster" name="poster" value="2" /></span>')[0];

	this._style = style?style:{left:0,top:0,width:306};
	this._pos = { //获取smartbox input 坐标
		x : UI.getX(this._key),
		y : UI.getY(this._key)
	};

	//初始化smartbox容器
	this._select = UI.html('<div class="smartBox"></div>')[0];
	this._ldrop = $$('#searchForm .btn_ldrop')[0];
	this._list = [];//消息条数
	UI.append(this._select,document.body);
	this._key.blur();
	//Self.hide();
	//右侧搜索框点击小三角，出现历史搜索和订阅搜索
	if(Self._style.history == 1){
		if(Self._ldrop){
			Self._ldrop.onclick = function(e){
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
		delay = setTimeout(function(){
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
			if(Self._valTip){
				for(var n = 0,l = Self._list.length; n < l; n++ ){
					UI.removeClass(Self._list[n],'on');
				}
				if(Self._list[Self.index].id == 'special') { //搜我（TA）的广播需要传递不同于搜全站的参数
					UI.after(Self._query,Self._key);
					this.value = UI.text($$(Self._select,'span')[0]);
				}else{
					UI.remove(Self._query);
					//更改不止一个节点是DT类型的情况
					this.value =(Self._list[Self.index].nodeName == 'DT') ? UI.text($$(Self._list[Self.index],'span')[0]) : UI.text(Self._list[Self.index]);
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
								var s = [];
								//搜全站html
								var total = '<dt class="s">' + _('搜全站：') + '<span index="0" value=\"'+ value +'\">'+value+'</span></dt>'; 
								//搜我的广播html
								var localMy = '<dt class="s" id="special">' + _('搜我的广播： ') + '<span index="1" value=\"'+ value +'\">'+value+'</span></dt>'; 
								//搜他（她）的广播html
								var txt,localHis;
								if(MI.guest){
									txt = _('搜{0}的广播: ',MI.guest.sex);
									localHis = '<dt class="s" id="special">' + txt +'<span index="1" value=\"'
																			+ value
																			+ '\">'
																			+ value
																			+ '</span></dt>';
								}
								if(data.info.length != 0){ //有自动匹配的搜索关键词
									var len = data.info.length;
									Self.indexMax = Self._valTip ? len+1 : len - 1;
									Self.index = -1;
									//我的广播页或者客人页，搜“我的广播”放在第一项
									if (MI.boss == 13 || MI.boss == 7){ 
										if(MI.guest){
											s.push(Self._valTip ? '<dl>' + localHis + total + '<dd><ul>' : '<ul>');
										}
										else
											s.push(Self._valTip ? '<dl>' + localMy + total + '<dd><ul>' : '<ul>');
										UI.each(data.info,function(o,i){
											s.push('<li value=\"'+ o +'\" index="' + (parseInt(i)+1) + '">' + o + '</li>');
										});	
										s.push(Self._valTip? '</ul></dd></dl>' : '</ul>');
									}
									else{ //其它页面，“搜全站”放在第一项
										s.push(Self._valTip ? '<dl>' + total + '<dd><ul>' : '<ul>');
										UI.each(data.info,function(o,i){
											s.push('<li value=\"'+ o +'\" index="' + (parseInt(i)+1) + '">' + o + '</li>');
										});		
										s.push(Self._valTip ? '</ul></dd>' + localMy + '</dl>' : '</ul>');
									}
									if (s.length == 2)
										return;
								}
								else if(Self._valTip && (data.info.length == 0)){ //没有自动匹配的搜索关键词，右侧搜索框也出现“搜全站”和”搜我(他)的广播“
									Self.indexMax = 1;
								    if (MI.boss == 13 || MI.boss == 7){ 
										if(MI.guest){
											s.push('<dl>' + localHis);
										}
										else{
											s.push('<dl>' + localMy);
										}
										s.push(total + '</dl>');
								    }
								    else{
										s.push('<dl>' + total);
										if(MI.guest){
											s.push(localHis + '</dl>');
										}
										else{
											s.push(localMy + '</dl>');
										}
								    }
								}
								Self._select.innerHTML = s.join("");
								if(Self._valTip || (!Self._valTip && Self._select.innerHTML != '')) Self.show();
								Self._list = $$(Self._select,'li');
								if(Self._list == null) //如果没有自动匹配的关键词列表，新建一个数组
									Self._list = []; 
								if(Self._valTip){
									if (MI.boss == 13 || MI.boss == 7){  //如果是广播页或者客人页
										for(var i=1;i>=0;i--)
											Self._list.unshift($$(Self._select,'dt')[i]);
										UI.EA($$(Self._select,'dt')[0],'mousedown',function(){
											UI.after(Self._query,Self._key);
										});
									}
									else{
										Self._list.unshift($$(Self._select,'dt')[0]); //将搜全站放在第一个位置
										Self._list.push($$(Self._select,'dt')[1]); //将搜我（他）的广播放在最后一个位置
										UI.EA($$(Self._select,'dt')[1],'mousedown',function(){
											UI.after(Self._query,Self._key);
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
										Self._key.value = (this.nodeName == 'DT') ? UI.text($$(this,'span')[0]) : UI.text(this);
										UI.A(Self._key,'index',UI.A(this,'index'));
										Self.submit();
									}
								});
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
			
			Self._body.style.cssText = 'top:' + (UI.getY(el) + UI.height(el) + 3 - Self.scrollHack(el)) + 'px;left:' + (UI.getX(el) - 1) + 'px';
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
							match.push(users[i].replace(reg,'<b>' + RegExp.$1 + '</b>') + ' (' + i.replace(reg,'<b>' + RegExp.$1 + '</b>') + ')' + ((i.substr(0,1)=="*") ? '<em class="ico_qGroup"></em>' : ''));						    
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
							match.push(users[i].replace(regAll,'<b>' + RegExp.$1 + '</b>') + ' (' + i.replace(regAll,'<b>' + RegExp.$1 + '</b>') + ')' + ((i.substr(0,1)=="*") ? '<em class="ico_qGroup"></em>' : ''));
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
	scrollHack : function(el){
		return UI.scrollY(el) - UI.scrollY() * (UI.B.safari && !UI.B.ipad ? 2 : 1);
	},
	position : function(){
		var x,y;
		if (!this.display) {
			if (this.key) {
				x = UI.getX(this._cursor) - 12;
				y = UI.getY(this._cursor) - this._target.scrollTop - this.scrollHack(this._cursor) + 26;
			}
			else {
				x = UI.getX(this._target);
				y = UI.getY(this._target) + UI.height(this._target) - 1;
			}
			if (this.minWidth && UI.width(this._body) <= this.minWidth) {
				this._body.style.width = this.minWidth + 'px';
			}
			if (this.maxWidth && UI.width(this._body) > this.maxWidth) {
				this._body.style.width = this.maxWidth + 'px';
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
	var html = o.tmpl || '<div class="D">' + (UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"></div><div class="CR"><div class="DWrap"><div class="DTitle"></div><a title="' + _('关闭') + '" class="DClose close" href="#">' + _('关闭') + '</a><div class="DLoad"></div><div class="DCont"></div></div></div></div></div>';
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
		Self.recom = new MI.Recom('recom');
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
		var type,talkId = '';
		if (Self.chName && Self.chName.match(/^[^\d]/g)){
			//对话某人
			replyBox.topic = '@' + Self.chName + ' ';
			type = null;
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
		recomBox.recomAccount = Self.account; 
		Self.recom.show({cont:_('#推荐收听# {0} 是个挺有趣的人，大家快来强势围观吧。','@'+Self.account),
				title:_('把 <b>{0}</b> 介绍给大家:',Self.bkname || Self.name)});
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
	baseUrl:'http://t.qq.com',		// 根URL 如：http://t.qq.com
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
			url = Self.baseUrl + '/' + account,
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
			var notSelf = Self.account.toLocaleLowerCase() != MI.user.account.toLocaleLowerCase(),
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
			MI.Bos('btnCardOpen',Self.cType,0.01);
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
MI.Card.hide = function(){
	clearTimeout(MI.Card.delay);
	clearTimeout(MI.Card.hideCard);
	MI.Card.hideCard = setTimeout(function(){    //鼠标离开头像，滑向选项卡过程中会触发mouseout事件，所以做延迟处理
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
		if (UI.B.mac){ //修正Mac滚动条宽度
			rightFix += 2;
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

})();