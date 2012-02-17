/**
 * 极简版
 * @namespace MI.Nano 极简版
 * @constructor
 *			@example
 */
(function(){
var V1='talk[i].source',
	V2='info.source',
	V3='<div class="SA"><em>◆</em><span>◆</span></div>',
	V5=' href="#"',
	V6=' onerror="MI.Pic(this,50)"',
	V7=' title="<%=(talk[i].bkname||talk[i].nick).toTitle()%>(@<%=talk[i].chName || talk[i].name%>)"',
	V8=(window.MILang=="en_US") ? 'en/' : '';
MI.Nano = {
	/**
	 * 存储JS模板
	 * 
	 * @type {Object}
	 *            @example
	 *            MI.tmpl.listAll; //主Timeline
	 *            MI.tmpl.picTool; //图片操作
	 */
	tmpl : {
		listAll : 
			'<%var source = null;for (var i=0;i<talk.length;i++){%><li class="clear talkListItem" id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>" <%if(talk[i].favortimestamp){%>fav=<%=talk[i].favortimestamp%><%}%>><%\
				source = talk[i].source && talk[i].source.id ? talk[i].source : null;var sid=talk[i].id;\
				if(talk[i].source){sid=talk[i].source.id;}\
				%><div class="userPic"><a'+V7+' href="/<%=talk[i].name%>"><img src="<%=talk[i].pic%>" onerror="MI.Pic(this,50)"/></a></div>\
				<div class="msgBox">\
					<div class="msgCnt"><strong><a'+V7+' href="/<%=talk[i].name%>"><%=talk[i].bkname||talk[i].nick%></a><%=talk[i].icon%>\
							<% if (source){\
								if (talk[i].type == 2){\
									%>&nbsp;转播:&nbsp;<%\
								}else if (talk[i].type == 7){\
									%>&nbsp;评论:&nbsp;<%\
								}else if (talk[i].type == 4){\
									%>&nbsp;对&nbsp;<a href="/<%=source.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)"><%='+V1+'.bkname||'+V1+'.nick%></a></a><%='+V1+'.icon%>&nbsp说:<%\
								}else{\
									%>:&nbsp;<%\
								}\
							}else{\
								%>:&nbsp;<%\
							}\
						%></strong><%=MI.Nano.switchHost(talk[i].content)%>\
					</div>\
					<% if (source) { %>\
						<div class="msgBox replyBox">\
							<%if('+V1+'.status==1){%>\
								<div class="noMSource">' + _('内容已删除。') + '</div><a target="_blank" style="display:none" href="#" class="zfNum">(<b class="relayNum"></b>)</a>\
							<%}else if('+V1+'.status==3){%>\
								<div class="noMSource">' + _('对不起，原文已经被作者删除。') + '</div><a target="_blank" style="display:none" href="#" class="zfNum">(<b class="relayNum"></b>)</a>\
							<%}else{%>\
								<div class="msgCnt">\
									<strong>\
										<a href="/<%=source.name%>" title="<%=('+V1+'.bkname||'+V1+'.nick).toTitle()%>(@<%='+V1+'.chName || '+V1+'.name%>)"><%='+V1+'.bkname||'+V1+'.nick%></a><%=source.icon%>:&nbsp;\
									</strong>\
									<%=MI.Nano.switchHost(source.content)%>\
								</div>\
								<%var Image='+V1+'.image && '+V1+'.image.length,Videos='+V1+'.videos && '+V1+'.videos.length,Music='+V1+'.music && '+V1+'.music.length,Mlist='+V1+'.mlist,Vote='+V1+'.vote && '+V1+'.vote.length,File='+V1+'.file && '+V1+'.file.length;if((Image || Videos || Music || Mlist || Vote || File) && !'+V1+'.rich){%><div class="mediaWrap">\
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
											<div class="mBox" style="display:none">\
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
										<div class="fileBox" id="<%=encodeURI('+V1+'.file[0].uriId)%>" rel="<%=encodeURI('+V1+'.file[0].fileName)%>" qid="<%='+V1+'.file[0].wqid%>" sz=""><em class="ico_file"></em><span class="fileName"><%='+V1+'.file[0].fileName%></span><a href="http://t.qq.com/download.php?fkey=<%='+V1+'.file[0].uriId%>&qid=<%='+V1+'.file[0].wqid%>&ftype=<%='+V1+'.file[0].ftype%>" class="download" target="_blank">' + _('下载') + '</a></div>\
									<%}%>\
								</div><%}%>\
								<div class="pubInfo">\
						            <span class="left">\
									<% if (!(type==0 || type==1) || talk[i].qinfo) {%>\
									<span class="time" rel="<%=source.timestamp%>" ><%=source.time%></span> <%='+V1+'.from%>\
									<% }else{%>\
									<a class="time" rel="<%=source.timestamp%>" href="http://1.t.qq.com/p/t/<%=source.id%>" target="_blank"><%=source.time%></a> <%='+V1+'.from%>\
									<% }%>\
										<% if (talk[i].type!==4) { %>\
											<a href="http://1.t.qq.com/p/t/<%=source.id%>" class="zfNum" rel="<%=source.id%>" <%if(!source.count){%>style="display:none"<%}%>>全部转播和评论(<b class="relayNum"><%=source.count%></b>)</a>\
										<% } %>\
									</span>\
						        </div>\
							<%}%>\
						</div>\
					<% } %>\
					<%var Image=talk[i].image && talk[i].image.length,Videos=talk[i].videos && talk[i].videos.length,Music=talk[i].music && talk[i].music.length,Mlist=talk[i].mlist,Vote=talk[i].vote && talk[i].vote.length,File=talk[i].file && talk[i].file.length;if((Image || Videos || Music || Mlist || Vote || File) && !talk[i].rich){%><div class="mediaWrap">\
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
								<div class="mBox" style="display:none">\
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
							<div class="fileBox" id="<%=encodeURI(talk[i].file[0].uriId)%>" rel="<%=encodeURI(talk[i].file[0].fileName)%>" qid="<%=talk[i].file[0].wqid%>" sz=""><em class="ico_file"></em><span class="fileName"><%=talk[i].file[0].fileName%></span><a href="http://t.qq.com/download.php?fkey=<%=talk[i].file[0].uriId%>&qid=<%=talk[i].file[0].wqid%>&ftype=<%=talk[i].file[0].ftype%>" class="download" target="_blank">' + _('下载') + '</a></div>\
						<%}%>\
					</div><%}%>\
					<div class="pubInfo">\
						<span class="left">\
						    <% if (!(type==0 || type==1) || talk[i].qinfo) {%>\
							<span class="time"><%=talk[i].time%><i class="l"></i></span> <%=talk[i].from%>\
							<% }else{%>\
							<a class="time" href="http://1.t.qq.com/p/t/<%=talk[i].id%>" target="_blank"><%=talk[i].time%><i class="l"></i></a> <%=talk[i].from%>\
							<% }%>\
							<% if (talk[i].type!==4 && talk[i].source && talk[i].counts[2]) {%>\
								<a href="http://1.t.qq.com/p/t/<%=talk[i].id%>" title="<%=(talk[i].bkname||talk[i].nick).toTitle()%> 转播后引发的转播次数" class="zfNum2">该条转播(<b class="relayNum"><%=talk[i].counts[2]%></b>)</a>\
							<% } else if (talk[i].type!==4 && talk[i].count) {%>\
								<a href="http://1.t.qq.com/p/t/<%=talk[i].id%>" class="zfNum" rel="<%=talk[i].id%>">全部转播和评论(<b class="relayNum"><%=talk[i].count%></b>)</a>\
							<%} %>\
							<a href="#" class="alarm">举报</a>\
						</span>\
						<div class="funBox">\
					        <% if (type == 0){\
								%><a href="#" class="relay">转播</a><span>|</span><a href="#" class="fav <%=talk[i].favortimestamp?"light":""%>" title="<%=talk[i].favortimestamp?"取消收藏":"收藏"%>"><em>收藏</em></a><%\
							} if (type == 0 && MI.user.fun.btnStyle){\
								if (MI.user.account != talk[i].name){\
									%><span>|</span><a href="#" class="reply">对话</a><%\
								}\
							} else{\
								if(type == 0){\
									%><span>|</span><%\
								}\
								if(type == 1){\
								    %><a href="#" class="relay">转播</a><span>|</span><%\
								}\
								%><a href="#" class="comt">评论</a><%\
							}%><% if (MI.user && MI.user.account && MI.user.account == talk[i].name) {%><span>|</span><a href="#" class="delBtn">删除</a><%}%>\
							<% if ((type == 1 || type == 0) && MI.user.fun.itemShare && MI.user && MI.user.account && MI.user.account != talk[i].name) {%><span>|</span><a href="#" class="shareBtn">分享</a><%}%>\
						</div>\
					</div>\
			    </div>\
			</li><%}%>',
		followList : '<% for (var i=0;i<talk.length;i++){%><li class="userList">\
                        <div class="userPic">\
                            <a '+V7+' href="/<%=talk[i].name%>"><img src="<%=talk[i].pic%>" onerror="MI.Pic(this,50)"/></a>\
                        </div>\
                        <div class="msgBox">\
                            <div class="clear">\
                                <div class="userName"><a '+V7+' href="/<%=talk[i].name%>"><%=talk[i].bkname||talk[i].nick%></a><%=talk[i].icon%><span class="cId">(@<%=talk[i].chName || talk[i].name%>)</span></div>\
                                <div class="funBox">\
                                    <span class="left">\
									    <input type="button" value="收听" class="addAttention" id="followBtn" style="display: <%if(!talk[i].isFollow){%>block<%}else{%>none<%}%>;" onclick="MI.follow(\'<%=talk[i].name%>\',this, MI.Nano.FollowBtn.followCall);">\
										<% if(talk[i].isFollowed){%>\
										<span class="followEach" style="<%if(!talk[i].isFollow){%>display:none<%}else{%><%}%>">\
										<em class="ico_bfo"></em>已互听,<a id="unfollowBtn" onclick="MI.follow(\'<%=talk[i].name%>\',this, MI.Nano.FollowBtn.unFollowCall);" class="delAttention" href="javascript:void(0)">取消</a></span>\
									    <%}else{%>\
										<span class="hasAttention" style="<%if(!talk[i].isFollow){%>display:none<%}else{%><%}%>"><em></em>已收听<span>|</span><a href="javascript:void(0);" class="delAttention" onclick="MI.follow(\'<%=talk[i].name%>\',this, MI.Nano.FollowBtn.unFollowCall);">取消</a></span>\
									   <%}%>\
									</span>\
                                </div>\
                            </div>\
							<%if(talk[i].message){%><div class="pubInfo">\
								<p class="pubTime"><%=talk[i].timeFrom%></p>\
								<p><%=talk[i].messageContent%></p>\
							</div><%}%>\
                            <div class="userNums">\
								<span><%=talk[i].address%></span>\
                                <span class="userNumsFollower"><a href="/<%=talk[i].name%>/follower">听众<strong><%=talk[i].count.follower%></strong>人</a></span>\
                                <span class="userNumsFollowing"><a href="/<%=talk[i].name%>/following"><%=talk[i].gender%>收听<strong><%=talk[i].count.following%></strong>人</a></span>\
                            </div>\
						</div>\
                    </li><% }%>',
		followMeList : '<% for (var i=0;i<talk.length;i++){%><li class="userList">\
                        <div class="userPic">\
                            <a '+V7+' href="/<%=talk[i].name%>"><img src="<%=talk[i].pic%>" onerror="MI.Pic(this,50)"/></a>\
                        </div>\
                        <div class="msgBox">\
                            <div class="clear">\
                                <div class="userName"><a '+V7+' href="/<%=talk[i].name%>"><%=talk[i].bkname||talk[i].nick%></a><%=talk[i].icon%><span class="cId">(@<%=talk[i].chName || talk[i].name%>)</span></div>\
                                <div class="funBox">\
                                    <span class="left">\
									    <input type="button" value="收听" class="addAttention" id="followBtn" style="display: <%if(!talk[i].isFollow){%>block<%}else{%>none<%}%>;" onclick="MI.follow(\'<%=talk[i].name%>\',this, MI.Nano.FollowBtn.followCall);">\
										<% if(talk[i].isFollowed){%>\
										<span class="followEach" style="<%if(!talk[i].isFollow){%>display:none<%}else{%><%}%>">\
										<em class="ico_bfo"></em>已互听,<a id="unfollowBtn" onclick="MI.follow(\'<%=talk[i].name%>\',this, MI.Nano.FollowBtn.unFollowCall);" class="delAttention" href="javascript:void(0)">取消</a></span>\
									    <%}else{%>\
										<span class="hasAttention" style="<%if(!talk[i].isFollow){%>display:none<%}else{%><%}%>"><em></em>已收听<span>|</span><a href="javascript:void(0);" class="delAttention" onclick="MI.follow(\'<%=talk[i].name%>\',this, MI.Nano.FollowBtn.unFollowCall);">取消</a></span>\
									   <%}%>\
									</span>\
                                </div>\
                            </div>\
                            <div class="userNums">\
								<span><%=talk[i].address%></span>\
                                <span class="userNumsFollower"><a href="/<%=talk[i].name%>/follower">听众<strong><%=talk[i].count.follower%></strong>人</a></span>\
                                <span class="userNumsFollowing"><a href="/<%=talk[i].name%>/following"><%=talk[i].gender%>收听<strong><%=talk[i].count.following%></strong>人</a></span>\
                            </div>\
							<% if(talk[i].sameFollower){%>\
							<div class="relInfo"><%=talk[i].sameFollower%></div>\
							<%}%>\
						</div>\
                    </li><% }%>',
		reply : 
			'<div class="talkWrap">\
			    <div class="top"><span class="left"><span class="number cNote"></span><span class="replyTitle"></span><span class="addReply"></span></span><a href="#" class="close" title="关闭">×</a></div>\
			    <div class="cntBox"><textarea></textarea></div>\
			    <div class="left"></div>\
				<div class="insertFun"><div class="sendList insertFace"><a class="txt" href="#" title="表情" tabindex="3"><em class="sico ico_face"></em>表情</a></div></div>\
				<div class="sendFun"><span class="countTxt">还能输入<em>140</em>字</span><a hrer="#" class="autoBackspace" style="display:none">'+_('[自动缩减]')+'</a><input class="sendBtn" type="button" value="转播" /></div>\
			</div>',
		sidePanel : 
			'<div class="detailPanelOuter" style="display:none">\
				<div class="detailPanelShell">\
					<div class="detailPanel" style="left:611px">\
						<div class="panelbar clear"><a href="#" class="close ffsong" title="关闭">×</a></div>\
						<div class="panelContentWrap"></div>\
					</div>\
				</div>\
			</div>',
		easyTopic: '<%for(var i=0;i<talk.length;i++){ %><li class="talkListItem">\
						<div class="msgCnt">\
						  <strong><a href="/<%=MI.user.account%>?preview"><%=MI.user.name%></a><%=talk[i].icon%></strong>:&nbsp;\
						  <% if(!talk[i].content){%>\
						      <span class="cNote">"<%=_("内容已删除")%>"</span>\
						   <% } else {%>\
						   <%= talk[i].content%>\
						   <% }%>\
						</div>\
						<div class="pubInfo">\
						  <span class="left"><span class="time"><%=talk[i].time%></span></span>\
						    <div class="funBox"><a onclick="MI.App.relay(\'<%=talk[i].id%>\');return false;"\
						                class="relay" href="#"><%=_("转播")%></a><span>|</span>\
						                <a onclick="MI.App.comment(\'<%=talk[i].id%>\');return false;"\
						                class="comt" href="http://1.t.qq.com/p/t/<%=talk[i].id%>"><%=_("评论")%></a></div>\
						    </div>\
			         </li><%}%>'
	},
	/**
	 * 是否为群
	 * 
	 *            @example
	 *            
	 */
	qun : 0,
	/**
	 * 浏览设置
	 * 
	 *            @example
	 *            MI.viewSet();
	 *            
	 */
	viewSet : function(e){		
		MI.Nano.SidePanel.setting();
		/*return 
		var Self = MI.talkList;		
		
		if (Self && !MI.Nano.SidePanel.sidePanelVisible() ) {
			MI.ajax({
				url: '/asyn/setting_side.php',
				type: 'get',
				data: '',
				success: function(data){
					clicked=true;
					data = MI.json(data);
					MI.Nano.SidePanel.registerDom();
					//MI.Nano.SidePanel.setContent(data.info);
					
					//UI.evalScript(data.info);
					
					var nodes = MI.Nano.SidePanel.getNodes();
					
					if (nodes.contentWrap) {
						nodes.contentWrap.innerHTML = data.info;
						UI.evalScript(data.info);
					}
					
					if (UI.hasClass(document.body, 'ipad')) {
						var top = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
						UI.C(nodes.sidePanel, 'top', top + 'px');
					}
					UI.hide(nodes._side);
					UI.show(nodes.sidePanel);
					
					MI.Nano.SidePanel.setSidePanelVisible(true);
				}
			});
		}	*/	
	},
	/**
	 * 主页卡切换
	 * 
	 *            @example
	 *            MI.homeTab.build();
	 *            
	 */
	homeTab : {
		/**
		 * 请求对象
		 * 
		 *            @example
		 *            
		 */
		xhr : null,
		/**
		 * 页卡事件
		 * 
		 *            @example
		 *            
		 */
		event : {
			/**
			 * 初始化
			 * 
			 *            @example
			 *            MI.homeTab.event.init();
			 *            
			 */
			init : function(){
				MI.Group = MI.Group || {};
				MI.Group.qun = 0;
				MI.Nano.qun = 0;
				MI.talkList.type = 0;
				MI.talkList.apiType = MI.api.type;
				MI.talkList.page = 0;
				MI.talkList.hasNext = 1;
				MI.talkList.moreTimes = 0;
				delete MI.TalkBox.prototype.data.wqid;
				delete MI.TalkBox.prototype.data.cIsuse;
				delete MI.TalkBox.prototype.data.cflag;
				MI.talkList.relayBox.addList = 0;
				MI.talkList.replyBox.addList = 0;
				MI.talkList.comtBox.addList = 0;
				//去除 微群的参数
				MI.talkList.relayBox.data = MI.talkList.replyBox.data = MI.talkList.comtBox.data = MI.talkList.relayListBox.data = {};
                MI.talkList.relayListBox.addCheck = MI.talkList.relayBox.addCheck = MI.talkList.comtBox.addCheck = null;
				//wujian 修复 微群 replace之后的bug				
				if(MI.talkList.talkBox && MI.talkList.talkBox._btn){					
					MI.talkList.talkBox._btn.value='转播';
				}
				//qunprofile 插件初始化
				MI.Nano.SidePanel.setProperty.apply(null,["qunProfile","bodyClickClose",true]);
								
				//添加样式
                UI.removeClass(MI.talkList._body,"groupList");
				
				MI.Crs.iconPic = 'x';
				MI.newCount.setTitle();
				UI.hide(MI.talkList._new);
				if (MI.newCount.type){
					MI.newCount.type = MI.newCount.type.replace(',3','');
				}
				if (MI.talkBox){
					MI.talkBox._btn.value = '广播';
					MI.talkBox.apiType = MI.api.type;
					//发微博 显示到timeline
					MI.talkBox.addCheck = null;
					
					//去除微群信息
                    MI.talkBox.data = {};
                    MI.talkBox.data.wqid = null;
                    MI.talkBox.data.cIsuse = null;
                    MI.talkBox.data.cflag = null;
					if (MI.talkBox._guide){
						MI.talkBox._guide.innerHTML = MI.talkBox.guide;
					}
				}
				if (MI.TalkList && MI.TalkList.musicStop){ //关闭音乐播放
					MI.TalkList.musicStop();
				}
				if(MI.talkList && $("placeholder")){
					var posi = $("placeholder");
					UI.after(MI.talkList._body,posi);
					UI.remove(MI.talkList._new);
					if(MI.talkList._new.ajax){
						try {
							MI.talkList._new.ajax.abort();
							MI.talkList._new.ajax = null;
						} 
						catch (e) {						
						}
					}
				}
                //  隐藏 查看 微群 详情 节点
				var openQunDetail = $("openQunDetail");
				openQunDetail && UI.hide(openQunDetail.parentNode);
                if (!this.cssOnce) {
                    UI.css('.relayCite{display:inline!important}');
                    this.cssOnce = 1;
					//查看微群 节点绑定
					openQunDetail && MI.Nano.SidePanel.qunProfile([openQunDetail]);
					//微群新加入的人 右边 也有个 查看群
					var openQunDetail2=$$($("home_mygroup_top_container"),".freshTipBox .right a")[0];
					openQunDetail2 && MI.Nano.SidePanel.qunProfile([openQunDetail2]);

					//查看名单详情
					var openListDetail=$$($("home_mylist_top_container"),".freshTipBox .right a")[0];
					openListDetail && MI.Nano.SidePanel.listProfile([openListDetail]);
                }
                
				
			},
			all : function(tab,rel,type,data){
				var posi = $("placeholder");
				UI.before(MI.talkList._new,posi);
				MI.talkList.relayBox.addList = 1;
				MI.talkList.replyBox.addList = 1;
				MI.newCount.type += ',3';
				if(!(data && "setHash" in data && data["setHash"]==false)){
					MI.Nano.homeTab.setHash(rel,type);
				}
				
				//初始化 设置参数
                var input =$("filter");
                if(input.checked){                   
                    if (MI.newCount.type) {//拉取消息
                       MI.newCount.type = MI.newCount.type.replace('3', "5");
                    }
                    //原创 不进入 timeline
                    MI.talkList.relayListBox.addCheck = MI.talkList.relayBox.addCheck = MI.talkList.comtBox.addCheck = "1";
               }
			   MI.Bos("nanoMyHomeAll");
				
			},
			special : function(tab,rel,type){
				MI.Nano.homeTab.setHash(rel,type);
				MI.talkBox && (MI.talkBox.addCheck = "1");
				MI.Bos("nanoMyHomeSpecial");
			},
			qqfriends : function(tab,rel,type){
				MI.Nano.homeTab.setHash(rel,type);
				MI.talkBox && (MI.talkBox.addCheck = "1");
				MI.Bos("nanoMyHomeList");
			},
			list : function(tab,rel,type){
				MI.talkList.relayBox.addList = 0;
				MI.Nano.homeTab.setHash(rel,type);
				MI.talkBox && (MI.talkBox.addCheck = "1");
				MI.Bos("nanoMyHomeList");				
                
			},
			at : function(tab,rel,type){
				if (MI.Nano.newMsg){
					MI.Nano.newMsg.atNumClear();
				}
				MI.Nano.homeTab.setHash(rel,type);
				MI.talkBox && (MI.talkBox.addCheck = "1");
				MI.Bos("nanoMyHomeAt");
			},
			qun : function(tab,rel,type,data){
				if (!MI.Group){
					MI.Group = {qid:77925016};
				}
				
				//新消息红点
				var dot = $$('#home_mygroup_top .ico_newMsg')[0];
				if (dot){
					UI.remove(dot);
				}

				//暂停最新的拉取
				//MI.user.fun.newCount = 0;
				//MI.url.newCount = '/asyn/qun.php?qid=' + MI.Group.qid;

				MI.Nano.qun = 1;
				//MI.TalkBox.prototype.data.wqid = MI.Group.qid;
				//MI.TalkBox.prototype.data.cIsuse = 1;
				//MI.TalkBox.prototype.data.cflag = 2;				
                MI.talkList.relayListBox.addCheck = MI.talkList.relayBox.addCheck = MI.talkList.comtBox.addCheck = "1";			
				MI.talkList.relayBox.data = MI.talkList.replyBox.data = MI.talkList.comtBox.data = MI.talkList.relayListBox.data = {
                    wqid : MI.Group.qid,
                    cIsuse : 1,
                    cflag : 1,//公开群 参数
					share : 0 //公开群 参数
                };
				MI.talkList.type = 1;
				MI.talkList.apiType = 1;
				MI.talkList.talkBoxTmpl = MI.talkList.talkBoxTmpl.replace('转播', '评论');
				if(MI.talkList.talkBox && MI.talkList.talkBox._btn){                    
					MI.talkList.talkBox._btn.value='评论';
				}  
				
				//qunprofile 插件特殊化
                MI.Nano.SidePanel.setProperty.apply(null,["qunProfile","bodyClickClose",false]); 
				//添加样式
				UI.addClass(MI.talkList._body,"groupList");
				
				//UI.css('.relayCite{display:none!important}');
				MI.talkList.comtBox.addList = 1;
				MI.talkList.relayBox.addList = 1;
				
				// 显示查看微群详情节点 并且 href属性
				var openQunDetail = $("openQunDetail");
				if(openQunDetail){
					UI.show(openQunDetail.parentNode);
					UI.A(openQunDetail , "href" , "http://qun.t.qq.com/"+MI.Group.qid);					
				}
				//微群新加入的人 右边 也有个 查看群
                var openQunDetail2=$$($("home_mygroup_top_container"),".freshTipBox .right a")[0];
                if (openQunDetail2) {
					UI.A(openQunDetail2, "href", "http://qun.t.qq.com/" + MI.Group.qid);
					UI.A(openQunDetail2, "open", true);
				}
				
				if (MI.talkBox){
					MI.talkBox._btn.value = '发表';
					MI.talkBox.apiType = 1;
					//加入微群信息
					MI.talkBox.data = {};
					MI.talkBox.data.wqid = MI.Group.qid;
                    MI.talkBox.data.cIsuse = 1;
					
					//公开群 参数
                    MI.talkBox.data.cflag = 1;
					MI.talkBox.data.share = 0;
					
					if (MI.talkBox._guide){
						if (MI.Group.qid == 77925016) {
							MI.talkBox._guide.innerHTML = '<label for="msgTxt">给体验版微博提意见<em title="私密群" class="ico_slock"></em></label>';
						}else{
							if(data && data.isprivate == 1){
								var ispraHtml = '<em title="私密群" class="ico_slock"></em>';
							}else{
								var ispraHtml = '';
							}
							data && data.qun && (MI.talkBox._guide.innerHTML = '<label for="msgTxt">'+MI.string.html(data.qun)+ispraHtml+'</label>');
						}						
					}
				}
				MI.Nano.homeTab.setHash(rel,type);
				MI.Bos("nanoMyHomeQun");
			}
		},
		setHash : function(rel,type){
			document.location.hash = 'rel=' + encodeURIComponent(rel) + '&type=' + type;
		},
		load : function(tab,rel,type,data){			
			var Self = this, cur = $$(Self._body, '.select');
			var curSelect = null;
			UI.each(cur, function(o){
				UI.removeClass(o, 'select');
				if (o.secondList) {
					if (o.secondList != tab.parentNode.parentNode.parentNode && o.secondList!=tab.parentNode ) {
						UI.hide(o.secondList);
					}
					else {
						curSelect = o;
					}
				}
				/*if(o.atFilter){
					if (o.atFilter != tab.parentNode.parentNode.parentNode) {
						UI.hide(o.atFilter);
					}
					else {
						curSelect = o;
					}
				}*/
			});			
			
			if (!curSelect) {
				UI.addClass(tab.parentNode, 'select');
			}
			else {
				UI.addClass(curSelect, 'select');
				var spans = $$(tab.parentNode.parentNode, "span");
				UI.each(spans, function(o){
					UI.removeClass(o, "cur");
				});
				UI.addClass(tab.parentNode, "cur");
			}
			
			
			var listHeight = UI.height(MI.talkList._body);
			MI.talkList.clear('<li class="loading" style="height:' + (listHeight > 700 ? listHeight : 700) + 'px;background-position:50% 100px;border-bottom:0!important;">&nbsp;</li>');
			//document.location.hash = 'tab=' + type;
			if (rel){				
				Self.curTab = tab.parentNode;
				if (Self.xhr){
					Self.xhr.abort();
				}
				//historyIframe.contentWindow.location.search = 'tab=' + type;
				//初始化
				Self.event.init(tab,rel,type);				
				//子页卡单独逻辑
				if (Self.event[type]){
					Self.event[type](tab,rel,type,data);
				}
				
				//拉取数据
				Self.xhr = MI.ajax({
					url : rel,
					type : 'get',
					data : '',
					success : function(data){
						//显示列表						
						MI.talkList.clear();
						UI.show(MI.talkList._more);
						UI.removeClass(MI.talkList._more, 'hide');
						data = MI.json(data);
						if (data.result == 0) {
							if (data.info.inlist) {//是否在名单中 决定 发布器 发微博后 是否渲染新微博到timeline
								MI.talkBox && (MI.talkBox.addCheck = null);
							}
							if ("priv" in data.info && data.info.priv == 1) {//私密群 改变 参数  priv 的值 是0 啊 
								MI.talkList.comtBox.addCheck = null;
								MI.talkBox.data.cflag = MI.talkList.relayBox.data.cflag = MI.talkList.replyBox.data.cflag = MI.talkList.comtBox.data.cflag = MI.talkList.relayListBox.data.cflag = 2;
								delete MI.talkBox.data.share;
								delete MI.talkList.relayBox.data.share;
								delete MI.talkList.replyBox.data.share;
								delete MI.talkList.comtBox.data.share;
								delete MI.talkList.relayListBox.data.share;
								MI.talkList.type = 2;
							}
							
							if (data.info.talk && data.info.talk.length > 0) {
								if (data.info.hasnext == 1) {
									UI.show(MI.talkList._more);
								}
								UI.show(MI.talkList._body);
								if (MI.talkList._tip) {
									UI.hide(MI.talkList._tip);
								}
								MI.talkList.addMore(data);

								
								if(MI.talkList._pages){
									var page=UI.html(data.info.page);
									MI.talkList._pages.innerHTML="";
									UI.each(page,function(el){
										UI.append(el,MI.talkList._pages);
									});							
									MI.talkList.pageNav();
								}
								

								//检查 ul中的li数量
								var li=$$($("talkList"),"li");								
								if(li.length==0){
									MI.Bos("nano_error_jsrender");
								}
								
							}
							else {
								UI.hide(MI.talkList._body);
								UI.hide(MI.talkList._more);
								if (MI.talkList._tip) {
									UI.show(MI.talkList._tip);
								}
							}
							
							
							//如果是微群 多了一个 新加入的人的数据
							if (data.info.newuser) {
								var container = $$($("home_mygroup_top_container"), ".freshTipBox .left")[0];
								container.innerHTML = "";
								var html = [];
								UI.each(data.info.newuser, function(d){
									html.push('<a href="/' + d.name + '" title="' + d.nick + '">' + d.nick + '</a>');
								})
								//html.push("等最新加入本群");
								html = UI.html(html.join("、"))
								UI.each(html, function(el){
									UI.append(el, container);
									//绑定事件
									MI.Nano.SidePanel.userProfile([el]);
								})
								UI.append(UI.html("等最新加入本群")[0], container);
								
							}
							if(data.info.listuser){
								var container = $$($("home_mylist_top_container"),".freshTipBox .left")[0];
								container.innerHTML="";
								var html=[];
								UI.each(data.info.listuser,function(d){
									html.push('<a href="/'+d.name+'" title="'+d.nick+'">'+d.nick+'</a>');								
								})
								//html.push("等最新加入本群");
								html=UI.html(html.join("、"))
								UI.each(html,function(el){
									UI.append(el,container);
									//绑定事件
									MI.Nano.SidePanel.userProfile([el]);
								})
								var tipText = _("新收录成员：");
								var lid = UI.A(tab, 'lid');
								if(lid && lid == "lastfollowing"){
									tipText = _("新成员：");
								} else if(lid && lid == "qqfriends"){
									tipText = _("成员：");
								}
								UI.prepend(UI.html(tipText)[0],container); 
								UI.append(UI.html("等")[0],container); 
								UI.show(UI.parent(container));					
							}
						}
						else 
							if (data.result == -1) {
								document.location.reload();
							}else{
								MI.Bos("nano_error_url_"+rel);
							}
					}
				});
				//隐藏老列表
				UI.A(MI.talkList._more,'rel',rel);
				UI.hide(MI.talkList._more);
				UI.hide(MI.talkList._new);
				//var listHeight = UI.height(MI.talkList._body);
				//MI.talkList._body.innerHTML = '<li class="loading" style="height:' + (listHeight > 700 ? listHeight : 700) + 'px;background-position:50% 100px;border-bottom:0!important;">&nbsp;</li>';
			}
		},
		curTab : null,
		cacheUrl : {},
		build : function(){
			var Self = this;
			Self._body = $$('.homeTab')[0];
			Self._tabs = $$(Self._body,'li a');
			if (!(Self._body && Self._tabs.length && UI.A(Self._tabs[0],'rel'))){
				return;
			}
			//名单 微群 二级 ajax
			var ajax=null;
			//加载页卡数据
			var loadTab = function(e){
				if(ajax){
					ajax.abort();
					ajax = null;
				}
				
				
				var rel = UI.A(this,'rel'),
					type = UI.A(this,'type');
				//close panel
				if(type != "qun"){
					MI.Nano.SidePanel.closePanel();
				}	
					
				if (MI.talkList){										
					if(type == 'at'){
						var atFilter_all = $("atFilter_all");
						var atFilter_like = $("atFilter_like");
						if(MI.user.fun.atFilterType == 1){
							UI.removeClass(atFilter_all, 'cur');
							UI.addClass(atFilter_like, 'cur');
							rel = rel+'?filter='+MI.user.fun.atFilterType;
						}else{
							UI.removeClass(atFilter_like, 'cur');
							UI.addClass(atFilter_all, 'cur');
							rel = rel+'?filter='+MI.user.fun.atFilterType;
						}
					}
					Self.load(this,rel,type);//切换页卡 子节点容器得隐藏。。。。。
					if (!rel) {//这是个 名单 或者 意见反馈啥的 
						//搜索子节点 获取 子节点的rel  子节点 并且select
						var getFirst = function(container){
							UI.show(container);
							var a = $$(container, ".subTab1 a");
							if (a && a.length > 0) {
								a = a[0];
								a.onclick && a.onclick();
								var tp = UI.A(a, "type");
								if (!UI.hasClass(document.body, "s_mode")) {
								    //tp&&(tp=="qun")&&MI.Nano.SidePanel.callPlugin.apply(a,["qunProfile",true]);								
								}
								
								var spans = $$(container, "span");
								UI.each(spans, function(o){
									UI.removeClass(o, "cur");
								});
								UI.addClass(a.parentNode, "cur");
							}
							else {
								MI.talkList.clear();
								UI.hide(MI.talkList._more);
								UI.remove(MI.talkList._new);
								UI.remove(MI.talkList._body);
							}
						};
						getList(this, UI.A(this, "addr"), getFirst);
						if (this.parentNode.secondList) {
							getFirst(this.parentNode.secondList);
							UI.show(this.parentNode.secondList);
						}
					}
					else {
						if (this.parentNode.secondList) {
							UI.show(this.parentNode.secondList);
						}/*else{
							if(this.parentNode.atFilter){
								UI.show(this.parentNode.atFilter);
							}
						}*/
					}
					return false;
				}
			}
			
			UI.each(Self._tabs,function(o){
				o.onclick = loadTab;
				//有二级的 页卡
				if(UI.A(o,"addr")){
					o.onmouseover = function(){						
                        /*if(o.parentNode.secondList){													
                            UI.show(o.parentNode.secondList);
							var spans=$$(this.parentNode.secondList,"span");
                                UI.each(spans,function(o){
                                    UI.removeClass(o,"cur");
                            });
                        }*/						
                       // getList(o,UI.A(o,"addr"));
                    }
					o.onmouseout = function(){
						if(!UI.hasClass(o.parentNode,"select")){
							if(o.parentNode.secondList){															
								UI.hide(o.parentNode.secondList);
							}
						}
					}
				}
				//直接输出二级的
                var list = $("myhome_top_container");//$(UI.A(o,"type")+"_top_container");
				var tabType = UI.A(o, "type");
				if(tabType != "all"){
					if(tabType == "at"){
						var atFilter = $("atFilter_container");
						if (!atFilter) {
							return;
						}
						var atFilter_all = $("atFilter_all");
						var atFilter_like = $("atFilter_like");
						if(MI.user.fun.atFilterType == 1){
							UI.removeClass(atFilter_all, 'cur');
							UI.addClass(atFilter_like, 'cur');
						}else{
							UI.removeClass(atFilter_like, 'cur');
							UI.addClass(atFilter_all, 'cur');
						}
						atFilter_all.onclick = function (){
							UI.removeClass(atFilter_like, 'cur');
							UI.addClass(atFilter_all, 'cur');
							var filter = 0;//全部
							var rel = UI.A(o, "rel")+"?filter="+filter, type = tabType;
							MI.user.fun.atFilterType = filter;
							Self.load(atFilter_all, rel, type);
						}
						atFilter_like.onclick = function (){
							UI.removeClass(atFilter_all, 'cur');
							UI.addClass(atFilter_like, 'cur');
							var filter = 1;//喜欢
							var rel = UI.A(o, "rel")+"?filter="+filter, type = tabType;
							MI.user.fun.atFilterType = filter;
							Self.load(atFilter_like, rel, type);
						}
						//o.parentNode.atFilter = atFilter;
						if(MI.user.fun.atFilter){
							o.parentNode.secondList = atFilter;
						}
					}else{
						return;
					}
				}else{
					if (!list) {
						return;
					}
					//原创 变成了 input鸟。。。。
					var input = $("filter");
					input.onclick = function (){
						var filter = 0;//全部
						if(input.checked){
							//原创
							filter = 1;						
						}
						var rel = UI.A(o, "rel")+"?filter="+filter, type = UI.A(o, "type");
						Self.load(input, rel, type);
					}
					o.parentNode.secondList = list;
					//初始化 设置参数
					setTimeout(function(){
						//初始化
						
						Self.event.init(o,UI.A(o, "rel"),"all");
						//子页卡单独逻辑
						if (Self.event["all"]) {
							Self.event["all"](o,UI.A(o, "rel"),"all",{
								setHash:false
							});
						}
					}, 10);
					
					// 纯文字选项
					var viewModel = $("plain");
					viewModel.onclick = function() {
						var v = 0;
						if (viewModel.checked) {
							v = 1;
						}
						MI.talkList.iconPicToggle();
						MI.ajax({
							url : '/asyn/setting_save.php',
							type : 'post',
							data : {
								viewModel : v
							},
							success : function(data) {
								MI.user.fun.iconPic = v;
							}
						})
					};
				}
				return;
                var aList = $$(list, "a");
                o.parentNode.secondList = list;
                UI.each(aList, function(el){
                    var rel = UI.A(el, "rel"), type = UI.A(o, "type");
                    if (el.parentNode.className == "cur") {//初始化 遍历数据 设置 全部tab的rel
                        UI.A(o, "rel", rel);
                        if (MI.newCount.type) {//拉取消息
                            MI.newCount.type = MI.newCount.type.replace('3', UI.A(el, "newcount"));
                        }						
                        //判断 类型 主要是原创 转播等 不进入timeLine 
                        var filterNum = rel.match(/filter=(\d)/g);
                        if (filterNum) {
                            filterNum = filterNum[0].replace("filter=", "");
                        }						                        
                        if (filterNum == 1) {
                            setTimeout(function(){
                                MI.talkList.relayListBox.addCheck = MI.talkList.relayBox.addCheck = MI.talkList.comtBox.addCheck = "1";
                            }, 10)
                        }
                    }
                    el.onclick = function(){
                        //console.log(o,rel, type);
                        UI.A(o, "rel", rel);
						if (MI.newCount.type){//拉取消息
                            MI.newCount.type = MI.newCount.type.replace('3',UI.A(el , "newcount"));
                        }						
                        Self.load(el, rel, type);
                        
                        return false;
                    }
                    
                });
				
				
			});
						
			var getList = function (dom,url,callback){	
				if (ajax) {
					ajax.abort();
					ajax = null;
				}
				if (Self.xhr) {
					Self.xhr.abort();
					Self.xhr = null;
				}
				if (Self.cacheUrl[url]) {					
					return;
				} 
				var container = $(dom.parentNode.id + "_container");
				innerCon = $$(container, ".subTab1")[0]
				innerCon.innerHTML = '';
				UI.hide(UI.parent($$(container,".freshTipBox .left")[0]));
				var listHeight = UI.height(MI.talkList._body);
				MI.talkList.clear('<li class="loading" style="height:' + (listHeight > 700 ? listHeight : 700) + 'px;background-position:50% 100px;border-bottom:0!important;">&nbsp;</li>');
				UI.remove(MI.talkList._new);
				var Time, Time_1, Time_2, Time_3;
				Time = +new Date();
				ajax = MI.ajax({
					url: url,
					data: "",
					success: function(data){
					
						Time_1 = +new Date() - Time;
						data = MI.json(data);
				 	
						if (data.result == 0) {
				 			Self.cacheUrl[url] = 1;
				 			var node = UI.html(data.info)
				 			var container = $(dom.parentNode.id + "_container");
				 			innerCon = $$(container, ".subTab1")[0]
				 			dom.parentNode.secondList = container;
				 			//UI.show(container);
				 			UI.each(node, function(o){
				 				UI.append(o, innerCon);
				 			});
				 			bindDom(container);							
				 			callback && callback(container);							  
				 		}
				 		else 
				 			if (data.result == -1) {
				 				document.location.reload();
				 			}
				 		//Speed
				 		Time_2 = +new Date() - Time;
				 		setTimeout(function(){
				 			Time_3 = +new Date() - Time;
				 			MI.Speed('t_asyn_mylist', 1, Time_1, Time_2, Time_3);
				 		}, 0);
				 	},
				 	fail: function(){
				 	
				 	}
				 });
		      };
			 
			  var bindDom = function(container){
			  	var link = $$(container, "a");
			  	UI.each(link, function(o){
			  		var rel = UI.A(o, "rel"), type = UI.A(o, "type");
			  		o.onclick = function(){
			  		
			  			if (!MI.talkList) {
			  				return;
			  			}			  			
			  			
						var id = UI.A(o, 'href').match(/\d+\d+/g);
						if(type == "list") {
							id = UI.A(o, 'lid');
						}
			  			if (rel) {
			  				Self.load(o, rel, type);
			  				UI.A($$($("home_mylist_top_container"), ".freshTipBox .right a")[0], 'lid', 'qqfriends');
			  				UI.hide(UI.parent($$($("home_mylist_top_container"), ".freshTipBox .left")[0]));
			  			}
			  			else 
			  				if (type == "list" && id) {
			  					//id = id[0];
			  					UI.show(UI.parent($$($("home_mylist_top_container"), ".freshTipBox .left")[0]));
			  					Self.load(o, '/asyn/list.php?lid=' + id, type);
			  					UI.A($$($("home_mylist_top_container"), ".freshTipBox .right a")[0], 'lid', id);
			  				}
			  				else {
			  					if (type == "qun" && id) {
			  						id = id[0];
			  						if (MI.Group) {
			  							MI.Group.qid = id;
			  						}
			  						else {
			  							MI.Group = {
			  								qid: id
			  							};
			  						}
			  						UI.show(UI.parent($$($("home_mygroup_top_container"), ".freshTipBox .left")[0]));
			  						UI.removeClass(o, "light");
			  						Self.load(o, '/asyn/qun.php?qid=' + id + '&page=1', 'qun', {
			  							"qun": UI.A(o, "title"), "isprivate":UI.A(o, "isprivate")
			  						});
			  						if (!UI.hasClass(document.body, "s_mode")) {
			  							MI.Nano.SidePanel.callPlugin.apply(o, ["qunProfile", true]);
			  						}
			  					}
			  				}
			  			
			  			return false;
			  		}
			  		// type&&(type=="qun")&&(MI.Nano.SidePanel.qunProfile([o]));
			  	});
			  }
			 
			 
			//名单下拉  wujian 完毕后 注入到 新的容器 绑定新的事件 
			/*var listDelay = setInterval(function(){
				var listDrop = MI.listDrop && MI.listDrop.box['home_mylist_top'],
					listTab;
				if (listDrop){
					listTab = $('home_mylist_top');
					clearInterval(listDelay);
					listDrop._body.onclick = function(e){
						var E = UI.E(e),
							link = E.target;
						if (link.nodeName != 'A'){
							link = link.parentNode;
						}
						if (link.nodeName == 'A'){
							var id = UI.A(link,'href').match(/\d+/g),
								name = link.title,
								tabLink = listTab.firstChild;
							if (id){
								id = id[0];
								listDrop._selectedBtn = listTab;
								tabLink.firstChild.innerHTML = MI.string.cut(name,8,'');
								listDrop.hide();
								listDrop.current = id;
								Self.load(tabLink,'/asyn/list.php?lid=' + id,'list');
							}
						}
						E.prevent();
						return false;
					}
					listDrop.mouseover = function(){
						if (Self.curTab != listTab){
							listDrop._selectedBtn = null;
						}
					}
					listDrop.call = function(){
						
					}
				}
			},50);*/

			//微群下拉
			/*var qunDelay = setInterval(function(){
				var listDrop = MI.listDrop && MI.listDrop.box['home_mygroup_top'],
					listTab;
				if (listDrop){
					listTab = $('home_mygroup_top');
					clearInterval(qunDelay);
					listDrop._body.onclick = function(e){
						var E = UI.E(e),
							link = E.target;
						if (link.nodeName != 'A'){
							link = link.parentNode;
						}
						if (link.nodeName == 'A'){
							var id = UI.A(link,'href').match(/\d+/g),
								name = link.title,
								tabLink = listTab.firstChild;
							if (id){
								id = id[0];
								tabLink.firstChild.innerHTML = MI.string.cut(name,8,'');
								listDrop._selectedBtn = listTab;
								listDrop.hide();
								listDrop.current = id;
								if (MI.Group){
									MI.Group.qid = id;
								}
								else {
									MI.Group = {
										qid : id
									};
								}
								Self.load(tabLink,'/asyn/qun.php?qid=' + id + '&page=1&zone=2','qun');
							}
						}
						E.prevent();
						return false;
					}
					listDrop.mouseover = function(){
						if (Self.curTab != listTab){
							listDrop._selectedBtn = null;
						}
					}
					listDrop.call = function(){
						UI.each($$(listDrop._body,'li a'),function(o){
							if (o){
								var id = UI.A(o,'href').match(/\d+/g)[0];
								if (id != '23006013' && id != '77925016'){
									UI.hide(o.parentNode);
								}
							}
						});
						
						listDrop.pos();
						listDrop.page(0);
					}
				}
			},50);*/
			
			setTimeout(function(){
				//自动加载页卡数据
				var hashData = UI.parseUrl(document.location.href, '#');
				if (hashData.rel && hashData.type) {
					UI.each(Self._tabs, function(o){
						var type = UI.A(o, 'type');
						//判断条件 有点特殊 qqfriends 被放入名单下面鸟。。。
						if ((type == hashData.type || (hashData.type == "qqfriends" && type == "list")) && !UI.hasClass(o.parentNode, 'select')) {
							hashData.tab = o;
						}
					});
					
					if (hashData.tab && hashData.type != "all") {
						var addr = UI.A(hashData.tab, "addr"), id = decodeURIComponent(hashData.rel).match(/\d+\d+/g);
						if (addr) {
							getList(hashData.tab, addr, function(container){
								UI.show(container);
								var a = $$(container, "a");//比对所有的a
								UI.each(a, function(o){
									var rel = UI.A(o, "rel"), type = UI.A(o, "type");
									if (type != hashData.type) {
										return;
									}
									
									var isMarch = false;
									switch (type) {
										case "list":
											var oid = UI.A(o, 'href').match(/\d+\d+/g);
											if (id && oid && id[0] == oid[0]) {
												isMarch = true;
											}
											//查看名单详情
											UI.A($$($("home_mylist_top_container"), ".freshTipBox .right a")[0], 'lid', id);
											
											break
										case "qun":
											var oid = UI.A(o, 'href').match(/\d+\d+/g);
											//MI.Nano.SidePanel.qunProfile([o]);                                    
											if (id && oid && id[0] == oid[0]) {
												id = id[0];
												isMarch = true;
												if (MI.Group) {
													MI.Group.qid = id;
												}
												else {
													MI.Group = {
														qid: id
													};
												}
												UI.removeClass(o, "light");
												Self.event.init(hashData.tab, decodeURIComponent(hashData.rel), type);
												//子页卡单独逻辑                                            
												if (Self.event[type]) {
													var data = {};
													data[type] = UI.A(o, "title");
													Self.event[type](hashData.tab, decodeURIComponent(hashData.rel), type, data);
												}
												if (!UI.hasClass(document.body, "s_mode")) {
													MI.Nano.SidePanel.callPlugin.apply(o, ["qunProfile", true]);
												}
												UI.show(UI.parent($$($("home_mygroup_top_container"), ".freshTipBox .left")[0]));
											}
											break;
										default:
											if (rel == decodeURIComponent(hashData.rel)) {
												isMarch = true;
											}
									}
									if (isMarch) {
										UI.addClass(o.parentNode, "cur");
										
									}
								});
							});
						}
						
						if (hashData.type == "at") {						
							var secondList = $("atFilter_container");
							if (secondList) {
								UI.show(secondList);
							}
						}
						Self.load(hashData.tab, decodeURIComponent(hashData.rel), hashData.type);
					}
					else {
						//显示主页
						UI.show($('myhome_top_container'));
						UI.addClass($('home_myhome_top'), 'select');
						//显示timeline
						if (MI.talkList) {
							UI.show(MI.talkList._body);
							UI.show(MI.talkList._more);
						}
						MI.Crs(1);
					}
				}
				else {
					//显示主页
					UI.show($('myhome_top_container'));
					UI.addClass($('home_myhome_top'), 'select');
					//显示timeline
					if (MI.talkList) {
						UI.show(MI.talkList._body);
						UI.show(MI.talkList._more);
					}
					MI.Crs(1);
					
				}
			},50);

			return;
			//自动打开页卡
			window.onhashchange = function(){
				var tab = UI.parseUrl(null,'#').tab;
				UI.each(Self._tabs,function(o){
					if (UI.A(o,'type') == tab){
						o.onclick();
					}
				});
			}
			
			//历史
			var historyName = 'historyIframe_' + MI.random(),
				historyIframe = UI.html('<iframe id="' + historyName + '" name="' + historyName + '" src="http://t.qq.com/proxy.html" onload="console.log(this.contentWindow.location.href)" style="display:none"></iframe>')[0];
			UI.append(historyIframe,document.body);
		}
	},
	/**
	 * 消息提醒
	 * 
	 *            @example
	 *            MI.newMsg.build();
	 *            
	 */
	newMsg : {
		markNum : 0,
		markDelay : 0,
		display : 0, //显示状态
		ajaxData : {},//ajax提交数据
		atNumClear : function(){
			var Self = this;
			
			if (Self._num) {//F5刷新时 当前页卡处于 “提到我的”，_num节点 还未存在
				Self._num.innerHTML = '';
				Self._aobj = $$($('newMsg'),'a')[0];
				Self._aobj.title = '提到我的';
				UI.hide(Self._num);
			}
			
			var newCoutAt = $('newCoutAt');
			if (newCoutAt){ //清空左侧数字
				newCoutAt.innerHTML = '';
			}
		},
		cout : function(num){ //减数字
			var Self = this;
			Self.num = Self.num - num;
			//UI.A(Self.atList._more,'rel',MI.url.atList + '?size=' + Self.num);
		},
		build : function(){
			var Self = this;
			Self.ajaxData.filter = MI.user.fun.atFilterType;
			Self._target = $('newMsg');
			if (Self._target){
				Self._num = $$(Self._target,'a sub')[0];
				Self._at = $$('.recentListBox')[0];
				Self._atCont = $$(Self._at,'.recentListWrap')[0];
				Self._atList = $$(Self._at,'.recentList')[0];
				Self._followList = $$(Self._at,'.wbSearch')[0];
				Self._atArrow = $$(Self._at,'.SA')[0];

				//更多按钮
				var pageNode = UI.html('<div class="pages">\
											<div>\
												<a rel="'+MI.url.atList+'" href="#" class="moreLink"><strong><img src="http://mat1.gtimg.com/www/mb/images/loading.gif">更 多<span>◆</span><em>◆</em></strong></a>\
											</div>\
										</div>')[0];
				var _more = $$(pageNode,"a")[0];
				
				//消息列表
				Self.atList = new MI.Nano.TalkList(Self._atList,{
					_more : _more,
					useSidePanel : 0,
					comtBoxList : 0
				});
				
				Self.atList.relayBox.data = Self.atList.replyBox.data = Self.atList.comtBox.data = Self.atList.relayListBox.data = {
					attips : 1
				};
				Self.atList.relayBox.addList = 0;
				Self.atList.replyBox.addList = 0;
				Self.atList.comtBox.addList = 0;
				
				Self.atList.eventsCall = function(list){
					//标记新消息
					UI.each(list,function(o){
						if (Self.markNum == 1){
							UI.addClass(o,'pageLine');
						}
						if (Self.markNum > 0){
							UI.addClass(o,'newMsg');
							Self.markNum--;
						}
					});
					var li = list[Self.markNum];
				}
				//atlist 
				Self.atList.relayListCall = function(){};
				
				//阻止冒泡
				Self._at.onclick = function(e){
					UI.E(e).stop();
				}

				//不提醒没有理由的转播点击事件
				var neObj = $('ne1');
				UI.EA(neObj, 'click', function(el){
					if(!el.sending){
						el.sending = 1; 
						MI.ajax({
							url : '/asyn/setting_save.php',
							type : 'post',
							data : {ne:neObj.value, r:MI.random()},
							timeout : 30000,
							fail : function(){
								el.sending = 0;
							},
							success : function(json){
								el.sending = 0;
								Self._atList.innerHTML = '<li class="loading" style="line-height:200px;">&nbsp;</li>';
								Self._target.onclick();
							}
						});
					}
				});

				//从本地获取信息
				/*if(MI.user.account){
					var skey = MI.user.account + "_info";
					var info = MI.S(skey);
					if(info){
						info = MI.json(info);
						Self.ajaxData.filter = info.atf;
						UI.A(_more, 'rel', MI.url.atList + '?filter=' + info.atf);
					}
				}*/
				//保存到本地
                        /*if(MI.user.account){
                            var skey = MI.user.account + "_info";
                            var info = MI.S(skey);
                            if(info){
                                info = MI.json(info);
                            } else {
                                info = {};
                            }
                            info.atf = filter;
                            MI.S(skey, UI.json2str(info));
                        }*/
				//全部和猜你爱看
				Self.initAtListTab = function(){
					UI.each($$($('atSetting'), 'a'), function(o, i){
						UI.show(o);
						var f = UI.A(o, 'filter');
						if (Self.ajaxData.filter && Self.ajaxData.filter == f) {
							UI.addClass(o, 'cur');
						}
						else 
							if (Self.ajaxData.filter) {
								UI.removeClass(o, 'cur');
							}
						o.onclick = function(el){
							var filter = UI.A(o, 'filter');
							Self.ajaxData.filter = filter;
							MI.user.fun.atFilterType = filter;
							Self._target.onclick();
							UI.each($$($('atSetting'), 'a'), function(m, i){
								UI.removeClass(m, 'cur');
							});
							UI.addClass(o, 'cur');
							UI.A(_more, 'rel', MI.url.atList + '?filter=' + filter);
						};
					});
				}
				Self.closeAtListTab = function(){
					UI.each($$($('atSetting'), 'a'), function(el){
						UI.hide(el);
						UI.removeClass(el, 'cur');
					});
					UI.A(_more, 'rel', MI.url.atList + '?filter=' + 0);
					Self.ajaxData.filter = 0;
				}
				
				UI.each($$($('atSetting'), 'a'), function(el){
					UI.hide(el);
				});
				
				if (MI.user.fun.atFilter) {
					Self.initAtListTab();
				}
				
				//点击@
				var CrsTimer = null;
				Self._atList.parentNode.onscroll = function(){
					if (CrsTimer) {
						window.clearTimeout(CrsTimer);
						CrsTimer = null;
					}
					CrsTimer = setTimeout(function(){
						MI.Crs(1);
					}, 100);
					
				}
				Self._target.onclick = function(e){
					Self.ajaxData.filter = MI.user.fun.atFilterType;
					UI.A(_more, 'rel', MI.url.atList + '?filter=' + MI.user.fun.atFilterType);
					if(MI.user.fun.atFilterType == 1){
						UI.removeClass($$($('atSetting'), 'a')[0], 'cur');
						UI.addClass($$($('atSetting'), 'a')[1], 'cur');
					}else{
						UI.removeClass($$($('atSetting'), 'a')[1], 'cur');
						UI.addClass($$($('atSetting'), 'a')[0], 'cur');
					}
					UI.hide($('fcSetting'));
					//qq浏览器 bug
					var input=$$($('fcSetting'),"input")[0];
					UI.hide(input);
					
					Self._atList.style.display = '';
					Self._followList.style.display = 'none';
					Self._followList.innerHTML = '';

					if($$(Self._atCont,'.pages')[0]){
						UI.remove($$(Self._atCont,'.pages')[0]);
					}
					UI.after(pageNode, Self._atList);

					MI.Bos("nanoTopNavAt");
					
					UI.C(Self._atList.parentNode,'height','auto');
					
					UI.addClass(pageNode,'hide');
					Self.num = Self.markNum = parseInt(Self._num.innerHTML);
					UI.addClass(Self._num.parentNode,'active');
					UI.removeClass(MI.Nano.followMe._num.parentNode,'active');
					Self.atNumClear();
					
					Self.cout(0);
					
					if (Self._num){
						Self._atList.innerHTML = '<li class="loading" style="line-height:200px;">&nbsp;</li>';
						if (MI.Nano.followAndNewMsgAjaxFlag) {
							MI.Nano.followAndNewMsgAjaxFlag.abort();
							MI.Nano.followAndNewMsgAjaxFlag = null;
						}
						MI.Nano.followAndNewMsgAjaxFlag = MI.ajax({
							url : MI.url.atList,
							type : 'get',
							data : Self.ajaxData,
							success : function(data){
								Self._atList.innerHTML = '';								
								//清除下 延迟加载的图片id缓存
								MI.Crs.iconPic = 'x';
								Self.atList.addMore(data);
								Self.atList.moreTimes = 0;
								
								var height = 450; //UI.windowHeight() / 4 * 3
								if (Self._atList.parentNode.scrollHeight > height){
									UI.C(Self._atList.parentNode,'height',height + 'px');
								}
								data = MI.json(data);
								if (data.info.hasNext){
									UI.removeClass(pageNode,'hide');
								}

								if(data.info.flag) {
									UI.A(neObj, 'checked', true);
									neObj.value = 1;
								} else {
									UI.A(neObj, 'checked', false);
									neObj.value = 0;
								}								
								UI.show($('atSetting'));
								UI.show($$($('atSetting'),"input")[0]);//qqbug
							}
						});
						Self.cout(15);
					}
					else {
						Self._atList.innerHTML = '<li style="line-height:200px;text-align:center;">暂时没有新提到我的，<a href="/at">查看全部>></a></li>';
						//document.location.href = '/at';
					}
					Self.display = 1;
					UI.show(Self._at);
					UI.C(Self._at,'left',UI.getX(Self._target) - 203 + 'px');
					UI.C(Self._atArrow,'left',UI.getX(Self._target) - UI.getX(Self._at) + 5 + 'px');
					UI.E(e).stop();
					return false;
				}
				UI.EA(document.body,'click',function(e){
					var E = UI.E(e);
					if (Self.display){
						if (!(E.target && (UI.parents(E.target,'atWrap')[0] || UI.parents(E.target,'D')[0]))){
							Self._atList.innerHTML = '';
							UI.hide(Self._at);
							UI.removeClass(Self._num.parentNode,'active');
							if (MI.TalkList && MI.TalkList.musicStop){ //关闭音乐播放
								MI.TalkList.musicStop();
							}
							Self.display = 0;
						}
					}
				});
				/*
                Self.atList.autoMore = function(){
                    var maxTimes = 2, moreDelay, getMore = function(){
                        clearTimeout(moreDelay);
                        moreDelay = setTimeout(more, 200);
                    };
                    var more = function(){
                        //console.log(Self.atList.moreTimes)						
                        if ((Self.atList.moreTimes < maxTimes) && (Self._atList.parentNode.scrollHeight - UI.height(Self._atList.parentNode) - Self._atList.parentNode.scrollTop < 800)) { //Self.num > 0 && 
                            //Self._atList.moreTimes ++;
                            Self.atList.more();
                            Self.cout(15);
                        }
                        if (Self.atList.moreTimes >= maxTimes) {
                            UI.ER(Self._atList, 'scroll', getMore);
							UI.show(pageNode);
                        }
                    }
                    UI.EA(Self._atList.parentNode, 'scroll', getMore);
                }
                Self.atList.autoMore();
                */
			}
		}
	},
	followAndNewMsgAjaxFlag : null,
	/**
	 * PC终端双滚动条滚动问题FIX
	 * @param {Object} o 滚动条所在的节点
	 */ 
	scrollBondEvent : function(o){		
		var relayScrollPrevent = function(e){			
		e = e || window.event;
		var E = UI.E(e), direction = 0, speed = 1;
		if (e.detail) {
			direction = e.detail > 0 ? 1 : -1;
			if (e.wheelDelta < -3 || e.wheelDelta > 3) 
				speed = 2;
		}
		else {
			direction = e.wheelDelta < 0 ? 1 : -1;
			if (e.wheelDelta < -120 || e.wheelDelta > 120) 
				speed = 2;
		}
		// IE下猛烈滚动浮层会导致Window滚动，原因是浮层尚未滚到底(顶)时，window的scroll事件已经被触发
		// 部分解决：当浮层到底(顶)距离小于80时，将浮云滚到底(顶)，并阻止默认事件。
		// 当滚动过于猛烈或者浮层高度比较不给力时，window还是会滚动一小下 具体是怎么个不给力法，描述不清。。。
		//if (UI.B.ie){
		var contentWrap = o;
		if (contentWrap.scrollHeight <= contentWrap.offsetHeight) {
			//可滚动模式
			return true;
		}
		if (speed > 1) {
			//快速滚动 且 panel可滚动 禁止                        
			E.prevent();
		}
		if (direction === 1 && contentWrap.scrollHeight - contentWrap.scrollTop - contentWrap.offsetHeight < 80) {
			E.prevent();
			contentWrap.scrollTop = contentWrap.scrollHeight - contentWrap.offsetHeight;
			return false;
		}
		else 
			if (direction === -1 && contentWrap.scrollTop < 80) {
				E.prevent();
				contentWrap.scrollTop = 0;
				return false;
			}
		return true;
	};
	
		if(o && !UI.hasClass(document.body, 'ipad')){			
			o.onmousewheel = relayScrollPrevent;
			if (UI.B.firefox) {
				o.addEventListener('DOMMouseScroll',relayScrollPrevent, false);
			}
		}
	},
	
	/**
	 * 收听提醒
	 * 
	 *            @example
	 *            MI.followMe.build();
	 *            
	 */
	followMe : {
		markNum : 0,
		markDelay : 0,
		display : 0, //显示状态
		showNum : 0, //是否显示数字
		followMeNum : 0,
		followNumClear : function(){
			var Self = this;
			
			if (Self._num) {//F5刷新时 当前页卡处于 “提到我的”，_num节点 还未存在
				Self._num.innerHTML = '';
				Self._aobj = $$($('followMe'),'a')[0];
				Self._aobj.title = '听众';
				UI.hide(Self._num);
			}
		},
		cout : function(num){ //减数字
			var Self = this;
			Self.num = Self.num - num;
			//UI.A(Self.atList._more,'rel',MI.url.atList + '?size=' + Self.num);
		},
		build : function(){
			var Self = this;
			Self._target = $('followMe');
			if (Self._target){
				Self._num = $$(Self._target,'a sub')[0];
				Self._follow = $$('.recentListBox')[0];
				Self._followCont = $$(Self._follow,'.recentListWrap')[0];
				Self._atList = $$(Self._at,'.recentList')[0];
				Self._followList = $$(Self._follow,'.wbSearch')[0];
				Self._followArrow = $$(Self._follow,'.SA')[0];

				if(!MI.user.fun.showFollower) Self.showNum = 1;

				var pageNode = UI.html('<div class="pages">\
											<div>\
												<a rel="'+MI.url.followMe+'" href="#" class="moreLink"><strong><img src="http://mat1.gtimg.com/www/mb/images/loading.gif">更 多<span>◆</span><em>◆</em></strong></a>\
											</div>\
										</div>')[0];
				var _more = $$(pageNode,"a")[0];

				Self.followList = new MI.Nano.TalkList(Self._followList,{
					_more : _more,
					useSidePanel : 0,
					comtBoxList : 0
				});
				Self.followList.relayBox.data = Self.followList.replyBox.data = Self.followList.comtBox.data = Self.followList.relayListBox.data = {
					attips : 1
				};
				Self.followList.relayBox.addList = 0;
				Self.followList.replyBox.addList = 0;
				Self.followList.comtBox.addList = 0;
				
				Self.followList.eventsCall = function(list){
					//标记新消息
					UI.each(list,function(o){
						if (Self.markNum == 1){
							UI.addClass(o,'pageLine');
						}
						if (Self.markNum > 0){
							UI.addClass(o,'newMsg');
							Self.markNum--;
						}
					});
					var li = list[Self.markNum];
				}
				//atlist 
				Self.followList.relayListCall = function(){};
				Self.followList.tmpl = MI.Nano.tmpl.followMeList;
				
				//阻止冒泡
				Self._follow.onclick = function(e){
					UI.E(e).stop();
				}

                //不提醒新增听众
				var fcObj = $('followerCount1');
				UI.EA(fcObj, 'click', function(el){
					if(!el.sending){
						el.sending = 1; 
						MI.ajax({
							url : '/asyn/setting_save.php',
							type : 'post',
							data : {followerCount:fcObj.value, r:MI.random()},
							timeout : 30000,
							fail : function(){
								el.sending = 0;
							},
							success : function(json){
								el.sending = 0;
								//设置提醒变量
								if(fcObj.value){
									Self.followNumClear();
									Self.showNum = 0;
								} else {
									Self.showNum = 1;
								}
							}
						});
					}
				});

				//点击@
				Self._target.onclick = function(e){
					UI.hide($('atSetting'));
					UI.hide($$($('atSetting'),"input")[0]);
					Self._followList.style.display = '';
					Self._atList.style.display = 'none';
					Self._atList.innerHTML = '';
					//更多按钮
								
					if($$(Self._followCont,'.pages')[0]){
						UI.remove($$(Self._followCont,'.pages')[0]);
					}
					UI.after(pageNode, Self._followList);
					
					MI.Bos("nanoTopNavFollowMe");
					
					UI.C(Self._followList.parentNode,'height','auto');
					
					UI.addClass(pageNode,'hide');
					Self.markNum = parseInt(Self._num.innerHTML);
					UI.addClass(Self._num.parentNode,'active');
					UI.removeClass(MI.Nano.newMsg._num.parentNode,'active');
					Self.followNumClear();
					
					Self.cout(0);
					//消息列表
					

					if (Self._num){
						Self._followList.innerHTML = '<li class="loading" style="line-height:200px;">&nbsp;</li>';
						var size = 0;
						if(!isNaN(Self.markNum)){
							size = Self.markNum;
						}
						if (MI.Nano.followAndNewMsgAjaxFlag) {
							MI.Nano.followAndNewMsgAjaxFlag.abort();
							MI.Nano.followAndNewMsgAjaxFlag = null;
						}
						MI.Nano.followAndNewMsgAjaxFlag = MI.ajax({
							url : MI.url.followMe,
							type : 'get',
							data : 'size=' + size,//'type=html&num='+Self.followMeNum,
							success : function(data){
								Self._followList.innerHTML = '';
								Self.followList.addMore(data);
								Self.followList.moreTimes = 0;
								var height = 450; //UI.windowHeight() / 4 * 3
								if (Self._followList.parentNode.scrollHeight > height){
									UI.C(Self._followList.parentNode,'height',height + 'px');
								}
								data = MI.json(data);
								if(data.result == 0){
									//Self._followList.innerHTML = data.info.content;
									//UI.evalScript(data.info.content);
									if (data.info.hasNext){
										UI.removeClass(pageNode,'hide');
									}
									if(data.info.flag) {
										UI.A(fcObj, 'checked', true);
										fcObj.value = 1;
									} else {
										UI.A(fcObj, 'checked', false);
										fcObj.value = 0;
									}
									UI.show($('fcSetting'));
									UI.show($$($('fcSetting'),"input")[0]);
								}else{
									MI.alert(data.msg);
								}
							}
						});
						Self.followMeNum = 0;
						//Self.cout(15);
					}
					else {
						Self._followList.innerHTML = '<li style="line-height:200px;text-align:center;">暂时没有新提到我的，<a href="/at">查看全部>></a></li>';
						//document.location.href = '/at';
					}
					Self.display = 1;
					UI.show(Self._follow);
					UI.C(Self._follow,'left',UI.getX(Self._target) - 257 + 'px');
					UI.C(Self._followArrow,'left',UI.getX(Self._target) - UI.getX(Self._follow) + 5 + 'px');
					UI.E(e).stop();
					return false;
				}
				UI.EA(document.body,'click',function(e){
					var E = UI.E(e);
					if (Self.display){
						if (!(E.target && (UI.parents(E.target,'atWrap')[0] || UI.parents(E.target,'D')[0]))){
							UI.hide(Self._follow);
							UI.removeClass(Self._num.parentNode,'active');
							if (MI.TalkList && MI.TalkList.musicStop){ //关闭音乐播放
								MI.TalkList.musicStop();
							}
							Self.display = 0;
						}
					}
				});
				/*
                Self.atList.autoMore = function(){
                    var maxTimes = 2, moreDelay, getMore = function(){
                        clearTimeout(moreDelay);
                        moreDelay = setTimeout(more, 200);
                    };
                    var more = function(){
                        //console.log(Self.atList.moreTimes)						
                        if ((Self.atList.moreTimes < maxTimes) && (Self._atList.parentNode.scrollHeight - UI.height(Self._atList.parentNode) - Self._atList.parentNode.scrollTop < 800)) { //Self.num > 0 && 
                            //Self._atList.moreTimes ++;
                            Self.atList.more();
                            Self.cout(15);
                        }
                        if (Self.atList.moreTimes >= maxTimes) {
                            UI.ER(Self._atList, 'scroll', getMore);
							UI.show(pageNode);
                        }
                    }
                    UI.EA(Self._atList.parentNode, 'scroll', getMore);
                }
                Self.atList.autoMore();
                */
			}
		}
	},
	/*
	 * 订阅/取消订阅话题
	 * 会依据操作按钮上的type属性来确定是订阅/取消订阅
	 * @param topicId 话题ID
	 * @param el 操作按钮
	 */
	topicSubscribe : function (topicId, el) {
		if (!topicId || !el || el.isSending) return;
		el.isSending = true;
		var type = UI.A(el, 'type') == 1 ? 1 : 2;
		MI.ajax({
			url: MI.url.topicFollow,
			data: {
				type: type,
				tid: topicId,
				r: MI.random()
			},
			success: function(data) {
				el.isSending = 0;
				data = MI.json(data);
				if (data.result == 0) {
					if (type === 1) {
						UI.A(el, 'type', 2);
						el.innerHTML = _('-取消订阅');
					} else {
						UI.A(el, 'type', 1);
						el.innerHTML = _('+订阅');
					}
				}else{
					MI.alert(data.msg);
				}
			}
		});
	},
	/**
	 * 添加或者取消订阅 状态切换
	 * @param {Object} param {
	 *         "add":dom,//click 订阅节点
	 *         "cancel":dom,//click 取消订阅节点
	 *         "showAdd":dom,//取消订阅后 显示的订阅的容器
	 *         "showCancel":dom//订阅后 显示的取消订阅的容器
	 * }
	 */
	topicBookAndQuit:function(param){
		var ajax = null;
		var send = function(type, topicId, callBack){//类型 id 回调
			if (ajax) {
				ajax.abort();
				ajax = null;
			}
			ajax = MI.ajax({
				url: MI.url.topicFollow,
				data: {
					type: type,
					tid: topicId,
					r: MI.random()
				},
				success: function(data){
					data = MI.json(data);
					if (data.result == 0) {
						callBack && callBack();
					}
					else {
						MI.alert(data.msg);
					}
				}
			});
		};
		if (param.add) {
			param.add.onclick = function(){
				var tid = UI.A(this, "tid");
				send(1, tid, function(){
					if (param.showCancel && param.showAdd) {
						UI.show(param.showCancel);
						UI.hide(param.showAdd);
					}
				})
			}
		}
		if (param.cancel) {
			param.cancel.onclick = function(){
				var tid = UI.A(this, "tid");
				send(2, tid, function(){
					if (param.showCancel && param.showAdd) {
						UI.hide(param.showCancel);
						UI.show(param.showAdd);
					}
				})
			}
		}
	},	
	switchHost : function (txt) {
		return txt ?  txt.replace(/http:\/\/t\.qq\.com/g,'http://1.t.qq.com') : '';
	},
	simpleConfirm : function (content, confirmCall, cancelCall) {
		if (window.confirm(content)){
			!confirmCall || confirmCall();
		}else{
			!cancelCall || cancelCall();
		}
	},
	/**
	 * 订阅/取消订阅搜索关键字订阅
	 * 会依据操作按钮上的type属性来确定是订阅/取消订阅
	 * @param topicId 搜索关键字
	 * @param el 操作按钮
	 */
	searchKeywordSubscribe : function (key, el){
		if (!key || !el || el.isSending) return;
		var type = UI.A(el, 'type') == 1 ? 2 : 3;
		el.isSending = true;
		MI.ajax({
			url : MI.url.searchFeed,
			data : {type:type,name: key,r:MI.random()},
			success : function (data) {
				el.isSending = false;
				data = MI.json(data);
				if (data.result === 0){
					if (type === 2){
						UI.A(el, 'type', 2);
						el.innerHTML = _('-取消订阅');
					}else{
						UI.A(el, 'type', 1);
						el.innerHTML = _('+订阅');
					}
				}else{
					MI.alert(data.msg);
				}
			}
		});
	},
	/**
	 * 订阅/取消订阅名单订阅
	 * 会依据操作按钮上的type属性来确定是订阅/取消订阅
	 * @param topicId 名单ID
	 * @param el 操作按钮
	 */
	listSubscribe : function (listId, el) {
		if (!listId || !el || el.isSending) return;
		var type = UI.A(el, 'type') == 1 ? 1 : 2;
		el.isSending = true;
		MI.ajax({
			url : MI.url.listFollow,
			data : {lid:listId, type:type, r:MI.random()},
			success : function(data){
				el.isSending = false;
				data = MI.json(data);
				if (data.result == 0) {
					if (type === 1){
						UI.A(el, 'type', 2);
						el.innerHTML = _('-取消订阅');
					}else{
						UI.A(el, 'type', 1);
						el.innerHTML = _('+订阅');
					}
				}else{
					MI.alert(data.msg);
				}
			}
		});
	}
}

})();

MI.newCountShow = function(data) {
	if (data.result == 0) {
		var _num,
			num,
			maxNum,
			tip,
			tipNum = 0,
			showMsgBox,
			_new;

		//当前与页面帐号不符时，刷新页面
		if (data.user && data.user != MI.user.account){
			document.location.reload();
			return;
		}
		
		UI.each(data.info,function(o,i){
			num = o.value;
			//听众
			if (o.type == 1 && MI.Nano.followMe.showNum) {
				MI.Nano.followMe.followMeNum = num;
				maxNum = 99;
				//右上角收听盒子
				_num = $('followMe') && $$($('followMe'),'a sub')[0];
				if (_num){
					_num.innerHTML = num > maxNum ? maxNum + '+' : num;
					if (num){
						_num.title = _('有{0}个新听众',num);
						_aobj = $$($('followMe'),'a')[0];
						_aobj.title = _('有{0}个新听众',num);
						UI.show(_num);
					}
					else {
						UI.hide(_num);
					}
				}
			}
			//私信
			if (o.type == 2) {
				maxNum = 99;
				_num = $('newCoutMsg');
				if (_num && num) {
					num = num > maxNum ? maxNum + "+" : num;
					_num.innerHTML = _num && num ? num : '';
					_num.style.display = 'block';
					_num.parentNode.title = _('有{0}封新私信',num);
				}
			}
			//新消息数
			if ((o.type == 3 || o.type == 5 || o.type == 6 || o.type == 7 || o.type == 15 || o.type == 16 || o.type == 32) && !MI.noNewCount) {
				if (MI.talkList && MI.talkList._new) {
					maxNum = 50000;
					if (o.type == 6 || o.type == 7){
						maxNum = 100;
					}
					if (o.type == 16) {
						maxNum = 30;
					}
					if (num >= maxNum) {
						tip = _('超过<strong>{0}</strong>条的',maxNum);
					}
					else tip = _('<strong>{0}</strong>条',num);
					_new = MI.talkList._new;
					var tips = '';
					if(num==1)
						tips = _('约{0}新广播，点击查看',tip);
					else if(num>1)
						tips = _('约{0}新广播，点击查看<i class="l"></i>',tip);
					//搜索广播添加
					if (MI.newCount.showNum)
						tips = _('<strong></strong>有新广播，点击查看');
					_new.innerHTML = '<a href="javascript:void(0)" tabindex="4" accesskey="x">' + tips + '</a>';
					
					if (!MI.newCount.showNum)
					{
						//Title Tip
						MI.newCount.setTitle(num,maxNum);
						MI.newCountNum = num;
					} else {
						MI.newCountNum = 0;
					}

					if (num) {
						_new.style.display = 'block';
						MI.Bos('btnkNewShow',num,0.001);
					}
					else {
						UI.hide(_new);
					}
					if (_new.num != num) {
						UI.C(_new,'opacity',0);
						UI.animate(_new,'opacity',1);
					}
					_new.num = num;
				}
			}
			//评论我的
			if(o.type == 18) {
				maxNum = 99;
				if (MI.user.fun.comm){
					target = $('newCoutComt');
					if(target) {
						target.innerHTML =  num ? '(' + num + ')' : '';
					}
				}
				else {
					target = $('newCoutAt');
					if (num && target){
						num = num + parseInt(target.innerHTML.replace(/\D/g,'') || 0);
						target.innerHTML =  '(' + num + ')';
					}
					if (num){
						//右上角@盒子
						target = $('newMsg') && $$($('newMsg'),'a sub')[0];
						if (target){
							target.innerHTML = num > maxNum ? maxNum + '+' : num;
							target.title = _('有{0}条提到我的',num);
							if (num){
								UI.show(target);
							}
							else {
								UI.hide(target);
							}
						}
					}
				}
			}
			//提到我的
			if(o.type == 4 || o.type == 14) {
				_num = $('newCoutAt');
				maxNum = 99;
				if (UI.isArray(num)) {
					num = num[0];
				}
				if (_num) {
					_num.innerHTML = num ? '(<strong>' + num + '</strong>)' : '';
				}
				
				//右上角@盒子
				_num = $('newMsg') && $$($('newMsg'),'a sub')[0];
				if (_num){
					_num.innerHTML = num > maxNum ? maxNum + '+' : num;
					if (num){
						_num.title = _('有{0}条提到我的',num);
						_aobj = $$($('newMsg'),'a')[0];
						_aobj.title = _('有{0}条提到我的',num);
						UI.show(_num);
					}
					else {
						UI.hide(_num);
					}
				}
			}
			// 微群聚合页的消息提醒
			if(o.type == 17){
				target = $$('#home_mygroup_top a')[0];
				/// 是否要更新当前的下来列表
				if (target){
					MI.newCount.checkDropList(target,num,$$('.home_mygroup_top')[0]);				
					if(!UI.hasClass($('home_mygroup_top'),"select")){
						MI.newCount.dot(target,num);
					}
				}
				
			}
		});
	}
}
/**
 * 异步接口地址
 * 
 * @type {Object}
 */
if (MI.url){
	MI.url.allMyList = '/asyn/allmylist.php'; //我的名单
	MI.url.relayList = '/message_relay_frame.php'; // 转播列表
	MI.url.atList = '/asyn/at.php'; // at列表
	MI.url.followMe = '/asyn/follower.php'; // 收听列表
	//MI.url.relayListAt = '/atMessageFrame.php'; // 查看转播列表
	MI.url.relayListSecond = '/message_relay_second.php'; // 查看二次转播列表
	//MI.url.uploadPic = 'http://t.qq.com' + MI.url.uploadPic; // 上传图片
}
/**
 * 发表框
 * @namespace MI.Nano.TalkBox 发表框
 * @constructor
 * @param {String} String 发表框ID（或DOM对象）
 *            @example
 *            MI.talkBox = new MI.Nano.TalkBox('talkBox');
 */
MI.Nano.TalkBox = function(id,config){
	//继承
	var Self = new MI.TalkBox(id,config);
	for (var i in MI.Nano.TalkBox.prototype){
		Self[i] = MI.Nano.TalkBox.prototype[i];
	}	
	
	//事件重写
	var delay = setInterval(function(){
		if (Self._pic){
			Self.eventRewrite();
			clearInterval(delay);
		}
	},50);
	return Self;
};
MI.Nano.TalkBox.prototype = {
	eventRewrite : function(){
		var Self = this;
		Self._pic = Self.$('.uploadPic');
		Self._picForm = Self.$('.picForm');
		Self._picBtn = Self.$('.picForm input');
		Self.picUploadBuild = null; //去掉主站的图片上传浮层
		
		//添加统计
		var bos = function(el,type){
			el && UI.EA(el,"click",function(){
				//console.log(el," ",type)
				MI.Bos(type);
			})
		}
		bos(Self._face,"nanoTalkboxFace");
		bos(Self._picBtn,"nanoTalkboxPic");
		bos(Self._musicAnchor,"nanoTalkboxMusic");
		bos(Self._videoAnchor,"nanoTalkboxVideo");
		bos(Self._btn,"nanoTalkboxPost");
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
			var imageUploadName = 'imageUpload_' + MI.random(),	action = 'http://upload.t.qq.com' + MI.url.uploadPic, 
					iframe = '<iframe id="' + imageUploadName + '" name="' + imageUploadName + '" src="about:blank" style="display:none"></iframe>',
					html = UI.html(iframe), frag = document.createDocumentFragment();
			UI.each(html, function (o){	UI.append(o, frag); });
			UI.append(frag,Self._pic);
			// for qq browser in iOS
			if (MI.user.fun.qbUpload){
				action = 'http://wbupload://t.qq.com/asyn/updateGrabPic.php?retType=1&amp;cookiejs=MI.TalkBox.cur.qbUploadCookie&amp;successjs=MI.TalkBox.cur.addPic';
				Self._qbPicUploadBtn = $$(Self._picForm, 'input')[0];
				Self._qbPicUploadBtn.onclick = function () {
					UI.hide(Self._picInsertBox);
					UI.hide(Self._sourcepicBox);
					Self._video && UI.hide(Self._videoBox);
					Self._music && MI.Music && Self._musicBox && MI.Music.hide();
					Self.uploadPic();
					Self.PicUpTime = + new Date(); //图片上传时间
					Self._picForm.submit();
					MI.Bos('btnPic');
				};
			}
			
			Self._picForm.reset();
			UI.A(Self._picForm,'action', action);
			if (MI.user.fun.qbUpload){
				Self._picForm.removeAttribute('target');
			}else {
				UI.A(Self._picForm,'target',imageUploadName);
			}
		
			Self._iframe = $(imageUploadName);
			Self._picIco = $$(Self._pic,'.ico_pic')[0];
			Self._picTxt = $$(Self._pic,'.txt')[0];
			
			/*Self._picLoading = $$(Self._pic,'.loading')[0];
            Self._picPreview = $$(Self._pic,'.preview')[0];
            Self._picDel = $$(Self._pic,'.del')[0];
            Self._picCancel = $$(Self._pic,'.cancel')[0];*/
			
			//重新设置 loading preview del cancel
			var warp=$$(Self._sendStatus.parentNode,".DWrap")[0];            
            UI.append(Self._sendStatus,warp);
			//var uploadPicS = '<div class="sendThumbs uploadPicS"><span style="display:none" class="pidLoad loading">' + _("上传中") + '<a class="cancel" href="#">[' + _("取消") + ']</a></span><span style="display:none;" class="preview"><span class="link"><em class="sico ico_pic"></em><a href="#" class="fileName" target="_blank"></a></span><a href="#" class="del">[' + _("删除") + ']</a></span></div>';
			//Self._uploadPicS = UI.html(uploadPicS)[0];			
			//UI.append(Self._uploadPicS,Self._sendStatus);		
			Self._picLoading = $$(Self._uploadPicS,'.loading')[0];
			Self._picPreview = $$(Self._uploadPicS,'.preview')[0];
			Self._picDel = $$(Self._uploadPicS,'.del')[0];
			Self._picCancel = $$(Self._uploadPicS,'.cancel')[0];
			
			
			
			
			
			var picNav = function(j){
				UI.addClass(this,'hover');
				clearTimeout(Self.delay.picBtn);
				UI.show(Self._picInsertBox);
				if (!(UI.B.ipad)&&!(UI.hasClass(document.body,'ipad')) && !Self.pic && Self._picLoading &&  UI.C(Self._picLoading,'display') == 'none'){
					if(!Self._picCapture){
						return ;
					}
					
					UI.show(Self._picCapture);					
					var txt = $$(Self._picCapture,'.txt')[0];
					if (!UI.A(txt,'Event')){
						if (MI.Capture && MI.Capture.enable){
							txt.onclick = function(){
								MI.Capture.screen.DoCapture();
								return false;
							};
						}
						else {
							txt.onclick = function(){
								MI.confirm({
									title : _('你还未安装腾讯微博截屏插件'),
									content : _('安装后，你就可以使用截屏功能'),
									confirmTxt : _('安装'),
									confirm : function(){
										MI.Capture.install();
									}
								});
								return false;
							};
						}
						UI.A(txt,'Event',1);
					}
				}
				UI.E(j).stop();
			};
			Self.picNav = picNav;
			Self._pic.onmouseover = picNav;
			Self._pic.onmouseout = function(){
				UI.removeClass(this,'hover');
				Self.delay.picBtn = setTimeout(function(){
					UI.hide(Self._picInsertBox);
				},10);
			};
			Self._picTxt.onmouseover = function(j){
				if (UI.hasClass(document.body,'ipad')) return;
				UI.removeClass(this, "mOut");
				UI.E(j).stop();
			};
			Self._picTxt.onclick = null;
			Self._picForm.onsubmit = function(){
				if (!Self._picBtn.value) {
					return false;
				}
			};
		
			var picChange = function(){ //Upload
				var fileName = this.value,
					fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length).toLowerCase();
				if (!'jpg,jpeg,gif,png'.hasString(fileType)) {
					MI.alert(_('仅支持jpg、jpeg、gif、png图片文件'));
					return false;
				}
				UI.hide(Self._picInsertBox);				
				UI.hide(Self._sourcepicBox);
				Self._video && UI.hide(Self._videoBox);
				Self._music && MI.Music && Self._musicBox && MI.Music.hide();
				Self.uploadPic();
				Self.PicUpTime = + new Date(); //图片上传时间
				Self._picForm.submit();
				Self.hideMedia();
				MI.Bos('btnPic');
			};
			
			Self.picChange = picChange;
			Self._picBtn.onchange = Self.picChange;
			Self._picBtn.onclick = function(){
				Self.delay.condensed && clearTimeout(Self.delay.condensed);
			}
			if (UI.hasClass(document.body,'ipad')){ //Disable Upload
				Self._picTxt.onclick = function(e){
					if (UI.B.ipad){
						//MI.alert(_('此浏览器暂不支持图片上传，请到App Store下载并安装<a href="http://itunes.apple.com/cn/app/id370130751" style="text-decoration:underline">腾讯微博免费客户端</a>。'));
						alert(_('此浏览器暂不支持图片上传，请到App Store下载并安装腾讯微博免费客户端。'));
					}
					else {
						alert(_('此浏览器暂不支持图片上传，建议您使用QQ浏览器。'));
					}
					UI.show(Self._picInsertBox);
		
					MI.Bos('btnPicDisable');
					UI.E(e).stop();
					return false;
				};
				Self._pic.onmouseout = function(){
					if(Self._picInsertBox && Self._picInsertBox.style.display != 'none'){
						UI.EA(document.body,'click',function(){UI.hide(Self._picInsertBox);});
					}
				};
				Self._pic.onmouseover = null;
				/*
				Self._picForm.onclick = function(){
					alert(_('对不起，由于您的浏览器安全限制不支持图片上传，建议您使用QQ浏览器。'));
					MI.Bos('btnPicDisable');
					return false;
				}*/
				UI.hide(Self._picForm);
				UI.hide(Self._picCapture);
				UI.hide(Self._picMulti);
			}
			Self._picDel.onclick = function(){ //Delete
                //icon 删除灰色
                UI.removeClass(Self._pic, "disabled");
				Self.delPic();
				Self._pic.onmouseover = picNav;
				MI.Bos('btnPicDel');
				return false;
			};
			Self._picCancel.onclick = function(){ //Cancel
                //icon 删除灰色
                UI.removeClass(Self._pic, "disabled");
				Self.cancelPic();
				Self._pic.onmouseover = picNav;
				MI.Bos('btnPicCancel');
				return false;
			};
		}
	},
	uploadPic : function(){
		var Self = this;
		Self._pic.onmouseover = null;
		UI.show(Self._picLoading);
		UI.addClass(Self._picLoading,'loading');
		UI.hide(Self._picForm);
		//UI.hide(Self._picTxt);
		//UI.hide(Self._picIco);
		UI.hide(Self._picCapture);
		MI.Nano.TalkBox.cur = Self;
		//icon 至灰色
		UI.addClass(Self._pic,"disabled");
		!(UI.hasClass(Self._sendCnt,'hasMedia')) && UI.addClass(Self._sendCnt,'hasMedia');
	},
	/**
	 * 插入图片
	 * @param {Object} Object 图片数据
	 *            @example
	 *            MI.talkBox.addPic({result:0,msg:'上传成功','info':{'image':'http://mblogpic.store.qq.com/mblogpic/912aac4876512cda449a','path':'20110322/bb8e2c6c6dca28470e9f6e353614087a','host':'upload5.t.qq.com'});
	 */
	addPic : function(o){
		var Self = this,
			pic,
			normalPic,
			host,
			Time,Time_1,Time_2,Time_3;
		Self._pic.onmouseover = null;
		Time = Self.PicUpTime;
		Time_1 = + new Date();
		UI.hide(Self._picLoading);
		//UI.hide(Self._picTxt);
		UI.hide(Self._picForm);
		UI.show(Self._picIco);
		if (o.result == 0) {
			UI.removeClass(Self._pic,'hover');
			host = o.info.host;
			pic = o.info.image;
			normalPic = pic.hasString('mblogpic.store.qq.com/mblogpic') || pic.hasString('qpic.cn'); 
			Self.pic = pic;
			
			var turnPicAble = MI.user.fun.turnPic && o.info.path,
				fileName = o.info.fileName || Self._picBtn.value,
				fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length),
				$file = $$(Self._picPreview, '.fileName')[0];
				
			if(!$file){
				var em = $$(Self._picPreview, 'em')[0];
				$file = UI.html('<a href="#" class="fileName" target="_blank"></a>')[0];
				UI.after($file,em);
			}	
			fileName = fileName.match(/[^\/|\\]*$/)[0].replace(fileType,'');
			fileName = MI.string.cut(fileName,10) + fileType;
			
			$file.innerHTML = fileName;
			UI.A($file, 'href', pic + '/2000');
	
			UI.show(Self._picPreview);
			if (Self._txt.value == '' && fileName != _('表情.jpg')) {
				Self._txt.value = Self.txtPic;
				Self.countTxt();
			}
			Self.focus();
		}
		else {
			UI.show(this._picTxt);
			UI.show(this._picForm);
			Self._pic.onmouseover =	Self.picNav; 
			MI.alert(o.msg);
		}
		Self._picForm.reset();
	
		//Speed
		if (Time){
			Time_2 = + new Date() - Time;
			setTimeout(function(){
				Time_3 = + new Date() - Time;
				MI.Speed('t_asyn_uploadpic',1,Time_1,Time_2,Time_3);
			},0);
		}
		Self.PicUpTime = null;
	},
	/**
	 * 删除图片
	 *            @example
	 *            MI.talkBox.delPic();
	 */
	delPic : function(){
		var Self = this;
		if (Self._pic) {
			Self.pic = this.sourcePic = '';
			Self._picForm.reset();
			UI.hide(Self._picPreview);
			UI.hide(Self._picLoading);
			UI.show(Self._picIco);
			UI.show(Self._picTxt);
			UI.show(Self._picForm);
			UI.show(Self._multiPic);
			if (Self._txt.value == Self.txtPic) {
				Self._txt.value = '';
			}
			if(Self.txtSummary){
				Self._txt.value = Self._txt.value.replace(Self.txtSummary,'');
				Self.txtSummary = '';
			}
			
			if(UI.B.chrome) {
				Self._picForm.innerHTML = Self._picForm.innerHTML;
				Self._picBtn = $$(Self._picForm, 'input')[0];
				Self._picBtn.onchange = Self.picChange;
			}
			Self.countTxt();
			(UI.children(Self._sendStatus,'sendThumbs').length < 2) && UI.removeClass(Self._sendCnt,'hasMedia');
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
			(UI.children(this._sendStatus,'sendThumbs').length < 2) && UI.removeClass(this._sendCnt,'hasMedia');
		}
	},
	tmpl : MI.Nano.tmpl.listAll
}

MI.TalkBox.prototype.tmpl = MI.Nano.tmpl.listAll;
MI.TalkBox.prototype.source = 1720;  //显示来自体验版

//重写新广播事件
MI.TalkList.prototype._newClick = function(){
	var Self = this;
	if(Self._pages){		
		var pchilds = UI.children(Self._pages);
		if(pchilds[0].nodeName == "A"){
			UI.hide(Self._new);
			pchilds[1].onclick();
			return false;
		}
	} 
	
	var num = $$(this._new,'strong')[0];
	if (num){
		this.newly();
		MI.Bos('btnkNew',parseInt(num.innerHTML));
	}
	
	return false;
}

MI.Nano.TalkList = function (id,config) {
	//继承
	var Self = new MI.TalkList(id,config);
	for (var i in MI.Nano.TalkList.prototype){
		Self[i] = MI.Nano.TalkList.prototype[i];
	}

	//判断是否有分页
	if(config && config.usePage && Self.pageNav && UI.isFunction(Self.pageNav)){
		Self.pageNav();		
	}

	//发表框
	Self.talkBoxTmpl = MI.Nano.tmpl.reply;
	Self._talk = UI.html(Self.talkBoxTmpl)[0];
	Self._relay = UI.html(Self.talkBoxTmpl.replace('<div class="left"></div>','<div class="left" style="display:none"><label for="replayQzoneCheckbox" style="display:"><input id="replayQzoneCheckbox" type="checkbox" class="check1">' + _('分享到空间') + '</label></div>'))[0];
	Self._comt = UI.html(Self.talkBoxTmpl.replace('<div class="left"></div>','<div class="left" style="display:none"><label for="replayListCheckbox" style="display:"><input id="replayListCheckbox" type="checkbox" class="check1">' + _('同时转播') + '</label></div>'))[0];
	// 右侧浮层模板
	//Self._sidePanelTmpl = MI.Nano.tmpl.sidePanel;
	// 右侧信息栏
	//Self._side = $$($('mainWrapper'), '.side')[0];
	//转播列表回调
	Self.relayListCall = function(list){
        var nodes = $$(list, 'strong a,em a,.more a,.effect a,.cNote2 a');
        MI.Nano.SidePanel.userProfile(nodes);
        //筛选出 微群
		var atList = $$(list, 'em a'),atQun=[];
		//过滤出微群 $$ rel^=@* ie6 7 不管用
        UI.each(atList,function(el){
            var rel = UI.A(el.parentNode , "rel");
            if(rel && rel.slice(0,2) == "@*"){
                atQun.push(el);
            }
        })
		atQun.length>0 && MI.Nano.SidePanel.qunProfile(atQun);
		
		var topicList=$$(list,".content a"),topicArr=[],topicR=/#[\S\s]*#/gi;
		UI.each(topicList,function(el){
            if(el.innerHTML.match(topicR)){
                topicArr.push(el)
            }
        });
        MI.Nano.SidePanel.topicProfile(topicArr);
		 
	}

	//事件重写
	var delay = setInterval(function(){
		if (Self.urlPreview){
			Self.eventRewrite();
			clearInterval(delay);
		}
	},50);
	return Self;
};
MI.Nano.TalkList.prototype = {
	eventRewrite : function(){
		var Self = this;
		if (Self.urlPreview && !Self.urlPreview.clone){
			Self.urlPreview.clone = 1;
			Self.urlPreview.tmpl = '<div class="urlPreview specialBar">\
				<div class="SA" style="display:none;"><em>◆</em><span>◆</span></div>\
				<a class="close" href="javascript:void(0)"></a>\
				<div class="urlIntro"><p></p></div><div class="urlCnt"></div></div>';
			Self.urlPreview.build = function(){
				var _outer = UI.html('<div class="detailPanelOuter"><div class="detailPanelShell"></div></div>')[0];
				var _shell = $$(_outer, '.detailPanelShell')[0];
	            UI.append(this._body, _shell);
				UI.append(_outer, $$('.mainInside')[0]);
			}
			Self.urlPreview.navH = 55;
			Self.urlPreview.MIN_H = 100;
			Self.urlPreview.setPos = function(pos){
				var w,h,
					x = pos[0],
					y = pos[1],
					margin = 5,	 //距离浏览器边距
					winH = UI.windowHeight() - 2*margin - this.navH,  //40为新导航条高度
					winW = UI.windowWidth() - ((UI.B.ie && !UI.B.ie9) ? -5 : 13) - margin; //20为垂直滚动条宽度
				if(winH >= this.MIN_H) {
					h = winH;	
				} else {
					h = this.MIN_H;
				}
				if(winW - pos[0] > this.MAX_W) {
					w = this.MAX_W;
				} else if (winW - pos[0] < this.MIN_W) {
					w = this.MIN_W;
					x = winW - w;
				} else {
					w = winW - pos[0];
				}
				y = UI.scrollY() + margin + this.navH;
				
				this._body.style.cssText = 'left:611px;width:' + w + 'px;height:' + h + 'px;';
				this._cnt.style.cssText = 'height:' + (h - 36) + 'px;';  //36为标题高度
			}
			Self.urlPreview.data = {
				site : 1
			};
		}
	},
	eventCall : function (el){
		var Self = this,
			// id
			elId = el.id,
			// 时间点 ex '刚刚'
			time = $$(el,'.time'),
			// 用户头像Wrap
			userPicWrap = $$(el, '.userPic a')[0],
			// 用户头像
			userPic = $$(el,'.userPic img'),
			// 内容
			content = $$(el,'.msgCnt'),
			// 图片
			picBox = $$(el,'.picBox')[0],
			// 视频
			videoBox = $$(el,'.videoBox')[0],
			
			// 消息内容
			msgBox = $$(el, '.msgBox')[0],
			// 消息内容中的消息发表者
			authors = $$(msgBox, 'strong a'),
			// 消息内容中的@
			ats = $$(msgBox, 'em a'),
			// 消息内容中的@微群
			atQun = [],//$$(msgBox,"em[rel^='\@\*'] a"),	
			
			// 查看转发链接
			relayLink = $$(el, '.zfNum')[0],
			// 查看二手转发链接
			secondRelayLink = $$(el, '.zfNum2')[0],
			//分享
			shareBtn = $$(el, '.funBox .shareBtn'),
			// 用户名->点击出右侧客人资料
			names = [userPicWrap];
			// 找人 共同收听
			sameFriends = $$(el ,".relInfo a");
			
		if (!UI.B.ipad && el.nodeName == 'LI') {
			MI.addHover(el);
		}
		
		names = names.concat(ats, authors).concat(sameFriends);
		
		//过滤出微群 $$ rel^=@* ie6 7 不管用
		UI.each(ats,function(el){
			var rel = UI.A(el.parentNode , "rel");
			if(rel && rel.slice(0,2) == "@*"){
				atQun.push(el);
			}
		})
		
		//过滤出话题
		var msgCntA = [], topicArr = [], topicR = /#[\S\s]*#/gi;
		if (msgBox) {
			msgCntA = $$(msgBox, ".msgCnt a");
		}
		
		UI.each(msgCntA,function(el){
			if(el.innerHTML.match(topicR)){
				topicArr.push(el)
			}
		});

		//分享
		if(shareBtn && shareBtn.length > 0){
			shareBtn = shareBtn[0];
			shareBtn.onclick = function(){
				MI.app({
					TalkListShare : function(){
						MI.TalkList.shareCollection.show(elId);
						//暂时隐藏私信分享
						//var liList=$$(MI.TalkList.shareCollection.body,".shareTitle li")
						//UI.hide(liList[liList.length-1]);
					}
				});
				return false;
			}
		}
		
		
		//添加统计 人名 头像
		UI.each(authors, function(el){
			UI.EA(el, "click", function(){
				MI.Bos("nanoTalklistName");
			})
		})
		
		UI.EA(userPicWrap, "click", function(){
			MI.Bos("nanoTalklistHead");
		})
		
		if(Self.useSidePanel != 0){
			//绑定 个人信息浮层                 
            MI.Nano.SidePanel.userProfile(names);
			//绑定话题
			MI.Nano.SidePanel.topicProfile(topicArr);
			//绑定 微群			
			atQun && atQun.length>0 && MI.Nano.SidePanel.qunProfile(atQun);
		}else{
			UI.each(names,function(o){UI.A(o,"target","_blank")});
			UI.each(topicArr,function(o){UI.A(o,"target","_blank")});
		}
		
		
		//视频icon模式个性展示 by wujian
		if(videoBox && Self.iconPic) {			
			UI.append(videoBox.parentNode,content[content.length - 1]);			
		}

		//其他非通用页面回调函数
		if(Self._listCall && UI.isFunction(Self._listCall)){
			Self._listCall(el);
		}
	},
	tmpl : MI.Nano.tmpl.listAll
}

//翻页模式
MI.Nano.TalkList.prototype.pageNav = function(){
	var Self = this;

	//根据id判断是否翻页
	Self._pages = $('pageNav');
	if(!Self._pages) return;
	var pages = $$(Self._pages, 'a');
	Self._more = Self._pages;

	//绑定事件
	UI.each(pages, function(o, i){
		
		o.onclick = function(){
			var rel = UI.A(o, 'rel');

			//显示加载动画
			var listHeight = UI.height(MI.talkList._body);
			MI.talkList.clear('<li class="loading" style="height:' + (listHeight > 700 ? listHeight : 700) + 'px;background-position:50% 100px;border-bottom:0!important;">&nbsp;</li>');
			window.scrollTo(0,0);
			MI.ajax({
				url : rel,
				type : 'get',
				data : '',
				success : function(data){
					//显示列表						
					MI.talkList.clear();
					data = MI.json(data);
					if (data.result == 0) {
						if (data.info.talk && data.info.talk.length > 0) {
							if (data.info.hasnext == 1) {
								//UI.show(MI.talkList._more);
							}
							UI.show(MI.talkList._body);
							if (MI.talkList._tip) {
								UI.hide(MI.talkList._tip);
							}
							MI.talkList.addMore(data);
							
							var page=UI.html(data.info.page);
							Self._pages.innerHTML="";
							UI.each(page,function(el){
								UI.append(el,Self._pages);
							});							
							MI.talkList.pageNav();
							
							//检查 ul中的li数量
							var li=$$($("talkList"),"li");								
							if(li.length==0){
								MI.Bos("nano_error_jsrender");
							}
							
						} else {
							UI.hide(MI.talkList._body);
							UI.hide(MI.talkList._more);
							if (MI.talkList._tip) {
								UI.show(MI.talkList._tip);
							}
						}						
					}				
				}
			});

			return false;
		}
	});

}


/**
 * 右侧客人页浮层
 */
MI.Nano.SidePanel = (function(){
	//存储
	var _this = {
		sidePanel: null,
		detailPanel: null, //右侧展开动画 调整left值使用此对象
		contentWrap: null, //内容更新容器节点		
		_sidePanelTmpl: MI.Nano.tmpl.sidePanel,// 右侧浮层模板
		_side: $$($('mainWrapper'), '.side')[0],// 右侧信息栏		
		sidePanelResizeTimer: null,
		sidePanelScrollTimer: null,
		sidePanelVisible: false,
		/**
		 * 是否使用右侧浮层
		 */
		useSidePanel: 1,
		/**
		 * 右侧浮层类型
		 * 0 没有面板 1 转播列表面板 2 客人资料卡面板
		 */
		curSidePanel: 0,
		// curUser : null,
		//窗口模式
		windowModel:"big",	    
		/**
		 * 动画返回值
		 */
		animate: null,
		/**
		 * 动画 起始参数 分别为 两种模式
		 */
		animateParam:{
			big:{
				start:0,//开始left值
				end:611//展示后 left
			},
			small:{
				start:611,
				end:0
			}
			
		},		
		//isLoadingUserProfile : false,
		"ret": null,
		op: {}
	
	}, _eventHandler = {
		close_btn_onclick: function(){
			_funs.closePanel();
			return false;
		},
		relayScrollPrevent: function(e){
			e = e || window.event;
			var E = UI.E(e), direction = 0, speed = 1;
			if (e.detail) {
				direction = e.detail > 0 ? 1 : -1;
				if (e.wheelDelta < -3 || e.wheelDelta > 3) 
					speed = 2;
			}
			else {
				direction = e.wheelDelta < 0 ? 1 : -1;
				if (e.wheelDelta < -120 || e.wheelDelta > 120) 
					speed = 2;
			}
			// IE下猛烈滚动浮层会导致Window滚动，原因是浮层尚未滚到底(顶)时，window的scroll事件已经被触发
			// 部分解决：当浮层到底(顶)距离小于80时，将浮云滚到底(顶)，并阻止默认事件。
			// 当滚动过于猛烈或者浮层高度比较不给力时，window还是会滚动一小下 具体是怎么个不给力法，描述不清。。。
			//if (UI.B.ie){
			var contentWrap = _this.contentWrap;
			if (contentWrap.scrollHeight <= contentWrap.offsetHeight) {
				//可滚动模式
				return true;
			}
			if (speed > 1) {
				//快速滚动 且 panel可滚动 禁止                        
				E.prevent();
			}
			if (direction === 1 && contentWrap.scrollHeight - contentWrap.scrollTop - contentWrap.offsetHeight < 80) {
				E.prevent();
				contentWrap.scrollTop = contentWrap.scrollHeight - contentWrap.offsetHeight;
				return false;
			}
			else 
				if (direction === -1 && contentWrap.scrollTop < 80) {
					E.prevent();
					contentWrap.scrollTop = 0;
					return false;
				}
			return true;
		},
		windowScrollHanlder: function(){
			if (!_this.sidePanelVisible) {
				return;
			}
			var from = UI.C(_this.sidePanel, 'top').replace(/px;?/, '') * 1, to = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop, step = 0, cur = 0, time = 20, animateTimer = null, animate = function(){
				clearInterval(animateTimer);
				animateTimer = setInterval(function(){
					if (--time) {
						cur += step;
						UI.C(_this.sidePanel, 'top', Math.round(cur) + 'px');
					}
					else {
						clearInterval(animateTimer);
						UI.C(_this.sidePanel, 'top', to + 'px');
					}
				}, 10);
			};
			from = from ? from : 0;
			step = (to * 1 - from) / 20;
			cur = from;
			clearTimeout(_this.sidePanelScrollTimer);
			_this.sidePanelScrollTimer = setTimeout(function(){
				animate();
			}, 200);
		},
		window_resize: function(){
			if(_this.checkModelTimer){
				clearTimeout(_this.checkModelTimer);
				_this.checkModelTimer=null;
			}
			_this.checkModelTimer=setTimeout(function(){
				//根据宽度 自适应 是否切换成小窗模式
				if(MI.user.fun.smallwindow){
					_funs.updateWindowModel();
				}
                
			},300)
			
			if (!_this.sidePanelVisible) {
				return;
			}
			clearTimeout(_this.sidePanelResizeTimer);
			_this.sidePanelResizeTimer = setTimeout(function(){
				//适应高度
				_funs.reHeightSidePanel();		    
			}, 300);
		}
	}, _funs = {
		createSidePanel: function(){
			if (_this.sidePanel) 
				return;
			var windowHeight = UI.windowHeight(), close_btn = null;
			_this.sidePanel = UI.html(_this._sidePanelTmpl)[0];
			// 关闭按钮
			close_btn = $$(_this.sidePanel, '.close')[0];
			close_btn.onclick = _eventHandler.close_btn_onclick;
			
			// 转播列表高度适应窗口大小
			UI.EA(window, 'resize', _eventHandler.window_resize);
			//setTimeout(function(){_eventHandler.window_resize();},100);
			
			
			// 移动终端|| ie6转播浮层定位处理 原因是这两者不支持position:fixed 解决办法滚动转播浮层
			if (UI.hasClass(document.body, 'ipad') || UI.B.ie6) {
				UI.C(_this.sidePanel, 'position', 'absolute');
				
				UI.EA(window, 'scroll', _eventHandler.windowScrollHanlder);
				_eventHandler.windowScrollHanlder();
			}
			
			_this.detailPanel = $$(_this.sidePanel, '.detailPanel')[0];
			UI.C(_this.detailPanel, 'height', windowHeight - 65 + 'px');
			_this.contentWrap = $$(_this.sidePanel, '.panelContentWrap')[0];
			UI.C(_this.contentWrap, 'height', windowHeight - 96 + 'px');
			
			// 解决IPAD上拖动转播列表拖动问题
			if (UI.hasClass(document.body, 'ipad')) {
				var scrollStartPos = 0;
				_this.contentWrap.ontouchstart = function(e){
					scrollStartPos = this.scrollTop + e.touches[0].pageY;
					var tar = e.target;
					// 防止Safiri返回错误的事件来源对象
					if (tar.nodeName === '#text') 
						tar = tar.parentNode;
					// 如果是某种可点击元素 则取消阻止默认事件 实际情况就是拖动可点击元素 拖动的是整个页面
					// 浮层中可点击的元素都要在此列出，否则点击无效
					if (tar.nodeName !== 'A' && tar.nodeName !== 'INPUT' &&
					tar.nodeName !== 'TEXTAREA' &&
					tar.nodeName !== 'LABEL') 
						e.preventDefault();
				};
				_this.contentWrap.ontouchmove = function(e){
					this.scrollTop = scrollStartPos - e.touches[0].pageY;
				};
			}
			// PC终端双滚动条滚动问题FIX
			if (!UI.hasClass(document.body, 'ipad')) {
				_this.contentWrap.onmousewheel = _eventHandler.relayScrollPrevent;
				if (UI.B.firefox) {
					_this.contentWrap.addEventListener('DOMMouseScroll', _eventHandler.relayScrollPrevent, false);
				}
			}
			UI.append(_this.sidePanel, $$($('mainWrapper'), '.mainInside')[0]);
			UI.EA(document.body, 'click', function(e){
				if (!_this.curPlugin) {
					return;
				}
				var param = _this["op"][_this.curPlugin], opt = "bodyClickClose";
				if (opt in param && param[opt] == false) {//设置的参数 做判断 
					return;
				}
				var E = UI.E(e);
				if (_this.sidePanelVisible && !_this.animate && !E.target.nodeName.toLowerCase() != "button") {
					if (!(E.target && UI.parents(E.target, 'D')[0])) { //||UI.parents(E.target,"ignore")[0])
						_funs.closePanel();
					}
				}
			});
			// 阻止冒泡
			_this.detailPanel.onclick = function(e){
				var E = UI.E(e);
				if (E.target.nodeName.toLowerCase() == "a" || E.target.nodeName.toLowerCase()=="input") {
					//清除插件缓存 只对detailPanel中的a或者input 做清除响应
					if (_this.curPlugin) {
						var clearCache = _this["op"][_this.curPlugin].clearCache;
						clearCache && clearCache();
					}
				}
				UI.E(e).stop();
			}
			//根据宽度 自适应 是否切换成小窗模式
                if(MI.user.fun.smallwindow){
                    _funs.updateWindowModel();
                }
		},
		reHeightSidePanel: function(){			
			if (!_this.sidePanel || !_this.sidePanelVisible) 
				return;
			var windowHeight = UI.windowHeight();
			var leftHeight = UI.height($$(".main")[0]);
			var detailHeight = Math.min(windowHeight - 65, leftHeight), contentHeight = Math.min(windowHeight - 96, leftHeight - 31);
			UI.C(_this.detailPanel, 'height', detailHeight + 'px');
			UI.C(_this.contentWrap, 'height', contentHeight + 'px');		
			//UI.C(_this.detailPanel, 'height', windowHeight - 65 + 'px');
			//UI.C(_this.contentWrap, 'height', windowHeight - 96 + 'px');
			
		},
		//根据窗口缩放后的宽度 决定是否切换到小窗模式 还是大窗模式
		updateWindowModel:function(){
			var windowWidth = UI.windowWidth();
			if (windowWidth < 770 && !UI.hasClass(document.body, "s_mode")) {
				_funs.changeToSmallModel();
			}
			if (windowWidth > 770 && UI.hasClass(document.body, "s_mode")) {
				_funs.changeToBigModel();
			}
			if (UI.hasClass(document.body, "s_mode")) {
				_funs.setPanelLeftInView();
			}
			else {
				if (_this.sidePanelVisible) {
					_funs.showSidePanelEnd(_this.detailPanel, "left", "0");
					_funs.showSidePanelEnd(_this.detailPanel, "marginLeft", _this.animateParam[_this.windowModel].end);
					//_funs.showSidePanelEnd(_this.detailPanel, "left", _this.animateParam[_this.windowModel].end);
				}
			}
		},
		changeToSmallModel:function(){
			//_this.windowModel="small";
			UI.addClass(document.body, "s_mode");
			$("sideBar") && UI.hide(UI.parents($("sideBar"), "detailPanelOuter")[0]);
			_this.useOpacityAnimate = true;
		},
		changeToBigModel:function(){
			//_this.windowModel="big";
			UI.removeClass(document.body, "s_mode");
			$("sideBar") && UI.show(UI.parents($("sideBar"), "detailPanelOuter")[0]);
			_this.useOpacityAnimate = false;		
		},
		
		/**
		 * 注册插件
		 * @param {Object} pluginName
		 * @param {Object} op
		 */
		plugin: function(pluginName, op){
			_this["ret"][pluginName] = function(el){
				op.init && op.init();
				_funs.registerDom(pluginName, el);
			};
			_this["op"][pluginName] = op;
		},
		/**
		 * 主要用于临时设置某些简单的参数
		 * @param {Object} pluginName 插件名称
		 * @param {Object} p 属性
		 * @param {Object} v
		 */
		setProperty: function(pluginName, p, v){
			_this["op"][pluginName][p] = v;
		},
		registerDom: function(pluginName, el){
			_funs.createSidePanel();
			UI.each(el, function(o){
				if (o) {
					if (_this.useSidePanel) {
						/*o.onclick = function(e){
						 UI.E(e).prevent();
						 UI.E(e).stop();
						 
						 _funs.callPlugin.apply(this,[pluginName]);
						 }*/
						//防止覆盖 某些已经有onclick的节点
						UI.EA(o, "click", function(e){
							UI.E(e).prevent();
							UI.E(e).stop();
							_funs.callPlugin.apply(o, [pluginName]);
						});
					}
					else {
						UI.A(o, 'target', '_blank');
					}
				}
			});
		},
		callPlugin: function(pluginName,notUseAnimate){
			//  插件 domClick
			var fun = _this["op"][pluginName].domClick, ret = null;
			fun && (ret = fun.apply(this, arguments));
			
			if (ret === false) {
				return false;
			}
			if (ret == "open") {
				document.location.href = this.href;
				return false;
				
			}
			_funs.setCurPluginName(pluginName);
			_funs.showSidePanel(notUseAnimate);//先展开 动画
			//loading
			var contentHeight = UI.height(_this.contentWrap);
			contentHeight = contentHeight > 100 ? contentHeight : 100;
			_this.contentWrap.innerHTML = '<div class="loading" style="height:' + contentHeight + 'px;background-position:50% ' + contentHeight * 0.382 + 'px;border-bottom:0!important;">&nbsp;</div>';
			
			//再调用插件的接口初始化                           
			var loadData = _this["op"][pluginName].loadData, callback = _this["op"][pluginName].initPanel;
			loadData && loadData(ret, callback);
		},
		/**
		 * 动画开始函数
		 */
		showSidePanel: function(notUseAnimate){
			_funs.initSidePanelAnimate();
			if (_this.animate) {
				window.clearInterval(_this.animate);
				_this.animate = null;
				_funs.end || _funs.end();
			}
			_funs.end = function(){
				_this.animate = null;
				_funs.showSidePanelEnd(_this.detailPanel, "marginLeft",_this.animateParam[_this.windowModel].end);
			};
			//loading
			var contentHeight = UI.height(_this.contentWrap);
			contentHeight = contentHeight > 100 ? contentHeight : 100;
			_this.contentWrap.innerHTML = '<div class="loading" style="height:' + contentHeight + 'px;background-position:50% ' + contentHeight * 0.382 + 'px;border-bottom:0!important;">&nbsp;</div>';
			
			if (_this.useOpacityAnimate) {
				_funs.useOpacityAnimate(true);				
			}
			else {				
				if (notUseAnimate) {
					_funs.end();
				}
				else {
					_this.animate = UI.animate(_this.detailPanel, "marginLeft", _this.animateParam[_this.windowModel].end, _funs.end, 0.7);
				}
			}
		},
		useOpacityAnimate:function(isOpen){
			_funs.setPanelVisible();
			UI.show(_this.sidePanel);
			if (isOpen) {
				UI.show(_this.sidePanel);
				/*UI.C(_this.sidePanel, 'opacity', 0);
				_funs.setPanelLeftInView();
				UI.animate(_this.sidePanel, 'opacity', 1, function(){
					//_this.sidePanel.style.cssText="";					
				}, 0.2, 30);*/
			}
			else {
				UI.hide(_this.sidePanel);
				//设置 透明度 为0 在ie9 兼容模式下有问题				
				//UI.C(_this.sidePanel, 'opacity', 1);
				//_funs.setPanelLeftInView();
				//UI.animate(_this.sidePanel, 'opacity', 0, function(){
				//	_this.sidePanel.style.cssText="";
				//	UI.hide(_this.sidePanel);
				//}, 0.2)//, 30);
			}
		},
		setPanelLeftInView:function(){
			//UI.show(_this.sidePanel);
			var x = UI.getX($$(".main")[0]);
			var windowWidth = UI.pageWidth();
			
			_this.detailPanel.style["left"] = windowWidth - _this.detailPanel.offsetWidth - x + "px";
			_this.detailPanel.style["marginLeft"] = "0px";
			//UI.hide(_this.sidePanel);
		},
		/**
		 * 动画结束调用
		 * @param {Object} ele
		 * @param {Object} attr
		 * @param {Object} value
		 */
		showSidePanelEnd: function(ele, attr, value){
			ele.style[attr] = value + "px";
		},
		/**
		 * 动画初始化
		 */
		initSidePanelAnimate: function(){
			if (!_this.sidePanelVisible) {
				UI.show(_this.sidePanel);
				_this.detailPanel.style["marginLeft"] = _this.animateParam[_this.windowModel].end - _this.detailPanel.offsetWidth + "px";
				UI.hide(_this.sidePanel);
			}
			_this.detailPanel.style["left"] = 0 + "px";
			_funs.setPanelVisible();
			//_this.detailPanel.style["left"] = 611 - _this.detailPanel.offsetWidth + "px"; 
		},
		setPanelVisible: function(){
			if (UI.hasClass(document.body, 'ipad')) {
				var top = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
				UI.C(_this.sidePanel, 'top', top + 'px');
			}
			UI.hide(_this._side);
			UI.show(_this.sidePanel);
			_this.sidePanelVisible = true;
			_funs.reHeightSidePanel();
			setTimeout(function(){
				_funs.reHeightSidePanel();
			},1000)
		},
		closePanel: function(){
			if (!_this.sidePanel || !_this.sidePanelVisible) 
				return;
			if (_this.curPlugin) {
				var callback = _this["op"][_this.curPlugin].beforePanelClose, ret;
				callback && (ret = callback());
				if (ret === false) {
					_this.curPlugin = "";
					return;
				}
			}
			// UI.hide(_this.sidePanel);                   
			if (_this.animate) {
				window.clearInterval(_this.animate);
				_this.animate = null;
				_funs.end || _funs.end();
			}
			_funs.end = function(){
				UI.hide(_this.sidePanel);
				_this.animate = null;
				_funs.showSidePanelEnd(_this.detailPanel, "marginLeft", _this.animateParam[_this.windowModel].end - _this.detailPanel.offsetWidth);
			};
			if (_this.useOpacityAnimate) {
				_funs.useOpacityAnimate(false);
			}
			else {
				_this.animate = UI.animate(_this.detailPanel, "marginLeft", _this.animateParam[_this.windowModel].end - _this.detailPanel.offsetWidth, _funs.end, 0.5);
			}
			UI.show(_this._side);
			_this.sidePanelVisible = false;
			if (_this.curPlugin) {
				var callback = _this["op"][_this.curPlugin].afterPanelClose;
				callback && callback();
				_this.curPlugin = "";
			}
		},
		setCurPluginName: function(pluginName){
			_this.curPlugin = pluginName;
		},
		getCurPluginName: function(){
			return _this.curPlugin;
		}
		/*loadUserProfile : function (user) {
		 if (!user || _this.isLoadingUserProfile) return;
		 
		 _this.isLoadingUserProfile = true;
		 _funs.initSidePanelAnimate();
		 
		 }*/
	};
	//_this.funs=_funs;
	//逻辑初始化 暂时为空
	var init = function(){
		_funs.createSidePanel();
	};
	init();
	//公开接口
	_this["ret"] = {
		showPanel: _funs.showSidePanel,
		closePanel: _funs.closePanel,
		callPlugin: _funs.callPlugin,
		setProperty: _funs.setProperty,
		getSidePanelVisible: function(){
			return _this.sidePanelVisible;
		},
		setSidePanelVisible: function(v){
			_this.sidePanelVisible = v;
		},
		getNodes: function(){
			return {
				sidePanel: _this.sidePanel,
				detailPanel: _this.detailPanel,
				contentWrap: _this.contentWrap,
				_side: _this._side
			}
		},
		plugin: _funs.plugin,
		setCurPluginName: _funs.setCurPluginName,
		getCurPluginName: _funs.getCurPluginName
	};
	return _this["ret"];
})();
(function(){
	/**
	 * 注册SidePanel 的userProfile 插件
	 * @example MI.Nano.SidePanel.userProfile(dom)
	 */
	var _eventHandler = {
		follow_onclick: function(){
			var Self=this;
			MI.follow(_this.curUser, this, function(){
				var sFollow = $$(Self.parentNode.parentNode,'.ico_sFo');
				UI.removeClass(sFollow[0],'foLight');
				UI.show(sFollow[0]);
				UI.hide(_this.follow);
				_this.follow.className = 'addAttention';
				_this.unFollow.className = 'delAttention';
				UI.show(_this.unFollow.parentNode);
			});
		},
		unFollow_onclick: function(){
			var Self=this;
			MI.follow(_this.curUser, this, function(){
				var sFollow = $$(Self.parentNode.parentNode,'.ico_sFo');
				UI.hide(sFollow[0]);
				UI.hide(_this.unFollow.parentNode);
				_this.unFollow.className = 'delAttention';
				_this.follow.className = 'addAttention';
				UI.show(_this.follow);
			});
		},
		commentList_onclick: function(e){
			var E = UI.E(e), tar = E.target, parent = tar.parentNode, name = null;
			if (tar.nodeName.match(/#text/i)) {
				tar = parent;
				parent = parent.parentNode;
			}
			if (tar.nodeName.match(/a/i) && parent.nodeName.match(/em/i)) {
				name = tar.href.match(/http[s]?:\/\/1.t.qq.com\/([\w-]+)/)[1];
				if (_this.curUser !== name) {
					//_this.loadUserProfile({name : name, nick : UI.text(tar)});
					MI.Nano.SidePanel.callPlugin.apply(tar, ["userProfile"]);
					E.stop();
					return false;
				}
			}
		}
	};
	var _this = {
		expirse: 60 * 1000,
		cache: {}
	};
	MI.Nano.SidePanel.plugin("userProfile", {
		//初始化 拷贝一些 插件用到的数据
		init: function(SidePanel){
			var node = MI.Nano.SidePanel.getNodes();
			_this.contentWrap = node.contentWrap;
			_this.sidePanel = node.sidePanel;
			_this.detailPanel = node.detailPanel;
		},
		//事件节点 被点击 
		domClick: function(e){
			//避免url预览打开了，没有关闭
			if (MI.talkList.urlPreview) {
				MI.talkList.urlPreview.close();
			}
			//过滤微群
			var name = this.href, user = null, qname = UI.A(this.parentNode, 'rel');
			if (qname && qname.indexOf('@\*') === 0) 
				return false;
			
			//过滤 公益图标icon
			if (UI.hasClass(this, "ico_gy") || UI.hasClass(this, "vip")) {
				return false;
			}
			
			name = name.substring(name.lastIndexOf('/') + 1);
			user = {
				'name': name,
				'nick': this.innerHTML
			};
			
			if (user.name == _this.curUser && MI.Nano.SidePanel.getCurPluginName() == "userProfile") {
				MI.Nano.SidePanel.closePanel();
				return false;
			}
			return user;
		},
		clearCache: function(){
			_this.cache[_this.curUser] = null;
		},
		//获取接口数据	
		loadData: function(user, callback){
			if (!user || _this.isLoadingUserProfile) 
				return;
			_this.isLoadingUserProfile = true;
			
			var param = {
				url: '/asyn/home_side.php',
				type: 'get',
				data: {
					u: user.name
				},
				success: function(data){
					_this.isLoadingUserProfile = false;
					var initData = data;
					data = MI.json(data);
					if (data.result === 0 && data.info) {
						_this.contentWrap.innerHTML = data.info;
						
						//Show Face
						var imgs = $$(_this.contentWrap, ".crs");
						UI.each(imgs, function(img){
							img.src = UI.A(img, "crs");
							UI.removeClass(img, "crs");
							UI.removeClass(img, "dn");
						});
						//内容的缩略图展开绑定事件。。。
						var msgCont = $$(_this.contentWrap, ".msgCnt");
						UI.each(msgCont, function(el){
							var img = $$(el, "img"), icon, small;
							UI.each(img, function(ele){
								var type = UI.A(ele, "type");
								if (type == "icon") {
									icon = ele;
								}
								if (type == "small") {
									small = ele;
								}
							});
							if (icon && small && MI.user.fun.iconPic) {
								icon.onclick = function(){
									UI.hide(icon);
									UI.show(small);
								}
								small.onclick = function(){
									UI.hide(small);
									UI.show(icon);
								}
								
							}
						});
						
						if (!_this.cache[user.name]) {
							_this.cache[user.name] = {
								data: initData,
								getTime: +new Date()
							}
						}
						_this.curUser = user.name;
						callback && callback();
					}
					else {
						MI.alert(data.msg);
					}
				},
				fail: function(){
					_this.isLoadingUserProfile = false;
				}
			};
			//检查是否有缓存 是否过期
			var cache = _this.cache[user.name];
			if (cache) {
				var now = +new Date(), oldDate = cache.getTime;
				if ((now - oldDate) > _this.expirse) {
					_this.cache[user.name] = null;
				}
				else {
					param.success(cache.data, true);
					return;
				}
			}
			MI.ajax(param);
		},
		//页面渲染后的事件绑定
		initPanel: function(){
			//var windowHeight = UI.windowHeight();
			//_this.content = $$(_this.sidePanel, '.detailItem')[0];
			_this.pages = $$(_this.sidePanel, '.pages')[0];
			_this.follow = $$(_this.contentWrap, '.addAttention')[0];
			_this.unFollow = $$(_this.contentWrap, '.delAttention')[0];
			//_this.talk = $$(_this.contentWrap, '.talk')[0];
			_this.commentList = $$(_this.contentWrap, '.sideCommentList')[0];
			
			_this.follow && (_this.follow.onclick = _eventHandler.follow_onclick);
			_this.unFollow && (_this.unFollow.onclick = _eventHandler.unFollow_onclick);
			_this.commentList && (_this.commentList.onclick = _eventHandler.commentList_onclick);
			_this.pages && UI.hide(pages);
			MI.Nano.SidePanel.userProfile($$(_this.sidePanel,'.itemContent em a'));
			MI.Nano.SidePanel.userProfile($$(_this.sidePanel,'.custom_tips em a'));
			
			_this.curSidePanel = 2;
			_this.contentWrap.scrollTop = 0;
		},
		beforePanelClose: function(){
		
		},
		afterPanelClose: function(){
			_this.curUser = null;
		}
	});
})();
(function(){
	var _this = {
		expirse: 60 * 1000,
		cache: {}
	};
	MI.Nano.SidePanel.plugin("qunProfile", {
		//bodyClickClose:false,	//false 时 点击body 不自动关闭。。其他均关闭
		init: function(){
			var node = MI.Nano.SidePanel.getNodes();
			_this.contentWrap = node.contentWrap;
			_this.sidePanel = node.sidePanel;
			_this.detailPanel = node.detailPanel;
		},
		domClick: function(){
			//避免url预览打开了，没有关闭
			if (MI.talkList.urlPreview) {
				MI.talkList.urlPreview.close();
			}
			//获取 群id			
			var id = UI.A(this, 'href').match(/\d+/g);
			var qunId = false;
			if (id && id[0]) {
				qunId = id[0];
			}
			//判断是不是 类似于更多信息的特殊节点  只打开 不关闭
			var isSpecialNode = UI.A(this, "open") || false;
			if (qunId == _this.qunId && MI.Nano.SidePanel.getCurPluginName() == "qunProfile" && !isSpecialNode) {
				MI.Nano.SidePanel.closePanel();
				return false;
			}
			return qunId;
		},
		clearCache: function(){
			_this.cache["" + _this.qunId] = null;
		},
		loadData: function(qunId, callback){
			if (!qunId) 
				return;
			_this.qunId = qunId;
			if (_this.ajax) {
				_this.ajax.abort();
				_this.ajax = null;
			}
			var param = {//1.t.qq.com/asyn/qunsidebar.php?qid=
				url: '/asyn/qunsidebar.php',
				type: 'get',
				data: {
					qid: qunId
				},
				success: function(data){
					var initData = data;
					data = MI.json(data);
					if (data.result === 0 && data.info) {
						_this.contentWrap.innerHTML = data.info;
						UI.evalScript(data.info);
						if (!_this.cache["" + qunId]) {
							_this.cache["" + qunId] = {
								data: initData,
								getTime: +new Date()
							}
						}
						callback && callback();
					}
					else {
						MI.alert(data.msg);
					}
				},
				fail: function(){
				}
			};
			//检查是否有缓存 是否过期
			var cache = _this.cache["" + qunId];
			if (cache) {
				var now = +new Date(), oldDate = cache.getTime;
				if ((now - oldDate) > _this.expirse) {
					_this.cache["" + qunId] = null;
				}
				else {
					param.success(cache.data, true);
					return;
				}
			}
			_this.ajax = MI.ajax(param);
		},
		initPanel: function(){
			UI.each($$(_this.contentWrap, '.SC .imgList'), function(o){
				if (UI.A(o, 'hideBtn') != '1') {
					if ($$(o, 'li').length) 
						MI.FollowBtn.build(o.parentNode, '.imgList .headFollow', 'Text');
				}
			});
		}
	});
})();

(function(){
	var _this = {
		expirse: 60 * 1000,
		cache: {}
	};
	//名单右侧接口
	MI.Nano.SidePanel.plugin("listProfile", {
		init: function(){
			var node = MI.Nano.SidePanel.getNodes();
			_this.contentWrap = node.contentWrap;
			_this.sidePanel = node.sidePanel;
			_this.detailPanel = node.detailPanel;
		},
		domClick: function(){
			if (MI.talkList.urlPreview) {
				MI.talkList.urlPreview.close();
			}
			//获取 名单id			
			var listId = UI.A($$($("home_mylist_top_container"), ".freshTipBox .right a")[0], 'lid');
			if (listId == _this.listId && MI.Nano.SidePanel.getCurPluginName() == "listProfile") {
				MI.Nano.SidePanel.closePanel();
				return false;
			}
			return listId;
		},
		clearCache: function(){
			_this.cache["" + _this.listId] = null;
		},
		loadData: function(listId, callback){
			if (!listId) 
				return;
			_this.listId = listId;
			if (_this.ajax) {
				_this.ajax.abort();
				_this.ajax = null;
			}
			var param = {
				url: '/asyn/listsidebar.php',
				type: 'get',
				data: {
					lid: listId,
					r: MI.random()
				},
				success: function(data){
					var initData = data;
					data = MI.json(data);
					if (data.result === 0 && data.info) {
						_this.contentWrap.innerHTML = data.info;
						UI.evalScript(data.info);
						if (!_this.cache["" + listId]) {
							_this.cache["" + listId] = {
								data: initData,
								getTime: +new Date()
							}
						}
						callback && callback();
					}
					else {
						MI.alert(data.msg);
					}
				},
				fail: function(){
				}
			};
			//检查是否有缓存 是否过期
			var cache = _this.cache["" + listId];
			if (cache) {
				var now = +new Date(), oldDate = cache.getTime;
				if ((now - oldDate) > _this.expirse) {
					_this.cache["" + listId] = null;
				}
				else {
					param.success(cache.data, true);
					return;
				}
			}
			_this.ajax = MI.ajax(param);
		},
		initPanel: function(){
			UI.each($$(_this.contentWrap, '.SC .imgList'), function(o){
				if (UI.A(o, 'hideBtn') != '1') {
					if ($$(o, 'li').length) 
						MI.FollowBtn.build(o.parentNode, '.imgList .headFollow', 'Text');
				}
			});
		}
	});
})();
(function(){
	var _this = {
		expirse: 60 * 1000,
		cache: {}
	};
	//话题右侧接口
	MI.Nano.SidePanel.plugin("topicProfile", {
		init: function(){
			var node = MI.Nano.SidePanel.getNodes();
			_this.contentWrap = node.contentWrap;
			_this.sidePanel = node.sidePanel;
			_this.detailPanel = node.detailPanel;
		},
		domClick: function(){
			if (MI.talkList.urlPreview) {
				MI.talkList.urlPreview.close();
			}
			//获取 话题id 
			var r=/\/k\/([\S]+)/, href=this.href,out,topicId;
			out=href.match(r);
			if(out&&out.length>1){
				topicId=out[1];
			}else{
				return false;
			}			          
			
			if (topicId == _this.topicId && MI.Nano.SidePanel.getCurPluginName() == "topicProfile") {
				MI.Nano.SidePanel.closePanel();
				return false;
			}
			return topicId;
		},
		clearCache: function(){
			_this.cache["" + _this.topicId] = null;
		},
		loadData: function(topicId, callback){
			if (!topicId) 
				return;
			_this.topicId = topicId;
			if (_this.ajax) {
				_this.ajax.abort();
				_this.ajax = null;
			}
			var param = {//http://1.t.qq.com/asyn/topic_side.php?k=%E6%B1%82%E6%8A%B1%E6%8A%B1#
				url: '/asyn/topic_side.php',
				type: 'get',
				data: {
					k: decodeURIComponent(topicId),
					r: MI.random()
				},
				success: function(data){
					var initData = data;
					data = MI.json(data);
					if (data.result === 0 && data.info) {
						_this.contentWrap.innerHTML = data.info;
						UI.evalScript(data.info);
						
						//内容的缩略图展开绑定事件。。。
						var msgCont = $$(_this.contentWrap, ".msgCnt");
						UI.each(msgCont, function(el){
							var img = $$(el, "img"), icon, small;
							UI.each(img, function(ele){
								var type = UI.A(ele, "type");
								if (type == "icon") {
									icon = ele;
								}
								if (type == "small") {
									small = ele;
								}
							});
							if (icon && small && MI.user.fun.iconPic) {
								icon.onclick = function(){
									UI.hide(icon);
									UI.show(small);
								}
								small.onclick = function(){
									UI.hide(small);
									UI.show(icon);
								}
								
							}
						});						
						
						if (!_this.cache["" + topicId]) {
							_this.cache["" + topicId] = {
								data: initData,
								getTime: +new Date()
							}
						}
						callback && callback();
					}
					else {
						//MI.alert(data.msg);
						window.location.href = '/k/' + topicId;
					}
				},
				fail: function(){
				}
			};
			//检查是否有缓存 是否过期
			var cache = _this.cache["" + topicId];
			if (cache) {
				var now = +new Date(), oldDate = cache.getTime;
				if ((now - oldDate) > _this.expirse) {
					_this.cache["" + topicId] = null;
				}
				else {
					param.success(cache.data, true);
					return;
				}
			}
			_this.ajax = MI.ajax(param);
		},
		initPanel: function(){
			UI.each($$(_this.contentWrap, '.SC .imgList'), function(o){
				if (UI.A(o, 'hideBtn') != '1') {
					if ($$(o, 'li').length) 
						MI.FollowBtn.build(o.parentNode, '.imgList .headFollow', 'Text');
				}
			});
		}
	});
})();

(function(){
 /**
  * 注册SidePanel 的setting 插件
  * @example MI.Nano.SidePanel.setting() 没有dom 节点 传入 在init里面自己调用
  */
 var _this={};
	MI.Nano.SidePanel.plugin("setting",{
		//初始化 拷贝一些 插件用到的数据
        init:function(SidePanel){
            var node=MI.Nano.SidePanel.getNodes();
            _this.contentWrap=node.contentWrap;
            _this.sidePanel=node.sidePanel;
            _this.detailPanel=node.detailPanel;
			//设置 当前plugin
			/*if(MI.Nano.SidePanel.getCurPluginName()!="setting"){
				MI.Nano.SidePanel.setCurPluginName("setting");
                //MI.Nano.SidePanel.showPanel();
                this.loadData();
			}*/
			this.loadData();
        },  
        //事件节点 被点击 
        domClick:function(e){  
        },
        //获取接口数据    
        loadData:function(callback){			
		   //_this.contentWrap.innerHTML="";  
           MI.ajax({
                url: '/asyn/setting_side.php',
                type: 'get',
                data: '',
                success: function(data){                   
                    data = MI.json(data);                    
                    MI.dialog.show({
						title : '<h1 class="DmainTit">' + _('偏好设置') + '</h1>',
						width:412,
						html:data.info,start:function(){
					}});
					UI.evalScript(data.info);
					/*var nodes = MI.Nano.SidePanel.getNodes();                    
                    if (nodes.contentWrap) {
                        nodes.contentWrap.innerHTML = data.info;
                        UI.evalScript(data.info);
                    }
                    MI.Nano.SidePanel.setSidePanelVisible(true);
					*/
                }
            });
        },
        //页面渲染后的事件绑定
        initPanel:function(){
        },
		clearCache:function(){			
		}
	});
})();

/*MI.SidePanel = function (id) {
	if (!id) return;
	var Self = this;
	Self._body = UI.isString (id) ? $(id) : id;
	Self._close = $$(Self._body, '.panelbar')[0];
	Self._content = $$(Self._body, '.panelContentWrap')[0];
	Self._pages = $$(Self._body, '.pages')[0];
	
	if (Self._close) {
		Self._close.onclick = function () {
			Self.hide();
		};
	}
};

MI.SidePanel.prototype = {
	//  显示浮层
	show : function () {
		var Self = this;
		UI.show(Self._body);
	},
	// 隐藏浮层
	hide : function () {
		var Self = this;
		UI.hide(Self._body);
	},
	update : function (config) {
		if (!config) return;
		// 更新内容
		if (config.content){
			var content = config.content;
			if (UI.isString(content)){
				content = UI.html(content)[0];
			}
			UI.replace(content, Self._content);
		}
		// 更新分页
		if (config.pages){
			var pages = config.pages;
			if (UI.isString(pages)){
				pages = UI.html(pages)[0];
			}
			UI.replace(pages, Self._pages);
			Self.showPages();
		}else{
			Self.hidePages();
		}
	},
	showPages : function () {
		var Self = this;
		UI.show(Self._pages);
	},
	hidePages : function () {
		var Self = this;
		UI.hide(Self._pages);
	}
};

MI.SidePanel.getInstance = (function (id) {
	var sidePanel = null;
	return function () {
		if (sidePanel === null) {
			sidePanel = new MI.SidePanel(id || 'sidePanel');
		}
		return sidePanel;
	};
})();*/



MI.Nano.SideBar = function (id, config) {
	if (!id || !config) return;
	var Self = this,html = [];
	Self._body = UI.isString(id) ? $(id) : id;	
			
	if (config.keywords && config.keywords.length){
		html.push('<li class="clear"><strong><span class="sideItem">关键词订阅</span></strong>');
		if (config.keywords && config.keywords.length){
			UI.each(config.keywords,function(o){
				html.push('<a href="/search/message.php?k=' + o.url+'&hmh=1">' + MI.string.html(o.label) + '</a>');
			});
		}
		html.push('</li>');
	}

	if (config.topic && config.topic.length){
		html.push('<li class="clear"><strong><span class="sideItem">话题订阅</span></strong>');
		if (config.topic && config.topic.length){
			UI.each(config.topic,function(o){
				html.push('<a href="/k/' + o.url + '">' + MI.string.html(o.label) + '</a>');
			});
		}
		html.push('</li>');
	}
	
	if (config.apps && config.apps.length) {
		html.push('<li class="clear"><strong><span class="sideItem">我的应用</span></strong><div class="appList clear">');
		UI.each(config.apps, function(o){
			html.push('<a href="' + o.url + '" title="' + o.name + '" target="_blank" onmousedown="MI.Bos(\'nanoAppClick\')"><img src="' + o.icon + '"/></a>');
		});
		html.push('</div></li>');
		
	}	
	
	if (config.searchHistory && config.searchHistory.length){
		html.push('<li class="clear"><strong><span class="sideItem">搜索历史<a id="btnclear" href="javascript:void(0)" class="sideItemTip ico_empty"><em>清空</em></a></span></strong>');
		UI.each(config.searchHistory,function(o){
			html.push('<a href="/search/message.php?k=' + o.url + '">' + MI.string.html(o.label) + '</a>');
		});
		html.push('</li>');
	}
	
	//html.push('<li class="clear"><strong><span class="sideItem">我的收藏</span></strong><a href="/favor">查看我的收藏</a></li>');
	
	if ((config.hotWords && config.hotWords.length) || (config.hot && config.hot.length)) {
		html.push('<li class="clear"><strong><span class="sideItem">今日热门</span></strong>');		
		UI.each(config.hotWords, function(o){
			html.push('<a href="/search/message.php?pos=948&hmh=1&k=' + o.url + '">' + MI.string.html(o.label) + '</a>');
		});
		if (config.hotWords && config.hotWords.length && config.hot && config.hot.length) {
			html.push('<div style="clear:both;"></div>');
		}
		UI.each(config.hot, function(o){
			html.push('<a href="/k/' + o.url + '">' + MI.string.html(o.label) + '</a>');
		});
		
		html.push('</li>');
	}
	
	if(Self._body){
		Self._body.innerHTML = html.join('');
	}
	//清空搜索历史
	UI.EA($('btnclear'), 'click', function() {
		MI.ajax({
			url: 'http://t.qq.com/asyn/messageSearch.php',
			data: {
				type: 1,
				r: MI.random()
			},
			success: function(data) {
				data = MI.json(data);
				var el = UI.parents($('btnclear'), 'clear');
				if (el.length > 0){
					el = el[0];
					if (data.result == 0 && el) {
						UI.animate(el, 'opacity', 0, function() {
							UI.remove(el);			
						});
					}	
				}
				
			}
		});
		return false;
	});
	
	//去年今日 哦
	//1、判断接口有木有  2、判断 历史头像有木有
	if(config.lastYear && $("sideContainer")){	
		
		if (!("total" in config.lastYear)) {//如果 木有total 则表示尚未开启 total=0 表示 为空出提示要
			return false;
		}
		var sideContainer = $("sideContainer");
		var historyPic = $$(sideContainer, "div.picHistory");
		var template = '<h5>去年今日(<%=total%>)</h5>\
				                                <ul style="width:300px;margin:0 0 0 0px;" class="weibo_history_list clear">\
				                                <li id="<%=id%>" ctime="<%=ctime%>" rel="<%=rel%>" >\
												    <div class="msgBox"><div class="msgCnt"><%=content%></div></div>\
				                                </li>\
				                                </ul>\
				                                <div class="funBox clear">\
				                                    <div class="left">\
				                                        <div class="page" <%if(parseInt(total,10)==1){%>style="display:none;"<%}%> >\
				                                            <a href="javascript:void(0);" class="btn_prev btn_prev_gray" title="向前"><em>向前</em></a>\
				                                            <a href="javascript:void(0);" class="btn_next <% if(!hasnext){%>btn_next_gray<%}%>" title="向后"><em>向后</em></a>\
				                                        </div>\
				                                    </div>\
				                                    <div class="right"><span class="time"><%=time%></span><span class="func"><a href="#">转播</a><span>|</span><a href="#" target="_blank">详情</a></span></div>\
				                                </div>';
		
		if (config.lastYear.total == 0) {
			template = '<h5>去年今日</h5>\
							<ul style="width:300px;margin:0 0 0 0px;" class="weibo_history_list clear">\
							     <li>\
									<div class="msgBox"><div class="msgCnt">你在去年的今天没有发表过原创广播</div></div>\
								 </li>\
							</ul>';
		}
		var div = UI.html('<div class="weibo_history"></div>')[0], pubTime = [];
		pubTime.push(config.lastYear.time);
		div.innerHTML = new UI.tmplString(template)(config.lastYear);
		   
		if (historyPic.length > 0) {
			var hr = UI.html('<hr/>')[0];
			UI.after(hr, historyPic[0]);
			UI.after(div, hr);			
            UI.show(sideContainer);
		}
		else {
			UI.before(div, sideContainer.firstChild);
			UI.show(sideContainer);
		}
		//显示表情
		//Show Face
		var imgs = $$(div, ".crs");
		UI.each(imgs, function(img){
			img.src = UI.A(img, "crs");
			UI.removeClass(img, "crs");
			UI.removeClass(img, "dn");
		});
		
		setTimeout(function(){
			y = y + div.clientHeight;			
		}, 10);//右侧固定 需要重置高度了 		
		//funBox 加hover
		var funBox = $$(div, ".funBox")[0];
		if (funBox) {
			funBox.onmouseover = function(){
				UI.addClass(this.parentNode, "hover");
			};
			funBox.onmouseout = function(){
				UI.removeClass(this.parentNode, "hover");
			};
		}		
		
		var curId = config.lastYear.id, total = config.lastYear.total;
		//绑定转播与详情
		var aEle = $$(div, ".func a");
		if (aEle[0]) {
			aEle[0].onclick = function(){
				var box = new MI.Reply();
				box.show({
					title: _("和听众一起回味去年今日"),
					cont: _("#去年今日#"),
					type: 1,
					talkId: curId,
					doFocus: true
				});
				UI.addClass(box._body,"org1");
				//添加title
				var titleCont = UI.html('<h1 class="DmainTit">去年今日</h1>')[0], titleNode;
				titleNode = $$(box._body.parentNode.parentNode, ".DTitle")[0];
				titleNode.style.cssText = "";
				UI.append(titleCont, titleNode);
				
				getMsgCnt(curId, function(info){
					var ul = UI.html('<ul class="noHead noAction">' + info + "</ul>")[0];
					var aList = $$(ul, "a");
					UI.each(aList, function(a){
						a.href = "javascript:void(0);";
						if (UI.A(a, "target") != "") {
							a.removeAttribute("target");
						}
					})
					UI.after(ul, box._body);					
					//显示表情
					//Show Face
					var imgs = $$(ul, ".crs");
					UI.each(imgs, function(img){
						img.src = UI.A(img, "crs");
						if (img.parentNode.className == "pic"||img.parentNode.className=="vThumbs") {
							UI.C(img, "display", "inline");
						}
						UI.removeClass(img, "crs");
						UI.removeClass(img, "dn");
					});
					var ulHeight = ul.clientHeight, dialogNode = UI.parents(ul, "CR")[0], top;
					top = parseInt(UI.C(dialogNode, "top"), 10);
					UI.C(dialogNode, "top", top - ulHeight / 2 + "px");
				})
				return false;
			};
		}
		if (aEle[1]) {
			aEle[1].onclick = function(){
				this.href = "http://1.t.qq.com/p/t/" + curId;
			};
		}
		var getMsgCnt = function(curId, callback){//http://1.t.qq.com/p/t/44194032474526?format=2
			MI.ajax({
				url: '/p/t/' + curId + '?format=2',
				type: 'get',
				success: function(data){
					data = MI.json(data);
					if (data.result == 0) {
						callback(data.info);
					}
				}
			});			
		};
		// list 增加数据 改变宽度 显示调整 marginLeft 
		//向前 向后 切换class
		var btn = $$(div, ".page a"), ul = $$(div, ".weibo_history_list")[0];
		var liList = $$(ul, "li"), liLength = liList.length;
		var curIndex = 0,hasnext=config.lastYear.hasnext;//第二个 初始应为0
		if (btn[0]) {
			btn[0].onclick = function(){
				if (curIndex == 0) {
					return false;
				}
				else {
					curIndex--;
					UI.C(ul, "marginLeft", -300 * curIndex + "px");
				}
				checkBtnState();
				curId = UI.A(liList[curIndex], "id");
			}
		}
		
		if (btn[1]) {
			btn[1].onclick = function(){
				if (curIndex < liLength - 1) {
					curIndex++;
					UI.C(ul, "marginLeft", -300 * curIndex + "px");
					checkBtnState();
					curId = UI.A(liList[curIndex], "id");
				}
				else {
					if ((curIndex + 1) == liLength && hasnext) {
						checkNext();
					}
				}				
			}
		}
		var spanTime = $$(div, "span.time")[0];
		var checkBtnState = function(){			
			if (curIndex == 0) {
				UI.addClass(btn[0], "btn_prev_gray");
			}
			else {
				UI.removeClass(btn[0], "btn_prev_gray");
			}
			if ((curIndex + 1) == liLength && !hasnext) {
				UI.addClass(btn[1], "btn_next_gray");
			}
			else {
				UI.removeClass(btn[1], "btn_next_gray");
			}
			spanTime.innerHTML = pubTime[curIndex];
		};
		var ajax = null;
		var liTemp = '<li id="<%=id%>" ctime="<%=ctime%>" rel="<%=rel%>">\
		                                    <div class="msgBox"><div class="msgCnt"><%=content%></div></div>\
		                                </li>';
		var renderLi = function(info){
			UI.each(info.lastYear, function(msg){
				var li = UI.html(new UI.tmplString(liTemp)(msg))[0];
				pubTime.push(msg.time);
				UI.append(li, ul);
			});
			liList = $$(ul, "li");
			liLength = liList.length;
			hasnext = info.hasnext;
			
			UI.C(ul, "width", liLength * 300 + "px");
			checkBtnState();
			MI.Crs(1);
			
			if (info.lastYear.length > 0) {
				btn[1].onclick();
			}
		};
		var checkNext = function(){
			if (ajax ) {
				ajax.abort();
				ajax = null;
			}
			var li = $$(div, "ul li");
			var lastLi = li[li.length - 1];
			ajax = MI.ajax({
				url: '/asyn/mysidebar.php',
				type: 'get',
				data: {
					flag: 1,
					c: 1,
					time: UI.A(lastLi, "rel"),
					id: UI.A(lastLi, "id"),
					ctime: UI.A(lastLi, "ctime")
				},
				success: function(data){
					data = MI.json(data);
					if (data.result == 0) {
						renderLi(data.info);
					}
				}
			});
		};		
	}
};

//右侧固定 我的首页 客人页
var sideNode=$("sideBar")||$("sideSSameStar");
if (sideNode && !UI.B.ie6 && MI.user.fun.pageAbs) {
	var floatNode = UI.parents(sideNode, "slider_content")[0];
	if (floatNode) {
		UI.C(floatNode, "top", "0px");
		var naviH = $("headWrap").clientHeight;
		var y = UI.getY(floatNode) - naviH;		
		UI.EA(window, 'scroll', function(){			
			if (y < naviH+10) {				
				if (!UI.hasClass(floatNode, "slider_float")) {
					y = UI.getY(floatNode) - naviH;//最后一招了 防止 排版错乱。。。
				}else{
					UI.removeClass(floatNode, "slider_float");
					UI.C(floatNode, "top", 0 + "px");
					y = UI.getY(floatNode) - naviH;
					UI.addClass(floatNode, "slider_float");
					UI.C(floatNode, "top", naviH + 10 + "px");					
				}				
			}			
			if (y - 10 <= UI.scrollY()) {
				if (!UI.hasClass(floatNode, "slider_float")) {
					UI.addClass(floatNode, "slider_float");
					UI.C(floatNode, "top", naviH + 10 + "px");
				}
			}
			else {
				if (UI.hasClass(floatNode, "slider_float")) {
					UI.removeClass(floatNode, "slider_float");
					UI.C(floatNode, "top", 0 + "px");
				}
			}
		});
		//修复小窗模式 页面 y 值不正确的bug
		UI.EA(window, 'resize', function(){
			setTimeout(function(){
				UI.removeClass(floatNode, "slider_float");
				UI.C(floatNode, "top", "0px");
				y = UI.getY(floatNode) - naviH;
			}, 350);//小窗口切换 延迟300毫秒 这里需要大于
		});
		
		
	}
}




//
MI.Nano.FollowBtn = {
	userCall : null,
	followCall : function(isFollow, el, id) {
		var sFollow = $$('.ico_sFo');
		UI.removeClass(sFollow[0], "foLight");
		UI.show(sFollow[0]);
		UI.hide(el);
		var next = UI.next(el);
		UI.show(next);
		if($('followTips')){
			UI.hide($('followTips'));
		}

		MI.Nano.FollowBtn.changeNum(1, id);
	},
	unFollowCall : function(s, el, id) {
		var sFollow = $$('.ico_sFo');
		UI.hide(sFollow[0]);
		var p = UI.parent(el);
		UI.hide(p);
		var prev = UI.prev(p);      
		UI.addClass(prev, 'addAttention');
		UI.removeClass(prev, 'delAttention');
		UI.removeClass(el, 'addAttention');
		UI.show(prev);
		if($('followTips')){
			UI.show($('followTips'));
		}

		MI.Nano.FollowBtn.changeNum(-1, id);
	},
	changeNum : function(n, id) {
		try{
			var nums = UI.GC('.sideCustom .userNums');
			if (nums && nums.length > 0){
				nums = UI.GC(nums[0], 'strong');
				if (nums && nums.length > 1){
					MI.countNum(nums[1], n);
				}
			}
			var follower = $('followerNum_' + id);
			if (follower){
				MI.countNum(follower, n);
			}
		} catch(e){}
	}
}

MI.Nano.SmartBox = {
	bulidList : function(){
		MI.SmartBox.prototype.bulidList = function(data){
			var Self = this;
			if (data.result == 0) {
				if(data.info){
					var s = [], rss = [], his = [];
					var len = data.info.length;
					Self.indexMax = (Self._style.history == 1) ? len-1 : len;
					Self.index = -1;
					var Number=0;
					s.push('<dl class="s1">');
					UI.each(data.info,function(o,i){
						if (data.stat[Number]==1) {
							rss.push('<li value=\"'+ o +'\" index="' + (parseInt(i)+1) + '" class="">' + '<span>' + o + '</span>'  + '</li>');
						} else {
							his.push('<li value=\"'+ o +'\" index="' + (parseInt(i)+1) + '" class="">' + '<span>' + o + '</span>'  + '</li>');
						}
						Number++;
					});
					if(rss.length > 0) {
						rss.unshift('<dt class="special"><span class="cSign">' 
							+  _('关键词订阅') + '</span></span></dt><dd><ul>');
						rss.push('</ul></dd>');
						s.push(rss.join(""));
					}
					if(his.length > 0) {						
						his.unshift('<dt class="special"><span class="cSign">' 
							+  _('搜索历史') + '</span></span></dt><dd><ul>');
						his.push('</ul></dd>');
						s.push(his.join(""));
					}

					s.push('</dl>');
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

		};
	}
};
(function(){
	//直播 处理	
	var template = '<%for(var i=0;i<talk.length;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>" class="clear">\
		<div class="live_fn"><a class="close" href="#" rel="<%=talk[i].name%>"></a></div>\
	                    <div class="msgBox">\
	                        <div class="msgCnt"><strong><a target="_blank" href="/<%=talk[i].name%>"><%=talk[i].bkname||talk[i].nick%></a><%=talk[i].icon%>：</strong><% if(talk[i].content){%><%=talk[i].content%><%}else{%>转播<%}%></div>\
	                        <%if(talk[i].source){%><div class="msgBox replyBox">\
	                            <% if(talk[i].source.status==3){%>对不起，原文已经被作者删除。\
								<%}else{%>\
								<div class="msgCnt"><strong><a target="_blank" href="/<%=talk[i].source.name%>"><%=talk[i].source.bkname||talk[i].source.nick%></a>：</strong><%=talk[i].source.content%></div>\
	                            <div class="pubInfo"><span class="left"><span class="time"><%=talk[i].source.time%></span></span></div>\
	                           <%}%>\
							</div><%}%>\
	                        <div class="pubInfo"><span class="left"><span class="time"><%=talk[i].time%></span></span></div>\
	                    </div>\
			</li><%}%>';
	MI.Nano.LivePanel = function(){
		this.LivePanel = $("livewrapper");
		this.addUserBtn = $("livestart");
		this.input = $("liveinput");
		this.closeBtn = $("liveclose");
		this.content = $$(this.LivePanel, ".live_wording")[0];
		this.userListDom = $("liveuserlist");
		this.suggest=$$(this.LivePanel, ".live_suggest")[0];
		this.userListDom.innerHTML = "";
		UI.hide(this.closeBtn);		
		//UI.hide(this.suggest);
		UI.removeClass(this.LivePanel, "live_open");
		UI.hide(this.userListDom.parentNode.parentNode);
		//var p=$$(this.suggest,"p")[0];
		//UI.hide(p);
		
		this.ul = $("livelist");
		this.key = "livePanel";
		//this.init();
	}
	MI.Nano.LivePanel.prototype = {
		iconWidth:36,
		init: function(){			
			this.initInput();
			this.addEvent();
			
			this.liveList = null;
			this.initUserList();
			//this.openLive();			
			//初始化 尺寸 位置 
			this.initSize();
			this.initPostion();//设置 与浏览器视口的相对位置 ie6也是 但须做转换处理
			this.hideContent();
			this.ieScroll();
			this.initView();//初始化 预约微访谈
			this.bindResize();
			this.bindDrag();
			this.bindSuggest();//设置 引导词
			this.userPreNextBtnEventBind();
			var _this=this;
			UI.EA(window,"resize",function(){
				_this.setInView();
			})
		},
		/**
		 * 绑定引导词。。。
		 */
		bindSuggest:function(){
			var aList = $$(this.suggest, "a"), Self = this;
			window.list = aList;//把节点扔出去 方便调试
			UI.each(aList, function(el){
				el.onclick = function(){
					var id = UI.A(this, "rel"), isInterview = UI.A(this, "timestart") || false;					
					if (isInterview) {						
						Self.addView(id, this.innerHTML, UI.A(this, "timestart"), UI.A(this, "timeend"));
						return ;
					}
					var type = UI.A(this, "type"), data = {};
					data[type] = [id];
					Self.addToList(data, function(info){
						if (type != "search") {
							Self.saveUser(info.users);
						}
						Self.initUpdateList();
						Self.input.value = Self.tips;
						Self.input.blur();
						Self.input.reset();
					});
				}
			});
		},
		userPreNextBtnEventBind: function(){
			var aBtn = $$($("livepage"), "a"), Self = this;
			var width=this.iconWidth;
			if (aBtn[1]) {
				aBtn[1].onclick = function(){
					var ml = (-parseInt(UI.C(Self.userListDom, "marginLeft"), 10)) / width, list = $$(Self.userListDom, "li"), num = Math.floor((Self.userListDom.parentNode.parentNode.offsetWidth - 28) / width);
					
					if ((list.length - ml) <= num) {
						return false;						
					}
					else {
						UI.C(Self.userListDom, "marginLeft", -(ml + 1) * width + "px");
					}
					Self.checkPriAndNextBtn();
					return false;
				}
			}
			if (aBtn[0]) {
				aBtn[0].onclick = function(){
					var ml = (-parseInt(UI.C(Self.userListDom, "marginLeft"), 10)) / width;
					var mg = -(ml - 1) * width;
					mg = mg >= 0 ? 0 : mg;
					
					UI.C(Self.userListDom, "marginLeft", mg + "px");
					Self.checkPriAndNextBtn();
					return false;
				}
			}
			Self.checkPriAndNextBtn = function(){
				//左边
				var ml = (-parseInt(UI.C(Self.userListDom, "marginLeft"), 10)) / width, list = $$(Self.userListDom, "li"), num = Math.floor((Self.userListDom.parentNode.parentNode.offsetWidth - 28) / width);
				if ((list.length - ml) <= num) {
					UI.hide(aBtn[1]);
				}
				else {
					UI.show(aBtn[1]);
				}
				//右边
				if (ml > 0) {
					UI.show(aBtn[0]);
				}
				else {
					UI.hide(aBtn[0]);
				}
				
			}
			
		},
		initUserList: function(){
			var u = this.getUser(), list = [];
			
			for (var k in u) {
				list.push(u[k]);
				this.userList.u[k] = 1;
				
				if (k.hasString("*") || k.hasString("#")) {
					this.userList.topic = k;
				}
			}			
			list.length > 0 && this.updateList(list, "init")
		},
		initSize: function(){
			var size = this.size();
			if (size) {
				UI.C(this.content, "width", size.width);
				UI.C(this.content, "height", size.height);
				UI.C(this.userListDom.parentNode, "width", parseInt(size.width, 10) - 18 + "px");
			}
		},
		initPostion: function(){
			var posi = this.position();
			if (posi) {
				UI.C(this.LivePanel, "left", posi.left);
				UI.C(this.LivePanel, "top", posi.top);
			}
			else {
				UI.C(this.LivePanel, "left", parseInt(UI.pageWidth(), 10) - this.LivePanel.clientWidth - 5 + "px");
				UI.C(this.LivePanel, "top", parseInt(UI.windowHeight(), 10) - this.LivePanel.clientHeight - 46 + "px");
			}
		},
		ieScroll: function(){
			//注意视口的相对位置 加上 滚动位置
			if (UI.B.ie6) {
				UI.C(this.LivePanel, "position", "absolute");
				var timer = null, Self = this;
				var position = function(){
					if (timer) {
						window.clearTimeout(timer);
						timer = null;
					}
					timer = setTimeout(function(){
						var SelfH = Self.LivePanel.clientHeight, scrollH = UI.scrollY(), winH = UI.windowHeight();
						var posi = Self.position();
						
						if (posi) {
							
							winH = parseInt(posi.top, 10);
						}
						else {
							winH = winH - SelfH
						}
						
						UI.C(Self.LivePanel, "top", scrollH + winH + "px");
					}, 100);
				};
				var setX = function(){
					var w = Self.LivePanel.clientWidth, scrollX = UI.scrollX(), winW = UI.windowWidth();
					var posi = Self.position();
					if (posi) {
						winW = parseInt(posi.left, 10);
					}
					else {
						winW = winW - w
					}
					UI.C(Self.LivePanel, "left", scrollX + winW + "px");
				}
				position();
				setX();
				UI.EA(window, 'scroll', position);
				UI.EA(window, 'resize', position);
				UI.EA(window, 'resize', setX);
			}
		},
		initInput: function(){
			this.tips = this.input.value;
			var Self = this;
			this.input.onfocus = function(){
				if (this.value == Self.tips) {
					//this.value = "@";
					this.value = "";
					UI.addClass(this, "focus");
				}
			}
			this.input.onblur = function(){
				if (this.value == "" || this.value == Self.tips) { //|| this.value == "@") {
					Self.input.reset();
				}
			}
			
			this.input.reset = function(){
				this.value = Self.tips;
				UI.removeClass(this, "focus");
			}
			this.input.onkeydown = function(e){
				var E = UI.E(e);
				if (E.key == 13) {
					if (Self.autoCmt._body && Self.autoCmt._body.style.display == "none") {
						Self.addUser();
					}
				}
				//判断 输入框的位置 决定 联想浮层的位置               
				var winH = UI.windowHeight();
				var y = parseInt(UI.C(Self.LivePanel, "top"), 10) + Self.LivePanel.clientHeight;
				if (UI.B.ie6) {
					y = y - UI.scrollY();
				}
				if (y >= winH / 2) {
					Self.autoCmt.align = "top";
				}
				else {
					Self.autoCmt.align = "";
				}
			}
			this.autoCmt = new MI.AutoCmt({
				target: this.input,
				type: 0,
				key: 0,
				moreName: 1,
				//align: "top",
				tips: '',
				topic: 1,
				clickCall: function(){
					var v = UI.trim(Self.input.value);
					Self.input.value = v + " ";
				}
			});
			UI.hide(this.autoCmt._shadow)
		},
		initList: function(){
			var u = this.getUser(), data = [];
			
			for (var k in u) {
				data.push(k);
			}
			
			if (data.length > 0 && data[0] != "") {
				//UI.show($$(this.LivePanel, ".live_wording")[0]);
				if (!this.liveList) {
					this.initUpdateList();
				}
				else {
					this.liveList.stop = 0;
				}
			}
		},
		initUpdateList: function(){
			var Self = this, userData, data = [];
			userData = this.getUser();
			for (var k in userData) {
				data.push(k);
			}
			//检查 微访谈 根据微访谈 开始时间 决定是否 加入嘉宾id 进入请求数据
			data = UI.merge(data, Self.viewList);
			var search = Self.searchList || [];
			
			if ((data.length == 0 || data[0] == "") && search.length == 0) {
				Self.closeLive();
				return false;
			}
			UI.show(this.closeBtn);
			this.showContent();
			
			this.addUserBtn.value = "添加";
			
			if (Self.liveList) {
				//设置 参数								
				Self.liveList.param.u = data;
				//delete Self.liveList.param.id;
				Self.liveList.param.sq = search;
				var reData = Self.refresh();
				if (reData) {
					Self.liveList.param.time = reData.time;
				}
				Self.liveList.stop = 0;
				Self.liveList.load();
			}
			else {
				var reData = Self.refresh(), id, time, re = 0, param = {};
				if (reData) {
					param.id = reData.id;
					param.time = reData.time;
					param.re = 1;
				}
				param.u = data;
				param.sq = search;
				MI.app({
					TalkListUpdate: function(){
						Self.liveList = new MI.TalkListUpdate({
							id: 'livelist',
							time: 5000,
							hoverStop: 1,
							liCallBack: function(e){
								
								Self.liveList.param.id = e.id;
								Self.liveList.param.time = UI.A(e, "rel");
								Self.refresh(Self.liveList.param.id, Self.liveList.param.time);
								Self.liveList.param.re = 0;
								
								//遍历a
								var aList = $$(e, "a");
								UI.each(aList, function(el){
									UI.A(el, "target", "_blank");
								})								
							},
							listCallBack: function(e){
								var listObj = {};
								listObj.talk = [e];
								//Self.showContent();
								//Self.setInView();
								Self.clearLoading();
								return listObj;
							},
							callback: function(){
							},
							interfaceCallBack: function(data){
								Self.interfaceCallBack(data);
							},
							url: '/asyn/live.php',
							param: param,
							tmpl: template
						});
					}
				});
			}
		},
		addEvent: function(){
			var Self = this;
			this.addUserBtn.onclick = function(e){
				var E = UI.E(e);
				E.prevent();
				Self.addUser();
			}
			this.closeBtn.onclick = function(e){
				var E = UI.E(e);
				E.prevent();
				Self.closeLive();
			}
		},
		bindResize: function(){
			//先绑定 mousedown 在其中 
			//绑定1、 onmousemove 其中 处理位置 //左拉 上拉 还要改变 x,y坐标
			//2、onmouseup 恢复并保存
			var Self = this;
			var sizeHRange = function(h){
				var max = curH - 300, min = -(ey - 5 );//- Self.closeBtn.clientHeight);
				if (UI.B.ie6) {
					min = min + UI.scrollY();
					max = max + UI.scrollY();
				}
				
				h = h > min ? h : min;
				h = h < max ? h : max;
				return h;
				
			};
			var sizeHRangeB = function(h){
				var min = 300 - curH, max = UI.windowHeight() - curLivePanelH - ey - 5;
				if (UI.B.ie6) {
					min = min + UI.scrollY();
					max = max + UI.scrollY();
				}
				h = h > min ? h : min;
				h = h < max ? h : max;
				return h;
				
			};
			var sizeWRange = function(w){
				var max = curW - 298, min = -(ex - 5);
				w = w > min ? w : min;
				w = w < max ? w : max;
				return w;
			};
			var sizeWRangeR = function(w){
				var min = 298 - curW, max = UI.pageWidth() - curLivePanelW - ex - 5;
				w = w > min ? w : min;
				w = w < max ? w : max;
				return w;
			};
			
			var sizeActione = {
				"v": ["t_l", "t_r", "b_l", "b_r"],
				"h": ["t_l", "t_r", "b_l", "b_r"]
			}, moveAction = {
				"x": ["t_l", "b_l"],
				"y": ["t_l", "t_r"]
			};
			var tdList = $$(this.LivePanel, ".t_l , .t_r , .b_l, .b_r");
			var cE, cN;
			var curW, curH, curLivePanelH, curLivePanelW;
			var ex, ey;
			UI.each(tdList, function(el){
				UI.drag(el, {
					start: function(e){
						var E = UI.E(e);
						E.prevent();
						sx = E.x;
						sy = E.y;
						ex = parseInt(UI.C(Self.LivePanel, "left"), 10);
						ey = parseInt(UI.C(Self.LivePanel, "top"), 10);
						curW = Self.content.clientWidth || 298;
						curH = Self.content.clientHeight || 300;
						
						curLivePanelH = Self.LivePanel.clientHeight;
						curLivePanelW = Self.LivePanel.clientWidth;
						cE = e;
						cN = el.className;
					},
					drag: function(e){
						var E = UI.E(e);
						E.prevent();
						var x = E.x - sx, y = E.y - sy;
						
						if (UI.has(sizeActione["v"], cN) && UI.C(Self.content, "height") != "0px") {//垂直移动						     
							if (UI.has(moveAction["y"], cN)) {
								y = sizeHRange(y)
								UI.C(Self.content, "height", curH - y + "px");
								UI.C(Self.LivePanel, "top", ey + y + "px");
							}
							else {
								y = sizeHRangeB(y)
								UI.C(Self.content, "height", curH + y + "px");
							}
						}
						if (UI.has(sizeActione["h"], cN)) {//水平移动						   
							if (UI.has(moveAction["x"], cN)) {
								x = sizeWRange(x)
								UI.C(Self.content, "width", curW - x + "px");
								UI.C(Self.LivePanel, "left", ex + x + "px");
								UI.C(Self.userListDom.parentNode, "width", curW - x - 18 + "px");
							}
							else {
								x = sizeWRangeR(x)
								UI.C(Self.content, "width", curW + x + "px");
								UI.C(Self.userListDom.parentNode, "width", curW + x - 18 + "px");
							}
							
						}
					},
					stop: function(e){
						Self.setInView();
						var width = Self.content.offsetWidth + "px", height = Self.content.offsetHeight + "px";
						Self.size(width, height);
						var left = UI.C(Self.LivePanel, "left"), top = UI.C(Self.LivePanel, "top");
						if (UI.B.ie6) {
							left = parseInt(left, 10) - UI.scrollX() + "px";
							top = parseInt(top, 10) - UI.scrollY() + "px";
						}
						Self.position(left, top);
						
						Self.checkPriAndNextBtn();
						
					},
					call: function(){
					}
				});
			})
		},
		dragRange: function(x, y){
			var closeH = 5 ;//+ this.closeBtn.clientHeight;//this.closeBtn.clientHeight;
			var winW = UI.pageWidth() - this.LivePanel.clientWidth - 5;
			var winH = UI.windowHeight() - this.LivePanel.clientHeight - 5;
			if (UI.B.ie6) {
				winW = winW + UI.scrollX();
				winH = winH + UI.scrollY();
				closeH = closeH + UI.scrollY();
			}
			x = x < 5 ? 5 : x;//左侧
			y = y < closeH ? closeH : y;//上册
			x = x > winW ? winW : x;
			y = y > winH ? winH : y;
			return {
				x: x,
				y: y
			}
		},
		bindDrag: function(){
			//先绑定 mousedown 在其中 
			//绑定1、 onmousemove 其中 处理位置 
			//2、onmouseup 恢复并保存			
			var Self = this;
			//保证 浮层在视口中			
			var sx, sy;//鼠标初始值
			var ex, ey;//元素初始值 
			var table = $$(this.LivePanel, "table")[0];
			var dragList = $$(this.LivePanel, ".t_m,.b_m,.m_l,.m_r");
			UI.each(dragList, function(el){
				UI.drag(el, {
					start: function(e){
						UI.addClass(table, "dragging");
						var E = UI.E(e);
						E.prevent();
						sx = E.x;
						sy = E.y;
						ex = parseInt(UI.C(Self.LivePanel, "left"), 10);
						ey = parseInt(UI.C(Self.LivePanel, "top"), 10);
						
					},
					drag: function(e){
						var E = UI.E(e);
						E.prevent();
						var x = E.x - sx + ex, y = E.y - sy + ey;
						var posi = Self.dragRange(x, y)
						// Self.LivePanel.style.left=x+"px"
						UI.C(Self.LivePanel, "left", posi.x + "px");
						UI.C(Self.LivePanel, "top", posi.y + "px");
					},
					stop: function(e){
						UI.removeClass(table, "dragging");
						var left = UI.C(Self.LivePanel, "left"), top = UI.C(Self.LivePanel, "top");
						if (UI.B.ie6) {
							left = parseInt(left, 10) - UI.scrollX() + "px";
							top = parseInt(top, 10) - UI.scrollY() + "px";
						}
						Self.position(left, top);
						
					},
					call: function(){
					}
				});
			})
		},
		openLive: function(){
			UI.show(this.LivePanel);
			this.init();
			//UI.hide(this.startBtn);
			this.initList();
		},
		closeLive: function(){
			this.liveList && (this.liveList.stop = 1);
			//MI.S.clear();
			//只清楚 用户数据
			this.clearView();
			this.clearUser();
			this.clearRefresh();
			this.hideContent();
			this.userListDom.innerHTML = "";
			UI.hide(this.closeBtn);
			this.addUserBtn.value = "开始直播";
			if (this.liveList) {
				this.liveList.list = [];
				this.liveList.cache = {};
				this.ul.innerHTML = "";
				this.liveList.stop = 1
				delete this.liveList.param.id;
				delete this.liveList.param.time;
			}
		},
		hide: function(){
			this.closeLive();
			UI.hide(this.LivePanel);
		},
		hideContent: function(){
			if (UI.C(this.content, "height") == "0px") {
				UI.hide(this.userListDom.parentNode.parentNode);
				return
			}				
			//return;
			var pH=$$(this.suggest,"p")[0].clientHeight;		
			var y = parseInt(UI.C(this.LivePanel, "top"), 10) 
			+ this.content.parentNode.clientHeight 
			+ this.userListDom.parentNode.parentNode.clientHeight -pH+12;
			
			//UI.C(this.LivePanel, "top", y + "px");
			//UI.hide(this.content);
			UI.C(this.content, "height", 0 + "px");
			UI.removeClass(this.LivePanel, "live_open");
			y=y-this.suggest.clientHeight;
			
			UI.C(this.LivePanel, "top", y + "px");
			UI.hide(this.userListDom.parentNode.parentNode);
			this.setInView();
		},
		showContent: function(){			
			var oriHeight = this.content.clientHeight + this.userListDom.parentNode.parentNode.clientHeight+this.suggest.clientHeight;
			UI.show(this.userListDom.parentNode.parentNode);
			var contentHeight=	parseInt(UI.C(this.content, "height"), 10);	
			if (contentHeight < 300) {//} == "0px") {
				var size = this.size();
				if (this.content.clientHeight == 0) {
					if (size && size.height && size.height != "0px") {
						UI.C(this.content, "height", size.height);
					}
					else {
						UI.C(this.content, "height", "300px");
					}
				}
				UI.addClass(this.LivePanel, "live_open");
				var nowHeight = this.content.clientHeight + this.userListDom.parentNode.parentNode.clientHeight+this.suggest.clientHeight;
				var y = parseInt(UI.C(this.LivePanel, "top"), 10) - (nowHeight - oriHeight);
				if(contentHeight==0){					
					y=y-12;
				}
				UI.C(this.LivePanel, "top", y + "px");
				this.setInView();
			}
			
			var tips = $("livePanelTips");
			tips && UI.remove(tips);
			//添加 loading
			var li = $$(this.content, "ul li");
			if (li.length == 0) {
				var loading = UI.html('<li class="loading" id="livePanelLoading"  style="height:' + this.content.clientHeight + 'px;background-position:50% 100px;border-bottom:0!important;">&nbsp;</li>')[0];
				UI.append(loading, this.ul);
			}
		},
		/**
		 * updatelist 调用接口后 回调函数
		 * @param {Object} data
		 */
		interfaceCallBack: function(data){
			this.clearLoading();			
			this.refresh(1, data.info.time);
			this.liveList.param.time = data.info.time;
			this.liveList.param.re = 1;
                
			if (data.result == 0) {
				if (data.info && data.info.talk && data.info.talk.length > 0) {
					
					this.showContent();
					
					var oriHeight = this.content.clientHeight + this.userListDom.parentNode.parentNode.clientHeight+this.suggest.clientHeight;
					var size = this.size();
					if (size && size.height && size.height != "0px") {
						UI.C(this.content, "height", size.height);
					}
					else {
						UI.C(this.content, "height", "300px");
					}
					UI.addClass(this.LivePanel, "live_open");
					var nowHeight = this.content.clientHeight + this.userListDom.parentNode.parentNode.clientHeight+this.suggest.clientHeight;
					var y = parseInt(UI.C(this.LivePanel, "top"), 10) - (nowHeight - oriHeight);
					UI.C(this.LivePanel, "top", y + "px");
					this.setInView();
					return;
				}
			}
			//添加tips
			var li = $$(this.content, "ul li");
			if (li.length == 0) {
				var tips = UI.html('<li  id="livePanelTips"  style="height:' + this.content.clientHeight + 'px;background-position:50% 100px;border-bottom:0!important;">' + _("暂时没有新消息") + '</li>')[0];
				UI.append(tips, this.ul);
				var height = parseInt(UI.C(this.content, "height"), 10);
				if (height == 0) {
					return;
				}
				
				var y = parseInt(UI.C(this.LivePanel, "top"), 10) + height - 100;
				UI.C(this.content, "height", "100px");
				UI.C(this.LivePanel, "top", y + "px");
			}
		},
		clearLoading: function(){
			var el = $("livePanelLoading");
			if (el) {
				UI.remove(el);
			}			
		},
		setInView: function(){
			var x = parseInt(UI.C(this.LivePanel, "left"), 10), y = parseInt(UI.C(this.LivePanel, "top"), 10);
			var posi = this.dragRange(x, y);
			
			UI.C(this.LivePanel, "left", posi.x + "px");
			UI.C(this.LivePanel, "top", posi.y + "px");
		},
		//<li><span><img src="http://t0.qlogo.cn/mbloghead/8b68bc459a0b61fbb4cc/30"><a class="close" href="#">×</a></span></li>
		userListTmpl: '<%for(var i=0;i<users.length;i++){%><li id="liveUser_<%=users[i].name%>"><span title="<%=users[i].nick%>"><img width="50px" height="50px" src="<%=users[i].url%>"><a class="close" href="javascript:;"title="删除此用户" rel="<%=users[i].name%>">×</a></span></li><%}%>',
		userList: {
			u: {},
			topic: null,
			qun: null,
			search:null
		},
		viewList: [],//存放 当前需要播放的微访谈id 
		tempViewObj: [],//存放当前已经添加 但还没有开始的访谈id
		/**
		 * 恢复 微访谈数据
		 */
		initView: function(){
			var viewObj = this.getView();
			for (var id in viewObj) {
				this.addView(id, viewObj[id].nick, viewObj[id].timestart, viewObj[id].timeend,true);
			}
		},
		/**
		 * 单击后 已经识别 添加微访谈
		 * @param {Object} id 嘉宾id
		 * @param {Object} nick  微访谈名称
		 * @param {Object} timestart 开始
		 * @param {Object} timeend 结束
		 */
		addView: function(id, nick, timestart, timeend,isInit){//(id,nick,UI.A(this,"timestart"),UI.A(this,"timeend"));			
			//先排重			 
			if (this.tempViewObj[id]) {
				MI.dialog.showTip({
					html: _("微访谈 " + nick + " 已经预约了。"),
					ico: 'ico_te'
				});
				return;
			}			
			//检查时间
			var now = (new Date()).getTime(), stTime = parseInt(timestart + "000"), endTime = parseInt(timeend + "000"), Self = this;
			var stTimeout, endTimeout;
			stTimeout = stTime - now;
			endTimeout = endTime - now;
			if (now < stTime) {//定时  开始 与 关闭					
			}
			//当前时间 已经过了 开始时间
			if (now > endTime) {//已经结束了					
				if (!isInit) {
					MI.dialog.showTip({
						html: _("微访谈" + nick + "已经结束了。"),
						ico: 'ico_te'
					});
				}
				return;
			}			
			Self.saveView({
				id: id,
				nick: nick,
				timestart: timestart,
				timeend: timeend
			});			
			Self.tempViewObj[id] = {};
			Self.tempViewObj[id].stTimer = setTimeout(function(){
				Self.viewStart(id);
			}, stTimeout < 0 ? 0 : stTimeout);
			if(stTimeout>10*1000){
				Self.tempViewObj[id].tipsStartTimer = setTimeout(function(){
					var tips=$("livePanelTips");
                if(tips){
					tips.innerHTML=_("微访谈即将开始。");
				}
            }, stTimeout-10*1000);
			}
			
			Self.tempViewObj[id].endTimer = setTimeout(function(){
				Self.viewEnd(id);				
			}, endTimeout);
			//添加访谈对象 头像哦
            var ids=id.split(",")
            Self.addToList({"interview":ids},function(info){
				//重新绑定下 加入的头像属性吧
								
				Self.showContent();				
				if(stTimeout<=0){//还木有直播  直播ingOrend 不处理
					return ;
				}				
				Self.clearLoading();
				//添加tips
				var li = $$(Self.content, "ul li");
				if (li.length == 0) {
					var startDate = new Date(stTime);
					startDate = UI.formatDate(startDate, 'MM月dd日  hh点mm分')
					var tips = UI.html('<li  id="livePanelTips"  style="height:' + Self.content.clientHeight +
					'px;background-position:50% 100px;border-bottom:0!important;">' +
					_("微访谈将于" + startDate + "开始") +
					'</li>')[0];
					UI.append(tips, Self.ul);
					var height = parseInt(UI.C(Self.content, "height"), 10);
					if (height == 0) {
						return;
					}					
					var y = parseInt(UI.C(Self.LivePanel, "top"), 10) + height - 100;
					UI.C(Self.content, "height", "100px");
					UI.C(Self.LivePanel, "top", y + "px");
				}		
				
               // Self.saveUser(info.users);
               // Self.initUpdateList();
               // Self.input.value = Self.tips;
               // Self.input.blur();
               // Self.input.reset();
            });
			
		},	
		viewStart:function(id){			
			this.viewList.push(id);//加入请求列表
			//重置 请求             
			this.initUpdateList();
		},
		viewExist:function(id, arr){
			var index = -1;
			UI.each(arr, function(el, i){
				if (el == id) {
					index = i;
				}
			});
			return index;		
		},		
		viewEnd:function(id, isUpdate){
			var index = this.viewExist(id, this.viewList);
			if (index > -1) {
				this.viewList.splice(index, 1);
			}
			if (this.tempViewObj[id]) {
				if (this.tempViewObj[id].stTimer) {
					window.clearTimeout(this.tempViewObj[id].stTimer);
				}
				if (this.tempViewObj[id].tipsStartTimer) {
					window.clearTimeout(this.tempViewObj[id].tipsStartTimer);
				}
				
				if (this.tempViewObj[id].endTimer) {
					window.clearTimeout(this.tempViewObj[id].endTimer);
				}
				delete this.tempViewObj[id];
			}
			//删除 缓存
			this.deleteView(id);
			if (!isUpdate) {
				//重置 请求             
				this.initUpdateList();
			}
		},
		clearView:function(){
			for (var id in this.tempViewObj) {
				this.viewEnd(id, true);
			}	
		},
		/**
		 * 添加到 显示列表中
		 * @param {Object} inputData {topic：[],search:[]}
		 * @param {Object} call
		 */	
		addToList: function(inputData, call){
			//缓存数据
			var data = [], Self = this, exist = "", existUser = [], existTopic = [], existQun = [], curTopic = this.userList.topic, curQun = this.userList.qun;
			inputData["user_group"]||(inputData["user_group"]=[]);
			inputData["topic"]||(inputData["topic"]=[]);
			inputData["search"]||(inputData["search"]=[]);
			inputData["interview"]||(inputData["interview"]=[]);
			UI.each(inputData["user_group"].concat(inputData["topic"]).concat(inputData["interview"]), function(el, i){				
				if (el.hasString("*")) {
					existQun.push(el);
					
				}
				if (el.hasString("#")) {
					existTopic.push(el);
				}
				
				//检查普通用户
				var u = Self.userList.u[el];
				if (!u) {//没有请求过
					data.push(el);
					//Self.userList.u[el] = 1;
				}
				else {//已经存在的users	
					if (!el.hasString("*") && !el.hasString("#")) {
						existUser.push(el);
					}
				}
			});
			var tips = null;			
			existTopicStr = existTopic.join("");
			existQunStr = existQun.join("");			
			// 1 已经有的情况 或者输入多个		
			if ((curTopic && existTopic.length > 0) || existTopic.length > 1) {
				tips = _("话题只能添加一个");
			}
			
			if ((curQun && existQun.length > 0) || existQun.length > 1) {
				tips = _("微群只能添加一个");
			}
			if (((curTopic && existTopic.length > 0) || existTopic.length > 1) && ((curQun && existQun.length > 0) || existQun.length > 1)) {
				tips = _("微群与话题都是只能添加一个");
			}
			//2 排除 已经添加的情况
			if (curTopic == existTopicStr) {
				tips = _("话题 " + existTopicStr + " 已经添加");
			}
			if (curQun == existQunStr) {
				tips = _("微群" + existQunStr + "已经添加");
			}
			//3 处理 已经添加过得用户
			if (existUser.length > 0) {
				tips = tips ? (tips + "<br/>") : "";
				tips = tips + _("用户 " + existUser.join("、") + "已经存在。")
			}
			if (tips) {
				MI.dialog.showTip({
					html: tips,
					ico: 'ico_te'
				});
				return;
			}
			
			if (data.length == 0 && inputData["search"].length==0) {
				return;
			}
			if(inputData["search"]&&inputData["search"].length>0){
				Self.searchList=inputData["search"];
			}
			MI.ajax({
				url: '/asyn/userinfo.php',
				type: 'post',
				data: {
					u: data.join(","),
					sp: inputData.search.join("")
				},
				success: function(data){
					data = MI.json(data);
					if (data.result == 0) {
						if (data.info.users && data.info.users.length > 0) {
							Self.updateList(data.info.users);
							call && call(data.info);
						}
						//出错用户 tips提示 并将值写入input						
						if (data.info.error && data.info.error.length > 0) {
							var names = [];
							UI.each(data.info.error, function(el){
								names.push(el.name)
							})
							Self.input.value = names.join(" ");
							UI.addClass(Self.input, "focus");
							MI.dialog.showTip({
								html: _("您输入的帐号不存在。"),
								ico: 'ico_te'
							});
						}
					}
					
				}
			});			
		},
		/**
		 * 调用接口验证用户后 或者使用缓存数据 加入用户头像等
		 * @param {Object} arr
		 * @param {Object} isInit
		 */
		updateList: function(arr, isInit){
			var Self = this, exist = [], data = [];
			UI.each(arr, function(el){
				if (Self.userList.u[el.name] && isInit != "init") {
					exist.push(el.nick);
				}
				else {
					data.push(el);
					Self.userList.u[el.name] = 1;
				}
				if (el.name.hasString("*")) {
					Self.userList.qun = el.name;
				}
				if (el.name.hasString("#")) {
					Self.userList.topic = el.name;
				}
			})
			if (exist.length > 0) {
				var tips = _("用户 " + exist.join("、") + "已经存在。")
				MI.dialog.showTip({
					html: tips,
					ico: 'ico_te'
				});
				//return ;
			
			}
			
			var liList = UI.html(new UI.tmplString(this.userListTmpl)({
				users: data
			}));
			UI.each(liList, function(el){
				UI.append(el, Self.userListDom);
				Self.addCloseEvent(el)
			});
			var width=this.iconWidth;
			//保持 新加入的可见
			setTimeout(function(){
				var listLength = $$(Self.userListDom, "li").length;
				UI.C(Self.userListDom, "width", width * listLength + "px");
				var num = Math.floor((Self.userListDom.parentNode.parentNode.offsetWidth - 28) / width);
				if (listLength >= num) {
					Self.userListDom.style["marginLeft"] = -width * (listLength - num) + "px";
				}
				else {
					Self.userListDom.style["marginLeft"] = 0 + "px";
				}
				Self.checkPriAndNextBtn();
			}, 10)			
			
		},
		/**
		 * 给加入的头像 的删除 添加事件响应
		 * @param {Object} el
		 */
		addCloseEvent: function(el){
			var delBtn = $$(el, ".close")[0], Self = this;
			if (delBtn) {
				var t = UI.A(el, "id") || "";
				if (t.hasString("#")) {
					UI.A(delBtn, "title", _("删除此话题"));
				}
				if (t.hasString("*")) {
					UI.A(delBtn, "title", _("删除此微群"));
				}
				
				if (Self.searchList && UI.A(delBtn, "rel") == Self.searchList.join("")) {
					UI.A(delBtn, "title", _("删除此搜索"));
					UI.A(delBtn, "type", "search");
				}
				var width=this.iconWidth;						
				delBtn.onclick = function(){
					
					if (UI.A(delBtn, "type") == "search") {
						Self.searchList = [];
					}
					Self.liveList.list = [];
					Self.liveList.cache = {};
					Self.viewEnd(UI.A(delBtn, "rel"));
					Self.deleteUser(UI.A(delBtn, "rel"));
					
					Self.ul.innerHTML = "";
					Self.liveList.stop = 0;
					Self.liveList.param.re = 1;
					
					Self.initUpdateList();
					Self.liveList.param.re = 0;
					UI.remove(el);
					
					//保持 新加入的可见
					setTimeout(function(){
						var listLength = $$(Self.userListDom, "li").length;
						UI.C(Self.userListDom, "width", width * listLength + "px");
						var num = Math.floor((Self.userListDom.parentNode.parentNode.offsetWidth - 28) / width);
						if (listLength >= num) {
							Self.userListDom.style["marginLeft"] = -width * (listLength - num) + "px";
						}
						else {
							Self.userListDom.style["marginLeft"] = 0 + "px";
						}
						Self.checkPriAndNextBtn();
					}, 10)
					return false;
				}
				if (UI.B.ie6) {
					el.onmouseover = function(){
						UI.addClass(el, "hover");
					}
					el.onmouseout = function(){
						UI.removeClass(el, "hover");
					}
				}
			}
		},
		/**
		 * 加人按钮事件响应
		 */
		addUser: function(){			
			var v = UI.trim(this.input.value);
			if (v == this.tips) {
				return;
			}
			//var r = /@\S*/gi;
			//1、先提取话题 因为 话题中间可能有空格
			var topicR = /#[\S\s]*#/gi, topicResult;
			topicResult = v.match(topicR) || [];
			//1.1、清除掉 话题 然后 继续
			UI.each(topicResult, function(el){
				v = v.replace(el, "");
			});
			
			//2、提取 用户跟微群			
			var r = /[^\s\n\r]{0,64}\S/gi, out;
			out = v.match(r) || [];
			UI.each(out, function(el, i){
				out[i] = el.replace("@", "");
			})
			var Self = this;
			this.addToList({
				"user_group":out,
				"topic":topicResult
			}, function(info){
				Self.saveUser(info.users);
				Self.initUpdateList();
				Self.input.value = Self.tips;
				Self.input.blur();
				Self.input.reset();
			});
		},
		clearUser: function(){
			this.userList.u = [];
			this.userList.topic = null;
			this.userList.qun = null;
			MI.S(this.key, "");
		},
		getUser: function(){
			return UI.json(MI.S(this.key));
		},
		/**
		 * 记录 用户修改后的尺寸
		 * @param {Object} width
		 * @param {Object} height
		 */
		size: function(width, height){		
			if (width && height) {
				//存储 id time
				MI.S(this.key + "_width", width);
				MI.S(this.key + "_height", height);
			}
			else {
				width = MI.S(this.key + "_width");
				height = MI.S(this.key + "_height");
				if (width != "" && height != "") {
					return {
						width: width,
						height: height
					}
				}
				return false;
			}
		},
		/**
		 * 记录 用户拖动后的相对位置
		 * @param {Object} left
		 * @param {Object} top
		 */
		position: function(left, top){		
			if (left && top) {
				//存储 left top
				MI.S(this.key + "_left", left);
				MI.S(this.key + "_top", top);
			}
			else {
				left = MI.S(this.key + "_left");
				top = MI.S(this.key + "_top");
				if (left != "" && top != "") {
					return {
						left: left,
						top: top
					}
				}
				return false;
			}
		},
		clearRefresh:function(){
			MI.S(this.key + "_id", "");
			MI.S(this.key + "_time", "");			
		},
		refresh: function(id, time){
			if (id && time) {
				//存储 id time
				MI.S(this.key + "_id", id);
				MI.S(this.key + "_time", time);
			}
			else {
				id = MI.S(this.key + "_id");
				time = MI.S(this.key + "_time");
				if (id != "" && time != "") {
					return {
						id: id,
						time: time
					}
				}
				return false;				
			}
		},
		getView:function(){			
			return UI.json(MI.S(this.key + "_v"));
		},
		saveView:function(view){
			var viewObj = this.getView();
			if (!(view.id in viewObj)) {
				viewObj[view.id] = view;
			}
			MI.S(this.key + "_v", UI.json2str(viewObj));			
		},
		deleteView:function(viewId){
			var viewObj = this.getView();
			delete viewObj[viewId];
			MI.S(this.key + "_v", UI.json2str(viewObj));			
		},
		/**
		 * 保存用户
		 * @param {Array} userList 用户数据
		 */
		saveUser: function(userList){			
			var u = this.getUser();					
			UI.each(userList, function(el){			
				if (!(el["name"] in u)) {
					u[el["name"]] = el;
				}
			});
			MI.S(this.key, UI.json2str(u));					
		},
		deleteUser: function(userName){
			var u = this.getUser();			
			if (this.userList.u[userName]) {
				delete this.userList.u[userName];
				if (userName.hasString("*")) {
					this.userList.qun = null;
				}
				if (userName.hasString("#")) {
					this.userList.topic = null;
				}
			}
			if (u[userName]) {
				delete u[userName];
			}
			MI.S(this.key, UI.json2str(u));			
		}
	}
})();

//添加App
if (MI.user.fun.livepanel) {
	MI.app({
		TalkListUpdate: function(){		
			MI.app({
				Base: function(){
					if (!window.livePanel) {
						window.livePanel = new MI.Nano.LivePanel();
					}
					livePanel.openLive();
				}
			})			
		}
	});
}
/*//删除App
if(livePanel){
	livePanel.hide();
}*/

//编辑label标签下的值，目前在座右铭中使用
MI.Nano.Editor = function(id, callback){ 
    var Self = this;

    if(id && UI.isString(id)) {
        Self._key = $(id);
        if(!Self._key) {
            return;
        }
    } else if(UI.isElement(id)) {
        Self._key = id;
    } else {
        return false;
    }   
    Self._txt = UI.text(Self._key); //文字内容
    Self._url = UI.A(Self._key, 'rel');
    Self._maxLen = UI.A(Self._key, 'maxlength');

    Self._input = UI.html('<input name="k" type="text" class="inputTxt" autocomplete="off">')[0];
    UI.hide(Self._input);   
    if(Self._maxLen){
		UI.A(Self._input, 'maxlength', Self._maxLen);
	}
	

    UI.after(Self._input, Self._key);

    //绑定事件
    UI.EA(Self._key, 'click', function(){
        Self._input.value = Self._txt;
        UI.hide(Self._key);
        UI.show(Self._input);
        Self._input.focus();
        Self._input.select();
    });

    UI.EA(Self._input, 'blur', function(){
        Self.save();
    });

    //回车或离开保存
    UI.EA(Self._input, 'keyup', function(e){
        var E = UI.E(e);
        if(E.key == 13){
            Self.save();
        }
    });
}

MI.Nano.Editor.prototype = {
    save : function(){
        var Self = this;

        if(Self._txt != Self._input.value){
			//判断是否满足最大长度限制
			if(!Self._maxLen || 
				Self._maxLen && Self._input.value.length <= Self._maxLen){

				Self._txt = Self._input.value;
				var data = {q:Self._txt, r:MI.random()};
				MI.ajax({
					url : Self._url,
					type : 'post',
					data : data,
					success : function(data){               
						data = MI.json(data);
						if(data.result != 0){
							MI.alert(data.msg);
						}
					}
				});
			}
        }       
        Self._key.innerHTML = '';
        UI.append(document.createTextNode(Self._txt), Self._key);
        UI.hide(Self._input);
        UI.show(Self._key);     
        
    }
}

//群相关处理
MI.Nano.Qun = {
	qid: null,
	url: {
		kickout : '/asyn/kickout.php'
	},
	bulidList : function(id) {
		var Self = this;

		UI.each(UI.children($(id)), function(o, i) {
			Self.addEvent(o);
		});
	},
	addEvent : function(el) {
        var Self = this;

        UI.each($$(el, '.ico_out'), function(o, i){
			var p = UI.parent(o);

			//添加退出事件
			UI.EA(p, 'click', function(){
				var accounts = UI.A(p,'accounts'),
                userType = UI.A(p,'userType'),
                nickname = UI.A(p,'nickName');
				var param = {qid:Self.qid,accounts:accounts,r:MI.random()};
				if(userType == 1){
					MI.dialog.alert('请先取消管理员身份');
					return false;
				}
				
				UI.ajax({
					url : Self.url.kickout,
					data : param,
					success : function(data){
						data = MI.json(data);
						if (data.result == 0) {
						    UI.remove(el);						
						}else{
							if(data.msg)
								{
									MI.alert(data.msg);
								}
						}
						el.sending = 0;
					}
				});

			});
			
		});
	}

}

//名单相关处理
MI.Nano.List = {
	follow : function(id,el,call){
		var Self = this;
		if (!el.sending) {
			var isDel = UI.hasClass(el,'delAttention'),type = isDel ? '2' : '1';
			MI.ajax({
				url : MI.url.listFollow,
				data : {lid:id,type:type,r:MI.random()},
				success : function(data){
					data = MI.json(data);
					if (data.result == 0) {						
						if(isDel){
							UI.show(UI.prev(UI.parent(el)));
							UI.hide(UI.parent(el));
						} else {
							UI.show(UI.next(el));
							UI.hide(el);
						}
						if(MI.Nano.homeTab){
							MI.Nano.homeTab.cacheUrl['/asyn/allmylist.php'] = 0
						}
							
						//刷新名单收听数
						MI.countNum($('listListenNum_' + id),isDel ? -1 : 1);
						
						if (call) {
							call(!isDel); //isFollow
						}
					} else{
						try{
							if (parent.MI && parent.MI.alert){
								parent.MI.alert(data.msg);
							}
							else {
								MI.alert(data.msg);
							}
						}catch(e){}
					}
					el.sending = 0;
				}
			});
		}
		el.sending = 1;
	}
}

//简版联想选人，封装MI.AutoCmt 增加label提示控制
MI.Nano.AutoCmt = function(o){
	if(!o || !o.target || o.target && o.target.nodeName != "INPUT") {
		return; 
	}
	var Self = this;
	Self._key = o.target;
	Self._obj = o;

	MI.app({
		Base: function(){
			Self._auto = new MI.AutoCmt(o);		
		}
	});
	
	//label提示
	Self._tip = Self._key.previousSibling,Self.tip = Self._tip && Self._tip.nodeName == 'LABEL';
	if(Self.tip){
		if(Self._key.value != ""){
			UI.hide(Self._tip);
		}
	}
    
	UI.EA(Self._key, 'focus', function(){
		if(Self.tip){
			UI.hide(Self._tip);
		}
		UI.addClass(Self._key, 'focus');
	});
    
	UI.EA(Self._key, 'blur', function(){
		if(Self._key.value == "" && Self.tip){
			UI.show(Self._tip);
		}
		UI.removeClass(Self._key, 'focus');
	});
	
    
}
//话题浮层
MI.Nano.topicTalkBox = function(title, cont, callback){
	var topicBox = new MI.Reply();
	topicBox.talkBox.success = function(data){
	
		callback && callback(data);
	}
	topicBox.show({
		title: _(title),
		cont: cont,
		height: 40
	});
}
//话题浮层 调用
MI.Nano.showTopicTalkBox = function(el){
	var speed=0.2;
	MI.Nano.topicTalkBox("参与话题", "#"+decodeURIComponent(UI.A(el, "topic"))+"#", function(data){
		if (data.result == 0) {
			if (data.info.talk && data.info.talk.length > 0) {
				var container=$("topicList");
				if(!container) return;
				var li = UI.html(new UI.tmplString(MI.Nano.tmpl.easyTopic)(data.info))[0];				
				var height = 0;
				UI.prepend(li, container);
				height = UI.height(li);
				UI.C(li, 'height', 0);
				UI.C(li, 'opacity', 0);
				
				//容器 margin-top 动画 然后 恢复透明度
				UI.animate(li, 'height', height - parseInt(UI.C(li, 'paddingTop')) -
				parseInt(UI.C(li, 'paddingBottom')), function(){
					UI.animate(li, 'opacity', 1, function(){
						li.style.cssText = "";
					}, speed, 30);
					UI.C(li, 'height', 'auto');
				}, speed, 20);
			}
			
		}
	})
}

//简版导航
MI.Nano.navMenu = function(){	
	
	(function(){
		var headNav = $('headWrap');
		var navSet = $$(headNav,'.right .accountItem')[0];

		if(UI.B.ie6) {
			//if(!document.documentElement.style.backgroundImage)document.documentElement.style.cssText = 'background:#BBEDFF fixed';
			headNav.style.setExpression("top","eval((document.documentElement||document.body).scrollTop) + 'px'");
		}
		else if (UI.B.os5 && UI.B.iphone && UI.B.qq) {
			headNav.style.position = 'absolute';
		}
		
		var hide = function(e) {
			var subNav = $$(this,'.topNavSub')[0];
			var btn = $$(this,'.txt')[0];
			UI.hide(subNav);
			UI.removeClass(btn,'active');
		}
		var show = function(e) {
			var subNav = $$(this,'.topNavSub')[0];
			var btn = $$(this,'.txt')[0];
			UI.show(subNav);
			UI.addClass(btn,'active');
		}
		
		UI.each([navSet],function(o) {
			if(o) {
				if (UI.B.ipad){
					//o.ontouchstart = show;
					var link = $$(o,'a')[0];
					if (link){
						link.onclick = function() {
							return false;
						}
					}
				}
				else {
					o.onmouseout = hide;
					o.onmouseover = show;
				}
			}
		});
		
	})();

}
//默认使用简版 设置浮层
//1、标志位 木有时间  是第一次

//2、标志位 有时间 判断72小时 

MI.Nano.setNanoDefault=function(){
	var flag=MI.user.fun.setDefault,lastTime=MI.user.fun.setDefaultTime;
	var tpl='<div style="left:634px; width:242px" class="mTips">\
        <a title="关闭" class="close TipsClose" href="javascript:;"></a>\
        <div class="SA"><em>◆</em><span>◆</span></div>\
        <div class="cntBox">\
        <p>下次访问腾讯微博，直接来体验版？</p>\
        <div class="funBox">\
        <label class="gb_btn gb_btn3"><input type="button" class="t" value="好" style="font-weight:bold"></label> <a href="javascript:;" class="noyet" node="cancel">暂时不</a>\
        </div>\
        </div>\
        </div>';
	var node;	
	var renderTips=function(){
		
		node=UI.html(tpl)[0];
		UI.append(node,$$(".headInside")[0]);		
		//ie6 特殊处理下
		if(UI.B.ie6){
			
		}		
		var btnOk,btnCancel,btnClose;
		btnOk=$$(node,"input")[0];
		btnCancel=$$(node,"a[node=cancel]")[0];
		btnClose=$$(node,"a.close")[0];		
		bindBtnEvent(btnOk,btnCancel,btnClose);
		
	}
	var bindBtnEvent=function(btnOk,btnCancel,btnClose){
		//各种btn
		btnOk.onclick=function(){
			sendData(1);
		}
		btnCancel.onclick=function(){
			if (!lastTime) {
				sendData(0);
			}else{
				sendData(-1);
			}
		}
		btnClose.onclick=function(){
			if (!lastTime) {
                sendData(0);
            }else{
                sendData(-1);
            }
		}
		
		
	}
	var checkStatus=function(){
		if(!flag){//木有标志位  不显示
			return false;
		}
		if(!lastTime){
			return 60*1000;
		}else{
			var now=(new Date()).getTime(),last=lastTime*1000+72*3600*1000;
			
			var interval=last-now;
			
			return interval>0?interval:10;
		}
	}
	var sendData=function(v){		
		MI.ajax({
                url : "/asyn/userAttrSave.php",
                data : {
					t:150,
					v:v
				},
                success : function(data){
                    data = MI.json(data);
					
                    if (data.result == 0) {                     
                       UI.hide(node);
                    }                   
                }
            });
		
	}
	var status=checkStatus(),timer;
	
	if(status){
		timer = setTimeout(function(){
			renderTips();//渲染浮层吧
		},status);		
	};
}
MI.Nano.setNanoDefault();
(function(){
	var dialog = null;
	MI.Nano.setSkin = function(){
		var priview = {
			css: function(id){
				var Self = this, style = $('viewTheme'), curTheme = $('curTheme'), url = 'http://t.qq.com/asyn/theme_preview.php?id=' + id;
				if (!style) {
					style = UI.DC('link');
					style.id = 'viewTheme';
					UI.A(style, 'type', 'text/css');
					UI.A(style, 'rel', 'stylesheet');
					UI.append(style, $$('head')[0]);
				}
				UI.getCss(url, function(){
					//Self.setPosition();
				}, style);
				if (curTheme) {
					UI.remove(curTheme);
					//Self.setPosition();
				}
				saveData.id = id;
				//Self.themeId = id;
			}
		};
		var saveData = { //cssId:null
			id: 0
		};
		var select = null;
		var bindEvent = function(list, btnOk, btnCancel){
			//绑定 皮肤选择的 a表情事件 
			
			UI.each(list, function(el){
				if (UI.hasClass(el, "select")) {
					select = el;
				}
				el.onclick = function(){
					var id = UI.A(this, "themeid");
					if (id) {
						priview.css(id);
					}
					if (select) {
						UI.removeClass(select, "select");
					}
					select = el;
					UI.addClass(el, "select");
				}
				el.onmouseover = function(){
					UI.addClass(this, 'hover');
				}
				el.onmouseout = function(){
					UI.removeClass(this, 'hover');
				}
			});
			//ok
			if (btnOk) {
				btnOk.onclick = function(){
					summitData();
				}
			}
			//cancel
			if (btnCancel) {
				btnCancel.onclick = function(){
					//UI.hide(dialog._wrap);
					dialog.hide();
					var homePage = '/' + MI.user.account;
					document.location.href = 'http://1.t.qq.com' + homePage;
				}
			}
		};
		
		var initDialog = function(){
			// Theme Bos Style
			UI.css('.D2{width:100%;height:100%;position:absolute;top:0;left:0;z-index:99}\.D2 .DCont{*zoom:1}\
		.D2 .bg{background:#FFF;position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;-height:expression(document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + "px")}\
		.D2 iframe.cover_select{width:100%;height:100%;position:absolute;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;z-index:-1;display:none;-display:}\
		.D2 .DLoad{filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5;position:absolute;z-index:5;background:url(http://mat1.gtimg.com/www/mb/images/loading.gif) #FFF 50% 50% no-repeat;}\
		.D2 .CR{position:absolute;top:50%;left:50%;margin:0 0 0 -9999px}\
		.D2 .DTitle,.D2 .ico_skin,.DtabTitle,.ico_lock,.D2 .funBox,.themebg_sel button,.themebg .del,.bgPosition,.bgPosition a.select,.D2 .color,.palettes .mask,.themeDiy .pages a{background:url(http://mat1.gtimg.com/www/mb/images/skinBg1d.png) no-repeat}\
		.D2 .DTitle{cursor:move;height:36px;overflow:hidden;padding-left:10px;font-family:Simsun;font-size:14px;line-height:35px;font-weight:bold;border-bottom:1px solid #D5D5D5;background-position:0 -34px;background-repeat:repeat-x}\
		.D2 .ico_skin{float:left;margin:9px 5px 0 0;_margin-right:0;background-position:0 -124px}\
		.D2 .close{position:absolute;float:none;top:12px;right:12px;margin:0}\
		.D2 .DWrap{width:586px;padding:1px;border:1px solid #7B828B;background:#fff;filter:progid:DXImageTransform.Microsoft.Shadow(color="#909090",Direction=135,Strength=4);-moz-box-shadow:2px 2px 5px #909090;-webkit-box-shadow:2px 2px 5px #909090}\
		.D2 .pages{width:544px;margin:0 auto;padding:10px 5px 8px;border-bottom:1px dotted #C9C9C9}\.D2 .pages .disabled{color:#999;cursor:default;text-decoration:none;background:none}\
		.D2 .funBox{height:36px;padding-top:9px;text-align:center;background-position:0 -75px;background-repeat:repeat-x}\
		.D2 .btn_save{margin-right:10px}\
		.DtabTitle{height:29px;padding-right:10px;*zoom:1;overflow:hidden;line-height:29px;background-repeat:repeat-x}\
		.DtabTitle ul{float:left}\
		.DtabTitle li{display:inline-block;float:left;margin-left:-1px;border:1px solid #D5D5D5;border-width:0 1px}\
		.DtabTitle li.select{padding:0 15px;background:#fff}\.DtabTitle li a{display:block;padding:0 15px}\
		.DtempList{width:556px;height:188px;margin:10px 0 0 20px}\
		.DtempList li{position:relative;float:left;width:129px;height:84px;margin:10px 10px 0 0;color:#fff;line-height:19px;text-align:center;cursor:pointer}\
		.DtempList img{margin:1px;width:121px;height:76px;padding:2px;border:1px solid #DFDFDF}\
		.DtempList .tempName,.DtempList .mask{position:absolute;z-index:2;left:4px;bottom:4px;width:121px;height:19px}\
		.DtempList .ico_lock{display:none;position:absolute;z-index:2;left:6px;top:6px;width:11px;height:16px;background-position:-20px -125px}\
		.DtempList .mask{z-index:1;background:#000;filter:alpha(opacity:70);opacity:0.7}\
		.DtempList li.hover img{border-color:#32A1CC}\
		.DtempList .select img{margin:0;border:2px solid #32A1CC}\
		.DtempList .locked img{border-color:#5F5F5F!important;background:#fff;filter:alpha(opacity:20);opacity:0.2}\
		.DtempList .locked .ico_lock{display:block}\
		.themeDiy{width:558px;height:213px;margin:20px auto 0;color:#999;border-bottom:1px dotted #C9C9C9}\
		.themebgWrap{float:left;width:283px;height:203px;border:1px solid #DFDFDF}\
		.themebg_sel{position:relative;height:49px;padding:10px 8px 0;line-height:25px;background:#EBEBEB}\
		.themebg_sel .inputTxt{width:180px;margin-right:5px;border:1px solid #C5C5C5;position:relative;z-index:1;cursor:pointer}\
		.themebg_sel button{width:60px;height:21px;border:0;background-position:0 -145px}\
		.selfilemask{position:absolute;z-index:100;width:20px;height:20px;overflow:hidden;*zoom:1;filter:alpha(opacity:0);opacity:0}\
		.selfilemask input{position:absolute;right:0;height:21px;cursor:pointer}\
		.themebg_set{width:267px;margin:15px auto 0;}\
		.themebg{float:left;position:relative;width:106px;height:106px;padding:2px;border:2px solid #32A1CC}\
		.themebg .nobg{cursor:default;height:106px;color:#999;line-height:106px;text-align:center;background-color:#EFEFEF}\
		.themebg .loading{padding-left:16px;background-position:20% 50%}\
		.themebg .imgbg{width:106px;text-align:center;overflow:hidden}\
		.themebg .imgbg img{height:106px}\
		.themebg .del{position:absolute;top:0;right:0;width:18px;height:18px;background-position:-35px -124px}\
		.bgSetting{float:right;width:143px;padding-top:38px}\
		.bgPosition{width:150px;height:22px;margin:5px 0;background-position:0 -168px}\
		.bgPosition a{display:inline-block;width:38px;height:19px;padding-top:1px;margin:1px;color:#333;line-height:19px;text-align:center; vertical-align:middle;}\
		.bgPosition a:hover{text-decoration:none;background-color:#FDFDFD}\
		.bgPosition a.select,.bgPosition a.select:hover{color:#fff;background-position:-64px -145px}\
		.bgSetting label{margin-right:8px;white-space:nowrap}\
		.themecolorWrap{position:relative;float:right;width:252px;height:203px;padding:0 4px 0 9px;border:1px solid #DFDFDF}\
		.themecolorWrap h4{height:24px;padding-top:3px}\
		.themePreview{float:left;width:134px}\
		.D2 .colorBox{height:29px;padding-left:1px}\
		.D2 .color{display:inline-block;width:16px;height:16px;padding:3px;background-position:0 -192px}\
		.D2 .colorBox .select{position:relative;background-position:-24px -192px}\
		.TpreviewBox{width:112px;height:110px;overflow:hidden;*zoom:1;padding:10px;border:1px solid #DFDFDF}\
		.Tmain,.Tface{background:#fff url(http://mat1.gtimg.com/www/mb/images/skinFixmod.png) no-repeat}\
		.Tmain{float:left;width:77px;height:110px;margin-right:-1px}\
		.Tside{float:right;width:34px;height:110px;}\
		.TUIn{width:28px;padding:6px 3px 2px;overflow:hidden;*zoom:1}\
		.Tface{float:left;width:14px;height:14px;margin-bottom:4px;background-position:-81px 0}\
		.Tnums{float:right;width:12px}\
		.Tside .textColor{width:12px;height:3px;overflow:hidden;margin-bottom:1px;background:#9C000D}\
		.Tside .linkColor{clear:both;width:50%;height:2px;overflow:hidden;margin-bottom:2px;background:#FFA869}\
		.Tside .sepLine{height:0;overflow:hidden;border:1px solid;border-width:1px 0}\
		.TsideMod{width:28px;margin:4px auto}\.TsideMod .textColor{margin-bottom:3px}\
		.TsideMod .linkColor{width:16px}\
		.ThotList .SA{z-index:0;left:0;top:-5px;*top:-6px;_top:-5px}\.ThotList .SA *{width:18px;height:5px}\.ThotList .SA span{left:0;top:1px}\
		.ThotList{margin-top:3px;height:12px}\
		.palettelist{float:right;position:relative;width:108px;overflow:hidden}\
		.paletteWrap{height:142px;width:1000px;overflow:hidden}\
		.paletteWrap li{float:left;width:108px}\
		.palettes,.palettes *{display:block;height:27px;overflow:hidden;}\
		.palettes{position:relative;float:left;width:48px;padding:3px;margin:4px 0 10px;cursor:pointer}\
		.palettes .c{float:left;width:8px}\
		.palettes .mask{position:absolute;top:0;left:0;clear:both;width:54px;height:33px;background-position:0 -218px}\
		.paletteWrap .select .mask{background-position:-56px -218px}\
		.D2 .themeDiy .pages{position:absolute;right:4px;bottom:15px;clear:both;width:108px;height:16px;overflow:hidden;padding:0;border:none}\
		.themeDiy .pages *{float:left;margin:0}\
		.themeDiy .pages a{width:20px;height:16px;background-position:-74px -124px}\
		.themeDiy .pages .btn_prev_disabled{background-position:-59px -124px;cursor:default}\
		.themeDiy .pages .btn_next{background-position:-102px -124px}\
		.themeDiy .pages .btn_next_disabled{background-position:-87px -124px;cursor:default}\
		.themeDiy .pageInfo{width:68px;text-align:center}\
		.themeHisWrap{position:absolute;left:15px;bottom:13px;*bottom:17px;height:24px;overflow:hidden;*zoom:1;line-height:25px}\
		.themeHis{float:left;width:16px;height:16px;padding:2px;margin:1px 2px;overflow:hidden;border:1px solid #DFDFDF;background-position:center top;cursor:pointer}\
		.themeHis .Tmain{filter:alpha(opacity=10);opacity:0.1;width:9px;height:16px;background:#fff}\
		.themeHis .Tside{width:6px;height:16px}\
		.themeHisWrap .select{margin:0 1px;border:2px solid #32A1CC}\
		.colorPickerPosition{position:absolute;height:0;margin:-31px 0 0 -222px}');
			dialog = new MI.Dialog({
				tmpl: '<div class="D2">' +
				(UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') +
				'<div class="bg"></div><div class="CR"><div class="DWrap"><div class="DTitle"></div><a title="' +
				_('关闭') +
				'" class="DClose close" href="#">' +
				_('关闭') +
				'</a><div class="DLoad"></div><div class="DCont"></div></div></div>'
			});
			UI.hide(dialog._bg);
			//UI.C(dialog._body, 'width', '0');
			//UI.C(dialog._body, 'height', '0');
			$$(dialog._body, '.DClose')[0].onclick = function(){
				//UI.hide(dialog._wrap);
				return false;
			}
		};
		
		var setPosition = function(wrap){
			var width = parseInt(UI.width(wrap)), height = parseInt(UI.height(wrap));
			wrap.style.top = (UI.windowHeight() - height) / 2 + UI.scrollY() + 'px';
			wrap.style.left = (UI.pageWidth() - width) / 2 + 'px';
		};
		
		var start = function(){
			if (!dialog) {
				//1、渲染dialog 2、调用皮肤数据 装载 3、绑定事件
				initDialog();
				getSkinData(function(){
					dialog.show({
						title: '<span class="ico_skin"></span>' + _('皮肤设置'),
						// html : '<div style="height:300px"></div>',
						width: 590,						
						top: 0,
						left: 0
					});
					setPosition(dialog._wrap);
					var list = $$(dialog._cont, "li");
					//插入btnok cancel
					var node = UI.html('<div class="funBox">\
							                       <label class="gb_btn gb_btn2">\
												      <input type="button" class="t" node="btnok" value="保存"></label>\
												  <label class="gb_btn gb_btn6"><input type="button" class="t" node="btncancel" value="取消"></label></div>')[0];
					UI.append(node, dialog._cont);
					var inputList=$$(node, "input");
					var btnOk = inputList[0], btnCancel = inputList[1];
					bindEvent(list, btnOk, btnCancel);
					
					initDiy();
				})
			}
			else {
				//UI.show(dialog._wrap);
				dialog.show({
					title: '<span class="ico_skin"></span>' + _('皮肤设置'),
					// html : '<div style="height:300px"></div>',
					width: 590,					
					top: 0,
					left: 0
				});
				setPosition(dialog._wrap);
			}
		};
		//获取皮肤数据
		var getSkinData = function(callback){
			MI.ajax({
				url: "/setting_theme_frame.php",
				success: function(data){
					data = MI.json(data);
					if (data.result == 0) {
						dialog._cont.innerHTML = data.info;
						callback && callback();
					}
				}
			});
		};
		
		//提交数据
		var summitData = function(){
			//根据当前选择 决定上传自定义皮肤还是选择的皮肤
			var isDiySelected = false, diyNode, data = {};
			diyNode = $$(dialog._body, "li.guest_upload")[0];
			if (UI.hasClass(diyNode, "select")) {
				
				data = diyPreview(1);
				var index = 0;
				for (var i in data) {
					diySaveFormInput[index].value = data[i];
					index++;
				}				
				diySaveForm.submit();
				
			}
			else {
				MI.ajax({
					url: "/asyn/theme_save.php",
					data: saveData,
					success: function(data){
						data = MI.json(data);
						if (data.result == 0) {
							dialog.hide();
							MI.tip(_('保存成功！'), function(){
								var homePage = '/' + MI.user.account;
								document.location.href = 'http://1.t.qq.com' + homePage;
							});
						}
					}
				});
			}
		};
		//自定义 皮肤部分		
		var diyCss = 'body{background:url(<%=image%>) <%=color_0%> <%=imagePosition%> 0 <%=imageRepeat%> <%=imageAttachment%>}\
				.topMenu,.SM li,.SC .btn,.dotList .dot{background:none}\
				#logo a,.SM i{background-image:url(http://mat1.gtimg.com/www/mb/images/theme/b3_110107.png);_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=crop,src="http://mat1.gtimg.com/www/mb/images/theme/b3_110107.png")}\
				#talkBox .cntBox textarea,#talkBox .txtShadow{border-color:#D0D0D0}\
				#talkBox .cntBox textarea.focus{border-color:#A8A8A8;-moz-outline-color:#E4E4E4;-webkit-box-shadow:0 0 10px rgba(219,219,219,.6)}\
				    ';
		var diyForm, diyBtn, img, diyStyle, loading, diySaveForm, diySaveFormInput, diyLi;
		var initDiy = function(){
			diyLi = $$(dialog._body, "li.guest_upload")[0];
			diyForm = $$(dialog._body, "form")[0];
			diyBtn = $$(dialog._body, "input")[0];
			img = $$(diyLi, " img")[0];
			loading = $$(dialog._body, "div.loading")[0];
			diySaveForm = $("diySaveForm");
			diySaveFormInput = $$(diySaveForm, 'input');
			
			diyLi.onmouseover = function(){
				//UI.addClass(diyLi, "hover");
			};
			diyLi.onmouseout = function(){
				//UI.removeClass(diyLi, "hover");
			};
			
			if (!diyStyle) {				
				diyStyle = UI.DC('style');
				UI.A(diyStyle, 'type', 'text/css');
			}
			UI.append(diyStyle, UI.GT(document, 'head')[0]);
			
			bindDiyEvent(diyForm, diyBtn);
		};
		var action, code = "";
		var bindDiyEvent = function(form, btn){
			action = UI.A(form, "action");
			if (!MI.Theme) {
				MI.Theme = {
					addPic: function(obj){//上传回调										
						if (obj.result == -100) { // Verify code
							MI.code.show({
								msg: obj.msg,
								code: obj.info,
								call: function(code){
									code = code;
									btn.onchange();
								}
							});
						}
						else 
							if (obj.result == 0) {
								//Self.diyData = {};								
								UI.A(img, 'src', '');
								img.onload = function(){
									//UI.show(Self._diyImageWrap);
									UI.hide(loading);
									//UI.hide(Self._diyImageEmpty);									
									diyPreview();
									form.reset();
									code = '';
								}
								if (UI.isString(obj.info)) {
									img.src = obj.info;
								}
								else {
									img.src = obj.info.pic;
									UI.A(diySaveForm, 'action', 'http://' +
									(obj.info.host ? obj.info.host : 'upload.t.qq.com') +
									'/asyn/saveSkin2.php');
									//action = UI.A(diySaveForm, "action");
								}								
							//Self.diyId = 0;
							}
							else {
								MI.alert(obj.msg);
								UI.hide(loading);
								form.reset();
							}
					},
					saveSuccess: function(data){//自定义皮肤回调											
						if (data.result == 0) {
							dialog.hide();
							MI.tip(_('保存成功！'), function(){
								var homePage = '/' + MI.user.account;
								document.location.href = 'http://1.t.qq.com' + homePage;
							});
						}
						else {
							MI.alert(data.msg);
						}
					}
				}
			}			
			btn.onchange = function(){
				var fileName = this.value, fileType;
				if (fileName) {
					fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase()
					
					if (!'jpg,jpeg,png,gif'.hasString(fileType)) {
						MI.alert(_('仅支持gif、jpg、jpeg、png图片文件'));
						return false;
					}
					
					UI.A(form, 'action', action + '?width=' + window.screen.width + '&code=' + code);
					
					form.submit();
					loading.style.display = "block";
					select = diyLi;
					UI.addClass(diyLi, "select");
				}
			}
			UI.append(btn.parentNode.parentNode, document.body);
			btn.onclick = function(){
				if (select) {
					UI.removeClass(select, "select")
				}
			}	
			diyLi.onmousemove = function(e){
				var E = UI.E(e);
				btn.parentNode.parentNode.style.cssText = 'top:' +
				(E.y - 10 + UI.scrollY()) +
				'px;left:' +
				(E.x - 10) +
				'px;';
			}
		};
		var diyPreview = function(save){
			/*
			 * /asyn/saveSkin.php file_name : 上传皮肤 pic_name : 图片url pos : 位置 0 无效
			 * 1居左 2 居中 3居右 flat ：0 不平铺 1 平铺 fix ： 0 不固定 1 固定 color : 字符串，以|分隔
			 */
			var data = {}, viewTheme = $('viewTheme'), curTheme = $('curTheme'), position = ['', 'left', 'center', 'right'];
			if (curTheme) {
				UI.remove(curTheme);
			}
			if (viewTheme) {
				UI.remove(viewTheme);
			}
			if (save) {
				data.id = 0;// Self.diyId || '';
				data.pic_name = (UI.A(img, 'src') || '').replace('http://mat1.gtimg.com', '').replace('http://t.qq.com', '');
				data.pos = 0;
				data.flat = 1;
				data.fix = 1;
				data.color = "#f1f1f1|#cbc4aa|#333333|#745100|#e6e2d6|#a4a198";
								
			}
			else {				
				data['color_' + 0] = "#f1f1f1";
				
				data.image = UI.A(img, 'src');
				data.imagePosition = position[0];
				data.imageRepeat = 'repeat';
				data.imageAttachment = 'fixed';
			}
			if (save) {
				return data;
			}
			UI.css(new UI.tmplString(diyCss)(data), diyStyle);
			
		}
		
		start();
	}
})();
MI.Nano.themeSet = function(){ //Theme Setting
    var setTheme = $('setNanoTheme');
    if (setTheme) {
        setTheme.onclick = function(){
            var T = this,
                homePage = '/' + MI.user.account;
            if (document.location.pathname != homePage) {
                document.location.href = 'http://1.t.qq.com' + homePage + '?setTheme=1';
                return false;
            }            
			MI.app({
				Base: function(){
					MI.Nano.setSkin();
				}
			})
            return false;
        }
        if (UI.parseUrl().setTheme != undefined) {
            setTheme.onclick();
        }
    }
}
MI.Nano.themeSet();
MI.Nano.fixNaviShow = function(){
	//根据宽度 调整导航条 右侧的文字提示 是否隐藏 防止重叠
	var timer = null, node = $$($("headWrap"), ".topMenu a")[0];
	UI.EA(window, 'resize', function(){
		if (timer) {
			window.clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(function(){
			check();
		}, 350);
	});
	var check = function(){
		if (UI.pageWidth() >= 1080) {
			UI.show(node);
		}
		else {
			UI.hide(node);
		}
	};
	check();
}


//屏蔽心情
MI.version.Mood = null;

//手动后继续自动加载
MI.user.fun.autoMoreContinue = 1;
//资料卡片
MI.user.fun.card = 0;
//收听后加入名单
MI.user.fun.followList = 0;
//是否收藏分组
MI.user.fun.favGroup = 0;
//新消息拉取方式
MI.user.fun.newCount = 1;
//新二传手
MI.user.fun.newRelay2 = 0;
//发表框相关话题引导
MI.user.fun.relTopic = 0;
//自动提示文转图
MI.user.fun.autoTxt2Pic = 0;
//消息盒子评论我的入口
MI.user.fun.comm = 0;
//转播列表转播框只保留一行
MI.user.fun.relayListBoxCondensed = 1;
//简版微博 根据原图大小 判断是否有必要显示 查看原图icon
MI.user.fun.checkBtnOriginalPic = 0;
//checkPicOnSmall:1//点击图片 如果图片宽度小于75 则 设置图片的父节点的宽度为75
MI.user.fun.checkPicOnSmall = 1;

//发布微博btn 在没有文字时 为disable状态
MI.user.fun.sendBtnDisabledOnNoText = 1;

//发布框 只有@某个人的时候 跳转到 nano客人页
MI.user.fun.gotoNanoUserProfile = 1;

//提到我的过滤 1默认为喜欢 0为全部
if(MI.user.fun.atFilterType == null){
	MI.user.fun.atFilterType = 0;
}

//查看大图 根据图的尺寸 决定 背景容器的宽度
MI.user.fun.minSizePicCheck = 1;

//发广播时屏蔽掉微群的at未加入提示
MI.TalkBox.prototype.data.attips = 1;

//简版拉取自己的新消息
MI.TalkList.prototype.newlyUrl = MI.url.newly.replace("t.qq","1.t.qq");

//其他
MI.app({
	Base : function(){
		//MI.listDrop.build();
		//MI.Shortcuts.add(MI.Shortcuts.talkList);
		MI.Nano.navMenu();
	}
});

UI.ready(function(){	
	//主页卡切换
	MI.Nano.homeTab.build();
	MI.goHome = function(data){
		document.location.href = 'http://1.t.qq.com/' + MI.user.account + (data ? '?' + data : '');
	};
	setTimeout(function(){
		//右上角@盒子 延迟绑定
		MI.Nano.newMsg.build();
		MI.Nano.followMe.build();
		//绑定 atlist 与 收听我的人的 浮层 滚动控制
		var ele = $('fcSetting');
		if (ele && ele.parentNode.parentNode) {
			MI.Nano.scrollBondEvent(ele.parentNode.parentNode);
		}
		MI.Nano.fixNaviShow();
		//草稿
		MI.TalkBox.showDraft(MI.talkBox);
	}, 100);
});
