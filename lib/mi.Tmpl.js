MI.Tmpl = {};

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
var V1='talk[i].source',V2='info.source',V3='<div class="SA"><em>◆</em><span>◆</span></div>',V5=' href="#"',V6=' onerror="MI.Pic(this,50)"',V7=' title="<%=(talk[i].bkname||talk[i].nick).toTitle()%>(@<%=talk[i].chName || talk[i].name%>)"',V8=(window.MILang=="en_US") ? 'en/' : '';
MI.tmpl.listAll = '<%var shield=shield;D=MI.TalkList.date,API=MI.api.type?"?apiType="+MI.api.type:"";for(var i=0,n=talk.length;i<n;i++){\
		var sid=talk[i].id,numAll,numRelay,numComt,numRelay2;numRelay=talk[i].counts[0]||0;numComt=talk[i].counts[1]||0;numRelay2=talk[i].counts[2]||0;\
		if('+V1+'){sid='+V1+'.id;numRelay='+V1+'.counts[0]||0;numComt='+V1+'.counts[1]||0;}\
		numAll=numRelay+numComt;%><li id="<%=talk[i].id%>"<%if(fav){%> fav="<%=talk[i].favortimestamp%>"<%}%> <%if(shield){%> shield="<%=talk[i].shield%>"<%}%> rel="<%=talk[i].timestamp%>" <%if(talk[i].qinfo){%>wqid="<%=talk[i].qinfo.wqid%>"<%}%>>\
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
			<div class="msgBox"><%\
				if(fav && !UI.isUndefined(talk[i].groupid) && talk[i].groupname){%>\
					<div class="selectCls"><a href="#" class="popupDropBtn" msgid="<%=talk[i].id%>"  groupid="<%=talk[i].groupid%>"><span><%=talk[i].groupname%></span><em class="btn_ldrop"></em></a></div><%}%>\
				<div class="userName" rel="<%=talk[i].name%>"><strong><a href="http://t.qq.com/<%=talk[i].name%>"'+V7+'><%=talk[i].bkname||talk[i].nick%></a>'+MIIcon('talk[i].flag')+'<%=talk[i].icon%><%if((!'+V1+' || talk[i].type==5) && talk[i].type!=8){%>:<%}%></strong><%if('+V1+' && talk[i].type==2){%>' + _('转播') + ':&nbsp;<%}else if('+V1+' && talk[i].type==7){%>' + _('评论') + ':&nbsp;<%}else if('+V1+' && (talk[i].type==4)){%>' + _('对') + '<strong class="userTo"><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)"><%='+V1+'.bkname||'+V1+'.nick%></a>'+MIIcon(V1+'.flag')+'' + _('说') + ':<%}%></strong>\
				</div>\
				<div class="msgCnt"><%=talk[i].content||"&nbsp;"%><%if(talk[i].tran>0){\
					%><a class="btn_trans" href="#">[' + _('译') + ']</a><%\
				}%></div>\
				<%var Image=talk[i].image && talk[i].image.length,Videos=talk[i].videos && talk[i].videos.length,Music=talk[i].music && talk[i].music.length,Mlist=talk[i].mlist,Vote=talk[i].vote && talk[i].vote.length,File=talk[i].file && talk[i].file.length;if(Image || Videos || Music || Mlist || Vote || File){%><div class="mediaWrap">\
					<%if(Vote || !(Image || Videos || Music || Mlist || File)){%>\
						<div class="videoBox voteBox" realurl="http://vote.t.qq.com/vote/vote.php?relay&msgid=<%=talk[i].id%>&id=<%=talk[i].vote[0].realUrl%>&u=<%=talk[i].name%>&type=<%=talk[i].vote[0].type%>&result=yes&tpl=mini" shorturl="http://url.cn/<%=talk[i].vote[0].shortUrl%>" realtitle="<%=talk[i].vote[0].title%>">\
							<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="http://vote.t.qq.com/vote/vote.php?id=<%=encodeURI(talk[i].vote[0].realUrl)%>&u=<%=talk[i].name%>&type=<%=talk[i].vote[0].type%>" class="vUrl" target="_blank"><em></em><%if(talk[i].vote[0].title){%><%=MI.string.cut(talk[i].vote[0].title,40)%><%}%></a></div>\
							<div class="vWrap"><a href="#" class="vtThumbs"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/' + V8 + 'voteResulte.png" /></a></div>\
						</div>\
					<%}%>\
					<%if(Image){%>\
						<%for(var j=0;j<talk[i].image.length;j++){%>\
							<div class="picBox"><a href="<%=talk[i].image[j]%>/460" class="pic"><img class="crs" show="1" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/' + V8 + 'vT.png<%}else{%><%=talk[i].image[j]%>/160<%}%>"></a></div>\
						<%}%>\
					<%}%>\
					<%if(Videos){%>\
						<div class="videoBox" realurl="<%=talk[i].videos[0].realUrl%>" playurl="<%=talk[i].videos[0].playerUrl%>" minipicurl="<%=talk[i].videos[0].miniPicUrl%>" shorturl="<%=talk[i].videos[0].shortUrl%>" reltitle="<%=talk[i].videos[0].title%>">\
							<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="<%=encodeURI(talk[i].videos[0].realUrl)%>" class="vUrl" target="_blank"><em></em><%if(talk[i].videos[0].title){%><%=MI.string.cut(talk[i].videos[0].title,40)%><%}%></a></div>\
							<div class="vWrap" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>"><a href="#" class="vThumbsBox"><span class="vThumbs"><span class="mask"><em></em></span><img class="crs" show="1" crs="<%=talk[i].videos[0].miniPicUrl%>" /></span><span class="vSimple"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/' + V8 + 'vSimple.png" /></span></a></div>\
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
							<div class="mBoxNew"></div>\
						</div>\
					<%}%>\
					<%if(Mlist){%>\
						<div class="musicAlbum" mlistUin="<%=Mlist.mlistUin%>" mlistPic="<%=Mlist.mlistPic%>" mlistUrl="<%=Mlist.mlistUrl%>" mlistName="<%=Mlist.mlistName%>" mlistCnt="<%=Mlist.mlistCnt%>">\
							<div class="albumPic"><a href="#"><span class="albumBar"><em></em></span><img src="<%=Mlist.mlistPic%>"></a></div>\
							<div class="albumInfo">\
								<div class="songTit"><a href="#" onclick="return false"><%=Mlist.mlistName%></a></div>\
								<div class="f">' + _('共{0}首曲目','<%=Mlist.mlistCnt%>') + '</div>\
								<a class="mThumbsBox" href="#" onclick="return false"><em class="ico_audios"></em></a>\
							</div>\
							<div class="mBoxNew"></div>\
						</div>\
					<%}%>\
					<%if(File){%>\
						<div class="fileBox" id="<%=encodeURI(talk[i].file[0].uriId)%>" rel="<%=encodeURI(talk[i].file[0].fileName)%>" qid="<%=talk[i].file[0].wqid%>" sz=""><em class="ico_file"></em><span class="fileName"><%=talk[i].file[0].fileName%></span><a href="http://t.qq.com/download.php?fkey=<%=talk[i].file[0].uriId%>&qid=<%=talk[i].file[0].wqid%>&ftype=<%=talk[i].file[0].ftype%>" class="download" target="_blank">进入下载页面</a></div>\
					<%}%>\
				</div><%}%>\
				<%=(talk[i].rich && talk[i].rich.html ? talk[i].rich.html : "")%>\
				<%if('+V1+' && (talk[i].type==2 || talk[i].type==7 || talk[i].type==4)){%>\
					<div class="replyBox">\
						<div class="msgBox">\
							<%if('+V1+'.status==1){%>\
								<div class="noMSource">' + _('内容已删除。') + '</div><a target="_blank" style="display:none" href="#" class="zfNum">(<b class="relayNum"></b>)</a>\
							<%}else if('+V1+'.status==3){%>\
								<div class="noMSource">' + _('对不起，原文已经被作者删除。') + '</div><a target="_blank" style="display:none" href="#" class="zfNum">(<b class="relayNum"></b>)</a>\
							<%}else{%>\
								<div class="msgCnt"><strong><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)"><%='+V1+'.bkname||'+V1+'.nick%></a>'+MIIcon(V1+'.flag')+'<%='+V1+'.icon%><%if(!'+V1+'.source){%>:<%}%></strong><%if('+V1+'.source && ('+V1+'.type==4 || '+V1+'.type==5)){%><em class="userTo">' + _('对') + '</em><strong class="userTo"><a href="http://t.qq.com/<%='+V1+'.source.name%>" title="<%=('+V1+'.source.bkname||'+V1+'.source.nick).toTitle()%>(@<%='+V1+'.source.chName || '+V1+'.source.name%>)"><%='+V1+'.source.bkname||'+V1+'.source.nick%></a>'+MIIcon(V1+'.source.flag')+'' + _('说') + ':<%}%></strong>\<%='+V1+'.content%><%if('+V1+'.tran>0){\
									%><a class="btn_trans" href="#">[' + _('译') + ']</a><%\
								}%></div>\
								<%var Image='+V1+'.image && '+V1+'.image.length,Videos='+V1+'.videos && '+V1+'.videos.length,Music='+V1+'.music && '+V1+'.music.length,Mlist='+V1+'.mlist,Vote='+V1+'.vote && '+V1+'.vote.length,File='+V1+'.file && '+V1+'.file.length;if(Image || Videos || Music || Mlist || Vote || File){%><div class="mediaWrap">\
									<%if(Vote || !(Image || Videos || Music || Mlist || File)){%>\
										<div class="videoBox voteBox" realurl="http://vote.t.qq.com/vote/vote.php?relay&msgid=<%='+V1+'.id%>&id=<%='+V1+'.vote[0].realUrl%>&u=<%='+V1+'.name%>&type=<%='+V1+'.vote[0].type%>&result=yes&tpl=mini" shorturl="http://url.cn/<%='+V1+'.vote[0].shortUrl%>" realtitle="<%='+V1+'.vote[0].title%>">\
											<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="http://vote.t.qq.com/vote/vote.php?id=<%=encodeURI('+V1+'.vote[0].realUrl)%>&u=<%='+V1+'.name%>&type=<%='+V1+'.vote[0].type%>" class="vUrl" target="_blank"><em></em><%if('+V1+'.vote[0].title){%><%=MI.string.cut('+V1+'.vote[0].title,40)%><%}%></a></div>\
											<div class="vWrap"><a href="#" class="vtThumbs"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/' + V8 + 'voteResulte.png" /></a></div>\
										</div>\
									<%}%>\
									<%if(Image){%>\
											<%for(var j=0;j<'+V1+'.image.length;j++){%>\
												<div class="picBox"><a href="<%='+V1+'.image[j]%>/460" class="pic"><img class="crs" crs="<%if(iconPic){%>http://mat1.gtimg.com/www/mb/images/' + V8 + 'vT.png<%}else{%><%='+V1+'.image[j]%>/160<%}%>"></a></div>\
											<%}%>\
									<%}%>\
									<%if(Videos){%>\
										<div class="videoBox" realurl="<%='+V1+'.videos[0].realUrl%>" playurl="<%='+V1+'.videos[0].playerUrl%>" minipicurl="<%='+V1+'.videos[0].miniPicUrl%>" shorturl="<%='+V1+'.videos[0].shortUrl%>" reltitle="<%='+V1+'.videos[0].title%>">\
											<div class="vTools"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="<%=encodeURI('+V1+'.videos[0].realUrl)%>" class="vUrl" target="_blank"><em></em><%if('+V1+'.videos[0].title){%><%=MI.string.cut('+V1+'.videos[0].title,40)%><%}%></a></div>\
											<div class="vWrap" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>"><a href="#" class="vThumbsBox" ><span class="vThumbs"><span class="mask"><em></em></span><img class="crs" crs="<%='+V1+'.videos[0].miniPicUrl%>" /></span><span class="vSimple"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/' + V8 + 'vSimple.png" /></span></a></div>\
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
											<div class="mBoxNew"></div>\
										</div>\
									<%}%>\
									<%if(Mlist){%>\
										<div class="musicAlbum" mlistUin="<%=Mlist.mlistUin%>" mlistPic="<%=Mlist.mlistPic%>" mlistUrl="<%=Mlist.mlistUrl%>" mlistName="<%=Mlist.mlistName%>" mlistCnt="<%=Mlist.mlistCnt%>">\
											<div class="albumPic"><a href="#"><span class="albumBar"><em></em></span><img src="<%=Mlist.mlistPic%>"></a></div>\
											<div class="albumInfo">\
												<div class="songTit"><a href="#" onclick="return false"><%=Mlist.mlistName%></a></div>\
												<div class="f">' + _('共{0}首曲目','<%=Mlist.mlistCnt%>') + '</div>\
												<a class="mThumbsBox" href="#" onclick="return false"><em class="ico_audios"></em></a>\
											</div>\
											<div class="mBoxNew"></div>\
										</div>\
									<%}%>\
									<%if(File){%>\
										<div class="fileBox" id="<%=encodeURI('+V1+'.file[0].uriId)%>" rel="<%=encodeURI('+V1+'.file[0].fileName)%>" qid="<%='+V1+'.file[0].wqid%>" sz=""><em class="ico_file"></em><span class="fileName"><%='+V1+'.file[0].fileName%></span><a href="http://t.qq.com/download.php?fkey=<%='+V1+'.file[0].uriId%>&qid=<%='+V1+'.file[0].wqid%>&ftype=<%='+V1+'.file[0].ftype%>" class="download" target="_blank">进入下载页面</a></div>\
									<%}%>\
								</div><%}%>\
								<%=('+V1+'.rich && '+V1+'.rich.html ? '+V1+'.rich.html : "")%>\
								<%if('+V1+' && '+V1+'.gps && '+V1+'.gps.address && '+V1+'.gps.pos){%>\
									<div class="areaInfo"><em title="' + _('地理位置') + '" class="ico_area"></em><span><%='+V1+'.gps.address%></span> - <a pos="<%='+V1+'.gps.pos%>" merchant="<%='+V1+'.gps.merchant%>"  address="<%='+V1+'.gps.address%>" href="#">' + _('地图展示') + '</a></div>\
								<%}%>\
								<div class="pubInfo"><span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" <%if(MI.user.fun.btnStyle!=6){%>href="http://t.qq.com/p/t/<%=sid+API%>" target="_blank"<%}%>><%='+V1+'.time%></a> <%='+V1+'.from%><%if('+V1+'.city){%> <%='+V1+'.city%><%}%><%if(1 && '+V1+' && numAll){if(MI.user.account){%>\
									 <a href="/p/t/<%=sid%>" class="zfNum" target="_blank">' + _('全部转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</a>\
								<%}else{%>\
									 <em class="zfNum">' + _('全部转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</em>\
								<%}}%></span></div>\
							<%}%>\
						</div>\
					</div>\
				<%}%>\
				<%if(talk[i].gps && talk[i].gps.address && talk[i].gps.pos){%>\
						<div class="areaInfo"><em title="' + _('地理位置') + '" class="ico_area"></em><span><%=talk[i].gps.address%></span> - <a pos="<%=talk[i].gps.pos%>" merchant="<%=talk[i].gps.merchant%>" address="<%=talk[i].gps.address%>" href="#">' + _('地图展示') + '</a></div>\
				<%}%>\
				<div class="pubInfo"><span class="left"><%if(MI.user.fun.btnStyle==6 || talk[i].type==8){\
						%><em class="time"><%=talk[i].time%></em><%\
					}else{\
						%><a class="time" href="http://t.qq.com/p/t/<%=talk[i].id+API%>" target="_blank"><%=talk[i].time%></a><%\
					}%> <%=talk[i].from%><%if(talk[i].city){%> <%=talk[i].city%><%}%><%if(!'+V1+' && numAll){if(MI.user.account){%>\
					 <a href="/p/t/<%=talk[i].id%>" class="zfNum" target="_blank">' + _('全部转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</a><%}else{%>\
					 <em class="zfNum">' + _('全部转播和评论') + '(<b class="relayNum"><%=numAll%></b>)</em><%}}%><%if(talk[i].type == 2 && numRelay2){%>\
						<%if(talk[i].timestamp > 1309400000 || (talk[i].timestamp > 1306860000 && numRelay2 > 10)){\
							%> <a href="/p/t/<%=talk[i].id%>" target="_blank" class="zfNum2" title="<%=(talk[i].bkname||talk[i].nick).toTitle()%> ' + _('转播后引发的转播次数') + '">' + _('该条转播') + '(<b class="relayNum"><%=numRelay2%></b>)</a><%\
						}\
						else{\
							%> <em class="zfNum2" title="<%=(talk[i].bkname||talk[i].nick).toTitle()%> ' + _('转播后引发的转播次数') + '">' + _('该条转播') + '(<b class="relayNum"><%=numRelay2%></b>)</em><%\
						}%>\
					<%}%><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%>\
					<a class="view" href="http://t.qq.com/p/r/<%=talk[i].id%>">' + _('查看对话') + '</a><%}%><%if(MI.user.fun.fastReport == 1 && (talk[i].type == 2 || talk[i].type == 7) && talk[i].name != MI.user.account && '+V1+'.name == MI.user.account){%> <a'+V5+' class="alarm">' + _('删除') + '</a><%}%></span><div class="funBox">\
						<%if(MI.user.account && talk[i].type != 8){\
							if(MI.user.fun.btnStyle!=6){%><a'+V5+' class="relay" num="<%=numRelay%>">' + _('转播') + '</a><span>|</span><%}\
							if(MI.user.fun.btnStyle==5||MI.user.fun.btnStyle==6){\
								%><a href="/p/t/<%=sid%>" class="comt">' + _('评论') + '</a><%\
							}else if(MI.user.fun.btnStyle==1 || (MI.user.fun.btnReply && talk[i].type==4)){\
								%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><a'+V5+' class="delBtn">' + _('删除') + '</a><%}else{%><a'+V5+' class="reply">' + _('对话') + '</a><%}}%><%\
							}else{\
								%><a href="/p/t/<%=sid%>" class="comt" num="<%=numComt%>">' + _('评论') + '</a><%\
							}%><span>|</span><%\
							if(MI.user.fun.btnStyle!=6){%><div class="mFun"><a href="#">' + _('更多') + '<em class="btn_ldrop"></em></a><div class="mFunDrop"><b></b><b class="mask"></b>\
								<%if(MI.user.fun.btnStyle==1 || (MI.user.fun.btnReply && talk[i].type==4)){\
									%><p><a href="/p/t/<%=sid%>" class="comt" num="<%=numComt%>">' + _('评论') + '</a></p><%\
								}else if(MI.user.fun.btnStyle==6 || MI.user.fun.btnStyle==5){\
									%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name || MI.user.qunAdmin){%><p><a'+V5+' class="delBtn">' + _('删除') + '</a></p><%}}%><%\
								}else{\
									%><%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name){%><p><a'+V5+' class="delBtn">' + _('删除') + '</a></p><%}else{%><p><a'+V5+' class="reply">' + _('对话') + '</a></p><%}}%><%\
								}%><%if(MI.user.fun.btnStyle!=6){%>\
									<p><a'+V5+' class="fav<%if(fav){%> light<%}%>"><%if(fav){%>' + _('取消') + '<%}%>' + _('收藏') + '</a></p>\
									<%if(MI.user.fun.btnStyle!=5) {%>\
									<div class="shareBtn">\
										<p><a href="#">' + _('分享') + '</a></p>\
									</div><%}%>\
									<%if(MI.user.fun.shield==1){%><p><a'+V5+' class="shield<%if(shield){%> light<%}%>"><%if(shield){%>' + _('取消屏蔽') + '<%\
									} else{\
										%>' + _('屏蔽@提醒') + '<%}%>' + '</a></p><%}%>\
									<p><a href="http://t.qq.com/p/t/<%=talk[i].id+API%>" class="detail" target="_blank">' + _('详情') + '</a></p><%}%>\
									<%if(MI.user.fun.uptop && talk[i].name == MI.user.account){%><p><a href="#" class="upTop">'+_("置顶")+'</a></p><%}%>\
								<%if(MI.user.fun.report && talk[i].name != MI.user.account){%><p><a'+V5+' class="alarm">' + _('举报') + '</a></p><%}%>\
							</div>\
						</div>\
							<%}else{%>\
								<%if(MI.user){if((!guest || guest == MI.user.account) && MI.user.account==talk[i].name || MI.user.qunAdmin){%><a'+V5+' class="delBtn">' + _('删除') + '</a><%}}%>\
								<%if(MI.user.fun.report && talk[i].name != MI.user.account){%><%if(MI.user.qunAdmin){%><span>|</span><%}%><a'+V5+' class="alarm">' + _('举报') + '</a><%}}%>\
						<%}%>\
					</div>\
				</div>\
				<%var at=talk[i].at, atNum=talk[i].atNum;if(talk[i].atAll && talk[i].atAll > 1){%>\
					<div class="tipsBox1 at_detail">\
						<a href="#" rel="0" <%=(atNum[0]?"num=" + atNum[0] + "":"")%>>全部提到我的<em <%=(at[0]?"":"class=checked")%>><%=(at[0] ? "(+" + at[0] + ")" : atNum[0] ? "(" + atNum[0] + ")" : "" )%></em></a> |\
						<a href="#" rel="1">收听的人<em><%=(at[1] ? "(+" + at[1] + ")" : "")%></em></a> |\
						<a href="#" rel="2">认证用户<em><%=(at[2] ? "(+" + at[2] + ")" : "")%></em></a>\
					</div>\
				<%}%>\
				<%if(0 && '+V1+' && talk[i].type==4){\
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
})();
MI.tmpl.face = '<div class="faceWrap" style="display:none">\
	<div class="musicTab"><ul>\
		<li class="select"><b>' + _('默认表情') + '</b></li>\
		<li<%\
		if(window.MILang=="en_US"){\
		   %> style="display:none"<%\
		}%>><a href="#">' + _('卡通表情') + '</a></li></li>\
	</ul><a href="#" class="close" title="' + _('关闭') + '"></a></div>\
	<div class="faceBox">\
		<div class="faceCell">\
			<div class="dFace">\
				<div><a href="#" class="f14" title="' + _('微笑') + '"></a><a href="#" class="f1" title="' + _('撇嘴') + '"></a><a href="#" class="f2" title="' + _('色') + '"></a><a href="#" class="f3" title="' + _('发呆') + '"></a><a href="#" class="f4" title="' + _('得意') + '"></a><a href="#" class="f5" title="' + _('流泪') + '"></a><a href="#" class="f6" title="' + _('害羞') + '"></a><a href="#" class="f7" title="' + _('闭嘴') + '"></a><a href="#" class="f8" title="' + _('睡') + '"></a><a href="#" class="f9" title="' + _('大哭') + '"></a><a href="#" class="f10" title="' + _('尴尬') + '"></a><a href="#" class="f11" title="' + _('发怒') + '"></a><a href="#" class="f12" title="' + _('调皮') + '"></a><a href="#" class="f13" title="' + _('呲牙') + '"></a><a href="#" class="f0" title="' + _('惊讶') + '"></a><a href="#" class="f15" title="' + _('难过') + '"></a><a href="#" class="f16" title="' + _('酷') + '"></a><a href="#" class="f96" title="' + _('冷汗') + '"></a><a href="#" class="f18" title="' + _('抓狂') + '"></a><a href="#" class="f19" title="' + _('吐') + '"></a><a href="#" class="f20" title="' + _('偷笑') + '"></a><a href="#" class="f21" title="' + _('可爱') + '"></a><a href="#" class="f22" title="' + _('白眼') + '"></a><a href="#" class="f23" title="' + _('傲慢') + '"></a><a href="#" class="f24" title="' + _('饥饿') + '"></a><a href="#" class="f25" title="' + _('困') + '"></a><a href="#" class="f26" title="' + _('惊恐') + '"></a><a href="#" class="f27" title="' + _('流汗') + '"></a><a href="#" class="f28" title="' + _('憨笑') + '"></a><a href="#" class="f29" title="' + _('大兵') + '"></a><a href="#" class="f30" title="' + _('奋斗') + '"></a><a href="#" class="f31" title="' + _('咒骂') + '"></a><a href="#" class="f32" title="' + _('疑问') + '"></a><a href="#" class="f33" title="' + _('嘘') + '"></a><a href="#" class="f34" title="' + _('晕') + '"></a><a href="#" class="f35" title="' + _('折磨') + '"></a><a href="#" class="f36" title="' + _('衰') + '"></a><a href="#" class="f37" title="' + _('骷髅') + '"></a><a href="#" class="f38" title="' + _('敲打') + '"></a><a href="#" class="f39" title="' + _('再见') + '"></a><a href="#" class="f97" title="' + _('擦汗') + '"></a><a href="#" class="f98" title="' + _('抠鼻') + '"></a><a href="#" class="f99" title="' + _('鼓掌') + '"></a><a href="#" class="f100" title="' + _('糗大了') + '"></a><a href="#" class="f101" title="' + _('坏笑') + '"></a><a href="#" class="f102" title="' + _('左哼哼') + '"></a><a href="#" class="f103" title="' + _('右哼哼') + '"></a><a href="#" class="f104" title="' + _('哈欠') + '"></a><a href="#" class="f105" title="' + _('鄙视') + '"></a><a href="#" class="f106" title="' + _('委屈') + '"></a><a href="#" class="f107" title="' + _('快哭了') + '"></a><a href="#" class="f108" title="' + _('阴险') + '"></a><a href="#" class="f109" title="' + _('亲亲') + '"></a><a href="#" class="f110" title="' + _('吓') + '"></a><a href="#" class="f111" title="' + _('可怜') + '"></a><a href="#" class="f112" title="' + _('菜刀') + '"></a><a href="#" class="f89" title="' + _('西瓜') + '"></a><a href="#" class="f113" title="' + _('啤酒') + '"></a><a href="#" class="f114" title="' + _('篮球') + '"></a><a href="#" class="f115" title="' + _('乒乓') + '"></a><a href="#" class="f60" title="' + _('咖啡') + '"></a><a href="#" class="f61" title="' + _('饭') + '"></a><a href="#" class="f46" title="' + _('猪头') + '"></a><a href="#" class="f63" title="' + _('玫瑰') + '"></a><a href="#" class="f64" title="' + _('凋谢') + '"></a><a href="#" class="f116" title="' + _('示爱') + '"></a><a href="#" class="f66" title="' + _('爱心') + '"></a><a href="#" class="f67" title="' + _('心碎') + '"></a><a href="#" class="f53" title="' + _('蛋糕') + '"></a><a href="#" class="f54" title="' + _('闪电') + '"></a><a href="#" class="f55" title="' + _('炸弹') + '"></a><a href="#" class="f56" title="' + _('刀') + '"></a><a href="#" class="f57" title="' + _('足球') + '"></a><a href="#" class="f117" title="' + _('瓢虫') + '"></a><a href="#" class="f59" title="' + _('便便') + '"></a><a href="#" class="f75" title="' + _('月亮') + '"></a><a href="#" class="f74" title="' + _('太阳') + '"></a><a href="#" class="f69" title="' + _('礼物') + '"></a><a href="#" class="f49" title="' + _('拥抱') + '"></a><a href="#" class="f76" title="' + _('强') + '"></a><a href="#" class="f77" title="' + _('弱') + '"></a><a href="#" class="f78" title="' + _('握手') + '"></a><a href="#" class="f79" title="' + _('胜利') + '"></a><a href="#" class="f118" title="' + _('抱拳') + '"></a><a href="#" class="f119" title="' + _('勾引') + '"></a><a href="#" class="f120" title="' + _('拳头') + '"></a><a href="#" class="f121" title="' + _('差劲') + '"></a><a href="#" class="f122" title="' + _('爱你') + '"></a><a href="#" class="f123" title="NO"></a><a href="#" class="f124" title="OK"></a><a href="#" class="f42" title="' + _('爱情') + '"></a><a href="#" class="f85" title="' + _('飞吻') + '"></a><a href="#" class="f43" title="' + _('跳跳') + '"></a><a href="#" class="f41" title="' + _('发抖') + '"></a><a href="#" class="f86" title="' + _('怄火') + '"></a><a href="#" class="f125" title="' + _('转圈') + '"></a><a href="#" class="f126" title="' + _('磕头') + '"></a><a href="#" class="f127" title="' + _('回头') + '"></a><a href="#" class="f128" title="' + _('跳绳') + '"></a><a href="#" class="f129" title="' + _('挥手') + '"></a><a href="#" class="f130" title="' + _('激动') + '"></a><a href="#" class="f131" title="' + _('街舞') + '"></a><a href="#" class="f132" title="' + _('献吻') + '"></a><a href="#" class="f133" title="' + _('左太极') + '"></a><a href="#" class="f134" title="' + _('右太极') + '"></a></div>\
			</div>\
			<div class="pFace">\
				<div><a href="#" title="' + _('红包') + '" class="f151"></a><a href="#" title="' + _('喜糖') + '" class="f150"></a><a href="#" title="' + _('百合花') + '" class="f138"></a><a href="#" title="' + _('黄丝带') + '" class="f137"></a><a href="#" title="' + _('祈福') + '" class="f136"></a><a href="#" title="' + _('黑丝带') + '" class="f135"></a><a href="#" title="' + _('月饼') + '" class="f152"></a><a href="#" title="' + _('酒') + '" class="f153"></a><a href="#" title="' + _('团圆饼') + '" class="f154"></a><a href="#" title="' + _('玉兔') + '" class="f155"></a><a href="#" title="' + _('蛋黄月饼') + '" class="f156"></a></div>\
			</div>\
		</div>\
	</div>\
	<div class="faceBox" style="display:none">\
		<div class="faceCell cFace1" style="">\
			<dl fold="cFace/p" class="fline2"><dt>' + _('boto') + '</dt><dd><a href="#" title="' + _('嗨') + '"></a><a href="#" title="' + _('OK') + '"></a><a href="#" title="' + _('疑问') + '"></a><a href="#" title="' + _('崩溃') + '"></a><a href="#" title="' + _('不说') + '"></a><a href="#" title="' + _('吃饭') + '"></a><a href="#" title="' + _('吃惊') + '"></a><a href="#" title="' + _('吃西瓜') + '"></a><a href="#" title="' + _('飞吻') + '"></a><a href="#" title="' + _('揪花') + '"></a><a href="#" title="' + _('泡泡糖') + '"></a><a href="#" title="' + _('忍') + '"></a><a href="#" title="' + _('生闷气') + '"></a><a href="#" title="' + _('叹气') + '"></a><a href="#" title="' + _('调皮') + '"></a><a href="#" title="' + _('偷看') + '"></a><a href="#" title="' + _('吐血') + '"></a><a href="#" title="' + _('献花') + '"></a><a href="#" title="' + _('再见') + '"></a><a href="#" title="' + _('抓狂') + '"></a><a href="#" title="' + _('拽脸蛋') + '"></a><a href="#" title="' + _('抛钱') + '" i="25"></a><a href="#" title="' + _('讥笑') + '" i="21"></a><a href="#" title="' + _('怒') + '" i="22"></a><a href="#" title="' + _('听歌') + '" i="23"></a><a href="#" title="' + _('吐槽') + '" i="24"></a></dd></dl>\
			<dl fold="cFace/m" class="fline2"><dt>' + _('张小盒') + '</dt><dd><a href="#" title="' + _('鼻血') + '"></a><a href="#" title="' + _('鄙视') + '"></a><a href="#" title="' + _('得瑟') + '"></a><a href="#" title="' + _('得意') + '"></a><a href="#" title="' + _('点头') + '"></a><a href="#" title="' + _('恶心') + '"></a><a href="#" title="' + _('怒') + '"></a><a href="#" title="' + _('尴尬') + '"></a><a href="#" title="' + _('鼓掌') + '"></a><a href="#" title="' + _('汗') + '"></a><a href="#" title="' + _('惊讶') + '"></a><a href="#" title="' + _('抠鼻') + '"></a><a href="#" title="' + _('雷击') + '"></a><a href="#" title="' + _('闪眼') + '"></a><a href="#" title="' + _('伤心') + '"></a><a href="#" title="' + _('思考') + '"></a><a href="#" title="' + _('挑眉') + '"></a><a href="#" title="' + _('偷笑') + '"></a><a href="#" title="' + _('委屈') + '"></a><a href="#" title="' + _('喜欢') + '"></a><a href="#" title="' + _('羡慕') + '"></a><a href="#" title="' + _('邪恶') + '"></a><a href="#" title="' + _('旋转') + '"></a><a href="#" title="' + _('眨眼') + '"></a><a href="#" title="' + _('找打') + '"></a><a href="#" title="' + _('震惊') + '"></a></dd></dl>\
			<dl fold="cFace/j" class="fline2"><dt>' + _('哎哟熊') + '</dt><dd><a href="#" title="' + _('吃饭') + '"></a><a href="#" title="' + _('飞吻') + '"></a><a href="#" title="' + _('浮云') + '"></a><a href="#" title="' + _('鼓掌') + '"></a><a href="#" title="' + _('害羞了') + '"></a><a href="#" title="' + _('囧') + '"></a><a href="#" title="' + _('纠结') + '"></a><a href="#" title="' + _('开心') + '"></a><a href="#" title="' + _('哭泣') + '"></a><a href="#" title="' + _('晚安') + '"></a><a href="#" title="' + _('汗') + '"></a><a href="#" title="' + _('无奈') + '"></a><a href="#" title="' + _('招手') + '"></a><a href="#" title="' + _('震惊') + '"></a><a href="#" title="' + _('咒骂') + '"></a><a href="#" title="' + _('崩溃') + '"></a><a href="#" title="' + _('泪奔') + '"></a><a href="#" title="' + _('点头') + '"></a><a href="#" title="' + _('激动') + '"></a><a href="#" title="' + _('雷死了') + '"></a><a href="#" title="' + _('流鼻血') + '"></a><a href="#" title="' + _('路过') + '"></a><a href="#" title="' + _('撒欢') + '"></a><a href="#" title="' + _('生日快乐') + '"></a><a href="#" title="' + _('乌鸦') + '"></a><a href="#" title="' + _('摇头') + '"></a></dd></dl>\
		</div>\
		<div class="faceCell cFace2" style="display:none">\
			<dl fold="cFace/i" class="fline2"><dt>' + _('小幺鸡') + '</dt><dd><a href="#" title="' + _('摇晃') + '"></a><a href="#" title="' + _('欢快') + '"></a><a href="#" title="' + _('咖啡') + '"></a><a href="#" title="' + _('热身') + '"></a><a href="#" title="' + _('吓唬') + '"></a><a href="#" title="' + _('吃东西') + '"></a><a href="#" title="' + _('欢迎') + '"></a><a href="#" title="' + _('媚眼') + '"></a><a href="#" title="' + _('呕吐') + '"></a><a href="#" title="' + _('思考') + '"></a><a href="#" title="' + _('奸笑') + '"></a><a href="#" title="' + _('流汗') + '"></a><a href="#" title="' + _('旋转汗') + '"></a><a href="#" title="' + _('冒泡') + '"></a><a href="#" title="' + _('震撼') + '"></a><a href="#" title="' + _('抓沙发') + '"></a><a href="#" title="' + _('舌头') + '"></a><a href="#" title="' + _('心凉') + '"></a><a href="#" title="' + _('害怕') + '"></a><a href="#" title="' + _('流泪') + '"></a><a href="#" title="' + _('冲啊') + '"></a><a href="#" title="' + _('顶') + '"></a><a href="#" title="' + _('疯了') + '"></a><a href="#" title="' + _('老大') + '"></a><a href="#" title="' + _('求你了') + '"></a><a href="#" title="' + _('不要') + '"></a></dd></dl>\
			<dl fold="cFace/b" class="fline2"><dt>' + _('阿囧') + '</dt><dd><a href="#" title="' + _('囧') + '"></a><a href="#" title="' + _('惊') + '"></a><a href="#" title="' + _('大笑') + '"></a><a href="#" title="' + _('闪电') + '"></a><a href="#" title="' + _('再见') + '"></a><a href="#" title="' + _('乌鸦') + '"></a><a href="#" title="' + _('口水') + '"></a><a href="#" title="' + _('飞') + '"></a><a href="#" title="' + _('得意') + '"></a><a href="#" title="' + _('吃') + '"></a><a href="#" title="' + _('走着') + '"></a><a href="#" title="' + _('路过') + '"></a><a href="#" title="' + _('流汗') + '"></a><a href="#" title="' + _('害羞') + '"></a><a href="#" title="' + _('飘') + '"></a><a href="#" title="' + _('睡') + '"></a><a href="#" title="' + _('亲亲') + '"></a><a href="#" title="' + _('晕') + '"></a><a href="#" title="' + _('乱') + '"></a><a href="#" title="' + _('黑脸') + '"></a><a href="#" title="' + _('青筋') + '"></a><a href="#" title="' + _('色') + '"></a><a href="#" title="' + _('烦躁') + '"></a><a href="#" title="' + _('吐') + '"></a><a href="#" title="' + _('难过') + '"></a><a href="#" title="' + _('哭') + '"></a></dd></dl>\
			<dl fold="cFace/k" class="fline2"><dt>' + _('吕查德') + '</dt><dd><a href="#" title="' + _('谄笑') + '"></a><a href="#" title="' + _('得意') + '"></a><a href="#" title="' + _('飞吻') + '"></a><a href="#" title="' + _('尴尬') + '"></a><a href="#" title="' + _('害羞') + '"></a><a href="#" title="' + _('汗') + '"></a><a href="#" title="' + _('惊呆') + '"></a><a href="#" title="' + _('囧') + '"></a><a href="#" title="' + _('哭') + '"></a><a href="#" title="' + _('酷') + '"></a><a href="#" title="' + _('口水') + '"></a><a href="#" title="' + _('媚眼') + '"></a><a href="#" title="' + _('难过') + '"></a><a href="#" title="' + _('色') + '"></a><a href="#" title="' + _('淘气') + '"></a><a href="#" title="' + _('舔舔') + '"></a><a href="#" title="' + _('微笑') + '"></a><a href="#" title="' + _('晕死') + '"></a><a href="#" title="' + _('住嘴') + '"></a><a href="#" title="' + _('抓狂') + '"></a><a href="#" title="' + _('悲催') + '"></a><a href="#" title="' + _('顶起') + '"></a><a href="#" title="' + _('鼓掌') + '"></a><a href="#" title="' + _('呕吐') + '"></a><a href="#" title="' + _('亲亲') + '"></a><a href="#" title="' + _('无厘头') + '"></a></dd></dl>\
		</div>\
		<div class="faceCell cFace3" style="display:none">\
			<dl fold="cFace/h" class="fline2"><dt>' + _('想念熊') + '</dt><dd><a href="#" title="' + _('爱心男') + '"></a><a href="#" title="' + _('爱心女') + '"></a><a href="#" title="' + _('呆') + '"></a><a href="#" title="' + _('放电') + '"></a><a href="#" title="' + _('飞吻') + '"></a><a href="#" title="' + _('可爱') + '"></a><a href="#" title="' + _('哭') + '"></a><a href="#" title="' + _('困') + '"></a><a href="#" title="' + _('帅') + '"></a><a href="#" title="' + _('吐舌') + '"></a><a href="#" title="' + _('想念') + '"></a><a href="#" title="' + _('星星眼') + '"></a><a href="#" title="' + _('抓抓') + '"></a><a href="#" title="' + _('欢乐') + '"></a><a href="#" title="' + _('害羞') + '"></a><a href="#" title="' + _('开心') + '"></a><a href="#" title="' + _('点头') + '"></a><a href="#" title="' + _('哇') + '"></a><a href="#" title="' + _('委屈') + '"></a><a href="#" title="' + _('好棒') + '"></a><a href="#" title="' + _('心动') + '"></a><a href="#" title="' + _('呦') + '"></a><a href="#" title="' + _('祈祷') + '"></a><a href="#" title="' + _('亲你') + '"></a><a href="#" title="' + _('亲亲男') + '"></a><a href="#" title="' + _('亲亲女') + '"></a></dd></dl>\
			<dl fold="cFace/c" class="fline2"><dt>' + _('哎呀猩猩') + '</dt><dd><a href="#" title="' + _('爱心') + '"></a><a href="#" title="' + _('擦汗') + '"></a><a href="#" title="' + _('呲牙') + '"></a><a href="#" title="' + _('大哭') + '"></a><a href="#" title="' + _('大笑') + '"></a><a href="#" title="' + _('发呆') + '"></a><a href="#" title="' + _('激动') + '"></a><a href="#" title="' + _('可爱') + '"></a><a href="#" title="' + _('厉害') + '"></a><a href="#" title="' + _('敲打') + '"></a><a href="#" title="' + _('色') + '"></a><a href="#" title="' + _('生气') + '"></a><a href="#" title="' + _('调皮') + '"></a><a href="#" title="' + _('偷笑') + '"></a><a href="#" title="' + _('吐') + '"></a><a href="#" title="' + _('摇头') + '"></a><a href="#" title="' + _('再见') + '"></a><a href="#" title="' + _('折磨') + '"></a><a href="#" title="' + _('冰冷') + '"></a><a href="#" title="' + _('打望') + '"></a><a href="#" title="' + _('害羞') + '"></a><a href="#" title="' + _('加油') + '"></a><a href="#" title="' + _('囧') + '"></a><a href="#" title="' + _('雷倒') + '"></a><a href="#" title="' + _('潜水') + '"></a><a href="#" title="' + _('疑问') + '"></a></dd></dl>\
			<dl fold="cFace/l" class="fline2"><dt>' + _('炮炮兵') + '</dt><dd><a href="#" title="' + _('哎呀呀') + '"></a><a href="#" title="' + _('吃东西') + '"></a><a href="#" title="' + _('打哈欠') + '"></a><a href="#" title="' + _('大哭') + '"></a><a href="#" title="' + _('大笑') + '"></a><a href="#" title="' + _('大嘴') + '"></a><a href="#" title="' + _('登场') + '"></a><a href="#" title="' + _('疯跳') + '"></a><a href="#" title="' + _('僵尸') + '"></a><a href="#" title="' + _('囧') + '"></a><a href="#" title="' + _('开枪') + '"></a><a href="#" title="' + _('很拽') + '"></a><a href="#" title="' + _('抠鼻屎') + '"></a><a href="#" title="' + _('你好啊') + '"></a><a href="#" title="' + _('真棒') + '"></a><a href="#" title="' + _('喷鼻血') + '"></a><a href="#" title="' + _('扫射') + '"></a><a href="#" title="' + _('杀') + '"></a><a href="#" title="' + _('闪人') + '"></a><a href="#" title="' + _('烧香') + '"></a><a href="#" title="' + _('竖拇指') + '"></a><a href="#" title="' + _('偷笑') + '"></a><a href="#" title="' + _('咸蛋超人') + '"></a><a href="#" title="' + _('晕') + '"></a><a href="#" title="' + _('晕倒') + '"></a><a href="#" title="' + _('再见') + '"></a></dd></dl>\
		</div>\
		<div class="faceCell cFace4" style="display:none">\
			<dl fold="cFace/a" class="fline2"><dt>' + _('魂儿喵喵') + '</dt><dd><a href="#" title="' + _('无辜') + '"></a><a href="#" title="' + _('惊讶') + '"></a><a href="#" title="' + _('开心') + '"></a><a href="#" title="' + _('小哭') + '"></a><a href="#" title="' + _('大哭') + '"></a><a href="#" title="' + _('转眼珠') + '"></a><a href="#" title="' + _('得意') + '"></a><a href="#" title="' + _('汗') + '"></a><a href="#" title="' + _('吐舌') + '"></a><a href="#" title="' + _('顶起') + '"></a><a href="#" title="' + _('不满') + '"></a><a href="#" title="' + _('祈福') + '"></a><a href="#" title="' + _('无语') + '"></a><a href="#" title="' + _('挤胸') + '"></a><a href="#" title="' + _('眼皮跳') + '"></a><a href="#" title="' + _('抛媚眼') + '"></a><a href="#" title="' + _('冷笑') + '"></a><a href="#" title="' + _('飘过') + '"></a><a href="#" title="' + _('龇牙笑') + '"></a><a href="#" title="' + _('大喊') + '"></a><a href="#" title="' + _('吐舌') + '"></a><a href="#" title="' + _('懊悔') + '"></a><a href="#" title="' + _('发言') + '"></a><a href="#" title="' + _('黑眼圈') + '"></a><a href="#" title="' + _('红唇') + '"></a><a href="#" title="' + _('平静') + '"></a></dd></dl>\
			<dl fold="cFace/f" class="fline2"><dt>' + _('唛哩唛哩轰') + '</dt><dd><a href="#" title="' + _('吃西瓜') + '"></a><a href="#" title="' + _('感谢') + '"></a><a href="#" title="' + _('给力') + '"></a><a href="#" title="' + _('鬼脸') + '"></a><a href="#" title="' + _('哈哈') + '"></a><a href="#" title="' + _('汗') + '"></a><a href="#" title="' + _('好吃') + '"></a><a href="#" title="' + _('呼啦圈') + '"></a><a href="#" title="' + _('花痴') + '"></a><a href="#" title="' + _('哭') + '"></a><a href="#" title="' + _('忙碌') + '"></a><a href="#" title="' + _('女王') + '"></a><a href="#" title="' + _('撒花') + '"></a><a href="#" title="' + _('跳舞') + '"></a><a href="#" title="' + _('吐') + '"></a><a href="#" title="' + _('安慰') + '"></a><a href="#" title="' + _('不要') + '"></a><a href="#" title="' + _('打酱油') + '"></a><a href="#" title="' + _('飞吻') + '"></a><a href="#" title="' + _('喝酒') + '"></a><a href="#" title="' + _('泪奔') + '"></a><a href="#" title="' + _('老大') + '"></a><a href="#" title="' + _('潜水') + '"></a><a href="#" title="' + _('求转播') + '"></a><a href="#" title="' + _('沙发') + '"></a><a href="#" title="' + _('偷窥') + '"></a></dd></dl>\
			<dl fold="cFace/n" class="fline2"><dt>' + _('阿狸') + '</dt><dd><a href="#" title="' + _('不公平') + '"></a><a href="#" title="' + _('超人') + '"></a><a href="#" title="' + _('吃饭') + '"></a><a href="#" title="' + _('吃饭去') + '"></a><a href="#" title="' + _('捶桌笑') + '"></a><a href="#" title="' + _('打滚') + '"></a><a href="#" title="' + _('点头') + '"></a><a href="#" title="' + _('喊') + '"></a><a href="#" title="' + _('吼') + '"></a><a href="#" title="' + _('呼啦圈') + '"></a><a href="#" title="' + _('欢呼') + '"></a><a href="#" title="' + _('揪耳朵') + '"></a><a href="#" title="' + _('渴望') + '"></a><a href="#" title="' + _('哭泣') + '"></a><a href="#" title="' + _('狂笑') + '"></a><a href="#" title="' + _('赖皮') + '"></a><a href="#" title="' + _('冷') + '"></a><a href="#" title="' + _('挠') + '"></a><a href="#" title="' + _('沙发') + '"></a><a href="#" title="' + _('推眼镜') + '"></a><a href="#" title="' + _('委屈') + '"></a><a href="#" title="' + _('疑问') + '"></a><a href="#" title="' + _('嘘嘘') + '"></a><a href="#" title="' + _('摇晃') + '"></a><a href="#" title="' + _('转圈哭') + '"></a><a href="#" title="' + _('追跑') + '"></a></dd></dl>\
		</div>\
		<div class="faceCell cFace5" fold="cFace" style="display:none">\
			<dl fold="cFace/e" class="fline2"><dt>' + _('大眼鼓') + '</dt><dd><a href="#" title="' + _('大笑') + '"></a><a href="#" title="' + _('点点') + '"></a><a href="#" title="' + _('鬼脸') + '"></a><a href="#" title="' + _('黑眼') + '"></a><a href="#" title="' + _('嘿吼') + '"></a><a href="#" title="' + _('呼啦圈') + '"></a><a href="#" title="' + _('晃悠') + '"></a><a href="#" title="' + _('晃脑') + '"></a><a href="#" title="' + _('挥手') + '"></a><a href="#" title="' + _('金钱眼') + '"></a><a href="#" title="' + _('巨汗') + '"></a><a href="#" title="' + _('抠鼻') + '"></a><a href="#" title="' + _('拉门') + '"></a><a href="#" title="' + _('流鼻血') + '"></a><a href="#" title="' + _('摸手') + '"></a><a href="#" title="' + _('摸头') + '"></a><a href="#" title="' + _('捏脸') + '"></a><a href="#" title="' + _('扭') + '"></a><a href="#" title="' + _('扭腰') + '"></a><a href="#" title="' + _('拍手') + '"></a><a href="#" title="' + _('无辜') + '"></a><a href="#" title="' + _('心光眼') + '"></a><a href="#" title="' + _('摇头') + '"></a><a href="#" title="' + _('影') + '"></a><a href="#" title="' + _('晕') + '"></a><a href="#" title="' + _('眨巴眼') + '"></a></dd></dl>\
			<dl fold="cFace/g" class="fline2"><dt>' + _('细哥细妹') + '</dt><dd><a href="#" title="' + _('害羞') + '"></a><a href="#" title="' + _('坏笑') + '"></a><a href="#" title="' + _('露齿') + '"></a><a href="#" title="' + _('迷茫') + '"></a><a href="#" title="' + _('微笑') + '"></a><a href="#" title="' + _('猥亵') + '"></a><a href="#" title="' + _('爱心') + '"></a><a href="#" title="' + _('大惊') + '"></a><a href="#" title="' + _('大笑') + '"></a><a href="#" title="' + _('发火') + '"></a><a href="#" title="' + _('呵呵') + '"></a><a href="#" title="' + _('可怜') + '"></a><a href="#" title="' + _('流汗') + '"></a><a href="#" title="' + _('难过') + '"></a><a href="#" title="' + _('亲亲') + '"></a><a href="#" title="' + _('挑眉') + '"></a><a href="#" title="' + _('偷笑') + '"></a><a href="#" title="' + _('无视') + '"></a><a href="#" title="' + _('抽烟') + '"></a><a href="#" title="' + _('奋斗') + '"></a><a href="#" title="' + _('抠鼻') + '"></a><a href="#" title="' + _('衰') + '"></a><a href="#" title="' + _('大哭') + '"></a><a href="#" title="' + _('酷') + '"></a><a href="#" title="' + _('流泪') + '"></a><a href="#" title="' + _('疑问') + '"></a></dd></dl>\
			<dl fold="cFace/o"><dt>' + _('几何猫') + '</dt><dd><a href="#" title="' + _('88') + '"></a><a href="#" title="' + _('擦汗') + '"></a><a href="#" title="' + _('龇牙') + '"></a><a href="#" title="' + _('发呆') + '"></a><a href="#" title="' + _('憨笑') + '"></a><a href="#" title="' + _('哭') + '"></a><a href="#" title="' + _('呕吐') + '"></a><a href="#" title="' + _('睡觉') + '"></a><a href="#" title="' + _('委屈') + '"></a><a href="#" title="' + _('喜欢') + '"></a><a href="#" title="' + _('哼哼') + '"></a><a href="#" title="' + _('晕') + '"></a><a href="#" title="' + _('早上好') + '"></a></dd></dl>\
			<dl fold="cFace/d"><dt>' + _('爱心龟') + '</dt><dd><a href="#" title="' + _('懊恼') + '"></a><a href="#" title="' + _('扒鬼脸') + '"></a><a href="#" title="' + _('擦汗') + '"></a><a href="#" title="' + _('吃饭') + '"></a><a href="#" title="' + _('吃惊') + '"></a><a href="#" title="' + _('大笑') + '"></a><a href="#" title="' + _('奋斗') + '"></a><a href="#" title="' + _('归隐') + '"></a><a href="#" title="' + _('哭闹') + '"></a><a href="#" title="' + _('美女') + '"></a><a href="#" title="' + _('藐视') + '"></a><a href="#" title="' + _('跳舞') + '" i="12"></a><a href="#" title="' + _('献花') + '" i="13"></a></dd></dl>\
		</div>\
	</div>\
	<div class="pages" style="display:none"></div>\
	<div class="facePreview" style="display:none"></div>\
</div>';