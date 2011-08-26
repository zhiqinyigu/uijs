/**
 * QQ Music 
 * Author : raymli@tencent.com
 * Datetime : 2010-9-7
 * Last Eidt: 2010-10-14

*/
function MusicJsonCallback(data){
//smartBox 搜索接口与按歌曲ID查询专辑信息接口回调函数重名
//在这里判断具体是哪一个的回调
  if (data && data.albumid) {
    MI.TalkList.musicBox.albumInfoCallback(data);
  } else {
    MI.Music.smartBoxCallback(data)
  }
}
function searchCallBack(data){MI.Music.searchCallBack(data)}
function searchJsonCallback(data){MI.Music.searchCallBack(data)}
function jsonCallback(data){MI.Music.favMusicCallBack(data)}
//include QQMusicInstance js
if(typeof initMusicR != 'function'){
	UI.getScript(MI.version.QQMusicInstance);
}
/*
 视频自动播放目前支持优酷和腾讯网
 flashvars参数：
  isAutoPlay=true //优酷
  auto=1 //腾讯
*/
MI.tmpl.videoTool = '<div class="vTools" style="display:block"><a href="#" class="vClose"><em></em>' + _('收起') + '</a><a href="$VideoRealUrl" class="vUrl" target="_blank"><em></em>$VideoTitle</a></div>';
MI.tmpl.videoThumbs = '<a href="#" class="vThumbs" url="$VideoPlayUrl"><span class="mask"><em></em></span><img src="$VideoPicUrl" /></a>';
MI.tmpl.videoObject = '<object name="$VideoPlayID" id="$VideoPlayID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="460" height="372" ><param name="wmode" value="transparent" /><param name="movie" value="$VideoPlayUrl" /><param name="allowFullScreen" value="true" /><param name="flashvars" value="playMovie=true&amp;isAutoPlay=true&amp;auto=1&amp;autoPlay=true"><param name="swfversion" value="50536.0.0.0" /><param name="expressinstall" value="Scripts/expressInstall.swf" /></object>';
MI.tmpl.videoEmbed = '<embed name="$VideoPlayID" id="$VideoPlayID" src="$VideoPlayUrl" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="460" height="372" allowFullScreen="true" flashvars="playMovie=true&amp;isAutoPlay=true&amp;auto=1&amp;autoPlay=true" wmode="transparent"></embed>';
MI.tmpl.videoHTML5 = '<video width="460" height="362" controls="1" autoplay="autoplay" autobuffer="true" src="$VideoPlayUrl"></video>';
MI.Music = {
	//Dom
	talkBox : null,
	tipsMsg : [_('对不起，该功能目前不支持您的浏览器。'),_('对不起，您需要先安装QuickTime才能播放'),_('下载最新版QQ音乐播放控件')],
	lastMusic : null,
	builded : false,
	_rFav : null,
	_rFavPage : null,
	_rSearch : null,
	_rSearchPage : null,
	newMusic : null, //新的音乐
	build : function(o){
		var Self = this;
		Self.newMusic = MI.user.fun.newMusic;
		Self.talkBox = o;
		_DefaultKey = _('输入歌名/歌手名，点击搜索找歌');
		_Key = '';
		_P = 1;
		this.PageNum = 5;
		_Pi = 1;
		_Pfav = 1;
		Self.lastMusic = null;
		Self.musicState = null;
		if(!o.music){
			o.music = {};
		}
		//Self._music = o;
		//Self._musicAnchor = o.$('.newMusic');
		//Add QQ Music
		//build music dom
		var autoHeight = '';//'onload="try{this.height=this.contentWindow.document.body.scrollHeight || this.contentWindow.document.documentElement.scrollHeight;this.width=this.contentWindow.document.body.scrollWidth || this.contentWindow.document.documentElement.scrollWidth;}catch(e){}"';
		//In Iframe: window.frameElement.height=document.body.scrollHeight || document.documentElement.scrollHeight;window.frameElement.width=document.body.scrollWidth || document.documentElement.scrollWidth;
		var html = UI.html('<div class="mloadWrap" style="' + (Self.newMusic ? 'padding-bottom:0;' : '') + 'display:none">\
			<div class="musicTab">\
				' + (Self.newMusic ? 
				'<ul><li class="select"><b>' + _('分享歌曲') + '</b></li><li><a href="#">' + _('分享歌单') + '</a></li></ul>' : 
				'<ul><li class="select"><b>' + _('搜索音乐') + '</b></li><li><a href="#">' + _('我收藏的音乐') + '</a></li></ul>') + '\
				<a href="#" class="close" title="' + _('关闭') + '">' + _('关闭') + '</a>\
			</div>\
			' + (Self.newMusic ? '\
			<iframe class="musicCont" height="40" ' + autoHeight + ' frameborder="0" scrolling="no" crs="http://music.qq.com/musicbox/app/mblog_share_song.html" src="about:blank"></iframe>\
			<iframe class="musicCont" height="40" ' + autoHeight + ' frameborder="0" scrolling="no" crs="http://music.qq.com/musicbox/app/mblog_share_list.html" src="about:blank"></iframe>' : '') + '\
			<div class="m_searchBox clear" style="display:' + (Self.newMusic ? 'none' : '') + '"><input type="text" class="inputTxt" id="musicSearchBox" value="" autocomplete="off" /><button type="button" class="btn2">' + _('搜索') + '</button></div>\
		</div>'),frag = document.createDocumentFragment();
		UI.each(html,function(o){
			UI.append(o,frag);
		});
		UI.append(frag,o._music);

		//Dom
		o._musicBox = $$(o._music,'.mloadWrap')[0];
		o._musicClose = $$(o._music,'.close')[0];

		o._musicSearchBox = $$(o._music,'.m_searchBox')[0];
		o._musicSearchKey = $('musicSearchBox');
		o._musicSearchBtn = $$(o._music,'.btn2')[0];

		Self.switchSearchKey();
		Self.bindSwitchTabs();
		Self.switchTabs(0);

		//Event
		UI.EA(o._musicSearchKey,'keydown',function(e){
			var E = UI.E(e);
			if(E.key == 13){
				UI.E(e).stop();
				o._musicSearchBtn.click();
				o._musicSearchKey.blur();
				Self.stop('',true);
			}
		});
		UI.EA(o._musicSearchKey,'focus',function(e){
			var E = UI.E(e);
			Self.switchSearchKey();
		});
		UI.EA(o._musicSearchKey,'blur',function(e){
			var E = UI.E(e);
			Self.switchSearchKey();
		});
		o._musicSearchBtn.onclick = function(){
			Self.searchMusic(o._musicSearchKey.value, 0);
			if (Self._rSearch && Self._rSearchPage && Self._rSearchPage.target){
				UI.remove(Self._rSearchPage.target);
				Self._rSearchPage = null;
			}
			Self.stop('',true);
			return false;
		}
		o._musicClose.onclick = function(){
			Self.hide();
			UI.removeClass(Self.talkBox._musicAnchor,'disabled');
			Self.stop('',true);
			return false;
		}

		//smartbox
		MI.app({
			Base : function(){
				o.musicBox = new MI.SmartBox('musicSearchBox','','music',{left:0,top:2,width:212});
				o.musicBox.url = 'http://soso.music.qq.com/fcgi-bin/cgiSearchKeyWordMusicBox';
				o.musicBox.param = 'utf8=1&w=%key%';
			}
		});
		//Self.show();
		Self.builded = true;
	},
	switchSearchKey : function(a,b){
		var Self = this,k = Self.talkBox._musicSearchKey;
		var d = _DefaultKey;
		if(!UI.trim(k.value)){
			k.style.color = '#999';
			k.value  = d;
		}else if(UI.trim(k.value) == d){
			k.style.color = '#000';
			k.value  = '';
		}
	},
	bindSwitchTabs : function(){
		var Self = this,musicTab = $$(Self.talkBox._musicBox,'.musicTab')[0],
			tabs = $$(musicTab,'li');
		UI.each(tabs,function(o,num){
			if(num == 0){
				Self.lastTabs = o;
				// @add samlu 添加一个当前展示页卡标识 index的值是musicBox中顶部li的顺序值
				Self.lastTabs.index = num;
			}else{
				$$(o,'a')[0].onclick = function(){return false;};
			}
			o.onclick = function(){
				Self.bindSwitchTabsClick(this,num);
			};
		});
	},
	bindSwitchTabsClick : function(o,num){
		var Self = this;
		if(!o)	return;
		UI.A(Self.talkBox._musicBox,'tabs',num);
		if(o != Self.lastTabs){
			UI.removeClass(Self.lastTabs,'select');
			Self.lastTabs.innerHTML = '<a href="#">'+UI.text(Self.lastTabs)+'</a>';
			$$(Self.lastTabs,'a')[0].onclick = function(){return false;};

			UI.addClass(o,'select');
			o.innerHTML = '<b>'+UI.text(o)+'</b>';
			Self.lastTabs = o;
			// @add samlu 更新当前展示页卡的值
			Self.lastTabs.index = num;
			Self.switchTabs(num);
		}
	},
	switchTabs : function(idx){
		var Self = this,
			box = Self.talkBox._musicBox,
			sBox = Self.talkBox._musicSearchBox,
			cont = $$(box,'.musicCont'),
			rCon = $$(box,'.rSearch')[0],
			fCon = $$(box,'.rFav')[0];
		if (Self.newMusic){ //新的页卡切换
			UI.each(cont,function(o){
				UI.hide(o);
			});
			if (UI.A(cont[idx],'crs') && cont[idx].nodeName == 'IFRAME'){
				UI.A(cont[idx],'src',UI.A(cont[idx],'crs'));
				UI.A(cont[idx],'crs','');
			}
			UI.show(cont[idx]);
		}
		else {
			switch(idx){
				case 0:
					UI.show(sBox);
					if(rCon)UI.show(rCon);
					if(fCon)UI.hide(fCon);
					break;
				case 1:
					UI.hide(sBox);
					if(fCon)UI.show(fCon);
					if(rCon)UI.hide(rCon);
					if(!fCon)Self.favMusic();
					break;
			}
		}
	},
	tmpl : {//
		listAll : '<div class="m_sResult rSearch">\
				<%if(retcode == 0){%>\
					<%if(list.length > 0){%>\
						<div class="m_total clear">\
							<div class="left">' + _('搜索结果({0}首)','<%=totalnum%>') + '</div>\
							<div class="right">' + _('试听') + '</div>\
						</div>\
						<div class="m_list">\
							<ul class="clear">\
							<%for(var i=0,n=list.length;i<n;i++){%>\
								<%var musicid = list[i].musicid,\
									songname = list[i].songname,\
									singername = list[i].singername,\
									songurl = list[i].songurl,\
									str = MI.Music.cut(MI.Music.getHTML(songname ),MI.Music.getHTML(singername));%>\
								<li music="<%=musicid%>,<%=songurl%>,<%=singername%>,<%=songname%>"><div><a href="#" title="' + _('点击添加') + '-<%=songname%> - <%=singername%>"><%=str[0]%><span>- <%=str[1]%></span></a></div><a href="#" class="ico btn_play" id="play_<%=musicid%>" title="' + _('试听音乐') + '"></a></li>\
							<%}%>\
							</ul>\
						</div>\
					<%}else{%>\
						<div class="m_noResult"><p>' + _('对不起，未找到"{0}"的相关歌曲。','<%=MI.string.html(_Key)%>') + '</p><p>' + _('请检查关键词是否正确，或更换其他关键字搜索。') + '</p></div>\
					<%}%>\
				<%}else{%>\
					<div class="m_noResult"><h4>' + _('系统繁忙，请稍后再试') + '</h4></div>\
				<%}%>\
			</div>',
		listAll2 : '<div class="m_sResult rFav">\
				<%if(code == 0){%>\
					<div class="m_total clear">\
						<div class="left"<%for(var i=0,n=DirList.length;i<n;i++){if(SongDirID == DirList[i].DirID){%> title="<%=DirList[i].DirName%>"><%=MI.string.cut(DirList[i].DirName,32)%><%;break;}}%>(' + _('{0}首','<%=SongList.length%>') + ')</div>\
						<div class="right">\
							<%if(DirList.length > 0){%>\
							<select>\
								<%for(var i=0,n=DirList.length;i<n;i++){%>\
								<option value="<%=DirList[i].DirID%>" DirName="<%=DirList[i].DirName%>" DirShow="<%=DirList[i].DirShow%>" DirTime="<%=DirList[i].DirTime%>" <%if(SongDirID == DirList[i].DirID){%>selected="true"<%}%>><%=DirList[i].DirName%></option>\
								<%}%>\
							</select>\
							<%}%>\
						</div>\
					</div>\
					<%if(SongList.length > 0){%>\
					<div class="m_list">\
						<ul class="clear">\
						<%for(var i=(curnum*curpage),n=(curnum*curpage+MI.Music.PageNum) > SongList.length ? SongList.length : (curnum*curpage+MI.Music.PageNum);i<n;i++){%>\
							<%var musicid = SongList[i].id,\
								songname = SongList[i].songname,\
								singername = SongList[i].singername,\
								songurl = SongList[i].url,\
								type = SongList[i].type,\
								str = MI.Music.cut(MI.Music.getHTML(songname ),MI.Music.getHTML(singername));%>\
							<%if(songurl){%><li music="<%=musicid%>,<%=songurl%>,<%=singername%>,<%=songname%>,<%=type%>"><div><a href="#" title="' + _('点击添加') + '-<%=songname%> - <%=singername%>"><%=str[0]%><span>- <%=str[1]%></span></a></div><a href="#" class="ico btn_play" id="play_<%=musicid%>" title="' + _('试听音乐') + '"></a></li><%}%>\
						<%}%>\
						</ul>\
					</div>\
					<%}else{%>\
						<div class="m_noFav"><h4>' + _('您尚未在列表中收藏任何歌曲') + '</h4></div>\
					<%}%>\
				<%}else{%>\
					<div class="m_noFav"><h4>' + _('系统繁忙，请稍后再试') + '</h4></div>\
				<%}%>\
			</div>'
	},
	favMusic : function(dirid,p){//list id
		this.stop('',true);
		dirid = dirid ? dirid : 200;
		var ouin = MI.Uin();
		if(!ouin)	return;
		var url = 'http://qzone-music.qq.com/fcg-bin/fcg_music_fav_getinfo.fcg';
		var param = ['dirinfo=1' ,'dirid='+dirid,'uin='+ouin,'r='+MI.random()];
		UI.getScript(url+"?"+param.join('&'),'','gb2312');
	},
	favMusicCallBack : function(data){
		var Self = this, noerr, pages, rFav;
		Self.talkBox.favMusicData = data;
		Self.talkBox.favMusicData.curnum = Self.PageNum;
		Self.talkBox.favMusicData.curpage = _Pfav - 1;
		if(data){
			// 收藏结果层不存在
			if (!Self._rFav){
				// 准备收藏结果层
				rFav = UI.html('<div class="m_sResult rFav"></div>')[0];
				// 添加收藏结果层
				UI.append(rFav, Self.talkBox._musicBox);
				Self._rFav = rFav;
			} else if (!Self._rFav.parentElement){
				// 收藏结果层被从DOM树中移除了，重新添加到DOM树中
				UI.append(Self._rFav, Self.talkBox._musicBox);
			}
			// 还没有分页条
			if (!Self._rFavPage){
				// 准备分页条
				pages = UI.html('<div class="pages"></div>')[0];
				// 将分页条添加到结果层
				UI.append(pages, Self._rFav);
				// 构造分布栏
				Self._rFavPage = new MI.Page({
					target : pages,
					call : function (i) {
						// 显示第i页的内容
						Self.favPage(i);
					},
					num : 3,
					max : 200
				});
			}
			// 显示第一页 无论返回结果是否正确都要显示 这样可以显示错误信息
			Self._rFavPage.show(1, Math.ceil(data.SongNum / Self.PageNum));
			// 如果返回值不正确&列表中存在少于一页的歌曲 则删除可能存在的分页条
			if ( !!data.code || data.SongNum < Self.PageNum) { 
				if (Self._rFavPage && Self._rFavPage.target){
					UI.remove(Self._rFavPage.target);
					Self._rFavPage = null;
				}
			}
			noerr = true;
		}else{}
		if(!noerr){
			err = false;
		}
	},
	favPage : function(page){
		var Self = this;
		if(!Self.talkBox.favMusicData) return;
		Self.talkBox.favMusicData.curpage = page - 1;
		var favResult = UI.html(new UI.tmplString(Self.tmpl.listAll2)(Self.talkBox.favMusicData)), frag = document.createDocumentFragment();
		UI.each(UI.children(favResult[0]), function(o){
			if (UI.isElement){
				UI.append(o, frag);
			}
		});
		var m_total = $$(Self._rFav, '.m_total')[0];
		var m_list = $$(Self._rFav, '.m_list')[0];
		var m_noFav = $$(Self._rFav, '.m_noFav')[0];
		if (m_total){
			UI.remove(m_total);
		}
		if (m_list){
			UI.remove(m_list);
		}
		if (m_noFav){
			UI.remove(m_noFav);
		}
		UI.prepend(frag, Self._rFav);
		var oSelect = $$(Self._rFav,'select')[0];
		oSelect.onchange = function(){
			Self.favMusic(this.value);
		}
		Self.bindSongClickEvent(Self._rFav, 1);
		if (Self.lastTabs.index != 1)
			UI.hide(Self._rFav);
		else
			UI.show(Self._rFav);
	},
	searchMusic : function(key,p,n){
		/*
		http://shopcgi.qqmusic.qq.com/fcgi-bin/shopsearch.fcg?value=&type=qry_song&out=json&page_no=1&page_record_num=10&uin=
		参数：
		value：｛搜索关键词｝
		type：{固定为qry_song}
		out：｛输出数据格式 json：输出json格式数据｝
		page_no：｛返回第几页结果｝
		page_record_num：｛每页返回几条记录｝
		uin：｛QQ号码｝
		*/
		var Self = this;
		if(!key || UI.trim(key) == _DefaultKey)	return;
		Self.talkBox.musicBox.hide();
		p = parseInt(p) > 0?parseInt(p):_P;
		n = parseInt(n) > 0?parseInt(n):this.PageNum;
		_Key = key;
		_Pi = p;
		//http://cgi.music.soso.com/fcgi-bin/fcg_search_xmldata.q?w=我和你&p=3&page_record_num=5&source=10
		var url = 'http://cgi.music.soso.com/fcgi-bin/fcg_search_xmldata.q';
		//var url = 'http://shopcgi.qqmusic.qq.com/fcgi-bin/shopsearch.fcg';
		//var url = '/asyn/musicsearch.php';
		var param = ['uin=' ,'w='+UI.encode(key) ,'p='+p ,'perpage='+n ,'source=10' ,'r='+MI.random(),'ie=utf-8 '];
		//var param = ['uin=' ,'value='+UI.encode(key) ,'page_no='+p ,'page_record_num='+n ,'type=qry_song' ,'out=json','r='+MI.random(),'utf8=1'];
		UI.getScript(url+"?"+param.join('&'),'','gb2312');

		MI.Bos('btnMusicPlayerSearch');
	},

	searchCallBack : function(data){
		//UI.removeClass(r,'loading');
		var Self = this, noerr;
		var s = [];

		try{
			if(data){
				var rSearch, pages, curpage = data.curpage;
				// 搜索结果层不存在
				if (!Self._rSearch){
					rSearch = UI.html('<div class="m_sResult rSearch"></div>')[0];
					UI.append(rSearch, Self.talkBox._musicBox);
					Self._rSearch = rSearch;
				} else if (!Self._rSearch.parentElement){
					// 搜索结果层被从DOM树移除了，重新添加到DOM树上
					UI.append(Self._rSearch, Self.talkBox._musicBox);
				}
				if (!Self._rSearchPage){
					// 准备分页条
					pages = UI.html('<div class="pages"></div>')[0];
					// 将分页条添加到结果层
					UI.append(pages, Self._rSearch);
					// 构造分布栏
					Self._rSearchPage = new MI.Page({
						target : pages,
						num : 3,
						max : 40,
						call : function (i) {
							Self.searchMusic(_Key, i);
						}
					});
					Self._rSearchPage.show(0, Math.ceil(data.totalnum / Self.PageNum), false);
				}
				// 更新搜索结果 无论返回结果是否正确都要显示 这样可以显示错误信息
				Self.searchPage(data);
				// 如果返回值不正确&列表中存在少于一页的歌曲 则删除可能存在的分页条
				if ( !!data.retcode || data.totalnum < Self.PageNum) {
					if (Self._rSearchPage && Self._rSearchPage.target){
						UI.remove(Self._rSearchPage.target);
						Self._rSearchPage = null;
					}
				}
				noerr = true;
			}else{}
	
			if(!noerr){
				nrk.innerHTML = _Key;
				UI.hide(r);
				UI.show(nr);
				if(opage){
					UI.remove(opage);
				}
				err = false;
			}
		}catch(e){}
	},
	searchPage : function (data) {
		var Self = this;
		if(!data) return;
		var searchResult = UI.html(new UI.tmplString(Self.tmpl.listAll)(data)), frag = document.createDocumentFragment();
		UI.each(UI.children(searchResult[0]), function(o){
			if (UI.isElement){
				UI.append(o, frag);
			}
		});
		var m_total = $$(Self._rSearch, '.m_total')[0];
		var m_list = $$(Self._rSearch, '.m_list')[0];
		var m_noResult = $$(Self._rSearch, '.m_noResult')[0];
		if (m_total){
			UI.remove(m_total);
		}
		if (m_list){
			UI.remove(m_list);
		}
		if (m_noResult){
			UI.remove(m_noResult);
		}
		UI.prepend(frag, Self._rSearch);
		
		Self.bindSongClickEvent(Self._rSearch, 1);
		if (Self.lastTabs.index != 0)
			UI.hide(Self._rSearch);
		else{
			UI.show(Self._rSearch);
		}
	},
	bindSongClickEvent : function(o,fav){
		if(!o)	return;
		var Self = this,
			m_sResult = o;
		fav=fav?fav:'';
		//Event
		UI.each($$(m_sResult,'.m_list li'),function(o){
			o.onclick = function(){
				Self.addPreview(this,fav);
				Self.stop();
				return false;
			}
			var playBtn = $$(o,'.btn_play')[0];
			if(Self.lastMusic){
				if(playBtn.id == Self.lastMusic.id){
					UI.A(playBtn,'play','1');
					UI.A(Self.lastMusic,'title',_('试听音乐'));
					UI.removeClass(Self.lastMusic,'loading');
					UI.removeClass(playBtn,'btn_play');
					UI.addClass(playBtn,'btn_pause');
				}
			}
			playBtn.onclick = function(e){
				//music{song_id,songurl,singer_name,song_name}
				//这里有写啰嗦，后续小部分重构一下
				UI.E(e).stop();
				var play =  parseInt(UI.A(this,'play'));

				if(Self.lastMusic){
					UI.A(Self.lastMusic,'play','0');
					UI.A(Self.lastMusic,'title',_('试听音乐'));
					UI.removeClass(Self.lastMusic,'loading');
					UI.removeClass(Self.lastMusic,'btn_pause');
					UI.addClass(Self.lastMusic,'btn_play');
				}
				if(!play){//btn_pause btn_play
					UI.A(this,'play','1');
					UI.removeClass(this,'btn_play');
					UI.addClass(this,'btn_pause');
					UI.addClass(this,'loading');
					UI.A(this,'title',_('暂停播放'));
					Self.lastMusic = this;
					var music = UI.A(o,'music');
					var m =music.split(',');
					var arg = {};
					arg.songName = m[3];
					arg.songurl = m[1];
					arg.singerName = m[2];
					arg.songID = m[0];
					arg.type = m[4]?m[4]:'';
					Self.play(arg,fav);

				}else{
					Self.stop(this);
				}
				return false;
			}
		});
	},
	addPreview : function(o,fav,isRecord){
		//music{song_id,songurl,singer_name,song_name}
		var Self = this;
		var prview = '<div class="sendThumbs uploadMusic"><span class="preview"><span class="link"><em class="sico ico_audio"></em><a class="fileName" href="#"><span class="m_name"><%=name%></span><b class="m_Intro"><%=fullname%><%if(singer){%><span> - <%=singer%></span><%}%></b></a></span><a class="del" href="#" title="' + _('删除') + '">[' + _('删除') + ']</a></span></div>';
		var attr = UI.A(o,'music');
		var op = $$(Self.talkBox._music,'.preview')[0];
		var m = attr.split(',');

		var p = new UI.tmplString(prview)({
			name : MI.string.cut(MI.string.html(m[3]),10),
			singer : MI.string.html(m[2]),
			fullname : MI.string.html(m[3])
		});
		Self.talkBox._musicPreview = UI.html(p)[0];
		if(op)	UI.remove(op);
		//Self.music = attr;
		//Self.music = '["'+escape(m[0])+'","'+escape(m[1])+'","'+escape(m[2])+'","'+escape(m[3])+'"]';
		if (!MI.user.fun.newMusic){
			Self.talkBox.music = {
				"id" : m[0],
				"song" : m[3],
				"singer" : m[2],
				"songurl" : m[1],
				"songtype" : (m[4] && m[4] % 10 == 1) ? 2 : ''
			}
		}
		UI.append(Self.talkBox._musicPreview,MI.talkBox._sendStatus);
		!(UI.hasClass(Self.talkBox._sendCnt,'hasMedia')) && UI.addClass(Self.talkBox._sendCnt,'hasMedia');
		UI.addClass(Self.talkBox._musicAnchor,'disabled');
		var link = $$(Self.talkBox._musicPreview,'.fileName')[0];
		link.onclick = function(){
			//显示音乐搜索浮层
			//if(!isRecord) Self.show();
			return false;
		}

		var del = $$(Self.talkBox._musicPreview,'.del')[0];
		del.onclick = function(e){
			UI.E(e).stop();
			Self.talkBox.delMusic();
			(UI.children(Self.talkBox._sendStatus,'sendThumbs').length < 2) && (Self.talkBox._picPreview.style.display == 'none') && UI.removeClass(Self.talkBox._sendCnt,'hasMedia');
			MI.Bos('btnMusicPreviewDel');
			return false;
		}
		UI.hide(Self.talkBox._musicBox);
		
		if(isRecord) return;  //录音

		MI.ajax({
			url : MI.url.musicPlayUrl,
			data : {
				musicID : m[0],
				musicSong : escape(m[3]),
				musicSinger : escape(m[2]),
				musicLocation : m[1]
			},
			success : function(data){
				data = MI.json(data);
				var shorturl = '',url = '';
				if(data.result == 0){
					shorturl = data.url;
					url =  ' http://url.cn/' + shorturl;
				}
				Self.talkBox.music.shorturl = shorturl;
				Self.talkBox.txtMusic = _('#分享音乐# #') + m[3].replace(/\&quot;/gi,'"') + '-' + m[2].replace(/\&quot;/gi,'"') + '#' + url+' ';
				if(Self.talkBox._txt.value != Self.talkBox.txtMusic){
					Self.talkBox._txt.value += Self.talkBox.txtMusic;//'#'+Self.txtMusic+'# ' + m[3] + '-' + m[2] + '';
				}else{
					Self.talkBox._txt.value = Self.talkBox.txtMusic;
				}
				Self.talkBox.countTxt();
				Self.talkBox.focus();
			}
		})
		MI.Bos('btnMusicAddTalkBox'+fav);
	},
	cut : function(str1,str2){
		//双标题互斥截字 还不够完善后续优化
		var snum = 48;//行内文字总数；
		var fix1 = 36;
		var fix2 = snum-fix1;
		var s=[str1,str2];
		var s1 = MI.string.length(str1);
		var s2 = MI.string.length(str2);
		if((s1+s2) > snum){
			if(s1 > fix1 && s2 <= fix2){
				s[0] = MI.string.cut(str1,snum-s2);
				s[1] = str2;
			}else if (s1 <= fix1 && s2 > fix2){
				s[0] = str1;
				s[1] = MI.string.cut(str2,snum-s1);
			}else{
				s[0] = MI.string.cut(str1,fix1);
				s[1] = MI.string.cut(str2,fix2);
			}
		}
		return s;
	},
	smartBoxCallback : function(data){
		//加try catch防止不必要的报错影响页面呈现
		var Self = this,musicBox = Self.talkBox.musicBox;
		try{
			
			if(data.head.error == 0 && data.item){
				if(data.item.length > 0){			
					var s = [];
					var l = data.item.length;
					musicBox.indexMax = l - 1;
					musicBox.index = -1;
					s.push('<ul>');
					for(var i=0;i<l;i++){
						s.push('<li value=\"'+ data.item[i].w +'\">' + data.item[i].w + '</li>');
					}
					s.push('</ul>');
					musicBox._select.innerHTML = s.join("");
					// @add samlu 防止低网速情况下，SmartBox查询完成里SearchBar已经被隐藏，从而导致SmartBox飞到整个页面左上角
					if (UI.C($$(Self.talkBox._musicBox,'.m_searchBox')[0], 'display') !== 'none'){
						musicBox.show();
					}
					musicBox._list = $$(musicBox._select,'li');
					//Event
					UI.each(musicBox._list,function(el,i){
						el.onmouseover = function(){
							musicBox.select(i);
						}
						el.onclick = function(){
							musicBox._key.value = this.innerHTML;
							Self.searchMusic(musicBox._key.value);
						}
					});
					s=l=null;
				}else{
					musicBox.hide();
				}
			}else{
				musicBox.hide();
			}
		}catch(e){musicBox.hide();}
	},
	getHTML : function(str){
		//取韩文、日文等，防止直接用字符串造成截字乱码
		if(!str)	return '';
		str = MI.string.html(str);
		var s = UI.html('<div>'+str+'</div>')[0];
		return s.innerHTML;
	},
	play : function(music,fav){
		//function playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType)
		/*
		name : 歌曲名
		url : 歌曲url
		qusid : 固定为'-1'
		ifexp : 固定为true
		qzonekey :固定置空''
		singerName : 歌手名
		iSongId : 歌曲id
		iSongType : 搜索接口中固定为3
		*/
		try{MI.TalkList.musicStop(1);}catch(e){}
		try{MI.TalkList.musicBox.stop();}catch(e){}
		if(!music.songID)	return false;
		var name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType;
		name = music.songName;
		url = music.songurl;
		qusid = (music.type && music.type % 10 == 1) ? -1 : music.songID;
		ifexp = true;
		qzonekey = '';
		singerName = music.singerName;
		iSongId = music.songID;
		iSongType = 3;
		if(typeof playSongWithNoCheck == 'function'){
			//不加延时可能因为上一个播放停止状态导致当前播放被中止
			setTimeout(function(){
				playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType,MI.Music.playerCallback);
				MI.Music.musicState = 1;
				MI.Bos('btnMusicPlayerPreview'+fav);
			},1000);
		}

	},
	playerCallback : function(s){
		//播放器 OnStateChanged 回调
		/*
			以下事件还未侦听，后续做页内播放器将完善事件侦听机制
			OnInitialized,OnUninitialized,OnPlayProgress,OnPlayError,OnPlaySrcChanged
		*/
		/*	OnStateChanged 状态码
			QPS_Undefined       = 0,     Undefined (Initial or crashed)
			QPS_Stopped         = 1,     Player has been stopped
			QPS_Paused          = 2,     Player has been paused
			QPS_Playing         = 3,     Player is playing media
			QPS_Buffering       = 4,     Player is in data buffering
			QPS_BeginPlay       = 5,     Player begin to play
			QPS_PlayEnd         = 6,     Player meet the end of media
		*/
		// 这里的回调参数s有可能是来自html 5 audio DOM对象的事件event， 还可以是QQPlayer的直接回调，此处加以检测
		s = s.target ? UI.A(s.target, 'state') : s;
		switch (s){
			//除了缓冲和载入状态，其余状态要显示歌曲名
			case 5:case 3:case 0:
				UI.removeClass(MI.Music.lastMusic,'loading');
				UI.removeClass(MI.Music.lastMusic,'btn_play');
				UI.addClass(MI.Music.lastMusic,'btn_pause');
				state = 1; // ?
				break;
			case 6:case 1:case 2:
				//MI.Music.stop('',true);
				UI.removeClass(MI.Music.lastMusic,'loading');
				UI.removeClass(MI.Music.lastMusic,'btn_pause');
				UI.addClass(MI.Music.lastMusic,'btn_play');
				break;
			default:// 其他事件不处理 例如 timeupdate : 7 from htmp 5 player 事件
				break;
		}
		/*if(a == 3 || typeof a == 'undefined'){
			UI.removeClass(MI.Music.lastMusic,'loading');
		}*/
	},
	stop : function(o,b){
		var e = o ? o : MI.Music.lastMusic;
		if(e){
			UI.A(e,'play','0');
			UI.removeClass(e,'btn_pause');
			UI.removeClass(e,'loading');
			UI.addClass(e,'btn_play');
		}
		if(b){
			MI.Music.lastMusic = null;
		}
		if(MI.Music.musicState){
			try{stopPlayer();}catch(e){}
		}
		MI.Music.musicState = 0;
	},
	clear : function(){
		var Self = this,
			musicTab = $$(Self.talkBox._musicBox,'.musicTab')[0],
			tabs = $$(musicTab,'li');
		Self.stop();
		Self.talkBox._musicSearchKey.value = '';
		Self.switchSearchKey();
		Self.bindSwitchTabsClick(tabs[0],0);
		UI.each($$(Self.talkBox._musicBox,'.m_sResult'),function(o){
			UI.remove(o);
		});
	},
	show : function(){
		UI.show(this.talkBox._musicBox);
		try{
			this.talkBox._musicSearchKey.focus();
		}catch(e){}
		UI.hide(this.talkBox._videoBox);
		if (this.talkBox.musicMoreBtn){
			this.talkBox.musicMoreBtn.hideRecord();
		}
	},
	hide : function(){
		UI.hide(this.talkBox._musicBox);
		this.stop();
	}
}
MI.getMusicData = function(url){
	var s={};
	var u = url.split("?");
	if(u[1]){
		var p = u[1].split("&");
		for(var i=0,l=p.length;i<l;i++){
			var v = p[i].split("=");
			s[v[0]] = v[1];
		}
	}
	return s;
}
MI.openMusic = function(url){
	if(!url)	return;

	var songData = MI.getMusicData(url);
	var oPostData = {
		"type":"1",
		"vip":"-1",
		"userName":"",
		"playXsosoFlag":"0"
	};
	var playUrl = songData.url;//'http://upload'+songData.stream+'.music.qzone.soso.com/'+(parseInt(songData.songID)+12000000)+'.wma';
	//var url = 'http://music.soso.com/url_player.html?song='+escape(UI.decode(songData.song))+'&singer='+escape(UI.decode(songData.singer))+'&url='+escape(playUrl)+'&stream=0&songID=0';
	var url = 'http://music.soso.com/url_player.html?song='+(songData.song)+'&singer='+(songData.singer)+'&url='+escape(playUrl)+'&stream=0&songID=0';
	var win = window.open(url, "_webSosoMusicPlayerFrame", MI.listen_feature);
	if(!win){
		MI.alert(_('弹出窗口被拦截,请取消拦截!'));
		MI.Bos('btnMusicPlayerWinBlock');
	}else{
		MI.Bos('btnMusicPlayerWinOpen');
	}
	return false;
}
MI.OpenPostWindow = function(sUrl, sWindowName, oPostData){
	this._openPlayer("http://cache.music.soso.com/sosocache/music/playerdata_loading.html");
	if (typeof sWindowName !== "string"){
		sWindowName = "";
	}
	var sFormId = "post_window_form";
	var oForm = document.getElementById(sFormId);
	if (oForm != null) {
		document.body.removeChild(oForm);
	}
	var oForm = document.createElement("form");
	oForm.id = sFormId;
	oForm.action = sUrl;
	oForm.method = "POST";
	oForm.target = sWindowName;
	for (key in oPostData){
		var oInput = document.createElement("input");
		oInput.type = "hidden";
		oInput.name = key;
		oInput.value = oPostData[key];
		oForm.appendChild(oInput);
	}
	document.body.appendChild(oForm);
	oForm.submit();
}
MI.listen_feature = 'toolbar=no,location=no,menubar=no,resizable=yes,status=yes,scrollbars=no,width=750,height=550,left=100,top=10';
MI.mediaMutex = function(obj,b){
	var p = UI.parents(obj,'mediaWrap')[0];
	if(!p)	return;
	var s = ['picBox','videoBox'];
	for(var i=0,l=s.length;i<l;i++){
		if(!b){
			if(!UI.parents(obj,s[i])[0]){
				UI.hide($$(p,'.'+s[i])[0]);
				if(s[i] == 'picBox'){
					var picBox = $$(p,'.'+s[i])[0];
					if(picBox){
						if(UI.hasClass(picBox,'big')){
							UI.removeClass(picBox,'big');
						}
						var canvas = $$(picBox,'canvas')[0];
						if(canvas){
							UI.hide(canvas);
						}
					}
				}
			}else{
				UI.show($$(p,'.'+s[i])[0]);
			}
		}else{
			UI.show($$(p,'.'+s[i])[0]);
		}
	}
	
}
MI.TalkList.music = function(a,b){ //Music Event
	//关闭正在播放的音乐
	try{MI.TalkList.musicClose()}catch(e){}
	//关闭正在播放的其他视频
	try{MI.TalkList.videoClose();}catch(e){}
	//var _this = a;
	var musicBox = a;//_this.parentNode,
	musicBox.isOpen = true; //设置展开音乐的状态位

	MI.TalkList.lastMusic = musicBox;

	if(MI.Music){
		MI.Music.stop('',true);
	}

	var mThumbsBox = $$(musicBox,'.albumInfo .mThumbsBox')[0];
	if (mThumbsBox){ //歌单
		MI.music.info = {
			mlistUin : UI.A(musicBox,'mlistUin'),
			mlistPic : UI.A(musicBox,'mlistPic'),
			mlistUrl : UI.A(musicBox,'mlistUrl'),
			mlistName : UI.A(musicBox,'mlistName'),
			mlistCnt : UI.A(musicBox,'mlistCnt')
		}
		UI.hide($$(musicBox,'.albumPic')[0]);
		UI.hide($$(musicBox,'.albumInfo')[0]);
	}
	else { //歌曲
		mThumbsBox = $$(musicBox,'.mThumbsBox')[0];
		var mBox = $$(musicBox,'.mBox')[0],
		mTitBox = $$(mBox,'.mTitBox')[0],
		mPlayerPlaying = $$(mTitBox,'.mPlayerPlaying')[0],
		mPlayerState = $$(mTitBox,'.mPlayerState')[0];
		MI.music.info = {
			songurl : UI.A(musicBox,'songurl'),
			songID : UI.A(musicBox,'songid'),
			songName : UI.A(musicBox,'song'),
			singerName : UI.A(musicBox,'singer'),
			songtype : UI.A(musicBox,'songtype')
		}
	
		var link = '<a class="mPlayerPlaying" href="http://music.soso.com/url_player.html?song=%esong%&singer=%esinger%&url=%songurl%&stream=0&songID=0" target="_blank" title="%song%-%singer%"><span style="margin-right:10px;">%song%-%singer%</span></a>';
		
		link = link.replace(/\%esong\%/gi,escape(UI.A(musicBox,'song'))).replace(/\%esinger\%/gi,escape(UI.A(musicBox,'singer'))).replace(/\%song\%/gi,UI.A(musicBox,'song')).replace(/\%singer\%/gi,UI.A(musicBox,'singer')).replace(/\%songurl\%/gi,UI.A(musicBox,'songurl')).replace(/\%songid\%/gi,UI.A(musicBox,'songid'));
	
		if(!mPlayerPlaying){
			UI.append(UI.html(link)[0],mTitBox);
			mPlayerPlaying = $$(mTitBox,'.mPlayerPlaying')[0];
		}
		if(!mPlayerState) UI.append(UI.html('<span class="mPlayerState"></span>')[0],mTitBox)
		
		mPlayerPlaying.onclick = function(){
			MI.TalkList.musicClose();
			MI.openMusic(this.href);
			//MI.Bos('btnMusicPlayerWinOpen');
			return false;
		}
		
		if (!MI.user.fun.newMusic){
			mBox.style.display = 'block';
		}
		UI.hide(mThumbsBox);
	}

	
	if(typeof initMusicR != 'function'){
		UI.getScript(MI.version.QQMusicInstance,function(){
			if(initMusicR){
				MI.TalkList.musicPlay(MI.music.info);
			}
		});
	}else{
		MI.TalkList.musicPlay(MI.music.info);
	}
	//MI.mediaMutex(mBox);
}
MI.TalkList.musicPlay = function(music){
	if (MI.user.fun.newMusic){
		var mBoxNew = $$(MI.TalkList.lastMusic,'.mBoxNew')[0],
		isMlist = $$(MI.TalkList.lastMusic,'.albumInfo .mThumbsBox')[0];
		var play = function(){
			if (isMlist){ //播放歌单
				MUSIC.ICMusic.getMusicListFlash(music.mlistUin,music.mlistUrl,mBoxNew);
			}
			else { //播放歌曲
				MUSIC.ICMusic.getMusicFlash(music.songID,mBoxNew);
			}
		}
		if (mBoxNew){
			if (MUSIC && MUSIC.BQplay){
				play();
			}
			else {
				UI.getScript('http://imgcache.qq.com/music/service_forother/app/js/feeds_player.js',function(){
					play();
				});
			}
			//mBoxNew.innerHTML = '<div class="loading" style="width:17px;height:17px;position:absolute;margin:-24px 0 0 6px;background-color:#FFFFFF;"></div>';
			mBoxNew.innerHTML = '<a href="#" onclick="return false" class="mThumbsBox"><span class="mThumbs"><em class="ico_audios"></em>' + UI.text($$(MI.TalkList.lastMusic,'.mThumbsBox')[0]) + '</span></a>' + '<div class="loading" style="width:17px;height:17px;position:absolute;margin:-24px 0 0 6px;background-color:#FFFFFF;"></div>';
		}
		return;
	}
	//function playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType)
	/*
	name : 歌曲名
	url : 歌曲url
	qusid : 固定为'-1'
	ifexp : 固定为true
	qzonekey :固定置空''
	singerName : 歌手名
	iSongId : 歌曲id
	iSongType : 搜索接口中固定为3
	*/
	if(!music.songurl || !music.songID)	return false;
	var name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType;
	name = music.songName;
	url = music.songurl
	qusid = (music.songtype && music.songtype != 1) ? -1 : music.songID;
	ifexp = true;
	qzonekey = '';
	singerName = music.singerName;
	iSongId = music.songID;
	iSongType = 3;
	
	if(typeof playSongWithNoCheck == 'function'){
		setTimeout(function(){
			var musicBox = MI.TalkList.lastMusic;
			mBox = $$(musicBox,'.mBox')[0],
			mTitBox = $$(mBox,'.mTitBox')[0],
			mPlayerPlaying = $$(mTitBox,'.mPlayerP\laying')[0],
			mPlayerState = $$(mTitBox,'.mPlayerState')[0],
			mPlay = $$(mBox,'.btn_mPlay')[0],
			mPause = $$(mBox,'.btn_mPause_hover')[0];
			UI.show(mPause);
			UI.hide(mPlay);

			UI.A(musicBox,'play','1');
			MI.TalkList.musicScroll(musicBox);
			//默认就展示歌曲名，正在载入的提示以后等状态稳定再做
			//MI.TalkList.musicTit(MI.TalkList.lastMusic,'loading');
			playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType,MI.TalkList.musicPlayerOnStateChanged);
			//var BosStr = iSongId+'@@'+name+"@@"+singerName;
			//MI.Bos('btnMusicPlay',encodeURI(BosStr));
			MI.music.state = 3;
			MI.GoTop.showMusicBox(1);
			MI.Bos('btnMusicPlay');
		},1000);
	}
}
MI.TalkList.musicPlayBtn = function(o,b){//b=1播放，b=0停止
	if(o){
		var mPlay = $$(o,'.btn_mPlay')[0],
		mPause = $$(o,'.btn_mPause_hover')[0];
		UI.hide(b ? mPlay: mPause);
		UI.show(b ? mPause: mPlay);
	}
}
MI.TalkList.musicTit = function(m,s){
	var musicBox = m,
	mBox = $$(musicBox,'.mBox')[0],
	mTitBox = $$(mBox,'.mTitBox')[0],
	mPlay = $$(mBox,'.btn_mPlay')[0],
	mPause = $$(mBox,'.btn_mPause_hover')[0],
	mPlayerPlaying = $$(mTitBox,'.mPlayerPlaying')[0],
	mPlayerState = $$(mTitBox,'.mPlayerState')[0];

	var state = 0;
	switch (s){
		//除了缓冲和载入状态，其余状态要显示歌曲名
		case 6:case 5:case 3:case 2:case 1:case 0:case "undefined":default:
			state = 1;
			break;
		case 4:
			mPlayerState.innerHTML = '<em class="loading"></em>' + _('正在缓冲...');
			state = 0;
			break;
		case 'loading':
			mPlayerState.innerHTML = '<em class="loading"></em>' + _('正在载入...');
			state = 0;
			break;
	}
	if(state ==1){
		UI.show(mPlayerPlaying);
		UI.hide(mPlayerState);
		MI.TalkList.musicScroll(musicBox);
		
	}else{
		UI.show(mPlayerState);
		UI.hide(mPlayerPlaying);
		MI.TalkList.musicMarqueePause();
	}
	musicBox=mBox=mPlay=mPause=mTit=null;
}
MI.TalkList.musicPlayerOnStateChanged = function(s){
	//播放器 OnStateChanged 回调
	/*
		以下事件还未侦听，后续做页内播放器将完善事件侦听机制
		OnInitialized,OnUninitialized,OnPlayProgress,OnPlayError,OnPlaySrcChanged
	*/
	/*	OnStateChanged 状态码
		QPS_Undefined       = 0,     Undefined (Initial or crashed)
		QPS_Stopped         = 1,     Player has been stopped
		QPS_Paused          = 2,     Player has been paused
		QPS_Playing         = 3,     Player is playing media
		QPS_Buffering       = 4,     Player is in data buffering
		QPS_BeginPlay       = 5,     Player begin to play
		QPS_PlayEnd         = 6,     Player meet the end of media
	*/
	//对播放状态做wording提示处理
	MI.TalkList.musicTit(MI.TalkList.lastMusic,s);
	MI.music.state = (s==1 && MI.music.state===null) ? null : s;
	//暂时不对播放状态做其他逻辑处理
	switch(s){
		case 3:case "undefined":
			break;
		case 2:
			//暂停播放
			MI.TalkList.musicPause();
			break;
		case 6:case 1:
			//播放完成|停止播放
			//MI.TalkList.musicStop(1);
			break;
		case 101:case 102://101 浏览器不支持，102 需要安装quicktime插件
			MI.TalkList.musicClose();
			break;
	}
	s=null;
}
MI.TalkList.musicScroll = function(o){
	if(!o)	return;
	
	var musicBox = o,
	mBox = $$(musicBox,'.mBox')[0],
	mTitBox = $$(mBox,'.mTitBox')[0],
	mTit = MI.TalkList.musicLastMarquee = $$(mTitBox,'.mPlayerPlaying')[0];
	var state = UI.A(musicBox,'play');
	var l = 2,w;
	var s = $$(mTit,'span');
	//记录一下原始歌曲名占用宽度，用于滚动归为
	if(s.length == 1){
		w = UI.width(mTit);//UI.width(mTit);
		UI.A(mTit,'sWidth',w);
	}else{
		w = UI.A(mTit,'sWidth');
	}
	var pw = UI.width(mTitBox);
	if(w <= pw){
		l = Math.ceil((pw*2) / w);
	}
	if(state == 1){
		if(s.length < l){
			for(var i=1;i<=l;i++){
				mTit.appendChild(s[0].cloneNode(true));
			}
		}
	//setTimeout(function(){
		MI.TalkList.musicMarquee(mTit)
	//},1000)
	}
	mTit.onmouseover = function(){
		//if(UI.A(this.parentNode.parentNode,'play') == 1){
			MI.TalkList.musicMarqueePause();
		//}
	}
	mTit.onmouseout = function(){
		if(UI.A(this.parentNode.parentNode.parentNode,'play') == 1){
			MI.TalkList.musicMarquee(this);
		}
	}
	musicBox=mBox=mTitBox=mTit=null;
}
MI.TalkList.musicMarquee = function(o){
	if(MI.TalkList.musicDelay){
		clearInterval(MI.TalkList.musicDelay);
	}
	var w = UI.A(o,'sWidth');
	var fix = -20;
	var om = o.style.marginLeft;
	var m= om ? parseInt(om) : fix;

	MI.TalkList.musicDelay = setInterval(function(){
		UI.C(o,'marginLeft',m+'px');
		m = parseInt(o.style.marginLeft);
		m--;
		if(Math.abs(m)>=w){
			m=fix-(UI.B.ie ? 0 : 1);
		}
	},40)
}
MI.TalkList.musicMarqueePause = function(){
	if(MI.TalkList.musicDelay){
		clearInterval(MI.TalkList.musicDelay);
	}
}
MI.TalkList.musicMarqueeStop = function(o){
	if(MI.TalkList.musicDelay){
		clearInterval(MI.TalkList.musicDelay);
	}
	UI.C(MI.TalkList.musicLastMarquee,'marginLeft','0');
	var s = $$(MI.TalkList.musicLastMarquee,'span');
	if(s.length > 1){
		for(var i=1,num=s.length;i<num;i++){
			UI.remove(s[i]);
		}
	}
}
MI.TalkList.musicPause = function(a){
	var musicBoxCur = MI.TalkList.lastMusic,
	mBox = $$(musicBoxCur,'.mBox')[0],
	mPlay = $$(mBox,'.btn_mPlay')[0],
	mPause = $$(mBox,'.btn_mPause_hover')[0];
	UI.show(mPause);
	UI.hide(mPlay);
	try{pausePlayer()}catch(e){}
	if(a){
		MI.TalkList.musicPlayBtn(musicBoxCur);
	}
	UI.A(musicBoxCur,'play','0');
	//MI.TalkList.musicMarqueePause();
	MI.TalkList.musicMarqueeStop();
	MI.music.state = 2;
	MI.GoTop.showMusicBox(0);
}
MI.TalkList.musicStop = function(a){
	var musicBoxCur = MI.TalkList.lastMusic,
	mClose = $$(mBox,'.btn_mClose')[0],
	mPlay = $$(mBox,'.btn_mPlay')[0],
	mPause = $$(mBox,'.btn_mPause_hover')[0];
	UI.hide(mPause);
	UI.show(mPlay);
	try{stopPlayer();}catch(e){}
	//if(a){
		MI.TalkList.musicPlayBtn(musicBoxCur);
	//}
	UI.A(musicBoxCur,'play','0');
	MI.TalkList.musicMarqueeStop();
	MI.music.state = 1;
	MI.GoTop.showMusicBox(0);
}
MI.TalkList.musicClose = function(a){
	//延时1s防止缓冲时无法停止播的bug
	setTimeout(function(){try{stopPlayer();}catch(e){};},200)
	MI.GoTop.hideMusicBox();
	if(MI.TalkList.musicPlayDetec){
		clearInterval(MI.TalkList.musicPlayDetec);
	}
	MI.TalkList.musicMarqueeStop();
	try{
		var musicBox = a ? a : MI.TalkList.lastMusic,
		mThumbsBox = $$(musicBox,'.mThumbsBox')[0],
		mBox = $$(musicBox,'.mBox')[0],
		mTit = $$(musicBox,'.openSosoPlayer')[0],
		mClose = $$(mBox,'.btn_mClose')[0],
		mPlay = $$(mBox,'.btn_mPlay')[0],
		mPause = $$(mBox,'.btn_mPause_hover')[0];
		UI.A(musicBox,'play','0');

		musicBox.isOpen = false;  //音乐是否关闭的状态位设置为关闭
		
		UI.hide(mPause);
		UI.show(mPlay);
		UI.hide(mBox);
		UI.show(mThumbsBox);
	}catch(e){}
	MI.music.state = null;
}
//video event process
MI.TalkList.videoUrlVoid = function(a){ //Video url
	var url = a;
	var r = /http:\/\/([^\/]+)\//i;
	var h = url.match(r);
	var c = '';
	if(!h[1])	return c;
	var m = ['qq.com','tudou.com','youku.com','56.com','tudou.com','ku6.com','yinyuetai.com','sohu.com','joy.cn','6.cn'];//从tudou开始为新添加的
	for(var i=0,n=m.length;i<n;i++){
		var patt = new RegExp(m[i]);
		if(patt.test(h[1])){
			c = m[i].split('.')[0];
			break;
		}
	}
	return c;
}
MI.TalkList.videoVid = function(a){ //Video url
	var url = a;
	var c = '';
	var reg = new RegExp("(^|&)vid=([^&]*)(&|$)"); 
	var r = url.split("?")[1].match(reg);
	if(r[2])	c = r[2];
	return c;
}
MI.TalkList.video = function(a,b){ //Video Event
	//关闭正在播放的音乐
	try{MI.TalkList.musicClose()}catch(e){}
	//关闭正在播放的其他视频
	try{MI.TalkList.videoClose();}catch(e){}
	var _this = a;
	var box;
	if(b == 1){
		box = $$(_this.parentNode.parentNode,'.videoBox')[0];
	}else if(b == 2){
		box = _this.parentNode.parentNode;
	}
	box.isOpen = true; //设置展开视频的状态位
	MI.TalkList.lastVideo = box;
	//MI.TalkList.videoCheck();//close last video
	var vUrl = box.getAttribute('playurl');
	var vMp4Url;
	var videoSource = MI.TalkList.videoUrlVoid(vUrl);
	if(videoSource == 'qq' && UI.B.ipad){
		var vid = MI.TalkList.videoVid(vUrl);
		var aysn = 'http://vv.video.qq.com/geturl';
		var url = aysn + "?vid="+vid+"&callvar=QZOutputJson&otype=json&r="+MI.random();
		//http://vv.video.qq.com/geturl?vid=Z0090YD4GeT&otype=json
		var c = '';
		UI.getScript(url,function(){//get html5 video
			vMp4Url = QZOutputJson.vd.vi[0].url;
			if(vMp4Url){
				MI.TalkList.videoOpen(_this,b,vMp4Url,'mp4');
			}
		});
	}else{
		MI.TalkList.videoOpen(_this,b,vUrl,'flash');
	}

	return false;
}
MI.TalkList.videoOpen = function(vCon,cType,vUrl,vType){
	var _this = vCon;
	var _videoObject;
	if(vType == 'mp4'){
		_videoObject = MI.tmpl.videoHTML5;
	}else{
		_videoObject = UI.B.ie ? MI.tmpl.videoObject : MI.tmpl.videoEmbed;
	}
	var box,vBox,flash;
	if(cType == 1){
		box = $$(_this.parentNode.parentNode,'.videoBox')[0];
	}else if(cType == 2){
		box = _this.parentNode.parentNode;
	}
	var vWrap = $$(box,'.vWrap')[0],vBox = $$(box,'.vBox')[0],vThumbsBox = $$(box,'.vThumbsBox')[0];
	var vBoxCon = UI.html('<div class="vBox" style="display:block"></div>')[0];
	
	var picurl = unescape(box.getAttribute('minipicurl')),playurl = vUrl ? vUrl : unescape(box.getAttribute('playurl')),realurl = unescape(box.getAttribute('realurl')),title = box.getAttribute('title')?box.getAttribute('title'):box.getAttribute('reltitle'),title = MI.string.cut(title,40),shorturl=unescape(box.getAttribute('shorturl'));//video 路径
	//视频自动播放url修改	
	var oUrl = box.getAttribute('playurl');
	var videoSource = MI.TalkList.videoUrlVoid(vUrl);
	var getVideoId = function(url,index){return url.split('/')[index];}
	var videoId = 'VideoPlay' + MI.random();

	switch(videoSource){
		case 'tudou':
			vUrl = 'http://www.tudou.com/v/'+getVideoId(oUrl,4)+'/&autoPlay=true/v.swf';	
			break;

		case 'ku6':
			vUrl = 'http://player.ku6.com/refer/'+getVideoId(oUrl,4)+'/v.swf&auto=1';	
			break;

		case '6':
			vUrl = vUrl + '&flag=1';	
			break;

		case 'joy':
			vUrl = 'http://client.joy.cn/flvplayer/v20081022.swf?strvid='+getVideoId(oUrl,4).slice(0,7)+'&playstatus=1';	
			break;

		case 'sohu':
			vUrl = 'http://www.yinyuetai.com/swf/explayer.swf?videoId='+getVideoId( oUrl,3)+'&autostart=true';
			break;

		case 'yinyuetai':
			vUrl = 'http://www.yinyuetai.com/swf/explayer.swf?videoId='+getVideoId(oUrl,5)+'&autostart=true';
			break;
	}

	if(cType == 1){
		var tTools = $$(box,'.vTools')[0],flash = _videoObject.replace(/\$VideoPlayID/g,videoId).replace(/\$VideoPlayUrl/g,playurl).replace(/\$MiniPic/g,picurl);
		//var oTools = UI.html(MI.tmpl.videoTool.replace('$VideoTitle',escape(title)).replace('$VideoRealUrl',encodeURI(realurl)))[0],vClose = $$(oTools,'.vClose')[0];
		if(vThumbsBox){
			//vSimple.setAttribute('url',playurl);//多视频时使用。目前只显示单个视频，先注释掉。
			UI.hide(vThumbsBox);
		}
		//UI.replace(oTools,tTools);
		//vClose.onclick = MI.TalkList.videoClose;
		UI.show(tTools);
		if(box.play){
			var a=$$(_this.parentNode.parentNode,'.videoBox')[0];
			var c=$$(a,'.vClose')[0];
			try{
				MI.TalkList.videoClose(c,1);
			}catch(e){
				//alert(e)
			}
			box.play = 0;
			return false;
		}
		if(!vBox){
			UI.append(vBoxCon,vWrap);
		}
	}else if(cType == 2){
		var tools = $$(box,'.vTools')[0];
		flash =_videoObject.replace(/\$VideoPlayID/g,videoId).replace(/\$VideoPlayUrl/g,playurl);
		if(box.play){
			box.play = 0;
			return false;
		}
		UI.hide(vThumbsBox);
		tools.style.display = 'block';
		if(!vBox){
			UI.append(vBoxCon,vWrap);
		}
	}
	box.play = 1;
	UI.addClass(box,'vPlay');
	if(!UI.B.ipad)	UI.addClass($$(box,'.vBox')[0],'loading');
	if((UI.B.ipad && vType == 'flash') || (MI.noFlash() && vType != 'mp4')){
		flash = '<div style="font-size:14px;padding:20px 0;background:#F9F9F9;margin:5px;">' + _('对不起，由于您的浏览器未安装Flash播放器，不支持播放。<br>建议您尝试来源网页：') + '<a href="http://url.cn/' + shorturl + '" target="_blank">http://url.cn/' + shorturl + '</a></div>';
	}
	vBoxCon.innerHTML = flash;
	MI.mediaMutex(vWrap);
	//MI.Bos('btnVideoView',shorturl);
	MI.Bos('btnVideoView',escape(realurl));
	return false;
}
MI.noFlash = function(){
	var MM_contentVersion = 6;
	var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"])
			? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin
			: 0;
	if (plugin) {
		var words = navigator.plugins["Shockwave Flash"].description.split(" ");
		for (var i = 0; i < words.length; ++i) {
			if (isNaN(parseInt(words[i])))
				continue;
			var MM_PluginVersion = words[i];
		}
		var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
	} else if (window.ActiveXObject){
		try{
			var obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			MM_FlashCanPlay = true;
		}catch(e){
			MM_FlashCanPlay = false;
		}
		
	}
	MI.noFlash = function(){
		return !MM_FlashCanPlay;
	}
	if (MM_FlashCanPlay) {
		return false;
	} else {
		return true;
	}
}
MI.TalkList.videoClose = function(a,b){
	/*var _this = b ? a : this;
	var p = _this.parentNode.parentNode;
	var vWrap = $$(p,'.vWrap')[0];
	var bThumbs = Number(vWrap.getAttribute('thumbs'));
	var vThumbsBox = $$(p,'.vThumbsBox')[0];//this.parentNode.nextSibling.firstChild;
	var tools = _this.parentNode;
	var box = _this.parentNode.parentNode;
	var vBox = $$(box,'.vBox')[0];*/
	var box = MI.TalkList.lastVideo;
	var vWrap = $$(box,'.vWrap')[0],vBox = $$(box,'.vBox')[0],vThumbsBox = $$(box,'.vThumbsBox')[0],tools = $$(box,'.vTools')[0],vThumbs = $$(vThumbsBox,'.vThumbs')[0],thumbs = $$(vThumbs,'img')[0];
	box.play = 0;
	UI.removeClass(box,'vPlay');
	UI.removeClass(vBox,'loading');
	vThumbsBox.style.display = 'inline';
	MI.TalkList.resizePic(thumbs);
	tools.style.display = 'none';
	UI.remove(vBox);
	MI.mediaMutex(vWrap,1);
	MI.TalkList.lastVideo.isOpen = false;  //关闭视频展开的状态位
	return false;
}

MI.TalkList.musicBox = (function () {
  var _musicObj,
    _rClick = /clk-ml([a-z0-9\-]+)(?:\s+|$)/,
    _ieVer = UI.B.ie &&
      parseInt(navigator.userAgent.match(/MSIE (\d+)/)[1], 10);

  _musicObj = {
    mapState : {
      S_STOPPED : 0,
      S_PLAYING : 1,
      S_PAUSED : 2
    },
    _idPlayPoll : null,
    state : 0,
    activeLi : null,
    name : null,
    id : null,
    singer : null,
    url : null,
    els : {},
    mapAlbum : {},

    mapClick : {
      play : function () {
        if (_musicObj.progress) {
          _musicObj.resume();
        } else {
          _musicObj.playByLi(_musicObj.selectedLi);
        }
        MI.Bos('btnMusicPlayerPlay');
      },
      lply : function (el) {
        var li = el.parentNode.parentNode.parentNode;

        if (li && li.tagName !== 'LI') {
          li = li.parentNode;
        }

        if (_musicObj.activeLi === li) {
          if (_musicObj.state === _musicObj.mapState.S_PLAYING) {
            _musicObj.pause();
          } else {
            _musicObj.resume();
          }
        } else {
          _musicObj.playByLi(li);
        }
        MI.Bos('btnMusicListPlay');
      },
      pause : function () {
        _musicObj.pause();
      },
      next : function () {
        _musicObj.playNext();
        MI.Bos('btnMusicPlayerNext');
      },
      prev : function () {
        _musicObj.playPrev();
        MI.Bos('btnMusicPlayerPrev');
      },
      vol : function(el, e) {
        return;
        var pos = e.clientX;
        if (_ieVer && _ieVer < 8) {//fix IE6,7 bug， 3px offset
          pos -= 3;
        }
        pos = pos - UI.getX(el);

//the volume bar range : 0 - 61
        _musicObj.volume.set(pos / 61);
        MI.Bos('btnMusicPlayerVol');
      },
      tbar : function (el, e) {
        var pos = e.clientX,
          percent;

        if (_ieVer && _ieVer < 8) {//fix IE6,7 bug， 2px offset
          pos -= 2;
        }
        pos = pos - UI.getX(el);

//the time bar range : 0 - 196
        percent = pos / 196;

        if (_musicObj.state === _musicObj.mapState.S_PLAYING) {
          _musicObj.progress = _musicObj._getProgress();
          _musicObj.setProgress(Math.round(percent *
            _musicObj.progress[1]));
        } else if (_musicObj.state === _musicObj.mapState.S_PAUSED) {

          _musicObj.progress[0] = Math.round(_musicObj.progress[1] *
            percent);
          _musicObj._setTimeBar(percent);

//IE will auto start after setProcess
          _musicObj.resume();
        }
      },
      songname : function () {
        if (_musicObj.state !== _musicObj.mapState.S_PLAYING) {
          _musicObj.mapClick.play();
        } else {
          _musicObj.mapClick.pause();
        }
      },
      songtitleinlist : function() {
        MI.Bos('btnMusicListSongTitle');
        return true;
      },
      volall : function () {
        var vol = _musicObj.volume;
        if (vol.current === 0) {
          vol.set(vol.origin);
          vol.muted = false;
        } else {
          vol.mute();
          vol.muted = true;
        }
      },
      fav : function (el) {
        _musicObj.fav(UI.hasClass(el, 'light') ? 2 : 1);
        MI.Bos('btnMusicPlayerFav');
      },
      relay : function () {
        var li = this.activeLi || this.selectedLi;
        MI.App.relay(li.id, li);
        MI.Bos('btnMusicPlayerRelay');
      },
      pagenav : function () {
        MI.Bos('btnMusicPageNav');
        return true;
      },
      listenall: function() {
        var arr = [],
          songIds = [],
          currentSongId = (_musicObj.activeLi) ?
            UI.A($$(_musicObj.activeLi, '.songInfo')[0], 'songId') :
            '-1';

        UI.each($$('#talkList .songInfo'), function(e) {
          var songid = UI.A(e,'songid');
          if (songIds[songid] === 1) {
            return;
          }

          songIds[songid] = 1;

          arr.push(_('[{0},{1},"{2}","{3}","","{4}","","",""]',
            songid, UI.A(e,'songtype'), UI.A(e,'songurl'),
            UI.A(e,'song'), UI.A(e,'singer')));
        });

        if (arr.length > 20) {
          arr.length = 20;
        }

        var str = '[ ' + arr.join(', ') + ' ]';

        var html =
          '<form id="the-form-to-post" method="post" ' +
          'target="_webQQMusicPlayer" accept-charset="gbk" ' +
          'action="http://qzone-music.qq.com/fcg-bin/yqqcom_play_mid.fcg">' +
          '<input name="songList" type="hidden" id="the-song-list-to-post" />' +
          '</form>';

        var newdiv = UI.DC('div');
        newdiv.style.display = 'none';
        newdiv.innerHTML = html;
        UI.append(newdiv, $$('body')[0]);
        $('the-song-list-to-post').value = str;
        if (UI.B.ie) {
          document.charset = 'gbk';
          $('the-form-to-post').submit();
          document.charset = 'utf-8';
        } else {
          $('the-form-to-post').submit();
        }
        UI.remove(newdiv);
      },
      nextbunch: function() {
        /* YoungCat code here */
        var Self = this;
        MI.ajax({
          url: '/multimedia/asyn/change_musician.php',
          type: 'get',
          data: '',
          timeout: 10000,
          fail: function() {
            MI.tip(_('抱歉，系统繁忙，请稍后再试。'));
          },
          success: function(json) {
            var data = UI.isString(json) ? MI.json(json) : json;
            data = UI.isString(data.info) ? MI.json(data.info) : data.info;
            Self.genRecommandWall(data);
          }
        });
        return false;
      },
      listenrecommanded: function() {
        /* YoungCat code here */
        var arr = [],
          imgs = $$('.listenerList ul li a img');

        UI.each(imgs, function(img) {
          var obj = img.parentNode;

          if (UI.A(obj, 'account')) {
            arr.push(UI.A(obj, 'account'));  //兼容投放的广告账户格式不一致
          } else {
            arr.push(obj.href.match(/[^\/]+$/g)[0]);
          }
        });

        if (arr.length > 0) {
          MI.follow(arr.join(','), document.body, function() {
            window.location.reload(true);
          });
        }

        return false;
      }
    },

    fav : function (type) {
      var id, data, favBtn, li,
        that = this,
        url = MI.TalkList.prototype.favorUrl;

      li = this.activeLi || this.selectedLi;
      id = li.id;
      favBtn = this.els.favBtn;

      data = {id : id, r : MI.random()};

      data.op = type < 2 ? 1 : 2;

      if (!li.sending) {
        MI.ajax({
          url : url,
          data : data,
          success : function (data) {
            li.sending = 0;
            data = MI.json(data);
            if (data.result === 0) {
              if (type === 1) {
                UI.addClass(favBtn, 'light');
                favBtn.title = _('取消收藏');
              } else {
                if (type === 2) {
                  UI.removeClass(favBtn, 'light');
                  favBtn.title = _('收藏');
                }
              }
            } else if (MI.code.check(data.result)) {
              MI.code.show({
                msg : data.msg,
                code : data.info,
                call : function (code) {
                  that.fav(type);
                }
              });
            }
          }
        });

        li.sending = 1;
      }
    },

    _handleStateChange : function () {
      if (UI.B.safari) {
        /* VH5Player.mPlayerState 状态码
          S_UNDEFINE= 0
          S_STOP = 1
          S_PAUSE = 2
          S_PLAYING = 3
          S_BUFFERING = 4
          S_PLAYBEGIN = 5
          S_PLAYEND = 6
         */
        switch (window.VH5Player.mPlayerState) {
        case 6:
          VH5Player.mPlayerState = 3;
          _musicObj.stop();
          _musicObj.delayNext();
          break;
        }
      } else if (UI.B.ie) {
        /*OnStateChanged 状态码
          QPS_Undefined       = 0,     Undefined (Initial or crashed)
          QPS_Stopped         = 1,     Player has been stopped
          QPS_Paused          = 2,     Player has been paused
          QPS_Playing         = 3,     Player is playing media
          QPS_Buffering       = 4,     Player is in data buffering
          QPS_BeginPlay       = 5,     Player begin to play
          QPS_PlayEnd         = 6,     Player meet the end of media
        */
        switch (arguments[0]) {
        case 6:
          if (!_musicObj._progressSetted) {
            _musicObj.stop();
            _musicObj.delayNext();
          } else {
            setTimeout(function() {
              _musicObj.setProgress(_musicObj._lastPlayedTime);
            }, 100);
          }
          break;
        case 3:
//the QQPlayer will cycle play one song after stop
//pause the player if it auto started after outter control is not
        if (_musicObj.state !== _musicObj.mapState.S_PLAYING) {
          try {
            getPlayer().stopPlayer();
          } catch (e) {}
        }
          break;
        }
      }
    },

    volume : {
      current : 0.6,
      origin : 0.6,
      status : 0, //0, hidden; 1, expanded
      barMaxLen : 62,
      _anim : function (isAnimBack) {
        var vol = _musicObj.volume,
          el = _musicObj.els,
          volIco = el.volIco,
          column = el.volColumn,
          delta,
          animCount,
          interv,
          currentCount,
          toPos,
          pos,
          start,
          opacity,
          runner;

        if (
//already hidden
             (vol.status === 0 && isAnimBack) ||

//already expanded
             (vol.status === 1 && !isAnimBack)) {

//if is animating, means mouse has left (or enter) before last anim over
//need anim back as soon as the prev anim is over
          if (vol._animId) {
            vol.needTurn = true;
          }

          return;
        } else {
          vol.needTurn = false;
          if (vol._animId) { //quit if animating
            return;
          }
        }

        if (isAnimBack) {
          delta = -3;
          toPos = 0;
          pos = start = this.barMaxLen;
        } else {
          el.allTime.parentNode.style.display = 'none';
          UI.C(column, 'opacity', 0);
          column.style.visibility = 'visible';

          delta = 3;
          toPos = this.barMaxLen;
          pos = start = 0;
        }

        animCount = Math.ceil((toPos - start) / delta);
        interv = 15;
        currentCount = 0;

        runner = function () {
          if (currentCount++ < animCount) {
            pos = currentCount === animCount ? toPos : pos + delta;
            opacity = Math.sqrt((pos - start) / (toPos - start));
            UI.C(column, 'opacity', isAnimBack ? 1 - opacity : opacity);
            volIco.style.right = pos + 'px';
            vol._animId = setTimeout(runner, interv);
            if (currentCount === animCount) {
              vol._animId = null;
              if (isAnimBack) {
                el.allTime.parentNode.style.display = '';
                column.style.visibility = 'hidden';
                vol.status = 0;
              } else {
                vol.status = 1;
              }
              if (vol.needTurn) {
                vol._anim(!isAnimBack);
              }
            }
          }
        };

        vol._animId = setTimeout(runner, interv);
      },
      onover : function () {
        var vol = _musicObj.volume;

        if (vol._idHide) {
          clearTimeout(vol._idHide);
          vol._idHide = null;
        }

        vol._idShow = setTimeout(function () {
          vol._idShow = null;
          if (!vol.muted) {
            vol._anim();
          }
        }, 100);
      },
      onout : function () {
        var vol = _musicObj.volume;

        if (vol._idShow) {
          clearTimeout(vol._idShow);
          vol._idShow = null;
        }

        if (vol.status === 1 || vol._animId) {
          vol._idHide = setTimeout(function () {
            vol._anim(true);
          }, 200);
        }
      },
      mute : function () {
        this.origin = this.current;
        this.set(0);
      },
      set : function (percent) {
        var player = getPlayer(), result;

        if (percent < 0 || percent > 1) {
          percent = 0.6;
        }

        this.current = percent;
        _musicObj.els.volBar.style.width = Math.round(percent *
          this.barMaxLen) + 'px';
        if (percent === 0) {
          UI.addClass(_musicObj.els.volIco, 'muted');
        } else {
          UI.removeClass(_musicObj.els.volIco, 'muted');
        }

        if (player && player.setVolumn) {
          result = getPlayer().setVolumn(Math.round(percent * 100));
        }
        return result;
      },
      setByPos : function (pos) {
        var max = this.barMaxLen;

        pos = parseInt(pos, 10);

        pos = isNaN(pos) || pos < 0 ? 0 : pos;
        pos = Math.min(pos, max);

        this.set(pos / max);
      },
      init : function () {
        var player;
        if (!this._inited) {
          player = getPlayer();
          if (player && player.setVolumn) {
            this._inited = this.set(this.current);
          }
        }
      }
    },

    marqee : {
      _idMarq : null,
      bufferShowing : false,
      mapNextDot : {
        3 : '.',
        4 : '..',
        5 : '...',
        6 : ''
      },

      start : function (isResume) {
        var outerCtn = _musicObj.els.songInfo,
          bufferTip = _musicObj.els.bufferTip,
          innerCtn = outerCtn.firstChild,
          span = innerCtn.firstChild,
          that = this,
          count = 0,
          contentWidth,
          intev,
          delta,
          current,
          strongs,
          newspan,
          spanwidth;

        if (_ieVer === 6 || _ieVer === 7) {
          intev = 160;
          delta = 4;
        } else {
          intev = 80;
          delta = 2;
        }

        spanwidth = span.offsetWidth + 10;

        if (isResume) {
          current = parseInt(UI.C(innerCtn, 'marginLeft'), 10);
          current = isNaN(current) ? 0 : current;
        } else {
          current = 0;
          UI.append(span.cloneNode(true), innerCtn);
          UI.append(span.cloneNode(true), innerCtn);
          outerCtn.style.width = Math.min(spanwidth + 50, 320) + 'px';
          innerCtn.style.marginLeft = current + 'px';
          //innerCtn.style.width = Math.min(spanwidth + 50, 320) + 'px';
        }


        this._idMarq = setInterval(function () {
          var txt;
          current -= delta;
          innerCtn.style.marginLeft = current + 'px';
          if (current <= -spanwidth) {
            current = 0;
          }

          if (that.bufferShowing && count++ % 4 === 0) {
            txt = bufferTip.innerHTML;
            bufferTip.innerHTML = txt.substr(0, 3) +
              (that.mapNextDot[txt.length] || '');
          }
        }, intev);
      },

      stop : function (isPause) {
        var innerCtn;

        clearInterval(this._idMarq);
        if (!isPause) {
          innerCtn = _musicObj.els.songInfo.firstChild;
          UI.remove(innerCtn.childNodes[1]);
          UI.remove(innerCtn.childNodes[1]);
        }
      }
    },

    _pollChecker : function () {
      var pos, obj, duration,
        needStop = false,
        allOutTimes = 25;    //音乐加载超时的（次数），相对于轮循的时间，25*400是总的时间

      if (_musicObj.marqee.bufferShowing) {     //当再一次重新加载时，时间重置
          _musicObj.outTimes++;
      } else {
          _musicObj.outTimes = 0;
      }

      if (!_musicObj.progress || _musicObj.progress[1] <= 0) {
        _musicObj.progress = _musicObj._getProgress();
      }

      if (UI.B.firefox || UI.B.opera) {
        obj = MediaPlayer && MediaPlayer.mPlayerName;

        if (obj) {

          duration = _musicObj.progress[1];
          pos = obj.controls.currentPosition;

// MediaPlayer playState:
//1 : 如果播放停止
//2 : 如果播放暂停
//3 : 正在播放
//4 : 向前
//5 : 向后
//6 : 缓冲中
//7 : 等待中
//8 : 播放结束
//9 : 通信中
//10 : 准备就绪
//11 : 重新连接
          if (obj.playState === 3 && duration - pos  < 0.8
              && _musicObj._delayNextPlayed) {
//song just keep going next
//add _delayNextPlayed property to avoid it
            _musicObj.afterStop();
            _musicObj.delayNext();
            needStop = true;
          }
        }
      }

      if (_musicObj.state === _musicObj.mapState.S_PLAYING &&
          !_musicObj.dragStarted) {
        _musicObj._updProgress();
      }
      _musicObj.volume.init();

      if (_musicObj.outTimes > allOutTimes && _musicObj.marqee.bufferShowing) {   //加载失败
        if (!_musicObj._lastPlayedTime) {    //首次加载失败，则直接播放下一首
          _musicObj.playNext();
        } else {                            //中间加载失败，则返回后继续播放
          _musicObj.replay(_musicObj._lastPlayedTime);
        }
        needStop = true;
      }

      if (!needStop) {
        _musicObj._startPoll();
      }
    },

    _startPoll : function () {
      if (this._idPlayPoll) {
        this._stopPoll();
      }
      this._idPlayPoll = setTimeout(this._pollChecker, 400);
    },

    _stopPoll : function () {
      if (this._idPlayPoll !== null) {
        clearTimeout(this._idPlayPoll);
        this._idPlayPoll = null;
      }
    },
    afterStop : function () {
      var els = this.els;

      if (this.activeLi) {

        this._stopPoll();
        this._updateLi();

        els.allTime.innerHTML = els.playedTime.innerHTML = '00:00';
        this._setTimeBar(0);

        this._updateToolBox(true);
        this.marqee.stop();
      }
    },
    delayNext : function () {
      if (this._idNext) {
        return;
      }
      this._idNext = setTimeout(function () {
        _musicObj.playNext();
      }, 5000);
      this._delayNextPlayed = false;
    },
    playNext : function () {
      var alllis = this.els.lists,
        next,
        current,
        oldCurrent;

      if (this.state === _musicObj.mapState.S_PLAYING) {
        current = this.activeLi;
      } else {
        current = this.selectedLi;
      }

      oldCurrent = current;

      this.stop();

      do {
        UI.each(alllis, function (o, i) {
          if (o === current) {
            next = i + 1;
          }
        });

        if (!alllis[next]) {
          next = 0;
        }

        current = alllis[next];
        if (this.id !== UI.A(UI.GC(current, '.songInfo')[0], 'songid')) {
          break;
        }
      } while (current !== oldCurrent);

      setTimeout(function () {
        _musicObj.playByLi(current);
      }, 200);
    },
    playPrev : function () {
      var alllis = this.els.lists,
        prev,
        current;


      if (this.state === _musicObj.mapState.S_PLAYING) {
        current = this.activeLi;
      } else {
        current = this.selectedLi;
      }

      this.stop();
      UI.each(alllis, function (o, i) {
        if (o === current) {
          prev = i - 1;
        }
      });

      if (prev === -1) {
        prev = alllis.length - 1;
      }

      setTimeout(function () {
        _musicObj.playByLi(alllis[prev]);
      }, 200);
    },
    playByLi : function (li) {
      var infoEl = UI.GC(li, '.songInfo')[0],
        sharerName = UI.GC(li, '.userPic a')[0].rel;

      sharerTitle = sharerName.substr(0, sharerName.indexOf('@') - 1);

      this.play(UI.A(infoEl, 'song'), UI.A(infoEl, 'songurl'),
        UI.A(infoEl, 'songid'), UI.A(infoEl, 'singer'),
        UI.GC(infoEl, 'a')[0].href, sharerTitle);

      this.activeLi = li;
      this.selectedLi = li;
      this._updateLi();
    },

    play : function (name, url, id, singer, playerUrl, tweetOwner) {
      var args = Array.prototype.slice.apply(arguments),
        that = this;

      try {
        MI.Music.hide();
      } catch (e) {}

      if (this.state !== _musicObj.mapState.S_STOPPED) {
        this.stop();
      } else {
        try {
          getPlayer().stopPlayer();
        } catch (e) {}
      }

      if (window.playSongWithNoCheck) {
        this._play.apply(this, args);
      } else {
        MI.app({
          Music : function () {}
        });
        setTimeout(function () {
          that.play.apply(that, args);
        }, 100);
      }
    },

    _play : function (name, url, id, singer, playerUrl, tweetOwner) {
      /*
        name : 歌曲名
        url : 歌曲url
        qusid : 进行url转换？
        ifexp : 固定为true
        qzonekey :固定置空''
        singerName : 歌手名
        iSongId : 歌曲id
        iSongType : 搜索接口中固定为3
        function playSongWithNoCheck(name, url, qusid, ifexp, qzonekey,
          singerName, iSongId, iSongType)
      */
      //console.log(arguments);
      var callback = this.callbackSent ? undefined :
        _musicObj._handleStateChange;
      playSongWithNoCheck(name, url, id, true, '', singer, id, 3,
        callback);
      this.state = _musicObj.mapState.S_PLAYING;
      this.outTimes = 0;
      this._startPoll();
      this.name = name;
      this.url = url;
      this.id = id;
      this.sharer = tweetOwner;
      this.progress = null;
      this.singer = singer;
      this.playerUrl = playerUrl;
      this.callbackSent = true;
      this.jumpToTimeAfterStarted = 0;

      this._lastPlayedTime = null;
      this._lastPlayedCount = 0;

      this._updateToolBox(false, id);
      this._idNext = null;
      this.marqee.start();
    },

    replay : function (resumeTime) {
      this.stop();
      this.playByLi(_musicObj.selectedLi);
      if (resumeTime && resumeTime > 0) {
        this.jumpToTimeAfterStarted = resumeTime;
      }
    },

    pause : function () {
      if (this.state === _musicObj.mapState.S_PLAYING) {

        this.state = _musicObj.mapState.S_PAUSED;
        this._stopPoll();
        this._updateToolBox(true)
        this._updateLi()
        this.marqee.stop(true);

        this.progress = this._getProgress();
        this.els.bufferTip.style.visibility = 'hidden';
        try {
          getPlayer().pausePlayer();
        } catch (e) {}
      }
    },
    resume : function () {
      if (this.state === _musicObj.mapState.S_PAUSED) {
        this.state = _musicObj.mapState.S_PLAYING;
        this.outTimes = 0;
        try {
          if (UI.B.safari) {
            getPlayer().nextPlayer();
          } else {
            getPlayer().runPlayer();
          }
        } catch (e) {
        }

        if (!UI.B.ie) {
          setTimeout(function() {
            _musicObj.setProgress(_musicObj.progress[0]);
          }, 100);
        }

        this._startPoll();
        this._updateToolBox();
        this._updateLi();
        this.marqee.start(true);
      }
    },
    stop : function () {
      if (this.state !== this.mapState.S_STOPPED) {
        this.state = this.mapState.S_STOPPED;
        this._stopPoll();

        this._updateLi();
        this._updateToolBox(true)
        this.progress = null;
        this.marqee.stop();
        this.els.bufferTip.style.visibility = 'hidden';
        this.activeLi = null;

        if (!UI.B.firefox && !UI.B.opera && !UI.B.ie) {
          getPlayer().mPlayerName.pause();
          setTimeout(function () {
            getPlayer().pausePlayer();
          }, 100);
        }

        try {
          getPlayer().stopPlayer();
        } catch (e) {}
      }
    },
    _updateLi : function () {
      var aEl, mbox;
      if (this.activeLi) {
        aEl = UI.GC(this.activeLi, '.musicFun a')[0];
        mbox = aEl.parentNode.parentNode;
        if (this.state === this.mapState.S_PLAYING) {
          //UI.removeClass(aEl, 'ico_mpl');
          //UI.addClass(aEl, 'ico_mst');
          aEl.title = '暂停';
          UI.addClass(mbox, 'playing');
        } else {
          UI.removeClass(mbox, 'playing');
          aEl.title = '播放';
        }
      }
    },

    _updateToolBox : function (isStop, songId) {
      var els = this.els,
        songname,
        singer,
        refreshTime = false,
        tmp;

      if (isStop) {
        UI.hide(els.btnStop);
        UI.show(els.btnPlay);
        if (this.state === this.mapState.S_STOPPED) {
          refreshTime = true;
        }
        UI.removeClass(els.favBtn, 'light');
      } else {
        songname = MI.string.html(this.name);
        els.songName.innerHTML = songname;
        singer = MI.string.html(this.singer);
        els.singer.innerHTML = singer;
        els.singer.nextSibling.innerHTML = MI.string.html(this.sharer +
          _('分享'));
        els.albumPic.parentNode.title = songname + '-' + singer;
        els.albumPic.parentNode.href = this.playerUrl;
        UI.hide(els.btnPlay);
        UI.show(els.btnStop);
        refreshTime = true;
      }

      if (refreshTime) {
        els.allTime.innerHTML = els.playedTime.innerHTML = '00:00';
        this._setTimeBar(0);
      }

      if (songId) {
        this._updateAlbumPic(songId);
      }
    },

    _updateAlbumPic : function (id) {
      var map = this.mapAlbum,
        el = this.els.albumPic,
        aid = map[id];

      if (aid) {
        el.src = 'http://imgcache.qq.com/music/photo/album/' +
          (aid % 100) + '/68_albumpic_' + aid + '_0.jpg';
        el.onerror = function () {
          this.src = 'http://mat1.gtimg.com/www/mb/images/music/68.png';
        };
      } else {
        el.src = 'http://mat1.gtimg.com/www/mb/images/music/68.png';
        UI.getScript('http://portalcgi.music.qq.com/fcgi-bin/music_mini_portal/cgi_query_download.fcg?id=' + id);
      }
    },

    onAlbumInfo : function (data) {
      var id = this.id;
      if (data && data.songName === id) {
        this.mapAlbum[id] = data.albumid;
        this._updateAlbumPic(id);
      }
    },

    _formatTime : function (allSeconds, upperLimit) {
      var minutes, seconds;

      if (upperLimit) {
        allSeconds = Math.min(allSeconds, upperLimit);
      }
      allSeconds = Math.ceil(allSeconds);


      minutes = Math.floor(allSeconds / 60);
      minutes = (minutes < 10 ? '0' : '' ) + minutes.toString(10);

      seconds = allSeconds % 60;
      seconds = (seconds < 10 ? '0' : '' ) + seconds.toString(10);

      return minutes + ':' + seconds;
    },

    _updProgress : function () {
      var map = this.mapState,
        progress,
        played,
        showBuffer,
        all;

      if (this.state === map.S_PLAYING) {
        progress = this._getProgress();
        played = progress[0];
        all = progress[1];

        if (played === 0 && all === 0) {
          showBuffer = true;
        }

        if (all !== 0) {

          this._delayNextPlayed = true;

          this.els.allTime.innerHTML = this._formatTime(all);
          this.els.playedTime.innerHTML = this._formatTime(played, all);
          this._progressSetted = false;

          if (UI.B.safari) {
            if (played === this._lastPlayedTime) {
              if (this._lastPlayedCount++ > 1) {
                showBuffer = true;
              }
            } else {
              this._lastPlayedCount = 0;
            }
          }
          this._lastPlayedTime = played;
        }

        this.els.bufferTip.style.visibility = showBuffer ? 'visible' :
          'hidden';
        this.marqee.bufferShowing = showBuffer;

        this._setTimeBar(played / progress[1]);

        if (!showBuffer && this.jumpToTimeAfterStarted) {
          _musicObj.setProgress(this.jumpToTimeAfterStarted);
          this.jumpToTimeAfterStarted = 0;
        }
      }
    },

    setProgress : function (current) {

      var player = getPlayer(),
        result = true,
        dur = this.progress[1];

      try {
        if (UI.B.firefox || UI.B.opera) {
          player.mPlayerName.controls.currentPosition = current;
        } else if (UI.B.ie) {
          player.mPlayerName.CurPos = current;
        } else {
          player.mPlayerName.currentTime = current;
        }
      } catch (e) {
        result = false;
      }

      if (result && dur) {
        this._setTimeBar(current/dur);
      }

//after set progress, the buffering may end with a state 6(play end) in IE
//prevent auto jump to next with _progressSetted
      this._progressSetted = true;

      return result;
    },

    _setTimeBar : function (percent) {
      //-3 ~ 192
      //0 ~ 195
      var barLength;

      percent = parseFloat(percent, 10);
      if (!isNaN(percent) && percent >= 0) {
        barLength = Math.round(195 * percent);

        this.els.playedBar.style.width = barLength + 'px';
        this.els.timeBarSlider.style.left = barLength - 3 + 'px';
      }
    },

    _getProgress : function () {
      var tmp,
        duration = 0,
        pos = 0,
        player = getPlayer();

      if (UI.B.firefox || UI.B.opera) {
        try {
          tmp = player.mPlayerName;
          if (tmp.playState === 3) {
            duration = tmp.currentMedia.duration;
            pos = tmp.controls.currentPosition;
          }
        } catch (e) {}
      } else if (UI.B.ie) {
        try {
          if (player.mPlayerState === 3) {
            duration = player.mCurPlayTotal;
            pos = player.mPlayerName.CurPos;
          }
        } catch (e) {}
      } else {
        try {
          //if (window.VH5Player.mPlayerState === 3)
          duration = player.mPlayerName.duration;
          pos = player.mPlayerName.currentTime;

        } catch (e) {
        }
      }

      duration = parseFloat(duration, 10);
      if (isNaN(duration) || duration < 0) {
        duration = 0;
      }
      pos = parseFloat(pos, 10);
      if (isNaN(pos) || pos < 0) {
        duration = 0;
      }

      return [Math.ceil(pos), Math.floor(duration)];
    },

    genRecommandWall: function(usersArray) {
      /* YoungCat code here */
      var listenerList = $$('.listenerList')[0],
        i,
        listitems,
        emptyli,
        html;

      UI.each($$(listenerList, 'li img'), function(elem) {
        UI.ER(elem, 'mouseover', MI.Card.show);
      });

      listitems = [];

      for (i=0; i<29; ++i) {
        listitems.push(_('<li><a title="" href="/{0}" ' +
          'rel="{1}(@{0})">' +
          '<img src="{2}/50" ' +
          'card="1" ctype="1" title=""></a></li>',
          usersArray[i].name, usersArray[i].nick, usersArray[i].url));
      }

      emptyli = '<li class="undis"></li>';
      listitems.splice(12, 0, emptyli, emptyli, emptyli);
      listitems.splice(21, 0, emptyli, emptyli, emptyli);

      listitems[35] = '<li class="change clk-mlnextbunch"><a href="#">换一批</a></li>';

      html = '<ul>' + listitems.join('') +
        '</ul><div class="lbBox sbBox"></div>' +
        '<div class="listenAll">' +
        '<a href="#" class="ico_listen clk-mllistenrecommanded"></a>' +
        '</div>';

      listenerList.innerHTML = html;

      UI.each($$(listenerList, 'li img'), function (elem) {
        UI.EA(elem, 'mouseover', MI.Card.show);
      });
    },

    _initEls : function (id) {
      var els = {};
      els.ctn = UI.G(id);

      if (!els.ctn) {
//happens if user's list is empty
        this.els = null;
        return;
      }

      els.timeBarSlider = UI.GC(els.ctn, '.playBtn')[0];
      els.playedBar = UI.GC(els.ctn, '.playTime')[0];
      els.allTimeBar = UI.GC(els.ctn, '.allTime')[0];
      els.allTime = UI.GC(els.ctn, '.mTime span')[0];
      els.playedTime = UI.GC(els.ctn, '.mTime strong')[0];
      els.songInfo = UI.GC(els.ctn, '.songName')[0];
      els.songName = UI.GC(els.songInfo, 'strong')[0];
      els.singer = UI.GC(els.songInfo, 'strong')[1];
      els.lists = UI.children($('talkList'));
      els.btnPrev = UI.GC(els.ctn, '.ico_mPre')[0];
      els.btnNext = UI.GC(els.ctn, '.ico_mNext')[0];
      els.btnPlay = UI.GC(els.ctn, '.ico_mPlay')[0];
      els.btnStop = UI.GC(els.ctn, '.ico_mStop')[0];
      els.volColumn = UI.GC(els.ctn, '.vol')[0];
      els.volBar = UI.GC(els.ctn, '.volCtr')[0];
      els.volIco = UI.GC(els.ctn, '.ico_Spk')[0];
      els.volCtn = UI.GC(els.ctn, '.volum')[0];
      els.albumPic = UI.GC(els.ctn, '.mPic img')[0];
      els.favBtn = UI.GC(els.ctn, '.clk-mlfav')[0];
      els.bufferTip = UI.GC(els.ctn, '.ops span')[0];
      els.mainCtn = UI.G('music-box-adv');
      els.talkList = UI.G('talkList');

      this.els = els;
    },

    _hlClick : function (e) {
      var el, time, matches, eo,
        targetFound = false,
        i = 3;

      eo = UI.E(e);
      el = eo.target;

      while (i-- > 0 && el) {

        matches = el.className && el.className.match(_rClick);
        matches = matches && matches[1];
        if (_musicObj.mapClick[matches]) {
          targetFound = true;
          if (_musicObj.mapClick[matches].apply(_musicObj, [el, e]) !==
              true) {
            eo.stop();
            eo.prevent();
          }
          break;
        }
        el = el.parentNode;
      }
    },

/*
    _hlBeforeUnload : function (e) {
      var result;
      e = e || window.event;

      if (_musicObj.state === _musicObj.mapState.S_PLAYING) {
        result = _('关闭或切换当前页面将导致中断播放您正在听的音乐。' +
          '您可以选择回到页面，打开伴随模式以继续听音乐。' +
          '您确定关闭页面吗？');
        e.returnValue = result;
      }

      return result;
    },
*/

    _hlScrollResize : function () {
      var listPos, scrollY, ctn,
        els = _musicObj.els;

      scrollY = UI.scrollY();
      listPos = UI.getY(els.talkList);
      ctn = els.mainCtn;

      if (_ieVer !== 6) {
        if (listPos - scrollY < 117) {//117, the height of the player box
          if (!_musicObj._boxFixed) {
            ctn.style.position = 'fixed';
            ctn.style.top = '-10px';
            _musicObj._boxFixed = true;
          }
        } else if (_musicObj._boxFixed) {
          ctn.style.position = 'static';
          _musicObj._boxFixed = false;
        }
      } else {
        if (listPos - scrollY < 117) {//117, the height of the player box
          if (_musicObj._idIe6Scroll) {
            clearTimeout(_musicObj._idIe6Scroll);
          }
          ctn.style.display = 'none';
          ctn.style.position = 'absolute';
          ctn.style.top = (scrollY - _musicObj._headHeight - 10) + 'px';
          _musicObj._idIe6Scroll = setTimeout(function () {
            ctn.style.display = '';
          }, 150);
          _musicObj._boxStatic = false;
        } else if (!_musicObj._boxStatic) {
          ctn.style.position = 'static';
          _musicObj._boxStatic = true;
          ctn.style.display = 'block';
        }
      }
    },

    _initEvents : function () {
      var left, slider, els, volbar, oriVolLeft;

      els = this.els;

      UI.EA(document.body, 'click', this._hlClick);
      /*
      UI.EA(window, 'beforeunload', this._hlBeforeUnload);
      */

      if (els) {
        UI.EA(window, 'scroll', this._hlScrollResize);
        UI.EA(window, 'resize', this._hlScrollResize);
        els.volCtn.onmouseover = this.volume.onover;
        els.volCtn.onmouseout = this.volume.onout;

        slider = els.timeBarSlider;
        UI.drag(slider, {
          start : function(e){
            var E = UI.E(e);
            E.prevent();

            if (_musicObj.state === _musicObj.mapState.S_PLAYING ||
                _musicObj.state === _musicObj.mapState.S_PAUSED) {
              left = E.x - parseInt(UI.C(slider, 'left'), 10);
            } else {
              left = false;
            }
            _musicObj.dragStarted = true;
          },
          drag : function(e){
            var E = UI.E(e), pos;
            E.prevent();

            if (left !== false) {
              pos = E.x - left;

              if (pos < -3) {
                pos = -3;
              } else if (pos > 192) {
                pos = 192;
              }
              slider.style.left = pos + 'px';
            }
          },
          call : function(){
            _musicObj.dragStarted = false;

            if (UI.B.safari) {
              _musicObj._lastPlayedCount = 2;
            }
          }
        }, true);

  //volume
        volbar = els.volBar;
        UI.drag(els.volColumn, {
          start : function(e) {
            var E = UI.E(e);
            E.prevent();

            oriVolLeft = UI.getX(els.volColumn);
            _musicObj.volume.setByPos(E.x - oriVolLeft);
            MI.Bos('btnMusicPlayerVol');
          },
          drag : function(e) {
            var E = UI.E(e);

            E.prevent();

            _musicObj.volume.setByPos(E.x - oriVolLeft);
          },
          call : function(){
          }
        }, true);
      }
    },

    init : function (id) {
      this._initEls(id);
      this._initEvents();

      if (this.els) {
        this.selectedLi = this.els.lists[0];

        this.id = UI.A(UI.GC(this.selectedLi, '.songInfo')[0], 'songid');
        this._updateAlbumPic(this.id);

/*
        $$('.openLrc > a')[0].innerHTML = _('弹出播放');
        UI.show($$('.LrcFun')[0]);
        UI.addClass($$('.openLrc')[0], 'clk-mllistenall');
*/

        UI.each($$('#talkList .songInfo a'), function(obj) {
          UI.addClass(obj, 'clk-mlsongtitleinlist');
        });
        UI.each($$('#pageNav a'), function(obj) {
          UI.addClass(obj, 'clk-mlpagenav');
        });

        if (_ieVer === 6) {
          this._headHeight = UI.height(UI.G('headWrap'));
        }

        this._hlScrollResize();

      }

      MI.app({
        Base : function(){
          UI.each($$($$('.listenerList')[0], 'li img'), function (elem) {
            UI.EA(elem, 'mouseover', MI.Card.show);
          });
        }
      });
    }
  };

  return {
    albumInfoCallback : function (data) {
      _musicObj.onAlbumInfo(data);
    },
    stop : function () {
      _musicObj.stop();
    },
    init : function (id) {
      _musicObj.init(id);
    }
  };
}());
